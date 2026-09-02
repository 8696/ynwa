# GitHub 日榜 · 2026-09-01 · MiniMax H3 撞名三家同日上榜 + skill/agent 多家冒头

> 口径：抓取 GitHub Search API 在 UTC `2026-09-01..2026-09-01` 区间内新创建的、README 含 `ai / llm / agent / mcp / assistant` 任一关键词的仓库，按当前 stars 降序取前 15。快照时间 2026-09-02 00:10 UTC。同一窗口上期快照为空，本文为日榜首期快照。

## 核心信号

- **同日三仓撞名 MiniMax H3**：本日 Top 15 中出现三家命名跟 MiniMax H3（MiniMax 公司的视频生成模型）相关的仓 —— [lihaoyun6/ComfyUI-H3VAE_TRT](https://github.com/lihaoyun6/ComfyUI-H3VAE_TRT)、[LIUFelix2004/God-minmax-H3](https://github.com/LIUFelix2004/God-minmax-H3)、[gokayfem/h3-max-education](https://github.com/gokayfem/h3-max-education)。三者方向完全不同：一个做 ComfyUI 的 H3 VAE TensorRT 加速，一个做 H3 视频提示词库，一个做实时语音 + H3 视频生成教学应用；撞名只反映 MiniMax H3 在 AI 视频/教学圈的同期热度。
- **skill 类仓库集中冒头**：5 个 deep target 里有 2 个走 skill 形态 —— [kydlikebtc/awesome-grokbot](https://github.com/kydlikebtc/awesome-grokbot) 聚合 361 条 Grok Bot 配置、[boringmarketer/meta-ads-skill](https://github.com/boringmarketer/meta-ads-skill) 把 Meta 广告踩坑打包成 Agent 可读的 SKILL.md。skill 形态正在替代单纯 README/CLI 教程。
- **MCP 题材降到 2 条**：相比前几周 MCP 多家冒头的态势，本日 MCP 题材只剩 [romangojiberryAI/gojiberryai-sales-os](https://github.com/romangojiberryAI/gojiberryai-sales-os)（Grok Bot 销售外呼）和 [bsab/italia-mcp-servers](https://github.com/bsab/italia-mcp-servers)（意大利公共数据 MCP），不构成主流。
- **RL 训练 + 真实环境冒头**：[manifoldai-research/CAER.code](https://github.com/manifoldai-research/CAER.code)（因果动作重加权做世界模型训练）、[hbofz/NeSLE](https://github.com/hbofz/NeSLE)（CUDA 上千并发 NES 环境训 PPO）、[jonathanhawkins/microduck-lab](https://github.com/jonathanhawkins/microduck-lab)（Mac 无 CUDA 训 Pollen Microduck）三者方向都偏 RL 研究/训练栈，不是 LLM 应用。
- **agent/模型/MCP/其他 四类分布**：15 条命中 agent 4 条、模型 2 条、MCP 2 条、其他 7 条；英文项目占绝对多数（14/15），仅 [joeseesun/qiaomu-book-reader](https://github.com/joeseesun/qiaomu-book-reader) 一条以中文为母语。

## 重点深挖

### 1. [lihaoyun6/ComfyUI-H3VAE_TRT](https://github.com/lihaoyun6/ComfyUI-H3VAE_TRT) ⭐56
- 一句话：把 MiniMax H3 的 VAE 编出 TensorRT 引擎挂回 ComfyUI，单帧推理提速最高 1.7×
- **元数据**：Python / Apache-2.0 / 167 KB / 0 issue / 创建于 2026-09-01 01:51 UTC / 最后推送 2026-09-01 13:51 UTC。仓库无 topics，作者把"加速"押在 ONNX→TensorRT 编译路径上，避开 PyTorch eager 的解码开销。
- **README 核心价值**：仓库只解决一件事 —— 把 H3 视频工作流里"VAE 解码"这个吞吐瓶颈换成 TRT engine。三步走：装节点 → 拉 ONNX 模型放到 `ComfyUI/models/vae` → 第一次跑时用 `MiniMax-H3 TRT VAE Compiler` 节点把 ONNX 编出 TRT engine，之后用 `MiniMax-H3 TRT VAE Loader` 节点直接加载。模型托管在 HuggingFace `lihaoyun6/MiniMax-H3-VAE-ONNX`。README 不到 1KB，没承诺跨显卡兼容，只在示例机上验证过 1.7×。
- **issue 原文**：0 issue（新仓首日），暂无社区反馈。1 个 open issue 计数来自仓库的自动计数（暂无内容）。
- **横向对比**：同类有 [city96/ComfyUI-HunyuanVideoWrapper](https://github.com/city96/ComfyUI-HunyuanVideoWrapper)（Hunyuan 视频的 ComfyUI 节点）、[kijai/ComfyUI-HunyuanVideoWrapper](https://github.com/kijai/ComfyUI-HunyuanVideoWrapper)。两者走的是不同加速路线（Hunyuan Video 用 sageattn 替代注意力），TRT 路径对 H3 VAE 这种固定 shape 的小模型更稳，但作者得自己承担 ONNX 转换的兼容性。
- **信号判断**：✅ 实用信号 —— 直接命中"H3 出图慢"的痛点；⚠️ 兼容性风险 —— 仓内没列出支持 TRT 版本和 SM 架构，跨卡可能要重编 engine。
- **适用场景**：**适合**：在 ComfyUI 里跑 MiniMax H3 视频、且显卡 ≥ RTX 30 系、愿意花一次编译时间换后续稳定加速的人 · **不适合**：只用 H3 出图不混 ComfyUI、或者用 AMD/Apple Silicon 的用户

### 2. [kydlikebtc/awesome-grokbot](https://github.com/kydlikebtc/awesome-grokbot) ⭐52
- 一句话：把 `x.ai/bot` 上 361 条公开 Grok Bot 配置拉成带 CI 的双语 awesome-list，每条状态实时校验
- **元数据**：Python / NOASSERTION / 1.6 MB / 0 issue / 创建于 2026-09-01 02:30 UTC / 主页 `kydlikebtc.github.io/awesome-grokbot/` / topics 含 `awesome-list / grok / xai / llm / agents / catalog`。仓库体积里大部分是 catalog.json + retired.json + 验证用脚本。
- **README 核心价值**：README 把"区别于其他 awesome"讲得很硬 —— **361 条**当前有效分享（2026-09-01 当天逐个 fetch 而非抄别家列表）、**4 条**死链被隔离到 `retired.json`、**361 条**全部有手写中文摘要 + 来源归属、**32 条**名字漂移的也保留为 `aka` 字段可搜。配合 GitHub Pages 静态站 + URL hash 过滤，8 类（编程/收件箱/研究/客户/财务/内容/私人/团队协作）一键筛。每个分类都带预过滤 URL，可直接分享。
- **issue 原文**：0 issue。社区反馈在 PR（仓库欢迎 PR）。
- **横向对比**：同类有 [xai-org/xai-bots](https://github.com/xai-org/xai-bots)（官方示例）、[awesome-grok-community/awesome-grok](https://github.com/search?q=awesome-grok&type=repositories)（社区列表）。本仓的差异点是 **CI 校验 + JSON schema + 双语摘要 + 死链隔离**，其他列表多为手抄 README。
- **信号判断**：✅ 实战信号 —— 作者把"列表腐坏"这条痛点用 CI 和 dead-link quarantine 彻底解决；⚠️ 单点依赖 —— catalog 完全拉自 `x.ai/bot`，若 xAI 改版或限流，整个 catalog 会同步挂掉。
- **适用场景**：**适合**：想直接挑现成 Grok Bot 模板上手、或者做 Grok Bot 选型的人 · **不适合**：完全不用 Grok Bot、或者想找 Grok 大模型本身提示词教程的人

### 3. [joeseesun/qiaomu-book-reader](https://github.com/joeseesun/qiaomu-book-reader) ⭐43
- 一句话：中文优先的 Obsidian 电子书阅读器插件，每本书自动关联一篇 Markdown 阅读笔记
- **元数据**：JavaScript / MIT / 15.2 MB / 0 issue / 创建于 2026-09-01 11:55 UTC / topics 含 `chinese / obsidian-plugin / epub / pdf / reading-notes` / 主页 `qiaomu.ai`。仓库体积大是因为把构建产物 `main.js` 一并提交进来（Obsidian BRAT 插件常见做法）。
- **README 核心价值**：核心卖点是"**阅读笔记沉淀**"：每本书在首次打开时创建或关联一份带 `type: reading-note` 标记的 Markdown 笔记，之后的划线和评论自动汇总到"划线与批注"章节，每条引文末尾的 `↩` 可一键跳回原书段落。AI 部分默认关闭，启用后只把"当前选中段落 + 书名 + 你的问题"发出去，且支持**已登录的 Codex/Claude/Grok CLI 账号**直接复用（不重填 API key）、国产模型（DeepSeek/Kimi/Qwen/GLM/MiniMax）、聚合服务（SiliconFlow/Doubao/OpenRouter）、本地模型（Ollama/LM Studio）。隐私边界明确写死：API key 进 Obsidian SecretStorage，不进 `data.json`；联网翻译可选 Google。
- **issue 原文**：0 issue。作者在 README 末尾直接给了"问题反馈"链接引导到 issues，目前还没人开。
- **横向对比**：同类有 [swayinfo/elton-reader](https://github.com/swayinfo/elton-reader)（本仓的上游 MIT fork）、[obsidian-kindle-plugin/obsidian-kindle-plugin](https://github.com/obsidian-kindle-plugin/obsidian-kindle-plugin)（专注 Kindle 高亮导入）、[ EpubKit/EpubKit.js](https://github.com/EpubKit/EpubKit.js)（通用 JS EPUB 渲染）。本仓定位差异在 **中文排版 + 每本书一篇阅读笔记 + AI 复用本机 CLI 账号** —— 这三点上没有任何一款同时做到。
- **信号判断**：✅ 实战信号 —— 仓库声明"起源于 MIT 开源项目 `swayinfo/elton-reader`"，明确剥离过品牌和代码；⚠️ 维护风险 —— 单人项目（@joeseesun = 向阳乔木），后续活跃度依赖作者。
- **适用场景**：**适合**：在 Obsidian 里读中文 EPUB/PDF、想把划线和批注沉淀成 Markdown 笔记的人 · **不适合**：只用 Kindle 设备、或者不用 Obsidian 的人

### 4. [gokayfem/h3-max-education](https://github.com/gokayfem/h3-max-education) ⭐40
- 一句话：实时可打断的科学辅导，Grok Voice 讲 + H3 Max 边讲边生成 5 秒教学视频
- **元数据**：TypeScript / MIT / 9.9 MB / 0 issue / 创建于 2026-09-01 03:45 UTC / topics 含 `education / realtime / fal-ai / generative-video / nextjs` / 完整 workspace 是 Turborepo + pnpm。**注意**：标题里的 "H3 Max" 与 MiniMax H3（同一家公司的视频模型）同源，作者用的是 fal 上的 `minimax/h3-max/text-to-video`。
- **README 核心价值**：项目把"实时性"拆成三件事讲 —— ① Grok Voice Realtime 做语音，**带自动打断（barge-in）**；② 同时跑一个"视觉总监"维持一个 5 秒视频生成队列，新视频生成完才替换当前播放，**黑屏永不为零**；③ 打断发生时，队列里旧的生成请求被取消，新主题的第一个解码视频立即顶上。prompt 是从语音转写实时拆出来的"具体科学主题"，过 `H3PromptCompiler` 加安全策略 + 风格圣经（钴蓝/朱红/赭石/象牙白/黑的固定配色），直接走 `/api/fal/generate` 调 `minimax/h3-max/text-to-video`。技术栈：Next.js 16 + React 19、pnpm workspaces、Turborepo、Vitest，可选 Neon Postgres + Upstash Redis。
- **issue 原文**：0 issue。
- **横向对比**：同类有 [fixie-ai/fixie-sdk](https://github.com/fixie-ai/fixie-sdk)（实时语音 agent SDK）、[Fal-AI/H3-Prompt-Lab](https://github.com/search?q=h3+prompt&type=repositories)（H3 prompt 调试台）。本仓的差异点是 **"实时语音 + 实时视频"两个长延迟通道同时排队调度**，且 prompt 由应用层**确定性**派生（不是另起 LLM 服务写 prompt），单元测试友好。
- **信号判断**：✅ 实战信号 —— 架构图清晰，prompt 派生路径可直接复用到其他"实时语音 + 视频"教学/客服场景；⚠️ 成本风险 —— fal 上 H3 Max 按秒计费，5 秒 × 持续生成的组合对个人开发者偏贵；⚠️ 依赖单点 —— 强依赖 fal 的 Grok Voice Realtime + H3 Max 任一挂掉都会卡住整条管线。
- **适用场景**：**适合**：在做"实时语音 + 实时视频"双通道产品的工程师，研究 prompt 派生 + 视频队列调度的人 · **不适合**：纯做聊天机器人、或者只用 H3 出成片的人

### 5. [boringmarketer/meta-ads-skill](https://github.com/boringmarketer/meta-ads-skill) ⭐17
- 一句话：把 Meta（Facebook/Instagram）广告 API 的真实踩坑打包成 Agent Skill，PAUSED-first 防误花
- **元数据**：JavaScript / MIT / 32 KB / 0 issue / 创建于 2026-09-01 13:10 UTC / topics 含 `ai-agents / claude-code / facebook-ads / marketing-api / conversions-api`。仓很小（32 KB），结构是 `SKILL.md` + 4 个 reference + 3 个 Node 脚本。
- **README 核心价值**：README 第一句就说"这些坑都是从生产里真撞出来的"。README 列举了 5 个**官方文档不会告诉**你的细节：① 系统用户需要先在 App 上有 role 才能生成 token，失败信息里**没有任何字段提示你缺哪个 grant**；② Development-mode app 只在创建 ad **creative** 时才卡，前面脚本全跑完才报错；③ `fbq.loaded` 被内联 stub 设成 `true`，即使 CSP 把真库挡了也看不出；④ `navigator.sendBeacon`（`fbevents` 在有 `eventID` 时必走这条）在 devtools Network **和** `performance.getEntriesByType('resource')` 里**都看不到**；⑤ Meta 把 1080×1920 的素材**两端各裁 ~420px**用于方形信息流，导致大多数落地页元素被切。**安全设计**写到 README 顶：所有 campaign 一律 `PAUSED` 状态创建、dry-run 是默认、`--apply` 才写、预算进入前用 minor currency units 范围断言防 100× 超花、`preflight.mjs` 只读不写。
- **issue 原文**：0 issue。
- **横向对比**：同类有 [facebookincubator/meta-business-sdk](https://github.com/facebookincubator/meta-business-sdk)（官方 SDK）、[adlib/Adsetskills](https://github.com/search?q=meta-ads-skill&type=repositories)（其他 skill 形态）。本仓的差异点是 **"踩坑复盘 + Agent 可读 + PAUSED-first 安全网"** —— 官方 SDK 只给你 endpoint，skill 形态同时给你 token 权限链 + 广告创建 + 转化验证 + 防误花。
- **信号判断**：✅ 实战信号 —— README 字里行间是"被拒过才知道"的语气，5 条细节全是从 400 错误反推；⚠️ 维护风险 —— 单人项目（@boringmarketer），Meta API 版本变动跟不跟得上未知。
- **适用场景**：**适合**：用 Claude Code / Cursor 这类能读 SKILL.md 的 Agent 做 Meta 广告工程化的人 · **不适合**：只想跑通一个 demo 不在意踩坑的人，或者完全不用 Agent 框架的人

## 完整前 15

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---:|---|---:|---:|---|---|---|---|---|
| 1 | [c22dev/badnotes](https://github.com/c22dev/badnotes) | 68 | - | 其他 | 新上 | Objective-C | iOS GoodNotes 越狱 tweak | 🆕 |
| 2 | [lihaoyun6/ComfyUI-H3VAE_TRT](https://github.com/lihaoyun6/ComfyUI-H3VAE_TRT) | 56 | - | 其他 | 新上 | Python | H3 VAE 的 ComfyUI TensorRT 加速 | ✅ |
| 3 | [kydlikebtc/awesome-grokbot](https://github.com/kydlikebtc/awesome-grokbot) | 52 | - | agent | 新上 | Python | 361 条 Grok Bot 公开配置 awesome-list（带 CI + 双语） | ✅ |
| 4 | [joeseesun/qiaomu-book-reader](https://github.com/joeseesun/qiaomu-book-reader) | 43 | - | 其他 | 新上 | JavaScript | 中文优先 Obsidian EPUB/FB2/PDF 阅读器 + 阅读笔记沉淀 | ✅ |
| 5 | [LIUFelix2004/God-minmax-H3](https://github.com/LIUFelix2004/God-minmax-H3) | 42 | - | 其他 | 新上 | Shell | MiniMax H3 视频提示词库 + Agent Skill | 🆕 |
| 6 | [gokayfem/h3-max-education](https://github.com/gokayfem/h3-max-education) | 40 | - | 其他 | 新上 | TypeScript | 实时语音 + H3 Max 视频生成的教学应用 | ✅ |
| 7 | [romangojiberryAI/gojiberryai-sales-os](https://github.com/romangojiberryAI/gojiberryai-sales-os) | 36 | - | mcp | 新上 | None | Grok Bot 销售外呼 MCP 套件 | 🆕 |
| 8 | [boringmarketer/meta-ads-skill](https://github.com/boringmarketer/meta-ads-skill) | 17 | - | agent | 新上 | JavaScript | Meta 广告踩坑打包的 Agent Skill（PAUSED-first） | ✅ |
| 9 | [WenXiaoWendy/ai-cooks-for-you](https://github.com/WenXiaoWendy/ai-cooks-for-you) | 16 | - | 其他 | 新上 | TypeScript | （无描述） | 🆕 |
| 10 | [bsab/italia-mcp-servers](https://github.com/bsab/italia-mcp-servers) | 16 | - | mcp | 新上 | Python | 意大利公共数据/法律/政府 MCP 服务目录 | 🆕 |
| 11 | [GatorChateau/Valorant-Duo-Finder-2026](https://github.com/GatorChateau/Valorant-Duo-Finder-2026) | 13 | - | agent | 新上 | Python | Valorant 2026 玩家工具包 | 🆕 |
| 12 | [manifoldai-research/CAER.code](https://github.com/manifoldai-research/CAER.code) | 13 | - | 模型 | 新上 | Python | Causal Action Effect Reweighting 用于世界模型训练（17.9 MB） | 🆕 |
| 13 | [jonathanhawkins/microduck-lab](https://github.com/jonathanhawkins/microduck-lab) | 12 | - | 其他 | 新上 | Python | 在普通 Mac（无 CUDA）上训 Pollen Microduck RL 策略，浏览器实时观看 | 🆕 |
| 14 | [GatorChateau/valorant-strats-2026](https://github.com/GatorChateau/valorant-strats-2026) | 11 | - | 其他 | 新上 | Python | Valorant 2026 排位瞄准 + 策略指南 | 🆕 |
| 15 | [midudev/itsfree.ai](https://github.com/midudev/itsfree.ai) | 11 | - | 模型 | 新上 | HTML | 聚合免费层 AI 模型的 API 入口 | 🆕 |

## 数据方法

- **窗口**：GitHub Search API `created:2026-09-01..2026-09-01`（UTC 闭区间，对应 CST 2026-09-01 08:00..2026-09-02 08:00）
- **关键词**：`(ai OR llm OR agent OR mcp OR assistant) in:readme`，5 槽全部占用，按用户 2026-08-23 终极版对齐
- **排序**：`sort=stars&order=desc`，不设 `stars:>N` 下限；首页 30 条拉满，前 15 入榜
- **过滤**：跑 `scripts/rank.py --route daily --write`，命中 15/15，无空壳/擦边，无新上/还在差异（首期快照）
- **抽样语言分布**：Python 7 / JavaScript 2 / TypeScript 3 / Objective-C 1 / Shell 1 / HTML 1 / None 1；中文项目 1/15
- **GitHub API 速率**：PAT 5000/h，本日累计请求 < 20 次
- **slug**：`github-trending-2026-09-01`（来自 `windows.py --route daily` 的 `daily.slug`）

— 完 —
