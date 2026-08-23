# GitHub 周榜 · 2026-W34 · Agent Skill 单生态霸榜 + DSH 衍生工具冒头

W34（2026-08-17 ~ 2026-08-23，UTC 整周）按 stars 排序的 AI/agent/LLM 新创建热门仓库 Top 30。本周最显眼的趋势是 Agent Skill 类项目集中爆发，IP-as-Logo 单周斩获 3847⭐ 一骑绝尘，而 DeepSeek Harness（DSH）围绕"小鲸鱼余额挂件""iOS 模拟器"等周边衍生出了 4 个独立项目。

## 核心信号

- **Agent Skill 单生态爆发**：Top 30 里 8 个明确以 "Skill" 命名或定位（IP-as-Logo、autoprompt-skill、benjamin-plus-skill、marketing-os、lanshu-create-ai-presenter-video、scroll-craft、backlink_skills、emotion-ball）。其中 IP-as-Logo 单周 3847⭐、autoprompt-skill 731⭐——Agent Skills 这个开放协议正在成为编程代理周边的默认打包格式。
- **DeepSeek Harness（DSH）成"热门 IP"**：Top 30 里 4 个项目直接围绕 DSH 生态展开：DSH 小鲸鱼余额挂件（#10，649⭐）、dsh-ios iOS 模拟器插件（#30，213⭐）、pilot-harness（#22，252⭐）、HarnessEval-W（#23，249⭐）。DSH 已经从单一桌面客户端长成一个可挂载周边生态的"母平台"。
- **MCP 协议本周回归冷启动**：仅 2 个项目明确以 MCP 为主标签（northcinder #5 1206⭐、x64dbg-mcp-server #16 318⭐），相比上月 MCP 主题热度明显回落，但 northcinder 的"agentic-commerce"场景仍是 MCP 当前最具想象力的方向。
- **Chinese 仓库占比 17%**（5/30，含 s1dashu、wang2122、MeteorNOX、BigPengSays、LB623、LBH-123-AI 等），与英文项目 25/30 形成对比——中文仓库虽少但单点爆发力强（Top 1 IP-as-Logo 与 Top 4 sprix-sage-router 都是中文团队作品）。
- **AI 编程代理周边全面开花**：从 prompt 工程（autoprompt-skill）、键盘效率（benjamin-plus-skill）、营销文案（marketing-os）、演示视频（lanshu-create-ai-presenter-video）、滚动交互（scroll-craft）到本地存储偏好（Prism-Browser-Community #26）——AI 代理正在分化出大量"垂直周边 skill"赛道。
- **硬件/芯片层项目冒头**：SigmanticAI/apex-inference-chip（#9，681⭐）本周交付了一个真实可跑 Qwen2.5-0.5B 的 FPGA 推理核，"verification-first" 是这个项目的核心方法论。

## 今日 Top 10 详深挖

### #1 [s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill) ⭐3,847

