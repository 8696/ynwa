# Hermes Agent 自学习循环机制深度解析

> **本文基于 Hermes Agent v0.20.0**（2026.8.3 发布，源码 commit `88ab589f6`）
>
> 所有路径、行号、类名均在 `~/.hermes/hermes-agent/` 源码中核实；行号标注为「约 N 行」以容忍小幅漂移。前版写于 v0.12.0（2026-05），本文按 v0.20.0 的真实结构全面重写。

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
  - [5.1 触发机制](#51-触发机制)
  - [5.2 审查提示词](#52-审查提示词)
  - [5.3 Fork Agent 机制](#53-fork-agent-机制)
  - [5.4 来源追踪：Provenance](#54-来源追踪provenance)
- [6. Curator 定期维护](#6-curator-定期维护)
  - [6.1 自动状态转换](#61-自动状态转换)
  - [6.2 Curator 审查提示词](#62-curator-审查提示词)
  - [6.3 运行机制](#63-运行机制)
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

三层各自分工：
- **记忆**是"我是谁、用户是谁"——声明性事实
- **技能**是"怎么做事"——程序性知识
- **历史**是"做过什么"——完整对话记录

**v0.20.0 的结构变化**：前版引用的大量 `run_agent.py` 行号已失效——v0.20 把实现拆到了 `agent/` 子模块（142 个文件）。后台审查逻辑搬到 `agent/background_review.py`，系统提示词组装搬到 `agent/system_prompt.py`，Curator 搬到 `agent/curator.py`。下面逐一更新。

---

## 2. 三层持久化存储

### 2.1 声明性记忆：MEMORY.md / USER.md

**文件位置**：`~/.hermes/memories/`

Agent 拥有两个独立的记忆文件，各有字符数上限（字符而非 token，因为字符计数与模型无关）：

| 文件 | 用途 | 默认字符上限 |
|---|---|---|
| `MEMORY.md` | Agent 的个人笔记：环境事实、项目约定、工具特性、经验教训 | 2,200 |
| `USER.md` | 对用户的认知：偏好、沟通风格、期望、工作习惯 | 1,375 |

字符上限可在 `config.yaml` 里改：

```python
# agent/agent_init.py:1717
memory_char_limit=mem_config.get("memory_char_limit", 2200),
user_char_limit=mem_config.get("user_char_limit", 1375),
```

**条目分隔符**：使用 `§`（section sign）字符分隔多条目。

**核心类：`MemoryStore`**（`tools/memory_tool.py:153`）

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
        # Frozen snapshot for system prompt — set once at load_from_disk()
        self._system_prompt_snapshot: Dict[str, str] = {"memory": "", "user": ""}
        # Per-turn counter of failed at-capacity consolidation attempts
        self._consolidation_failures = 0
```

#### 冻结快照（Frozen Snapshot）

会话开始时一次性加载并冻结，后续写入立即落盘但不更新当前 system prompt：

```python
# tools/memory_tool.py:237 load_from_disk()
def load_from_disk(self):
    mem_dir = get_memory_dir()
    mem_dir.mkdir(parents=True, exist_ok=True)

    self.memory_entries = self._read_file(mem_dir / "MEMORY.md")
    self.user_entries = self._read_file(mem_dir / "USER.md")

    # Deduplicate entries (preserves order, keeps first occurrence)
    self.memory_entries = list(dict.fromkeys(self.memory_entries))
    self.user_entries = list(dict.fromkeys(self.user_entries))

    # Sanitize entries for the snapshot — 防注入
    sanitized_memory = self._sanitize_entries_for_snapshot(self.memory_entries, "MEMORY.md")
    sanitized_user = self._sanitize_entries_for_snapshot(self.user_entries, "USER.md")

    # Capture frozen snapshot
    self._system_prompt_snapshot = {
        "memory": self._render_block("memory", sanitized_memory),
        "user": self._render_block("user", sanitized_user),
    }
```

注入 system prompt 时始终返回冻结快照：

```python
def format_for_system_prompt(self, target: str) -> Optional[str]:
    block = self._system_prompt_snapshot.get(target, "")
    return block if block else None
```

#### 写入操作

支持 `add`、`replace`、`remove` 三种动作，以及一个 v0.20 新增的 `apply_batch`（原子批处理）：

```python
# tools/memory_tool.py:390
def add(self, target: str, content: str) -> Dict[str, Any]:
    content = content.strip()
    if not content:
        return {"success": False, "error": "Content cannot be empty."}

    # 安全扫描（注入/外泄模式检测）
    scan_error = _scan_memory_content(content)
    if scan_error:
        return {"success": False, "error": scan_error}

    with self._file_lock(self._path_for(target)):
        # 重新从盘读取（拿其他会话的写入）
        if self._reload_target(target, skip_drift=True) is _READ_FAILED:
            return _read_failed_error(self._path_for(target))

        entries = self._entries_for(target)
        limit = self._char_limit(target)

        # 拒绝精确重复
        if content in entries:
            return self._success_response(target, "Entry already exists (no duplicate added).")

        # 超额时返回当前所有条目 + 整合指引
        new_entries = entries + [content]
        new_total = len(ENTRY_DELIMITER.join(new_entries))
        if new_total > limit:
            return self._consolidation_failure({...})

        entries.append(content)
        self._set_entries(target, entries)
        self.save_to_disk(target)

    return self._success_response(target, "Entry added.")
```

**v0.20 新增的原子批处理**（`tools/memory_tool.py:562`）：

```python
def apply_batch(self, target: str, operations: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Apply a list of add/replace/remove ops atomically against the FINAL budget.

    All operations are validated and applied against the FINAL budget —
    a batch that would only fit after consolidation is rejected wholesale,
    so the model must plan the consolidation itself in one shot.
    """
```

批处理是 **all-or-nothing**：任意一条 op 的 `old_text` 匹配不到条目，整批拒绝。这解决了 v0.12 的痛点——模型想"加一条 + 删两条旧条目来腾空间"必须分三次调用，中间状态可能不一致。

#### v0.20 新增的写入保护

**漂移检测**（`tools/memory_tool.py:90`）：写之前先验证盘上文件能被自家 parser round-trip。如果用户用 `patch` 工具或 shell append 直接改了 `MEMORY.md`，`memory` 工具会拒绝覆写、把当前状态备份到 `.bak.<ts>` 并说明怎么恢复——防止静默丢数据（issue #26045）。

**读取失败保护**（`tools/memory_tool.py:128`）：文件存在但读不出来（被锁、权限、编码坏），不当作空 store 处理——如果当作空 store 就会用空列表覆写掉用户全部记忆，直接拒绝写。

**快照注入防注入**（`tools/memory_tool.py:237`）：`load_from_disk` 构建快照时，对每条 entry 做安全扫描。被投毒的条目在快照里替换成 `[BLOCKED: …]` 占位符——被投毒的记忆文件（供应链攻击、被攻陷的工具、姊妹会话写入）不能注入系统提示词。但 live state 保留原始文本，用户仍能看到被投毒的条目并删除。

**容量耗尽优雅降级**（`tools/memory_tool.py:165`）：单个 turn 内连续 3 次整合失败后，停止要求模型重试、返回 terminal 结果——避免一个脆弱的 replace/add 把 turn 循环到预算耗尽（issue #42405）。

#### 安全扫描

所有写入内容在存储前都会检查注入/泄露模式：

```python
# tools/memory_tool.py:86
def _scan_memory_content(content: str) -> Optional[str]:
    """Scan memory content for injection/exfil patterns."""
    return _first_threat_message(content, scope="strict")
```

实际检测逻辑在 `tools/threat_patterns.py`，检测项包括：
- 提示词注入（`ignore previous instructions`、`you are now`、`system prompt override`）
- 外泄模式（`curl ...$API_KEY`、`cat ~/.env`、`cat ~/.netrc`、`authorized_keys`、`~/.ssh`）
- 隐形 Unicode 字符（零宽字符、双向控制符——可能的注入载体）

被拒绝的写入返回结构化错误，模型看到的是"为什么被拒"，而不是 traceback。

---

### 2.2 程序性记忆：Skills 技能系统

**文件位置**：`~/.hermes/skills/`

技能是 Agent 的程序性记忆——可复用的操作流程。与记忆（声明性的）不同，技能是**可执行的**（告诉模型"怎么做"，不是"是什么"）。

**技能存储格式**（每个技能一个目录，agentskills.io 标准）：

```
~/.hermes/skills/
├── my-skill/
│   ├── SKILL.md              # 技能主体（YAML frontmatter + Markdown 指令）
│   ├── references/           # 引用文件：会话特定细节、API 文档摘录、知识库
│   │   └── topic.md
│   ├── templates/            # 模板文件：可复制修改的样板文件
│   │   └── config.yaml
│   ├── scripts/              # 脚本文件：可重复运行的自动化脚本
│   │   └── verify.sh
│   └── assets/               # 静态资源文件
├── category/                 # 分类目录
│   └── another-skill/
│       └── SKILL.md
└── .archive/                 # 归档目录（Curator 只归档不删除）
```

**SKILL.md 格式**：

```yaml
---
name: skill-name              # ≤64 字符
description: "Brief description"   # ≤1024 字符，唯一进默认索引的内容
version: 0.1.0
triggers: [keyword1, keyword2]     # 触发词，匹配时模型主动加载
---

# Skill Title

Full instructions here — the agent loads this content via skill_view(name)
when the skill matches the current task.
```

**技能的来源**（`tools/skill_provenance.py`）：

| 来源 | 说明 | Curator 可管理？ |
|---|---|:---:|
| **内置**（bundled） | `skills/` 目录中预装的技能 | 否 |
| **Hub 安装**（hub-installed） | 从 agentskills.io 安装 | 否 |
| **外部目录**（external_dirs） | `config.yaml` 的 `skills.external_dirs` 指向的只读目录 | 否 |
| **用户创建**（user-created） | 前台对话中用户要求创建 | 否 |
| **Agent 创建**（agent-created） | 后台自改进审查中自动创建 | **是** |

v0.20 新增了「外部目录」来源——允许把 skill 放在独立 repo 或共享路径，`build_skills_system_prompt` 会扫描它们并纳入索引，但外部目录只读，新建技能永远落在本地 `~/.hermes/skills/`。

来源追踪通过 Python `ContextVar` 实现（详见 [5.4 节](#54-来源追踪provenance)）。

---

### 2.3 会话历史：SQLite + FTS5

**文件位置**：`~/.hermes/state.db`

**核心类：`SessionDB`**（`hermes_state.py` / `hermes_state_schema.py`）

使用 SQLite WAL 模式支持并发读写（网关多平台场景）。**v0.20.0 的 Schema 版本号为 25**（v0.12 时是 11，期间经历了 14 次迁移）。

**核心表**：

```sql
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,                    -- 'cli', 'telegram', 'discord' 等
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
```

**FTS5 全文索引**（`hermes_state_schema.py:171`）：三套索引覆盖不同搜索场景：

```python
# 触发器同步消息表到全文索引
update_names = (
    "messages_fts_update",          # 标准分词器（英文）
    "messages_fts_trigram_update",  # Trigram 分词器（CJK 子串搜索）
)
if supports_cjk:
    update_names += ("messages_fts_cjk_update",)  # CJK 专用索引
```

**会话搜索工具**（`tools/session_search_tool.py`）提供三种调用形态（文件头注释）：

1. **DISCOVERY**（`query` 参数）：FTS5 搜索 → 按 session lineage 去重 → 每个命中返回 FTS 高亮摘要 + 首尾消息 + ±window 的上下文
2. **SCROLL**（`session_id` + `around_message_id`）：在一个 session 内按锚点翻页
3. **READ / BROWSE**：按 id 读整个 session 或列最近 session

搜索是**纯 SQLite 查询**——`session_search` 工具的描述明确写："FTS5-backed retrieval over the SQLite message store. No LLM calls — every shape returns actual messages from the DB."

---

## 3. 系统提示词组装

System Prompt 在会话开始时一次性构建，整个会话期间保持稳定。这是自学习系统正确运转的基石——前缀缓存要求 system prompt 字节稳定。

**v0.20 的变化**：系统提示词组装从 `run_agent.py:4913` 搬到独立的 `agent/system_prompt.py`（814 行），分三段：

```python
# agent/system_prompt.py 头部注释
# Three tiers are joined with \n\n:
#   stable   — 身份 (SOUL.md 或 DEFAULT_AGENT_IDENTITY)、工具使用指南、
#              computer-use 指南、per-model 操作指南、coding 指南、平台提示
#   context  — 调用方传入的 system_message + 在 TERMINAL_CWD 下发现的
#              AGENTS.md / .cursorrules 等上下文文件 + coding workspace 快照
#   volatile — 技能索引、memory 快照、USER.md 画像、外部 memory provider 块、
#              时间戳/session/model/provider 行
```

入口：

```python
# agent/system_prompt.py:265
def build_system_prompt_parts(agent, system_message=None) -> Dict[str, str]:
    """三段独立返回，方便单独看哪段变了。"""

# agent/system_prompt.py:689
def build_system_prompt(agent, system_message=None) -> str:
    """三段 join 成最终 system prompt。"""
```

`run_agent.py:4565 _build_system_prompt()` 现在只是一个 thin forwarder。

### 技能索引的构建

**`build_skills_system_prompt`**（`agent/prompt_builder.py:1713`）：

```python
def build_skills_system_prompt(
    available_tools=None,
    available_toolsets=None,
    compact_categories=None,
) -> str:
    """Build a compact skill index for the system prompt.

    Two-layer cache:
      1. In-process LRU dict keyed by (skills_dir, tools, toolsets, hidden)
      2. Disk snapshot (.skills_prompt_snapshot.json) validated by
         mtime/size manifest — survives process restarts

    External skill directories (skills.external_dirs) are scanned alongside
    the local ~/.hermes/skills/ directory. External dirs are read-only.
    Local skills take precedence when names collide.

    compact_categories demotes whole categories to names-only lines —
    every skill stays visible and loadable; only descriptions are dropped.
    """
```

输出的索引格式——只包含名称和描述（前 57 字符），实现**渐进式披露**（Progressive Disclosure）：

```
## Skills (mandatory)
Before replying, scan the skills below. If a skill matches or is even partially relevant
to your task, you MUST load it with skill_view(name) and follow its instructions.

<available_skills>
  - skill-name: Brief description (first 57 chars)...
  - another-skill: ...
</available_skills>
```

Agent 匹配到相关技能后，通过 `skill_view` 工具按需加载完整 SKILL.md 和支持文件。`build_skills_system_prompt` 的两层缓存（内存 LRU + 磁盘快照）让索引构建在技能数多时也不慢。

---

## 4. 前台即时学习路径

前台 Agent 在执行任务的过程中，可以主动使用工具即时写入记忆和技能。这是自学习的第一层——**即时学习**。

### 4.1 记忆工具：memory

Agent 通过 `memory` 工具管理声明性记忆。v0.20 支持两种调用形态：

**单条操作**：

```python
# tools/memory_tool.py:1057 memory_tool()
def memory_tool(action=None, target="memory", content=None,
                old_text=None, operations=None, store=None):
    """Single entry point for the memory tool.

    Two shapes:
      - Single op: action + (content / old_text)
      - Batch:     operations=[{action, content?, old_text?}, ...] applied
                   atomically against the final char budget in ONE call.
    """
```

| action | 用途 | 必需参数 |
|---|---|---|
| `add` | 追加新条目 | `content` |
| `replace` | 替换包含 `old_text` 的条目 | `old_text` + `content` |
| `remove` | 删除包含 `old_text` 的条目 | `old_text` |

**批量操作**（v0.20 新增）：

```
operations=[
    {"action": "remove", "old_text": "旧条目片段"},
    {"action": "add", "content": "新条目"},
    {"action": "replace", "old_text": "要合并的条目", "content": "合并后"},
]
```

批处理在**最终的字符预算**上一次性验证，全部成功才落盘；任意一条匹配失败则整批拒绝。这让模型能在一轮内完成"删两条 + 加一条"的整合操作。

工具 schema 描述中嵌入了行为指导：

- 用户表达偏好、风格要求时 → 保存到 `USER.md`
- 发现环境事实、工具特性、项目约定时 → 保存到 `MEMORY.md`
- 使用 substring 匹配进行 `replace` / `remove`
- 内容会被注入 system prompt，必须安全

### 4.2 技能管理工具：skill_manage

**工具定义**（`tools/skill_manager_tool.py:1542`）：

```python
def skill_manage(action, name, content=None, category=None,
                 old_string=None, new_string=None, replace_all=False,
                 file_path=None, file_content=None):
    """Manage skills — create, update, delete, add support files."""
```

支持的 action：

| action | 用途 |
|---|---|
| `create` | 新建技能（写 SKILL.md，可选 category） |
| `edit` | 全量替换 SKILL.md |
| `patch` | 模糊匹配定位替换（用 `tools/fuzzy_match.fuzzy_find_and_replace`） |
| `delete` | 删除技能 |
| `write_file` / `remove_file` | 管理 `references/ scripts/ templates/ assets/` 下的支持文件 |

#### 创建技能：`_create_skill`

```python
# tools/skill_manager_tool.py:908
def _create_skill(name, content, category=None):
    # 1. 验证名称（小写、文件系统安全、长度 ≤ 64）
    err = _validate_name(name)
    # 2. 验证 YAML frontmatter（必须有 name 和 description）
    err = _validate_frontmatter(content)
    # 3. 检查重名
    existing = _find_skill(name)
    # 4. 创建目录并写入 SKILL.md（原子写入）
    skill_dir = _resolve_skill_dir(name, category)
    _atomic_write_text(skill_md, content)
    # 5. 安全扫描 — v0.20 强制开启（不再是"可选"）
    scan_error = _security_scan_skill(skill_dir)
    if scan_error:
        shutil.rmtree(skill_dir, ignore_errors=True)  # 回滚
        return error
    return success
```

#### 修补技能：`_patch_skill`

使用模糊匹配引擎（`tools/fuzzy_match.py`）进行精准查找替换：

```python
# tools/skill_manager_tool.py:1068
def _patch_skill(name, old_string, new_string, file_path=None, replace_all=False):
    # 确定目标文件（默认 SKILL.md，也可指定支持文件）
    content = target.read_text()
    # 模糊匹配（容忍空格/缩进差异）
    new_content, match_count, _strategy, match_error = fuzzy_find_and_replace(
        content, old_string, new_string, replace_all
    )
    # 验证 frontmatter 完整性
    if not file_path:
        err = _validate_frontmatter(new_content)
    # 保存原始内容用于回滚
    _atomic_write_text(target, new_content)
    # 安全扫描失败则回滚
    scan_error = _security_scan_skill(skill_dir)
    if scan_error:
        _atomic_write_text(target, original_content)  # 回滚
```

#### 安全扫描（v0.20 强化）

**`_security_scan_skill`**（`tools/skill_manager_tool.py:125`）在 `create` / `edit` / `patch` / `write_file` 四个 action 落盘前各调用一次（945 / 1038 / 1167 / 1346 行）：

```python
def _security_scan_skill(skill_dir: Path) -> Optional[str]:
    # 调 tools/skills_guard.py:640 scan_skill() 和 787 should_allow_install()
    # 检测：
    #   - 路径穿越 (../../../etc/passwd)
    #   - 恶意 shell 命令（rm -rf、curl 外传、读敏感文件）
    #   - 提示词注入
    # 不通过则拒绝创建/编辑，回滚
```

#### 操作完成后的处理

技能操作成功后，清缓存 + 更新遥测 + 标记来源：

```python
if result.get("success"):
    # 1. 清除技能索引缓存（两层都清）
    from agent.prompt_builder import clear_skills_system_prompt_cache
    clear_skills_system_prompt_cache(clear_snapshot=True)

    # 2. 更新遥测 + 标记来源
    from tools.skill_usage import bump_patch, forget, mark_agent_created
    from tools.skill_provenance import is_background_review

    if action == "create":
        if is_background_review():      # 后台创建 → 标记为 agent-created
            mark_agent_created(name)
    elif action in ("patch", "edit", "write_file", "remove_file"):
        bump_patch(name)                # 更新修补计数
    elif action == "delete":
        forget(name)                    # 清除遥测记录
```

---

## 5. 后台自改进审查

后台审查是自学习循环的核心引擎。每当用户对话积累到一定量，Agent 会在回复用户后自动 fork 一个后台 Agent 审查对话内容。

这是 Hermes 区别于一般 agent 框架的关键能力——**不依赖模型"主动想起要记"**，而是每轮自动反思"有什么值得沉淀的"。

### 5.1 触发机制

v0.20 的触发逻辑搬到了 `agent/conversation_loop.py`，通过 `TurnContext`（`agent/turn_context.py`）传递：

```python
# agent/conversation_loop.py:1560
_should_review_memory = _ctx.should_review_memory
```

两个独立的计数器分别追踪记忆和技能的审查需求：

**记忆审查计数器**：每轮对话 +1，达到 `_memory_nudge_interval`（默认 10）触发，只要模型主动调过 `memory()` 工具就归零。

**技能审查计数器**（`agent/conversation_loop.py:1707`）：

```python
if (agent._skill_nudge_interval > 0
        and "skill_manage" in agent.valid_tool_names):
    agent._iters_since_skill += 1
```

每次工具迭代 +1，达到 `_skill_nudge_interval`（默认 10）触发，只要模型主动调过 `skill_manage()` 就归零。

**触发后台审查**（在回复用户后）：

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

**v0.20 新增的 `/refine` 手动触发**：用户可以随时用 `/refine [指令]` 显式触发一次后台审查，并附带 focus 指令（如 `/refine 把部署流程存成技能`）。`spawn_background_review_thread` 接受 `focus` 参数，追加到审查提示词末尾。

### 5.2 审查提示词

三种审查提示词对应不同的触发组合（全部搬到 `agent/background_review.py:169-340`）：

#### 纯记忆审查 `_MEMORY_REVIEW_PROMPT`（约 171 行）

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

#### 纯技能审查 `_SKILL_REVIEW_PROMPT`（约 182-306 行）

这是最长的提示词。v0.20 版本比 v0.12 大幅扩展，增加了：

**审查信号**（任一条触发行动）：
- 用户纠正了风格/格式/措辞/冗长度 → **一等技能信号**（不只是记忆信号）
- 用户纠正了工作流/方法/步骤顺序
- 出现了非平凡的技巧/修复/绕行/调试路径
- 本次加载的技能发现是错的/缺步骤/过时的 → **立即修补**

**动作优先级**（从高到低）：
1. **修补已加载技能**——但仅限 curator-managed 的；bundled/hub/pinned/user-owned 一律不碰
2. **更新已有伞形技能**（via `skills_list` + `skill_view`）
3. **添加支持文件**——`references/`（会话特定细节 + 知识库）/ `templates/`（样板）/ `scripts/`（可重复运行）
4. **创建新伞形技能**——仅当没有现成技能覆盖该类别时

**Protected skills（不编辑）**：
- 内置技能
- Hub 安装技能
- `skills.external_dirs` 外部目录
- PINNED 技能（`hermes curator pin`）
- USER-OWNED 技能——前台用户要求创建的一律不碰；如果是这种技能需要更新，在回复里建议 `hermes curator adopt`

**不应捕获的内容**（v0.20 新增的负面清单）：
- 环境依赖的失败（缺二进制、装包报错、路径不匹配）——用户能修，不是持久规则
- 关于工具/特性的**否定性断言**（"浏览器工具坏了""X 工具不能用"）——这些会硬化成模型引用几个月的自我拒绝
- 一次性任务叙事（"总结今天的市场"不 warrant 一个技能）
- **未解决的失败**——试了几种方法都没成功，不要写成"可靠工作流"

#### 联合审查 `_COMBINED_REVIEW_PROMPT`（约 307 行）

记忆 + 技能的联合提示词，两者都有信号时使用。逻辑是上述两者的合体。

### 5.3 Fork Agent 机制

**入口**：`run_agent.py:1801 _spawn_background_review()` 是一个 thin forwarder，真正的逻辑在 `agent/background_review.py:spawn_background_review_thread()`（约 1093 行）。

```python
# run_agent.py:1801
def _spawn_background_review(self, messages_snapshot, review_memory=False,
                             review_skills=False, focus=None):
    """Spawn the background memory/skill review thread.

    Thin wrapper — the heavy lifting lives in
    agent.background_review.spawn_background_review_thread which returns
    the thread target. threading.Thread is constructed here so existing
    tests that patch run_agent.threading.Thread keep working.
    """
    from agent.background_review import spawn_background_review_thread
    target, _prompt = spawn_background_review_thread(
        self, messages_snapshot,
        review_memory=review_memory,
        review_skills=review_skills,
        focus=focus,
    )
    # 启动守护线程
    ...
```

**选择审查提示词**（`agent/background_review.py:1114`）：

```python
# Allow per-agent override (prompts moved to module-level constants
# but old code paths that set agent._MEMORY_REVIEW_PROMPT etc. keep working)
if review_memory and review_skills:
    prompt = getattr(agent, "_COMBINED_REVIEW_PROMPT", _COMBINED_REVIEW_PROMPT)
elif review_memory:
    prompt = getattr(agent, "_MEMORY_REVIEW_PROMPT", _MEMORY_REVIEW_PROMPT)
else:
    prompt = getattr(agent, "_SKILL_REVIEW_PROMPT", _SKILL_REVIEW_PROMPT)

# /refine 的 focus 追加
focus = (focus or "").strip()
if focus:
    prompt = f"{prompt}\n\nThe user explicitly requested this review..."
```

**Fork AIAgent 的关键配置**（`agent/background_review.py:814`）：

```python
review_agent = AIAgent(
    model=self.model,                    # 相同模型
    max_iterations=16,                   # 限制迭代次数
    quiet_mode=True,                     # 静默模式
    platform=self.platform,
    provider=self.provider,
    base_url=...,
    api_key=...,
    credential_pool=...,
    parent_session_id=self.session_id,
    enabled_toolsets=getattr(agent, "enabled_toolsets", None),  # 继承父的
)

# 标记来源为后台审查
review_agent._memory_write_origin = "background_review"
review_agent._memory_write_context = "background_review"

# 共享同一个 MemoryStore 实例
review_agent._memory_store = self._memory_store

# 关闭 nudge（审查 Agent 不应再触发审查）
review_agent._memory_nudge_interval = 0
review_agent._skill_nudge_interval = 0
```

#### v0.20 的关键变化：动态工具白名单

v0.12 硬编码 `enabled_toolsets=["memory", "skills"]`。v0.20 改成了动态解析（`agent/background_review.py:940`），原因是 issue #54937——硬编码会让 review LLM 在 profile 设置 `memory_enabled: false` 时仍然拿到 MEMORY.md 读写工具，污染了禁用记忆的 profile：

```python
# Gate the built-in memory tool on the profile's memory_enabled flag.
# Hardcoding ["memory", "skills"] granted the review LLM the MEMORY.md
# read/write tool even when a profile set memory_enabled: false,
# contaminating a memory-disabled profile (#54937 layer 2).
review_toolsets = ["skills"]
if review_agent._memory_enabled or review_agent._user_profile_enabled:
    review_toolsets.insert(0, "memory")

# 动态解析出白名单工具名集合
review_whitelist = {
    t["function"]["name"]
    for t in get_tool_definitions(enabled_toolsets=review_toolsets, quiet_mode=True)
}

# 设置线程级工具白名单
set_thread_tool_whitelist(
    review_whitelist,
    deny_msg_fmt="Background review denied non-whitelisted tool: {tool_name}. "
                 "Only memory/skill tools are allowed.",
)
```

`set_thread_tool_whitelist` / `clear_thread_tool_whitelist` 是 v0.20 新增的线程级工具门控——即使 fork 的 agent 继承了父的 toolset，白名单外的工具调用也会在 runtime 被拒绝。这比仅靠 `enabled_toolsets` 过滤更安全。

#### 自动拒绝危险命令

```python
def _bg_review_auto_deny(command, description, **kwargs):
    logger.warning("Background review auto-denied dangerous command: %s (%s)",
                   command, description)
    return "deny"

_set_approval_callback(_bg_review_auto_deny)
```

#### 关键设计点总结

1. **Fork 使用相同的模型和凭证**——确保审查质量，且能命中前缀缓存
2. **动态工具白名单**——只允许 memory/skills 相关工具，尊重 profile 的 memory_enabled 标志
3. **共享 MemoryStore 实例**——写入直接对主会话可见
4. **自动拒绝危险命令**——防止 fork 执行 `rm` 等破坏性操作
5. **`max_iterations=16`**——限制工具调用轮次，防止审查循环失控
6. **守护线程**——主进程退出时自动终止
7. **前缀缓存不变**——fork 继承父的 cached system prompt，审查用的 API 调用能命中同一个前缀缓存

### 5.4 来源追踪：Provenance

**完整文件**：`tools/skill_provenance.py`（79 行，v0.20 逻辑未变但绑定位置变了）

```python
"""Skill write-origin provenance — ContextVar for distinguishing agent-sediment
skill writes from foreground user-directed writes.

The curator only consolidates/prunes skills it autonomously created via the
background self-improvement review fork. Skills a user asks a foreground
agent to write belong to the user and must never be auto-curated.
"""

_write_origin: contextvars.ContextVar[str] = contextvars.ContextVar(
    "skill_write_origin",
    default="foreground",
)

BACKGROUND_REVIEW = "background_review"

def set_current_write_origin(origin: str) -> contextvars.Token[str]: ...
def reset_current_write_origin(token: contextvars.Token[str]) -> None: ...
def get_current_write_origin() -> str: ...
def is_background_review() -> bool: ...
```

**绑定时机**（v0.20 从 `run_agent.py:10619` 搬到 `agent/turn_context.py:479`）：

```python
# agent/turn_context.py:479
set_current_write_origin(getattr(agent, "_memory_write_origin", "assistant_tool"))
```

**绑定位置变更的影响**：搬到 `turn_context` 意味着每个 turn 开始时都会重新绑定——更精确地反映当前 turn 的来源（而不是整个会话只绑一次）。

**效果**：

- 前台 Agent 的 `_memory_write_origin` = `"assistant_tool"` → `is_background_review()` 返回 `False` → 创建的技能**不标记**为 agent-created → Curator 不管
- 后台 fork 的 `_memory_write_origin` = `"background_review"` → `is_background_review()` 返回 `True` → 创建的技能**标记**为 agent-created → 可被 Curator 归档/合并/降级

---

## 6. Curator 定期维护

Curator 是一个空闲触发的定期维护系统，负责技能库的长期健康。

### 6.1 自动状态转换

**`apply_automatic_transitions`**（`agent/curator.py:305`）：

```python
DEFAULT_STALE_AFTER_DAYS = 30     # 30 天未用 → stale
DEFAULT_ARCHIVE_AFTER_DAYS = 90   # 90 天未用 → archived
```

v0.20 版本比 v0.12 增加了几层保护：

```python
def apply_automatic_transitions(now=None) -> Dict[str, int]:
    for row in _u.curated_report():     # v0.20 改名：agent_created_report → curated_report
        # Pinned 技能永远不受影响
        if row.get("pinned"): continue

        # v0.20 新增：被 cron job 引用的技能视为"在用"——
        # 即使很久没 fire 也跳过（paused/disabled 的也算）
        if name in cron_referenced: continue

        # v0.20 新增：首次见到的 curation-eligible 技能（无持久记录）
        # 锚定到现在，不在第一轮就归档
        if not row.get("_persisted", True):
            _u.seed_record_if_missing(name); continue

        # v0.20 新增：never-used (use_count=0) 的宽限——
        # 如果创建不到 stale_after_days，完全不动它
        never_used = int(row.get("use_count", 0) or 0) == 0
        if never_used and anchor > stale_cutoff:
            if current == STATE_STALE: reactivate
            continue

        # 90 天未用 → 归档
        if anchor <= archive_cutoff: archive_skill(name)
        # 30 天未用 → stale
        elif anchor <= stale_cutoff: set_state(STATE_STALE)
        # 重新活跃 → active
        elif anchor > stale_cutoff and current == STATE_STALE: reactivate
```

> **只归档，永不删除**。归档目录为 `~/.hermes/skills/.archive/`，可恢复。

### 6.2 Curator 审查提示词

Curator 的审查提示词（`agent/curator.py:417 CURATOR_REVIEW_PROMPT`）聚焦于**伞形构建**（Umbrella Building）。v0.20 版本大幅扩展了硬性规则：

**硬性规则**：
1. 不碰 bundled / hub-installed / external-dirs 技能
2. 不删除任何技能——归档是最大破坏性操作
3. 不碰 pinned 技能
4. **v0.20 新增**：不碰 `protected built-ins`（当前是 `plan`）——承载着 slash-command 入口
5. **v0.20 新增**：不归档/prune 被 cron job 引用的技能（`cron=yes`），但可以整合（因为 Curator 会重写 cron 引用）
6. 不用 usage counter 作为跳过整合的理由（counter 是新的，大多为 0）
7. **v0.20 新增**：不归档 `use=0` 的技能，除非超过 30 天且内容确实过时

**工作流程**：
1. 扫描完整候选列表，识别 **prefix clusters**（如 `hermes-config-*`、`gateway-*`、`mcp-*`）
2. 对每个 2+ 成员的 cluster，问"伞形类别是什么？人类维护者会写成 N 个独立技能还是一个带 N 个子节的技能？"
3. 三种整合方式：
   - a. **合入已有伞形**——patch 吸收同族窄技能
   - b. **创建新伞形**——写一个 class-level SKILL.md，吸收同族
   - c. **降级为支持文件**——窄内容变成 `references/` / `templates/` / `scripts/`

**包完整性检查**（v0.20 新增）：降级/归档前检查技能是否是完整目录包（有 `references/` 等支持文件），不能只扁平化 SKILL.md 而留下指向已不存在文件的链接。

### 6.3 运行机制

**入口**：`agent/curator.py:2001 maybe_run_curator()`

```python
def maybe_run_curator(*, idle_for_seconds=None, on_summary=None):
    """Best-effort: run a curator pass if all gates pass."""
    if not should_run_now(): return None
    if idle_for_seconds is not None:
        min_idle_s = get_min_idle_hours() * 3600.0
        if idle_for_seconds < min_idle_s: return None
    return run_curator_review(on_summary=on_summary)
```

**触发条件**（必须全部满足）：

| 条件 | 默认值 |
|---|---|
| Curator 已启用 | 默认启用 |
| 未暂停 | `paused=False` |
| 距上次运行 ≥ 7 天 | `DEFAULT_INTERVAL_HOURS = 24 * 7` |
| Agent 空闲 ≥ 2 小时 | `DEFAULT_MIN_IDLE_HOURS = 2` |

**运行流程**：

```
1. apply_automatic_transitions()   → 自动状态转换（stale/archive/reactivate）
2. 收集 curated 技能列表（curated_report）
3. Fork 一个 AIAgent，传入 CURATOR_REVIEW_PROMPT + 技能列表
4. Fork 使用 auxiliary model（可以是更便宜的模型）
5. Fork 执行合并/归档/降级操作
   └── v0.20: 合并时会重写 cron job 的技能引用
6. 写入运行报告到 ~/.hermes/logs/curator/
7. 更新 .curator_state（last_run_at, run_count, summary）
```

**Curator 状态持久化**：

```python
def _default_state():
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
║  build_system_prompt() 三段组装 (agent/system_prompt.py):            ║
║  ┌─────────────────────────────────────────────┐                    ║
║  │ stable:                                      │                    ║
║  │   ① Agent 身份 (SOUL.md / DEFAULT)           │                    ║
║  │   ② 工具引导 (memory/session_search/skills)   │                    ║
║  │ context:                                     │                    ║
║  │   ③ 调用方 system_message + 上下文文件        │                    ║
║  │ volatile:                                    │                    ║
║  │   ④ 冻结记忆快照 (MEMORY.md + USER.md) ←🔒   │                    ║
║  │   ⑤ 外部记忆提供商                           │                    ║
║  │   ⑥ 技能索引 (名称+描述)               ←🔒   │                    ║
║  │   ⑦ 时间戳 + 平台提示                        │                    ║
║  └─────────────────────────────────────────────┘                    ║
║  🔒 = 会话内冻结，不再变更                                             ║
║                                                                      ║
║  set_current_write_origin("assistant_tool")  ← agent/turn_context.py ║
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
║  4. 执行工具调用循环 (agent/conversation_loop.py)                      ║
║     └── _iters_since_skill += 1（每次工具迭代）                        ║
║     └── _turns_since_memory += 1（每次对话轮次）                       ║
║                                                                      ║
║  ┌──────────── 即时写入路径 ────────────┐                            ║
║  │                                       │                            ║
║  │  memory(action="add")                 │                            ║
║  │    → 安全扫描 → 文件锁 → 落盘         │                            ║
║  │    → 立即持久化 ✅                     │                            ║
║  │    → 当前 system prompt 不变 🔒       │                            ║
║  │    → 下次会话生效 🔄                  │                            ║
║  │    → v0.20: 漂移/读取失败保护          │                            ║
║  │    → v0.20: apply_batch 原子批处理     │                            ║
║  │                                       │                            ║
║  │  skill_manage(action="patch")         │                            ║
║  │    → 模糊匹配 + 替换                  │                            ║
║  │    → 安全扫描（强制）                  │                            ║
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
║               agent/background_review.py                             ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  触发: _should_review_memory 或 _should_review_skills                 ║
║  也可通过 /refine [指令] 手动触发                                      ║
║                                                                      ║
║  spawn_background_review_thread():                                   ║
║  ┌──────────────────────────────────────────────────────┐           ║
║  │ Thread(daemon=True, name="bg-review")                 │           ║
║  │                                                       │           ║
║  │  1. 选择提示词:                                       │           ║
║  │     记忆+技能 → _COMBINED_REVIEW_PROMPT               │           ║
║  │     仅记忆   → _MEMORY_REVIEW_PROMPT                  │           ║
║  │     仅技能   → _SKILL_REVIEW_PROMPT                   │           ║
║  │     /refine  → 追加 focus                             │           ║
║  │                                                       │           ║
║  │  2. Fork AIAgent:                                     │           ║
║  │     - 相同模型/凭证（命中前缀缓存）                    │           ║
║  │     - max_iterations=16                               │           ║
║  │     - _memory_write_origin = "background_review" ⭐   │           ║
║  │     - 共享 MemoryStore 实例                           │           ║
║  │     - 自动拒绝危险命令                                │           ║
║  │     - v0.20: 动态工具白名单 (尊重 memory_enabled)     │           ║
║  │     - v0.20: set_thread_tool_whitelist 线程级门控     │           ║
║  │                                                       │           ║
║  │  3. 运行: review_agent.run_conversation(prompt, hist) │           ║
║  │                                                       │           ║
║  │  4. 动作优先级（技能维度）:                             │           ║
║  │     ① 修补已加载技能（仅 curator-managed）             │           ║
║  │     ② 更新已有伞形技能                                 │           ║
║  │     ③ 添加支持文件 (references/templates/scripts)     │           ║
║  │     ④ 创建新的伞形技能                                 │           ║
║  │     × Protected skills 一律不碰                        │           ║
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
║                      agent/curator.py                                ║
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
║  │ 30 天未用 → stale (跳过 pinned/cron-ref)        │                  ║
║  │ 90 天未用 → archived (跳过 pinned/cron-ref)     │                  ║
║  │ 重新活跃 → active                                │                  ║
║  │ v0.20: use=0 的技能有宽限期                       │                  ║
║  │                                                  │                  ║
║  │ ⚠️ 永不删除，只归档到 .archive/                    │                  ║
║  └──────────────────────────────────────────────────┘                  ║
║                          │                                           ║
║                          ▼                                           ║
║  ┌─── Phase 2: 伞形构建审查 ──────────────────────┐                  ║
║  │ Fork AIAgent + CURATOR_REVIEW_PROMPT            │                  ║
║  │                                                  │                  ║
║  │ 只处理 curated 技能                               │                  ║
║  │ 不碰 protected built-ins (plan) / cron-ref       │                  ║
║  │                                                  │                  ║
║  │ 1. 识别前缀簇 (prefix clusters)                  │                  ║
║  │ 2. 合并为伞形技能:                               │                  ║
║  │    a. 合入已有伞形                                │                  ║
║  │    b. 创建新伞形                                  │                  ║
║  │    c. 降级为 references/templates/scripts         │                  ║
║  │ 3. 包完整性检查（不留下断链）                      │                  ║
║  │ 4. v0.20: 重写 cron job 技能引用                  │                  ║
║  │ 5. 归档被吸收的窄技能                             │                  ║
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

**为什么**：Anthropic 和 OpenAI 的 prefix caching 要求 system prompt 在整个会话中保持稳定。如果每次写入记忆都修改 system prompt，缓存会反复失效，导致重传整个 prompt，显著增加延迟和成本。这也是 `AGENTS.md` 反复强调的"prompt caching is sacred"。

**效果**：新的记忆和技能变更在**下一次会话**中才对 Agent 可见。当前会话的工具响应会反映实时状态（工具调用读写的是 live state），但注入 system prompt 的始终是快照。

### 8.2 后台非阻塞

所有自改进操作在守护线程中运行，**永远不会阻塞用户**。

- 回复用户 → 启动后台审查线程 → 立即返回
- 后台线程通过 `thread_scoped_silence` / `redirect_stdout` 抑制输出
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
- 内置/Hub/外部目录安装的技能 → 完全不可修改
- Pinned 技能 → 连前台 agent 都不能改内容（只有用户在 foreground session 能 `hermes curator unpin`）

### 8.4 分层持久化

```
声明性事实  →  MEMORY.md / USER.md    →  容量有限（2.2K / 1.4K chars，可配置）
程序性知识  →  SKILL.md + 支持文件     →  可扩展（references/templates/scripts）
对话历史    →  SQLite FTS5             →  无限量，全文搜索
```

三层各有分工，互补而非冗余。容量限制是有意的——**强迫模型做减法**，只留高信号信息。超额时返回当前所有条目让模型自己整合，而不是无限膨胀。

### 8.5 优雅降级

每一个计数器、后台审查、Curator 运行都是 best-effort：

```python
try:
    self._spawn_background_review(...)
except Exception:
    pass  # Background review is best-effort
```

失败只记录 DEBUG/WARNING 级日志，**永远不会中断用户对话**。v0.20 进一步强化了这一点——memory 写入连续失败 3 次后返回 terminal 结果，避免把 turn 循环到预算耗尽。

### 8.6 前缀缓存复用

后台审查的 fork agent 继承父 agent 的 cached system prompt，审查用的 API 调用能命中同一个前缀缓存。`agent/background_review.py` 头部明确写：

> The fork inherits the parent's live runtime (provider, model, base_url, credentials, cached system prompt) so it hits the same prefix cache and uses the same auth.

这意味着后台审查的额外 token 成本只有审查提示词 + 对话快照，而不是整个 system prompt 重传。

---

## 9. 关键文件索引

> 所有路径相对 `~/.hermes/hermes-agent/`。行号为 v0.20.0 (2026-08-12, commit `88ab589f6`) 实测。

### 系统提示词
| 文件 | 关键内容 | 约行号 |
|---|---|---|
| `agent/system_prompt.py` | `build_system_prompt_parts()` 三段组装 | 265 |
| `agent/system_prompt.py` | `build_system_prompt()` 最终拼接 | 689 |
| `run_agent.py` | `_build_system_prompt()` forwarder | 4565 |
| `agent/prompt_builder.py` | `build_skills_system_prompt()` 技能索引 | 1713 |
| `agent/prompt_builder.py` | `clear_skills_system_prompt_cache()` | 1488 |

### 记忆系统
| 文件 | 关键内容 | 约行号 |
|---|---|---|
| `tools/memory_tool.py` | `MemoryStore` 类 | 153 |
| `tools/memory_tool.py` | `load_from_disk()` 冻结快照 | 237 |
| `tools/memory_tool.py` | `add()` | 390 |
| `tools/memory_tool.py` | `replace()` | 449 |
| `tools/memory_tool.py` | `remove()` | 520 |
| `tools/memory_tool.py` | `apply_batch()` 原子批处理 (v0.20) | 562 |
| `tools/memory_tool.py` | `_scan_memory_content()` 安全扫描 | 86 |
| `tools/memory_tool.py` | 漂移检测 (v0.20) | 90 |
| `tools/memory_tool.py` | 读取失败保护 (v0.20) | 128 |
| `tools/memory_tool.py` | `memory_tool()` 入口 | 1057 |

### 技能系统
| 文件 | 关键内容 | 约行号 |
|---|---|---|
| `tools/skill_manager_tool.py` | `_security_scan_skill()` | 125 |
| `tools/skill_manager_tool.py` | `_create_skill()` | 908 |
| `tools/skill_manager_tool.py` | `_edit_skill()` | 1006 |
| `tools/skill_manager_tool.py` | `_patch_skill()` | 1068 |
| `tools/skill_manager_tool.py` | `_delete_skill()` | 1188 |
| `tools/skill_manager_tool.py` | `skill_manage()` 入口 | 1542 |
| `tools/skill_provenance.py` | `ContextVar` 来源追踪 | 全文件 (79 行) |
| `tools/skills_guard.py` | `scan_skill()` / `should_allow_install()` | 640 / 787 |
| `tools/skills_tool.py` | `skill_view()` + 遥测包装器 | 全文件 |
| `tools/skill_usage.py` | 使用计数 / 状态管理 | 全文件 |

### 后台审查
| 文件 | 关键内容 | 约行号 |
|---|---|---|
| `agent/background_review.py` | `_MEMORY_REVIEW_PROMPT` | 171 |
| `agent/background_review.py` | `_SKILL_REVIEW_PROMPT` | 182 |
| `agent/background_review.py` | `_COMBINED_REVIEW_PROMPT` | 307 |
| `agent/background_review.py` | Fork AIAgent 配置 | 814 |
| `agent/background_review.py` | 动态工具白名单 (v0.20) | 940 |
| `agent/background_review.py` | `spawn_background_review_thread()` | 1093 |
| `run_agent.py` | `_spawn_background_review()` forwarder | 1801 |
| `agent/conversation_loop.py` | 技能审查计数器 | 1707 |

### Curator
| 文件 | 关键内容 | 约行号 |
|---|---|---|
| `agent/curator.py` | `DEFAULT_INTERVAL_HOURS = 168` (7天) | 70 |
| `agent/curator.py` | `DEFAULT_STALE_AFTER_DAYS = 30` | 72 |
| `agent/curator.py` | `DEFAULT_ARCHIVE_AFTER_DAYS = 90` | 73 |
| `agent/curator.py` | `should_run_now()` | 233 |
| `agent/curator.py` | `apply_automatic_transitions()` | 305 |
| `agent/curator.py` | `CURATOR_REVIEW_PROMPT` | 417 |
| `agent/curator.py` | `run_curator_review()` | 1496 |
| `agent/curator.py` | `maybe_run_curator()` | 2001 |

### 会话存储
| 文件 | 关键内容 | 约行号 |
|---|---|---|
| `hermes_state_common.py` | `SCHEMA_VERSION = 25` | 167 |
| `hermes_state_schema.py` | FTS5 索引定义 | 171 |
| `hermes_state.py` | `SessionDB` 类 | 全文件 |
| `tools/session_search_tool.py` | FTS5 搜索 + 三种调用形态 | 全文件 |

### 来源绑定
| 文件 | 关键内容 | 约行号 |
|---|---|---|
| `agent/turn_context.py` | `set_current_write_origin()` 绑定 | 479 |
| `agent/agent_init.py` | 默认 `_memory_write_origin` | 1569 |

---

**v0.20.0 vs v0.12.0 的差异一句话总结**：核心三段架构（即时学习 → 后台审查 → 定期整理）不变，但实现全面模块化（`run_agent.py` 拆到 `agent/`），安全性大幅强化（动态工具白名单、漂移/读取失败保护、原子批处理、线程级门控），审查提示词更精炼（明确 Protected skills 边界、负面清单防止硬化自我约束），Curator 更克制（保护 cron 引用、never-used 宽限、包完整性检查）。
