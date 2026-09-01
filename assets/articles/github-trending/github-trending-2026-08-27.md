# GitHub 日榜 · 2026-08-27 · MoureDev SDD 课程仓单日 233⭐断层登顶 + GLM-5.3-Flash 当天两条 NVFP4 部署并行冒头

> 数据快照：2026-08-27（UTC 闭区间 `2026-08-27..2026-08-27`，按当前总星排序取前 15）。对照上期 2026-08-26：`rank.py --write` 存档显示上期 15 条全部掉出，本期 15 条全为新上榜。

## 核心信号

- **Top 1 由一档完整 AI 编程课程仓登顶**：[mouredev/hello-sdd](https://github.com/mouredev/hello-sdd) 单日 233⭐ 断层第一，配套 MoureDev 的西班牙语 **SDD（Spec-Driven Development）** 直播课，把\"先和 AI 协商 spec → 再分阶段写文档 → 再实施\"的工作流固化成 `samples/AGENTS.md + spec.md + prompts.md` 模板与一个 `habits-cli` 完整示例项目。这是继 2025-08 之后 MoureDev 第二次用一整个仓撑起一门大课。
- **GLM-5.3-Flash（Z.ai 2026-08-26 发布）的 NVFP4 部署当日冒出两条**：[drowzeys/keys-vLLm.0.27.1-GLM-5.3-Flash-NVFP4-NVFP4KV-1M-Context-Abliterated](https://github.com/drowzeys/keys-vLLm.0.27.1-GLM-5.3-Flash-NVFP4-NVFP4KV-1M-Context-Abliterated)（TP2 双 DGX Spark，1M 上下文 NVFP4 KV，22~27 tok/s 解码、84 tok/s 8 路并发）和 [tonyd2wild/GLM-5.3-Flash-NVFP4-1M-KV-4x-DGX-Spark](https://github.com/tonyd2wild/GLM-5.3-Flash-NVFP4-1M-KV-4x-DGX-Spark)（TP4 4 卡，6.65M token KV pool）相隔不到 12 小时发布；前者又给 tonyd2wild 提供了 `nvfp4_ds_mla` 的 B12x 后端路径，两个仓互相署名。Z.ai 这边加上 vLLM 0.27.1 的 MLA 稀疏路径在 DGX Spark (GB10) 上跑出 1M 上下文，是 2026-08-27 这一档模型层最大的亮点。
- **AI agent 长记忆这条线单日冒出两套对照实现**：[brooxiacaigonv/AIrecall](https://github.com/brooxiacaigonv/AIrecall)（Python SDK + Go server，端到端长期记忆层、SQLite + 向量混合检索 + 自动摘要）和 [OnlyTerp/opengrok](https://github.com/OnlyTerp/opengrok)（让 Grok Bot 跑任意模型 — 一条命令装、模型 picker UI、provider 凭据留在本地）— 两个都是 agent harness 层面对"默认配置不够用"的回手掏；前者做记忆层、后者做模型路由层，逻辑上都属于"agent 框架的零件级解耦"。
- **国产 AI 内容生产继续卷应用层**：[LuxUmbra697/luxumbra-ai-learn](https://github.com/LuxUmbra697/luxumbra-ai-learn)（微信小程序 AI 知识库 → 自动出题 + 学习复盘）和 [LuxUmbra697/LuxUmbra-Slides](https://github.com/LuxUmbra697/LuxUmbra-Slides)（中文场景 PPT 生成与编辑平台，FastAPI + LangGraph + React 19）同日由同一作者 `LuxUmbra697` 发两条 — 头一回看到"AI 应用矩阵"作者在一档里连发两个仓。同作者踩点有意思：第一条做学习侧（输入侧），第二条做表达侧（输出侧）。
- **对照上期（2026-08-26 → 2026-08-27）**：上期 Top 15 全部掉出（包括 open-higgsfield 单日 550⭐ 单生态、Higgsfield 影棚相关的 Genesis 类壳），本期 15 条全数新上；上一档的"端侧 + 单卡部署 + 模型目录站"主题被这一档的"agent 框架零件 + 模型量化部署 + 应用矩阵"完全替换。中英文项目 9 / 6（中文由两个 LuxUmbra 仓 + RK3588 / joeseesun qiaomu-syc / omarchy-herdr 占 5 条）。

## 重点深挖

### 1. [mouredev/hello-sdd](https://github.com/mouredev/hello-sdd) ⭐233 — MoureDev 西班牙语《Spec-Driven Development》直播课全配套，单仓撑一门课

- **仓库元数据**：Python / 75 KB / 0 fork / Apache-2.0 / 创建 2026-08-27T11:49:48Z（与课程直播时间高度耦合）/ 推到 T18:27:38Z / topics `sdd` + `spec-driven-development`（topics 没全占位算克制）/ homepage 是 `https://youtube.com/live/5HaOxAAA5qI` 直播链接。
- **README 提炼**：定位是 **"MoureDev SDD 课程自上而下教材"**，包含两件事 — ① `samples/` 下的 4 份模板：`AGENTS.md`（agent 上下文）、`spec.md`（EARS 编号规范的需求 RF-x）、`prompts.md`（每个 SDD 阶段的核心 prompt 表）、`sdd.excalidraw`（课程思维导图）；② `habits-cli/` —— 用 SDD 流程一步步搭出的 Python CLI（仅标准库，`habits add` / `habits done` / `habits list`，记录学习习惯并算连击天数）。仓内 `docs/constitution.md` 写死项目 6 条不可妥协原则，每个 SDD 阶段在仓里都留有 artifacts。
- **讲法和别的"AI 编程课"不同**：README 强调 **"先 spec、再 prompts、再实施"**，反对 vibe coding；EARS 编号规范要求每个需求都被 `WHEN <触发>` / `IF <条件>` / `THEN <行为>` 三段式覆盖。SDD 一词在 2025 年下半年由 GetDX/BNC 推动，本仓是把这种"先规约再 vibe"工作流写进了 AI coding 教学。
- **项目内调研**：issues=0 / discussions=0 / PR=0 / 3 次 commits（13:24 起、18:21 截）。直播 5 小时内已放出完整 artifacts（MoureDev 的 YouTube 频道历来访问量极大，西班牙语 AI 编程受众稳定 50K+ 订阅）。
- **横向对比**：同形态项目一般分两类 — 一类是"AI 编程规范"（[GetDX/SDD](https://github.com/getdx/sdd)、[microsoft/amplifier](https://github.com/microsoft/amplifier)），一类是"AI 编程示范项目"（[anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook)、[openai/openai-quickstart-python](https://github.com/openai/openai-quickstart-python)）。hello-sdd 走的是"一档视频课程配套 + 标准库示例 + EARS 编号"三件套，竞品里形态最接近的是 [Kata-Conf/hello-spec](https://github.com/Kata-Conf/hello-spec) 但体量小一个数量级。
- **信号判断**：✅ 实战 — README 自带 `samples/prompts.md`，直播间可直接拷贝粘贴。⚠️ 语言孤岛 — README 全文西班牙语，未配英/中翻译，国际读者只能看示例和模板（但 prompts 与 spec 本身是中性的）。✅ 兼容 — `samples/AGENTS.md` 明示 `CLAUDE.md 可仅 @AGENTS.md`、Codex 兼容、习惯追踪 demo 用纯 stdlib，移植任何项目无依赖。✅ 研究诚信 — README 顶部就写明"看直播才能理解仓"（这是教学仓的诚信边界）。
- **适用场景**：**适合**：希望把"先规约再 vibe"工作流复用到团队 / 个人项目的开发者，正在寻找 AI 编程课配套可拷贝 artifacts 的学习者。**不适合**：只想要 SDD 概念综述（看 [GetDX 的 SDD blog](https://getdx.com/blog/spec-driven-development) 即可）；英语用户（README 西语为主）。

### 2. [LuxUmbra697/luxumbra-ai-learn](https://github.com/LuxUmbra697/luxumbra-ai-learn) ⭐52 — 微信小程序 AI 知识库学习：传资料 → 自动出题 → 学习复盘，单仓完成"输入→练习→反馈"闭环

- **仓库元数据**：Python / 1166 KB / 0 fork / MIT / 创建 2026-08-27T11:07:30Z / 推 12:44:47Z / topics 空（待补；README 中英双语段落齐整）/ description 中英混合："AI-powered WeChat mini app for knowledge-base learning, quiz generation, and intelligent study reports"。
- **README 提炼**：定位 **"基于知识库学习、智能出题与学习复盘的 AI 微信小程序"**。功能组合 — ① 多模态输入（文档/图片/手写笔记）；② 知识卡片自动结构化（概念 / 关键点 / 易错点 / 例子）；③ 间隔重复出题（按遗忘曲线动态抽取）；④ 学习错题 + 弱项可视化复盘；⑤ 微信内闭环（不用跳到独立 App）。架构是 Python (FastAPI) + 小程序前端 + PostgreSQL + Redis + Celery 异步任务队列。
- **运营差异**：README 强调 **"知识库是个人私域，不上云"**；后端可自部署也可走托管 demo（demo 仓内另贴二维码）。对比市场上同类（Quizlet / Anki / Notion AI 学习插件）— Anki 是纯 SRS、Quizlet 是英文入门 + AI 套壳、Notion 是通用笔记；luxumbra-ai-learn 的差异点是 **"微信小程序为唯一入口 + 知识库语义结构化 + 个人私域持久"**，中文场景下更适合学生/教师群体。
- **项目内调研**：issues=0 / discussions=0 / 5 次 commits；README 中英段落都已写好，内部测试夹具、CI 工作流、`/.github` 模板都齐了。仓库自有 backend / frontend 子目录。
- **横向对比**：同形态有 [quizlet/ai](https://github.com/quizlet/ai)（闭源 SaaS）、[ankidroid/Anki-Android](https://github.com/ankidroid/Anki-Android)（间隔重复但无 LLM 出题）、[mem-verse/mem0](https://github.com/mem0ai/mem0)（memory 层而非学习侧）、[tiiuae/llm-on-wechat](https://github.com/yyhhyyyyyy/llm-on-wechat)（聊天壳，没有学习闭环）。luxumbra-ai-learn 的核心差异是 **"微信小程序为唯一载体 + 内容侧而非会话侧"**。
- **信号判断**：✅ 实战 — README 自带 quick start + 部署 + 测试 + 环境变量四节，且 demo 二维码在仓内。⚠️ 数据隐私 — README 写明知识库不外发，但用户应当明白 FastAPI server 仍可被托管方看（自部署是底线要求）。⚠️ 增长 — 0 fork 但同作者日发两条（带矩阵流量），曝光窗口已经打开。✅ 兼容 — FastAPI + 微信 web 工具 + 标准 LLM API 适配器，没有绑死特定模型 / 特定云。
- **适用场景**：**适合**：要做"AI 学习助手型微信小程序"的独立开发者 / 教师 / 学生；中文知识库私域场景（不允许走云端 SaaS 的研究/法律/医疗群体）。**不适合**：只想做英文抽认卡（Quizlet 足够）；需要深度物理/数学题库的硬核场景（README 自标"通用知识型"）。

### 3. [MUJI0807/RK3588-Dual-Camera-AI-Perception-System](https://github.com/MUJI0807/RK3588-Dual-Camera-AI-Perception-System) ⭐50 — 嵌入式双摄 AI 感知：YOLOv5s + UNet + OpenCL 畸变矫正，量产级 C++ 仓

- **仓库元数据**：C++ / 111 KB / 0 fork / MIT / 创建 2026-08-27T13:01:18Z / 推 13:10:24Z（同步贴出）/ topics 空 / homepage 空 / 自带 4 份大型中文技术文档：`OpenCL去畸变模块架构设计.md`（9.3KB）+ `双摄改造技术文档.md`（14.3KB）等。
- **README 提炼**：定位 **"在 RK3588 边缘计算平台上跑实时 AI 感知"**，端到端管线 — 双 MIPI CSI 摄像头采集 → OpenCL 2.0 GPU 加速畸变矫正（Mali-G610）→ RKMPP 解码 YOLOv5s 检测 + UNet 分割 → RTMP 推流 → 后处理多目标跟踪；用于辅助驾驶。栈是 OpenCL 2.0 + RKMPP 硬解 + YOLOv5s(int8 RKNN) + UNet + RTMP。
- **核心数据**：单 RK3588 板单路 25 FPS；双摄同步采集+畸变矫正+检测+推流，单板 18 FPS；功耗 < 8W（12V 供电）。仓内置 `model/` 目录含 rknn 量化后的 yolov5s_rk3588.rknn。
- **OpenCL 路径是仓的核心亮点**：作者实测 OpenCL 畸变矫正相比 CPU 实现提速 8.4×、相比 GPU 直跑 CV pipeline 节省 30% 显存；自写 `undistort.cl` kernel，针对 OV9281 鱼眼镜头参数表做硬件加速。README 写明 **"硬件上必须 RK3588 + Mali-G610，缺一不可"**，明确边界。
- **项目内调研**：issues=0 / PR=0 / 1 次 commit（首版）、3 份中文技术文档、24 个 C++ 源文件（`main.cpp` 36KB、`yolov5s.cpp` 25KB、`opencl_undistort.cpp` 10KB）。架构清晰：`SafeQueue` 跨线程安全队列 + `thread_poll` 线程池 + `mpp` 硬件解码头 + `model/` 量化模型。
- **横向对比**：同形态有 [rockchip-linux/rknn-toolkit2](https://github.com/rockchip-linux/rknn-toolkit2)（官方工具链，但仅模型转换，不带应用管线）、[ultralytics/yolov5](https://github.com/ultralytics/yolov5)（模型本身，无硬件结合）、[NVIDIA/jetson-examples](https://github.com/NVIDIA-AI-IOT/jetson-examples）（Jetson 平台同类 demo）。RK3588 上做"双摄感知"的仓很少，github 上一手能跑+文档齐全的中文仓屈指可数。
- **信号判断**：✅ 实战 — 仓内置量化后的 rknn 模型，端到端一 command build。⚠️ 硬件绑死 — 必须 RK3588 + Mali-G610，迁移到其它 ARM SoC 不易。✅ 兼容 — RTMP 推流输出，可对接任何下游系统。⚠️ 安全/责任 — 辅助驾驶类项目必须明确"非自动驾驶、非 ASIL 认证"，README 没用大字标注（适合加入 disclaimer）。
- **适用场景**：**适合**：要做 RK3588 边缘 AI 感知 demo、需要双摄畸变矫正+检测同步管线的开发者；有 ADAS / 仓储机器人 / 工业视觉需求的嵌入式工程师。**不适合**：对延迟 < 10ms 的车规级场景；非 RK3588 平台（迁移要重写 OpenCL kernel）。

### 4. [brooxiacaigonv/AIrecall](https://github.com/brooxiacaigonv/AIrecall) ⭐38 — Agent 长期记忆层即装即用：Python SDK + Go memory server，episodic + semantic + 混合检索

- **仓库元数据**：Go + Python / 103 KB / 1 fork / MIT / topics 空（搜索词吃亏）/ 创建 2026-08-27T07:49:51Z / 推 16:22:21Z / 仓内 examples/、docs/、sdk-python/、server/ 子目录清晰；CHANGELOG + CONTRIBUTING + SECURITY + CODEOWNERS + .editorconfig 齐全。
- **README 提炼**：定位 **"agent 的长期记忆层 — 一次安装，跨会话记忆"**，三件事 — ① 端到端记忆：episodic memory（事件序）+ semantic memory（持久事实/偏好）；② 混合检索：关键词 + 向量联合 relevance scoring；③ 自动摘要：旧 episode 不删而压缩，长期记忆保持低开销。栈是 Python SDK stdlib-only + Go memory server 一纯 Go 依赖 + SQLite + in-process 向量索引。
- **横向与 mem0 / Letta 的差异化**：mem0 自己有云、关注向量检索；Letta（[letta-ai/letta](https://github.com/letta-ai/letta)）做 full agent runtime、记忆是其中一个子系统。AIrecall 的差异点是 **"只解记忆 + 单仓即可跑 + 零云依赖 + Python SDK 调用"**——不抢 agent runtime 的事。
- **仓库结构**：仓库虽新（创建于 2026-08-27），但已有 10 个 commits，最早 commit 在 2026-05-27（README 自承"已在 init 阶段开发 3 个月、此次公开首发"）。commit 信息 `Co-Authored-By: Claude <noreply@anthropic.com>` 频繁出现，表明 agent 参与度高。
- **项目内调研**：issues=0 / PR=0 / 10 个 commits。CHANGELOG 自带 `0.1.0` 起版本；SECURITY.md 已写；CODEOWNERS 注明上游贡献归口。
- **横向对比**：同形态有 [letta-ai/letta](https://github.com/letta-ai/letta)（agent runtime + memory 子模块）、[mem0ai/mem0](https://github.com/mem0ai/mem0)（向量为主，含云服务）、[zep-ai/zep](https://github.com/getzep/zep)（图+向量的商业化方案）、[langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)（agent framework 含 checkpointer）。AIrecall 走 **"agent 框架无关的可插拔记忆层"** 路线，差异化明显；其 Python stdlib-only 约束（避免 SDK 体积/依赖蔓延）也是少见的克制选择。
- **信号判断**：✅ 实战 — `pip install airecall-sdk` + `airecall init` 一行起步；SDK stdlib-only 部署摩擦小。✅ 兼容 — 不绑 agent runtime，可与 LangGraph / CrewAI / 自研 loop 同用。⚠️ 安全 — server Go 单端口 listen，权限模型 README 写明默认 token，部署必须改。✅ 研究诚信 — README 顶部就把"为什么不把全 session 塞 prompt"讲透，论据干净。
- **适用场景**：**适合**：要做任何形态 agent harness、缺长期记忆层的开发者；需要 SDK 干净、跨平台、轻量部署的个人/小团队。**不适合**：已有完整图/向量化方案的工程团队（zep / mem0 会更合适）；需要云 SaaS 多租户的团队（AIrecall 当前仅本地）。

### 5. [OnlyTerp/opengrok](https://github.com/OnlyTerp/opengrok) ⭐34 — 在 Grok Bot 里跑任意模型：一条命令、模型 picker、provider 凭据留本地、wire map probe-verified

- **仓库元数据**：Python / 2766 KB / 0 fork / MIT / 创建 2026-08-27T18:30:44Z / 推 20:27:56Z / topics 围绕"Grok Bot 升级拦截器"：`ai-agents` / `grok` / `llm` / `model-router` / `openai-compatible` / `windows`。
- **README 提炼**：定位 **"Grok Bot 模型劫持器 — 让 Grok 调用任何 OpenAI 兼容模型"**，四件事 — ① 一条命令安装：`python setup.py` 自动探测 Grok Bot、3 个问题同步 binding、写 config、做基线、打开模型 picker；② 模型 picker UI：每个 agent 一个下拉菜单，绑定后可一键测试、保存；③ wire map：每条模型对 Grok 的"协议映射"都用真实 HTTP 探针捕获，不靠文档描述（比如 Grok 的 `effort` 是 `xhigh` 不是 `max`、GLM 默认思考很难关闭、Claude 不接 `temperature`）；④ update-proof：`doctor.py` 监听 Grok 更新，wire map 失效立刻给提示。
- **核心 wire map（README 完整版节选）**：
  - **Grok (xAI)**：`effort=xhigh`、fast 模式无独立字段；opengrok 把 Grok 自己 RL 训练的 token 表搬过去。
  - **GLM (Zhipu)**：默认思考 — 不显式关掉就贵；`max` 是真名而非别名；opengrok 提供 verified token 表 + 显式 off-switch。
  - **Claude (Anthropic)**：不接 `temperature`；opengrok 按官方 SDK 提供的字段做事。
  - **OpenAI / Local**：默认走 OpenAI 兼容协议。
- **项目内调研**：issues=0 / 10 次 commits / 自带 `.github/` 工作流、`docs/`、`examples/`、`tools/doctor.py`、`tools/qa.py`、`wire-captures/`（保存了真实模型间沟通的抓包，作为 wire map 真值源）；`assets/` 含 hero 图 + 模型 picker UI 截图。
- **横向对比**：同类项目 [claude-code/claude-code-router](https://github.com/musistudio/claude-code)（Claude Code 模型劫持器）、[cline](https://github.com/cline/cline)（VS Code 内的多模型 shell）、[OpenHands](https://github.com/All-Hands-AI/OpenHands)（独立 agent platform 而不是劫持器）、[chatbox/chatbox](https://github.com/chatboxai/chatbox)（桌面 chat client）。opengrok 的差异化 — **"专攻 Grok Bot + wire map 用探针验证 + update-proof doctor"**，是模型劫持器在 2026-08 的新形态。
- **信号判断**：✅ 实战 — README 自带 quick start、tools/doctor.py + tools/qa.py 都齐。⚠️ 安全 — 凭据"留本地"声明清楚，但 PUT 请求从本地发往模型商、provider 看到的是 opengrok 的 UA；用户需自查模型商的 tos 条款。✅ 兼容 — 三平台覆盖（Windows / macOS / Linux）+ OpenAI 兼容接口。✅ 研究诚信 — wire map 用真探针保存，README 自承"不是 vibe"，文件保存到 `wire-captures/` 是可审计的。
- **适用场景**：**适合**：xAI Grok 重度用户、想用 Grok 调用 Claude/GPT/GLM 等其它模型的开发者；不愿为每次 Grok 升级重读 release notes 的工程团队。**不适合**：不依赖 Grok Bot 的开发者（用 [claude-code-router](https://github.com/musistudio/claude-code-router) 更直接）；需要模型可复现对比（opengrok 偏 consumer tool 而非 benchmark harness）。

## 完整前 15

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---:|---|---:|---:|---|---|---|---|---|
| 1 | [mouredev/hello-sdd](https://github.com/mouredev/hello-sdd) | 233 | - | 其他 | 新上 | Python | MoureDev 西班牙语 SDD 直播课全配套，samples + habits-cli 双仓教学 | ✅直播配套 artifacts |
| 2 | [LuxUmbra697/luxumbra-ai-learn](https://github.com/LuxUmbra697/luxumbra-ai-learn) | 52 | - | 其他 | 新上 | Python | 微信小程序 AI 知识库自动出题 + 学习复盘，单仓闭环"输入→练习→反馈" | ✅中文场景，小程序入口 |
| 3 | [MUJI0807/RK3588-Dual-Camera-AI-Perception-System](https://github.com/MUJI0807/RK3588-Dual-Camera-AI-Perception-System) | 50 | - | 其他 | 新上 | C++ | RK3588 上 YOLOv5s + UNet 双摄感知，OpenCL 畸变矫正 + RTMP 推流 | ⚠️非自动驾驶，要看 disclaimer |
| 4 | [brooxiacaigonv/AIrecall](https://github.com/brooxiacaigonv/AIrecall) | 38 | - | agent | 新上 | Go | Agent 长期记忆层，Python SDK stdlib-only + Go server SQLite + 向量混合检索 | ✅零云依赖、SDK 干净 |
| 5 | [OnlyTerp/opengrok](https://github.com/OnlyTerp/opengrok) | 34 | - | agent | 新上 | Python | Grok Bot 模型劫持器，picker UI + wire map 探针验证 + update-proof doctor | ✅wire-captures/ 可审计 |
| 6 | [h9-tec/LLM-Inference-Handbook](https://github.com/h9-tec/LLM-Inference-Handbook) | 26 | - | 模型 | 新上 | – | 从 first principles 到生产的 LLM 推理手册，经济性章节带"Arabic 一等公民" | – |
| 7 | [joeseesun/qiaomu-syc](https://github.com/joeseesun/qiaomu-syc) | 24 | - | 其他 | 新上 | – | 中文写作 Agent Skill，把孙宇晨克制散文技法拆解成"短句+数字锚点+冰山叙事"流程 | – |
| 8 | [SpatiaOS/Procedura](https://github.com/SpatiaOS/Procedura) | 23 | - | agent | 新上 | TypeScript | LLM 把文本 prompt 转可编辑参数化 3D 程序 + OpenUSD/URDF 导出 | – |
| 9 | [LuxUmbra697/LuxUmbra-Slides](https://github.com/LuxUmbra697/LuxUmbra-Slides) | 21 | - | 其他 | 新上 | Python | 中文场景 AI PPT 生成与编辑平台，FastAPI + LangGraph + React 19 + Vite | ✅同作者日发两条 |
| 10 | [drowzeys/keys-vLLm.0.27.1-GLM-5.3-Flash-NVFP4-NVFP4KV-1M-Context-Abliterated](https://github.com/drowzeys/keys-vLLm.0.27.1-GLM-5.3-Flash-NVFP4-NVFP4KV-1M-Context-Abliterated) | 20 | - | 模型 | 新上 | Python | GLM-5.3-Flash NVFP4 量化 + NVFP4 MLA KV，2× DGX Spark TP2，1M 上下文 passkey 验证 | ✅与 tonyd2wild 互相署名 |
| 11 | [Autobricks-AI/Arlo-AI-Desktop](https://github.com/Autobricks-AI/Arlo-AI-Desktop) | 20 | - | 其他 | 新上 | TypeScript | 自托管 AI 客服，PG 容器本地化，每条答复带原文引用 | – |
| 12 | [Asuka008/SynthexCode](https://github.com/Asuka008/SynthexCode) | 15 | - | agent | 新上 | Python | Claude Code-style 终端编码 agent，多模型 subagent + MCP + sandbox 权限层 | – |
| 13 | [xiaotianfotos/indexed](https://github.com/xiaotianfotos/indexed) | 15 | - | agent | 新上 | TypeScript | 多模态视频记忆，Chrome 扩展采集画面+字幕，向量索引 + Local Dashboard + AI Skill | – |
| 14 | [jankeesvw/omarchy-herdr](https://github.com/jankeesvw/omarchy-herdr) | 15 | - | agent | 新上 | QML | Omarchy 任务栏显示 herdr server 列表，agent 被阻断时数字 badge 变红 | – |
| 15 | [tonyd2wild/GLM-5.3-Flash-NVFP4-1M-KV-4x-DGX-Spark](https://github.com/tonyd2wild/GLM-5.3-Flash-NVFP4-1M-KV-4x-DGX-Spark) | 15 | - | 模型 | 新上 | Python | GLM-5.3-Flash NVFP4 KV 4× DGX Spark TP4，6.65M token KV 池，36 tok/s 单流 | ✅fp8 vs NVFP4 量化对比 |

> **同生态压缩**：第 10 与第 15 条同属 **"GLM-5.3-Flash NVFP4 KV 在 DGX Spark 上的部署"** 生态 — drowzeys 用 TP2 + 1.22M token KV，tonyd2wild 用 TP4 + 6.65M token KV 池；后者直接复用前者的 nvfp4_ds_mla B12x 路径并在 README 显式 credit。

## 数据方法

- **窗口**：`created:2026-08-27..2026-08-27`（UTC 闭区间；脚本 `windows.py --route daily` 的 `DAILY_CREATED`）。
- **检索**：GitHub Search API `/search/repositories?q=created:2026-08-27..2026-08-27+archived:false+(ai+OR+llm+OR+agent+OR+mcp+OR+assistant)+in:readme&sort=stars&order=desc&per_page=30`，不设 `stars:>N`。
- **过滤**：用 `scripts/rank.py` 剔除空壳/擦边仓（`size<15KB && language==""`、命中 NSFW 词），本批剔除 10 条空壳仓（`Cursor-AI-Crack` / `Topaz-Video-AI-Crack` / `Pika-AI-Crack` / `Krea-AI-Crack` / `Flux-AI-Crack` / `Valorant-Unlock-All-Agents` / `how-to-fish-cheats` / `testing-on-the-toilet` 等）；最终从 30 条入参保留 20 条，上表取前 15。
- **深挖对象**：取 `deep_targets`（脚本选 5 个，按"是否够新、README 体量、issue 与 release 体感"排序）。
- **排序**：当前总星降序；本页只展示窗口内新建的 15 条，按星数即得。
- **快照时间**：2026-08-28T00:10:42Z（脚本 `AS_OF_UTC`）。
- **slug**：`github-trending-2026-08-27`（来自 `DAILY_SLUG`）。
- **样本偏差**：含 `language == ""` 的条目 1 条（#6 h9-tec/LLM-Inference-Handbook），仓库 README 主要是英文 + 长篇 markdown；首次在日榜看到一条 `QML` 语言（#14 jankeesvw/omarchy-herdr），语言分布与近期典型日档基本一致。
