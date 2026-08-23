# GitHub 月榜 · 2026-08 · 三类 AI 推理基建同时引爆 + agent harness 双轨霸榜

七月的 GitHub 用一个肉眼可见的拐点告别了"聊天机器人时代":半个月内,前 10 名里出现了三个本地大模型推理引擎(Colibri / Kimi-K3-in-C / Gemma 4 turbo-fieldfare)、三个 agent harness(Grok Build / QM / AOS)、一个 3T 参数开源旗舰(Kimi K3 自身),以及两个把 AI 体验推到极致的"皮肤/3D 重生成"项目。同一时期,OpenAI 把自家的代码安全扫描器做成了 npm 一行命令。

这不是"AI 项目变多了",而是 AI 项目开始分层:底层推理、中层 harness、顶层体验三栈同时发力。底层靠 C / Rust / Apple Silicon 把成本打到极致;中层在多用户协作、沙箱安全、agent-as-a-product 上开花;顶层开始用 Three.js 和视频模板"反卷写作",把代码生成从 LLM 流水线推向可视化交付。

以下 50 条是 2026-07-01 UTC 至 2026-08-01 UTC 之间创建、且 README 含 `ai / llm / agent / mcp / assistant` 任一关键词的仓库,按 stars 降序排列。样本构成:英文 41 条 / 中文 9 条。

---

## 本月核心信号

- **三大本地推理引擎同时上榜**:Colibri(纯 C,流式调度 744B-2.8T MoE)、Kimi-K3-in-C(2.78T 参数单 CPU 跑)、Gemma 4 turbo-fieldfare(M 系列 MacBook 2GB RAM 跑 26B-A4B)。三件事都指向同一个目标——让前沿模型跑得动、跑得起、跑在个人硬件上。
- **Agent harness 双轨成型**:xAI 的 Grok Build(单机 TUI,绑 SpaceXAI 生态)和 yc-software/qm(团队 Slack + Web 协作平台)代表两种 harness 哲学——单机极致 vs 多人协作。Unicity AOS 走第三条路:把 agent 当作 first-class OS 公民,自带 capsule 模型和可插拔安全策略。
- **Kimi K3 整月生态爆炸**:开源 2.8T 参数旗舰 Kimi K3 自带流量,衍生项目至少两条(月榜内 Kimi-K3-in-C 第 15 位、月榜外还有更多 fork)。同一时间 Moonshot 把 Thinking Mode API 化,MCP-Atlas / BrowseComp 等 agentic benchmark 直接接入 K3。
- **OpenAI 把安全扫描做成 npm 一行命令**:codex-security 把扫描 + 验证 + 自动开 PR 闭环,允许替换 OpenRouter / Fireworks / Bedrock 后端。这是 OpenAI 把 Codex 推向"开发者工具"的关键一步。
- **agent skill 周边开始分化**:Codex / Claude Code 的 skill 生态已出现专门做公众号排版(isjiamu/gzh-design-skill)、海报(LiamGvchi/gc-minimal-zine-poster)、视频(Vincentwei1021/video-shotcraft)、3D 滚动页面(oso95/scroll-world)的小项目——agent 不再只生产代码,开始生产可消费的成品。
- **模型多供应商化加速**:QM、Codex-Router、WorkBuddy Guide 都在解决"同一个 harness 跑不同厂商模型"的问题——把"绑死 GPT-5 / Claude"变成可换电池的接口层。

---

## 今日 Top 10 详深挖

### 1. [JustVugg/colibri](https://github.com/JustVugg/colibri) · ⭐25,913

> 纯 C 单文件推理引擎,把 744B 至 2.8T 的 MoE 前沿模型塞进消费级硬件;专家权重走磁盘流式,RAM/VRAM/SSD 当成同一个推理层级来调度。

| 字段 | 值 |
|---|---|
| 语言 | C(13.1 MB) |
| License | Apache-2.0 |
| Topics | 无 |
| 创建 / 推送 | 2026-07-01 / 2026-08-23 |
| Stars / Forks / Watchers | 25,913 / 2,825 / 227 |
| Open issues | 102 |
| Homepage | https://justvugg.github.io/colibri |

**定位**:Colibri 的核心论点是——一个 744B 的 MoE 模型每次推理只激活 ~40B 参数,其中只有 ~11GB 是"真正变化的专家"。所以它根本不需要"装进"快内存,只要被"放置"在合适的存储层级即可。具体做法是把 dense 部分(~17B,int4 后 ~9.9GB)放 RAM,19,456 个专家(~19MB/个,int4,~370GB)放 NVMe,通过 O_DIRECT + 双 SSD striping + 预取 + LRU 把延迟藏起来。

**核心价值 5 条**:

1. **零依赖纯 C 引擎**:`c/colibri.c` 一个文件搞定,无 BLAS / 无 Python / 无 GPU 强制要求,Linux 笔记本就能跑 744B 模型。这对想在边缘设备做本地推理的开发者意义重大。
2. **JIT-for-weights 思路**:不是把所有权重都提前加载,而是观察路由热图,按"下一层大概率会激活的专家"预取——和编译器 JIT 把热点路径在运行时编译是一个哲学。
4. **多模型族同一前端**:`./coli chat` / `coli serve` / `coli web` 同一套 CLI 支持 GLM-5.2(744B)、Inkling(975B)、Kimi K3(2.8T)、DeepSeek V4 Flash(284B)、Qwen3.6(35B-A3B)、OLMoE(7B)六族,覆盖目前主流 MoE 旗舰。
5. **研究透明**:README 用大段写"开放假设 + 实验矩阵",鼓励社区提供负向结果。它把"我比 llama.cpp 快 X%"这种不可复现的话术挡在门外,要求每个实验提交硬件 / commit / 容器 / 提示词 / 缓存状态 / 吞吐量 / TTFT / 专家命中率 / 读取字节数 / 质量检查全套。

**实战信号 + 争议**:

- Issue #1183 用户实测 i9-14900K + RTX 3090 上 GLM-5.2 int4 = 0.71 tok/s,作者明确把这列为"benchmark 矩阵里缺的一格"(24GB VRAM > 5080 / 5070 Ti)。这种"我自己补数据点"是项目鼓励的。
- Issue #1191 报"`coli tune` 在所有非 GLM 引擎上不可用",因为它依赖 colibri.c 里写的 GLM 专属 replay 协议——多模型族前端成本就是这个。
- Issue #1190 报"`--cap` 不传值时把字面字符串 'None' 传给引擎作为 argv[1]",这是 argparse default 处理的常见坑。

