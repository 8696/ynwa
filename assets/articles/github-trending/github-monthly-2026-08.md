# GitHub 月榜 · 2026-08 · 三大本地推理引擎同步引爆 + agent harness 三轨并立

七月 GitHub 的拐点不在「AI 项目多了」,而在 AI 项目开始分层。底层三套本地推理引擎(Colibri、Kimi-K3-in-C、turbo-fieldfare)、中层三种 agent harness(Grok Build 单机 TUI、QM 多人协作、AOS OS 化)、顶层一票把 AI 体验推到极致的"皮肤/3D 重生成"项目,在同一个月内同时冲进前 10。再加上 OpenAI 把自家代码安全扫描器做成 npm 一行命令、Kimi 2.8T 开源旗舰自带 8500+ 星——7 月不是谁赢了,是赛道分完了。

样本构成:英文 41 条 / 中文 9 条 / 共 50 条;按 stars 降序。

---

## 本月核心信号

- **三大本地推理引擎同时上榜**:Colibri(纯 C,流式调度 744B–2.8T MoE)、FareedKhan-dev/kimi-k3-in-c(2.78T 参数 Kimi K3 跑在单 CPU 8.24 GB)、drumih/turbo-fieldfare(Gemma 4 26B-A4B 跑在 M 系列 MacBook 2 GB RAM)。三件事指向同一个目标——让前沿模型跑得动、跑得起、跑在个人硬件上。
- **Agent harness 三轨并立**:xAI 的 Grok Build(单机 TUI,绑 SpaceXAI 生态)、yc-software/qm(团队 Slack + Web 协作,Postgres + Fastify)、Unicity AOS(把 agent 当 first-class OS 公民,自带 capsule 模型)。三条路分别赌"终端极客"、"团队协作"、"OS 级可插拔"。
- **Kimi K3 整月生态爆炸**:开源 2.8T 参数旗舰 Kimi K3 自带流量,衍生项目至少两条(月榜内 kimi-k3-in-c 第 15 位、月榜外 fork 更多)。Kimi Coding Plan 用户在 issue 里直接贴 $150 / 15 分钟的"无限循环烧额度"截图——**真实生产事故**,不是演习。
- **OpenAI 把安全扫描做成 npm 一行命令**:codex-security 把扫描 + 验证 + 自动开 PR 闭环,允许替换 OpenRouter / Fireworks / Bedrock 后端。这是从"模型厂商"到"开发者工具厂商"的关键一步。
- **Codex / Claude Code skill 周边开始分化**:9 条带 codex 标签、6 条带 claude-code 标签的仓库里,出现专门做公众号排版(isjiamu/gzh-design-skill)、海报(LiamGvchi/gc-minimal-zine-poster)、视频(Vincentwei1021/video-shotcraft)、3D 滚动页(oso95/scroll-world)的小项目——agent 不再只生产代码,开始生产可消费的成品。
- **模型多供应商化加速**:QM、Codex-Router、WorkBuddy Guide 都在解决"同一个 harness 跑不同厂商模型"的问题——把"绑死 GPT-5 / Claude"变成可换电池的接口层。

---

## Top 10 详深挖

### 1. [JustVugg/colibri](https://github.com/JustVugg/colibri) · ⭐25,920

> 纯 C 单文件推理引擎,把 744B 至 2.8T 的 MoE 前沿模型塞进消费级硬件;专家权重走磁盘流式,RAM/VRAM/SSD 当成同一个推理层级来调度。

| 字段 | 值 |
|---|---|
| 语言 | C · 12,641 KB |
| License | Apache-2.0 |
| 创建 / 推送 | 2026-07-01 / 2026-08-23 |
| Stars / Forks | 25,920 / 2,826 |
| Open issues | 105 |
| Homepage | https://justvugg.github.io/colibri |

**定位**:Colibri 的核心论点是——一个 744B 的 MoE 模型每次推理只激活约 40B 参数,其中只有约 11 GB 是"真正变化的专家"。所以它根本不需要"装进"快内存,只要被"放置"在合适的存储层级即可。具体做法是把 dense 部分(约 17B,int4 后约 9.9 GB)放 RAM,19,456 个专家(每个约 19 MB,int4,合计约 370 GB)放 NVMe,通过 O_DIRECT + 双 SSD striping + 预取 + LRU 把延迟藏起来。

**核心价值 5 条**:

1. **零依赖纯 C 引擎**:`c/colibri.c` 一个文件搞定,无 BLAS、无 Python、无 GPU 强制要求,Linux 笔记本就能跑 744B 模型。这对想在边缘设备做本地推理的开发者意义重大。
2. **JIT-for-weights 思路**:不是把所有权重都提前加载,而是观察路由热图,按"下一层大概率会激活的专家"预取——和编译器 JIT 把热点路径在运行时编译是同一个哲学。
3. **多模型族同一前端**:`./coli chat` / `coli serve` / `coli web` 一套 CLI 覆盖 GLM-5.2(744B)、Inkling(975B)、Kimi K3(2.8T)、DeepSeek V4 Flash(284B)、Qwen3.6(35B-A3B)、OLMoE(7B)六族——目前主流 MoE 旗舰一个不少。
4. **可视化做到位**:Web Dashboard 直接画"19,456 个专家像活体大脑皮层"的脑图(亮度=路由热度、颜色=存储层级),Atlas 页把专家按实测亲和度画成 3D 星系——这不是"漂亮 demo",是给研究员用的测量工具。
5. **研究透明**:README 用大段写"开放假设 + 实验矩阵",鼓励社区补负向结果。每个实验要求提交硬件 / commit / 容器 / 提示词 / 缓存状态 / 吞吐量 / TTFT / 专家命中率 / 读取字节数 / 质量检查全套——把"我比 llama.cpp 快 X%"这种不可复现话术挡在门外。

**实战信号 + 争议**:

- Issue #1191 报"`coli tune` 在所有非 GLM 引擎上不可用",因为它依赖 colibri.c 里写的 GLM 专属 replay 协议——多模型族前端成本就是这个。维护者 @JustVugg 在回复里确认:不只协议缺,argv 约定也分叉(kimi_k3 接模型目录,GLM 接 cap),harness 根本起不来。
- Issue #1190 报"`--cap` 不传值时把字面字符串 'None' 传给引擎作为 argv[1]"——argparse default 处理的常见坑。维护者实测:GLM 没有 cap 守卫,默认 `coli tune` 在 GLM 上偷偷扫了平台默认值而不是计划刚解析出来的 cap,扫出来的工作负载没人要。
- 仓库 105 个 open issue 全部是基准 / 兼容性问题,**无 security 类警报**——对一个研究型项目来说是少见的干净。

