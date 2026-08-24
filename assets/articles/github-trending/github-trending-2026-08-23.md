# GitHub 日榜 · 2026-08-23 · ShadowAqueduct 水印剥离登顶 759⭐ + agent 赛道过半 + 全榜 11⭐ 门槛

数据窗口为 2026-08-23 整个 UTC 日，按 stars 降序取 AI/agent/LLM/MCP/assistant 主题下当日新创建热门仓库前 15；样本语言分布：Python 5 / TypeScript 3 / Swift 1 / Dart 1 / Rust 1 / Shell 1 / Kotlin 1 / C 1 / 无语言 2。

## 2026-08-23 · AI/agent/LLM 热门

### 核心信号

- **ShadowAqueduct/watermark-remover 以 759⭐ 登顶**，与第二名（73⭐）拉开 10 倍量级断层；这是个针对多厂商（Claude / Gemini SynthID-Text / OpenAI / Kirchenbauer / Aaronson）AI 出处标记的"剥离器"，覆盖文本层 A/B + 14 类文件格式的 C2PA / XMP / EXIF 清理，是当日最显著的"反溯源"信号
- **agent / MCP / 设计skill 三赛道合占 Top 15 中的 8 席**（含 #1 设计skill、#3 #8 #10 #11 agent、#12 #14 MCP），其余被 iOS 阅读器、Mac 反编译、本地视频库、ESP32 抄表挤占；agent 仍是单日产出最稳的赛道
- **Top 15 全部为新上榜，掉出 15 条**：与 2026-08-22 日榜相比，22 日榜单上的 15 条全部掉出（含 Zig 写的 x64dbg-MCP 496⭐、scroll-craft 400⭐、biosecurity-agent 320⭐、Rust 写的 eidos 文件索引 164⭐、韩语 solo-skills 158⭐ 等），本期 15 条全为新进；22 日本身是首期快照，所以"掉出"等于"无连续在榜"
- **全榜 11⭐ 仍能进 Top 15**，#15 musichen/claude-code-cheat-sheet 仅 11⭐，说明日档阈值被进一步压低；前 5 名均≥41⭐，#1 与 #2 之间的断层（759 vs 73）让 Top 5 形成"1 + 4"的两段结构
- **同生态压缩**：本期无明显"单生态霸榜"现象，#10 Hermes Console 是 Hermes Agent 的 Android Flutter 客户端，#12 cbmman 是 Codebase-Memory-MCP 的 TUI 管理器，#14 LoverConnect 是 Android 端 MCP 工具，但都不像 22 日 scroll-craft / kgoedecke/doop / Cripacx/mediagen 那种"Claude Code 设计 skill 一条街"

### 重点深挖 Top 5

#### 1. [ShadowAqueduct/watermark-remover](https://github.com/ShadowAqueduct/watermark-remover) ⭐759

**仓库元数据**：Python 3.10+ 单仓 / size 1803 KB / 9 个 topic（`watermark` + `claude-ai` / `claude-code` / `claude-code-plugin` / `claude-skills` / `codex` / `codex-cli` / `codex-skill` / `codex-skills`），最新 release v0.5.0；CI 在 GitHub Actions 跑通。仓库虽以 ShadowAqueduct 名义发布，但 README 徽章 CI / Releases / Stars 链接均指向 `guillaumemeyer/watermarks-remover`，说明实际项目名是 `watermarks-remover`（复数），是 ShadowAqueduct 作为作者挂的镜像或发布通道。

