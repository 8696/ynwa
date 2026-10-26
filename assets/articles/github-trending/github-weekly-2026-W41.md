# GitHub 周榜 · 2026-W41 · storytold 单生态 6 席霸榜 + ARTEX 双克隆验证渗透测试自走 agent 持续走热

> 数据口径：窗口 2026-10-05..2026-10-11（UTC 闭区间）新创建仓库，按当前 stars 降序。关键词 `ai OR llm OR agent OR mcp OR assistant in:readme`，不设 stars 下限。`rank.py` 处理后取前 30，详深挖前 10。分布：英文 22 / 中文 8。

## 核心信号

- **`storytold` 单生态本周在 Top 30 拿下 6 席**：`[storytold/wordcraft](https://github.com/storytold/wordcraft)`（#1，5917 ⭐）、`[storytold/gridcraft](https://github.com/storytold/gridcraft)`（#6，2918 ⭐）、`[storytold/cadcraft](https://github.com/storytold/cadcraft)`（#7，2657 ⭐）、`[storytold/deckcraft](https://github.com/storytold/deckcraft)`（#9，2029 ⭐）、`[storytold/soundcraft](https://github.com/storytold/soundcraft)`（#10，1807 ⭐）、`[storytold/craft-launcher](https://github.com/storytold/craft-launcher)`（#13，1199 ⭐）。同一个人用 Rust 一夜之间清空重写了 Word / Excel / AutoCAD / PowerPoint / Pro Tools / 桌面启动器，单仓库动辄 1000+ fork 的分发能力不是项目的稳定性，而是「ArtCraft 模板一次生成整套办公套件」这件事本身的视觉冲击。其余点位在表里只列一行，详深挖以 #1 wordcraft 为主代表。
- **`mhtsec/ARTEX`（渗透测试自走 agent）的双克隆**：`[mhtsec/ARTEX](https://github.com/mhtsec/ARTEX)`（#4，3145 ⭐）+ `[Hinln/ARTEX](https://github.com/Hinln/ARTEX)`（#22，678 ⭐）+ 顺位上还有第三方下游镜像 `trhhubsd/ARTEXX`。这是同一个渗透测试自走 agent 在断原 Docker 镜像源后的备份式 fork，本周集中冒头印证「攻防实战 agent 一旦停服，备份镜像就会出现」这个明确的搬运规律，与 W40 `OpenDots` 类长尾整理完全不同。
- **agent skill 协议层（Claude / OpenCode / Codex 三家通用）从单点走向工具集**：`[wheresryan22/anatomy](https://github.com/wheresryan22/anatomy)`（#3，3295 ⭐，0 依赖 Node 20.10+ 解剖级 isometric SVG）、`[alchaincyf/huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion)`（#2，3385 ⭐，35 艺术风格 + 9 解说语法）、`[zhongerxin/iPhone-use](https://github.com/zhongerxin/iPhone-use)`（#5，3043 ⭐，把 WDA + USB 接到 Codex）—— skills 不再只是「一段 SKILL 描述」，而是用 1k+ ⭐ 撑起一个独立工具集。`[HelixDB/helix-foundry](https://github.com/HelixDB/helix-foundry)`（#12，1205 ⭐）同档补「企业本体论数据并入」，让 skill 输出可以接图数据库。
- **DeepSeek Harness 周内只剩 1 席，与 W40 抗衡段位回落**：`[FeiZhuLulu/DeepSeek-Bot](https://github.com/FeiZhuLulu/DeepSeek-Bot)`（#15，842 ⭐）是本周唯一 DSH 生态、且 rank.py 已自动标"同生态"。W40 单生态挡半边天的 DeepSeek Harness 周边生态已降温到周档第 15 位，意义在于「DSH 是当周气氛引导，但一周后不再是」。同档小型 / 边缘 agent（如 `leviathan`、`talorys`、`Herald-OS`）开始回归常态。
- **对照上期（W40）**：W40 全部 30 仓本期全部跌出；本期新上 30 仓 + 上期唯一掉的 `storytold/photocraft` 同步归位（photocraft 没有本期名次）。star_delta 因上期仅 1 条可对比信息、留空；W42 周二出量可对比。

## 重点深挖

### 1. [storytold/wordcraft](https://github.com/storytold/wordcraft) ⭐ 5,917 · Rust · 11.5 MB · Apache-2.0 · 创建 2026-10-07