**横向对比**:Colibri vs llama.cpp / vLLM / kTransformers 的关系是"都解决同一问题但走不同极端"——llama.cpp 偏成熟稳态,vLLM 偏服务吞吐,kTransformers 偏专家卸载,Colibri 偏"消费级硬件 + 单 C 文件 + 学术透明"。

**信号判断**:
- ✅ 实战验证:102 个 issue 中绝大部分是基准和兼容性问题,无 security 类警报。
- ✅ 研究诚信:明确标注"无 SLA,只保证语义",且要求每个实验提交完整快照。
- ⚠️ 商业化风险:目前只支持 6 个模型族,要做生产工具需等待更多 fork / 移植。

**适用场景**:**适合**:想在笔记本 / 工作站跑前沿 MoE 的研究员、想理解"流式 MoE 推理"系统的学生、需要单机不联网 LLM 的隐私场景 · **不适合**:需要高 QPS 生产服务(请走 vLLM)、需要严格 SLA 的企业部署。

---

### 2. [xai-org/grok-build](https://github.com/xai-org/grok-build) · ⭐25,912

> xAI 的终端原生 AI 编程 agent,全屏 TUI、支持鼠标交互、内嵌 Agent Client Protocol(ACP)给编辑器。

| 字段 | 值 |
|---|---|
| 语言 | Rust(35.2 MB) |
| License | Apache-2.0 |
| 创建 / 推送 | 2026-07-14 / 2026-08-19 |
| Stars / Forks / Watchers | 25,912 / 4,869 / 215 |

**定位**:SpaceXAI 把 Grok Build 拆出来作为独立 Rust crate 发布。它的设计哲学是"终端是 IDE,不只是命令行"——全屏 TUI + 鼠标交互意味着它不是给 shell 极客用的,而是要吃掉 Claude Code / Codex 的桌面侧用户。

**核心价值 5 条**:

1. **ACP(Agent Client Protocol)嵌入**:支持在编辑器里内嵌 agent runtime,而不是只能从终端侧拉起——这是和 Claude Code / Codex 共享桌面的关键。
2. **三种运行模式**:交互式、headless(CI / 脚本)、编辑器嵌入式同一套代码。`grok` 一条命令切换上下文。
3. **沙箱 + Skill + Plugin + Hook 全栈支持**:用户指南明确写了 sandboxing / skills / plugins / hooks / headless mode 的配置;不是 MVP,是生产工具栈。
4. **源码周期性同步自 SpaceXAI monorepo**:根目录的 `SOURCE_REV` 文件记录精确 commit SHA——意味着你拿到的不是"提取版",而是从主仓库同步出来的精确快照。
5. **第三方许可透明**:`THIRD-PARTY-NOTICES` 同时收录 crates.io / git 依赖 + 主题 + OpenAI Codex 和 SST OpenCode 的源码移植——是公司级合规该有的样子。

**实战信号 + 争议**:

- 仓库 open_issues = 0,可能是 xAI 团队把讨论导到了 chat 而非 issue tracker。
- README 自述"External contributions are not accepted"——这是公司主导项目的标准姿态,不影响产品质量,但意味着 bug 修复节奏由 xAI 决定。

**横向对比**:Grok Build vs Claude Code vs Codex CLI 三件套定位高度同质化,差异在:Claude Code 走"模型 + harness 绑定销售",Codex 走"OpenAI 生态绑定",Grok Build 走"Grok 模型 + 终端极客"。

**信号判断**:
- ✅ 安全合规:Apache-2.0,三方依赖公告完整。
- ✅ 维护活跃:35MB 源码 + 周期性 monorepo 同步说明工程投入持续。
- ⚠️ 不接外部贡献:对生态扩展是减分项。

**适用场景**:**适合**:xAI 模型用户、需要 Rust 原生 TUI agent 的开发者、想把 agent 嵌进编辑器的 IDE 团队 · **不适合**:想要可 fork 贡献的开源爱好者、希望脱离 Grok 模型单独用 harness 的场景(目前绑得比较死)。

---

### 3. [andrewyng/openworker](https://github.com/andrewyng/openworker) · ⭐14,949

> 桌面端 AI 同事,主打"完成工作而不是聊天",自带 25+ 集成(GitHub / Slack / Jira / Notion / Linear / HubSpot / Outlook / monday.com / Gmail / Google Calendar),支持任意 LLM provider。

| 字段 | 值 |
|---|---|
| 语言 | Python(4.1 MB) |
| License | MIT |
| 创建 / 推送 | 2026-07-20 / 2026-08-23 |
| Stars / Forks / Watchers | 14,949 / 2,069 / 101 |
| Open issues | 443 |

**定位**:OpenWorker 把自己定位成"AI coworker"——它的承诺是用户告诉它"我要一份客户简报",它直接生成成品(Word / Notion 页面 / Slack 答复)而不是给一份待办清单。本地优先、密钥本地存、数据只通过用户授权的模型 / 集成出口。

**核心价值 5 条**:

1. **Local-first 架构**:agent loop、对话、连接器 token、模型密钥全部在 app 本地 secret store;唯一联网的部分是 OAuth 握手 broker。
2. **BYOM(Bring Your Own Model)**:OpenAI / Anthropic / Google Gemini / BytePlus Ark / Volcengine / Inkling / GLM / DeepSeek / Kimi / Qwen / MiniMax / Mistral / Grok / Together / Fireworks / Ollama 全支持——单一 UI 不绑死 provider。
3. **25+ 集成 + MCP 接入**:GitHub / Slack / Jira / Notion / Linear / HubSpot / Outlook / monday.com / Gmail / Google Calendar 都开箱即用,且任何 MCP 服务都能插上。
4. **Cron 自动化**:可以设"早间简报"、"周报"、"频道监听",落地带完整 transcript 的可审计结果。
5. **引擎建在 aisuite 上**:引擎层抽象自 andrewyng/aisuite(同一作者),"如果你想自己搭 harness,先去那里"。

**实战信号 + 争议(三个高优安全问题)**:

- Issue #527 SSRF in MCP OAuth flow:OAuth provider 的 discovery / dynamic client registration / token exchange 全部无目标校验,远程 MCP server 可以指向内网地址。
- Issue #526 无 untrusted-content boundary:LLM loop 里外部内容和指令性上下文之间没有结构性边界,工具读取邮件 / web 后注入风险显著。
- Issue #525 审计日志持久化未脱敏:`result_preview` 只截断不脱敏,邮件正文 / shell 输出里的密钥会原样落盘。

这三个 issue 都是由同一位安全研究员在 8 月同步提的,严重程度高,作者把它们称为"one architectural finding with four verified data points"——也就是单一架构问题多个数据点。这不是"小漏洞",而是"本地 agent 工具的通用安全挑战"。

**横向对比**:OpenWorker vs Manus / Devin / Lindy 等"AI coworker"产品的区别是:OpenWorker 是 MIT + 自托管 + BYOM,别人是闭源 SaaS + 平台绑定。安全模型则是经典权衡——本地优先把数据控制权还给用户,但也意味着用户要自己保证 MCP / 集成的来源。

**信号判断**:
- ✅ 实战验证:443 个 issue 说明用户基数大、反馈活跃。
- ⚠️ 安全警告:三个高优 SSRF / prompt injection / audit 脱敏问题是新发现。
- ✅ 灵活:BYOM + MCP 让它可以适配任何新模型 / 新服务。

**适用场景**:**适合**:自托管敏感工作流的团队、想要一站式桌面 AI 助理的个人开发者、需要 Slack 内触发 agent 的中小公司 · **不适合**:对 MCP OAuth 安全零容忍的金融场景(等上游补丁)、不打算自己处理密钥管理的纯小白用户。

---

### 4. [yc-software/qm](https://github.com/yc-software/qm) · ⭐14,090

> 多人 agent harness for work,让公司里每个员工拥有自己的 agent 工作区,并在 Slack / Web 共享协作。

| 字段 | 值 |
|---|---|
| 语言 | TypeScript(7.8 MB) |
| License | MIT |
| Topics | `ai` / `assistant` / `harness` / `qm` |
| 创建 / 推送 | 2026-07-29 / 2026-08-22 |
| Stars / Forks / Watchers | 14,090 / 1,686 / 66 |

**定位**:QM 把 agent 当成公司基础设施而不是个人助理。每个员工有独立 workspace(独立 memory / 文件 / 密钥 / 权限 / cron / sandbox),同时又能通过 Slack channel / 项目群协作。底层 headless core + 多种 harness(Pi / OpenCode / Codex / Claude Code)+ Postgres 持久层。

**核心价值 5 条**:

1. **作用域隔离**:每个员工 + 每个房间 = 独立 memory / 文件 / keychain / 权限 / sandbox;同时支持在 Slack / Web 项目频道里共享。
2. **三档安全姿态**:Strict(每步人工批准)/ Auto(默认,对外部内容做来源分类后再喂模型)/ Dangerous(全速,无沙箱)。三种姿态由部署方决定,scope 子级只能收紧不能放宽。
3. **可插拔 harness + 模型**:同一份部署可以接 Pi / OpenCode / Codex / Claude Code 任一 harness,模型也由部署方决定——不被任何厂商锁死。
4. **企业部署标准化**:`qm init` CLI 一行生成 deploy directory,包含 infra / 密钥 / Slack / 域名配置;核心代码保持与 upstream byte-identical,合并上游 PR 几乎零摩擦。
5. **Web app + Slack plugin 是核心的可选 surface**:web UI、admin panel、public portal 都是核心 HTTP API 的插件,Slack 是 in-process plugin——这意味着 Slack 集成不会引入新的进程边界。

**实战信号 + 争议**:

- Issue #651:Slack 输出走 mrkdwn,所以列表 / 表格 / 标题都得用字符模拟,一旦换行就丢结构;CJK 加粗会打出字面星号。这是 Slack 表面 + 多语言 agent 的经典张力。

**横向对比**:QM vs OpenWorker 都想做"AI coworker",但 QM 显式面向多人 / 多 scope 的公司场景,OpenWorker 偏单用户桌面。QM 的 Slack-first 与 OpenWorker 的 desktop-first 是产品哲学差异。

**信号判断**:
- ✅ 工程投入:Web UI + Admin + Slack + Webhook + Cron 全栈,5000+ 行 commit 信息密集。
- ✅ 治理思路:三档安全 + 部署目录分离是公司级合规该有的样子。
- ⚠️ Slack mrkdwn 限制:会影响复杂输出场景的可读性。

**适用场景**:**适合**:中型创业公司想全员铺 agent、需要 Slack 内触发 agent 的运营 / 销售 / 客户成功团队、想跟 Pi / OpenCode / Codex / Claude Code 之间切换的部署方 · **不适合**:纯个人用户(用 OpenWorker 更轻)、对 Slack 强依赖但输出结构复杂的场景(等表面升级)。

---

### 5. [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) · ⭐14,047

> 给 OpenAI Codex 桌面端换肤的皮肤工具,本机 CDP 注入、不改官方 .app / app.asar / WindowsApps,自带 6 套精选主题 + 主题库 + 在线 Studio。

| 字段 | 值 |
|---|---|
| 语言 | JavaScript(30.0 MB) |
| License | MIT |
| 创建 / 推送 | 2026-07-15 / 2026-08-12 |
| Homepage | https://www.dreamskin.cc |

**定位**:不修改官方安装包,只通过本机 CDP(Chrome DevTools Protocol)给 Codex 注入主题 CSS + 背景图。这等于一个"非破坏性主题工具",对官方签名 / 更新路径零影响。

**核心价值 5 条**:

1. **本机 CDP 注入,不改签名**:Mac/Win 都走 127.0.0.1 回环 CDP,目标 App 的二进制和签名都不动;卸载后官方恢复。
2. **一键换肤闭环安全**:网页 → `dreamskin://apply?version=...` 唤起本机 App → 核对审核状态 + 一键兼容标记 + 版本号 + 包大小 + 实际下载字节数 + SHA-256 → 复用手动导入完全相同的 ZIP / manifest / 图片 / Safe CSS 校验。
3. **Safe CSS 沙箱**:主题 CSS 只能作用于 12 个注册部件,任意切换 / 应用都重新校验;不会被恶意主题拿走密码字段 / 重定向 API。
4. **主题库 + 在线 Studio 生态**:dreamskin.cc 提供主题 gallery(社区审核)+ Studio(浏览器内编辑主题 + 导出 ZIP)。
5. **人话目标**:README 第一行"一张图,一种心情 · 写代码,也要有氛围感"——这是工程化主题工具少见的"为情感而做"姿态。