**README 提炼 5 条核心价值**：
1. **三层剥离模型**：Layer A 处理不可见 Unicode / bidi / tag 字符（确定性、无损、可校验）；Layer B 针对统计水印（token-sampling 类，如 Kirchenbauer green-list / keyed-Gumbel / Aaronson EXP）走 agent rewrite + 可选 `rewrite_text.py`，是 best-effort；文件层处理 C2PA / XMP / EXIF / doc props，覆盖 14 类容器格式（PNG / JPEG / WebP / AVIF / HEIC / BMP / GIF / TIFF / SVG / PDF / DOCX / XLSX / PPTX / EPUB / ODT / HTML / Markdown / MP4 / MOV / M4A / M4V / WAV / MP3 / FLAC）
2. **skill 与 service 分离**：skill 端不携带 Python 代码，只是发 HTTP 请求的薄客户端，agent host 不需要 Python 环境；所有重活在 `service/scripts/server.py` 跑（Python 3.10 stdlib 单进程 HTTP server），绑 loopback `127.0.0.1:8765`，可选 bearer auth
3. **Hook 自动化**：以 Claude Code 插件形式注册 `PostToolUse` hook 在 `Write|Edit|MultiEdit|NotebookEdit` 四个写文件动作上，自动调用 `hook_written_file.py`，默认 `check` 模式只报告不改，`clean` 模式直接改文件；pre-commit 也能挂同样的 hook
4. **PDF 是工程深坑**：README 明说 PDF 必须 `qpdf`（结构性 strip），单 exiftool 只能 incremental 留 recoverable bytes；嵌入图片里的元数据要 Ghostscript 兜底；soft-bound C2PA 与纯像素/音视频水印在 core 路径里**不解决**
5. **诚实声明**：README 明确"No tool can certify that a vendor detector will fail"，建议 Layer B 改写时用非来源模型以免重新打标，质量比卫生更重要时直接跳过 Layer B

**issue 原文 + 评论**：仓库当日尚未开放公开 issue（GitHub API 返回空 issues 数组），意味着 759⭐ 是在没有用户反馈通道的情况下"自然增长"，没有 ✅ 实战信号也没有 ⚠️ 争议信号可摘录；这个现象本身值得在"信号判断"里点出——一个能清理 AI 出处标记的工具，对作者而言**开放 issue 反而是高风险动作**，因为每条反馈都可能成为"它能干掉谁的水印"的反取证