**横向对比**:Colibri vs llama.cpp / vLLM / kTransformers 走的是"都解决同一问题但走不同极端"——llama.cpp 偏成熟稳态,vLLM 偏服务吞吐,kTransformers 偏专家卸载,Colibri 偏"消费级硬件 + 单 C 文件 + 学术透明"。它是给研究员的,不是给运维的。

**信号判断**:

- ✅ 实战验证:虽然还在 1.4.x 版,但 2.5 万 star + 2 千 fork + 105 个 issue 全部被维护者亲自回复,说明真有人在用。
- ✅ 研究诚信:明确写"无 SLA,只保证语义",且要求每个实验提交完整快照——这种自约束在 AI 圈少有。
- ⚠️ 商业化风险:目前只支持 6 个模型族,要做生产工具需要等更多 fork / 移植。

**适用场景**:**适合**:想在笔记本 / 工作站跑前沿 MoE 的研究员、想理解"流式 MoE 推理"系统的学生、需要单机不联网 LLM 的隐私场景 · **不适合**:需要高 QPS 生产服务(请走 vLLM)、需要严格 SLA 的企业部署。

---

### 2. [xai-org/grok-build](https://github.com/xai-org/grok-build) · ⭐25,915

> xAI 的终端原生 AI 编程 agent,全屏 TUI、支持鼠标交互、内嵌 Agent Client Protocol(ACP)给编辑器。

| 字段 | 值 |
|---|---|
| 语言 | Rust · 36,580 KB |
| License | Apache-2.0 |
| 创建 / 推送 | 2026-07-14 / 2026-08-23 |
| Stars / Forks | 25,915 / 4,871 |
| Open issues | 0(可能是把讨论导到了 chat 而非 issue tracker) |

**定位**:SpaceXAI 把 Grok Build 拆出来作为独立 Rust crate 发布。它的设计哲学是"终端是 IDE,不只是命令行"——全屏 TUI + 鼠标交互意味着它不是给 shell 极客用的,而是要吃 Claude Code / Codex 的桌面侧用户。

**核心价值 5 条**:

1. **ACP(Agent Client Protocol)嵌入**:支持在编辑器里内嵌 agent runtime,而不是只能从终端侧拉起——这是和 Claude Code / Codex 共享桌面的关键。
2. **三种运行模式同一套代码**:交互式、headless(CI / 脚本)、编辑器嵌入式。`grok` 一条命令切换上下文。
3. **沙箱 + Skill + Plugin + Hook 全栈支持**:用户指南明确写了 sandboxing / skills / plugins / hooks / headless mode 的配置;不是 MVP,是生产工具栈。
4. **源码周期性同步自 SpaceXAI monorepo**:根目录的 `SOURCE_REV` 文件记录精确 commit SHA——你拿到的不是"提取版",而是从主仓库同步出来的精确快照。
5. **第三方许可透明**:`THIRD-PARTY-NOTICES` 同时收录 crates.io / git 依赖 + 主题 + OpenAI Codex 和 SST OpenCode 的源码移植——是公司级合规该有的样子。

**实战信号 + 争议**:

- 仓库 open_issues = 0,可能是 xAI 团队把讨论导到了 chat 而非 issue tracker。
- README 自述"External contributions are not accepted"——这是公司主导项目的标准姿态,不影响产品质量,但意味着 bug 修复节奏由 xAI 决定。

**横向对比**:Grok Build vs Claude Code vs Codex CLI 三件套定位高度同质化,差异在:Claude Code 走"模型 + harness 绑定销售",Codex 走"OpenAI 生态绑定",Grok Build 走"Grok 模型 + 终端极客"。

**信号判断**:

- ✅ 安全合规:Apache-2.0,三方依赖公告完整。
- ✅ 维护活跃:35 MB 源码 + 周期性 monorepo 同步说明工程投入持续。
- ⚠️ 不接外部贡献:对生态扩展是减分项。

**适用场景**:**适合**:xAI 模型用户、需要 Rust 原生 TUI agent 的开发者、想把 agent 嵌进编辑器的 IDE 团队 · **不适合**:想要可 fork 贡献的开源爱好者、希望脱离 Grok 模型单独用 harness 的场景(目前绑得比较死)。

---

### 3. [andrewyng/openworker](https://github.com/andrewyng/openworker) · ⭐14,952

> 开源桌面 AI coworker,跑在你本机,自带 25+ 集成,执行真实工作(写文档、回 Slack、查日历、整理收件箱),不只聊天。

| 字段 | 值 |
|---|---|
| 语言 | Python · 4,119 KB |
| License | MIT |
| 创建 / 推送 | 2026-07-20 / 2026-08-23 |
| Stars / Forks | 14,952 / 2,069 |
| Open issues | 443 |

**定位**:OpenWorker 的核心反主流是"agent 不是 CRM 的功能,CRM 是 agent 的记事本"。它的目标是替代你日常那种"先开 Slack 看通知、再开 Jira 看 ticket、再开邮箱回信、再开文档写报告"的连续切换——你只要说"准备客户简报",它自己拆任务、跑集成、产出成品。

**核心价值 5 条**:

1. **本地优先 + 自带模型**:agent loop / 对话 / connector token / model key 全部在本机,只有一个 OAuth 握手的小服务在云端。OpenAI / Anthropic / Google / BytePlus / Volcengine / Inkling / GLM / DeepSeek / Kimi / Qwen / MiniMax / Mistral / Grok / Together / Fireworks / Ollama 全在白名单。
2. **25+ 集成 + MCP 通用接入**:GitHub、Slack、Jira、Notion、Linear、HubSpot、Outlook、monday.com、Gmail、Google Calendar 全部自带,加上你的终端和本地文件。任何支持 MCP 的工具都能接入,每个工具有独立权限控制。
3. **Slack 嵌入即用**:在频道里 `@OpenWorker`,它会在你桌面开 session,处理完直接在 thread 回复——把"agent 后台跑"变成"agent 协同办公"。
4. **执行前必经审批**:写邮件、改日历、跑命令全部 approval-gated;无人值守 run 把需要审批的请求塞到 inbox 而不是自己决定。这是和"全自动 agent"流派最大的差别。
5. **建在 aisuite 上**:作者本人就是 aisuite 的作者,OpenWorker 本质是 aisuite 的"工作场景示范实现"——它从 aisuite 仓库拆出来独立成仓,但 README 明示"想自己造 harness 的去看 aisuite"。

