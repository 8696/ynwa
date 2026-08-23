# GitHub 日榜 · 2026-08-23 · ip-as-logo 周内霸榜 + CopilotKit/OpenBot 抢跑 agent 同事赛道

GitHub 上 AI/agent/LLM 关键词热门仓库今日榜单。今日 Top 10 + 本周 Top 30 + 本月 Top 50 一篇看完。

## 核心信号（本期）

- **`ip-as-logo-skill` 一周 3800 星霸榜今日**：把"AI 出 logo"这件事拆成可复用的 Agent Skill 格式，配合 ipaslogo.com 免费下载站直接商业化，是少见的"用 Agent Skill 跑通 IP 流水线"路径。issues 里看到韩国用户在 Threads 主动传播，证明非英语区也能吃下流量。
- **agent-as-coworker 形态集中爆发**：`yetone/cumora`（agent 与人类同群聊/同看板，BYOA 接入 Claude Code/Codex）+ `CopilotKit/OpenBot`（每个 Bot 拥有独立浏览器/文件，沙箱动作审计）把"AI 同事"从概念拉到能跑的桌面端。两者都在一周内冲到 2400+ 星，且都强调"人在回路"——这是与 2025 年纯云端 agent 最大的产品形态差异。
- **DSH（DeepSeek Harness）插件生态彻底铺开**：本月 Top 30 里至少 8 个仓库围绕 `dsh` 做插件、皮肤、TUI、Web UI、路由套件、桌面端，单生态吃掉 AI 主题大半热度；这是 2026 年 GitHub 上最显眼的"厂内单点爆款 → 社区扩散发酵"模式。
- **"水印剥离"工具同一周冒出两套实现**：本周榜 #3 `guillaumemeyer/watermarks-remover`（17214 星）+ 今日榜 #8 `Leutenegger/watermarks-remover`（936 星）撞车。前者是 Rust 实现的"重写式剥离"，后者是 Python 实现的"元数据/Unicode 剥离"——两类思路并行落地，说明 AI 内容溯源正在从协议层（C2PA）扩散到纯文本/Unicode 层。
- **A2A 网络从协议层下沉到路由决策层**：`wang2122/sprix-sage-router` 提出"任务执行中再决定 SELF/COLLABORATE/HANDOFF"，跟早期 Agent2Agent 协议只做"发现 + 心跳"形成互补；属于把多智能体从 demo 推向生产可解释的关键一环。
- **MCP 出现"反大平台"购物代理**：`cinderline/northcinder` 不接电商 API，而是用 MCP 接你自己选定的多源数据源，并在购买前强制询问——这是 MCP 从"工具调用接口"演化成"消费者保护协议"的早期信号。

---

## 今日 Top 10（`created:2026-08-16..2026-08-24` UTC，按 stars 降序）

### 1. [s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill) ⭐ 3,838

**一句话**：把"生成公司 IP 吉祥物 logo"打包成可复用的 Agent Skill，主打极简/圆润/可爱/单背景色的方形象征图，并配套免费可商用下载站 `ipaslogo.com`。

**仓库元数据**：topics `codex / codex-skill / image-generation / logo-design / mascot-design`；MIT；仓库 29.7MB（assets 多），homepage `https://ipaslogo.com`；创建 2026-08-18，最近 push 2026-08-22。

**README 提炼**（读完核心段）：

- 目标读者不是设计师，而是任何装了 Codex/Doubao/Coze/Workbuddy 的开发者：装完 `npx skills@latest add s1dashu/ip-as-logo-skill`，就能在 agent 里调用"给我做一只公司 IP"的能力。
- 5 条核心约束写死在 SKILL 里：①主体剪影由 4-7 个大基础形构成（拒绝复杂细节）；②三色配色（2 IP 主色 + 1 背景色）；③先生成 3 个方向草案，用户点头后再批量出 6 张；④默认熟悉的动物主体，机器/幻想物必须有明确产品理由；⑤主体放左下或右下角，整张方图不写 logo/icon 字样——这是 anti-"做个 app icon"的强提示。
- 商业化闭环清晰：官网 `ipaslogo.com`（Cloudflare R2 + Supabase）提供现成 logo 免费下载，"Don‘t have Codex? Visit our website"，把不会装 agent 的人也接住。

**issue 实战反馈**：

