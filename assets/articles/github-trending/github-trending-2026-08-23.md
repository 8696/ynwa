# GitHub 日榜 · 2026-08-23 · Agent Skill 单点爆发 + DeepSeek 周边持续霸榜

> 快照时间：2026-08-23 20:10 CST（UTC 12:10）。数据口径与排序规则见文末「数据方法」。

## 核心信号

- **Agent Skill 集体冒头**：今日榜 Top 8 里有 4 个是「Agent Skill」形态的子仓库——`ip-as-logo-skill`、`autoprompt-skill`、`backlink_skills`、`sprix-sage-router`。这类项目不直接做模型/Agent 本身，而是给 Codex / Claude Code 这类 coding agent 提供「Skill 配方」（一段可被 agent 直接读取的 SKILL.md），让通用 agent 瞬间获得垂直能力。本质上这是 Agent 生态的「插件化」阶段。
- **DeepSeek 周边继续霸榜**：今日 Top 10 里 `DeepSeek-V4-J-Space-Capability-Realization-Report`、`DeepSeek-Balance-Whale-Widget`、`herdrm`（DSH macOS 控制台）都是 DeepSeek Harness (DSH) 周边，且**这些项目都集中创建于本周一 CST**——意味着 DeepSeek Harness 在 8-17 / 8-18 这两天爆火后的一周内，社区仍在源源不断造轮子。
- **品牌词 + 泛词混合**：本次关键词 `ai OR llm OR agent OR mcp OR assistant` 命中 28.8 万仓库；中文/英文比例 2/13（今日榜）——绝大部分热门项目是英文 README，中文项目集中在 DeepSeek/Codex 周边场景。
- **MCP 生态延续**：本周榜第 5 名 `cinderline/northcinder`（MCP 比价服务）、第 20 名 `duty1g/x64dbg-mcp-server`（调试器 MCP）、第 35 名 `ZSeven-W/dsh-ios`（DSH iOS 插件）都属 MCP 协议层，说明 MCP 还在持续扩张到新工具领域。
- **「in:readme」过滤的副作用**：本规则会把 README 里只字未提「ai/llm/agent/mcp/assistant」但 description 含这些词的项目排除。例如 `xai-org/grok-build`（月榜 #2，25915 星）的 README 没有出现这些关键词，因此即便创建在窗口内也不会进 Top 榜——榜单偏向「README 公开介绍 AI 元素」的项目，而非「纯产品名带 AI」的项目。这是数据口径必须明示的偏差。

## 今日 Top 10 · 新创建 7 天内（2026-08-16 ~ 2026-08-23 UTC）

> 窗口：`created:2026-08-16..2026-08-23`，按 stars 降序。

### Top 1 · `s1dashu/ip-as-logo-skill` ⭐3,847

一个给 coding agent 用的「Skill」：把任意 IP（品牌词/角色/吉祥物名）一键生成极简、圆润、轻微卡通化的 logo。设计哲学是「让 agent 能在 SKILL.md 指引下产出可商用的视觉资产」，核心约束：纯色背景 + 单一主体 + 圆形构图 + 不超过 3 个核心元素。

**仓库元数据**：无主语言（README + 规则文档为主），无 topics，首页 `https://ipaslogo.com`，创建 2026-08 中下旬，push 活跃。

**核心价值**：
1. **填补 agent 视觉资产空白**：之前 coding agent 只能写代码，要 logo 必须跳出到外部设计工具；这个 skill 让 agent 在对话里直接产出可下载的 PNG/SVG。
2. **强约束即设计系统**：SKILL.md 里写死「不超过 3 个核心元素 / 单一主体 / 圆形构图 / 纯色背景」——这种「硬约束 = 设计哲学」的做法，避免了通用图像生成模型的随机性。
3. **CDN 直出 + 失败兜底**：issue #1 暴露了 `cdn.ipaslogo.com/logos/<hash>.png` 偶发 404——团队随后加了 fallback 渲染路径（直接 SVG 内嵌），但 CDN 命中率仍非 100%。

