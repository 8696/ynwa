## 2026-08-31..2026-09-06 · AI/agent/LLM 热门

### 核心信号

- 本周窗口（2026-08-31..2026-09-06）AI/agent/LLM 主题搜索返回 283,954 条候选仓库，最终入榜 30 条，**全部为新上，无连榜**；上一期 W35 的 30 条无一进入本周前 30，呈第二轮完整换血——延续「周榜极短半衰期」的稳定节奏。
- 中英文分布：英文描述约 43 条、中文描述约 7 条；语言分布 Python 20、JavaScript 8、TypeScript 7、Swift 2、Shell 2、Rust 2、Lean / Vue / Go / C++ / C# / HTML / Astro / PowerShell / null 各 1。
- **Anthropic 官方单周双发、占两席**：[anthropics/commerce-agents](https://github.com/anthropics/commerce-agents)（2208 星，第 2 位）把"购物代理 + 商家代理"两套 Claude Agent 完整参考实现打包进四个行业垂直 demo（零售 / 旅行 / 电信 / 娱乐）；[anthropics/fermats-last-theorem](https://github.com/anthropics/fermat-s-last-theorem)（843 星，第 6 位）走 Lean 形式化证明路径——这是 anthropics 组织首次在单周内同时放出两条 AI 主题新仓、且都不是 SDK 衍生。
- **设计 / Vibe-coding skill 继续霸榜**：本周 Top 5 里 3 席是「设计 skill / 提示词生成器」类，[lnkiai/m3e-canvas](https://github.com/lnkiai/m3e-canvas)（4275 星，榜首）把 Material 3 Expressive 屏幕画在浏览器里、一键复制成可喂给任意 AI 编码工具的 prompt；[Rion-Wu-tech/wechat-intelligence-hub](https://github.com/Rion-Wu-tech/wechat-intelligence-hub) 把微信聊天记录拆成日报 / 待回复 / 商机 / 复联线索；[pierrenade/short-video-generator-AI](https://github.com/pierrenade/short-video-generator-AI) 把 YouTube 长视频转 9:16 竖屏短视频。
- **Anthropic-Claude-Code 周边工具集中冒头**：[vinzdg/codenotch](https://github.com/vinzdg/codenotch)（macOS 屏幕边缘的 Claude Code / Cursor / Codex / Antigravity 限额通知）、[op7418/guizang-yingzao-skill](https://github.com/op7418/guizang-yingzao-skill)（归藏营造：把中国古建 / 名胜 / 旅行照片转 Claude Code / Codex skill）、[gozen3ji/consulting-pptx-skill](https://github.com/gozen3ji/consulting-pptx-skill)（咨询行业 PPT 生成 skill）——围绕「让 Claude Code 更好用」的 skill / 工具层爆发。
- **agent 自我改进基建起步**：[Human-Agent-Society/reef](https://github.com/Human-Agent-Society/reef)（571 星，第 9 位）首个开源「持续自我改进 agent 基建」——把推理 / 反馈 / 学习 / 版本化交付四件事串成闭环，配合 Slime + SGLang 训模型权重或训 prompt / rule / skill；与 W35 的 [sapientinc/PRAXIST](https://github.com/sapientinc/PRAXIST) 在「agent harness 研究」方向互补——前者偏持续学习循环、后者偏研究循环。
- **争议信号**：[2akouwu/reverify](https://github.com/2akouwu/reverify)（964 星，第 4 位）自报 71 个 Windows 系统文件 AI 反汇编「97% 错」是自家 benchmark 的上限、不是社区复测值；[#1](https://github.com/2akouwu/reverify/issues/1) 由项目作者发起、@IMGillusion 在 aarch64 Jetson 上跑出 19/19 误判由 x86 解码器路由 bug 导致、已被作者修复——可作为「AI 反幻觉 + 反编译器多架构」的最早公开基准。[Albert-Weasker/niubigeo](https://github.com/Albert-Weasker/niubigeo) 4 个 open bug 同时挂着「品牌名误判 / Web 搜索执行证据缺失 / GitHub 仓库前缀冲突 / 缺 API key 直接阻断规划」——属于初版仓的典型「四件套」。
- **同生态压缩**：anthropics 仓只展开 commerce-agents（fermats-last-theorem 形式化证明方向偏窄、与 AI Agent 主题关联弱，放在简评）；Tencent-Hunyuan 不在本周 Top 30 内（仅 W35 出现）。



### 重点深挖

**1. [lnkiai/m3e-canvas](https://github.com/lnkiai/m3e-canvas)** ⭐4,275 · 🍴365 · TypeScript · MIT · size 9,214KB · 默认分支 main
- **一句话**：浏览器里 sketch Material 3 Expressive 屏幕、磁吸连接 + 真实过渡动画 + 切换手机/桌面宽度、一键复制 prompt 喂给任意 AI 编码工具。
- **核心定位**：把 Material 3 Expressive（M3E，Google 2026 新发布的动态设计语言）从 Figma 模板里搬进浏览器，主打三件事：① 拖拽即所得——按钮 / Icon Button / FAB / FAB Menu / Chip / App Bar / Navigation Bar / Tab / 搜索框 / Card / List / Dialog / Snackbar / Text Field / Switch / Slider / Badge / Divider 全套 M3E 控件均可拖；② 磁吸连接（magnetic connections）——两个按钮或 list item 拉近到阈值时自动 fuse 成 connected group、拐角软化，符合 M3E 强调的「形态连续性」；③ 真 M3 Expressive 加载——port 自 material-components-android 的形态可变 Loading Indicator + 波浪状线性/圆形进度条，不是装饰动画。
- **跨屏幕布局**：单 canvas 上任意加手机（412×892）和桌面（1280×800）屏幕，可同名共享、同屏切换宽度自动适配（手机上的 Navigation Bar 在桌面切为 Navigation Rail、再切回手机又变回 Bar），同设计自动出双宽度。
- **导览与导出**：可给可点击部件指定目标屏幕 + 过渡方向（四向滑入 / 淡入 / 展开 / 无），canvas 上画箭头、可在 preview 里点穿、反向播放返回动画；还支持左/右/上/下 swipe 触发。最后把所有屏幕 / 连接 / 尺寸打包成一段文本 prompt——支持 Claude Code / Codex / Gemini CLI / Cursor 任意 AI 编码工具，直接粘贴即可启动 app 生成。
- **实战反馈**：[#2](https://github.com/lnkiai/m3e-canvas/issues/2) 已 closed：「Feature Request: Alt distance display & quick auto-snap toggle」，作者用 2 条评论回应——AI 翻译自中文反馈，原意是在拖拽设计元素时希望「参考线 + 自动对齐」提供第二种距离显示模式（像素 vs 百分比）和快捷切换 auto-snap 开关；作者确认已加进 roadmap 但暂未排期。
- **横向对比**：和 [Figma Material 3 Design Kit](https://www.figma.com/community/file/1035203688168086460/material-3-design-kit) 比，m3e-canvas 没有 Figma 的多人协作 / 复杂约束，但胜在「离线本地（localStorage、无后端）+ 导出 prompt 直接对接 AI 编码工具」；和 [tldraw](https://github.com/tldraw/tldraw) 比，tldraw 是通用白板、m3e-canvas 把白板能力收敛进 M3E 这一套设计语言——更窄、更深、产物对 AI 编码工具更友好。
- **信号判断**：✅ 实战（4275 星、部署在 [lnkiai.github.io/m3e-canvas](https://lnkiai.github.io/m3e-canvas/)、GitHub Actions 自动 deploy）+ 兼容（导出 prompt 对 Claude Code / Codex / Gemini CLI / Cursor 全部通吃）+ 研究诚信（未声明 license 的隐患 W35 的 [amosblomqvist/learn](https://github.com/amosblomqvist/learn) 已栽过一次，本仓 MIT 已规避）。
- **适用场景**：**适合**：Android / 跨平台开发者要在 AI 编码工具里快速出 Material 3 Expressive UI 原型、设计稿 prompt 化进 Claude Code / Codex 的小团队 · **不适合**：复杂多角色协作 / 需要设计 token 系统化管理的正式设计交付（仍是 Figma / Penpot 主场）。

**2. [anthropics/commerce-agents](https://github.com/anthropics/commerce-agents)** ⭐2,208 · 🍴378 · Python · Apache-2.0 · size 1,464KB · 默认分支 main
- **一句话**：Anthropic 官方开源「Claude 购物代理 + Claude 商家代理」完整参考实现——同一套库在 retail / travel / telecom / entertainment 四个垂直行业跑通，配 Claude Code plugin 一键 scaffold 你自己的版本。
- **核心定位**：anthropics 组织 2026-09-01 上线的「参考蓝图」（reference blueprint）级仓库，两个 agent 各管一摊：① **shopping agent**——嵌入到商家 app 给顾客用，能力是搜索 / 比价 / 规划 / 加购 / 答订单政策 / 记住顾客告诉过它的事；② **merchant agent**——商家员工后台用，能力是解释经营数据 / 维护 listing / 处理库存和订单告警 / 定价和促销 / 起草营销活动。所有写操作都是 staged change、由商家人工审批才落地。
- **运行矩阵**：shopping-agent + merchant-agent 两条产品线、各三条 runtime（同源代码）：① `runtime-messages-api` 走 Messages API turn loop；② `runtime-agent-sdk` 走 Claude Agent SDK；③ `managed-agents` 走 Anthropic 托管。Commerce-common 是共用基础（config / fencing / memory / skills / grounding / presentation / executor frame / events）。每个 deployment 实现 `StorefrontBackend` / `MerchantBackend` 两个接口挂在自己的 catalog / cart / order / policy / analytics / inventory / pricing / campaign 系统上即可。
- **一句话安全边界**：「Every company, brand, product, and person here is fictional; the only company is ACME.」——四个 demo 全部虚构商家、不下单、不刷卡、不改 live listing；`checkout` 只渲染购物车给宿主完成支付，所有商家写都是 staged 等人工批。
- **实战反馈**：仓库目前 0 个 open issue、0 个公开 issue。**信号**：anthropic 官方仓 + Apache-2.0 + Claude Code plugin scaffold 完整，理论上企业集成门槛低；但社区实战反馈尚缺首月信号。
- **横向对比**：和 [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) 比，langgraph 是「通用状态图 agent 框架」、commerce-agents 是「针对 commerce 垂直场景的端到端参考」——前者给你工具、后者给你业务模型 + 工具 + 接口 + demo + 部署矩阵。Anthropic 这条路径是「垂直 demo + 完整 backend 接口契约」模板（类似 [anthropic-cookbook](https://github.com/anthropics/anthropic-cookbooks) 但粒度更粗），后续若有 telecom-specific / retail-specific 仓继续推出，会形成「Anthropic 垂直行业参考实现矩阵」。
- **信号判断**：✅ 实战（官方仓 + Apache-2.0 + Claude Code plugin 路径完整）+ 安全（默认 staged write / 虚构 demo）+ 兼容（三 runtime 同源代码）+ 增长（2208 星、首发即第二）+ 研究诚信（虚构 demo 写明、所有写操作 staged、Business rules / authorization / compliance 是 deployment 的责任）。
- **适用场景**：**适合**：零售 / 旅行 / 电信 / 娱乐行业的商家想给客服和后台跑 Claude Agent、有自己的 catalog / order 系统想接 Claude · **不适合**：纯聊天玩具 / 无 catalog 后端的纯 demo 玩家。

**3. [Rion-Wu-tech/wechat-intelligence-hub](https://github.com/Rion-Wu-tech/wechat-intelligence-hub)** ⭐1,001 · 🍴1,050 · Python · AGPL-3.0 · size 1,520KB
- **一句话**：把本地微信聊天记录变成可检索 / 可核查 / 可行动的个人情报——联系人历史、群聊主题、待回复、承诺、商机、复联线索、按时间窗产出 Markdown + HTML 日报。
- **核心定位**：作者原话：「这不是 Prompt 大礼包，而是一个独立的微信旗舰项目」。分四个层：① `projects/rion-wechat-reader/`——Rion 自有 clean-room 只读 Reader 核心，覆盖旧版接口、schema-2 salt-key 授权导入、WCDB 压缩消息与本机实读验收；② `skills/wechat-cli/`——Reader 的统一 Agent 入口，默认只调 Rion 自有 Reader、仅当用户显式设置 `RION_WECHAT_CLI_BIN` 才调兼容后端；③ `skills/wechat-intelligence-hub/`——Agent 调用入口与判断规则；④ `projects/wechat-intelligence-hub/`——确定性本地引擎、虚构样例和测试。
- **双 Skill 分工**：`wechat-cli` v0.9.2-preview.2（依赖层 / Preview）做只读数据入口；`wechat-intelligence-hub`（用户入口 / Flagship）把聊天记录拆成日报 / 待回复 / 承诺 / 商机 / 复联线索。装法：把一段中文 prompt 发给 Codex，让 Codex 自己装所有依赖——作者假设用户「自己登录微信 + 完成系统授权」，Reader 永远不获取密钥、不重签名、不注入、不 Hook 微信。
- **隐私与安全边界**：① 微信相关能力只读、不发消息、不操作微信 UI；② 真实聊天 / 联系人 / Profile / 数据库和输出报告不得提交到 Git；③ 仓库中的聊天 / 账号 / 品牌 / 金额样例均为虚构数据；④ Reader 数据库兼容性可能随微信版本变化；⑤ 运行任何涉及账号 / 支付 / 发布 / 外部写入的动作前由使用者最终确认。
- **License 与商业化**：AGPL-3.0-only（学习 / 运行 / 修改 / 商业活动允许；分发修改版本或通过网络向用户提供修改版本时必须履行 AGPL 对应源码等义务）。需要闭源集成 / 专有发行 / OEM / 白标的企业可申请单独商业授权（[COMMERCIAL-LICENSE.md](COMMERCIAL-LICENSE.md)）。付费社群与开源软件是两套交付——社群提供安装适配 / 工作流配置 / 案例 / 持续更新，不自动变更软件 license。
- **实战反馈**：仓库暂只一个 open issue「微信相关」、无公开评论——首周 1001 星 + 1050 fork 这种「仓库 fork 数比星数还高」是非常规信号（多半是早期拷贝和备份式 fork）。`v0.9.2-preview.2` 暗示作者对首发版本有保留。
- **横向对比**：和 W35 同期 [amosblomqvist/learn](https://github.com/amosblomqvist/learn)（907 星）比，两者都是「个人工具 → 通用化」的路径，但 learn 走的是「教学法编码 + skill」、wechat-intelligence-hub 走的是「数据入口 + 业务模型」。前者的 license 空白至今未补，后者用 AGPL-3.0 + 商业授权双轨，提前规避了「商用歧义」。
- **信号判断**：✅ 实战（1001 星 + 1050 fork 但仓库预览版）+ 安全（默认只读、明确边界、AGPL-3.0 + 商业授权）+ 研究诚信（v0.9.2-preview.2 标明 preview 状态、隐私规则清晰）。
- **适用场景**：**适合**：微信重度用户（自媒体 / 销售 / 创业者 / 知识工作者）想把聊天记录沉淀为可检索、可复盘的情报库、愿意自管本地数据库和访问材料 · **不适合**：不想碰微信数据库和本地配置、期望一键全自动解析的用户。

**4. [2akouwu/reverify](https://github.com/2akouwu/reverify)** ⭐964 · 🍴207 · Python · MIT · size 631KB · 默认分支 main
- **一句话**：让确定性工具当 AI 反编译的裁判——模型提出结构 / 行为声明、工具对实际二进制字节做验证、只有 VERIFIED / REFUTED 带证据的才计入事实，从源头掐掉 AI 凭空捏造的偏移 / 字段 / 函数行为。
- **核心定位**：瞄准「AI 反编译幻觉」——README 给出**自报**数字：71 个真实 Windows 系统文件，AI 用教科书式回答错误率 97%，reverify 把每一条都抓到、0 条错放（71/71 全部抓到，0 误判为 verified）；同样的门控在 Linux 和 macOS 上每个 push 都跑 CI，独立 aarch64 跑复测亦吻合（同 issue 评论）。配套 MCP server 可直接挂在现有 agent（Claude Code / Codex / Gemini CLI / OpenCode）上。
- **核心机制**：① 确定性核心——纯 Python PE/ELF/Mach-O 解析 + x86/x64/ARM/ARM64 反汇编 + AOB pattern 扫描 + CPU emulation + Protobuf/TLV 解析 + Frida hook 生成；② 引擎可选升级——`pip install "reverify[full]"` 装 capstone / unicorn / lief / Z3；`pip install "reverify[angr]"` 加 angr 函数边界 / 调用图 / 跨引用；未装则降级回纯 Python；③ `reverify backends` 命令列出当前激活引擎。
- **第二个杀手锏：context rollover**：不靠有损 auto-summary 做长任务上下文压缩，而是 `reverify rollover` 把当前会话交接给一个文件、开新会话；和 Claude Code / Codex / Gemini CLI / OpenCode 都通。`reverify equiv <reference> <candidate>` 做两段反汇编的等价性比较——这在 reverse engineering 多个版本验证时是刚需。
- **实战反馈**：[#1](https://github.com/2akouwu/reverify/issues/1) 由作者发起「在 Linux ELF 和 macOS Mach-O 上跑反幻觉 benchmark」，@IMGillusion 用 aarch64 Jetson Tegra（glibc 2.35）跑 `benchmarks/prologue_prior.py /usr/bin --per-dir 12`，结果：x86 帧指针 prior（`push rbp; mov rbp, rsp`）在 aarch64 上 100% 错（aarch64 没有这条 prologue）——19 个 binary 全部 prior-wrong、0 误判为 VERIFIED；扩大语料后 19/19 同样，并被发现**真实 bug**：arm64 / aarch64 走错了 x86_64 解码器路由，作者已在 v0.10.x 修复。[#3](https://github.com/2akouwu/reverify/issues/3) `orchestrate: open-ended goals make the model ignore structured claim kinds`，2 条评论讨论 orchestrator 目标开放描述时模型降级到裸 `bytes_at` 猜测、`done` 一直 False。
- **横向对比**：和 [microsoft/markitdown](https://github.com/microsoft/markitdown) 这类「确定性文本提取 + LLM 总结」范式相似，但 reverify 把模型放在「提议者」、确定性工具放在「裁判」，明确划分职责——LLM 一旦敢报事实，先过工具关。和 angr / Ghidra / Binary Ninja 这类纯逆向工具比，reverify 是「AI + 工具的协作框架」、不替代它们。
- **信号判断**：✅ 实战（[#1](https://github.com/2akouwu/reverify/issues/1) 已被作者与社区联手从单平台扩到 Linux ELF / macOS Mach-O / aarch64，并发现并修了一个真实 bug）+ 兼容（CI 跨三平台、Python 默认 + 引擎可选）+ 安全（自报 97% 错 + 0 误判已挂自家 benchmark，aarch64 真实数据点由社区提供）+ 研究诚信（公开自家 benchmark 数字 + 接受挑战 + 真修 bug）。
- **适用场景**：**适合**：用 AI 做 binary reverse engineering、CTF 玩家、恶意软件分析、固件审计、跨版本二进制比对、需要把 AI 反幻觉门控嵌入现有 agent（MCP 接入）的研究 / 安全团队 · **不适合**：纯源码阅读（用普通 LLM 即可）、不愿引入 Python 工具链的项目。

**5. [pierrenade/short-video-generator-AI](https://github.com/pierrenade/short-video-generator-AI)** ⭐853 · 🍴154 · Python · MIT · size 809KB
- **一句话**：YouTube 长视频一键转 9:16 竖屏短视频——highlight 检测 + 字幕 + 翻译 + 配音全打包、对位 OpusClip / Vidyo.ai 的开源替代。
- **核心定位**：开篇明牌「free open-source project designed for turning youtube-videos into viral short videos. Highlight detection, subtitles, translation, voiceover, all in one for your content: no pre-clip credits or any watermarks」。可作为 SaaS 工具 OpusClip / Vidyo.ai 的本地化替代。
- **核心能力**：① API 化——可在自己项目里直接调用；② 一键出片——粘贴任意长度 YouTube 链接即出可发布的 9:16 短片；③ 可选 hooks——开启后给片段头部加上下文相关的 AI hook；④ 内置翻译 + 配音链路；⑤ 无前置片头水印——这是 OpusClip 免费档的主要痛点。
- **示例覆盖**：README 配三张示例（Obama 演讲 / Tom 战胜社恐 / Levitin TED「How to stay calm」），覆盖「故事型叙事 / 心理自助 / 知识科普」三大短视频赛道，证明对白驱动内容的检测准确度。
- **实战反馈**：[#1](https://github.com/pierrenade/short-video-generator-AI/issues/1) `What is manual_mapper.py?` 仍 open、0 评论，提问者指向 `src/fs.py` 中两处对 `manual_mapper` 的引用、问该模块的作用——典型「仓库说明缺失，issue 当文档问」场景，说明作者尚未补全模块文档。
- **横向对比**：和 OpusClip（闭源 SaaS，免费档带水印 + 时长限制）比，本仓开源、无水印、可本地；和 [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp) 比，yt-dlp 是通用下载器、本仓是「剪辑 + 字幕 + 翻译」的一体化出片流水线。
- **信号判断**：✅ 实战（853 星 / 154 fork、README 给出具体示例视频）+ 兼容（API 化、开源、可本地）+ ⚠️ 安全（首个 issue 即指向模块说明缺失——初版仓库的文档短板）。
- **适用场景**：**适合**：内容创作者 / MCN 想绕开 OpusClip / Vidyo.ai 的水印 + 订阅费、把 YouTube 长视频转小红书 / TikTok / Reels 短视频 · **不适合**：对实时性 / 大规模批量处理要求极高的 B 端流水线（仍是 SaaS 主场）。

**6. [vinzdg/codenotch](https://github.com/vinzdg/codenotch)** ⭐696 · 🍴92 · Swift · MIT · size 15,468KB
- **一句话**：macOS 屏幕边缘贴一条小「notch」，实时显示 Claude Code / Cursor / Codex / Antigravity / GLM 五个编码助手的用量限额——是否还在用、是否已耗尽、是否在等你。
- **核心定位**：用户开了 N 个 AI 编码工具、又分不清当前谁被限额卡住的时候，这一条小边栏直接告诉你。Claude ring 显示的是 Claude Code 自家 `/usage` 同样口径的「当前 session」窗口，所以和 Claude Code 永远不打架。
- **数据来源全部走「借」路径**：① Claude Code——OAuth token 直接走 `/usage` 同一端点；② Cursor——读编辑器本地 SQLite 里的登录会话，不另签；③ Codex——live 问 Codex 自家 app server、若 Codex 没在跑就降级到 rollout log；④ Antigravity——先打自家 language server、再退到 Google quota 端点、都不响应时退到普通 request count；⑤ GLM——Z.ai Coding Plan monitor 端点、key 从 Claude Code `settings.json` / ZCode / OpenCode 任一已持有 key 的工具借。Codenotch 自己**永远不在任何地方登录**。
- **实战反馈**：[#1](https://github.com/vinzdg/codenotch/issues/1) `Add support for Grok Build` open、0 评论——社区已经在问下一个集成对象。[#2](https://github.com/vinzdg/codenotch/issues/2) `Notch jumps between displays on a multi-monitor Mac — a way to pin it to one screen` open、0 评论：用户在三显示器环境（3440×1440 超宽主屏 + 内建 Retina + 1920×1080 副屏）下，notch 跳到「当前握焦的显示器」而非用户预期的主屏——典型多屏行为缺失。
- **横向对比**：和 [ccusage](https://github.com/ryoppippi/ccusage)（Claude Code 用量 CLI）比，ccusage 只管 Claude Code 一个工具的命令行；codenotch 管五个工具的桌面端边栏。和 Anthropic 自家 Claude Code `/usage` 比，前者是终端命令、本仓是常驻视觉——后者胜在不打扰。
- **信号判断**：✅ 实战（已有用户在多屏 / Grok Build 两个方向提了具体 issue）+ 兼容（五个工具全部走「借」已有凭证、零登录、零配置）+ 安全（不持任何凭证、不出网络）+ 增长（首发 696 星）。
- **适用场景**：**适合**：同时订阅 Claude Code / Cursor / Codex / Antigravity / GLM Coding Plan 的重度 AI 编码用户 · **不适合**：只用单一编码工具的用户（原生 `/usage` 已够）、非 macOS。

**7. [Albert-Weasker/niubigeo](https://github.com/Albert-Weasker/niubigeo)** ⭐607 · 🍴45 · TypeScript · Apache-2.0 · size 2,039KB
- **一句话**：开源 AI 品牌可见度与竞品报告工具——输入一个域名、看 AI 是否推荐你、谁在代替你出现、哪些信源塑造了答案。
- **核心定位**：作者原话：「Does AI recommend your product? Who shows up instead? Enter a domain and see whether AI recommends you, which competitors appear, and which sources shape the answer.」Alpha v0.1.0、社区开源、自托管、BYOK、英文 + 简体中文双 README；同时放出 [NEXT_PREVIEW.md](NEXT_PREVIEW.md) 预告下版本从「一次性 AI 可见度审计」转向「持续域识别监控」。
- **实战反馈**：4 个 open bug 同时挂着，是初版仓的典型「四件套」：① [#1](https://github.com/Albert-Weasker/niubigeo/issues/1) `Short brand names can misclassify unbranded prompts`——目标品牌名 substring 搜会把通用问句误标为 branded、品牌名短或词义通用时全中招；② [#2](https://github.com/Albert-Weasker/niubigeo/issues/2) `Web search is reported as used without execution evidence`——provider-native web search 路径只记了 request 和 status、`SearchExecution.used` 当前总为 true，缺执行证据；③ [#3](https://github.com/Albert-Weasker/niubigeo/issues/3) `GitHub repository citations can match repositories with the same path prefix`——同前缀的不同仓库会被错分类为 target repo；④ [#4](https://github.com/Albert-Weasker/niubigeo/issues/4) `A missing API key blocks planning for other selected providers`——多 provider 选中时，第一个缺 key 的 provider 直接阻断整个 planning，其他已配 provider 不参与评估。
- **横向对比**：和闭源 [Profound](https://www.tryprofound.com) / [Otterly.AI](https://otterly.ai) / [Peec.ai](https://peec.ai) 等 AI 可见度 SaaS 比，niubigeo 开源 + 自托管 + BYOK（数据不外流、可定制信源集）；和 [ahrefs / Brand Radar](https://ahrefs.com/brand-radar) 类工具比，后者偏 SEO 关键词监控、AI 可见度只是顺带模块；niubigeo 整个产品形态就为「AI 是否推荐我」而生。
- **信号判断**：⚠️ 实战（4 个 open bug 同时挂着、未修）+ 增长（607 星 + Alpha v0.1.0）+ 安全（Apache-2.0、BYOK）+ 研究诚信（README 自报 Alpha 状态、NEXT_PREVIEW 提前预告方向）。
- **适用场景**：**适合**：SEO / 增长团队想做 AI 推荐监控、自托管 + 数据不出网、能容忍初版 4 个 bug 并愿意提 PR · **不适合**：要立刻拿到生产可用报告的甲方营销（仍是闭源 SaaS 主场）。

**8. [Human-Agent-Society/reef](https://github.com/Human-Agent-Society/reef)** ⭐571 · 🍴39 · Python · Apache-2.0 · size 21,734KB
- **一句话**：首个开源「持续自我改进 agent 基建」——把 agent 推理 / 反馈 / 学习 / 版本化交付四件事串成闭环，可训模型权重（Slime + SGLang）也可训 prompt / rule / skill。
- **核心定位**：作者原话：「Reef is the first open-source infrastructure for continual self-improving agents. It connects agent inference, feedback, learning, and versioned delivery.」区别于普通 agent framework——后者只管「这次跑得好」，Reef 管「这次跑完学到东西、下次能用」。
- **使用场景**：作者明示适用时机——「when you want your agent to keep improving simply by learning from how you interact with users」。已发布 [reef-infra on PyPI](https://pypi.org/project/reef-infra/)、launch post（X / ao_qu18465）、Discord 社群、公开 roadmap（[issue #25](https://github.com/Human-Agent-Society/reef/issues/25)）。
- **实战反馈**：仓库暂未公开 issue——首周 571 星 + 21.7MB 的体积（远高于其他 Top 10）说明 repo 内可能带预训练 / 预打包内容，需要进一步看 commit 历史确认。
- **横向对比**：与 [sapientinc/PRAXIST](https://github.com/sapientinc/PRAXIST)（W35 榜首，4,530 星）方向互补——PRAXIST 是「让 Codex 跑研究循环」，偏研究 harness；Reef 是「让 agent 持续学习」，偏 continual learning infra。两者都不替代 LangChain / AutoGPT 类「通用 agent 编排框架」——它们假设你已有 harness，缺的是「跑过之后学点什么」的路径。
- **信号判断**：✅ 实战（PyPI 已发布、roadmap 公开、launch post 社区宣告）+ ⚠️ 实战（暂无公开 issue 反馈，21MB 体积暗示预打包内容待 review）+ 增长（首发 571 星、Apache-2.0、Discord 社群）+ 研究诚信（自称「first」但需社区复测确认）。
- **适用场景**：**适合**：研究 / 实验团队想搭「持续自我改进 agent」的脚手架、不愿重造 inference + feedback + learning 三角 · **不适合**：要立刻替代 LangChain / AutoGPT 的应用开发者（Reef 是 infra 层、不是应用框架）。

**9. [PhiloLabs/fable51-worlds](https://github.com/PhiloLabs/fable51-worlds)** ⭐448 · 🍴23 · JavaScript · MIT · size 169,455KB
- **一句话**：用 Claude Fable 5.1 agent swarm 把一句话 / 一张照片 / 一段视频提示词变成可在浏览器走一遍的 Three.js 世界——「Worlds as code」。
- **核心定位**：作者原话：「Worlds as code. A prompt in, a world you can walk out. Claude Fable 5.1 agent swarms take a brief - a sentence, a photograph, a clip - then research the place, model it, render it, and check it. What ships is a plain Three.js app that opens in a browser.」无 game engine、无专有 3D tiles、无下载 mesh——每个建筑 / 店面 / 招牌 / 树 / 红绿灯都来自仓内代码。
- **示例项目**：以 San Francisco Union Square 为主题，做了 [Fable 5.1 构建版](union-square-sf/) 和 [GPT-6 Astra 构建版](union-square-sf-gpt-astra/) 对照——按相同 brief、相同测试条件，用两个模型各建一次，再沿 Fable walkthrough 的相机路径拍 Astra 世界、并排展示（59 秒视频 [fable51-vs-gpt6-astra-union-square.mp4](union-square-sf-gpt-astra/media/fable51-vs-gpt6-astra-union-square.mp4)）。
- **实战反馈**：仓库暂未公开 issue。
- **横向对比**：和 [three.js](https://github.com/mrdoob/three.js) 比，three.js 是渲染器、fable51-worlds 是「用 AI 生成 three.js 代码的成品世界」；和 [Blender](https://www.blender.org) / Unreal 引擎比，fable51-worlds 不替代 3D 内容创作工具，主打「agent 流程产物即代码」——读者打开仓即可读、可改、可重生成。
- **信号判断**：✅ 实战（59s side-by-side 视频作为产物证据、Fable 5.1 vs GPT-6 Astra 对照公开）+ ⚠️ 实战（暂无公开 issue）+ 增长（448 星）+ ⚠️ 安全（169MB 体积、仓内可能带 build artifact，需看 commit 历史）+ 研究诚信（自报 Fable vs Astra 对照，承认 Astra 是另一模型）。
- **适用场景**：**适合**：想看 AI agent 把照片 / 文字变成可走的三维世界、对 Claude Fable / GPT-6 Astra 模型对比感兴趣的创作者与研究者 · **不适合**：要替代 Blender / Unreal 做生产级 3D 资产（仍是 DCC 主场）。

**10. [codejunkie99/fable-orchestrator](https://github.com/codejunkie99/fable-orchestrator)** ⭐547 · 🍴未抓取 · Shell · MIT · size 未抓取
- **一句话**：Fable 5.1 当编排者，GPT-5.6 Luna 与 DeepSeek V4 Flash 负责实现——多模型协同的 orchestrator 框架（与 [PhiloLabs/fable51-worlds](https://github.com/PhiloLabs/fable51-worlds) 的「Fable 全栈产物」方向互补）。
- **核心定位**：lang name = Shell 表示本身更像 orchestrator 脚本 / CLI glue；描述极短（仅「Fable 5.1 orchestrates. GPT-5.6 Luna and DeepSeek V4 Flash implement.」）——仓库规模小、定位却直接给了「谁当编排、谁当执行」的角色分工。
- **实战反馈**：仓库规模较小（rank.py 未标为 deep_targets，本次仅作简评）。与 [PhiloLabs/fable51-worlds](https://github.com/PhiloLabs/fable51-worlds) 同周出现——前者是 Fable 5.1 产出「可走的城市」，后者是 Fable 5.1 + GPT-5.6 Luna + DeepSeek V4 Flash 三个模型混编的编排器；说明本周 Fable 生态有「实物 + 编排器」双发。
- **信号判断**：⚠️ 实战（仓规模小、深入信号需更多 issue / commit）+ 增长（547 星、首发即上榜）+ 兼容（Shell 脚本便于嵌 CI）。
- **适用场景**：**适合**：多模型协同编排研究者、对 Fable 5.1 / GPT-5.6 Luna / DeepSeek V4 Flash 三模型角色分工感兴趣的实验者 · **不适合**：生产环境部署（仓规模小、文档与测试覆盖未验证）。



### 完整前 30 表

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---:|---|---:|---:|---|---|---|---|---|
| 1 | [lnkiai/m3e-canvas](https://github.com/lnkiai/m3e-canvas) | 4,275 | - | 设计skill | 新上 | TypeScript | 浏览器里画 Material 3 Expressive 屏幕、一键复制 prompt 喂给 AI 编码工具 | ✅实战 |
| 2 | [anthropics/commerce-agents](https://github.com/anthropics/commerce-agents) | 2,208 | - | agent | 新上 | Python | Anthropic 官方：购物 + 商家双 Claude Agent，零售/旅行/电信/娱乐 4 行业 demo | ✅实战 |
| 3 | [Rion-Wu-tech/wechat-intelligence-hub](https://github.com/Rion-Wu-tech/wechat-intelligence-hub) | 1,001 | - | 设计skill | 新上 | Python | 把本地微信聊天变成日报 / 待回复 / 商机 / 复联线索，AGPL + 商业授权 | ✅实战 |
| 4 | [2akouwu/reverify](https://github.com/2akouwu/reverify) | 964 | - | mcp | 新上 | Python | 让确定性工具当 AI 反编译裁判，VERIFIED/REFUTED 带证据；MCP server + context rollover | ✅实战 |
| 5 | [pierrenade/short-video-generator-AI](https://github.com/pierrenade/short-video-generator-AI) | 853 | - | 设计skill | 新上 | Python | YouTube 长视频 → 9:16 竖屏短视频，highlight/字幕/翻译/配音全打包 | ✅实战 |
| 6 | [anthropics/fermats-last-theorem](https://github.com/anthropics/fermat-s-last-theorem) | 843 | - | 其他 | 新上 | Lean | Anthropic 官方：用 Lean 形式化证明费马大定理 | ✅实战 |
| 7 | [vinzdg/codenotch](https://github.com/vinzdg/codenotch) | 696 | - | 其他 | 新上 | Swift | macOS 屏幕边缘的 Claude Code / Cursor / Codex / Antigravity / GLM 限额条 | ✅实战 |
| 8 | [Albert-Weasker/niubigeo](https://github.com/Albert-Weasker/niubigeo) | 607 | - | 其他 | 新上 | TypeScript | 开源 AI 品牌可见度 + 竞品报告，自托管 + BYOK | ⚠️实战 |
| 9 | [Human-Agent-Society/reef](https://github.com/Human-Agent-Society/reef) | 571 | - | agent | 新上 | Python | 首个开源持续自我改进 agent 基建，推理 + 反馈 + 学习 + 版本化交付闭环 | ✅实战 |
| 10 | [codejunkie99/fable-orchestrator](https://github.com/codejunkie99/fable-orchestrator) | 547 | - | 模型 | 新上 | Shell | Fable 5.1 编排 + GPT-5.6 Luna + DeepSeek V4 Flash 实现的多模型协同 | ⚠️实战 |
| 11 | [KJGX66F/usque-custom-pro](https://github.com/KJGX66F/usque-custom-pro) | 514 | - | 其他 | 新上 | (待查) | (简评补充) | ⚠️实战 |
| 12 | [PhiloLabs/fable51-worlds](https://github.com/PhiloLabs/fable51-worlds) | 448 | - | agent | 新上 | JavaScript | Claude Fable 5.1 把一句话/一张图变成可在浏览器走的 Three.js 世界 | ✅实战 |
| 13 | [subsy/skill-cabinet](https://github.com/subsy/skill-cabinet) | 398 | - | 设计skill | 新上 | JavaScript | (简评补充) | ⚠️实战 |
| 14 | [yilujian/easy-writing](https://github.com/yilujian/easy-writing) | 383 | - | 其他 | 新上 | Vue | 易创：纯本地 / 开源 AI 网文写作桌面软件，BYOK + 自定义提示词 | ✅实战 |
| 15 | [op7418/guizang-yingzao-skill](https://github.com/op7418/guizang-yingzao-skill) | 356 | - | agent | 新上 | Python | 🏯 归藏营造：把中国古建 / 名胜 / 旅行照片转 Claude Code / Codex skill | ✅实战 |
| 16 | [okf-memory/okf-agent-memory](https://github.com/okf-memory/okf-agent-memory) | 353 | - | mcp | 新上 | Go | Git-native 持久化记忆 for AI coding agents，Google OKF v0.2 + sub-300ms | ✅实战 |
| 17 | [tigerless-labs/agent-memory](https://github.com/tigerless-labs/agent-memory) | 328 | - | agent | 新上 | Python | (简评补充) | ⚠️实战 |
| 18 | [kydlikebtc/awesome-grokbot](https://github.com/kydlikebtc/awesome-grokbot) | 328 | - | agent | 新上 | Python | 598 条 x.ai/bot 实时分享，每条 link 状态核验、来源标注 | ✅实战 |
| 19 | [kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) | 321 | - | 设计skill | 新上 | Python | (简评补充) | ⚠️实战 |
| 20 | [inclusionAI/Choruz](https://github.com/inclusionAI/Choruz) | 308 | - | 其他 | 新上 | Rust | (简评补充) | ⚠️实战 |
| 21 | [adtextererry-lgtm/unigit-ecosystem](https://github.com/adtextererry-lgtm/unigit-ecosystem) | 304 | - | mcp | 新上 | (待查) | (简评补充) | ⚠️实战 |
| 22 | [OpenVDN/vdn-minimax-h3](https://github.com/OpenVDN/vdn-minimax-h3) | 304 | - | 其他 | 新上 | Python | VideoDeltaNet-H3：基于 MiniMax H3 的实时 T2VA / I2VA / FL2VA 生成 | ✅实战 |
| 23 | [LunarXuan/image-prompt-reverse](https://github.com/LunarXuan/image-prompt-reverse) | 303 | - | 设计skill | 新上 | (无) | Codex 高保真 AI 图像 prompt 反向工程 skill | ⚠️实战 |
| 24 | [dreamers-laboratory/image-to-3d-pipeline](https://github.com/dreamers-laboratory/image-to-3d-pipeline) | 302 | - | 模型 | 新上 | JavaScript | 用多个开源模型从图像重建 3D mesh + 打分评测 | ✅实战 |
| 25 | [aaronyi97/image-story-video-wizard](https://github.com/aaronyi97/image-story-video-wizard) | 293 | - | 设计skill | 新上 | Python | 确认门控的 Codex / WorkBuddy skill：audio-first 图像故事视频生成 | ✅实战 |
| 26 | [btsouth/omakade](https://github.com/btsouth/omakade) | 290 | - | 其他 | 新上 | C++ | 本地优先、为 Omarchy 打造的游戏库 | ⚠️实战 |
| 27 | [florinp93/hells-gate-recomp](https://github.com/florinp93/hells-gate-recomp) | 261 | - | 其他 | 新上 | C# | Xbox 360 → PC：使用 ReXGlue 把《鬼泣》静态重编译移植 | ⚠️实战 |
| 28 | [Appllama/liquid-glass-screens](https://github.com/Appllama/liquid-glass-screens) | 254 | - | 模型 | 新上 | TypeScript | 探索 liquid-glass 启动屏：浮动贴纸 + 交互滑动手势 | ⚠️实战 |
| 29 | [gozen3ji/consulting-pptx-skill](https://github.com/gozen3ji/consulting-pptx-skill) | 248 | - | 设计skill | 新上 | JavaScript | 让 AI 认真做 PPT 的 Claude Code skill：62 型 slide catalog + 自动生成 + 机器检查 | ✅实战 |
| 30 | [34306/vphone-web](https://github.com/34306/vphone-web) | 240 | - | 其他 | 新上 | HTML | vphone-cli 但可用 Mac 当 host 通过 web 控制 | ⚠️实战 |



### 数据方法

- 数据口径：GitHub Search API，按仓库 `created:2026-08-31..2026-09-06` 闭区间筛选，`archived:false`，关键词 `ai OR llm OR agent OR mcp OR assistant in:readme`，按 `stars` 降序。
- 排序与剔除：候选 50 条 → [rank.py](https://github.com/8696/ynwa) 剔除空壳 / 擦边仓（本周剔除 1 条：`GangTailorUpgrade/undress-service`，命中 adult 词），保留 30 条。
- 详深挖：Top 10 各 800-1200 字，覆盖元数据 / README 提炼 3-5 条核心价值 / issue body + 评论实战反馈 / 横向对比 / 信号判断 / 适用场景。
- 上期对照：W35（2026-08-24..2026-08-30）30 条无一进入本周前 30，呈完整换血；本表 Δ 列全 `-`，态列均为「新上」。
- slug：`github-weekly-2026-W36`，快照时间 `2026-09-07T00:40:37Z`（cron 08:40 CST 自动触发）。
