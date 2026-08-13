
## 一、项目概述

Hermes Agent 是由 Nous Research 构建的自我改进型 AI 代理，一个灵活的多平台 AI 助手。

**核心特性**：
- **多模型支持**：OpenAI、Anthropic、OpenRouter (200+ 模型)、NVIDIA NIM 等
- **多平台**：CLI、Telegram、Discord、Slack、WhatsApp 等
- **自我改进**：从经验中创建技能、使用中提升
- **技能系统**：程序化记忆与自主技能创建

**主要技术栈**：Python 3.11+、prompt_toolkit (CLI)、SQLite + FTS5

---

## 二、核心概念：工具 vs 技能

### 2.1 工具 (Tool)

| 属性 | 说明 |
|------|------|
| **本质** | 可执行的 Python 代码 |
| **作用** | 真正执行操作（搜索网络、读文件、执行命令等） |
| **位置** | `tools/*.py` |
| **执行者** | Hermes Agent |
| **例子** | `web_search_tool` 真正调用 Exa/Firecrawl API |

### 2.2 技能 (Skill)

| 属性 | 说明 |
|------|------|
| **本质** | Markdown 提示词文档 |
| **作用** | 告诉大模型"什么场景用什么工具、怎么用" |
| **位置** | `skills/**/*.md` |
| **执行者** | 不执行任何操作，只编译进系统提示词 |
| **例子** | `apple-notes` 技能告诉大模型用 `memo` 命令管理笔记 |

---

## 三、工具注册机制

### 3.1 自注册模式

```python
# tools/registry.py — 中央注册表（无依赖）
registry = ToolRegistry()

# tools/web_tools.py — 模块加载时自注册
registry.register(
    name="web_search",
    toolset="web",
    schema={
        "name": "web_search",
        "description": "Search the web for information...",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The search query..."}
            },
            "required": ["query"]
        }
    },
    handler=lambda args, **kw: web_search_tool(args.get("query", ""), limit=5),
    check_fn=check_web_api_key,
)
```

### 3.2 注册流程

```
model_tools.py 导入 discover_builtin_tools()
    ↓
扫描 tools/ 目录，找到所有包含 registry.register() 的模块
    ↓
importlib.import_module() 触发各模块的 register() 调用
    ↓
工具注册到全局 registry
    ↓
get_tool_definitions() 导出给 AIAgent 使用
```

---

## 四、完整工作流程：以"查询谷歌股价"为例

### 4.1 初始化阶段

```
Agent 启动时：
1. 工具注册 → discover_builtin_tools() 扫描 tools/ 目录
2. 技能编译 → build_skills_system_prompt() 扫描 skills/ 目录
3. 系统提示词组装 → _build_system_prompt() 组合所有组件
```

### 4.2 用户输入与消息组装

```python
# run_agent.py (消息组装逻辑分布在多处)
user_msg = {"role": "user", "content": "帮我查询谷歌股价"}
messages.append(user_msg)
```

**完整的 API 请求数据结构**：

```python
api_kwargs = {
    "model": "claude-opus-4-6",
    "messages": [
        {
            "role": "system",
            "content": """You are Hermes...

## Available Skills

### web
- Use web_search for searching information on the web
- Use web_extract for extracting content from specific URLs

### file
- Use read_file to read files...
...

## Tool Use Guidance
When a user asks about real-time information, use the appropriate tool..."""
        },
        {
            "role": "user",
            "content": "帮我查询谷歌股价"
        }
    ],
    "tools": [
        {
            "type": "function",
            "function": {
                "name": "web_search",
                "description": "Search the web for information...",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "The search query to look up on the web"
                        }
                    },
                    "required": ["query"]
                }
            }
        },
        # ... 其他工具 schema
    ],
    "tool_choice": "auto",
    "max_tokens": 8192
}
```

### 4.3 大模型决策

**大模型收到**：
- 系统提示词（包含技能索引和工具使用指南）
- 用户问题
- `tools` 参数（工具说明书）

**大模型通过阅读 schema 知道**：
- 工具叫 `web_search`
- 需要一个 `query` 参数
- 什么时候该用这个工具

**大模型返回**：

```json
{
    "choices": [{
        "finish_reason": "tool_calls",
        "message": {
            "role": "assistant",
            "content": null,
            "tool_calls": [{
                "id": "call_abc123",
                "type": "function",
                "function": {
                    "name": "web_search",
                    "arguments": "{\"query\": \"Google GOOGL stock price today 2026\"}"
                }
            }]
        }
    }]
}
```