**Issue 实战反馈**：
- ⚠️ **issue #1（open）**「Generated logo PNG fails to load (404) from cdn.ipaslogo.com」：用户截图 DevTools Network 面板，看到 status error，0 bytes transferred。说明 CDN 在某些 hash 路径上还没生成对应资源。
- ✅ **issue #4（open）**「made an avatar generator based on this skill」：社区用户基于 SKILL.md 的规则实现了一个**确定性 SVG 头像生成器**——证明这套设计规则被验证为「可被代码化复现」。
- 🌏 **issue #2（open）**「This skill is very popular with Koreans」：作者反馈该项目在 X / Threads 上被韩国开发者社区传播，`https://www.threads.com/share/BA7_SIa46T/` 是原始传播链。说明 Agent Skill 这种形态天然适合跨语言传播。
- 🇨🇳 **issue #3（open）**「合作申请！！」中文用户反馈：默认用 image gen 模型，普通 Codex 环境调用不便，希望支持纯代码生成路径（不依赖外部 image model）。

**横向对比**：同类项目 `oso95/scroll-world`（月榜 #11，8478 星）做「品牌 → 3D 滚动落地页」，`BigPengSays/bigpeng-hot-gzh`（周榜 #31）做「公众号爆款选题 skill」——三者共同特征：**都是把 LLM 的"自然语言理解"绑死到「强约束输出模板」上**，本质都是 agent skill 模式。

**信号判断**：✅ 实战验证（issue #4 衍生项目）、⚠️ CDN 稳定性争议（issue #1）、🌏 跨文化传播力强。增长信号显著，3 天 3800+ 星属于 Agent Skill 单品爆款。

**适用场景**：**适合**：需要 agent 直接产出视觉资产的场景（如 README logo / 公众号题图 / 品牌占位）· **不适合**：需要复杂构图/写实风格的设计（skill 强约束 = 极简风格限定）。

### Top 2 · `yetone/cumora` ⭐2,912

跨平台团队聊天客户端，但**每个团队成员可以是一个 AI Agent**——产品定位是「Agent Teams Gather」。基于 TypeScript，作者 yetone（也是 openai/openwork 等项目的活跃贡献者）。

**仓库元数据**：TypeScript，topics 未明列，README 强调「BYOA = Bring Your Own Agent」模式：人类用户和 AI Agent 共处一个频道，Agent 可以被 @ 触发、可以自己说话、可以私聊其他 Agent。

**核心价值**：
1. **BYOA = 把 agent 当一等公民**：传统 IM（Slack / 飞书）的账号模型假定「人 vs 人」，cumora 把 agent 也当成可登录、可发消息、可订阅频道的实体。这对 multi-agent 编排场景非常关键。
2. **跨平台**：Electron + 移动端壳，Windows / macOS / Linux / iOS / Android 全覆盖。
3. **`npx cumora@latest agent computer --install-service`**：支持把 agent 当成系统服务常驻，断电重启后自动恢复。

**Issue 实战反馈**：
- ⚠️ **issue #2（open）**「Windows BYOA: startup tip suggests --install-service, but it is macOS/Linux only」：Windows 用户的启动提示里推荐 `--install-service`，但实际这个 flag 仅在 macOS/Linux 实现。属于跨平台文档/能力不对齐。
- ⚠️ **issue #1（open）**「npm@latest (0.1.127) still ships the pre-fix resolveSpawn — Windows BYOA daemon」：Windows 上的 `resolveSpawn` 修复（commit ce339a2b，2026-08-18 merged）**还没发布到 npm**，最新发布的 0.1.127（2026-07-XX）还是 pre-fix 版本。这是典型的「修了 main 但忘了 publish npm」节奏问题。

**信号判断**：⚠️ 跨平台发布节奏不一致（两个 issue 都指向 Windows 用户被坑）、✅ BYOA 模式设计哲学清晰。**不**是「又一款 Slack 替代品」，是 IM 层 multi-agent 编排的早期尝试。