- **仓库元数据**：topics=`codex / codex-skill / image-generation / logo-design / mascot-design`；size=29.8MB（带 logo 资源）；homepage=[ipaslogo.com](https://ipaslogo.com)；主语言未指定（SKILL.md 是核心交付物）；2026-08-18 创建，2026-08-22 最后推送。
- **README 核心价值提炼**：把"生成 IP 吉祥物 Logo"这件事压成一份 Agent Skill。规则写得极具体——"6-10 个圆角图形、两种颜色加一个底色、左下角主导构图、严格复杂度上限"——SKILL.md 才是真正的产品。读完全文能看出作者把"可爱的 IP"拆解成可执行的设计宪法：任何兼容 Agent Skills 协议的代理都能拿来直接产出"公司级"吉祥物，不绑 Codex、Claude Code 或任何特定代理。
- **实战 / 争议信号**：issue #1（来自 [daffffffffffffff](https://github.com/daffffffffffffff)）作者基于这个 SKILL.md 做了个头像生成器并表达感谢；issue #2 显示韩国用户在 X/Threads 上把这条 skill 推爆，原作者 [s1dashu](https://github.com/s1dashu) 在评论区邀请合作 DM；issue #8 报"生成的 logo PNG 从 cdn.ipaslogo.com 拉不到（404）"——基础设施稳定性是目前最显眼的实战反馈。
- **横向对比**：与"logo 设计提示词合集"类仓库（多为 README 长 prompt）不同，这份 skill 把规则、配色、构图、复杂度上限硬编码进 SKILL.md，效果可复现；与 [nateherkai/scroll-craft](#) 这类 Claude Code skill 形态一致，但定位在视觉资产而非网页交互。
- **信号判断**：✅ 实战验证（已被 fork / 二次创作 / 跨平台传播）；⚠️ CDN 稳定性是唯一已暴露的实战痛点；📈 单周 3847⭐ 说明"开放 Agent Skills 协议 + 垂直场景 + 中文作者 + 韩国社区传播"是可以复制的爆款公式。
- **适用场景**：**适合**：要做吉祥物 / IP 形象 / 品牌 mascot 的中小团队，需要"代理能直接调用、规则可复现"的资产生成流水线；**不适合**：需要矢量精确输出、做动画骨骼、或已锁定 Stable Diffusion / Midjourney 工作流的设计师。

### #2 [yetone/cumora](https://github.com/yetone/cumora) ⭐2,912

- **仓库元数据**：主语言 TypeScript；size=26.2MB；homepage=[cumora.ai](https://cumora.ai)；2026-08-19 创建，2026-08-22 最后推送；topics 为空（README 内嵌大量元信息）。
- **README 核心价值提炼**：Cumora 把"团队协作软件"从"人类 + 偶尔调用 AI"反转为"AI 代理是一等公民"的形态——同 roster、同 DM、同群聊、同 Kanban，代理与人类使用同一套界面协议。它本质是给"AI 同事"一个真实可被管理的工位。
- **实战 / 争议信号**：issue [Windows BYOA: startup tip suggests --install-service, but it is macOS-only](#) 反馈 Windows 用户在 BYOA（Bring Your Own Agent）模式下被推荐了 macOS-only 的 `--install-service` 参数，体验割裂；另有 issue [npm@latest (0.1.127) still ships the pre-fix resolveSpawn](#) 说明 npm 包的发布管道有版本残留问题——发布链路的小瑕疵是早期项目的典型痛。
- **横向对比**：与 [CopilotKit/OpenBot](#) 同样主打"AI 同事"，但 Cumora 把代理视作"参与 chat 的队友"（共享 DM/群），OpenBot 则把代理视作"独立持有电脑的远程员工"——前者是 Slack 加 agent 槽位，后者是 Each-Works-On-Its-Own-Computer 的雇佣形态，思路完全相反。
- **信号判断**：✅ 产品形态完整（有 Web app + cumora.ai 上线）；⚠️ 跨平台细节（Windows / npm 发布）是早期高 star 项目的高频踩坑点；🤔 与 OpenBot 同期爆火说明"AI 同事"这条赛道正在被多个团队同时验证。
- **适用场景**：**适合**：要给 AI 代理一个"与人平级"的协作入口的小团队 / SaaS 团队；**不适合**：只想做个简单的"AI 帮写文档"工具的需求（杀鸡用牛刀）。

### #3 [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) ⭐2,404

- **仓库元数据**：topics 极丰富（ag-ui / agent-governance / ai-agents / browser-automation / copilotkit / generative-ui / mcp）；size=1.8MB（小而精）；主语言 TypeScript；homepage=[copilotkit.ai/openbot](https://copilotkit.ai/openbot)；2026-08-22 创建/推送。
- **README 核心价值提炼**：OpenBot 把"AI 同事"具象化为"每个 Bot 拥有自己的浏览器、文件系统、只授过权的工具集"，每次操作前后都有审计记录。它强调的不是"AI 能不能完成任务"而是"能不能把任务真的交给 AI 并信任它"——governance（治理）和 trust（信任）是这个产品的关键词。
- **实战 / 争议信号**：issue [#196 Nothing removes a channel, so the roster only ever grows](#) 直接从代码层点出问题：channel 创建后没有删除路径，roster 只能增长——这是一类典型的"早期 MVP 数据模型不完整"的洞；issue [#194 The supervisor is published on every address the host has](#) 指出 Docker compose 配置把 supervisor 暴露在所有网卡上，是安全告警而非 bug；issue [#193 Routines: let a Bot work on a schedule with nobody](#) 与 #192 Bot-to-bot messaging 来自产品负责人 Mark，是 roadmap 内的功能规划。
- **横向对比**：与 Cumora 的根本差异——Cumora 是"代理进群聊"，OpenBot 是"代理拿自己电脑"。OpenBot 走的是 ag-ui 协议（AG-UI / CopilotKit 自家协议）而非 MCP，但它的 topics 同时挂了 mcp，说明两条协议正在被同一个团队兼容；与 [browser-use/macos-harness](#) 在"控制真实 GUI"层面类似，但 OpenBot 把权限治理做成了产品壁垒。
- **信号判断**：✅ 治理 + 审计 + 多协议兼容是严肃 AI 代理平台的方向；⚠️ MVP 阶段数据结构不完整是合理的早期代价；📈 8 个 issue + 13 个 PR + 2404⭐/周说明已经形成活跃贡献者网络。
- **适用场景**：**适合**：要给 AI 代理真实生产权限的企业（金融/客服/数据录入），需要可审计操作流；**不适合**：纯 demo / 个人玩具场景（治理 overhead 太高）。

### #4 [wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router) ⭐1,371

- **仓库元数据**：topics=`a2a / agent-orchestration / agent-routing / ai-agents / multi-agent-systems / python / sprix-ai / task-scheduling`；size 仅 92KB（极小，纯算法代码）；主语言 Python 3.10+；2026-08-19 创建，2026-08-21 最后推送。
- **README 核心价值提炼**：Sprix SAGE Router 是"屿智同行"团队对开放 A2A（Agent-to-Agent）网络的状态感知路由器——核心概念是 SELF / COLLABORATE / HANDOFF 三种路由模式。Agent 不再是孤立调用，而是根据彼此状态动态决定"自己做 / 协作做 / 移交"。仓库代码虽小但定位明确，是 multi-agent 系统的"路由层"。
- **实战 / 争议信号**：仓库 issue 区为空（项目太新），但 README 里强调 `Tests` workflow 跑通——对小库来说这意味着作者重视 CI 而非营销。0 issue 是早期项目的"无信号但也不负面"特征。
- **横向对比**：与 [LangGraph](https://github.com/langchain-ai/langgraph) 这类基于图的工作流编排不同，SAGE Router 是基于"网络状态"而非"图节点"的路由；与 [AutoGen](https://github.com/microsoft/autogen) 的"群聊"模式相比，它更轻、更协议化（基于 A2A）。在 multi-agent framework 已成红海的当下，能以"路由器"这个细分定位切入并拿到 1371⭐/周，说明定位精准。
- **信号判断**：✅ 极小代码量 + 清晰定位 + Python 包级项目（库而非应用）——典型可被集成进其他 multi-agent 系统的中间件；🤔 0 issue 需进一步观察（用户用了但没反馈？还是关注度还没到？）。
- **适用场景**：**适合**：正在搭多代理协作系统、需要"状态感知路由层"的工程师；**不适合**：单代理场景（库的能力严重过剩）。

### #5 [cinderline/northcinder](https://github.com/cinderline/northcinder) ⭐1,206

- **仓库元数据**：topics 极完整（`agentic-commerce / human-in-the-loop / local-first / mcp / mcp-server / model-context-protocol / privacy / self-hosted / shopping-agent / typescript`）；size=1.4MB；主语言 JavaScript（README 写 TypeScript 实现）；2026-08-18 创建/推送。
- **README 核心价值提炼**：NorthCinder 把"购物代理"明确反对"大平台单目录自利"——它是一个开源 MCP server，能让代理跨平台比价、在下单前征询买家意见。它不只是"AI 比价工具"，而是"代理时代的反垄断基础设施"——这层定位决定了它很难被大厂复制。
- **实战 / 争议信号**：issue 区为空（仅 2 个 PR），意味着关注者多是 star 用户而非活跃反馈者。这种"理念领先但工程进度早期"的项目常见于 newsletter 转发而非企业落地。
- **横向对比**：与"ChatGPT 插件比价"类产品（已死）的根本差异——NorthCinder 走 MCP 协议 + local-first + self-hosted，强调隐私与买家主权；与 Stripe Agent Toolkit 同属"金融/商务代理基础设施"层，但 NorthCinder 不碰支付只做比价与决策辅助。
- **信号判断**：✅ MCP server + 隐私/反平台叙事 = 极强媒体传播潜力；⚠️ 没有 issue 反馈说明早期用户还没真正"用起来"；🤔 与 [vvxw/deploy-vercel](#) 一样属于"理念先行"型——读者关注的是愿景而非代码成熟度。
- **适用场景**：**适合**：要做本地比价代理 / 想保护购物决策不被平台引导的用户、关注 agentic-commerce 协议层的研究者；**不适合**：追求"今天就能用"的电商从业者。

### #6 [vvxw/deploy-vercel](https://github.com/vvxw/deploy-vercel) ⭐1,1187

- **仓库元数据**：主语言 JavaScript；size 仅 28KB（极小，README 占大头）；topics 为空；2026-08-18 创建/推送。
- **README 核心价值提炼**：一份"如何在 Vercel 上反代部署"的极简说明——三步走：建项目、设环境变量、把伪装网页替换成 index.html。README 是 4 段编号步骤，本质是"反代场景的工程 SOP"。这类项目 star 多来自"中文圈对 AI 服务的访问需求"。
- **实战 / 争议信号**：issue [#6 地区编码经过测试有几个无法使用](#) 用户列出 dxb1（迪拜）/ jnb1（约翰内斯堡）/ mia1（迈阿密）三个区域编码测试不通——这种"非主流区域基础设施支持不全"的反馈，反过来证明了这个仓库被实际用来访问 AI 服务的人很多。
- **横向对比**：与 [vercel/next.js](https://github.com/vercel/next.js) 官方文档对比，vvxw/deploy-vercel 解决的是 Vercel 文档里没有的"反代"细分场景。它不是工具而是"经验包"，价值在于把踩过的坑压成 5 段编号步骤——这种"实战经验沉淀型"小仓库在中文圈 star 增速极快。
- **信号判断**：✅ 真实需求驱动（issue 反馈来自实际部署用户）；⚠️ 仓库本身只是 README，无代码维护负担，是"分享而非工程"型；🤔 star 数与代码量严重不匹配说明 star 是"知识价值"而非"工程价值"。
- **适用场景**：**适合**：要在 Vercel 上做 AI 服务反代部署的个人开发者；**不适合**：需要可维护代码库的工程团队（这个仓库本身不构成长期依赖）。

### #7 [Spielewoy/autoprompt-skill](https://github.com/Spielewoy/autoprompt-skill) ⭐731

- **仓库元数据**：topics 极丰富（20 个，包括 `agent-orchestration / agent-skills / agentic-workflows / ai-agents / ai-coding / automated-testing / autonomous-agents / claude-code / cli / code-review / codex / coding-agent / developer-tools / github-copilot / multi-agent-systems / opencode / prompt-engineering / subagents / test-driven-development / workflow-automation`）；size=3MB；主语言 JavaScript；homepage=[npmjs.com/package/autoprompt-skill](https://www.npmjs.com/package/autoprompt-skill)；2026-08-19 创建，2026-08-21 推送。
- **README 核心价值提炼**：在 Terminal-Bench 上把编程代理失败率砍掉 45%。本质是一段"写给 AI 看的元 prompt"——当 AI 在终端里跑命令前，自动包装一层 autoprompt 让它更不容易跑偏。这个仓库证明："prompt 技巧"也能被打包成可分发 npm 包，并在多代理框架（Claude Code / Codex / OpenCode / Kilo / VSCode）里被复用。
- **实战 / 争议信号**：issue [#14 / #13 / #12 Tests fail on Windows when Git is not installed at C:\Program Files\Git](#) 三连：硬编码 Git Bash 路径导致非默认安装位置的用户跑不起来测试，作者已确认修复并 CLOSED；issue [#6 bin/autoprompt.cjs unusable on macOS/Linux in 1.0.2 — CRLF shebang + missing exec bit](#) 暴露 Windows 写出来的 shebang 在 macOS/Linux 上不可执行——典型的"跨平台工程卫生"问题；issue [#4 [Docs] custom-agent-compatibility](#) 是文档贡献请求。
- **横向对比**：与 [JetBrains/benjamin-plus-skill](#) 同属"编程代理 skill 周边"赛道，但 autoprompt-skill 聚焦"prompt 工程元层"，benjamin-plus-skill 聚焦"token 效率"，两者互补；与 [claude-code 的内置 prompt 工程技巧](#) 相比，autoprompt 把技巧外置成 npm 包，避免"绑死在某个代理"。
- **信号判断**：✅ 多代理兼容（6 家 coding agent）+ 基准测试可量化（45% 失败率下降）；⚠️ 跨平台卫生仍需补强；📈 与 IP-as-Logo 同属"Agent Skills 协议周边"的爆款公式。
- **适用场景**：**适合**：重度使用 Claude Code / Codex / OpenCode 等编程代理的开发者，想统一压低失败率；**不适合**：只用 ChatGPT 网页版的轻度用户。

### #8 [browser-use/macos-harness](https://github.com/browser-use/macos-harness) ⭐715

- **仓库元数据**：topics=`accessibility / agent / automation / cdp / computer-use / macos / python`；size=5.6MB；主语言 Python；homepage=仓库 README；2026-08-17 创建/推送。
- **README 核心价值提炼**：browser-use 团队给 macOS 出的"最薄 harness"——把 LLM 直接接到 Mac 的可访问性 API 上，让代理能"真控制一台 Mac"。哲学是"代理边干边写代码、中途补缺失能力"，不预设框架、不写 recipes、不铺轨道。One Python file.
- **实战 / 争议信号**：issue [#6 mac.click() silently has no effect on native AppKit apps (Finder, Calculator, ...)](#) 三条高赞评论含金量极高——[Ryanm218](https://github.com/Ryanm218)（项目维护者）根因定位："`mac.click()` 走的是 `CGEventPostToPid` 鼠标事件，AppKit 的 hit-test 走 window server 指针状态，所以鼠标事件被悄悄丢弃；键盘事件不带坐标，所以 `mac.key`/`mac.type` 用同一个 `_post` 助手能正常工作——这种不对称就是 bug 本质。"[fredchu](https://github.com/fredchu) 在不同 macOS build + 多显示器环境下做了独立复现。这是教科书级的"issue + 根因分析 + 复现 + 修复"链路。
- **横向对比**：与 [Anthropic Computer Use](https://docs.anthropic.com/en/docs/agents-and-tools/computer-use) 官方实现相比，browser-use 团队走 macOS Accessibility API 而不是纯截图识别——更轻、更快、更可控；与 [OpenBot](#) 在"控制真实 GUI"层面重合，但 macos-harness 是单文件 Python 库，OpenBot 是完整产品。
- **信号判断**：✅ 根因分析极其专业（社区维护者水平在线）；⚠️ GUI 自动化的"沉默失败"是这类项目的通病；📈 browser-use 团队本月已经在 macos-harness 上押重注。
- **适用场景**：**适合**：要做 Mac 本地 GUI 自动化的开发者、需要"最薄一层"的代理 harness；**不适合**：跨平台 GUI 自动化（项目名就叫 macos-harness，别指望 Windows/Linux）。

### #9 [SigmanticAI/apex-inference-chip](https://github.com/SigmanticAI/apex-inference-chip) ⭐681

- **仓库元数据**：topics 为空；size=7.8MB（含 RTL 源码与文档）；主语言 Python；homepage=[sigmanticai.com](https://www.sigmanticai.com)；2026-08-18 创建/推送。
- **README 核心价值提炼**：在 FPGA 上真实跑通 Qwen2.5-0.5B 的推理芯片设计——单个 transformer 解码层全 RTL 实现：attention、KV-cache 压缩、softmax、RMSNorm、RoPE、SwiGLU、residual，所有模块都做了 bit-exact 验证。"verification-first" 是核心方法论：每个模块都跟参考实现做位级一致性比对。
- **实战 / 争议信号**：issue 区空（项目刚发，无社区反馈）；仓库靠 README 内嵌的硬件验证流程与论文链接建立可信度。
- **横向对比**：与 [Tinygrad](https://github.com/tinygrad/tinygrad) 的软件路径完全相反——tinygrad 是"软件先把算子对齐再考虑硬件"，APEX 是"硬件先把 RTL 写出来再回灌软件"；与学术界的开源 LLM 推理 IP（Cerebras / Groq 公开论文）相比，APEX 走的是"完全开源 RTL + 可在廉价 FPGA 验证"的路线，更适合个人硬件研究者复现。
- **信号判断**：✅ 真硬件 + 真 LLM + 真验证（区别于纯软件模拟或论文仿真）；🤔 无 issue 反馈意味着关注者多是研究者而非工程用户；📈 在 AI 硬件开源仍稀缺的当下是稀缺资产。
- **适用场景**：**适合**：芯片设计研究者、想理解 transformer 推理在硬件层到底怎么发生的学生、做 AI 加速器创业的早期团队；**不适合**：只关心"跑得快不快"的 LLM 用户（这条仓库价值在过程不在结果）。

### #10 [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) ⭐649

- **仓库元数据**：topics=`cordis / deepseek / deepseek-harness / developer-tools / dsh / dsh-plugin / dsh-plugins / floating-widget / plugin`；size=14.4MB（图片资源为主）；主语言 JavaScript；2026-08-19 创建，2026-08-23 推送。
- **README 核心价值提炼**：DSH Web 界面右下角常驻一只"小鲸鱼娘"气泡图——它盯着 DeepSeek 账户余额，今日已用、每轮对话消耗、60 秒自动刷新，支持拖拽吸附和数字滚动动画。是标准 DSH bundle 插件包，可通过 `dsh plugin` 安装/卸载。读完全文能看出这是个"人格化工具栏"——把一个冰冷的余额数字变成一只会动的小鲸鱼娘。
- **实战 / 争议信号**：issue [#43 拖拽后位置无法保存：刷新页面后桌宠回到右下角](#) 用户反馈 `saveConfig()` 写 localStorage 成功但下次刷新仍然回到默认位置，是经典的"持久化逻辑被覆盖"问题；issue [#42 建议支持 `dsh plugin add github:MeteorNOX/...` 直接从 GitHub 安装](#)——社区已经在反向推动工具改进；issue [#40 建议可选皮肤 / 音效 / 待机动作](#) 与 #39 [closed]（周末谷段计费调整公告）展示了 DSH 生态用户对"代理萌化"的需求和 DeepSeek 官方对定价的实际调整动作。
- **横向对比**：与 [VSCode Pet](#) 等"桌面萌宠"项目类似，但 DeepSeek-Balance-Whale-Widget 是第一个把"AI 服务状态可视化"做成可拖拽桌宠的——它把"账户余额查询"这种后台操作变成前台常驻状态栏；与 [dsh-ios](#)（#30）一起构成 DSH 的"跨平台萌化周边"。
- **信号判断**：✅ 真实用户反馈密集（8 个 issue + 7 个 PR）+ DSH 周边生态成型；⚠️ 持久化 / 浏览器刷新兼容是 Web 插件常见痛点；📈 DSH 周边"萌化 + 实用化"组合是这个 IP 的成功路径。
- **适用场景**：**适合**：DSH 重度用户（需要常驻看余额 / 调监控）+ 想给冷冰冰工具加人格化的二次创作者；**不适合**：只用 DeepSeek 网页版的轻度用户（DSH 桌面客户端依赖）。

## 简评 Top 11-30

| # | 仓库 | ⭐ | 一句话定位 |
|---|------|---:|------------|
| 11 | [missuo/herdrm](https://github.com/missuo/herdrm) | 608 | Native macOS 控制台：把所有 coding agent 会话统一收口，Swift 实现 |
| 12 | [flaqai/backlink_skills](https://github.com/flaqai/backlink_skills) | 531 | 一组把 URL 自动投递到免费收录站点的 SEO skill 集合 |
| 13 | [iAmCorey/Wake](https://github.com/iAmCorey/Wake) | 511 | macOS 上的 coding-agent 会话聚合浏览器，Rust 实现，"每条会话一处可见" |
| 14 | [cclank/lanshu-create-ai-presenter-video](https://github.com/cclank/lanshu-create-ai-presenter-video) | 479 | 厂商中立的 Codex Skill：自动产出可验证的 AI 演示视频 |
| 15 | [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) | 333 | Claude Code 用的"高端滚动驱动网页" skill，定位网站交互层 |
| 16 | [duty1g/x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server) | 318 | 原生 MCP server：把 x64dbg 调试器变成代理可调的工具，Zig 实现 |
| 17 | [Ariescar/anyCreature](https://github.com/Ariescar/anyCreature) | 307 | 无描述 JS 项目，从命名看定位"任何生物/角色代理" |
| 18 | [Yuzzyuk/marketing-os](https://github.com/Yuzzyuk/marketing-os) | 287 | 一个 Claude Skill 装下 14 个营销模块，整套营销部门打包 |
| 19 | [LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler) | 284 | Minimax H3（24ch）的神经潜空间升采样器，绕过昂贵的像素升采样 |
| 20 | [jaredrhod/fullstack-agent](https://github.com/jaredrhod/fullstack-agent) | 276 | 给 AI 装上"全套身体"：记忆、声音、脸、手，Shell 实现 |
| 21 | [amagine-ai/Amagine3D](https://github.com/amagine-ai/Amagine3D) | 275 | 从硬件需求出发的可编辑 3D 设计生成（TypeScript） |
| 22 | [op7418/pilot-harness](https://github.com/op7418/pilot-harness) | 252 | CodePilot 风格的桌面客户端 + 插件生态，TypeScript 实现 |
| 23 | [MirroS-Lab/HarnessEval-W](https://github.com/MirroS-Lab/HarnessEval-W) | 249 | "代理化"视觉世界评估，把 benchmark 流程也交给 agent（Python） |
| 24 | [sam70361/emotion-ball](https://github.com/sam70361/emotion-ball) | 241 | 给 AI 助手用的纯 SVG + 原生 JS 表情引擎，32 种状态 |
| 25 | [JetBrains/benjamin-plus-skill](https://github.com/JetBrains/benjamin-plus-skill) | 237 | JetBrains 官方出的"token 效率"编程代理 skill，Shell 实现 |
| 26 | [DFarm6/Prism-Browser-Community](https://github.com/DFarm6/Prism-Browser-Community) | 231 | 本地优先的多 profile 指纹浏览器基础，TypeScript |
| 27 | [BigPengSays/bigpeng-hot-gzh](https://github.com/BigPengSays/bigpeng-hot-gzh) | 231 | 从 100+ 爆款 AI 公众号文章蒸馏出的 7 个爆款选题公式 + Skill |
| 28 | [LB623/no-negative-echo](https://github.com/LB623/no-negative-echo) | 225 | 让 Codex 按"最终结果"反向生成标题/注释/commit/PR，减少否决方案残留 |
| 29 | [amitshekhariitbhu/llm-inference-engineering](https://github.com/amitshekhariitbhu/llm-inference-engineering) | 214 | LLM 推理工程学习路径：KV cache / 调度 / 优化逐步拆解（Markdown） |
| 30 | [ZSeven-W/dsh-ios](https://github.com/ZSeven-W/dsh-ios) | 213 | DSH 的 iOS 模拟器插件——让代理在 iOS Simulator 里有可视界面 |

## 数据方法

- **时间窗口**：`created:2026-08-17..2026-08-24`（UTC，左闭右开），对应 ISO 2026-W34（2026-08-17 周一 ~ 2026-08-23 周日）。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant`（GitHub Search API 限制最多 5 个 OR 项），限定 `in:readme`。
- **排序**：按 `stars` 降序，`per_page=30`。
- **没有其他准入门槛**：不限 stars 数值、不限 pushed 时间、不限语言、不限 archived。
- **数据源**：GitHub Search API（主）；项目内深挖另发 REST API 拉 README + issues + comments。
- **快照时间**：2026-08-23 20:11 CST（= 2026-08-23 12:11 UTC），CST 周日跑完后立即抓取。
- **样本构成**：英文 25 / 中文 5（17% 中文占比，含中文字符的 description 或仓库名）。
- **slug**：`github-weekly-2026-W34`（ISO 周数）。
- **API 速率**：本次消耗约 60 次请求（5000/h 限额），剩余 4940。
- **本文章不与日榜/月榜交叉引用**：周榜 Top 30 全部详深挖写在本篇内，日榜/月榜文章同步独立发。