**实战信号 + 争议(三个 High 级别安全问题)**:

- Issue #527(MCP OAuth 流的 SSRF):`build_auth` 把发现 / 动态客户端注册 / token 交换全权交给 SDK 的 `OAuthClientProvider`,**没做目标校验**——provider 从远端 MCP 服务器 GET `/.well-known/oauth-protected-resource`,再从这台服务器的 JSON 里**原样取出**授权服务器 metadata URL、`registration_endpoint`、`token_endpoint`。没有任何 import 验证 destination。
- Issue #526(LLM 循环没有 untrusted-content 边界):外部 connector 的消息和 email / web 读的内容直接进 prompt 上下文,没有任何结构性边界。**无交互的 steering + 无人值守时的数据外泄**,四个数据点全验证,严重度:High。
- Issue #525(audit log 没脱敏工具结果预览):`audit.py:76` 给工具**参数**做了脱敏(`_sanitize_args`:secret-like key → `[redacted]`),但 `result_preview` 只做了 `_truncate()`,**没脱敏**(`engine.py:1196-1199`)。工具结果里常常就是邮件正文 / shell 输出,里面有 API key——参数侧挡了,结果侧没挡。

三个 issue 都很新(都在 #525-527 范围,仓库 7-20 才创建),还没看到维护者回应,但它们都带具体行号和 PoC,**不是嘴炮**。对一款定位"本地可信 + 替我做决定"的产品来说,这三个安全洞是必须先补的。

**横向对比**:OpenWorker vs Claude Cowork vs Manus AI:Claude Cowork 绑死 Claude + 桌面 UI,OpenWorker 是 Python 跨平台 + 自带模型切换;Manus 偏云端异步长任务,OpenWorker 偏本地交互协同。

**信号判断**:

- ✅ 本地优先是真做不是嘴上说,凭证全在系统 keyring。
- ✅ 模型 / 集成白名单透明,不存在"实际只能跑 OpenAI"的情况。
- ⚠️ 三个 High 安全 issue 同时存在——beta 阶段可接受,但要进生产必须先修。

**适用场景**:**适合**:每天在 5+ 工具间切换的知识工作者、想用 Claude / GPT 跑长流程又不想把数据送云端的人 · **不适合**:对供应链安全零容忍的企业(等 #525-527 修完)、需要 100% 离线模型的场景(虽然支持 Ollama,但默认走云端 API)。

---

### 4. [yc-software/qm](https://github.com/yc-software/qm) · ⭐14,090

> 多人协作的 agent harness——同一套核心,Slack 和 Web 都能用,适合初创公司给全员部署。

| 字段 | 值 |
|---|---|
| 语言 | TypeScript · 7,775 KB |
| License | MIT |
| 创建 / 推送 | 2026-07-29 / 2026-08-22 |
| Stars / Forks | 14,090 / 1,687 |
| Open issues | 304 |

**定位**:QM 的差异化在于"为团队设计,而不是为个人"。大多数 agent 是个人助手——你把它扩展到全公司,复杂度立刻爆炸。QM 反过来:每个人 / 每个房间有自己独立的 scope,有独立的 memory / files / keychain / crons / web apps / sandbox,但又能在 Slack 频道和共享项目里协作。

**核心价值 5 条**:

1. **Scope 隔离 + 协作并存**:个人 scope 自定义 agent 让它"是你的",但仍能在 Slack 频道和共享项目和它协作。这是大多数 harness 没做对的——Claude Code / Codex 都是单用户。
2. **harness 可换,核心通用**:Pi / OpenCode / Codex / Claude Code 都能驱动同一个 core,部署不被任何一家 vendor 绑死。
3. **Postgres 当持久层**:会话、memory、队列全部进 Postgres,不是 SQLite 不是文件——为多用户并发设计。
4. **沙箱走 scope**:每个 scope 有自己的隔离沙箱,沙箱里的工具装好就一直在——这就是 QM 说的"durable computer"。
5. **企业级 admin 控制**:org-level 配置 + 安全策略 + harness / 模型白名单,scope 只能往紧里调不能放宽。三档安全姿态(Strict / Auto 默认 / Dangerous)+ predeclared command policy(拒绝递归删除等破坏性操作)。

**实战信号 + 争议**:

- Issue #661 报"docker target + 内置 auth service 时 portal 启不来":启用内置 sign-in broker 的 docker 部署在 `qm up` 时 portal 容器启动前就退出。复现配置清晰(5 行 JSON),但目前 0 评论——可能是新版本引入的回归,维护者还没看到。
- 仓库 304 个 open issues,在 4 个人的 YC 系项目里属于"正常"——QM 设计上鼓励用户提 issue 而不是导到 Slack。

**横向对比**:QM vs Anthropic Claude Team Cowork vs LangChain OpenGPTs:Claude Team Cowork 绑死 Claude + 内部生态;OpenGPTs 偏框架而非产品;QM 是"产品级 + 可自部署 + harness 可换"。

**信号判断**:

- ✅ 隔离设计是认真的,不是"贴个标签"。
- ⚠️ 304 open issues / 14k stars 比例约 2.1%,对一个企业级产品来说不算低——和它"还在快速迭代"对得上,但不是成熟产品。

**适用场景**:**适合**:10-50 人的初创团队想统一部署 agent 给全员、希望不被单家 vendor 锁死 · **不适合**:纯个人开发者(over-engineered)、需要生产级 SLA 的大型企业(等 issue 数降到 100 以下)。

---

### 5. [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) · ⭐14,049

> 给 Codex / ChatGPT 桌面端换皮肤的本地工具——本机 CDP 注入,不改官方安装包,GitHub 14k stars 的"亚文化级"美化项目。

| 字段 | 值 |
|---|---|
| 语言 | JavaScript · 30,023 KB |
| License | MIT |
| 创建 / 推送 | 2026-07-15 / 2026-08-12 |
| Stars / Forks | 14,049 / 1,348 |
| Open issues | 54 |

**定位**:Codex 桌面端的功能已经够强,但视觉是 OpenAI 默认的——不喜欢?这个项目让你"给它换一张会呼吸的脸"。本机回环 CDP 注入主题 CSS,不动官方二进制 / .app / WindowsApps / 签名。

**核心价值 5 条**:

1. **不破坏官方**:CDP 走 `127.0.0.1` 回环,只改样式不改行为;卸载主题 = 一键还原官方外观。
2. **三层主题获取**:官方主题库(dreamskin.cc / Gallery)+ 在线 Studio(浏览器里换背景图 / 调色 / 写 Safe CSS)+ 本地导入 `.zip`。
3. **真·可交互**:侧栏、建议卡、项目选择、输入框全部是原生控件,不是整窗假截图贴上去——主题只换"皮"不换"骨"。
4. **一键换肤安全链**:URL 只携带主题版本 ID,**不能携带**任意 URL / 文件路径 / 命令;App 只向固定官方 API 取包且拒绝重定向;换肤前弹出原生确认框并核对审核状态 + 兼容性标记 + 版本号 + 包大小 + SHA-256;启动或渲染失败自动回滚并**明确报告状态未确认**而不是假装已恢复。
5. **多语言 + 多平台**:macOS(Apple Silicon / Intel)+ Windows 全覆盖;中文 / 英文双语 README。

**实战信号 + 争议(版本 1.5.14 兼容性 Bug 大爆发)**:

- Issue #373(Windows Codex 26.814 composer mappings and footer gradients bypass Safe CSS):用户 @GreenLv 附上完整 macOS 实机证据,确认这不是 Windows 独有——外层 `_ComposerLayoutRoot_f4zzl_2` 还有原生灰色背景,主题色只覆盖内层。本机通过 loopback CDP 做了只读 DOM / 样式检查。
- Issue #374(macOS 26.6.2 v1.5.14 间歇注入失败):对字节完全相同的主题有时拒绝应用——这是社区里"主题审核过了但本机死活不生效"的最常见抱怨。
- Issue #375(Windows 一键换肤标记 macOS-only 主题为兼容然后失败):一键换肤流程在审核阶段没有校验平台兼容性,用户装到一半才报。
- Issue #371(Windows GUI 顶部底部颜色不一致)+ #367(侧边栏远程控制设备图标丢失原生语义颜色)都是 Windows 平台特定 bug,体现 1.5.14 这个版本在 Windows 渲染器上的覆盖不全。

54 个 issue 里大部分是平台特定兼容性 bug,**没有安全类警报**——对一个改皮肤的"亚文化级"工具来说是很难得的。

**横向对比**:Codex-Dream-Skin vs BetterDiscord / Spicetify:同样思路——本地工具改 skin 不动产品;但 Codex / ChatGPT 没有官方皮肤 API,所以走 CDP 注入是唯一路径。

**信号判断**:

- ✅ 安全设计透明,`dreamskin://apply` 协议明确限制只能传主题版本 ID。
- ✅ 1.4 万 star 在"亚文化级美化工具"里很高,说明真有人用、也有人审美追求强烈。
- ⚠️ 1.5.14 跨平台兼容性是新发 bug,等 1.5.15 / 1.5.16 才能稳。

**适用场景**:**适合**:每天面对 Codex / ChatGPT 桌面端超过 3 小时的开发者、想要"工作环境个性化"的视觉敏感型用户 · **不适合**:不介意官方默认外观的人、需要"修改功能"而不是"换皮"的人(这是 CSS 注入,改不了 Codex 的核心逻辑)。

---

### 6. [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) · ⭐12,933

> 把参考图里的物体"反推"成 Three.js 程序代码——不是摄影测量,不是 mesh 提取,而是 AI 读图后写出可动画的 procedural 模型。

| 字段 | 值 |
|---|---|
| 语言 | Python · 24,982 KB |
| License | Apache-2.0 |
| 创建 / 推送 | 2026-07-15 / 2026-08-22 |
| Stars / Forks | 12,933 / 1,049 |
| Open issues | 67 |
| Homepage | https://img2threejs.github.io/img2threejs-showcase/ |

**定位**:你给它一张参考图,它吐出 TypeScript 工厂函数,返回一个 `THREE.Group`,用 primitive + procedural shader + 生成几何体把物体重建出来——而且自带 pivot / socket / collider 层级,**结果可以直接动画**,不是一个静态 lump。重建的全程不下载 mesh 文件、不用摄影测量、不用艺术包。

**核心价值 5 条**:

1. **重建-by-code 而非重建-by-mesh**:同样的输入每次给出一份可读的源代码,不是二进制 blob——可以改、可以学、可以移植。
2. **质量门控 + 重建效率**:不是 AI 想怎么写就怎么写,每个重建都跑 detail inventory(光泽、倒角 / 圆角、螺丝 / 铆钉、刻线或漆线、轮廓、污渍与磨损),每个细节必须达到。
3. **Agent-agnostic**:在 Claude Code / Codex / OpenCode 下都能跑——哪家的"agent vision"或"agent browser tool"都行,不强绑供应商。
4. **主题分类明确**:物体 / 角色 / 混合三轨,角色走"anatomy-aware"通道(头身比例、面部 landmarks、姿势),物体走硬表面通道——避免"用动物重建方法去重建扳手"。
5. **真实 demo gallery**:Showcase 里全是真实可点的 live demo(Glock-18、Classic Knife Fade、M9 Bayonet Doppler、BMX Endurance Bike、Sony WF-1000XM3 等),全部是代码生成跑在浏览器里。

**实战信号 + 争议(两个安全 issue 同时冒出)**:

- Issue #103(Path traversal via unvalidated region_id):`material_region_analysis.py:120` 用了 `region_id.replace('/', '-')` 但**没处理** Windows 反斜杠或 `..` 序列——输出文件名可被穿越。
- Issue #102(SSRF via unvalidated index_url):`fetch_cs2_metadata.py:27` 用 `urllib.request.urlopen(index_url)`,`index_url` 是从 `--index-url` CLI 参数原样传入,**没做** scheme allowlist 或 metadata IP 阻塞。攻击者可指向内网地址。
- Issue #95 提议把 SKILL.md 的 version 从顶层 key 挪到 `metadata.version`——是代码质量提升不是 bug,但维护者还没回。

两个安全问题都是"用户输入没验证 + 直接调 urlopen / 写文件名",是 AI agent 类项目的通病——agent 传 CLI 参数等于在 web 输入框里粘 SQL。

**横向对比**:img2threejs vs Tripo3D / Meshy AI:Tripo3D / Meshy 出 mesh 文件,img2threejs 出代码;后者可以审、可以改、可以塞进 git diff,前者不行。

**信号判断**:

- ✅ 重建-by-code 是真正的差异化,不是又一个 mesh-from-image 工具。
- ✅ Showcase 给真实 demo,不是 render-only 截图。
- ⚠️ 两个安全 issue 同时存在,需要尽快修——一个能直接读内网数据,一个能写到任意路径。

**适用场景**:**适合**:Three.js 开发者需要快速生成硬表面 prop、教学场景(展示"AI 如何看图写代码")、需要可控可读 3D 资产的 indie game 团队 · **不适合**:需要照片级真实的场景(摄影测量还是 Tripo 这类工具更合适)、纯静态 mesh 流水线(没代码可读就是没优势)。

---

### 7. [openai/codex-security](https://github.com/openai/codex-security) · ⭐10,097

> OpenAI 把自家代码安全扫描器做成 `@openai/codex-security` npm 包——`scan / patch / publish` 三件套,自动开 PR,允许换 OpenRouter / Fireworks / Bedrock 后端。

| 字段 | 值 |
|---|---|
| 语言 | TypeScript · 20,235 KB |
| License | Apache-2.0 |
| 创建 / 推送 | 2026-07-13 / 2026-08-23 |
| Stars / Forks | 10,097 / 719 |
| Open issues | 178 |

**定位**:传统 SAST 工具(Snyk / Semgrep / CodeQL)给你的是一摞报告,改不改看你;Codex Security 把"扫描 → 验证 → 自动开 PR"做成闭环,且允许换模型后端——这是 OpenAI 把 Codex 从"代码生成器"扩展到"代码治理"的标志性动作。

**核心价值 5 条**:

1. **三段式闭环**:`scan` 出 findings → `findings list` 看跨 scan 的开放项 → `patch` 一键修或者 `patch --patch-severity high` 批量修高危。每条 finding 默认在独立 Codex desktop task 里跑,互不污染。
2. **可换模型后端**:除了 OpenAI 自家模型,还支持 OpenRouter / Fireworks / Amazon Bedrock——企业想用 Claude / Qwen 跑也行,不被 OpenAI 锁死。这是和同赛道竞品最大的差别。
3. **Linear 集成**:`publish scan --to linear` 把每条 finding 当 Linear issue 建出来,带 scan ID + 受影响代码位置 + 源码片段 + 修复指引;也能 `--linear-issue SEC-123` 把已有 Linear 问题直接修掉。
4. **Monorepo 友好**:`scan-components` 把 monorepo 按 component 拆开跑,`--auto --plan-only` 先出拆分方案不真跑;`scans compare BEFORE AFTER` 按根因匹配 findings,识别新出现 / 持续存在 / 重开 / 已解决 / 未知五类。
5. **Trusted Access for Cyber**:高敏扫描和某些 cybersecurity 请求要走 Trusted Access for Cyber 审批,通过 `chatgpt.com/cyber` 申请——这是 OpenAI 在"负责任披露"和"防护滥用"上的双重护栏。

**实战信号 + 争议**:

- 仓库 open_issues = 178,但作为 npm 包已经 GA + 文档完整(`learn.chatgpt.com/docs/security/cli`),可以认为是"用户基数大 + issue 流量正常"。
- "Trusted Access for Cyber"是一把双刃剑:对企业用没问题,但对独立 researcher 做漏洞研究时多一道门槛。

**横向对比**:Codex Security vs Snyk Deep Code vs Semgrep:前两者偏传统规则 + ML,后者偏规则 + 自写;Codex Security 走"LLM 验证 + 自动修复"路线,且唯一支持多模型后端。

**信号判断**:

- ✅ Apache-2.0 + npm 一行安装 + 文档齐全,集成门槛低。
- ✅ 可换模型后端是关键差异化,不是营销话术。
- ⚠️ "Trusted Access for Cyber" 审批流程对独立 researcher 不友好。

**适用场景**:**适合**:已经有 OpenAI API key 的中大型团队、需要"扫描 + 自动修 PR"一体化的 security 平台、需要 Linear 集成做 issue 治理的工程团队 · **不适合**:完全不想碰 OpenAI 生态的项目(虽然能换后端,但 npm 包名仍带 openai 厂牌)、只想做单次扫描不需要治理流程的小项目。

---

### 8. [trycompai/crm](https://github.com/trycompai/crm) · ⭐8,821

> 给 AI agent 设计的开源 CRM——agent 不是 CRM 的功能,CRM 是 agent 的记事本。Agent 自己跑 schedule、自己决定查什么、自己花 research 预算,关掉浏览器它也不停。

| 字段 | 值 |
|---|---|
| 语言 | TypeScript · 8,977 KB |
| License | MIT |
| 创建 / 推送 | 2026-07-31 / 2026-08-21 |
| Stars / Forks | 8,821 / 1,076 |
| Open issues | 12 |

**定位**:传统 CRM 是"数据库前面加个表单",AI CRM 是"数据库旁边贴个 chat 框"——两者都把"找出真相 + 写下来"这件事留给人。这个项目反过来:**agent 自己跑、自己决策、自己记账**。你关浏览器它还在后台 tick。

**核心价值 5 条**:

1. **18 个工具 + 4 个 skill + 1 个 schedule,全部文件化**:`apps/agent` 跑在 Vercel 的 eve(file-first agent framework)上——工具是文件、skill 是 markdown、schedule 是文件,session 跨 redeploy 存活,工作从断点继续。
2. **证据账本(evidence ledger)**:agent 不允许猜人。工具不接受 confidence score——因为让模型给自己的"确定性"打分,它会倾向于给出"看起来有用"的分数。工具只回报"观察到了什么"(`crm.signature-block`、`github.account-identity`),ledger 给证据定价,强证据写 record,弱证据变 suggestion 让人判定。
3. **沙箱无网络无 DB**:`deny-all` egress,沙箱里只有 bash / grep / glob + `/workspace`。`web_fetch` 跑在 app runtime、`web_search` 跑在模型 provider——沙箱不会拿到 `DATABASE_URL`,既不外泄也不内出。
4. **自带 Context 集成**:Context 的两个能力——公司品牌数据(logo / 颜色 / 行业 / 域名背后真名)+ LinkedIn(从 URL 读出真人)——只要一把 key 就能全开,且这是 onboarding 主动问用户要的、不是配置项。
5. **多模型 gateway,OIDC 不要 key**:模型走 Vercel AI Gateway,OIDC 在 Vercel 上意味着没有 key 要管——Vercel 部署的便利性完整保留。

**实战信号 + 争议**:

- Issue #180:用户问"是不是只能用 Vercel 做 LLM 后端"——维护者已开放任意 model provider。
- Issue #181:用户提交 CARDDAV 接口到联系人数据的需求(用 ckulka/baikal:apache 做只读视图)——能跑但需要"可读视图 + 双向同步"的工程化。
- Issue #182:用户请求"可选的服务端强制 owner-based 访问控制"——目前记录所有者是过滤器,所有接受的工作空间成员共享 CRM 数据面,某些自托管场景需要"销售代表之间的服务端边界"。

12 个 issue / 8.8k stars 的比例极低(0.13%),且大部分是 feature request 不是 bug——是个相对干净的 release。

**横向对比**:Comp AI CRM vs Attio / HubSpot CRM AI:Attio / HubSpot 把 AI 当 copilot;Comp AI 把 CRM 当 agent 的笔记本体,agent 才是主语。

**信号判断**:

- ✅ "不给工具接 confidence score"这条约束写得非常清晰,体现对"模型会倾向于自信地胡说"的理解深度。
- ✅ eve + Vercel AI Gateway 的栈选得很合理,durable sessions + 无 key 部署都是真正解决的痛点。
- ⚠️ 自部署门槛偏高,需要 Postgres + Vercel 账户 + Context key,不是 plug-and-play。

**适用场景**:**适合**:B2B SaaS 公司需要"AI agent 自己跟进潜在客户"的团队、希望把 CRM 数据留在自己云上的自托管党 · **不适合**:纯销售个人(over-engineered)、不想接触 Vercel 生态的团队。

---

### 9. [MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3) · ⭐8,585

> Moonshot 首次把 3T 级(2.8T)开源旗舰模型的完整权重放出来——KDA + AttnRes 双轨注意力,1M token 上下文,原生多模态。

| 字段 | 值 |
|---|---|
| 语言 | — · 1,404 KB(纯权重仓库) |
| License | Kimi K3 License(自定义) |
| 创建 / 推送 | 2026-07-27 / 2026-08-06 |
| Stars / Forks | 8,585 / 687 |
| Open issues | 26 |

**定位**:Kimi K3 是"世界第一个开源 3T-class 模型",建立在 Kimi Delta Attention(KDA)+ Attention Residuals(AttnRes)之上,896 个专家里选 16 个激活,Stable LatentMoE 框架让整体 scaling efficiency 比 K2 提升约 2.5×。原生支持文本 / 图像 / 视频,1M token 上下文,Kimi K3 License 开放权重。

**核心价值 5 条**:

1. **2.8T 总参 / 104B 激活 / 1M 上下文**:总参数 2.8T,激活 104B,层 93(69 KDA + 24 Gated MLA),hidden dim 7168,96 个 attention heads,vocab 160K,量化走 MXFP4 weights / MXFP8 activations 量化感知训练——这些数字说明它不是"另一个 dense 大模型",是 sparse + 量化训练同时拉到顶的工程作品。
2. **长程编程**:在最小人为监督下,K3 能维持长工程 session,导航巨型仓库,编排终端工具——从 GPU kernel 优化、编译器开发,到 vision-in-the-loop 游戏开发、CAD、芯片设计。
3. **原生多模态**:同一模型吃文本 / 图像 / 视频。MoonViT-V2 是 401M 参数的视觉编码器——不是"塞个 CLIP",是训练时原生集成。
4. **完整开源权重**:在 Kimi K3 License 下开放,不是"开放但商用要谈"的伪开放——可以直接拿权重部署、做研究、做产品。HuggingFace `moonshotai` 仓库同步,ModelScope 也同步。
5. **评测 + Tech Report 齐**:附 `k3_tech_report.pdf` 完整技术报告,Benchmark 表覆盖代码 / 推理 / 多模态——不是"放了权重就跑",有完整技术叙事。

**实战信号 + 争议(真实生产事故)**:

- Issue #38 [Critical]:用户贴 4 张截图显示"Kimi Work 3.0 Orchestrator 在简单任务上 15 分钟烧掉约 $150"——这是 Coding Plan 订阅用户的真金白银被吞,不是 benchmark。
- Issue #37 [Bug/Service]:Coding Plan 额度被"模型无限循环"烧光,用户明确说"这不是我的正常调用,是系统逻辑失控导致的资源异常消耗"——并发用户对"Kimi Coding Plan 配额模型"的失稳反馈。
- Issue #36:Kimi 自己审计自己的 major/minor bugs(附 70KB markdown + PDF)——这种"AI 自我审计"是研究诚信的可贵实践。
- Issue #34:关于 AGI 路径的讨论帖被开在 issue 区——是社区管理而非 bug,体现"AGI 哲学讨论在开源权重仓库"的文化现象。

**横向对比**:Kimi K3 vs DeepSeek V3.x vs Llama 4 Behemoth:K3 总参 2.8T 最大,但用 KDA + sparse 让激活只有 104B——比 dense 1T 模型跑得便宜,比 sparse 1T 模型能装下更多知识;原生 1M 上下文 + 多模态也是同时段领先。

**信号判断**:

- ✅ 完整权重 + 完整技术报告 + HF / ModelScope 双仓库同步,真开源。
- ✅ 2.8T 级别首发意味着 Moonshot 在工程化能力上迈过了一道门槛。
- ⚠️ Kimi Coding Plan 的 agent 调度有"无限循环烧额度"问题——用户真金白银在抗议。
- ⚠️ 自定义 Kimi K3 License 不是 Apache / MIT,商业使用前要看清条款。

**适用场景**:**适合**:要做开源多模态研究的实验室、需要 1M 长上下文的研究项目、想跑 sparse MoE 调优的工程团队 · **不适合**:纯个人开发者想本地跑(2.8T 即使 int4 也要几百 GB 磁盘,见衍生项目 kimi-k3-in-c 走流式推理)、商业产品集成前必须读 License。

---

### 10. [unicity-aos/aos-ce](https://github.com/unicity-aos/aos-ce) · ⭐8,554

> "Agent OS"——Unicity 把 agent 当 first-class OS 公民,aos CLI / capsule 模型 / Unicity Audit 一条龙,可插拔安全策略。

| 字段 | 值 |
|---|---|
| 语言 | Rust · 21,297 KB |
| License | Apache-2.0(或 MIT 二选一) |
| 创建 / 推送 | 2026-07-12 / 2026-08-22 |
| Stars / Forks | 8,554 / 21 |
| Open issues | 30 |

**定位**:AOS 的赌注是"agent 终将变成 OS 的一等公民"——Capsule 是用户态的可组合构造块,Forge 是 OS 构造工具集,`meta-harness` skill 教 agent 怎么把指令 / 记忆 / skills / harness 代码 / 工具 / capsule / traces / 评测当成"可改进的用户态世界"。capsule 是可独立版本化的 artifact,不是 git 子树。

**核心价值 5 条**:

1. **Product-owned runtime**:`aos init` / `status` / `migrate` / `update` / `distro` / `mcp` / `daemon` / `serve-health` 八个产品根全归 AOS 管——不是 `aos astrid` 这种嵌套命名空间,所有根在产品层被重写或者维持透传。
2. **`aos mcp serve` 是 Codex / Claude / Grok 共享的产品边缘**:MCP form elicitation 客户端自己显示授权表单;不支持的客户端走 `--interaction auto`(macOS AppKit / Windows native dialog / Linux Pinentry)。本地桥只接受布尔值或固定 AOS approval enum,**永远不收任意字符串 / 密码形态字段 / URL 形式的 elicitations**——这是 OAuth-style 攻击的硬护栏。
3. **Sigstore + GitHub provenance attestation 双签**:每个 release 发 checksums、Sigstore bundles、GitHub build-provenance attestations、`runtime-compatibility.toml`。`runtime-compatibility` 和"upgrade / self-heal 门"必须都为真才能发版——发版门槛由机器可读的兼容性约束守护。
4. **独立 principal 身份**:`aos --principal operator init --target-principal alice` 把操作者认证和目标环境分开,避免"我用 root 顺手 init 了 alice 的环境"这种事。
5. **Dual license MIT 或 Apache-2.0**:用户选——给企业自托管最大灵活度。

**实战信号 + 争议**:

- Issue #84 [严重安全]:AOS CE 2026.1.3 通过 `aos-react` / `aos-context-engine` compaction 路径可达的并发多 principal 漏洞——capsule interceptor 调用内创建的临时 IPC subscription 没绑定到 invoking principal,**可能收到**另一个并发 principal 的响应。意味着"agent A 说的话可能被 agent B 看到"。
- Issue #85:`aos --principal <host> mcp serve --workspace $PWD --request-timeout 1d5m` 这种"host plugin 套娃调用"被 clap 拒收——`--workspace` argv 还没传到 runtime shim 就被拒,Codex 拿不到 stdio 子进程。这是 1 个 CLI 边界 bug。
- Issue #81:提议把 bundled capsules 拆成独立可发版的 artifact——架构层面方向调整,目前是 distribution assembly + 源码同仓。

30 个 issue / 8.5k stars 比例约 0.35%,但 issue #84 是真安全漏洞——在一个"agent OS"产品上,principal 隔离漏洞是地基问题。

**横向对比**:AOS CE vs Anthropic MCP Servers vs LangChain OpenGPTs:MCP Servers 是协议层,AOS 是把 MCP 当产品边缘 + 给 host 工具做 OS 化的"超集";OpenGPTs 是 framework,AOS 是 product。

**信号判断**:

- ✅ 双 license + Sigstore + provenance attestation 是企业级合规姿态。
- ✅ `aos mcp serve` 不收任意字符串这条硬约束写得很清晰。
- ⚠️ issue #84 principal 隔离漏洞需要尽快修——对"agent OS"这类产品是 brand-killer 级 bug。

**适用场景**:**适合**:想给团队 / 企业统一部署"agent-as-a-product"平台的工程团队、需要可插拔 capsule 隔离机制的安全敏感场景 · **不适合**:只是想要单用户 agent 的人(over-engineered)、不需要 OS 级别治理的个人开发者。

---

## 简评 11-50

| # | 仓库 | ⭐ | 语言 | 一句话 |
|---|---|---:|---|---|
| 11 | [oso95/scroll-world](https://github.com/oso95/scroll-world) | 8,478 | JavaScript | 把任意品牌变成可滚动的 3D 世界落地页——skill 形态的视觉营销工具。 |
| 12 | [MiniMax-AI/MiniMax-H3](https://github.com/MiniMax-AI/MiniMax-H3) | 6,776 | Python | MiniMax 第三代旗舰开源——(暂无描述,详见仓库)。 |
| 13 | [LiamGvchi/gc-minimal-zine-poster](https://github.com/LiamGvchi/gc-minimal-zine-poster) | 6,561 | — | Codex skill:生成极简 zine 风格的编辑海报提示词,让 agent 直接出图。 |
| 14 | [MDX-Tom/gpt-5.6-instruct](https://github.com/MDX-Tom/gpt-5.6-instruct) | 6,338 | Python | 针对 gpt-5.6 系列的 Codex jailbreak prompt + 测试包——红队视角研究素材。 |
| 15 | [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) | 6,308 | C | 把 2.78T Kimi K3 跑在单 CPU + 8.24 GB 内存——Kimi 月榜旗舰的开源衍生。 |
| 16 | [drumih/turbo-fieldfare](https://github.com/drumih/turbo-fieldfare) | 6,268 | Swift | Gemma 4 26B-A4B 推理在 M 系列 MacBook 约 2 GB RAM——本地推理第三极。 |
| 17 | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 6,114 | TypeScript | Claude Code / Codex 的 AI 视频 skill:用 Remotion 生成电影质感产品视频。 |
| 18 | [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | 5,777 | Python | 移除 20+ 种 AI 写作"渣感"模式——写"不像 AI 写的"文档的清洗工具。 |
| 19 | [elder-plinius/T3MP3ST](https://github.com/elder-plinius/T3MP3ST) | 5,646 | TypeScript | 自主红队平台:多 agent 进攻性安全 meta-harness。 |
| 20 | [nyblnet/bento](https://github.com/nyblnet/bento) | 4,446 | TypeScript | "装在一个文件里的 office suite"——极简办公套件方向。 |
| 21 | [NanoNets/Graft](https://github.com/NanoNets/Graft) | 4,308 | TypeScript | 给 Claude Code / Cursor / Codex / Gemini 等 coding agent 加 turbo:更快更便宜。 |
| 22 | [xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer](https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer) | 4,288 | — | FDE(前沿部署工程师)从零入门指南,基于范冰《增长黑客》原书框架。 |
| 23 | [Zeejay0/gathered-scenes-zine-skill](https://github.com/Zeejay0/gathered-scenes-zine-skill) | 4,259 | — | Codex skill:zine 风格场景收集器。 |
| 24 | [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | 4,222 | TypeScript | 一组创意 canvas 组件:WebGL 效果跑在真 HTML 上,不是 headless 渲染。 |
| 25 | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | 4,182 | Markdown | 一组 agent skill 集合——帮 agent 构建好界面。 |
| 26 | [slvDev/esp32-ai](https://github.com/slvDev/esp32-ai) | 4,141 | Python | (暂无描述)ESP32 上的 AI 部署项目。 |
| 27 | [truefoundry/trueforge](https://github.com/truefoundry/trueforge) | 3,624 | TypeScript | 开源 agent harness:把 LLM 变成可工作成员的运行时层。 |
| 28 | [genspark-ai/genoffice](https://github.com/genspark-ai/genoffice) | 3,513 | TypeScript | 免费开源 AI 办公套件:Word / Excel / PPT 全覆盖。 |
| 29 | [microsoft/skill-recorder](https://github.com/microsoft/skill-recorder) | 3,359 | TypeScript | 桌面应用录你在屏幕上的工作,用 GitHub Copilot 把它变成可复用 skill。 |
| 30 | [xuchonglang/investing-for-beginners](https://github.com/xuchonglang/investing-for-beginners) | 3,334 | JavaScript | 小隐寺投资百科:美股、期权与加密货币知识框架的公开索引。 |
| 31 | [synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience) | 3,323 | TypeScript | 科研用的开源 AI 工作台。 |
| 32 | [bryanthaboi/gen1recomp](https://github.com/bryanthaboi/gen1recomp) | 3,313 | C | 原生 Lua / LÖVE2D 重制初代宝可梦——AI 重制游戏经典。 |
| 33 | [kvcache-ai/AgentENV](https://github.com/kvcache-ai/AgentENV) | 3,281 | Rust | 分布式 agent 环境运行平台 AENV。 |
| 34 | [isjiamu/gzh-design-skill](https://github.com/isjiamu/gzh-design-skill) | 3,267 | HTML | 把 Markdown 一键排成可直接粘进公众号编辑器的精致 HTML——6 套主题 + 生成器。 |
| 35 | [mshumer/Claude-of-Duty](https://github.com/mshumer/Claude-of-Duty) | 3,252 | JavaScript | 用单个 prompt 在 Three.js 里搭出使命召唤级 FPS。 |
| 36 | [kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew) | 3,182 | Python | 持久化开发工作区,自我改进、跨 session 持续。 |
| 37 | [Tiger3807861189/J-Space-Cognition-Suite-V3.7](https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.7) | 3,018 | Python | AI 认知增强 Skill 套件 V3.7。 |
| 38 | [aipoch/open-science](https://github.com/aipoch/open-science) | 2,958 | TypeScript | 开源 AI 研究工作台,带科研 agent 追求可复现。 |
| 39 | [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | 2,813 | Python | (暂无描述)FlashML 的 FreeToken 项目。 |
| 40 | [duolahypercho/codex-router](https://github.com/duolahypercho/codex-router) | 2,783 | JavaScript | Codex 外接模型路由:支持 Kimi OAuth / DeepSeek,带安全迁移。 |
| 41 | [QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins) | 2,757 | HTML | 让任意 agent harness 原生支持多模态——Qwen 出品。 |
| 42 | [yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) | 2,741 | Rust | OpenAI Codex 桌面端 / CLI 的可视化管理:Provider / API 切换、会话同步、提示词注入。 |
| 43 | [AminBlg/SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) | 2,730 | Python | Agent skill:让 LLM 按 ASD-STE100 Simplified Technical English 规范写文档。 |
| 44 | [lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) | 2,558 | Python | Ryan Lopopolo 的 harness engineering 选集、田野指南与 agent context bundle。 |
| 45 | [Jakubantalik/thinking-orbs](https://github.com/Jakubantalik/thinking-orbs) | 2,555 | TypeScript | AI / agent UI 的"思维球"加载指示器,9 种类型。 |
| 46 | [zerx-lab/FluxDown](https://github.com/zerx-lab/FluxDown) | 2,530 | Rust | Rust 写的多协议下载器:HTTP / FTP / BT / HLS / DASH 流媒体。 |
| 47 | [chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard) | 2,470 | JavaScript | (暂无描述)taskboard 看板类工具。 |
| 48 | [AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide) | 2,426 | TypeScript | 实战派 WorkBuddy 掌握指南——真实工作流导向。 |
| 49 | [powerycy/goutoujunshi](https://github.com/powerycy/goutoujunshi) | 2,380 | Python | 狗头军师:Codex 恋爱军师,先接情绪再分析关系再给可执行策略。 |
| 50 | [DannyMac180/sol-advisor](https://github.com/DannyMac180/sol-advisor) | 2,309 | Shell | Codex 原生架构师编排,Luna / Terra 双实施车道。 |

---

## 数据方法

- **时间窗口**:`created:2026-07-01..2026-08-01`(UTC,左闭右开),即 2026 年 7 月 1 日 UTC 0 点到 2026 年 8 月 1 日 UTC 0 点整。
- **关键词**:`(ai OR llm OR agent OR mcp OR assistant) in:readme`,GitHub Search API 硬限制最多 5 个 OR 项。
- **准入**:不限 stars 下限、不限 pushed 时间、不限语言、不限 archived、不限中文 / 英文;只按 stars 降序取前 50。
- **样本**:英文 41 / 中文 9 / 共 50。
- **数据源**:GitHub Search API(`search/repositories`,带 PAT 5000/h);trending HTML 因 GitHub 对无 JS 客户端限流返回 0 字节,改用 API 等效口径替代。
- **深挖**:Top 10 每条读 README 全文 + 元数据 + 前 5 个 issue + 代表性评论(原文摘录并翻译),按 5 维度展开(定位 / 核心价值 / 实战争议 / 横向对比 / 信号判断 / 适用场景)。
- **slug**:`github-monthly-YYYY-MM`(2026-08)。
- **标签**:每篇文章顶部 tags = `['github', 'ai', 'agent', 'llm', 'github-monthly-ranking']`;档位 tag id `github-monthly-ranking`、展示名 `GitHub 月榜`。
- **频次**:每月 1 号 06:00 CST 自动跑(对应 UTC 8 月 1 日 22:00)。
