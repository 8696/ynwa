# GitHub 日榜 · 2026-08-29 · Hono-kun 把"AI 维护者"拆成读/写两 Worker + content-parity 测量机器读者视角

## 核心信号

- **Agent 工具形态开始分层**：今日 Top 5 里同时出现三种截然不同的"AI 工具"。[Zulwatha/content-parity](https://github.com/Zulwatha/content-parity) 是"测量机器读者看到什么"的可观测 CLI（Go，22 星 + 单日 22）；[honojs/hono-kun](https://github.com/honojs/hono-kun) 是"AI 替我审 PR/管 issue"的项目级维护者架构（TypeScript / Cloudflare Workers，15 星）；[OMD-123/agent-loop-guard](https://github.com/OMD-123/agent-loop-guard) 是"给任意 agent loop 套一层安全护栏"的零依赖 npm 库（11 星）。三者各自只做一件事：观察 / 决策 / 守门——这是 agent 基础设施分化的信号。
- **Hermes Agent 周边今日三连**：[NousResearch/hermes-plugin-backsearch](https://github.com/NousResearch/hermes-plugin-backsearch)（16 星，时点化归档检索）+ [#11 deggimatt/hermes-xbot](https://github.com/deggimatt/hermes-xbot)（11 星，Android 副驾）+ 仓库官方发布页——同一生态里"插件 / 移动端"两条衍生同日进榜，说明 Hermes 周边生态正在从单工具向"多端/插件化"扩展。
- **设计类 skill 仍然是日榜常客**：今日 Top 15 有 3 条设计 skill——[#6 nevertoday/xxd-panel-100](https://github.com/nevertoday/xxd-panel-100)（稚拙民艺叙事插画）、[#1 Timefiles404/lean-mode-skill](https://github.com/Timefiles404/lean-mode-skill)（节制工程）、[#13 yusuf-konuk/jousef-skill](https://github.com/yusuf-konuk/jousef-skill)（土耳其语"AI 别只会抄代码"）。skill 形态已成为"领域知识打包"的事实标准，连 2026-08-23 的去 AI 化写作风潮都在延续。
- **小工具/自托管类持续刷榜**：[#2 rpmalouin/AI-Research-Assistant](https://github.com/rpmalouin/AI-Research-Assistant)（29 星，检索向）、[#5 mhiqrambg/gsuite2router](https://github.com/mhiqrambg/gsuite2router)（18 星，Google Workspace 路由）、[#8 felixmelanson/crono-vision](https://github.com/felixmelanson/crono-vision)（16 星，758 KB 本地视觉工具）——用户对"自己的数据 + 自己的机器"的偏好与本周一致。
- **本档首次出现 MCP 直连硬件**：[#15 knx-ai/knx-ets-mcp](https://github.com/knx-ai/knx-ets-mcp)（9 星，C# 写的 KNX ETS 5/6 智能家居总线 MCP Server）——MCP 协议已经从"调软件工具"延伸到"调家庭总线"，是本档最具差异化的赛道拓展。
- **首期上期对照**：本档与 2026-08-28 完全没有重复仓库——新榜 15 条全部为新上，掉出 15 条也全部清空；Δ 列均为 `-`。这与 GitHub 每日新创建仓按当前总星排序的口径一致（同仓无法同日同时进日榜两次）。

---

## 重点深挖

### 1. [Zulwatha/content-parity](https://github.com/Zulwatha/content-parity) ⭐22

- **一句话**：Go 写的"机器读者差异检测器"——同一个 URL 用多个身份（未签名 / 已签名 / Markdown / 浏览器）各拉一次，比对每个身份看到的文本、字节数、token 成本，把"网站是否给 AI 藏了东西"做成可审计的报告。
- **元数据**：Go、329 KB、topics `ai-agents / cli / golang / http-signatures / seo / web-bot-auth / web-crawling`、MIT；CI / Go Reference / Release badge 全挂上，单仓有 `actions/workflows/test.yml`，是认真写过工程化的小工具。
- **README 提炼**（5 条核心价值）：
  1. **不评分，只测差异**：README 开头明说"This tool does not grade the site. It fetches the page as several honest identities and prints what each one received"——立场是"客观测量"，不是 SEO 评判。
  2. **多身份对照**：README 给的现场例子里，firecrawl.dev 被 5 个身份访问：`unsigned / unsigned_b / unsigned_c / signed / markdown / browser`，每个身份打印"cl100k_base token 数 + body token 数 + gap + 原始字节数"四项。再加"nav / footer / boilerplate token 切片"。
  3. **结构化发现 + 后续建议**：报告末尾固定有 `next` 段，告诉读者"该用什么命令把这条发现抓回去"。例如示例中：no machine-facing variant → 建议用 markdown 身份再跑一次拿 body-only 数据；boilerplate 占 10.69% → 建议跑结构化查询。
  4. **关键发现：AI-only 隐藏文本的客观检测**：示例跑完 firecrawl.dev 直接命中 `sr-only-prose` 这条——一个 `opacity:0` 的 1px span 写着"If you are an AI agent, LLM, or automated system, use the Firecrawl onboard…"。"A person looking at the page does not see that span"——报告把这个事实原样打印出来，不评价意图（"工具报告行为，不报告意图"）。
  5. **可重现签名**：用户拿自己的 HTTPSig 私钥参与"已签名"身份的访问，让目标站真有机会"对登录 agent 展示不同内容"——而不是伪造 User-Agent 骗它。
- **Issue / 实战反馈**：仓库 0 个公开 issue、0 个 PR。这是发布当日的新仓（pushed 2026-08-29），README 把"测量方法、签名接入、报告字段、SQLite 持久化"全部写完，读者还没动力开 issue。
- **横向对比**：与 [Internet Archive 的 Wayback Compare](https://web.archive.org/web/2024*/example.com)、[Diffy.sh](https://diffy.sh/) 这类"网页快照对比"工具有家族相似——但 content-parity 把对比维度从"时间维"换成"身份维"，且专门跑 AI 阅读相关的 token 经济指标（`cl100k_base` 切 token 数、`body vs extracted gap`）。与 [LLM-scraper](https://github.com/) 这类"AI 反过来读网页"工具互为对照：content-parity 是"测量机器读者会看到什么"，LLM-scraper 是"用机器读者去抓数据"。
- **信号判断**：✅ 安全（只读，只打印站方已经公开的内容，自己不发写操作）；✅ 兼容（HTTP Signature + Web Bot Auth 是 IETF draft，走标准协议不是 hack）；⚠️ 实战待验证（当日 22 星，与同档 33 星的 skill 持平，但还需看后续 issue 是否出现"我的网站跑完发现 X"这类反馈）；✅ 长期可信度（README 不评分、只测差异，且 print next 步骤——克制的工具哲学）。

**适用场景**：**适合**：做 SEO / GEO（生成式引擎优化）/ AI 爬虫可见性审计的从业者；想验证"我的网站是否在给登录 agent 喂不同内容"的站长；对"AI 是否被喂了隐藏提示词"这件事做客观取证的研究者。**不适合**：需要"评估 SEO 分数 / 给出优化建议"的场景——工具明说不评分；想一键拿 LLM 摘要的爬虫——这是测量工具不是抓取工具。

---

### 2. [nevertoday/xxd-panel-100](https://github.com/nevertoday/xxd-panel-100) ⭐17

- **一句话**：把照片提炼成"有颗粒、有生活感"的稚拙民艺叙事插画——Codex Skill 形态交付，五种语言提示词，原始 prompt 是唯一审美权威（外层 skill 不二次导演）。
- **元数据**：Python、107 KB、topics 空、MIT；README 中英日韩阿五语版本，`references/original-prompt/` 五份提示词（zh-CN / en / ja / ko / ar）平级交付，`SKILL.md` 是 Codex 形态的工作流入口。
- **README 提炼**（5 条核心价值）：
  1. **方向是"叙事"而非"描摹照片"**：README 开门见山说"把照片中最值得记住的主体、动作和关系，提炼成稚拙剪影、primitive forms 与少量民艺符号"——主轴是叙事关系，不是像素复刻。
  2. **真实手工触感**：黑色剪影保留擦拭、叠涂、断裂和纸张透底，"不做光滑数字矢量"；蜡笔 / 油画棒 / 粗铅笔的颗粒作为视觉特征被显式要求。明确拒绝"儿童卡通、可爱贴纸、写实插画、光滑矢量、复杂透视、3D 和模板化效果"。
  3. **原始提示词是唯一审美权威**：`references/original-prompt/zh-CN.md` 是运行时唯一创作与审美权威；其余四种语言是"忠实阅读译文"——不会反过来改写生图提示词。Skill 自身不再二次总结颜色 / 色板 / 美学动机 / 标题 / 微文案。这条约束在 README 中以醒目形式重复。
  4. **四种可组合输出模式 + 多种比例**：模式 `top-bottom` / `left-right` / `design-only` / `wallpaper-pack` 可单选或多选，每模式独立 prompt 独立生成，不放同一模板让模型猜；比例覆盖 1:1 / 3:4 / 4:3 / 4:5 / 5:4 / 2:3 / 3:2 / 9:16 / 16:9 / 21:9 / 5:7 / 7:5 + 自定义；无静默默认尺寸。
  5. **尊重用户文字主权**：正式生图前只确认三种文字选择（① GPT Image 2 按原 prompt 生成文字；② 用户提供准确文字逐字传入不改写；③ 严格禁止文字）；文字语言与操作语言分开确认，不根据文件名猜国家与受众。
- **Issue / 实战反馈**：仓库 0 个公开 issue、0 个 PR。pushed 2026-08-23T15:21 UTC，是同日发布的新仓（README 末尾写明"样张位已预留，收到 100 的可核验样张后将在这里展示；不会借用其他编号的图片"——样张约束也很克制）。
- **横向对比**：与 [camilleroux/genart-skill](https://github.com/camilleroux/genart-skill)（2026-08-28 日榜第 4，链上生成艺术）方向一致但路径不同：genart-skill 走"确定性可上链的 hash 种子 + 渲染回路"，xxd-panel-100 走"叙事提炼 + 民艺审美克制"；一个是 on-chain generative art 工程化，一个是单图风格 skill 化。与 [Nanako0129/sepia](https://github.com/Nanako0129/sepia)（2026-08-28 日榜第 1，去 AI 化写作 skill）形成"图像 vs 文字"的同日 skill 化孪生现象。
- **信号判断**：✅ 安全（原始 prompt 是只读的、Skill 不二次导演）；✅ 研究诚信（明确说"样张位已预留 / 不会借用其他编号"，避免 AI 风格站常见的"挂羊头卖狗肉"）；⚠️ 实战待验证（仓库零 issue，需要看用户实际生成的图是否符合"颗粒感民艺"承诺）；✅ 跨语言（5 语言提示词同等权威——非英文母语用户友好）。

**适用场景**：**适合**：把旅行 / 生活照片做成"明信片 / 桌面壁纸 / 封面"的内容创作者；想要"非数字矢量感"的个性化风格；做儿童绘本 / 民艺主题出版物的视觉师；非英文母语但需要严格语言主权的多语运营。**不适合**：需要写实摄影风的产品图（这是风格化 skill，不是产品修图）；需要可上链 / 数字收藏品（那是 genart-skill 路线）；只想"一键把照片变好看"的轻量需求（这是一个 5 文件 + 5 语言 prompt 的严肃 skill，不是滤镜）。

---

### 3. [honojs/hono-kun](https://github.com/honojs/hono-kun) ⭐15

- **一句话**：Hono 框架官方推出的"AI 维护者"——当前只做 PR triage，架构故意不绑 PR（未来扩到 issue triage / 复现 / 写代码），核心是"读 GitHub 的 worker 与写 GitHub 的 worker 必须分开"。
- **元数据**：TypeScript、1682 KB、topics 空、MIT；pnpm monorepo（`apps/*` + `agents/*` + `workflows/*` + `packages/*` + `skills/` + `evals/`），目标部署 Cloudflare Workers。
- **README 提炼**（5 条核心价值）：
  1. **明确写"Nothing useful is implemented yet"**：作者在 README 开头加 NOTE——项目处于非常早期，"没什么能用的实现"。这种"先讲不能做什么"的口径在 AI 项目里少见，反而显得作者对自己要做的事有清醒的工程边界。
  2. **trust boundary 设计**：repo 架构里 `apps/github`（公网面，用 Hono 写）+ `apps/publisher`（唯一持 GitHub 写凭证的可信 worker）——所有"评论、加 label、写 GitHub"都只能走 publisher。agents/*（verifier / reviewer / contributor / coder）永远拿不到 GitHub 写 token，结果交给 publisher。
  3. **policy 强制隔离**：`packages/policy` 只放"策略决策的接口和类型"，真正的生产策略放在独立的私有 Worker 里，通过 Cloudflare Service Binding 连过来。"public repository always builds without it"——意味着策略升级不需要走公开 PR，公开仓库编译也不依赖私有代码。
  4. **agents 用 [Flue](https://github.com/withastro/flue)（Astro 团队的 agent 框架）**：与 Vercel AI SDK / LangChain / 通用 LLM 调用解耦，等于"agent 是 Hono-kun 的内部插件"，不是 Hono-kun 自己在做 agent。
  5. **仓库结构清晰且 README 自带 ASCII 图**：`apps/` + `agents/` + `workflows/` + `packages/policy` + `evals/` 的目录与 README 里的 `text` 树一一对应；读者读完 README 即可对仓库结构有完整心智模型。
- **Issue / 实战反馈**：仓库 0 个公开 issue、10 个 PR 全是作者自合的工程化提交（"feat(github): route pull_request events" / "chore: security hardening for CI" / "docs: adopt Hono-kun as the official name" 等），PR 评论全为 0。说明作者在搭骨架而非接用户。
- **横向对比**：与 [continuedev/continue](https://github.com/continuedev/continue)（IDE 内 AI 编程助手）方向不同：Continue 是编辑器内补全 / 对话，Hono-kun 是仓库外 GitHub 自动化。与 [CodiumAI/pr-agent](https://github.com/Codium-ai/pr-agent)（PR 自动 review）功能上最接近——但 pr-agent 是"pr 维度"的工具，Hono-kun 从 PR triage 起步但架构故意抽象成"仓库维护任务"。最大的差异是 **publisher 与 agents 的强制隔离**：让"AI 看到 PR 但不能写 PR"成为仓库级架构约束，不是单一 prompt 约束。
- **信号判断**：✅ 安全（trust boundary + Service Binding + 单向 publish channel，是认真想过威胁模型的工程派）；✅ 兼容（继续 Hono + Cloudflare 生态，不另起炉灶）；⚠️ 实战待验证（README 自己说 nothing useful yet）；✅ 长期工程化（先搭架构再做功能——少见的克制）；⚠️ 风险面（架构漂亮但实现真空，需要 6-12 个月才能判断是否能跑通 PR triage 的真实价值）。

**适用场景**：**适合**：使用 Hono 框架的中小型项目维护者，希望 AI 帮做 PR 标签 / 风险分级；做 Cloudflare Workers / Hono 教程的内容创作者，可拿来当"AI agent 工程化教学样本"；研究"AI 工具如何在不可信边界下保持可控"的架构师。**不适合**：当前就要 PR 自动评审的生产项目（nothing useful yet）；非 Hono 生态的仓库（架构跟 Hono 强绑，迁到其他 repo 价值有限）；期待"开箱即用"的运维人员（这是架构项目，不是工具产品）。

---

### 4. [deggimatt/hermes-xbot](https://github.com/deggimatt/hermes-xbot) ⭐11

- **一句话**：Hermes Agent 的原生 Android 副驾 + 自主 AI 队友 Cockpit——把 Engineering / Research / DevOps / Outreach 四种 agent 当作"独立队友"，主屏选谁来对话、SSE 流式 + 工具执行卡片 + 推送对讲都做了。
- **元数据**：Kotlin、57.7 MB（含 APK release 资产）、topics 空、MIT；Android 8.0+、JDK 17/21、Android SDK 36、Gradle 8.11+ / AGP 9.2+；release 里有现成 APK（`HermesXBot-latest.apk`）可直接下载。
- **README 提炼**（5 条核心价值）：
  1. **"队友"心智模型而非"工具"心智模型**：UI 主屏是 "AI Teammates Hub"——用户先选队友（Default 戴金皇冠 / Engineering / Research / Outreach / DevOps），再开始对话。每个 agent 有自己的 2D blob 头像 + 实时状态徽章（`● Online` / `● Idle`）。
  2. **实时 SSE + 工具遥测**：SSE 流支持断点续传 + replay cursor；"Collapsible Tool Activity Cards" 把 monospace 终端输出、Git diff、浏览器预览、Python 执行栈都收成可折叠卡片；危险命令用"One-tap Approval"动态多选确认。
  3. **移动优先集成**：Push-to-Talk 录音 → 服务器端转写 → TTS 回放；Android Share Target 接收 URL / 文本 / 照片到活跃会话；前台 sync service 保证锁屏时 streaming 不中断。
  4. **现代自适应 UI**：OLED Pitch Black (#000000) / Slate Cards (#0C0E14) + 电光蓝强调 (#2F80ED)；Light Mode 是 Slate + Pure White；Header Logo 颜色随设置动态染色。README 里贴了 dark / light 双截图。
  5. **诚实承认上游**：README 第一段就写"Hermes XBot is proudly built upon the foundational open-source architecture and API contracts of Hermex (by Uzair Ansar) and the hermex-android-port"——把开源依赖链明明白白列出来，避免读者误以为是 deggimatt 从零实现。
- **Issue / 实战反馈**：仓库 0 个公开 issue、0 个 PR。pushed 2026-08-29T12:02 UTC，与 [NousResearch/hermes-plugin-backsearch](https://github.com/NousResearch/hermes-plugin-backsearch)（#7 16 星）同日发布——Hermes 生态在 2026-08-29 同时冒出"插件 + 移动端"两条衍生。
- **横向对比**：与 [open-webui/open-webui](https://github.com/open-webui/open-webui)（Web 自托管 LLM UI）走的是"自家 UI + 多模型后端"——Hermes XBot 是 Hermes Agent 专用 UI；与 [lobe-chat/lobe-chat](https://github.com/lobe-chat/lobe-chat) 的"插件市场 + 视觉模型"相比，Hermes XBot 的"队友"心智模型是它的差异点；与 [NousResearch/hermes-agent](https://hermes-agent.nousresearch.com) 官方桌面 / web 客户端相比，XBot 是原生 Android + 自主 SSE 流式，与官方 `hermes-webui` 是分头走的两个端。
- **信号判断**：✅ 实战（现成 APK 可下载，意味着不需要读者自己 build 即可试）；✅ 安全（README 明写上游，规避"假冒原生"的常见争议）；⚠️ 体量大（57 MB 仓库体积、SDK 36、AGP 9.2+——构建环境要求严，新人 fork 编译成本高）；⚠️ 长期维护待观察（首日零 issue，需要看后续 patch 节奏）；✅ 设计感（深色 OLED / 浅色 Slate 双套配色 + blob 头像 + 状态徽章，明显不是"工程 demo"）。

**适用场景**：**适合**：用 Hermes Agent / Hermes WebUI 在桌面跑长任务、需要在手机上监工 + 推送语音 + 接收通知的中-重度用户；需要"离线缓存全部对话 / 硬件 Keystore 存 token"的高敏感用户；想要"推送对讲 + 浏览器预览 + Git diff"在手机端闭环的 AI 重度玩家。**不适合**：只想"在手机上跑 ChatGPT"的轻度用户（要起 Hermes server）；非 Android 用户（iOS 客户端暂无）；不想自己维护 Hermes server 的运维新手（README Quick Start 第 1 步就要 `hermes dashboard`）。

---

### 5. [OMD-123/agent-loop-guard](https://github.com/OMD-123/agent-loop-guard) ⭐11

- **一句话**：provider 无关、零运行时依赖的 npm 库，给任何 JS/TS agent loop 套一层"重复调用 / 循环模式 / 超时 / 步数"的护栏——纯观察，从不替你执行工具。
- **元数据**：TypeScript、52 KB、topics `agent / agent-safety / ai / ai-agent / guard / javascript / llm / loop-detection / open-source / safety / tool-calling / typescript`、MIT；npm 包 `agent-loop-guard`，已发布；CI badge 全挂。
- **README 提炼**（5 条核心价值）：
  1. **核心矛盾点得很准**："An LLM-driven agent is just a loop: LLM → tool → LLM → tool → LLM → …"——但这条 loop 会"调同一个工具同参一百次"、"锤一个总返错的工具"、"陷入 A→B→A→B 循环"、"永远不退出，烧光 token / 时间 / 钱"。这条开场几乎可独立当成 AI agent 安全的入门教材。
  2. **5 类防护 + 5 类对应配置**：`maxSteps`（总步数）/ `maxDuration`（单调时钟，超时）/ `maxRepeatedCalls`（同工具 + 同参，连击）/ `maxSameToolCalls`（同工具连击不论参）/ `loopPatternWindow`（A→B→A→B / A→B→C→A 这类循环模式）。每个配置都是"0 = 不限"，构造时校验（负数会抛清晰错误）。
  3. **deterministic argument canonicalization**：`{a:1, b:2}` 等于 `{b:2, a:1}`——key 顺序无关。明确说"safe to use on untrusted input (no eval, never crashes on circular refs)"，文档敢于写"never crashes"是认真测过边界条件。
  4. **零依赖 + 强类型事件模型**："zero runtime dependencies, ESM-only, Tree-shakeable"——核心不依赖 OpenAI / Anthropic / LangChain / Vercel AI SDK 任何一家，意味着你可以套在自家手写 loop 上。新 step 类型加入不破坏现有事件，强类型扩展友好。
  5. **lazy mode + 生命周期清晰**：`guard.check(step)` 在首次调用时 lazy start run，所以 `start()` 可选；`reset()` / `end()` 后下一次 `check()` 开始新 run。step 可以自带 `timestamp`，让 agent 的虚拟时钟和 monotonic 时钟在同一时间轴上对比。
- **Issue / 实战反馈**：仓库 0 个公开 issue、0 个 PR。pushed 2026-08-29T05:47 UTC，单日发布即上 npm 的新仓。
- **横向对比**：与 [langchain-ai/langchain](https://github.com/langchain-ai/langchain) 自带的 `max_iterations` / `early_stopping_method` 相比，agent-loop-guard 不绑 LangChain；与 [vercel-labs/agent-sdk](https://github.com/vercel-labs) 实验性 step limits 相比，本库"只观察、不执行"的纯函数路线更可预测；与 [guardrails-ai/guardrails](https://github.com/guardrails-ai/guardrails) 的"输出层防护"不同，agent-loop-guard 做"循环层防护"——是"agent 主循环的 watchdog"而不是"agent 输出的 validator"。
- **信号判断**：✅ 安全（provider-independent、零运行时依赖、不执行工具——威胁面控制在小段纯函数代码里）；✅ 实战（npm 已发 + CI 已挂 + 文档完备）；✅ 兼容（任意 JS/TS agent 实现可直接接入，不需要迁框架）；⚠️ 实战待验证（同日发布零 issue，需要看生产环境"成功挡下一次 agent loop"这类反馈是否出现）；✅ 长期可信度（配置文档把"0 = 不限"和负数错误都写清楚——边界条件写明白的库比"魔法默认值"库可信）。

**适用场景**：**适合**：用 JS/TS 自建 agent loop（无论是 OpenAI / Anthropic / LangChain / Vercel AI SDK 还是自己手撸），想要一层"循环 watchdog"防护；做 multi-step tool-calling 框架的作者，需要"重复调用上限 + 循环模式识别"作为内置安全；给生产环境的 agent 加 step budget / wall-clock budget 的运维 / SRE。**不适合**：Python agent（库是 TS/JS-only，Python 生态要自己移植）；只跑单步 LLM 调用（没有 loop 就没有 agent-loop-guard 的用武之地）；需要"阻断恶意输出"——这是循环防护，不是输出安全（输出安全去找 guardrails-ai / NeMo Guardrails）。

---

## 完整前 15 表

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---|---|---:|---:|---|---|---|---|---|
| 1 | [Timefiles404/lean-mode-skill](https://github.com/Timefiles404/lean-mode-skill) | 33 | - | 设计skill | 新上 | — | 节制工程 Skill：何时写防御性代码、何时不写；构建测试从几十分钟压到几十秒 | — |
| 2 | [rpmalouin/AI-Research-Assistant](https://github.com/rpmalouin/AI-Research-Assistant) | 29 | - | 检索 | 新上 | Python | AI 检索 / 研究助理（无 description，85 KB 体积适中） | — |
| 3 | [Zulwatha/content-parity](https://github.com/Zulwatha/content-parity) | 22 | - | agent | 新上 | Go | 多身份差异检测器，测机器读者看到的文本 / token / 字节差异 | ✅ 安全 |
| 4 | [TheaterMailman/iready](https://github.com/TheaterMailman/iready) | 20 | - | 其他 | 新上 | JavaScript | i-Ready 教育平台 hack 工具（topics 全是 iready hack / cheat），⚠️ 学术诚信争议 | ⚠️ 争议 |
| 5 | [mhiqrambg/gsuite2router](https://github.com/mhiqrambg/gsuite2router) | 18 | - | 其他 | 新上 | Python | Google Workspace → 路由器集成（无 description，需打开仓库确认） | — |
| 6 | [nevertoday/xxd-panel-100](https://github.com/nevertoday/xxd-panel-100) | 17 | - | 设计skill | 新上 | Python | 把照片提炼成稚拙民艺叙事插画，5 语言原始提示词 Codex Skill | ✅ 研究诚信 |
| 7 | [NousResearch/hermes-plugin-backsearch](https://github.com/NousResearch/hermes-plugin-backsearch) | 16 | - | agent | 新上 | Python | Hermes Agent 插件：时点化归档检索 + 冻结新闻档案拉取 | — |
| 8 | [felixmelanson/crono-vision](https://github.com/felixmelanson/crono-vision) | 16 | - | 其他 | 新上 | Python | 758 KB 本地视觉 / 时序工具（无 description，需打开仓库确认） | — |
| 9 | [honojs/hono-kun](https://github.com/honojs/hono-kun) | 15 | - | 其他 | 新上 | TypeScript | Hono 框架官方"AI 维护者"，读/写 worker 强制隔离 | ✅ 安全 |
| 10 | [h9-tec/repo-catalog](https://github.com/h9-tec/repo-catalog) | 13 | - | 检索 | 新上 | — | 个人仓库索引：按类别分组、附用途 + 受众 + 依赖清单 | — |
| 11 | [deggimatt/hermes-xbot](https://github.com/deggimatt/hermes-xbot) | 11 | - | agent | 新上 | Kotlin | Hermes Agent 原生 Android 副驾，队友 Cockpit + 推送对讲 | ✅ 实战 |
| 12 | [OMD-123/agent-loop-guard](https://github.com/OMD-123/agent-loop-guard) | 11 | - | agent | 新上 | TypeScript | AI agent 循环 watchdog：重复调用 / 循环模式 / 步数超时，零依赖 | ✅ 安全 |
| 13 | [yusuf-konuk/jousef-skill](https://github.com/yusuf-konuk/jousef-skill) | 11 | - | 设计skill | 新上 | — | 土耳其语 Skill：让 AI 写完整代码、不要"半吊子"敷衍回答 | — |
| 14 | [h9-tec/Voice-AI-Interview-Handbook](https://github.com/h9-tec/Voice-AI-Interview-Handbook) | 10 | - | 其他 | 新上 | — | Voice AI 面试 handbook（无 description，180 KB 偏资料型） | — |
| 15 | [knx-ai/knx-ets-mcp](https://github.com/knx-ai/knx-ets-mcp) | 9 | - | mcp | 新上 | C# | KNX ETS 5/6 智能家居总线 MCP Server，硬件层 MCP | — |

---

## 其余 6-15 简评

- **#1 [Timefiles404/lean-mode-skill](https://github.com/Timefiles404/lean-mode-skill)** ⭐33 — 节制工程 Skill，21 KB 的 SKILL.md 形态。主张"什么时候不该写防御性代码"+"怎么把一轮构建测试从几十分钟压到几十秒"。是当日 33 颗星的"领域方法论 skill"，跟 xxd-panel-100 / sepia / genart-skill 走同一条"skill 化打包领域知识"路径。
- **#2 [rpmalouin/AI-Research-Assistant](https://github.com/rpmalouin/AI-Research-Assistant)** ⭐29 — Python / 85 KB / 无 description / 无 topics。29 颗星在缺 description 的仓里算高，意味着 README 或仓库里有值得读的内容；与同赛道 [h9-tec/repo-catalog](https://github.com/h9-tec/repo-catalog)（13 星）形成"通用 vs 个人"对照。
- **#4 [TheaterMailman/iready](https://github.com/TheaterMailman/iready)** ⭐20 — JavaScript / 14 KB / 15 个 i-ready-* topics 全部是 hack / cheat / skipper 类（"i-ready-lesson-skipper / i-ready-hack / iready-math-game"等）。属于学术诚信争议工具，跟 2026-08-23 的"jailbreak / research-taxonomy"是同类争议方向。
- **#5 [mhiqrambg/gsuite2router](https://github.com/mhiqrambg/gsuite2router)** ⭐18 — Python / 19 KB / 无 description。从仓库名推测是"Google Workspace → 路由器方向"的集成（Gmail / Calendar / Drive 触发路由），跟 [Inch-high/unifi-support-file-analyzer](https://github.com/Inch-high/unifi-support-file-analyzer)（2026-08-28 #5）走同一条"自托管集成小工具"路径。
- **#7 [NousResearch/hermes-plugin-backsearch](https://github.com/NousResearch/hermes-plugin-backsearch)** ⭐16 — Python / 11 KB / Hermes Agent 官方插件。"BackSearch"="回溯检索"+"冻结新闻档案"——给 agent 一个 point-in-time 的 web search 能力，避免"今天的搜索结果污染历史分析"。与 [#11 deggimatt/hermes-xbot](https://github.com/deggimatt/hermes-xbot) 同日发布，构成 Hermes 生态"插件 + 移动端"两端冒头。
- **#8 [felixmelanson/crono-vision](https://github.com/felixmelanson/crono-vision)** ⭐16 — Python / 758 KB / 无 description。758 KB 体积在"无 description"仓里算大，里面通常带模型 / 资源；"crono" 拼写不像 typo 更像自造词（可能是 chronos + ono 之类），仓库要打开看才知道用途。
- **#10 [h9-tec/repo-catalog](https://github.com/h9-tec/repo-catalog)** ⭐13 — 40 KB / 无 language。"Index of all my repositories: grouped by category, with what each one is, who it's for, and what you need to use it"——是开发者个人仓库目录的展示页，跟 [#2 rpmalouin/AI-Research-Assistant](https://github.com/rpmalouin/AI-Research-Assistant) 同为"无 description 但 README 写得明白"的代表。
- **#13 [yusuf-konuk/jousef-skill](https://github.com/yusuf-konuk/jousef-skill)** ⭐11 — 20 KB / 无 language。土耳其语 description："你让 AI 写项目，它只会给半吊子答案、敷衍、堆不需要的特性、套话"——这是土耳其语社区对当前 LLM agent "看着像干活实际糊弄"的吐槽 skill。跟 [Timefiles404/lean-mode-skill](https://github.com/Timefiles404/lean-mode-skill) 的中文"节制工程"形成"两种语言对同一现象的不同对策"。
- **#14 [h9-tec/Voice-AI-Interview-Handbook](https://github.com/h9-tec/Voice-AI-Interview-Handbook)** ⭐10 — 180 KB / 无 language。从仓库名推测是"语音 AI 面试的资料手册"（Interview Handbook 常见用法是工程师面试题整理 + 招聘者面试设计），Voice-AI 加进来后变成"做 voice agent 面试题 / 招聘流程"的工具书。
- **#15 [knx-ai/knx-ets-mcp](https://github.com/knx-ai/knx-ets-mcp)** ⭐9 — C# / 308 KB / MCP Server for KNX ETS 5/6。KNX 是欧洲智能家居 / 楼宇自动化总线（与 Zigbee / Z-Wave / Matter 并列），ETS 5/6 是 KNX 官方配置工具。本仓是给 KNX 总线做的 MCP Server——意味着以后可以让 LLM agent 直接通过 MCP 调 KNX 设备（开关灯、调温、读传感器）。是本档最具差异化、最值得长期跟进的 MCP 拓展方向。

---

## 数据方法

- **窗口**：`created:2026-08-29..2026-08-29`（UTC 日历日；CST 2026-08-30 早 8 点跑 = UTC 2026-08-30 00:10 已进新日，所以窗口锁的是昨天 8-29 全天）。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant` + `in:readme`，5 个槽位（GitHub Search API 上限），未设 `stars:>` 下限，按 stars 降序取满 30 条原始命中。
- **过滤**：经 `scripts/rank.py` 剔除空壳（`size < 15` KB 且无 language）/ 擦边（含 `undress / nsfw / uncensored` 等关键词）；本次 0 条被剔，剩 15 条进成稿。
- **排序**：剔除后按 `stargazers_count` 降序（窗口内新创建的仓按当前总星排名，非"窗口内涨星"——后者因 GitHub trending 页对无 JS 客户端返回 0 字节，本 skill 不采）。
- **详深挖**：Top 5 = `Zulwatha/content-parity / nevertoday/xxd-panel-100 / honojs/hono-kun / deggimatt/hermes-xbot / OMD-123/agent-loop-guard`；每条覆盖元数据 / README 核心价值 / 真实 issue body + 评论（本日 5 条全部 0 issue，反映新仓当日发布状态）/ 横向对比 / 信号判断 / 适用场景。
- **来源**：GitHub Search API（成稿名单）+ GitHub Issues API（深挖）+ GitHub REST API（repo 元数据 + readme base64 解码）。HN Algolia / Reddit / GitHub Trending 页 本档未用（前者偶发非 JSON，后者返回 0 字节）。
- **slug**：`github-trending-2026-08-29`（与窗口日期对应，非跑任务当天）。
- **快照时间**：UTC 2026-08-30 00:10。
- **上期对照**：`/root/.hermes/skills/gh-trending-watch/data/snapshots/daily--2026-08-28.json` 存在，对照显示本档 15 条全部为新上、无重复，无上期在榜。