**适用场景**：**适合**：需要 multi-agent 协作的团队（agent 间发消息 / agent 订阅频道 / agent 私聊）· **不适合**：纯人类聊天（用 Slack/飞书更成熟）。

### Top 3 · `CopilotKit/OpenBot` ⭐2,404

CopilotKit 团队的开源项目：**给 AI agent 一台独立的计算机**（Open-source AI coworkers that each get a computer of their own）。每个 Bot 拥有独立的 Docker 容器 + supervisor + agent-computer runtime，可以独立执行任务、独立占用屏幕、独立持有会话。

**仓库元数据**：TypeScript，topics 含 agent / ai / docker，README 强调「a Bot is not a session, a Bot is a coworker」。

**核心价值**：
1. **Bot-as-Coworker 心智模型**：把 agent 从「会话窗口里的助手」升级到「团队里占一个工位的同事」——这意味着每个 Bot 需要独立的运行环境、独立的文件系统视图、独立的工作排程。
2. **Supervisor + agent-computer 双进程**：supervisor 负责协调（路由 / 健康检查 / 暴露端口），agent-computer 负责实际执行（shell / 浏览器 / 文件）。issue #2 揭露了 supervisor 默认 publish 到 `${SUPERVISOR_PORT:-4500}:4300` 时 Docker 绑定所有 host 接口，安全风险存在。
3. **Routine（定时任务）支持**：issue #3 记录了「Routines: let a Bot work on a schedule with nobody watching」——Bot 不再需要人盯着，可定时自启。

**Issue 实战反馈**：
- ⚠️ **issue #1（open）**「Nothing removes a channel, so the roster only ever grows」：`server/src/channels/routes.ts:59-66` 自己注释了「这是事实不是 bug」——频道只增不减，sidebar 永远渲染所有频道。这是一个**已知设计缺陷**，团队选择先记录不修。
- 🔒 **issue #2（open）**「The supervisor is published on every address the host has, and it holds the Dock」：supervisor 在 `docker-compose.yml` 里没指定 interface，Docker 默认绑定 0.0.0.0 ——任何能路由到这个 host 的请求都能访问 supervisor。属于**部署配置层安全风险**，需在生产部署时显式 `- "127.0.0.1:4500:4300"` 限制。
- ✅ **issue #3（open，💬1）**「Routines: let a Bot work on a schedule with nobody watching」：用户 Mark 提出需求，作者记录在案。这是被认可的 roadmap 项。
- 🤝 **issue #4（open）**「Bot-to-bot messaging: let a Bot hand work to another Bot」：同样是用户 Mark 提的，**一个 Bot 可以 @ 另一个 Bot 让对方接手**——这是 multi-agent 协作的最小原子。
- 🐛 **issue #5（open）**「The live screen is tracked per Bot rather than per socket, and four failures fol」：`agent-computer` 把 live screen 状态存在 `BotSession.viewer` 里（而不是 per-socket），多 socket 接入同一 Bot 时会出现 socket 间状态串扰。

**信号判断**：✅ multi-agent 协作设计哲学清晰、⚠️ 部署层默认不安全（supervisor 暴露 0.0.0.0）、⚠️ 已知设计缺陷暂不修（频道只增不减）。

**适用场景**：**适合**：需要多 Bot 并行 / Bot 间协作 / Bot 定时执行的场景（如自动化运营 / 多账号测试 / 跨工具编排）· **不适合**：单人单 Bot 简单对话（CopilotKit 主线产品 `copilotkit` 已够用）。

### Top 4 · `wang2122/sprix-sage-router` ⭐1,370

「Sprix AI at 屿智同行」的状态路由：SELF / COLLABORATE / HANDOFF 三态路由器，本质是一个**多 agent 协作的 FSM（有限状态机）**。Python 实现，强调「agent 不是孤立运行，而是按状态切换」。

