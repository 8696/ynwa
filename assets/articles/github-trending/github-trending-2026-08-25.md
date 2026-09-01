# 2026-08-25 · AI/agent/LLM 热门

> 数据快照时间:2026-08-26 00:11 UTC(CST 08:11)。GitHub Search API 窗口:`created:2026-08-25..2026-08-25`,关键词 `ai OR llm OR agent OR mcp OR assistant`(`in:readme`),按 stars 降序取满 15 条。空壳/擦边已剔除。

## 核心信号

- **整档"个人工具化"占绝对多数**:15 条里 ≥12 条是单点 Skill / 个人桌面端 / 本地脚本。Agent harness、框架级项目缺席,昨天这一波更像是"工具作者"集中发布日,而不是模型/框架/协议大事件。
- **腾讯微信视觉下场做 embedding**:Tencent/WeMM-Embedding(2B/4B/9B)进 Top 5,MMEB-v2/v3 多档 SOTA,Matryoshka 维度可裁。是 8 月以来少见的厂商级多模态 embedding 新模型集中释出。
- **Speech-to-Text 在 CPU 上做到能看**:oboroge0/hayamimi 实时多语 ASR,广播日语音频上 CER 5.8% 不到 whisper-turbo 的一半,且 10–50× realtime 只用 CPU,无 GPU 无云。
- **Agent Skill 形态继续渗透**:KurosawaGeeker/femboy-skill、Reality-JH/FailoverAI、heygen-com/hyperframes-community-skills、ra1nyxin/immersive-vibration-response-skill 都是直接面向 Codex/Claude Code 的 `skills/` 仓库。
- **首期快照,无对照**:本档首次记录,compare 显示"全是新上",没有"还在榜"或"掉出"。

## 重点深挖

### 1. [dragthelake/ambient-context](https://github.com/dragthelake/ambient-context) ⭐113

- **一句话**:macOS 菜单栏应用,通过 macOS 辅助功能接口把"当前窗口里看到的文字"按天写入本地 Markdown,专给 LLM 当工作日记读。
- **元数据**:Rust 实现(14.6 MB),MIT,创建于 2026-08-25 00:33 UTC,同日推到 20:15,5 fork,0 open issue,作者 Cameron Smith,无 topic。`has_issues=true` 但仓库刚上线一天,首期没人提 issue。
- **README 提炼的 3 条核心价值**:
  - **隐私默认**:只走 Accessibility API 读文字,没有截图/录屏;密码管理器字段、隐私窗口、凭证/卡号在落盘前就 redact。签名 release 才会加一次 GitHub 升级检查,**当前版本完全不联网**。
  - **为 LLM 阅读设计**:同一天内同一段文本只写一遍;每段记录所在文档/URL;capture 目录自带 `AGENTS.md` 告诉 agent 怎么读;每天一个文件,够小可以整文件喂给上下文。
  - **不属于 iCloud**:默认写到 `~/Ambient Context`,刻意避开 `~/Documents`,避免 iCloud 把你工作日记同步上云。
- **实战反馈**:仓库当天的 8 个 commit 全是作者本人,典型节奏是 `feat: noise reduction pass from real-day capture analysis` → `docs: add settings window demo gif` → `docs: prompt for distraining a day file into LLM context`,看起来是从真实一天录屏里反推过滤规则、再把"如何用 LLM 摘要"做成 doc——产品思路是 day1 就把"喂给 LLM"这一端先打通。
- **横向对比**:
  - vs Rewind AI:Rewind 是录全屏 + 检索 + 云端,Ambient Context 只读文字 + 本地 markdown + 0 联网,定位是"给 LLM 的纯文本记忆",不是"给你的记忆"。
  - vs Apple 自己的 Journal:Apple Journal 是用户手写日记;Ambient Context 是机器替 LLM 写"今天都看了什么"。两类完全不冲突。
