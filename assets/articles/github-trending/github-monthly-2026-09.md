# GitHub 月榜 · 2026-09 · Jev/Laya 决策模型家族霸占 26% 席位 + Z.ai 官方下场做 Coding Agent Harness

> 数据口径：抓取 `2026-09-01..2026-09-30` 期间在 GitHub 上**新创建**、且 README 命中 `ai / llm / agent / mcp / assistant` 关键词的仓库，按当前总星降序取前 50。快照时间 `2026-10-01T01:11:01Z`。对照上期 [2026-08 月榜](https://icode.link/article/github-monthly-2026-08)（首期快照）：本期 50 条全部为「新上」，上月 50 条全部掉出——月榜「窗口内新创」特征明显。

## 核心信号

- **Jev / Laya 决策模型（System 1 typed decisions）单生态吃掉四分之一榜单**：50 条里有 [13 个项目](https://github.com/NandhaKishorM/laya) 围绕 TypeSafe 的「Jev」商业 API + 社区开源实现 [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya) 打转，覆盖模型本体（laya）、决策 head 替代（[jaredpalmer/kev](https://github.com/jaredpalmer/kev)、[TheoLeeCJ/SemIf-OpenJev](https://github.com/TheoLeeCJ/SemIf-OpenJev)、[TianyuCodings/NanoJev](https://github.com/TianyuCodings/NanoJev)、[deepopen-com/deepopen](https://github.com/deepopen-com/deepopen)）、运行时（[mizorewww/laya-mlx](https://github.com/mizorewww/laya-mlx)、[mizorewww/laya-coreml](https://github.com/mizorewww/laya-coreml)）、UI（[jev-chat/jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis)）、应用（[browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)、[tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction)、[dzhng/jevgrep](https://github.com/dzhng/jevgrep)、[jarrodwatts/jev-trader](https://github.com/jarrodwatts/jev-trader)）、资源聚合（[yibie/awesome-jev](https://github.com/yibie/awesome-jev)）。TypeSafe 的「决策模型」=「非自回归 System 1、typed choice/score/yes-no、100+ 语言、单次前向」架构，社区开源 Laya（Python / ModernBERT-large）复刻整套 API 后引爆平行生态。
- **Z.ai 官方下场做 Coding Agent Harness**：[zai-org/ZCode](https://github.com/zai-org/ZCode) 9 月 20 日发布，7253 星，49MB TypeScript monorepo 含桌面应用 / 浏览器 / 终端 Agent CLI 全栈，定位「Powerful, intelligent, extensible」，自带飞书社群 + Discord 频道。同月 NVIDIA 出 [NVlabs/SoL-Pi](https://github.com/NVlabs/SoL-Pi)（Scaling Auto-Research Loops）、Anthropic 出 [anthropics/commerce-agents](https://github.com/anthropics/commerce-agents)（购物 / 商户 agent 参考实现）。8 月 [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) 单家独大之后，9 月进入「多家模型厂商 / AI 公司同时下场做 harness」的窗口。
- **32000 星「生活指南 HTML 站」混入 AI 关键词顶榜首**：[eternity4719/HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter) 是一个 649 条建议的「中国大陆高性价比人生指南」静态 HTML 站点，因为 README 里提到「AI 助手 skill 支持 Claude Code 和 Codex」命中 `assistant` 关键词进入本榜，9 月 7 日创建，10 月 1 日已 32047 星。**注意点**：① `assistant` 关键词会拉进任何「声明支持 AI 助手 skill」的项目——非 AI 项目也可进榜；② 月内冲 3 万星配合 HTML 单一页面 + 飞书 / 即刻等渠道导量，单仓获客效率突破常规 GitHub 自然增长曲线。
- **Codex / Claude Code 派生 Skill 大批量上量**：[Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer)（主题输入 → 解说视频 skill）、[jtydhr88/screenwriting-skills](https://github.com/jtydhr88/screenwriting-skills)（编剧 / 电视剧本 skill 集合）、[kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill)（ffmpeg 调用 skill）、[achimala/dream-loop](https://github.com/achimala/dream-loop)（3D Blender + 图像生成 skill）、[yang0/handraw-style](https://github.com/yang0/handraw-style)（手绘风格 prompt skill）等不下 8 个 Skill 类项目入围。其中 [yetone/magpie](https://github.com/yetone/magpie) 走得更远——「Every agent's model. One place. Codex on DeepSeek, Claude Code on Kimi」做 harness 间的模型路由，3781 星，是 8 月 DSH 时代 `dsh-routing-suite` 路线的延续。
- **「非纯 AI 工具」混入比例比 8 月高**：[robbietilton/Compositor](https://github.com/robbietilton/Compositor)（Mac 上的 Photoshop 替代）、[vinzdg/codenotch](https://github.com/vinzdg/codenotch)（macOS 顶部固定 Claude Code/Cursor/Codex 用量限速条）、[tobi/disktree](https://github.com/tobi/disktree)（Rust + GPUI 写的 Omarchy 磁盘占用可视化）、[Chuloo/mural](https://github.com/Chuloo/mural)（iPhone 上的语言学习 app）等都不是「纯 AI」，但 README 里提到「用 AI 增强 / 配套 AI agent」等被关键词命中。这反映：① 9 月开发者社区「AI 增强型传统工具」占比明显上升；② 关键词过滤的边界正在从「AI 主题项目」扩散到「AI 配套项目」。

## 重点深挖

### 1. [eternity4719/HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter) ⭐32,047

**一句话**：649 条「中国大陆高性价比人生指南」静态 HTML 站点，每条附成本/收益/证据等级，9 月 7 日建仓，10 月 1 日已 32047 星，是月榜 TOP1。

**元数据**：HTML · 11.6MB · CC-BY-4.0（正文）+ MIT（代码）· 上次推送 `2026-10-01` · 主页 [eternity4719.github.io/HowToLiveBetter](https://eternity4719.github.io/HowToLiveBetter/)。

**README 提炼**：
- **范围**：讲怎么活得久、急救、少花钱、避法律红线、失业与工伤、医保社保、恋爱婚育、怀孕育儿、创业与做平台合规、出国与技能，按中国大陆现行规定写。
- **证据驱动**：每条都写明花掉什么、换回什么、证据有多硬，来源只引期刊论文和官方文件。649 条里有 A 级 429 条 / B 级 171 条 / C 级 49 条，1528 条原始文献链接可验证。
- **在线检索 / AI 入口**：自带 HTML 在线检索页，提供 PDF / EPUB / 离线单文件下载，并明确支持 Claude Code 和 Codex skill（[skills/life-decision-guide/README.md](https://github.com/eternity4719/HowToLiveBetter/blob/main/skills/life-decision-guide/README.md)）—— **这正是命中 `assistant` 关键词的原因**。
- **作者姿态**：「这是按性价比排好的备选单,不是任务清单——挑走一两条就算数,作者自己也没做到其中大部分」。

**Issue 信号**（7 条,前 5 摘要）：
- **#60 closed** 用户 `euiwpoi`：补一条「给个人干活（对方没有营业执照）拿不到钱,走哪条路」—— 现有第 7 节第 2 条「被欠薪先投诉劳动监察,再申请劳动仲裁」隐含劳动关系前提,自然人雇主不构成劳动关系,应当走法院民事诉讼。
- **#58 closed** 用户 `dlgrv`：在 fork 完成巴西葡萄牙语（pt-BR）34 节全文翻译并上线检索页,建议本仓 README 增加 Português 链接。
- **#57 closed** 用户 `Andre1206`：建议在第 8~10 章增加约会安全相关内容（避免遭受强暴或其他暴力 / 避免事后诬告）。
- **#56 open** 用户 `albert4719`：从 `95611f7` 起本仓许可证改为「正文 CC BY 4.0 + 代码 MIT」,原因：书里法条 / 补贴标准 / 截止日期经常更新,希望转载的地方带上出处,读者能顺着链接找回最新版。已按 Unlicense 拿走的版本不受影响。
- **#55 closed** 用户 `lingmeng-658`：Codex 安装说明过时——把 `~/.codex/prompts/life-decision-guide.md` 改成 `~/.codex/skills/life-decision-guide/SKILL.md` + `$life-decision-guide` 调用。

显示本仓虽然「不是 AI 项目」,但 issue 区已经有真实用户反馈（包括法律细节修订建议 + 多语种翻译协作 + 协议变更说明 + AI skill 安装说明失效）—— **issue 区活动模式像传统开源内容仓,不像 AI 项目**。

**横向对比**：
- 对比 [firecrawl/anydoc](https://github.com/firecrawl/anydoc)（8 月榜第 4 名）：两者都把「内容 → 可被 LLM 消费」做到位—— HowToLiveBetter 是「生活知识 → AI skill 可调用」,anydoc 是「办公文档 → Markdown → 喂给 LLM」。**深度逻辑相同,深度模式都是「AI 增强型知识仓」**,只是知识来源不同。
- 对比 [KKKKhazix/AIHOT](https://github.com/KKKKhazix/AIHOT)（本月第 13）：两者都是「自动整理行业知识」—— HowToLiveBetter 是「人整理好生活知识让 AI 取用」、AIHOT 是「AI 自动找热点写日报」,一条自上而下、一条自下而上。

**信号判断**：
- **增长**：🚀 极强。24 天 3.2 万星,但需注意飞书/即刻/小红书等中文社区导量作用。
- **兼容**：✅ HTML 静态站 + PDF/EPUB/HTML 单文件,跨平台零门槛。
- **实战**：✅ issue 区有真实法律细节修订反馈。
- **争议**：⚠️ 「生活指南」类型涉及医保社保法律红线,作者已明确「按中国大陆现行规定写」并给原始文献,但跨地区读者误用风险仍存在。
- **研究诚信**：✅ CC-BY-4.0 + MIT 双协议,作者署名清晰,每条都标证据等级。

**适用场景**：**适合**:中国大陆地区需要快速查「遇到某事怎么办」的个人 / 给父母长辈普及常识 / 作为 Claude Code / Codex skill 长期挂载 · **不适合**:海外地区读者直接套用（规则差异极大）、法律专业咨询场景（书是「备选单」不是「法律意见」）。

### 2. [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya) ⭐29,295

**一句话**：非自回归 System 1 决策引擎,单次前向、100+ 语言、typed choice/score/yes-no 三种问题,33ms 延迟,Apache-2.0。TypeSafe「Jev」商业 API 的开源复刻。

**元数据**：Python · 7.8MB · Apache-2.0 · topics 含 `decision-model` `jev` `modernbert` `multilingual` `routing` `typed-decisions` `zero-shot` · 上次推送 `2026-09-29` · 主页 [huggingface.co/convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya)。

**README 提炼**：
- **核心定位**：「System 1」非自回归决策模型——不生成文本,只输出「指定 schema 的结构化决策」,单次前向 33ms。
- **三问题类型**：`noul`（yes/no）、`choice`（多选）、`score`（评分）——同一次请求里多个问题共享输入文本但互不可见（架构上等价独立并行谓词）。
- **训练方法**：用 RLCD（Reinforcement Learning against strictly proper scoring rules）做校准,默认输出校准后的概率。
- **路由**：内置 Router 根据请求选最合适的 checkpoint（英语 / 多语种 / 任务类型）——和 laya-ai.com 推荐的 `laya-mlx` / `laya-coreml` 等本地运行时配套。
- **配套生态**：PyPI `pip install laya`、Colab、HuggingFace Model + Demo Space、中英文 README、dev.to 长文「I built non-autoregressive decision models a year ago then a frontier lab called it a...」。

**Issue 信号**（5 条,前 4 摘要）：
- **#782 open** 用户 `sh1man`：「Diarization ~10× slower after polyvoice 0.21 (tract embeddings, #358)」—— `#358` 把说话人嵌入从 ort 切到 tract 之后,说话人标签没变但 diarization 在 CPU 上慢了约 10 倍。复现条件：20 段 42 分钟标注录音 / 2–6 位说话人 / `--pool-size 1` / Ryzen 9 9950X3D。
- **#781 open** 用户 `rpriven`：`guard` 预设里的 `prompt_injection` 问题对「嵌入在普通文档中、目标为 AI 助手的指令」打分只有 0.00–0.30,全部低于 0.5 阈值,`jailbreak` 也未捕捉。给出一份 c011 等 3 条 case 的具体打分表。
- **#780 open** 用户 `krulama`：`load()` 不解析 Router 接受的 checkpoint 别名。`laya.load("typed-decisions")` 直接把别名透传给 `Agent` 当 Hub repo id,报 `RepositoryNotFoundError: 401`。`laya/agent.py` 里 `load()` 把 `model_id_or_path` 直接传走,`subfolder` 没传。
- **#779 open** 用户 `smoyer64`：改变 `criteria` 字典顺序会改变 `choice` 结果—— `criteria` 在架构上是独立并行谓词,不该有时序交叉注意力,这是和 Jev 不兼容的设计点。表示「awesome OSS project, my Python is very rusty, so I'm not sure how much I can help beyond filing concrete bug reports」。

issue 区**不是空洞的「Star and fork」刷量**——有具体的 benchmark 复现条件、复现脚本、架构性 bug 报告,作者对此前的 PR #358 还能给出 commit 编号。这显示 laya 至少有「核心用户在小范围真用、且愿意提具体 issue」的社区。

**横向对比**：
- 对比 [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)（本月第 3）：两者都用 Jev 做核心决策,但 laya 是开源 Python SDK、jev-ultrafast 是 browser-use 自家闭源 API + 集成层。**深度差异**：laya 偏底层模型 + 多语种 + 决策 head、jev-ultrafast 偏 Web agent 应用层 + 操作空间索引化。
- 对比 [jaredpalmer/kev](https://github.com/jaredpalmer/kev)（本月第 5）：kev 是 Qwen3.5/3.8 上 fine-tune 的 Jev-类决策模型家族（0.8B / 4B / 9B / 27B）,API 跟 TypeSafe System One 兼容。两者都「开源 Jev 复刻」,laya 是从零设计、kev 是基于大模型 fine-tune。

**信号判断**：
- **增长**：🚀 极强。13 天 2.9 万星。
- **兼容**：✅ Apache-2.0 + HuggingFace + PyPI,跨语言跨平台。
- **实战**：✅ issue 区有真实用户具体 bug 报告。
- **争议**：⚠️ 「我一年前做了这件事现在 frontier lab 把它叫 Jev」的话术有自我营销嫌疑,但项目本身技术扎实。
- **研究诚信**：✅ Apache-2.0 + 论文级 README + HuggingFace 上有可验证的 eval suite 复现。

**适用场景**：**适合**:需要「单次决策」的场景（路由 / 分类 / 评分 / yes-no）/ 多语种 zero-shot 分类 / 不需要生成长文本的中间决策环节 · **不适合**:开放式对话、生成长文本、需要 chain-of-thought 推理的场景——这类仍用 LLM。

### 3. [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast) ⭐21,579

**一句话**：browser-use 与 TypeSafe 合作的 web agent,核心动作决策由 Jev 完成、文本生成由小 LLM 兜底,Zürich → London 的 Google Flights 实际跑通 7.1 秒。

**元数据**：Python · 4.4MB · MIT · 上次推送 `2026-09-30` · 主页 [browser-use.com](https://browser-use.com) · open_issues=173 · forks=1512。

**README 提炼**：
- **核心创新**：「动态索引化 action space」—— 每次观察产生一张新的元素表（带 `[1] button · Change ticket type · Round trip` 这类序号+类型+标签的列表）,TypeSafe 的 Jev 选 operation 和 target,只有 `TYPE_TEXT` 操作时才调用小 LLM 生成文本。
- **速度实证**：README 给出「Zürich → London 在 Google Flights 7.1 秒」实测 + demo GIF + MP4 + 性能文档,显示是**真实跑通的速度数据**,不是理论值。
- **操作集合**：`CLICK` / `TYPE_TEXT` / `SELECT` / `SCROLL_UP` / `SCROLL_DOWN` / `WAIT` / `DONE` / `BLOCKED`,只暴露操作支持的目标——避免 LLM 幻觉式操作。
- **闭环控制**：循环 = 「页面 → 元素表 → Jev 选 operation/target → 仅在需要时小 LLM 写文本 → 浏览器执行」。
- **商业意图**：README 顶部明示「The Browser Use Cloud waitlist is open. Get early access to ultrafast browser agents in the cloud.」—— 这是「开源做技术背书 + 闭源做云服务」的标准 SaaS 路径。

**Issue 信号**（1 条）：
- **#177 open** 用户 `weixiongf`：发布了一份第三方 AI-assisted 分析报告 [Open Source Alpha Reports](https://weixiongf.github.io/Open-Source-Alpha-Reports/reports/2026/09/29/jev-ultrafast/report.html),观察项目以极紧凑代码量（约 2,032 行）吸引 ~18k stars,认为主要价值在「interface/API 设计」而非「仓库实现」。明确说「This is research reference only and not an endorsement or promotion」。

issue 区只有 1 条,且这条是「别人发了一份独立分析报告过来报备」——**issue 区冷清,显示「实操用户还没形成社区反馈循环」**。173 个 open_issues 是来自 GitHub API 的当前 open 数,不是 issue 抓取看到的最新 10 条;snapshot 拉到的最新 10 条全是最近一周,核心区只有 1 条,意味着仓库热度主要由 star 推动,**用户实际跑通 + 反馈的活跃度还跟不上**。

**横向对比**：
- 对比 [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya)（本月第 2）：见上条。
- 对比 [vercel-labs/fx](https://github.com/vercel-labs/fx)（8 月榜第 29,Zig 写的 Unix-like coding agent）：两者都是「agent + 决策解耦」的路线,但 jev-ultrafast 用 Jev 决策、用浏览器执行;fx 是用 Zig 直接做 shell 操作、决策与执行都内嵌。

**信号判断**：
- **增长**：🚀 极强。15 天 2.1 万星。
- **兼容**：✅ MIT + Python + 跨平台浏览器 agent。
- **实战**：⚠️ README 自证 demo + 实测数字漂亮,但 issue 区缺用户实战反馈。
- **争议**：⚠️ 「2,032 行代码 + 18k stars」是第三方分析指出的潜在异常——技术价值在 API 设计不在实现,意味着 fork / 二次开发门槛低但护城河也低。
- **研究诚信**：✅ MIT + 官方团队 browser-use + 真实 benchmark 数据。

**适用场景**：**适合**:需要 web 自动化但不想自己写 browser agent 的工程师;想试用 Jev 决策模型做端到端任务的 · **不适合**:对响应延迟不敏感、对运营成本敏感度低的场景（直接用 Playwright + LLM 也行）。

### 4. [lnkiai/m3e-canvas](https://github.com/lnkiai/m3e-canvas) ⭐8,497

**一句话**：浏览器里画 Material 3 Expressive 风格界面草图,把草图转成 AI coding tool 可用的 vibe-coding prompt。

**元数据**：TypeScript · 9.4MB · MIT · topics 含 `design-tool` `material-3-expressive` `material3` `nextjs` `vibe-coding` · 上次推送 `2026-09-27` · 主页 [lnkiai.github.io/m3e-canvas](https://lnkiai.github.io/m3e-canvas/)。

**README 提炼**：
- **定位**：Material 3 Expressive（M3E）设计系统的浏览器内草图工具,Next.js 16 + React 19 + 无后端（数据存 localStorage）。
- **核心闭环**：用户在浏览器内 sketch → 链接 screen → 点击跳转 → 一键复制 prompt 给 Cursor / Claude Code / Codex 等 AI 编程工具。
- **M3E 一类**：Material 3 Expressive 是 Google 在 2025 年提出的设计语言,强调物理质感 + 动态形变 + 情感化微交互。topics 里强调 `material-3-expressive` 把它做成设计 skill 的细分入口。
- **商业闭环**：有 GitHub Sponsors 入口 + TrendShift「day #1」徽章 + 完整 demo 站。
- **跨端**：移动浏览器内可操作（issue 区有用户反馈 mobile 预览滚动受限,见 #450）。

**Issue 信号**（7 条,前 5 摘要）：
- **#450 open** 用户 `miaoledor`：内容超出屏幕高度时预览不可滚动——希望生成 prompt 时告诉 AI 工具「这部分要可滚动」,预览运行时也支持滚动容器。
- **#447 open** 用户 `laimour`：想要 SVG 导出——目前只有 PNG（位图）,但需要 Figma / Illustrator / Sketch 等设计工具里二次编辑,希望矢量导出。
- **#445 closed** 用户 `ctop007`：希望支持 2–4 列网格布局容器,用于商品/游戏目录 / 照片墙 / 仪表盘等重复内容场景。已被合并。
- **#443 open** 用户 `lnkiai`（作者本人）：右侧自定义面板（布局、导航）现状——过去两周逐步重构了 main 分支:每个 part 有独立面板（设计侧 + 触发侧）、screen 有 tabbed 面板、prompt 改为全屏编辑器而非侧栏面板。
- **#442 closed** 用户 `AminMusah`：希望把 prompt 下载为 .md 文件——目前只能 Copy,无法保存到工程 / commit 到 repo / 发给读文件的 coding agent。已被合并。

issue 区**很典型地展现了「活跃小项目早期迭代状态」**:有 UX 反馈（SVG 导出、滚动）、有功能请求（grid 布局）、有作者本人的工程进度同步,基本闭环。

**横向对比**：
- 对比 [yang0/handraw-style](https://github.com/yang0/handraw-style)（本月第 15,手绘风格 prompt 画廊）：两者都是「设计 → AI prompt」工具,但 m3e-canvas 偏交互式 sketch + 矢量结构、handraw-style 偏静态图片 + 双语 prompt 列表。
- 对比 [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer)（本月第 31,topic 输入 → 解说视频 skill）：两者都是「AI 编程工具上游 skill 工厂」,m3e-canvas 是 UI 草图生成 prompt、anything2explainer 是主题生成解说视频脚本。

**信号判断**：
- **增长**：🚀 强。25 天 8.5k 星 + TrendShift day #1。
- **兼容**：✅ Next.js + React,跨平台浏览器内可用。
- **实战**：✅ issue 区有 UX / 功能 / 工程进展三类真实反馈。
- **争议**：✅ 无。
- **研究诚信**：✅ MIT + 活跃作者 + 透明 issue 同步。

**适用场景**：**适合**:Material 3 Expressive 风格的 UI 草图师 / 想用 AI coding 工具直接产出 UI 的产品经理 / 没有 Figma 订阅但想做 UI 评审 · **不适合**:需要精细矢量编辑的场景（m3e-canvas 偏草图 + prompt 导出,不是设计完成工具）。

### 5. [jaredpalmer/kev](https://github.com/jaredpalmer/kev) ⭐8,066

**一句话**：在 Qwen3.5/3.8 上 fine-tune 的 Jev-类决策模型家族（0.8B / 4B / 9B / 27B）,API 兼容 TypeSafe System One,本地可训练可跑。

**元数据**：Python · 168MB · Apache-2.0 · topics 含 `decision-model` `jev` `qwen3` · 上次推送 `2026-10-01` · open_issues=29 · forks=511。

**README 提炼**：
- **定位**：「Small Jev-like decision models you can train and run yourself」—— 基于 [Jev's Architecture Unmasked](https://archerhume.com/posts/jevs-architecture-unmasked) 这篇博客,自己实现的小型决策模型家族。
- **模型族**：提供 0.8B / 4B / 9B / 27B 四档预训练权重（HuggingFace collection）。
- **API 兼容**：与 TypeSafe 的 [System One](https://docs.typesafe.ai/api) 兼容,TypeSafe Python SDK 可直接指向本地 kev server。
- **核心能力**：yes/no（`noul`）/ 多选（`choice`）/ 评分（`score`）三类问题,默认输出校准后的概率。

**Issue 信号**：0 条——在 8k 星量级下保持 0 issue 是异常信号。可能因为：① 项目还很新（9 月 17 日建仓）社区还没进入提 issue 节奏；② 仓库主要分发在 HuggingFace（模型权重）+ dev.to / Medium（教程）渠道,issue 区没形成习惯；③ 用户集中在 HuggingFace Space 上试用而非本地 build。

**横向对比**：
- 对比 [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya)（本月第 2）：见上条。
- 对比 [mizorewww/laya-mlx](https://github.com/mizorewww/laya-mlx)（本月第 10）：laya-mlx 是 laya 的 Apple Silicon MLX 运行时,kev 是另一套基于 Qwen 的决策模型。两者都「Jev 决策模型的开源实现」,但 laya 系列围绕 NandhaKishorM 的 ModernBERT-large + Apache-2.0,kev 围绕 Qwen3.5/3.8 + Apache-2.0。

**信号判断**：
- **增长**：🚀 强。14 天 8k 星。
- **兼容**：✅ Apache-2.0 + HuggingFace weights + 本地可跑。
- **实战**：⚠️ issue = 0 异常,需要后续跟踪。
- **争议**：⚠️ 「Jev-类决策模型」+「基于 Qwen3.5/3.8」表述存在蹭 Qwen 流量的嫌疑,且 168MB 体积异常大（远高于纯决策 head 模型的合理体积,可能是带上了大模型基础权重）,需要看实际下载量与真实使用情况。
- **研究诚信**：✅ Apache-2.0 + HuggingFace + frozen eval suites 可复现。

**适用场景**：**适合**:需要在 Qwen 生态里集成决策能力的工程师;想要本地可控的决策模型 · **不适合**:纯 CPU / 低资源场景（0.8B 起步仍比 laya 421M 的 ModernBERT-large 重）。

### 6. [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) ⭐7,261

**一句话**：Claude Code 插件,把 context compaction 的「总结」换成「Jev 决策」—— 每条 tool call / result 用一次 Jev 请求打分,陈旧的删/截,保留下来的原文逐字保留。

**元数据**：TypeScript · 245KB · MIT · 上次推送 `2026-09-18` · open_issues=101 · forks=470。

**README 提炼**：
- **痛点**：当前 context compaction 让 LLM 对历史轮次做摘要,摘要会丢路径、错误、约束、命令—— 哪怕这些信息后面有用。
- **创新**：插件从不改写任何内容,只删 Jev 说「不再需要」的 tool_use / tool_result。用户 / 助手文本逐字保留且保持顺序。
- **算法**：把整段对话塞给 Jev（工具结果替换为「ok, 4213 chars (omitted)」短注）,按 25k 状态 token 预算分阶段裁剪—— tool inputs 先截 1000→200→60、长文截 head+tail、最早非 pinned 消息折叠、call-only 消息折叠成一行 `t12 Read file_path=src/a.ts → ok 480ch`。
- **两种形态**：既可作为 npm 库（`src/`）使用,也可作为 Claude Code 插件（`hooks/` + `.claude-plugin/`）替换 Claude Code 内置的 compaction。

**Issue 信号**（2 条）：
- **#115 open** 用户 `ttsoares`：feature request「How to adapt this use with Laya (the Open Source jev)」—— 引用 medium 文章 [what-is-laya-laya-vs-jev-with-live-demo-42c2ab494e02](https://medium.com/@visrow/what-is-laya-laya-vs-jev-with-live-demo-42c2ab494e02) 说明 Laya 跟 Jev 的关系：Laya 是开源非自回归决策模型,Jev 是 TypeSafe 闭源 API（同一架构但闭源）。希望插件支持用 Laya 替代 Jev。
- **#114 open** 用户 `stalexxx`：用 OpenRouter API key 配插件（v0.3.0）后每次 compaction 都 fallback 到内置 summary,报错 `Jev request failed (401): authentication_error`。查源代码发现：key 只从 `apiKey` option / `TYPESAFE_*` env 读,不读 OpenRouter。

issue 区显示**用户对「Jev → Laya」迁移有明确需求**——这跟 NandhaKishorM/laya 的 Apache-2.0 开源定位形成正反馈闭环:Laya 越成熟,fast-jev-compaction 这种上游应用就越有替代 Jev 的可行路径。

**横向对比**：
- 对比 [dzhng/jevgrep](https://github.com/dzhng/jevgrep)（本月第 39,「用 Jev 找代码」CLI）：两者都把 Jev 作为「决策模块嵌入到开发工具」,fast-jev-compaction 嵌入 Claude Code 的 compaction、jevgrep 嵌入 grep 替代。
- 对比 [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)（本月第 3）：两者都「Jev 在产品里做决策」,但 jev-ultrafast 是浏览器操作、fast-jev-compaction 是 context 管理。

**信号判断**：
- **增长**：🚀 强。1 天 7k 星（pushed=2026-09-18,创建也是 2026-09-17）,超短周期爆发。
- **兼容**：✅ MIT + npm 库 + Claude Code 插件,跨形态可用。
- **实战**：✅ issue 区有「替代 Jev 用 Laya」+「OpenRouter 接入失败」两类实战反馈。
- **争议**：⚠️ 1 天 7k 星的爆发速度 + 极小体积（245KB）容易被怀疑为刷量,但 issue 区具体 bug 报告 + 配套算法文档扎实,信号不像纯刷量。
- **研究诚信**：✅ MIT + 算法说明透明 + issue 区用户反馈具体。

**适用场景**：**适合**:用 Claude Code 做长任务、希望压缩 context 时不丢关键信息 · **不适合**:context 不长的小任务（compaction 不是必要步骤）/ 不用 Claude Code 的用户。

### 7. [zai-org/ZCode](https://github.com/zai-org/ZCode) ⭐7,253

**一句话**：Z.ai 官方 9 月 20 日发布的 Coding Agent Harness,49MB TypeScript monorepo 含桌面 / 浏览器 / 终端 Agent 全栈,定位「Powerful, intelligent, extensible」。

**元数据**：TypeScript · 49MB · Apache-2.0 · 上次推送 `2026-09-29` · open_issues=11 · forks=2201 · 主页 [zcode.z.ai](https://zcode.z.ai/)。

**README 提炼**：
- **产品形态**：「AI 编程工作台」= 桌面应用 + 浏览器界面 + 终端 Agent,本仓包含客户端、后端服务、共享 UI、Agent CLI 与运行时源码。
- **版本节奏**：9-23 升级至 v3.14.3,显示高频迭代。
- **依赖锁定**：Git、Node.js 24.14.0、pnpm 10.33.2 版本由 [mise.toml](mise.toml) 统一锁定——避免多开发者多 Node 版本差异。
- **构建入口**：`pnpm bootstrap`（装依赖 + 准备桌面资源 + build:bootstrap）/ `pnpm dev:desktop`（默认生产服务配置 + Electron + 源码监听）/ `pnpm prepare:remote-assets`（远程资源）/ `pnpm build`（递归 workspace 构建）。
- **数据目录**：`ZCODE_DATA_BASE_DIR` 环境变量自定义数据目录,支持 macOS/Linux/Windows 三端。
- **社区入口**：飞书社群 + Discord 双入口,中英文 README。

**Issue 信号**：0 条——和 [jaredpalmer/kev](https://github.com/jaredpalmer/kev) 类似,在 7k 星量级下保持 0 issue。Z.ai 是国内知名 AI 公司（自研 GLM 系列）,ZCode 是其 Coding Agent Harness 官方仓,但 issue 区 0 条说明目前 issue 反馈可能集中在飞书社群 / Discord / 官方论坛,GitHub issue 区还没成主反馈渠道。

**横向对比**：
- 对比 [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)（8 月榜第 1,20 万星）：两者都是「模型厂商官方下场做 Coding Agent Harness」—— DeepSeek 走「Everything is a Plugin + cordis IoC」路线,Z.ai 走「桌面/浏览器/终端全栈 monorepo」路线。**深度差异**:DSH 把插件抽象推到极致,核心运行时只做 IoC + 事件总线;ZCode 是「一体化产品」路线,所有形态在一个仓内 monorepo 管理。
- 对比 [CopilotKit/openmuse](https://github.com/CopilotKit/openmuse)（本月第 17,「有浏览器/终端/文件/可长时工作的个人 agent」）：openmuse 是 CopilotKit 团队的 agent harness,跟 ZCode 形态相似（个人 agent + 多端 + 长时任务）,但 openmuse 更强调 CopilotKit 自家 SDK 集成。

**信号判断**：
- **增长**：🚀 强。9 天 7k 星。
- **兼容**：✅ Apache-2.0 + 三端 + Node 24 + pnpm 10.33。
- **实战**：⚠️ issue = 0 异常,反馈在飞书 / Discord。
- **争议**：✅ Z.ai 官方出品,团队署名清晰。
- **研究诚信**：✅ Apache-2.0 + 官方团队 + 完整 monorepo。

**适用场景**：**适合**:在国内用 GLM 系列模型、需要桌面 + 终端一体化 AI 编程体验的工程师 · **不适合**:海外用户 / 不想锁定特定模型生态 / 偏好极简 CLI 的开发者。

### 8. [jev-chat/jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis) ⭐7,181

**一句话**：Android 端的「Jev 对话副驾」—— 在 QQ / X / 飞书里读懂对方、给出候选回复、一键填入输入框;非侵入,只读屏幕,不 hook 不改包。

**元数据**：Kotlin · 46.6MB · MIT · topics 含 `accessibility-service` `ai-assistant` `android` `chat-assistant` `chat-copilot` `llm` `ocr` `qq` · 上次推送 `2026-09-29` · 主页 [chatjevs.com](https://chatjevs.com) · open_issues=29 · forks=1215。

**README 提炼**：
- **产品形态**：「Jev 对话副驾」Android 应用,基于 Android Accessibility Service + OCR + LLM,在支持的平台分析聊天给出回复建议,**发送由用户决定**——不是自动回复 bot。
- **跨端**：Android / Windows / macOS 三端,Windows 在 [jev-chat/jev-chat-windows](https://github.com/jev-chat/jev-chat-windows),macOS 在 [jev-chat/jev-chat-jarvis-mac](https://github.com/jev-chat/jev-chat-jarvis-mac)。
- **非侵入**：「不 hook 不改包」—— 通过 Android Accessibility Service 只读屏幕,不动其他 App 的代码,合规风险低。
- **平台覆盖**：QQ / X / 飞书等「明文聊天」场景,微信因 Android 端微信的特殊安全策略不支持（issue #65 已澄清）。
- **变现**：「❤️赞助商」公开区域 + Sponsors 入口 + 公众号 + 交流群。

**Issue 信号**（4 条,前 4 摘要）：
- **#72 open** 用户 `gialoc668`：下载安卓版本提示 Not Found,不知道什么问题。
- **#69 open** 用户 `shuli083`：希望增加指定哪些群 / 哪些人可以对话、屏蔽哪些群 / 哪些人的功能——目前是全量分析所有会话。
- **#67 closed** 用户 `xqzq`：在微信打开没有悬浮窗—— 显示微信 Android 端确实未支持。
- **#65 closed** 用户 `Snowwit88`：文档纠正——「README 的平台支持表把『桌面端 / 网页』合写为『规划中』,但同一页已链接独立的 macOS 和 Windows 项目,容易让读者误以为这两个版本还未提供」。已合并到 PR。

issue 区**典型地展现了「C 端工具的真实用户反馈模式」**:下载链接失效、灰度需求（指定群 / 人）、平台兼容性（微信不支持）、文档不一致。**全是用户真实使用中撞到的具体问题**,不是刷量项目那种空洞反馈。

**横向对比**：
- 对比 [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer)（本月第 31）：两者都是「LLM 增强型输入辅助」,jarvis 偏「读对方消息 → 候选回复」,anything2explainer 偏「输入主题 → 输出解说视频脚本」。
- 对比 [KKKKhazix/human-writing](https://github.com/KKKKhazix/human-writing)（8 月榜第 19）：两者都「让 AI 输出像人写的」,但 human-writing 是「让 AI 生成内容不像 AI」、jarvis 是「让 AI 给候选回复 + 发送由人决定」。

**信号判断**：
- **增长**：🚀 强。8 天 7k 星。
- **兼容**：✅ Android 11+ ARM64 / Windows 10 1903+ / macOS 13+ Apple Silicon。
- **实战**：✅ issue 区有真实用户反馈（下载链接 / 灰度需求 / 平台支持）。
- **争议**：⚠️ 工具天然有「对话辅助」vs「对话伪造」的边界争议,作者用「只读屏幕、发送由人决定」明确划线。
- **研究诚信**：✅ MIT + 三端独立仓库 + 隐私政策公开 + Sponsors 入口 + 主页文档完整。

**适用场景**：**适合**:QQ / X / 飞书重度用户,需要快速理解对方意图并组织回复 · **不适合**:微信用户（不支持）/ 对「读屏辅助工具有合规疑虑」的场景。

### 9. [robbietilton/Compositor](https://github.com/robbietilton/Compositor) ⭐6,694

**一句话**：macOS 上的开源「Photoshop 替代」,Swift 写,完整图层 / 蒙版 / 调整层 / 混合模式,定位「Photoshop 太贵、GIMP 不顺手,所以我自己写了一个」。

**元数据**：Swift · 4.7MB · MIT · 上次推送 `2026-09-29` · open_issues=51 · forks=687。

**README 提炼**：
- **作者原话**：「Adobe Photoshop costs too much and tools like GIMP don't feel familiar enough for me to stay in flow. That's why I built Compositor.」
- **目标场景**：合成 + 后期处理—— 围绕 Photoshop 工作流建,提供像素级精修所需工具。
- **功能完整度**：图层 + 文件夹 + 不透明度 + 完整混合模式（图层文件夹不透明度会衰减内部所有像素）、图层蒙版（可超出图层自身像素做模糊羽化）、裁剪蒙版 / 文件夹蒙版、调整层（Hue/Saturation、Levels、Curves、Exposure 等 13 类）、图层效果（Stroke、Drop Shadow 等 5 类 GPU 渲染）、合并（⌘E）、复制重命名重排嵌套、⌘C/⌘V 跨项目复制粘贴图层 / 文件夹。
- **下载**：Homebrew cask `brew install --cask robbietilton-compositor` + 主页 [robbietilton.com/compositor](https://robbietilton.com/compositor) + GitHub Releases。
- **开源策略**：可下载 Xcode 工程,自由增删修改任意功能以适配自己的工作流。

**Issue 信号**（1 条）：
- **#202 open** 用户 `Aeonitis`：「UI - Crop Buttons too far from related functionality」—— 贴了截图（1980×151）,觉得裁剪按钮可以左对齐,并提到「我画箭头时意识到可以引用 Apple Preview 裁剪做对比示例」。附带建议「是否缓存上次裁剪的尺寸」。

issue 区只有 1 条且是 UX 细节反馈——**在 6.7k 星量级下反馈偏少**。可能因为：① macOS 平台用户少（GitHub 整体 macOS 桌面应用反馈量小）;② Compositor 处于「Photoshop 替代」早期,核心功能优先,UI 细节暂缓;③ Homebrew cask 分发,大量用户从 cask 安装而非 source build,issue 反馈链路未建立。

**横向对比**：
- 对比 [vinzdg/codenotch](https://github.com/vinzdg/codenotch)（本月第 25,macOS 顶部固定 Claude Code/Cursor/Codex 用量限速条）：两者都是 macOS 实用工具,但 Compositor 偏图像编辑、codenotch 偏 AI 编程工具限速。
- 对比 [amagine-ai/Amagine3D](https://github.com/amagine-ai/Amagine3D)（8 月榜第 46,从硬件需求到可编辑 3D 设计）：两者都是「不直接生成,而是处理图像」的工具,但 Amagine3D 是从硬件需求到可编辑 3D 设计的全链路、Compositor 是图像编辑的 Photoshop 替代。

**信号判断**：
- **增长**：✅ 13 天 6.7k 星,在 macOS 工具里属中上。
- **兼容**：✅ Swift + macOS 原生,Apple Silicon 优化。
- **实战**：⚠️ issue 区反馈稀疏,核心用户主要在 Homebrew / 直接下载渠道。
- **争议**：✅ 无。
- **研究诚信**：✅ MIT + 作者本人建仓 + 完整文档。

**适用场景**：**适合**:macOS 用户想要 Photoshop 级别图像编辑能力、不想付 Adobe 订阅 · **不适合**:Windows / Linux 用户（仅 macOS）/ 需要高级色彩管理（专业印刷）的场景。

### 10. [mizorewww/laya-mlx](https://github.com/mizorewww/laya-mlx) ⭐6,659

**一句话**：Laya 决策模型在 Apple Silicon 上的 MLX 本地运行时,英文 13.4ms 中位延迟、多语种 7.4ms、零输出 token、不依赖 PyTorch / Transformers / 云 API。

**元数据**：Python · 5.9MB · Apache-2.0 · topics 含 `apple-silicon` `decision-model` `inference` `laya` `local-ai` `machine-learning` `mlx` `modernbert` `system-one` `typed-decisions` · 上次推送 `2026-09-22` · 主页 [pypi.org/project/laya-mlx](https://pypi.org/project/laya-mlx/) · open_issues=20 · forks=524。

**README 提炼**：
- **核心定位**：开源权重、typed decisions、Apple Silicon 本地原生 MLX 推理。
- **实测数据**：M3 Max 上英文短决策 13.4ms 中位、多语种 7.4ms；零输出 token；不依赖 PyTorch / Transformers runtime / 云 API。
- **可玩 demo**：内置 Snake demo—— GIF 是「原始速度的真实本地 Snake 运行」,每一步都调一次 Laya,内置 cycle safety 层可修正不安全动作。延迟数据来自「单问题 API benchmark」,不是 Snake 三问题循环的帧时间。
- **用法**：`pip install laya-mlx` → `laya_mlx.load("aac6fef/laya-mlx")` → `agent.predict(text, {"department": {"type": "choice", ...}})`。
- **环境约束**：macOS 14+ / Python 3.11+ / Apple Silicon,首次加载下载 checkpoint,后续完全本地推理。
- **配套**：中文 README + Benchmarks + Snake demo + HuggingFace 权重 + laya-coreml（同期姐妹项目，Core ML + Neural Engine 路径）。

**Issue 信号**（3 条,前 3 摘要）：
- **#21 open** 用户 `rbrus`：「Thank you for open-sourcing laya-mlx! + Built laya-as-judge (LLM-as-a-judge on MLX)」—— 分享基于 laya-mlx 的派生项目 [laya-as-judge](https://github.com/rbrus/laya-as-judge),把 typed decision heads（`score` / `choice` / `noul`）用作「LLM-as-a-judge」评估的本地替代—— 零 token overhead + 确定性输出。
- **#20 open** 用户 `ZLHAOOO`：「Chinese fine-tuned weights in MLX format — laya-mlx-zh (community)」—— 由 AI 数字伙伴「Fuyao（扶摇）」提交,把 `laya-multilingual` 在中文决策任务（消息路由 / 紧急程度 / 优先级 / 检索关键词）上做 fine-tune,从接近随机水平提升到 0.85–0.90（在自建 OOD eval 上）,M1 上 ~27ms。
- **#18 open** 用户 `xiaoyanng`：「laya-mlx is featured on laya-ai.com: please check the page for accuracy」—— 独立 laya-ai.com 资源站（非 Convai Innovations 关联）收录了 laya-mlx,整理了 README + benchmark 表 + Router / shortlist / CLI 特性,询问内容准确性。

issue 区**非常典型地展现「开源模型发布早期阶段」**:派生项目（laya-as-judge）、社区微调（laya-mlx-zh）、第三方资源收录（laya-ai.com）三类都齐—— **生态在自然长出来,不是靠作者主动运营**。

**横向对比**：
- 对比 [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya)（本月第 2）：见上条。
- 对比 [mizorewww/laya-coreml](https://github.com/mizorewww/laya-coreml)（本月第 49）：同一作者 mizorewww 的姐妹项目,laya-mlx 用 MLX、laya-coreml 用 Core ML + Neural Engine,定位互补。

**信号判断**：
- **增长**：🚀 强。3 天 6.7k 星,Apple Silicon 用户社区反馈速度快。
- **兼容**：✅ Apache-2.0 + PyPI + HuggingFace weights + Apple Silicon。
- **实战**：✅ issue 区有派生项目 + 社区微调 + 第三方收录三类生态信号。
- **争议**：✅ 无。
- **研究诚信**：✅ Apache-2.0 + 实测 benchmark + 完整 demo + Snake benchmark 文档。

**适用场景**：**适合**:Apple Silicon 开发者 / 需要本地快速决策（路由 / 分类 / 评分）的产品 · **不适合**:非 Apple Silicon 环境（走 PyTorch 版本 laya）/ 需要生成长文本的场景。

## 完整前 50 表

| # | 仓库 | ⭐ | 赛道 | 态 | 语言 | 一句话 |
|---:|---|---:|---|---|---|---|
| 1 | [eternity4719/HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter) | 32,047 | 其他 | 新上 | HTML | 649 条「中国大陆高性价比人生指南」HTML 静态站,附 Claude Code / Codex skill |
| 2 | [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya) | 29,295 | 模型 | 新上 | Python | 非自回归 System 1 决策引擎,typed choice/score/yes-no,100+ 语言,Apache-2.0 |
| 3 | [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast) | 21,579 | agent | 新上 | Python | browser-use × TypeSafe Jev 的最快最便宜 web agent |
| 4 | [lnkiai/m3e-canvas](https://github.com/lnkiai/m3e-canvas) | 8,497 | 设计skill | 新上 | TypeScript | 浏览器内 Material 3 Expressive 草图,转 vibe-coding prompt |
| 5 | [jaredpalmer/kev](https://github.com/jaredpalmer/kev) | 8,066 | 模型 | 新上·同生态 | Python | Qwen3.5/3.8 上的 Jev-类决策模型家族（0.8B/4B/9B/27B） |
| 6 | [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) | 7,261 | agent | 新上·同生态 | TypeScript | Claude Code 插件,用 Jev 决策替换 compaction summary |
| 7 | [zai-org/ZCode](https://github.com/zai-org/ZCode) | 7,253 | agent | 新上 | TypeScript | Z.ai 官方 Coding Agent Harness,桌面 / 浏览器 / 终端全栈 monorepo |
| 8 | [jev-chat/jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis) | 7,181 | 模型 | 新上·同生态 | Kotlin | Android「Jev 对话副驾」,在 QQ / X / 飞书里读懂对方给候选回复 |
| 9 | [robbietilton/Compositor](https://github.com/robbietilton/Compositor) | 6,694 | 其他 | 新上 | Swift | macOS 上的开源 Photoshop 替代 |
| 10 | [mizorewww/laya-mlx](https://github.com/mizorewww/laya-mlx) | 6,659 | 模型 | 新上·同生态 | Python | Laya 决策模型的 Apple Silicon MLX 本地运行时 |
| 11 | [Albert-Weasker/niubigeo](https://github.com/Albert-Weasker/niubigeo) | 4,866 | 其他 | 新上 | TypeScript | 开源 AI 品牌能见度与竞品报告 |
| 12 | [TheoLeeCJ/SemIf-OpenJev](https://github.com/TheoLeeCJ/SemIf-OpenJev) | 4,620 | 模型 | 新上·同生态 | Python | 「Semantic ifs」开源决策模型,3090 家用,独立于 TypeSafe |
| 13 | [KKKKhazix/AIHOT](https://github.com/KKKKhazix/AIHOT) | 4,100 | mcp | 新上 | TypeScript | 自找热点 + 自动写日报的网站框架 |
| 14 | [yi1108/printfilm](https://github.com/yi1108/printfilm) | 3,937 | 其他 | 新上 | Python | PRINTFILM：AI 视频获客与 AI 短剧创作平台 |
| 15 | [yang0/handraw-style](https://github.com/yang0/handraw-style) | 3,875 | 设计skill | 新上 | HTML | 手绘风格编号画廊与双语 prompt Skill |
| 16 | [yetone/magpie](https://github.com/yetone/magpie) | 3,781 | agent | 新上 | Go | 菜单栏统一调度「Codex on DeepSeek / Claude Code on Kimi」 |
| 17 | [CopilotKit/openmuse](https://github.com/CopilotKit/openmuse) | 3,464 | agent | 新上 | TypeScript | CopilotKit 团队「带浏览器 / 终端 / 文件的个人 agent」 |
| 18 | [NVlabs/SoL-Pi](https://github.com/NVlabs/SoL-Pi) | 3,222 | agent | 新上 | TypeScript | Scaling Auto-Research Loops for Efficient Agent Harnesses |
| 19 | [anthropics/commerce-agents](https://github.com/anthropics/commerce-agents) | 3,114 | agent | 新上 | Python | Anthropic 官方购物 / 商户 agent 参考实现 |
| 20 | [newliver666/apk-reverse](https://github.com/newliver666/apk-reverse) | 3,088 | 其他 | 新上 | Python | Android APK 反编译分析工具 |
| 21 | [Niko1221/Strata](https://github.com/Niko1221/Strata) | 3,085 | 模型 | 新上 | C++ | Qwen3.8-Flash-Next 消费级硬件一键安装(Windows / Linux) |
| 22 | [shadcn-ui/lint](https://github.com/shadcn-ui/lint) | 2,976 | 其他 | 新上 | TypeScript | shadcn-ui 团队的 agent-first linter,支持 Tailwind 设计系统规则 |
| 23 | [mcncarl/jianying-headless](https://github.com/mcncarl/jianying-headless) | 2,938 | agent | 新上 | Python | 剪映私有源码预览,headless 草稿 + 独立编辑 / 导出 |
| 24 | [jarrodwatts/jev-trader](https://github.com/jarrodwatts/jev-trader) | 2,709 | 其他 | 新上·同生态 | TypeScript | 每个 Monad 区块一次 AI 交易决策,Jev on Kuru MON-USDC |
| 25 | [vinzdg/codenotch](https://github.com/vinzdg/codenotch) | 2,634 | 其他 | 新上 | Swift | macOS 顶部固定 Claude Code / Cursor / Codex / Antigravity 用量限速条 |
| 26 | [Contrastive-LM/CLM](https://github.com/Contrastive-LM/CLM) | 2,619 | 其他 | 新上 | Python | — |
| 27 | [Rion-Wu-tech/wechat-intelligence-hub](https://github.com/Rion-Wu-tech/wechat-intelligence-hub) | 2,578 | 设计skill | 新上 | Python | Local-first 微信情报系统,只读 CLI + Codex skills + 可检索聊天 |
| 28 | [TianyuCodings/NanoJev](https://github.com/TianyuCodings/NanoJev) | 2,452 | 其他 | 新上·同生态 | Python | Jev 的 nano 复刻:并行决策 + 动态候选 + 端到端训练 |
| 29 | [Mantitup-Org/vista](https://github.com/Mantitup-Org/vista) | 2,384 | 其他 | 新上 | TypeScript | — |
| 30 | [qingjian-team/qingjian](https://github.com/qingjian-team/qingjian) | 2,334 | 模型 | 新上 | Rust | 青简 Qingjian:Rust 拼音输入法,候选词旁显示所学语言译词 |
| 31 | [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer) | 2,204 | agent | 新上 | TypeScript | 主题 → 解说视频脚本的 Claude Code / Codex skill |
| 32 | [Edge0-AI/Edge0](https://github.com/Edge0-AI/Edge0) | 2,151 | 其他 | 新上 | Python | — |
| 33 | [Taichu-AI/ZDTaichu5.0-9B](https://github.com/Taichu-AI/ZDTaichu5.0-9B) | 2,066 | 其他 | 新上 | Python | — |
| 34 | [unreallabsai/unreal-agent](https://github.com/unreallabsai/unreal-agent) | 2,040 | agent | 新上 | Go | Async-first agent harness |
| 35 | [yibie/awesome-jev](https://github.com/yibie/awesome-jev) | 2,033 | 其他 | 新上·同生态 | Python | Jev / TypeSafe 生态的精选项目 / 集成 / 讨论列表 |
| 36 | [tobi/disktree](https://github.com/tobi/disktree) | 2,009 | 其他 | 新上 | Rust | Omarchy 上的磁盘占用 treemap,Rust + GPUI |
| 37 | [feder-cr/dots](https://github.com/feder-cr/dots) | 1,933 | mcp | 新上 | Python | 开源「dots」:自带浏览器、不被屏蔽的 web AI agent |
| 38 | [tigerless-labs/agent-memory](https://github.com/tigerless-labs/agent-memory) | 1,921 | mcp | 新上 | Python | AI agent 长时记忆运行时,Markdown 为单一真值源 |
| 39 | [dzhng/jevgrep](https://github.com/dzhng/jevgrep) | 1,907 | agent | 新上·同生态 | TypeScript | 用 Jev 找代码的 CLI,给 coding agent 用 |
| 40 | [donvito/codex-astra-luna-orchestrator](https://github.com/donvito/codex-astra-luna-orchestrator) | 1,662 | agent | 新上 | Python | Codex 里用 Astra / Sol 做编排 + Luna 做 sub-agent |
| 41 | [QwenLM/Qwen-Image-2.1](https://github.com/QwenLM/Qwen-Image-2.1) | 1,653 | 模型 | 新上 | Python | Qwen 最强开源图像生成模型 |
| 42 | [deepopen-com/deepopen](https://github.com/deepopen-com/deepopen) | 1,623 | 模型 | 新上·同生态 | Python | 非自回归 System 1 决策引擎(中文社区版 / Laya 平行实现) |
| 43 | [achimala/dream-loop](https://github.com/achimala/dream-loop) | 1,610 | agent | 新上 | JavaScript | Blender + 图像生成 + sub-agent critic 的 3D 视觉 skill |
| 44 | [pallavi-shekhar/ai-engineering-interview-questions-company-wise](https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise) | 1,588 | 模型 | 新上 | Markdown | 顶级 AI 公司 AI 工程师面试 cheat sheet(按公司分) |
| 45 | [Chuloo/mural](https://github.com/Chuloo/mural) | 1,552 | 其他 | 新上 | Kotlin | iPhone 语言学习 app(native),「最后你会删掉的那种」 |
| 46 | [linguo2625469/workbuddy2api-panel](https://github.com/linguo2625469/workbuddy2api-panel) | 1,541 | 其他 | 新上 | Go | 腾讯 WorkBuddy 账号 → OpenAI 兼容 API 多账号网关 |
| 47 | [hydra-db/open-glean](https://github.com/hydra-db/open-glean) | 1,538 | 其他 | 新上 | TypeScript | 开源 AI 知识工作平台,接入应用、找答案、产出工作 |
| 48 | [mizorewww/laya-coreml](https://github.com/mizorewww/laya-coreml) | 1,530 | 模型 | 新上·同生态 | Python | Laya 决策模型的 Apple Core ML + Neural Engine 路径 |
| 49 | [jtydhr88/screenwriting-skills](https://github.com/jtydhr88/screenwriting-skills) | 1,468 | agent | 新上 | Python | 编剧 / 电视剧本 / 戏剧创作的 agent skill 集合 |
| 50 | [kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) | 1,443 | 设计skill | 新上 | Python | ffmpeg 调用的 agent skill |

## 数据方法

- **窗口**：`2026-09-01..2026-09-30` UTC,GitHub Search API `created:` 闭区间。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant` + `in:readme`,5 槽位硬限制。
- **排序**：按当前总星 `stargazers_count` 降序取前 100,再经 `rank.py` 剔除空壳 / 擦边后取前 50。
- **来源**：GitHub Search API 单一真值源,未使用 trending 页 / HN / Reddit 作为名单源。
- **深挖**：Top 10 拉取 issues / metadata / README 前 6000 字;11-50 仅 metadata + description。
- **同生态标注**：`Jev / Laya 决策模型家族`项目统一标 `新上·同生态`,共 13 条(laya / kev / jarvis / laya-mlx / laya-coreml / OpenJev / NanoJev / jev-trader / awesome-jev / jevgrep / deepopen / jev-ultrafast / fast-jev-compaction)。
- **对照**：与 [2026-08 月榜](https://icode.link/article/github-monthly-2026-08) 比较,本期 50 条全部为「新上」,上期 50 条全部掉出——月榜「窗口内新创」特征明显,环比无 staying 项。
- **slug**：`github-monthly-2026-09`(窗口月,非跑任务当月)。
- **快照时间**：`2026-10-01T01:11:01Z`。
- **语言分布**：Python 23 / TypeScript 13 / Go 3 / HTML 2 / Kotlin 2 / Swift 2 / Rust 2 / C++ 1 / JavaScript 1 / Markdown 1。中文仓库占比 ~16%(HowToLiveBetter + KKKKhazix/AIHOT + printfilm + jianying-headless + qingjian + wechat-intelligence-hub + workbuddy2api-panel + ZCode)。
- **API 配额**：本任务在 GitHub PAT (`~/.private/gh-trending-token`) 401 失效的情况下,以匿名调用完成(60 次/小时)。Top 10 深挖消耗 ~30 次,余量已留。