- **#3 "This skill is very popular with Koreans."**（open，作者 @s1dashu 回复 "thanks for letting me know! will share more!"）—— 用户在 Threads 看到病毒传播，主动来 GitHub 反馈海外热度，证明 Skill 形态对非英语区同样吃流量。
- **#8 "Generated logo PNG fails to load (404) from cdn.ipaslogo.com"**（open）—— 真实用户报"DevTools 里 36 个 console error，logo PNG 拉不到"。作者回复在自己环境/朋友设备都能打开，建议换网络或关 VPN/ad blocker。**这是官网 CDN 真实存在的边缘案例**，值得作者加 fallback 路径或本地兜底图。
- **#2 "合作申请！！"**（open，2 评论）—— 中文用户实测反馈"开源 agent 直接生成 SVG 而且不验收"，作者用一句"可以 x 上 dm 我"接洽，验证作者对反馈很活跃。

**横向对比**：

- vs **DALL·E / Midjourney 直出 logo**：纯生成模型不会约束剪影复杂度/配色/构图，也不会拒绝"做个 logo"的提示词；ip-as-logo-skill 通过提示词模板强行把"产品级 logo"和"图"分开。
- vs **传统品牌设计公司**：本质是"低单价、高相似度、一次性"消费品（一个公司的吉祥物），agent 技能把交付成本压到几毛钱一次，**适合做 MVP/小项目/B 端项目**，不适合做需要独特品牌资产的成熟消费品。

**信号判断**：

- ✅ **实战验证**：海外用户主动传播 + 中文合作申请同时涌入，是少见的两端共振。
- ⚠️ **CDN 稳定性**：官网 cdn 至少 1 个真实案例 404，作者还在排查（issue open），用 Skill 引用官网图片前请自备 fallback。
- 📈 **增长**：「Agent Skill」是 2026 年的新格式标准（Codex/Doubao/Coze/Workbuddy 互通），首周 3800 星已经把"我是这格式的第一个落地案例"的卡位坐住了。

**适用场景**：**适合**：MVP 阶段需要快速出 IP 形象的独立开发者/小团队；agent 工作流研究者（想看一个完整 Skill 怎么写约束）。**不适合**：需要独特品牌资产的中大型消费品；对 IP 视觉有强主理人审美的品牌方。

---

### 2. [yetone/cumora](https://github.com/yetone/cumora) ⭐ 2,912

**一句话**：跨平台团队协作（桌面端/移动端/Web/管理端），把 AI agent 当"一等公民"放进同一群人/同一份 DM/同一个 Kanban/同一份日历，可云端跑也能 BYOA（Bring Your Own Agent）接 Claude Code/Codex/Grok Build。

**仓库元数据**：TypeScript，26.2MB，MIT，homepage `https://cumora.ai`；创建 2026-08-17，push 2026-08-22。

**README 提炼**（读完核心段）：

- **产品定位**：不是"AI 加在 Slack 里"，而是"AI 跟人拥有同等身份"——人能做的事 agent 都能做（认领任务、协调、收发真邮件、回话、开会），人不做的事 agent 也能做（按 schedule 自己开干）。
- **两条脑路径**：①Cumora Cloud——agent 跑在 K8s pod 里，用 OpenAI Responses API 多跳工具调用；②BYOA（Bring Your Own Agent）——`npx cumora agent computer` 把本机 Claude Code/Codex/Grok Build 接到服务上，**服务端永远拿不到你的 API key**。这是 2026 年少见的同时押注"托管"和"本地脑"的产品。
- **架构分层清晰**：React 18 + Vite + TS + Tailwind 前端；Node + Express + ws 后端，Postgres 是真理，Redis 做 pub/sub 与 presence；Cloudflare Workers 跑 email-gate / r2-gate；agent pod 既支持 K8s 也支持 BYOA daemon 接入。

**issue 实战反馈**：

- **#59 "Windows BYOA: startup tip suggests --install-service, but it is macOS/Linux only"**（open）—— Windows 用户实测发现启动提示词推荐 `--install-service` 但该 flag 在 Windows 不存在。**典型跨平台兼容 bug**，已修复代码但 npm 包 `0.1.127` 还没发布新版本。
- **#58 "npm@latest (0.1.127) still ships the pre-fix resolveSpawn — Windows BYOA daemon"**（open）—— 跟进 #59，指出 npm 发布落后于代码修复。
- **PR "feat(i18n): locale layer with a complete Simplified Chinese translation"**（closed 已合并）—— 1650 个 key 的完整 zh-CN 翻译，覆盖桌面端、移动端、Web shell、管理端；证明产品已经在认真对待中文市场。
- **PR "feat(llm): add Novita provider via a Responses-API translation adapter"**（closed）—— Novita 只兼容 Chat Completions 不兼容 Responses API，作者写了个翻译适配层，业务代码不用动。**这是 BYOA 之外的第二层"LLM 解耦"努力**——不只接本机 agent，也接云端 LLM 供应商。