### 4.4 Agent 执行工具

```python
# model_tools.py:421
def handle_function_call(function_name, function_args, ...):
    # 1. 类型转换
    function_args = coerce_tool_args(function_name, function_args)

    # 2. 插件钩子检查
    block_message = get_pre_tool_call_block_message(...)
    if block_message:
        return json.dumps({"error": block_message})

    # 3. 分发到注册表
    result = registry.dispatch(function_name, function_args, ...)
    return result

# tools/registry.py:292
def dispatch(self, name, args, **kwargs):
    entry = self.get_entry(name)  # 查找工具条目
    result = entry.handler(args, **kwargs)  # 执行！
    return result

# tools/web_tools.py
def web_search_tool(query, limit=5):
    backend = _get_backend()  # Firecrawl/Exa/Tavily
    results = backend.search(query, limit=limit)
    return json.dumps(results)
```

**工具返回结果**：

```json
{
    "results": [{
        "title": "GOOGL Stock Price - Google Finance",
        "url": "https://google.com/finance/quote/GOOGL:NYSE",
        "description": "$185.42 USD as of April 19, 2026"
    }]
}
```

### 4.5 第二轮 API 调用

**消息更新**：

```python
messages.append({
    "role": "tool",
    "content": '{"results": [...]}',
    "tool_call_id": "call_abc123"
})
```

**大模型收到完整上下文后，返回最终回答**：

```json
{
    "choices": [{
        "finish_reason": "stop",
        "message": {
            "role": "assistant",
            "content": "根据搜索结果，谷歌（GOOGL）股价约为 **$185.42 美元**（2026年4月19日）"
        }
    }]
}
```

---

## 五、循环机制详解

### 5.1 为什么需要循环？

| 大模型能 | 大模型不能 |
|---------|-----------|
| 理解自然语言 | 真正执行工具 |
| 做决策 | 联网搜索 |
| 组织回答 | 读本地文件 |
| 推理分析 | 执行命令 |

**循环本质**：大模型出主意，Agent 执行，结果再交回大模型组织。

### 5.2 循环伪代码

```python
def run_conversation(user_message):
    messages = [system_prompt, user_message]

    while True:
        response = llm(messages=messages, tools=self.tools)

        if response.finish_reason == "tool_calls":
            for tool_call in response.tool_calls:
                result = handle_function_call(tool_call.name, tool_call.args)
                messages.append({
                    "role": "tool",
                    "content": result,
                    "tool_call_id": tool_call.id
                })
            continue  # 把结果发回大模型，继续循环
        else:
            return response.content  # 大模型直接回答，结束
```

### 5.3 循环停止条件

- `finish_reason = "stop"` → 大模型直接回答
- 达到 `max_iterations` → 防止死循环
- 用户发送 `/stop` → 用户中断

### 5.4 迭代预算机制（IterationBudget）

循环的核心计数器不是简单的计数器，而是 `IterationBudget` 类，支持更精细的控制：

```python
# run_agent.py:170-211
class IterationBudget:
    def consume(self):     # 消耗一个迭代
    def refund(self):       # 退回一个迭代（用于 execute_code 等工具的迭代回退）
    def remaining(self):    # 剩余迭代数
```

**关键特性**：
- **refund() 机制**：`execute_code` 工具执行代码时产生的迭代可以回退，不消耗迭代预算。这允许 Agent 在某些场景下"重试"而不受迭代限制。
- **线程安全**：使用锁保护计数器，支持并发场景。
- **循环条件**：实际判断为 `api_call_count < max_iterations and iteration_budget.remaining > 0`，两个条件同时满足才继续。

### 5.5 迭代耗尽时的特殊处理

当达到 `max_iterations` 时，**不是立即停止**，而是发送一个总结请求：

```python
# run_agent.py:8526 - _handle_max_iterations
# 向模型发送总结请求，让模型在不调用工具的情况下总结目前的工作成果
```

这确保了即使循环被中断，用户也能得到一个有意义的中间结果，而不是空白的回答。

---

## 六、大模型与 Agent 的关系

