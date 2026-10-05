# GitHub 周榜 · 2026-W40 · Claude Code 周边生态与 AI 浏览器 agent 双线霸榜

> 数据口径：窗口 2026-09-28..2026-10-04（UTC 闭区间）新创建仓库，按当前 stars 降序。关键词 `ai OR llm OR agent OR mcp OR assistant in:readme`，不设 stars 下限。`rank.py` 处理后取前 30，详深挖前 10。分布：英文 24 / 中文 6。

## 核心信号

- **Claude Code 周边生态（skills / plugins / marketplace）本周集中爆发**：Top 30 里 `nanaism/yomiyasu`（#5）、`QingYunA/answer-me-with-html`（#9）、`nykooi1/vibe-wise`（#10）、`rehan-remade/universal-modder`（#3）、`Jakeschincariol/replica-skill`（#29）一气五席，加上 `OpenDots`（#2）和 `OpenBot` 子项目，共同构成「Agent Skills 协议层 + 跨客户端分发」这一波浪潮，Anthropic Claude Code 不再做单点工具而是 marketplace 平台的事实已被生态验证。
- **AI 浏览器 agent 是 mcp / agent 赛道最热子方向**：`feder-cr/dots`（#4，2601 ⭐）、`openai/mcp-extensions`（#14）、`CopilotKit/OpenDots`（#2，含独立 sandboxed browser 容器）三连击；同一周还冒出 `invisible_playwright_mcp` 这种底层依赖。判断：浏览器指纹反检测成了工程硬需求，浏览器 agent 从「能点网页」升级到「不被识别」。
- **小参数本地模型 + LoRA adapter 的「System 1」路线被产品化**：`firelex/jeff`（#6）以 0.8B 模型挂 9 个 LoRA，在 8 个分类任务上同时压过 27B 主模型的准确率与速度（38×）。同档 `StayLameBro/backburner`（#27）把 27B 跑在 iPhone+Mac 异构推理上，`deepseek-ai/DeepGEMM-Ascend`（#22）补华为昇腾 kernel——大模型推理的「小步快跑 + 硬件补完」形态在收敛。
- **首期快照**：本期是 W40 周档的首期可对比快照（rank.py 上期 `weekly--2026-09-21..2026-09-27` 已在 `data/snapshots/` 中，30 条旧仓全部跌出、30 条新仓全部新上），star_delta 留空待 W41 增量。

## 重点深挖

### 1. [KKKKhazix/AIHOT](https://github.com/KKKKhazix/AIHOT) ⭐ 5,774 · TypeScript · 11 MB · 创建 2026-09-28

