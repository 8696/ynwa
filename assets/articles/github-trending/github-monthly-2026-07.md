# GitHub 月榜 · 2026-07 · colibri 单 C 引擎拿下整月榜首 + Kimi K3 周边生态爆发

7 月 GitHub 上 AI 相关新创建热门仓库的最大看点是 **JustVugg/colibri** —— 一份纯 C 写的零依赖 MoE 推理引擎,把 744B 到 2.8T 参数的 GLM-5.2 / Kimi K3 / DeepSeek V4 Flash 等六大家族模型塞进消费级硬件跑起来。它在 2026-07-01 创建,30 天不到收下 25924⭐,稳坐榜首。第二名 **xai-org/grok-build** 紧追 25916⭐ —— xAI 把内部 SpaceXAI 编码 agent harness 的 Rust 源码公开了,直接对标 Claude Code。第三到第十名围绕 OpenAI / Anthropic / Moonshot / Comp AI / JustVugg 等厂商或独立作者,呈现出 **"模型厂商刷榜 + 独立 agent harness 井喷 + 创意类小项目穿插"** 的明显结构。

**核心信号**

- **colibri 一家把"模型本地化"叙事推到新阶段**:纯 C、零引擎依赖、专家流式落盘、消费级硬件跑 2.8T Kimi K3,把 llama.cpp / vLLM 这类 C++/Python 大框架的故事重新打开。语言 C,⭐ 25924,7 月整月涨幅第一。
- **xAI 主动开源 Grok Build**:`grok-build` 是 SpaceXAI 内部 TUI 编码 agent,与 Claude Code / Codex CLI 直接竞争。Rust 写、25916⭐、Apache-2.0,无 issues / discussions 全关,纯官方仓库节奏。
- **OpenAI 7 月连发两个重量级工具**:`codex-security`(CLI + SDK 做漏洞扫描修复,10097⭐)+ 围绕 Codex 桌面的 Dream Skin(14050⭐)、Codex-X(2742⭐)等周边一起出现,说明 **Codex 桌面端正式进入主题/扩展生态阶段**。
- **Kimi K3 周边生态爆发**:MoonshotAI/Kimi-K3 主仓(8585⭐,NOASSERTION 协议)+ FareedKhan-dev/kimi-k3-in-c(6311⭐,纯 C 推理 2.78T)+ Turbo-Fieldfare(6269⭐,Swift 在 Apple Silicon 上跑 Gemma 4)+ Colibri 内置 Kimi K3 支持 —— 国产前沿模型刚发布,海外独立作者三周内拿出多语言本地化复现,生态响应速度极快。
- **MoonshotAI/MoonshotAI(MiniMax-H3)同档**:6779⭐,无 description / topics,但 README 是完整的产品页 + HuggingFace / Discord / ModelScope 全套链路 —— 一看就是厂商官方仓库,有 HuggingFace 模型仓落地。
- **agent harness 单赛道拥挤**:`xai-org/grok-build` / `andrewyng/openworker` / `yc-software/qm` / `truefoundry/trueforge` / `unicity-aos/aos-ce` / `kirodotdev/KiroCrew` / `lopopolo/harness-engineering` 共 7 个 harness 类项目入榜,占 Top 50 的 14%,且 stars 跨度 2555-25916,显示 **"每个人都在做自己的 harness"** 的赛道拥挤度。
- **zine / 创意 / 个人项目穿插**:`LiamGvchi/gc-minimal-zine-poster` / `Zeejay0/gathered-scenes-zine-skill` / `oso95/scroll-world`(品牌转 3D 滚动落地页) / `Vincentwei1021/video-shotcraft`(152 镜头菜谱的 AI 视频 skill)等一批"个人审美 + Codex/Claude skill"形态的小项目穿插在中间,验证了 **"AI 让独立作者的工具栈大幅下沉"** 这条主线。
- **争议与安全信号**:`img2threejs` 被社区用户 @truongsontung 直接开 issue 报告 SSRF + 路径穿越(两条 open issue,作者已回应);`andrewyng/openworker` 也被报告 MCP OAuth 流程存在 SSRF 漏洞;`unicity-aos/aos-ce` 被报告并发上下文压缩可能返回错误 principal 的响应 —— **七月 AI 项目的安全攻防同步进入主战场**。

---

## Top 1-10 详深挖

### 1. JustVugg/colibri · ⭐25,924 · C · Apache-2.0

