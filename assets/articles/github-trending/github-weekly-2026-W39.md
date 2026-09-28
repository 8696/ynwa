## 2026-09-21..2026-09-27 · AI/agent/LLM 热门

> 本期为 W39 周榜快照。窗口期 7 天,共命中 50 个候选仓库,经 `rank.py` 过滤后保留 30 条;Top 1 单仓 ⭐6,775,Top 30 门槛 ⭐402。W38 之后名单几乎全员换血——上周霸榜的 TypeSafe Jev / browser-use / kev 等 30 条全数掉出,本周 Top 30 全部为新上,意味着这一周是"独立周"而非"承接周"。新一批作者群同步集中发力:`jev-chat` 单组织把"对话副驾"做成了 macOS / Windows / Android 三端三仓(全周内合计 5 条相关仓同时上榜),与 W38 的 TypeSafe Jev 生态形成对照。

### 核心信号

- **[jev-chat/jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis) 单生态吃掉 W39 一大半热度**:Top 1 `jev-chat-jarvis` ⭐6,775 单仓独占近乎"半壁江山"(Top 2 才 1,988 星),加同作者群的 `jev-chat-windows` (#18 · 613)、`jev-chat-jarvis-mac` (#29 · 417)、`JevRev` (#30 · 402)、`AnyJev` (#9 · 833, Nokia + Tencent Hunyuan 联合出品)、`awesome-jev` (#21 · 504)——本周 `jev-*` 同根仓合计至少 6 条入榜,这是 W38 之后的第二批"同名群集"。两个"jev"生态的差异点是:W38 的 jev = TypeSafe 的 System One 决策模型(W38 #1 #2 #3 #5 #7 等),W39 的 jev = 跨平台"对话副驾"客户端(W39 #1 #9 #11 #18 #29 #30)——名字撞车,但内涵完全不同。读者区分时直接看 README 第一句。
- **中文项目占比 W39 显著高于 W37 / W38**:Top 30 内英文项目约 18、中文项目约 12。中文密集点集中在 #1 `jev-chat-jarvis`(Kotlin/Android 无障碍读 QQ / X / 飞书)、#6 [deepopen-com/deepopen](https://github.com/deepopen-com/deepopen)(System 1 决策引擎,中文 README)、#8 [freestylefly/WeChatBridge](https://github.com/freestylefly/WeChatBridge)(macOS 微信转发 → AI Agent / Obsidian)、#10 [riba2534/claude-opus-5-5-demo](https://github.com/riba2534/claude-opus-5-5-demo)(Claude Opus 5.5 one-shot 出三款 3D 游戏)、#18 `jev-chat-windows`(#1 的 Windows 端)、#20 [feitangyuan/onetake](https://github.com/feitangyuan/onetake)(Claude skill 连续镜头动画)、#25 [samyost1/3dicon](https://github.com/samyost1/3dicon)(Claude Code skill 3D 动画图标)、#26 [JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase)(p5.js + p5.brush 手绘动画)、#29 `jev-chat-jarvis-mac`、`#30 JevRev` 等。Claude Code skill + 中国厂商(剪映 / 微信 / QQ)工程对接,这一周同时是中文 AI 项目的小爆发。
- **`Nokia + Tencent Hunyuan` 联合署名 `AnyJev`**:[nokia-applied-research/AnyJev](https://github.com/nokia-applied-research/AnyJev) ⭐833 是这一周**唯一带"头部厂商 + 研究机构"双署名**的 Top 10 仓,作者 Jiamu Zhang / Tianze Yang / Liang Wu (Nokia Sunnyvale) + Yucheng Shi (Tencent Hunyuan),定位"把任意 LLM 转成 typed decision 模型 · 无需微调"。与同期 [deepopen-com/deepopen](https://github.com/deepopen-com/deepopen)(改进自 Laya 的非自回归决策引擎)、[Rizzo-AI-Academy/rizzo-flow](https://github.com/Rizzo-AI-Academy/rizzo-flow)(typed decisions 不生成 token)形成"决策模型范式三角"。
- **"Agent 上线 / Agent 部署" 工程化主题突出**:#7 [mikehasa/golive-skill](https://github.com/mikehasa/golive-skill) 把 coding agent 真正"上线"——Vercel / Netlify / Supabase / Neon / Porkbun / GoDaddy / Resend / Stripe 八个第三方服务的端到端编排,每个写操作都要 plan + id 验证 + `--confirm-*` flag;#23 [OnlistTeam/ai-manager](https://github.com/OnlistTeam/ai-manager) AI Manager desktop 桌面应用管理 AI coding 工具;`disktree` (#4 by Tobi) 给 Omarchy 桌面做磁盘 treemap 清理—— 一周内"agent 在真实世界跑起来"这条线被至少 3 个独立仓推进。
- **W38 → W39 名单几乎全员换血、零连榜**:W38 30 条与 W39 30 条零重叠。本质同 W37 → W38(口径只取窗口内新创建仓库按当前总星排序),并非项目本身突然失活,而是"周榜窗口性质"决定。这意味着 W38 的 TypeSafe Jev 单霸榜 → W39 的 `jev-chat` 单霸榜,**两个不同的"jev"撞名**才是这一周最大的结构性变化,读者看到任何 `*-jev` 或 `*-jarvis` 项目时务必先看 README 第一句再下结论。
- **Claude Opus 5.5 + one-shot 3D 游戏出现实测仓**:[riba2534/claude-opus-5-5-demo](https://github.com/riba2534/claude-opus-5-5-demo) ⭐821 是这一周"模型能力 demo"里最干净的样本,Claude Code CLI + Opus 5.5 + 1M 上下文 + xhigh 推理强度,**每个 3D 游戏只用一句提示词、单会话 one-shot 生成、零人工改代码**——鹈鹕骑自行车 / 穿越火线·运输船 / QQ 飞车三款全部部署 Cloudflare Pages 可玩。issue #4 已被用户报"运输船所有人没子弹"的实战 bug,issue #7 已被独立游戏站收录——证明这类"AI 代码生成 demo"既是模型能力证明,又确实有人在玩。
- **AI 检测器绕开类工具进入第三份独立实现**:[asokurasu/text-humanizer](https://github.com/asokurasu/text-humanizer) ⭐739 是继 W37 [SpaceDudem/text-humanizer](https://github.com/SpaceDudem/text-humanizer)、W38 [korcarc/text-humanizer](https://github.com/korcarc/text-humanizer) 之后的第三份独立 AI 文本"人化"工具,topics 含 `ai-detector-bypass` / `zerogpt-bypass`;三个仓分别走"DeepSeek + 多语回译" / "多语 + semantic-preserving" / "完全开源 + multilingual LLM 改写" 三条不同路线,说明这个赛段已经从"单点试水"演化成"独立分支并行成型"。

### 重点深挖

**1. [jev-chat/jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis)** ⭐6,775
- 一句话:Android 上跑在手机里的"对话副驾"——通过系统无障碍服务只读 QQ / X / 飞书的屏幕对话,先用"判断模型"给对方的真实意图 / 危险等级 / 该不该马上回打分,再用"回复模型"起草候选回复,候选一键填入输入框,**永远不自动发送**。
- 仓库元数据:Kotlin · size 22,586 KB · 创建 2026-09-21 · 最近 push 2026-09-27 · License MIT · topics: `accessibility-service` / `android` / `chat-assistant` / `llm` / `qq` · open_issues 29 · forks 1,168 · 同作者衍生仓 [jev-chat/jev-chat-jarvis-mac](https://github.com/jev-chat/jev-chat-jarvis-mac)(macOS 版 · #29)、[jev-chat/jev-chat-windows](https://github.com/jev-chat/jev-chat-windows)(Windows 版 · #18)。
- 核心价值:①"**先判断,再写字**"两段式 —— 大多数工具让模型直接写一句回复,Jev 先用一个判断模型给"对方真实意图 + 危险等级 + 该不该马上回"打分,再据此起草回复。②"**不动你的聊天软件**"——不 hook、不改包、不走任何 App 的接口或账号、不读数据库,只用系统无障碍服务读"屏幕上正在显示的对话"。③"**发送权永远在你手里**"——程序只把回复填进输入框,从不自动发送,不碰转账 / 红包 / 收款。④"**一套内核,多平台**"——QQ 真机跑通,X 走 content-desc 解析,飞书靠无障碍 + ML Kit 离线 OCR 补正文(飞书的自绘正文不在无障碍树里),新增一个 App 只需写几十行适配器。⑤"**接口自己配**"——判断 / 回复 / 视觉三路分别可填,作者不运营中转服务器。
- ✅ 实战信号:[issue #69](https://github.com/jev-chat/jev-chat-jarvis/issues/69) "如果可以实现指定哪些群或者人对话,或者屏蔽哪些群或者人进行对话功能就更好了"——这条 issue 来自真实用户的功能诉求,反映产品形态已落到"日常装好用度"层而非"早期技术演示"层。[README 平台支持表](https://github.com/jev-chat/jev-chat-jarvis#%E5%B9%B3%E5%8F%B0%E6%94%AF%E6%8C%81)列出 QQ Android 9.3.50 实测、X 12.25 中文界面实测、飞书 OCR 兜底真机验证,版本号钉得死,意味着每次更新作者是真在真机跑。
- ⚠️ 风险信号:① README 顶部第二段就写"**微信 Android 版已全面下架,不再采集或处理微信内容**"——微信在 Android 端的可访问性 / 内容获取边界从 4.x 起持续收紧,作者直接放弃这一条主路径。[issue #67](https://github.com/jev-chat/jev-chat-jarvis/issues/67) "在微信打开没有悬浮窗"是用户对这条边界的真实反馈。②"**只读屏幕 + 一键填入**"边界的产品前提是"用户自愿授权 + 第三方服务商隐私政策由用户接受",作者在 README 明确写了边界,使用方自己承担。③ 4 个赞助商(博查搜索 / 小优店铺 / 速创猫 Vytal)出现在 README 第一屏,这是"开源 + 商业引流"组合仓,不是纯开源产品。
- 横向对比:vs [freestylefly/WeChatBridge](https://github.com/freestylefly/WeChatBridge)(#8)——后者走 macOS 微信 + Share Extension + 用户主动"合并转发"路径,是"我主动把数据送给 Agent";本仓走 Android 无障碍 + 全程后台,边界是"我只读屏幕、不导出文件"。vs [kydlikebtc/awesome-jev](https://github.com/kydlikebtc/awesome-jev)(#21)——两个不同"jev"撞名,本仓的 jev = 跨平台对话客户端;那个 awesome-jev 收的是 TypeSafe Jev System One 决策模型,生态完全不同。
- **适用场景**:**适合**:重度 QQ / X / 飞书社交沟通、需要"对方意图 + 候选回复"两段式辅助、且能接受 Android 无障碍权限的产品经理 / 重度社恐用户 / 跨境沟通用户。**不适合**:微信 Android 用户(作者已下架);要求"AI 直接替我发消息"的场景(本仓永远不自动发);希望后端是托管 SaaS 而非自配 API key 的用户。
- **不适合做什么**:不要把它当作"自动回消息工具"——发送权始终在人;不要在微信 Android 上尝试安装(已下架);不要在没有 LLM API key 的环境跑(作者不运营中转)。

**2. [unreallabsai/unreal-agent](https://github.com/unreallabsai/unreal-agent)** ⭐1,988
- 一句话:Unreal Labs 出的 async-first agent harness——Go 写,把 agent 拆成 9 个可独立实现的组件(Inbox / Coordinator / Session store / Context builder / LLM Adapter / Tool registry / Tool translator / Operation manager 等),明确"session 可 fork、operation durable、tool translator 不允许做 I/O"等不变量。
- 仓库元数据:Go · size 1,067 KB · 创建 2026-09-23 · 最近 push 2026-09-27 · License 缺省 · topics: 5 个(`agent-framework` / `async` / `cli` / `harness` / `session-fork`)· 4 个 issues 全 open。
- 核心价值:①"**session append-only + 可 fork**"——一次对话的状态是"只能追加 + 可在任意点 fork 出新会话"的序列,而不是简单的"消息列表 + 系统提示",这一抽象直接对位 git 的分支语义。②"**operation durable + 可分发**"——tool translator 产出 serializable operation 后,由可替换的 operation manager actor runtime 执行,proxy 实现可把 operation 序列化后送到远程 sandbox,工具真正跑在隔离环境里。③"**context builder 不允许 I/O**"——context builder 在内存里 stateful 组装 model input,返回时附带"哪些被省略 / 截断 / 压缩"记录,**不允许它做任何网络或磁盘 IO**,这一硬约束直接切掉了一类常见 bug。④"**tool translator 同步 + 不允许 suspend**"——translator 在 coordinator 事件循环同步跑,产出 operation 而不是直接执行,这把"决策"和"执行"明确分离。⑤"**Session-store 版本化 + 显式错误**"——session store item 序列化 + 存储格式版本化,不兼容的 session 在恢复时显式报错而非崩溃。
- ✅ 实战信号:[issue #16](https://github.com/unreallabsai/unreal-agent/issues/16) "[Bug]: SIGTERM bypasses runner cancellation"——`main` 只注册了 `signal.NotifyContext` 的 SIGINT,没注册 SIGTERM,SIGINT 取消 runner context,SIGTERM 直接终止进程。这是 Unix 进程管理经典坑,作者在 issue body 里给出复现 commit hash + Go 1.27+ / Git / POSIX shell / Python 3 的环境要求。信号:工程团队是按"可复现 + 有 commit hash + 列环境"的标准在维护 issue。[issue #15](https://github.com/unreallabsai/unreal-agent/issues/15) "YAML 语法被当字面文本处理"——`parseSkillFrontmatter` 按 `:` split 而不是真正解 YAML,带引号 skill 名 / 折叠描述 / 行内注释都会错。信号:作者自己 issue 暴露自身 bug,工程诚实度高。
- ⚠️ 风险信号:license 缺省(README 没列,GitHub API 也返回 null)——生产集成前要直接问作者;4 个 open issue 全部是"工程细节 bug"不是"产品争议",说明产品仍在早期收敛期,适合"愿意接受不成熟 SDK + 愿意提 issue 一起改"的早期用户。
- 横向对比:vs [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)(W38 #1)——jev-ultrafast 是 Browser Use 在自己生态里的"决策层插件";unreal-agent 是"通用 agent runtime"而非任何具体场景。vs LangChain / LlamaIndex / Smolagents 等 Python 系框架——unreal-agent 是 Go + 严格分层 + operation durable 抽象,定位"agent OS 层"而非"应用层 SDK"。
- **适用场景**:**适合**:要做一个"agent runtime"底层、需要"session 可 fork + operation durable + tool 隔离执行"的产品团队;Go 生态优先;愿意读源码参与早期收敛的工程师。**不适合**:只想快速拼一个 LLM 工具的脚本用户(本仓是 SDK 底座,不是应用框架);不能接受 license 缺省的项目合规要求;期待"开箱即用 UI"的用户(纯库)。
- **不适合做什么**:不是 agent 应用框架——它不给你 prompt、不给你现成 agent,只给你可拼装的底座;不是 SDK 的稳定版——4 个 open bug 都在底层协议层。

**3. [tobi/disktree](https://github.com/tobi/disktree)** ⭐1,592
- 一句话:Basecamp / HEY 作者 Tobi 出品的磁盘 treemap——Rust + GPUI(同 Zed 编辑器渲染引擎)给 Omarchy 桌面画"占用色块视图",可勾选要删的目录、提交前再次确认,删除前的"路径警示"是硬规则。
- 仓库元数据:Rust · size 1,982 KB · 创建 2026-09-22 · 最近 push 2026-09-27 · License 缺省 · topics: 5 个(`disk-usage` / `gpui` / `omarchy` / `rust` / `treemap`)· Arch AUR 上有源包 + 二进制包;macOS .app 走 Developer ID 签名 + Apple 公证。
- 核心价值:①"**占用色块视图**"——home 目录被画成"按真实占用大小缩放的嵌套马赛克",可回收空间打斜纹;选中 + 候选清单 + 自由空间三视图同屏。②"**永远要二次确认**"——勾选再多,什么都不发生,直到用户审阅清单 + 主动 commit,删除前会**永久显示完整路径再问一次**。③"**用 GPUI,不重新发明 UI**"——GPUI 是 Zed 编辑器的渲染引擎,本仓通过 `gpui-omarchy` 主题包继承 Omarchy 桌面主题,视觉与桌面其余应用一致。④"**Wayland + X11 + Vulkan**"——GPUI 需要 Vulkan 驱动的 GPU,主流 Arch / Omarchy 默认环境都满足。⑤"**macOS 路径的细致差异说明**"——README 单独写了"macOS 的 Free space 比 Finder 小(Time Machine 本地快照 / APFS clone share blocks 等)"这种"非通用知识",等于作者预先消化了平台差异。
- ✅ 实战信号:[issue #47](https://github.com/tobi/disktree/issues/47) "du for agents: a cached, GNU-compatible front end on disktree-core"——用户 `aronchick` 在做"给 coding agent 用的 du 前端",与 disktree 共享 `disktree-core`(缓存层),原话写"coding agents run `du -sh *` constantly",已经在 fork `dust` 加 GNU `du` personality。信号:disktree 的核心数据结构(`disktree-core`)已经溢出"磁盘清理 GUI"场景,被当作 agent 时代的"du 替代品"的底层。
- ⚠️ 风险信号:license 缺省(README 列了 `rust-toolchain.toml` 钉 Rust 1.97,没列 license);只支持 Arch / Omarchy 桌面深度集成,其它 Linux 桌面能跑但视觉主题不跟系统;macOS 上"未签名 / 未公证"release 会被 Gatekeeper 拦,作者给出 `xattr -dr com.apple.quarantine` 命令绕过,等于把"我是开源作者"和"macOS 公证体验"之间的张力写在 README。
- 横向对比:vs `ncdu`——ncdu 是 TUI 文本界面,基于字符画;disktree 是 GPU 加速 + 主题继承的桌面应用。vs `baobab`(GNOME)、`qdirstat`(Qt)——后两者是历史更长的成熟工具,但视觉与"AI 时代"无关;disktree 把"agent friendly CLI"作为第二形态做了延伸。
- **适用场景**:**适合**:Arch / Omarchy 桌面用户、想看 home 目录真实占用的开发者、准备"清理大文件"前要可视化决策的人;愿意接受 Rust 工具链 + GPUI 生态的工程师。**不适合**:Windows / 闭源 Linux 桌面深度集成需求;非开发者用户(没有 Rust 1.97 也没有 GPU 加速体验)。
- **不适合做什么**:不是普通文件管理器——它只读 + 标记 + 删除,不做打开/编辑;不是云同步清理——只本机扫。

**4. [yetone/magpie](https://github.com/yetone/magpie)** ⭐1,243
- 一句话:yetone 出品的"agent 模型路由"——一个系统菜单栏 / TUI / CLI 三形态的小应用,统一管 Claude Code / Codex / Gemini CLI / OpenCode / MiMo / Pi / Goose / Cursor / Copilot CLI 的"用哪个模型",并内嵌本地 gateway(`http://127.0.0.1:3425/v1`)翻译 OpenAI chat / Responses / Anthropic Messages 三种协议。
- 仓库元数据:Go · size 18,943 KB · 创建 2026-09-22 · 最近 push 2026-09-27 · License 缺省 · 桌面 binary < 15 MB(TUI-only < 7 MB),跨 macOS / Linux / Windows;走 Wails(系统 webview,不打包 Chromium);brand 图标借 [lobehub/icons](https://github.com/lobehub/icons);provider 列表含 Anthropic / OpenAI / Gemini / DeepSeek / Kimi / GLM / MiniMax / StepFun / Qwen / Mistral / Groq / xAI / OpenRouter / Together / Fireworks / SiliconFlow / AiHubMix / 302.AI / Ollama / LM Studio 等 20+。
- 核心价值:①"**手术式编辑 settings**"——改 model 字段只动你改的那一个 key,`settings.json` / `config.toml` / `opencode.jsonc` / `config.yaml` 的注释、顺序、缩进全部保留;写入是原子写。②"**本地 gateway 翻译三种 API**"——vLLM 风格 embed task 服务跑 `http://127.0.0.1:3425/v1`,所有 agent 都指过去,翻译在 magpie 内做,streaming + tool calls 都过。③"**订阅共享**"——Claude Code / Codex / Copilot 任何一个登录,它的 provider 立即可被其他 agent 用,无 key 复制粘贴。④"**catalog 动态拉**"——配 key 后,主动问 vendor 提供哪些模型,模型名 / 推理强度 / lists 实时更新,新发布的模型在下一次 refresh 即出现在 picker(底层用 [models.dev](https://models.dev))。⑤"**profiles 快照 + 一键切换整套**"——保存当前所有 agent 的 settings 到 profile 名下,切换瞬间恢复。
- ✅ 实战信号:[issue #121](https://github.com/yetone/magpie/issues/121) (closed · 💬1) "Claude 订阅桥接遗留大量 magpie-claude 临时项目和会话历史"——本机观察到 139 个 `magpie-claude-<随机数>` 临时工作目录 + 139 个对应 Claude 历史目录 + Codex 导入 46 个项目/会话,反映"订阅共享"功能在 Windows 上的真实副作用。作者关闭 issue 时已经处理(commit `74cbac06ec0bd20d0f225f29fa1c6cabd3468e77`)。[issue #120](https://github.com/yetone/magpie/issues/120) (closed · 💬8) "希望供应商 Codex 页面能自定义设置数据"——用户希望自定义 Codex context(默认 272K vs 实际 1M,272K 在 dsh 里老压缩很烦),💬8 评论共识度高。信号:真实用户都在"根据自己工作流压榨代码生成自由度",magpie 是这个生态的中心化抓手。
- ⚠️ 风险信号:license 缺省(README 没声明);#121 揭示"订阅共享"会在本机产生大量临时项目,适合愿意定期清理 ~/.claude 的用户,不适合合规要求"会话数据不落地"的团队。
- 横向对比:vs 各 agent 自带的模型切换面板——每个 agent 各管各的;magpie 是"管所有 agent 的同一个面板"。vs LiteLLM——LiteLLM 是 Python server + 路由,本仓是 desktop app + Wails + Go,定位不同(一个 SDK、一个 GUI 工具)。
- **适用场景**:**适合**:同时用 2+ 个 agent(Claude Code + Codex + OpenCode ...)、希望"切模型一次,所有 agent 都切"、订阅多家不愿重复填 key 的重度用户;愿意装 Go 写的桌面 binary + Wails webview 的工程师。**不适合**:只用单一 agent 的用户(单一 agent 自带面板就够);需要"每个 agent 完全独立 profile"的人(本仓 profiles 是全局切换而非 per-agent 隔离)。
- **不适合做什么**:不是 IDE——它不写代码,只管模型;不是 token 计费工具——它不报账;不是 agent SDK——你装好 agent 再装 magpie 才有意义。

**5. [deepopen-com/deepopen](https://github.com/deepopen-com/deepopen)** ⭐1,044
- 一句话:基于 Laya 的**非自回归 System 1 决策引擎**(白皮书标题直白),T4 GPU 单请求 33 ms / 批 7.2 ms,100+ 语言,在单次前向里直接给多维分类,内置智能路由器自动选最优 checkpoint。
- 仓库元数据:Python · size 2,753 KB · 创建 2026-09-22 · 最近 push 2026-09-26 · License 缺省 · 三档独立 checkpoint(英文 421M ModernBERT-large / 多语言 322M mmBERT-base / 极小超快版);README 同时列 banking77 / clinc150 两个 intent classification benchmark 的复现脚本 + 跑分结果(分别居第 2、第 5)。
- 核心价值:①"**非自回归**"——摒弃传统 LLM "逐 token 生成"范式,一次前向给出多维分类,适合"分类 / 路由 / 打分"高并发场景。②"**内置智能路由器**"——自动识别脚本 + 语言,亚毫秒内调度最优 checkpoint,开发者不写规则。③"**RLCD 强化学习**"——以"严格正确评分规则"做 RL 训练,与"prompt-based LLM judge"路线完全相反,幻觉风险天然低。④"**T4 单请求 33 ms**"——这是设计目标而非极限 benchmark,T4 是云上最常见的入门 GPU。⑤"**100+ 语言**"——在多语 intent classification 上,13 种非英文语言准确率 0.451(英文版的 1.47 倍),非拉丁语种远超纯英文模型。
- ✅ 实战信号:[issue #6](https://github.com/deepopen-com/deepopen/issues/6) (open) "README installs nothing that exists; CI has never run; and lang.py routes Romanian, Polish and Latvian to the English checkpoint"——四条问题依序:① README 让装的全部 404/401(`pip install deepopen` 404 / HF [convaiinnovations/deepopen](https://github.com/convaiinnovations/deepopen) 401);② CI 从未跑过;③ `lang.py` 把罗马尼亚 / 波兰 / 拉脱维亚错误路由到英文 checkpoint;④ 整体是 reviewer 在 "directory of Jev-related projects" 过程中发现,repo 在 `28f7221` 提交号下复现。信号:这是"白皮书发布 + 仓还没完工"的典型早期形态,benchmark 数据诱人但工程化不到位。
- ⚠️ 风险信号:#6 列出的 4 条都是项目基本面问题,意味着读者当前不能"按 README 直接跑通";`size 2,753 KB / lang Python` 通过 rank 过滤,但工程完成度需谨慎评估;权重 / checkpoint 没给出可下载的 HF 路径,只能在仓内子目录里找。
- 横向对比:vs [nokia-applied-research/AnyJev](https://github.com/nokia-applied-research/AnyJev)(#9)——AnyJev 是"任意 LLM 转 typed decision 适配器"(对 LLM 做层截断 + 闭式 head),无新训练;deepopen 是"自己训的非自回归决策引擎",训练数据 + RL 流程都在仓内。vs [Rizzo-AI-Academy/rizzo-flow](https://github.com/Rizzo-AI-Academy/rizzo-flow)(#16)——rizzo-flow 也是"typed decisions from an LLM, 不生成 token",定位同 AnyJev 类似;三仓都属 W39 决策模型潮,但深度不同(AnyJev = 适配器 / rizzo-flow = 适配器思路 / deepopen = 自训新模型)。
- **适用场景**:**适合**:研究"System 1 决策 / 非自回归分类" 的研究者、需要在 100+ 语言做 intent classification 的多语产品团队、能接受"项目还在收敛、需要自己修 lang.py 路由"的早期采纳者。**不适合**:今天就要在生产环境跑通英文 intent classification 的工程团队(#6 列出的 4 条全是要先解决的);需要 license 清晰的合规项目;不开 GPU 的纯 CPU 部署(T4 是最低推荐)。
- **不适合做什么**:不是 LLM——它不生成文本;不是端到端 RAG——它只做"分类 / 路由 / 打分";不是现成 SaaS——它连 `pip install` 都还没接好。

**6. [mikehasa/golive-skill](https://github.com/mikehasa/golive-skill)** ⭐1,012
- 一句话:让 coding agent 把"已构建的 MVP"真上线——Vercel / Netlify 部署、Supabase / Neon 数据库、Porkbun / GoDaddy 自定义域名 DNS、Resend 事务邮件、Stripe 测试支付、Supabase Auth 六类端到端编排,每个写操作都要 plan + id 验证 + `--confirm-*` flag,跑失败就停、可恢复、可 teardown。
- 仓库元数据:TypeScript · size 2,246 KB · 创建 2026-09-22 · 最近 push 2026-09-27 · License 缺省 · 当前版本 v0.1.0-alpha.5;9 国 README(EN / 简中 / 日 / 韩 / 西 / 葡 / 德 / 等);docs/ 下分 TRUST / RECOVERY / 五阶段 checklist / the-full-go-live-checklist-and-roadmap。
- 核心价值:①"**每个写操作都要 plan + id 验证**"——`apply` 拒绝无 plan id / `--yes`,重新校验 plan 身份(防止 release 或 config 变更后旧批准仍生效)。DNS 写要 `--confirm-dns`、删除要 `--confirm-destroy`、live 步骤要 `--confirm-live`(包括"首次 production deploy")。②"**credential 处理边界**"——只在进程内读,不打印、不进 argument / plan / state / report;存在 mode 0600 普通文件,**不进 keychain**;这是"工程透明 vs 用户摩擦"的取舍,作者显式声明。③"**apply 失败就停 + 下次恢复**"——apply 在首个失败检查 / 缺确认 / 缺前置 / provider 拒绝处停下,后续步骤不跑,下次 apply 在断点继续,RECOVERY 文档明确讲"哪种失败需要人审过才能恢复"。④"**rollback 窄范围 + opt-in + 永不自启**"——失败检查从不触发 rollback;`release.rollback: true` 计划的是单步 re-point production 到更早 deployment(golive 自己记录的);dashboard / git push / PR 构建的 deployment 不是 rollback 目标,且不动数据 / DNS / 支付 / 邮件资源;**目前仅 Netlify 支持 re-points,Vercel 在 dashboard 修**。⑤"**teardown 可逆**"——`teardown` 是只读规划,不删除;实际删除需要 `--confirm-destroy`。
- ✅ 实战信号:[issue #63](https://github.com/mikehasa/golive-skill/issues/63) (open · 💬2) "HOL Guard rule for `golive teardown`?"——HOL Guard 团队想贡献扩展,在 apply(尤其 `--confirm-destroy` / `--confirm-live` / `--confirm-dns`)上加**独立的人工审批**(不是 agent 替你确认)。这是"agent 替我点 confirm 但有第三方监管"的工程演化信号。README 自己也声明"[Trust, access and control](docs/TRUST.md) separates what the code enforces from what is only an instruction the agent is asked to follow"——明确划清"代码 enforce"和"agent 守约"边界,适合合规团队阅读。
- ⚠️ 风险信号:`v0.1.0-alpha.5` 标注 "Early alpha",多模块"implemented and mock-covered, **not live-validated**" —— 实战可用度按子模块差异很大,Vercel rollback / live payments / production data / real account 等需要 `--confirm-live` 的步骤是首次 production deploy 边界;credential 存 mode 0600 普通文件不进 keychain,适合"我自己跑 CLI"的工程师,不适合"团队共享一台机器"。
- 横向对比:vs Terraform / Pulumi——这是 IaC 工具,但本仓不是 IaC:目标是"agent 替我跑一段",目标是"agent 决策后跟着真写",是 agent-skill 形态;Terraform 是"我写 HCL,它跑";语义不同。vs Vercel / Netlify 自带的 deploy agent——后者只能 deploy,本仓覆盖 deploy + database + DNS + email + payments + auth 六类,且每个写操作都强制人工确认。
- **适用场景**:**适合**:独立开发者 + 小团队已经把 MVP 跑在本地,准备一次性"上线到真服务"、愿意接受"CLI 跑 plan + apply"工作流、对多 provider(Vercel/Netlify/Supabase/Neon/Porkbun/GoDaddy/Resend/Stripe)有清晰账户的人。**不适合**:企业合规要求"无人值守自动部署"的场景(本仓每个写都需 confirm);完全没碰过 cloud provider 的新手(README 不教 cloud 入门)。
- **不适合做什么**:不是 IaC——不能跟 Terraform 一样声明"长期状态";不是 CD 流水线——它是"一次性把 agent 的产物真上线",不是 GitHub Actions 替代;不是 SaaS——本仓是开源 CLI,无 golive 账户、无 hosted backend、无产品 telemetry(README 显式声明)。

**7. [freestylefly/WeChatBridge](https://github.com/freestylefly/WeChatBridge)** ⭐840
- 一句话:macOS 原生 Swift 6 应用,通过 Share Extension 接 macOS 微信 4.1.13+ 的"合并转发 → 第三方应用"入口,把多选聊天记录生成的 ZIP/TXT/图/视频 直接送到 Codex / Claude / 豆包 / 千问办公 / WorkBuddy / WeSight / Obsidian / 剪贴板 / 自定义应用。
- 仓库元数据:Swift · size 26,423 KB · 创建 2026-09-22 · 最近 push 2026-09-26 · License MIT · 9 个内置转发入口;DMG 已 Developer ID 签名 + Apple 公证;v0.1.14 最新;CI 跑 build;Homebrew 风格安装可走 release。
- 核心价值:①"**Share Extension 即入口**"——macOS 微信 4.1.13 起"转发到其他应用"列表只显示有 Share Extension 的 App,本仓注册 Share Extension,**用户在微信转发菜单直接选目标**,不用先开 WeChatBridge 主窗口。②"**9 个内置入口 + 自定义**"——Codex / Claude / 豆包 / 千问办公 / WorkBuddy / WeSight / Obsidian / 剪贴板 / 自定义应用,自定义入口可加任意 macOS App(终端类 App 可只接收文件路径)。③"**场景与技能**"——为不同群聊保留场景提示词,并管理兼容 Agent 的 `SKILL.md`,转发时挑一个场景就带上下文。④"**本地归档 + Obsidian 沉淀**"——生成 Markdown 笔记,保存原始 ZIP,并按聊天名组织;附件按微信样式渲染。⑤"**隐私设计清晰**"——聊天内容只来自微信主动导出的文件;不读微信 DB,不解密、不注入、不修改微信进程;Share Extension 在 macOS 沙盒中运行,无网络权限;屏幕录制权限只用于识别微信标题栏;辅助功能权限只用于激活目标应用 + 执行粘贴。
- ✅ 实战信号:[issue #12](https://github.com/freestylefly/WeChatBridge/issues/12) (open · 💬1) "转发入口没有出现"——合并转发后没有"转发到其他应用"入口;这是 Share Extension 首次安装后未启用的典型问题(系统设置 → 共享扩展 → 微信流),非产品 bug。[issue #9](https://github.com/freestylefly/WeChatBridge/issues/9) (open · 💬2) "windows 可否支持"——用户问 Windows 版,作者暂未承诺,目前明确 macOS 14 Sonoma + Xcode 16。信号:产品稳定在 macOS 14+ 平台深度集成,Windows 路径是 roadmap 未确定项。
- ⚠️ 风险信号:① **仅 macOS 14 Sonoma+**;**iOS 版无**(iOS Share Extension 不允许切到第三方 App);② 微信 macOS 4.1.13 是最低要求版本,旧版本微信不显示 Share Extension 入口;③ "屏幕录制权限"会让 macOS 弹权限请求,首次需要用户在系统设置手动允许。
- 横向对比:vs [jev-chat/jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis)(#1)——前者是 macOS + 用户主动"合并转发",边界是"我主动把数据送给 Agent";后者是 Android + 无障碍 + 全程后台,边界是"我只读屏幕"。两个仓从两端 (Apple P → Apple B) 把"聊天 → AI 辅助"做成立体 two-way。vs 商业 OCR 工具(把聊天记录 OCR 后送 AI)——本仓不 OCR(微信导出已经是 TXT/ZIP),直接走文件路径。
- **适用场景**:**适合**:macOS 14 Sonoma+ 重度微信用户、希望"把群里讨论一键沉淀到 Obsidian"的知识工作者、需要把多选记录批量送给 Claude / Codex / 国产 LLM 的工程师;接受 macOS Share Extension 权限模型的隐私边界。**不适合**:iOS / Android / Windows 用户;微信 4.1.13 之前的 macOS 版本;强隐私需求"不让任何 App 接收我导出的聊天记录"的用户。
- **不适合做什么**:不是 OCR 工具——微信已经帮你导出;不是聊天工具——它不动微信本身;不是云同步——全部本机归档。

**8. [nokia-applied-research/AnyJev](https://github.com/nokia-applied-research/AnyJev)** ⭐833
- 一句话:Nokia Sunnyvale + Tencent Hunyuan 联合出品,把"任意 LLM"转成 "typed decision + real probabilities" 决策模型——无需微调,通过 truncate 模型层 + vLLM embed task 拿 hidden state + 闭式 head 解出 typed 决策。
- 仓库元数据:Python · size 24,797 KB · 创建 2026-09-23 · 最近 push 2026-09-27 · License Apache-2.0 · CI 已配(PyPI `anyjev` + extras `[hf]`);vLLM serve 通过 `--task embed --override-pooler-config '{"pooling_type":"LAST",...}'` 即可成为 L2 决策端点;bench / docs / levels.md 多档文档齐全。
- 核心价值:①"**不微调 + 不重新训练**"——把 Qwen2.5-7B-Instruct 截到 18 层(约 2/3),vLLM `--task embed` 跑,接一个几千字节的闭式 head,直接给 typed decision + 概率分布。②"**L0 / L1 / L2 三档**"——raw / logit-based / closed-form head 三档,后端可任选 `--task generate`(L0/L1)或 `--task embed`(L2),切换端点即可切换档位。③"**实测数据清晰**"——BANKING77 上 order-flip rate 0.230→0.073、calibration error 0.240→0.095(5% 风险自动可决率从 7.7% 涨到 52%);同 head fit 在 `transformers` 训练 + vLLM 推理的答案与单边跑结果 99.0% 一致,平均 |dp| 0.0011。④"**Apache-2.0 + Qwen 基础**"——base model 是 Qwen2.5-7B-Instruct(本身 Apache-2.0),本仓 Apache-2.0,可商用。⑤"**多语 benchmark 路线图已开**"——sokudan `bench_ja` / `bench_en` (issue #6) 给日英平行问题,banking20 / sokudan / laya 三 benchmark 在 ROADMAP.md 列 help-wanted。
- ✅ 实战信号:[issue #5](https://github.com/nokia-applied-research/AnyJev/issues/5) (closed · 💬1) "[hf] device_map usage breaks the HF backend: segfault on Apple Silicon (transformers 5.17) + undeclared accelerate dependency"——两条都阻塞 `[hf]` 路径:① HF backend `device="mps"` 在 Apple Silicon SIGSEGV(exit 139)无 Python traceback;② `pip install -e '.[hf]'` 不够,transformers 要 `accelerate`。作者修了并升 vLLM/transformers。信号:跨平台 + 跨加速器(device_map)的工程边界已经在 issue 系统里被系统性解决。[issue #9](https://github.com/nokia-applied-research/AnyJev/issues/9) (open) "AnyJev is listed on systemonemodels.tech: want to claim the page?"——已被 systemonemodels.tech 收录(只收 System One 模型),等待作者认领。[issue #6](https://github.com/nokia-applied-research/AnyJev/issues/6) (open · 💬1) "bench/tasks/sokudan.py: a Japanese slice"——贡献者提 help-wanted slot,要把 sokudan 的 `bench_ja`(300 条日语 support messages)和 `bench_en`(290 条英语 twin)翻译成 AnyJev `Question.choice` / `Question.score` 形式,等作者审。信号:已建社区,help-wanted 真实有 PR 流入。
- ⚠️ 风险信号:#5 揭示 Apple Silicon MPS 路径曾 SIGSEGV,虽然已修,但若你跑在 M1/M2 + transformers < 某版本需要先升依赖;head fit 仅在 `transformers` + vLLM 单边一致,HF backend 路径曾炸过,生产路径应优先 vLLM embed。
- 横向对比:vs [deepopen-com/deepopen](https://github.com/deepopen-com/deepopen)(#5)——AnyJev 是"对现有 LLM 做层截断 + head 适配器",无新训练;deepopen 是"自训的非自回归决策引擎"。[issue #7](https://github.com/nokia-applied-research/AnyJev/issues/7) "evaluate AnyJev over Laya"——用户问 AnyJev vs Laya 怎么评测,反映两仓在"决策模型"生态里被自然比较。
- **适用场景**:**适合**:已有 Qwen2.5 / 类似开源 LLM 的工程团队、希望加"决策端点"而非"对话端点"、需要 calibration error 低 + 概率真实的合规 / 路由场景;Apache-2.0 license 友好商用。**不适合**:需要的是"AI 生成 JSON 给下游解析"的场景(AnyJev 给你 typed probability,不生成 token);只有 Apple Silicon MPS 路径可用的团队(#5 已修但要升依赖)。
- **不适合做什么**:不是 chat 模型——它不生成自然语言;不是 RAG 替代品——它只给"决策";不是 Agent 框架——它是 SDK,你要自己决定怎么用它做决策。

**9. [riba2534/claude-opus-5-5-demo](https://github.com/riba2534/claude-opus-5-5-demo)** ⭐821
- 一句话:riba2534 用 Claude Opus 5.5(Claude Code CLI + 1M 上下文 + xhigh 推理强度)做的"一句话提示词 one-shot 代码生成实测"——三款可玩的 3D 网页游戏(鹈鹕骑自行车 / 穿越火线·运输船 / QQ 飞车),每个游戏一句提示词、单会话生成、零人工改代码、直接部署 Cloudflare Pages 可玩。
- 仓库元数据:JavaScript · size 291 KB · 创建 2026-09-23 · 最近 push 2026-09-26 · License 缺省 · 三个独立子仓 `pelican-bike/` / `cf-transport-ship/` / `qq-speed/`,各 11 / 18 / 15 个 JS 模块;`build.mjs` 用 esbuild 内联打包;在线体验:鹈鹕 [claude-opus-5-5.riba2534.cn](https://claude-opus-5-5.riba2534.cn/) / 运输船 [claude-opus-5-5-cf-transport-ship.pages.dev](https://claude-opus-5-5-cf-transport-ship.pages.dev) / QQ 飞车 [claude-opus-5-5-qqfeiche3d.pages.dev](https://claude-opus-5-5-qqfeiche3d.pages.dev/)。
- 核心价值:①"**一句话提示词 + 单会话 + 零人工改代码**"——三个游戏的输入就是 README 末尾"提示词原文"那三段中文短句,**不写需求文档、不给参考代码、不做多轮追问**,每个游戏在一个会话内完成查资料、搭工程、写代码、构建、测试、部署。②"**三个游戏的工程深度**"——鹈鹕骑车 14 个成就 + 5 种镜头(含电影运镜 + 鹈鹕视角)+ 浏览器实时合成音效音乐(节奏跟随踏频)+ 触屏按钮 + 按帧率自适应画质;运输船含 bot AI、枪械弹道 + 后坐力、命中反馈 + 击杀播报;QQ 飞车含 Shift 漂移、Ctrl 氮气、小喷 + 双喷、复位键 + 四张官方风格赛道。③"**单文件 HTML + 零外部依赖**"——`src/` 源码经 esbuild 打包内联进单个 HTML,模型 / 纹理 / 动画 / 音效全部由代码程序化生成,**不引用任何图片 / 音频 / 第三方素材**。④"**真实部署**"——三个游戏部署在 Cloudflare Pages 上,点开链接即可玩,README 自己贴出在线地址。
- ✅ 实战信号:[issue #7](https://github.com/riba2534/claude-opus-5-5-demo/issues/7) (open) "已将你的三款 Opus 5.5 3D 游戏作品收录至小宝游戏站共创专区"——独立游戏站 [xbyxz.cn](https://xbyxz.cn) 已收录三款游戏并挂作者致谢 + 出处,这是"AI 生成 demo"被正式收录到游戏分发渠道的实证。[issue #5](https://github.com/riba2534/claude-opus-5-5-demo/issues/5) (open) "牛的牛的,作者我给你游戏加到我的网站里了。。www.heigeai.com/game"——另一独立站点收录。信号:这类项目有真实的"被玩 / 被传播"路径,不止是技术 demo。[issue #4](https://github.com/riba2534/claude-opus-5-5-demo/issues/4) (open · 💬1) "运输船存在 bug,所有人都没子弹了,无法结束比赛"——实战 bug 报告,作者未回复但 issue 已挂出。信号:三个游戏里有可玩性深度(能跑出 bug),不止是"能渲染"。
- ⚠️ 风险信号:license 缺省(README 未声明,GitHub API 返回 null)——三个游戏的源码版权状态不清晰;每个游戏的 token 消耗未在 README 量化(issue #3 问"token 消耗如何",作者未答);QQ 飞车 / 穿越火线是腾讯游戏 IP,游戏本身的还原度受限于"非商用 / 同人致敬"边界,README 副标题用了"穿越火线·运输船"等名字但 README 没明示版权声明。
- 横向对比:vs 任何"AI 自动生成游戏"的 SaaS 演示——后者通常要登录 + SaaS + 黑盒;本仓 README 把每个游戏的提示词原文、源码目录、构建命令、在线地址全部公开,可本地 build。vs [mikehasa/golive-skill](https://github.com/mikehasa/golive-skill)(#7)——前者是"agent 把我的作品部署上线"的开源工具;本仓是"agent 替我把作品从 0 写到部署",后者侧重写作过程的可复现性。
- **适用场景**:**适合**:研究 Claude Opus 5.5 / Claude Code CLI 在"one-shot 长上下文 + 复杂 3D 工程"实际能力上限的研究者;想要"可玩 demo + 源码可改 + 一键部署"示例的工程师;在评估 Claude Opus 系列能力的项目方(对比 deepopen-com、golive-skill 等的"agent 自治深度")。**不适合**:用作商业游戏直接发行(license 缺省 + IP 边界);需要 token 成本可控预算的团队(README 未量化);作为游戏引擎 / SDK 的"生产替代品"。
- **不适合做什么**:不是游戏引擎——它是"用一次 agent 生成的 3 个 demo";不是 SaaS——README 给的 demo 直接打开就能玩;不是教学项目——它不教"怎么做 3D 游戏",只展示"AI 怎么做"。

**10. [dzhng/jevgrep](https://github.com/dzhng/jevgrep)** ⭐762
- 一句话:dzhng 出品的代码仓库语义搜索 CLI——SWE-bench 10 任务同 baseline 完成 8/10 但**成本约低 30%**,`jg` 接收自然语言问题 → 返回相关文件 / 阅读线索 / 原文片段到 stdout,通过 [Vercel AI Gateway](https://vercel.com/ai-gateway) 的 "Jev" 模型做相关性判断。
- 仓库元数据:TypeScript · size 6,915 KB · 创建 2026-09-22 · 最近 push 2026-09-27 · License MIT · npm `@dzhng/jevgrep` 已发布;CLI 安装同时支持 `jg skill`(自动检测 Claude Code / Codex / OpenCode 等 agent),provider 选项含 Vercel AI Gateway / TypeSafe / OpenRouter / OpenCode Zen;需 Node.js 22+ · macOS 或 Linux · 上述 provider 任一 key。
- 核心价值:①"**自然语言搜代码**"——`jg "How are telemetry events recorded and sent?" ./my-project` 即可拿到"summary + 文件清单 + 选中源码 + 行号 + 详细 declaration / call 位置"四段式输出,适合 coding agent 在进入"先写代码"前的"先定位文件"步骤。②"**不强求 top-2 列表**"——README 强调"keeps qualifying file locations even when it cannot confidently return an excerpt; it does not force every search into a fixed top-two list",这是与传统 ripgrep / code-search 工具的差异化——后者总返回 top-N,本工具保留"全部合格位置"即使 excerpt 不自信。③"**Python + TypeScript / JavaScript declaration 解析**"——支持 declaration 级 code units 提取(类 / 函数 / 字段),不只文件级。④"**agent skill 集成**"——`jg skill` 自动检测当前项目里在跑的 agent(Claude Code / Codex / OpenCode ...),询问安装位置(全局 or 项目本地);也可直接 `npx skills add dzhng/jevgrep --skill jevgrep`。⑤"**MIT 协议 + provider 灵活**"——不绑定单一 model,可选 Vercel AI Gateway / TypeSafe / OpenRouter / OpenCode Zen 任一;模型名 0.3.0 起完全 dynamic(从 provider 拉)。
- ✅ 实战信号:[issue #6](https://github.com/dzhng/jevgrep/issues/6) (closed · 💬2) "I cannot use the API from Vercel?"——用户实跑 `jg auth` 选 Vercel AI Gateway + 贴 key + `jg doctor` 报 "Jev connection check failed through Vercel AI Gateway"。作者排查并修。信号:Vercel AI Gateway 路径在实测中曾有断点,作者修了 close。issue 评论里用户给的具体命令日志是真实可复现。[issue #10](https://github.com/dzhng/jevgrep/issues/10) (open) "Skill is unclear about how to phrase the query"——用户提"指令不清楚 / 期望行为没说",作者未答,说明 skill 文档需要改进。信号:工具能力到位,skill 措辞指导是用户卡点。
- ⚠️ 风险信号:依赖 [Vercel AI Gateway](https://vercel.com/ai-gateway) "Jev" 模型,Vercel AI Gateway 路径 #6 实测曾失败;只支持 Node.js 22+ 且 macOS / Linux,Windows 不在官方支持;provider 选择 0.3.0 起动态化,旧版本需手动升级。
- 横向对比:vs [ripgrep](https://github.com/BurntSushi/ripgrep)/[ag](https://github.com/ggreer/the_silver_searcher)——后者是文本正则搜索,本工具是"自然语言 → 相关文件"语义搜索;vs Sourcegraph / Cody——后者是 SaaS + 全仓库索引,本工具是 CLI + 一次性扫当前目录(无需预建索引)。vs Augment Code / Continue 这类 IDE 插件——后者是 IDE 内集成,本工具是 CLI,可在 agent 工作流中独立调用。
- **适用场景**:**适合**:Claude Code / Codex / OpenCode 重度用户、希望"自然语言问 → 拿到源文件定位"作为 agent 工作流第一步;不愿锁定 Vercel 单一 provider、希望在 OpenRouter / TypeSafe / OpenCode Zen 间切换;有 MIT license 偏好的团队。**不适合**:Windows 用户;不能配 provider API key 的纯本地用户;只需要 ripgrep 这种纯文本搜索的人(本工具是 semantic search 不是 regex search)。
- **不适合做什么**:不是 IDE 插件——它是 CLI,agent 通过 stdout 接;不是 Sourcegraph 类全仓库索引——它扫当前目录,不做持久化索引;不是 ripgrep 替代——它的定位是"语义搜索"(找相关代码)而非"正则搜索"(找匹配字串)。

### 完整前 30 表

| # | 仓库 | ⭐ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---:|---|---:|---|---|---|---|---|
| 1 | [jev-chat/jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis) | 6,775 | 模型 | 新上 | Kotlin | Android 无障碍读 QQ/X/飞书对话,先判断再起草,一键填入不自动发 | ✅ |
| 2 | [unreallabsai/unreal-agent](https://github.com/unreallabsai/unreal-agent) | 1,988 | agent | 新上 | Go | Async-first agent harness,9 组件分层 + session 可 fork + operation durable | ✅ |
| 3 | [Contrastive-LM/CLM](https://github.com/Contrastive-LM/CLM) | 1,908 | 其他 | 新上 | Python | (规模小,待详) | — |
| 4 | [tobi/disktree](https://github.com/tobi/disktree) | 1,592 | 其他 | 新上 | Rust | Tobi 出品磁盘 treemap,GPUI + Omarchy 主题,可勾选可恢复 | ✅ |
| 5 | [yetone/magpie](https://github.com/yetone/magpie) | 1,243 | agent | 新上 | Go | 所有 agent 的模型切换器 + 本地 gateway 翻译三种 API + 订阅共享 | ✅ |
| 6 | [deepopen-com/deepopen](https://github.com/deepopen-com/deepopen) | 1,044 | 其他 | 新上 | Python | 基于 Laya 的非自回归 System 1 决策引擎,T4 33ms / 100+ 语言 | ⚠️ |
| 7 | [mikehasa/golive-skill](https://github.com/mikehasa/golive-skill) | 1,012 | agent | 新上 | TypeScript | coding agent 上线工具,8 服务编排 + 每写操作 plan + `--confirm-*` | ✅ |
| 8 | [freestylefly/WeChatBridge](https://github.com/freestylefly/WeChatBridge) | 840 | agent | 新上 | Swift | macOS 微信 Share Extension 转发到 Codex/Claude/Obsidian 等 9 入口 | ✅ |
| 9 | [nokia-applied-research/AnyJev](https://github.com/nokia-applied-research/AnyJev) | 833 | 模型 | 新上 | Python | Nokia + Tencent Hunyuan:任意 LLM 转 typed decision 模型,无需微调 | ✅ |
| 10 | [riba2534/claude-opus-5-5-demo](https://github.com/riba2534/claude-opus-5-5-demo) | 821 | 其他 | 新上 | JavaScript | Claude Opus 5.5 一句话提示词 one-shot 三款 3D 游戏部署上线 | ✅ |
| 11 | [dzhng/jevgrep](https://github.com/dzhng/jevgrep) | 762 | agent | 新上 | TypeScript | `jg` CLI 自然语言搜代码,SWE-bench 8/10 任务成本约低 30% | ✅ |
| 12 | [asokurasu/text-humanizer](https://github.com/asokurasu/text-humanizer) | 739 | 模型 | 新上 | Python | 多语言 LLM 改写管道,AI 文本人化(zeroGPT bypass 路径) | ⚠️ |
| 13 | [yukitorido/short-video-generator-AI](https://github.com/yukitorido/short-video-generator-AI) | 724 | 模型 | 新上 | Python | AI 视频处理流水线,LLM + Whisper + 高光检测 + 自动剪辑 | — |
| 14 | [anishfn/shapeshift](https://github.com/anishfn/shapeshift) | 708 | 其他 | 新上 | TypeScript | 一个文本框随输入变 UI,TypeSafe Jev 驱动,离线可用 | — |
| 15 | [ollaya-dev/ollaya](https://github.com/ollaya-dev/ollaya) | 692 | 模型 | 新上 | Rust | 本地跑 decision models 的 Ollama 风格(pull/serve Laya/decider/NLI/GLiClass) | — |
| 16 | [Rizzo-AI-Academy/rizzo-flow](https://github.com/Rizzo-AI-Academy/rizzo-flow) | 688 | 模型 | 新上 | Python | typed decisions from an LLM,无需生成 token,本地开源 | — |
| 17 | [supermemoryai/company-brain](https://github.com/supermemoryai/company-brain) | 670 | 其他 | 新上 | TypeScript | 公司 Slack 里的"记得一切 + 能去把活干了"的队友 agent | — |
| 18 | [jev-chat/jev-chat-windows](https://github.com/jev-chat/jev-chat-windows) | 613 | 模型 | 新上 | Python | #1 的 Windows 端 PyQt 版,窗口截图 + 本地 OCR + Jev 判断 + 一键填入 | ✅ |
| 19 | [alexgreensh/anidoodle](https://github.com/alexgreensh/anidoodle) | 565 | agent | 新上 | TypeScript | 艺术与动画即代码,Claude Code / Codex plugin,几十种风格 + scored films | — |
| 20 | [feitangyuan/onetake](https://github.com/feitangyuan/onetake) | 544 | agent | 新上 | Python | 一镜到底的连续镜头动画,Claude skill,连续性由 oracle 度量 | — |
| 21 | [kydlikebtc/awesome-jev](https://github.com/kydlikebtc/awesome-jev) | 504 | agent | 新上 | Python | 1207 份 TypeSafe AI System One 决策模型资源清单(原文 awesome-list) | — |
| 22 | [rgem227/knoweldge-base](https://github.com/rgem227/knoweldge-base) | 496 | mcp | 新上 | Python | 个人或团队知识库,支持 MCP API 调用 | — |
| 23 | [OnlistTeam/ai-manager](https://github.com/OnlistTeam/ai-manager) | 496 | 其他 | 新上 | Rust | AI Manager 桌面应用,管理 AI coding 工具 | — |
| 24 | [Niko1221/Strata](https://github.com/Niko1221/Strata) | 486 | 模型 | 新上 | C++ | Qwen3.8-Flash-Next 125B MoE 单 8GB NVIDIA GPU 一键部署 | — |
| 25 | [samyost1/3dicon](https://github.com/samyost1/3dicon) | 486 | 设计skill | 新上 | Python | 一句话提示词出循环动画 3D 图标(真透明),Claude Code skill | — |
| 26 | [JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) | 470 | 模型 | 新上 | JavaScript | 手绘动画 starter kit,p5.js + p5.brush + Clawd 角色 + 31 个情绪 | — |
| 27 | [amitshekhariitbhu/ai-system-design](https://github.com/amitshekhariitbhu/ai-system-design) | 449 | agent | 新上 | Markdown | AI 系统设计教程,LLM + RAG + AI Agent 端到端步骤 | — |
| 28 | [SpecterLouse/CapCut-Pro-macOS-Windows](https://github.com/SpecterLouse/CapCut-Pro-macOS-Windows) | 443 | 其他 | 新上 | None | CapCut Pro 2026.7 全 Premium 离线包(macOS + Windows)(⚠️ 疑似破解) | ⚠️ |
| 29 | [jev-chat/jev-chat-jarvis-mac](https://github.com/jev-chat/jev-chat-jarvis-mac) | 417 | 模型 | 新上 | Python | #1 的 macOS 端,屏幕感知 + 本地小模型判断 + 一键填入 | ✅ |
| 30 | [Alex314618-create/JevRev](https://github.com/Alex314618-create/JevRev) | 402 | 模型 | 新上 | TypeScript | LLM + Jev 工作流,自述"改一切 + 给脊椎脑" | — |

### 其余简评(11-30)

**11. [dzhng/jevgrep](https://github.com/dzhng/jevgrep)** ⭐762 · TypeScript · `jg` CLI 自然语言搜代码,SWE-bench 同 baseline 完成 8/10 但成本约低 30%,Vercel AI Gateway 的 "Jev" 模型做相关性判断,Node.js 22+ / macOS 或 Linux / provider 任选,Agent skill 自动安装。

**12. [asokurasu/text-humanizer](https://github.com/asokurasu/text-humanizer)** ⭐739 · Python · 多语言 LLM 改写管道把 AI 文本"人化",topics 含 `ai-detector-bypass` `zerogpt-bypass`,是继 W37 `SpaceDudem` / W38 `korcarc` 之后的第三份独立 AI 文本人化工具,许可证与伦理边界需自评。

**13. [yukitorido/short-video-generator-AI](https://github.com/yukitorido/short-video-generator-AI)** ⭐724 · Python · 短视频生成 AI 处理流水线,LLM + Whisper 转录 + 高光检测 + 自动剪辑,topics 含 `opus-clip` `opus-clip-alternative`,可作为 Opus Clip 等商业工具的开源对照。

**14. [anishfn/shapeshift](https://github.com/anishfn/shapeshift)** ⭐708 · TypeScript · 一个文本框随输入变 UI(动态界面),TypeSafe Jev 驱动,离线可用,把"prompt → UI 形态"做成一类新交互范式,topics 暂空说明仍在早期。

**15. [ollaya-dev/ollaya](https://github.com/ollaya-dev/ollaya)** ⭐692 · Rust · 决策模型 Ollama:本地 pull + serve Laya / decider / NLI / GLiClass 等 decision models,TypeSafe-compatible API,Ollama for decision models。

**16. [Rizzo-AI-Academy/rizzo-flow](https://github.com/Rizzo-AI-Academy/rizzo-flow)** ⭐688 · Python · 本地开源版 Jev:typed decisions from an LLM,无需生成 token,与 #9 AnyJev 同思路不同作者,反映 typed decision 范式正被多家同时独立实现。

**17. [supermemoryai/company-brain](https://github.com/supermemoryai/company-brain)** ⭐670 · TypeScript · "公司大脑":装在 Slack 里记得团队所有对话 + 能去把活干了的队友 agent,把 supermemory 的"个人记忆"层扩展到公司范围。

**18. [jev-chat/jev-chat-windows](https://github.com/jev-chat/jev-chat-windows)** ⭐613 · Python · #1 的 Windows 端(PyQt):窗口截图 + 本地离线 OCR + Jev 判断意图 + 3 条候选一键填入,发送永远手动,与 #29 一起完成 jev-chat 跨三端(Android / Windows / macOS)。

**19. [alexgreensh/anidoodle](https://github.com/alexgreensh/anidoodle)** ⭐565 · TypeScript · 艺术与动画即代码,Illustrations / loops / interactive web art / stickers / scored films 几十种风格,Claude Code / Codex plugin 双形态,topics 含 `agent-skills` `claude-plugin` `claude-skills` `codex-plugin`。

**20. [feitangyuan/onetake](https://github.com/feitangyuan/onetake)** ⭐544 · Python · 一镜到底的连续镜头动画:每个节拍都从上一个长出来,一条不切镜头的相机,连续性由 oracle 度量,Claude skill 形态,topics 含 `agent-skill` `motion-graphics`。

**21. [kydlikebtc/awesome-jev](https://github.com/kydlikebtc/awesome-jev)** ⭐504 · Python · 1207 份 TypeSafe AI's System One 决策模型资源清单,按决策模式分类,含 source citations + dated link checks + scheduled 维护,是 W39 最完整的 jev 生态资源汇总(注:与 #1 的 jev-chat 撞名但内涵不同)。

**22. [rgem227/knoweldge-base](https://github.com/rgem227/knoweldge-base)** ⭐496 · Python · 个人或团队知识库,支持 MCP API 调用,是本期 W39 唯一明确走 MCP 协议的 Top 30 仓(track=mcp),把"知识库"嵌入 MCP 客户端生态。

**23. [OnlistTeam/ai-manager](https://github.com/OnlistTeam/ai-manager)** ⭐496 · Rust · AI Manager 桌面应用,管理多个 AI coding 工具(对应 #5 yetone/magpie 是系统菜单栏版本,本仓是桌面 GUI 版本,各自抢同一赛道)。

**24. [Niko1221/Strata](https://github.com/Niko1221/Strata)** ⭐486 · C++ · Qwen3.8-Flash-Next(125B MoE)单张 8GB+ NVIDIA GPU 一键部署,Windows / Linux,Strata 推理引擎 + OpenAI/Anthropic 兼容 API 在 localhost,把"大 MoE + 小显存"做到一键开箱。

**25. [samyost1/3dicon](https://github.com/samyost1/3dicon)** ⭐486 · Python · 一句话提示词 → 带真透明的循环动画 3D 图标,Claude Code skill 形态,把"动画图标生成"做成 agent skill。

**26. [JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase)** ⭐470 · JavaScript · 手绘动画 starter kit,p5.js + p5.brush + Clawd 角色 + 31 个 acted emotions + model guide,Claude 当画家协作的范式样本。

**27. [amitshekhariitbhu/ai-system-design](https://github.com/amitshekhariitbhu/ai-system-design)** ⭐449 · Markdown · AI 系统设计教程,LLM + RAG + AI Agent 端到端步骤,topics 含 `ai` `ai-agents` `ai-engineering` `ai-system` `ai-system-design` 等多个 AI 教学标签,定位教学/学习者仓库。

**28. [SpecterLouse/CapCut-Pro-macOS-Windows](https://github.com/SpecterLouse/CapCut-Pro-macOS-Windows)** ⭐443 · None · 声明"CapCut Pro 2026.7 Full Premium (Windows & MacOS) 离线包",topics 含 `capcut-activate` `capcut-pro-account`,**疑似盗版 / 破解分发**,**强烈不建议下载安装**,与本榜其他仓的"开源 / 自有版权"性质完全不同,列在此仅作风险提示。

**29. [jev-chat/jev-chat-jarvis-mac](https://github.com/jev-chat/jev-chat-jarvis-mac)** ⭐417 · Python · #1 的 macOS 端:聊天悬浮窗助手,屏幕感知 + 本地小模型判断意图与风险,按话术生成回复候选,纯只读,与 #18 一起完成 jev-chat 跨三端覆盖。

**30. [Alex314618-create/JevRev](https://github.com/Alex314618-create/JevRev)** ⭐402 · TypeScript · LLM + Jev workflow,自述"Boost your vertebrate brain with a spine inside",topics 含 `jev` `llm` `workflow`,与 #1 的 jev-chat / #21 的 awesome-jev 撞名但本质是 workflow 编排。

### 数据方法

- **数据源**:GitHub Search API([search/repositories](https://github.com/search/repositories))按 `created:2026-09-21..2026-09-27`(UTC 闭区间) + `archived:false` + `(ai OR llm OR agent OR mcp OR assistant) in:readme` + `sort=stars&order=desc` + `per_page=50` 取满排序页,5 个 OR 项与 GitHub Search 硬上限一致。
- **过滤**:[scripts/rank.py](https://github.com/scripts/rank.py) 剔除含 `undress / nsfw / uncensored` 等成人或脱衣词的空壳 + 擦边仓 + `size < 15 KB 且无 language` 的说明页,本期已剔除 1 条([leter/zh-tech-writing](https://github.com/leter/zh-tech-writing) empty-shell);取前 30,Top 10 走深挖。
- **排序口径**:**窗口内新创建仓库按当前总星降序**,不是"窗口内 star 增量"——后者要 trending 页,GitHub 对无 JS 客户端返 0 字节,本 skill 走 Search API 而非 trending 页。
- **快照对照**:与上期 W38(2026-09-14..2026-09-20)Top 30 比对,本期 30 条全部为新上、无连榜;W38 30 条全部掉出。
- **语言分布**(本期 Top 30 内):英文项目约 18 / 中文项目约 12,中文占比明显高于 W37 / W38。
- **slug**:`github-weekly-2026-W39`(窗口所在 ISO 年周,非跑任务当天)。
- **快照时间**:2026-09-28 00:40 UTC(窗口已闭合)。