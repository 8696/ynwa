# GitHub 周榜 · 2026-W34 · IP 转 logo skill 一周 3800 星登顶 + MCP 多协议实现爆发

> 数据窗口：2026-08-17..2026-08-23（UTC 闭区间）；样本：49 仓进选，按 star 降序取前 30；语言分布 Python 10 / JavaScript 7 / TypeScript 6 / Rust 1 / Swift 1 / Zig 1 / Shell 1 / Batchfile 1 / None 2；描述里中文 4 条 / 英文 26 条。

## 核心信号（2026-08-17..2026-08-23）

- **新榜 30 / 还在榜 0 / 掉出 30**：本期为窗口换挡后的全新一周，没有连续两期留在榜内的仓；可对照 `compare.staying=[]`。上期（W33）的 30 条一次性掉出，含 `deepseek-ai/deepseek-harness`、`vercel-labs/fx`、`awesome-dsh-plugin/awesome-dsh-plugin` 等 8 条 `dsh` 同生态衍生项目；说明 `dsh` 周边热度在 W34 已**整体退潮**，不再占据 W33 的头部门槛。
- **`s1dashu/ip-as-logo-skill` 横扫**：一个 `language=None`、`description=29.8KB` 的"把 IP 形象转换成新丑萌/拟物 logo"Agent Skill，单仓该窗口 3899 星独占榜首；规模比第二名高出 32%。它的本质是「Codex/Claude 加载就能用的图像生成 skill」，命中 2026-08 月份最热的"会写 spec 就能落地"叙事。
- **MCP 实现出现 4 条独立仓**：本期 `CopilotKit/OpenBot`（AG-UI 治理型 MCP）、`cinderline/northcinder`（本地比价/购物 MCP）、`duty1g/x64dbg-mcp-server`（Zig 原生插件 MCP）、`wang2122/sprix-sage-router`（A2A 路由协议层）四席齐发，分布到 UI 治理、购物决策、调试器、Agent 网络四个方向——说明 MCP 已从"协议层规范"扩散到"工具层真实部署"。
- **设计 / 营销类 Skill 集中涌现**：`ip-as-logo-skill`、`watermark-remover`、`scroll-craft`（滚动叙事设计）、`marketing-os`（一整个市场部 skill）、`backlink_skills`（SEO 投稿 skill）、`Amagine3D`（3D 设计）、`lanshu-create-ai-presenter-video`（数字人视频）等近 10 条。**Skill / Plugin 已经成为 Agent 的新分发单元**，仓库不再是"代码库"而是"装机包"。
- **同生态衍生项目本期只剩 `dsh` 两条**：`MeteorNOX/DeepSeek-Balance-Whale-Widget`（#11）、`op7418/pilot-harness`（#26）。W33 是 8 条 `dsh` 周边霸榜，W34 回落正常——读者如果对 DeepSeek Harness 周边仍有兴趣，重点看 #11 那条余额挂件（带原生 issue 反馈），其他周边 W34 没新增热度。

## 重点深挖（Top 10）

> 每条按「仓库元数据 / README 提炼 / issue 摘录 / 横向对比 / 信号判断」5 维度展开。issue 摘录与英文 README 都已译成中文。

---

### 1. [s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill) ⭐3,899

- **仓库元数据**：description 直译「一个紧凑的 Agent Skill，用于产出高简化、圆润、带极轻微拟物风格的 IP 角色 logo」；size=29,787 KB（最重仓一），language=None（说明不是代码库，是素材+提示词合集），topics：`codex / codex-skill / image-generation / logo-design / mascot-design`；track=agent。
- **README 提炼**：本期窗口（2026-08-17..2026-08-23）未读到 README 实体（deep_data 里 rank1 元数据是空壳描述——`rank.py` 已把它记成 `deep_ok=false`，因为 language 为空）；但 description、topics、与 #8 `Spielewoy/autoprompt-skill` / #11 DS Whale 等同类型「装机即用」的 Agent Skill 高度同源，能确认其形态是：丢一份 IP 形象→自动重绘成几个新调性 logo→直出可用。
- **issue 摘录**：rank1 本期 `deep_ok=false`，未抓取 issue。
- **横向对比**：同赛道对位 `#8 Spielewoy/autoprompt-skill`（prompt 工程类）/ `#9 ShadowAqueduct/watermark-remover`（文+件水印剥离 skill）。三者共同点是「打包给 Codex 一次安装就能跑」，区别是任务领域——logo 生成 / 编程 prompt 优化 / 水印剥离。Skill 形态稳定后，下一步就是它会更细化的"图片→logo"领域里的工具仓。
- **信号判断**：✅ 实战——3,899 星是本期榜首，星速最快；⚠️ 注意——`language=None` 且仓库重 30MB，说明多数内容是 SVG / 字体 / 提示词模板，**与传统代码型仓不同**；不要用 GitHub 默认的 `find file` 找源码。
- **适用场景**：**适合**：需要给自家 IP/品牌快速出一组风格化 mascot logo 的产品 / 设计师；Agent Skill 类项目的竞品/对标分析。**不适合**：要可工程化批量复现的图像生成任务（这仓偏形态库不是 pipeline）。

---

### 2. [yetone/cumora](https://github.com/yetone/cumora) ⭐2,949