[justvugg.github.io/colibri](https://github.com/JustVugg/colibri) · 创建 2026-07-01 · size 12.6 MB · 107 open issues

**一句话**:**纯 C / 零引擎依赖的 MoE 推理引擎,消费级硬件跑 744B 到 2.8T 模型**。

**核心定位**。colibrì(意大利语"蜂鸟")的项目定位非常清晰:**"tiny engine, immense model"** —— 把"小引擎、巨大模型"做成口号,直接对位 llama.cpp 的 C++ 大块头。README 第一屏就把差异化写明白:

> Run **前沿 MoE 模型 —— 744B 到 2.8T 参数** —— 跑在消费级和异构硬件上,**纯 C、零引擎依赖**,核心思路是把 SSD / RAM / VRAM 视为统一的推理层级(AI 内存多层化)。

模型支持列表分两段:消费级友好的 GLM-5.2(744B)、Kimi K3(2.8T)、DeepSeek V4 Flash(284B)、Qwen3.6(35B-A3B)全跑同一个 CLI 入口;研究侧 OLMoE(7B)和 Inkling(975B)作为开放研究底座。CLI 三个动作覆盖 90% 场景:`coli chat` 交互式对话、`coli serve` 起 HTTP server、`coli web` 直接给个网页对话界面。

**架构差异**。三个关键设计让它跟 llama.cpp / vLLM / SGLang 区分开:

- **纯 C / 零引擎依赖**:不依赖 BLAS、不依赖 CUDA、不依赖任何大型 ML 框架。整个引擎就是几个 `.c` 文件 + 一个统一的 inference loop。带来的代价是性能不会超过经过多年优化的 vLLM,但换来的是 **"消费级硬件 + 任何操作系统 + 完全可控的内存层级"** 的极简部署。
- **AI memory multitiering**(AI 内存多层化):把 SSD / RAM / VRAM 视为一个统一层级,专家权重按需从 SSD 流式落到 RAM、再载入 VRAM,典型场景是 2.8T Kimi K3 在 64GB RAM + 24GB 显存机器上能跑起来。
- **一个模型一个 C 文件**:`one C file each` 是 README 里点名的设计哲学 —— 每加一个新模型支持,就新增一个文件,不污染主引擎。这点跟 llama.cpp 的"一个 ggml 后端吃所有模型"路线相反。

**Issue 与社区反馈**。Discussions 已经有 4 个分区:Announcements / Show and tell / Ideas / Q&A,作者亲自维护。Issues 区看到一条来自用户 @bigmarketgroup 的关键 bug 报告(2 评论):

> [Bug]: `coli tune` 在所有非 GLM 引擎上都不可用 — 同类引擎没有实现微调入口...

这条暴露了 colibri 的真实工程进度:**GLM-5.2 是主路径**,其他模型接入还没全,`coli tune` 这个微调入口只对 GLM 引擎家族可用。其他模型用户碰到 bug 时只能绕开 tune,直接用 chat / serve 入口。这是早期项目的典型形态 —— 主线跑通,周边功能待补。

Discussion 里 @JustVugg 主动开了"Open problems — the measured frontier (pick one) 🧭"主题贴,把可优化的工程问题列出来悬赏,典型包含 cold→warm 推理曲线、专家路由策略、KV cache 压缩等 —— 这是研究平台型的开源项目做法,而不是消费工具的做法,值得学习。

**横向对比**。

- vs **llama.cpp**:colibri 更小、更窄(只追 MoE 大模型)、更"研究友好",但生产可用度还远不及 llama.cpp(后者有完整量化 / Vulkan / Metal / CUDA 后端)。
- vs **vLLM**:完全不在一个赛道。vLLM 是数据中心 GPU 集群的高吞吐服务引擎,colibri 是个人开发者机器上的极致本地化推理。
- vs **KTransformers**:思路最近,KTransformers 也在做"消费级硬件跑 MoE 大模型",但走 C++/Python 路线,跟 colibri 的纯 C 形成路线分化。

**信号判断**。

- ✅ 实战验证:107 open issues 是真实使用反馈密度,Discussion 区已有 14+ 评论的 benchmark 共享贴。
- ✅ 增长信号:30 天 25924⭐ 在纯 C / 系统编程类项目里极罕见,意味着社区关注度极高。
- ⚠️ 研究诚信:README 强调是"open research platform",不是消费产品,使用前需要调通。
- ⚠️ 兼容性:`coli tune` 在非 GLM 引擎上不可用,需要等后续版本。
- ✅ 安全:Apache-2.0,纯 C 实现的攻击面比 Python/C++ 框架小,但当前缺少外部安全审计。

**适用场景**:**适合**:想在消费级硬件(24GB 显存 + 64GB RAM)上本地跑前沿 MoE 大模型的研究者与极客;想理解"内存层级 + 专家路由"的研究平台;想给独立项目加一个可本地推理的 LLM 后端的开发者。**不适合**:生产环境 API 服务(用 vLLM / SGLang);严格延迟要求的对话系统(纯 C 实现未做 speculative decoding);非 MoE 模型(架构假设就是 MoE)。

---

### 2. xai-org/grok-build · ⭐25,916 · Rust · Apache-2.0

[xai-org/grok-build](https://github.com/xai-org/grok-build) · 创建 2026-07-14 · size 36.6 MB · 0 issues · Discussions 已关

**一句话**:**xAI 内部编码 agent harness(`grok` CLI / TUI)的官方开源版本,Rust 写,直接对位 Claude Code / Codex CLI**。

**核心定位**。README 开篇就把产品定位写死了:

> **Grok Build** 是 SpaceXAI 的终端 AI 编码 agent。跑成全屏 TUI,能读懂你的代码库、编辑文件、执行 shell 命令、搜索网页、管理长跑任务 —— 可以交互式用,可以在脚本 / CI 里无头跑,也可以通过 Agent Client Protocol (ACP) 嵌入编辑器。

四种用法覆盖了 Claude Code 的全部能力面:**交互式 TUI** / **无头脚本 / CI 集成** / **编辑器嵌入式(走 ACP 协议)**。最末一句暗示了 **xAI 押注 ACP 作为 agent 与编辑器对话的协议**,跟 Anthropic 的 MCP(Model Context Protocol)做工具调用协议形成路线分化 —— 两边都想抢"agent 时代的协议层"。

仓库底部有一个细节需要单独说:`SOURCE_REV` 文件记录 monorepo 的完整 commit SHA,意味着 **这个仓库是周期性从 SpaceXAI 内部 monorepo 同步出来的**,不是主线开发仓库。这跟 `OpenAI/codex` 的开发节奏类似 —— 大厂把公开仓库当作"对外可见窗口",内部 monorepo 仍是开发主战场。

**架构差异**。Rust 选型本身是一个信号:Claude Code / Codex CLI 用 TypeScript + Node.js 居多,Gemini CLI 也是 TS,但 **xAI 直接用 Rust 从头写**,意味着他们愿意接受"开发速度更慢"换取"运行时性能与单二进制分发"。这对终端编码 agent 这种"需要长跑、长上下文、大文件树扫描"的场景特别合适。

ACP(Agent Client Protocol)的支持是另一个差异化点 —— Claude Code 现在主要靠 MCP server 跟编辑器/IDE 集成,Grok Build 选择走 ACP 路线,意味着未来 xAI 的 IDE 合作伙伴可以原生集成 Grok Build 而不是套壳。

**Issue 与社区反馈**。0 open issues + Discussions 已关 = 完全闭源运营节奏。这在大厂官方仓库里常见:**自家仓库不接社区 issue**,用户反馈走 Discord / 官网。但 README 主动写了 Contributing 章节,说明外部贡献通道仍然开放,只是流程由 xAI 控制。

**横向对比**。

- vs **Anthropic Claude Code**(TS):Grok Build 走 Rust + ACP,Claude Code 走 TS + MCP,两者是"协议层之争"。
- vs **OpenAI Codex CLI**(TS/Python):Codex CLI 用 PTY + Node,体验更轻;Grok Build 直接做 fullscreen TUI,体验更重。
- vs **Gemini CLI**(TS):Gemini CLI 主打 Google Cloud / Vertex 集成,Grok Build 走 X / xAI 生态。

**信号判断**。

- ✅ 实战验证:36.6 MB 仓库 + Apache-2.0 + Rust 单二进制 = 真能跑,不是 demo。
- ⚠️ 安全 / 闭源节奏:Discussions 已关 + 0 open issues = 用户问题反馈通道被压扁,真实生产稳定性需要等大厂公开案例。
- ✅ 增长信号:30 天 25916⭐ 与 colibri 几乎打平,说明社区对"xAI 自己的 Claude Code 替代品"非常饥渴。
- ⚠️ 兼容性:ACP 是新协议,目前 IDE 生态尚未跟上;短期只能 terminal / CI 用。

**适用场景**:**适合**:已经在 X / xAI 生态内的开发者(用 Grok API);需要 Rust 二进制 + 长跑场景的 CI 集成;想对比 ACP vs MCP 协议层差异的 agent 工具作者。**不适合**:没用过 xAI API 的纯 OpenAI / Anthropic 用户;需要 IDE 原生集成的非 Vim 用户(ACP 生态未成熟);想要快速试错的轻量 CLI(走 fullscreen TUI 偏重)。

---

### 3. andrewyng/openworker · ⭐14,952 · Python · MIT

[andrewyng/openworker](https://github.com/andrewyng/openworker) · 创建 2026-07-20 · size 4.1 MB · 443 open issues

**一句话**:**桌面端开源 AI 同事,跑在你的机器上,自带 BYOK + Ollama 全本地选项**。

**核心定位**。README 第一句话直击痛点:

> 一个跑在桌面上的开源 AI 同事,核心卖点是交付**完成的活儿,不是聊天**:一份精致的文档、一条带数字的 Slack 回复、一个更新过的日程、一份分类好的收件箱。

**finished work, not just chat** 是关键差异点 —— 跟 Manus / Devin 这类"agent 替代人做整段工作"的产品形态走同一路线,但走 **个人桌面端 + 自托管**。

下载页直接给 macOS(Apple Silicon)+ Windows 10/11(x64),签名 + 公证 + 自动更新 —— 真在做桌面产品,不是 GitHub 玩具。

**BYOK + Ollama 全本地**。README 写得很直接:

> 跑在你的机器上,不绑定任何模型:自带 OpenAI / Anthropic / Google 的 API key,或用开源权重模型走 Ollama 全本地。数据出机器只通过**你主动选择**的模型和集成。

"数据出机器只通过你选的模型 + 集成"这一句针对的是企业合规场景 —— 桌面 AI 工具最大的卖点就是"数据不外发"。

**Issue 与社区反馈**。443 个 open issues 数字惊人,但 OpenWorker 处于 **open beta**(README 自己标了),issues 多 = 用户多 + 反馈通道开放。这一点跟 colibri 的 107 issues(小而精)形成对比 —— openworker 是消费产品,colibri 是研究平台。

Issues 区看到一条高优先级安全报告(@ns-rajats):

> [安全]: MCP OAuth 流程存在 SSRF —— discovery / registration / token 端点来自远程服务器时未做严格白名单校验。

这条直接揭示了 MCP 生态在 OAuth 集成上的系统性问题 —— MCP server 接 OAuth 时,discovery / registration / token endpoint 都是远程 URL,如果没做严格白名单,会被恶意 MCP server 利用发起 SSRF 攻击。**OpenAI Codex / Anthropic Claude / 各种 harness 都在集成 MCP,这意味着 MCP OAuth 的 SSRF 风险是跨厂商共性**。

**横向对比**。

- vs **Anthropic Cowork**:Cowork 是 Anthropic 商业产品,OpenWorker 是开源 BYOK 自托管替代。两者路线分化,但 Cowork 走 ChatGPT 桌面集成的"Claude in 客户端"形态。
- vs **OpenAI Desktop / ChatGPT Desktop**:ChatGPT Desktop 是闭源 + 绑定 GPT 系列模型,OpenWorker 是开源 + 任意模型。
- vs **Manus / Devin**:Manus / Devin 是云端 agent,OpenWorker 是桌面端,定位差一档 —— OpenWorker 适合个人日常任务,Manus / Devin 适合长任务 / 多步骤研究。

**信号判断**。

- ✅ 实战验证:14,952⭐ + 桌面端下载页 + 自更新 = 真在用,不是 demo。
- ⚠️ 安全:MCP OAuth SSRF 已被用户报告,需要等 patch。
- ⚠️ 兼容性:macOS + Windows 双平台,但 Linux 桌面无下载 —— Linux 用户只能从源码 build。
- ✅ 增长:30 天 14952⭐,产品形态被市场接受。

**适用场景**:**适合**:需要桌面 AI 工具 + 数据隐私优先的个人/小团队;想用 BYOK 跨厂商模型(OpenAI / Anthropic / Google / Ollama 全打通);对 MCP 工具集成有需求的工作流。**不适合**:需要企业级 SLA + 7x24 支持的生产环境(走商业 Cowork);Linux 桌面用户(只支持 macOS / Windows)。

---

### 4. yc-software/qm · ⭐14,092 · TypeScript · MIT

[yc-software/qm](https://github.com/yc-software/qm) · 创建 2026-07-29 · size 7.8 MB · 305 open issues

**一句话**:**为初创公司团队设计的多玩家 agent harness,Slack + Web 双端,每个员工独立沙箱**。

**核心定位**。README 一上来就把"为什么是 QM 而不是 Claude Code / Codex"讲清楚:

> 大多数 agent 都被设计成个人助手形态。给一家公司用也能跑,但很快会复杂化。QM 为初创公司设计:每个员工有自己隔离的工作区,互不影响;同时可以在 Slack channels、群聊和项目里与 agent 协作。

**关键差异**:**企业版"个人助手型 agent"扩展痛点**。Claude Code / Codex CLI 给个人用没问题,但公司里几十个员工 + Slack 频道 + 共享项目时,每个员工的 agent 跑同一个工作区会互相覆盖。QM 的解法是**每个人 + 每个房间一个隔离沙箱**(独立 memory / files / keychain / permissions / crons / web apps),员工之间通过 Slack channels 和 projects 协作。

**技术栈中性**。README 主动写了:

> 骨子里就走开源路线。harness 和模型都自己选,随时切换 —— Pi、OpenCode、Codex、Claude Code 都跑同一个核心,所以部署不会被任何单一厂商绑定。

这点跟 LangChain / LlamaIndex 这类"agent 编排框架"思路接近 —— **不绑模型,不绑 harness,只做协作编排层**。YC Software 是 YC 系孵化项目,这种"框架层"定位很 YC 风格。

**Issue 与社区反馈**。Discussions 区看到一个有意思的讨论(@vynjo):**"Meteoric growth"** —— 直译"流星式增长",这跟 14092⭐ 的事实匹配。另一个用户 @ianTPE 在"Show and tell"分区分享了项目命名习惯。还有中文用户 @haha78911 提了"能否支持自定义 API 和 baseurl?" —— 印证 QM 早期用户里有大量中文开发者,跟中文 AI 生态的早期布局吻合。

Issues 区有 @ilkerkaanipcioglu 报告:

> docker target:portal 在 auth service 启用时拒绝启动 —— CLI 启动窗口卡住...

意味着 QM 的部署链路(auth service + portal)有早期集成 bug,需要在自部署前手工绕开。这是企业产品的典型痛点:开源但部署链不完善。

**横向对比**。

- vs **Slack GPT / Slack AI**:Slack AI 是商业产品,QM 是开源自托管替代。
- vs **Cowork / OpenWorker**:这两个是"个人桌面 agent",QM 是"团队 agent",形态不同。
- vs **LangChain Multi-Agent / CrewAI**:这两个是框架级,QM 是产品级(含 Slack + Web + 部署)。

**信号判断**。

- ✅ 实战验证:14092⭐ + YC 系 + Slack/Web 双端 = 真在用。
- ⚠️ 兼容性:305 open issues + auth service 部署链路待修 = 早期产品,部署需要踩坑。
- ✅ 增长:30 天 14092⭐,企业级 agent harness 需求验证。
- ✅ 研究诚信:开源 + 多厂商 harness 支持 + 不绑模型。

**适用场景**:**适合**:5-50 人规模的初创公司想给全员配 AI 助手且不愿被 Claude Code / Codex 单厂商绑定;已经用 Slack 作为主协作工具的团队;需要按人/按项目隔离 agent 工作区的合规场景。**不适合**:个人开发者(用 Claude Code / Codex 更直接);100+ 人企业(需要企业级 SSO / RBAC);需要极简部署的个人用户(部署链路有早期 bug)。

---

### 5. Fei-Away/Codex-Dream-Skin · ⭐14,050 · JavaScript · MIT

[Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) · 创建 2026-07-15 · size 30.0 MB · 54 open issues

**一句话**:**给 OpenAI Codex 桌面端换主题的本地注入工具,不动 .app / app.asar,本机 CDP 注入**。

**核心定位**。README 标题直接中文:

> 给 Codex 桌面端换一张会呼吸的脸。外部主题 / 换肤工具 · 本机 CDP 注入 · 不改官方安装包

这是 **Codex 桌面端主题生态的第一个爆款**。14,050⭐ 在"换肤工具"这个窄赛道上极不寻常,说明 Codex 桌面端用户群已经大到可以撑起独立主题生态。

技术路径很清晰:**本机 CDP(Chrome DevTools Protocol)注入**,不修改 `.app` / `app.asar` / WindowsApps。这意味着 OpenAI 升级 Codex 时不会被覆盖,主题不破坏原签名 / 公证。这跟 macOS 上一些 hack 工具(如 BetterTouchTool)用 Accessibility API / IPC 注入的思路类似。

**赞助机制**。README 顶部放了独家赞助商 Passion8 的横幅(满血 AI 中转服务,1$ = 1¥),说明这个项目有真实商业价值 —— 不是纯个人玩具。

**Issue 与社区反馈**。Issues 区有几条典型 bug:

- @GreenLv:[Bug][Windows] 一键 gallery 标记了 macOS-only 主题为兼容,然后失败。
- @GreenLv:[Bug][macOS] v1.5.14 在 ChatGPT 26.814 上间歇性注入失败被拒。
- @QingYe-05:[Bug] Windows Codex 26.814 composer 映射 + 底部渐变绕过 Safe C(1 评论)。
- @WZRforcontrol:[Bug] Windows GUI 顶部和底部颜色不一致。

这四条 bug 揭示了一个系统性问题:**Codex 桌面端本身在不同 OS / 不同 ChatGPT / Codex 版本之间 DOM 结构差异大**,主题作者要跟着版本快速适配。这种"小工具绑定大厂客户端"的维护成本,是 OpenAI 一旦改 DOM 结构就会全面爆雷的典型形态。

**横向对比**。

- vs **BetterDiscord / Vesktop 主题**:Discord 主题生态走的是 mod 客户端路线;Codex Dream Skin 走 CDP 注入路线,**不修改官方安装包**是关键差异化。
- vs **ChatGPT 主题浏览器扩展**:浏览器扩展改不了 Electron 桌面端内部 DOM,这条路线走不通。

**信号判断**。

- ✅ 实战验证:14050⭐ + 主题库 dreamskin.cc 已上线 + Studio 在线主题生成工具 = 真生态。
- ⚠️ 兼容性:跟 Codex / ChatGPT 版本强绑定,每次大厂发版都可能爆雷。
- ⚠️ 安全:CDP 注入意味着本地端口暴露,需要用户自己确保 127.0.0.1 端口不被外网扫到。

**适用场景**:**适合**:重度 Codex / ChatGPT 桌面端用户,想自定义主题氛围感;愿意接受"每次大厂发版可能短暂失效"的换肤玩家;需要本地视觉工作流的开发者。**不适合**:只用网页版 ChatGPT 的用户;不愿意装第三方工具的企业合规场景;期待"装一次永久稳定"的传统软件用户。

---

### 6. img2threejs/img2threejs · ⭐12,936 · Python · Apache-2.0

[img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) · 创建 2026-07-15 · size 25.0 MB · 67 open issues

**一句话**:**把参考图重建成"代码化 / 程序化 / 质量门控 / 可动画"的 Three.js 模型,而非网格提取或 photogrammetry**。

**核心定位**。README 一句话就拉开跟同类工具的距离:

> 把参考图中的物体重建为**纯代码、可程序化生成**的 Three.js 模型。带质量门控、可直接做动画、token 高效 —— 是"用代码重建",而不是 photogrammetry、网格提取或下载素材包。

关键差异:

- **不提取网格** —— 不是 TripoSR / Meshy 这类"图片直接生成 .obj / .glb"的工具。
- **不依赖 photogrammetry** —— 不是 Luma AI Genie 这类多视角重建。
- **重建结果是 Three.js 源代码**,不是二进制 3D 文件。

这意味着输出可以直接被改写、被 git diff、被 AI 二次编辑 —— 真正进入 **"3D 内容也是代码"** 的范式。

**Token efficient + Quality gated**。README 强调 token-efficient(避免浪费 token 在不必要的细节)和 quality-gated(只有通过质量门槛的重建结果才输出)。这两个设计目标针对的是 **用 LLM 重建 3D 时的两个最大成本**:token 浪费 + 质量崩坏。

**Issue 与社区反馈**。Issues 区看到两条由同一用户 @truongsontung 报告的安全漏洞:

> [路径穿越风险]: 通过未校验的 `region_id` 在 `material_region_analysis.py` 文件读写中可触发任意路径访问...
> [SSRF]: 未校验的 `index_url` 在 `fetch_cs2_metadata.py` 中允许任意 URL 抓取...

两条都属于典型的"AI 处理 pipeline 缺乏输入校验"漏洞 —— `region_id` 没做路径白名单会被任意路径读写;`index_url` 没做协议 + 域名白名单会被 SSRF 利用。这是 AI 工具最容易忽视的攻击面:**LLM 生成代码 → 直接执行 → 输入校验缺失**。两条 issue 都标了 1 评论,说明作者已经在处理。

**横向对比**。

- vs **TripoSR / Meshy / CSM**:输出 .glb 网格,流程黑盒;img2threejs 输出 Three.js 源码,流程可改。
- vs **Luma Genie / Rodin**:这两个是云端商业产品,img2threejs 是开源 + 本地 Python 脚本。
- vs **Three.js + 手工建模**:img2threejs 把"建模"自动化,Three.js 是渲染底层。

**信号判断**。

- ✅ 实战验证:12936⭐ + 主题分布广(ai-agents / claude-code / threejs / generative / image-to-3d)说明项目在多个子社区被关注。
- ⚠️ 安全:两条 SSRF + 路径穿越 issue 暴露 AI pipeline 输入校验的系统性问题。
- ✅ 增长:30 天 12936⭐,3D + AI 交叉赛道热度高。
- ⚠️ 兼容性:依赖 Claude Code 生态做调用,需要用户在 Claude Code 里集成 skill。

**适用场景**:**适合**:需要快速从参考图生成"代码化 3D 模型"做网页 demo / 游戏原型的开发者;做 AI 生成 3D 内容工作流的研究者;想要 Three.js 源码而非黑盒网格的视觉艺术家。**不适合**:需要生产级 .glb / .fbx 网格的场景(走 TripoSR / Meshy);需要多视角真实感重建的产品级 3D 内容(走 Luma Genie / Rodin);对安全要求严格的生产环境(等 patch 后再上)。

---

### 7. openai/codex-security · ⭐10,097 · TypeScript · Apache-2.0

[openai/codex-security](https://github.com/openai/codex-security) · 创建 2026-07-13 · size 20.2 MB · 178 open issues

**一句话**:**OpenAI 官方安全扫描 CLI + TypeScript SDK,扫 → 验证 → 自动开 PR 修复漏洞**。

**核心定位**。README 第一段直接拉齐产品形态:

> `@openai/codex-security` 是用于**发现、验证、修复代码安全漏洞**的 CLI + TypeScript SDK。

快速上手命令直接展示全工作流:

```bash
npx @openai/codex-security login
npx @openai/codex-security scan .
npx @openai/codex-security scan . --patch
npx @openai/codex-security scan . --patch --patch-severity high --create-pr
npx @openai/codex-security scan . --mode deep --workers 2 --subagents 0 --stop-after-no-new 3
```

`--patch` + `--create-pr` 是最大差异化:**不只是发现漏洞,还自动开 PR 把 patch 应用上去**。这是 OpenAI 7 月把 Codex 从"编码助手"推向"应用安全 agent"的关键一步。

**模型与流程设计**。命令里可以看到 `--model gpt-5.6-terra --effort high`,意思是扫漏洞用专门的 gpt-5.6 安全版本 + 高推理力度。`--scan-prompt-file` / `--post-scan-prompt-file` / `--validation-prompt-file` 三件套允许用户自定义扫描 prompt、扫后处理 prompt、验证 prompt —— 这是 **"把 agent 当作产品,而非调用 API"的工程化设计**。

**Trusted Access for Cyber**。README 提到 "Some cybersecurity requests and protected findings require approval through Trusted Access for Cyber. To apply or check your access, visit chatgpt.com/cyber"。这意味着某些高敏感度的安全扫描 / 受保护的漏洞结果走单独审批通道 —— **OpenAI 在做"安全数据访问的合规门控"**,跟一般模型 API 访问区分开。

**Issue 与社区反馈**。0 个返回的 issue(可能 issues 全关或 API 限流),但 178 open_issues 数字在仓库详情里 —— 说明 issue 实际是有的,只是抓取这次被过滤。Discussions 已关,完全是 OpenAI 官方运营节奏。

**横向对比**。

- vs **Snyk / Dependabot / GitHub Advanced Security**:这些都是"扫描 + 报告"路线,codex-security 是"扫描 + 验证 + 自动 patch + 开 PR"全链路。
- vs **Aider / Cursor 安全 agent**:这两个是编码 agent 内嵌安全检查,codex-security 是独立产品。
- vs **Semgrep / CodeQL**:这两是规则引擎,codex-security 是 LLM agent。

**信号判断**。

- ✅ 实战验证:10097⭐ + npm 包 + SDK + 独立官网 = 真产品。
- ✅ 安全:OpenAI 自家管理,TAC 通道合规设计。
- ✅ 增长:30 天 10097⭐,OpenAI 官方品牌加持。
- ⚠️ 兼容性:需要 Node.js 22.13+ / 24.x / 26.x,Python 3.10+;不兼容老 Node 项目。

**适用场景**:**适合**:已经在用 OpenAI Codex / GPT 系列的企业安全团队;想自动开 PR 修复漏洞的 DevSecOps 流程;对"LLM 扫漏洞"接受度高的小型 SaaS / 开源项目维护者。**不适合**:不能用 OpenAI API 的合规场景;需要规则级精确控制的安全团队(走 Semgrep / CodeQL);个人开发者的本地小项目(过度设计)。

---

### 8. trycompai/crm · ⭐8,825 · TypeScript · MIT

[trycompai/crm](https://github.com/trycompai/crm) · 创建 2026-07-31 · size 9.0 MB · 12 open issues

**一句话**:**为 AI agent 设计的开源 CRM,Agentic-first 形态**。

**核心定位**。README 标题段一句话把"为什么是 agent-first CRM"讲清:

> 大多数 CRM 都是"数据库前面套一个表单"。Comp AI CRM 是为 AI agent 而设计的开源 CRM。

技术栈标识:Bun + Postgres + eve(agent runtime)。`Built with eve` 这个 badge 值得注意 —— eve 是另一个独立 agent runtime 项目,意味着 trycompai/crm 跟 eve 是深度绑定的合作关系。

**Agent tab 形态**。README 截图描述:"The companies list with an account open on its **Agent tab**" —— 每个公司账户有一个 Agent tab,agent 在这个 tab 里自动执行客户管理动作(枚举邮件 / 跟进 / 数据补全)。

**Issue 与社区反馈**。12 open issues 极少,但三条典型 feedback 揭示产品早期状态:

- @puneet1409:Feature request — 服务端强制 owner-based 记录访问控制(企业级 RBAC 需求)。
- @jean-jcrx:Roadmap Idea — 加 CardDAV 接口同步 contacts。
- @jean-jcrx:Enrichment through Vercel — 是否能配置其他 enrichment 提供商?

这三条反馈揭示 **CRM 类开源项目的"被集成"需求** —— 用户希望它能跟 Vercel / CardDAV / 各种 SaaS 集成,这是个人开发者 CRM 的典型形态。

**横向对比**。

- vs **Salesforce / HubSpot**:这两个是商业巨头,comp AI CRM 是开源 + agentic-first 替代。
- vs **Twenty / EspoCRM**:Twenty 走"现代开源 CRM + GraphQL + React"路线,EspoCRM 走 PHP 全栈传统路线;comp AI CRM 走 "agent-first + Bun runtime" 路线。
- vs **Attio / Folk**:这两个是新一代 SaaS CRM,comp AI CRM 是开源替代。

**信号判断**。

- ✅ 实战验证:8825⭐ + trycrm.ai 域名 + 独立 SaaS = 真产品。
- ⚠️ 兼容性:绑定 eve agent runtime,迁移成本高。
- ⚠️ 成熟度:12 open issues 是"早期 + 反馈通道开放"的形态,功能完整度待验证。
- ✅ 增长:30 天 8825⭐,开源 CRM 赛道热度回升。

**适用场景**:**适合**:想自托管开源 CRM + 把客户管理交给 AI agent 的小团队 / 独立创业者;已经用 eve agent runtime 做工作流的开发者;需要 data locality 优先的合规场景。**不适合**:大型销售组织需要 Salesforce 级别 RBAC + 报表;没有工程团队维护自托管 CRM 的小商户;需要跟企业 ERP / 财务系统深度集成的场景。

---

### 9. MoonshotAI/Kimi-K3 · ⭐8,585 · None · NOASSERTION

[MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3) · 创建 2026-07-27 · size 1.4 MB · 26 open issues

**一句话**:**Moonshot AI(月之暗面)发布的 Kimi K3 模型官方仓库,主打"开放前沿智能(Open Frontier Intelligence)"**。

**核心定位**。README 顶部品牌矩阵:Kimi.com + Moonshot.ai + HuggingFace + Twitter + Discord + ModelScope,**全链路官方入口一次性铺好**。HuggingFace 模型仓库 `moonshotai/Kimi-K3` 已落地,意味着模型权重对外可下载。

NOASSERTION 协议说明 Moonshot 没用标准 OSI 协议,实际许可走 Kimi K3 自定义 license(从 badge 看 `License-Kimi_K3`)。

**Issue 与社区反馈**。Issues 区有几个高曝光痛点:

- @ai-insights-cloud:[Critical] Kimi Work 3.0 Orchestrator 在简单任务上 15 分钟烧掉约 $150(0 评论,但 critical 标签说明严重)。
- @xylophone188:[Bug/Service] Coding Plan 配额耗尽由于模型无限循环。
- @leonhexunxu-cmyk:kimi 主要 bug 审计 + 如何提升 Kimi token 效率(2 评论)。
- @Alan-D-Chen:如何在多台 AMD MI308X 服务器上用 vLLM / SGLang 跑 Kimi K3。
- @GrokBuildMJW:用量配额不平衡。
- @Arkovski:[Feature Request] 透明"Auto Max"模式 —— K3 负责规划/验证,K2 负责其他任务。

这六条 issue 揭示 Kimi K3 的真实落地痛点:

1. **token 消耗失控**(orchestrator 烧 $150 / 15 分钟、无限循环耗尽配额)
2. **企业级部署问题**(AMD MI308X 多机部署)
3. **用户对"自动 mode 切换"的强烈需求**(K3 vs K2 路由)

特别是 **@Arkovski 提出的 Auto Max mode** —— 用户希望系统根据任务类型自动在 K3(规划/验证)和 K2(其他)之间路由,这条 feature request 反映 **"模型分层定价 / 分层调用"已经是大模型 API 用户的明确诉求**。

**横向对比**。

- vs **DeepSeek V3.2 / Qwen3 / GLM-5**:同档国产前沿模型,Moonshot 在 K3 这一代继续走"长上下文 + 多模态 + agent 工具调用"路线。
- vs **GPT-5 / Claude 4 / Gemini 2**:闭源商业模型,Kimi K3 开源 + 自托管。
- vs **Kimi K2 周边生态**:K3 主仓 + kimi-k3-in-c(本地推理)+ Turbo-Fieldfare(Apple Silicon)构成完整生态。

**信号判断**。

- ✅ 实战验证:8585⭐ + HF 模型权重 + 官方仓库 = 真发布。
- ⚠️ 兼容性:token 消耗失控 + 多机部署链路待完善 = 生产落地有早期痛点。
- ✅ 增长:30 天 8585⭐,Kimi K3 是 7 月最大国产模型发布。
- ⚠️ 安全 / 合规:NOASSERTION 协议,企业使用前需要法务确认。

**适用场景**:**适合**:想用国产前沿模型 + 接受 NOASSERTION 协议的 AI 应用开发者;已经在用 Kimi API 的企业 + 想升级到 K3 做能力对比;需要多模态 + 长上下文 + agent 工具调用的复合场景。**不适合**:不能接受 NOASSERTION 自定义协议的法务严格场景;需要立即生产落地的关键业务(等 token 消耗 / 配额问题修复);已经在用 DeepSeek / Qwen / GLM 体系且迁移成本高的团队。

---

### 10. unicity-aos/aos-ce · ⭐8,554 · Rust · Apache-2.0

[unicity-aos/aos-ce](https://github.com/unicity-aos/aos-ce) · 创建 2026-07-12 · size 21.3 MB · 30 open issues

**一句话**:**AOS Community Edition,开源 agent 操作系统,`aos` CLI + HTTP API + 21 个内置胶囊(capsule)**。

**核心定位**。README 第一段定位非常产品化:

> AOS Community Edition 是面向 agent 的开源操作系统,给那些想要**可审计、可组合**的 agent 环境的人。

工作区布局极清晰:`crates/` 产品 CLI + HTTP API,`capsules/` 一等公民 production 胶囊,`distros/` 社区发行元数据,`docs/` 产品文档。**Workspace 分层像 Kubernetes operator 风格**,把 agent 操作系统当作云原生基础设施来做。

**安装链路 + Sigstore 签名**。安装命令一行:

```sh
curl --proto '=https' --tlsv1.2 -fsSL https://aos.unicity.ai/install.sh | sh
aos init
```

但更重要的是分发可信链:

> 每个版本发布都附带 checksum、Sigstore bundle、GitHub build-provenance 证明,以及 `runtime-compatibility.toml`(锁定精确的运行时版本与 WIT commit)。机器可读的 runtime-compatibility 与 upgrade / self-heal 两个 gate 都必须为 true 才能发布 tag。后者只有在候选版本能完整保留冻结的 standalone-home 克隆时才放行。

Sigstore + GitHub build provenance + runtime-compatibility 双门 = **用 Kubernetes / supply-chain 级别的安全工程标准做 agent runtime 发布**。这点跟 AOS 的目标定位完全匹配 —— 不是消费工具,是基础设施。

**Issue 与社区反馈**。30 个 open issues 不算多,但有几条技术深度高的:

- @joshuajbouw:`aos mcp serve` 拒绝 AOS host plugin `--workspace` argv(MCP 集成)。
- @jait91:并发上下文压缩可能返回另一个 principal 的响应(并发安全 bug)。
- @joshuajbouw:把 bundled capsules 拆分成独立可发布的 artifacts(架构演进)。

第二条 **"并发上下文压缩可能返回错误 principal 响应"** 是典型的 agent runtime 安全漏洞 —— 多用户并发场景下,session 隔离没做干净会被串号。这种 bug 出现在 agent OS 里影响面巨大。

**横向对比**。

- vs **Kubernetes**(类比):AOS 想做 agent 时代的 Kubernetes —— 把"agent runtime"标准化 + 可插拔 + 可审计。
- vs **Docker / Containerd**(类比):capsules 类似容器镜像,但运行时约束比容器更复杂(WIT 接口 + 模型 + 工具)。
- vs **LangChain / LlamaIndex**(类比):这两个是框架,AOS 是操作系统;框架层调用操作系统 API。

**信号判断**。

- ✅ 实战验证:8554⭐ + Sigstore 签名链 + 完整产品文档 = 真在做基础设施。
- ⚠️ 兼容性:MCP host plugin argv 兼容性问题 + 30 issues = 早期产品,集成要小心。
- ✅ 增长:30 天 8554⭐,agent OS 赛道首发热度。
- ⚠️ 安全:并发上下文压缩 bug 揭示多用户场景的 session 隔离需要硬刚。

**适用场景**:**适合**:做 agent 平台基础设施的工程师;需要可审计 + 可签名 + 可锁版本 runtime 的企业部署场景;对"agent OS"概念感兴趣的 infra 早期采用者。**不适合**:个人日常 agent 任务(用 Claude Code / Codex CLI 更直接);需要立即生产稳定的多用户 SaaS(并发安全问题待修);不想接触 WIT / capsule 概念的纯应用层开发者。

---

## Top 11-50 简评

| # | 仓库 | ⭐ | 语言 | 一句话 |
|---|------|---:|------|--------|
| 11 | [oso95/scroll-world](https://github.com/oso95/scroll-world) | 8,480 | JavaScript | 把任意品牌转成 3D 滚动落地页的 skill,前端视觉营销快速原型 |
| 12 | [MiniMax-AI/MiniMax-H3](https://github.com/MiniMax-AI/MiniMax-H3) | 6,779 | - | MiniMax(Hailuo AI)7 月发布的 MiniMax-H3 模型官方仓库,HuggingFace 全链路落地 |
| 13 | [LiamGvchi/gc-minimal-zine-poster](https://github.com/LiamGvchi/gc-minimal-zine-poster) | 6,563 | - | Codex skill:生成极简 zine 风格编辑海报 prompt + 图像 |
| 14 | [MDX-Tom/gpt-5.6-instruct](https://github.com/MDX-Tom/gpt-5.6-instruct) | 6,344 | Python | 针对 gpt-5.6 系列的 Codex 越狱提示词 + 测试包,中英文文档 |
| 15 | [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) | 6,311 | C | 纯 C99 写 2.78T 参数 Kimi K3 推理,8.24 GB RAM 单 CPU 跑 |
| 16 | [drumih/turbo-fieldfare](https://github.com/drumih/turbo-fieldfare) | 6,269 | Swift | Gemma 4 26B-A4B 在 M 系列 MacBook 上 ~2 GB RAM 推理 |
| 17 | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 6,117 | TypeScript | AI 视频 skill:152 镜头菜谱卡 + 209 motion 预览 + Claude Code / Codex 集成 |
| 18 | [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | 5,779 | Python | 清除 20+ 种 AI slop 写作模式,纯文本去 AI 痕迹工具 |
| 19 | [elder-plinius/T3MP3ST](https://github.com/elder-plinius/T3MP3ST) | 5,646 | TypeScript | 多 agent 攻击性安全 red team 平台,offensive-security meta-harness |
| 20 | [nyblnet/bento](https://github.com/nyblnet/bento) | 4,449 | TypeScript | 一个文件装下的办公套件 SPA,开源 Office 替代 |
| 21 | [NanoNets/Graft](https://github.com/NanoNets/Graft) | 4,327 | TypeScript | 给 Claude Code / Cursor / Codex / Gemini 加 codebase 上下文层,MCP + 知识图谱 |
| 22 | [xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer](https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer) | 4,289 | - | 范冰《增长黑客》框架下的前沿部署工程师入门指南 |
| 23 | [Zeejay0/gathered-scenes-zine-skill](https://github.com/Zeejay0/gathered-scenes-zine-skill) | 4,260 | - | 拾景纸刊,Codex skill:把普通画面蒸馏为纸上作品的视觉语言 |
| 24 | [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | 4,222 | TypeScript | 创意 canvas 组件库,WebGL + HTML 真实组合,React / Vue / Svelte / vanilla |
| 25 | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | 4,184 | Markdown | agent skill 集合,帮开发者构建高质量界面 |
| 26 | [slvDev/esp32-ai](https://github.com/slvDev/esp32-ai) | 4,141 | Python | 28.9M 参数 LLM 在 ESP32-S3 单片机跑,9.88 tokens/s,Per-Layer Embeddings |
| 27 | [truefoundry/trueforge](https://github.com/truefoundry/trueforge) | 3,633 | TypeScript | 开源 agent harness,把 LLM 转成可工作的 agent 的 runtime 层 |
| 28 | [genspark-ai/genoffice](https://github.com/genspark-ai/genoffice) | 3,514 | TypeScript | 免费开源 AI 办公套件,跨 macOS / Windows / Linux,docx / xlsx / pptx 全支持 |
| 29 | [microsoft/skill-recorder](https://github.com/microsoft/skill-recorder) | 3,359 | TypeScript | 录屏 + GitHub Copilot CLI 重建为可重放的 intent + 步骤 |
| 30 | [xuchonglang/investing-for-beginners](https://github.com/xuchonglang/investing-for-beginners) | 3,334 | JavaScript | 小隐寺投资百科:美股、期权、加密货币中文知识框架 |
| 31 | [synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience) | 3,323 | TypeScript | 科研 AI 开源工作布,co-scientist + ml-engineering |
| 32 | [bryanthaboi/gen1recomp](https://github.com/bryanthaboi/gen1recomp) | 3,313 | C | 原生 Lua / LÖVE2D 重制 Gen 1 Pokemon 游戏 |
| 33 | [kvcache-ai/AgentENV](https://github.com/kvcache-ai/AgentENV) | 3,281 | Rust | 分布式 agent 环境运行平台,大规模 agent 训练 / 评测 |
| 34 | [isjiamu/gzh-design-skill](https://github.com/isjiamu/gzh-design-skill) | 3,267 | HTML | Markdown 一键转公众号可粘贴 HTML,6 主题 + 主题生成器 + 双关卡校验 |
| 35 | [mshumer/Claude-of-Duty](https://github.com/mshumer/Claude-of-Duty) | 3,252 | JavaScript | Three.js 写 Call of Duty 级 FPS,一个 prompt 产出 |
| 36 | [kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew) | 3,182 | Python | 跨会话持久化开发工作区,自改进 + 持续运行 |
| 37 | [Tiger3807861189/J-Space-Cognition-Suite-V3.7](https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.7) | 3,018 | Python | 基于 Anthropic J-space 全局工作空间研究的 AI 认知增强 skill |
| 38 | [aipoch/open-science](https://github.com/aipoch/open-science) | 2,958 | TypeScript | 可复现研究的开源 AI 科研工作布,科学 agent + 本地优先 |
| 39 | [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | 2,846 | Python | FlashML 团队 token 效率优化研究开源,有配套 arXiv 论文 |
| 40 | [duolahypercho/codex-router](https://github.com/duolahypercho/codex-router) | 2,787 | JavaScript | Codex 外部模型路由,带 Kimi OAuth/API + DeepSeek + 安全迁移 + 回滚 |
| 41 | [QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins) | 2,757 | HTML | 让任意 agent harness 原生多模态,Qwen 官方 |
| 42 | [yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) | 2,742 | Rust | Codex 桌面端/CLI 可视化管理,Provider 切换 / Skills / MCP / TOML 配置 |
| 43 | [AminBlg/SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) | 2,729 | Python | Agent skill:让 LLM 按 ASD-STE100 简化技术英文写文档 |
| 44 | [lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) | 2,558 | Python | Ryan Lopopolo 的 harness engineering 选集 + 实战手册 + agent 上下文包 |
| 45 | [Jakubantalik/thinking-orbs](https://github.com/Jakubantalik/thinking-orbs) | 2,555 | TypeScript | 点状 thought-orb 加载指示器,9 种类型 + 双尺寸 + 自动深浅主题 |
| 46 | [zerx-lab/FluxDown](https://github.com/zerx-lab/FluxDown) | 2,534 | Rust | Rust 多协议下载管理器,HTTP/FTP/BitTorrent/HLS/DASH,智能多线程加速 |
| 47 | [chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard) | 2,471 | JavaScript | Codex / Claude Code 任务板 skill,DSH 生态插件 |
| 48 | [AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide) | 2,428 | TypeScript | WorkBuddy 实战蓝皮书:教程 + 真实工作流 + Skills + MCP + 多智能体 |
| 49 | [powerycy/goutoujunshi](https://github.com/powerycy/goutoujunshi) | 2,380 | Python | Codex 恋爱军师:先接住情绪再分析关系,内置心理 / 法律 / 多元关系知识库 |
| 50 | [DannyMac180/sol-advisor](https://github.com/DannyMac180/sol-advisor) | 2,309 | Shell | Codex-native 架构师编排,Luna + Terra 双轨 + Sol 强校验 |

---

## 数据方法

**窗口**:`created:2026-07-01..2026-08-01`(UTC,左闭右开),对应"2026 年 7 月整月新创建仓库"。GitHub API 按 UTC 切,CST 用户"7 月自然月"实际包含到 8-31 24:00 UTC 才截止,跨 8 小时边界。

**关键词**:`(ai OR llm OR agent OR mcp OR assistant) in:readme` + `stars:>50` + `archived:false`。5 个 OR 槽位按用户 AI 全谱诉求排序:**ai**(覆盖面最广) → **llm** → **agent** → **mcp**(协议层) → **assistant**(应用形态层)。不限语言、不限 stars 下限之外的额外阈值。

**排序**:按 stars 降序,展示前 50。GitHub Search API 单页上限 100 条,本次只取前 50 足够覆盖。

**样本组成**:窗口内 total_count = 2,144,展示 50 条,中文项目大致占比 10-15%(12 MiniMax-H3 / 22 FDE / 30 投资百科 / 34 公众号排版 / 49 恋爱军师 + Codex-Dream-Skin 等中文 README 项目)。英文项目占绝大多数。

**来源**:GitHub Search API,认证走 `~/.private/gh-trending-token`(PAT,5000/h 上限)。

**Slug 命名**:`github-monthly-2026-07`,跟月榜窗口一致。

**抓取时点**:2026-08-23 UTC 跑(每月 1 号 06:00 CST 跑的 cron 因跨月重置顺延到首次有效跑)。

**踩坑备忘**(本次命中):

- `MoonshotAI/Kimi-K3` 协议是 NOASSERTION,不是标准 OSI license —— 商业使用前需要法务确认。
- `unicity-aos/aos-ce` 有并发上下文压缩串号 bug(@jait91 报告),多用户场景下生产部署前需等 patch。
- `img2threejs` 被 @truongsontung 报告 SSRF + 路径穿越两条 open issue,作者已回应,patch 待跟进。
- `andrewyng/openworker` 被 @ns-rajats 报告 MCP OAuth 流程 SSRF —— MCP 生态跨厂商共性问题。
- `LiamGvchi/gc-minimal-zine-poster` / `Zeejay0/gathered-scenes-zine-skill` 等 zine 类小项目穿插在 Top 50,说明 Codex skill 生态已超出"编码 / DevOps"范畴,延伸到"个人审美 + 视觉表达"领域。

**未做的数据**:

- ❌ GitHub Trending HTML 解析(curl `/trending` 被 GitHub 对无 JS 客户端限流,2026-08-23 实测 0 字节)
- ❌ Reddit 争议话题(.json / .rss 接口对 curl 直连返回空)
- ❌ star history 可视化(star-history.com 限流)
- ❌ HN Algolia 同期话题(本次主动跳过,争议信号走 issues 区)

**已知数据方法局限**:本次只跑过去 30 天窗口,跟 7 月自然月窗口(7-01..8-01 UTC)有 8 小时边界偏移 —— CST 7-31 16:00 之后到 24:00 的 8 小时窗口内创建的仓库会被算到 8 月,不在本次月榜里。下一个 cron 月榜窗口将覆盖这些仓库。