# GitHub 日榜 · 2026-08-22 · x64dbg-MCP 霸榜单日王 + Skill 类长尾集中爆发

> 数据口径：基于 [GitHub Search API](https://api.github.com/search/repositories) `q=created:2026-08-22..2026-08-23+stars:>50+archived:false+(ai OR llm OR agent OR mcp OR assistant)+in:readme&sort=stars&order=desc&per_page=20` 抓取昨日（UTC 单日窗口）新创建仓库；本周窗口 `2026-08-16..2026-08-23`（UTC 整周 7 天，左闭右开）；本月窗口 `2026-07-01..2026-08-01`（UTC 整月，左闭右开）。快照时间：2026-08-23 21:09 CST。

昨日共有 15 条新创建仓库进入候选池（>50 star 且 README 命中 ai/llm/agent/mcp/assistant 任一关键词）。本周 178 条；本月 2144 条。本日榜重点深挖昨日 Top 5。

## 核心信号

- **MCP 协议层持续渗透昨日新仓**：[`duty1g/x64dbg-mcp-server`](https://github.com/duty1g/x64dbg-mcp-server)（353 ⭐）用 Zig 写成 x64dbg 的原生 MCP 插件，把调试器暴露成 MCP 工具，让 Claude Code 能设断点、读内存、dump 寄存器；它是单日榜冠军。
- **Skill 生态长尾集中爆发**：本周 Top 30 中至少 12 条直接是某 Agent Skill（Codex / Claude Code / Doubao / Cursor 等）。昨日 Top 10 里 [`nateherkai/scroll-craft`](https://github.com/nateherkai/scroll-craft)（348 ⭐）是 Claude Code 风格的滚动建站 skill，靠"三种不同叙事 page grammar + 8 套互斥排版范式"出圈；[`s1dashu/ip-as-logo-skill`](https://github.com/s1dashu/ip-as-logo-skill) 周内 3853 ⭐，挂在 s1dashu 自建 Cloudflare R2 + Supabase 的 logo 库下，连 issue 里都跑出"特别受韩国开发者欢迎"的反馈。
- **本周 DeepSeek 周边跑出单生态爆款**：[`Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report`](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report) 用 DeepSeek V4-Flash-Vision-Exp × J-Space V3.7 在 Terminal Bench 2.1 / DeepSWE / GAIA 几个基准上做对照实验，周内 1039 ⭐，但社区对报告里的数字争议很大（见深挖）。
- **"AI 服装去衣"等擦边主题污染单日榜**：[`aj-2-c-2-a/undress-designses`](https://github.com/aj-2-c-2-a/undress-designses)（188 ⭐，0 fork）README 自称"虚拟试穿 + 服装替换"，topics 标签却是 `ai-undress-porn / uncensored-ai-image-editor / explicit-content`，与 README 描述严重不一致，是典型的关键词刷榜蹭流量——读者不要把它当正经 AI 试穿项目。
- **国产 Skills 在本周 Top 30 占据过半**：[`wang2122/sprix-sage-router`](https://github.com/wang2122/sprix-sage-router)、[`MeteorNOX/DeepSeek-Balance-Whale-Widget`](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget)、[`Spielewoy/autoprompt-skill`](https://github.com/Spielewoy/autoprompt-skill)、[`bam-bam-2/solo-skills`](https://github.com/bam-bam-2/solo-skills) 等都在榜单内，且作者 id / README 中文/韩语占比明显上升。

## 昨日 Top 10 · 2026-08-22（UTC 单日窗口）

| # | 仓库 | ⭐ | 语言 | 一句话 | 信号 |
|---|---|---:|---|---|---|
| 1 | [duty1g/x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server) | 353 | Zig | 原生 x64dbg 的 MCP 插件，让 Claude 直接控制调试器 | ✅ 实测 |
| 2 | [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) | 348 | JavaScript | Claude Code 写高端滚动网站的 skill，强调设计与交互同等 | ✅ 案例 |
| 3 | [Forsy-AI/biosecurity-agent](https://github.com/Forsy-AI/biosecurity-agent) | 209 | TypeScript | 围绕特定目标的全球生物安全监测 + 证据推荐 | ✅ 终端可见 |
| 4 | [aj-2-c-2-a/undress-designses](https://github.com/aj-2-c-2-a/undress-designses) | 188 | – | README 自称虚拟试穿，topics 实为 AI 去衣，标签不一致 | ⚠️ 擦边 |
| 5 | [josiah-nelson/eidos](https://github.com/josiah-nelson/eidos) | 164 | Rust | Windows 优先的文件系统编目 + 全文索引 + 存储分析 | ✅ 早期开发 |
| 6 | [bam-bam-2/solo-skills](https://github.com/bam-bam-2/solo-skills) | 142 | Python | 韩国单人创业者"49 件自动化"中的 26 个 AI Agent Skills | ✅ 实战 |
| 7 | [zhaoxuya520/MeshLAN](https://github.com/zhaoxuya520/MeshLAN) | 135 | Go | 基于 Nebula 的自托管 P2P 虚拟局域网 + 中继 + AI 自动化 | ✅ 跨平台 |
| 8 | [h9-tec/AI-Glossary-Handbook](https://github.com/h9-tec/AI-Glossary-Handbook) | 90 | – | 600+ AI 词条 × 28 领域从业者参考手册 | ✅ 学习 |
| 9 | [preporato/claude-certification-guide](https://github.com/preporato/claude-certification-guide) | 89 | – | Anthropic 四张 Claude 认证学习指南与考试权重 | ✅ 应试 |
| 10 | [cyunlab/narrant](https://github.com/cyunlab/narrant) | 72 | – | 代码审核辅助桌面工具，把 AI 加速留给人类判断 | ✅ 中文 |

### 昨日 Top 5 深挖

#### 1. [duty1g/x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server) ⭐353
- **一句话**：用 Zig 写的 x64dbg 原生 MCP 插件，把 Windows 调试器的全部能力暴露成 MCP 工具，AI 助手可远程设断点、单步、读内存、dump 寄存器。
- **元数据**：Zig 单二进制（1.7 MB）、零运行时依赖、跨编译 x32/x64、topics 共 19 个（含 `mcp / mcp-server / x64dbg-plugin / malware-analysis / ai-debugging`），star 集中在 24 小时内。
- **核心价值**：① 跨编译静态二进制——不放任何 .NET / Python 运行时，扔进 x64dbg 的 plugins 目录即用；② 全面拥抱 MCP 2024-11-05 规范（Streamable HTTP + SSE transport，JSON-RPC 2.0），不挑 AI 客户端；③ 用 Zig 而非 C/C++，把"零依赖"这条做到极致——MCP 服务侧通常需要 Node/Python，这里一个 .dll 就能跑。
- **信号**：项目开放 issue 区为空（仓库全新），但 README 列举了断点/单步/内存读/寄存器 dump/脚本调用等十类能力，是把"AI 直接调试"这条路打到生产可用的关键拼图。横向对比 [`mrexodia/x64dbg-mcp`](https://github.com/mrexodia/x64dbg-mcp)（Python 实现，需额外进程）和 [`hugsy/gef`](https://github.com/hugsy/gef)（gdb 插件）——本仓是第一个给 x64dbg 做原生 MCP 的 Zig 实现，省去了外部进程。
- **争议信号**：⚠️ 标签里同时出现 `malware-analysis` 与 `malware-scanner`——这是双刃剑，正向用例是研究分析师用 Claude 调试样本，逆向用例是把自动化 malware 分析的工具交到任意 LLM。仓库虽标 `Red Team`，但缺乏对 prompt injection / 工具越权的安全边界声明；MCP 工具面广到"任意内存读 + 任意 shell 执行"级别时，等于给 AI 完全的本地 RCE。
- **适用场景**：**适合**：Windows 逆向工程师 / 红队想要 Claude 直接调 x64dbg 做样本调试 / 想用 MCP 在本地零额外进程起 LLM 调试代理 · **不适合**：无 x64dbg 使用经验者、需要 GUI 引导的项目、对 Zig 工具链排错无耐心的人。

#### 2. [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) ⭐348
- **一句话**：Claude Code skill，给 Claude 一份"做高端滚动网站"的工艺标准，强调"交互"和"工艺"是同一件事而不是两件事。
- **元数据**：JS / 4.8 MB（demo 资源多）、topics 15 个（含 `agent-skills / claude-code / ai-web-design / scroll-animation / scrollytelling`），forks 61 高于昨日冠军（社区在抄）。
- **核心价值**：① 8 套互斥 page grammar——filmic one-shot / chaptered editorial / live…等，每套都禁止另一套的常用手法，强制选型；② 三种示范成品（Orrery 连续世界飞行 / PERKFORM 一镜产品页 / Fallowbank 博物馆克制式）共用同一份 skill，证明 skill 不靠换主题驱动差异化；③ README 把"AI 网页输出通常失败的两条路"明示出来——"乖巧而无聊"和"花哨但 2.1:1 字体、六行标题、六个标配段"。
- **信号**：开放 issue 区为空（也是新仓），但 fork 数已达 61，超过昨日所有候选——社区在 fork 模板；README 自带可读 license（MIT）。横向对比 [`oso95/scroll-world`](https://github.com/oso95/scroll-world)（周榜 #6，本月榜 #6，做"任意品牌转 3D 滚动落地页"，更接近建站模板）和 [`LiamGvchi/gc-minimal-zine-poster`](https://github.com/LiamGvchi/gc-minimal-zine-poster)（周内 #12，Codex skill，专做 zine 海报）——scroll-craft 把"叙事"这条线做到了设计标准层面。
- **争议信号**：⚠️ 仓库名/品牌 `scrollcraft` 与同名 npm 包可能冲突（同名 `scrollcraft` 也有别的代码库），混淆 issue 时容易绕错路；tags 写得"很营销"（含 `landing-page`），README 里没有"避免哪些 AI 网页输出坏味道"的负面清单，全是示范照。
- **适用场景**：**适合**：前端 / 数字代理 / 营销团队想要 Claude 直接产出"像 2024 Awwwards 级别"的滚动叙事页面 · **不适合**：要做后台 / 工具类页面、追求极致首屏性能（scroll-craft 鼓励大背景视频/过渡，对 Core Web Vitals 不友好）。

#### 3. [Forsy-AI/biosecurity-agent](https://github.com/Forsy-AI/biosecurity-agent) ⭐209
- **一句话**：开源的"生物安全 Agent"，给 AI 设定保护目标后，它围绕目标构建生物安全世界、追踪变化、推演未来并给出可验证证据的防护建议。
- **元数据**：TypeScript / 1.8 MB / 0 open issues（仓库新）；仓库描述为空，仅 README 自述。
- **核心价值**：① 终端可见的处理管线——`TARGET MODELLING / OFFICIAL + SCIENTIFIC / NEWS + OPEN WEB / SOCIAL + COMMUNITY / SENSORS + SURVEILLANCE / CUSTOM SOURCES / WORLD SYNTHESIS` 七条 lane，每条都打印 ✓ 数字；② 三态证据分层——observed / inferred / simulated claim 始终分离，用户看到的不是被混在一块的"猜测"；③ 本地运行时可恢复上次 target 与 watcher，启动后继续追同一批事。
- **信号**：仓库 README 给出真实示例输出（18 entities · 18 relationships）；同期 RN 上生物威胁监测在 2026 年 8 月是热点话题（USDA / WHO 都在加 AI 监测），时机契合。横向对比 [`aipoch/open-science`](https://github.com/aipoch/open-science)（本月榜，做 AI 研究 workbench，偏文献）与 [`synthetic-sciences/openscience`](https://github.com/synthetic-sciences/openscience)（本月榜，偏 AI 研究 workbench）——Forsy 这家更聚焦"生物威胁"垂直，没有泛研究 workbench 的体量。
- **争议信号**：⚠️ 仓库描述为空，作者首页 / 公司主页在 README 没给，npm 包名 `@forsy/biosecurity-agent` 也未发布（README 自承"After npm publication"），当前是 RC 阶段。模型推断出的 claim 默认没有置信区间展示，运维层面需要二次确认。
- **适用场景**：**适合**：政府生物安全小组 / 农业监测 / 公共健康情报人员做日常威胁巡视 · **不适合**：需要严格可重复实验的科学场景（观察/推演/模拟虽然分态，但终端 UI 没给置信度）。

#### 4. [aj-2-c-2-a/undress-designses](https://github.com/aj-2-c-2-a/undress-designses) ⭐188
- **一句话**：README 自称"AI 辅助时尚可视化与虚拟试穿工具"，但 README 之外的元数据全是另一个故事。
- **元数据**：0 fork / 0 open issues / 语言栏空 / size 9 KB（纯 README + assets）；topics 共 17 个，其中 `ai-clothing-remover / ai-porn-videos / ai-sex / ai-undress-porn / coomer-party / create-porn / explicit-content / hitomi-la / kemono-su / sex / uncensored-ai-chatbot / uncensored-artificial-intelligence / undres / unfiltered-ai`——所有 tags 都指向"AI 脱衣 / 色情生成"，README 与描述（README 第一行写"AI-powered fashion visualization and virtual try-on toolkit for consent-based garment editing"）完全两个方向。
- **核心价值（按 README）**：声称做"虚拟试穿 + 服装替换 + 概念稿 + 分段遮罩 + 风格迁移"，并强制要求用户只处理"自有或获明确授权"的图像，禁止对未成年人处理，禁止任何脱衣 / 性化 / 误导性编辑。
- **信号**：⚠️ README + topics 严重自相矛盾——文档强调"responsibility"，标签全是反方向；这种仓库典型是 SEO 刷榜 + 站外引流（README 自带一个 `undress.design/edit?utm_source=gist.github.com/...` 推广链接到第三方站点）。0 fork 也说明社区没拿它当真项目用。横向对比 [`feyzilim/clipfactory`](https://github.com/feyzilim/clipfactory)（昨日 Top 15，靠自有 B-roll + 模板生成短视频，纯 AI 视频剪辑）——后者是有真实产品的，本仓更像刷流量壳。
- **争议信号**：⚠️ 标签几乎全是成人 AI 关键词，与 README 描述"consent-based virtual try-on"形成强烈反差；访问 `undress.design` 第三方域名的风险由用户自负，**不建议下载运行本仓库代码**。
- **适用场景**：**适合**：无（仅作 SEO / 关键词污染的样本识别用）· **不适合**：任何对内容真实用途有疑虑的场景。

#### 5. [josiah-nelson/eidos](https://github.com/josiah-nelson/eidos) ⭐164
- **一句话**：Windows 优先的文件系统编目 + 内容索引 + 存储分析 + 搜索服务，Rust + SQLite + Tantivy + React。
- **元数据**：Rust / 565 KB / 29 open issues / 0 fork（刚起步，但维护积极）；topics 8 个（`filesystem / indexer / ntfs / rust / search / storage-analyzer / tantivy / windows`）。
- **核心价值**：① 对象身份与路径身份分离——重命名 / 移动 / 硬链接不再被当作"新内容"，扫描可原子发布；② Everything 级别的元数据响应（批量原生 NTFS 枚举 + USN journal 秒级感知）+ dtSearch 级别的内容搜索（流式 literal-text）+ WinDirStat 级别的存储分析（treemap + 树形浏览）合一；③ 目录是一等结果（带 `has:idb has:cs / files:>1000 / subtree:>1G` 等谓词 + 文档化的排序规则）。
- **信号**：29 个 open issue 表明是早期但活跃的开发状态，#24「从 Rust 源类型自动生成 TypeScript API 合约」、#25「加 service API 集成测试 + 实战 web 测试栈」、#26「扩 CI 加跨平台 Rust 检查 + 依赖安全审计」、#27「加 query parsing 的 property + fuzz test」——全是工程纪律建设，方向诚实。横向对比 [`Everything](https://www.voidtools.com/)`（闭源 / Windows 经典）和 [`ripgrep-all`](https://github.com/phiresky/ripgrep-all)`（跨平台但只读）——eidos 想做"开放 + Windows 原生 + 写入可恢复"的统一盘面。
- **争议信号**：⚠️ 0 fork 说明目前仍是个人项目，未有社区 fork；schemas / API / query syntax "can still change"（README 自述），还不适合接生产；NTFS USN journal 在某些 Win10 老版本不可用，需要 fallback 路径——这点 README 提了但 issue 列表里没看到对应讨论。
- **适用场景**：**适合**：Windows 高级用户 / 渗透测试者 / 安全分析师要在单台 Windows 上做"全盘编目 + 全文 + 存储可视"· **不适合**：Linux/macOS 用户（README 写"eventually cross-platform"，当前没做）、需要立即稳定的工具（schemas 还会动）。

### 昨日 Top 6-10 简评

- **[bam-bam-2/solo-skills](https://github.com/bam-bam-2/solo-skills)** ⭐142：韩语 README，单人创业者把"做产品视频、写电子书、做会议纪要、回客 kakao"等 49 项业务里能脱敏的 26 项做成 Claude Code / Codex / OpenCode 通用的 SKILL.md 风格技能包。
- **[zhaoxuya520/MeshLAN](https://github.com/zhaoxuya520/MeshLAN)** ⭐135：Go 1.26 + Nebula 1.11，自托管 P2P 虚拟局域网 + 中继兜底 + 服务共享 + AI 自动化，三端（Windows / Linux / macOS）齐发，主打"绕过中心 VPN"的网络拼装。
- **[h9-tec/AI-Glossary-Handbook](https://github.com/h9-tec/AI-Glossary-Handbook)** ⭐90：600+ AI 词条、28 领域从业者参考手册，从机器学习基础到对齐 / RAG / agents / 推理优化 / 多语 NLP / 安全 / 可解释性 / 生产基础设施——面试 / 学习 / 团队共享词典三合一。
- **[preporato/claude-certification-guide](https://github.com/preporato/claude-certification-guide)** ⭐89：Anthropic 在 2026-03-12 首发 CCA-F（Claude Certified Architect - Foundations），7-23 扩成 4 张（CCAO-F / CCDV-F / CCA-F / CCAR-P）——本仓对比四张考试领域与权重 + 选型决策 + 备考路径 + 免费题源。
- **[cyunlab/narrant](https://github.com/cyunlab/narrant)** ⭐72：中文 README，桌面端代码审核工具，统一本地分支 + GitHub PR 显示、AI 辅助解释 diff，但"最终判断留给工程师"——定位"AI 加速人类审核"而非"AI 替代审核"。

### 昨日 Top 11-15（不入榜但有热度）

| # | 仓库 | ⭐ | 一句话 |
|---|---|---:|---|
| 11 | [luke321/vault-graph](https://github.com/luke321/vault-graph) | 70 | 把整个 Obsidian vault 渲染成单个离线 HTML 文件的交互图 |
| 12 | [feyzilim/clipfactory](https://github.com/feyzilim/clipfactory) | 65 | 主题 + 模板 + 自有 B-roll → 短视频：脚本 / 配音 / 镜头规划 / 字幕 / FFmpeg 渲染 |
| 13 | [kgoedecke/doop](https://github.com/kgoedecke/doop) | 65 | Paper.design 的开源替代，多人 + AI 协作设计画布 |
| 14 | [totec448-spec/chat-on-steroids](https://github.com/totec448-spec/chat-on-steroids) | 61 | 本机 Windows 上跑 ChatGPT 桥接 MCP，仅在你批准的目录与能力内 |
| 15 | [ripmilla/netwalk](https://github.com/ripmilla/netwalk) | 58 | 只读网络巡检工具，给 AI 编码代理用：爬站、诊断、出图 |

---

## 本周 Top 30 · 2026-08-16..2026-08-23（UTC 整周）

| # | 仓库 | ⭐ | 语言 | 一句话 |
|---|---|---:|---|---|
| 1 | [s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill) | 3853 | – | Codex 风格的"极简可爱公司级 IP 吉祥物 logo"生成 skill，自带 Cloudflare R2 + Supabase 在线库 |
| 2 | [yetone/cumora](https://github.com/yetone/cumora) | 2916 | TypeScript | 跨平台团队聊天，AI agent 作为"一等参与者"，BYOA（自带 Claude Code/Codex/Grok Build/Cursor） |
| 3 | [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | 2411 | TypeScript | 开放源码 AI 同事，每人独立浏览器 + 文件 + 仅授权工具；alpha 阶段 |
| 4 | [wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router) | 1394 | Python | A2A 网络上 SELF / COLLABORATE / HANDOFF 状态感知路由 |
| 5 | [cinderline/northcinder](https://github.com/cinderline/northcinder) | 1206 | JavaScript | 比价 MCP server，购物决策"先问买家再下单" |
| 6 | [vvxw/deploy-vercel](https://github.com/vvxw/deploy-vercel) | 1191 | JavaScript | Vercel 一键反代 + 优选域名（clash 节点订阅场景） |
| 7 | [Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report) | 1039 | – | DeepSeek V4 × J-Space V3.7 在 Terminal-Bench / DeepSWE / GAIA 上的能力释放报告 |
| 8 | [Spielewoy/autoprompt-skill](https://github.com/Spielewoy/autoprompt-skill) | 737 | JavaScript | coding agent 技能，在 agentic coding 任务上号称 -45% 失败率 |
| 9 | [browser-use/macos-harness](https://github.com/browser-use/macos-harness) | 715 | Python | "最薄"的 macOS 操控 harness，单 Python 进程给 LLM 完整 Mac 自由 |
| 10 | [SigmanticAI/apex-inference-chip](https://github.com/SigmanticAI/apex-inference-chip) | 681 | Python | FPGA 上跑真 Qwen2.5-0.5B 的推理芯片 RTL 设计，bit-exact 黄金模型 |
| 11 | [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 659 | JavaScript | 嵌在 DSH 界面右下角的"小鲸鱼娘"，盯 DeepSeek 账户余额，QQ 弹弹 |
| 12 | [missuo/herdrm](https://github.com/missuo/herdrm) | 609 | Swift | macOS 原生 herdr 控制台，把所有 coding agent 集中展示 |
| 13 | [bawadou/ai-data-extractor](https://github.com/bawadou/ai-data-extractor) | 541 | Python | 提取 Claude / Cursor / Codex 等 AI 编码助手聊天记录的免费开源工具 |
| 14 | [flaqai/backlink_skills](https://github.com/flaqai/backlink_skills) | 531 | Python | "免费 SEO 反向链接" Codex 技能合集 |
| 15 | [iAmCorey/Wake](https://github.com/iAmCorey/Wake) | 513 | Rust | macOS 上统一浏览 / 搜索 / 恢复所有 coding agent 会话 |
| 16 | [cclank/lanshu-create-ai-presenter-video](https://github.com/cclank/lanshu-create-ai-presenter-video) | 506 | Python | 厂商中立的 Codex Skill，把单一脚本 → 验证过的 AI 主播视频 |
| 17 | [b-nnett/codex-subscription-router](https://github.com/b-nnett/codex-subscription-router) | 375 | Go | Codex 订阅路由器 |
| 18 | [almendili/skills](https://github.com/almendili/skills) | 355 | TypeScript | Agent skills 集合 |
| 19 | [duty1g/x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server) | 353 | Zig | 昨日 Top 1，本周 #19 |
| 20 | [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) | 347 | JavaScript | 昨日 Top 2，本周 #20 |
| 21 | [Ariescar/anyCreature](https://github.com/Ariescar/anyCreature) | 307 | JavaScript | （描述空，star 增长异常，看后续） |
| 22 | [Yuzzyuk/marketing-os](https://github.com/Yuzzyuk/marketing-os) | 288 | – | "整套营销部"作为一个 Claude skill，14 个模块 |
| 23 | [LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler) | 286 | Python | ComfyUI 上 H3（24 通道）的神经网络 latent 放大器，绕开 5B 参数 VAE decode |
| 24 | [jaredrhod/fullstack-agent](https://github.com/jaredrhod/fullstack-agent) | 278 | Shell | "给 AI 一个完整 stack：memory / voice / face / hands"的全栈代理 |
| 25 | [amagine-ai/Amagine3D](https://github.com/amagine-ai/Amagine3D) | 275 | TypeScript | 从硬件需求描述 → 可编辑 3D 设计 |
| 26 | [op7418/pilot-harness](https://github.com/op7418/pilot-harness) | 252 | TypeScript | CodePilot 风格的 DeepSeek 桌面客户端 + 插件套件 |
| 27 | [MirroS-Lab/HarnessEval-W](https://github.com/MirroS-Lab/HarnessEval-W) | 250 | Python | 把"视觉世界生成评估"代理化的 harness |
| 28 | [sam70361/emotion-ball](https://github.com/sam70361/emotion-ball) | 241 | JavaScript | AI 助手表情引擎，32 种纯 SVG 状态表情，零框架 / 零图片 |
| 29 | [JetBrains/benjamin-plus-skill](https://github.com/JetBrains/benjamin-plus-skill) | 238 | Shell | JetBrains 出的 coding agent token 节省 skill，-17.9% cost |
| 30 | [DFarm6/Prism-Browser-Community](https://github.com/DFarm6/Prism-Browser-Community) | 231 | TypeScript | 本地优先的开源多 profile 反指纹浏览器，Chromium 基底 |

### 本周 Top 1-5 深挖（同步周榜文章口径的简版）

> 周榜文章（`github-weekly-2026-W34`，本周一 07:00 CST 自动发）会有 Top 1-10 详深挖，本节先给本周 Top 1-5 简版避免上下文缺失：

- **[s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill)** ⭐3853：核心机制是"用 4–7 个大基础图形 + 三色（两个 IP 主色 + 一个背景色）+ 一个从左下或右下突出的视觉主体"压出"可爱且公司可用"的 logo。issue #8（已 open）有用户报告 CDN 图 404，作者测试多个设备/网络都能打开，建议换网络/关 VPN/adblock——说明站点 [`ipaslogo.com`](https://ipaslogo.com) 已经稳定运营，issue #3 标题"This skill is very popular with Koreans."作者回复 "thanks for letting me know! will share more!"——社区是真实在用；issue #1 用户拿 skill 做了个头像生成器，作者感谢保留 SKILL.md 与 license。
- **[yetone/cumora](https://github.com/yetone/cumora)** ⭐2916："AI agent 作为团队一等参与者"，自有 Cumora Cloud（managed per-agent pod，跑 OpenAI Responses API 多跳工具调用循环）+ BYOA 路径（`npx cumora agent computer` 接入你本机 Claude Code / Codex / Grok Build / Cursor，server 看不到你的 provider key）。issue #58 / #59 直指 Windows BYOA daemon 启动失败 + `--install-service` tip 在 Windows 上没实现——BYOA 跨平台稳定性是当前短板。
- **[CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot)** ⭐2411：CI + security_zizmor 双工作流 + MIT 许可，alpha 阶段。32 open issues 里 #193「Routines：让 Bot 按计划无人值守执行」、#192「Bot-to-bot 消息传递」、#194「supervisor 在宿主机所有地址上发布且持有 Docker socket」是三个最重要的"功能 vs 安全"取舍点——评论里 @zopeVaibhav 指出"这两个 issue 共享一块底层基建，是同一个未被造出的能力"。
- **[wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router)** ⭐1394：屿智同行 Sprix AI 开源研究产品，A2A 协议之上的"决策层"。SELF / COLLABORATE / HANDOFF 三路由放在同一个可审计目标函数下，结合任务 DAG 角色分配 + 调度依赖 + 执行证据学习。1394 ⭐ + 23 forks 在"研究预览"阶段拿到这个量级，社区相当认可。
- **[cinderline/northcinder](https://github.com/cinderline/northcinder)** ⭐1206：MCP server 形态，比价 shopping agent。和"大市场 agent"反向——后者"搜自家 catalog → 引到自家结账"，本仓"按你选的源头比价 → 显示事实来源 → 买之前先问你"，不靠 cloud 服务，纯本地进程。6 forks 偏低是开发者刚发布（open_issues 2）。

### 本周 Top 6-30 简评（每条 1 句话）

- **[vvxw/deploy-vercel](https://github.com/vvxw/deploy-vercel)** ⭐1191：Vercel 一键反代 + clash 优选订阅节点——描述空，README 第一步"Use this template 创建私人 repo"，第三步"用 AI 生成的纯 HTML 替换 index.thml 伪装网页"——本质是 clash 节点托管壳。issue #6 报告地区编码有几个不能用。
- **[Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report)** ⭐1039：DeepSeek V4 × J-Space V3.7 对照报告。issue #13「无法复现报告中提供的 Terminal Bench 2.1 正确率」作者 hw3150cu 回复"我在不带 J-Space 的 DSH 上复现出 77.5%，已请作者给 deployment 配置"——研究诚信信号明显偏负；issue #14「两个建议」作者 WeZZard 吐槽"全网都没有 Qwen 3.8 27B 的 J-lens 🤣"——这个项目更像是 DSH 单生态的"能力证明广告"而非通用 benchmark。
- **[Spielewoy/autoprompt-skill](https://github.com/Spielewoy/autoprompt-skill)** ⭐737：自称在 agentic coding 任务上 -45% 失败率。issue #14/13/12 三连都在修 Windows 上 Git 装在非默认路径导致测试失败，作者处理 prompt 但底子确实脆弱；#6 已合并，作者回复 "Thanks for your contribution!"——互动健康。
- **[browser-use/macos-harness](https://github.com/browser-use/macos-harness)** ⭐715："最薄"的 macOS 操控 harness，README 一句话："agent 写到缺什么就写什么"，无框架。issue #6「mac.click() 在原生 AppKit 应用（Finder / Calculator）上静默无效」+ 评论里 fredchu 在 macOS 26.5.2 / Apple Silicon 多显示器复现 + 作者 Ryanm218 主动撤回一条错误结论——攻防严谨，HarnessEval-W 同源研究方。
- **[SigmanticAI/apex-inference-chip](https://github.com/SigmanticAI/apex-inference-chip)** ⭐681：FPGA 上跑真 Qwen2.5-0.5B 的推理芯片 RTL 设计（attention + KV-cache 压缩 + softmax + RMSNorm + RoPE + SwiGLU + residual），每个块都 bit-exact 对照可执行黄金模型。号称"为记得而设计"——把 attention 计算和 KV 压缩塞进同一条 datapath。
- **[MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget)** ⭐659：DSH 界面右下角的"小鲸鱼娘"余额监视，QQ 弹弹、拖拽吸附。
- **[missuo/herdrm](https://github.com/missuo/herdrm)** ⭐609：macOS 原生 herdr 控制台，把所有 coding agent 集中展示。
- **[bawadou/ai-data-extractor](https://github.com/bawadou/ai-data-extractor)** ⭐541：提取 Claude / Cursor / Codex 等 AI 编码助手聊天记录的免费开源工具。
- **[flaqai/backlink_skills](https://github.com/flaqai/backlink_skills)** ⭐531："免费 SEO 反向链接" Codex 技能合集。
- **[iAmCorey/Wake](https://github.com/iAmCorey/Wake)** ⭐513：macOS 上统一浏览 / 搜索 / 恢复所有 coding agent 会话。
- **[cclank/lanshu-create-ai-presenter-video](https://github.com/cclank/lanshu-create-ai-presenter-video)** ⭐506：厂商中立的 Codex Skill，把单一脚本 → 验证过的 AI 主播视频。
- **[b-nnett/codex-subscription-router](https://github.com/b-nnett/codex-subscription-router)** ⭐375：Codex 订阅路由器。
- **[almendili/skills](https://github.com/almendili/skills)** ⭐355：Agent skills 集合。
- **[duty1g/x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server)** ⭐353：昨日 Top 1，本周 #19。
- **[nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft)** ⭐347：昨日 Top 2，本周 #20。
- **[Ariescar/anyCreature](https://github.com/Ariescar/anyCreature)** ⭐307：描述空，star 增长异常。
- **[Yuzzyuk/marketing-os](https://github.com/Yuzzyuk/marketing-os)** ⭐288："整套营销部"作为一个 Claude skill，14 个模块。
- **[LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler)** ⭐286：ComfyUI 上 H3（24 通道）的神经网络 latent 放大器。
- **[jaredrhod/fullstack-agent](https://github.com/jaredrhod/fullstack-agent)** ⭐278：全栈 AI agent：memory / voice / face / hands。
- **[amagine-ai/Amagine3D](https://github.com/amagine-ai/Amagine3D)** ⭐275：硬件需求描述 → 可编辑 3D 设计。
- **[op7418/pilot-harness](https://github.com/op7418/pilot-harness)** ⭐252：CodePilot 风格的 DeepSeek 桌面客户端 + 插件套件。
- **[MirroS-Lab/HarnessEval-W](https://github.com/MirroS-Lab/HarnessEval-W)** ⭐250：把"视觉世界生成评估"代理化的 harness。
- **[sam70361/emotion-ball](https://github.com/sam70361/emotion-ball)** ⭐241：AI 助手表情引擎，32 种纯 SVG 状态表情。
- **[JetBrains/benjamin-plus-skill](https://github.com/JetBrains/benjamin-plus-skill)** ⭐238：JetBrains 出的 coding agent token 节省 skill，-17.9% cost。
- **[DFarm6/Prism-Browser-Community](https://github.com/DFarm6/Prism-Browser-Community)** ⭐231：本地的多 profile 反指纹浏览器。

---

## 本月 Top 50 · 2026-07-01..2026-08-01（UTC 整月）

| # | 仓库 | ⭐ | 语言 | 一句话 |
|---|---|---:|---|---|
| 1 | [JustVugg/colibri](https://github.com/JustVugg/colibri) | 25925 | C | 纯 C 跑前沿 MoE 模型（744B–2.8T），专家流式从盘读，零引擎依赖 |
| 2 | [xai-org/grok-build](https://github.com/xai-org/grok-build) | 25918 | Rust | SpaceXAI 的 coding agent harness + TUI，全屏鼠标交互 |
| 3 | [andrewyng/openworker](https://github.com/andrewyng/openworker) | 14953 | Python | 开源 AI 同事，桌面端跑交付物而非聊天 |
| 4 | [yc-software/qm](https://github.com/yc-software/qm) | 14092 | TypeScript | 多 agent harness，Startups 用的"在 Slack 和 Web 上的员工" |
| 5 | [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) | 14051 | JavaScript | Codex 桌面端换肤工具，本机 CDP 注入，不改官方安装包 |
| 6 | [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) | 12937 | Python | 把参考图重建为代码 only / 程序生成 / 质量门控的 Three.js 模型 |
| 7 | [openai/codex-security](https://github.com/openai/codex-security) | 10097 | TypeScript | OpenAI 的 Codex Security CLI + TS SDK，找 / 验证 / 修漏洞 |
| 8 | [trycompai/crm](https://github.com/trycompai/crm) | 8825 | TypeScript | 面向 AI agent 的开源 CRM，agentic-first |
| 9 | [MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3) | 8586 | – | "Open Frontier Intelligence" |
| 10 | [unicity-aos/aos-ce](https://github.com/unicity-aos/aos-ce) | 8554 | Rust | 开放 agent 操作系统（AOS）社区版 |
| 11 | [oso95/scroll-world](https://github.com/oso95/scroll-world) | 8480 | JavaScript | 把任意品牌变成可滚动 3D 世界落地页的 skill |
| 12 | [MiniMax-AI/MiniMax-H3](https://github.com/MiniMax-AI/MiniMax-H3) | 6780 | Python | MiniMax H3 模型 |
| 13 | [LiamGvchi/gc-minimal-zine-poster](https://github.com/LiamGvchi/gc-minimal-zine-poster) | 6563 | – | 生成"克制极简 zine 海报编辑提示词"的 Codex skill |
| 14 | [MDX-Tom/gpt-5.6-instruct](https://github.com/MDX-Tom/gpt-5.6-instruct) | 6346 | Python | 针对 gpt-5.6 系列的 Codex 破甲测试包 |
| 15 | [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) | 6312 | C | 在单 CPU + 8.24 GB 内存跑 2.78 万亿参数 Kimi K3 推理 |
| 16 | [drumih/turbo-fieldfare](https://github.com/drumih/turbo-fieldfare) | 6270 | Swift | M 系 MacBook 上 ~2 GB RAM 跑 Gemma 4 26B-A4B 推理 |
| 17 | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 6117 | TypeScript | Claude Code & Codex 的 AI 视频 skill，Remotion 电影感产品视频 |
| 18 | [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | 5780 | Python | 从任意文章里去掉 20+ 种"AI 味"模式 |
| 19 | [elder-plinius/T3MP3ST](https://github.com/elder-plinius/T3MP3ST) | 5646 | TypeScript | 自主红队平台，多 agent 攻击性安全 meta-harness |
| 20 | [nyblnet/bento](https://github.com/nyblnet/bento) | 4450 | TypeScript | "装在一个文件里的 office 套件" Bento |
| 21 | [NanoNets/Graft](https://github.com/NanoNets/Graft) | 4333 | TypeScript | 给 Claude Code / Cursor / Codex / Gemini 加速、降成本 |
| 22 | [xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer](https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer) | 4290 | – | FDE（前沿部署工程师）从零入门指南 |
| 23 | [Zeejay0/gathered-scenes-zine-skill](https://github.com/Zeejay0/gathered-scenes-zine-skill) | 4264 | – | 集合场景 zine skill |
| 24 | [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | 4222 | TypeScript | "真实 HTML + WebGL 特效"的画布组件库 |
| 25 | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | 4184 | Markdown | Agent skills 集合，帮你做"伟大界面" |
| 26 | [slvDev/esp32-ai](https://github.com/slvDev/esp32-ai) | 4141 | Python | ESP32 上的 AI |
| 27 | [truefoundry/trueforge](https://github.com/truefoundry/trueforge) | 3637 | TypeScript | 开放源码 agent harness，把 LLM 变成生产 worker 的运行时层 |
| 28 | [genspark-ai/genoffice](https://github.com/genspark-ai/genoffice) | 3514 | TypeScript | 跨 macOS/Windows/Linux 的开源 AI office 套件（docx/xlsx/pptx） |
| 29 | [microsoft/skill-recorder](https://github.com/microsoft/skill-recorder) | 3359 | TypeScript | 录屏 + GitHub Copilot 的桌面应用，把你的工作流变成 skill |
| 30 | [xuchonglang/investing-for-beginners](https://github.com/xuchonglang/investing-for-beginners) | 3334 | JavaScript | 小隐寺投资百科官方公开索引：美股、期权与加密货币知识框架 |
| 31 | [synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience) | 3323 | TypeScript | 科研的开放源码 AI workbench |
| 32 | [bryanthaboi/gen1recomp](https://github.com/bryanthaboi/gen1recomp) | 3313 | C | Gen1Recomp：原生 Lua / LÖVE2D 复刻 Gen1 宝可梦 |
| 33 | [kvcache-ai/AgentENV](https://github.com/kvcache-ai/AgentENV) | 3282 | Rust | AgentENV（AENV）：分布式大规模 agent 环境运行平台 |
| 34 | [isjiamu/gzh-design-skill](https://github.com/isjiamu/gzh-design-skill) | 3267 | HTML | Markdown 一键排成可贴进公众号编辑器的精致 HTML，6 套主题 + 生成器 |
| 35 | [mshumer/Claude-of-Duty](https://github.com/mshumer/Claude-of-Duty) | 3252 | JavaScript | 用一句提示在 Three.js 里做 COD 级 FPS |
| 36 | [kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew) | 3181 | Python | 持久化开发工作区，能自改进 + 跨会话延续 |
| 37 | [Tiger3807861189/J-Space-Cognition-Suite-V3.7](https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.7) | 3015 | Python | 基于 Anthropic 的 AI 认知增强 Skills V3.7 |
| 38 | [aipoch/open-science](https://github.com/aipoch/open-science) | 2959 | TypeScript | 科研 AI workbench，可复现研究的科研 agent |
| 39 | [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | 2864 | Python | （描述空，star 异常，看后续） |
| 40 | [duolahypercho/codex-router](https://github.com/duolahypercho/codex-router) | 2789 | JavaScript | Codex 外接模型路由：Kimi OAuth/API、DeepSeek、安全迁移 |
| 41 | [QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins) | 2756 | HTML | 让任意 agent harness 天然多模态 |
| 42 | [yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) | 2743 | Rust | OpenAI Codex 桌面 / CLI 的可视化管理工具 |
| 43 | [AminBlg/SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) | 2729 | Python | Agent skill：让 LLM 按 ASD-STE100 简化英语规范写文档 |
| 44 | [lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) | 2558 | Python | Ryan Lopopolo 的 harness 工程文选 + 实战指南 + agent context |
| 45 | [Jakubantalik/thinking-orbs](https://github.com/Jakubantalik/thinking-orbs) | 2555 | TypeScript | AI / agent UI 用的"思考光球"加载指示器，9 套调好的类型 |
| 46 | [zerx-lab/FluxDown](https://github.com/zerx-lab/FluxDown) | 2536 | Rust | Rust 多协议下载器（HTTP/FTP/BT/HLS/DASH），UI 精美 |
| 47 | [chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard) | 2471 | JavaScript | （描述空，star 异常，看后续） |
| 48 | [AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide) | 2428 | TypeScript | 实战工作流掌握 WorkBuddy 的开源指南 |
| 49 | [powerycy/goutoujunshi](https://github.com/powerycy/goutoujunshi) | 2380 | Python | Codex 恋爱军师：情绪承接 + 关系分析 + 可执行策略 |
| 50 | [DannyMac180/sol-advisor](https://github.com/DannyMac180/sol-advisor) | 2310 | Shell | Codex-native 架构师编排，Luna 与 Terra 实施 lane |

### 本月 Top 1-5 深挖

#### 1. [JustVugg/colibri](https://github.com/JustVugg/colibri) ⭐25925
- **一句话**：纯 C 跑前沿 MoE 模型（744B–2.8T 参数），专家从盘流式读取，零引擎依赖。
- **元数据**：C 语 / 107 open issues（维护活跃）/ 2827 forks（被广泛抄）/ 19 contributors 起量级。
- **核心价值**：① 极简实现——只做推理必需，把模型文件 / 专家路由 / KV cache 三件事压到源码层；② "tiny engine, immense model"是真实口号，单机 8GB 内存也能跑 744B 模型（靠 expert offload）；③ Discord + multilingual README（en / 简中 / 繁中 / it）+ website [`justvugg.github.io/colibri`](https://justvugg.github.io/colibri) 完整，社区运营成熟。
- **信号**：issue #1191「[Bug]: coli tune is unusable on every non-GLM engine — sibling engines don't implement the TUNE decode timing line」作者 JustVugg 跟用户 bigmarketgroup 多回合互动，承认"kimi_k3 接受目录，GLM 接受 cap，harness 没法同接口跑"——这是把多家 MoE 模型接进来的真实工程问题。issue #1190「coli tune 不给 --cap 时传 'None' 作 engine cap」作者确认 GLM 没 cap guard，默认 sweep 测了一个无人请求的工作负载——研究诚信信号中等偏正（承认错了）。
- **争议信号**：⚠️ star 增长极快（25925）+ 总 fork 2827——是"通用 LLM 推理引擎"赛道的爆款；但只有 1 个主作者 + 1~2 个活跃 contributor，未来可持续性要看。同期 [ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp) 在 MoE 上也有更新，是它最强竞品。
- **适用场景**：**适合**：研究 / 个人开发者要在自己笔记本上跑 MoE / 给 colibri 写新模型 backend · **不适合**：需要多 GPU 集群 + 高 QPS 服务的生产场景（它定位"个人 + 边缘"）。

#### 2. [xai-org/grok-build](https://github.com/xai-org/grok-build) ⭐25918
- **一句话**：SpaceXAI 出的 coding agent harness + TUI，全屏鼠标交互，可作为 CI / ACP 嵌入。
- **元数据**：Rust / 4871 forks（生态）/ 0 open issues（官方内部维护）。
- **核心价值**：① 全屏 TUI——超越 CLI 简单 REPL，鼠标交互 + 全屏显示；② 多模式运行：交互 / headless（CI / 脚本）/ 编辑器内（Agent Client Protocol, ACP）；③ 官方仓库，xAI 自家养——fork 数 4871 几乎等于 colibri 2 倍，是当月除 colibri 外 fork 最高的"AI coding agent harness"基础设施。
- **信号**：纯官方仓库，issue 区被 xAI 锁住。README 写得官方克制，AC/agent client protocol 是它区别于 Claude Code / Codex CLI 的关键——其他 harness 没有完整实现 ACP，grok-build 是 xAI 想要推自家生态的协议层。横向对比 [`CopilotKit/OpenBot`](https://github.com/CopilotKit/OpenBot)（alpha，社区驱动）、[`truefoundry/trueforge`](https://github.com/truefoundry/trueforge)（开源运行时层）——grok-build 是当月唯一"厂商官方 + 全屏 TUI + ACP"的复合形态。
- **争议信号**：⚠️ "SpaceXAI" 这个新名字之前没出现过（xAI 更常见），可能是 xAI 与 SpaceX 在 2026 年某种品牌合并的产物；社区对"AI 在 CLI 上和鼠标交互"的 UX 还在磨合；ACP 协议本身是 xAI 私有，第三方难以兼容。
- **适用场景**：**适合**：xAI Grok 付费用户 / 想在 CI 里跑 coding agent / 想用 ACP 协议做编辑器集成 · **不适合**：非 xAI 模型用户、追求纯开源 + 多模型支持的项目。

#### 3. [andrewyng/openworker](https://github.com/andrewyng/openworker) ⭐14953
- **一句话**：开源 AI 同事，桌面端跑"完成的工作"而非聊天。
- **元数据**：Python / 443 open issues（公开度高）/ 2070 forks（社区 fork）/ "[Beta] fully usable, updates itself"。
- **核心价值**：① 交付物而非 chat——README 自述"一份漂亮的文档、一条带数字的 Slack 回复、一份更新的日历"；② 自更新——bin 自动滚动升级；③ 网站 [`openworker.com`](https://openworker.com) 完整 + Trendshift badge 挂着。
- **信号**：issue 列表里 #525「审计日志持久化未脱敏的工具结果预览（邮件正文 / shell 输出）」、#526「LLM 循环没有 untrusted-content 边界，origin 被剥离」、#527「MCP OAuth 流里 SSRF：discovery/registration/token 端点接受任意 redirect」是三个连号的安全报告——研究员在 7 月集中曝出，仓库采取"先公开承认 + 后续修"路径。issue 数 443 + forks 2070 说明社区关注度极高，问题密度也高。
- **争议信号**：⚠️ security issue 一次性挂出 3 个，#527 SSRF 直接指 MCP OAuth discovery/registration/token——和 MCP 协议本身的 server-side stateful 设计相关，需要等 MCP 官方升级；版本自更新是双刃剑（自动接收修复但失去回滚控制）。
- **适用场景**：**适合**：想要"AI 真替你做日常活儿" + 接受 Beta 安全风险 · **不适合**：高敏感数据场景（邮件正文 / shell 输出在审计日志里目前未脱敏）、对回滚有强需求。

#### 4. [yc-software/qm](https://github.com/yc-software/qm) ⭐14092
- **一句话**：多 agent harness，定位"在 Slack 和 Web 上跑的员工"。
- **元数据**：TypeScript / 305 open issues / 1688 forks / 自述"built with open source in mind"。
- **核心价值**：① 隔离工作区——每个员工一份独立工作区，互不污染，同时在 channel / 群消息 / 项目里协作；② 跨维 scoping——"每个人 + 每个房间"独立 scoped memory / files / keychain view / 权限 / crons / web apps / durable sandbox；③ README 截图展示 QM web UI 同时跑两个并发会话 + sidebar 个人文件 / crons / keychain / deploys / memory / skills。
- **信号**：issue #661「docker target：portal 在 auth service 启用时拒绝启动 — CLI 也会挂」——部署链路上还有未解的 docker 启动问题。305 issues 表明 QM 处于"功能快完 / 工程债压力大"的阶段。横向对比 [`andrewyng/openworker`](https://github.com/andrewyng/openworker)（"AI 员工桌面版"）与 [`yetone/cumora`](https://github.com/yetone/cumora)（"AI 员工团队聊天版"）——QM 是 "Slack 嵌入式"，把 chat 与工作流融为一体。
- **争议信号**：⚠️ 1688 forks 但 QM 不是开源工作区协议——它的 forked 版本不一定能互通；startup 定位让它和"通用 multi-agent framework"（如 CrewAI / Autogen）形成两条不同路线。
- **适用场景**：**适合**：startup 团队想直接让 AI 在 Slack 里跑工作 / 不愿自建 agent harness · **不适合**：企业级权限审计场景（scoping 是 room 级，不是企业级 RBAC）。

#### 5. [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) ⭐14051
- **一句话**：给 Codex 桌面端"换一张会呼吸的脸"——外部主题 / 换肤工具，本机 CDP 注入，不改官方安装包。
- **元数据**：JavaScript / 54 open issues / 1348 forks / 中文 README；赞助商 [Passion8](https://passion8.cc/)。
- **核心价值**：① 本机 CDP 注入——不改 `.app / app.asar / WindowsApps`，纯外部主题；② 自带主题库 [`dreamskin.cc`](https://dreamskin.cc) + Studio 在线编辑器 + Gallery；③ 与官方兼容矩阵明确——README 标"非 OpenAI 官方产品"，避免被官方策略波及。
- **信号**：issue #375「[Windows] 一键 gallery 把 macOS-only 主题标成兼容后失败」+ #374「[macOS] v1.5.14 在 ChatGPT 26.814 间歇性注入失败被拒」+ #373「[Windows Codex 26.814 composer 映射与 footer 渐变绕过 Safe C」——三连都是"客户端大版本升级后主题兼容矩阵破裂"的问题，作者 GreenLv 在 #373 评论里加 macOS 实机证据 + DOM 样式 loopback 检查，作者的响应是项目继续维护、版本号紧跟。
- **争议信号**：⚠️ "换肤" 模式天然跟"产品完整性"对立——OpenAI 推客户端大版本时可能故意限制扩展面；赞助商 [Passion8](https://passion8.cc/) 是"AI API 中转"业务，给本仓赞助可能有商业利益引导。
- **适用场景**：**适合**：Codex 桌面端用户想要"更有个性的 UI" / 工作室需要统一品牌色 · **不适合**：担心客户端升级导致主题失效的稳定派。

### 本月 Top 6-10 简评

- **[img2threejs/img2threejs](https://github.com/img2threejs/img2threejs)** ⭐12937：把参考图重建为"代码 only / 程序生成 / 质量门控"的 Three.js 模型。issue #103 报告 path traversal via unvalidated region_id，#102 报告 SSRF via unvalidated index_url——issue 列表里 bot 自动回复 triage，但 #103/102 截至被看时未给出修复 commit。
- **[openai/codex-security](https://github.com/openai/codex-security)** ⭐10097：OpenAI 官方 Codex Security CLI + TS SDK，"找 / 验证 / 修漏洞"，有 178 open issues；声明部分功能需要 Trusted Access for Cyber 审批（[chatgpt.com/cyber](https://chatgpt.com/cyber)）。
- **[trycompai/crm](https://github.com/trycompai/crm)** ⭐8825：面向 AI agent 的开源 CRM；12 open issues；Power by Context 标识 + Comp AI 商业模式。
- **[MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3)** ⭐8586：Moonshot 自家 K3 模型仓库。issue #38「[Critical] Kimi Work 3.0 Orchestrator 在 trivial task 上 15 分钟烧 ~$150」+ #37「Coding Plan 配额耗尽因为模型死循环」——K3 agentic 工作流存在 token / cost 失控问题；Moonshot 团队在跑 K3 的 agentic coding 子服务上有实用反馈要消化。
- **[unicity-aos/aos-ce](https://github.com/unicity-aos/aos-ce)** ⭐8554：开放 agent 操作系统（AOS）社区版。30 open issues；#84「并发上下文压缩可能返回别人的 principal 响应」、#85「aos mcp serve 拒绝 AOS host plugin --workspace argv」——多用户隔离 + 插件装载边界是两个待修点。

### 本月 Top 11-50 简评（每条 1 句话）

- **[oso95/scroll-world](https://github.com/oso95/scroll-world)** ⭐8480：把任意品牌变成可滚动 3D 世界落地页的 skill（本周 #11 同款）。
- **[MiniMax-AI/MiniMax-H3](https://github.com/MiniMax-AI/MiniMax-H3)** ⭐6780：MiniMax H3 模型仓库。
- **[LiamGvchi/gc-minimal-zine-poster](https://github.com/LiamGvchi/gc-minimal-zine-poster)** ⭐6563：生成"克制极简 zine 海报编辑提示词"的 Codex skill。
- **[MDX-Tom/gpt-5.6-instruct](https://github.com/MDX-Tom/gpt-5.6-instruct)** ⭐6346：针对 gpt-5.6 系列的 Codex 破甲测试包。
- **[FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c)** ⭐6312：单 CPU + 8.24 GB 内存跑 2.78 万亿参数 Kimi K3 推理。
- **[drumih/turbo-fieldfare](https://github.com/drumih/turbo-fieldfare)** ⭐6270：M 系 MacBook 上 ~2 GB RAM 跑 Gemma 4 26B-A4B 推理。
- **[Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)** ⭐6117：Claude Code & Codex 的 AI 视频 skill，Remotion 电影感产品视频。
- **[petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop)** ⭐5780：从任意文章里去掉 20+ 种"AI 味"模式。
- **[elder-plinius/T3MP3ST](https://github.com/elder-plinius/T3MP3ST)** ⭐5646：自主红队平台，多 agent 攻击性安全 meta-harness。
- **[nyblnet/bento](https://github.com/nyblnet/bento)** ⭐4450："装在一个文件里的 office 套件" Bento。
- **[NanoNets/Graft](https://github.com/NanoNets/Graft)** ⭐4333：给 Claude Code / Cursor / Codex / Gemini 加速、降成本。
- **[xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer](https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer)** ⭐4290：FDE（前沿部署工程师）从零入门指南（基于范冰《增长黑客》原书框架）。
- **[Zeejay0/gathered-scenes-zine-skill](https://github.com/Zeejay0/gathered-scenes-zine-skill)** ⭐4264：集合场景 zine skill。
- **[DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui)** ⭐4222：真实 HTML + WebGL 特效的画布组件库。
- **[jakubkrehel/skills](https://github.com/jakubkrehel/skills)** ⭐4184：Agent skills 集合，帮你做"伟大界面"。
- **[slvDev/esp32-ai](https://github.com/slvDev/esp32-ai)** ⭐4141：ESP32 上的 AI。
- **[truefoundry/trueforge](https://github.com/truefoundry/trueforge)** ⭐3637：开放源码 agent harness，把 LLM 变成生产 worker 的运行时层。
- **[genspark-ai/genoffice](https://github.com/genspark-ai/genoffice)** ⭐3514：跨 macOS/Windows/Linux 的开源 AI office 套件（docx/xlsx/pptx）。
- **[microsoft/skill-recorder](https://github.com/microsoft/skill-recorder)** ⭐3359：录屏 + GitHub Copilot 的桌面应用，把你的工作流变成 skill。
- **[xuchonglang/investing-for-beginners](https://github.com/xuchonglang/investing-for-beginners)** ⭐3334：小隐寺投资百科官方公开索引：美股、期权与加密货币知识框架。
- **[synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience)** ⭐3323：科研的开放源码 AI workbench。
- **[bryanthaboi/gen1recomp](https://github.com/bryanthaboi/gen1recomp)** ⭐3313：原生 Lua / LÖVE2D 复刻 Gen1 宝可梦。
- **[kvcache-ai/AgentENV](https://github.com/kvcache-ai/AgentENV)** ⭐3282：AgentENV（AENV）：分布式大规模 agent 环境运行平台。
- **[isjiamu/gzh-design-skill](https://github.com/isjiamu/gzh-design-skill)** ⭐3267：Markdown 一键排成可贴进公众号编辑器的精致 HTML。
- **[mshumer/Claude-of-Duty](https://github.com/mshumer/Claude-of-Duty)** ⭐3252：一句提示在 Three.js 里做 COD 级 FPS。
- **[kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew)** ⭐3181：持久化开发工作区，自改进 + 跨会话延续。
- **[Tiger3807861189/J-Space-Cognition-Suite-V3.7](https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.7)** ⭐3015：基于 Anthropic 的 AI 认知增强 Skills V3.7。
- **[aipoch/open-science](https://github.com/aipoch/open-science)** ⭐2959：科研 AI workbench，可复现研究的科研 agent。
- **[FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken)** ⭐2864：（描述空，star 异常，看后续）。
- **[duolahypercho/codex-router](https://github.com/duolahypercho/codex-router)** ⭐2789：Codex 外接模型路由：Kimi OAuth/API、DeepSeek、安全迁移。
- **[QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins)** ⭐2756：让任意 agent harness 天然多模态。
- **[yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X)** ⭐2743：OpenAI Codex 桌面 / CLI 的可视化管理工具。
- **[AminBlg/SimpleEnglish](https://github.com/AminBlg/SimpleEnglish)** ⭐2729：Agent skill：让 LLM 按 ASD-STE100 简化英语规范写文档。
- **[lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering)** ⭐2558：Ryan Lopopolo 的 harness 工程文选 + 实战指南 + agent context。
- **[Jakubantalik/thinking-orbs](https://github.com/Jakubantalik/thinking-orbs)** ⭐2555：AI / agent UI 用的"思考光球"加载指示器。
- **[zerx-lab/FluxDown](https://github.com/zerx-lab/FluxDown)** ⭐2536：Rust 多协议下载器（HTTP/FTP/BT/HLS/DASH）。
- **[chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard)** ⭐2471：（描述空，star 异常，看后续）。
- **[AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide)** ⭐2428：实战工作流掌握 WorkBuddy 的开源指南。
- **[powerycy/goutoujunshi](https://github.com/powerycy/goutoujunshi)** ⭐2380：Codex 恋爱军师：情绪承接 + 关系分析 + 可执行策略。
- **[DannyMac180/sol-advisor](https://github.com/DannyMac180/sol-advisor)** ⭐2310：Codex-native 架构师编排，Luna 与 Terra 实施 lane。

---

## 数据方法

- **数据源**：GitHub Search API（`https://api.github.com/search/repositories`），认证走 GitHub PAT（`~/.private/gh-trending-token`，5000/h）。`GitHub Trending` HTML 页对 curl 直连返 0 字节（无 JS 客户端封了），本期未采——口径用 `created:` 窗口 + `stars:>50` 替代。
- **昨日窗口**：`created:2026-08-22..2026-08-23`（UTC 单日窗口，左闭右开；Y = 昨天 UTC 00:00:00）。
- **本周窗口**：`created:2026-08-16..2026-08-23`（上周一 UTC → 本周一 UTC，整周 7 天，左闭右开）。
- **本月窗口**：`created:2026-07-01..2026-08-01`（上月 1 号 UTC → 本月 1 号 UTC，整月，左闭右开）。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant`，限定 `in:readme`。
- **排序**：`sort=stars&order=desc`，按当前 star 数降序。
- **样本构成**：昨日 15 条命中 / 英文 10 / 中文 4 / 韩语 1；本周 178 条 / 英文占 7 成、中文 2 成、其他语言 1 成；本月 2144 条 / 英文占 6 成、中文 3 成、其他 1 成。语言分布以仓库 description / README 主语言判。
- **深挖维度**：仓库元数据（topics / lang / size / 创建日期 / open issues）+ README 关键节 + issues 实战反馈（用户名 + 原文摘录）+ 横向对比 + 信号判断（安全 / 实战 / 兼容 / 增长 / 研究诚信）。
- **slug 命名**：`github-trending-YYYY-MM-DD`，YYYY-MM-DD 用昨天日期（`2026-08-22`），跟窗口一致——日榜标题、H1、db.json title 三处必须都是 2026-08-22。
- **同步发布**：本文章由 `gh-trending-watch` skill 自动生成；周榜文章（`github-weekly-2026-W34`）在 CST 周一 07:00 由 `cronjob 1b5af8eb85f4` 单独发，月榜文章（`github-monthly-2026-08`）在 CST 每月 1 号 06:00 由 `cronjob 5cc931a18947` 单独发。三档文章互不引用 Top 详深挖（每篇写完整）。