```
┌─────────────────────────────────────────────────────────────┐
│                     Hermes Agent                              │
│                                                             │
│   工具的真正主人：                                           │
│   - 实现 web_search、read_file、terminal 等 50+ 工具         │
│   - 负责实际执行这些工具                                     │
│                                                             │
│   角色：执行者（将军）                                       │
└────────────────────────────┬────────────────────────────────┘
                             │
          "我有这些工具，        "执行结果给你，
           你来决定该用哪个"      继续处理"
                             ↕
┌─────────────────────────────────────────────────────────────┐
│                        大模型                                │
│                                                             │
│   通过 tools 参数看到：                                       │
│   - 工具有哪些                                               │
│   - 每个工具怎么用（schema 描述）                             │
│   - 参数格式是什么                                           │
│                                                             │
│   角色：决策者（军师）                                       │
└─────────────────────────────────────────────────────────────┘
```

### 关键理解

1. **工具定义（schema）是通过 API 调用时传给大模型的**，不是大模型预先知道的
2. **大模型只做决策**，不执行任何操作
3. **Agent 是真正的执行者**，接收大模型的调用请求并执行代码
4. **技能是提示词辅助**，告诉大模型"什么场景用什么工具"

---

## 七、API 响应格式差异

| 提供商 | 停止原因字段 | 工具调用字段 |
|-------|-------------|-------------|
| OpenAI | `finish_reason` | `tool_calls` |
| Anthropic | `stop_reason` | `content` (type: "tool_use") |
| Google | `finish_reason` | `function_call` |

**注意**：Hermes Agent **没有统一的响应格式抽象层**。各 API 模式（`chat_completions`、`anthropic_messages`、`bedrock_converse`、`codex_responses`）各自处理各自的响应格式，代码中散布着大量的 `if self.api_mode == "anthropic_messages": ... elif ...` 判断。

响应处理逻辑位于 `run_agent.py:9617-9634`，根据不同的 API 模式分别解析：
- OpenAI 风格：直接读取 `response.choices[0].finish_reason`
- Anthropic：通过 `stop_reason_map` 映射 `{"end_turn": "stop", "tool_use": "tool_calls", ...}`
- Codex：独立的响应解析逻辑
- 部分提供商还有特殊的截断判断（Ollama/GLM）

---

## 八、总结

**Hermes Agent 的本质是一个"大模型 + 工具执行框架"的协作系统**：

1. **工具系统**：50+ 可执行工具，通过 schema 描述注册
2. **技能系统**：Markdown 提示词，编译进系统提示词辅助大模型决策
3. **循环机制**：大模型决策 → Agent 执行 → 结果反馈 → 直到完成
4. **角色分工**：大模型是"军师"出主意，Agent 是"将军"执行

**核心流程**：`tools` 参数提供工具说明书 → 大模型阅读后决定调用 → Agent 执行并返回结果 → 循环直到大模型不再需要工具 → 返回最终回答。

---

## 九、自学习机制详解

Hermes Agent 的核心特性之一是**自我改进**，它能够从经验中学习并将知识持久化。这通过两套互补的系统实现：**记忆系统（Memory）**和**技能系统（Skills）**。

### 9.1 两套学习系统的区别

| | 记忆 (Memory) | 技能 (Skill) |
|--|--------------|-------------|
| **本质** | 键值对的事实快照 | 可复用的任务流程指南 |
| **内容** | 用户偏好、环境事实、经验教训 | 如何完成某类任务的操作步骤 |
| **粒度** | 零散的知识点 | 完整的任务流程 |
| **更新频率** | 每轮对话后可能更新 | 复杂任务完成后创建/改进 |
| **位置** | `~/.hermes/memories/MEMORY.md` 和 `USER.md` | `~/.hermes/skills/<skill-name>/SKILL.md` |
| **类比** | 个人笔记 | 标准化操作手册（SOP） |

### 9.2 记忆系统 (Memory)

**文件位置**：`~/.hermes/memories/`

- **MEMORY.md**：Agent 的个人笔记（环境事实、项目规范、工具特点、经验教训）
- **USER.md**：用户画像（偏好、沟通风格、工作习惯）

**冻结快照设计**（`_system_prompt_snapshot`）：
```python
# memory_tool.py:122
self._system_prompt_snapshot = system_prompt  # 冻结当前系统提示词
```
这是一个重要的设计细节：**中途写入记忆只更新磁盘，不改变当前会话的系统提示词**。这保持了前缀缓存的稳定性，避免正在进行的对话被中断。

**工作原理**：