**实战信号 + 争议**:

- Issue #375:Windows 一键换肤会"误判 macOS-only 主题为可装",确认后安装失败——跨平台兼容性矩阵需要更严。
- Issue #374:macOS v1.5.14 间歇性 injection 失败,且拒收字节完全相同的 manifest(可能是 SIG/校验链不稳)。
- Issue #373:Windows Codex 26.814 引入新 `_ComposerLayoutBody_` / `_ComposerLayoutFooter_` 等类名,旧 Safe CSS 没覆盖,白屏 / 布局异常。
- Issue #371:Windows GUI 顶部 / 底部颜色不一致。
- Issue #367:Windows 侧边栏 SVG 颜色规则太宽,覆盖了设备图标的原生语义色。

**横向对比**:Codex Dream Skin vs BetterDiscord / Stylus 等通用主题工具的区别是——它专门为 Codex 设计了 manifest / Safe CSS / 一键唤起协议,这是通用工具做不到的合规边界。

**信号判断**:
- ✅ 用户基数:14k stars + 主题库 + Studio 一整套,确实在做产品不是 demo。
- ⚠️ 跨平台 drift:Windows 是重灾区,Mac 偶发;版本与 Codex 内部版本强耦合,跟版本升级是持续博弈。
- ⚠️ 商业模式:独家赞助方 Passion8(API 中转服务)出现在 README 显眼位置——读者要注意"主题工具"和"API 中转"的商业边界。

**适用场景**:**适合**:想给 Codex 加个人风格的开发者、需要在团队里做"统一 IDE 视觉"的设计 / 前端团队、对官方 .app 包不愿动手的安全敏感用户 · **不适合**:不接受 CDP 注入的攻击面(虽然只在回环)的极简主义者、需要跨多个编辑器统一主题的团队。

---

### 6. [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) · ⭐12,925

> 给一张参考图,生成可动画、token 高效的 Three.js 代码模型——不要 mesh 文件,只要生成 TypeScript。

| 字段 | 值 |
|---|---|
| 语言 | Python(25.0 MB) |
| License | Apache-2.0 |
| Topics | `3d` / `ai-agents` / `claude-code` / `computer-graphics` / `generative` / `image-to-3d` / `procedural-generation` / `threejs` / `typescript` / `webgl` |
| 创建 / 推送 | 2026-07-15 / 2026-08-22 |
| Homepage | https://img2threejs.github.io/img2threejs-showcase/ |

**定位**:大多数 image-to-3D agent 流水线让模型做机械工作——每轮重新读全模型、给像素打分、手工验证 JSON、重新跑已完成的步骤。img2threejs 把这些都推到确定性 Python 脚本里,模型 token 只用在"看对比图决定 pass / fail"这一个判断上。结果是 TypeScript + JSON spec,可 diff、可版本控制、不需要下载 mesh 文件。

**核心价值 5 条**:

1. **Token-efficient by design**:scripts enforce, the model judges——Python 脚本负责校验 / 门禁 / spec 写 / PBR 提取 / 对比表打包 / 流水线状态;模型只看一张对比图(side-by-side reference vs render)决定 pass / fail。
2. **零依赖零安装**:所有脚本是 Python 3.10+ 标准库,PNG 读写用 `struct` + `zlib`。没有 pip / PIL / numpy / Playwright,意味着没有"装环境"的调试上下文。
3. **Pass-gated generation**:代码生成器只输出"当前已解锁的 build pass",模型不重新生成 / 不重读整模型,每步小而聚焦。
4. **Detail-first analysis**:生成代码前先枚举 detailInventory(gloss / bevel / 螺丝 / 雕刻线 / 污渍等身份定义细节),每个细节必须映射到真实组件 / 材质条目;严格质量门会阻止生成直到清单完整。
5. **多 profile 鲁棒**:object / character / hybrid / CS2(CSGO 武器)/ creature(4 种身型:四足 / 鸟 / 翼龙 / 蛇形),每条 profile 有专门的 review gate 和 component contract。

**实战信号 + 争议**:

- Issue #103:SSRF 风险——`material_region_analysis.py:120` 用 `region_id.replace('/', '-')` 但没处理 Windows 反斜杠和 `..`,可能导致路径穿越。
- Issue #102:`fetch_cs2_metadata.py:27` 直接 `urllib.request.urlopen(index_url)`,攻击者可传内网 URL。
- Issue #95:SKILL.md 的 `version` 顶层 key 在 Codex 不被识别,需迁到 `metadata.version`。

**横向对比**:img2threejs vs TripoSR / Meshy / CSM 等"image to mesh"工具的差别是"输出形式":别人输出 .obj / .glb,img2threejs 输出 TypeScript factory——结果是可读、可改、可版本控制、可塞进 git diff。代价是单图重建质量受限于模型,1 张图永远画不出 360° 细节。

**信号判断**:
- ✅ 工程完整度:13k stars + 详细 grimoire/ + Roadmap 到 v2.0,项目长期可投资。
- ✅ 研究透明:ROADMAP.md 把"v1.5 角色 / v1.6 环境 / v1.7 游戏管线 / v1.8 动画 / v1.9 AI Studio / v2.0 程序世界"全公开。
- ⚠️ SSRF / 路径穿越:两个 #101-#103 类问题是脚本层,需自己 patch。

**适用场景**:**适合**:游戏 / Web3D 工程师想要可改可读的 3D 资产、想给 agent 配 image-to-code 技能的产品团队、重视 token 成本的多 pass 流水线 · **不适合**:只想要"一键 mesh 文件"的非技术美术、需要 360° 完整细节的高保真模型(单图上限)。

---

### 7. [openai/codex-security](https://github.com/openai/codex-security) · ⭐10,092

> OpenAI 官方的 Codex Security CLI + TypeScript SDK,负责扫描代码、验证漏洞、自动开 PR 修高危问题。

