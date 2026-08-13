# Hermes Agent 自学习循环机制深度解析

> 基于 [hermes-agent](https://github.com/NousResearch/hermes-agent) v0.12.0 源码分析
>
> 分析日期：2026-05-07

---

## 目录

- [1. 架构总览](#1-架构总览)
- [2. 三层持久化存储](#2-三层持久化存储)
  - [2.1 声明性记忆：MEMORY.md / USER.md](#21-声明性记忆memorymd--usermd)
  - [2.2 程序性记忆：Skills 技能系统](#22-程序性记忆skills-技能系统)
  - [2.3 会话历史：SQLite + FTS5](#23-会话历史sqlite--fts5)
- [3. 系统提示词组装](#3-系统提示词组装)
- [4. 前台即时学习路径](#4-前台即时学习路径)
  - [4.1 记忆工具：memory](#41-记忆工具memory)
  - [4.2 技能管理工具：skill_manage](#42-技能管理工具skill_manage)
- [5. 后台自改进审查](#5-后台自改进审查)
  - [5.1 触发机制与计数器](#51-触发机制与计数器)
  - [5.2 审查提示词](#52-审查提示词)
  - [5.3 Fork Agent 机制](#53-fork-agent-机制)
  - [5.4 来源追踪：Provenance](#54-来源追踪provenance)
- [6. Curator 定期维护](#6-curator-定期维护)
  - [6.1 自动状态转换](#61-自动状态转换)
  - [6.2 Curator 审查提示词](#62-curator-审查提示词)
- [7. 完整数据流图](#7-完整数据流图)
- [8. 关键设计原则](#8-关键设计原则)
- [9. 关键文件索引](#9-关键文件索引)

---

## 1. 架构总览

Hermes Agent 的自学习循环由三个核心子系统组成，围绕"**即时学习 → 后台复盘 → 定期整理**"的时间轴运转：

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Self-Learning Loop                          │
│                                                                     │
│   ┌──────────┐    ┌──────────────┐    ┌──────────────────────────┐ │
│   │ 前台即时  │ →  │  后台自改进   │ →  │   Curator 定期维护        │ │
│   │ Learning  │    │  Background  │    │   Periodic Maintenance   │ │
│   │           │    │  Review      │    │                          │ │
│   │ memory()  │    │ Fork Agent   │    │ 自动归档 (30d/90d)       │ │
│   │ skill_    │    │ 审查对话      │    │ 伞形整合合并              │ │
│   │ manage()  │    │ 创建/修补技能 │    │ 清理碎片                  │ │
│   └──────────┘    └──────────────┘    └──────────────────────────┘ │
│        │                  │                      │                  │
│        ▼                  ▼                      ▼                  │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │               三层持久化存储                                  │  │
│   │   MEMORY.md / USER.md  │  Skills (SKILL.md)  │  SQLite FTS5 │  │
│   └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. 三层持久化存储

### 2.1 声明性记忆：MEMORY.md / USER.md

**文件位置**：`~/.hermes/memories/`

Agent 拥有两个独立的记忆文件，各有字符数上限（字符而非 token，因为字符计数与模型无关）：

| 文件 | 用途 | 字符上限 |
|------|------|---------|
| `MEMORY.md` | Agent 的个人笔记：环境事实、项目约定、工具特性、经验教训 | 2,200 |
| `USER.md` | 对用户的认知：偏好、沟通风格、期望、工作习惯 | 1,375 |

**条目分隔符**：使用 `§`（section sign）字符分隔多条目。

**核心类：`MemoryStore`**（`tools/memory_tool.py`）

```python
class MemoryStore:
    """
    Bounded curated memory with file persistence. One instance per AIAgent.

    Maintains two parallel states:
      - _system_prompt_snapshot: frozen at load time, used for system prompt injection.
        Never mutated mid-session. Keeps prefix cache stable.
      - memory_entries / user_entries: live state, mutated by tool calls, persisted to disk.
        Tool responses always reflect this live state.
    """

    def __init__(self, memory_char_limit: int = 2200, user_char_limit: int = 1375):
        self.memory_entries: List[str] = []
        self.user_entries: List[str] = []
        self.memory_char_limit = memory_char_limit
        self.user_char_limit = user_char_limit
        # Frozen snapshot for system prompt -- set once at load_from_disk()
        self._system_prompt_snapshot: Dict[str, str] = {"memory": "", "user": ""}
```

**冻结快照（Frozen Snapshot）** 是核心设计模式。会话开始时一次性加载并冻结，后续写入立即落盘但不更新当前 system prompt：

```python
def load_from_disk(self):
    """Load entries from MEMORY.md and USER.md, capture system prompt snapshot."""
    mem_dir = get_memory_dir()
    mem_dir.mkdir(parents=True, exist_ok=True)

    self.memory_entries = self._read_file(mem_dir / "MEMORY.md")
    self.user_entries = self._read_file(mem_dir / "USER.md")

    # Deduplicate entries (preserves order, keeps first occurrence)
    self.memory_entries = list(dict.fromkeys(self.memory_entries))
    self.user_entries = list(dict.fromkeys(self.user_entries))

    # Capture frozen snapshot for system prompt injection
    self._system_prompt_snapshot = {
        "memory": self._render_block("memory", self.memory_entries),
        "user": self._render_block("user", self.user_entries),
    }
```

**注入 system prompt 时始终返回冻结快照**，而非实时状态：

```python
def format_for_system_prompt(self, target: str) -> Optional[str]:
    """
    Return the frozen snapshot for system prompt injection.

    This returns the state captured at load_from_disk() time, NOT the live
    state. Mid-session writes do not affect this. This keeps the system
    prompt stable across all turns, preserving the prefix cache.

    Returns None if the snapshot is empty (no entries at load time).
    """
    block = self._system_prompt_snapshot.get(target, "")
    return block if block else None
```

**写入操作**支持 `add`、`replace`、`remove` 三种动作，均有文件锁保护并发安全：

```python
def add(self, target: str, content: str) -> Dict[str, Any]:
    """Append a new entry. Returns error if it would exceed the char limit."""
    content = content.strip()
    if not content:
        return {"success": False, "error": "Content cannot be empty."}

    # Scan for injection/exfiltration before accepting
    scan_error = _scan_memory_content(content)
    if scan_error:
        return {"success": False, "error": scan_error}

    with self._file_lock(self._path_for(target)):
        self._reload_target(target)
        entries = self._entries_for(target)
        limit = self._char_limit(target)

        # Reject exact duplicates
        if content in entries:
            return self._success_response(target, "Entry already exists (no duplicate added).")

        # Calculate what the new total would be
        new_entries = entries + [content]
        new_total = len(ENTRY_DELIMITER.join(new_entries))

        if new_total > limit:
            current = self._char_count(target)
            return {
                "success": False,
                "error": (
                    f"Memory at {current:,}/{limit:,} chars. "
                    f"Adding this entry ({len(content)} chars) would exceed the limit. "
                    f"Replace or remove existing entries first."
                ),
                "current_entries": entries,
                "usage": f"{current:,}/{limit:,}",
            }

        entries.append(content)
        self._set_entries(target, entries)
        self.save_to_disk(target)

    return self._success_response(target, "Entry added.")
```

**安全扫描**：所有写入内容在存储前都会检查注入/泄露模式：

```python
_MEMORY_THREAT_PATTERNS = [
    # Prompt injection
    (r'ignore\s+(previous|all|above|prior)\s+instructions', "prompt_injection"),
    (r'you\s+are\s+now\s+', "role_hijack"),
    (r'do\s+not\s+tell\s+the\s+user', "deception_hide"),
    (r'system\s+prompt\s+override', "sys_prompt_override"),
    # Exfiltration via curl/wget with secrets
    (r'curl\s+[^\n]*\$\{?\w*(KEY|TOKEN|SECRET|PASSWORD|CREDENTIAL|API)', "exfil_curl"),
    (r'wget\s+[^\n]*\$\{?\w*(KEY|TOKEN|SECRET|PASSWORD|CREDENTIAL|API)', "exfil_wget"),
    (r'cat\s+[^\n]*(\.env|credentials|\.netrc|\.pgpass|\.npmrc|\.pypirc)', "read_secrets"),
    # Persistence via shell rc
    (r'authorized_keys', "ssh_backdoor"),
    (r'\$HOME/\.ssh|\~/\.ssh', "ssh_access"),
    (r'\$HOME/\.hermes/\.env|\~/\.hermes/\.env', "hermes_env"),
]

def _scan_memory_content(content: str) -> Optional[str]:
    """Scan memory content for injection/exfil patterns. Returns error string if blocked."""
    for char in _INVISIBLE_CHARS:
        if char in content:
            return f"Blocked: content contains invisible unicode character U+{ord(char):04X} (possible injection)."

    for pattern, pid in _MEMORY_THREAT_PATTERNS:
        if re.search(pattern, content, re.IGNORECASE):
            return f"Blocked: content matches threat pattern '{pid}'. Memory entries are injected into the system prompt and must not contain injection or exfiltration payloads."

    return None
```

---

### 2.2 程序性记忆：Skills 技能系统

**文件位置**：`~/.hermes/skills/`

技能是 Agent 的程序性记忆——可复用的操作流程。与记忆（声明性的）不同，技能是**可执行的**。

**技能存储格式**（每个技能一个目录）：

```
~/.hermes/skills/
├── my-skill/
│   ├── SKILL.md              # 技能主体（YAML frontmatter + Markdown 指令）
│   ├── references/            # 引用文件：会话特定细节、API 文档摘录
│   │   └── topic.md
│   ├── templates/             # 模板文件：可复制修改的样板文件
│   │   └── config.yaml
│   ├── scripts/               # 脚本文件：可重复运行的自动化脚本
│   │   └── verify.sh
│   └── assets/                # 资源文件
└── another-skill/
    └── SKILL.md
```

**SKILL.md 格式**：

```yaml
---
name: skill-name
description: "Brief description of what this skill does"
metadata:
  hermes:
    tags: [tag1, tag2]
---
# Skill Title

Full instructions here — the agent loads this content and follows it
when the skill matches the current task.
```

**技能的来源**（`tools/skill_provenance.py`）：

| 来源 | 说明 | Curator 可管理？ |
|------|------|:---:|
| **内置**（bundled） | `skills/` 目录中预装的 25 类技能 | 否 |
| **Hub 安装**（hub-installed） | 从 agentskills.io 安装 | 否 |
| **用户创建**（user-created） | 前台对话中用户要求创建 | 否 |
| **Agent 创建**（agent-created） | 后台自改进审查中自动创建 | **是** |

来源追踪通过 Python `ContextVar` 实现（详见 [5.4 节](#54-来源追踪provenance)）。

---

### 2.3 会话历史：SQLite + FTS5

**文件位置**：`~/.hermes/state.db`

**核心类：`SessionDB`**（`hermes_state.py`）

使用 SQLite WAL 模式支持并发读写（网关多平台场景），Schema 版本号为 11。

**数据库 Schema**：

```python
SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,                    -- 'cli', 'telegram', 'discord', etc.
    user_id TEXT,
    model TEXT,
    system_prompt TEXT,
    parent_session_id TEXT,                  -- 父会话链（压缩分割、委派、分支）
    started_at REAL NOT NULL,
    ended_at REAL,
    message_count INTEGER DEFAULT 0,
    tool_call_count INTEGER DEFAULT 0,
    input_tokens INTEGER DEFAULT 0,
    output_tokens INTEGER DEFAULT 0,
    title TEXT,
    ...
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL REFERENCES sessions(id),
    role TEXT NOT NULL,                       -- 'user', 'assistant', 'tool'
    content TEXT,
    tool_call_id TEXT,
    tool_calls TEXT,
    tool_name TEXT,
    timestamp REAL NOT NULL,
    reasoning TEXT,
    reasoning_content TEXT,
    ...
);
"""
```

**FTS5 全文索引**：通过 SQLite 触发器自动同步消息表到全文索引：

```python
FTS_SQL = """
-- 标准分词器（适用于英文）
CREATE VIRTUAL TABLE IF NOT EXISTS messages_fts USING fts5(content);

CREATE TRIGGER IF NOT EXISTS messages_fts_insert AFTER INSERT ON messages BEGIN
    INSERT INTO messages_fts(rowid, content) VALUES (
        new.id,
        COALESCE(new.content, '') || ' ' || COALESCE(new.tool_name, '') || ' ' || COALESCE(new.tool_calls, '')
    );
END;
"""

# Trigram 分词器（专为 CJK 子串搜索设计）
FTS_TRIGRAM_SQL = """
CREATE VIRTUAL TABLE IF NOT EXISTS messages_fts_trigram USING fts5(
    content,
    tokenize='trigram'
);
"""
```

**会话搜索工具**（`tools/session_search_tool.py`）的完整流程：

```
1. FTS5 搜索 → 找到匹配消息，按相关性排序
2. 按会话分组 → 取 Top N 个唯一会话（默认 3 个）
3. 加载完整对话 → 截断到 ~100K 字符（以匹配位置为中心窗口）
4. 发送给辅助 LLM → 生成聚焦搜索查询的摘要
5. 返回摘要 + 元数据（日期、来源、模型）
```

截断策略（`_truncate_around_matches`）按优先级尝试：

```python
def _truncate_around_matches(full_text, query, max_chars=100_000):
    """
    Strategy (in priority order):
    1. Try to find the full query as a phrase (case-insensitive).
    2. If no phrase hit, look for positions where all query terms appear
       within a 200-char proximity window (co-occurrence).
    3. Fall back to individual term positions.
    """
```

---

## 3. 系统提示词组装

System Prompt 在会话开始时一次性构建，整个会话期间保持稳定。这是自学习系统正确运转的基石。

**核心方法：`_build_system_prompt`**（`run_agent.py` 第 4913 行）

```python
def _build_system_prompt(self, system_message: str = None) -> str:
    """
    Assemble the full system prompt from all layers.

    Called once per session (cached on self._cached_system_prompt) and only
    rebuilt after context compression events.
    """
    # Layers (in order):
    #   1. Agent identity — SOUL.md when available, else DEFAULT_AGENT_IDENTITY
    #   2. User / gateway system prompt (if provided)
    #   3. Persistent memory (frozen snapshot)
    #   4. Skills guidance (if skills tools are loaded)
    #   5. Context files (AGENTS.md, .cursorrules)
    #   6. Current date & time (frozen at build time)
    #   7. Platform-specific formatting hint
```

各层依次叠加：

```python
# 第 1 层：Agent 身份
if _soul_loaded:
    prompt_parts = [_soul_content]
else:
    prompt_parts = [DEFAULT_AGENT_IDENTITY]

# 工具引导（包含记忆/搜索/技能使用指导）
if "memory" in self.valid_tool_names:
    tool_guidance.append(MEMORY_GUIDANCE)
if "session_search" in self.valid_tool_names:
    tool_guidance.append(SESSION_SEARCH_GUIDANCE)
if "skill_manage" in self.valid_tool_names:
    tool_guidance.append(SKILLS_GUIDANCE)

# 第 3 层：冻结记忆快照
if self._memory_store:
    if self._memory_enabled:
        mem_block = self._memory_store.format_for_system_prompt("memory")
        if mem_block:
            prompt_parts.append(mem_block)
    if self._user_profile_enabled:
        user_block = self._memory_store.format_for_system_prompt("user")
        if user_block:
            prompt_parts.append(user_block)

# 外部记忆提供商（如 Honcho、Mem0 等）
if self._memory_manager:
    _ext_mem_block = self._memory_manager.build_system_prompt()
    if _ext_mem_block:
        prompt_parts.append(_ext_mem_block)

# 第 4 层：技能索引
has_skills_tools = any(name in self.valid_tool_names
                       for name in ['skills_list', 'skill_view', 'skill_manage'])
if has_skills_tools:
    skills_prompt = build_skills_system_prompt(
        available_tools=self.valid_tool_names,
        available_toolsets=avail_toolsets,
    )
    if skills_prompt:
        prompt_parts.append(skills_prompt)

# 第 5 层：上下文文件
if not self.skip_context_files:
    context_files_prompt = build_context_files_prompt(cwd=..., skip_soul=_soul_loaded)
    if context_files_prompt:
        prompt_parts.append(context_files_prompt)

# 最终拼接
return "\n\n".join(p.strip() for p in prompt_parts if p.strip())
```

**技能索引的构建**（`agent/prompt_builder.py` 第 718 行）：

使用两层缓存加速索引构建（进程内 LRU + 磁盘快照）：

```python
def build_skills_system_prompt(
    available_tools: "set[str] | None" = None,
    available_toolsets: "set[str] | None" = None,
) -> str:
    """Build a compact skill index for the system prompt.

    Two-layer cache:
      1. In-process LRU dict keyed by (skills_dir, tools, toolsets)
      2. Disk snapshot (.skills_prompt_snapshot.json) validated by
         mtime/size manifest — survives process restarts
    """
```

输出的索引格式——只包含名称和描述，实现**渐进式披露**（Progressive Disclosure）：

```
## Skills (mandatory)
Before replying, scan the skills below. If a skill matches or is even partially relevant
to your task, you MUST load it with skill_view(name) and follow its instructions.

<available_skills>
- **category-name/skill-name**: Brief description
- **debugging**: How to systematically debug issues...
</available_skills>
```

Agent 匹配到相关技能后，通过 `skill_view` 工具按需加载完整内容：

```python
# tools/skills_tool.py — 遥测包装器
def _skill_view_with_bump(args, **kw):
    name = args.get("name", "")
    result = skill_view(name, file_path=args.get("file_path"), task_id=kw.get("task_id"))
    # 成功加载后更新使用计数
    try:
        parsed = json.loads(result)
        if isinstance(parsed, dict) and parsed.get("success"):
            resolved = parsed.get("name") or name
            if resolved:
                from tools.skill_usage import bump_use, bump_view
                bump_view(str(resolved))
                bump_use(str(resolved))
    except Exception:
        pass
    return result
```

---

## 4. 前台即时学习路径

前台 Agent 在执行任务的过程中，可以主动使用工具即时写入记忆和技能。

### 4.1 记忆工具：memory

Agent 通过 `memory` 工具管理声明性记忆，支持 `add`、`replace`、`remove`、`read` 四种操作。

工具 schema 描述中嵌入了行为指导，告知 Agent 何时应该主动保存：

```python
# tools/memory_tool.py 中的工具注册
# Schema description 指导 Agent：
# - 用户表达偏好、风格要求时 → 保存到 USER.md
# - 发现环境事实、工具特性、项目约定时 → 保存到 MEMORY.md
# - 使用 substring 匹配进行 replace/remove
# - 内容会被注入 system prompt，必须安全
```

### 4.2 技能管理工具：skill_manage

**工具定义**（`tools/skill_manager_tool.py` 第 795 行）：

```python
SKILL_MANAGE_SCHEMA = {
    "name": "skill_manage",
    "description": (
        "Manage skills (create, update, delete). Skills are your procedural "
        "memory — reusable approaches for recurring task types. "
        "When using a skill and finding it outdated, incomplete, or wrong, "
        "patch it immediately with skill_manage(action='patch') -- don't wait to be asked."
    ),
    "parameters": {
        "type": "object",
        "properties": {
            "action": {
                "type": "string",
                "enum": ["create", "patch", "edit", "delete",
                         "write_file", "remove_file"],
            },
            "name": {"type": "string", "description": "Skill name"},
            "content": {"type": "string", "description": "Full SKILL.md content (for create/edit)"},
            "old_string": {"type": "string", "description": "Text to find (for patch)"},
            "new_string": {"type": "string", "description": "Replacement text (for patch)"},
            "replace_all": {"type": "boolean"},
            "category": {"type": "string"},
            "file_path": {"type": "string", "description": "Supporting file path (references/xxx)"},
            "file_content": {"type": "string"},
        },
        "required": ["action", "name"],
    },
}
```

#### 创建技能：`_create_skill`

```python
def _create_skill(name: str, content: str, category: str = None) -> Dict[str, Any]:
    """Create a new user skill with SKILL.md content."""
    # 1. 验证名称（小写、文件系统安全、长度 ≤ 64）
    err = _validate_name(name)
    if err:
        return {"success": False, "error": err}

    # 2. 验证 YAML frontmatter（必须有 name 和 description）
    err = _validate_frontmatter(content)
    if err:
        return {"success": False, "error": err}

    # 3. 检查重名
    existing = _find_skill(name)
    if existing:
        return {"success": False, "error": f"A skill named '{name}' already exists."}

    # 4. 创建目录并写入 SKILL.md
    skill_dir = _resolve_skill_dir(name, category)
    skill_dir.mkdir(parents=True, exist_ok=True)
    skill_md = skill_dir / "SKILL.md"
    _atomic_write_text(skill_md, content)

    # 5. 安全扫描（可选，默认关闭）
    scan_error = _security_scan_skill(skill_dir)
    if scan_error:
        shutil.rmtree(skill_dir, ignore_errors=True)
        return {"success": False, "error": scan_error}

    return {
        "success": True,
        "message": f"Skill '{name}' created.",
        "path": str(skill_dir.relative_to(SKILLS_DIR)),
        "hint": "To add reference files, use skill_manage(action='write_file', ...)"
    }
```

#### 修补技能：`_patch_skill`

使用模糊匹配引擎（`tools/fuzzy_match.py`）进行精准查找替换：

```python
def _patch_skill(
    name: str, old_string: str, new_string: str,
    file_path: str = None, replace_all: bool = False,
) -> Dict[str, Any]:
    """Targeted find-and-replace within a skill file."""
    existing = _find_skill(name)
    skill_dir = existing["path"]

    # 确定目标文件（默认 SKILL.md，也可指定支持文件）
    if file_path:
        target, err = _resolve_skill_target(skill_dir, file_path)
    else:
        target = skill_dir / "SKILL.md"

    content = target.read_text(encoding="utf-8")

    # 模糊匹配查找替换
    from tools.fuzzy_match import fuzzy_find_and_replace
    new_content, match_count, _strategy, match_error = fuzzy_find_and_replace(
        content, old_string, new_string, replace_all
    )

    if match_error:
        return {"success": False, "error": match_error, "file_preview": content[:500]}

    # 验证 frontmatter 完整性
    if not file_path:
        err = _validate_frontmatter(new_content)
        if err:
            return {"success": False, "error": f"Patch would break SKILL.md structure: {err}"}

    # 保存原始内容用于回滚
    original_content = content
    _atomic_write_text(target, new_content)

    # 安全扫描失败则回滚
    scan_error = _security_scan_skill(skill_dir)
    if scan_error:
        _atomic_write_text(target, original_content)  # 回滚
        return {"success": False, "error": scan_error}

    return {"success": True, "message": f"Patched SKILL.md in skill '{name}' ({match_count} replacement(s))."}
```

#### 操作完成后的处理

技能操作成功后，会清缓存并更新遥测数据：

```python
# tools/skill_manager_tool.py 第 763-786 行
if result.get("success"):
    # 1. 清除技能索引缓存
    from agent.prompt_builder import clear_skills_system_prompt_cache
    clear_skills_system_prompt_cache(clear_snapshot=True)

    # 2. 更新遥测数据 + 标记来源
    from tools.skill_usage import bump_patch, forget, mark_agent_created
    from tools.skill_provenance import is_background_review

    if action == "create":
        if is_background_review():
            mark_agent_created(name)  # 后台创建 → 标记为 agent-created
    elif action in ("patch", "edit", "write_file", "remove_file"):
        bump_patch(name)             # 更新修补计数
    elif action == "delete":
        forget(name)                 # 清除遥测记录
```

---

## 5. 后台自改进审查

后台审查是自学习循环的核心引擎。每当用户对话积累到一定量，Agent 会在回复用户后自动 fork 一个后台 Agent 审查对话内容。

### 5.1 触发机制与计数器

两个独立的计数器分别追踪记忆和技能的审查需求：

**记忆审查计数器**（`run_agent.py` 第 10732 行）：

```python
_should_review_memory = False
if (self._memory_nudge_interval > 0
        and "memory" in self.valid_tool_names
        and self._memory_store):
    self._turns_since_memory += 1
    if self._turns_since_memory >= self._memory_nudge_interval:
        _should_review_memory = True
        self._turns_since_memory = 0
```

**技能审查计数器**（`run_agent.py` 第 14122 行）：

```python
_should_review_skills = False
if (self._skill_nudge_interval > 0
        and self._iters_since_skill >= self._skill_nudge_interval
        and "skill_manage" in self.valid_tool_names):
    _should_review_skills = True
    self._iters_since_skill = 0
```

**在回复用户后触发后台审查**（`run_agent.py` 第 14138 行）：

```python
if final_response and not interrupted and (_should_review_memory or _should_review_skills):
    try:
        self._spawn_background_review(
            messages_snapshot=list(messages),
            review_memory=_should_review_memory,
            review_skills=_should_review_skills,
        )
    except Exception:
        pass  # Background review is best-effort
```

> 默认阈值：记忆 10 轮对话、技能 10 次工具调用迭代。只要主动使用过 `memory()` 或 `skill_manage()` 工具，对应计数器就会归零。

### 5.2 审查提示词

三种审查提示词对应不同的触发组合：

#### 纯记忆审查 `_MEMORY_REVIEW_PROMPT`

```python
_MEMORY_REVIEW_PROMPT = (
    "Review the conversation above and consider saving to memory if appropriate.\n\n"
    "Focus on:\n"
    "1. Has the user revealed things about themselves — their persona, desires, "
    "preferences, or personal details worth remembering?\n"
    "2. Has the user expressed expectations about how you should behave, their work "
    "style, or ways they want you to operate?\n\n"
    "If something stands out, save it using the memory tool. "
    "If nothing is worth saving, just say 'Nothing to save.' and stop."
)
```

#### 纯技能审查 `_SKILL_REVIEW_PROMPT`

这是最长的提示词（约 75 行），包含详细的审查信号和优先级指引：

```python
_SKILL_REVIEW_PROMPT = (
    "Review the conversation above and update the skill library. Be "
    "ACTIVE — most sessions produce at least one skill update, even if "
    "small. A pass that does nothing is a missed learning opportunity, "
    "not a neutral outcome.\n\n"

    "Target shape of the library: CLASS-LEVEL skills, each with a rich "
    "SKILL.md and a `references/` directory for session-specific detail. "
    "Not a long flat list of narrow one-session-one-skill entries.\n\n"

    # 审查信号（任一条触发行动）
    "Signals to look for (any one of these warrants action):\n"
    "  - User corrected your style, tone, format, legibility, or verbosity.\n"
    "    Frustration signals like 'stop doing X', 'this is too verbose', "
    "'don't format like this' are FIRST-CLASS skill signals.\n"
    "  - User corrected your workflow, approach, or sequence of steps.\n"
    "  - Non-trivial technique, fix, workaround, debugging path emerged.\n"
    "  - A loaded skill turned out to be wrong, missing a step, or outdated.\n\n"

    # 优先级（从高到低）
    "Preference order — prefer the earliest action that fits:\n"
    "  1. UPDATE A CURRENTLY-LOADED SKILL.\n"
    "  2. UPDATE AN EXISTING UMBRELLA (via skills_list + skill_view).\n"
    "  3. ADD A SUPPORT FILE under an existing umbrella.\n"
    "     - references/<topic>.md — session-specific detail\n"
    "     - templates/<name>.<ext> — starter files\n"
    "     - scripts/<name>.<ext> — re-runnable actions\n"
    "  4. CREATE A NEW CLASS-LEVEL UMBRELLA SKILL (only when nothing exists).\n\n"

    # 用户偏好嵌入
    "User-preference embedding (important): when the user expressed a "
    "style/format/workflow preference, the update belongs in the SKILL.md "
    "body, not just in memory. Memory captures 'who the user is'; "
    "skills capture 'how to do this class of task for this user'.\n\n"

    "'Nothing to save.' is a real option but should NOT be the default."
)
```

#### 联合审查 `_COMBINED_PROMPT`

记忆 + 技能的联合提示词，两者都有信号时使用。逻辑是上述两者的合体。

### 5.3 Fork Agent 机制

**`_spawn_background_review`**（`run_agent.py` 第 3602 行）是整个后台审查的入口：

```python
def _spawn_background_review(
    self,
    messages_snapshot: List[Dict],
    review_memory: bool = False,
    review_skills: bool = False,
) -> None:
    """Spawn a background thread to review the conversation for memory/skill saves.

    Creates a full AIAgent fork with the same model, tools, and context as the
    main session. The review prompt is appended as the next user turn in the
    forked conversation. Writes directly to the shared memory/skill stores.
    Never modifies the main conversation history or produces user-visible output.
    """
```

**选择审查提示词**：

```python
    # Pick the right prompt based on which triggers fired
    if review_memory and review_skills:
        prompt = self._COMBINED_REVIEW_PROMPT
    elif review_memory:
        prompt = self._MEMORY_REVIEW_PROMPT
    else:
        prompt = self._SKILL_REVIEW_PROMPT
```

**在后台线程中运行 forked Agent**：

```python
    def _run_review():
        # 自动拒绝危险命令
        def _bg_review_auto_deny(command, description, **kwargs):
            logger.warning(
                "Background review auto-denied dangerous command: %s (%s)",
                command, description,
            )
            return "deny"

        try:
            _set_approval_callback(_bg_review_auto_deny)
        except Exception:
            pass

        review_agent = None
        try:
            # 创建 forked AIAgent — 使用相同模型/凭证
            review_agent = AIAgent(
                model=self.model,
                max_iterations=16,              # 限制迭代次数
                quiet_mode=True,                # 静默模式
                platform=self.platform,
                provider=self.provider,
                base_url=...,
                api_key=...,
                credential_pool=...,
                parent_session_id=self.session_id,
                enabled_toolsets=["memory", "skills"],  # 只启用记忆和技能工具
            )

            # 关键：标记来源为后台审查
            review_agent._memory_write_origin = "background_review"
            review_agent._memory_write_context = "background_review"

            # 共享同一个 MemoryStore 实例
            review_agent._memory_store = self._memory_store
            review_agent._memory_enabled = self._memory_enabled

            # 关闭 nudge（审查 Agent 不应再触发审查）
            review_agent._memory_nudge_interval = 0
            review_agent._skill_nudge_interval = 0

            # 使用对话快照 + 审查提示词运行
            review_agent.run_conversation(
                user_message=prompt,
                conversation_history=messages_snapshot,
            )

            # 汇总审查动作
            actions = self._summarize_background_review_actions(
                getattr(review_agent, "_session_messages", []),
                messages_snapshot,
            )

            # 向用户展示简要摘要
            if actions:
                summary = " · ".join(dict.fromkeys(actions))
                self._safe_print(f"  💾 Self-improvement review: {summary}")

        except Exception as e:
            logger.warning("Background memory/skill review failed: %s", e)
        finally:
            if review_agent is not None:
                review_agent.shutdown_memory_provider()
                review_agent.close()

    # 启动守护线程
    t = threading.Thread(target=_run_review, daemon=True, name="bg-review")
    t.start()
```

**关键设计点**：

1. **Fork 使用相同的模型和凭证**——确保审查质量
2. **只启用 `memory` 和 `skills` 两个 toolset**——限制 fork 的能力范围
3. **共享 `MemoryStore` 实例**——写入直接对主会话可见
4. **自动拒绝危险命令**——防止 fork 执行 `rm` 等破坏性操作
5. **`max_iterations=16`**——限制工具调用轮次，防止审查循环失控
6. **守护线程**——主进程退出时自动终止

### 5.4 来源追踪：Provenance

**完整文件**：`tools/skill_provenance.py`

```python
"""Skill write-origin provenance — ContextVar for distinguishing agent-created
skill writes from foreground user-directed writes.

The curator only consolidates/prunes skills it autonomously created via the
background self-improvement review fork. Skills a user asks a foreground
agent to write belong to the user and must never be auto-curated.
"""

import contextvars

_write_origin: contextvars.ContextVar[str] = contextvars.ContextVar(
    "skill_write_origin",
    default="foreground",
)

BACKGROUND_REVIEW = "background_review"


def set_current_write_origin(origin: str) -> contextvars.Token[str]:
    """Bind the active write origin to the current context."""
    return _write_origin.set(origin or "foreground")


def reset_current_write_origin(token: contextvars.Token[str]) -> None:
    """Restore the prior write origin context."""
    _write_origin.reset(token)


def get_current_write_origin() -> str:
    """Return the active write origin.

    Default: "foreground" — regular agent, CLI, gateway, cron, or subagent.
    "background_review" — the self-improvement review fork.
    """
    return _write_origin.get()


def is_background_review() -> bool:
    """True iff the current write origin is the background review fork."""
    return get_current_write_origin() == BACKGROUND_REVIEW
```

**绑定时机**：在 `run_conversation` 的入口处（`run_agent.py` 第 10619 行）：

```python
from tools.skill_provenance import set_current_write_origin
set_current_write_origin(getattr(self, "_memory_write_origin", "assistant_tool"))
```

**效果**：

- 前台 Agent 的 `_memory_write_origin` = `"assistant_tool"` → `is_background_review()` 返回 `False` → 创建的技能**不标记**为 agent-created
- 后台 fork 的 `_memory_write_origin` = `"background_review"` → `is_background_review()` 返回 `True` → 创建的技能**标记**为 agent-created → 可被 Curator 管理

---

## 6. Curator 定期维护

Curator 是一个空闲触发的定期维护系统，负责技能库的长期健康。

### 6.1 自动状态转换

**`apply_automatic_transitions`**（`agent/curator.py` 第 255 行）：

```python
DEFAULT_STALE_AFTER_DAYS = 30     # 30 天未用 → stale
DEFAULT_ARCHIVE_AFTER_DAYS = 90   # 90 天未用 → archived

def apply_automatic_transitions(now: Optional[datetime] = None) -> Dict[str, int]:
    """Walk every agent-created skill and move active/stale/archived based on
    the latest real activity timestamp. Pinned skills are never touched."""
    from tools import skill_usage as _u

    if now is None:
        now = datetime.now(timezone.utc)
    stale_cutoff = now - timedelta(days=get_stale_after_days())
    archive_cutoff = now - timedelta(days=get_archive_after_days())

    counts = {"marked_stale": 0, "archived": 0, "reactivated": 0, "checked": 0}

    for row in _u.agent_created_report():
        counts["checked"] += 1
        name = row["name"]

        # Pinned 技能永远不受影响
        if row.get("pinned"):
            continue

        last_activity = _parse_iso(row.get("last_activity_at"))
        anchor = last_activity or _parse_iso(row.get("created_at")) or now

        current = row.get("state", _u.STATE_ACTIVE)

        # 90 天未用 → 归档
        if anchor <= archive_cutoff and current != _u.STATE_ARCHIVED:
            ok, _msg = _u.archive_skill(name)
            if ok:
                counts["archived"] += 1

        # 30 天未用 → 标记为 stale
        elif anchor <= stale_cutoff and current == _u.STATE_ACTIVE:
            _u.set_state(name, _u.STATE_STALE)
            counts["marked_stale"] += 1

        # 重新活跃 → 恢复为 active
        elif anchor > stale_cutoff and current == _u.STATE_STALE:
            _u.set_state(name, _u.STATE_ACTIVE)
            counts["reactivated"] += 1

    return counts
```

> **只归档，永不删除**。归档目录为 `~/.hermes/skills/.archive/`，可恢复。

### 6.2 Curator 审查提示词

Curator 的审查提示词（`agent/curator.py` 第 329 行）聚焦于**伞形构建**（Umbrella Building）：

```python
CURATOR_REVIEW_PROMPT = (
    "You are running as Hermes' background skill CURATOR. This is an "
    "UMBRELLA-BUILDING consolidation pass, not a passive audit and not a "
    "duplicate-finder.\n\n"

    "The goal of the skill collection is a LIBRARY OF CLASS-LEVEL "
    "INSTRUCTIONS AND EXPERIENTIAL KNOWLEDGE. A collection of hundreds of "
    "narrow skills where each one captures one session's specific bug is "
    "a FAILURE of the library — not a feature.\n\n"

    # 硬性规则
    "Hard rules — do not violate:\n"
    "1. DO NOT touch bundled or hub-installed skills.\n"
    "2. DO NOT delete any skill. Archiving is the maximum destructive action.\n"
    "3. DO NOT touch skills shown as pinned=yes.\n"
    "4. DO NOT use usage counters as a reason to skip consolidation.\n"
    "5. DO NOT reject consolidation on the grounds that 'each skill has "
    "a distinct trigger'.\n\n"

    # 工作流程
    "How to work — not optional:\n"
    "1. Scan the full candidate list. Identify PREFIX CLUSTERS.\n"
    "2. For each cluster with 2+ members, ask 'what is the UMBRELLA CLASS?'\n"
    "3. Three ways to consolidate:\n"
    "   a. MERGE INTO EXISTING UMBRELLA — patch to absorb narrower siblings.\n"
    "   b. CREATE A NEW UMBRELLA SKILL.md — then absorb siblings.\n"
    "   c. DEMOTE TO REFERENCES/TEMPLATES/SCRIPTS — narrow content becomes a "
    "support file under the umbrella.\n"
)
```

### 6.3 Curator 运行机制

**入口：`maybe_run_curator`**（`agent/curator.py` 第 1656 行）：

```python
def maybe_run_curator(
    *,
    idle_for_seconds: Optional[float] = None,
    on_summary: Optional[Callable[[str], None]] = None,
) -> Optional[Dict[str, Any]]:
    """Best-effort: run a curator pass if all gates pass."""
    try:
        if not should_run_now():
            return None
        if idle_for_seconds is not None:
            min_idle_s = get_min_idle_hours() * 3600.0
            if idle_for_seconds < min_idle_s:
                return None
        return run_curator_review(on_summary=on_summary)
    except Exception as e:
        logger.debug("maybe_run_curator failed: %s", e, exc_info=True)
        return None
```

**触发条件**（必须全部满足）：

| 条件 | 默认值 |
|------|--------|
| Curator 已启用 | 默认启用 |
| 未暂停 | `paused=False` |
| 距上次运行 ≥ 7 天 | `DEFAULT_INTERVAL_HOURS = 24 * 7` |
| Agent 空闲 ≥ 2 小时 | `DEFAULT_MIN_IDLE_HOURS = 2` |

**运行流程**：

```
1. apply_automatic_transitions()   → 自动状态转换（stale/archive/reactivate）
2. 收集 agent-created 技能列表
3. Fork 一个 AIAgent，传入 CURATOR_REVIEW_PROMPT + 技能列表
4. Fork 使用 auxiliary model（可以是更便宜的模型）
5. Fork 执行合并/归档/降级操作
6. 写入运行报告到 ~/.hermes/logs/curator/
7. 更新 .curator_state（last_run_at, run_count, summary）
```

**Curator 状态持久化**：

```python
def _default_state() -> Dict[str, Any]:
    return {
        "last_run_at": None,
        "last_run_duration_seconds": None,
        "last_run_summary": None,
        "last_report_path": None,
        "paused": False,
        "run_count": 0,
    }
```

---

## 7. 完整数据流图

```
╔══════════════════════════════════════════════════════════════════════╗
║                        会话开始 (Session Start)                      ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  _build_system_prompt() 组装各层:                                     ║
║  ┌─────────────────────────────────────────────┐                    ║
║  │ ① Agent 身份 (SOUL.md / DEFAULT)             │                    ║
║  │ ② 工具引导 (memory/session_search/skills)    │                    ║
║  │ ③ 冻结记忆快照 (MEMORY.md + USER.md)   ←🔒   │                    ║
║  │ ④ 外部记忆提供商                             │                    ║
║  │ ⑤ 技能索引 (名称+描述)                 ←🔒   │                    ║
║  │ ⑥ 上下文文件 (AGENTS.md, .cursorrules)       │                    ║
║  │ ⑦ 时间戳 + 平台提示                          │                    ║
║  └─────────────────────────────────────────────┘                    ║
║  🔒 = 会话内冻结，不再变更                                             ║
║                                                                      ║
║  set_current_write_origin("assistant_tool")                          ║
╚══════════════════════════════════════════════════════════════════════╝
                                    │
                                    ▼
╔══════════════════════════════════════════════════════════════════════╗
║                    用户对话轮次 (User Turn)                           ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  1. 收到用户消息                                                      ║
║  2. 扫描技能索引，匹配到相关技能                                        ║
║  3. skill_view() 按需加载完整技能内容                                  ║
║  4. 执行工具调用循环                                                   ║
║     └── _iters_since_skill += 1（每次工具迭代）                        ║
║     └── _turns_since_memory += 1（每次对话轮次）                       ║
║                                                                      ║
║  ┌──────────── 即时写入路径 ────────────┐                            ║
║  │                                       │                            ║
║  │  memory(action="add")                 │                            ║
║  │    → 直接写入 MEMORY.md / USER.md     │                            ║
║  │    → 立即落盘 ✅                      │                            ║
║  │    → 当前 system prompt 不变 🔒       │                            ║
║  │    → 下次会话生效 🔄                  │                            ║
║  │                                       │                            ║
║  │  skill_manage(action="patch")         │                            ║
║  │    → 模糊匹配 + 替换                  │                            ║
║  │    → 立即落盘 ✅                      │                            ║
║  │    → 清除技能索引缓存 🧹              │                            ║
║  │    → 不标记为 agent-created           │                            ║
║  │    → 计数器归零                        │                            ║
║  └───────────────────────────────────────┘                            ║
╚══════════════════════════════════════════════════════════════════════╝
                                    │
                                    ▼  回复用户后
╔══════════════════════════════════════════════════════════════════════╗
║                 后台自改进 (Background Review)                        ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  触发条件: _turns_since_memory ≥ 10 或 _iters_since_skill ≥ 10       ║
║                                                                      ║
║  _spawn_background_review():                                         ║
║  ┌──────────────────────────────────────────────────────┐           ║
║  │ Thread(daemon=True, name="bg-review")                 │           ║
║  │                                                       │           ║
║  │  1. 选择提示词:                                       │           ║
║  │     记忆+技能 → _COMBINED_REVIEW_PROMPT               │           ║
║  │     仅记忆   → _MEMORY_REVIEW_PROMPT                  │           ║
║  │     仅技能   → _SKILL_REVIEW_PROMPT                   │           ║
║  │                                                       │           ║
║  │  2. Fork AIAgent:                                     │           ║
║  │     - 相同模型/凭证                                   │           ║
║  │     - enabled_toolsets=["memory", "skills"]           │           ║
║  │     - max_iterations=16                               │           ║
║  │     - _memory_write_origin = "background_review" ⭐   │           ║
║  │     - 共享 MemoryStore 实例                           │           ║
║  │     - 自动拒绝危险命令                                │           ║
║  │                                                       │           ║
║  │  3. 运行: review_agent.run_conversation(prompt, hist) │           ║
║  │                                                       │           ║
║  │  4. 动作优先级（技能维度）:                             │           ║
║  │     ① 修补已加载技能                                   │           ║
║  │     ② 更新已有伞形技能                                 │           ║
║  │     ③ 添加支持文件 (references/templates/scripts)     │           ║
║  │     ④ 创建新的伞形技能                                 │           ║
║  │                                                       │           ║
║  │  5. 创建的技能标记为 agent-created ⭐                  │           ║
║  │     → 可被 Curator 管理                               │           ║
║  │                                                       │           ║
║  │  6. 展示摘要: "💾 Self-improvement review: ..."        │           ║
║  └──────────────────────────────────────────────────────┘           ║
╚══════════════════════════════════════════════════════════════════════╝
                                    │
                                    ▼  空闲时
╔══════════════════════════════════════════════════════════════════════╗
║                 Curator 定期维护 (Periodic Curator)                   ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  触发条件（全部满足）:                                                 ║
║  ✓ curator.enabled = true（默认）                                     ║
║  ✓ paused = false                                                    ║
║  ✓ 距上次运行 ≥ 7 天                                                  ║
║  ✓ Agent 空闲 ≥ 2 小时                                               ║
║                                                                      ║
║  ┌─── Phase 1: 自动状态转换 ──────────────────────┐                  ║
║  │ apply_automatic_transitions()                   │                  ║
║  │                                                  │                  ║
║  │ 30 天未用 → stale (跳过 pinned)                  │                  ║
║  │ 90 天未用 → archived (跳过 pinned)               │                  ║
║  │ 重新活跃 → active                                │                  ║
║  │                                                  │                  ║
║  │ ⚠️ 永不删除，只归档到 .archive/                    │                  ║
║  └──────────────────────────────────────────────────┘                  ║
║                          │                                           ║
║                          ▼                                           ║
║  ┌─── Phase 2: 伞形构建审查 ──────────────────────┐                  ║
║  │ Fork AIAgent + CURATOR_REVIEW_PROMPT            │                  ║
║  │                                                  │                  ║
║  │ 只处理 agent-created 技能                        │                  ║
║  │                                                  │                  ║
║  │ 1. 识别前缀簇 (prefix clusters)                  │                  ║
║  │ 2. 合并为伞形技能:                               │                  ║
║  │    a. 合入已有伞形                                │                  ║
║  │    b. 创建新伞形                                  │                  ║
║  │    c. 降级为 references/templates/scripts         │                  ║
║  │ 3. 归档被吸收的窄技能                             │                  ║
║  └──────────────────────────────────────────────────┘                  ║
║                          │                                           ║
║                          ▼                                           ║
║  ┌─── Phase 3: 报告 ─────────────────────────────┐                  ║
║  │ 更新 .curator_state                             │                  ║
║  │ 写入 ~/.hermes/logs/curator/<timestamp>.md      │                  ║
║  └──────────────────────────────────────────────────┘                  ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 8. 关键设计原则

### 8.1 冻结快照模式（Frozen Snapshot）

记忆和技能索引在会话开始时一次性加载并冻结。后续写入立即落盘（durable），但不更新当前会话的 system prompt。

**为什么**：Anthropic 的 prefix caching 要求 system prompt 在整个会话中保持稳定。如果每次写入记忆都修改 system prompt，缓存会反复失效，导致重传整个 prompt，显著增加延迟和成本。

**效果**：新的记忆和技能变更在**下一次会话**中才对 Agent 可见。当前会话的工具响应会反映实时状态（工具调用读写的是 live state），但注入 system prompt 的始终是快照。

### 8.2 后台非阻塞

所有自改进操作在守护线程中运行，**永远不会阻塞用户**。

- 回复用户 → 启动后台审查线程 → 立即返回
- 后台线程通过 `contextlib.redirect_stdout(devnull)` 抑制输出
- 失败只记录 `logger.warning`，不影响前台对话
- 守护线程确保主进程退出时自动终止

### 8.3 来源分离（Provenance Separation）

通过 `ContextVar` 区分技能的创建来源：

```python
# 前台 Agent
set_current_write_origin("assistant_tool")    # 用户/前台创建

# 后台 Fork
review_agent._memory_write_origin = "background_review"  # Agent 自动创建
```

**效果**：
- 用户明确要求创建的技能 → **永远不被 Curator 自动管理**
- Agent 后台自动创建的技能 → 可被 Curator 归档/合并/降级
- 内置/Hub 安装的技能 → 完全不可修改

### 8.4 分层持久化

```
声明性事实  →  MEMORY.md / USER.md    →  容量有限（2.2K / 1.4K chars）
程序性知识  →  SKILL.md + 支持文件     →  可扩展（references/templates/scripts）
对话历史    →  SQLite FTS5             →  无限量，全文搜索
```

三层各有分工，互补而非冗余：
- **记忆**是"我是谁、用户是谁"
- **技能**是"怎么做事"
- **历史**是"做过什么"

### 8.5 优雅降级

每一个计数器、后台审查、Curator 运行都是 best-effort：

```python
try:
    self._spawn_background_review(...)
except Exception:
    pass  # Background review is best-effort
```

失败只记录 DEBUG 级日志，**永远不会中断用户对话**。

---

## 9. 关键文件索引

| 文件 | 关键内容 | 代码行 |
|------|---------|--------|
| `run_agent.py` | `_build_system_prompt()` | ~4913 |
| `run_agent.py` | `_MEMORY_REVIEW_PROMPT` | 3396-3405 |
| `run_agent.py` | `_SKILL_REVIEW_PROMPT` | 3407-3481 |
| `run_agent.py` | `_COMBINED_REVIEW_PROMPT` | 3483-3537 |
| `run_agent.py` | `_spawn_background_review()` | 3602-3744 |
| `run_agent.py` | 记忆审查计数器 | 10732-10739 |
| `run_agent.py` | 技能审查计数器 | 14122-14127 |
| `run_agent.py` | 后台审查触发 | 14138-14146 |
| `run_agent.py` | Provenance 绑定 | 10619 |
| `tools/memory_tool.py` | `MemoryStore` 类 | 全文件 |
| `tools/skill_manager_tool.py` | `_create_skill()` | 371-425 |
| `tools/skill_manager_tool.py` | `_patch_skill()` | 461-552 |
| `tools/skill_manager_tool.py` | 工具 Schema + 注册 | 795-929 |
| `tools/skill_manager_tool.py` | 操作后处理（缓存/遥测/来源） | 763-786 |
| `tools/skill_provenance.py` | `ContextVar` 来源追踪 | 全文件（79行） |
| `tools/skills_tool.py` | `skill_view()` | 849-1404 |
| `tools/skills_tool.py` | 遥测包装器 | 1500-1522 |
| `tools/session_search_tool.py` | FTS5 搜索 + 截断 + 摘要 | 全文件 |
| `agent/prompt_builder.py` | `build_skills_system_prompt()` | 718-949 |
| `agent/curator.py` | `apply_automatic_transitions()` | 255-295 |
| `agent/curator.py` | `CURATOR_REVIEW_PROMPT` | 329-444 |
| `agent/curator.py` | `maybe_run_curator()` | 1656-1674 |
| `agent/curator.py` | `run_curator_review()` | 1278-1447 |
| `agent/memory_manager.py` | `MemoryManager` 编排器 | 全文件 |
| `hermes_state.py` | `SessionDB` + FTS5 Schema | 全文件 |