```
┌─────────────────────────────────────────────────────────────┐
│ 1. 会话开始时                                                │
│    Agent 从磁盘加载 MEMORY.md 和 USER.md                      │
│    → 编译进系统提示词                                        │
│    → 大模型"知道"之前的用户偏好和环境事实                      │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. 对话过程中                                                │
│    Agent 检测到值得记忆的信息：                                │
│    - 用户纠正了某个做法                                       │
│    - 用户透露了偏好或习惯                                     │
│    - Agent 发现了环境特点                                    │
│                                                             │
│    → 调用 memory 工具保存                                    │
│    → 立即写入磁盘（持久化）                                  │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. 定期压缩 (flush_memories)                                │
│    每隔 N 轮对话，自动触发一次记忆压缩                         │
│    → 大模型总结对话中的关键信息                               │
│    → 更新 MEMORY.md / USER.md                               │
└─────────────────────────────────────────────────────────────┘
```

**Memory 工具接口**：

```python
# memory_tool.py 提供的工具
registry.register(
    name="memory",
    handler=lambda args: memory_tool(
        action=args.get("action"),    # add / replace / remove
        target=args.get("target"),    # memory / user
        content=args.get("content"),  # 新内容
        old_text=args.get("old_text"), # 用于定位要替换/删除的内容
        store=store,
    )
)
```

**使用示例**：

```
用户说："以后用 Python 而不是 JavaScript"
→ Agent 调用 memory(action="add", target="memory", content="用户偏好：优先使用 Python 而不是 JavaScript")

用户纠正："我的项目在 /home/user/project，不是 /workspace"
→ Agent 调用 memory(action="replace", target="memory", old_text="/workspace", content="/home/user/project")
```

### 9.3 技能系统 (Skill) — 自我创建与改进

技能系统允许 Agent **从成功经验中创建新的技能**，并将复杂的任务流程固化为可复用的指南。