- **仓库元数据**：topics 空（尚未补，homepage https://getartcraft.com/apps/wordcraft），单 dev 主导 fork 数 1720（远高于同档 200-300 均值）、watchers=5919，license MIT/Apache-2.0。
- **README 定位与核心价值**：项目副标题 "Writing and document design; an open-source, clean-room reimplementation of Microsoft Word, rebuilt in pure Rust"，从功能入手拆出五条设计哲学：① **ribbon-first + 样式库**——打开后界面是 Word 的「Home / Insert / References / Mailings」功能区，样式画廊带实时预览；② **.docx 双向兼容 + 多平台**——native macOS/Windows/Linux/BSD，浏览器侧用 WebAssembly；③ **可脚本化的 CLI / MCP 入口**——每一处 ribbon 操作也同时是 CLI 命令或 MCP 工具（README 自述「agent-drivable over MCP」）；④ **references + mail merge + track changes**——三个 Word 工作流中段 80% 的核心都补到了；⑤ **README 自述「Apple 商店也能下」的多端一致**——没有 Windows 独占的 COM 接口、没有 Mac-only 的 AppleScript。
- **issue body 实战反馈**：[#771](https://github.com/storytold/wordcraft/issues/771)（body 内提供完整原因链）——用户 @dkhlapov 报告「文档底部含页码（`Page X of Y`）时整个 body 在每次排版时都要排两遍，每按一个键都重排」，作者在 body 里直接给出根因路径：「`Ctx::para_key` sets `uses_totals` while `track_totals` is on. `body_top_for` turns `track_totals` off while it measures the header, but `foot_top_for` measures the foot..er」——开发者当场指到代码层级的定位，issue 收藏比讨论都多。[#770](https://github.com/storytold/wordcraft/issues/770)（用户 @Dunai000）报告打开 .docx 后保存丢失 `word/fonts/*` 嵌入字体，3 个文档跨 8 页 / 6 页受 LibreOffice 渲染差异影响。[#769](https://github.com/storytold/wordcraft/issues/769)（同用户）跟进安全 issue：`wordcraft-cli mcp` 给 client agent 完整文件访问权、可读取到 working folder 之外文件，「VectorCraft already solves this. Its mcp subcommand takes `--automation-read-root DIR`」——用户主动提 issue 给出修复路径，作者用参考兄弟仓回应不是「反驳」，是直接采纳。[#776](https://github.com/storytold/wordcraft/issues/776)（@lolmc0587 的 Wingdings 字体）+ [#775](https://github.com/storytold/wordcraft/issues/775)（@technoligee 的 styleref mergefield）+ [#767](https://github.com/storytold/wordcraft/issues/767)（Fedora + Intel UHD + Wayland 下的 Vulkan 后端 UI 渲染异常，作者给出 `WGPU_BACKEND=gl wordcraft yourdoc.docx` 的临时修法，作者 @mjwok 自己跟帖确认 Vulkan vs gl 后端的差异是根因）。
- **横向对比**：和 `libreoffice/core`（C++ 全套办公、臃肿）相比，WordCraft 是 Rust 重写 + 仅 Word 部分 + CLI/MCP 接口；而 vs `coolskill/word-cli` 之类的命令 word 处理，WordCraft 走完整 UI 而非 headless CLI。同期 `storytold/gridcraft`（Excel 重写）、`storytold/cadcraft`（AutoCAD 重写）、`storytold/deckcraft`（PowerPoint）、`storytold/soundcraft`（Pro Tools）属于同一作者，统一在 https://getartcraft.com/apps/ 上提供下载 + Discord 群 + 跨 CLI/MCP 的同套设计——ArtCraft 是一次「重写套装」，WordCraft 是其中最早冒头一员。
- **信号判断**：安全 ⚠️（MCP `--automation-read-root` 已经被自家兄弟 VectorCraft 修过，WordCraft 仍未补，`prompt-injected` 类文本是其独有风险源，作者已通过 issue 沟通进入修复流程）；实战 ✅（已有 Fedora/Arch macOS/Linux 用户反馈实际渲染问题，作者的临时 `WGPU_BACKEND=gl` 修法可读懂）；兼容 ✅（跨平台发布、CLI/MCP 双接口）；增长 📈（1720 fork 在 5 天内）；研究诚信 ✅（issue body 里直接给根因链路，不藏私）。

**适用场景**：**适合**：要把 .docx 处理流水线自动化或跑 agent 文档协作的中大型企业内 SaaS；个人 mac/Linux 用户在文本编辑器/Word 之间想要原生 Rust 替代；做文档生成 MCP server 的开发者；喜欢 CLI/MCP 双入口的运维/DevOps 团队 · **不适合**：需要 AutoLISP/宏等企业级扩展的金融/法律团队（这块归属于 cadcraft 而非 wordcraft）；纯文本/Markdown 极简工作流；多人协作（README 未明确多人协作，单机场景为主）；MCP server 直接暴露给不可信 LLM 的场景——需等 `--automation-read-root` 修复。
### 2. [alchaincyf/huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion) ⭐ 3,385 · JavaScript · 73.5 MB · MIT · 创建 2026-10-06

- **仓库元数据**：homepage 空、topics 空、license MIT、watchers=3385、forks=380（高于 2 倍均值的扩散速度说明 demo 被频繁 fork 试跑）。
- **README 定位与核心价值**：副标题「艺术动画 skill：35 种艺术风格、9 种解说语法，用代码让画动起来」。设计哲学分三条：① **npx skills add 一键接入** —— 不需要本地安装任何 Python ffmpeg skill，告诉 coding agent「我想画一段梵高」就能让 Claude Code 生成完整动画；② **35 种艺术风格 + 9 解说语法构成风格象限**——既能「梵高 / 印象派 / 点彩」也能「8-bit / 古埃及 / 像素主角」，每种都附带代码片段（片段参数化、不是 prompt 魔法）；③ **成片参考代码**——`assets/showcase/mario-claude.gif`（花叔闯进超级玛丽）、`clawd-vangogh.gif`（Claude Code 像素吉祥物夜巡博物馆）、《画里真的会动》的莫奈日本桥水漂——不靠视频模板、不靠 stock，而靠「口播整片参考代码」给 agent 当 ground truth。
- **issue 实战反馈**：[#3](https://github.com/alchaincyf/huashu-art-motion/issues/3)（已关闭，1 评论）——用户 @nctt777-hue 报告 Windows 跑 `render.py` 静帧失败现象：「`net::ERR_CONNECTION_REFUSED`、Chromium 并发加载 20+ 脚本时被拒、随后 `U.onStage is not a function`」「`window.__ready` 永远不为 true」——用户做了对照实验排除代理因素，定位到本地服务单线程 TCPServer 的 bug。作者 @alchaincyf 回复：「感谢详细复现、同机对照实验与复测记录……修复已上线 main，commit `57d67608ab458f57d9b153b1a2831b921e22498b`，我们在当前主线独立实现了修复（没有直接合并外部 PR）。`render.py` 与 `qa.py` 现在各自使用局部 `ThreadingTCPServer` 子类、`request_queue_size=128` 与 `daemon_threads=True`」——这是少见的高响应质量回复：复述用户诊断链路 + 主动说「没直接合并外部 PR」 + 给出可验证的 commit + 同时给出 ThreadingTCPServer 的具体子类名（不抽象、不打太极）。[#6](https://github.com/alchaincyf/huashu-art-motion/issues/6)（@ismilewolf-eng）反馈 `y2_vox` 片段里 `highlight.rect` 是相对截图 0..1 坐标、肉眼估值会导致「圈到了 `such as cat fac` 而非目标 `cat faces`」。作者给的建议方向是 Playwright 读 Range 外框、再换算比例——这也是「agent-side automated coordinate harvesting」的入门范式。
- **横向对比**：vs 同类 `motionity/motionity`（免费在线动画编辑器、UI 模板），huashu-art-motion 是给 agent 用的、不给人类 GUI；vs `runway/gen-2` 闭源视频生成，它是「代码驱动 + 像素帧重排」，不是 Sora 类文生视频；vs `anthropic/skills` 官方仓库的子目录，它是一个具体 skill 的完整实现，可以独立跑。
- **信号判断**：安全 ✅（所有 demo 自包含，不窃活内容）；实战 ✅（Windows 单线程 bug 用户复现完整，作者回复含 commit hash）；兼容 ✅（Linux/macOS/Windows 三平台都跑了测试）；增长 📈（73 MB 仓库不算大、README demo 已经是成片）；研究诚信 ✅（每段 demo 后都链回原 commit hash、不夸大「模型智能」）。

**适用场景**：**适合**：Claude Code / Codex / Cursor 用户想让 agent 帮自己做动画 demo、视频课程作者要快速生成讲解动画、AI 视频工具原型开发者；设计师想做「提示词代码化」的风格实验 · **不适合**：要 1080p MP4 输出（README 强调 GIF 循环 + 65 秒短片）；需要 OpenGL/Three.js 精细特效（说明里说「暗处是炭笔夜景」）；无 Claude Code/Codex 等 agent 客户端环境（CLI 单跑不友好）。

### 3. [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy) ⭐ 3,295 · JavaScript · 1.7 MB · MIT · 创建 2026-10-08

- **仓库元数据**：topics 4 个（agent-skill / open-source / svg / vizualization），homepage https://skills.wheresryan.sh/anatomy、license MIT、open_issues 10、forks 253。
- **README 定位与核心价值**：副标题「A Claude skill that explains an idea by building it as a real, working object. Also runs in OpenCode and Codex.」——与 huashu-art-motion 是同期「protocol layer 不再是单点 prompt、而是 skill 集合」的代表项目，但是不同方向：anatomy 主攻「工程级 isometric 分解图」。README 强调 0 依赖、Node 20.10+ 起跑、CI workflow 公开、与 agentSkills.io 兼容。设计哲学：① **Isometric SVG 为本体**——主角是 SVG，不是 Three.js/babylon.js；② **可拼装、可层级化**——README 有 Quick Start / Gallery / What it makes / Install / Usage / Examples / How it works 几个标准章节，证明输出物是「工程概念图」，不只是「好看插画」；③ **跨 agent 客户端兼容**——Claude Code / OpenCode / Codex 三家通用（README 顶部 badge 即标注），同 SKILL 描述多个客户端共用。
- **issue 实战反馈**：当前仓库 10 条 open 状态非 PR 的 feedback 仅 0 条（10 条 open 全是 PR / discussion），意味着该项目早期使用者还都在试用阶段，作者尚未面对真实用户报错。这是新仓 + 高 ⭐ 同时无显著问题的形态，是「早期赏味期」信号。
- **横向对比**：vs 同生态 `excalidraw/excalidraw`（手画线条插画）—— anatomy 是代码生成 isometric SVG，节点编号稳定可复用；vs `tldraw/tldraw` 这种在线白板 + AI 类—— anatomy 离线生成，可独立嵌入文档/MDX；vs Three.js Scene 渲染—— README 自述 SVG 优先、WebGL 可选，资源极轻。
- **信号判断**：安全 ✅（SVG output、不上传图像）；实战 ⚠️ 早期（10 open issues 都是 PR/diff/draft，作者回复量不足观察）；兼容 ✅（0 依赖 + 多客户端 + license MIT）；增长 📈（同档 3k+ ⭐ 项目多以 web 启动为主，anatomy 是少见的「文档级 SVG 启动」代表）；研究诚信 ✅（README 自述「also runs in OpenCode and Codex」、不夸大）。

**适用场景**：**适合**：技术文档作者想要 isometric 拆解图、agent skills 教学者需要的「概念化样本」、写 README 与博客配图的设计师 · **不适合**：需要 3D 视角或动态交互（README 仅在 WebGL shaders 可选段落提到）；无 Node 20.10+ 的旧 Linux；不想要 isometric 风格、偏爱 photo-real 的场景。
### 4. [mhtsec/ARTEX](https://github.com/mhtsec/ARTEX) ⭐ 3,145 · Go · 8.4 MB · AGPL-3.0 · 创建 2026-10-08

- **仓库元数据**：homepage 在线 Demo（https://artex-demo.mhtsec.com 模拟数据）、topics 空、license AGPL-3.0、open_issues 0、forks 5558（异常高，说明是大量复刻分发而非源代码 PR）。
- **README 定位与核心价值**：副标题「AI 自主渗透测试系统」。设计哲学：① **Go 后端 + Next.js 前端分离**（典型云原生架构，PostgreSQL 存任务与流量、资产通过 ScopeSentry 同步）；② **审批记录 + 人在环路对话** —— 攻击并非全自动，agent 每发起扫描 / 高危动作会在 UI 弹审批卡片（README 展示 AegisHook 组件复用）；③ **Docker 镜像源已废**，README 顶部直接说「原 Docker 镜像源 `autumn27/artex` 已失效，现由本仓库自维护镜像 `mianhuatang11/artex`（Docker Hub）—— 备份式 fork 出现的根因已经被仓库 author 自己写到 README。
- **issue 实战反馈**：[#3](https://github.com/mhtsec/ARTEX/issues/3)（@tanqidi 问「已经不更新了吗」）——作者 @mhtsec 回答「不是原作者，这仓库只是备份，只修复问题，不更新功能」。这把「原作者停服 + 备份 fork」这件事在第一个 issue 上明示。[#2](https://github.com/mhtsec/ARTEX/issues/2)（@Usernmae-1326546 问「可以支持 kali 安装吗」）——作者 @mhtsec 回「让 AI 给你编译就行」；同 issue 评论里 @trhhubsd 直接发下游预编译版 https://github.com/trhhubsd/ARTEXX —— 显式的「fork-of-fork」形态。[#1](https://github.com/mhtsec/ARTEX/issues/1)（@sharenjun）指向 https://github.com/sharenjun/ARTEX-main —— 第二条同生态衍生。
- **横向对比**：vs `AutoGPT` 这类通用 self-agent —— ARTEX 是垂直「渗透测试」赛道，自带工具集（扫描/流量/审批/Docker compose）；vs `feder-cr/dots`（W40 浏览器反指纹 agent）—— dots 是通用浏览器 agent；与 ARTEX 同生态 `trhhubsd/ARTEXX`（#22 顺位之外作者另开）、`Hinln/ARTEX`（#22，680 ⭐，README 顶部明文「基于 Autumn-27/ARTEX v0.3.15，保留原始提交历史与 AGPL-3.0 许可证」）——这两条与 `#4 mhtsec/ARTEX` 是镜像关系，本周 Top 30 内同生态聚合占 3 席。
- **信号判断**：安全 ⚠️（AGPL-3.0 商业使用门槛高、定位是安全工具，但「备份/预编译 Docker」链路的可信度全靠作者 @mhtsec 一句话背书）；实战 ✅（已有沙盒演示 + Approval 流程）；兼容 ✅（Docker compose + install.sh + 自动检测 Postgres）；增长 ⚠️ 周内 vs W40 无（首期）；研究诚信 ✅（作者直接说「不是原作者，这仓库只是备份」）。

**适用场景**：**适合**：安全团队需要内网部署的渗透测试自走 agent（离线/内网场景）、希望从备份 fork 拉取历史的资料归档 · **不适合**：生产企业未读 AGPL-3.0 license 直接用（商业使用要全套开源），白帽受限环境（自走 agent 在多数企业是禁用项）。

### 5. [zhongerxin/iPhone-use](https://github.com/zhongerxin/iPhone-use) ⭐ 3,043 · Python · 44.7 MB · MIT · 创建 2026-10-06

- **仓库元数据**：homepage 空、topics 空、license MIT、open_issues 15、forks 304。
- **README 定位与核心价值**：副标题「让 Codex 通过 USB 操作真实 iPhone：引导安装、App 自动化、实时屏幕与截图回退」。设计哲学：① **WebDriverAgent（WDA）作为底层**——不重新发明 iOS 控制协议，直接复用 Appium 维护的 WDA 16.14.0 的固定提交；② **PostHog 匿名埋点默认开启** —— `IPHONE_USE_ANALYTICS=0` 或 `DO_NOT_TRACK=1` 可关，README 顶部明文「不上传手机画面、输入内容或设备标识」；③ **不需越狱**——Apple developer team + 自签名 + WebDriverAgentRunner；④ **本地 MCP server + iphone-use-setup skill** —— Codex 是入口 client，prompt 给一段、把 WDA 安装 + 签名 + 构建 + 启动全部跑完。
- **issue 实战反馈**：[#22](https://github.com/zhongerxin/iPhone-use/issues/22)（@Genius-Cai-wen-zheng）报告「服务重启后实时预览卡顿、截图超时反复出现……手机直接交互仍正常」。作者 @atsu6 回复：「感谢详细的报告，抱歉 #15 原本混入了日语本地化与实验性预览改动，造成困惑。**#15 现在只保留可选日语本地化**。我已经移除了实验性 2 FPS 设置和其它无关变更，本地化可以独立评审。本次 PR 不改 FPS / 预览连接 / 手机控制行为，也不声称能修复此 issue。」—— 这是难得的「issue 这次我不修，且明说不修」回复形态，防止误导当前用户。[#19](https://github.com/zhongerxin/iPhone-use/issues/19)（@thunderfight127-svg）报告「USB 控制成功、Wi-Fi 下 WDA 与官方 XCTest 模板均退出 code 74（iOS 27.0.1）」 的复杂对照实验——同机同 Xcode、iOS 27.0.1 已无法用 Wi-Fi 自启动，这是 Apple 端 SDK 变化引发的环境兼容问题，作者尚未有完整修复。[#24](https://github.com/zhongerxin/iPhone-use/issues/24)（@JAYDJY）智能地区分「WDA vs Computer Use with iPhone Mirroring」——用户问出两类方式的并列适用性（区别在于控制通道、稳定性、可访问性信息读取），作者尚未明确回复；[#25](https://github.com/zhongerxin/iPhone-use/issues/25)（@kebeesoul）极简「iphone」仅一词 + 极简 body，可能是社区样本 / 模板置顶。
- **横向对比**：vs `anthropic/claude-for-ipados` 闭源、不对开发者开放 —— iPhone-use 是开源 MCP 桥；vs `appium/WebDriverAgent`（同底层依赖）—— iPhone-use 在 WDA 之上面向 Codex 做了 setup + skill；vs Anthropic Claude iOS Computer Use 公开演示 —— 后者没有持久控制通道，iPhone-use 的 WDA 是手机端长驻的。
- **信号判断**：安全 ⚠️（PostHog 匿名埋点默认开启是提示、不是问题，但 README 必须 read；真实手机 → agent 链路需要本地全权限）；实战 ✅（长 issue + 作者明确「我不修这次」的高质量回复）；兼容 ⚠️（iOS 27/Wi-Fi start 已出现 code 74，环境依赖 Apple SDK 变化）；增长 📈（同 SKU 项下 demo + postHog 同时存在）；研究诚信 ✅（#15 / #22 / #19 三条迭代记录透明）。

**适用场景**：**适合**：希望把 iPhone 操作连入 Codex / Claude Code 的自动化工程师、QA 团队要把测试手机交 agent 操作 · **不适合**：Windows / Linux（README 必须 macOS + Codex 桌面 / CLI + 完整 Xcode）；拒绝 PostHog 匿名埋点的隐私敏感者（虽然明文提到关法）；没有 Apple 开发者账号的环境（无法完成 WDA Runner 自签名）。
### 6. [storytold/gridcraft](https://github.com/storytold/gridcraft) ⭐ 2,918 · Rust · 6.2 MB · Apache-2.0 · 创建 2026-10-07

- **仓库元数据**：topics 空、homepage 空、license MIT/Apache-2.0、open_issues 109、forks 1204。
- **README 定位与核心价值**：副标题「Spreadsheets and data; an open-source, clean-room reimplementation of Microsoft Excel, rebuilt in pure Rust」，与 WordCraft 同 ArtCraft 团队出品。设计哲学：① **Hero 图是「季度销售仪表盘」**——表格 + 带状行 / 过滤按钮 / 总计行 / 数据条 / 箭头图标 / 迷你图 / 簇状柱形图 / 饼图，整套 dashboard 用 GridCraft 命令跑完；② **跨平台一致**——macOS / Windows / Linux / BSD + WebAssembly；③ **agent 可驱动**——README 顶部「agent-drivable over MCP」，全部 ribbon 操作也都通过 CLI/MCP 暴露。
- **issue 实战反馈**：[#446](https://github.com/storytold/gridcraft/issues/446)（用户 @Dunai000）——`file.exportPdf` 写入未嵌 base-14 字体（Helvetica/Times-Roman）+ WinAnsi 编码，所有非 Latin 字符（Cyrillic、希腊、乌克兰）在 PDF 输出变 `?`。这是 Excel 重写工程里长期存在的「PDF 字体回退」问题，作者尚未给出完整修复，body 内完整复现步骤已列。
- **横向对比**：vs WordCraft 同期同源（rust 重写 + 多平台 + MCP），GridCraft 是 Excel 这一格的关键赛道，与 `apache/openoffice` 的 Calc 模块相比独立；与 `handsontable/handsontable`（商业级 JS 表格）相比，GridCraft 是 native 多平台 + CLI。
- **信号判断**：安全 ✅；实战 ⚠️ PDF 国际化字体未完全解决；兼容 ✅；增长 📈；研究诚信 ✅。

**适用场景**：**适合**：需要 Excel 兼容 + Linux/macOS 原生 + MCP 接入的工程团队、要做财务 / 数据 demo 模板 · **不适合**：含 Cyrillic / CJK / 其它非 Latin 字符集 PDF（已知 bug）；高级数据透视表 / VBA 重度依赖。

### 7. [storytold/cadcraft](https://github.com/storytold/cadcraft) ⭐ 2,657 · Rust · 5.1 MB · Apache-2.0 · 创建 2026-10-07

- **仓库元数据**：topics 空、license MIT/Apache-2.0、open_issues 84、forks 1209。
- **README 定位与核心价值**：副标题「CADCraft: computer-aided design and drafting — an open-source, clean-room AutoCAD-style app in pure Rust」。设计哲学：① **AutoCAD 工作流补全套**——command line + object snaps + layers + dimensions + hatches + blocks + DXF；② **横跨 mac/Windows/Linux/FreeBSD + browser**——WebAssembly 浏览器层；③ **「status: early development」** + 同时「agent-drivable over MCP」，是个明显的「原生 CAD + 脚本化 agent 入口」双重定位。Hero 图是房屋户型图——hatched grey walls + blue windows + green door swings + 家具轮廓 + 黄色房间名。
- **issue 实战反馈**：[#646](https://github.com/storytold/cadcraft/issues/646)（@codyvogt）——真实测量报告：「实景测量计划（DWG、6,434 实体）每次 2x 缩放冻结画布约 2.7 秒。实体数不是问题——**带填充的 TrueType 文本**才是。每个字形在 `fill::triangulate_evenodd` 的 slab decomposition 中约 195 个三角形，无论屏幕大小、且无缓存，导致每个字符在每个缩放带重新分解。」——这是 CAD 类工具里少有的「给具体测量数据 + 具体函数名」的 bug 报告。[#648](https://github.com/storytold/cadcraft/issues/648)（@sandraschi）——AutoLISP 的 E1 一致性测试集（18 个 AutoLISP routine + 应产生的 drawing）作者想「贡献给任何实现 AutoLISP 的人」——是社区参与的入口邀请，非典型 bug。
- **横向对比**：vs `LibreCAD`（C++/Qt 老牌开源 CAD）——CADCraft 是 Rust + MCP；vs `FreeCAD` —— CADCraft 是 2D 优先，与 FreeCAD 3D parametric 互补；vs WordCraft/GridCraft 同作者套件。
- **信号判断**：安全 ✅；实战 ✅（详细 2.7s 测量 + 函数名）；兼容 ✅；增长 📈；研究诚信 ✅。

**适用场景**：**适合**：做工程/建筑图纸设计的工程师（2D AutoCAD 替代）、需要 CLI/MCP 接入 CAD 的脚本/CI 工作流 · **不适合**：3D parametric 建模主力（FreeCAD 更强）；建筑 / 制造行业的 AutoLISP 重度依赖（E1 在早期开发）。

### 8. [LosaLosSantos/aurelio-finance](https://github.com/LosaLosSantos/aurelio-finance) ⭐ 2,243 · Python · 10.2 MB · MIT · 创建 2026-10-06

- **仓库元数据**：topics 13 个（ai / dividends / etf / finance / financial-planning / fintech / investing / llm / net-worth / personal-finance / portfolio-tracker / self-hosted / stocks / wealth-management）、license MIT、open_issues 0、forks 287。
- **README 定位与核心价值**：副标题「Open-source personal finance app with an AI financial advisor: track your net worth, investments, ETFs, cash and debts on your own computer.」。设计哲学：① **本机数据 + OpenRouter 调用**——records 存 `backend/data.db`，AI 部分可选，跑自家 key 走 OpenRouter；② **一脚本 start（`./start.sh --demo` / `.ps1`）**——首跑装依赖 + 启动一个伪造 households + 浏览器到 http://localhost:8000；③ **「wealth / portfolio」双 layout**——README hero GIF 是动画：净资产 / 国家资金分布 / 月盈余问答 / 建议（你确认或拒绝）；④ **`backend/data.db` 格式变更前会自动备份**——版本升级有「备份隔壁」的安全网。
- **issue 实战反馈**：仓库当前 0 条 open issue，意味着新仓处于「作者主导开发」阶段，issue 信号不足以做实战判断。
- **横向对比**：vs `firefly-iii/firefly-iii`（自托管个人理财 + Docker 全栈、PHP）—— Aurelio 是 Python + 单本机 script；vs `actualbudget/actual`（自托管预算）—— Aurelio 加 AI advisor 层；vs `maybe-co/maybe`（个人财务 + portfolio 跟踪、早期商业化）—— Aurelio 是社区版、不上云。
- **信号判断**：安全 ✅（本机 SQLite + 不外发数据）；实战 ⚠️ 早期作者主导；兼容 ✅（macOS/Linux/Windows 各一个启动脚本）；增长 📈（13 topics 覆盖度高）；研究诚信 ✅（AI 可选 + OpenRouter 透明）。

**适用场景**：**适合**：自托管家庭 / 个人净资产跟踪的早期用户、希望 AI 给建议但不希望数据出本机的隐私优先者 · **不适合**：多用户家庭（项目 README 明示「personal / self-hosted」）；高频 / 商业级资产配置（README 自述「personal」）；不熟悉 Python 启动脚本 + OpenRouter API key 配置的初学者。
### 9. [storytold/deckcraft](https://github.com/storytold/deckcraft) ⭐ 2,029 · Rust · 2.7 MB · Apache-2.0 · 创建 2026-10-07

- **仓库元数据**：homepage https://getartcraft.com/apps/slidecraft、license MIT/Apache-2.0、open_issues 138、forks 1037。
- **README 定位与核心价值**：副标题「Presentations and slide shows; an open-source, clean-room reimplementation of Microsoft PowerPoint, rebuilt in pure Rust」。设计哲学：① **PowerPoint 核心功能全套**——themes / layouts / shapes / pictures / tables / charts / transitions / animations + .pptx open/save + 全屏放映；② **状态栏「status: early development」** 与 WordCraft/GridCraft/CADCraft 一致——single dev 多人 office 套件的草创期；③ **CLI/MCP 双入口**——所有 ribbon 操作都同时是命令（agent 可通过 MCP 驱动）。
- **issue 实战反馈**：[#185](https://github.com/storytold/deckcraft/issues/185)（@Mohamed-Y0）——打开 .pptx 时「随机幻灯片出现严重画布渲染故障」（黑色几何尖刺 + 纯黑幻灯片背景）；附 3 张截图，平均 1430×890 像素。这位用户的反馈最具技术价值——同时打开多个相似图形附件、对照定位「特定幻灯片结构性」问题。[#183](https://github.com/storytold/deckcraft/issues/183)（@afern247）——打开 .pptx 扩展名直接报错「无法读取」——文件格式兼容早期 bug，作者尚未修。[#184](https://github.com/storytold/deckcraft/issues/184)（@SevenToaster509）——「渲染偏软」，对比 Microsoft PowerPoint 与 DeckCraft 编辑预览 / 演示预览的细节图（4 张图 236×26 / 472×49 像素）。[#182](https://github.com/storytold/deckcraft/issues/182)（@khalileou-art）——Ctrl+C/Ctrl+V 无法复制非对象元素，需要右键菜单。这四条 issue 都属「功能未完成」性质。
- **横向对比**：与 WordCraft / GridCraft / CADCraft 同作者的 PowerPoint 重写；vs `libreoffice/impress` —— DeckCraft 是 Rust、native 多平台。
- **信号判断**：安全 ✅；实战 ⚠️ (.pptx 兼容 + 渲染 + 键盘流)；兼容 ⚠️ (LibreOffice .pptx 子集 vs Office .pptx 全集差异)；增长 📈；研究诚信 ✅。

**适用场景**：**适合**：要做跨平台 PowerPoint 兼容演示的工程师、agent 驱动 deck 生成 · **不适合**：复杂 .pptx 重度依赖（如表格嵌套 + 动画 + SmartArt 多层组合）。

### 10. [storytold/soundcraft](https://github.com/storytold/soundcraft) ⭐ 1,807 · Rust · 4.9 MB · Apache-2.0 · 创建 2026-10-07

- **仓库元数据**：homepage https://getartcraft.com/apps/soundcraft、license MIT/Apache-2.0、open_issues 80、forks 1016。
- **README 定位与核心价值**：副标题「Recording, editing and mixing audio; an open-source, clean-room reimplementation of Avid Pro Tools, rebuilt in pure Rust」。设计哲学：① **完整数字音频工作站（DAW）**——多轨编辑 + 完整 mixer + plugins + sends + automation + MIDI + recording + bouncing；② **100% Rust**——首 badge 即「100% Rust」，UI 用 egui（Rust GUI 框架）；③ **跨平台**——macOS / Windows / Linux / FreeBSD + browser；④ **CLI 脚本 + agent 接入**——所有 action 都是命令。Hero 图是「九轨会话：鼓 / 贝斯 / pad / 键 / 主旋律 / reverb aux / master fader」。比 Pro Tools 强调「同一个内置 demo 歌曲，所有声音来自代码生成」——这点比现实 Pro Tools 走得更开源、纯合成。
- **issue 实战反馈**：仓库当前 0 条 open issue，新仓处于早期；用户反馈更多来自 community 与早期 Discord。

- **横向对比**：vs `bitwig/bitwig-studio`（商业 + 闭源 DAW 部分模块）—— soundcraft 全开源；vs `ardour/ardour`（老牌开源 DAW，C++）—— soundcraft 是 Rust + MCP/CLI 入口；vs 同作者 WordCraft/GridCraft/CADCraft/DeckCraft。
- **信号判断**：安全 ✅；实战 ⚠️ 早期（无现成 issue）；兼容 ✅（100% Rust + egui + 多平台）；增长 📈（forks 1016）；研究诚信 ✅（README 自述 demo 歌曲全部声音来自代码生成）。

**适用场景**：**适合**：要做 cross-platform DAW 原型与开源音频工具链的工程师、agent 驱动音频编辑（"把这段讲稿的声音 + BGM 自动铺设"） · **不适合**：MIDI 高级编辑 + VST 插件链深度集成（README 未明确支持）；商用 / 母带级（pre-alpha 阶段）。

## 完整前 30 表

| # | 仓库 | ⭐ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---:|---|---:|---|---|---|---|---|
| 1 | [storytold/wordcraft](https://github.com/storytold/wordcraft) | 5,917 | 其他 | 新上 | Rust | Rust + 多平台 clean-room Microsoft Word 重写，MCP / CLI 双入口 | ✅实战 ⚠️MCP |
| 2 | [alchaincyf/huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion) | 3,385 | 设计skill | 新上 | JavaScript | 35 艺术风格 + 9 解说语法，art/动画 skill 一键接入 agent | ✅实战 |
| 3 | [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy) | 3,295 | agent | 新上 | JavaScript | 0 依赖 isometric 拆解 SVG skill，Claude/OpenCode/Codex 通用 | ✅兼容 ⚠️早期 |
| 4 | [mhtsec/ARTEX](https://github.com/mhtsec/ARTEX) | 3,145 | agent | 新上 | Go | Go 后端 + Next.js 自主渗透测试 agent，原 Docker 镜像源已废 | ✅实战 ⚠️license |
| 5 | [zhongerxin/iPhone-use](https://github.com/zhongerxin/iPhone-use) | 3,043 | 其他 | 新上 | Python | Codex 通过 USB 用 WDA 控制真实 iPhone，含 MCP server | ✅实战 ⚠️iOS27 |
| 6 | [storytold/gridcraft](https://github.com/storytold/gridcraft) | 2,918 | 其他 | 新上 | Rust | Rust clean-room Excel 重写，MCP / CLI 双入口 | ⚠️PDF字体 |
| 7 | [storytold/cadcraft](https://github.com/storytold/cadcraft) | 2,657 | 设计skill | 新上 | Rust | Rust clean-room AutoCAD 重写，CLI/MCP 入口 | ✅兼容 |
| 8 | [LosaLosSantos/aurelio-finance](https://github.com/LosaLosSantos/aurelio-finance) | 2,243 | 模型 | 新上 | Python | 本机自托管 + AI 财务顾问，OpenRouter 可选 | ✅自托管 ⚠️早期 |
| 9 | [storytold/deckcraft](https://github.com/storytold/deckcraft) | 2,029 | 其他 | 新上 | Rust | Rust clean-room PowerPoint 重写，MCP / CLI 双入口 | ⚠️.pptx |
| 10 | [storytold/soundcraft](https://github.com/storytold/soundcraft) | 1,807 | 其他 | 新上 | Rust | Rust clean-room Avid Pro Tools 重写，egui UI + CLI/MCP | ⚠️pre-alpha |
| 11 | [LoreanXavier/pt-pc](https://github.com/LoreanXavier/pt-pc) | 1,442 | 其他 | 新上 | C++ | Native PC port of P.T.，跑自家 PS4 文件 | — |
| 12 | [HelixDB/helix-foundry](https://github.com/HelixDB/helix-foundry) | 1,205 | 其他 | 新上 | TypeScript | 企业本体论数据并入 HelixDB，本机部署 | ✅自托管 |
| 13 | [storytold/craft-launcher](https://github.com/storytold/craft-launcher) | 1,199 | 其他 | 新上 | Rust | ArtCraft 跨应用启动器 | — |
| 14 | [pingdotgg/ts-rust](https://github.com/pingdotgg/ts-rust) | 1,055 | 其他 | 新上 | Rust | TypeScript 7 编译器 (tsc) 实验性 Rust 端口 | — |
| 15 | [FeiZhuLulu/DeepSeek-Bot](https://github.com/FeiZhuLulu/DeepSeek-Bot) | 842 | agent | 新上 · 同生态 | JavaScript | DeepSeek Harness 长生命周期 bot 群 | DSH |
| 16 | [wesbos/photo-frame-dashboard](https://github.com/wesbos/photo-frame-dashboard) | 771 | 其他 | 新上 | Python | 通过 ADB / root 把锁屏 Android 变成 photo frame dashboard | — |
| 17 | [bas3line/ascii](https://github.com/bas3line/ascii) | 763 | 其他 | 新上 | TypeScript | Web 端可循环 ASCII 动画，React / Next 集成 | — |
| 18 | [rociiu/talorys](https://github.com/rociiu/talorys) | 750 | agent | 新上 | TypeScript | Cloudflare 账户上跑个人 AI agent（chat + automation） | — |
| 19 | [elstongun/leviathan](https://github.com/elstongun/leviathan) | 741 | agent | 新上 | Rust | Agent 用大规模数据集内存层，scalar/Rust 实现 | — |
| 20 | [ThariqS/ai-newtab](https://github.com/ThariqS/ai-newtab) | 740 | 其他 | 新上 | TypeScript | Claude 每日按浏览器历史生成 new tab 页面 | — |
| 21 | [n1tr00-10/tiktok-web-signature](https://github.com/n1tr00-10/tiktok-web-signature) | 710 | 其他 | 新上 | Python | TikTok web 签名反推，产出可用 web signature | ⚠️合规 |
| 22 | [Hinln/ARTEX](https://github.com/Hinln/ARTEX) | 678 | agent | 新上 · 同生态 | Go | ARTEX v0.3.15 备份 fork，保留 AGPL-3.0 | 备份 |
| 23 | [sirioberati/Genjustsu-Open-Source-Workflow](https://github.com/sirioberati/Genjustsu-Open-Source-Workflow) | 645 | 其他 | 新上 | Python | TEIN 出品的开源 AI 视频替换工作流 | — |
| 24 | [franzenzenhofer/big-arrow-on-the-screen](https://github.com/franzenzenhofer/big-arrow-on-the-screen) | 627 | agent | 新上 | Swift | 让 agent 在屏幕上画大箭头 / 框 / 文字 | — |
| 25 | [bherbruck/solidcraft](https://github.com/bherbruck/solidcraft) | 576 | mcp | 新上 | Rust | SolidCraft：open-source 参数化 3D CAD（SolidWorks 风格） | — |
| 26 | [GTKottman/mortiflix-oss](https://github.com/GTKottman/mortiflix-oss) | 570 | agent | 新上 | JavaScript | 本地 motion design studio，Claude 编排动画 | — |
| 27 | [academa-labs/manimgx](https://github.com/academa-labs/manimgx) | 550 | agent | 新上 | Python | 给 agent 用的 animation engine：高速数学 + 3D | — |
| 28 | [nanocle/Charakuru](https://github.com/nanocle/Charakuru) | 523 | 其他 | 新上 | - | (无描述) | — |
| 29 | [mw00/project-maya](https://github.com/mw00/project-maya) | 461 | 模型 | 新上 | C++ | GLM-5.3-Flash (321B MoE) 在家用 NVIDIA GPU 上跑 | — |
| 30 | [iamlukethedev/Herald-OS](https://github.com/iamlukethedev/Herald-OS) | 428 | agent | 新上 | TypeScript | Agent-native OS，把 Hermes Agent 作为内置助手 | — |

**同生态衍生**：本周 #15 DeepSeek-Bot 与 DSH 单生态衍生（rank.py 自动标"同生态"），不在表里再开 1 行。本表 Top 30 全部为新上榜条目。

## 数据方法

- **窗口**：2026-10-05..2026-10-11 UTC 闭区间；来源 `python3 ~/.hermes/skills/gh-trending-watch/scripts/windows.py --route weekly --format env`（`WEEKLY_CREATED`）。日 / 周 / 月三档分别由 CST 08:10 / 周一 08:40 / 每月 1 号 09:10 cron 自动触发。
- **排序**：GitHub Search API `created:2026-10-05..2026-10-11 archived:false (ai OR llm OR agent OR mcp OR assistant) in:readme` + `sort=stars&order=desc&per_page=50`，匿名调用（GH token 在本期跑前 401，已回退匿名 60/h）。
- **过滤**：`scripts/rank.py` 自动剔除空壳 / 擦边仓；返回 30 条全部保留。本期剔除 3 条空壳（attowarriorbond/SolidWorks-CAD / ParrotStaple/Microsoft-Office / Chartfitzturn/RX-11-Audio-Editor）。
- **对比**：`rank.py --write` 写入本期快照（`data/snapshots/weekly--2026-10-05..2026-10-11.json`），下期 W42 增量对比。W40 全部 30 条在本期跌出。
- **slug**：`github-weekly-2026-W41`；同步在 db.json 顶层 tags 复用既有 `github-weekly-ranking`。