**横向对比**：

- vs **Slack/Discord + bot 接入**：传统 IM 把 agent 当 bot 加进去，没有"人和 agent 拥有同等身份"的产品承诺；cumora 直接把人/agent 拉平到同一 roster。
- vs **Microsoft Teams Copilot / Slack AI**：商业 IM 厂商给的是"加 AI 功能"，不是"agent 进群"。cumora 是把 agent 抬到"独立同事"地位。
- vs **MultiOn / Adept 桌面 agent**：cumora 跑在云 + 本地脑混合架构，agent 不抢用户屏幕，靠独立的"computer"通道做工具调用。

**信号判断**：

- ✅ **生产化进度**：一周内合并了 i18n（1650 keys）、LLM provider（Novita 适配）、agent memory 作用域（按项目隔离）、stale request 防护（contextEpoch）——这不是 demo 项目，是按月迭代的产品。
- ⚠️ **Windows BYOA 体验问题**：npm 包版本落后于代码修复，新装 Windows 用户会被坑到，issue 还没闭环。
- 📈 **增长**："agent 是同事"概念在 2026 H2 才刚开始普及，cumora 是把概念落到桌面端 + 移动端 + 邮件 + Kanban 的少见全套件。

**适用场景**：**适合**：3-10 人小型团队想让 agent 真参与协作（认领任务、跑脚本、收发邮件）；自托管爱好者（Docker Compose 一键起）。**不适合**：企业内部合规要求锁 SaaS 的场景（cumora 默认 BYOA 鼓励把 key 留在本地）；只用 ChatGPT 网页端的人。

---

### 3. [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) ⭐ 2,399

**一句话**：开源"AI 同事"平台，每个 Bot 拥有独立浏览器 + 独立文件系统 + 独立工具集合，**每次动作都事前决定 + 事后留痕**，可自带任何 AG-UI 协议的 agent 上车。Docker Compose 一键起，Postgres/MCP 全跑在自己机器。

**仓库元数据**：TypeScript，1.8MB，MIT，homepage `https://www.copilotkit.ai/openbot`；topics `ag-ui / agent-governance / ai-agents / browser-automation / copilotkit / generative-ui / mcp`；Alpha 状态，创建 2026-08-17，push 2026-08-22。

**README 提炼**（读完核心段）：

- **核心定位**："AI 同事不是聊天机器人"——每个 Bot 拥有自己的"一台电脑"（浏览器 + 文件 + 工具），**写文件前要决定、写完要留记录**，不是云端随便拉的 GPT。
- **自带模型选择**：不打包任何模型，管理员提供凭据加密落盘，绝不写日志——这把"凭据治理"作为产品一等公民。
- **三个样板 Bot 是配置不是代码**：`agents.yaml` 里改字段就能新增 General Assistant（日常事务）/ Knowledge（公司知识问答）/ Risk Analyst（风控合规），不用写代码。
- **状态声明**：项目自标 Alpha，"Expect rough edges and bugs, and expect things to move"——作者很清醒，知道这是早期形态。

**issue 实战反馈**：

- **#194 "The supervisor is published on every address the host has, and it holds the Docker socket"**（open，1 评论）—— **安全关键**：默认 `docker-compose.yml` 把 supervisor 端口 `4500:4300` 暴露给宿主所有网卡，而 supervisor 拿着 `/var/run/docker.sock`。同 issue #194 已经在 PR 修复（绑定 loopback 而非所有网卡），证明作者响应快但**用户必须自己升级到新镜像**。
- **#193 "Routines: let a Bot work on nobody's schedule"**（open，1 评论）—— 用户 @zopeVaibhav 评论："这个跟 #192 不需要两次 PR，两者共用一个底层——'由人启动的 run'现在不存在，需要先造出'无人启动的 run'。"——社区用户已经看出功能背后的"调度原语"是同一件事，**功能拆解值得作者重排优先级**。
- **#192 "Bot-to-bot messaging: let a Bot hand work to another Bot"**（open）—— 跨 Bot 协作的呼声，标记 "Recording it so it is not lost; not scheduled"。
- **PR "Release v0.0.4"**（closed）—— 内部发布流程，已经在用 release-please 风格的 tag 流水线。

**横向对比**：