| 字段 | 值 |
|---|---|
| 语言 | TypeScript(20.2 MB) |
| License | Apache-2.0 |
| Topics | `ai-security` / `application-security` / `cli` / `code-scanning` / `codex` / `codex-security` / `cybersecurity` / `devsecops` / `nodejs` / `npm` / `openai` / `sdk` / `security` / `typescript` / `vulnerability-scanning` |
| 创建 / 推送 | 2026-07-13 / 2026-08-23 |

**定位**:把"OpenAI 的安全研究能力"打包成 npm 包 `@openai/codex-security`。四步闭环:`scan` 找漏洞 → `validate` 验证 → `patch` 改 → `create-pr` 自动开 PR。同时支持标准扫描、深度扫描、组件扫描、容器批量扫描四种模式。

**核心价值 5 条**:

1. **CLI + SDK + 容器批量**:三种形态服务不同部署方——开发者本地跑 CLI、平台集成走 SDK、企业批量跑 Docker。
2. **多模型后端可换**:除了 OpenAI 默认,OpenRouter / Fireworks / AWS Bedrock 都能注入——避免"安全扫描绑定 OpenAI 模型"。
3. **Linear 集成**:`patch --linear-issue SEC-123` 直接把 Linear issue 修掉,适合已经用 Linear 管安全 backlog 的团队。
4. **Trusted Access for Cyber 门槛**:某些 cybersecurity 请求需要申请访问——把"通用模型"和"安全模型"做了产品分层,避免 OpenAI 模型被滥用于攻击研究。
5. **从扫描到 PR 闭环**:`scan --patch --create-pr` 一行命令,OpenAI 帮你修高危并自动开 draft PR;失败可 `--resume-pr` 重试不重跑 Codex。

**实战信号 + 争议**:

- 仓库 open_issues = 178,这是 OpenAI 安全项目里相对低的 issue 漏斗,意味着 triage 团队持续在处理。
- README 里把"环境 API key 不会存入 Codex credential home"明写出来,这是企业安全敏感客户会盯的细节。

**横向对比**:codex-security vs Snyk / Semgrep / Trivy 的区别是——codex-security 是 LLM 加持的安全工具,Snyk / Semgrep 是规则引擎。LLM 能看上下文(架构意图、调用链),规则引擎看 pattern。两者互补,codex-security 不替代 Snyk。

**信号判断**:
- ✅ 企业级合规:Trusted Access 分层 + Linear 集成 + 容器化批量 + 凭证不落盘,这是公司级安全产品该有的样子。
- ✅ 多后端:不让客户绑死 OpenAI。
- ⚠️ 申请门槛:要做 cybersecurity 研究需要单独申请,学术 / 个人研究流程比商用慢。

**适用场景**:**适合**:中大型企业的安全 / DevSecOps 团队、已有 Linear 管安全 backlog 的工程师、想把 LLM 纳入 CI 安全扫描的工程团队 · **不适合**:纯学术 / 个人研究(申请流程长)、需要本地离线扫描(目前云端为主)。

---

### 8. [trycompai/crm](https://github.com/trycompai/crm) · ⭐8,820

> "Agentic-first CRM"——agent 不是 CRM 的功能,CRM 是 agent 记笔记的地方。

| 字段 | 值 |
|---|---|
| 语言 | TypeScript(9.0 MB) |
| License | MIT |
| 创建 / 推送 | 2026-07-31 / 2026-08-21 |
| Homepage | https://trycrm.ai |

**定位**:CRM 不再是"数据库前面放个表单"。Comp AI 把 agent 设计成独立部署,跑在自己的时间表上,面对自己的工作队列。关掉浏览器它还在跑,自己决定下一步看谁、自己预约 follow-up、花研究预算、预算花完就停。这不是 request-response,是 agent-as-a-product。

**核心价值 5 条**:

1. **规则硬约束**:agent 自己绝不打破的规则——"关于人的任何信息都不许猜"。不允许 confidence score,模型自评确定性会偏向"让自己显得有用",所以工具只回报"观察到的"(`crm.signature-block` / `github.account-identity`),由账本定价证据强度。强证据写记录,弱证据变 suggestion 等人来定。
2. **Vercel filesystem-first framework `eve`**:工具 = 文件,skill = markdown 文件,schedule = 文件——runtime 处理持久部分,session 跨重部署存活,工作从断点恢复。
3. **Sandbox 无网无库**:`deny-all` egress + sandbox 永远拿不到 `DATABASE_URL`——一个 shell 同时拥有 credential 和 egress 是"exfiltration-shaped",两个都关掉才是文本处理器。
4. **数据先验>模型推断**:0 API key 也能跑——`read_crm_history` 读自己的线程 / 会议 / 签名块,免费且是最好的证据(没有任何数据商能卖给你来自本人邮箱的回复)。
5. **三栈规则**:Nest 只汇报"发生了什么",agent 决定"这意味着什么";`packages/ui` 是 UI 唯一来源,call site 不覆盖样式;没有 `organizationId`——单租户故意为之,避免多一层永远相同的索引和权限检查。

**实战信号 + 争议**:

- Issue #181:Roadmap 提议加 CardDAV 同步(用 ckulka/baikal:apache),已经做了 read-only 视图——这是开源 CRM 跟个人 IMAP / CardDAV 生态对接的典型场景。
- Issue #180:能否用 Vercel 以外的 LLM 后端——目前文档里 Vercel 是默认,文档没禁止其他,但 onboarding 体验倾向 Vercel。

**横向对比**:Comp AI CRM vs Salesforce Einstein / HubSpot AI / Attio AI——这些 SaaS 把 agent 当 feature,Comp AI 把 CRM 当 agent 的笔记本。区别是 ownership:前者 agent 跑在 SaaS 厂商的云里,后者 agent 跑在你自己的 Vercel 部署上。

**信号判断**:
- ✅ 工程哲学清晰:"no organizations" / "no confidence score" / "no DB in sandbox" 都是硬约束。
- ✅ 自托管:Next.js + NestJS + 独立 agent + Postgres,你能完全掌控部署。
- ⚠️ 单租户:不能服务"一个部署给多家客户"的场景。

**适用场景**:**适合**:销售团队想把 CRM 真正接入 agent、需要本地自托管的隐私敏感公司、不愿被 SaaS 锁死的工程文化团队 · **不适合**:需要 50 个销售共用一套 CRM 的场景(单租户设计不适合)、期待 Salesforce 那种 200 个集成开箱即用的用户。