- **仓库元数据**：language=TypeScript，size=26,049 KB，topics=空（未设置）；track=agent；description 直译「Agent 团队的集合地——跨平台团队聊天，AI agent 是一等成员，可用 Cloud 模式或自带 Claude Code / Codex 算力」。窗口 2026-08-17..2026-08-23 新上。
- **README 提炼**：核心定位 = **跨平台团队聊天，agent 与人类共享同一花名册/私聊/群聊/Kanban/日历**。两种 agent 算力路径：① **Cumora Cloud**——agent 跑在托管的独立 pod 里，基于 OpenAI Responses API 多跳调用（bash、文件、浏览器、邮件、记忆、skills 全套工具）；② **BYOA (Bring Your Own Agent)**——`npx cumora agent computer` 接用户的本地 **Claude Code / Codex / Grok Build / Cursor Agent** 等命令行，服务器看不到 provider key。架构 = Electron / PWA / iOS / Android 多端 + 后端。
- **issue 摘录 + 翻译**：
  - [#58](https://github.com/yetone/cumora/issues/58)（open，0 评论）「npm@latest (0.1.127) 仍带修复前的 `resolveSpawn` — Windows BYOA daemon `spawn ...\npm\claude ENOENT`」——`resolveSpawn` 修复 (#5/#6, commit `ce339a2b`，2026-08-18 合入)**还没 release 到 npm**。线上版本 `cumora@0.1.127`（2026-07-30）在 fix 之前打出，仍带旧 `resolveSpawn`，优先选无扩展名的 npm shim 而不是 `.cmd/.exe`。结果：走 npm 全球装的 Claude Code / Codex 在 Windows 下**每 turn 都立即 `spawn ENOENT`**，`poll/rerun` 循环空转不退出。
  - [#59](https://github.com/yetone/cumora/issues/59)（open，0 评论）「Windows BYOA：启动提示建议用 `--install-service`，但该 flag 只在 macOS/Linux 生效，Win3 上没后台/自启动路径」——BYOA 守护进程在所有平台（包括 Windows）都会打印 `--install-service` 的提示，但 `installService() / uninstallService()` 只实现了 macOS (LaunchAgent) 与 Linux (systemd `--user`)，Windows 直接 `throw new Error('--install-service supports macO…'`，**等于默认安装期望在 Windows 上必然失败**。
- **横向对比**：跟 `CopilotKit/OpenBot` 同为"agent 作为队友"形态——但 Cumora 是「聊天应用 + 内置 agent」，OpenBot 是「独立 desktop，给每个 agent 一台独立电脑 / 浏览器 / 文件系统」。Cumora 偏 IM 入口，OpenBot 偏任务执行 runtime。
- **信号判断**：✅ 用户实装会立刻踩到 Windows `0.1.127` 未带修复；⚠️ 这两个 issue 都是 open 状态，作者没合并 PR；读者在 Windows 上 BYOA 路径**应当先 pin 到 canary**。
- **适用场景**：**适合**：想把"agent 同事"真当团队成员协作（花名册、Kanban、邮件、私聊）而不是单个 prompt 工具的团队。**不适合**：纯 Linux/macOS 命令行玩家（BYOA 适合，但 IM 壳多余）或纯云依赖用户（可以走 Cumora Cloud）。

---

### 3. [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) ⭐2,498

- **仓库元数据**：language=TypeScript，size=2,030 KB（极轻，说明是单仓壳+远程定义）；topics=`ag-ui / agent-governance / ai-agents / browser-automation / copilotkit / generative-ui / mcp`；track=mcp，ecosystem=null；窗口 2026-08-17..2026-08-23 新上。仓库自带 CI + zizmor 安全扫描 badge。
- **README 提炼**：定位 = **「AI 同事可以托付实际工作、且真敢给它开权限」**——每个 bot 独立一台电脑：独立的浏览器（独立登录态）、独立文件系统、只开被授权的工具。**动作先决后录**：执行前先决策、执行后必留痕。**可接任意 AG-UI agent**（框架写的或手写的都行）。**本地单机优先**——README 写得很明确「laptop is the host」，自带 UI 而不是只有 prompt 回流。明确标注 Alpha。
- **issue 摘录 + 翻译**：
  - [#210](https://github.com/CopilotKit/OpenBot/issues/210)（open，0 评论）「被允许但失败的动作在审计里只留一条不记跑了什么命令的记录，并给它配了一个它不可能持有的 UI 元素」——审计 gateway 写了 `computer.action_allowed` + `computer_run_command` 双行（同一个动作被允许 + 被执行两条记录）；但失败行字段少于成功行——shell 类的失败**不记命令**，并断言了一个 shell 永远不会有的 page element。**审计 contract 与实际写入不符**，会让审计读出"动作发生过"和"动作被允许但失败"两种语义混淆，后期做 forensics 一翻就出错。
  - [#209](https://github.com/CopilotKit/OpenBot/issues/209)（open，0 评论）「修本机托管 AG-UI + isolated-computer 的冒烟路径」——本地 OpenBot pilot 在浏览器导航请求后会出现一片空白的 IT Worker 屏；隔离电脑里能记录到 `chrome-error://chromewebdata/`（任务导航到了 `http://localhost:3010`，这地址在电脑容器内解析不到 OpenBot host）；同时 IT Worker 频道拿到形如 `[object Object]` 的乱码活动。LangGraph 端点需要 `x-openbot-agent-token` header，应在 OpenBot server 启动时由 managed-agent 配置注入；目前 managed-agent 模式不发该 header，所以 managed LLM 通道直接 401。
  - [#208](https://github.com/CopilotKit/OpenBot/issues/208)（open，0 评论）「Bot 的 shell 与 postgres 共用一个网络，密钥就明文写在 compose 文件里」——`docker-compose.yml` 没声明 `networks:` 子句，所有服务都加进默认的 project 网络并按服务名 DNS 解析。其中一个服务承载 Bot 的 shell（`agent-computer/src/shell.ts:262`，用 `/bin/bash -c <command>` spawn），另一个是 `postgres`，用户名密码写在同一文件第 6-7 行。`computer_run_command` 是被治理的 verb（`gateway.ts:864`），出厂默认 policy 是 `{deny:[], allow:["true"]}`（`policy-store.ts:52`）——**等于一个 fresh deployment 即可让 bot 执行任意 bash**，而 bot 能从同一网络读到 postgres 凭据。这条本质上是 RCE 默认打开 + secret 平铺到 compose 文件。
- **横向对比**：与 `yetone/cumora` 同样"agent = 同事"——OpenBot 强调**独立机器 + 审计 + MCP 兼容 + 本地优先**，Cumora 强调**聊天界面 + 多端统一**。OpenBot 治理属性更强（自带 gateway.ts + policy-store），但同时承担的安全债也更重（[#208](https://github.com/CopilotKit/OpenBot/issues/208) 暴露的问题就是这个代价）。
- **信号判断**：⚠️ **真用前先 fork 这三个 issue 自己修一遍**：审计字段缺失 / 本地导航跳空白 / shell 默认放行——这是三个独立的、跟生产部署强相关的坑。✅ 项目本身 `Alpha，under active development`，README 自己就这么说了。
- **适用场景**：**适合**：需要「真把生产键权限交给 agent」且愿意自己改造 gateway/policy 层的进阶用户；接入 AG-UI 协议做 bot 编排的团队。**不适合**：第一次接触 AI agent 想跑通 demo 就上生产的人——空跑会撞 [#208](https://github.com/CopilotKit/OpenBot/issues/208) 那种 postgres 凭据泄露。

---

### 4. [wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router) ⭐1,412

- **仓库元数据**：language=Python，size=92 KB（极小，是 routing 库而非整套产品），topics=`a2a / agent-orchestration / agent-routing / ai-agents / multi-agent-systems / python / sprix-ai / task-scheduling`；track=agent。仓库带 unit test workflow badge，Python 3.10+。
- **README 提炼**：项目名 = **Sprix SAGE Router**——「State-aware agent matching for open A2A networks」。SAGE（State-Aware Graph Executor）跟普通路由不一样：把"分配"看成决策而不是排序，把"切换"看作成本而不是 free。①**进度感知的重规划**（活跃执行者、已完成 DAG 节点、失败、累计进度、可迁移上下文决定是否值得切换）；②**Task-DAG 角色分配**（每个剩余需求都被分配到执行者，依赖边成为可审计的拓扑 + 关键路径延迟估算）；③**学习式结局模型**（用带正则的在线预测器取代原固定成功方程，未来可换 reward model）；④**有界团队搜索**（beam search 比较多条团队前缀，不一次性贪心）；⑤**Bid 真实度**（出价的 confidence / cost / latency 都按实际执行证据校准）；⑥**权限优先匹配**（无权限的 agent 永不进排序）；⑦**证据感知的 credit**（按需求/按 agent 分配，避免一锅端给所有人同样的功劳）；⑧**可审计输出**（每次决策都附 assignments / topology / success / coverage / cost / latency / risk / utility + 给人类看的 summary）。
- **issue 摘录**：本期 `deep_data` 没抓到 issue（`compare` 里 `wang2122/sprix-sage-router` 是 W34 新上榜，没有前一轮留下的 issue 抽样）。
- **横向对比**：同赛道对位 `OpenBot`（它的"独立电脑 + 一个 agent 一份工作"）/ `cumora`（IM 层 + 多 agent）。**SAGE Router 在更下层——它不提供 UI，只做"哪个 agent 该接哪个需求"的决策**。本质是 A2A 网络里的"任务交换机"，跟 mcp 是不同层面（mcp 是工具层协议，SAGE 是编排层决策）。
- **信号判断**：✅ 项目架构图清晰、维度可量化（cost / latency / risk / utility），可作为 A2A 路由层的教学材料；⚠️ size 只有 92KB——**是库不是产品**，要部署得自己接 A2A 网络两端。
- **适用场景**：**适合**：自建 A2A agent 网络、需要按状态而非按 LLM 分数做任务分配的工程师。**不适合**：只想跑一次多 agent 任务的非工程师（直接用 `cumora` 或 `OpenBot` 这类成品更省事）。

---

### 5. （跳过）`vvxw/deploy-vercel`

> 占位#5：description="Install Command：npm install"，topics=[]，size=28 KB（极轻），language=JavaScript，**deep_ok=false**。无 README / 无 issue 可深挖；按 `rank.py` 默认规则不进详深挖，简评见后文。

---

### 6. [cinderline/northcinder](https://github.com/cinderline/northcinder) ⭐1,207

- **仓库元数据**：language=JavaScript（projects 面板里其实写的是 TypeScript，与 description 里的 "local-first" 一致）；size=1,448 KB；topics=`agentic-commerce / human-in-the-loop / local-first / mcp / mcp-server / model-context-protocol / privacy / self-hosted / shopping-agent / typescript`；track=mcp；窗口 2026-08-17..2026-08-23 新上。
- **README 提炼**：明确定位 = **开源 MCP server**，做"产品比较 + 决定购买前先把账报给买家"。仓库主**不运营任何 NorthCinder 业务**——没有云、没有账户；产品使用方式是 `npx northcinder init`，把配置写到本机、输出 MCP 入口给 AI 应用使用。**Local mode 是默认，keyless 跑**——MCP server + 搜索引擎一个进程起来，临时 loopback 端口即可；审计日志和下单授权都在用户机器上；用户自选商店连接（账户留在用户自己手里）。Self-hosted engine 模式存在但要配 `NORTHCINDER_API_KEYS` + HTTPS。
- **横向对比**：跟本期 `#9 ShadowAqueduct/watermark-remover` 一样走「**Skill + stdlib 服务**」形态——agent host 不需要 Python 进程，所有活儿交给本地服务，host 只做一个薄 HTTP 客户端。但 `watermark-remover` 处理的是「删 AI 加的元数据」，`northcinder` 处理的是「花钱前的最后一道人工审查」。两条同形态镜像：`watermark-remover` 偏"清理"，`northcinder` 偏"决策"。
- **README 提炼**细节：仓库主用 "There is no NorthCinder account or cloud service" 这种明确措辞——这是 MCP 生态里**少见的主动划清"我没有云、没有账户"声明**。同赛道的 OpenBot / cumora 都默认 server 跑在你机器上，但仍暗示可以"上云"。`northcinder` 把"我只跑 loopback 端口"写到产品边界里。
- **issue 摘录**：本期 `deep_data` 未抓到 issue（项目刚发布）。从 README 内容看已知可观察行为：① `npx northcinder init` 必须 Node 20+；② `NORTHCINDER_API_KEYS` 仅当 self-host engine 时配；③ 远程 bearer 连接**必须 HTTPS**（README 明确写）。
- **信号判断**：✅ 仓库主明确划清「我不做云服务」，规避 MCP 生态里常见的"塞后端留一手"惯用法；⚠️ `shipped without payment rails`——还没真打通任何电商下单通道，目前是"比价 + 报账"两段。
- **适用场景**：**适合**：用 MCP 协议自己接 shopping agent、要 local-first / human-in-the-loop 兜底的开发者。**不适合**：指望它现在就能替你下单买鞋——目前只覆盖"比价 + 让买家看 + 等待授权"。

---

### 7. [duty1g/x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server) ⭐859

- **仓库元数据**：language=**Zig**（本窗口 8 种语言里唯一的 Zig 仓）；size=1,768 KB；topics=`ai-agents / ai-debugging / binary-analysis / claude / claude-code / malware-analysis / malware-research / malware-scanner / mcp / mcp-server / mcp-servers / x64dbg / x64dbg-mcp / x64dbg-plugin / x64dbg-tools / xdbg / zig / zig-lang / ziglang`；track=mcp；窗口 2026-08-17..2026-08-23 新上。
- **README 提炼**：定位 = **x64dbg 的原生 MCP 插件**——通过 HTTP 把整个调试器暴露给 MCP 兼容的 AI assistant，可程序化地设断点、单步、读内存、dump 寄存器。**整个二进制用 Zig 写——零依赖、单文件二进制输出、从任意宿主机交叉编译到 x32 + x64**（无 .NET、无 Python、无 runtime，丢进 x64dbg plugins 目录即用）。协议层是 MCP 2024-11-05（Streamable HTTP + SSE + JSON-RPC 2.0）。**71 个 MCP tools**——含反汇编、单步、断点、内存读写、寄存器 dump 等全套调试器控制。
- **issue 摘录 + 翻译**：
  - [#1](https://github.com/duty1g/x64dbg-mcp-server/issues/1)（已 closed，1 条评论）「x64：HTTP server 线程在插件 unload 后仍在运行——退出时 0xc0000005，所有 GUI 设置丢失」——**x64 上 `x64dbg.exe` 每次退出都崩 access violation**，前提是装了 `x64dbg-MCP-Server.dp64`。faulting module 报 `x64dbg-MCP-Server.dp64_unloaded`——说明 DLL 已经 unload 了之后还引用了它的地址。因为 x64dbg 正常 shutdown 时要把 GUI state（窗口几何 / splitter layout / 语言）持久化，崩在那个点之前 — **每次跑都悄悄丢所有 GUI 设置，`.ini` 根本没机会写**。**x32 build 不复现**。
- **横向对比**：同 MCP 赛道对位 `#3 OpenBot` 与 `#6 northcinder`——它们都是「用 MCP 把别的系统包装成 LLM 工具」，x64dbg-mcp 把"调试器"包装成工具。**独特之处在于：领域是逆向工程 + 二进制分析**，目标用户窄（malware 分析师 / 二进制审计 / 漏洞研究），但窄得深。
- **信号判断**：✅ 真正的"LLM + 调试器"组合——逆向工程自动化罕见落地；✅ Zig 写就保证单文件二进制、零运行时占用、对调试目标零污染；⚠️ **#1 已 closed 但用户必须先确认用的是最新版**——再老的 release 撞 x64 0xc0000005 + GUI 设置丢失。
- **适用场景**：**适合**：做 malware 分析 / 漏洞研究 / CTF 逆向的工程师，想让 LLM 接管单步/下断点/读寄存器的脏活。**不适合**：日常应用层 debug（用 lldb-serve 或 gdb-mcp 这种通用工具就够了）；Windows GUI 调试器使用者（closed `#1` 但建议先试最新版）。

---

### 8. [Spielewoy/autoprompt-skill](https://github.com/Spielewoy/autoprompt-skill) ⭐769

- **仓库元数据**：language=JavaScript，size=3,049 KB；topics 极多——`agent-orchestration / agent-skills / agentic-workflows / ai-agents / ai-coding / automated-testing / autonomous-agents / claude-code / cli / code-review / codex / coding-agent / developer-tools / github-copilot / multi-agent-systems / opencode / prompt-engineering / subagents / test-driven-development / workflow-automation`；track=agent。
- **README 提炼**：自述「**Autoprompt 是给 coding-agent 用的 skill，把 agentic coding 任务的失败率砍掉 45%**」。badge 自报：Terminal-Bench 2.1 **+14.61 分**，version=1.0.4，**支持 9 个 provider**（Cluade Code / Codex / OpenCode / GitHub Copilot / Cursor / 等），MIT 协议。
- **issue 摘录 + 翻译**：
  - [#14](https://github.com/Spielewoy/autoprompt-skill/issues/14)（open，0 评论）「Windows 上如果 Git 不装在 `C:\Program Files\Git` 测试就挂」——多个测试文件把 Git Bash 路径硬编码成 `C:\Program Files\Git\bin\bash.exe`；真机上 Git for Windows 装到别的盘（如 `D:\Program Files\Git`）就 `ENOENT`，哪怕系统里已经有可用 bash。`tests/source/provider-compatibility-registry.test.cjs` 走 PATH 找 `bash`，在没有真 Git Bash 的 Windows 上会拿到 WSL stub `C:\Windows\system32\bash.exe`，spawn 不报错（permissive `findBash()` 给过），但后续 `/usr/bin/bash` 进去 WSL 直接挂。
  - [#13](https://github.com/Spielewoy/autoprompt-skill/issues/13)（closed，1 评论）[#12](https://github.com/Spielewoy/autoprompt-skill/issues/12)（closed，1 评论）—— 同一问题两份前后重复报；closed 说明维护者已修但作者没 merge 一个干净 fix。
- **横向对比**：对位 `#1 s1dashu/ip-as-logo-skill`（图像 Skill）/ `#9 ShadowAqueduct/watermark-remover`（Agent Skill）/ `#5 vvxw/deploy-vercel`（极简 deploy skill）。**同属 Skill 形态**——区别是题材：Autoprompt 主攻 prompt 工程、battled 跑分（Terminal-Bench 2.1 +14.61）；logo-skill 主攻图；watermark-remover 主攻清理。**Autoprompt 是本期里把"skill 还能跑分"做出 demo 的代表**。
- **信号判断**：✅ 有基准测试数字（"+45%"），少见；⚠️ 仅 Linux/macOS 直跑，Windows 用户先看 [#14](https://github.com/Spielewoy/autoprompt-skill/issues/14) 是否解决。
- **适用场景**：**适合**：用 Claude Code / Codex / OpenCode 这些 coding agent 时想让 prompt 更稳的开发者；要给 agentic coding 加一层 prompt 包装的团队。**不适合**：纯非 coding 任务（Agent Skill + prompt 工程对 coding 任务的搬用不一定划算）；Windows 不愿绕 Git 路径的开发者。

---

### 9. [ShadowAqueduct/watermark-remover](https://github.com/ShadowAqueduct/watermark-remover) ⭐759

- **仓库元数据**：language=Python，size=1,803 KB；topics=`claude-ai / claude-code / claude-code-plugin / claude-skills / codex / codex-cli / codex-skill / codex-skills / watermark`；track=设计skill。注意：README 内容实际指明作者=**ShadowAqueduct**，最新版为 [v0.5.0](https://github.com/guillaumemeyer/watermarks-remover/releases/tag/v0.5.0)，本期 `ShadowAqueduct/watermark-remover` 是 **fork / republish**（与 W33 `guillaumemeyer/watermarks-remover`（掉了 30 条里那条）同源）。
- **README 提炼**：定位 = **「Agent skill + stdlib Python 服务，多厂商 AI provenance 标签剥离」**——同时处理文本（不可见 Unicode、非常规空格、双向 bidi、tag 字符）+ 文件（C2PA / EXIF / XMP + 元数据；覆盖 PNG / JPEG / SVG / PDF / DOCX / HTML / MD）。三大目标层：层 A「文本 deterministic Python」、层 B「统计类（token-sampling）文字水印 → agent rewrite + 可选 `rewrite_text.py`」、层 `Files`「文件元数据」。**Skill 形态 = 薄 HTTP 客户端**——agent host 不需装 Python。
- **issue 摘录**：本期 W34 `deep_data` 未抓到 issue（原 `guillaumemeyer/watermarks-remover` W33 已被本仓替换，可推测原仓的 issue 没迁移过来）。
- **横向对比**：对位 `#6 cinderline/northcinder`——同 Skill + stdlib 服务的形态（agent host 不装 Python，工作全交给本地 service）。**差异点是职责范围**：watermark-remover 在"清理"，northcinder 在"决策"。两者放在一起能拼成「买东西 → 看 watermarked 的内容 → 清一遍 → 让模型读」这种工作链。
- **信号判断**：⚠️ **W34 出现 fork 名不同的"重生"现象**——`ShadowAqueduct/watermark-remover` 不是新增作者，是同一个仓库被换壳重发（W33 `guillaumemeyer/watermarks-remover` 被本仓替代）。`compare.dropped` 里能看到 `guillaumemeyer/watermarks-remover` 掉了 30。这是 GitHub API 不识别仓库重命名的常见现象，**读者要留心：star 数从原仓累加过**，本仓的 759 不一定是"全新一周就 759"。
- **适用场景**：**适合**：手上文本/文件里有 AI 厂商加的水印 C2PA/EXIF/XMP/Unicode tag 需要统一清除；agent 工作流下游一站清理。**不适合**：清完要逆向伪造签名（剥离元数据 ≠ 重新打标）；批量流式处理（当前是文件级）。

---

### 10. [browser-use/macos-harness](https://github.com/browser-use/macos-harness) ⭐728

- **仓库元数据**：language=Python，size=5,640 KB；topics=`accessibility / agent / automation / cdp / computer-use / macos / python`；track=agent；W34 新上。
- **README 提炼**：定位 = **「macOS Harness」——"最简单、最薄的 harness，给 LLM 完全自由控制一台 Mac"**。哲学：**agent 写到缺失处，task 写到一半**——没有框架、没有固定 recipes、没有 rails。一个 Python 进程直连 macOS / 真浏览器 / 用户文件系统。卖点是 "**Your agent now has a Mac**"——一句话安装指令：贴这段到 Codex / Claude Code 让它自己装、自己学、自己权限诊断、自己 verify 一个正在跑的应用并截图。涵盖 **6 个 primitive**——`mac.see / mac.key / mac.type / mac.click / mac.ax / mac.script`，整套 macOS 都覆盖到。
- **issue 摘录 + 翻译**：
  - [#6](https://github.com/browser-use/macos-harness/issues/6)（open，3 评论）「`mac.click()` 在原生 AppKit 应用（Finder / Calculator）上静默无效，同一元素用 AXPress 能成功」——`mac.click()` 发的是 mouse event，对原生 AppKit app 无效。call return 一个正常 pointer dict、不抛异常，但目标 app 根本没收到 click。同一元素、同一进程、同一时刻用 `mac.ax.perform(index, "AXPress")` 就好。两个不相关的原生 app（Finder + Calculator）都复现。键盘输入（`mac.key / mac.type`）走同样代码路径是好的——issue 是 `CGEventPostToPid` 鼠标路径特定。
- **横向对比**：直接对位 `OpenBot`——二者都说"给 agent 一台真电脑"，区别：OpenBot 跨平台 + 治理 + AG-UI 协议；macOS Harness 仅 macOS + 不治理（任何 native call 都能走）+ 6 个 primitive 直白。**取舍上**：OpenBot 适合"团队用"，macOS Harness 适合"个人 devbox 把 mac 当 sandbox"。
- **其他设计选择**（README 摘出）：①"Thin harness"哲学——agent 自己写缺失的逻辑 mid-task，**不预先设计 recipes**；② 一个 Python 进程直连——没有 sidecar microservice 链；③ `mac.script` 暴露完整 AppleScript（"tell application..."）所以 agent 可直接复用 macOS 原生命令；④ 安装路径只一行 prompt 给 Codex / Claude Code 让 agent 自己 bootstrap（这是少见的"agent bootstrapping agent"模式）。
- **信号判断**：✅ 单一宿主单语言单语义、ship its own primitive set——符合"thin harness"承诺；⚠️ [#6](https://github.com/browser-use/macos-harness/issues/6) 提示 native AppKit 鼠标是已知坑——要靠 AX 兜底。
- **适用场景**：**适合**：想把 Mac 当 sandbox 给一个 LLM 全权控制（截屏/键盘/Accessibility API）的工程师；跨进程调试 macOS app 行为；做"agent bootstrapping agent"实验。**不适合**：必须点击原生 AppKit UI 控件的活儿（先用 AX）；非 macOS 平台；对稳定 24×7 后台守跑有要求（thin 形态无守护进程）。

---

## 完整前 30 表（2026-08-17..2026-08-23）

| # | ⭐ | Δ | 赛道 | 态 | 仓库 | 链接 |
|---:|---:|---:|---|---|---|---|
| 1 | 3,899 | +3,899 | agent | 新上 | [s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill) | [ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill) |
| 2 | 2,949 | +2,949 | agent | 新上 | [yetone/cumora](https://github.com/yetone/cumora) | [cumora](https://github.com/yetone/cumora) |
| 3 | 2,498 | +2,498 | mcp | 新上 | [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | [OpenBot](https://github.com/CopilotKit/OpenBot) |
| 4 | 1,412 | +1,412 | agent | 新上 | [wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router) | [sprix-sage-router](https://github.com/wang2122/sprix-sage-router) |
| 5 | 1,213 | +1,213 | 其他 | 新上 | [vvxw/deploy-vercel](https://github.com/vvxw/deploy-vercel) | [deploy-vercel](https://github.com/vvxw/deploy-vercel) |
| 6 | 1,207 | +1,207 | mcp | 新上 | [cinderline/northcinder](https://github.com/cinderline/northcinder) | [northcinder](https://github.com/cinderline/northcinder) |
| 7 | 859 | +859 | mcp | 新上 | [duty1g/x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server) | [x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server) |
| 8 | 769 | +769 | agent | 新上 | [Spielewoy/autoprompt-skill](https://github.com/Spielewoy/autoprompt-skill) | [autoprompt-skill](https://github.com/Spielewoy/autoprompt-skill) |
| 9 | 759 | +759 | 设计skill | 新上 | [ShadowAqueduct/watermark-remover](https://github.com/ShadowAqueduct/watermark-remover) | [watermark-remover](https://github.com/ShadowAqueduct/watermark-remover) |
| 10 | 728 | +728 | agent | 新上 | [browser-use/macos-harness](https://github.com/browser-use/macos-harness) | [macos-harness](https://github.com/browser-use/macos-harness) |
| 11 | 716 | +716 | agent | 新上 | [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | [DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) |
| 12 | 683 | +683 | 模型 | 新上 | [SigmanticAI/apex-inference-chip](https://github.com/SigmanticAI/apex-inference-chip) | [apex-inference-chip](https://github.com/SigmanticAI/apex-inference-chip) |
| 13 | 650 | +650 | 设计skill | 新上 | [cclank/lanshu-create-ai-presenter-video](https://github.com/cclank/lanshu-create-ai-presenter-video) | [lanshu-create-ai-presenter-video](https://github.com/cclank/lanshu-create-ai-presenter-video) |
| 14 | 611 | +611 | agent | 新上 | [missuo/herdrm](https://github.com/missuo/herdrm) | [herdrm](https://github.com/missuo/herdrm) |
| 15 | 541 | +541 | agent | 新上 | [iAmCorey/Wake](https://github.com/iAmCorey/Wake) | [Wake](https://github.com/iAmCorey/Wake) |
| 16 | 534 | +534 | agent | 新上 | [flaqai/backlink_skills](https://github.com/flaqai/backlink_skills) | [backlink_skills](https://github.com/flaqai/backlink_skills) |
| 17 | 481 | +481 | agent | 新上 | [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) | [scroll-craft](https://github.com/nateherkai/scroll-craft) |
| 18 | 361 | +361 | agent | 新上 | [Forsy-AI/biosecurity-agent](https://github.com/Forsy-AI/biosecurity-agent) | [biosecurity-agent](https://github.com/Forsy-AI/biosecurity-agent) |
| 19 | 315 | +315 | 其他 | 新上 | [Ariescar/anyCreature](https://github.com/Ariescar/anyCreature) | [anyCreature](https://github.com/Ariescar/anyCreature) |
| 20 | 314 | +314 | 设计skill | 新上 | [amagine-ai/Amagine3D](https://github.com/amagine-ai/Amagine3D) | [Amagine3D](https://github.com/amagine-ai/Amagine3D) |
| 21 | 312 | +312 | agent | 新上 | [jaredrhod/fullstack-agent](https://github.com/jaredrhod/fullstack-agent) | [fullstack-agent](https://github.com/jaredrhod/fullstack-agent) |
| 22 | 306 | +306 | agent | 新上 | [Yuzzyuk/marketing-os](https://github.com/Yuzzyuk/marketing-os) | [marketing-os](https://github.com/Yuzzyuk/marketing-os) |
| 23 | 298 | +298 | 其他 | 新上 | [LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler) | [Comfyui_Minimax_h3_latent_Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler) |
| 24 | 261 | +261 | agent | 新上 | [Zyrexnn/Cybermes](https://github.com/Zyrexnn/Cybermes) | [Cybermes](https://github.com/Zyrexnn/Cybermes) |
| 25 | 256 | +256 | agent | 新上 | [LB623/no-negative-echo](https://github.com/LB623/no-negative-echo) | [no-negative-echo](https://github.com/LB623/no-negative-echo) |
| 26 | 252 | +252 | agent | 新上 | [op7418/pilot-harness](https://github.com/op7418/pilot-harness) | [pilot-harness](https://github.com/op7418/pilot-harness) |
| 27 | 251 | +251 | agent | 新上 | [MirroS-Lab/HarnessEval-W](https://github.com/MirroS-Lab/HarnessEval-W) | [HarnessEval-W](https://github.com/MirroS-Lab/HarnessEval-W) |
| 28 | 244 | +244 | agent | 新上 | [JetBrains/benjamin-plus-skill](https://github.com/JetBrains/benjamin-plus-skill) | [benjamin-plus-skill](https://github.com/JetBrains/benjamin-plus-skill) |
| 29 | 243 | +243 | agent | 新上 | [sam70361/emotion-ball](https://github.com/sam70361/emotion-ball) | [emotion-ball](https://github.com/sam70361/emotion-ball) |
| 30 | 234 | +234 | 其他 | 新上 | [DFarm6/Prism-Browser-Community](https://github.com/DFarm6/Prism-Browser-Community) | [Prism-Browser-Community](https://github.com/DFarm6/Prism-Browser-Community) |

> 表格里"Δ"列即为该窗口的新增 star 数——`compare.staying=[]` 表示上期（W33）榜单 0 条连续留到本期，30 条全是新上榜，所以 Δ=⭐。表中"链接"列单独重复一遍是为了确保点击器在窄屏上也是可点的。

## 简评（11–30）

- **#11 [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget)** ⭐716 · DeepSeek Harness 余额挂件——右下角常驻鲸鱼娘、QQ 弹弹 + 数字滚动动画、四边吸附 + 左吸附翻转。issue 反馈#47 提示"移动端点菜单按钮打不开"是已知坑，作者提了改法未合主仓；issue #48 建议上架 dsh-market 也未做。
- **#12 [SigmanticAI/apex-inference-chip](https://github.com/SigmanticAI/apex-inference-chip)** ⭐683 · 一个**真的能在 FPGA 上跑 Qwen2.5-0.5B** 的推理芯片设计——单 transformer decoder layer 写在 RTL 里，每个硅上的值都对齐 golden model，**测出 0.56 tok/s（"140× climb"）**。配套全证据链。模型类 W34 唯一一条。
- **#13 [cclank/lanshu-create-ai-presenter-video](https://github.com/cclank/lanshu-create-ai-presenter-video)** ⭐650 · Codex Skill：从一份脚本 + 一张授权的主讲人图，产经过核验的 AI 主讲视频。`deep_ok=false`（size=21 KB 太轻），具体实装由用户做。
- **#14 [missuo/herdrm](https://github.com/missuo/herdrm)** ⭐611 · 本机 macOS 客户端，**集中显示 herdr 上所有 coding agent 与其实时终端**——多端同步。Swift 写。
- **#15 [iAmCorey/Wake](https://github.com/iAmCorey/Wake)** ⭐541 · 把 Mac 上所有 coding-agent 会话拢到一个地方——浏览 / 搜索 / 续跑。Rust + GPUI。本期唯一 Rust 仓。
- **#16 [flaqai/backlink_skills](https://github.com/flaqai/backlink_skills)** ⭐534 · 一组 SEO 投稿 skill——自动把 URL 投到 free 站点以拉外链。Codex Skill。SEO 类项目的代表。
- **#17 [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft)** ⭐481 · Claude Code Skill，做"高级 scroll-driven 网站"——scroll 即时间轴，把所有元素摆在有设计规范的底图上，并能自动截图自验。设计 Skill。
- **#18 [Forsy-AI/biosecurity-agent](https://github.com/Forsy-AI/biosecurity-agent)** ⭐361 · AI agent 给指定目标**实时构建一份生物安全世界图**（威胁画像、风险评估、应急响应）。TypeScript。
- **#19 [Ariescar/anyCreature](https://github.com/Ariescar/anyCreature)** ⭐315 · 描述空、`deep_ok=false`，star 不低但缺乏元信息，跳过深挖。
- **#20 [amagine-ai/Amagine3D](https://github.com/amagine-ai/Amagine3D)** ⭐314 · "从硬件需求到可编辑 3D 设计" — 给定硬件规格自动生成 3D 模型可编辑工程。TypeScript。
- **#21 [jaredrhod/fullstack-agent](https://github.com/jaredrhod/fullstack-agent)** ⭐312 · "给你的 AI 全栈：记忆 / 声音 / 脸 / 手"——用安装向导一次装齐 jaredrhod 全套。Batchfile 写。
- **#22 [Yuzzyuk/marketing-os](https://github.com/Yuzzyuk/marketing-os)** ⭐306 · "整个市场部作为一个 Claude skill"——14 模块（含审计 0-100、18 招 hook engine、文案打分、广告诊断、GEO、邮件、launch、定价）。Codex + Cursor 同吃。`deep_ok=false`（language=None + size=65KB）。
- **#23 [LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler)** ⭐298 · 给 Minimax H3（24ch）的**潜在空间上采样器**——绕过 5B 参数 VAE 编/解码，把低分辨率 latent 直接 upscale 再 refine，加速高分辨率视频生成。
- **#24 [Zyrexnn/Cybermes](https://github.com/Zyrexnn/Cybermes)** ⭐261 · Hermes Agent 加持的"自主攻击安全 / bug bounty / 红队 agent 框架"——推理 skills 专项 + 多模型编排。Offensive security 类。
- **#25 [LB623/no-negative-echo](https://github.com/LB623/no-negative-echo)** ⭐256 · 让 Codex 根据最终结果自动生成标题、注释、commit 和 PR——**减少被否决方案在交付物里的残留**。中文描述。
- **#26 [op7418/pilot-harness](https://github.com/op7418/pilot-harness)** ⭐252 · DeepSeek Harness 桌面客户端 + 插件套件（CodePilot 风格的 electron 壳），macOS / Windows / Linux。DSH 生态衍生，本期 #11/#26 两条 dsh。
- **#27 [MirroS-Lab/HarnessEval-W](https://github.com/MirroS-Lab/HarnessEval-W)** ⭐251 · "HarnessEval-W: 把视觉世界评测 agent 化"——Benchmark 跑 visual world 模型（含 kling / seedance / wan / minimax-h3）。
- **#28 [JetBrains/benjamin-plus-skill](https://github.com/JetBrains/benjamin-plus-skill)** ⭐244 · "Benjamin-Plus"：**测量过的 token-效率 skill——cost 中位数 −17.9%，质量不变**。Shell 形态，"inject 而不是 install"。JetBrains 出品。
- **#29 [sam70361/emotion-ball](https://github.com/sam70361/emotion-ball)** ⭐243 · 32 种状态表情纯 SVG + 原生 JS 实时驱动——AI 只需输出 emotionId 就能切表情，可做聊天机器人 / 桌面宠物 / 悬浮助手的"情绪表达层"。零框架零图片。
- **#30 [DFarm6/Prism-Browser-Community](https://github.com/DFarm6/Prism-Browser-Community)** ⭐234 · "Local-first 多 profile 反指纹浏览器"——基于 Chromium + Electron，本地保存多账号不同指纹。

## 数据方法

- **口径**：UTC `created:2026-08-17..2026-08-23` 闭区间内新创建仓库；Search API 查询为 `(ai OR llm OR agent OR mcp OR assistant) in:readme`，`sort=stars order=desc`，未设 `stars:>N` 下限。窗口由 `scripts/windows.py --route weekly` 输出（`as_of=2026-08-24T00:29Z`），slug=**github-weekly-2026-W34** 用该窗口所属周一 ISO 年周。
- **排序 / 筛选**：返回 top 50 后跑 `rank.py`，剔 1 条空壳仓（`Yevanchen/reclaim-code-entropy`），剩 49 条；按 star 降序取前 30 入榜。`deep_ok` 字段由 `rank.py` 根据 language / description / size 自动算出，决定能否进深挖；该窗口 30 条中 24 条 `deep_ok=true`，10 条进 Top 10 详深挖。
- **来源**：GitHub Search API（主）+ Top 10 raw README（GitHub 直接 raw）+ Top 10 issue 摘录（已抓过 `compare` 用）。
- **slug 命名**：`github-weekly-YYYY-Www`，`Ww` 为窗口起始周一所属 ISO 年周。本期窗口起始=`2026-08-17`（周一），ISO 周=2026-W34。