- vs **yetone/cumora**：两者都做"agent 是同事"，cumora 是"人和 agent 同群同 DM"，OpenBot 是"每个 agent 占独立沙箱电脑"。**cumora 偏 IM/协作，OpenBot 偏沙箱/治理**。
- vs **browser-use / Skyvern 等浏览器自动化**：单点 agent 工具，没做多 Bot 治理、AG-UI 协议层、动作审计。
- vs **LangGraph / AutoGen**：框架级（怎么编排），OpenBot 是平台级（部署/治理/UI）。

**信号判断**：

- ✅ **安全透明度**：默认公开 Docker socket 这个高危配置作者已快速修，是难得的"Alpha 阶段就认账"的工程态度。
- ⚠️ **Docker socket 暴露**：在用户升级前，任何跑默认 compose 的人都有暴露风险。**上手前请直接拉最新版 compose**。
- 📈 **增长**：AG-UI 协议 + CopilotKit 周边生态（生成式 UI）+ MCP 一锅端，是 2026 H2 厂商做"agent 平台"的稀缺组合。

**适用场景**：**适合**：想把 agent 真正落到生产环境、对动作审计/凭据治理有要求的中大型团队；CopilotKit 现有用户想接沙箱化部署。**不适合**：纯 demo / 想要"开箱即用"产品的用户（Alpha 状态，要折腾）；不接受自托管的纯 SaaS 用户。

---

### 4. [wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router) ⭐ 1,359

**一句话**：屿智同行 Sprix AI 出的 A2A 网络路由层，**任务执行到一半再决定"自己接着做 / 拉同伴 / 整体交接"**——把 A2A 协议从"发现+心跳"补到"执行中再决策"。

**仓库元数据**：Python 3.10+，92KB，MIT；topics `a2a / agent-orchestration / agent-routing / ai-agents / multi-agent-systems / sprix-ai / task-scheduling`；Research Preview 状态；创建 2026-08-18，push 2026-08-21。

**README 提炼**（读完核心段）：

- **痛点定位**：A2A（Agent2Agent）协议能告诉你"哪些 agent 在线、能力卡片是什么"，但不能告诉你"任务跑到一半该继续还是该叫人"。SAGE（State-Aware Graph Exchange）是夹在 A2A 发现和任务执行之间的**决策层**。
- **三选一目标函数**：SELF（自己继续） / COLLABORATE（拉互补同伴，自己保留所有权） / HANDOFF（交给专业 agent，自己放手）—— 三个选项在同一个效用函数里竞争，**不是分散启发式**。
- **可审计 + 可解释**：每次决策输出 why-not-other-routes 的解释，便于事后追溯"为什么没交给那个更专的 agent"。
- **三层约束**：permission（谁能调谁）/ budget（多少 token）/ deadline（DDL 前必须交）——SAGE 在约束下选最优。

**issue 实战反馈**：issues 为空（新仓库，48h 内），暂无线上验证信号。Read README 与 Algorithm 文档（SAGE 是 research preview）。

**横向对比**：

- vs **A2A 协议本身**：A2A 提供发现 + 消息 + 任务 + 制品 + 鉴权 + 传输；SAGE 在它之上做"决策谁执行"。**两者互补，不是替代**。
- vs **CrewAI / AutoGen 编排**：这些是"启动时定编排"，SAGE 是"运行中再决定"。前者适合固定流水线，后者适合开放网络。
- vs **LangGraph supervisor**：supervisor 模式也是"启动时定"，SAGE 是 A2A 时代的新形态。

**信号判断**：

- ✅ **定位精准**：补 A2A 协议的明确空缺——"发现 ≠ 决策"，是社区用户反复遇到的痛点。
- ⚠️ **Research Preview**：文档 + 评测完整，但 production 部署案例 0；可作为参考实现，不要直接接入关键业务。
- 📈 **学术 vs 落地**：屿智同行（Sprix AI）走"研究院开仓库"的路径，跟 OpenAI/Anthropic 类似——早期论文-代码同发。

**适用场景**：**适合**：做多 agent 编排研究的研究员；正在用 A2A 协议搭生产网络、需要一个"决策层"的工程团队。**不适合**：单 agent 工作流（solver 都不需要 SAGE）；demo 演示（要写完整 algorithm 文档才能讲清楚）。

---

### 5. [cinderline/northcinder](https://github.com/cinderline/northcinder) ⭐ 1,206

**一句话**：开源 MCP server，专门做"购物比价 + 下单前询问"。对接你自己选定的多源数据，**决策透明可追溯**，且强制 human-in-the-loop。