---

### 9. [MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3) · ⭐8,585

> Moonshot 开放权重旗舰模型 2.8T 参数,基于 Kimi Delta Attention + Attention Residuals,原生多模态、100 万 token 上下文、世界首个开源 3T 级模型。

| 字段 | 值 |
|---|---|
| 语言 | -(1.4 MB,纯模型卡) |
| License | NOASSERTION(Kimi K3 License) |
| 创建 / 推送 | 2026-07-27 / 2026-08-06 |

**定位**:Kimi K3 是 Moonshot 在 K2 之后的开放权重旗舰。它不是更大,而是"用更聪明的方式变大":Stable LatentMoE 框架在 896 个专家里激活 16 个,带来相比 K2 ~2.5× 的整体扩展效率。原生视觉 + 100 万 token + KDA(线性注意力)+ AttnRes(残差注意力混合)+ MXFP4 量化。

**核心价值 5 条**:

1. **3T 级开源首例**:2.8T 参数,896 专家激活 16,原生多模态,世界第一个开放权重的 3T 级模型。
2. **长周期编码**:从 GPU kernel 优化、编译器开发到 vision-in-the-loop 游戏开发、CAD、芯片设计——Kimi K3 在最小人工监督下能持续长工程会话。
3. **Bench 全景覆盖**:DeepSWE 67.3、Terminal-Bench 2.1、ProgramBench、SWE-Marathon、FrontierSWE、PostTrainBench、MLS-Bench-Lite、SciCode、Kimi Code Bench 2.0(73.7)、MCP-Atlas、AutomationBench、BrowseComp(无上下文管理 90.4)、OfficeQA Pro、SpreadsheetBench 2、Agents' Last Exam——14 个 benchmark,几乎覆盖 agentic 评测的所有维度。
4. **思考模式 API 化**:`reasoning_effort` 字段支持 low / high / max(默认 max),返回 `reasoning_content`;多轮 / 工具调用必须把完整的 reasoning_content + tool_calls 原样传回 messages——这是"保留思考历史"模式。
5. **多推理引擎**:vLLM(有 recipes)、SGLang(有 cookbook)、TokenSpeed(有 recipes)三大推理引擎都已支持,部署路径丰富。

**实战信号 + 争议**:

- Issue #38:Critical——Kimi Work 3.0 Orchestrator 在"trivial task"上 15 分钟烧 ~$150,忽略 explicit cost cap。这是 agent 在生产里最容易翻车的 bug,模型无止境重试 + 不尊重用户预算。
- Issue #37:Coding Plan 用户报模型陷入 infinite loop,月度额度秒没——服务侧反作弊兜底不足。
- Issue #36:K3 主要 bug 审计报告(由 K2.6 HIGH 自动生成)。
- Issue #35:How to improve token efficiency(由 K2.6 自动分析全仓库)。
- Issue #32:用户报 K3 Effort Low 在 context 50% 满之后不可用;K3 High 比 OPUS 5 Ultracode 更快烧预算。
- Issue #31:Feature Request——"Auto Max"模式(K3 规划 + 验证,K2.6 执行),类似 Anthropic opusplan 但模型组合透明可见。

**横向对比**:Kimi K3 vs GLM-5.2 / DeepSeek V4 / Qwen3.6 —— 本榜单里有 4 个"中国前沿大模型"同框:Kimi K3 第 9 位、DeepSeek 系(走 vLLM 与 SGLang 衍生项目)、Qwen3.6(已被 Colibri 等推理引擎列为 supported)、GLM-5.2(也是 Colibri 主推)。同一月份里四个中国前沿模型同时霸榜 GitHub,这是 AI 领域少见的"中国周期"。

**信号判断**:
- ✅ 工程完整度:14 个 benchmark 全公开 + MXFP4 量化感知训练 + 三个推理引擎全支持。
- ✅ 长尾:生态溢出(Kimi-K3-in-C / Turbo-Fieldfare 等衍生项目)。
- ⚠️ 商业稳定性:Coding Plan 用户报 burn rate bug,生产里慎用。

**适用场景**:**适合**:做长周期 agent 研究、需要 100 万 token 上下文的长文档 / 长代码库分析、想用前沿多模态做产品但不愿被 API 绑死的团队 · **不适合**:小预算 Coding Plan 用户(等烧率 bug 修复)、需要 7×24 SLA 的生产服务(自建 K3 inference 集群投入大)。

---

### 10. [unicity-aos/aos-ce](https://github.com/unicity-aos/aos-ce) · ⭐8,554

> AOS Community Edition:开源的"agent 操作系统",把 agent 当 first-class OS 公民,自带 capsule 模型、可插拔安全策略、可审计的运行时。

| 字段 | 值 |
|---|---|
| 语言 | Rust(21.3 MB) |
| License | Apache-2.0 + MIT(双许可) |
| 创建 / 推送 | 2026-07-12 / 2026-08-22 |
| Stars / Forks / Watchers | 8,554 / 21 / 9 |

**定位**:AOS 把 agent 当操作系统公民——capsules 是用户态建筑块,可以组合成 harness、meta-harness、连接器、服务。它是 third path:既不是单机 TUI(Grok Build 路线),也不是团队协作(QM 路线),而是把"agent 怎么跑"变成可插拔 OS 抽象。

**核心价值 5 条**:

1. **aos CLI 全栈所有权**:`init` / `status` / `migrate` / `update` / `distro` / `mcp` / `daemon` / `serve-health` 都是 AOS 拥有 root 命名空间的产品根,不是嵌套 `aos astrid` / `aos runtime`。
2. **签名 + 供应链全透明**:每个 release 都签 Sigstore bundle + GitHub build-provenance attestations + `runtime-compatibility.toml`,必须通过兼容性门 + 自愈门才能发版。
3. **`aos mcp serve` 是 Codex / Claude / Grok 共用产品边界**:客户端支持 MCP form elicitation 就自己出约束审批表单;不支持就回退到本地 AOS 决策面(macOS AppKit / Windows 原生对话框 / Linux Pinentry)。
4. **Unicity Audit + Forge**:Forge 让 fresh agent 自己 inspect running system、识别真实能力缺口、构建并验证最小权限 capsule;`meta-harness` skill 教 agent 把指令 / 内存 / skills / harness 代码 / 工具 / capsules / traces / evaluations 当作可改的用户态世界。
5. **Principal 分离**:`aos --principal operator init --target-principal alice` 让已认证的操作员和目标环境完全分开——多用户 / 多租户场景下的安全边界。