- **信号判断**:✅ 安全(默认 0 联网、可手动停录);⚠️ 兼容(macOS 14+ Apple Silicon,Chromium/Electron 应用读文字已列入 testers notes 但 GitHub 上还没 issues 反馈);✅ 增长(单日 113⭐对一个纯本地 Rust 小工具非常可观,且已经有人提 PR 改 README);✅ 研究诚信(把"为了 LLM 阅读而做的工程取舍"全写在 README 而不是只贴一两句噱头)。

**适用场景**:**适合**:macOS 上想让 Claude Code/Cursor 长期记住"你这周到底看了什么文件"的个人开发者 · **不适合**:Windows/Linux 用户、需要截图/录屏、需要自动 push 到云端做跨设备同步。

### 2. [oboroge0/hayamimi](https://github.com/oboroge0/hayamimi) ⭐57

- **一句话**:早耳——纯 CPU、实时、多语种语音转文字,带 OBS 字幕覆盖;广播日语音频上把 whisper-large-v3-turbo 的 CER 13.8% 打到 5.8%。
- **元数据**:Python,1.5 MB,创建于 2026-08-25 03:56 UTC,同日 23:03 仍在 push,3 fork,7 个 topic(asr / multilingual / real-time / sherpa-onnx / speech-recognition / subtitles / japanese),README 中英日三语,作者自述用 Claude Code 写 release notes。
- **README 提炼的核心差异点**:
  - **不是单模型路线**——大多数"CPU 实时 ASR"都拿 Whisper 全语言覆盖接受它的精度天花板,hayamimi 反过来:每条 utterance 先做语言判定,然后路由到该语种的最强专用模型(ja/zh/ko/yue/en+24 EU 5 条专门路线,剩下 ~1600 语种走 Meta Omnilingual ASR 兜底)。
  - **两段式精炼**:Silero VAD 切段 → 0.5s 一次的 partial 字幕 → ~100ms 出最终行 → 静默 2s 后把这批 utterance 整体再用更重一点的模型解码一次,日语音频 CER 从 15.5% 拉低到 12.0%。
  - **CPU 实测数据公开**:`docs/SCORECARD.md` 里给了广播日语音频的真实成绩,而且 v0.1.1 release notes 把"加了 GTCRN 前端降噪反而更差"这件事连数据一起公开(60 个噪声条件里 49 个更差)。
- **实战反馈**:作者 v0.1.1 release notes 里**直接否定了"加降噪器"这个常规直觉**,原话是"GTCRN 的 A/B 实测,60 条件中 49 条件反而恶化,连干净音频都更差,因此没有降噪器"。这种"我试过、它不灵、数据在这里"的诚实反馈在 AI 项目里很少见,直接拿来当**研究诚信**信号。commits 列表里同样能看到 `GTCRN denoiser A/B: measure whether pre-ASR denoising helps or hurts` 这种"先测再决定"的工程节奏。
- **横向对比**:
  - vs Whisper.cpp + faster-whisper:路线相同都是 sherpa-onnx / ONNX CPU,但 whisper 系列所有语种共用一个模型,日语精度会被通用模型天花板拖住;hayamimi 用 specialist routing 解决这个问题。
  - vs MacWhisper / WhisperBoard:同样是 macOS 实时字幕,但 hayamimi 是真·CPU 多语种 + OBS overlay + 翻译,不是单语种桌面 GUI。
- **信号判断**:✅ 实战(v0.1.0 release 自带 522 秒 soak + 完整 flag 集成测试 + 15 单测,v0.1.1 扩到 23);⚠️ 兼容(README 明确写"开发与测试在 Windows 11;macOS/Linux 预期可跑但未端到端 CI 测试");✅ 增长(单日 57⭐、3 fork、7 topic、release notes 用中英日三语,显然对日韩语圈 ASR 受众触达很顺)。

