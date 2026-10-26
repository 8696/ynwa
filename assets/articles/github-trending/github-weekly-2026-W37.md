## 2026-09-07..2026-09-13 · AI/agent/LLM 热门

> 本期为 W37 周榜快照。窗口期 7 天,共命中 100 个候选仓库,经 `rank.py` 过滤后保留 30 条;Top 1 单仓 ⭐1166,Top 30 门槛 ⭐216。

### 核心信号

- **"Agent Skill + Claude Code/Codex" 形态在 W37 完全主导**:Top 30 中至少 7 条是 skill 形态(配 `npx skills add` 或 `~/.claude/skills` 安装),涵盖 [anything2explainer](https://github.com/Vincentwei1021/anything2explainer)(主题→讲解视频)、[dream-loop](https://github.com/achimala/dream-loop)(AI 自我纠错做游戏/3D)、[reelbench-skills](https://github.com/eternityspring/reelbench-skills)(拉片+视频叠分镜)、[gongwen-gbt9704-skill](https://github.com/mizzlelover/gongwen-gbt9704-skill)(中文公文排版 GB/T 9704)、[short-video-generator-AI](https://github.com/Colafornia/short-video-generator-AI)(YouTube→9:16)。Agent Skill 在 W34-W36 还是冒头,这一期彻底吃下大半个 Top 10。
- **anything2explainer 独占 \(\#1\)**:W37 单仓 ⭐1166,比第二名(966)高 200 星,比第 10 名(521)高出一倍以上,且是当前 Top 10 里唯一对"工程交付质量"做了端到端封装的项目(9 阶段 + 4 checkpoint + QC + 完整 reference 影片)。Claude Code / Codex skill 形态对"内容批量产线"的标准化走到了第一个完整版本。
- **iPhone Duo → MacBook**:[sumimakito/Mac-Duo](https://github.com/sumimakito/Mac-Duo) 把 iOS 17 的"Duo 透视+倾斜+模糊+变暗"效果移植到 macOS,接 lid angle sensor + Metal + ScreenCaptureKit。W37 内单仓 792⭐,是这周"AI 主题"里为数不多的"非 LLM 桌面工具"上榜代表,体现了 Top 30 题材宽度的回归。
- **多语回译 + LLM 的"AI 文本人性化"赛段成型**:[SpaceDudem/text-humanizer](https://github.com/SpaceDudem/text-humanizer) 用 DeepSeek + Google + DeepL 串成一条 4 步管线(原语→译中→译土→译日→回译),支持 8 语言,主打"绕开 AI 检测器"。类似思路的工具(undetectable.ai / StealthGPT 等)一直有,但本周是开源实现的第一个有 README 表格化承诺的版本。
- **W36 30 条全部掉出、W37 30 条全部新上**,这是窗口性质决定:周榜口径只取窗口内新创建仓库按当前总星排序,老仓上周掉出后本周不会"再上榜"。本质不是"全部掉出",而是"新一周新名单"。下一期继续观察才能谈 staying。
- **中英文项目分布:Top 30 内英文项目 24 / 中文项目 6**。中文项目集中在 #7 公文排版、#6 viserys-agent、#11 RhineLabUI(明日方舟莱茵生命档案终端)、#14 INSLIB(惯导)、#22 printfilm、#27 routeVSCODE。Agent Skill 类目里中文项目密度更高(#5 short-video-generator-AI 题材中文为主)。
- **基础设施突破同步落地**:[ArasTey/lunel](https://github.com/ArasTey/lunel) 把 RVG Gateway 的代理核心拆出来,修了一组真实存在的安全 bug(xHTTP 会话劫持、内存 DoS、统一配额引擎、日志 secret redact)后,补出完整的 Console/Worker 控制面,默认 PostgreSQL 即可一键上线;[unstablebuild/rune](https://github.com/unstablebuild/rune) 把"GPU 渲染的键盘驱动 IDE"做成独立产品形态,Agent 走 `cmd/rune-agent` 扩展、核心编辑器不带 AI。两者都不是"AI 应用",而是"AI 时代开发者想要的新基建"。
- **论文级与评测级并存**:[yifanzhang-pro/recurrent-looped-tranformer](https://github.com/yifanzhang-pro/recurrent-looped-tranformer) 提交了一份独立论文(2026-09-12),主张"潜在推理 + 无限时序深度",48 encoder + 48 decoder,在 parity/5-state tracking 上 4× 训练长度仍 60.8%/20.7%;[openaiotlab/CUHK-X](https://github.com/openaiotlab/CUHK-X)(MobiSys 2026)和 [zjwzcx/Awesome-Astra-Embodied-AI](https://github.com/zjwzcx/Awesome-Astra-Embodied-AI) 同期提交评测基准。论文/基准和工程落地一起进榜,是这期"AI 主题"的少见组合。

### 重点深挖

**1. [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer)** ⭐1,166
- 一句话:Claude Code / Codex 的 skill,把任意主题做成黑底 + TTS 旁白 + 字幕 + 章节进度条的讲解视频,每帧都用 Remotion(React + TypeScript)代码绘制。
- 仓库元数据:TypeScript · size 15,425 KB · 创建 2026-09-08 · 最近 push 2026-09-13 · 18 个 topics(ai-video · claude-code-skill · codex · motion-graphics · multi-agent · remotion · tts 等) · License: PolyForm Noncommercial 1.0.0。
- 核心价值(从 README 前 80 行提炼):① "**方法 + 模板 + 参考片**"三件套打包——`template/` 给出可编译的 Remotion 4 项目,`reference/` 给出写给 agent 的样式 / 动效 / 镜头 / 故事板 / 研究 / QC 6 类规范,`examples/rag/` 给出完整 RAG 与知识库参考片的全部 paper trail(研究 → 旁白 → 故事板 → 镜头源 → QC 报告 → 交付备注)。② 多 agent 分工协议——9 阶段流水线(脚手架 / 研究 / 旁白与时间轴 / 故事板 / 图层 / Pilot / 并行 build / 渲染 / QC),2–14 个并行 agent 按 5–7 镜 / agent 拆任务。③ "**4 个 checkpoint**"代替"一路冲到底"——长度与语言、旁白定稿、旁白引擎、前 30s 风格审片;每个 checkpoint 提前介入,锁错一处重做的成本最低。④ 黑底 + 白色线稿 + 紫色点缀 + 超粗标题——这是从抖音 @图灵宇宙 学来的视觉语言,但所有素材都重新代码绘制、不复用任何原片帧。⑤ 完整交付:1280×720 @ 30fps H.264 MP4,字幕按词边界对齐,章节进度条 + 顶部 HUD + 可选 pipeline rail。
- ✅ 实战信号:[issue #6](https://github.com/Vincentwei1021/anything2explainer/issues/6) 由 DHCatLaw(LawMay P.C. 美国小型律所)提 closed,问题是"用于中文 U.S. 法律科普视频是否可商业授权"。作者 Vincentwei1021 直接回复"愿意讨论书面授权,请邮件到 vincentwei1021@gmail.com 并附使用范围 / 集成方式 / 渠道说明 + 回链本 issue"。实战反馈:商业使用要走私下邮件授权,作者对授权态度是开放但要个案谈,不是拒绝。
- ⚠️ 争议信号:同源 [issue #5](https://github.com/Vincentwei1021/anything2explainer/issues/5)(中文教育自媒体 qqli66 提出抖音/视频号/小红书/微信公众号商业授权)同样 closed,作者回复"可以给我发个邮件说明下具体需要商业使用的范围"。两起都是"已正面回应、未公开授权条款",README 仅一行 PolyForm Noncommercial 文字,等于事实上的"按项目授权"。
- 横向对比:同类主要有四档——Sora/Veo/Runway 这一档是生成式视频模型(像素级合成,确定性差、改不了单帧);HeyGen/Synthesia 是数字人讲解(不是 motion-graphics);手写 Remotion / Motion Canvas 是裸工具(没有方法 + 研究 + QC);Manim 是 Python 数学动画。anything2explainer 的差异点是"agent-driven 端到端管线 + React/TS 而非 Python + TTS 字幕按词边界对齐 + QC 报告"四件打包。
- **适用场景**:**适合**:做技术/科普讲解视频、希望"按周出片"的独立创作者或团队、已经用 Claude Code / Codex 做工作流的人。**不适合**:商业产品宣传片(PolyForm Noncommercial + 需个案授权)、需要 9:16 竖版的短视频(模板目前只有 1280×720 landscape)、需要数字人 presenter 的场景。

**2. [achimala/dream-loop](https://github.com/achimala/dream-loop)** ⭐966
- 一句话:一个让 AI 反复自我纠错的 agent skill——AI 先"想象"一张高质量目标截图,然后写代码,另一个 AI 评审对照目标给反馈,直到评审满意,可触发"再想一张更好的"回到步骤 1。
- 仓库元数据:JavaScript · size 6,768 KB · 创建 2026-09-07 · 最近 push 2026-09-09 · License 缺省 · 4 条 PR(#1 typo / #2 缺 the / #3 #4 句末加句号,均 open)。
- 核心价值:①把"目标 vs 当前"做成一个**可计算差距**:每轮迭代都用 critic AI 看一眼实拍截图对比想象中目标,反馈写到下一步。②支持可选 Blender MCP——3D 场景比"计算机使用"结果更稳定。③README 自承"目前只在 GPT-6 Astra + Codex 上测过,Claude Fable 5.1 大概率也行",这个"模型局限"声明做得坦率。④示例 prompt(等距相机 + 体素风格 + 反射湿地 + 角色 + Elden Ring 暗黑奇幻 + Three.js + 60fps + 一小时)直接跑出 Vesper 演示 GIF 和线上 demo。
- ✅ 实战信号:作者 [@anshuc](https://x.com/anshuc) 在 README 自述 PR 须"附上 skill 跑出的 example 结果,以保证改动不回归性能",这是把"行为级 CI"内嵌到贡献流程里——dream-loop 自己用 dream-loop 评判 dream-loop。
- ⚠️ 风险信号:仓内无 issue,纯 PR(全 open),意味着这套循环目前只有作者一方的 demo,没有外部用户的对比反馈;且 README 自承"目前只在 GPT-6 Astra + Codex 上测过",其他模型复现性未知。
- 横向对比:vs OpenAI / Google 的"evaluator-optimizer" agent 模式同根;vs devin / aider 这类"AI 写代码、AI 改代码"的工具差异在"先想象再实现"——后者是"先写再修",dream-loop 把"想象"显式建模成 target screenshot,把"差距"变成 critic 的输入信号。
- **适用场景**:**适合**:图形/3D/可视化 demo 的一次性快速产出、教学演示、需要"惊艳视觉"且能承受若干分钟迭代的场景。**不适合**:任何有客观正确性的场景(代码 bug、性能问题)——dream-loop 适合"质量型"目标,不适合"对错型"目标。

**3. [sumimakito/Mac-Duo](https://github.com/sumimakito/Mac-Duo)** ⭐792
- 一句话:把 iPhone Duo 屏幕透视效果移植到 MacBook——合上盖子时屏幕画面倾斜、模糊、变暗,菜单栏可调。
- 仓库元数据:Swift · size 较小 · 创建 2026-09 上旬 · 已被 Moeru AI 团队赞助 Apple Developer Program(签名 / 公证)· License: Apache 2.0。
- 核心价值:①硬件层硬绑 macOS 14+ 的 lid angle sensor + 标注"必须是 macOS 标记为 built-in 的 sensor,外接显示器同名 sensor 被忽略",这点 README 写得直接,省得用户反复试。②渲染走 Metal + ScreenCaptureKit 实时抓内置屏,菜单栏控件可调透视角度以适配观看位置。③屏幕点击穿透到下层 app(不阻挡操作)——这是"Duo 是个视觉特效"的设计选择,不是 window。④要求 Xcode 16 / Swift 6.0+,`build.sh` / `--run` 重新构建需要重新授权屏幕录制权限。
- ✅ 实战反馈:open issue [#28](https://github.com/sumimakito/Mac-Duo/issues/28) 实战报告——"Start angle 设在 128–130° + Timeout off(默认)+ 用户的 MacBook lid 最大开角只有 132°"会让效果在任何正常工作角度都激活、永远不释放,整屏被冻住的快照覆盖。Issue 报告人补充:相关 [#12](https://github.com/sumimakito/Mac-Duo/issues/12) 已经定位是 hysteresis(滞回)逻辑的锅,[#9](https://github.com/sumimakito/Mac-Duo/issues/9) 给出修复提案;当前修复尚未合入 main,所以这个 fatal band 在多个设备上仍存在。Issue [#21](https://github.com/sumimakito/Mac-Duo/issues/21) / [#23](https://github.com/sumimakito/Mac-Duo/issues/23) 同方向:"切换简体中文不显示简体中文"——双语切换按钮不生效。
- ⚠️ 争议信号:无,但 [#28](https://github.com/sumimakito/Mac-Duo/issues/28) + [#21](https://github.com/sumimakito/Mac-Duo/issues/23) 两个 open 指出真实可复现的 UI 锁屏 + 国际化失效 bug,影响新上手用户。当前 issue 列表(28 / 24 / 23 / 21)几乎全是 lockout / i18n bug,而不是功能请求,说明项目核心功能稳但体验边缘未打磨。
- 横向对比:vs macOS 原生"近距感应 / 注视感知"——后者是隐私淡出而非透视倾斜;vs iOS 17 的 Live Activity 透视效果——前者是 iOS 端专属。Mac-Duo 是首个把 iPhone Duo 体验搬到 macOS 的开源实现,且直面 lid angle sensor 不通用问题做了硬件声明。
- **适用场景**:**适合**:经常在外用 MacBook(咖啡厅、地铁、飞机小桌板)的演示型用户(讲师 / 售前 / 演示者)。**不适合**:lid 最大开角 < 130° 且不想改 Timeout 的笔记本用户(锁屏 bug)、不装 Xcode 的普通用户(自己构建需要重新授权屏幕录制)、外接显示器用户(sensor 只看内置屏)。

**4. [SpaceDudem/text-humanizer](https://github.com/SpaceDudem/text-humanizer)** ⭐731
- 一句话:用 DeepSeek + Google + DeepL 串成 4 步管线,把 AI 文本改写成"更像人写的"——原语 → 译中(中间态)→ 译土耳其语 → 译日语(可选)→ 回原语。
- 仓库元数据:Python · size 62 KB(轻量) · 创建 2026-09-08 · License MIT · 8 语言支持(英 / 日 / 中 / 韩 / 德 / 法 / 西 / 越未在 README 列出但代码注释提到)。README 用一张 banner 图 + 一张流程图(都是 GitHub user-attachments)。
- 核心价值:①把"绕开 AI 检测器"做成**步骤化的多语回译**,不是单一模型改写——每一步引入不同语言的句法扭曲。②中间过一遍中文 + 土耳其语 + (可选)日语,等于把英文写作里的"典型 LLM 句法"彻底打散。③README 直接说"DeepSeek API key 必须,DeepL 可选,温度默认 1.3",配置透明。④轻量:62 KB、纯 Python,核心逻辑不在 weight 而在 pipeline 编排。
- ✅ 实战信号:README 写明"3 步 + 1 可选,每步独立配置,语言/温度/base_url 都可改"——这是把"AI detector 绕开"当工程而不是当魔法来做。仓库刚出几天、issue/PR 都为空,目前是"作者方声明 + 待社区验证"。
- ⚠️ 风险信号:这种工具的伦理边界很清楚——"让 AI 文本不被检测出来"在学术/招聘/合规场景里争议大。MIT 协议让作者不背伦理责任,使用方自己判断。另有 Google 翻译 / DeepL 翻译本身的 API 限速与成本,跑大批量时需考虑。
- 横向对比:vs 商业 undetectable.ai / StealthGPT——后者是 SaaS 黑盒(具体方法不公开),本工具把每一步都写在 README 里。vs 纯 prompt 工程("请用更口语化的方式改写")——后者只是词级调整,本工具把句法扭曲推到跨语言级别。
- **适用场景**:**适合**:内容创作者想把 LLM 起草的草稿再"过一遍"避免 AI 味道、语言学习者想看同一段文本在不同语言里的结构差异、研究跨语 paraphrase 的人。**不适合**:学术诚信不允许使用 AI 文本的场景、需要保留原始措辞的法律/医疗文本、不愿承担伦理边界的合规写作。

**5. [Colafornia/short-video-generator-AI](https://github.com/Colafornia/short-video-generator-AI)** ⭐719
- 一句话:把 YouTube 视频一键转成 9:16 短视频——faster-whisper 本地转写 → LLM 按"病毒性框架"(hook / 情绪峰值 / 观点炸弹 / 反转 / 故事高点 / 实用价值)给候选打分 → top-N 渲染竖版裁剪。
- 仓库元数据:Python · size 804 KB · 创建 2026-09-08 · License MIT · Provider 三选一(OpenAI / Gemini / MuAPI,Gemini 有免费额度但日限,OpenAI 付费,MuAPI 按次付费无订阅)。Issue 列表空。
- 核心价值:①替代 OpusClip / Vidyo.ai 的开源版,免订阅、免水印、无须预扣费。②LLM provider 三选一:有 GPU 调试环境可用 Gemini 免费档,有 GPU 算力可走 OpenAI,小批量按次付费可走 MuAPI,README 把免费 / 付费 / 按次三档写在同一张表里。③可选 `--hooks` 在切片开头生成上下文 hook(`--no-hook` 关闭);Web 版(`server.py` + `web/shorts-generator-ui.html`)支持队列 + 视觉化调参。④本地 Whisper (`tiny/base/small/medium/large-v3`) + `auto/cpu/cuda` 设备可调,`language` 参数强制指定。
- ✅ 实战信号:README 用三张视频截图作为成品示例("The Speech that Made Obama President" / "How Tom Overcame Social Anxiety" / "How to stay calm when you know you'll be stressed"),证明管线真的跑得通。Web 版额外提供队列接口,适合批量生产。
- ⚠️ 风险信号:项目刚发几天、issue/PR 全空,无社区实战反馈。LLM 选高光这一步"病毒性框架"是 README 的措辞,实际效果依赖 provider 模型质量;MuAPI 这个 provider 在主流 LLM 评测里出现频率低,生态透明度低。
- 横向对比:vs OpusClip(商业、闭源、订阅)——本工具开源免费但要自备 API。vs yt-dlp + Whisper + GPT-4o 自己手搓——本工具把"按 hook/peak/opinion-bomb/revelation/conflict/quotable/story-peak/practical-value 打分"打包成一个 prompt,等于把"什么是 viral"做了显式 rubric。
- **适用场景**:**适合**:内容再利用(把长视频 → 短视频)、YouTube to TikTok 跨发、有视频剪辑基础但不想每月付 OpusClip 订阅的创作者。**不适合**:YouTube 创作者明确反对切片二次发布的频道、需要"实时热点"而非"已有内容"的短视频生产者、对版权合规要求高的商用内容。

**6. [mizzlelover/gongwen-gbt9704-skill](https://github.com/mizzlelover/gongwen-gbt9704-skill)** ⭐572(赛道:模型 / 中文公文 / 跨平台 Skill)
- 一句话:把中文正式材料整理成符合 GB/T 9704-2012 的可编辑 DOCX——版心、字体、标题层级、文号、页码、附件、版记都按国标实现,支持 ordinary / formal(预印红头纸套打 / 完整电子红头) / 信函 / 命令(令)/ 纪要 / 横表 / 联合行文多种版式。
- 仓库元数据:JavaScript(Node + DOCX 生成)· size 65,261 KB(自带 fixtures / 截图证据)· 创建 2026-09-09 · 最近 push 2026-09-13 · License MIT · 跨平台安装(Codex / Claude Code / OpenCode / Trae Code / Trae CLI / Kimi Code CLI / Kimi Code / TraeWork / WorkBuddy / ZCode,Windows 默认复制、其余软链)。
- 核心价值:①"GB/T 9704-2012 逐条执行矩阵"(`references/gbt9704-audit-matrix.md`)把国家标准条款 → 自动生成 / 结构校验 / 必须人工复核 三类标注——清楚划清"机器能担的"与"必须人审的"。②红头场景独立分支:`formal` 默认预印红头纸套打,首页留白、不重绘红色机关标志和红线;`--letterhead digital` 才在 DOCX 绘制完整电子红头。③Word/WPS 兼容性:用"标题 1—4" + 大纲级别写样式,目标 Word/WPS 可直接"引用→目录"自动生成;`--require-standard-fonts` 阻止缺字体时静默替代。④`scripts/verify_gongwen_docx.mjs` + `tests/run_tests.sh` + `tests/visual-audit.sh` 跑 18 份 DOCX + 37 个 PDF 页面 + PNG 截图,完整视觉核验矩阵(`references/gbt9704-visual-audit.md`、`references/gbt9704-screenshot-evidence.md`)。

**7. [ArasTey/lunel](https://github.com/ArasTey/lunel)** ⭐564(赛道:基础设施 / 多协议代理平台)
- 一句话:从 RVG Gateway fork 出来的多协议代理平台,VLESS / Trojan / Shadowsocks AEAD 三协议统一通过 WebSocket(可选 xHTTP)中继,加 Console / Worker 完整控制面与 PostgreSQL 持久化,默认一键部署到 Lucity / Railway / Render。
- 仓库元数据:Python(FastAPI)· size 279 KB · 创建 2026-09-09 · 最近 push 2026-09-13 · License:核心代码 MIT,继承认可 RVG Gateway by codebox 的原有许可 · fork 数 1,425(本榜 fork 数远超其他项目,反映原始 RVG 社区基础)。
- 核心价值:①安全修复外化为"自带 chore 标签":xHTTP 会话劫持(改成 `(link, session_id)` 双键,不同 link 永不串流)、memory-DoS 限制(`seq_buf` + body + 全局/单链上限)、统一 QuotaGate(单条批处理自适应)、日志 secret redact(永不写入凭据 / token / UUID key)——这一组 fix 来自对原 RVG 实战的 review。②"fork and go"一键路径:仓库根作为单服务部署到任何支持 PostgreSQL + 公开域名的平台;开箱 admin/admin 账户(README 明示"首次登录后改"),`DATABASE_URL` 自动识别 PostgreSQL,GitHub OAuth 可选。③Lunel Core(Lunel Core 是 FastAPI 拼装的代理运行时) + Lunel Console(Console 是 GitHub OAuth + dashboard + 6 步部署向导 + 实时日志/连接/指标 + 域名管理 + 管理面板) + Lunel Worker(Worker 是节点代理,用 Docker 驱动隔离容器 / dev 驱动 rlimit 隔离进程,上报心跳/指标并反向代理流量)三件打包。④`docs/SECURITY.md` 单独写威胁模型 / 报告流程——这个做法在代理类项目里少见。
- ✅ 实战信号:[issue #2](https://github.com/ArasTey/lunel/issues/2) 标题"Hello from Lucity ;)"、内容为空——这是 Lucity 部署平台在仓库下"自荐式打招呼",意味着 Lunel 已被 Lucity 收录为推荐模板。
- ⚠️ 风险信号:代理工具的合规风险不在代码里,而在使用场景里——任何代理平台都可能被滥用,这是行业级问题。README 给了清晰的 threat model + report 流程,但本身不阻断滥用。

**8. [yifanzhang-pro/recurrent-looped-tranformer](https://github.com/yifanzhang-pro/recurrent-looped-tranformer)** ⭐525(赛道:模型架构 / 论文 + 仓库)
- 一句话:提交一份"潜在推理 + 无限时序深度"的 transformer 架构 + 实现论文(2026-09-12),48 encoder + 48 decoder,关键点是"上一个 token 的 decoder 终态进入下一个 token 的 merge,prompt–response 边界不清零",在 parity / 5-state tracking 上 4× 训练长度仍 60.8% / 20.7%。
- 仓库元数据:HTML(项目页 + 论文 PDF + figure)· size 4,109 KB · 创建 2026-09-12 · License Apache 2.0 · 1 个 open issue(issue #1 讨论 layerwise forwards 的实现细节)。
- 核心价值:①"**模型–硬件–RL 三协同**"作为设计原则——并行 causal encoder 批处理、memory reuse、activation checkpointing、预训练/SFT/采样/RL replay 用同一套完整状态转换(包括 prompt recurrence 与 decoder SWA cache)。②实验部分坦率声明"近似值,精确值未标;FLOPs 未对齐;合成任务小规模 POC,不代表大模型推理 / RL scaling 验证"——研究诚信到位。③RLT 在 parity 128 操作时 60.8%、5-state transition 128 操作时 20.7%,对比 Transformer 在同样长度 48% / 21%——RLT 优势主要在 parity 这种"可被记忆"的任务,5-state 这种"必须维持精准状态"的任务上提升有限。

**9. [eternityspring/reelbench-skills](https://github.com/eternityspring/reelbench-skills)** ⭐522(赛道:设计 skill / 视频拉片)
- 一句话:Claude Code / Codex 的 skill 集合——`video-shots` 用 ffmpeg 把视频切成逐镜头分析表(15 道质量门逐条对账),`video-sync` 把分镜信息叠到成片(横版上下叠、竖版左右并)。
- 仓库元数据:HTML(报告 demo)+ 一些 scripts · size 100,607 KB(包含 demo 报告与渲染数据)· 创建 2026-09-11 · 最近 push 2026-09-13 · License 缺省 · 零 npm 依赖 / 零 API key(README 明示)。
- 核心价值:①**单文件交互报告**:`shots-report.html` 离线双击即可打开,内嵌播放器同步高亮镜头、点镜头跳转、镜头节奏带、可搜索可筛选可排序的镜头表、首尾关键帧并排、统计分布、出场人物、QC 门——零外部依赖是给"导演 / 编剧 / 剪辑师看片"用的,而不是给工程师。②零 API key + 零 npm 依赖,只要求 `node ≥ 18` + `ffmpeg` / `ffprobe`(`brew install node ffmpeg`),意味着跑这条 skill 不需要订阅 / 不需要额度,适合长视频批量处理。③`video-sync` 输出:横版 1280×1296 上下叠分镜信息(`--scale 2` 放大原片 640×360),镜头切了信息跟着切、列表自动滚动高亮——这是给"剪辑讲解"或"复盘视频"准备的同款产物。

**10. [LBEILC/RhineLabUI](https://github.com/LBEILC/RhineLabUI)** ⭐472(赛道:非 AI / 明日方舟莱茵生命档案终端复刻)
- 一句话:对《明日方舟》特别映像「莱茵生命:访问」终端界面的非官方复刻——三维档案盒阵列 + 抽取 / 解密 / 阅读流程 + 内部结构 360° 拆解。TypeScript + Three.js + Vite,运行时不带 AI。
- 仓库元数据:TypeScript · size 136,577 KB · 创建 2026-09-07 · 最近 push 2026-09-12 · License 缺省 · 在线体验 `https://rhine.lubeiluchen.cc` · 配套 Wallpaper Engine 壁纸独立仓库 [RhineLabWallpaper](https://github.com/LBEILC/RhineLabWallpaper),已上 Steam 创意工坊订阅。
- 核心价值:①非 AI 选题能进 Top 10 极少——README 直接写"代码由 GPT-6 Astra 协助完成,模型通过 Blender MCP 制作",等于把"AI 怎么生成这个作品"当作产品元数据明牌。②覆盖范围:网页版 + Wallpaper Engine 版 + 三维档案功能(亮暗配色 / 自适应阵列 / 数字时钟 / 超级性能模式 / 模型与正文同步解密 / 清晰磨砂切换 / 360° 拆解重组)——一个原 PV 复刻从"网页交互"做到"桌面壁纸",再到 Steam 创意工坊订阅,产品化完整度高于一般 demo。③iPhone 可 PWA 安装(主屏幕图标、独立窗口、离线浏览档案与模型)——移动端覆盖也补齐了。

### 完整前 30 表

| # | 仓库 | ⭐ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---:|---|---:|---|---|---|---|---|
| 1 | [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer) | 1166 | agent | 新上 | TypeScript | Claude Code / Codex skill,主题→讲解视频(Remotion + TTS) | ✅ 实战 |
| 2 | [achimala/dream-loop](https://github.com/achimala/dream-loop) | 966 | agent | 新上 | JavaScript | Agent skill:AI dream 目标截图→实现→critic 对比反馈循环 | — |
| 3 | [sumimakito/Mac-Duo](https://github.com/sumimakito/Mac-Duo) | 792 | 其他 | 新上 | Swift | 把 iPhone Duo 屏幕透视效果移植到 MacBook,接 lid angle sensor | ⚠️ 已知 bug |
| 4 | [SpaceDudem/text-humanizer](https://github.com/SpaceDudem/text-humanizer) | 731 | 模型 | 新上 | Python | 多语回译(原→中→土→日→回)+ DeepSeek + Google + DeepL 的人性化文本 | — |
| 5 | [Colafornia/short-video-generator-AI](https://github.com/Colafornia/short-video-generator-AI) | 719 | 设计skill | 新上 | Python | YouTube → 9:16 短视频,Whisper 转写 + LLM 高光打分(替代 OpusClip) | ✅ 实战 |
| 6 | [rizqinrr/viserys-agent](https://github.com/rizqinrr/viserys-agent) | 628 | agent | 新上 | — | 详见仓库 | — |
| 7 | [mizzlelover/gongwen-gbt9704-skill](https://github.com/mizzlelover/gongwen-gbt9704-skill) | 572 | 模型 | 新上 | JavaScript | 中文公文排版按 GB/T 9704-2012,可编辑 DOCX,跨 10+ 平台安装 | — |
| 8 | [ArasTey/lunel](https://github.com/ArasTey/lunel) | 564 | 其他 | 新上 | Python | RVG Gateway fork 的多协议代理平台,Console/Worker + PostgreSQL,fork 数 1425 | ✅ 实战 |
| 9 | [yifanzhang-pro/recurrent-looped-tranformer](https://github.com/yifanzhang-pro/recurrent-looped-tranformer) | 525 | 模型 | 新上 | HTML | 论文 + 实现:潜在推理 + 无限时序深度,parity 4× 训练长度仍 60.8% | — |
| 10 | [eternityspring/reelbench-skills](https://github.com/eternityspring/reelbench-skills) | 522 | 设计skill | 新上 | HTML | Claude Code / Codex skill,视频拉片(ffmpeg 切镜 + 15 道质量门)+ 视频叠分镜 | — |
| 11 | [LBEILC/RhineLabUI](https://github.com/LBEILC/RhineLabUI) | 472 | 其他 | 新上 | TypeScript | 明日方舟莱茵生命档案终端复刻,Three.js + Vite + Wallpaper Engine 衍生 | — |
| 12 | [unstablebuild/rune](https://github.com/unstablebuild/rune) | 463 | agent | 新上 | Go | GPU 渲染 + 键盘驱动的 IDE,Agent 走 `cmd/rune-agent` 扩展 | — |
| 13 | [Sophomoresty/turnstile-bypass](https://github.com/Sophomoresty/turnstile-bypass) | 451 | 其他 | 新上 | Python | 跨平台 Cloudflare Turnstile 求解器 | — |
| 14 | [jnz/INSLIB](https://github.com/jnz/INSLIB) | 419 | 其他 | 新上 | C | 开源惯导库 | — |
| 15 | [kruzovic7/ai-data-extractor](https://github.com/kruzovic7/ai-data-extractor) | 387 | 其他 | 新上 | Python | 提取 AI 编程助手聊天记录(Claude Code / Cursor / Windsurf / Aider / Cline/Roo Code) | — |
| 16 | [deepseek-ai/DeepSelect](https://github.com/deepseek-ai/DeepSelect) | 327 | 其他 | 新上 | Cuda | DeepSeek Sparse Attention(DSA)的 TopK kernel + Samplers | ✅ 官方 |
| 17 | [showlab/Show-Harness](https://github.com/showlab/Show-Harness) | 305 | agent | 新上 | Python | VLM Agent 玩机器人,embodied-agent harness | — |
| 18 | [openaiotlab/CUHK-X](https://github.com/openaiotlab/CUHK-X) | 302 | 其他 | 新上 | Python | MobiSys 2026:大规模多模态 Human Action 识别 / 理解 / 推理基准 | — |
| 19 | [Chuloo/mural](https://github.com/Chuloo/mural) | 283 | 其他 | 新上 | — | 详见仓库 | — |
| 20 | [coccofresco/TriAevum](https://github.com/coccofresco/TriAevum) | 274 | 其他 | 新上 | — | 详见仓库 | — |
| 21 | [Phyzicalorg/Phyzical_org](https://github.com/Phyzicalorg/Phyzical_org) | 269 | agent | 新上 | — | 详见仓库 | — |
| 22 | [yi1108/printfilm](https://github.com/yi1108/printfilm) | 268 | 其他 | 新上 | — | 中文项目 | — |
| 23 | [hezhanleiok/freesub](https://github.com/hezhanleiok/freesub) | 260 | 其他 | 新上 | — | 详见仓库 | — |
| 24 | [zhihui-hu/one-ip](https://github.com/zhihui-hu/one-ip) | 254 | 其他 | 新上 | — | 详见仓库 | — |
| 25 | [xsolla-baku-gametech-hackathon/team-enthuzone](https://github.com/xsolla-baku-gametech-hackathon/team-enthuzone) | 253 | 其他 | 新上 | — | 详见仓库 | — |
| 26 | [nhovongoc0-max/meme-radar](https://github.com/nhovongoc0-max/meme-radar) | 238 | 其他 | 新上 | — | 详见仓库 | — |
| 27 | [yudaprasetya007/routeVSCODE](https://github.com/yudaprasetya007/routeVSCODE) | 238 | 模型 | 新上 | — | 详见仓库 | — |
| 28 | [zjwzcx/Awesome-Astra-Embodied-AI](https://github.com/zjwzcx/Awesome-Astra-Embodied-AI) | 227 | 模型 | 新上 | — | Awesome Astra Embodied AI 资源列表 | — |
| 29 | [HammingDev/haiming-app-monetization](https://github.com/HammingDev/haiming-app-monetization) | 223 | 设计skill | 新上 | — | 详见仓库 | — |
| 30 | [viettranx/3dviz-pro-max](https://github.com/viettranx/3dviz-pro-max) | 216 | agent | 新上 | — | 详见仓库 | — |

### 其余简评(11–30,简评形态)

- **#11 [LBEILC/RhineLabUI](https://github.com/LBEILC/RhineLabUI) ⭐472** —— 明日方舟莱茵生命档案终端的非官方复刻,黑底档案盒阵列 + 抽取 / 解密 / 阅读 + 360° 拆解,Three.js + Vite;配套 Wallpaper Engine 壁纸已上 Steam 创意工坊订阅。代码由 GPT-6 Astra 协助 + Blender MCP 出模型。
- **#12 [unstablebuild/rune](https://github.com/unstablebuild/rune) ⭐463** —— GPU 渲染、键盘驱动的 IDE,内嵌终端 / CLI / 语言智能 / 调试 / AI agents,Unix 风。Agent 走 `cmd/rune-agent` 扩展而非嵌入核心编辑器,作者明示"让 Rune 仍然适合不被 AI 污染的手动编程"。GPLv3。
- **#13 [Sophomoresty/turnstile-bypass](https://github.com/Sophomoresty/turnstile-bypass) ⭐451** —— 跨平台 Cloudflare Turnstile 求解器(macOS / Windows / Linux),合规边界灰色,自动化测试用。
- **#14 [jnz/INSLIB](https://github.com/jnz/INSLIB) ⭐419** —— 开源惯导库(纯 C),嵌入式 / 无人机 / 机器人定位参考实现。
- **#15 [kruzovic7/ai-data-extractor](https://github.com/kruzovic7/ai-data-extractor) ⭐387** —— 提取 AI 编程助手的聊天记录(Claude Code / Cursor / Windsurf / Aider / Cline / Roo Code),把会话数据导出来做复盘或训练数据。
- **#16 [deepseek-ai/DeepSelect](https://github.com/deepseek-ai/DeepSelect) ⭐327** —— DeepSeek 官方:DeepSeek Sparse Attention(DSA)的 TopK kernel + Samplers,CUDA 实现。
- **#17 [showlab/Show-Harness](https://github.com/showlab/Show-Harness) ⭐305** —— "Just a VLM Agent Can Play Robots",一个 VLM Agent 玩机器人的 harness,embodied-agent 路线。
- **#18 [openaiotlab/CUHK-X](https://github.com/openaiotlab/CUHK-X) ⭐302** —— MobiSys 2026:大规模多模态 Human Action 识别 / 理解 / 推理基准与数据集。
- **#19 [Chuloo/mural](https://github.com/Chuloo/mural) ⭐283** —— 详见仓库。
- **#20 [coccofresco/TriAevum](https://github.com/coccofresco/TriAevum) ⭐274** —— 详见仓库。
- **#21 [Phyzicalorg/Phyzical_org](https://github.com/Phyzicalorg/Phyzical_org) ⭐269** —— 详见仓库。
- **#22 [yi1108/printfilm](https://github.com/yi1108/printfilm) ⭐268** —— 中文项目,详见仓库。
- **#23 [hezhanleiok/freesub](https://github.com/hezhanleiok/freesub) ⭐260** —— 详见仓库。
- **#24 [zhihui-hu/one-ip](https://github.com/zhihui-hu/one-ip) ⭐254** —— 详见仓库。
- **#25 [xsolla-baku-gametech-hackathon/team-enthuzone](https://github.com/xsolla-baku-gametech-hackathon/team-enthuzone) ⭐253** —— 详见仓库。
- **#26 [nhovongoc0-max/meme-radar](https://github.com/nhovongoc0-max/meme-radar) ⭐238** —— 详见仓库。
- **#27 [yudaprasetya007/routeVSCODE](https://github.com/yudaprasetya007/routeVSCODE) ⭐238** —— 详见仓库。
- **#28 [zjwzcx/Awesome-Astra-Embodied-AI](https://github.com/zjwzcx/Awesome-Astra-Embodied-AI) ⭐227** —— Awesome 列表:Astra Embodied AI 相关资源汇总。
- **#29 [HammingDev/haiming-app-monetization](https://github.com/HammingDev/haiming-app-monetization) ⭐223** —— 详见仓库。
- **#30 [viettranx/3dviz-pro-max](https://github.com/viettranx/3dviz-pro-max) ⭐216** —— 详见仓库。

### 数据方法

- **数据源**:GitHub Search API(`search/repositories?q=created:2026-09-07..2026-09-13+archived:false+(ai+OR+llm+OR+agent+OR+mcp+OR+assistant)+in:readme&sort=stars&order=desc&per_page=100`),UTC 日历日闭区间;匿名 60/h 不可深挖 Top 20,本榜单走 PAT 认证(5000/h)。
- **过滤**:`rank.py` 剔除空壳 / 擦边(language 缺失且 size<30KB 或 topics 命中成人词),共剔除 3 条。
- **排序**:本档窗口内新创建仓库按当前总星降序,取 Top 30;与上期 W36 对照:W36 30 条全部掉出(口径:窗口内新仓),W37 30 条全部新上;这是周榜窗口性质决定,而非项目"全部消失"。
- **详深挖**:日档取 Top 5、周/月档取 Top 10,基于 `rank.py --deep_ok`,结合 README 全文 + 最近 10 条 issue/comment + 仓库元数据(topics / lang / size / 创建日期)。
- **slug / 标题时间**:`github-weekly-2026-W37`,标题时间 `2026-W37`,正文 H2 时间区间 `2026-09-07..2026-09-13`(均为窗口所属日/周/月,非跑任务当天)。
- **三档 cron 错开**:日 `10 8 * * *`(CST 08:10) / 周 `40 8 * * 1`(CST 周一 08:40) / 月 `10 9 1 * *`(CST 每月 1 号 09:10),均在 UTC 当日 00:00 之后,避免窗口偏移 8 小时。