**横向对比**：与同期 [feyzilim/clipfactory](https://github.com/feyzilim/clipfactory)（22 日榜 #12，已掉出 23 日）相比，后者是 AI 短视频生成（OpenAI / ElevenLabs / FFmpeg）；本仓库方向相反，是 AI 内容**剥离**链。其它类似项目如 [Microsoft Presidio](https://github.com/microsoft/presidio) 做的是 PII 识别与匿名化，颗粒度更粗且不支持 AI 出处标记；[C2PA 官方工具](https://github.com/contentauth/c2pa-rs) 是**加**C2PA 标签，本仓库是**拆**C2PA 标签，刚好镜像。在 agent skill 形态上，与同期 [scroll-craft](https://github.com/nateherkai/scroll-craft) 同属 Claude Code skill 风格（`install_skill.py --target`），但 watermark-remover 还多走了一步"hook 自动跑"，scroll-craft 全靠 agent 主动调

**信号判断**：
- 安全：**灰色**——README 自述"For privacy and hygiene on content you own"，明确限定是用户自有内容；但工具本身不强制权属校验，理论上可被滥用于"擦除他人作品的 AI 标记"，发布到 Claude Code plugin marketplace 后触达面大
- 实战：**强**——v0.5.0 已发布、有 CI、有 Docker（`make docker-core-build` / `compose --profile harness/heavy`）、可选 backend（reverse-SynthID / CtrlRegen / MarkLLM / MarkDiffusion / keyed-Gumbel），不是空壳
- 兼容：**广**——Claude Code（plugin marketplace + skill）、Cursor、Grok、Cowork、claude.ai / cloud 都能装
- 增长：**异常快**——单日 759⭐ 在日榜史上是头部量级，与 22 日榜首 x64dbg-mcp-server 的 496⭐ 相比又上一档
- 研究诚信：**良好**——README 没夸大、能做的说能做、不能做的（pixel/audio watermark）明说不在 core 范围

**适用场景**：**适合**：Claude Code / Cursor 用户想清理自己产出的 AI 文本/图片/文档的出处标记 · 文档作者需要在发布前剥离 SynthID-Text 这类 token-sampling 水印 · PDF 重处理（要装 qpdf + Ghostscript）· **不适合**：想干掉他人受版权保护内容的 AI 标记（合规风险）· 只想清理 EXIF 不需要 AI 水印剥离（直接 exiftool 更轻）

---

#### 2. PiLastDigit/Code-With-Claude ⭐73

**仓库元数据**：无 language / size 183 KB / topic 空 / `deep_ok=false`（按 rank.py 规则跳过详深挖，但保留表内位置）。描述写明：Anthropic 2026 年旧金山 "Code w/ Claude" 大会的全 19 场 talk 文稿转录，使用 Deepgram Nova-3 语音转写 + Gemini 做摘要。

**简评**：是个内容仓库（19 场会议文稿），不是工具；体量小、无语言、无 topic 是因为它是 markdown / 文本集合不是源码项目。73⭐ 在 2026-08-22 是无对标的情况下冒头，Anthropic 系内容热度仍稳。rank.py 标 `deep_ok=false` 是因为无 language + size<30KB 的判定，这里 size=183KB 实际不算极小，但 language 为空是事实——按规则不进详深挖。

**适用场景**：**适合**：Anthropic 大会现场未能参加的从业者 · 想快速过一遍 19 场演讲要点 · **不适合**：找可运行的代码框架（这仓库是会议文稿不是代码）

---

#### 3. [itshen/source-reading-methodology](https://github.com/itshen/source-reading-methodology) ⭐65

**仓库元数据**：Python（实际是 markdown + Python 工具链混合） / size 4558 KB / 10 个 topic（`agent-skills` / `ai-agent` / `ai-coding` / `claude-code` / `code-review` / `documentation` / `llm` / `methodology` / `source-code-reading` / `technical-writing`）。作者署名"洛小山 / @luoxiaoshan_ai"，版权属米羊科技（上海）有限公司，2026 年 MIT 授权。配套有 [在线样张](https://itshen.github.io/source-reading-methodology/) + [课程站 xueai.app](https://xueai.app/?from=source-reading-methodology)。

**README 提炼 5 条核心价值**：
1. **一句话内核**："让每一个技术论断都可回溯到源码的具体行"——所有规则围绕这条展开；AI 辅助读码的幻觉几乎必然（按文件名推测实现、按常见模式补全、把注释当代码行为），一旦掺入整份成果可信度归零
2. **四阶段流水线**：阶段一语料准备（锁版本、备对比语料、建 ripgrep 检索脚本）→ 阶段二大纲（回答"这门课要解答哪个问题" + 逐章源码锚点）→ 阶段三章节书稿（八段结构，每处论断带行号，机器校验）→ 阶段四成书（编成带封面封底的 HTML 书）；**严禁跳级**——没有阶段一的版本锚点，阶段三的行号三个月后全失效
3. **三件派活前的硬要求**：填好的写作规范（一个文件，不要口头补充）+ 那一章的大纲条目 + 全部语料绝对路径 + 校验命令（含"必须全绿才算交付"）；规范里每一处含糊都会变成 N 份不同理解
4. **逐字节校验器**：人工复核十万字行号不现实，靠先建校验器再批量生产；README 自报数据：32 章 / 20.8 万汉字 / 1270 处带行号引用（逐字节校验零编造零漂移）/ 32 页交互课页 / 18 条跨课互链
5. **三条 AI 自检信号**：① 上来就甩章节大纲=没读 ② 代码块没行号=没走规范 ③ 一口答应"32 章全写完"=没按 SKILL.md——README 给出反信号判定方法

**issue 原文 + 评论**：仓库当日 issues 数组为空（GitHub API 返回 0 条）；但 README 自己列了 29 条踩坑清单（`PITFALLS.md`），分类是真实事故不是合成——这点与多数 AI skill 仓库的"虚构 pitfalls"区分度高

**横向对比**：与 [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft)（22 日 #2，400⭐）相比，后者是 Claude Code skill 用于做 scroll-driven 网站，本质是"agent 操作浏览器"；本仓库方向不同——是"agent 读源码写书"，且自带**质量校验闭环**（逐字节行号校验）。在"AI 辅助读码"赛道上，方法论型仓库稀缺，多数项目是 LLM 微调或 RAG 检索；source-reading-methodology 的差异化在于**不训练模型只定规范**，让现成 LLM 走 SOP

**信号判断**：
- 安全：**良好**——纯方法论文档与模板，没运行时代码风险
- 实战：**强**——README 给出的 32 章 / 1270 处引用 / 逐字节校验零编造是有量化口径的真实成果，不是营销话术
- 兼容：**广**——Cursor / Claude Code / 任何遵循 skills 约定的 agent 都可挂；克隆后直接 symlink
- 增长：**稳**——65⭐ 在 agent-skills 类别里算中高位，与 22 日 solo-skills 的 158⭐ 同档但更专业向
- 研究诚信：**高**——每条数据都附了口径（"32 章正文 20.8 万汉字不含代码块与图，连标点空白算 58.1 万字符"），不是含糊的"完整体系"

**适用场景**：**适合**：要做 AI 源码精读课程 / 技术图书的作者 · 想让 AI 读陌生大仓时不被幻觉坑的工程师 · 想建立"每个论断可回溯"工作流的团队 · **不适合**：只想让 AI 解释某段代码（直接问 LLM 更快）· 完全没有源码精读目标的快速学习者

---

#### 4. [joeseesun/qmreader-ios](https://github.com/joeseesun/qmreader-ios) ⭐55

**仓库元数据**：Swift（SwiftUI）/ size 47039 KB / 7 个 topic（`chinese` / `ios` / `open-source` / `qiaomu` / `reader-app` / `rss-reader` / `translation`）。作者署名"向阳乔木 / Joe"，X 账号 `@vista8`，配套服务 `https://rss.qiaomu.ai`（独立站点）。CI 跑 iOS Build / iOS 17+ 部署目标 / SwiftUI UI / MIT License。

**README 提炼 5 条核心价值**：
1. **改写优先列表**：首页与频道只展示"已完成乔木改写"的文章——直接解决 RSS 阅读里"先闪英文原文再慢慢翻译"的等待焦虑；这是与多数 iOS RSS 阅读器最本质的差异点
2. **三层阅读模式**：原文 / 系统翻译（iOS 18+）/ 乔木改写之间自由切换；不是简单 i18n 而是三种语义层
3. **纸面级阅读体验**：15–24pt 字号 / 三档行距 / 三档页边距 / 五种背景（自动、暖纸、素白、护眼、深夜）；五款 OFL 中文字体（霞鹜文楷、霞鹜文楷 TC、朱雀仿宋、思源宋体、文津宋体）随 App 分发，字体卡片用对应字体渲染"山高水长"做即时预览——避免"设置显示已切换、正文仍然没变"的经典 bug
4. **辅助功能完整**：Dynamic Type / VoiceOver / Reduce Motion / 44pt 触控区——对中文长文阅读人群（视障、长辈）友好
5. **诚实限制**：不提供 App Store / 公开签名 IPA；系统翻译只在 iOS 18+；后端地址通过代码配置无 App 内自定义；五款字体约增加 45 MB 未压缩 App 体积——README 自报限制而非吹嘘

**issue 原文 + 评论**：仓库当日 issues 数组为空（GitHub API 返回 0 条）。验证数据 README 自报：`ReaderLogicTests: PASS` + Xcode 26.2 无签名构建 + Apple Development 真机签名构建 + 0.5.0 已装至 iPhone 15 Pro——属于"自测全绿、没开放社区反馈通道"的状态

**横向对比**：与 [Reeder](https://www.reederapp.com/) / [NetNewsWire](https://github.com/Ranchero-Software/NetNewsWire)（iOS RSS 老牌）相比，本仓库差异化是"中文改写优先"——前者都是英文原文 + 内置翻译引擎，qmreader-ios 是"先把英文改写成可读中文再呈现"。与 [luke321/vault-graph](https://github.com/luke321/vault-graph)（22 日 #10，81⭐）相比，后者是 Obsidian vault 图谱，本仓库是 RSS feed 改写——两者都是"非英文内容工作流"赛道，但目标场景不同。在 iOS 端 SwiftUI 阅读器上，qmreader-ios 的体积优势（SwiftUI 单仓、5 字体合 45 MB）比 Electron 系 hybrid app 更原生

**信号判断**：
- 安全：**良好**——MIT 代码 + OFL 字体，长按"加入乔木阅读"会把 URL 发到 QMReader 服务端抓取，README 提示"请不要提交私密链接"，边界清晰
- 实战：**强**——CI 通、真机装过、Xcode 26.2 无签名构建验证、单元测试 PASS
- 兼容：**窄**——iOS 17+ 起步，需要自己的 Apple Development Team 真机部署
- 增长：**稳**——55⭐，与同窗口其它 iOS / Swift 项目相比是头部
- 研究诚信：**良好**——README 列了 5 条已知限制，没夸大

**适用场景**：**适合**：中文长文阅读者（订阅英文 RSS 想跳过英文原文）· 有 Apple Developer 账号想自己签的开发者 · 想做"中文内容工作流"的运营者 · **不适合**：纯 App Store 用户（仓库不提供签名 IPA）· iOS 16 及以下设备（最低 iOS 17）· 不愿让 QMReader 服务端抓取链接的人

---

#### 5. [sqzw-x/amane](https://github.com/sqzw-x/amane) ⭐41

**仓库元数据**：Python（实际是 Python 后端 + 前端混合） / size 2673 KB / topic 空（自述"AI 时代的私人影库"）。GPLv3。配套有桌面应用（macOS / Windows 即下即用）+ Docker 部署，前端技术栈包含 uv / pnpm / just。

**README 提炼 5 条核心价值**：
1. **本地优先存储**：实时监控磁盘文件变化并自动刮削；持久化存储已获取数据；与依赖云端的 Plex / Emby 不同，amane 是"本地优先 + AI 增强"的私人影库
2. **多源择优**：聚合多个数据源元数据，逐字段择优——海报用 A 源、演员表用 B 源、剧情简介用 C 源，最终结果比单一源更准
3. **目录整理自定义**：用户自定义命名规则整理本地文件结构——这是 Plex / Jellyfin 长期缺的功能（它们倾向于强迫固定命名）
4. **图片增强**：内置超分工具优化低清海报图——老 DVD 抓的海报常是 480p，超分后才适合现代屏幕
5. **AI 智能助理**：自然语言检索片库（"找周星驰 90 年代的喜剧"）、批量整理、发起刮削——这一项把传统刮削工具与 LLM 接通，是"AI 时代私人影库"标语的核心

**issue 原文 + 评论**：仓库当日 issues API 返回 1 条：
- [#1 "添加媒体库的问题"](https://github.com/sqzw-x/amane/issues/1) — open · 💬2 — Windows 用户反馈"添加媒体库时，C 盘路径正常显示，但选 E 盘路径就提示 Internal Server Error"；操作系统 Windows、Amane 版本 0.4.0；issue body 用标准模板（"在提问之前..."、"操作系统版本"、"描述你的问题"），2 条评论里可能有作者或社区的排查反馈——意味着 amane 已经在公开接受 Windows 多盘符场景的问题反馈，作者有 issue 响应通道
- 这条 issue 是 ✅ 实战信号（真实用户碰到真实 Windows 路径权限问题）也是 ⚠️ 兼容性信号（多盘符场景未在 0.4.0 完整覆盖）

**横向对比**：与 [yoshiko2/Movie_Data_Capture](https://github.com/yoshiko2/Movie_Data_Capture) / [moyy996/AVDC](https://github.com/moyy996/AVDC)（README 自报"相关项目"）相比，这两个是命令行刮削工具、Python 脚本、无 GUI、面向"批量整理刮削好的文件"用户；amane 多一层 GUI + AI 助理 + 本地优先存储——目标是"不想碰命令行的影库爱好者"。与 Plex / Jellyfin / Emby 相比，amane 不做流媒体服务器（不向外推视频流），专注"刮削 + 整理 + 检索"，更接近 Kodi 的 metadata scraper 而非 full media server

**信号判断**：
- 安全：**良好**——本地优先、桌面应用、用户数据不出本机
- 实战：**中**——0.4.0 桌面应用已发，但 Windows 多盘符场景有未解决的 issue（[#1](https://github.com/sqzw-x/amane/issues/1)）
- 兼容：**中**——macOS / Windows 桌面 + Docker，Linux 部署未明列
- 增长：**快**——单日 41⭐，是个人项目的健康量级
- 研究诚信：**良好**——GPLv3 + 完整用户文档 + issue 通道开放

**适用场景**：**适合**：本地有大量影片文件需要整理的中度影迷 · 想用自然语言检索片库而非记忆文件路径 · 不想订阅 Plex Pass / Emby Premiere 的本地优先用户 · **不适合**：需要向多设备串流视频的家庭（amane 不做流媒体服务器）· 只想要简单刮削脚本的人（Movie_Data_Capture 更轻）

---

### 完整前 15 表

| # | ⭐ | Δ | 赛道 | 态 | 仓库 | 链接 |
|---|---:|---:|---|---|---|---|
| 1 | 759 | +759 | 设计skill | 新 | ShadowAqueduct/watermark-remover | [→](https://github.com/ShadowAqueduct/watermark-remover) |
| 2 | 73 | +73 | 其他 | 新 | PiLastDigit/Code-With-Claude | [→](https://github.com/PiLastDigit/Code-With-Claude) |
| 3 | 65 | +65 | agent | 新 | itshen/source-reading-methodology | [→](https://github.com/itshen/source-reading-methodology) |
| 4 | 55 | +55 | 其他 | 新 | joeseesun/qmreader-ios | [→](https://github.com/joeseesun/qmreader-ios) |
| 5 | 41 | +41 | 其他 | 新 | sqzw-x/amane | [→](https://github.com/sqzw-x/amane) |
| 6 | 37 | +37 | 其他 | 新 | b-nnett/grok-bot-0.18-reconstructed | [→](https://github.com/b-nnett/grok-bot-0.18-reconstructed) |
| 7 | 30 | +30 | 其他 | 新 | tobi/walgit | [→](https://github.com/tobi/walgit) |
| 8 | 27 | +27 | agent | 新 | yacine-baghli/DYB-Pro | [→](https://github.com/yacine-baghli/DYB-Pro) |
| 9 | 17 | +17 | 其他 | 新 | Colin0512/interview-assistant | [→](https://github.com/Colin0512/interview-assistant) |
| 10 | 16 | +16 | agent | 新 | xP3ta/hermes-console | [→](https://github.com/xP3ta/hermes-console) |
| 11 | 14 | +14 | agent | 新 | cua-lite/cua-lite | [→](https://github.com/cua-lite/cua-lite) |
| 12 | 13 | +13 | mcp | 新 | handyutils/cbmman | [→](https://github.com/handyutils/cbmman) |
| 13 | 13 | +13 | 其他 | 新 | epynic/MeterEye | [→](https://github.com/epynic/MeterEye) |
| 14 | 12 | +12 | mcp | 新 | AZHi-xinxin/LoverConnect-Enhanced | [→](https://github.com/AZHi-xinxin/LoverConnect-Enhanced) |
| 15 | 11 | +11 | 其他 | 新 | musichen/claude-code-cheat-sheet | [→](https://github.com/musichen/claude-code-cheat-sheet) |

注：本期 15 条全部为新上榜；2026-08-22 日榜 15 条全部掉出。

### 简评 6-15

**6. [b-nnett/grok-bot-0.18-reconstructed](https://github.com/b-nnett/grok-bot-0.18-reconstructed) ⭐37（TypeScript · 其他）**——非官方"源码导向重建"的 Grok Bot 0.18.0 macOS 应用；含 Electron / host / coordinator / local-execution 的可读 TypeScript 实现 + 确定性工具链把源码重新打成 macOS app；新增实验：跨 Cursor / Claude Code / Codex / OpenRouter 的 inference router、本地 Docker sandbox（替掉远程 box）、重建 settings 界面。**适合**：想做 Grok Bot 二开的开发者 · 想研究 Electron + MCP 桥接的工程师 · **不适合**：期待官方支持或未来版本兼容的人（项目明确锁 0.18.0）。

**7. [tobi/walgit](https://github.com/tobi/walgit) ⭐30（Rust · 其他）**——Rust 单仓项目，无 description、size 954 KB、topic 空、language=Rust；30⭐ 在没有 description 的情况下上榜，说明标题"walgit"（疑似 wal + git 组合）本身有吸引力。**适合**：想探索 Rust 写 git 工具的开发者 · **不适合**：信息太少，无法判断实质功能。

**8. [yacine-baghli/DYB-Pro](https://github.com/yacine-baghli/DYB-Pro) ⭐27（Python · agent）**——蛋白设计管线交给 Devin 自主循环：定目标、加序列，agent 返回排序后可直接下单的湿实验短名单；Devin 编排 specialist agent，结果提交到 version graph，下一轮读。**适合**：做 in-silico 蛋白设计的研究者 · 想用 Devin 替代人肉管线的生物团队 · **不适合**：单次实验、没耐心配置 Devin 的入门者。

**9. [Colin0512/interview-assistant](https://github.com/Colin0512/interview-assistant) ⭐17（TypeScript · 其他）**——面试与口试用的 AI 口语助手；size 640 KB 极小。**适合**：需要英文/技术面试口语陪练的人 · **不适合**：严肃招聘场景（合规与学术诚信风险）。

**10. [xP3ta/hermes-console](https://github.com/xP3ta/hermes-console) ⭐16（Dart · agent）**——Android 优先的 Flutter 客户端，对接自托管 Hermes Agent：聊天、Bots、Voice、远程控制；8 个 topic 全是隐私 / self-hosted / android / flutter。**适合**：在手机上操控自托管 Hermes Agent 的用户 · 偏好 Android 端的隐私优先 agent · **不适合**：iOS-only 用户。

**11. [cua-lite/cua-lite](https://github.com/cua-lite/cua-lite) ⭐14（Python · agent）**——"Computer-Use Agents Made Simple"；size 16383 KB 是 Top 15 第二大体量（仅次于 qmreader-ios），暗示有真实代码而非壳。**适合**：想做电脑使用类 agent（CUA）又不想从零搭框架的人 · **不适合**：只跑单次任务的小白用户（CUA 类工具学习曲线高）。

**12. [handyutils/cbmman](https://github.com/handyutils/cbmman) ⭐13（Shell · mcp）**——Codebase-Memory-MCP Manager 的 CLI TUI，交互管理 cbm 项目 / artifacts / server。**适合**：用 Codebase-Memory-MCP 的开发者想要 TUI 替代品 · 偏好 shell 而非图形界面 · **不适合**：没用过 cbm 的人（要先理解 cbm 概念）。

**13. [epynic/MeterEye](https://github.com/epynic/MeterEye) ⭐13（C · 其他）**——ESP32-CAM 摄像头读电表 LCD 数字（自写 7 段解码器，无 ML、无云端）；topic 含 `home-automation` / `iot` / `ocr` / `solar` / `energy-monitoring`。**适合**：想做家庭能源监控、太阳能监测的硬件玩家 · 不想上云、不想训 ML 的人 · **不适合**：电表 LCD 非标准 7 段布局的家庭（需要自己改解码器）。

**14. [AZHi-xinxin/LoverConnect-Enhanced](https://github.com/AZHi-xinxin/LoverConnect-Enhanced) ⭐12（Kotlin · mcp）**——LoverConnect 增强版 Android MCP 工具：手机状态感知、自愿安全位置播报、本地隐私保护。**适合**：想做 Android 端 MCP 工具的开发者 · 关注位置安全与隐私的家庭 · **不适合**：iOS 用户（Kotlin / Android only）。

**15. [musichen/claude-code-cheat-sheet](https://github.com/musichen/claude-code-cheat-sheet) ⭐11（无语言 · 其他）**——从第一条命令到高阶工作流的 Claude Code 实战速查表；size 1156 KB、无 topic。**适合**：刚装 Claude Code 想快速过一遍命令的小白 · 想留一份 cheat sheet 在手边的重度用户 · **不适合**：已经在用 Claude Code 的熟手（速查表内容对你已经是肌肉记忆）。

---

## 数据方法

- **窗口**：2026-08-23 UTC 单日（`created:2026-08-23..2026-08-23`），闭区间两端都含
- **关键词**：`(ai OR llm OR agent OR mcp OR assistant) in:readme`，5 槽位硬上限，泛词优先
- **排序**：stars 降序 + `rank.py` 剔除空壳/擦边（无 language + size<30KB 或 size<15KB + 空 language）后取前 15
- **来源**：GitHub Search API（`/search/repositories`）+ `~/.hermes/skills/gh-trending-watch/scripts/rank.py`（v6 终极过滤）；issue 调研走 GitHub REST API `repos/{owner}/{repo}/issues?state=all&per_page=10`
- **slug**：`github-trending-2026-08-23`（`daily.slug` 来自 `windows.py --route daily`）
- **深挖名单**：取 `rank.py deep_targets` Top 5（ShadowAqueduct/watermark-remover / itshen/source-reading-methodology / joeseesun/qmreader-ios / sqzw-x/amane / b-nnett/grok-bot-0.18-reconstructed）；#2 PiLastDigit/Code-With-Claude 因无 language 按 rank.py 规则跳过详深挖
- **对照上期**：2026-08-22 日榜（首期快照，全部 new）；本期 15 条全为新上榜，22 日 15 条全部掉出，star_delta 不可用（无连续在榜）
- **样本语言分布**：Python 5 / TypeScript 3 / Swift 1 / Dart 1 / Rust 1 / Shell 1 / Kotlin 1 / C 1 / 无语言 2