**适用场景**:**适合**:OBS 直播主、做日语/韩语播客/广播字幕的人、本地只想跑 CPU 不愿买显卡的开发者 · **不适合**:Windows 7/8、需要唱歌场景精度高(hayamimi 自测英文/韩文歌错误率 5 成)、需要离线整段 wav 离线转写(它是为实时流设计的)。

### 3. [KurosawaGeeker/femboy-skill](https://github.com/KurosawaGeeker/femboy-skill) ⭐47

- **一句话**:面向 MTF、crossdresser 与性别多元成年人的中文 Agent Skill,基于"生如夏花"知识库加入医学安全护栏,作为 Codex/Claude Code 的 `$femboy-skill` 装载。
- **元数据**:Python,715 KB,创建于 2026-08-25 08:33 UTC,同日 17:23 仍在 push,3 fork,9 个 topic(agent-skill、chinese、codex、crossdresser、femboy、gender-diversity、mtf、sexual-health、voice-training),CC BY-SA 4.0,作者 KeiKurosawa。
- **README 提炼的 3 条核心价值**:
  - **社区经验与医学证据分开**:对"伪音/护肤/穿搭/前列腺安全"这种社区经验型话题直接给建议;对"跨性别医疗/激素/手术/处方药/疾病诊断"只给一般信息 + 转诊,不输出个体处方或 DIY 医疗方案。
  - **身份标签不强加**:README 显式列出"男孩子穿女装 ≠ Gay ≠ 男娘 ≠ 跨性别者 ≠ 长发男 ≠ 想被草 ≠ 喜欢男的 ≠ 吃药"这套不等式,项目名只是安装标识,不是身份强加。
  - **真实案例库 + 消费指南**:`femboy-skill/cases/` 收录成年贡献者经脱敏的一手经验(分成"有效/无效/停止/不良反应"),`femboy-skill/consumer/` 收录商品/服务/店面的亲测记录(包含商业关系披露)。
- **实战反馈**:当天 8 个 commit 全是作者本人,节奏非常工程化:`feat(consumer): add screenshot-based product records` → `Update README to enhance clarity on gender identity rights` → `Remove duplicate safety principles in README` → `Revise notes on femininity and gender identity`——这是一个边写边根据反馈精简文档的过程,不是一次性 dump。
- **横向对比**:与一般"AI 情感陪伴/聊天机器人"不同,它明确写给 Agent 当 Skill 用(`npx skills add`),不是直接对话产品;与"健康问答 bot"也不同,它把"社区经验"和"医学证据"切成两类不同严格度的输出。
- **信号判断**:✅ 安全(显式 18+ 警示、医疗边界、不做个体处方);✅ 兼容(支持 Codex 与自动发现 skill 的 Agent,如 Claude Code/Cursor/OpenCode);⚠️ 增长(单日 47⭐对 CC BY-SA 4.0 + 中文 + niche 议题来说已经很高,3 fork 同步跟上);✅ 研究诚信(把"哪些是社区经验、哪些是医学边界"区分写在表里,不做夸大)。

**适用场景**:**适合**:需要中文性别多元/成人性健康社区经验 + 安全护栏的 agent 集成者 · **不适合**:未满 18 岁的使用者、寻找"AI 伴侣情感替代"的人、需要严格临床级医学建议的场景(本 skill 明确说"不提供个体处方")。

### 4. [Tencent/WeMM-Embedding](https://github.com/Tencent/WeMM-Embedding) ⭐30