**仓库元数据**：JavaScript，1.4MB，MIT；topics `agentic-commerce / human-in-the-loop / local-first / mcp / mcp-server / model-context-protocol / privacy / self-hosted / shopping-agent / typescript`；创建 2026-08-17，push 2026-08-22。

**README 提炼**（读完核心段）：

- **核心立场**：大电商平台正在做"agent 搜自家目录、推自家结算"——这叫"独立建议"吗？**NorthCinder 不接电商 API**，比价 + 下单前的强制询问由你自己掌控。
- **架构哲学**：没有 NorthCinder 服务、没有云账号、没有 NorthCinder 订阅；`npx northcinder init` 在你机器上起 MCP server + 搜索引擎 + 临时 loopback 端口。
- **结果形态**：每个购物问题只给 ≤3 个候选——"最佳匹配 / 低风险备选 / 便宜或显著不同的备选"；每条结果附带"为什么排第几"和"为什么排除其他候选"，**决策可追溯**。
- **研究流程**：MCP host 必须先读 `northcinder://research/product` 或 `northcinder://research/seller` 资源 → 调 `create_research_plan` → 按 checklist 用 agent 已有工具做研究。如果源数据不一致，结果**只标"临时性"**，不强行推结论。

**issue 实战反馈**：当前仓库只有 2 条 PR（都是 docs 拼写修正，作者为 `coderabbitai`），暂无用户实战 issue。**新仓早期，证据以 README + 架构为主**。

**横向对比**：

- vs **Amazon Rufus / Shopify Shop AI**：电商平台自带 AI 助手推自家商品；NorthCinder 反向走"消费者自己掌控"。
- vs **Perplexity Shopping / Bing Shopping Copilot**：闭源商业产品，不可本地化；NorthCinder 是 local-first。
- vs **ChatGPT Operator / Claude Computer Use**：通用 agent 不专攻购物，不强调"决策透明 + human-in-the-loop"。

**信号判断**：

- ✅ **理念清晰**：用 MCP 协议把"购物决策可追溯"做成协议层，是 Agentic Commerce 里少见的产品哲学。
- ⚠️ **生态早期**：首周 1200 星主要靠理念圈层传播，**真生产用需要更多源数据 provider**。
- 📈 **MCP 协议扩散**：MCP 不只在做工具调用，正在扩展到"消费者保护协议"——这是 2026 H2 值得关注的方向。

**适用场景**：**适合**：想给自家 AI agent 加"购物决策"能力又不想锁平台的开发者；隐私敏感用户（local-first）。**不适合**：想要开箱即用大平台推荐的人；需要购物决策 SLA 的商业场景。

---

### 6-10 简评