**工作原理**：

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Agent 完成一个复杂任务                                     │
│    例如：用户让 Agent 部署一个 Docker 服务到服务器              │
│    Agent 执行了：构建镜像、配置 SSH、推送、拉取、启动          │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Agent 判断：这个流程可能再次用到                            │
│    → 调用 skill_manage 工具创建新技能                         │
│    → 技能保存到 ~/.hermes/skills/docker-deploy/SKILL.md      │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. 下次遇到类似任务                                          │
│    系统提示词包含新创建的技能索引                              │
│    → 大模型看到："有个 docker-deploy 技能"                   │
│    → 大模型参考技能指南执行任务                               │
└─────────────────────────────────────────────────────────────┘
```

**skill_manage 工具接口** (`skill_manager_tool.py`)：

```python
# Agent 可以执行以下操作
registry.register(
    name="skill_manage",
    handler=lambda args: skill_manage(
        action=args.get("action"),      # create / edit / patch / delete / write_file / remove_file
        name=args.get("name"),          # 技能名称
        content=args.get("content"),    # SKILL.md 内容
        category=args.get("category"),  # 可选分类
    )
)
```

**支持的 action**：
- `create` / `edit` / `patch` / `delete`：管理技能主文件
- `write_file` / `remove_file`：管理技能目录下的支持文件（references/、templates/、scripts/、assets/）
- `patch` 使用模糊匹配 (`fuzzy_match.py:fuzzy_find_and_replace`) 来定位并替换内容

**创建技能示例**：

```python
# Agent 决定创建一个 Docker 部署技能
skill_manage(
    action="create",
    name="docker-deploy",
    category="devops",
    content="""---
name: docker-deploy
description: Deploy Docker containers to remote servers via SSH
version: 1.0.0
---

# Docker Deploy

## When to Use
- User asks to deploy a Docker service to a server
- User asks to update a running Docker container

## Prerequisites
- SSH access to target server
- Docker installed on target server

## Steps
1. Build image: docker build -t myapp:latest .
2. Tag for registry: docker tag myapp:latest registry.example.com/myapp:latest
3. Push: docker push registry.example.com/myapp:latest
4. SSH to server
5. Pull: docker pull registry.example.com/myapp:latest
6. Stop old container: docker stop myapp || true
7. Remove old: docker rm myapp || true
8. Start new: docker run -d --name myapp --restart unless-stopped registry.example.com/myapp:latest
"""
)
```

### 9.4 自学习完整流程示例

```
┌─────────────────────────────────────────────────────────────┐
│ 场景：用户让 Agent 部署一个 FastAPI 应用到服务器               │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 1: 执行任务                                            │
│                                                             │
│ Agent 调用工具序列：                                         │
│ - terminal: 执行 docker build, docker tag, docker push       │
│ - terminal: SSH 到服务器                                   │
│ - terminal: docker pull, docker run                        │
│                                                             │
│ 任务成功完成！                                               │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 2: 自学习触发                                           │
│                                                             │
│ Agent 思考：                                                 │
│ - "这个流程花了 10 分钟，用户以后可能还会用到"                  │
│ - "我可以把这个流程保存为一个技能"                            │
│                                                             │
│ Agent 调用 skill_manage:                                    │
│ action="create", name="fastapi-deploy", content="..."       │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 3: 技能持久化                                          │
│                                                             │
│ 文件创建：~/.hermes/skills/fastapi-deploy/SKILL.md          │
│                                                             │
│ 技能被安全扫描（防止恶意代码注入）                            │
│ 通过后，技能正式生效                                         │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 4: 记忆补充                                            │
│                                                             │
│ Agent 还可能调用 memory 保存：                                │
│ - memory(target="memory", action="add",                     │
│    content="用户有 Docker 服务器在 example.com")              │
│ - memory(target="user", action="add",                       │
│    content="用户部署服务时偏好使用 docker-compose 而不是 k8s") │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ 未来会话                                                    │
│                                                             │
│ 用户再次说："帮我部署 FastAPI 到服务器"                        │
│ → 系统提示词包含 fastapi-deploy 技能                         │
│ → 大模型参考技能执行，不需要 Agent 从头摸索                    │
└─────────────────────────────────────────────────────────────┘
```

### 9.5 自学习的安全性

**技能安全扫描** (`skills_guard.py` + `skill_manager_tool.py:48-74`)：

Agent 创建的技能会经过两层安全检查：
1. `_security_scan_skill()`：调用 `scan_skill()` 和 `should_allow_install()` 检查：
   - 可疑的文件路径遍历（如 `../../../etc/passwd`）
   - 恶意的 shell 命令（如 `rm -rf` 除非是技能自身目录）
   - 可疑的网络请求（如将敏感文件外发）
2. 如果安全扫描失败，技能会被拒绝创建并回滚

**记忆内容安全扫描** (`memory_tool.py:90 _scan_memory_content()`)：

记忆内容同样会经过安全扫描，防止：
- 提示词注入攻击
- 敏感信息外泄

**并发安全** (`memory_tool.py:143 _file_lock()`)：

记忆文件使用文件锁 + 原子写入，防止并发写入导致文件损坏。

### 9.6 自学习总结

| 学习类型 | 触发时机 | 保存位置 | 作用 |
|---------|---------|---------|------|
| **记忆 (Memory)** | 用户纠正、偏好透露、环境发现 | `~/.hermes/memories/*.md` | 跨会话记住事实和偏好 |
| **技能 (Skill)** | 复杂任务完成、可能复用 | `~/.hermes/skills/<name>/SKILL.md` | 跨会话复用任务流程 |
| **技能改进** | 技能执行中发现问题 | 更新 `SKILL.md` 内容 | 持续优化技能质量 |

**一句话总结**：记忆是 Agent 的"个人笔记"，技能是 Agent 的"标准化操作手册"。通过两者结合，Agent 能够从每次交互中学习，不断提升自己的能力。

---

### 十、其他重要实现细节

以下细节对理解系统行为很重要，但在前面的章节中没有覆盖：

#### 10.1 工具并发执行

```python
# run_agent.py:239
_MAX_TOOL_WORKERS = 8
```

部分工具支持并行执行，最多 8 个工作线程。这可以显著加速需要调用多个独立工具的场景。

#### 10.2 插件钩子 (pre_tool_call / post_tool_call)

```python
# model_tools.py:458-486
# 工具执行前后的扩展点
get_pre_tool_call_block_message(...)
post_tool_call_hook(...)
```

插件可以在工具执行前拦截（返回错误则阻止执行）和执行后处理（修改结果或做额外操作）。

#### 10.3 Anthropic Prompt Caching

当使用 Claude via OpenRouter 时，系统自动使用 `cache_control` 减少 token 费用（`run_agent.py:9192`）。这是成本优化的重要细节。

#### 10.4 Codex Responses API

系统支持 OpenAI Codex Responses API，有独立的响应解析逻辑和 API 处理路径，与标准 OpenAI 风格的处理不同。

#### 10.5 模型名称规范化

`hermes_cli/model_normalize.py` 处理的是**模型名称规范化**（如 `claude-sonnet-4.6` → `anthropic/claude-sonnet-4.6` 用于 OpenRouter），这影响的是路由和提供商匹配，不是响应格式处理。