- **一句话**:腾讯微信视觉团队的多模态 embedding 模型矩阵(2B / 4B / 9B),统一表征文本/图像/视频/视觉文档/交错多模态输入,MMEB-v2/v3 多项 SOTA。
- **元数据**:Python,1.5 MB,创建于 2026-08-25 02:46 UTC,同日 17:22 仍在 push,0 fork,3 个 topic(embedding-models / multimodal / multimodal-llm),Apache 2.0,作者 Junjie Zhou,代码同时上传 HF Hub:`tencent/WeMM-Embedding-{2B,4B,9B}`。
- **README 提炼的 5 条核心价值**:
  - **统一多模态**:文本/图像/视频/视觉文档/交错多模态共用一个 embedding 空间,音频暂不支持。
  - **Matryoshka 维度可裁**:2B 支持 64/128/256/512/1024/2048,4B 到 2560,9B 到 4096;README 给出"截断前 d 维 + 重新 L2 normalize"的几行 Python,256 维能保留全维图像/视频 98.7% 性能。
  - **实测 SOTA**:MMEB-v2 上 2B 平均 77.9 超过 Qwen3-VL-Embedding-2B 的 73.2 与 DME-Small 的 74.8;9B 平均 80.6 超过 Qwen3-VL-Embedding-8B 的 77.8 与 DME-Medium 的 78.4。
  - **MMEB-v3(190 任务)**:2B V3-All 56.0,9B V3-All 59.5,text/agent/MCMR/audio 多分项领先。闭源 DME 因为没开源权重没在同列对比。
  - **多部署栈**:Transformers + Sentence Transformers + vLLM + SGLang 都给了 serving 脚本(README 明确写 vLLM 0.27.0 / SGLang 0.5.9 实测过)。
- **实战反馈**:仓库 commits 主要围绕 README 排版与 `Sentence Transformers` 兼容性(`Load Sentence Transformers directly from the model repository. The model repositories now ship modules.json...`),说明工程重心在"别人怎么方便跑起来",而不是堆 benchmark。
- **横向对比**:
  - vs Qwen3-VL-Embedding:同台对比里 WeMM-2B 在 MMEB-v2 平均高出 4.7 分、视频高 8.9 分,9B 也领先 2.8 分;Qwen 系列在 V3-All 上比 WeMM 仍强一点(53.5 vs 56.0 是 WeMM 赢,但分数段已经接近)。
  - vs VLM2Vec-V2 / GME:同等规模下 WeMM 平均高出 15–25 分,差距明显。
- **信号判断**:✅ 安全(Apache 2.0,模型权重走 HF Hub);✅ 兼容(Transformers 5.2.0、Sentence Transformers、vLLM、SGLang 都给了可复现脚本);✅ 增长(单日 30⭐对一个全新厂商级多模态 embedding 已经不少,0 fork 反而说明还没扩散,典型"刚发出来,等社区抽时间接");✅ 研究诚信(README 里把闭源的 DME 用 `†` 标注并写"无公开权重、无推理端点",避免数据对不齐的对比误导)。

**适用场景**:**适合**:做多模态 RAG/检索/重排、要统一视频/视觉文档/文本 embedding 空间的研究者与工程团队 · **不适合**:需要音频 embedding(明确不支持)、单语种小模型场景(直接用 Jina/BGE 文本 embedding 性价比更高)。

### 5. [7836246/hengzhi](https://github.com/7836246/hengzhi) ⭐22

- **一句话**:衡知——本机 AI 合约交易复盘台,只接币安 USDT-M 永续,一个模型 + 一套提示词,代码只做仓位/杠杆裁剪,只缩小不放大。
- **元数据**:Python,1.1 MB,创建于 2026-08-25 08:37 UTC,同日 08:46 后未再 push(说明 snapshot 是首日版),14 fork,0 open issue,MIT,作者 Xu Kang。**14 fork / 22 ⭐ 这个比值非常显眼**——意味着几乎每个看到的人都点了 fork 准备自己跑一遍。
- **README 提炼的 3 条核心价值**:
  - **代码只缩,模型只决**:模型给方向、价位、止损/止盈;代码按"单笔风险 ~1% / 杠杆顶 8x / 最多 4 仓 / 保证金合计 ≤40% / 组合风险 ~3%"硬闸裁掉,当日亏损或回撤过大触发熔断。**代码不会替模型编一个止盈价,也不会把仓位放大**。
  - **决策可回放**:每轮结论存提示词、模型原文、风控通过/驳回、成交;游客页只看权益和决策,`/desk` 改密钥、启停、平仓。换币安账户按新账户重起权益和熔断,不混数据。
  - **默认测试网,正式网需 `I_UNDERSTAND_MAINNET=yes`**:README 开头单独写一节"赌徒的忏悔",原话"把它开源,不是因为它赚到了钱。合约带杠杆。模型会错。错了就是真金。"