| # | 仓库 | ⭐ | 一句话定位 |
|---|---|---:|---|
| 6 | [vvxw/deploy-vercel](https://github.com/vvxw/deploy-vercel) | 1,175 | 一行 `npm install` 完成 Vercel 部署；28KB 极简，定位为"零门槛 deploy"。 |
| 7 | [Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report) | 1,039 | DeepSeek V4 × J-Space 能力实测报告，证明 J-Space 减少 capability-realization loss；DSH 插件生态又一员。 |
| 8 | [Leutenegger/watermarks-remover](https://github.com/Leutenegger/watermarks-remover) | 936 | Python 实现的多厂商 AI provenance 痕迹剥离工具（Unicode 清洗 + C2PA/元数据剥离 PNG/JPEG/SVG/PDF/DOCX/HTML/MD）。 |
| 9 | [Spielewoy/autoprompt-skill](https://github.com/Spielewoy/autoprompt-skill) | 728 | 编程 agent Skill，自称减少 45% agentic coding 任务失败率；NPM 包 `autoprompt-skill`。 |
| 10 | [browser-use/macos-harness](https://github.com/browser-use/macos-harness) | 713 | browser-use 出的 macOS 极简 harness，给 LLM 完全控制 Mac 的权限（accessibility/CDP/computer-use）。 |

---

## 本周 Top 30（`created:2026-08-10..2026-08-23` UTC，按 stars 降序取前 30）

> Top 1-10 已在本日榜详深挖或与日榜重叠；本节给 11-30 简评。完整深挖见后续周榜文章。

| # | 仓库 | ⭐ | 一句话 |
|---|---|---:|---|
| 1 | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) | 186,455 | DeepSeek Harness 主体；"万物皆插件"。 |
| 2 | [anywhere-labs/deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop) | 18,686 | 为 DSH 插件生态打造的桌面端，"桌面本身也是插件"。 |
| 3 | [guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) | 17,214 | Rust 实现的 AI 水印剥离（Unicode 文本卫生 + 统计改写），与 #8 同名但走"重写式剥离"路径。 |
| 4 | [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | 11,706 | DSH 插件精选列表（awesome-list 形态）。 |
| 5 | [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) | 6,676 | DSH 路由套件：runtime 注入器 + 标准路由器。 |
| 6 | [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 5,675 | DSH Web GUI 插件与皮肤生态。 |
| 7 | [s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill) | 3,838 | 见今日榜 #1。 |
| 8 | [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard) | 3,724 | 两阶段 DSH preset：Minimal 对齐引导后跑全功能。 |
| 9 | [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) | 3,438 | Oxlint 规则集合，拒绝低证据 TS/JS 代码（"反 AI slop"）。 |
| 10 | [yetone/cumora](https://github.com/yetone/cumora) | 2,912 | 见今日榜 #2。 |
| 11 | [cordiverse/paper](https://github.com/cordiverse/paper) | 2,698 | 时空可组合性的编程范式（学术风格 repo）。 |
| 12 | [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | 2,399 | 见今日榜 #3。 |
| 13 | [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 2,344 | DSH 官方公众号收录的 TUI 补位插件（Claude Code 风、鲸鱼顶栏）。 |
| 14 | [vercel-labs/fx](https://github.com/vercel-labs/fx) | 2,153 | Unix 风格 coding agent（Vercel Labs 出品）。 |
| 15 | [gvzdv/claudish-to-english](https://github.com/gvzdv/claudish-to-english) | 2,127 | 描述为空的高星工具，按名字推测是"把 Claude 类模型的中文/小语种输出翻成英语"的中间件。 |
| 16 | [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 1,940 | DSH 插件市场：浏览、搜索、安装一键完成。 |
| 17 | [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 1,915 | DSH Desktop 桌面端（"DSHDesktop"）。 |
| 18 | [Hisn00w/ASu-skills](https://github.com/Hisn00w/ASu-skills) | 1,864 | 简历包装 agent skill。 |
| 19 | [SMNETSTUDIO/WeChat-AI](https://github.com/SMNETSTUDIO/WeChat-AI) | 1,829 | 自托管微信角色扮演对话服务（WeChat AI）。 |
| 20 | [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 1,616 | DSH "鲸鱼女孩"皮肤系列。 |
| 21 | [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | 1,449 | Grok Bot 开源替代品（带 VM 沙箱）。 |
| 22 | [wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router) | 1,359 | 见今日榜 #4。 |
| 23 | [Leutenegger/book-to-skill](https://github.com/Leutenegger/book-to-skill) | 1,230 | 把任意技术书 PDF 转成 Claude Code skill（可学可练）。 |
| 24 | [cinderline/northcinder](https://github.com/cinderline/northcinder) | 1,206 | 见今日榜 #5。 |
| 25 | [ZSvirt/zsvirt](https://github.com/ZSvirt/zsvirt) | 1,203 | ZSvirt 核心 IaaS 引擎与云基础设施底座。 |
| 26 | [zouyuxuan122/Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC) | 1,178 | DSH Desktop EAC 版本（"Embracing All Creation 揽尽万物"）。 |
| 27 | [vvxw/deploy-vercel](https://github.com/vvxw/deploy-vercel) | 1,175 | 见今日榜 #6。 |
| 28 | [alchaincyf/deepseek-harness-orange-book](https://github.com/alchaincyf/deepseek-harness-orange-book) | 1,153 | DSH 橙皮书《从开机到拆开》：完整系统提示词 + 129 行启动清单 + 三份原始会话日志。 |
| 29 | [elie222/rakazo](https://github.com/elie222/rakazo) | 1,144 | Grok Bot 开源替代品，自选模型 + 沙箱。 |
| 30 | [Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report) | 1,039 | 见今日榜 #7。 |

---

## 本月 Top 50（`created:2026-07-01..2026-08-01` UTC，按 stars 降序取前 50）

> Top 1-10 见本周榜或日榜；本节给 11-50 简评。

| # | 仓库 | ⭐ | 一句话 |
|---|---|---:|---|
| 1 | [JustVugg/colibri](https://github.com/JustVugg/colibri) | 25,913 | 纯 C 零依赖在自有机上跑 MoE 模型。 |
| 2 | [xai-org/grok-build](https://github.com/xai-org/grok-build) | 25,912 | SpaceXAI 的 coding agent harness 与全屏交互 TUI。 |
| 3 | [andrewyng/openworker](https://github.com/andrewyng/openworker) | 14,949 | 描述未填；按 stars 与命名推测为"开放 worker 框架"。 |
| 4 | [yc-software/qm](https://github.com/yc-software/qm) | 14,090 | 多人协作 agent harness（multiplayer agent harness for work）。 |
| 5 | [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) | 14,047 | Codex Dream Skin（OpenAI Codex 皮肤主题）。 |
| 6 | [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) | 12,925 | 把参考图重建为代码化的程序化 3D 模型（Three.js 路径）。 |
| 7 | [openai/codex-security](https://github.com/openai/codex-security) | 10,092 | OpenAI 的 Codex Security CLI 与 TS SDK，用于查找/验证/修复安全问题。 |
| 8 | [trycompai/crm](https://github.com/trycompai/crm) | 8,820 | Comp AI CRM：开源、为 AI agent 而设计的 CRM。 |
| 9 | [MoonshotAI/Kimi-K3](https://github.com/MoonsonshotAI/Kimi-K3) | 8,585 | Kimi K3 模型开源仓库。 |
| 10 | [unicity-aos/aos-ce](https://github.com/unicity-aos/aos-ce) | 8,554 | AOS Community Edition：开放 agent 操作系统。 |
| 11 | [oso95/scroll-world](https://github.com/oso95/scroll-world) | 8,477 | 把任意品牌转成可滚动 3D 世界落地页的 skill。 |
| 12 | [MiniMax-AI/MiniMax-H3](https://github.com/MiniMax-AI/MiniMax-H3) | 6,768 | MiniMax H3（描述未填）。 |
| 13 | [LiamGvchi/gc-minimal-zine-poster](https://github.com/LiamGvchi/gc-minimal-zine-poster) | 6,558 | Codex skill：生成安静极简的 zine 风编辑海报。 |
| 14 | [MDX-Tom/gpt-5.6-instruct](https://github.com/MDX-Tom/gpt-5.6-instruct) | 6,331 | gpt-5.6 系列 jailbreak 提示词与测试集。 |
| 15 | [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) | 6,299 | 单 CPU 跑 2.78T 参数 Kimi K3 推理。 |
| 16 | [drumih/turbo-fieldfare](https://github.com/drumih/turbo-fieldfare) | 6,267 | Gemma 4 26B-A4B 在 M 系列 MacBook 用约 2GB RAM 推理。 |
| 17 | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 6,111 | Claude Code & Codex 的 AI 视频 skill：电影感产品视频。 |
| 18 | [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | 5,768 | 从任何文本里移除 20+ 种 AI slop 模式。 |
| 19 | [elder-plinius/T3MP3ST](https://github.com/elder-plinius/T3MP3ST) | 5,646 | 自主红队平台；多 agent 攻击性安全 meta-harness。 |
| 20 | [nyblnet/bento](https://github.com/nyblnet/bento) | 4,445 | 一个文件装下的办公套件。 |
| 21 | [xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer](https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer) | 4,288 | FDE（前沿部署工程师）零基础入门指南（范冰《增长黑客》框架）。 |
| 22 | [NanoNets/Graft](https://github.com/NanoNets/Graft) | 4,277 | Claude Code / Cursor / Codex / Gemini 等所有 coding agent 加速器。 |
| 23 | [Zeejay0/gathered-scenes-zine-skill](https://github.com/Zeejay0/gathered-scenes-zine-skill) | 4,251 | 描述未填。 |
| 24 | [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | 4,219 | 创意 canvas 组件库：真 HTML + WebGL 特效。 |
| 25 | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | 4,180 | agent skills 集合，帮你搭好界面。 |
| 26 | [slvDev/esp32-ai](https://github.com/slvDev/esp32-ai) | 4,141 | 描述未填。 |
| 27 | [truefoundry/trueforge](https://github.com/truefoundry/trueforge) | 3,601 | 开源 agent harness 运行时层，把 LLM 变成 agent。 |
| 28 | [genspark-ai/genoffice](https://github.com/genspark-ai/genoffice) | 3,510 | 免费开源 AI 办公套件（Word 替代品等）。 |
| 29 | [microsoft/skill-recorder](https://github.com/microsoft/skill-recorder) | 3,359 | 录屏 + GitHub Copilot 生成 agent skill 的桌面 app。 |
| 30 | [xuchonglang/investing-for-beginners](https://github.com/xuchonglang/investing-for-beginners) | 3,333 | 小隐寺投资百科：美股/期权/加密货币知识框架。 |
| 31 | [synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience) | 3,323 | 开源 AI 科研工作台。 |
| 32 | [bryanthaboi/gen1recomp](https://github.com/bryanthaboi/gen1recomp) | 3,312 | 用 Lua/LÖVE2D 原生重制 Gen 1 Pokémon。 |
| 33 | [kvcache-ai/AgentENV](https://github.com/kvcache-ai/AgentENV) | 3,280 | AENV：分布式 agent 环境运行平台。 |
| 34 | [isjiamu/gzh-design-skill](https://github.com/isjiamu/gzh-design-skill) | 3,267 | 把 Markdown 一键排成可直接粘进公众号编辑器的精致 HTML，6 套主题。 |
| 35 | [mshumer/Claude-of-Duty](https://github.com/mshumer/Claude-of-Duty) | 3,252 | 单 prompt 出的 Call of Duty 品质 FPS（Three.js）。 |
| 36 | [kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew) | 3,181 | 自改进 + 持续上下文的开发工作区。 |
| 37 | [Tiger3807861189/J-Space-Cognition-Suite-V3.7](https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.7) | 3,018 | J-Space 认知增强 Skills V3.7。 |
| 38 | [aipoch/open-science](https://github.com/aipoch/open-science) | 2,958 | 开源 AI 研究工作台（含可复现科研的 scientific agent）。 |
| 39 | [duolahypercho/codex-router](https://github.com/duolahypercho/codex-router) | 2,779 | Codex 外接模型路由：Kimi OAuth/API、DeepSeek、Anthropic 等。 |
| 40 | [QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins) | 2,758 | 让任何 agent harness 原生支持多模态。 |
| 41 | [yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) | 2,739 | OpenAI Codex 桌面端/CLI 可视化管理（Provider 切换、会话同步、Skills/MCP 管理）。 |
| 42 | [AminBlg/SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) | 2,728 | agent skill：让 LLM 用 ASD-STE100 简化技术英语写文档。 |
| 43 | [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | 2,715 | 描述未填。 |
| 44 | [lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) | 2,558 | Ryan Lopopolo 的 agent 工程选集 + 现场指南 + agent context bundle。 |
| 45 | [Jakubantalik/thinking-orbs](https://github.com/Jakubantalik/thinking-orbs) | 2,555 | AI/agent UI 用的"点点思考球"loading 指示器，9 套调音。 |
| 46 | [zerx-lab/FluxDown](https://github.com/zerx-lab/FluxDown) | 2,524 | Rust 多协议下载管理器（HTTP/FTP/BT/HLS/DASH）。 |
| 47 | [chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard) | 2,469 | 描述未填。 |
| 48 | [AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide) | 2,427 | 实战 WorkBuddy 掌握指南。 |
| 49 | [powerycy/goutoujunshi](https://github.com/powerycy/goutoujunshi) | 2,379 | Codex 恋爱军师（先接情绪、再分析关系、给出可执行策略）。 |
| 50 | [DannyMac180/sol-advisor](https://github.com/DannyMac180/sol-advisor) | 2,307 | Codex 原生架构编排（Luna + Terra 双实现）。 |

---

## 数据方法

- **快照时间**：2026-08-23 18:30 UTC（CST 2026-08-24 02:30）—— GitHub Search API 实时拉取。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant`（`in:readme`），5 个 OR 项按用户 AI 全谱诉求排序：ai 覆盖面最广、llm/agent/mcp 细分、assistant 兜底"AI 助手/智能助手/copilot/生产工具"。
- **三档时间窗口（UTC，左闭右开）**：
  - 今日：`created:2026-08-16..2026-08-24`（N-7 到 N+1，CST 早 8 点跑时当天已有 UTC 数据）
  - 本周：`created:2026-08-10..2026-08-23`（上周一 UTC 到本周一 UTC）
  - 本月：`created:2026-07-01..2026-08-01`（上月 1 号 UTC 到本月 1 号 UTC）
- **排序**：每档按 `stargazers_count` 降序；不含 archived 过滤，不限语言、不限 stars 下限。
- **取前 N**：今日 10 / 本周 30 / 本月 50。
- **Cron 来源**：日榜 `0 8 * * *` CST。
- **GitHub API 时区边界**：GitHub 按 UTC 切，本期 CST 周日 16:00-24:00 与 CST 8-31 16:00-24:00 的 8 小时实际属于 UTC 8-24 与 UTC 9-1，已相应归入"明日"和"下月"。
- **分布**：本期三档以英文仓库为主，少量中文原创（DSH 周边生态、gzh-design-skill、WeChat-AI 等）。