**实战信号 + 争议**:

- Issue #85:AOS host plugin 用 `aos --principal <host> mcp serve --workspace $PWD --request-timeout 1d5m` 被拒,因为 `aos mcp serve` 只接受 `--interaction`,`--workspace` 应当在更下层——host plugin 边界设计仍需打磨。
- Issue #84:并发多 principal 场景下,Astrid 0.10.4 可能把一个 principal 的请求响应投递到另一个并发 principal——一个 IPC subscription 没有按 principal 限定作用域的高优安全 / 一致性问题。
- Issue #81:当前 AOS 同时拥有 distribution assembly 和 capsule 源码 workspace,使得 distribution 是按目录选代码而不是消费独立版本化的 capsule artifacts。
- Issue #78:建议在 `aos.unicity.ai/install.sh` 服务端记录 IP / UA / timestamp,得到独立于 GitHub 的安装尝试统计。

**横向对比**:AOS vs Astrid / NixOS / OpenShift 都是"OS-as-substrate-for-things"哲学——AOS 选 agent as the thing。Capsules 的设计类似 Kubernetes Pod + Container,但对象是 agent 行为而不是容器镜像。

**信号判断**:
- ✅ 工程深度:Rust 21MB + Forge + meta-harness + capsule 模型 + 完整 release 签名链——这是 OS-level 的设计,不是 MVP。
- ✅ 安全治理:Principal 分离 + 签名 release + `--interaction auto/native/deny` 多档策略。
- ⚠️ 生态早期:8.5k stars 但只有 21 forks,意味着用户基数小,生产反馈有限。
- ⚠️ 高优 bug:并发 principal 隔离缺陷是设计层面的,需要升级。

**适用场景**:**适合**:想做 multi-agent OS 的研究团队、需要 sandbox 内可观测 / 可审计的 agent runtime 的企业、想给自家 agent harness 加 capsule 化能力的开发者 · **不适合**:个人开发者做小项目(过于重量级)、单一租户简单场景(走 OpenWorker / Codex CLI 更轻)。

---

## Top 11-50 简评(按 stars 降序)