- **实战反馈**:commits 3 条全是作者本人,顺序是 `Initial public snapshot of Hengzhi without local secrets or trading data` → `Add README screenshots and LINUX DO community acknowledgment` → `Warn readers this desk is for seeing losses, not getting rich.`,最后一条 commit 就是把 README 顶部那段"忏悔"加上去的——发布后立刻意识到需要更明确的风险提示并动手修改,是负责任的态度。
- **横向对比**:
  - vs Freqtrade / Jesse / Hummingbot:这些是成熟策略框架 + 回测引擎;hengzhi 不做回测、不做多模型竞技、不做第二家交易所,定位是"拿一个 LLM 当信号源,然后看你每一笔决策到底为什么亏"。
  - vs 直接用 ChatGPT 让它写策略:ChatGPT 没有仓位/熔断硬闸、没有可回放的决策日志;hengzhi 把"LLM 决策 + 硬风控 + 全量审计"缝成一个 web 服务。
- **信号判断**:⚠️ 安全(实盘交易软件,作者反复提醒会亏光本金、密钥不要提交、正式网 API 不勾提现、IP 白名单);✅ 兼容(支持 Responses API 的模型网关、测试网/正式网两套独立配置、`pytest` 已配);✅ 增长(单日 22⭐、14 fork 是本档 fork/⭐ 比值最高的一条);⚠️ 研究诚信(README 自述"不保证赚钱。通用模型做交易,亏是常态",不是卖"AI 帮你稳稳发财"的人设)。

**适用场景**:**适合**:已经在做合约、想看清楚每一笔为什么亏、把 LLM 决策 + 硬风控 + 决策审计缝到本机 web 的个人玩家 · **不适合**:想"靠 AI 翻本"、想做回测/多策略竞技、需要多家交易所或多租户 SaaS(README 明确说不做)。

## 完整前 15 表