- **仓库元数据**：topics 12 个（ai / chinese / content-curation / daily-digest / docker-compose / llm / mcp / news-aggregator / postgresql / rss / self-hosted / typescript），homepage [aihot.news](https://aihot.news)，license MIT。
- **定位与核心价值**：作者数字生命卡兹克自述「设计师出身、半年前看不太懂代码」，把自家 AI 热点站 [aihot.news](https://aihot.news) 的引擎开源成模板。设计哲学是「信源和精选标准都可以换」：六种信源（RSS / 网页列表 / JSON / X 账号 / 公众号 / 外部脚本推送）→ 预筛 → 同标准独立两次打分 → 中文写作 → 事件聚簇 → 事件级热度算法 → 日/周/月自动出刊。亮点是把「事件」而非「文章」作为热度单位（48 小时内独立来源去重，24h 减半），官方发一篇和十家媒体转一次对热度贡献相同。
- **Agent 友好**：内置 RSS（精选 / 全部 / 全文 / 日报 / 周报 / 月报）、公开 API、MCP 接入、`/agent` 路由、`llms.txt`——同一个内容既给读者看、也给 Agent 用。每个提示词（精选、打分、聚簇、复核）全部公开在 `industry/prompts/`，可读可改。
- **实战信号**：[#117](https://github.com/KKKKhazix/AIHOT/issues/117)（已关闭，2 评论）用户反馈模块机制里 `part(current)` 易被忽略导致更正/撤回最晚 60 秒生效，作者 @KKKKhazix 回复采纳用户方案 1，只在 `modules.ts` 的 `read` 注释里点明契约，并在 #119 中合入，把用户列为 co-author。**作者对外部 issue 的响应质量是少见的高**——先复述用户判断、再明确「不做什么」的边界（不做示例模块、不收紧类型），最后给出可合入的最小修法。
- **横向对比**：和 `RankYI/anything-ai-news` 这类单纯 RSS 聚合不同，AIHOT 把「事件聚簇 + 多次打分 + 日报自动排版」做成了开箱即用流程，代价是配置较重（要 OpenAI 兼容 API + PostgreSQL + Docker）。和中文同类「今天看啥」相比，AIHOT 的差异点是聚簇与热度算法做了事件级去重而非文章级。
- **风险**：信源默认仅 18 个海外公开 AI 资讯源；要扩到其它行业必须自己填 `industry/sources.json` 与评分标准，文档虽全但有学习曲线。作者公开承认「不是专业开发者」，所以代码可能不如商业产品整洁。

**适用场景**：**适合**：想把 AI 选题流程沉淀为可复用引擎的内容团队、需要日报/周报自动出刊的小型媒体或行业研究小组 · **不适合**：只要 RSS 聚合、不需要聚簇与多步评分的轻量场景；以及不愿意配 PostgreSQL 与 Docker Compose 的极简部署。

### 2. [CopilotKit/OpenDots](https://github.com/CopilotKit/OpenDots) ⭐ 3,202 · TypeScript · 19 MB · Alpha

- **定位**：always-on AI 同事，跨文本、电话、Slack 三种形态在同一上下文里协作。每个 Dot 有自己的「电脑」——通过配套的 [OpenBot](https://github.com/CopilotKit/OpenBot) 容器监督器和浏览器服务，每个 Dot 拥有独立浏览器 profile、文件、工作区，停启后状态保留。基于 CopilotKit 的 React SDK + AG-UI 协议 + Channels SDK，UI 直接渲染工具调用与浏览器画面。
- **核心价值**：把 Agent 从「一个对话」升级到「带持久电脑的同事」——Dot 之间的会话分离，每个 Space（共享工作区）有独立权限、自动保存、修订冲突检测。Slack 集成通过 OpenTag 与允许名单制，不开公网暴露。WebRTC 通话把语音与计算解耦，通话期间长任务可继续在后台跑。
- **实战信号**：[issues 列表](https://github.com/CopilotKit/OpenDots/issues?q=is%3Aissue) 里 2 条 open issue（俄语「Агенты」、FeltDB 后端的 OpenDots 接入），早期仓库问题密度极低。README 给出 2026-09-29 / 09-30 的本地验证日期（Intelligence 集成、OpenBot 浏览器与文件持久化、WebRTC 通话与回执），但 Slack 与 spoken compute 委派仍是「需连真实服务验证」。
- **横向对比**：相比 [OpenAI Operator](https://operator.chatgpt.com) 与 Anthropic Claude Computer Use 的闭源方案，OpenDots 是首个把「独立 sandboxed 浏览器 + 持久文件系统 + 跨形态上下文」三件套全开的开源模板。代价是配置重（需要 Node 24、Realtime speech provider、Intelligence project、Channels SDK）。
- **风险**：Alpha 状态、单用户设计（README 写明共享编辑、邀请、文件上传不在范围内），生产化需要自己补多用户与审批流。

**适用场景**：**适合**：要把 AI 同事持久化到团队的 SaaS 创业者、内部自动化平台搭建者 · **不适合**：只要一次性对话的轻量 ChatBot 需求；以及不想配置 Docker 容器与浏览器隔离沙箱的极简部署。

### 3. [rehan-remade/universal-modder](https://github.com/rehan-remade/universal-modder) ⭐ 3,189 · Python · 22 MB

- **定位**：让 Claude Code / Codex / Cursor / Gemini CLI / GitHub Copilot 任意 agent 都能 mod 任何你拥有的 PC 游戏。skills 形式分发：覆盖 12 个引擎的 playbook（Unity / Unreal / .NET-XNA / Godot / Source 1+2 / Bethesda / Minecraft / AoE2-Genie / RE Engine-FromSoft-GTA-Cyberpunk-BG3 / 原生 C++ / 独立引擎 / 复古反编译），外加 game-recon（侦察）、reverse-engineering（反编译）、fal-assets（资产生成）、game-automation（游戏内自动化）、showcase-video（剪辑）、mashup-mods（游戏套游戏）、publish-mod（发布）、share-field-notes（写入知识库）等 skill。
- **核心价值**：① **资产生成全栈**——通过 fal MCP 直接生成 sprite / 3D / SFX / 音乐 / 语音，含 PBR 贴图、像素艺术、3D→8/16 视角精灵帧转换（用 Blender + 特定游戏摄像机角度）；② **跨引擎一致性**——同一份 SKILL 描述驱动 Unity、Unreal、tModLoader、ScriptHookV 等 12 套生态；③ **AI 知识库**——`knowledge/` 收录真实 mod 工作记录（每个游戏的版本、路线、坑、修复），mod 完成后可 `um kb pr` 自动开 PR 贡献笔记。
- **实战信号**：5 条 open issue，「Additional Knowledgebases」（请求加入 NexusMods / Mod.io 知识库）、「Integrate ComfyUI 替代 fal」（资产生成去云化）、「OpenCode MCP Support」（覆盖更多 agent 客户端）、「Mod-Supported Multiplayer」（FiveM / NexusTools 多人 mod 支持讨论）——全部是用户主动反馈与扩展需求，作者承诺 PR-friendly（README 里写「an agent that finishes a mod can open a pull request with its note」）。
- **横向对比**：和 [Bg-Knight/tmodloader-cursor](https://github.com) 这类单游戏 mod 模板相比，universal-modder 把 mod 工作流抽象成跨引擎的 playbook，并解决「AI 不知道游戏版本与引擎类型」的入口问题。代价是 22 MB 仓库，包含了大量 Windows 工具（PowerShell + 嵌入 C#）。
- **风险**：作者明确拒绝给在线带 anti-cheat 的游戏写 cheat（这是正确决策），也不打包游戏文件或反编译代码。多游戏实测示例仅 3 个（Terraria / AoE2 / GTA×Minecraft），其它引擎覆盖度需要更多用户提交笔记验证。

**适用场景**：**适合**：游戏 mod 圈独立作者、AI agent 重度玩家、想系统化游戏调试与反编译的逆向爱好者 · **不适合**：只想要单个游戏 mod 模板的轻量场景；以及在意 anti-cheat 合规的多人对战玩家。

### 4. [feder-cr/dots](https://github.com/feder-cr/dots) ⭐ 2,601 · Python · 1.1 MB（精简）

- **定位**：开源 dots —— 「一个 AI agent = 一个模型 + 一个浏览器」。模型换 OpenRouter 一行 `--model` 切，浏览器则用 C++ 改过的 Firefox 做反指纹。同一团队维护 [invisible_playwright_mcp](https://github.com/feder-cr/invisible_playwright_mcp) 把这个浏览器包装成 MCP server 给 Claude Code / Codex / Gemini CLI 用。
- **核心价值**：把「浏览器指纹反检测」从 JS 涂抹层降到浏览器引擎层。WebDriver flag / DevTools protocol / automation globals 全部从 page 视角不存在；指针按人类轨迹移动、按键逐次按下，每个事件都是 trusted event；`--seed` 给同一 seed 复现同一身份（屏幕 / 字体 / GPU / 时区 / 语言一致）；`--proxy` 时区语言跟着出口走。速度可观：本地启动到打开 http://127.0.0.1:8765 一个命令搞定。
- **实战信号**：仓库 0 open issues，作者对外暴露的反馈渠道是 HackerNews 与社交平台（README 末注「Not affiliated with OpenAI」）。README 把定位写得很克制——「the model is rarely why. The page never loaded, a challenge appeared, the login expired, the click did not land. All of that happens in the browser」。这种「问题不是模型，是浏览器」的洞察是这个 repo 的核心叙事。
- **横向对比**：相比 [browser-use](https://github.com/browser-use/browser-use) 用 Playwright 直接驱动（指纹特征明显），dots 走的是改 Firefox 二进制 + stealth profile 路线，反检测能力更强但兼容性窄（绑定 Firefox）。模型侧走 OpenRouter，灵活度高于绑定 OpenAI 的 [Skyvern](https://github.com/Skyvern-AI/skyvern)。
- **风险**：默认 `WebDriver` 检测绕过有合规与道德边界（爬虫 / 票务 / 风控对抗），作者没在 README 里加显式限制，需要用户自约束。Windows 安装走 `irm | iex` 远程脚本，习惯 Linux 包管理的开发者可能不适应。

**适用场景**：**适合**：做 web agent 基础设施、被反爬拦截的爬虫工程师、自动化测试需要稳定身份的 QA · **不适合**：合规要求严格的爬虫场景；以及只想用 Playwright 默认配置、不在意指纹的轻量 web 自动化。

### 5. [nanaism/yomiyasu](https://github.com/nanaism/yomiyasu) ⭐ 1,392 · Python · 13 KB（极小）

- **定位**：把 AI 生成的日语「推敲」成人类可读、信息密度高的版本。Agent Skill 形态分发，目标是技术文章、设计书 / 规格书、PR 说明、公司内部报告等实务文本。可装入 Codex / Claude Code / Cursor 等任一 AI 编码环境。
- **核心价值**：7 条转换原则——主谓修饰条件对齐、文体与文末功能保持、拟人化整理、比喻动词平易化、前置否定对比角色确认、不擅自加信息、文长与标点调整。区别于 [coji/natural-japanese](https://github.com/coji/natural-japanese) 这类「禁用词替换」流派，yomiyasu 的设计是不只换词，而是把 SVOCM 结构与主语补全。这种「不破坏原文结构」的克制哲学与大多数 AI 文章「补一笔就好」的修辞病对抗。
- **配套工具**：自带两个 Python 脚本，标准库实现无外部依赖。`yomiyasu_lint.py` 静态检查 AI 气味（比喻动词、过度加粗 / 列表、文末冒号、连续相同文末、不必要半角空白 + GitHub Markdown 太字渲染失效检测）；`yomiyasu_diff.py` 推敲前后对比，检查是否擅自改了语义、文末立场、措辞强度。
- **实战信号**：[#2](https://github.com/nanaism/yomiyasu/issues/2)（已关闭，2 评论）用户反馈「`bold_not_rendered` 对跨 2 行的太字误判为不渲染」——SKILL.md 写「按建议修」反而让显示崩坏，作者在 v1.0.4 修复，把跨行太字 / 块边界（引用 / 标题 / 列表 / 表）全部纳入判定。[#1](https://github.com/nanaism/yomiyasu/issues/1)（已关闭，2 评论）用户报告 PASS 文案「AI 味道未检测出」语义过强且 5/7 测试句被漏检，作者在 v1.0.4 改文案为「設定された検査ルールによる指摘はありません」+ 扩充 `効く` 未然形检测 + 加入 `踏み込む / 引き返す / 添える / 収斂する` 等动词。**作者回复节奏：报告当日合并 v1.0.4，并明确说明每个改动的边界与未做项**——典型的「高质量维护者」信号。
- **横向对比**：与 [iKora128/stop-ai-slop-jp](https://github.com/iKora128/stop-ai-slop-jp)、[k16shikano/japanese-tech-writing](https://gist.github.com/k16shikano/fd287c3133457c4fd8f5601d34aa817d) 等同类相比，yomiyasu 走「结构 + 文体」双层修改，README 给了从 LREC 2026 / ACL 2026 到 PLOS One 2025 的 9 篇学术引用，对每个规则的来源做了标注。研究诚信度高。
- **风险**：README 警告「同一环境不能和其它日语校正 skill 共存，会指令冲突」——这是真实问题，多 skill 装在同一 Claude Code 里经常互相抵消。修改粒度偏严，技术文章如果用词刻意想「活泼」（如「地味に効く」），也会被平易化。

**适用场景**：**适合**：日企技术写作、写技术 blog 的日本开发者、需要把 AI 生成日语文档交付给客户的公司内部 · **不适合**：创意写作 / 随笔 / note 类需要保留 AI 修辞气味的场景；以及不会日语的纯中文用户。

### 6. [firelex/jeff](https://github.com/firelex/jeff) ⭐ 1,374 · Python · 119 MB · 创建 2026-09-28 · homepage [jeffhub.ai](https://jeffhub.ai)

- **定位**：0.8B 开源「System 1」模型——给你选项 → Jeff 单次前向返回每个选项的校准概率；不生成文本、不解析。让本地大模型（Qwen3.8-27B）负责写与推理，Jeff 在前面做快速决策；Jeff 不确定时才传给 27B。配套 9 个 LoRA adapter（guard / triage / support-intents / tools / ground / nav / emotion / spam / legal-clauses），每个约 41 MB，半小时到四小时一个 epoch 训完。
- **核心价值**：① **数字很硬**——8 个 adapter 平均：86.6% → 95.3%（+8.7 pp）、8.1 s → 0.25 s（38×）、错答率 13.4% → 4.7%（2.8×）。苹果 M4 Max 128 GB + MLX、8-bit 27B、独立测试集 300 行（emotion / legal-clauses 用 500 行），每个 adapter 都有单独的 calibration 行定阈值。② **诚实透明**——README 里专门写「emotion 是 27 emotions + neutral 选 1，人类标注都不一致，故意不进平均」，把让数字变好但会误导读者的样本剔出去。③ **集成友好**——HTTP API + Python + TypeScript 三套客户端，serve 时多个 adapter 共存、单 base + 切换（30 ms / decision）。
- **实战信号**：[#5](https://github.com/firelex/jeff/issues/5)（已关闭）有用户只发了「Jeff?」，作者没正面回——典型早期项目噪音 issue。`[#2](https://github.com/firelex/jeff/issues/2)`（已关闭）用户请求把训练 / 推理 / 评估依赖分离，作者在 `db4a13d` 拆分：`uv sync --no-default-groups` 只装 server 需要的 63 个包（vs 之前 123 个），NVIDIA 加 `--extra cuda`、Apple Silicon 加 `--extra mac`，并新增测试确保 server 不会拉训练包。`[#1](https://github.com/firelex/jeff/issues/1)` 让选项数从 26 升到 254，已合入 v1.1。**反馈响应节奏快，且开发者主动拆包减小生产依赖**。
- **横向对比**：与 [Denis Yarats 的 AutoJev](https://github.com/denis-pplx/autojev) 同源，Jeff 是 fork 后的产品化版本（small students + 完整 serving + 9 个现成 adapter）。对比 Jev 本体（闭源 / API only），Jeff 优势是本地可控与可微调；代价是要自己跑训练数据生成（README 提示「we release weights and code, not the training data; some sources are share-alike」）。
- **风险**：adapters 严格锁 base 版本（v1.2 adapter 不能用在 v1.3 base），v1.3 长期支持版预计 36 小时内发布——adapter 重训成本要算进去。只支持英文 + 文本。

**适用场景**：**适合**：客服 inbox agent / 工具路由 / guard / spam / grounding 等「决策类」任务的产品团队，需要把决策延迟从秒级压到毫秒级 · **不适合**：需要多步推理、规划、长链思考的任务（Jeff 设计上就不是这种模型）。

### 7. [edenfunf/reelmimic](https://github.com/edenfunf/reelmimic) ⭐ 1,266 · JavaScript · 43 MB

- **定位**：把「你喜欢的视频」丢进去，生成同风格的新视频。Claude Code 或 Codex 驱动，跑在你自己的电脑上。先拆参考视频（剪辑节奏 / 镜头长度 / 转场 / 色彩 / 镜头运动）→ 出方案让你审 → 多 agent 并行生产（最多 6 个）→ 每个镜头单独找另一个 agent 审核（不让自评）→ 改的过程带 before/after 截图证据。
- **核心价值**：① **不抄原片**——学习「怎么做」（节奏 / 镜头 / 转场 / 笑点），不抄「是什么」（原画面 / 角色 / 资产）。② **2D 七种引擎**——矢量 / motion graphics（基于 Heygen 的 HyperFrames）、手绘水彩（painted-animation）、蜡笔绘本、像素艺术、剪纸定格、白板涂鸦、动画赛璐璐。后五种较新，实测样本少。③ **三种语言 UI**——繁中 / 简中 / 英文，文案与时区跟着用户走。
- **实战信号**：[issues 列表](https://github.com/edenfunf/reelmimic/issues?q=is%3Aissue) 3 条 open issue（终稿视频 scrub 时反复重取、SSE 流无重放协议导致重连丢历史、Windows `install.bat` 不尝试 `python3`）——都是工程层实际问题，作者在 README 写明「macOS / Linux 应该有但测试少，issues welcome」。
- **横向对比**：与 [Runway Gen-4](https://runwayml.com)、[Kling](https://klingai.com) 等闭源视频生成不同，reelmimic 主打「风格迁移 + 多 agent 协作 + 本地可控」，但功能定位差异大——它不是图像生成，是流程编排。相近开源项目 [higgs-audio / wan2.1](https://github.com/Wan-Video/Wan2.1) 偏模型本身，reelmimic 偏多 agent 编排。
- **风险**：30-60 秒视频通常要 1-3.5 小时；水彩与蜡笔最慢（每帧用画笔）。所有生成走用户自己的 Claude Code 或 Codex 配额，撞限速会暂停可恢复。完全没真人，只做动画。

**适用场景**：**适合**：短视频创作者做风格迁移、想做风格化 MV 但没团队的个人、动画教育场景 · **不适合**：需要真人 / 实拍的视频生成场景；以及不愿付 Claude Code / Codex API 费的用户。

### 8. [facebookincubator/muse-gadget-sdk](https://github.com/facebookincubator/muse-gadget-sdk) ⭐ 1,179 · C · 2.1 MB · 创建 2026-10-02 · homepage [gadgets.muse.ai](https://gadgets.muse.ai)

- **定位**：Meta Muse Gadgets 的开源 SDK——把 ESP32 开发板或 Linux/Raspberry Pi 接入 Muse，作为它的显示屏、按钮、传感器、执行器。两个子 SDK：ESP32 Device SDK（基于 ESP-IDF，支持屏 / 音频 / 其它传感器）+ Linux Device SDK（Python，systemd 服务，BLE 通过 BlueZ 假定）。配套 AGENTS.md 让 coding agent（如 Muse Code）能直接上手。
- **核心价值**：把 Muse AI 助理的能力延伸到硬件外设——AMOLED 圆屏、M5Stack StickS3、Raspberry Pi、Seeed reTerminal 电子墨水屏都是现成目标。Discord 社区 [gadgets.muse.ai](https://gadgets.muse.ai) 给 hacker 与折腾玩家。每块板要先到 settings/sdk-tokens 拿 SDK token 才能配对，setup 有完整文档。Apache 2.0 协议（除 [Jollybot avatar](esp32/avatar) 与 minimp3、Adafruit GFX 等第三方文件外）。
- **实战信号**：[#89](https://github.com/facebookincubator/muse-gadget-sdk/issues/89)（已关闭）用户提 Windows 支持缺口——`install.sh` bash-only、`musegadget.service` systemd-only、BLE 假定 Linux 蓝牙栈。Windows 开发机覆盖不到位，作者修复中。[ESP32-S3 voice-note 返回空 assistant 回复](https://github.com/facebookincubator/muse-gadget-sdk/issues)（open issue）是个真实可复现的硬件兼容问题。**作为 Meta 自家开源仓库，反馈响应链路较短，问题都指向具体硬件型号**。
- **横向对比**：与 [esphome/esphome](https://github.com/esphome/esphome)、[Home Assistant](https://github.com/home-assistant/core) 这类通用智能家居生态相比，muse-gadget-sdk 走 Muse AI 专有方向（必须配对 token 才能用），开放度受限；但优势是 Muse AI 的多模态理解能在硬件外设上做语音 / 显示 / 传感融合。
- **风险**：依赖 Meta 商业产品 Muse，未来若 Muse 关停，整个 gadget 生态价值会被打折。Windows 支持仍在补。ESP-IDF 学习曲线对纯软件开发者不友好。

**适用场景**：**适合**：Muse AI 资深玩家、ESP32 硬件 hacker、想把 AI 助理装到实体设备的 DIY 玩家 · **不适合**：通用智能家居用户（选 Home Assistant 生态更稳）；以及无硬件折腾意愿的纯软件开发者。

### 9. [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) ⭐ 1,050 · JavaScript · 22 MB

- **定位**：让 AI agent 答复杂问题时输出一页可读的 HTML，而不是一面文字墙。模型只写内容（Markdown 草稿），CLI（`am`）负责布局 / 配色 / 画图。同样问题同样模型 Claude Sonnet 5.5：直接让模型写 HTML 用 6,873 output tokens / 46 s；用这个 skill 改写 923 tokens / 13 s（**7.4× 少 token、3.6× 快**）。代价：cost 差不多（$0.22 vs $0.26，skill 多两轮 turn）。
- **核心价值**：① **组件库**——`flow`（架构 / 调用链 / 决策分支，自动布局）、`sequence`（时序图，按 label 宽度 spacing）、`tree`（文件夹 / 模块 / 分类）、`timeline`（历史 / 发布 / 阶段）、`limits`（值 vs 限制）、`annot`（逐词注解）、`kv`（标题栏）、`callout`（结论 / tip / 警告）、Table（多路比较，单元格写 `ok` / `no` / `warn` 自动渲染 ✓ ✗ !）。② **写作检查**——按 ASD-STE100（航空维修手册的简化英语规范）做静态检查，英文 < 20 words / 步骤、< 25 words / 描述、被动语态、连续 3+ 个 `的`、样板词「赋能」「闭环」全 flag，中文用 35 字 / 45 字字符限制。③ **可升级到视频**——「`am video`」生成 3Blue1Brown 风格的解释视频，模型只写一行旁白，CLI 画图 + ElevenLabs TTS，导出 MP4。
- **实战信号**：[#28](https://github.com/QingYunA/answer-me-with-html/issues/28)（已关闭）用户报告右对齐列 `<th>` 恒为左对齐——根因是 `<th>` 的 `align="right"` 是 legacy presentational hint（specificity 0,0,0），被 CSS `.am-md th { text-align: left }` 覆盖，作者 @QingYunA 一句「thanks for the clear report and root-cause analysis, fixed in #31 with your option 1, plus the same rule for centered columns」——这是少见的高质量互动：用户给出精确 DOM 测量坐标 + 根因分析，作者直接采纳方案 1 并补全居中列同类问题。
- **横向对比**：与 [anthropics/agent-skills](https://github.com/anthropics/agent-skills) 体系内的同类相比，answer-me-with-html 的差异点是「CLI 接管布局 + 极短输出」；相比 Vercel 的 [v0](https://v0.dev) 闭源产品，它做的是单文件 HTML 离线可打开、可分享。STE100 检查在英文技术写作圈是工程化产物，与 Karpathy 推荐的 LLM 写作改进方向契合。
- **风险**：cost 没省（甚至略升）；always-on 模式要单独装插件，会让每一轮回复附上 2-4 panel 的小页（`~/.answer-me-with-html/pages/` 占空间，> 200 MB 才提示清理）。

**适用场景**：**适合**：重度 Claude Code / Codex 用户做技术讲解、需要把回答输出变成可分享页面的工程团队、写技术 blog 想直接出 HTML 原型的个人 · **不适合**：只关心 cost 优化的场景；以及只想要纯文本回复的极简用户。

### 10. [nykooi1/vibe-wise](https://github.com/nykooi1/vibe-wise) ⭐ 1,048 · Python · 189 KB（极简）

- **定位**：Claude Code 插件「学习优先」。AI 写代码时，先问你的方案 → 帮你权衡 trade-off → 解释陌生概念 → 你定设计 → 你授权写代码 → 它写完解释改动与原因。三个 checkpoint：**Build**（一起推理问题怎么解）、**Design**（确认设计，**Confirm and continue** 记录，不写代码）、**Implementation**（确认具体代码改动才实施）。三档经验自适应（Beginner / Intermediate / Advanced），三档 checkpoint 频率（Light / Normal / Frequent）。
- **核心价值**：把「教新人写代码」的教练角色系统化进 plugin。Build Checkpoint 逼你想清楚问题（即便你不知道答案，Claude 也可解释概念、出小图、缩小问题让你思考）；不是「先解出再写代码」而是「先讲清思路、再确认、再实现」。设计检查点把架构决策显式记录（用户的笔记存在 `.vibe-wise/`，可加入 `.gitignore`）。
- **实战信号**：[#2](https://github.com/nykooi1/vibe-wise/issues/2)（open，2 评论）用户 @ch-arslanahmad 请求扩展到 Codex / Devin / OpenCode / Pi / Crush 等多 agent 客户端，@k-shopnil 提 PR #3 做 Google Antigravity 集成（1:1 兼容 + 生命周期 hook + token 优化）。**项目天然适合众包扩展，作者欢迎多客户端支持**——是验证项目活力的最佳信号。
- **横向对比**：与 [claude-code-best-practices](https://github.com/anthropics/claude-code-best-practices) 这类提示词指南相比，vibe-wise 是把教学法沉淀成 plugin，不靠用户自己记得写 system prompt。代价是 plugin 形式绑死 Claude Code 客户端，不通用。
- **风险**：依赖 Claude Code（README 写「Anthropic Claude 目录已批准，但还未上公开 marketplace」），分发渠道受限。学习笔记存在 `.vibe-wise/` 本地，会跟随项目目录——若不加 `.gitignore` 容易进 git。

**适用场景**：**适合**：用 Claude Code 学习新栈的初级 / 中级工程师、当 mentor 想要工具辅助教学的资深工程师、独立学习者 · **不适合**：纯老手要速度、要绕过 checkpoint 直接写代码的场景（可以「Pause learning」）；以及不用 Claude Code 的用户。

## 完整前 30 表

| # | 仓库 | ⭐ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---:|---|---:|---|---|---|---|---|
| 1 | [KKKKhazix/AIHOT](https://github.com/KKKKhazix/AIHOT) | 5,774 | mcp | 新上 | TypeScript | 自己找热点自己写日报的网站框架，信源 / 评分可换 | ✅ [issue 117](https://github.com/KKKKhazix/AIHOT/issues/117) |
| 2 | [CopilotKit/OpenDots](https://github.com/CopilotKit/OpenDots) | 3,202 | 其他 | 新上 | TypeScript | always-on AI 同事，跨文本 / 通话 / Slack，独立 sandboxed 浏览器 | 🟡 Alpha |
| 3 | [rehan-remade/universal-modder](https://github.com/rehan-remade/universal-modder) | 3,189 | mcp | 新上 | Python | 让任意 agent 都能 mod PC 游戏，覆盖 12 引擎 | ✅ 多 [open issue](https://github.com/rehan-remade/universal-modder/issues) |
| 4 | [feder-cr/dots](https://github.com/feder-cr/dots) | 2,601 | mcp | 新上 | Python | AI agent 的反指纹 Firefox + OpenRouter 模型 | ✅ 0 issue |
| 5 | [nanaism/yomiyasu](https://github.com/nanaism/yomiyasu) | 1,392 | agent | 新上 | Python | 把 AI 日语推敲成自然日语的 Agent Skill，附 linter | ✅ [issue 1](https://github.com/nanaism/yomiyasu/issues/1) [issue 2](https://github.com/nanaism/yomiyasu/issues/2) |
| 6 | [firelex/jeff](https://github.com/firelex/jeff) | 1,374 | 模型 | 新上 | Python | 0.8B System 1 模型 + 9 LoRA，38× 快 / 2.8× 准 | ✅ [issue 2](https://github.com/firelex/jeff/issues/2) |
| 7 | [edenfunf/reelmimic](https://github.com/edenfunf/reelmimic) | 1,266 | agent | 新上 | JavaScript | 视频风格迁移 + 多 agent 协作，本地 Claude Code 驱动 | 🟡 open issue |
| 8 | [facebookincubator/muse-gadget-sdk](https://github.com/facebookincubator/muse-gadget-sdk) | 1,179 | 其他 | 新上 | C | Meta Muse Gadgets 开源 SDK，ESP32 + Linux 双栈 | 🟡 [issue 89](https://github.com/facebookincubator/muse-gadget-sdk/issues/89) |
| 9 | [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) | 1,050 | agent | 新上 | JavaScript | agent skill：让模型写 900 token，CLI 渲染成 HTML 页 | ✅ [issue 28](https://github.com/QingYunA/answer-me-with-html/issues/28) |
| 10 | [nykooi1/vibe-wise](https://github.com/nykooi1/vibe-wise) | 1,048 | 其他 | 新上 | Python | Claude Code 学习优先插件，三个 checkpoint 自适应 | 🟡 [issue 2](https://github.com/nykooi1/vibe-wise/issues/2) |
| 11 | [kargulstudio/sales-crm](https://github.com/kargulstudio/sales-crm) | 827 | 其他 | 新上 | TypeScript | AI 销售 CRM（简评：描述为空） | ⚠️ |
| 12 | [Edwardxlai/easyread](https://github.com/Edwardxlai/easyread) | 775 | 模型 | 新上 | Python | 本地 PDF 英文论文翻译成中文 + 边读边问 AI + 文献管理 | ✅ |
| 13 | [storytold/photocraft](https://github.com/storytold/photocraft) | 755 | 其他 | 新上 | Rust | 照片处理（简评：描述为空） | ⚠️ |
| 14 | [openai/mcp-extensions](https://github.com/openai/mcp-extensions) | 750 | mcp | 新上 | TypeScript | OpenAI 官方的 ChatGPT 插件 / MCP 扩展规范 | ✅ 官方 |
| 15 | [ESPARGOS/esp-sdr](https://github.com/ESPARGOS/esp-sdr) | 564 | 其他 | 新上 | C | 用 ESP32 未公开 raw I/Q 捕获做低占空比 SDR | ✅ |
| 16 | [OpSafari/hypoarena](https://github.com/OpSafari/hypoarena) | 561 | 设计skill | 新上 | Python | 科学假设发现工作台，Elo 锦标赛恢复植入技能顺序 | ✅ |
| 17 | [composio-community/open-dot](https://github.com/composio-community/open-dot) | 556 | agent | 新上 | TypeScript | 开源个人 AI agent 跑在自己电脑上，Mac app + OpenAI + Composio | ✅ |
| 18 | [fsiaonma/elpis](https://github.com/fsiaonma/elpis) | 548 | 其他 | 新上 | TypeScript | elpis（简评：描述极简） | ⚠️ |
| 19 | [sganggs/Stronghold-Protocol](https://github.com/sganggs/Stronghold-Protocol) | 542 | 其他 | 新上 | JavaScript | 明日方舟「卫戍协议：盟约」非官方同人复刻浏览器自走棋塔防 | ✅ |
| 20 | [oil-oil/oil-ui](https://github.com/oil-oil/oil-ui) | 518 | 其他 | 新上 | Python | 把 AI 的 UI 设计能力推到极限（中文） | 🟡 |
| 21 | [extend-hq/jevbox](https://github.com/extend-hq/jevbox) | 501 | 其他 | 新上 | TypeScript | jevbox（简评：描述为空） | ⚠️ |
| 22 | [deepseek-ai/DeepGEMM-Ascend](https://github.com/deepseek-ai/DeepGEMM-Ascend) | 498 | 其他 | 新上 | C++ | DeepGEMM 华为昇腾 NPU kernel 库 | ✅ 官方 |
| 23 | [amywork777/lipflow](https://github.com/amywork777/lipflow) | 487 | 其他 | 新上 | Python | Wispr Flow 口唇版：按住键、无声唇语转文本到光标，本地 Mac | ✅ |
| 24 | [elliotttate/Wind-Waker-Recomp](https://github.com/elliotttate/Wind-Waker-Recomp) | 476 | 其他 | 新上 | C | Wind Waker 在 iPhone / iPad 上的个人 fork | ✅ |
| 25 | [whirlchat/whirl](https://github.com/whirlchat/whirl) | 455 | 模型 | 新上 | TypeScript | AI chat app：每家顶模、真实记忆、活动文档、自带工具 | ✅ |
| 26 | [ythx-101/live-panel-skill](https://github.com/ythx-101/live-panel-skill) | 433 | 设计skill | 新上 | HTML | 配置驱动的动画架构图，一份 JSON 转终端 / 浅色信息图 / H.264 | ✅ |
| 27 | [StayLameBro/backburner](https://github.com/StayLameBro/backburner) | 429 | 模型 | 新上 | Python | iPhone 帮 Mac 跑 27B：USB-C 更快的 prompt 读取 + 更大上下文 | ✅ |
| 28 | [fulldiagnose/antigravity-fixer](https://github.com/fulldiagnose/antigravity-fixer) | 389 | 其他 | 新上 | Python | 修 Antigravity 「不符合资格」报错：诊断 + 清凭证 + 自动修 | ✅ |
| 29 | [Jakeschincariol/replica-skill](https://github.com/Jakeschincariol/replica-skill) | 382 | agent | 新上 | Python | 11 个 Claude skill 克隆任意 app：反编译 / 重建 / 测 bug / 修用户痛点 | 🟡 |
| 30 | [MisakaZentai/world-execute-me-dsh-pv](https://github.com/MisakaZentai/world-execute-me-dsh-pv) | 378 | agent | 新上 | Python | Mili world.execute(me) 代码渲染 TUI fan PV，带 DeepSeek Harness 风格聊天窗口 | 同生态衍生 |

## 其余简评（11-30 简评带描述）

- **#11 [kargulstudio/sales-crm](https://github.com/kargulstudio/sales-crm)** ⭐ 827 — AI 销售 CRM（描述为空，TypeScript，1.5 MB）。
- **#12 [Edwardxlai/easyread](https://github.com/Edwardxlai/easyread)** ⭐ 775 — 本地 PDF 英文论文翻译成中文，原文对照、边读边问 AI、文献管理。技术栈 Electron + Claude Code + Codex，topics 含 chinese / paper-reading / pdf-translator / reference-manager / research-tool / translation。中文研发友好的论文阅读工作流。
- **#13 [storytold/photocraft](https://github.com/storytold/photocraft)** ⭐ 755 — Rust 写的照片处理工具（描述为空，13 MB）。
- **#14 [openai/mcp-extensions](https://github.com/openai/mcp-extensions)** ⭐ 750 — OpenAI 官方的 ChatGPT 插件 / MCP 扩展规范，「Build plugins that feel like native, first-class features of ChatGPT」，71 MB。判断：OpenAI 把 MCP 当成 ChatGPT 平台战略的一部分开始官宣。
- **#15 [ESPARGOS/esp-sdr](https://github.com/ESPARGOS/esp-sdr)** ⭐ 564 — 利用 ESP32 未公开 raw I/Q 捕获做低占空比软件定义无线电。topics 仅 esp32 / sdr，极简垂直。
- **#16 [OpSafari/hypoarena](https://github.com/OpSafari/hypoarena)** ⭐ 561 — 科学假设发现工作台：含 planted causal chain 的合成文献、生成 / 辩论 / 演化循环、Bayesian 证据累积、可复现报告。NumPy 核心 + CPU-only torch。学术研究基础设施。
- **#17 [composio-community/open-dot](https://github.com/composio-community/open-dot)** ⭐ 556 — 开源个人 AI agent 跑在自己电脑上，Mac app + OpenAI + Composio 工具编排。490 KB 极小工程，Composio 社区出品。
- **#18 [fsiaonma/elpis](https://github.com/fsiaonma/elpis)** ⭐ 548 — elpis（描述极简，TypeScript，466 KB）。
- **#19 [sganggs/Stronghold-Protocol](https://github.com/sganggs/Stronghold-Protocol)** ⭐ 542 — 明日方舟「卫戍协议：盟约」非官方同人复刻：浏览器自走棋塔防，单人 / 1-4 人联机合作（非商业）。topics 含 arknights / auto-chess / fan-game / nodejs / tower-defense / websocket。
- **#20 [oil-oil/oil-ui](https://github.com/oil-oil/oil-ui)** ⭐ 518 — 「把 AI 的 UI 设计能力推到极限」（中文描述），Python，2.6 MB。
- **#21 [extend-hq/jevbox](https://github.com/extend-hq/jevbox)** ⭐ 501 — jevbox（描述为空，TypeScript，5.2 MB）。
- **#22 [deepseek-ai/DeepGEMM-Ascend](https://github.com/deepseek-ai/DeepGEMM-Ascend)** ⭐ 498 — DeepGEMM 华为昇腾 NPU 高效矩阵乘法 kernel 库。判断：DeepSeek 在硬件适配上同时补 NVIDIA 与昇腾两条线。
- **#23 [amywork777/lipflow](https://github.com/amywork777/lipflow)** ⭐ 487 — Wispr Flow 口唇版：按住键、无声唇语转文本到光标，本地 Mac 运行（避开持续语音输入的尴尬）。929 KB。
- **#24 [elliotttate/Wind-Waker-Recomp](https://github.com/elliotttate/Wind-Waker-Recomp)** ⭐ 476 — Wind Waker 在 iPhone / iPad 上的 BlueWake 个人 fork，C 语言，6.5 MB。
- **#25 [whirlchat/whirl](https://github.com/whirlchat/whirl)** ⭐ 455 — AI chat app：每家顶模（OpenRouter）、真实记忆、活动文档、自带工具。topics 含 ai / ai-chat / convex / llm / nextjs / openrouter / react / self-hosted / typescript。
- **#26 [ythx-101/live-panel-skill](https://github.com/ythx-101/live-panel-skill)** ⭐ 433 — 配置驱动动画架构图：一份 JSON 转终端 / 浅色信息图 / 1080p 视频，也作 Claude Code skill（SKILL.md）。HTML，7.4 MB。
- **#27 [StayLameBro/backburner](https://github.com/StayLameBro/backburner)** ⭐ 429 — iPhone 帮 Mac 跑 27B：USB-C 更快的 prompt 读取 + 更大上下文（speculative decoding）。topics 含 apple-silicon / ios / iphone / llama-cpp / llm-inference / local-llm / macos / metal / qwen / sme2 / speculative-decoding。
- **#28 [fulldiagnose/antigravity-fixer](https://github.com/fulldiagnose/antigravity-fixer)** ⭐ 389 — 修 Antigravity「不符合资格」报错：诊断 + 清凭证 + 自动修。
- **#29 [Jakeschincariol/replica-skill](https://github.com/Jakeschincariol/replica-skill)** ⭐ 382 — 11 个 Claude skill 克隆任意 app：反编译 / 重建 / 测 bug / 修用户痛点。MIT。66 KB 极小。
- **#30 [MisakaZentai/world-execute-me-dsh-pv](https://github.com/MisakaZentai/world-execute-me-dsh-pv)** ⭐ 378 — Mili world.execute(me) 代码渲染 TUI fan PV，带 DeepSeek Harness 风格聊天窗口。MIT 代码 + CC BY-NC-SA 4.0 美术。同生态衍生（dsh）——核心信号里把它收编为「dsh 同生态周边」，不重复主仓定位。

## 数据方法

- **窗口**：2026-09-28..2026-10-04（UTC 闭区间，7 天）。脚本 `~/.hermes/skills/gh-trending-watch/scripts/windows.py --route weekly`，`title_time=2026-W40`。
- **关键词**：`q=created:2026-09-28..2026-10-04+archived:false+(ai+OR+llm+OR+agent+OR+mcp+OR+assistant)+in:readme`，`sort=stars&order=desc&per_page=50`。
- **排序**：star 降序 → `rank.py` 剔除空壳 / 擦边 → 取前 30。本期 raw_count=50、kept_count=50、listed_count=30、dropped=0。
- **数据源**：GitHub Search API（`search/repositories`）+ 单仓 README + Issues/Comments（前 10 条代表性）。Search 用匿名调用（60/h，10/h 搜索配额），深挖用同会话复用。本期首次跑时 GH_TOKEN 失败（Bad credentials），走匿名；下一档前会重试 token 或切换路径。
- **赛道列**：沿用 `rank.py` 的 `track`（mcp / agent / 模型 / 设计skill / 其他），不另编。`ecosystem=dsh` 的条目核心信号压缩收录，详深挖不重复。
- **slug**：`github-weekly-2026-W40`（窗口那一周，不是跑任务当天）。
- **首期快照**：本期是 W40 周档首期，star_delta 留空（与上期 `weekly--2026-09-21..2026-09-27` 的 30 条全部掉出对比已写入核心信号）。