11. [oso95/scroll-world](https://github.com/oso95/scroll-world) · ⭐8,477 · JavaScript · 一键把任意品牌变成 3D 滚动 landing page 的 agent skill——把"网页设计"从模板化推向可生成。
12. [MiniMax-AI/MiniMax-H3](https://github.com/MiniMax-AI/MiniMax-H3) · ⭐6,768 · Python · MiniMax 第三代旗舰模型,补齐月榜"模型层"多样性。
13. [LiamGvchi/gc-minimal-zine-poster](https://github.com/LiamGvchi/gc-minimal-zine-poster) · ⭐6,558 · Codex skill,生成极简 zine 风格编辑海报的提示词与图像——是"agent 生产内容"的代表方向。
14. [MDX-Tom/gpt-5.6-instruct](https://github.com/MDX-Tom/gpt-5.6-instruct) · ⭐6,331 · Python · 针对 gpt-5.6-sol 的 Codex 破甲提示词与测试包——月榜里少见的"对抗 / red team"开源项目。
15. [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) · ⭐6,299 · C · 2.78T 参数 Kimi K3 在 8.24GB RAM 单 CPU 上推理,纯 C99,无 BLAS,无 GPU——Colibri 之外的"另一条路"。
16. [drumih/turbo-fieldfare](https://github.com/drumih/turbo-fieldfare) · ⭐6,267 · Swift · Gemma 4 26B-A4B 在 M 系列 MacBook 上 ~2GB RAM 跑推理,Metal + Apple Silicon + GPGPU 路线。
17. [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) · ⭐6,111 · TypeScript · 给 Claude Code / Codex 的 AI 视频 skill,152 个镜头模板 + 209 个 motion 预览,Remotion 渲染。
18. [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) · ⭐5,768 · Python · 把 20+ 种 AI 写作痕迹从文本里去掉——对 AI 内容农场泛滥的反向工具。
19. [elder-plinius/T3MP3ST](https://github.com/elder-plinius/T3MP3ST) · ⭐5,646 · TypeScript · 自主红队平台,multi-agent offensive-security meta-harness——安全 + agent 双栈典型。
20. [nyblnet/bento](https://github.com/nyblnet/bento) · ⭐4,445 · TypeScript · "装在一个文件里的 office 套件",offline-first,MIT。
21. [xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer](https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer) · ⭐4,288 · FDE(前沿部署工程师)从零入门指南,基于范冰《增长黑客》框架——月榜里少见的"职业指南"类。
22. [NanoNets/Graft](https://github.com/NanoNets/Graft) · ⭐4,277 · TypeScript · 给 Claude Code / Cursor / Codex / Gemini 加速:更快、更便宜、懂你 codebase 的上下文工程层。
23. [Zeejay0/gathered-scenes-zine-skill](https://github.com/Zeejay0/gathered-scenes-zine-skill) · ⭐4,251 · Codex skill,生成 zine 风格场景合集的 prompt / 图像——和 #13 形成"zine 内容矩阵"。
24. [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) · ⭐4,219 · TypeScript · 真 HTML + WebGL 效果的创意 canvas 组件库,支持 React / Vue / Svelte / vanilla。
25. [jakubkrehel/skills](https://github.com/jakubkrehel/skills) · ⭐4,180 · Markdown · 帮你做"漂亮界面"的 agent skills 集合——UI 设计 agent 化。
26. [slvDev/esp32-ai](https://github.com/slvDev/esp32-ai) · ⭐4,141 · Python · 在 ESP32 微控制器上跑 AI——边缘 AI 路线。
27. [truefoundry/trueforge](https://github.com/truefoundry/trueforge) · ⭐3,601 · TypeScript · 把 LLM 变成可工作 agent 的开源 harness runtime 层——"harness engineering"运动的代表性项目。
28. [genspark-ai/genoffice](https://github.com/genspark-ai/genoffice) · ⭐3,510 · TypeScript · 免费开源 AI office 套件,支持 macOS / Windows / Linux 的 docx / xlsx / pptx / pdf / markdown 编辑。
29. [microsoft/skill-recorder](https://github.com/microsoft/skill-recorder) · ⭐3,359 · TypeScript · 录屏 + Copilot CLI 把工作流重建为 intent + ordered steps,自动生成可重用 skill——Microsoft 在"agent 化桌面"上的尝试。
30. [xuchonglang/investing-for-beginners](https://github.com/xuchonglang/investing-for-beginners) · ⭐3,333 · JavaScript · 小隐寺投资百科:美股 / 期权 / 加密货币知识框架,中文开源金融教育。
31. [synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience) · ⭐3,323 · TypeScript · 开源 AI 科研工作台,Bun 运行时 + scientific agents。
32. [bryanthaboi/gen1recomp](https://github.com/bryanthaboi/gen1recomp) · ⭐3,312 · C · 原生 Lua / LÖVE2D 重制 Gen 1 Pokemon——AI 不一定都要搞严肃科学。
33. [kvcache-ai/AgentENV](https://github.com/kvcache-ai/AgentENV) · ⭐3,280 · Rust · AgentENV (AENV):分布式 agent 环境规模化运行平台——agent-as-infrastructure 的基础设施。
34. [isjiamu/gzh-design-skill](https://github.com/isjiamu/gzh-design-skill) · ⭐3,267 · HTML · Markdown 一键排成公众号精致 HTML,6 套主题 + 主题生成器 + 双关卡校验——月榜里最典型的"中文创作工具"。
35. [mshumer/Claude-of-Duty](https://github.com/mshumer/Claude-of-Duty) · ⭐3,252 · JavaScript · Call of Duty 品质的 Three.js FPS,由一个 prompt 生成——LLM 写游戏 demo 的天花板样本。
36. [kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew) · ⭐3,181 · Python · 自改进、跨 session 持续的 agent 持久工作区——agent 长期记忆 + 自我迭代的代表。
37. [Tiger3807861189/J-Space-Cognition-Suite-V3.7](https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.7) · ⭐3,018 · Python · 基于 Anthropic J-space 全球工作空间研究的 AI 认知增强 skills——agent 架构研究项目。
38. [aipoch/open-science](https://github.com/aipoch/open-science) · ⭐2,958 · TypeScript · 开源 AI 科研工作台,scientific agents 做可复现研究——和 #31 形成同主题双胞胎。
39. [duolahypercho/codex-router](https://github.com/duolahypercho/codex-router) · ⭐2,779 · JavaScript · Codex 外部模型 router,带引导式 Kimi OAuth/API、DeepSeek、安全迁移和回滚——harness 多供应商化。
40. [QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins) · ⭐2,758 · HTML · 让任意 agent harness 原生支持多模态——多模态插件化方向。
41. [yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) · ⭐2,739 · Rust · OpenAI Codex 桌面 / CLI 的可视化管理工具,Provider/API 切换、会话同步、提示词注入、Skills/MCP 管理、TOML 可视化。
42. [AminBlg/SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) · ⭐2,728 · Python · 让 LLM 写文档时用 ASD-STE100 简化英语——技术写作风格的 agent skill。
43. [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) · ⭐2,715 · Python · 暂无描述(月榜里留白的样本,可能是 release 早期阶段)。
44. [lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) · ⭐2,558 · Python · Ryan Lopopolo 的 harness engineering 文集、田野指南、agent 上下文包——harness 运动奠基读本。
45. [Jakubantalik/thinking-orbs](https://github.com/Jakubantalik/thinking-orbs) · ⭐2,555 · TypeScript · 给 AI / agent UI 用的圆点 thought-orb loading 指示器,9 种调优类型,自动深色 / 浅色。
46. [zerx-lab/FluxDown](https://github.com/zerx-lab/FluxDown) · ⭐2,524 · Rust · Rust 驱动的多协议下载管理器,HTTP/FTP/BitTorrent/HLS/DASH,智能多线程加速——中文社区的实用工具。
47. [chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard) · ⭐2,469 · JavaScript · Codex/Claude Code 的 dashi-taskboard skill——任务面板 agent 化。
48. [AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide) · ⭐2,427 · TypeScript · 开源 WorkBuddy 实战蓝皮书:教程、真实工作流、Skills、MCP、自动化与多智能体实践。
49. [powerycy/goutoujunshi](https://github.com/powerycy/goutoujunshi) · ⭐2,379 · Python · "先接住情绪,再分析关系并给可执行策略"的 Codex 恋爱军师,内置心理 / 法律 / 社会 / 人文 / 哲学 / 婚姻家庭 / 性学知识库。
50. [DannyMac180/sol-advisor](https://github.com/DannyMac180/sol-advisor) · ⭐2,307 · Shell · Codex 原生架构师编排,Luna / Terra 双实现 lane + 强制 fresh Sol review。

---

## 数据方法

- **快照时间**:2026-08-23 10:36 UTC(脚本运行时刻,GitHub Search API 视角)
- **时间窗口**:`created:2026-07-01..2026-08-01`(UTC,左闭右开,整月)
- **关键词**:`(ai OR llm OR agent OR mcp OR assistant) in:readme`(5 个 OR 项用满 GitHub API 上限)
- **附加过滤**:`archived:false`(剔除已归档仓库)
- **排序**:按 `stars` 降序(`sort=stars&order=desc`)
- **取数**:Top 50,`per_page=50`
- **深挖**:Top 10 每条 800-1500 字,Top 11-50 每条 60-80 字简评
- **样本构成**:英文 41 条 / 中文 9 条(README / 描述 / topics 任一字段含中文字符的计为中文)
- **API 返回**:`total_count=1,242,528`(`incomplete_results=false`)
- **Cron 来源**:gh-trending-watch 月榜 cron,schedule `0 6 1 * *`(CST 每月 1 号 6 点跑)
- **博客文章 slug**:`github-monthly-2026-08`
- **发布路径**:GitHub `8696/ynwa` 工作副本 → `oss_manager put assets/articles/github-trending/github-monthly-2026-08.md --force` → 更新 `assets/app/db.json` 的 article 记录 → `oss_manager put assets/app/db.json --force`