| # | 仓库 | ⭐ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---:|---|---:|---|---|---|---|---|
| 1 | [dragthelake/ambient-context](https://github.com/dragthelake/ambient-context) | 113 | 其他 | 新上 | Rust | macOS 菜单栏把当前窗口文字按天写本地 md,给 LLM 当工作日记读 | ✅ 实战 |
| 2 | [oboroge0/hayamimi](https://github.com/oboroge0/hayamimi) | 57 | 其他 | 新上 | Python | 早耳:CPU 实时多语 ASR + OBS 字幕,广播日语 CER 5.8% | ✅ 实战 |
| 3 | [KurosawaGeeker/femboy-skill](https://github.com/KurosawaGeeker/femboy-skill) | 47 | agent skill | 新上 | Python | 面向性别多元成人的中文 Agent Skill,基于生如夏花知识库 | ✅ 实战 |
| 4 | [d4ncboz/technocore](https://github.com/d4ncboz/technocore) | 40 | agent | 新上 | Python | 去中心化 Ed25519 加密身份 + 签名消息传递 | ⚠️ 待验 |
| 5 | [Tencent/WeMM-Embedding](https://github.com/Tencent/WeMM-Embedding) | 30 | 模型 | 新上 | Python | 微信视觉团队多模态 embedding 矩阵(2B/4B/9B),MMEB 多项 SOTA | ✅ 实战 |
| 6 | [yeswehack/claude-kit](https://github.com/yeswehack/claude-kit) | 28 | 其他 | 新上 | — | Claude Code 写 bug bounty triager 级别漏洞报告的 plugin | ✅ 实战 |
| 7 | [7836246/hengzhi](https://github.com/7836246/hengzhi) | 22 | 其他 | 新上 | Python | 衡知:本机 AI 币安 USDT-M 交易复盘台,代码只缩不放大 | ⚠️ 高风险 |
| 8 | [backtrue/budget-review-skill](https://github.com/backtrue/budget-review-skill) | 18 | 设计 skill | 新上 | — | 预算复盘的 agent skill(描述为空,详见仓库) | ⚠️ 待验 |
| 9 | [d4ncboz/auto-checkin](https://github.com/d4ncboz/auto-checkin) | 18 | 其他 | 新上 | Python | GoRouter 多账号自动签到 toolkit | ⚠️ 待验 |
| 10 | [ibadwi/arabic-rtl-fixer-ai-skill](https://github.com/ibadwi/arabic-rtl-fixer-ai-skill) | 17 | 设计 skill | 新上 | Python | AI skill:修复阿拉伯语 RTL/BiDi 与阿英混排排版 | ✅ 实战 |
| 11 | [Reality-JH/FailoverAI](https://github.com/Reality-JH/FailoverAI) | 17 | 模型 | 新上 | Python | 图像/视频/LLM 任务的开源 failover gateway | ⚠️ 待验 |
| 12 | [chengyi-ai/douyin-image-post-scheduler](https://github.com/chengyi-ai/douyin-image-post-scheduler) | 15 | 设计 skill | 新上 | Python | Codex Skill:批量编排抖音图文发布 + 验证 | ✅ 实战 |
| 13 | [liangdabiao/smy-seedance-storyboard](https://github.com/liangdabiao/smy-seedance-storyboard) | 15 | 设计 skill | 新上 | — | 上美影风格短剧故事板,文案→出图/出视频 | ✅ 实战 |
| 14 | [heygen-com/hyperframes-community-skills](https://github.com/heygen-com/hyperframes-community-skills) | 14 | agent | 新上 | JavaScript | 社区维护的 HyperFrames 专用 skills 集 | ⚠️ 待验 |
| 15 | [ra1nyxin/immersive-vibration-response-skill](https://github.com/ra1nyxin/immersive-vibration-response-skill) | 13 | agent | 新上 | Python | Codex/ClaudeCode/Cursor 可加载的穿戴硬件控制 skill(成人向) | ⚠️ 待验 |

> **样本构成**:英文 9 / 中文 6。窗口内 `total_count=40032`,本档取 stars 降序前 30 经 `rank.py` 过滤后剩 29 条,再取前 15。GitHub Search API 关键词 `ai OR llm OR agent OR mcp OR assistant` + `in:readme`,按 stars 降序,**不设** `stars:>N` 下限。

## 数据方法

- **窗口**:`created:2026-08-25..2026-08-25`(UTC 单日闭区间,CST 2026-08-25 08:00–24:00 + 2026-08-26 00:00–08:00)。
- **关键词**:`(ai OR llm OR agent OR mcp OR assistant) in:readme`(5 槽位用满,中文 README 里的"AI/agent/LLM/助手"同样命中)。
- **排序**:GitHub Search API `sort=stars&order=desc`,`per_page=30`,取满后经 `rank.py` 剔除空壳/擦边。
- **slug 命名**:`github-trending-2026-08-25`,与 `windows.py --route daily` 的 `daily.slug` 一致。
- **标题时间**:`2026-08-25`(即昨日,不是跑任务当天 `2026-08-26`)。
- **真值源**:GitHub Search API + 每个仓库的 `meta / issues / readme / commits / releases` REST 端点(Snapshot 2026-08-26 00:11 UTC)。
- **首期快照**:`rank.py compare` 显示 15 条全为新上,无"还在榜 / 掉出 / Δ stars"对照。