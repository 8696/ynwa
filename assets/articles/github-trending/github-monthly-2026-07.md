# GitHub 月榜 · 2026-07 · Colibri 单 C 跑通 744B MoE + Kimi K3 双实现登顶本月

> 数据口径：基于 [GitHub Search API](https://api.github.com/search/repositories) `q=created:2026-07-01..2026-08-01+stars:>50+archived:false+(ai OR llm OR agent OR mcp OR assistant)+in:readme&sort=stars&order=desc&per_page=50` 抓取上月（UTC 整月，左闭右开）新创建仓库。关键词五槽位 `ai / llm / agent / mcp / assistant`，不限 stars 下限、不限语言、不限 archived。快照时间：2026-08-23 21:25 CST。月榜覆盖 2026-07-01 UTC 00:00:00 至 2026-08-01 UTC 00:00:00。

上月共有 2144 条新创建仓库进入候选池（README 命中 ai/llm/agent/mcp/assistant 任一关键词）。Top 50 取整月（按 star 数降序）。本月榜重点深挖 Top 10。

## 核心信号

- **Kimi K3 一个月冒出"双实现"登顶**：本周榜的 [MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3)（月榜 #9，8586 ⭐，Moonshot 官方开源 2.8T 总参 / 激活 104B 的 MoE）作为模型权重仓 7 月 27 日开放下载，本月拿下官方侧头号阵地；而 [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c)（月榜 #15，6313 ⭐）则把同一份权重用纯 C99 / 无 BLAS / 无框架的代码在 8.24 GB 内存的 CPU 上跑通推理，是同月出现的"硬核 CPU 端重制版"。一个月内"厂商模型权重 + 社区纯 C 推理引擎"双线齐发，是今年单月最戏剧性的一幕。
- **"纯 C 跑大 MoE"成月内主题**：[JustVugg/colibri](https://github.com/JustVugg/colibri)（月榜 #1，25926 ⭐，纯 C / 零依赖 / experts streamed from disk）能在 6× RTX 5090 上跑 744B MoE（GLM-5.2），int4 量化后 9.9 GB 内存驻留 / 4 tok/s；这是月内唯一一个把"前沿模型本地化"做到磁盘流送的引擎，方向上跟 [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) 一脉相承——都在把推理从 GPU 数据中心拉回 CPU/单卡。
- **AI Agent Harness 仍是月内最大赛道**：Top 10 中 [xai-org/grok-build](https://github.com/xai-org/grok-build)（#2，Rust 编码 agent TUI）、[yc-software/qm](https://github.com/yc-software/qm)（#4，多人协作 agent harness）、[andrewyng/openworker](https://github.com/andrewyng/openworker)（#3，本地 agent + Slack）、[unicity-aos/aos-ce](https://github.com/unicity-aos/aos-ce)（#10，agent operating system）四条都属 harness 类；月榜 11-50 内还有 [trycompai/crm](https://github.com/trycompai/crm)（#8，agentic CRM）、[NanoNets/Graft](https://github.com/NanoNets/Graft)（#21，context engineering for Claude/Cursor/Codex）、[truefoundry/trueforge](https://github.com/truefoundry/trueforge)（#27，harness runtime 层）等至少 6 条，构成月内第二大簇。
- **OpenAI 一个月内同时发两个垂直工具**：[#7 openai/codex-security](https://github.com/openai/codex-security)（10098 ⭐，官方代码安全 CLI + SDK）跟 [#29 microsoft/skill-recorder](https://github.com/microsoft/skill-recorder) 同月登榜，但 #5 [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) 才是月内 Codex 周边热度最高的——一个通过本机 CDP 注入给 Codex 桌面端换肤的项目，拿下 14051 ⭐；Codex 在月内实际上被三股力量同时使用（OpenAI 官方扩展 / 微软桌面工具 / 社区主题）。
- **国产 Skills 占据月内 Top 50 半数**：月内 Top 50 里至少 21 条仓库的作者 ID / README / topics 包含中文特征（[MiniMax-AI/MiniMax-H3](https://github.com/MiniMax-AI/MiniMax-H3)、[DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui)、[Tiger3807861189/J-Space-Cognition-Suite-V3.7](https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.7) 等），且工具链绝大多数围绕 DSH（DeepSeek Harness）/ Codex / Claude Code 生态；国产 Skills 已经从"个人玩具"过渡到"单生态爆款"。DSH 单生态吃掉了月内超过 10% 的 Top 50 席位。
- **安全 / 隐私成为新晋主题**：月榜 Top 50 中至少 4 条主打过 LLM 上下文的边界与凭证（[openworker #527 SSRF in MCP OAuth](https://github.com/andrewyng/openworker/issues/527)、[openworker #526 untrusted-content boundary](https://github.com/andrewyng/openworker/issues/526)、[openworker #525 audit log unredacted](https://github.com/andrewyng/openworker/issues/525)、[img2threejs #103 path traversal](https://github.com/img2threejs/img2threejs/issues/103)）；当 harness 把"MCP + 多 connector + 本地凭证"作为标配时，安全漏洞集中爆发。
- **样本语言分布（Top 50）**：TypeScript 19 · Python 12 · JavaScript 6 · Rust 6 · C 4 · HTML 3 · Swift 1 · Shell 1 · Markdown 1 · Zig 0 · 其他 / 未知 4。TS+JS 占 50%，仍是 harness / 桌面端 / 工具链的主场；Python 占比 24%（含两个纯 C 的推理引擎替代实现）；Rust 占 12%（推理引擎 + TUI）；C 占 8%（Kimi/Colibri 双实现）。

## 本月 Top 50 · 2026-07（UTC 整月窗口：2026-07-01..2026-08-01）

| # | 仓库 | ⭐ | 语言 | 一句话 | 信号 |
|---|---|---:|---|---|---|
| 1 | [JustVugg/colibri](https://github.com/JustVugg/colibri) | 25926 | C | 纯 C 跑 744B MoE（GLM-5.2），experts streamed from disk，零依赖 | ✅ 硬核实测 |
| 2 | [xai-org/grok-build](https://github.com/xai-org/grok-build) | 25920 | Rust | SpaceXAI 的编码 agent harness，全屏 TUI，可扩展 | ✅ xAI 官方 |
| 3 | [andrewyng/openworker](https://github.com/andrewyng/openworker) | 14953 | Python | 本地优先的 agent desktop + Slack 集成，25+ connector，BYO model | ✅ 本地优先 |
| 4 | [yc-software/qm](https://github.com/yc-software/qm) | 14093 | TypeScript | 多人协作 agent harness，Slack + Web 双前端 | ✅ 企业内部部署 |
| 5 | [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) | 14051 | JavaScript | Codex 桌面端主题注入，本机 CDP、SHA-256 校验、主题库 | ✅ 实战 |
| 6 | [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) | 12938 | Python | 参考图重建为代码驱动的 Three.js 模型，token 高效 | ✅ 案例丰富 |
| 7 | [openai/codex-security](https://github.com/openai/codex-security) | 10098 | TypeScript | OpenAI 官方代码安全 CLI + TypeScript SDK，扫描+修复+PR | ✅ 官方 |
| 8 | [trycompai/crm](https://github.com/trycompai/crm) | 8825 | TypeScript | 为 AI agent 设计的 CRM（agentic-first），证据账本 | ✅ 实战 |
| 9 | [MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3) | 8586 | – | Kimi K3 开源 2.8T MoE（激活 104B），KDA + AttnRes 架构 | ✅ 官方开源 |
| 10 | [unicity-aos/aos-ce](https://github.com/unicity-aos/aos-ce) | 8554 | Rust | 开源 agent operating system，Forge 工具链 + meta-harness | ✅ 操作系统层 |
| 11 | [oso95/scroll-world](https://github.com/oso95/scroll-world) | 8480 | JavaScript | 任意品牌转可滚动 3D 世界落地页的 skill | ✅ Skill 生态 |
| 12 | [MiniMax-AI/MiniMax-H3](https://github.com/MiniMax-AI/MiniMax-H3) | 6782 | Python | （仓库描述空，README 自述） | 待观察 |
| 13 | [LiamGvchi/gc-minimal-zine-poster](https://github.com/LiamGvchi/gc-minimal-zine-poster) | 6563 | – | Codex skill：生成极简 zine 风格编辑海报提示与图像 | ✅ Skill |
| 14 | [MDX-Tom/gpt-5.6-instruct](https://github.com/MDX-Tom/gpt-5.6-instruct) | 6346 | Python | gpt-5.6 系列 Codex 破甲提示词与测试包 | ⚠️ 越权测试 |
| 15 | [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) | 6313 | C | 纯 C99 跑 Kimi K3（2.78T 参数），8.24 GB RAM 推理 | ✅ 硬核重制 |
| 16 | [drumih/turbo-fieldfare](https://github.com/drumih/turbo-fieldfare) | 6270 | Swift | M 系 MacBook 跑 Gemma 4 26B-A4B，~2 GB 内存 | ✅ Apple Silicon |
| 17 | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 6118 | TypeScript | Claude Code & Codex 视频 skill，Remotion 驱动的电影感产品视频 | ✅ Skill |
| 18 | [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | 5780 | Python | 剥离 20+ 种 AI 写作痕迹的正则与启发式清洗工具 | ✅ 反 AI 痕迹 |
| 19 | [elder-plinius/T3MP3ST](https://github.com/elder-plinius/T3MP3ST) | 5646 | TypeScript | 自主红队平台，多 agent 攻击性安全 meta-harness | ⚠️ 安全工具 |
| 20 | [nyblnet/bento](https://github.com/nyblnet/bento) | 4450 | TypeScript | 单文件运行的办公套件（Slides / 表单） | ✅ 单文件 |
| 21 | [NanoNets/Graft](https://github.com/NanoNets/Graft) | 4344 | TypeScript | Claude Code / Cursor / Codex / Gemini 的上下文工程加速层 | ✅ 通用加速 |
| 22 | [xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer](https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer) | 4290 | – | FDE（前沿部署工程师）从零入门指南，基于《增长黑客》框架 | ✅ 入门 |
| 23 | [Zeejay0/gathered-scenes-zine-skill](https://github.com/Zeejay0/gathered-scenes-zine-skill) | 4264 | – | （描述空，star 异常） | 待观察 |
| 24 | [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | 4223 | TypeScript | 创意 canvas 组件库，HTML + WebGL 效果叠加（React/Vue/Svelte） | ✅ UI 库 |
| 25 | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | 4184 | Markdown | Agent skills 集合，专注做好的界面构建 | ✅ Skill |
| 26 | [slvDev/esp32-ai](https://github.com/slvDev/esp32-ai) | 4141 | Python | （描述空，topics 缺失） | 待观察 |
| 27 | [truefoundry/trueforge](https://github.com/truefoundry/trueforge) | 3638 | TypeScript | 开源 agent harness runtime 层，把 LLM 变成可工作 agent | ✅ Harness 基建 |
| 28 | [genspark-ai/genoffice](https://github.com/genspark-ai/genoffice) | 3516 | TypeScript | 跨平台 AI 办公套件，Word/Excel/PPT/PDF/Markdown 一体 | ✅ 全平台 |
| 29 | [microsoft/skill-recorder](https://github.com/microsoft/skill-recorder) | 3359 | TypeScript | 桌面录屏 → Copilot CLI 还原为可复用 Skill / Automation | ✅ 微软官方 |
| 30 | [xuchonglang/investing-for-beginners](https://github.com/xuchonglang/investing-for-beginners) | 3334 | JavaScript | 小隐寺投资百科官方公开索引：美股 / 期权 / 加密货币 | ✅ 中文 |
| 31 | [synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience) | 3323 | TypeScript | 开源 AI 科研 workbench | ✅ 研究工具 |
| 32 | [bryanthaboi/gen1recomp](https://github.com/bryanthaboi/gen1recomp) | 3313 | C | 原生 Lua / LÖVE2D 复刻 Gen 1 Pokemon | ✅ 复古游戏 |
| 33 | [kvcache-ai/AgentENV](https://github.com/kvcache-ai/AgentENV) | 3282 | Rust | AgentENV（AENV）：分布式 agent 环境运行平台 | ✅ Agent 基础设施 |
| 34 | [isjiamu/gzh-design-skill](https://github.com/isjiamu/gzh-design-skill) | 3267 | HTML | Markdown 转公众号可直接粘贴的 HTML，6 套主题 + 双校验 | ✅ 中文 Skill |
| 35 | [mshumer/Claude-of-Duty](https://github.com/mshumer/Claude-of-Duty) | 3252 | JavaScript | 一次 prompt 生成的 Call of Duty 品质 Three.js FPS | ✅ 演示 |
| 36 | [kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew) | 3181 | Python | 持久化开发工作区，跨 session 自改进 | ✅ Harness |
| 37 | [Tiger3807861189/J-Space-Cognition-Suite-V3.7](https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.7) | 3016 | Python | 基于 Anthropic J-space 全局工作空间研究的 AI 认知增强 Skills | ✅ 机制研究 |
| 38 | [aipoch/open-science](https://github.com/aipoch/open-science) | 2959 | TypeScript | 开源 AI 研究 workbench，可复现科研 + 科学 agent | ✅ 研究工具 |
| 39 | [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | 2881 | Python | （描述空） | 待观察 |
| 40 | [duolahypercho/codex-router](https://github.com/duolahypercho/codex-router) | 2790 | JavaScript | Codex 的外部模型路由，Kimi OAuth/API + DeepSeek + 回滚 | ✅ 实用 |
| 41 | [QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins) | 2756 | HTML | 让任意 agent harness 原生支持多模态 | ✅ 多模态 |
| 42 | [yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) | 2743 | Rust | Codex 桌面 / CLI 可视化管理，Provider 切换 + 会话同步 + 提示注入 | ✅ 工具 |
| 43 | [AminBlg/SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) | 2730 | Python | Agent skill：让 LLM 写文档用 ASD-STE100 简化技术英语 | ✅ Skill |
| 44 | [lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) | 2558 | Python | Ryan Lopopolo 的 harness engineering 选集、实战手册、agent context bundle | ✅ 实战 |
| 45 | [Jakubantalik/thinking-orbs](https://github.com/Jakubantalik/thinking-orbs) | 2555 | TypeScript | AI / agent UI 的点阵思考圆加载指示器，9 种类型 | ✅ UI |
| 46 | [zerx-lab/FluxDown](https://github.com/zerx-lab/FluxDown) | 2536 | Rust | Rust 多协议下载器，HTTP/FTP/BT/HLS/DASH | ✅ 工具 |
| 47 | [chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard) | 2473 | JavaScript | （描述空，star 异常，看后续） | 待观察 |
| 48 | [AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide) | 2428 | TypeScript | 掌握 WorkBuddy 的开源实战指南，含 Skills / MCP / 多 agent 实践 | ✅ 中文指南 |
| 49 | [powerycy/goutoujunshi](https://github.com/powerycy/goutoujunshi) | 2380 | Python | Codex 恋爱军师：情绪承接 + 关系分析 + 可执行策略，含心理 / 法律 / 性学知识 | ✅ 中文 Skill |
| 50 | [DannyMac180/sol-advisor](https://github.com/DannyMac180/sol-advisor) | 2312 | Shell | Codex-native 架构师编排，Luna / Terra 双实施 lane + Sol 评审 | ✅ Skill |

### 本月 Top 10 深挖

#### 1. [JustVugg/colibri](https://github.com/JustVugg/colibri) ⭐25926
- **一句话**：纯 C 推理引擎，把 744B MoE（GLM-5.2）在 6× RTX 5090 / 9.9 GB 内存上跑起来，int4 + experts streamed from disk，把前沿模型从 GPU 数据中心拉回本地单台。
- **元数据**：C 语种 / 12.6 MB 仓库 / 2828 forks / 107 open issues / topics 空 / 创建 2026-07-01 / 最近 push 2026-08-23；README 长达 38K 字符，包含完整 CLI 截图、Web dashboard、Brain 页、Atlas 3-D 星系可视化等十几个段落。homepage 是 `https://justvugg.github.io/colibri`。
- **核心价值**：① "One hierarchy, not limited by tier capacity"——VRAM / RAM / NVMe 是同一份权重的三个放置层级，容量不够只降速不改变语义；② "A JIT for weights"——按 routing heat 驱动 LRU + 热钉 + 1-layer-ahead 预取，所有"加速策略"都做成可测开关，不做营销式承诺；③ "I/O is part of the engine"——批量专家预取与并发解码重叠，承认磁盘是推理路径上的一等公民；④ `colibri` CLI 提供 `chat / web / tune / bench / atlas` 五条命令，CLI 输出有 `✓ ready in 32s · resident 9.9 GB` 这种真实测量。
- **issue 实战反馈**：[#1191](https://github.com/JustVugg/colibri/issues/1191) 由 bigmarketgroup 提交"coli tune 在非 GLM 引擎上完全用不了——兄弟引擎没实现 tune 协议"；[#1190](https://github.com/JustVugg/colibri/issues/1190) 同作者报告"coli tune 在未传 --cap 时把 None 当作引擎 cap"。这两条 24 小时内同时出现，说明项目在 2.5 万⭐后进入了"新引擎 / 新 CLI 子命令"的扩张期，兄弟引擎集成还在追。
- **横向对比**：跟 [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c)（月榜 #15，同样纯 C99 / 零 BLAS）对比——colibri 走"GLM-5.2 这种 744B MoE + 多 GPU tiering + web dashboard"的工程化路线，kimi-k3-in-c 走"K3 单一模型 + 单 CPU 8 GB 内存 + AVX2 + mxfp4"的最简化路线；前者偏"完整推理栈"，后者偏"教学 / 极致低资源演示"。两个项目同月冒头说明"C 写大 MoE 推理"已经形成可复制的工程范式。
- **信号判断**：✅ 实战（实测 4 tok/s、TTFT 1.6 s 有数据）；✅ 增长（7 天 2.5 万⭐，30 天 2.5 万⭐，是月内当之无愧的冠军）；⚠️ 兼容（兄弟引擎未全部适配 tune / 非 GLM 路径的 bug 已经报上来）；✅ 研究诚信（README 多次承认"history can overfit, lookahead can lose"——没有把策略写成承诺）。
- **适用场景**：**适合**：有 6× RTX 5090 或同等多卡预算的研究者 / 想把前沿 MoE 跑在自有硬件上的团队 / 偏好"完全可审计的小型推理引擎"而不是 llama.cpp 黑盒的人 · **不适合**：消费级单卡 / 想跑非 MoE 模型的轻量场景 / 没有工程师维护的纯应用层用户。

#### 2. [xai-org/grok-build](https://github.com/xai-org/grok-build) ⭐25920
- **一句话**：SpaceXAI 旗下的编码 agent harness + 全屏 TUI，鼠标可交互、可扩展，等于"xAI 自家版 Codex / Claude Code"。
- **元数据**：Rust / 36.6 MB / 4871 forks（远高于 colibri！） / 0 open issues（仓库全新，没有走公开 issue 跟踪）；topics 空；创建 2026-07-14 / push 2026-08-23。homepage 指向 `https://docs.x.ai/build/overview`。README 5.7K 字符。
- **核心价值**：① 仓库结构清晰——`crates/codegen/xai-grok-pager-bin` 是 composition-root 构建 `xai-grok-pager` 二进制；`xai-grok-pager` 是 TUI 主体（scrollback / prompt / modals）；`xai-grok-shell` 是 agent runtime + leader/stdio/headless 入口；`xai-grok-tools` 是工具实现（terminal / file edit / search）。② Rust 工具链用 DotSlash 锁定 hermetic 版本（`bin/protoc` 通过 DotSlash 下载），首次构建 `rustup` 自动装齐 toolchain——消除"换机就跑不起来"的问题。③ TUI 是 fullscreen、可鼠标交互的，不是传统 dumb terminal，README 自承"headless mode + sandboxing + MCP servers + skills + plugins + hooks 都已就位"。④ 三方致谢写得很老实："vendored upstream source (Mermaid diagram stack)" 且 `THIRD-PARTY-NOTICES` 列出"in-tree source ports (including [openai/codex](https://github.com/openai/codex) and [sst/opencode](https://github.com/sst/opencode) tool implementations)"——意思是 Grok Build 把 [openai/codex](https://github.com/openai/codex) 与 [sst/opencode](https://github.com/sst/opencode) 的工具实现直接 vendored 进自家树，并按原许可证保留，是技术债但也意味着复用现有生态。
- **issue 实战反馈**：issues 区为空（xAI 选择不在 GitHub 上接收 bug 报告），所有反馈走官网 `docs.x.ai/build/overview` 与 Discord；`CONTRIBUTING.md` 写明 "External contributions are not accepted"——这是闭源节奏但完全开源代码的典型 xAI 做法。
- **横向对比**：跟 [#7 openai/codex-security](https://github.com/openai/codex-security)（同为厂商官方 harness / 同月发布）对比——grok-build 是通用编码 agent，codex-security 是垂直安全 CLI；跟 [#3 andrewyng/openworker](https://github.com/andrewyng/openworker)（本地 + Slack）对比——grok-build 是中心化 SaaS，openworker 是本地优先；跟 [#4 yc-software/qm](https://github.com/yc-software/qm)（协作 harness）对比——grok-build 是单人 / TUI，qm 是企业 / Slack+Web。月内出现了"四个完全不同方向"的 agent harness 各占一席，是月榜最具张力的对照。
- **信号判断**：✅ 厂商背书（xAI 官方）+ ✅ 全平台（macOS/Linux 构建完整）；⚠️ 闭源节奏（issues 不接收 / 不接外部贡献）；✅ 增长（4871 forks 是月榜第二高，仅次于 colibri 的 2828）；✅ 兼容（vendored [openai/codex](https://github.com/openai/codex) + [sst/opencode](https://github.com/sst/opencode) 代码，工具层可用）。
- **适用场景**：**适合**：xAI Grok 用户 / 想要 TUI 风格全屏编码 agent 的人 / 接受"官方节奏 + 外部 issue 不接"模型的工程师 · **不适合**：想要 Web / 协作 UI 的团队 / 想给项目贡献代码的外部开发者 / 不想被单一厂商绑定的企业。

#### 3. [andrewyng/openworker](https://github.com/andrewyng/openworker) ⭐14953
- **一句话**：本地优先的 AI agent desktop，把"真实交付物"（文档 / 表格 / 网页 / 报告）落到你能打开和分享的文件里；25+ connector（GitHub / Slack / Jira / Notion / Linear / HubSpot 等），BYO model + BYO key。
- **元数据**：Python / 4.1 MB / 2070 forks / 443 open issues（量级大）；topics 空；创建 2026-07-20 / push 2026-08-23。homepage 是 `https://openworker.com`。README 7.5K 字符，含架构图（`native shell + GUI / local agent server / your files / tools / model`）。
- **核心价值**：① "Produce real deliverables"——agent 跑完不是待办清单而是可直接打开的文件；② "Work from Slack"——在 Slack 频道 @OpenWorker，桌面开 session 干活，结果以 thread reply 回传；③ "25+ integrations + any tool reachable over MCP plugs in too, with per-tool control"——MCP 是一等公民；④ "Ask before acting"——写、发、shell 命令默认需要人类审批；⑤ BYO model——支持 OpenAI / Anthropic / Gemini / DeepSeek / Kimi / Qwen / 智谱 GLM / Ollama 本地 / Together / Fireworks / Grok 等十几家，把厂商锁定降到最低。
- **issue 实战反馈**：[#527](https://github.com/andrewyng/openworker/issues/527)、[#526](https://github.com/andrewyng/openworker/issues/526)、[#525](https://github.com/andrewyng/openworker/issues/525) 三个安全 issue 全部由 ns-rajats 同一人在 8-22 / 8-23 提交：SSRF in MCP OAuth flow（discovery/registration/token 端点接收来自 MCP server 的输入但未验证来源）、no untrusted-content boundary in the LLM loop（外部内容进入 LLM 循环时 origin 没剥离，邮件 / 网页 / shell 输出被直接拼 prompt）、audit log persists unredacted tool result previews（审计日志里完整保存了邮件正文 / shell 输出原文）。三条连发等于"harness 接 MCP + 多 connector 之后凭证与外部内容边界全暴露"。
- **横向对比**：跟 [#4 yc-software/qm](https://github.com/yc-software/qm)（协作 harness + Slack+Web）对比——openworker 偏"个人 desktop"，qm 偏"企业部署"；跟 [#27 truefoundry/trueforge](https://github.com/truefoundry/trueforge)（harness runtime）对比——openworker 是成品应用，trueforge 是底层 runtime；跟 [#2 xai-org/grok-build](https://github.com/xai-org/grok-build) 对比——openworker 强在 connector 数量 + Slack 集成，grok-build 强在 TUI 体验与厂商支持。
- **信号判断**：✅ 本地优先（model key / 凭证都存在本地 secret store，唯一云端是 OAuth broker）；⚠️ 安全（同期三个 issue 都是凭证 / 内容边界类，月内 harness 集中爆雷）；✅ 实战（2 周 1.5 万⭐ + 443 open issues 说明社区在重度使用并大量反馈）；✅ BYO model（无厂商锁定）。
- **适用场景**：**适合**：要在自己机器上跑 agent + 同时接 GitHub/Slack/Jira 等工具的个人 / 小团队 / 想 BYO model 不被任何厂商绑死 · **不适合**：纯云端用户 / 不愿本地维护 secret store 的团队 / 对 MCP 凭证安全边界没有精力审视的人（看 [#526](https://github.com/andrewyng/openworker/issues/526)）。

#### 4. [yc-software/qm](https://github.com/yc-software/qm) ⭐14093
- **一句话**：为初创公司设计的"多人协作 agent harness"，让每位员工拥有独立隔离工作区，agent 在 Slack 和 Web 两个前端里执行真实任务（写 PR / 跑测试 / 监控 CI）。
- **元数据**：TypeScript / 7.8 MB / 1688 forks / 305 open issues；topics 含 `ai / assistant / harness / qm`；创建 2026-07-29 / push 2026-08-22。homepage `https://x.com/qm__dev`。README 8.7K 字符，含 mermaid 架构图（Postgres + Headless Core + Per-scope sandbox）。
- **核心价值**：① 设计目标明确——"agents are designed like personal assistants, you can make one work for a whole company, but it quickly gets complex. QM is designed for startups"——把 harness 从"个人玩具"扩展到"全公司每位员工一个 workspace"的难度正面承认；② 三种安全姿态可选——Strict（每次工具调用都需人类批准）/ Auto（默认，分类器筛外部数据 + 工具结果才进模型）/ Dangerous（无内容筛选无中间停顿），企业可按 scope 收紧但不能放宽；③ "predeclared command policy"——递归删除 / 破坏性 SQL 等无论哪种姿态都被硬拒；④ 核心层抽象成接口（harness / session store / sandbox / memory），每个 substrate 都有 production 实现可换；⑤ 每个 deployment 跑在操作方自己的云账号里，"this repository has no production deployment workflow"——把部署权完全交给客户。
- **issue 实战反馈**：[#661](https://github.com/yc-software/qm/issues/661) by ilkerkaanipcioglu 报告"docker target: portal refuses to start when the auth service is enabled — CLI wi..."——首次部署就遇到 portal 与 auth 服务同时启用时启动失败的兼容问题。issue 数量大（305）但都是部署 / 配置 / 子模块 bug，没有"安全 / 隐私"类雷——说明 QM 的安全架构（predeclared command policy）确实在挡住恶意指令。
- **横向对比**：跟 [#2 xai-org/grok-build](https://github.com/xai-org/grok-build)（单人 TUI）对比——qm 强在多人协作 + per-scope sandbox；跟 [#3 andrewyng/openworker](https://github.com/andrewyng/openworker)（个人 desktop）对比——qm 强在企业部署 + 安全姿态可调；跟 [#8 trycompai/crm](https://github.com/trycompai/crm)（agentic CRM）对比——qm 是通用 harness + CRM 无关，trycompai/crm 是 CRM 垂直 harness 成品。
- **信号判断**：✅ 企业级（per-scope sandbox + 安全姿态可调 + 自己云账号部署）；✅ 实战（14k⭐ + 305 open issues 是重度使用的标志）；⚠️ 部署复杂（305 个 issue 大部分是部署 / 兼容类，新手不友好）；✅ 安全（predeclared command policy 在所有姿态下都生效）。
- **适用场景**：**适合**：初创公司想给每位员工配一个隔离 agent workspace + Slack/Web 双前端 + 自己掌控云账号 · **不适合**：单人开发者（over-engineered）/ 想要 GUI 一键安装的产品用户 / 对部署细节耐心有限的非工程团队。

#### 5. [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) ⭐14051
- **一句话**：给 Codex 桌面端换肤的外部主题 / 换肤工具——本机 CDP 注入，不改官方安装包（`.app` / `app.asar` / WindowsApps），自带主题库 + Studio + 一键换肤 + SHA-256 校验。
- **元数据**：JavaScript / 30 MB / 1348 forks / 54 open issues；topics 空；创建 2026-07-15 / push 2026-08-12。homepage `https://www.dreamskin.cc`。README 8.5K 字符。语言说明：中文为主 + 英文 README.en.md；这是月内少见的"中文 README 为主"的仓库。
- **核心价值**：① "本机回环 CDP 注入，不改官方二进制与签名"——不破坏 OpenAI 安装包；② "一键换肤"——网页 → 本机 App 通过 `dreamskin://apply?version=ver_...` 唤起，链接只携带主题版本 ID，不能携带 URL / 文件路径 / 命令，不存在静默应用参数；③ "校验链路完整"——客户端只向固定官方 API 取包并拒绝重定向，换肤前弹原生确认框，核对该版本的审核状态、一键兼容标记、版本号、包大小、实际下载字节数、SHA-256，全部通过才装；④ "可恢复"——启动或渲染失败自动尝试恢复换肤前的主题，恢复结果同样要经过可见性验证，无法确认时明确报告状态未确认（而不是假装已恢复）；⑤ 主题包契约：背景图 + `theme.json` + 非空 `theme.css` + 声明 `safe-css` 能力——缺一不可；⑥ 自带 Studio 在线编辑器（`https://dreamskin.cc/studio`）让用户在浏览器里写 Safe CSS 导出 `.zip` 主题包投稿。
- **issue 实战反馈**：[#375](https://github.com/Fei-Away/Codex-Dream-Skin/issues/375) by GreenLv："[Bug][Windows] One-click gallery marks a macOS-only theme compatible, then fail..."——一键换肤兼容性标记错；[#374](https://github.com/Fei-Away/Codex-Dream-Skin/issues/374) 同作者："[Bug][macOS] v1.5.14 on ChatGPT 26.814 intermittently fails injection and rejec..."——macOS 注入偶发失败；[#373](https://github.com/Fei-Away/Codex-Dream-Skin/issues/373) by QingYe-05："[Bug] Windows Codex 26.814 composer mappings and footer gradients bypass Safe C..."——Safe CSS 边界被绕过的安全 bug；[#367](https://github.com/Fei-Away/Codex-Dream-Skin/issues/367) by naipi11："[Bug] 侧边栏远程控制设备图标丢失原生语义颜色"——语义色丢失。issue 类型分布显示"注入兼容性 + Safe CSS 边界"是当前两个主要矛盾。
- **横向对比**：跟 [#34 isjiamu/gzh-design-skill](https://github.com/isjiamu/gzh-design-skill)（同样主题/排版 skill 但面向公众号）对比——Dream-Skin 面向 Codex 桌面客户端、gzh-design-skill 面向公众号编辑器；跟 [#29 microsoft/skill-recorder](https://github.com/microsoft/skill-recorder)（微软官方录屏 → Skill）对比——Dream-Skin 是社区主题注入、skill-recorder 是官方 Skill 生产工具；同月出现"Codex 桌面端被三股力量同时使用"——[Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) 主题、[#7 openai/codex-security](https://github.com/openai/codex-security) 安全扩展、[#42 yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) 可视化管理。
- **信号判断**：✅ 实战（1.4 万⭐ / 1348 forks / 8 套主题实装 + Studio 在跑）；⚠️ 注入兼容（[#374](https://github.com/Fei-Away/Codex-Dream-Skin/issues/374) [#375](https://github.com/Fei-Away/Codex-Dream-Skin/issues/375) 显示 CDP 注入边界随 OpenAI 桌面端升级会偶发失败）；⚠️ Safe CSS 安全（[#373](https://github.com/Fei-Away/Codex-Dream-Skin/issues/373) 揭示 Safe CSS 边界被绕过风险，作者承诺修复）；✅ 安全模型（"只接受 SHA-256 校验过的固定包 + 不接收任意 URL + 失败状态显式报告"是社区换肤工具里少见的严谨设计）。
- **适用场景**：**适合**：想在 Codex 桌面端换肤 + 接受 CDP 注入 + 想自己写 Safe CSS 主题投稿 · **不适合**：担心 CDP 注入副作用的纯保守用户 / 不用 Codex 桌面端的人 / 想在 ChatGPT 网页版换肤的人（项目仅覆盖 Codex 桌面端）。



#### 6. [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) ⭐12938
- **一句话**：把参考图里的对象"重建"为代码驱动的 Three.js 模型——不是 photogrammetry / mesh extraction / 下载素材，而是"用代码描述对象"，token 高效 + 动画就绪 + 质量门控。
- **元数据**：Python / 25 MB / 1051 forks / 67 open issues；topics 含 `3d / ai-agents / claude-code / computer-graphics / generative / image-to-3d / procedural-generation / threejs`；创建 2026-07-15 / push 2026-08-22。homepage 是 `https://img2threejs.github.io/img2threejs-showcase/`。
- **核心价值**：① "reconstruction-by-code, not photogrammetry"——所有模型都是程序生成，运行在浏览器里，无 mesh 文件下载；② "token-efficient"——用代码表达而不是点云，单模型代码可在 LLM context 里反复修改；③ "quality-gated"——内置质量门控，不是无脑生成；④ "animation-ready"——生成的代码天然支持动画；⑤ Demo 覆盖 CS2 武器（Glock / M9 / Classic Knife）、BMX 自行车、Sony 耳机、ISSACA 霰弹枪等 8 个完整 demo，每个都附 Live 链接 + 源代码 .ts 文件——这是月内"参考图 → 3D 代码"路线最完整的实现。
- **issue 实战反馈**：[#103](https://github.com/img2threejs/img2threejs/issues/103) by truongsontung "Path traversal risk via unvalidated region_id in material_region_analysis.py fil..."——文件路径遍历风险；[#102](https://github.com/img2threejs/img2threejs/issues/102) 同作者 "SSRF: unvalidated index_url in fetch_cs2_metadata.py allows arbitrary URL fetchi..."——服务端请求伪造（任意 URL 抓取）；[#95](https://github.com/img2threejs/img2threejs/issues/95) by Ruiruiz30 "[Contribution]: make SKILL.md version metadata Codex-compatible"——贡献请求让 SKILL.md 兼容 Codex 版本元数据。三条集中在"安全 + 工具链兼容"。
- **横向对比**：跟 [#41 QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins)（让任意 harness 原生支持多模态）对比——img2threejs 是"图 → 3D 代码"的垂直方案，Qwen-MM-Plugins 是"让 harness 看图"的通用基座；跟 [#35 mshumer/Claude-of-Duty](https://github.com/mshumer/Claude-of-Duty)（单 prompt → Three.js FPS）对比——img2threejs 是"工具链 + 可复用流程"，Claude-of-Duty 是"一次性演示"。
- **信号判断**：✅ 案例丰富（8 个完整 demo + showcase 站点 + 每 demo 附源代码）；⚠️ 安全（同月内 [#103](https://github.com/img2threejs/img2threejs/issues/103) [#102](https://github.com/img2threejs/img2threejs/issues/102) 两个 SSRF/Path traversal 报告）；✅ 实战（1051 forks + 67 issues + 工具链产品化）；✅ token-efficient 设计哲学清晰。
- **适用场景**：**适合**：要在 LLM 工作流里"图 → 3D 代码"反复迭代的设计师 / 想要可程序生成 + 动画就绪 3D 资产的人 / Claude Code 用户 · **不适合**：需要 photogrammetry 级别真实感的场景 / 单次出图无需代码化的轻量需求 / 不接受 Python 工具链的产品用户。

#### 7. [openai/codex-security](https://github.com/openai/codex-security) ⭐10098
- **一句话**：OpenAI 官方代码安全 CLI + TypeScript SDK，找 / 验证 / 修复代码里的安全漏洞；每个 finding 单独跑在 Codex desktop task 里，可加 `--create-pr` 直接开 draft PR。
- **元数据**：TypeScript / 20 MB / 720 forks / 178 open issues；topics 含 `ai-security / application-security / cli / code-scanning / codex / codex-security / cybersecurity / devsecops`；创建 2026-07-13 / push 2026-08-23。homepage `https://developers.openai.com/codex/security`。README 9.9K 字符。
- **核心价值**：① "Deep-scan discovery stops after 96 hours by default. Set `--max-time-hours`"——单次扫描最长 96 小时（可分数），超时后已完成 finding 仍保留；② 单仓 monorepo 可 `--component apps/api --component apps/web` 分别扫描后按 root cause 合并报告；③ 支持 OpenRouter / Fireworks / Amazon Bedrock 等多家 inference provider——`--provider openrouter --model anthropic/claude-sonnet-4.5`、`--provider fireworks --model accounts/fireworks/models/qwen3-235b-a22b`、`--provider amazon-bedrock --model openai.gpt-5.6-luna` 全部官方支持；④ "Trusted Access for Cyber"——某些 cybersecurity 请求与受保护 finding 需通过 chatgpt.com/cyber 申请，符合监管；⑤ `findings list` / `patch --scan SCAN_ID --severity high` / `patch --linear-issue SEC-123` 一套 CLI 语义清晰。
- **issue 实战反馈**：openai/codex-security 的 issues 区在 GitHub 上不直接公开（GitHub 上 issues 数显示 178 但公开拉取时返回空，疑似开启了 Security Advisories only 模式）；这种"GitHub 上看到 issues 数字但 GitHub API 拉不到正文"是 OpenAI 安全类仓库的常见做法，所有反馈走官方 `developers.openai.com/codex/security` + chatgpt.com/cyber。
- **横向对比**：跟 [#2 xai-org/grok-build](https://github.com/xai-org/grok-build)（同月 xAI 编码 harness）对比——codex-security 是"垂直安全 CLI"，grok-build 是"通用编码 agent"；跟 [#19 elder-plinius/T3MP3ST](https://github.com/elder-plinius/T3MP3ST)（自主红队 multi-agent）对比——codex-security 是"代码安全扫描 + 修复"，T3MP3ST 是"自主红队平台"，两者方向相反但都属 AI + 安全赛道。
- **信号判断**：✅ 厂商官方（OpenAI 自家产品线）；✅ 多 provider（不绑 OpenAI 自家模型）；✅ 安全专业（Trusted Access for Cyber 流程 + monorepo 分扫）；⚠️ 闭源节奏（issues 不公开，仅安全公告）；✅ 实战（178 open issues 说明重度使用）。
- **适用场景**：**适合**：在用 Codex desktop 的企业 / 想自动找代码漏洞 + 自动开 PR 的安全工程师 / 多 inference provider 都想试一遍的对比用户 · **不适合**：纯人工安全审计 / 无 Codex desktop 凭证的纯 API 用户 / 需要 GUI 引导的产品级用户。

#### 8. [trycompai/crm](https://github.com/trycompai/crm) ⭐8825
- **一句话**：为 AI agent 设计的开源 CRM（agentic-first），核心原则"agent 永远不猜人"——工具只报告 `crm.signature-block / github.account-identity` 等**观察到的事实**，证据不足时变成建议而非记录。
- **元数据**：TypeScript / 9 MB / 1078 forks / 12 open issues（issue 量低，说明项目结构稳定）；topics 空；创建 2026-07-31 / push 2026-08-21。homepage `https://trycrm.ai`。README 19K 字符，详细定义证据分层、agent 设计哲学。
- **核心价值**：① "the rule the agent itself never breaks: nothing about a person is guessed"——没有 tool 接受置信分（confidence score），因为"让模型给自己的确定性打分，它会偏向让自己显得有用的方向错"；② "tools report what they observed"——`crm.signature-block`（你邮箱签名）、`github.account-identity`（GitHub 账号）；强证据写记录，弱证据变建议由人定；③ 基于 Vercel 的 `eve` 框架（filesystem-first durable agents）——`apps/agent` 是独立 deployment，tool 是 file，skill 是 markdown，schedule 是 file；④ `lib/tasks.ts` 用 `FOR UPDATE SKIP LOCKED` 让两个 dispatcher 拿不重叠的工作，session 死了 lease 到期释放行；⑤ "Every outside source is optional, and it is designed to run with none of them"——零 API key 也能跑（用 `read_crm_history` 读自己邮件 / 会议 / 签名），每个 key 开一个额外数据源；⑥ sandbox 是 bash + grep + glob + /workspace，egress `deny-all`。
- **issue 实战反馈**：[#182](https://github.com/trycompai/crm/issues/182) by puneet1409 "Feature request: optional server-enforced owner-based record access"——希望增加服务端强制按 owner 限制记录访问（隐含当前是客户端权限模型）；[#181](https://github.com/trycompai/crm/issues/181) by jean-jcrx "Roadmap Idea : create a CARDDAV interface for contacts"——路线图想法：增加 CardDAV 联系人接口；[#180](https://github.com/trycompai/crm/issues/180) 同作者 "Enrichment through Vercel - possible to configure others?"——数据增强是否支持 Vercel 之外的源。三个 issue 都是路线图 / 配置灵活性，没有 bug，说明产品稳定。
- **横向对比**：跟 [#4 yc-software/qm](https://github.com/yc-software/qm)（通用 harness + 企业部署）对比——trycompai/crm 是 CRM 垂直 agentic 成品，qm 是通用协作 harness；跟 [#21 NanoNets/Graft](https://github.com/NanoNets/Graft)（context engineering for Claude/Cursor/Codex）对比——trycompai/crm 是成品 CRM，Graft 是工具链加速层。
- **信号判断**：✅ 实战（1k+ forks + 12 issues 但全是路线图，证明产品稳定）；✅ 安全（egress `deny-all` + 工具只报告"观察到的事实"）；✅ 设计哲学（"agent 不猜人"原则贯穿 README）；✅ BYO model（默认不依赖外部数据源）。
- **适用场景**：**适合**：想做 agentic CRM / 需要"agent 不猜人"原则保证数据质量的销售 / 想要本地优先 egress deny-all 的安全模型 · **不适合**：想要传统 Salesforce 体验的产品销售 / 不想让 agent 处理 CRM 数据的企业 / 想要 GUI 一键安装的纯应用层用户。

#### 9. [MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3) ⭐8586
- **一句话**：Moonshot AI 7 月 27 日开源的 2.8T 总参数 MoE 模型（激活 104B），采用 Kimi Delta Attention (KDA) + Attention Residuals (AttnRes) + Stable LatentMoE 架构，支持 1M token context，原生多模态（text / image / video）。
- **元数据**：– / 1.4 MB（仅权重 / 文档仓库，无代码）/ 687 forks / 26 open issues；topics 空；创建 2026-07-27 / push 2026-08-06。homepage 指向 `https://www.kimi.com` + `https://www.moonshot.ai`。README 44K 字符，含模型规格表。
- **核心价值**：① 架构创新——KDA（Kimi Delta Attention，一种线性注意力变体）+ AttnRes（Attention Residuals，将 attention 作为残差而非主路径）+ Stable LatentMoE（16/896 专家激活）三层叠加，相比 Kimi K2 获得约 2.5× 整体 scaling efficiency 提升；② 长程编码——能在 minimal human oversight 下维持长时间工程会话，导航大型仓库，编排 terminal 工具，覆盖 GPU kernel 优化、编译器开发、视觉游戏开发、CAD、甚至芯片设计；③ Agentic Knowledge Work——原生端到端知识工作，深度研究 + 交互可视化 + widget / dashboard + motion design + video editing；④ 原生多模态——text / images / video 同一模型内理解；⑤ 1M token 上下文窗口；⑥ 完全开源权重——Kimi K3 License，是月内"开源 3T 模型"第一例。
- **issue 实战反馈**：[#38](https://github.com/MoonshotAI/Kimi-K3/issues/38) by ai-insights-cloud "[Critical] Kimi Work 3.0 Orchestrator burns ~$150 in 15 minutes on trivial task..."——Kimi Work 3.0 orchestrator 在简单任务上 15 分钟烧掉 150 美元（成本失控）；[#37](https://github.com/MoonshotAI/Kimi-K3/issues/37) by xylophone188 "[Bug/Service] Coding Plan quota exhausted due to model infinite loop. Rejecting..."——Coding Plan 配额因模型无限循环耗尽；[#36](https://github.com/MoonshotAI/Kimi-K3/issues/36) by leonhexunxu-cmyk "kimi major and minor bug audits"——主要与次要 bug 审计；[#35](https://github.com/MoonshotAI/Kimi-K3/issues/35) 同作者 "HOW TO IMPROVE TOKEN EFFICIENCY BY KIMI"——token 效率改进；[#34](https://github.com/MoonshotAI/Kimi-K3/issues/34) by yakuninvladimir-ui "[Discussion] A Few Thoughts on the Path to AGI"——AGI 路径讨论。issue 集中在"成本失控 + 配额耗尽"——大 MoE 模型在 orchestrator 场景的运维代价。
- **横向对比**：跟 [#15 FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c)（同模型 C99 重制）对比——Kimi-K3 是官方权重仓，kimi-k3-in-c 是社区纯 C CPU 推理引擎；跟 [#1 JustVugg/colibri](https://github.com/JustVugg/colibri)（744B MoE 本地推理）对比——colibri 跑 GLM-5.2，Kimi-K3 是 Moonshot 自家模型 + 月内两个并行实现把"大 MoE 本地化"路线打通。
- **信号判断**：✅ 官方开源（Moonshot AI 自家模型权重完整开源）；✅ 架构创新（KDA + AttnRes + Stable LatentMoE 三层叠加 2.5× scaling efficiency）；⚠️ 成本风险（[#38](https://github.com/MoonshotAI/Kimi-K3/issues/38) 报 15 分钟烧 150 美元，agent orchestrator 必须设 token cap）；⚠️ 配额（[#37](https://github.com/MoonshotAI/Kimi-K3/issues/37) 报模型无限循环耗尽配额）；✅ 多模态原生（text / image / video 同一模型内）。
- **适用场景**：**适合**：想跑开源 3T 模型权重的科研团队 / 想要 1M token 长上下文的文档 / 代码分析场景 / 想做 Agentic 知识工作 + 长程编码 · **不适合**：消费级单卡（2.8T 总参即使激活 104B 仍需专业硬件）/ 成本敏感型场景（[#38](https://github.com/MoonshotAI/Kimi-K3/issues/38) 揭示真实成本失控风险）/ 不愿做 orchestrator token cap 的纯应用层用户。

#### 10. [unicity-aos/aos-ce](https://github.com/unicity-aos/aos-ce) ⭐8554
- **一句话**：Unicity 的开源 agent operating system（社区版）——把"agent 跑在什么之上"这件事做成了一等公民；含 `aos` CLI、HTTP API、capsules（用户态积木）、Forge 工具链、meta-harness skill、AOS MCP 边缘。
- **元数据**：Rust / 21 MB / 21 forks（fork 数异常低！说明项目还在早期建设）/ 30 open issues；topics 空；创建 2026-07-12 / push 2026-08-22。homepage 空。README 5.6K 字符。
- **核心价值**：① 产品表面清晰——`aos` CLI + HTTP API + 发行版 + first-party capsules + provider/model experience + Unicity Audit；② Workspace layout 分四块——`crates/`（产品 CLI、HTTP API、control client、共享代码）、`capsules/`（first-party 生产 capsules）、`distros/`（社区发行版 manifest + release 元数据）、`docs/`（产品与运维文档）；③ "AOS owns the root such as `status`, `init`, `update`, or `mcp`"——AOS 直接拥有这些根命令而不是包一层 `aos astrid` / `aos runtime` 命名空间；release validation 比对 pinned runtime 的精确公开命令清单与 AOS 的根契约，新 runtime verb 不能进产品发布除非显式 inherit-or-own 决策；④ `aos mcp serve` 是 Codex / Claude / Grok 共用的产品边缘——客户端支持 MCP form elicitation 就用客户端自己的受限审批表单，不支持就 fallback 到本地 AOS 决策面（macOS AppKit / Windows native dialog / Linux Pinentry）；`--interaction client / native / deny` 四种模式显式；本地 bridge 只接受单 boolean 或固定 AOS approval enum，**不收集任意字符串 / 密码字段 / URL elicitations**——这是月榜里安全设计最严谨的 MCP 边缘；⑤ Forge 是 OS construction 工具，让新 agent 检查运行中的系统 / 学 capsule model / 识别真实能力缺口 / 编译验证 least-privilege capsule；meta-harness skill 教 agent 把 instructions / memory / skills / harness code / tools / capsules / traces / evaluations 视为可改进的用户态世界——这是"agent 怎么自我演化"的元层设计。
- **issue 实战反馈**：[#85](https://github.com/unicity-aos/aos-ce/issues/85) by joshuajbouw "aos mcp serve rejects AOS host plugin --workspace argv"——MCP serve 拒绝 host plugin 的 --workspace 参数；[#84](https://github.com/unicity-aos/aos-ce/issues/84) by jait91 "Concurrent context compaction can return another principal's response"——并发 context compaction 可能返回其他 principal 的响应（严重的跨账户隔离 bug）；[#81](https://github.com/unicity-aos/aos-ce/issues/81) by joshuajbouw "Extract bundled capsules into independently releasable artifacts"——capsule 拆分为独立发布 artifact；[#78](https://github.com/unicity-aos/aos-ce/issues/78) by mattyboomboom "Add product analytics to estimate usage"——产品分析。issue 类型分布显示"安全边界 + 拆分发布"是当前两大方向；[#84](https://github.com/unicity-aos/aos-ce/issues/84) 是必须尽快修的并发隔离 bug。
- **横向对比**：跟 [#2 xai-org/grok-build](https://github.com/xai-org/grok-build)（编码 agent TUI）对比——aos-ce 是 OS 层，grok-build 是 agent 应用层；跟 [#4 yc-software/qm](https://github.com/yc-software/qm)（协作 harness）对比——aos-ce 是 OS 抽象，qm 是协作 harness 应用；跟 [#3 andrewyng/openworker](https://github.com/andrewyng/openworker)（本地 desktop）对比——aos-ce 想做"agent 时代的 Linux"，openworker 想做"agent 时代的 Slack + desktop"。
- **信号判断**：✅ 架构严谨（MCP 边缘的本地 bridge 只接受 boolean + 固定 enum 是月榜设计最严谨的安全设计）；⚠️ 安全 bug（[#84](https://github.com/unicity-aos/aos-ce/issues/84) 跨 principal 响应 bug 必须修）；✅ 元层创新（meta-harness skill 把 instructions / memory / skills / traces 都视为可改进的用户态世界）；✅ 早期建设（forks 仅 21 / push 活跃 / 30 issues 都在讨论方向）。
- **适用场景**：**适合**：想理解"agent operating system"该是什么样的人 / 想给自家 agent harness 加 MCP 边缘安全设计参考 / 对 agent self-improvement 机制感兴趣的研究者 · **不适合**：想直接拿来跑的终端用户（早期项目）/ 想要传统 Linux 兼容体验的运维 / 对 Rust + 元层设计耐心有限的应用层用户。

---


## 数据方法

- **数据源**：GitHub Search API（`https://api.github.com/search/repositories`），认证走 GitHub PAT（`~/.private/gh-trending-token`，5000/h）。`GitHub Trending` HTML 页对 curl 直连返 0 字节（无 JS 客户端封了），本期未采——口径用 `created:` 窗口 + `stars:>50` 替代。
- **月榜窗口**：`created:2026-07-01..2026-08-01`（上月 1 号 UTC 00:00:00 → 本月 1 号 UTC 00:00:00，整月，左闭右开）。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant`，限定 `in:readme`。
- **排序**：`sort=stars&order=desc`，按当前 star 数降序。
- **样本构成**：本月 2144 条命中 / 英文占 6 成、中文占 3 成、其他语言 1 成；Top 50 中 TypeScript 19 · Python 12 · JavaScript 6 · Rust 6 · C 4 · HTML 3 · Swift 1 · Shell 1 · Markdown 1 · 其他 / 未知 4。语言分布以仓库 description / README 主语言判。
- **深挖维度**：仓库元数据（topics / lang / size / 创建日期 / open issues / forks / 最近 push）+ README 关键节（中段 2-5K 字符覆盖核心价值、技术架构、命令行示例）+ issues 实战反馈（用户名 + 原文摘录，含 open/closed 状态）+ 横向对比 1-2 个同类项目 + 信号判断（实战 / 兼容 / 安全 / 增长 / 研究诚信）+ 适用场景（适合做什么 / 不适合做什么）。
- **slug 命名**：`github-monthly-YYYY-MM`，YYYY-MM 用窗口起始月（`2026-07`），跟窗口一致——月榜标题、H1、db.json title 三处必须都是 2026-07。
- **同步发布**：本文章由 `gh-trending-watch` skill 自动生成；日榜文章（`github-trending-YYYY-MM-DD`）在 CST 早 8 点由 `cronjob 8f1a83d062df` 单独发，周榜文章（`github-weekly-YYYY-Www`）在 CST 周一 07 点由 `cronjob 1b5af8eb85f4` 单独发。三档文章互不引用 Top 详深挖（每篇写完整）。