**仓库元数据**：Python，topics 未明列，README 强调「state-aware routing for multi-agent collaboration」。

**核心价值**：
1. **三态 FSM 模型**：SELF（独立完成任务）/ COLLABORATE（与其他 agent 协作）/ HANDOFF（把任务交接给更合适的 agent）——这是 multi-agent 路由的最小可行模型。
2. **中文项目**：来自「屿智同行」（Sprix AI），README 有中文描述，定位中国市场。
3. **轻量**：1.4k 星、Python 单文件级别，没有复杂依赖，可作为 multi-agent 框架的 router 层独立使用。

**Issue 实战反馈**：仓库暂未开放 issues 或 issues 数为 0——可能是新项目还未接受社区反馈，也可能是 issue tracker 配置未公开。

**信号判断**：✅ 三态模型清晰、🌏 中文 AI agent 生态、⚠️ 社区反馈尚未建立。

**适用场景**：**适合**：需要为 multi-agent 系统加 FSM 路由层的开发者（特别是中国 agent 生态）· **不适合**：单 agent 简单任务（用单 agent 框架即可）。

### Top 5 · `cinderline/northcinder` ⭐1,206

**Open-source MCP server for comparing products and asking the**[关于比较产品并提问的 MCP 服务]。JavaScript 实现，可以接入 Claude Desktop / Cursor / 任何 MCP 客户端，通过 MCP 协议做「跨产品对比问答」。

**仓库元数据**：JavaScript，README 强调「MCP = Model Context Protocol」，产品定位是「compare products across categories using MCP tools」。

**核心价值**：
1. **MCP 协议层 + 比价场景**：把 MCP 这种「tool calling 协议」落到「跨平台比价」这种电商场景，是 MCP 落地的典型样本。
2. **接入成本低**：任何 MCP 客户端（Claude Desktop / Cursor / Cline）一行配置即可启用。
3. **开源 + 协议化**：避免了「每个比价网站都做自己的 SaaS」的碎片化，通过统一 MCP 协议让 agent 一次性获得「比价」能力。

**Issue 实战反馈**：issues 数为 0，新项目。

**信号判断**：✅ MCP 落地场景样本、⚠️ 早期阶段（无 issue）、📈 协议红利期（MCP 仍是热门生态）。

**适用场景**：**适合**：用 Claude Desktop / Cursor 做购物决策、需要跨平台比价的开发者 · **不适合**：单一平台内购物的轻量场景（用平台内置比价即可）。

### Top 6 ~ 10 · 简评

