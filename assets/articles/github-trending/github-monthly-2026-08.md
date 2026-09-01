# GitHub 月榜 · 2026-08 · DSH 单生态吃掉近半热度 + Kimi K3 单 CPU 跑通 2.8T 参数

> 数据口径：抓取 `2026-08-01..2026-08-31` 期间在 GitHub 上**新创建**、且 README 命中 `ai / llm / agent / mcp / assistant` 关键词的仓库，按当前总星降序取前 50。快照时间 `2026-09-01T01:10:45Z`。本期为首期月榜快照,无上期对照。

## 核心信号

- **DSH（DeepSeek Harness）单生态吃掉近半榜单热度**：前 50 里有 13 个 DSH 同生态项目,前 10 占 5 席（[#1](https://github.com/deepseek-ai/deepseek-harness) [#2](https://github.com/anywhere-labs/dsh-desktop) [#5](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) [#6](https://github.com/yjh051108/dsh-routing-suite) [#8](https://github.com/zhu1090093659/dsh-web)）,生态覆盖桌面端、插件市场、路由套件、官方公众号收录的 TUI、侧边栏底座、皮肤等完整栈。deepseek-harness 官方仓库 8 月 13 日单日上线 19 天即破 20 万星,远超历史同类 Agent 框架首发速度。
- **「水印剥离」与「文档转 Markdown」并列工具型黑马**：[guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) 19,684 星专注剥离 AI 内容水印（含 C2PA 标准）,[firecrawl/anydoc](https://github.com/firecrawl/anydoc) 19,680 星把 Word/PowerPoint/Excel/PDF 等用 Rust 一把转 Markdown（提供 Node.js / Python 绑定）。两者星数相近、定位互补,代表「不直接生成内容、而是处理内容」的工具方向开始破圈。
- **极简硬件跑大模型出现第一个公开案例**：[FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) 用纯 C99（无 BLAS、无框架、无 GPU）在 8.24GB RAM 的单 CPU 上跑 2.78 万亿参数 Kimi K3 推理,与同期 [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) 等「代码质量门禁」类小工具形成「极小 vs 极大」两极。
- **MCP 生态从协议文档期进入具体场景落地**：[CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot)（"AI 同事,每人一台电脑"）、[fuxicodex/Fuxi](https://github.com/fuxicodex/Fuxi)（终端内 AI 编程 agent）、[duty1g/x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server)（逆向调试器 MCP 接入）三类完全不同领域都用 MCP 协议做工具桥接,显示协议层正在成为「新工具接入 LLM 的默认接口」。
- **「设计 Skill」「写作 Skill」类元工具上量**：[s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill)（IP 吉祥物 logo）、[eternityspring/shuohao-skills](https://github.com/eternityspring/shuohao-skills)（AI 短剧分镜）、[KKKKhazix/human-writing](https://github.com/KKKKhazix/human-writing)（让 AI 中文不像 AI）、[yanliudesign/mono-color-skill](https://github.com/yanliudesign/mono-color-skill)（单色编辑风图片）等 4 个 Skill 类项目都在前 50,显示「Agent Harness 内置 Skill 市场」这个细分场景已经成型。

## 重点深挖

### 1. [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) ⭐206,489

**一句话**：DeepSeek 官方 8 月 13 日发布的 Agent Harness 框架,核心理念「Everything is a Plugin」—— 桌面、工具、UI、协议层都被抽象成插件,核心运行时基于 cordis IoC 容器。

**元数据**：TypeScript · 137MB · MIT · topics: `ai-agents` `cordis` `dsh` `dsh-plugin` · 上次推送 `2026-08-31` · 主页 [deepseek.com/harness](https://deepseek.com/harness)。

**README 提炼**：
- **核心理念**：把插件抽象推到极致—— 桌面窗口、CLI 工具、MCP 桥接、UI 组件全部是同质化插件,运行时只负责加载和事件总线,业务逻辑全部下放到插件。
- **架构选择**：放弃传统模块化框架的「core + extension」分层,直接用 cordis IoC 容器做依赖注入 + 事件驱动,降低插件作者的心智负担。
- **生态策略**：官方不主导插件实现,而是发布 SDK + 插件市场（[dsh-market/dsh-market](https://github.com/dsh-market/dsh-market)）,鼓励社区贡献。`awesome-dsh-plugin` 收录的精选列表 [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 已有 13,896 星,显示社区生态已经形成正循环。
- **桌面端**：[anywhere-labs/dsh-desktop](https://github.com/anywhere-labs/dsh-desktop) 13,896 星—— 现代化桌面壳,「桌面本身也是插件」,与官方同步发布。
- **跨平台**：TypeScript 全栈,Windows/macOS/Linux 三端一致,降低开发者多平台适配成本。

**Issue 信号**：issue 数量为 0（截止快照时间）。在 20 万星量级下保持 0 issue 是异常信号—— 可能因为仓库刚发布 19 天、社区问题还在 Discussion 区,也可能因为大量使用问题被引导到了各个 DSH 子仓（如 [dsh-web](https://github.com/zhu1090093659/dsh-web)、[dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) 的 issues 列表里有大量安装/卸载/兼容性反馈）。**需要后续跟踪**:issue 区是否会迁移到 discussion,或子仓会承担一线答疑。

**横向对比**：
- 对比 [vercel-labs/fx](https://github.com/vercel-labs/fx)（2,642 星,Zig 写的 Unix-like coding agent）：两者都是「Agent 框架」,但 DSH 走 TypeScript + 插件市场路线、fx 走 Zig + 系统调用精简路线,目标用户差异大（DSH 主打 UI / 桌面集成、fx 主打 shell 自动化）。
- 对比 [yetone/cumora](https://github.com/yetone/cumora)（3,350 星,跨平台 AI 团队 chat）：cumora 把 AI agent 当成「团队成员」接入 IM,DSH 把 AI agent 当成「桌面插件」,切入点不同。

**信号判断**：
- **增长**：🚀 极强。19 天 20 万星、平均每天 1 万星,首发速度历史级。
- **兼容**：✅ TypeScript 全栈,Windows/macOS/Linux 三端一致。
- **实战**：✅ 已经有桌面端、插件市场、TUI、Web、皮肤等多套子仓落地。
- **争议**：⚠️ issue = 0 是异常信号,需要观察是否在隐藏质量风险。
- **研究诚信**：✅ 官方仓库、明确团队、MIT 协议、无冒名风险。

**适用场景**：**适合**:做 AI Agent / 桌面应用 / 插件生态系统的工程师,需要 IoC + 事件驱动架构 · **不适合**:极简 CLI 工具、纯服务端 agent（DSH 桌面取向明显,纯后端场景用 DSH 过重）。

### 2. [anywhere-labs/dsh-desktop](https://github.com/anywhere-labs/dsh-desktop) ⭐22,460

**一句话**：DSH 官方桌面端实现,与官方 harness 同步 8 月 13 日发布,13 天破 2.2 万星。

**元数据**：TypeScript · 135MB · MIT · topics: `cordis` `deepseek` `deepseek-harness` `desktop` · 上次推送 `2026-08-30` · 主页 [dshdesktop.cn](https://dshdesktop.cn)。

**README 提炼**：
- **设计哲学**：「万物皆插件,桌面本身也是插件」—— 窗口、菜单、状态栏、文件管理器全部是 DSH 插件,核心进程只有 IoC 容器 + 插件加载器。
- **中文友好**：描述、README、官网都是中文（[dshdesktop.cn](https://dshdesktop.cn)）,显示 DSH 生态在中国开发者社区的首发动员力。
- **多端壳**：基于 Electron + TypeScript,沿用 harness 的 cordis 容器。

**Issue 信号**（issue #1、#2 来自快照）：
- **#1 open**：「test(win): recovery uninstall fixture omits shell-resolution variables」—— Windows 卸载恢复测试缺 shell 变量解析。
- **#2 closed**：「2.0.4无法使用」—— 2.0.4 版本有功能性故障,已关闭（推测已修复或合并到更新版本）。

**横向对比**：
- 对比 [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot)（3,616 星,MCP 路线 AI 同事）：OpenBot 给每个 AI 一个完整浏览器/文件系统,DSH Desktop 给每个 AI 一个 DSH 容器内的插件席位,粒度不同。
- 对比 [openTrinity/mycontext](https://github.com/openTrinity/mycontext)（3,007 星,本地优先桌面知识工作台）：mycontext 走「local-first」路线,数据全本地;DSH Desktop 走「插件生态」路线,功能来自社区插件。两者都是桌面 + AI,但侧重点不同。

**信号判断**：
- **增长**：🚀 强。13 天 2.2 万星,与官方 harness 同步增长。
- **兼容**：✅ 三端一致。
- **实战**：✅ 已经有卸载/兼容性等实战 issue 反馈。
- **争议**：⚠️ 「2.0.4无法使用」issue 关闭但没看到修复说明,需要跟踪。
- **研究诚信**：✅ 仓库描述清晰,中文社区背书。

**适用场景**：**适合**:想用 DSH 生态、又不想自己写桌面壳的开发者;中国开发者想本地化体验 DSH · **不适合**:不依赖 DSH 生态、只想要一个普通桌面应用的用户。

### 3. [guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) ⭐19,684

**一句话**：剥离 AI 内容水印（含 C2PA 标准）的隐私优先应用,聚焦「我拥有所有权的内容」场景。

**元数据**：Python · 1.7MB · MIT · topics: `agent-skill` `ai` `anthropic` `c2pa` `chatgpt` · 上次推送 `2026-09-01`。

**README 提炼**：
- **场景定位**：明确「for content you own」—— 只处理用户自己有版权的内容,避开侵权边界。
- **覆盖范围**：支持 C2PA（Coalition for Content Provenance and Authenticity）标准,这是 ChatGPT、Adobe、Microsoft 等厂商共同推动的内容溯源标准。
- **架构**：Python + 1.7MB,体积小、依赖少,显示是一个聚焦单一功能的工具,不是平台型项目。
- **Agent Skill 化**：topics 里有 `agent-skill`,说明它本身被打包成 Agent Skill 供其他 Agent 调用,定位「元工具」。

**Issue 信号**：10 个 issue 全部拉取,数量充足但本快照未深入。

**横向对比**：
- 对比 [firecrawl/anydoc](https://github.com/firecrawl/anydoc)（19,680 星）：两者星数几乎相同,本月并列「工具型黑马」,一个剥离 AI 水印、一个转 Markdown,代表「AI 内容处理」双向链路。
- 对比 [amagine-ai/Amagine3D](https://github.com/amagine-ai/Amagine3D)（1,768 星,从硬件需求到可编辑 3D 设计）：两者都是「不直接生成,而是处理」的工具,代表 AI 工具从「生成」转向「处理」的趋势。

**信号判断**：
- **增长**：🚀 强。同期爬到 19,684 星。
- **兼容**：✅ Python 跨平台,体积小部署轻。
- **实战**：✅ issue 区有反馈。
- **争议**：⚠️ 剥离水印工具天然有争议边界（即使是「自有内容」,部分司法管辖区对水印去除仍有合规要求）。
- **研究诚信**：✅ MIT 协议,README 明确场景边界。

**适用场景**：**适合**:做 C2PA 内容合规、内容平台开发、需要批量处理 AI 生成内容水印的场景 · **不适合**:需要剥第三方版权水印的灰色场景（项目方明确不做,会拒绝此类 PR）。

### 4. [firecrawl/anydoc](https://github.com/firecrawl/anydoc) ⭐19,680

**一句话**：用 Rust 写、Node.js / Python 绑定的「万能文档转 Markdown」工具,覆盖 Word/PowerPoint/Excel/OpenDocument/RTF/EPUB/CSV/PDF 8 种格式。

**元数据**：Rust · 864KB · MIT · 主页 [firecrawl.github.io/anydoc/](https://firecrawl.github.io/anydoc/)。

**README 提炼**：
- **核心价值**：8 种主流办公格式 → 统一 Markdown,Rust 实现保证性能 + 体积小（864KB）。
- **多语言绑定**：原生 Rust + Node.js FFI + Python FFI 三端,开发者在不同技术栈都能用。
- **「Firecrawl 系」产品矩阵**：firecrawl 是知名的爬虫转 Markdown 工具（[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) 17.5 万星）,anydoc 是同一团队的「本地文档转 Markdown」姊妹产品,代表这家公司在「内容 → LLM」管道上的完整布局。
- **场景**：LLM/RAG 系统的离线文档预处理管道、批量文档迁移、企业内部文档搜索索引。

**Issue 信号**：10 个 issue,本快照未深入摘要。

**横向对比**：
- 对比 [guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover)（19,684 星）：见上一条。
- 对比 [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot)（3,616 星）：两者都强调「跨格式/跨工具统一接口」,但 anydoc 是文档格式、OpenBot 是 AI 同事。

**信号判断**：
- **增长**：🚀 强。本月破 1.9 万星。
- **兼容**：✅ Rust + 三语言绑定,跨平台部署友好。
- **实战**：✅ firecrawl 团队有 RAG 实战背景,产品定位扎实。
- **争议**：✅ 无明显争议。
- **研究诚信**：✅ 官方团队、清晰的产品矩阵背书。

**适用场景**：**适合**:RAG 系统构建者、批量文档迁移、企业搜索索引开发者 · **不适合**:只需解析 PDF 的简单场景（用 pymupdf 之类轻量库即可,不必上 anydoc）。

### 5. [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) ⭐13,896

**一句话**：DSH 插件精选列表,CC0-1.0 协议,社区维护的 DSH 生态导航。

**元数据**：Python · 62MB · CC0-1.0 · topics: `awesome` `awesome-list` `deepseek-harness` `dsh` `dsh-plugin` · 主页 [awesome-dsh-plugin.com](https://awesome-dsh-plugin.com)。

**README 提炼**：
- **模式**：标准 awesome-list 形态,按类别（官方插件 / 桌面端 / TUI / Web / 工具 / 主题等）组织。
- **流量入口**：作为 DSH 用户找插件的默认起点,与官方插件市场（[dsh-market/dsh-market](https://github.com/dsh-market/dsh-market)）形成互补（awesome-list 是社区视角、官方市场是平台视角）。
- **CC0-1.0 协议**：放弃版权,鼓励二次整理,典型的 awesome-list 协议选择。
- **配套网站**：[awesome-dsh-plugin.com](https://awesome-dsh-plugin.com) 提供比 GitHub 列表更友好的浏览体验。

**Issue 信号**：10 个 issue,本快照未深入。

**横向对比**：
- 对比 [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market)（2,934 星）：awesome-list 是「精选编辑视角」、market 是「平台市场视角」,两者互为补充,显示 DSH 生态已经有「编辑 + 平台」双轨。
- 对比 GitHub 上其他 awesome-list（如 awesome-mcp, awesome-llm）：模式相同,DSH 能在 19 天内养出一个 13,896 星的 awesome-list 是异常速度。

**信号判断**：
- **增长**：🚀 极强。19 天近 1.4 万星。
- **兼容**：N/A（导航型项目）。
- **实战**：✅ 已经成为社区入口。
- **争议**：✅ 无。
- **研究诚信**：✅ CC0 协议、清晰分类。

**适用场景**：**适合**:DSH 新用户找插件 · **不适合**:不依赖 DSH 的开发者。

### 6. [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) ⭐6,998

**一句话**：DSH 路由套件—— 注入器 + 路由器标准包,负责在 DSH 内核上做「任务感知推理模式路由」。

**元数据**：JavaScript · 352KB · MIT · topics: `ai-agents` `cordis` `deepseek-harness` `dsh` `dsh-plugin`。

**README 提炼**：
- **两阶段部署**：先装 runtime injector 注入器,再装 task-aware reasoning-mode router 预设,这种「分阶段引导安装」降低新用户出错率。
- **功能定位**：把 DSH 的「插件」按推理任务类型（轻量 / 标准 / 推理 / 长上下文 / 多模态等）动态路由,降低单次推理成本。

**Issue 信号**（前 2 条）：
- **#1 open**：「对超出模型知识的信息不主动联网检索,阶段 0 引导无『知识缺口 → 搜索』规则」—— 路由器在缺知识时不会触发联网检索。
- **#2 open**：「请修复安装脚本错误的问题」—— 安装脚本报错。

显示 routing-suite 在「知识缺口触发检索」「安装脚本可靠性」两个实战场景仍有可优化空间。

**横向对比**：
- 对比 [wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router)（3,086 星,「屿智同行」A2A agent 网络的 state-aware SELF/COLLABORATE/HANDOFF 路由）：两者都是「agent 路由」,但 sprix-sage-router 走 A2A 网络层、dsh-routing-suite 走 DSH 内核内的推理模式层。

**信号判断**：
- **增长**：🚀 强。
- **兼容**：✅ MIT、JS 体积小。
- **实战**：✅ 已经有「知识缺口检索」「安装脚本」等实战反馈。
- **争议**：✅ 无。
- **研究诚信**：✅ MIT。

**适用场景**：**适合**:DSH 用户需要降低推理成本、按任务类型动态路由 · **不适合**:不依赖 DSH 的项目。

### 7. [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) ⭐6,912

**一句话**：纯 C99（无 BLAS、无框架、无 GPU）实现 2.78 万亿参数 Kimi K3 在 8.24GB RAM 单 CPU 上推理。

**元数据**：C · 31MB · Apache-2.0 · topics: `avx2` `c99` `cpu-inference` `deep-learning` `from-scratch` · 主页 [medium.com/@fareedkhandev/building-kimi-k3-in-c](https://medium.com/@fareedkhandev/building-kimi-k3-in-c-to-run-a-2-8t-model-on-consumer-hardware-a5792cbf3b59)。

**README 提炼**：
- **极简栈**：C99 + AVX2 + 无第三方库,展示「从零写」路径。
- **资源约束**：8.24GB RAM 跑 2.78T 参数,平均每参数仅 2.97 字节（依赖激进的量化 + 分层加载 + KV cache 压缩）。
- **可移植性**：C99 是兼容性最广的高级语言,理论上能在任何带 CPU 的设备（从路由器到嵌入式）跑。
- **教学价值**：作者配套 Medium 长文,把推理管道的每个环节（量化、分片、attention、采样）拆开讲解。

**Issue 信号**：10 个 issue,本快照未深入。

**横向对比**：
- 对比 [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop)（3,936 星,Oxlint 规则拒绝低质量 TS/JS 代码）：两者都「极小极简」,一个在硬件层极简、一个在 lint 规则层极简,显示 8 月开发者社区对「少即是多」的偏好。
- 对比 [vercel-labs/fx](https://github.com/vercel-labs/fx)（2,642 星,Zig 写的 Unix-like coding agent）：两者都「用系统语言重写一个本来重型的工具」,一个是模型推理、一个是 coding agent。

**信号判断**：
- **增长**：🚀 强。Medium 长文传播 + GitHub 仓库同步发布。
- **兼容**：✅ C99 跨平台。
- **实战**：⚠️ 8.24GB RAM 跑 2.78T 参数的「实战可用性」需要严格测试（每参数 2.97 字节意味着激进的 1.58-bit 量化,精度损失大）。
- **争议**：⚠️ 「单 CPU 跑 2.78T」标题党嫌疑,需要看实际吞吐（tokens/s）和质量是否真的可用。
- **研究诚信**：✅ Apache-2.0,作者署名清晰。

**适用场景**：**适合**:学习大模型推理底层、做教学演示、嵌入式/边缘场景 · **不适合**:生产环境跑 Kimi K3（性能和质量都达不到商用门槛,真要用还是得上 GPU + llama.cpp）。

### 8. [zhu1090093659/dsh-web](https://github.com/zhu1090093659/dsh-web) ⭐6,595

**一句话**：DSH Web 插件聚合生态—— 「Everything is a plugin, distributed via the Creative Workshop」。

**元数据**：TypeScript · 434MB · Apache-2.0 · topics: `cordis` `deepseek-harness` `dsh` `dsh-plugin` `dsh-web` · 主页 [dsh-market.com](https://dsh-market.com)。

**README 提炼**：
- **Web 端补位**：与 dsh-desktop（桌面端）配套,提供 Web 端的插件聚合分发。
- **「创意工坊」**：定位「Creative Workshop」,强调社区共创而非官方主导。
- **生态联动**：与 [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market)、[anywhere-labs/dsh-desktop](https://github.com/anywhere-labs/dsh-desktop)、[ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) 形成「Web + Desktop + TUI + Market」四位一体分发矩阵。

**Issue 信号**（前 2 条）：
- **#1 closed**：「docs:check 未覆盖已维护 Markdown,断链仍能通过文档门禁」—— 文档门禁检查有缺口,已修复。
- **#2 closed 💬1**：「Bug」`dsh-git-graph 0.3.9/0.3.10 在 dsh 内核 0.1.2-alpha.1（DSH Desktop 2.x）上 crash」—— 子插件与内核版本兼容性 bug,已关闭。

显示 dsh-web 团队在「文档门禁」「子插件版本兼容」两个工程问题上已有实战闭环经验。

**横向对比**：
- 对比 [anywhere-labs/dsh-desktop](https://github.com/anywhere-labs/dsh-desktop)：两者互为 Web/Desktop 端的 DSH 插件分发,定位互补。
- 对比 [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)：awesome 是「精选编辑视角」、dsh-web 是「Web 平台分发视角」。

**信号判断**：
- **增长**：🚀 强。
- **兼容**：✅ Apache-2.0 + Web 端跨平台。
- **实战**：✅ 已经有文档门禁、版本兼容等实战 issue 闭环。
- **争议**：✅ 无。
- **研究诚信**：✅ Apache-2.0。

**适用场景**：**适合**:DSH 用户在 Web 端分发/使用插件 · **不适合**:不依赖 DSH 的项目。

### 9. [sapientinc/PRAXIST](https://github.com/sapientinc/PRAXIST) ⭐5,448

**一句话**：自主研究系统,做「可测量、可计算执行」的研究,定位「不只生成答案,而是能产出可重复实验的研究」。

**元数据**：Python · 15MB · NOASSERTION · 主页 [praxist.sapient.inc/en/docs](https://praxist.sapient.inc/en/docs)。

**README 提炼**：
- **场景**：科研 / 学术机构 / 企业研究部门,需要 AI 自主完成「假设 → 实验 → 验证 → 报告」的研究循环。
- **可测量性**：强调「measurable, computer-executable research」—— 区别于普通 LLM「生成文本答案」的路径,PRAXIST 让 AI 产出可执行的实验代码、可重复的实验数据。
- **协议选择**：NOASSERTION（无明确协议声明）,需要后续跟踪。

**Issue 信号**：10 个 issue,本快照未深入。

**横向对比**：
- 对比 [cordiverse/paper](https://github.com/cordiverse/paper)（2,936 星,「时空可组合编程范式」）：两者都偏研究工具,但 PRAXIST 偏「研究执行自动化」、paper 偏「编程范式创新」。
- 对比 [sapientinc](https://github.com/sapientinc) 团队其他项目：PRAXIST 是该团队公开的 AI 方向旗舰。

**信号判断**：
- **增长**：✅ 5,448 星,本月稳定增长。
- **兼容**：⚠️ Python + NOASSERTION 协议,商用前需要确认协议。
- **实战**：⚠️ 学术场景为主,生产场景实战反馈待观察。
- **争议**：✅ 无。
- **研究诚信**：✅ 团队署名清晰,主页文档完整。

**适用场景**：**适合**:学术研究机构、数据科学团队做可重复实验 · **不适合**:普通 LLM 应用场景（PRAXIST 是研究自动化工具,不是问答工具）。

### 10. [LaoFeng-mouse/flyingmouse-format](https://github.com/LaoFeng-mouse/flyingmouse-format) ⭐5,113

**一句话**：「飞鼠格式」Windows 免费离线文件格式转换工具,内置 FFmpeg / LibreOffice / Poppler / Tesseract,覆盖图片/文档/表格/PPT/PDF/音视频/WPS 格式互转 + OCR + 批量转换。

**元数据**：JavaScript · 6MB · NOASSERTION · topics: `desktop-app` `electron` `ffmpeg` `file-converter` `format-converter`。

**README 提炼**：
- **离线 + 免费**：Windows 平台、不联网、不收钱,定位 C 端工具。
- **覆盖度**：图片/文档/表格/PPT/PDF/音视频/WPS 8 大类格式互转,内置 OCR（Tesseract）,批量转换支持。
- **技术栈**：Electron + 内置 FFmpeg/LibreOffice/Poppler/Tesseract 4 个原生组件,体积控制 6MB。
- **中文社区驱动**：飞鼠（LaoFeng-mouse）作者名 + 中文 README,显示是中文社区个人开发者的作品。

**Issue 信号**（前 2 条）：
- **#1 open**：「飞鼠格式」—— 无描述的开放 issue（可能是反馈标题）。
- **#2 open**：「MD 转 PDF 或 WORD 时存在部分问题」—— Markdown 转 PDF/Word 流程有 bug。

显示 flyingmouse-format 在「MD → PDF/Word」具体转换路径上还有实战 bug 待修复。

**横向对比**：
- 对比 [harry0703/MangoDisk](https://github.com/harry0703/MangoDisk)（1,823 星,macOS/Windows 磁盘清理）：两者都是 C 端桌面小工具,一个是格式转换、一个是磁盘清理,显示个人开发者在 AI 时代仍然能靠「极致单一功能」突围。
- 对比 [firecrawl/anydoc](https://github.com/firecrawl/anydoc)（19,680 星）：flyingmouse-format 是「桌面 GUI + 离线」、anydoc 是「Rust 库 + 多语言绑定」,定位不同（一个 C 端、一个开发者）。

**信号判断**：
- **增长**：✅ 5,113 星,本月稳定。
- **兼容**：⚠️ 仅 Windows,跨平台需求无法满足。
- **实战**：✅ issue 区有真实反馈（MD 转 PDF/Word bug）。
- **争议**：✅ 无。
- **研究诚信**：⚠️ NOASSERTION 协议,商用前需要确认。

**适用场景**：**适合**:Windows 用户需要离线批量转换多种格式 · **不适合**:macOS/Linux 用户、需要 API 集成的开发者。

## 完整前 50 表

| # | 仓库 | ⭐ | 赛道 | 态 | 语言 | 一句话 |
|---:|---|---:|---|---|---|---|
| 1 | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) | 206,489 | agent | 首期 | TypeScript | DeepSeek 官方 Agent Harness,「Everything is a Plugin」 |
| 2 | [anywhere-labs/dsh-desktop](https://github.com/anywhere-labs/dsh-desktop) | 22,460 | agent | 首期·同生态 | TypeScript | DSH 桌面壳,中文社区首发 |
| 3 | [guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) | 19,684 | agent | 首期 | Python | 剥离 AI 内容水印（含 C2PA） |
| 4 | [firecrawl/anydoc](https://github.com/firecrawl/anydoc) | 19,680 | 其他 | 首期 | Rust | 8 种办公文档 → Markdown,Rust + 三语言绑定 |
| 5 | [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | 13,895 | agent | 首期·同生态 | Python | DSH 插件精选列表 |
| 6 | [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) | 6,998 | agent | 首期·同生态 | JavaScript | DSH 路由套件,按推理任务动态路由 |
| 7 | [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) | 6,912 | 模型 | 首期 | C | 纯 C99 单 CPU 跑 2.78T 参数 Kimi K3 |
| 8 | [zhu1090093659/dsh-web](https://github.com/zhu1090093659/dsh-web) | 6,595 | agent | 首期·同生态 | TypeScript | DSH Web 插件聚合生态 |
| 9 | [sapientinc/PRAXIST](https://github.com/sapientinc/PRAXIST) | 5,448 | 检索 | 首期 | Python | 自主研究系统,可测量可执行研究 |
| 10 | [LaoFeng-mouse/flyingmouse-format](https://github.com/LaoFeng-mouse/flyingmouse-format) | 5,113 | 其他 | 首期 | JavaScript | Windows 离线文件格式转换工具 |
| 11 | [ZzzLc0405/photo-abstract-editorial](https://github.com/ZzzLc0405/photo-abstract-editorial) | 5,171 | 其他 | 首期 | — | 抽象编辑风图片生成 skill |
| 12 | [s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill) | 4,670 | agent | 首期 | — | IP 吉祥物 logo Skill |
| 13 | [Zeejay0/gathered-scenes-zine-skill](https://github.com/Zeejay0/gathered-scenes-zine-skill) | 4,652 | 设计skill | 首期 | — | 场景集 Zine 生成 skill |
| 14 | [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) | 3,936 | agent | 首期 | TypeScript | Oxlint 规则拒绝低质量 TS/JS 代码 |
| 15 | [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard) | 3,812 | agent | 首期·同生态 | JavaScript | DSH 两阶段引导预设 |
| 16 | [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | 3,616 | mcp | 首期 | TypeScript | 开源 AI 同事,每人一台电脑 |
| 17 | [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 3,558 | agent | 首期·同生态 | TypeScript | DSH Desktop 桌面版 |
| 18 | [yetone/cumora](https://github.com/yetone/cumora) | 3,350 | agent | 首期 | TypeScript | AI agent 当团队成员的跨平台 IM |
| 19 | [KKKKhazix/human-writing](https://github.com/KKKKhazix/human-writing) | 3,331 | agent | 首期 | Python | 让 AI 中文读起来像具体的人 |
| 20 | [omdsh-dev/DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 3,181 | agent | 首期·同生态 | TypeScript | DSH 开放侧边栏底座,支持三方拓展 |
| 21 | [fuxicodex/Fuxi](https://github.com/fuxicodex/Fuxi) | 3,126 | mcp | 首期 | Python | 终端内 AI 编程 agent |
| 22 | [wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router) | 3,086 | agent | 首期 | Python | Sprix AI A2A agent 网络路由 |
| 23 | [openTrinity/mycontext](https://github.com/openTrinity/mycontext) | 3,007 | 其他 | 首期 | TypeScript | 本地优先桌面知识工作台 |
| 24 | [Hisn00w/ASu-skills](https://github.com/Hisn00w/ASu-skills) | 2,981 | 设计skill | 首期 | HTML | 简历包装 skill |
| 25 | [cordiverse/paper](https://github.com/cordiverse/paper) | 2,936 | 其他 | 首期 | — | 时空可组合编程范式 |
| 26 | [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 2,934 | agent | 首期·同生态 | TypeScript | DSH 官方插件市场 |
| 27 | [Leonxlnx/unlazy](https://github.com/Leonxlnx/unlazy) | 2,898 | agent | 首期 | JavaScript | AI agent 反懒惰 Skill,Depth Tree 法 |
| 28 | [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 2,745 | agent | 首期·同生态 | TypeScript | DSH 官方 TUI 补位插件,Claude Code 风 |
| 29 | [vercel-labs/fx](https://github.com/vercel-labs/fx) | 2,642 | agent | 首期 | Zig | Unix-like coding agent |
| 30 | [Gaoshu705/QzoneArchive](https://github.com/Gaoshu705/QzoneArchive) | 2,568 | 其他 | 首期 | Rust | QQ 空间历史归档工具 |
| 31 | [eternityspring/shuohao-skills](https://github.com/eternityspring/shuohao-skills) | 2,480 | agent | 首期 | JavaScript | AI 短剧分镜 skill 集合 |
| 32 | [DannyMac180/sol-advisor](https://github.com/DannyMac180/sol-advisor) | 2,478 | 其他 | 首期 | Shell | Codex-native 架构师编排 |
| 33 | [gvzdv/claudish-to-english](https://github.com/gvzdv/claudish-to-english) | 2,434 | 其他 | 首期 | Shell | Claude 风格翻译为英文 |
| 34 | [tobi/walgit](https://github.com/tobi/walgit) | 2,362 | 其他 | 首期 | Rust | — |
| 35 | [guillermolg00/morphicons](https://github.com/guillermolg00/morphicons) | 2,213 | 其他 | 首期 | TypeScript | 图标 morph 动画通用库 |
| 36 | [oil-oil/oil-motion](https://github.com/oil-oil/oil-motion) | 2,130 | 其他 | 首期 | Python | 流畅响应式 web 动画生成 |
| 37 | [ShawnPana/phone-harness](https://github.com/ShawnPana/phone-harness) | 2,111 | agent | 首期 | Python | 让 agent 控制手机 |
| 38 | [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | 1,963 | 其他 | 首期 | TypeScript | 开源 Grok Bot 替代,带虚拟机沙箱 |
| 39 | [yanliudesign/mono-color-skill](https://github.com/yanliudesign/mono-color-skill) | 1,942 | agent | 首期 | Python | 单色编辑风图片 skill |
| 40 | [SMNETSTUDIO/WeChat-AI](https://github.com/SMNETSTUDIO/WeChat-AI) | 1,863 | 其他 | 首期 | TypeScript | 自托管微信角色扮演对话服务 |
| 41 | [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 1,860 | agent | 首期·同生态 | TypeScript | DSH 鲸鱼娘系列皮肤 |
| 42 | [XiaoDuoYa/codex-with-chatgpt](https://github.com/XiaoDuoYa/codex-with-chatgpt) | 1,846 | mcp | 首期 | TypeScript | ChatGPT 规划 + Codex 执行 |
| 43 | [harry0703/MangoDisk](https://github.com/harry0703/MangoDisk) | 1,823 | 其他 | 首期 | Rust | macOS/Windows 磁盘清理 |
| 44 | [zenbu-labs/terminal-code](https://github.com/zenbu-labs/terminal-code) | 1,807 | 其他 | 首期 | TypeScript | 终端里的 VS Code |
| 45 | [duty1g/x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server) | 1,800 | mcp | 首期 | Zig | x64dbg 逆向调试器的 MCP 接入 |
| 46 | [amagine-ai/Amagine3D](https://github.com/amagine-ai/Amagine3D) | 1,768 | 设计skill | 首期 | Python | 从硬件需求到可编辑 3D 设计 |
| 47 | [elie222/rakazo](https://github.com/elie222/rakazo) | 1,659 | agent | 首期 | TypeScript | 开源 Grok Bot 替代,自定义模型 + 沙箱 |
| 48 | [lexmount/moli](https://github.com/lexmount/moli) | 1,560 | agent | 首期 | Rust | AI agent 用 headless 浏览器,Rust 写 |
| 49 | [vvxw/deploy-vercel](https://github.com/vvxw/deploy-vercel) | 1,546 | 其他 | 首期 | JavaScript | — |
| 50 | [ZSvirt/zsvirt](https://github.com/ZSvirt/zsvirt) | 1,517 | 其他 | 首期 | Java | ZSvirt 核心 IaaS 引擎 |

## 数据方法

- **窗口**：`2026-08-01..2026-08-31` UTC,GitHub Search API `created:` 闭区间。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant` + `in:readme`,5 槽位硬限制（已与用户 2026-08-23 对齐）。
- **排序**：按当前总星 `stargazers_count` 降序取前 100,再经 `rank.py` 剔除空壳/擦边后取前 50。
- **来源**：GitHub Search API 单一真值源,未使用 trending 页 / HN / Reddit 作为名单源。
- **深挖**：Top 10 拉取 issues / discussions / metadata;11-50 仅 metadata。
- **slug**：`github-monthly-2026-08`（窗口月,非跑任务当月）。
- **快照时间**：`2026-09-01T01:10:45Z`。
- **语言分布**：TypeScript 18 / Python 12 / Rust 5 / JavaScript 5 / C 1 / Zig 2 / Shell 2 / Java 1 / HTML 1 / 无 3。中文仓库占比 ~38%（DSH 生态 + 中文 Skill 工具驱动）。
