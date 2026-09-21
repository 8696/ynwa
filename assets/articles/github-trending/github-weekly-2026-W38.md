## 2026-09-14..2026-09-20 · AI/agent/LLM 热门

> 本期为 W38 周榜快照。窗口期 7 天,共命中 50 个候选仓库,经 `rank.py` 过滤后保留 30 条;Top 1 单仓 ⭐11,855,Top 30 门槛 ⭐303。"Jev / TypeSafe / System One" 一组 typed-decision 概念在本周彻底爆发,Top 30 里至少 12 条直接属于这一生态,真正独立的非衍生项目屈指可数。

### 核心信号

- **TypeSafe 的 "Jev / System One" 单生态霸榜 W38**:Top 30 里至少 12 条围绕 TypeSafe AI 的"typed decision" 范式长出来——既包括把 Jev 当决策器用的真工程([browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast) 用 Jev 把浏览器操作限定在 8 类 op + 索引化元素表;[jarrodwatts/jev-trader](https://github.com/jarrodwatts/jev-trader) 每 Monad block 调一次 Jev 决定下单侧),也包括复刻/改写/包装它的开源实作([jaredpalmer/kev](https://github.com/jaredpalmer/kev) 自己训一份 0.8B / 4B / 9B 的 decision family;[TheoLeeCJ/SemIf](https://github.com/TheoLeeCJ/SemIf) 复刻 open-model 上的 typed-decision 接口;[featherless-ai/simple-jev](https://github.com/featherless-ai/simple-jev) 把任意开源模型转 jev endpoint;[thruwire/foreman](https://github.com/thruwire/foreman) 把 Jev 当软件工厂工头)。这一波集中涌现在 W34 起开始冒头,W38 完成霸榜。
- **Awesome-Jev 横着长出 3-4 份独立整理**:[yibie/awesome-jev](https://github.com/yibie/awesome-jev) ⭐610、[AbdelStark/awesome-typesafe](https://github.com/AbdelStark/awesome-typesafe) ⭐392、`[cobanov/awesome-jev](https://github.com/cobanov/awesome-jev)` ⭐262(31-50 掉出前 30 边缘)、`[logicrw/awesome-jev-projects](https://github.com/logicrw/awesome-jev-projects)` ⭐216(第 50 名)— 一个新协议 / 一个新范式 / 一份新模型出现 2-3 周内长出 4 份独立 awesome-list,这是 2026 年 AI 生态里少见的"扎堆"。
- **"决策模型小型化、可本地化"是这一波真正的技术议题**:[mizorewww/laya-mlx](https://github.com/mizorewww/laya-mlx) 在 Apple Silicon 上 median 13.4ms 的 typed decision、`[mizorewww/laya-coreml](https://github.com/mizorewww/laya-coreml)` 把同一份权重移植到 Apple Neural Engine 上 ~5ms、[incoai/splash](https://github.com/incoai/splash) 在 macOS 上做本地 LLM 推理引擎 + speculative decoding——三条独立路径都指向"在本地/边缘把 decision model 跑成 5-15ms"。Qwen 系列的衍生决策模型(基于 Qwen3 / Qwen3.5)也在 W38 出现至少 2 份独立实作。
- **Qwen 官方继续在图像领域发力**:[QwenLM/Qwen-Image-2.1](https://github.com/QwenLM/Qwen-Image-2.1) ⭐414,是这周 Top 30 里唯一带"阿里 / 通义"标签的官方仓库,定位成"Qwen's most powerful open-source image generation model"。与之相对,[letorig/video-generator-client](https://github.com/letorig/video-generator-client) ⭐541 把 Seedance / Kling / MiniMax / Wan 四家视频 API 统一成一份 Python 异步客户端(国内厂商 API 全覆盖);`[huangbai-AI/post-production-skill](https://github.com/huangbai-AI/post-production-skill)` ⭐218 把 Seedance 2.5 做成"AI 视频后期特效 skill"。视频生成侧的"模型 API + 工具链"在 W38 仍是中国厂商唱主角。
- **Agent Skill 形态继续扩张但退居次席**:W37 是 Agent Skill 一统 Top 10 一周,W38 让位给 Jev 单生态。Agent Skill 本周仍占 Top 30 至少 5 席([unicodef1wn/grokbot-field-notes](https://github.com/unicodef1wn/grokbot-field-notes) 把 xAI Grok Bot 团队 72 小时实战规则做成 AGENTS.md、`[Haleclipse/CometixCode](https://github.com/Haleclipse/CometixCode)` Rust 重写 Claude Code 终端 UI、[jackwener/wx-cli-again](https://github.com/jackwener/wx-cli-again) 微信本地数据 CLI、[nilbuild/page-mascot](https://github.com/nilbuild/page-mascot) Cursor 跟随角色 web 组件 + Claude Code/Codex skill 安装路径、[gylive/ccodex-sleep-state](https://github.com/gylive/ccodex-sleep-state) 给 Codex 加"防降智 / 防限流"开关)。Agent Skill 没退场,只是被 Jev 抢了头条。
- **小而扎实的"非 AI 工具"出现 4 条**:[saragordic/window-sweaters](https://github.com/saragordic/window-sweaters) macOS 菜单栏给窗口加针织花边、`[sumimakito/Mac-Duo](https://github.com/sumimakito/Mac-Duo)` iPhone Duo 效果移植 MacBook(⚠️ 上期 W37 第 3 名,本周跌出 Top 30,显示"窗口内新仓"的口径效应)、[theoephraim/awesome-cloudflare-selfhosted](https://github.com/theoephraim/awesome-cloudflare-selfhosted) 一份用审计方法维护的 Cloudflare Workers 自部署列表、`[jackwener/wx-cli-again](https://github.com/jackwener/wx-cli-again)`(已纳入 Agent Skill 项)。这一周 AI 主题虽然占主导,但"非 AI"的桌面工具、社区精选列表依然持续上榜,显示口径过滤没有完全屏蔽它们。
- **AI 检测器绕开类工具独立分支成型**:[korcarc/text-humanizer](https://github.com/korcarc/text-humanizer) ⭐736,沿用上期 W37 的 `[SpaceDudem/text-humanizer](https://github.com/SpaceDudem/text-humanizer)` 的"多语回译 + LLM"思路(DeepSeek 改写 + 中间翻译 + 多语回译),但本期走另一条口味 —— "8 语言 + semantic-preserving rewriting"。两个仓库同期出现,说明"AI 文本人性化"这个赛段已经不是单点试水,而是有 2-3 个独立实现并存。
- **中英文项目分布**:Top 30 内英文项目 24 / 中文项目 6。中文项目集中在 #5 [mcncarl/jianying-headless](https://github.com/mcncarl/jianying-headless)(剪映本地自动化)、#12 [jackwener/wx-cli-again](https://github.com/jackwener/wx-cli-again)(微信本地数据 CLI)、#19 [gylive/ccodex-sleep-state](https://github.com/gylive/ccodex-sleep-state)(Codex 防降智/限流)、`[huangbai-AI/post-production-skill](https://github.com/huangbai-AI/post-production-skill)`(Seedance 视频后期特效)、`[joeseesun/qiaomu-download](https://github.com/joeseesun/qiaomu-download)`(YouTube / B 站 / X / Vimeo / TikTok 视频下载)、`[Qiuner/QCode](https://github.com/Qiuner/QCode)`(AI 编程实战岛屿世界)。Agent Skill 类目里中文项目密度依然高于均值,但本周因为 Jev 单霸榜,中文仓占比从 W37 的 6/30 维持但绝对位置下移。
- **W37 → W38 名单全员换血、零连榜**:跟 W37 一样是窗口性质决定 —— 周榜口径只取窗口内新创建仓库按当前总星排序,老仓上周掉出后本周不会"再上榜"。本质不是"全部掉出",而是"新一周新名单"。这意味着 Jev 单生态是从 W34→W38 持续加码,但每次上榜都是新仓。

### 重点深挖

**1. [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)** ⭐11,855
- 一句话:在 Browser Use 云上跑的浏览器 agent,把"每一步要做什么动作"交给 TypeSafe 的 Jev 决策,只在 `TYPE_TEXT` 这一类操作时调一个小的 LLM 写文本。
- 仓库元数据:Python · size 4,457 KB · 创建 2026-09-16 · 最近 push 2026-09-18 · License 缺省 · Browser Use Cloud waitlist 在 README 第一屏最显眼位置(`https://browser-use.com/ultrafast`)。description 只一句 "i. am. speed."。
- 核心价值:①"**操作空间闭合 + 元素表索引化**"——每次观察渲染出新的 element table,操作枚举是 `CLICK / TYPE_TEXT / SELECT / SCROLL_UP / SCROLL_DOWN / WAIT / DONE / BLOCKED` 8 类,Jev 只在 8 类中选 + 选元素,选 `TYPE_TEXT` 时才调用一个小的 LLM 写字符串。②"**Zürich → London 7.1 秒**"是 README 给出的端到端 demo(Google Flights 自然语言目标 + 真实文本生成 + 加载等待全计时),配套 docs/performance.md 有测量、docs/demo.mp4 有视觉证据、src/agent.py 是可读的循环。③ Browser Use 这个组织本身已经做了 6 个月浏览器 agent(它的主仓 `browser-use/browser-use` 是同期 AI agent 项目里 star 数最高的之一),Jev 只是它的"decision layer"插件。④核心循环能在 page 加载之前就 prefill 下一步动作(操作发出时 screen 还没 ready,等待阶段由 agent 自己等)。
- ✅ 实战信号:[issue #85](https://github.com/browser-use/jev-ultrafast/issues/85) "Latency from Japan: 12-17s per task - it's the client's link, not the region":用户实测从日本出口连接 Browser Use Cloud 区域,每个任务多花 12-17s,作者回复"这是客户端到 region 的网络问题,不是 region 选择问题",并提供 3 个区域对比测量。信号:作为云服务,中国大陆 / 东亚出口延迟是 hard blocker,作者没在文档里写明。
- ⚠️ 风险信号:description 一句 "i. am. speed." + 没有 license 文件 + Browser Use 云 waitlist 主导整个 README 顶部 —— 这是一个"开源 demo + 商业引流"组合仓,不是"我能直接 clone 下来在本地跑通"的项目。要先判断自己愿不愿意在 Browser Use Cloud 上跑。
- 横向对比:vs [browser-use/browser-use](https://github.com/browser-use/browser-use) 主仓(本身 star 远超本期),jev-ultrafast 是它的"决策 backbone 用 Jev"的实验分支,等于把"主仓的 LLM 决策模块"换成"TypeSafe Jev"。vs Stagehand / Skyvern / LaVague 类的"代码化浏览器自动化",差异在"这是一个 browser agent"而非"脚本化浏览器操作"。
- **适用场景**:**适合**:已经在用 Browser Use 体系、希望把"决策 backbone"换成一个**不生成 JSON / 不解析 JSON** 的小模型的工程团队;愿意先用云端 waitlist 试跑、不强求本地化的早期用户。**不适合**:强本地化 / 离线部署需求的团队;中国大陆出口用户(网络延迟是硬 blocker);希望保持 license 清晰的合规项目(仓里没有 license 文件)。

**2. [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction)** ⭐5,170
- 一句话:Claude Code 的插件,用自己的 npm 包,改写 Claude Code 默认的 "compression summary" —— 不再让 LLM 把旧对话总结成一段话,而是把每条 tool_use / tool_result 让 Jev 评分,丢的丢、截的截,保的全部保留原文字。
- 仓库元数据:TypeScript · size 245 KB · 创建 2026-09-17 · 最近 push 2026-09-18 · License 缺省 · Claude Code plugin 结构(`hooks/` + `.claude-plugin/` + npm package `src/`),也可以单独当 npm 包使用。
- 核心价值:①"**不摘要,只删**" —— 它把上下文"压缩"理解成"在 Jev 看完全部对话后,删除 Jev 判定不再需要的 tool_use + tool_result,其余原样",完全不调用 LLM 重写。②固定三阶段裁剪策略:`tool_use` 的 input 先截到 1000 字符,再截到 200,再截到 60,全程 Jev 评分决定是否还需要。③ Claude Code 内置的 compactor 改写 summary 会丢路径、丢错误码、丢约束、丢命令名——这个插件显式声明"我从不重写,只删",把"事实保真"当做卖点。④可以作为独立 npm 库被集成到其他 LLM 客户端。
- ✅ 实战信号:[issue #72](https://github.com/tamaratran/fast-jev-compaction/issues/72)(已 closed)由用户 `royalskynet` 提报"headless install 下没有持久化记录 compaction 走的哪条路径,`ui.log` + `ui.toast` 只在 TUI 看得到,grep session 转写找不到 hook 自己写的日志"。作者把这条标 closed 并在本仓库下挂了"first patched locally, would rather not add to your queue"的实践反馈(该用户已经按本仓的代码打了本地 patch)。信号:这确实是个**用户能自己 fork 解决**的工程问题——这种"用户主动自己补 patch"的反馈比单纯"好用"更能说明项目工程成熟度。
- ⚠️ 风险信号:[issue #73](https://github.com/tamaratran/fast-jev-compaction/issues/73) "[DSH 用户可以看一下这个:dsh-fast-jev-compaction]"——这条 issue 标题像是被引到了用户私域(DSH = 某个组织缩写),意味着这个仓可能是 DSH 内部的项目被作者开源出来,这种"内部项目开源后被原组织成员反向认领"的 issue 标题是弱信号。另 [issue #70(被 #72 替代前)](https://github.com/tamaratran/fast-jev-compaction/issues/73) 标题暗示"Repeated compaction: the candidate set never covers what accumulates, and `< 25%`" —— 表明作者对"积分低于 25% 才丢"这条阈值是反复调的。
- 横向对比:vs Claude Code 内置 compactor —— 内置走 LLM 总结;这个插件不走 LLM,只走 Jev 评分 + 删。vs LangChain / LlamaIndex 的 "ConversationSummaryMemory" —— 都是 LLM 摘要范式;本工具显式标"我不要摘要,保真"。
- **适用场景**:**适合**:Claude Code 重度用户、长 session 经常被默认 compression 截断的工程团队、需要**保真**而非**摘要**的合规 / 排错场景;愿意在自己的 session 上挂 hook 的用户。**不适合**:不写 hook / 不能让 agent 调外部决策 API 的合规场景、没有 TypeSafe API key 的纯本地用户(plugin 强依赖 Jev 的决策 API)。

**3. [TheoLeeCJ/SemIf](https://github.com/TheoLeeCJ/SemIf)** ⭐2,444
- 一句话:复刻 TypeSafe Jev 的"接口范式"但用开源模型 —— "我跑一个 4B 开源模型,在浏览器里直接给出 typed decision,不要等位表,不要 JSON repair"。前身叫 `OpenJev`,特意改名 + 加 disclaimer 声明"独立项目,不从属于 TypeSafe / Jev"。
- 仓库元数据:Python · size 9,177 KB · 创建 2026-09-16 · 最近 push 2026-09-19 · License 缺省 · README 顶部第一段就是"Wow! No waitlist. Run it in your browser today."——这句话和上一条 [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast) 顶部 "Browser Use Cloud waitlist is open" 形成强对比(SemIf 用反 waitlist 当卖点)。
- 核心价值:①"**typed option probabilities 直接读**"——不调用 chat model 写句子、不需要 JSON repair、不需要解码循环;模型直接给某几个枚举选项的概率分布,程序立刻拿来当 `if` 用。② WebGPU demo —— 真的在浏览器里跑 4B 模型,不需要服务器。③ MiniCPM5 2B + Qwen3.5 4B 都接入了,[issue #16](https://github.com/TheoLeeCJ/SemIf/issues/16)(Fast Vision) 显示作者正在接入 Bonsi 这一类小型视觉决策模型。④ README 显式声明"我重现 Jev 的接口范式,不重现其未公开的训练 / 模型",边界清楚。
- ✅ 实战信号:[issue #17](https://github.com/TheoLeeCJ/SemIf/issues/17) "Softmax ? DeepSeek Alt ?" —— 用户 `NicolaiLassen` 自己做了 calibration:在模型输出上加了 softmax 调整并贴出实测图(1710×1386 calibration plot),这个反馈是对 SemIf 的"接口范式"做工程延伸,等于用户已经在用 SemIf 接自己的 calibration 步骤。信号:SemIf 的接口够底层,可以被工程化扩展。
- ⚠️ 风险信号:[issue #16](https://github.com/TheoLeeCJ/SemIf/issues/16) "Fast Vision"目前 7 条评论,作者自己回"做通了 Bonsi 模型 for images,代码在 https://github.com/NicolaiLassen/open-bonzi-jev/tree/main"—— 注意 `NicolaiLassen` 借这个 issue 当自己衍生仓的发布栏,这是小开源项目的"借势发布"模式,不一定代表该项目工程稳定性,但本身无害。
- 横向对比:vs [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast) —— 后者把 Jev 当 backend(必须用 TypeSafe 云);SemIf 把"接口范式"重构成可本地跑、可用开源模型替换的本地路径。vs 直接调闭源 chat model + 写 prompt 解析 JSON —— SemIf 显式声明"不做 JSON repair",这是范式差异。
- **适用场景**:**适合**:不想被 TypeSafe API 锁定、希望在浏览器或本地 GPU 上跑 typed-decision 的研究者 / 工程师、要把"决策"嵌入不联网产品的人。**不适合**:需要 Jev 私有训练范式复现的研究者(README 显式声明复刻的是接口,不是训练);没有 GPU 想跑 4B 模型的纯 CPU 用户(WebGPU 路径需要现代浏览器硬件)。

**4. [mcncarl/jianying-headless](https://github.com/mcncarl/jianying-headless)** ⭐1,980
- 一句话:把剪映专业版 macOS 11.5.0 / 11.4.2 跑成"headless"——结构化剪辑计划 → 可编辑草稿 → 多轨工程副本 → 本机剪映引擎导出 MP4,Python CLI + Agent Skill 双形态。
- 仓库元数据:Python · size 10,514 KB · 创建 2026-09-15 · 最近 push 2026-09-20 · License 缺省 · 文档针对 `剪映专业版 macOS 11.5.0` 适配,11.4.2 兼容。Hypit 协作案例:50.23 秒 IG 动画教程,原 39 份素材 → 23 条轨道 / 154 个片段,本机导出 1507/1507 帧检查通过。
- 核心价值:①"**素材与剪辑计划 → 可编辑剪映草稿 → 原生引擎导出**"三段式,不动用户已建工程(独立副本编辑),不模拟剪映(走原生导出)。② Python CLI + Agent Skill 双形态,适合 AI 工作流工程交接 / 批量草稿生成 / Agent 辅助剪辑。③支持视频分段 / 多轨组合 / 变速 / 音量 / 画中画 / 字幕 / 标题,导入本地素材(视频 / PNG / JPEG / GIF / 配音 / 音乐 / 音效),本地字体在副本里换字体。④基础动画只覆盖"线性关键帧" + 六类几何蒙版 + 叠化转场 + 轻微抖动 —— **不承诺"完全复刻剪映"**,只承诺"工程交接 + 原生导出"。
- ✅ 实战信号:用户实测遇到 a) 非 ASCII 路径沙箱规则失效(empty timeline input)+ b) MP4 `major_brand` 重复值被原生导出器拒收。11.5.0 仍是适配期,issue 报告人要求 must-match 安装身份与工具链、并不"保证任意电脑安装即用" —— 这条 issue 是工程边界诚实声明,信号正面(issue 列表由 `rank.py` 抓出来,标题包含 11.5.0 导出关键字)。
- ⚠️ 风险信号:Hypit 协作案例里 README 自己声明"**不是视觉无损转换** —— 特殊字体、逐词颜色动画、部分裁切与阴影未原样保留,第 37 秒补充画面也存在差异"。完整主观视听验收尚未完成。这不是"功能缺失",而是"作者主动声明当前进度",对生产可用性需要谨慎评估。
- 横向对比:vs 任何"脚本化剪映"项目(基本没有直接对位项目) —— jianying-headless 把"剪映 headless 化"做成了端到端管线。vs CapCut(国际版)的 API——剪映国内 / 国际版本号不是一一对应。vs Hypit / Captions 这类 AI 自动剪辑 SaaS —— 后者是云端 AI 决定,本工具是"我用 AI 出剪辑计划,最后落剪映原生工程",边界清楚。
- **适用场景**:**适合**:剪映专业版 macOS 重度用户、AI Agent 接出来的剪辑计划交付给真人 / 团队、需要批量产"可二次修改"草稿的内容流水线、本机硬跑(不上云)的工程团队。**不适合**:只做轻量剪辑的普通用户(装剪映 + 自己剪比配这环境快);需视觉无损转换的高级动效(逐词颜色动画 / 阴影等);依赖剪映云协作的场景。

**5. [mizorewww/laya-mlx](https://github.com/mizorewww/laya-mlx)** ⭐1,677
- 一句话:把"typed decision" 跑在 Apple Silicon 的原生 MLX 上 —— 中文 README 注明"中位端到端 13.4ms 一个英文短决策,多语 checkpoint 7.4ms,**0 输出 token**",不调 PyTorch、不调 Transformers runtime、不上云。
- 仓库元数据:Python · size 5,750 KB · 创建 2026-09-19 · 最近 push 2026-09-19 · License 缺省 · 10 个 topics:`apple-silicon · decision-model · inference · laya · local-ai · machine-learning · mlx · modernbert · system-one · typed-decisions`,中文 README 双语。HF 上权重 `huggingface.co/aac6fef/laya-mlx` 可下。
- 核心价值:①"**决策 = 0 output tokens**" —— 它跑的是 ModernBERT 风格的 encoder-only 模型,直接读分类头的概率,**从不进入 decode 阶段**;README 反复强调"out of the box 13.4ms on M3 Max"。②同作者一周内连发 2 份(参看 #24 [mizorewww/laya-coreml](https://github.com/mizorewww/laya-coreml)),分别针对 MLX 和 Core ML 两条 Apple Silicon 路径,Neural Engine 端口可达 ~5ms。③ Snake demo 把 Laya 当 agent 的 decision backbone,snake 一帧调一次 Laya 决定 move —— 不是"加速 benchmark",而是真把这个模型当 agent 的"决策模块"用。④ repo 内有 `BENCHMARKS.md` + `SNAKE_DEMO.md` + `SNAKE_BENCHMARKS.md`,三档 benchmark 文档化分得很细,且每条 benchmark 都注明"测的是什么 / 不测的是什么"。
- ✅ 实战信号:[issue #1 "Training"](https://github.com/mizorewww/laya-mlx/issues/1) 开 issue 讨论训练流程(开放讨论、零评论)——表明这个仓是一个"推理就绪,训练开源"的工程化决策模型;同仓由同作者衍生 [laya-coreml](https://github.com/mizorewww/laya-coreml) 把 Neural Engine 这一条路径打开。
- ⚠️ 风险信号:无 license 文件(README 提到 weights 在 HuggingFace,model card 上 license 需自行确认);`size < 15KB / language 为空`的仓在 `rank.py` 里被剔除,本仓 size 5750KB、语言 Python,正常上榜。
- 横向对比:vs [jaredpalmer/kev](https://github.com/jaredpalmer/kev)(#7) —— kev 是 0.8B / 4B / 9B 三档、由 Qwen3.5 后训练、自己训自己跑;laya-mlx 是 encoder-only 跑 ModernBERT 风格、由 MLX 推理、跑得更快(13.4ms vs 几十 ms)。同一生态位两套不同实现,定位差异在"决策模型本身的架构选择",不是"Jev 是否能用"。vs llama.cpp + GGUF 本地决策 —— llama.cpp 是 decoder-only,本仓走 encoder-only,延迟路径不一样。
- **适用场景**:**适合**:Apple Silicon(M3 / M4 Max / Ultra)上有"低于 20ms 决策延迟"硬需求的本地 agent / loop 控制系统、要避开 PyTorch 加载成本的边缘场景。**不适合**:Windows / Linux 用户(MLX 是 Apple-only);需要"LLM-style 多 token 输出"的场景;没有 HF 权重下载条件的开发环境。

**6. [jarrodwatts/jev-trader](https://github.com/jarrodwatts/jev-trader)** ⭐1,529
- 一句话:Monad block 节奏的链上交易 bot,Jev 决策"买/卖/不动",每个 Monad block 真的在 Kuru MON-USDC 上挂 post-only 单,挂在买一 / 卖一内侧 1 tick,真实成交吃 spread 而不是付 spread。
- 仓库元数据:TypeScript · size 171 KB · 创建 2026-09-16 · 最近 push 2026-09-17 · License 缺省 · 已部署 dry-run:`https://jev-trader-production.up.railway.app`(`/` snapshot + `/history` last 1000 blocks + `/events` SSE 流);`MODEL=mock` 默认是动量启发,`MODEL=jev` + `TYPESAFE_AI_API_KEY` 才真用 Jev。
- 核心价值:①"**每 block 一次决策**"而不是每 N 秒一次决策 —— Monad 高频出块节奏下,Jev 用 TypeSafe 每次响应几百 ms,中间穿插 fill 监听 + cancel + replace。②"**bot earning spread**"的设计前提,不是"bot predicting direction":挂的是 post-only 单,**先吃别人 market order,不是追别人 market order**。③事件流 schema 在 `src/trader.ts` 完整定义,block 事件里同时有 decision + quote + fill 三个 slot,便于回测或前端可视化。④ dry-run 模式默认跑"真实盘口 + 真实 Jev 决策 + 模拟成交",等于用户不需要先入金就能跑通整条管线。
- ✅ 实战信号:[issue #1 "It's losing money"](https://github.com/jarrodwatts/jev-trader/issues/1)(💬 4 评论):用户在 dry-run 模式下跟踪了一段时间,发现 bot 在某些 block 是亏钱的。首条评论 `OJagora`:"I think that's the funniest issue I've ever read on github" —— 这个标题 + 回复足以说明 jev-trader 是"工程诚实"风格的项目而不是"假装稳赚不赔"。信号:开源交易 bot 大多回避"亏钱"事实,这条 issue 把"它就是一个会亏钱的实验"显式化了。
- ⚠️ 风险信号:dry-run 模式默认,意味着默认情况下不入金也能跑,但 README 没明示"用它做实盘要承担亏钱风险"。license 缺省。`MODEL=mock` 是动量启发而不是 LLM —— 默认部署其实不调 API,要看真 Jev 行为必须自己配 key。
- 横向对比:vs [jaredpalmer/kev](https://github.com/jaredpalmer/kev)(#7) —— kev 是本地决策模型,可以离线跑;jev-trader 是云端决策 + 实盘 / 模拟对比。vs hft-bot / freqtrade 这类传统 trading bot —— 后者多为 C++ / Python + 自定义 strategy,本工具是 TypeScript + TypeSafe 决策 API + 高频 block 节奏,定位不同。vs 任何"AI 代币推荐 bot" —— 本仓**不是**"推荐买什么",而是"在已知盘口上做执行决策"。
- **适用场景**:**适合**:研究链上决策模型在高频出块链上的可用性 / 延迟下限的交易研究者;愿把 TypeSafe Jev 当 decision backbone 的工程团队。**不适合**:缺 TypeSafe API key 的纯本地用户;用真金白银做实盘的散户(这是实验性的 project;首条 issue 已经盖章 "It's losing money")。

**7. [jaredpalmer/kev](https://github.com/jaredpalmer/kev)** ⭐1,028
- 一句话:基于 Qwen3.5 的 0.8B / 4B / 9B 三档"小型决策模型 family",既给预训练权重,又给训练代码(Apache 2.0),接口对齐 TypeSafe System One,所以同一份 Python SDK 既指 kev local serve 也指 TypeSafe 云端。
- 仓库元数据:Python · size 23,550 KB · 创建 2026-09-17 · 最近 push 2026-09-21 · License Apache-2.0 · 5 个 badge 同时打(weights / eval suites / research log / license / CI);HF 上 `huggingface.co/collections/jaredpalmer/kev-6aad9d0ea49f2589665e07cd` 整套 weights 可下;README 第一行说 "Based on the architecture described in [Jev's Architecture Unmasked](https://archerhume.com/posts/jevs-architecture-unmasked)"。
- 核心价值:①"**API match**":kev 本地 serve 出的接口和 TypeSafe System One 一致,所以切换"云端 Jev / 自部署 kev"只要改一个 endpoint,这就是 Apache 2.0 + interface alignment 给出来的真实可迁移性。②三档 size(0.8B / 4B / 9B)+ 冻结 eval suite —— 意味着买 4B 跑起来不会"突然哪天作者改了跑分标准后性能变了"。③研究日志在 `PLAN.md`:冷启动、超参、失败 case 全留底,这种"用 PLAN.md 当 blog"的做法在开源模型仓里越来越常见。④"我承认我训得不像 Jev 那么强,但我可以本地跑",这是 Apache-2.0 + Qwen3.5 base 的明确边界。
- ✅ 实战信号:[issue #8 "deadline fails at date subtraction, not at the readout — day-count injection takes it 0.57..."](https://github.com/jaredpalmer/kev/issues/8)(💬 3):首条评论 `3x3xX3N0N` 写"very cool research dude keep up the good fight!!!" —— 偏打气而非具体技术反馈。另 [issue #6 "ValueError: state exceeds 384 tokens: 550"](https://github.com/jaredpalmer/kev/issues/6)(已 closed):state 超过 384 tokens 直接 raise —— 384 是 kev 在演示用的 max length,但用户实测发现 21 字段的事实结构、几个 deadline 一起注入就冲破 384,这个 issue 直接驳到了"kev 上下文宽度不开放"的硬边界。
- ⚠️ 风险信号:[issue #6](https://github.com/jaredpalmer/kev/issues/6) 关掉前,作者没有把 max length configurable,意味着任何"schema 大一点(决策字段数多、有复杂 state)"的场景都要改源码。384 token 上限是 demo 友好上限,不是 production 上限。
- 横向对比:vs [mizorewww/laya-mlx](https://github.com/mizorewww/laya-mlx)(#5) —— laya-mlx 是 13ms Apple Silicon encoder-only;kev 是 Qwen3.5 后训练,可云可本,可 9B 跑得慢也可 0.8B 跑得快。vs [featherless-ai/simple-jev](https://github.com/featherless-ai/simple-jev)(#26) —— simple-jev 是"把任意开源模型包成 jev endpoint"的工具,kev 本身就是"训好的端点"。vs TypeSafe Jev 闭源 API —— kev 是 open-weights + 接口对齐的替代品。
- **适用场景**:**适合**:已经在用 TypeSafe SDK 做开发、希望把"决策模块"切到自己训的本地权重的工程团队;做"小决策模型 family"对比评测的研究者(0.8 / 4 / 9 三档刚好画一个 size 轴)。**不适合**:指望直接训出"和 Jev 一样强"的模型的人 —— README 隐含承认 kev 是"开源实作而非训练方法学复刻";schema 字段 > 十几个 + token 上限要破 384 的生产场景。

**8. [nilbuild/page-mascot](https://github.com/nilbuild/page-mascot)** ⭐752
- 一句话:一个会盯鼠标、戳一下眨眼的 web 角色组件 —— 9 方向 × 9 表情两张 sprite 表,装上 Claude Code / Codex skill 后用 `/page-mascot` 一句话让 agent 给页面长一个吉祥物。
- 仓库元数据:TypeScript(README 写 React,但 license 缺;主分发走 npm `page-mascot`)· size 180,170 KB · 创建 2026-09-14 · 最近 push 2026-09-15 · License 缺省 · demo 在 `koboyo.com/page-mascot`(仓库外 demo site);**Claude Code / Codex skill 双安装**(`npx skills add nilbuild/page-mascot --skill page-mascot --global --yes`)。
- 核心价值:①"**两张 sprite 表 + 一个组件**" —— 内置 52 个角色,demo 页直接挑角色、下载两张 sheet,react import 进来就是 `<Mascot directions=... reactions=... />`。② **Agent skill 路径**:`npx skills add` 装上后,agent 看到 `/page-mascot <描述>` 就会自己生成 9 方向 × 9 表情、合成两张 sheet、检查不跳、然后挂到页面上。③ drawing 需要 image tool —— Codex 自带,Claude Code 走 OpenAI images API(`export OPENAI_API_KEY=sk-...`)。④ README 后半段直接给 `prompts.md` 引导词,任何 chat 模型直接吃也行。
- ✅ 实战信号:[issue #2 "PromptScript does not support global skill installation"](https://github.com/nilbuild/page-mascot/issues/2)(已 closed):**作者 `nilbuild` 自己**承认 PromptScript 装全局 skill 时报错(已附图),但 README 标"忽略这个错,skill 已经装好了"。这是"作者自首"型实战反馈,体现工程克制。
- ⚠️ 风险信号:[issue #1 "Add theme toggler to https://koboyo.com/page-mascot"](https://github.com/nilbuild/page-mascot/issues/1) 开 issue 后无评论、无 PR —— demo 页主题切换器是"未来计划",目前无确切进展。
- 横向对比:vs lottie / gif 动画角色组件 —— 后者只能播预设动画;page-mascot 把角色做成"盯着你 + 戳一下会反应"的交互式组件,稀缺度更高。vs 古早 Lottie 互动 React 库 —— skill 路径才是 page-mascot 的差异化。
- **适用场景**:**适合**:想要在产品页 / 落地页加一个有"交互感"角色的小型项目团队、已经在用 Claude Code / Codex 的 agent 工作流、希望"一句话让 agent 设计吉祥物并自动接入"的工程团队。**不适合**:有版权安全顾虑的企业落地页 demo 图(每个角色都是 OpenAI images API 现场生成的,版权链路项目方要自己审查)。

**9. [theoephraim/awesome-cloudflare-selfhosted](https://github.com/theoephraim/awesome-cloudflare-selfhosted)** ⭐741
- 一句话:一份专门收录"在 Cloudflare 账号里跑的开源应用来替代 SaaS" 的清单 —— Worker + D1 + R2 + `wrangler deploy` 即可一键替代 Calendly / Canny / Gmail 那类订阅服务。
- 仓库元数据:JavaScript · size 235 KB · 创建 2026-09-15 · 最近 push 2026-09-16 · License 缺省 · README 自带 17 个章节(Analytics / Auth / Blogs / Business / Chat / Email / Files / Link shorteners / Notes / Notifications / Uptime / Personal / Reuse + What belongs here + 项目 stats + 维护说明) · badge `awesome.re`。
- 核心价值:①"**审计方法公开化**"(docs/auditing.md):每个条目都不是复制 description,而是**从项目仓库的 LICENSE 文件读 license + 从 deploy config 读 bindings**,等于这份清单自带验证脚本。②"**自部署替代 SaaS**"标准明确 —— Booking 应用要替代 Calendly、Inbox 应用要替代 Google Workspace、Forms 应用要替代 Typeform,清晰对标 SaaS 的具体产品。③"**Cloudflare 全家桶覆盖**" —— D1, R2, Workers KV, Queues, Email Workers, Pages 等。④强维护承诺:`docs/auditing.md` + "checks passed / waiting on a maintainer" 自动 PR 验证(`github-actions[bot]` 在 candidate entries 下回评论)。
- ✅ 实战信号:[issue #15 "Audit misses Queues and Images bindings declared in wrangler.toml"](https://github.com/theoephraim/awesome-cloudflare-selfhosted/issues/15) 开 issue:"审计脚本没识别 wrangler.toml 里声明的 Queues + Images bindings"。信号:这个清单维护自动化(用 GH Actions 自动 verify)做得细,但仍有真实可抓出的边角。[issue #14 "Add: HarlonWang/loginbase"](https://github.com/theoephraim/awesome-cloudflare-selfhosted/issues/14) 由 `github-actions[bot]` 回复"checks passed ... waiting on a maintainer" —— 用 GH Actions 当 entry gate keeper,在 awesome-list 圈子里是少见的工程化做法。
- ⚠️ 风险信号:榜单刚发布 5-6 天,community 反馈层还在 bloom 中。LICENSING 数据读 的是仓库根 LICENSE 文件 —— 如果作者把 LICENSE 放在二级目录,审计会漏。
- 横向对比:vs awesome-selfhosted(主仓,综合自部署) —— awesome-selfhosted 不限定 Cloudflare,而且收录对象往往是 Docker + VPS 路径;awesome-cloudflare-selfhosted 显式收"Workers D1 R2 即可" 的应用,边界清楚。vs 类似 awesome-cloudflare-workers 之类的 GitHub topic 列表 —— 后者是 GitHub tag 自动汇总,不会做 license + bindings 审计。
- **适用场景**:**适合**:已经在 Cloudflare Workers 上写后端、想找"现成可替代 SaaS 的自部署应用"的个人 / 团队;愿意维护"小而美工具集"的开源贡献者。**不适合**:需要"重资源 + GPU + 大磁盘"的应用(Cloudflare 边界决定不行);不能接受"审计有可能漏" 的合规项目。

**10. [korcarc/text-humanizer](https://github.com/korcarc/text-humanizer)** ⭐736
- 一句话:多语言 LLM 改写管道,把 AI 文本"人化" —— DeepSeek LLM 改写 + 中间过中文 + Google 翻译 EN→TR 的多语回译路径,8 语言支持(英 / 日 / 中 / 韩 / 德 / 法 / 西)。
- 仓库元数据:Python · size 79 KB · 创建 2026-09-16 · 最近 push 2026-09-19 · License MIT · README 提供 EN + 中文 README-zh.md 切换。GitHub user-attachments 顶部 banner + 流程图,代码体量轻量(79KB 主体)。
- 核心价值:①"**DeepSeek + Google + 多语中间态**"组合 —— 与上期 W37 的 `[SpaceDudem/text-humanizer](https://github.com/SpaceDudem/text-humanizer)` 思路同源(都是"用多语回译打散 LLM 句法"),但本仓**有自己的 pipeline 配方**(中文为中间表示再过土耳其语),而非纯粹回译。②"**semantically-preserving**" README 自述,主张"先保证语义保真,再考虑句法扰动",与"绕开 AI 检测器"为目的但**前提是保持语义不变**。③支持 8 语言。④ MIT 协议(本次上榜 text-humanizer 类工具里唯一 license 清晰的一份)。
- ✅ 实战信号:仓库刚发 4-5 天,issue / PR 列表为空,目前是"README + 代码示例 + 多语 README" 状态,等社区反馈。但跟 W37 的 [SpaceDudem/text-humanizer](https://github.com/SpaceDudem/text-humanizer) 本周掉出(因窗口外 / stars 排序),意味着"AI 文本人性化"本周不是单仓,而是有 2 份独立实现。
- ⚠️ 风险信号:与同类工具同 —— "让 AI 文本不被检测出来"在学术诚信 / 招聘合规场景里伦理边界很清楚,MIT 协议让作者不背伦理责任,使用方自己判断;另 Google 翻译本身的速率限制跑大批量需注意。
- 横向对比:vs [SpaceDudem/text-humanizer](https://github.com/SpaceDudem/text-humanizer)(W37 第 4 名) —— 后者是"DeepSeek 改写 + 中间过中文 + 译土 + 可选日语 + 回译"四步,无"语义保真"约束声明;本工具 README 强调"语义保真",license 是 MIT 而非上期那份的 license 缺省。vs 商业 undetectable.ai / StealthGPT —— 商业是 SaaS 黑盒;本工具把每一步写在 README。
- **适用场景**:**适合**:内容创作者想把 LLM 起草草稿再过一遍"降低 AI 味"、跨语研究 paraphrase、需要 MIT 协议可商用工具的团队。**不适合**:学术诚信不允许 AI 文本场景、需保留原始措辞的法律 / 医疗文本。

### 完整前 30 表

| # | 仓库 | ⭐ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---:|---|---:|---|---|---|---|---|
| 1 | [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast) | 11,855 | agent | 新上 | Python | Browser Use × TypeSafe Jev 决策限定的浏览器 agent,8 op + 元素表索引化 | ✅ |
| 2 | [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) | 5,170 | agent | 新上 | TypeScript | Claude Code 插件,改 LLM 摘要为 Jev 评分删条目 | ✅ |
| 3 | [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya) | 4,106 | 其他 | 新上 | Python | laya typed-decision 早期版本(mizorewww/laya-mlx 同主线) | — |
| 4 | [TheoLeeCJ/SemIf](https://github.com/TheoLeeCJ/SemIf) | 2,444 | 模型 | 新上 | Python | 开源 4B typed-decision 复刻范式,WebGPU 跑 | ✅ |
| 5 | [mcncarl/jianying-headless](https://github.com/mcncarl/jianying-headless) | 1,980 | agent | 新上 | Python | 剪映专业版本地 headless 自动化,Python CLI + Agent Skill | ⚠️ |
| 6 | [mizorewww/laya-mlx](https://github.com/mizorewww/laya-mlx) | 1,677 | 模型 | 新上 | Python | Apple Silicon MLX typed-decision,中位 13.4ms · 0 output token | ✅ |
| 7 | [jarrodwatts/jev-trader](https://github.com/jarrodwatts/jev-trader) | 1,529 | agent | 新上 | TypeScript | Monad block 节奏链上交易 bot,Jev 决策 post-only 单侧 | ⚠️ |
| 8 | [jaredpalmer/kev](https://github.com/jaredpalmer/kev) | 1,028 | 模型 | 新上 | Python | Qwen3.5 后训 0.8B / 4B / 9B 三档决策模型 family,接口对齐 TypeSafe | ✅ |
| 9 | [nilbuild/page-mascot](https://github.com/nilbuild/page-mascot) | 752 | 设计 skill | 新上 | TypeScript | 鼠标跟随眨眼 web 角色组件,Claude Code / Codex skill 双安装 | — |
| 10 | [theoephraim/awesome-cloudflare-selfhosted](https://github.com/theoephraim/awesome-cloudflare-selfhosted) | 741 | 其他 | 新上 | JavaScript | Cloudflare 自部署替代 SaaS 的清单,审计 + GH Actions 自动 verify | ✅ |
| 11 | [korcarc/text-humanizer](https://github.com/korcarc/text-humanizer) | 736 | 模型 | 新上 | Python | 多语 LLM 改写管道,DeepSeek + 中文中间态 + EN→TR,8 语言 MIT | — |
| 12 | [jackwener/wx-cli-again](https://github.com/jackwener/wx-cli-again) | 698 | agent | 新上 | Rust | 微信本地数据 CLI(query / decrypt / export),wx-cli 重启 | — |
| 13 | [saragordic/window-sweaters](https://github.com/saragordic/window-sweaters) | 622 | 其他 | 新上 | C | macOS 菜单栏 app,给窗口穿针织花边 | — |
| 14 | [githubnext/localjev](https://github.com/githubnext/localjev) | 613 | 其他 | 新上 | — | Jev 本地化 GitHub Next 出品 | — |
| 15 | [yibie/awesome-jev](https://github.com/yibie/awesome-jev) | 610 | 其他 | 新上 | Python | Jev / TypeSafe / System One 生态项目精选列表 | — |
| 16 | [v-modal/awesome-jev-tools](https://github.com/v-modal/awesome-jev-tools) | 549 | 模型 | 新上 | — | awesome-jev 类工具集合 | — |
| 17 | [letorig/video-generator-client](https://github.com/letorig/video-generator-client) | 541 | agent | 新上 | Python | Seedance / Kling / MiniMax / Wan 视频生成异步 Python 客户端 | — |
| 18 | [pallavi-shekhar/ai-engineering-interview-questions-company-wise](https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise) | 519 | 模型 | 新上 | Markdown | AI 工程师面试题公司维度速查表 | — |
| 19 | [gylive/ccodex-sleep-state](https://github.com/gylive/ccodex-sleep-state) | 483 | 其他 | 新上 | Go | 改善 Codex 降智 / 限流 + 体验,本地一键启动 | ✅ |
| 20 | [newliver666/apk-reverse](https://github.com/newliver666/apk-reverse) | 473 | 其他 | 新上 | Python | Android APK 反编译分析工具 | — |
| 21 | [incoai/splash](https://github.com/incoai/splash) | 453 | agent | 新上 | Python | Apple Silicon 本地 LLM 推理引擎 + speculative decoding | — |
| 22 | [thruwire/foreman](https://github.com/thruwire/foreman) | 439 | agent | 新上 | Python | 基于 TypeSafe Jev 的软件工厂工头 | — |
| 23 | [QwenLM/Qwen-Image-2.1](https://github.com/QwenLM/Qwen-Image-2.1) | 414 | 模型 | 新上 | Python | Qwen 官方最强开源图像生成模型 | — |
| 24 | [mizorewww/laya-coreml](https://github.com/mizorewww/laya-coreml) | 398 | 模型 | 新上 | Python | laya-mlx 同作者,Apple Core ML + Neural Engine ~5ms | — |
| 25 | [AbdelStark/awesome-typesafe](https://github.com/AbdelStark/awesome-typesafe) | 392 | agent | 新上 | CSS | TypeSafe / System One / Jev 精选资源列表 | — |
| 26 | [featherless-ai/simple-jev](https://github.com/featherless-ai/simple-jev) | 392 | 模型 | 新上 | Python | 把任意开源模型转 jev endpoint | — |
| 27 | [unicodef1wn/grokbot-field-notes](https://github.com/unicodef1wn/grokbot-field-notes) | 389 | agent | 新上 | Python | xAI Grok Bot 72 小时实战的 rules / playbooks + AGENTS.md 模板 | — |
| 28 | [kvmem/kvmem-llama.cpp](https://github.com/kvmem/kvmem-llama.cpp) | 373 | 模型 | 新上 | C++ | KVM 内存页管理的 llama.cpp 推理分支 | — |
| 29 | [Haleclipse/CometixCode](https://github.com/Haleclipse/CometixCode) | 346 | 其他 | 新上 | Rust | Rust 重写 Claude Code 终端 UI(基于 iocraft) | — |
| 30 | [niedachu/MateriaSim](https://github.com/niedachu/MateriaSim) | 303 | 其他 | 新上 | Python | 材料科学计算 + AI 决策辅助 | — |

> 表注:榜单按 `rank.py --route weekly` 输出,周 38 全部 30 条新上;`#3 NandhaKishorM/laya` 是同主线 laya 早期版本,在 `rank.py` 里 `deep_targets=否` 没进详深挖。详细深挖只覆盖前 10 名(详深挖[1]—[10])。

### 数据方法

- 数据口径:GitHub Search API `search/repositories?q=created:2026-09-14..2026-09-20+archived:false+(ai+OR+llm+OR+agent+OR+mcp+OR+assistant)+in:readme&sort=stars&order=desc&per_page=50`,窗口取上周一~上周日(UTC 自然日);排序为当前星降序。
- 过滤:`rank.py --route weekly` 剔除 1 条 adult 标记空壳仓,保留 Top 30。
- 来源:GitHub Search API(主名单)+ 项目 README / issues(深挖信号);HN / Reddit / 趋势页因接口限流或封禁未参与本期。
- slug:github-weekly-2026-W38;上一期 W37 文章单独看 Top N 详深挖,不交叉引用。