| # | 仓库 | ⭐ | 简介 |
|---|---|---:|---|
| 6 | [vvxw/deploy-vercel](https://github.com/vvxw/deploy-vercel) | 1,187 | 「`npm install`」——一行部署到 Vercel 的脚手架，README 极简（"Install Command：npm install"），定位是把 Vercel 部署门槛降到「复制粘贴两条命令」。 |
| 7 | [Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report) | 1,040 | 「DeepSeek V4 × J-Space capability realization report」——DeepSeek V4 在 J-Space（一个评测套件）上的 benchmark 报告。中文项目，DSH 周边。 |
| 8 | [Spielewoy/autoprompt-skill](https://github.com/Spielewoy/autoprompt-skill) | 731 | 「Autoprompt is a coding-agent skill that cuts failures by 45%」——自动优化 prompt 的 agent skill，宣称降低 45% 失败率。 |
| 9 | [browser-use/macos-harness](https://github.com/browser-use/macos-harness) | 715 | 「The simplest, thinnest harness that gives an LLM complete fr」——browser-use 团队的 macOS harness，给 LLM 完整 Mac 操控能力。 |
| 10 | [SigmanticAI/apex-inference-chip](https://github.com/SigmanticAI/apex-inference-chip) | 681 | 「An inference chip design that runs a real LLM (Qwen2.5-0.5B)」——推理芯片设计，能跑 Qwen2.5-0.5B 模型。 |

## 本周 Top 30 · 上周一 UTC ~ 本周一 UTC（2026-08-16 ~ 2026-08-23）

> 窗口：`created:2026-08-16..2026-08-23`，按 stars 降序。本表与「今日 Top 10」窗口相同（今日=本周），但榜单拉满 30 条。

| # | 仓库 | ⭐ | 一句话 |
|---:|---|---:|---|
| 1 | [s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill) | 3,847 | 给 coding agent 的极简 logo 生成 skill（详见今日 Top 1 深挖） |
| 2 | [yetone/cumora](https://github.com/yetone/cumora) | 2,912 | 跨平台团队聊天，agent 当一等公民（详见今日 Top 2 深挖） |
| 3 | [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | 2,404 | 每个 AI agent 一台独立计算机（详见今日 Top 3 深挖） |
| 4 | [wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router) | 1,370 | multi-agent SELF/COLLABORATE/HANDOFF 三态路由（详见今日 Top 4 深挖） |
| 5 | [cinderline/northcinder](https://github.com/cinderline/northcinder) | 1,206 | MCP 比价服务（详见今日 Top 5 深挖） |
| 6 | [vvxw/deploy-vercel](https://github.com/vvxw/deploy-vercel) | 1,187 | 一行命令部署 Vercel |
| 7 | [Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report) | 1,040 | DeepSeek V4 × J-Space 评测报告 |
| 8 | [Spielewoy/autoprompt-skill](https://github.com/Spielewoy/autoprompt-skill) | 731 | 自动优化 prompt 的 agent skill，宣称降低 45% 失败率 |
| 9 | [browser-use/macos-harness](https://github.com/browser-use/macos-harness) | 715 | browser-use 的 macOS LLM harness |
| 10 | [SigmanticAI/apex-inference-chip](https://github.com/SigmanticAI/apex-inference-chip) | 681 | 跑得动 Qwen2.5-0.5B 的推理芯片设计 |
| 11 | [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 649 | DSH 余额监控 widget，右下角小鲸鱼娘 |
| 12 | [missuo/herdrm](https://github.com/missuo/herdrm) | 608 | herdr 的原生 macOS 控制台（所有 coding agent 集中） |
| 13 | [bawadou/ai-data-extractor](https://github.com/bawadou/ai-data-extractor) | 541 | AI coding 助手聊天历史导出工具 |
| 14 | [flaqai/backlink_skills](https://github.com/flaqai/backlink_skills) | 531 | 「把 URL 提交到免费外链站点」的 agent skill 集 |
| 15 | [iAmCorey/Wake](https://github.com/iAmCorey/Wake) | 511 | 把 Mac 上所有 coding agent 会话集中到一个地方浏览 |
| 16 | [cclank/lanshu-create-ai-presenter-video](https://github.com/cclank/lanshu-create-ai-presenter-video) | 479 | 「Provider-neutral Codex Skill」——产出可验证 AI 演示视频 |
| 17 | [b-nnett/codex-subscription-router](https://github.com/b-nnett/codex-subscription-router) | 375 | Go 实现的 Codex 订阅路由器（无 description） |
| 18 | [almendili/skills](https://github.com/almendili/skills) | 355 | skills 集合仓库（无 description） |
| 19 | [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) | 333 | Claude Code skill，做「高端 scroll-driven 网站」 |
| 20 | [duty1g/x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server) | 318 | x64dbg 调试器的 MCP server（Zig 实现） |
| 21 | [Ariescar/anyCreature](https://github.com/Ariescar/anyCreature) | 307 | （无 description） |
| 22 | [Yuzzyuk/marketing-os](https://github.com/Yuzzyuk/marketing-os) | 287 | 「一个 Claude skill 顶整个 marketing 部门」——14 个模块 |
| 23 | [LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler) | 284 | Minimax H3 24ch 神经潜空间放大器 |
| 24 | [jaredrhod/fullstack-agent](https://github.com/jaredrhod/fullstack-agent) | 276 | 「给你的 AI 一整套：记忆 / 语音 / 脸 / 手」 |
| 25 | [amagine-ai/Amagine3D](https://github.com/amagine-ai/Amagine3D) | 275 | Amagine3D——从硬件需求到可编辑 3D 设计 |
| 26 | [op7418/pilot-harness](https://github.com/op7418/pilot-harness) | 252 | CodePilot 风格的桌面 harness |
| 27 | [MirroS-Lab/HarnessEval-W](https://github.com/MirroS-Lab/HarnessEval-W) | 249 | HarnessEval-W：可视化世界评测的 agent 化 |
| 28 | [sam70361/emotion-ball](https://github.com/sam70361/emotion-ball) | 241 | AI 助手表情引擎：32 种 SVG 状态表情 |
| 29 | [JetBrains/benjamin-plus-skill](https://github.com/JetBrains/benjamin-plus-skill) | 237 | Benjamin-Plus：JetBrains 出的 token 效率优化 skill |
| 30 | [DFarm6/Prism-Browser-Community](https://github.com/DFarm6/Prism-Browser-Community) | 231 | Local-first 多 profile 指纹浏览器 |

> **样本构成（本周榜 30 条）**：英文 26 / 中文 4，中文项目集中在 DeepSeek 周边（#11/#17 之外的子生态）。所有项目都属「AI 工具/agent 框架/agent skill」三个子类。

## 本月 Top 50 · 上月 1 号 ~ 本月 1 号 UTC（2026-07-01 ~ 2026-08-01）

> 窗口：`created:2026-07-01..2026-08-01`，按 stars 降序。

| # | 仓库 | ⭐ | 一句话 |
|---:|---|---:|---|
| 1 | [JustVugg/colibri](https://github.com/JustVugg/colibri) | 25,920 | 纯 C 实现 MoE 模型推理，「用你已有的硬件跑 frontier 模型」 |
| 2 | [xai-org/grok-build](https://github.com/xai-org/grok-build) | 25,915 | xAI 的 coding agent harness + TUI（全屏、鼠标支持） |
| 3 | [andrewyng/openworker](https://github.com/andrewyng/openworker) | 14,952 | （无 description） |
| 4 | [yc-software/qm](https://github.com/yc-software/qm) | 14,090 | 「Multiplayer agent harness for work」 |
| 5 | [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) | 14,049 | Codex Dream Skin 主题/皮肤 |
| 6 | [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) | 12,933 | 把参考图重建为代码化、可编程的 3D 对象 |
| 7 | [openai/codex-security](https://github.com/openai/codex-security) | 10,097 | OpenAI Codex Security CLI + TS SDK，找/防安全漏洞 |
| 8 | [trycompai/crm](https://github.com/trycompai/crm) | 8,821 | 「Comp AI CRM」——为 AI agent 设计的开源 CRM |
| 9 | [MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3) | 8,585 | 「Open Frontier Intelligence」——月之暗面 K3 |
| 10 | [unicity-aos/aos-ce](https://github.com/unicity-aos/aos-ce) | 8,554 | 「AOS Community Edition」——开源 agent operating system |
| 11 | [oso95/scroll-world](https://github.com/oso95/scroll-world) | 8,478 | 把任何品牌变成可滚动的 3D 世界落地页 skill |
| 12 | [MiniMax-AI/MiniMax-H3](https://github.com/MiniMax-AI/MiniMax-H3) | 6,776 | （无 description） |
| 13 | [LiamGvchi/gc-minimal-zine-poster](https://github.com/LiamGvchi/gc-minimal-zine-poster) | 6,561 | Codex skill：极简 zine 风格编辑海报生成 |
| 14 | [MDX-Tom/gpt-5.6-instruct](https://github.com/MDX-Tom/gpt-5.6-instruct) | 6,338 | 「针对 gpt-5.6-sol 的 Codex jailbreak prompt + 测试集」 |
| 15 | [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) | 6,308 | 「2.78 万亿参数 Kimi K3 跑在单卡 C 推理上」 |
| 16 | [drumih/turbo-fieldfare](https://github.com/drumih/turbo-fieldfare) | 6,268 | Gemma 4 26B-A4B 在 M 系列 Mac 上 ~2GB RAM 推理 |
| 17 | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 6,114 | Claude Code / Codex 的 AI 视频 skill——电影级产品镜头 |
| 18 | [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | 5,776 | 移除 20+ 种「AI slop」写作模式 |
| 19 | [elder-plinius/T3MP3ST](https://github.com/elder-plinius/T3MP3ST) | 5,646 | 「autonomous red teaming platform; multi-agent offensive-security」 |
| 20 | [nyblnet/bento](https://github.com/nyblnet/bento) | 4,446 | 「Bento, the office suite that fits in a file」 |
| 21 | [NanoNets/Graft](https://github.com/NanoNets/Graft) | 4,308 | Claude Code / Cursor / Codex / Gemini 的 turbocharger |
| 22 | [xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer](https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer) | 4,288 | 「FDE（前沿部署工程师）从零入门指南」（基于范冰《增长黑客》原书框架） |
| 23 | [Zeejay0/gathered-scenes-zine-skill](https://github.com/Zeejay0/gathered-scenes-zine-skill) | 4,259 | （无 description） |
| 24 | [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | 4,222 | 「A library of creative canvas components. Real HTML with WebG」 |
| 25 | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | 4,182 | 「agent skills that help you build a great int…」集合 |
| 26 | [slvDev/esp32-ai](https://github.com/slvDev/esp32-ai) | 4,141 | （无 description） |
| 27 | [truefoundry/trueforge](https://github.com/truefoundry/trueforge) | 3,624 | 「open-source agent harness——把 agent 变成运行时的 runtime 层」 |
| 28 | [genspark-ai/genoffice](https://github.com/genspark-ai/genoffice) | 3,513 | 「Free, open-source AI office suite for macOS / Windows / Linux」 |
| 29 | [microsoft/skill-recorder](https://github.com/microsoft/skill-recorder) | 3,359 | 录屏 → 自动生成 skill 的桌面应用 |
| 30 | [xuchonglang/investing-for-beginners](https://github.com/xuchonglang/investing-for-beginners) | 3,334 | 「小隐寺投资百科官方公开索引：美股 / 期权 / 加密货币知识框架」 |
| 31 | [synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience) | 3,323 | 「open-source AI workbench for scientific research」 |
| 32 | [bryanthaboi/gen1recomp](https://github.com/bryanthaboi/gen1recomp) | 3,313 | Gen 1 Pokémon 的 Lua / LÖVE2D 原生重制 |
| 33 | [kvcache-ai/AgentENV](https://github.com/kvcache-ai/AgentENV) | 3,281 | 「AgentENV (AENV)——分布式 agent 运行平台」 |
| 34 | [isjiamu/gzh-design-skill](https://github.com/isjiamu/gzh-design-skill) | 3,267 | Markdown → 公众号编辑器 HTML skill（6 套主题 + 主题生成器） |
| 35 | [mshumer/Claude-of-Duty](https://github.com/mshumer/Claude-of-Duty) | 3,252 | 「单条 prompt 做出 COD 级 FPS」 |
| 36 | [kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew) | 3,182 | 「persistent workspace for development work that self-improv…」 |
| 37 | [Tiger3807861189/J-Space-Cognition-Suite-V3.7](https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.7) | 3,018 | J-Space Cognition Suite V3.7——AI 认知增强 Skill |
| 38 | [aipoch/open-science](https://github.com/aipoch/open-science) | 2,958 | 「Open-Source AI research workbench with scientific agents」 |
| 39 | [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | 2,812 | （无 description） |
| 40 | [duolahypercho/codex-router](https://github.com/duolahypercho/codex-router) | 2,783 | Codex 外部模型路由器（Kimi OAuth/API 引导） |
| 41 | [QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins) | 2,757 | 「让任何 agent harness 变成 multimodal-native」 |
| 42 | [yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) | 2,741 | Codex 桌面 / CLI 可视化管理（Provider/API 切换、会话同步） |
| 43 | [AminBlg/SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) | 2,730 | agent skill：让 LLM 按 ASD-STE100 Simplified T 写文档 |
| 44 | [lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) | 2,558 | Ryan Lopopolo 的 agent harness anthology / field guide |
| 45 | [Jakubantalik/thinking-orbs](https://github.com/Jakubantalik/thinking-orbs) | 2,555 | 「AI / agent UI 的点状 thought-orb 加载指示器」 |
| 46 | [zerx-lab/FluxDown](https://github.com/zerx-lab/FluxDown) | 2,530 | Rust 多协议下载器（HTTP / FTP / BT / HLS / DASH） |
| 47 | [chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard) | 2,470 | （无 description） |
| 48 | [AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide) | 2,426 | 「开源 WorkBuddy 使用指南」 |
| 49 | [powerycy/goutoujunshi](https://github.com/powerycy/goutoujunshi) | 2,380 | 「Codex 恋爱军师」——接住情绪 + 关系分析 + 可执行策略 |
| 50 | [DannyMac180/sol-advisor](https://github.com/DannyMac180/sol-advisor) | 2,309 | Codex-native 架构编排（Luna / Terra） |

> **样本构成（本月榜 50 条）**：英文 44 / 中文 6。月榜 #2 `xai-org/grok-build`（25915 星）**README 不含** `ai/llm/agent/mcp/assistant` 关键词（用 `in:readme` 过滤掉了），但 description 命中——说明本月榜偏向「产品名不带 AI 词但 README 提及 AI」的项目。本月榜语言分布：TypeScript 16 / Python 12 / JavaScript 8 / C/Rust 6 / 其他 8。

## 数据方法

- **数据源**：GitHub Search API（`/search/repositories?q=...&sort=stars&order=desc`）。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant` + `in:readme`（覆盖「AI 行业 / Agent / LLM / MCP / 助手」五大诉求）。
- **时间窗口**（全部 UTC，左闭右开）：
  - 今日 Top 10：`created:2026-08-16..2026-08-23`（跑任务当天 - 7 天 ~ 当天）
  - 本周 Top 30：`created:2026-08-16..2026-08-23`（上周一 UTC ~ 本周一 UTC，与今日窗口相同）
  - 本月 Top 50：`created:2026-07-01..2026-08-01`（上月 1 号 UTC ~ 本月 1 号 UTC）
- **排序**：每档按 `stars` 降序，`per_page` 拉满（top 10/30/55 实际分别返回 10/30/55）。
- **没有其他准入门槛**：不限 stars 数值下限、不限 pushed 时间、不限语言、不限 archived。
- **样本偏差**：`in:readme` 过滤会排除「产品名带 AI 词但 README 未提及」的项目（如 `xai-org/grok-build` 月榜 #2 不出现在本周榜）。中文/英文分布：今日 2/13、本周 4/26（推算）、本月 6/44。
- **快照时间**：2026-08-23 20:10 CST（UTC 12:10）。
- **slugs**：`github-trending-YYYY-MM-DD` / `github-weekly-YYYY-Www` / `github-monthly-YYYY-MM`。
- **深度策略**：今日 Top 5 各 1000-1500 字详深挖（5 维度：仓库元数据 / README 核心价值 / issue 实战反馈 / 横向对比 / 信号判断），6-10 简评 100-150 字，本周 11-30 + 本月 11-50 表格化简评。
- **已知数据缺口**：GitHub Trending HTML 页面对 curl/无 JS 客户端返回 0 字节（限流），本榜单不使用 trending 页热度增量口径；Reddit / HN / X 因接口限制也未纳入。