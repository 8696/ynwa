## GitHub 日榜 · 2026-08-31 · agent harness 双榜登顶 + Skill/CLI 工具箱类集体冒头

数据口径：GitHub Search API `created:2026-08-31..2026-08-31` + `archived:false` + `(ai OR llm OR agent OR mcp OR assistant) in:readme`，按 `stars` 降序取窗口内新创建仓库；剔除 `undress/nsfw` 等成人词与空壳（`size<15KB` 且 `language` 为空）。本期 30 条原始 → 18 条空壳/擦边剔除 → 12 条进榜（未达 15 满档）。快照时间 `2026-09-01T00:10:30Z`。

### 核心信号

- **Agent harness（"模型当 controller"）首次以独立评测身份登场**：[AMAP-ML/LoopArena](https://github.com/AMAP-ML/LoopArena) 与 [Tyche-MKR/SmartOpenMAIC](https://github.com/Tyche-MKR/SmartOpenMAIC) 同日进 Top 10，但思路完全不一样——前者把大模型放在"循环控制器"位置去测谁调度更好；后者让一群 agent 当"老师"陪学生上课。
- **Skill / CLI 工具箱类集中爆发**：[subsy/skill-cabinet](https://github.com/subsy/skill-cabinet)、[luxurylifestyleco/skill-router](https://github.com/luxurylifestyleco/skill-router)、[Tyche-MKR/scientific-agent-skills](https://github.com/Tyche-MKR/scientific-agent-skills)、[2akouwu/codex-cli-portable-setup-kit](https://github.com/2akouwu/codex-cli-portable-setup-kit) 四个都贴着 Agent Skills/Codex CLI 标准做包装。Skill 标准化窗口期正在被各种方向同时占位。
- **小型"协议网关/账号池"型项目第一次冒出**：[basketikun/claude2api](https://github.com/basketikun/claude2api) 把 Claude 网页端转成 OpenAI/Anthropic 兼容 API + 账号轮询 + 流式输出，单日 24⭐。官方没出"Claude 公共 API 配额"前，这类网关每出现一次都会被"野生 Claude 用户"搬走。
- **样本构成偏差**：本期 12 条全英文仓库、9 条 README/描述英文、3 条无描述（[subsy/skill-cabinet](https://github.com/subsy/skill-cabinet) / [blendi-remade/interdimensional-game](https://github.com/blendi-remade/interdimensional-game) / [mizorewww/course2md](https://github.com/mizorewww/course2md)），0 条中文项目上榜（[yilujian/easy-writing](https://github.com/yilujian/easy-writing) 是唯一中文仓库但 README 主题是网文写作）。窗口期中文 AI 项目偏冷，是日历日效应，非长期趋势。
- **快照对比**：相对上一期 [2026-08-29 日榜](https://github.com/8696/ynwa/blob/feat/pro/assets/articles/github-trending/github-trending-2026-08-29.md) 全部 12 条为新上榜（首日全部即掉榜的仓占比 100%，是 GitHub Search 默认窗口 + 短时效应叠加）。`compare.star_delta` 全空，下期跑出来的 9 月 1 日榜会显示本日仓的 Δstars。

### 重点深挖

**1. [AMAP-ML/LoopArena](https://github.com/AMAP-ML/LoopArena)** ⭐70 · Python · 68 MB · 高德地图 DreamX 团队

定位："Loop Engineering" 把长跑开发任务拆成可控循环，让大模型当 controller 调度 worker reporter；评测的是 controller 能力，不是单模型写代码能力。配套 [arXiv:2608.28281](https://arxiv.org/abs/2608.28281) 与 [项目官网](https://amap-ml.github.io/LoopArena/)。

仓库元数据：`topics = benchmark / coding-agents / evaluation / llm / loop-engineering / software-engineering`；License Apache 2.0；Python 3.10+；`size=68MB`（含 benchmark 套件数据）；`created=2026-08-31T02:47Z` → `pushed=2026-08-31T06:07Z`，同日内 release 0.1.0。

README 核心价值（读完 12 KB 后提炼）：① 把"模型当 controller"这件事从 SWE-bench 的"考题"维度抽出来，变成"loop engineering"框架——controller 模型决定 worker 什么时候检查、要不要重试、何时 escalate；② 评测分离明确：被测的是 controller（决策方），worker 是固定的 coding agent，evidence + verification 站独立；③ 提供可复现协议 (`docs/protocol.md`) 和 [Hugging Face paper 镜像](https://huggingface.co/papers/2608.28281)，配套 HF Datasets 上传已挂 [issue #1](https://github.com/AMAP-ML/LoopArena/issues/1) "Release LoopArena on Hugging Face"（open · 0 评论）。

Issue 与社区反馈：仅 1 条 open issue，是 Hugging Face 数据集 release 请求（[#1](https://github.com/AMAP-ML/LoopArena/issues/1)）；暂无用户实战 PR 评论，因发布同日。HF paper 已 26-08 月底挂上，可推断作者团队目标是赶 ICSME/COLM 风格工作流。

横向对比：与 SWE-bench Verified 比——SWE-bench 评测"模型直接改代码的得分"，LoopArena 评测"模型调度另一个模型改代码的得分"。前者是单 agent，后者是 hierarchy agent。同样与 Anthropic [multi-agent research](https://www.anthropic.com/engineering/built-multi-agent-research-system)、DeepSeek 多 agent harness 思路同源，但 LoopArena 把"控制器选型"做成可量化评测，且公开协议让第三方接入。

信号判断：✅ 研究诚信（arXiv+HF 双挂，协议公开） · ⚠️ 兼容（同日刚 release，第三方 coding agent 接入规范仍在 `#1` 等待 HF 发布完成） · 🟢 增长（高德 DreamX 团队背书 + arXiv 流量，预期 1-2 周内冲到 200⭐+） · 🟡 安全（评测框架本身无对外暴露面，但跑全 benchmark 的 worker 仓库若被接需要隔离）。

**适用场景** · **适合**：想量化自家 controller 模型 / harness 选型的工程团队；做多 agent 编排研究的实验室 · **不适合**：只想换更好的代码补全模型（直接看 SWE-bench 即可）；小项目自用（68 MB benchmark 套件偏重）。

---

**2. [productdevbook/cizgile](https://github.com/productdevbook/cizgile)** ⭐63 · TypeScript · 1.3 MB · 个人作者 productdevbook

定位：零依赖 URL slug 引擎，严格按 RFC 3986 / RFC 3987 实现 IRI↔URI；纯 TS、ESM、Node 20+/Bun/Deno/浏览器/Edge Worker 全兼容，19 个 locale 字符转写（tr/de/da/sv/uk/bg 等）。

仓库元数据：`topics = esm / iri / percent-encoding / rfc3986 / rfc3987 / seo / slug / slugify / transliteration / tree-shakeable / typescript / unicode / uri / url / zero-dependency`；License 见 [LICENSE](https://github.com/productdevbook/cizgile/blob/main/LICENSE)；`size=1.3MB`（含测试 + locale 表）；[npm](https://npmjs.com/package/cizgile) + [npmx.dev 镜像](https://npmx.dev/package/cizgile) 双发布。

README 核心价值（读完 19 KB 后提炼）：① "correct by construction"——生成的每个 ASCII slug 都是 RFC 3986 `segment-nz-nc` 合法段，零 percent-encode、零误吞 scheme；② 19 locale 转写表 + Unicode slug 选项（保留非 ASCII），土耳其语 İ/ş 等敏感字符处理规范；③ `maxLength` 按 UTF-16 code unit 计数（这一点 [#29](https://github.com/productdevbook/cizgile/issues/29) 已提文档修正）；④ ESM-only + tree-shakeable，无任何运行时依赖。

Issue 与社区反馈（10 条已全 close 的微调型 PR-issue，作者一人节奏快）：[#28](https://github.com/productdevbook/cizgile/issues/28) 提 RFC 3987 §4.2 bidi 规则（mixed direction/digits at RTL），[#30](https://github.com/productdevbook/cizgile/issues/30) 提 README 对比表没说明 Django/Rails 保留下划线（已 close），[#31](https://github.com/productdevbook/cizgile/issues/31) 加 IRI 级别 predicates（isIunreserved/isIpchar/isIriReference），[#32](https://github.com/productdevbook/cizgile/issues/32) 加 Appendix C URI 提取助手。作者响应模式：直接 close + commit，全部当天处理。

横向对比：与 GitHub 主流 slugify ([sindresorhus/slugify](https://github.com/sindresorhus/slugify)、[slugify/slugify](https://github.com/slugify/slugify)、Django 自带 slugify) 比——前者偏 IRI 严格合规 + RFC 3986/3987 双标准 + 零依赖 + tree-shakeable；后者依赖更少但只做"看着像 slug"，不保证 RFC 合规。cizgile 的差异点是 SEO/安全场景里"URL 不能让爬虫/中间件误解析"，例如 `/foo.bar` 不会被 `slugify('foo.bar')` 误成 `.` 路径分隔符（按 segment-nz-nc 排除）。

信号判断：✅ 实战（npm 已有下载量，作者 issue 处理速度 < 24h） · 🟢 兼容（19 locale 覆盖主流欧洲语种，中文/日文/韩文仅 Unicode slug 路径） · 🟢 增长（SEO/安全场景刚需，作者一人维护速度极快） · 🟡 安全（slug 用途本身是 public，无 RCE 面）。

**适用场景** · **适合**：SEO 站/多语言站/需要 IRI 严格合规的 URL 处理 · **不适合**：只需"看着像 slug 不挑标准"的轻量场景（slugify 一行就够）。

---

**3. [Tyche-MKR/scientific-agent-skills](https://github.com/Tyche-MKR/scientific-agent-skills)** ⭐62 · Python · 248 MB · K-Dense AI 出品

定位：把"任意 AI agent 变 AI 科学家"的技能包——163 个开箱即用验证过的 skills + 100+ 科学数据库，覆盖生物/化学/医学/药物发现。兼容 Cursor / Claude Code / Codex / Pi / Antigravity，以及开放的 Agent Skills 标准。README 宣称"被 190,000+ 科学家使用"。

仓库元数据：License MIT；`size=248MB`（含 100+ 数据库本地副本）；Version 2.65.0；Badge 同时打 [agentskills.io](https://agentskills.io/) + [agent-plugins.org](https://agent-plugins.org/) 两个标准；CI 含 [security-scan](https://github.com/K-Dense-AI/scientific-agent-skills/actions/workflows/security-scan.yml) + [skill-tests](https://github.com/K-Dense-AI/scientific-agent-skills/actions/workflows/skill-tests.yml) 两条 workflow；社交账号铺 X/LinkedIn/YouTube/Reddit 全渠道。

README 核心价值（读完 72 KB 后提炼）：① "Claude Scientific Skills is now Scientific Agent Skills"——2025 年起的 [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) 在 2026-08 改名扩标准，从只支持 Claude Code 变成支持任何遵循 Agent Skills 协议的 agent；② 数据库本地副本是杀手锏——100+ 生物医学数据库（UniProt、PubChem、ChEMBL、ClinicalTrials.gov 等）的本地化让科研用户能在不联网的环境跑；③ 与 [agentskills.io](https://agentskills.io/) 标准同步，互操作目标是 Anthropic 之外也能用。

Issue 与社区反馈：当前 0 issues（同日 release 效应），但 README 链回原 [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/scientific-agent-skills/blob/main/CHANGELOG.md) 的迁移说明；迁移涉及品牌/IP/兼容性，预期 1-2 周会冒出"X skill 在 Y agent 上跑不起来"的实战反馈。

横向对比：与 [scientific-assistant/skills](https://github.com/scientific-assistant/skills)、Anthropic Skills ([anthropic-experimental/skills](https://github.com/anthropics/skills)) 比——前者商业运营规模大（190k 用户）、数据库本地化最深；Anthropic 官方 Skills 通用性更好但不做科学领域深耕；[scientific-assistant/skills](https://github.com/scientific-assistant/skills) 同赛道但偏个人维护。差异点是 K-Dense 已经做完"产品化"（CI/标准/迁移说明/社交矩阵），其他还在堆 skill 阶段。

信号判断：✅ 研究诚信（数据库来源全部 README 列源） · 🟢 实战（K-Dense 母公司商业化背景，CI 自动化覆盖） · ✅ 兼容（标准双挂 agentskills.io + agent-plugins.org） · ⚠️ 增长（已迁移/重命名，旧仓 [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) 还在累积新 issue，新仓刚并入；下期需要观察新 issue 数） · 🟡 安全（科学数据库可能有 license 限制——CI 里 [security-scan](https://github.com/Tyche-MKR/scientific-agent-skills/actions/workflows/security-scan.yml) 是必备）。

**适用场景** · **适合**：科研人员/药物发现团队的本地 agent 工作流；不想每个 agent 重复装 100+ 数据库的场景 · **不适合**：通用软件工程师（这堆 skill 大部分用不到）；硬实时小模型（24 MB+ 数据库不适合端侧）。

---

**4. [yilujian/easy-writing](https://github.com/yilujian/easy-writing)** ⭐28 · Vue · 19 MB · 个人作者 yilujian

定位："易创"——纯本地、开源的网文写作桌面软件，BYOK（自备 API Key）、AGPL-3.0 协议、SQLite 本地存储。支持 DeepSeek/通义千问/智谱/Kimi/OpenAI 等所有 OpenAI 兼容接口，针对起点/番茄/七猫/晋江等中文网文平台。

仓库元数据：License AGPL-3.0；`topics = ai-writing / ai-writing-assistant / byok / creative-writing / desktop-app / local-first / novel-writing / openai-compatible / tauri / vue3 / web-novel / writing-tools`；`size=19MB`（含打包资源）；`created=2026-08-31T09:22Z` → `pushed=2026-08-31T14:47Z`，发布日仍在迭代。

README 核心价值（读完 4 KB 后提炼）：① "数据在你手里"——作品/设定/写作记录存本机 SQLite，定时自动备份成 txt + json；② BYOK——API Key 存本机，请求直连服务商，账本记录每次调用；③ 提示词全开放——本机 md 文件，界面可视化改或直改文件，连采样温度都能调；④ 编辑器是 [TipTap](https://tiptap.dev/) 富文本 + 卷/章目录树 + 自动保存（160ms 本地落盘）+ 历史版本回看；⑤ AI 工作流："灵感 → 大纲 → 设定 → 建书 → 逐章自动生文"，断点可续；⑥ 内置爬虫抓起点/番茄/七猫等 80+ 排行榜（用用户自己的网络）。

Issue 与社区反馈：当前 0 issues。作者在 README 末尾放"商业合作与联系"——AGPL-3.0 同时意味着"商用必须开源你的修改"。

横向对比：与海外 [Novelcrafter](https://novelcrafter.com/)、[Sudowrite](https://www.sudowrite.com/)、国内 [彩云小梦](https://www.xiaomengai.com/)、[AI 小说家](https://www.aixs.cc/) 比——海外产品订阅制 + 闭源 SaaS；国内同类多数闭源 + 云端。easy-writing 的差异点是把"作品数据 + 提示词"全部放本机（local-first）+ 提示词以 md 文件可改可版本控制；BYOK 不抽成 token 费。对中文网文平台的"敏感词检测 / 章节节奏 / 排行榜风向"是本土化做得最深的一款。

信号判断：✅ 实战（README 自述"由长期线上运营的写作平台客户端改造而来"，编辑器和自动保存已经过真实作者打磨） · ✅ 兼容（OpenAI 兼容接口 = 几乎所有主流模型都能用） · 🟢 增长（中文网文作者群是真实刚需，AGPL 协议反而是过滤器只留真正想用的） · 🟡 安全（AGPL-3.0 是双刃剑——用户保护好，但任何"我能不能把它改闭源发给我自己的 SaaS 用户"都得读完协议） · ⚠️ 数据：内置爬虫抓排行榜的合规性，作者在 README 没明说哪些站是 robots.txt 允许的。

**适用场景** · **适合**：中文网文作者；想要把作品 + 提示词彻底攥在自己手里的写作者 · **不适合**：英文写作市场（无对应 locale 数据）；纯 SaaS 思维用户（AGPL 会让你以为"免费"但商用门槛高）。

---

**5. [Tyche-MKR/SmartOpenMAIC](https://github.com/Tyche-MKR/SmartOpenMAIC)** ⭐27 · TypeScript · 100 MB · THU-MAIC 出品

定位："Open Multi-Agent Interactive Classroom"——一键部署的多 agent 互动课堂。学生学什么由一群 agent 当老师陪；Demo 在 [open.maic.chat](https://open.maic.chat/)；配套论文 [JCST'26](https://jcst.ict.ac.cn/en/article/doi/10.1007/s11390-025-6000-0)；Vercel 一键 clone。

仓库元数据：License MIT；`size=100MB`（含示例课程数据）；`created=2026-08-31T13:02Z` → `pushed=2026-08-31T13:04Z`，同日内 freeze；飞书 [User Guide (EN)](https://my.feishu.cn/wiki/UIfKw9Knti0LcKkTxDNcqlUrnzh) + [体验指南 (中文)](https://lcn6dqn3m0yr.feishu.cn/wiki/CkQSwHFdzibQFvkGzwPcmUOfnXg) 双文档。

README 核心价值（读完 48 KB 后提炼）：① "immersive, multi-agent learning experience in just one click"——把多 agent 框架从"代码生成/研究助手"扩到"教育"；② 配套论文（JCST'26）让 demo 不是"玩具"；③ 一键 Vercel clone——用户只需要在 `.env` 里填至少一个 LLM API key，OpenAI/Anthropic 都行；⑤ OpenClaw 集成 badge 暗示 Anthropic 协议层兼容。

Issue 与社区反馈：当前 0 issues（同日 release）。但仓库元数据 `html_url` 指向 [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) 是 THU（清华）MAIC 实验室的活跃仓，本次 Tyche-MKR fork 后扩 README + 改 brand；预期 THU 主仓那边会同步收到 PR。

横向对比：与 [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) 主仓比——本次 fork 等于把"实验室 demo"变成"个人 brand 化的可一键部署产品"。与 [agentbank-core](https://github.com/agentbank-core)、[Adept ACT](https://www.adept.ai/blog/act-1) 比——agentbank/Adept 是通用 agent harness，"教育场景"是垂直场景；smart-open-maic 差异点是配套学术论文（JCST'26）+ 飞书双语文档（中文教育市场刚需）。

信号判断：✅ 研究诚信（JCST'26 论文 + 实验室出处） · 🟢 实战（Vercel 一键部署降低门槛） · ⚠️ 兼容（多个 LLM provider 但需用户自配 key，无 serverless 内置额度） · 🟡 增长（fork 化 personal brand 有利有弊——主仓 MAIC 流量导入 fork，但社区可能选主仓） · 🟢 安全（无登录态、无用户数据落库，部署在自己的 Vercel 账号里）。

**适用场景** · **适合**：教育产品开发者；想试"agent 当老师"概念又不想从零搭的教师/课程作者 · **不适合**：纯研究维度评测 controller 能力（看 [AMAP-ML/LoopArena](https://github.com/AMAP-ML/LoopArena) 更合适）；无 Vercel 账号且不熟 serverless 部署的用户。

---

### 完整前 12 表

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---|---|---:|---:|---|---|---|---|---|
| 1 | [subsy/skill-cabinet](https://github.com/subsy/skill-cabinet) | 119 | - | 设计skill | 新上 | JavaScript | 119⭐ 但 description 空 + size 仅 101KB，疑似 skill 集合占位仓，待补 README | — |
| 2 | [blendi-remade/interdimensional-game](https://github.com/blendi-remade/interdimensional-game) | 103 | - | 其他 | 新上 | TypeScript | description 空，10MB 体量，"interdimensional-game" 关键词疑似跨维度生成式游戏 demo | — |
| 3 | [mizorewww/course2md](https://github.com/mizorewww/course2md) | 95 | - | 其他 | 新上 | Rust | description 空，Rust 实现，疑似把在线课程/视频转 markdown 的 CLI | — |
| 4 | [AMAP-ML/LoopArena](https://github.com/AMAP-ML/LoopArena) | 70 | - | agent | 新上 | Python | 高德 DreamX 团队的"模型当 controller"评测框架，arXiv 2608.28281 | ✅ 深挖 #1 |
| 5 | [productdevbook/cizgile](https://github.com/productdevbook/cizgile) | 63 | - | 其他 | 新上 | TypeScript | 零依赖 RFC 3986/3987 严格 slug 引擎，19 locale，npm 双发布 | ✅ 深挖 #2 |
| 6 | [Tyche-MKR/scientific-agent-skills](https://github.com/Tyche-MKR/scientific-agent-skills) | 62 | - | agent | 新上 | Python | K-Dense AI 把 Claude Scientific Skills 改名扩标准，163 skills + 100+ 科学数据库 | ✅ 深挖 #3 |
| 7 | [yilujian/easy-writing](https://github.com/yilujian/easy-writing) | 28 | - | 其他 | 新上 | Vue | "易创"——BYOK 纯本地网文写作桌面，AGPL-3.0，对中文网文平台深度优化 | ✅ 深挖 #4 |
| 8 | [Tyche-MKR/SmartOpenMAIC](https://github.com/Tyche-MKR/SmartOpenMAIC) | 27 | - | agent | 新上 | TypeScript | THU-MAIC 实验室 fork，"多 agent 互动课堂"一键 Vercel 部署，JCST'26 论文 | ✅ 深挖 #5 |
| 9 | [luxurylifestyleco/skill-router](https://github.com/luxurylifestyleco/skill-router) | 26 | - | 模型 | 新上 | JavaScript | VEDAXI 出品的"主 LLM 跑之前先做确定性 skill 路由"，隐私默认 | ✅ 实战（VEDAXI 商业产品） |
| 10 | [basketikun/claude2api](https://github.com/basketikun/claude2api) | 24 | - | 其他 | 新上 | Go | Go + Docker 把 Claude 网页端转 OpenAI/Anthropic 兼容 API，账号池 + 流式 + 多模态 | ⚠️ 争议（触碰 Claude ToS） |
| 11 | [2akouwu/codex-cli-portable-setup-kit](https://github.com/2akouwu/codex-cli-portable-setup-kit) | 23 | - | agent | 新上 | Python | OpenAI Codex CLI 的便携自动化 + 安全 + 钩子工具箱，Windows 主战场 | ✅ 实战（agentic-workflow skills） |
| 12 | [nguyenphap-mt/Hermes-Antigravity-OAuth-Plugin](https://github.com/nguyenphap-mt/Hermes-Antigravity-OAuth-Plugin) | 23 | - | 其他 | 新上 | Python | Hermes Antigravity 的 OAuth 插件 + 本地桥（与本仓库同名的"Hermes"无关，是 Antigravity AI 的客户端组件） | — |

### 数据方法

- **窗口**：UTC 日历日 `2026-08-31..2026-08-31`（脚本 `windows.py --route daily`），不含 9 月 1 日。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant in:readme`（5 槽位终极版，2026-08-23 与用户对齐）。
- **排序**：`sort=stars&order=desc`，**不**设 `stars:>N`。
- **剔除**：adult 关键词（`undress/nsfw/uncensored`）+ 空壳（`size<15KB` 且 `language` 为空）共 18 条。
- **不足满档**：原始 30 条 → 12 条上榜，**本档仅 12 条**，核心信号已说明；下期若上 15 满档会标"恢复满档"。
- **深挖名额**：日档满档 5，本期 5 全发（`deep_targets` 顺序 = AMAP-ML/LoopArena → productdevbook/cizgile → Tyche-MKR/scientific-agent-skills → yilujian/easy-writing → Tyche-MKR/SmartOpenMAIC`）。
- **快照**：`rank.py --write` 已写入 `db.json` 的 `compare` 字段，下期 `9 月 1 日榜` 可读到本日仓 Δstars。
- **slug 命名**：`github-trending-2026-08-31`（窗口所属日，不是跑任务当天 9 月 1 日）。
- **发布链路**：GitHub Search API → `rank.py` → 本 .md → `oss_manager put --force` → 改 db.json → `oss_manager put db.json --force` → git push `feat/pro`。Cron job 在 CST 08:10 自动跑，覆盖昨日 UTC 日历日。