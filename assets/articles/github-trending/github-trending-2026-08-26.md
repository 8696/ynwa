# GitHub 日榜 · 2026-08-26 · open-higgsfield 单日 550 星登顶 + Skill 形态继续吞噬周边（色彩学/视频理解/夕阳审计各占一坑）

> 数据快照：2026-08-26（UTC 闭区间 `2026-08-26..2026-08-26`，按当前总星排序取前 15）。首期无对照快照（2026-08-25 跑档未写入 `compare`），本期为 `rank.py --write` 的第一个有 `delta_from_prev` 字段的存档日。

## 核心信号

- **Top 1 由「全模型整合站」拿下**：[wide-trace/open-higgsfield](https://github.com/wide-trace/open-higgsfield) 单日 550 星，整档断层第一；它把 40 个图像/视频模型（Nano Banana、Veo 3.1、Wan、Flux、GPT Image 2、Kling 3、MiniMax、Qwen 等）塞进一个 prompt bar + 共享 gallery，是商业 Higgsfield AI 的开源复刻。
- **Skill 形态继续吞食垂类知识与工作流**：Top 5 里 [GENEXIS-AI/gpt-image-skill](https://github.com/GENEXIS-AI/gpt-image-skill) 把 ChatGPT 订阅转成 Codex/Claude Code 的图像生成 skill；[ooocooc/open-skill-sunset](https://github.com/ooocooc/open-skill-sunset) 反过来给累积的 AGENTS.md/CLAUDE.md/SKILL.md 做"夕阳审计"，发现死链/绝对路径/明文凭据；[Ayueh0102/Ronnier-skill](https://github.com/Ayueh0102/Ronnier-skill) 把台科大罗明一整门《应用色彩科学》课程笔记做成中文 skill；[Aqua-123/pstack-for-codex](https://github.com/Aqua-123/pstack-for-codex) 把 pstack 工程工作流的 45 个 skill + 23 个 Poteto Mode playbook 全装进 Codex。
- **"重复劳动缓存"赛道继续扩列**：[UditAkhourii/cdaf](https://github.com/UditAkhourii/cdaf)（视频 sidecar 格式）是把上周 [HuggingFaceTB/SmolVLM](https://github.com/huggingface/SmolVLM) 那种"先 OCR 一次再问答"的省钱思路推到视频理解上 — 每条新视频生成一次 `.cdaf` sidecar（gemini-2.5-flash），后面所有 agent 读文本，benchmark 显示答题准确率 20/20 vs 19/20、token 用量 1/10.1。
- **单卡/单机能跑大模型继续卷**：[MiaAI-Lab/Qwen3.8-Flash-Next-Dual-DGX-Sparks](https://github.com/MiaAI-Lab/Qwen3.8-Flash-Next-Dual-DGX-Sparks) 与 [0xBakeer/qwen38-flash-next-spark](https://github.com/0xBakeer/qwen38-flash-next-spark) 同一时间发两个并行 Qwen3.8-Flash-Next (180B) 在单/双 DGX Spark 上的部署；前者走 SGLang TP2 + NVFP4，后者把 51B 的 n-gram embedding 表扔 NVMe。两个仓加起来 72 星，是同一个生态的两条同时冒头的分支。
- **对照上期（2026-08-25 → 2026-08-26）**：原 Top 15 中 14 条全掉出（个人 Skill / 微信 WeMM-Embedding 之类日抛型居多），唯一复上榜是 [UditAkhourii/cdaf](https://github.com/UditAkhourii/cdaf)（新版加了 sidecar 时间戳漂移/凭空编造细节两条风险点，但首期未在榜，第二期是首次进 Top 15）。中英文项目 6 / 9。

## 重点深挖

### 1. [wide-trace/open-higgsfield](https://github.com/wide-trace/open-higgsfield) ⭐550 — 把 40 个图像/视频模型塞进一个 studio，主打"一个 prompt bar、一个 gallery"

- **仓库元数据**：TypeScript / 472 KB / 0 fork / 创建于 2026-08-26T06:09:58Z（与同期相比算一气呵成） / 推到 08:08Z 之后 / topics 空（页面没填）/ homepage `https://openhiggsfield.ai` / 无 LICENSE。
- **README 提炼**：定位是 **"Higgsfield AI 的开源复刻"**，三件事 — ① 一个 prompt bar 驱动图像和视频；② 40 个模型（12 图像 + 28 视频）在同一个 catalog 里，按模型自己的允许列表渲染各自设置，不存在一份硬编码并行表；③ 文件输入按角色分（起始帧、结束帧、参考图、视频、音频），文件先上传到 Vercel Blob 转成公开 URL 再进 generate 请求。栈是 Next.js 16 App Router / React 19 / Zustand / pnpm。
- **运行形态**：每个任务按下后画布上先出 skeleton，每 4 秒轮询一次，最长 10 分钟；批量提交时同模型走模型原生 count 设置，不同模型按"一请求一格"分发。每条完成的作品自带 viewer（prompt / 模型 / 解析后的 settings / 时间戳），reuse 按钮可一键恢复模型+settings+prompt。
- **项目内调研**：截止快照时 issues=0、discussions=0、PR=0。仓库是新生的，但 README 把"为什么要复刻"讲得很清楚 — 商业 Higgsfield 是闭源 studio + 订阅制，openhiggsfield.ai 上线了托管版（不用装 Node），要求用户自带平台 id:secret key。
- **横向对比**：同形态项目一般分两类 — 一类是各模型的"桌面客户端"（如 [ComfyUI](https://github.com/comfyanonymous/ComfyUI) 节点式 workflow、SD.Next），一类是模型的 SaaS 前端（leonardo.ai / krea.ai）。openhiggsfield 走的是 SaaS 前端开源化路线，竞品里形态最接近的是 [lllyasviel/Fooocus](https://github.com/lllyasviel/Fooocus)（专注 SDXL 单点）和 [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI)（桌面 + 自带 server）。区别在：openhiggsfield 把 40 个托管模型都接进来，不自训模型也不做工作流编排。
- **信号判断**：⚠️ 安全性 — 用户 id:secret 直接传到 Vercel Blob 转公开 URL，前端能看到；LICENCE 空等于默认 All rights reserved 的弱保护。✅ 实战 — README 里写明了 hosted 版本已上线，读者打开 `openhiggsfield.ai` 就能用。⚠️ 增长 — 0 fork、0 issue 一两天内不算异常，但这种"前端壳 + 调各家 API"的项目一旦闭源模型商限流就会断档（参考 [lumalabs/luma-web-sdk](https://github.com/lumalabs/luma-web-sdk) 历史上同类形态的沉浮）。
- **适用场景**：**适合**：需要在 40 个托管图像/视频模型之间快速 A/B、不想自己装 Node 栈的研究/创作者。**不适合**：需要本地离线推理、或在意模型可复现性的场景（托管后端是黑盒）。

### 2. [ooocooc/open-skill-sunset](https://github.com/ooocooc/open-skill-sunset) ⭐73 — Skill 多了谁来扫？这个 CLI 就是「夕阳审计」，给 AGENTS.md/CLAUDE.md/SKILL.md 做体检

- **仓库元数据**：JavaScript / 6795 KB / 2 fork / MIT / CI 矩阵覆盖 Ubuntu/macOS/Windows 三系统 × Node 20/22/24 × Codex (`~/.codex`) + Claude Code (`~/.claude`)。仓库自带 npm 包 [`skill-sunset`](https://www.npmjs.com/package/skill-sunset)，README 中英双语 + 动画 demo。
- **README 提炼**：核心问题是 **"模型升级了，老的 instruction 还有用吗？"** — 工具读 `AGENTS.md` / `CLAUDE.md` / `SKILL.md`，做五件事：① 死链/绝对路径/格式错 frontmatter/超大的 always-loaded 文件/明文凭据；② 同名 Skill 重复时只建议"能恢复的退役"，绝不直接删；③ 把"模型时代补偿规则"标 `TEST`（= "评估这个假设"，不是 "新模型不需要了"）；④ 输出 HTML/Markdown/JSON + 给 Codex 和 Claude Code 的 handoff prompt + 回滚 manifest；⑤ 域知识/安全规则/授权门/项目不变量都不会被自动退役。
- **项目内调研**：issues=0、discussions=0，但 npm 已有镜像 + CI 矩阵跑通；仓库自带一个 `test/fixtures/` 跑出真实报告（README demo GIF 就是这份 fixture）。`README.zh-CN.md` 已经写好，CLI 默认走本地静态分析，**不调 AI API、不吃模型 quota、不读 provider 凭据** — 这条边界写得很死。
- **横向对比**：同类工具一般是 linter（[markdownlint](https://github.com/DavidAnson/markdownlint)、[alex](https://github.com/get-alex/alex)）或 skills 索引器（[awesome-claude-skills](https://github.com/awesome-claude-skills)），没有专门做"该不该退役"判断的。skill-sunset 的差异化在于：① 区分"硬错误"和"模型时代假设"两类，假设不进退役名单；② 把 Codex 和 Claude Code 的 handoff prompt 直接生成出来 — 用户跑完 audit 可以一键把建议交给 agent 处理。
- **信号判断**：✅ 实战 — 测试矩阵覆盖三种系统+三种 Node+两种 agent，环境透明度高。✅ 兼容 — 同时认 `.codex` 和 `.claude`，且明示"任何有界目录都能传"，对其他不读 `AGENTS.md` 的工具也友好。⚠️ 研究诚信 — README 写得很克制（"No finding authorizes deletion. `TEST` means evaluate this hypothesis, not 'a newer model made this rule unnecessary.'"），但 0 issue 阶段还没有用户反馈验证它真能在真实世界分对"硬错误"和"假设"。
- **适用场景**：**适合**：维护 10+ 个 Claude/Codex skill 的团队/个人、关心 instruction drift 风险的人。**不适合**：只想清理单个项目的 markdown 死链（markdownlint 就够）。

### 3. [UditAkhourii/cdaf](https://github.com/UditAkhourii/cdaf) ⭐71 — 视频 sidecar 格式，把"AI 看视频"压成"AI 看文本"，gemini-2.5-flash 跑出的 20 题 benchmark 全对

- **仓库元数据**：Python / 107 KB / 6 fork / MIT / topics 全部围绕"AI 减 token 看视频"：`agentic-ai` / `ai-agents` / `file-format` / `gemini` / `llm` / `remotion` / `sidecar` / `token-optimization` / `video` / `video-understanding`。首页给的是 Zenodo 论文 doi（`22110594`），证明这不是脚本型玩具仓。
- **README 提炼**：核心是 **".cdaf 同名 sidecar 文件"** — 视频文件 `footage.mp4` 旁边放一个 `footage.cdaf`（带时间戳的纯文本描述）。生成一次后，所有 agent 读几百 token 的文本，不再跑一遍视频理解。复现命令一行：`npx cdaf-skill` 装 agent skill → `pip install "cdaf[generate] @ git+https://..."` 装 CLI → `cdaf generate ./footage` 生成 sidecar。
- **实测数据（gemini-2.5-flash, 20 题）**：sidecar 答题 20/20，直接看视频 19/20；每题 prompt token 从 3066 降到 303（10.1×），端到端 latency 降 35%。60 秒长视频这个比值线性放大到 50×。README 自报"生产环境视频 workflow 成本压到 1/25"。
- **项目内调研**：issue **只有 1 条** [#2](https://github.com/UditAkhourii/cdaf/issues/2)《Sidecar trust: timestamp drift, and confabulation as a distinct failure mode from omission》，作者把 spec/docs 与代码分开处理（关联 #1 PR 是按镜头切分生成的实现）。issue body 里实测一组 30s、16 镜头的广告：① 模型推理的镜头边界最大漂移 **1.4 秒**；② 漏掉 2 个真实 cut（含一个"动作 payoff 镜头被合并掉"）；③ 凭空多出 2 个边界。第二类问题更严重：模型"全视频一并看"时会**编造**没拍出来的事件，比如广告里修理动作只暗示不展示，sidecar 写"她完成了修理"。作者建议 §8 limitations 里把"added detail"和"omitted detail"并列写，且让 SKILL.md 教 agent "凡是'任务已完成'这种断言要回看帧验证"，与已存在的"stale sidecar 不信"对齐。
- **横向对比**：同类思路有 [Video-LLaVA](https://github.com/PKU-YuanGroup/Video-LLaVA)（端到端多模态）、[gemini-video-understanding 直接调 API](https://ai.google.dev/gemini-api/docs/video)（不缓存）、[Whisper 那种"先 ASR 一遍再问答"](https://github.com/openai/whisper)（音频不是视频）。CDAF 的差异点是 **"sidecar 是普适文本，跟下游 agent 框架解耦"** — 任何读文本的 agent 都能用，不绑定特定模型。生成侧复用了 gemini（不是自训），所以仓本身只有 107 KB。
- **信号判断**：⚠️ 安全 — sidecar 内容信任度问题已经被作者自己 issue #2 摊到桌面上，建议把"added detail"风险写进 SPEC.md §8。✅ 实战 — 20 题 benchmark 数据 + 1/25 成本降幅有具体复现命令。✅ 兼容 — `npx cdaf-skill` 支持 Windows/macOS/Linux，且自带 `--local` provider 离线跑。✅ 研究诚信 — 论文挂 Zenodo doi，作者主动暴露 sidecar 信任缺陷，没有装作"全场景无脑准"。
- **适用场景**：**适合**：构建"批量长视频 RAG / 视频工作流自动化 / agent 处理视频素材"的项目；想用一种普适 sidecar 格式给所有 agent 共享"一次性理解结果"。**不适合**：单条短视频一次性任务（缓存没复用价值）；不能用 gemini 或自训模型生成侧描述的闭源场景（不过 `--local` provider 提供了 offline 兜底）。

### 4. [GENEXIS-AI/gpt-image-skill](https://github.com/GENEXIS-AI/gpt-image-skill) ⭐63 — Codex/Claude Code 用 ChatGPT 订阅生成图像，明示"不开 Images API、不开 OPENAI_API_KEY"

- **仓库元数据**：JavaScript / 2126 KB / 8 fork / topics 全部围绕"agent skill + chatgpt 订阅绕开 Images API"：`agent-skills` / `chatgpt` / `claude-code` / `codex` / `gpt-image` / `image-generation`。
- **README 提炼**：把 Codex 的内置 `$imagegen`（走"Sign in with ChatGPT"，吃 ChatGPT/Codex 订阅 quota）包装成可从 Claude Code 或 Codex 自身调用的 skill。**显式边界**：① 屏蔽 `OPENAI_API_KEY`、API-key 登录、Images API fallback；② 直接 prompt 不动原文；③ 用户委托"做 5 个不同设计"时 agent 会为每个概念独立写 image-ready prompt；④ 参考文件必须是可读本地 PNG/JPEG/WebP，绝不"无图就用描述顶"；⑤ 单次默认 1 张，并行批 ≤ 4。
- **沟通形态**：README 一上来就放一段"粘贴到 agent 一次性安装"的 prompt，开头把授权范围写得很死 — 只允许"只读环境检查、用户级 Git/Node 22+/Codex CLI 安装、gpt-image 链接创建、ChatGPT 设备流登录"，拒绝"管理员提权、破坏性改动、替换已有鉴权、实际生成图像、点 Star"。装完给三句"$gpt-image Create..."的英文示例作为 getting started。
- **设计原则五条**：① prompt 是权威的，用户明确"做 5 个"时 agent 才生成 5 个 image prompt；② 参考图就是文件，绝不拿描述顶替未解析路径；③ 修订默认改"上次结果"（`--edit-target`），不是源图；④ 普通生成保持轻量（quick auth check → 1 张 → 最小 PNG 健全性检查 → PATH + inline Markdown）；⑤ 并行批显式有界（默认并发 2、上限 4、无 doctor/plan/inspect/自动重试）。
- **项目内调研**：issues=0、discussions=0、PR=0。仓库还在"刚发布"阶段，但仓库自带 `generated-images/subscription-workflow-smoke.png` 和 `reference-edit-smoke.png` 两张 smoke test 截图证明 pipeline 真能跑通。`AGENT_INSTALL.md` 把授权边界写成一页独立文档，跟 README 的"安装 prompt"互相绑定。
- **横向对比**：同类项目 [openai/openai-quickstart-python](https://github.com/openai/openai-quickstart-python)（直接走 API）、[anthropics/anthropic-sdk-python](https://github.com/anthropics/anthropic-sdk-python)（同质）、[Stability-AI/generative-models](https://github.com/Stability-AI/generative-models)（SD 系列）。gpt-image-skill 的差异化在于 **"用订阅而不是 API 余额 + 显式禁止 API 兜底"** — 这条边界让工具不能被简单"加个 fallback 就破解"，对只买 ChatGPT Plus 的个人开发者最有意义。
- **信号判断**：✅ 实战 — README 自带 smoke test 截图、smoke 流程跑通。⚠️ 安全 — 边界写得死（拒绝 OPENAI_API_KEY/API-key 登录），但这个边界本身是"用户体验边界"而非"技术边界" — 用户拿到代码后想改很容易；这是商业策略不是技术护栏。⚠️ 增长 — 8 fork 在 6 小时内属于早期放量，但仓库 topics 已精准覆盖"agent skill + chatgpt 订阅"两个高搜索词，扩散路径清晰。⚠️ 研究诚信 — README 主动引 OpenAI 自家说明（"image generations use included limits 3–5× faster on average"），没有把"订阅额度"藏起来。
- **适用场景**：**适合**：只有 ChatGPT Plus/Pro 订阅、想把 Codex/Claude Code 当统一入口的开发者；做"一次委托多概念图像"的设计场景。**不适合**：已有 OPENAI_API_KEY 想做批量并发（订阅额度本就更敏感）；需要修改 GPT-Image 模型参数做研究的场景（这里是 skill 包装层，不开放 model 调参）。

### 5. [Ayueh0102/Ronnier-skill](https://github.com/Ayueh0102/Ronnier-skill) ⭐52 — 把台科大罗明教授《应用色彩科学》一整门课做成中文 skill，CIEDE2000 / CIECAM02 全覆盖

- **仓库元数据**：PowerShell / 474 KB / 4 fork / topics 围绕"色彩学 + Claude Code skill"：`agent-md` / `ciecam02` / `ciede2000` / `cielab` / `claude-code` / `claude-skills` / `codex` / `codex-skill` / `color-appearance` / `color-science` / `colorimetry`。
- **README 提炼**：定位 **"色彩科学/色度学完整中文学习笔记"**，包成 Claude Code skill + Codex 兼容 + Cursor/Windsurf/Cline 通过 `AGENTS.md` 都能读，覆盖 ① CIE 色度学（XYZ/量测几何）② 物体光学（Snell/Fresnel/Lambert–Beer/Kubelka–Munk）③ 量测仪器与不确定度（MCDM、Type A/B 误差）④ 光源与色温（D-series、LED）⑤ 视觉与对立色理论、色觉异常 ⑥ 心理物理学（Weber/Fechner/Stevens/Thurstone）⑦ 色序系统（Munsell/NCS/Ostwald/DIN/OSA-UCS/Coloroid）⑧ 色差公式（CIELAB→CMC→CIE94→CIEDE2000 + S-CIELAB）⑨ 同色异谱四种分类 ⑩ 色貌模型（CIECAM02/CAM16）⑪ 色适应（von Kries/CAT02）⑫ 演色性（CRI/Rf/Rg/Color Vector Graphic）。
- **20 篇课堂笔记 ≈ 13,000 行**：每篇先讲"这东西在解什么问题"再给公式；不只列公式，还讲 **"L*=50 的灰 Y 是多少"** 这种工程细节；6 个 reference 文件（公式索引 / 术语消歧 / 课件 vs 标准差异表 / 词典 / 文献图 / 主要原始来源蒸馏）。
- **"每个常数都验算过"**：README 举了一个例子 — DIN 6164 的 darkness-degree 常数印成 6.1273，但定义说 D 在 optimal colour 处必须为 0；6.1273 算出 D=0.0729，6.1723 才算出 D=0.00003 — **数字颠倒**。差异表里列了 **20 个源材料里发现的错误，其中 5 个会"静默破坏你的代码"**。这种对自己参考来源的逆向校核，是同类笔记里少见的。
- **项目内调研**：issues=0、discussions=0、PR=0。仓库只发布几小时。仓库自带 `INSTALL.md` 开篇就一张"我在用哪一个 agent"的对照表，每一步都有"预期画面"和"疑难排解"（含 Windows 执行原则、skill 没触发、中文乱码等细节）。标注"**这不是官方笔记，作者未获得教授审阅背书**" — 免责声明写得很清楚。
- **横向对比**：同类有 [mahmoud/awesome-color](https://github.com/ayman-mahmoud/color-science)（英文资源聚合）、[colour-science/colour](https://github.com/colour-science/colour)（Python 库，非笔记）、课程笔记类多散落在个人博客。Ronnier-skill 的差异化在于：① 中文完整笔记 + Claude Code skill 双形态；② 对源材料做了反向校核（20 处错误 + 5 处会破代码）；③ 同时标注"课件年代的 CAM16 已被 CIECAM16 (CIE 248:2022) 替代"这类**时代差**，避免读者把 2021 课件当 2026 标准。
- **信号判断**：✅ 实战 — `INSTALL.md` 把 Windows 乱码、skill 未触发等细节都列了，是真装过的人写的；13,000 行 notes 体量足够。⚠️ 安全 — skill 形态本身只读文档、不会执行外部代码，所以风险面窄。✅ 兼容 — Claude Code + Codex + Cursor/Windsurf/Cline 四种都覆盖，且 `references/` 是纯 Markdown，"只想读笔记"路径无依赖。⚠️ 研究诚信 — 主动声明"非官方、非审阅"，并把"20 处错误 / 5 处会破代码"这种自我打脸的内容放首页，论文级别的诚信度。
- **适用场景**：**适合**：做显示/印刷/影像色彩管理的工程师、需要给学生讲色彩学的中文教师、研究 CIEDE2000/CIECAM02 的研究生。**不适合**：只想找一个能跑的色彩计算库（用 Python 的 [colour-science/colour](https://github.com/colour-science/colour) 更合适）。

## 完整前 15

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---:|---|---:|---:|---|---|---|---|---|
| 1 | [wide-trace/open-higgsfield](https://github.com/wide-trace/open-higgsfield) | 550 | - | 模型 | 新上 | TypeScript | 40 个图像/视频模型的开源统一 studio，Vercel Blob 转 URL | ✅托管版已上线 |
| 2 | [CHENG-LIANG1/real-company-interview-ai-coding-projects](https://github.com/CHENG-LIANG1/real-company-interview-ai-coding-projects) | 102 | - | agent | 新上 | – | 三个匿名化真实 AI Coding 面试项目题 + 通用解题方法 | 文档类 |
| 3 | [ooocooc/open-skill-sunset](https://github.com/ooocooc/open-skill-sunset) | 73 | - | agent | 新上 | JavaScript | 给 Codex/Claude 的 SKILL/AGENTS/CLAUDE 做"夕阳审计"，分硬错误 vs 模型时代假设 | ✅CI 矩阵三系统×三 Node×两 agent |
| 4 | [UditAkhourii/cdaf](https://github.com/UditAkhourii/cdaf) | 71 | - | agent | 新上 | Python | 视频 sidecar 格式，gemini 一次性理解 + 后续 agent 读文本（10× token 节省） | ⚠️作者自暴 sidecar 信任风险 #2 |
| 5 | [GENEXIS-AI/gpt-image-skill](https://github.com/GENEXIS-AI/gpt-image-skill) | 63 | - | agent | 新上 | JavaScript | Codex/Claude Code 用 ChatGPT 订阅生成图像，明禁 OPENAI_API_KEY/Images API 兜底 | ✅自带 smoke test 截图 |
| 6 | [AustineA/app-landing-seo](https://github.com/AustineA/app-landing-seo) | 53 | - | 设计skill | 新上 | JavaScript | – | – |
| 7 | [MiaAI-Lab/Qwen3.8-Flash-Next-Dual-DGX-Sparks](https://github.com/MiaAI-Lab/Qwen3.8-Flash-Next-Dual-DGX-Sparks) | 52 | - | 模型 | 新上 | Shell | Qwen3.8-Flash-Next-NVFP4, 2× DGX Spark + SGLang TP2 | – |
| 8 | [Ayueh0102/Ronnier-skill](https://github.com/Ayueh0102/Ronnier-skill) | 52 | - | agent | 新上 | PowerShell | 台科大罗明《应用色彩科学》20 篇笔记做成中文 Claude/Codex skill | ✅20 处源材料错误+5 处会破代码 |
| 9 | [okooo5km/rembrandt-portrait-lighting](https://github.com/okooo5km/rembrandt-portrait-lighting) | 48 | - | 其他 | 新上 | – | 把人/宠物照转成伦勃朗光影棚肖像 | – |
| 10 | [Aqua-123/pstack-for-codex](https://github.com/Aqua-123/pstack-for-codex) | 39 | - | 设计skill | 新上 | TypeScript | pstack 工程工作流移植到 Codex, 45 个 skill + 23 个 Poteto Mode playbook | – |
| 11 | [Lucas-Xi/IntentRoute-AI](https://github.com/Lucas-Xi/IntentRoute-AI) | 37 | - | 模型 | 新上 | C# | Windows 上 AI 辅助按应用分流路由，OpenAI/Ollama 起草 + sing-box TUN 数据面 | – |
| 12 | [seekskyworld/CreatPPT](https://github.com/seekskyworld/CreatPPT) | 29 | - | agent | 新上 | TypeScript | Agent-first web 演示空间，简报转可编辑幻灯片，按需导出 PPTX | – |
| 13 | [cporter202/job-data-apis-and-scrapers](https://github.com/cporter202/job-data-apis-and-scrapers) | 22 | - | 其他 | 新上 | JavaScript | 求职数据 API/爬虫目录（招聘信号/薪资/招聘） | – |
| 14 | [0xBakeer/qwen38-flash-next-spark](https://github.com/0xBakeer/qwen38-flash-next-spark) | 20 | - | 模型 | 新上 | Python | Qwen3.8-Flash-Next (180B) 单卡 DGX Spark，51B n-gram embedding 表扔 NVMe | – |
| 15 | [yunxiao11xie/ai-to-edge-deployment](https://github.com/yunxiao11xie/ai-to-edge-deployment) | 19 | - | 其他 | 新上 | – | 从 AI 基础到端侧部署优化，面向嵌入式工程师的完整学习路线 | – |

> **同生态压缩**：第 7 与第 14 条同属 **"Qwen3.8-Flash-Next 单/双 DGX Spark 部署"** 生态；前者走 SGLang TP2 双卡 NVFP4，后者走单卡 + NVMe 卸载 51B embedding 表，主题高度重叠。

## 数据方法

- **窗口**：`created:2026-08-26..2026-08-26`（UTC 闭区间；脚本 `windows.py --route daily` 的 `DAILY_CREATED`）。
- **检索**：GitHub Search API `/search/repositories?q=created:2026-08-26..2026-08-26+archived:false+(ai+OR+llm+OR+agent+OR+mcp+OR+assistant)+in:readme&sort=stars&order=desc&per_page=30`，不设 `stars:>N`。
- **过滤**：用 `scripts/rank.py` 剔除空壳/擦边仓（`size<15KB && language==""`、命中 NSFW 词），本批剔除 1 条 `saurabhkumar8112/cyclomatic-complexity-skill(empty-shell)`；最终从 30 条入参保留 15 条上表。
- **深挖对象**：取 `deep_targets`（脚本选 5 个，按"是否够新、是否有 issue/README 干货"排序）。
- **排序**：当前总星降序；本页只展示窗口内新建的 15 条，按星数即得。
- **快照时间**：2026-08-27T00:11:02Z（脚本 `AS_OF_UTC`）。
- **slug**：`github-trending-2026-08-26`（来自 `DAILY_SLUG`）。
