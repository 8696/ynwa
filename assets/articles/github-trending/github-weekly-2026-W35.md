## 2026-08-24..2026-08-30 · AI/agent/LLM 热门

### 核心信号

- 本周窗口（2026-08-24..2026-08-30）AI/agent/LLM 主题搜索返回 270,239 条仓库，最终入榜 30 条，**全部为新上，无连榜**；上一期 30 条无一进入本周前 30，呈完整换血。
- 中英文分布：英文约 22 条、中文约 8 条；语言分布 Python 10、TypeScript 7、null(纯文档或 HTML 外壳) 8、Go 2、JavaScript 2、Markdown 1。
- 「AI 代理团队」成最大类目：3 条新上（[headcount](https://github.com/cbrock84/headcount) 把 Claude Code 拆成 16 部门 146 skill、[opengrok](https://github.com/OnlyTerp/opengrok) 用 Grok Bot 当 harness 切换不同上游模型、[goldie](https://github.com/kacperkapusciak/goldie) 让 coding agent 直接出 App Store 截图），都把单 agent 包装成可编排 / 可换模型 / 可可视化的子系统。
- 大厂原创集中爆发：[Tencent/WeMM-Embedding](https://github.com/Tencent/WeMM-Embedding) 放全家桶（2B/4B/9B 三档 MMEB-v2/v3 SOTA），微信体系首个多模态 embedding 系列；[wide-trace/open-higgsfield](https://github.com/wide-trace/open-higgsfield) 把 40 个图像/视频模型集成进 Next.js 16 Studio，对位闭源 Higgsfield AI。
- Agent 互补：XiaoDuoYa/codex-with-chatgpt 把 ChatGPT 网页当规划脑、Codex 当执行手（OAuth + 只读 MCP 桥）；[sapientinc/PRAXIST](https://github.com/sapientinc/PRAXIST) 在 Codex 之上做"自动科研团队"，平行 peer + evidence protocol + 跨代合成，是本周体量最大新上（4530 星）。
- 争议信号：[codex-with-chatgpt #35](https://github.com/XiaoDuoYa/codex-with-chatgpt/issues/35) 担忧用 ChatGPT web 当后端违反 ToS，作者已公开澄清"不绕过任何额度、只走官方网页 + 只读 MCP"；[Tencent/WeMM-Embedding #3](https://github.com/Tencent/WeMM-Embedding/issues/3) HF NielsRogge 把 9B 在 MMEB-v2/v3 评估挂上 Papers with Code 并请求核验分数。
- 同生态压缩：腾讯本周双发 WeMM-Embedding + [Tencent-Hunyuan/Hy4-preview](https://github.com/Tencent-Hunyuan/Hy4-preview)（第 26 位），本表只展开前者。



### 重点深挖

**1. [sapientinc/PRAXIST](https://github.com/sapientinc/PRAXIST)** ⭐4,530 · 🍴365 · Python · NOASSERTION · size 15213KB · 默认分支 main
- **一句话**：在 Codex 之上做"自动科研团队"——平行 peer + task-owned 评测 + 持久 evidence + 跨代合成。
- **核心定位**：不是替代 Codex，是在 Codex 之上叠加持续研究循环。架构亮点：① 平行 peer（研究目标拆给多 peer 并行跑）；② task-owned evaluation（每条任务自带指标方向、基线来源、协议完整性校验）；③ durable evidence（产出可追溯的 evidence record，不是 chat log）；④ generation-to-generation synthesis（新一代消化前代 evidence 再出发）。定位不是 agent harness，是研究 harness。
- **安装**：`pip install --index-url https://pypi.org/simple "praxist[agents,codex]" && praxist setup --interactive --install-skills codex`，Wizard 走 Fair Source License / User Agreement / privacy / runtime profile / masked credentials / Codex skills / writable examples / readiness checks 全流程。
- **实战反馈**：[#3](https://github.com/sapientinc/PRAXIST/issues/3) `@Naoray` 报 Codex-native keyring auth 在 staged `CODEX_HOME` 下丢失：`praxist 0.5.0` + macOS + Python 3.13.13，`agent_runtime:codex_sdk` + `model_provider:openai_compatible`，setup 报 `ensure_codex_chatgpt_login: ok`，但首次 peer 轮次前就崩——0.5.0 在"用现有 Codex 订阅、不挂 API key"路径下是核心阻塞。[#8](https://github.com/sapientinc/PRAXIST/issues/8) `@rohanprichard` 报 stop_signal_path 用绝对路径却被相对 run_dir 拒（`run_lifecycle.write_external_stop_signal` 用 resolved path 比对 symlink 失败），路径处理一致性差。
- **横向对比**：与 LangChain / AutoGPT 类"agent 框架"不同，Praxist 不做"通用 agent 编排"，它假设**项目已经能跑且目标可量化**，缺的是路径。
- **信号判断**：⚠️ 实战（#3 在 Codex-native 路径阻塞）+ 研究诚信 + 安全 全部绿灯；作者在 [praxist.sapient.inc](https://praxist.sapient.inc/en/docs) 单独列示 readiness gates。
- **适用场景**：**适合**：已有可运行研究项目 / 跑得起来但不知往哪优化的团队 · **不适合**：一次性 prompt 工程 demo、目标不可量化或缺评测的项目、想替代整个 agent 框架的团队。


**2. [XiaoDuoYa/codex-with-chatgpt](https://github.com/XiaoDuoYa/codex-with-chatgpt)** ⭐1,382 · 🍴155 · TypeScript · MIT · size 148KB
- **一句话**：让 ChatGPT 网页当规划脑、Codex 当执行手，免 API key，靠只读 MCP 桥把 Codex 会话接上 ChatGPT。
- **核心定位**：抓到一个未被填满的缺口——用户付了 ChatGPT Plus/Pro 网页订阅额度但闲置，Codex/API 额度紧张还要烧 token 做规划与 review。设计哲学：① 不上传仓库（ChatGPT 只读 MCP 桥给的"必要那几行"）；② 不绕 API（只走官方网页 + cloudflared tunnel）；③ 一段话安装（给不懂 git/Node 的用户一段中文 prompt，让 Codex 自己装所有依赖）。
- **实战反馈**：[#32](https://github.com/XiaoDuoYa/codex-with-chatgpt/issues/32) `@Ygg-source`：提交验证码后 ChatGPT 没有完成回跳，"昨天同一项目一切正常，今天中途 workspace_info() 连报 3 次 mcp_network_error: Connection failed"。作者定位为 [#26](https://github.com/XiaoDuoYa/codex-with-chatgpt/issues/26) 新增的 `Content-Security-Policy: form-action 'self'` 阻断 OAuth 后跨域 302 callback，已 hotfix 提交 [commit ea0c074](https://github.com/XiaoDuoYa/codex-with-chatgpt/commit/ea0c074772bcc905a42c8f514acb088057fa8dc9)。[#33](https://github.com/XiaoDuoYa/codex-with-chatgpt/issues/33) `@Jack-git-wjl` 问 Linux + VS Code + 官方 Codex 扩展能不能跑，作者：底层兼容 Linux，但完整工作流依赖 Codex/ChatGPT 内置浏览器做连接器配置 + 配对，VS Code 官方扩展暂不支持。[#35](https://github.com/XiaoDuoYa/codex-with-chatgpt/issues/35) `@stonesword2024` 提 ToS 担忧，作者公开回应"不绕过任何 Codex/API/ChatGPT 额度、不把 ChatGPT 网页变 API/proxy backend，仍走官方网页产品"。
- **横向对比**：和 [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) 思路相似但 OpenBot 已被作者下线（本周 compare 掉出），"只读 MCP + OAuth + 不上传仓库"是这个项目活下来的关键。
- **信号判断**：⚠️ 实战（OAuth 回跳已修但偶发）+ 争议（ToS 讨论已正面回应）。
- **适用场景**：**适合**：ChatGPT Plus/Pro 订阅用户、想让 Codex 跑规划与 review 时不烧 API token 的独立开发者 · **不适合**：严格企业合规（要走 ToS 审计）、纯 IDE 党（VS Code 官方 Codex 扩展暂不支持）。


**3. [wide-trace/open-higgsfield](https://github.com/wide-trace/open-higgsfield)** ⭐1,080 · 🍴15 · TypeScript · **license none** · size 472KB
- **一句话**：闭源 [Higgsfield AI](https://higgsfield.ai) 的开源替身——Next.js 16 Studio 把 40 个图像/视频生成模型收进一个 prompt bar。
- **核心定位**：README 亮明"free, open-source alternative to Higgsfield AI"，目标是一个 prompt 驱动 12 图像 + 28 视频模型的开源实现。架构关键：① catalog 是 single source of truth（每个模型自带 settings rail + media roles）；② server actions 是唯一 caller（浏览器不直连生成 API）；③ 每个请求 = 一个对象 `{model, prompt, media, settings}` 映射到该模型的原生字段。
- **产品细节**：Image/Video 共用一个 composer 按所选模型自动判定模态；每个模型自带 settings allow-list（aspect ratio / resolution / duration / output format / audio / batch / prompt enhancement），不维护并行硬编码表；Media role 化（start frame / end frame / reference / video / audio）上传走 Vercel Blob scoped token；Gallery 四 scope：Image / Video / Assets / Favorites，IndexedDB 60 条 history + 6 秒撤销条；State 在 5 个 Zustand store（不每个模型一个 store）；自带 platform key 模式（httpOnly cookie 存 `id:secret`），缺 key 弹 modal 不静默失败。
- **实战反馈**：仓库暂未公开 issue。**风险**：license = none（README 自称"open-source"但仓库无 LICENSE 文件），商用边界需自行评估。
- **横向对比**：Higgsfield AI 闭源订阅、ComfyUI 节点工作台要本地 GPU；OpenHiggsfield 是"开箱即用 SaaS + 自托管 + 一键跑 40 模型"的中间形态。
- **信号判断**：⚠️ 实战（暂无 issue）+ 增长（1080 星、本周首发）+ 兼容（catalog 自描述模型元信息，未来加模型 0 改 studio）；研究诚信：未声明 license 是隐患。
- **适用场景**：**适合**：不想付 Higgsfield AI 订阅、要统一 UI 试多家视频/图像模型的创作者和工作室 · **不适合**：完全离线 / 离线 GPU 党（hosted 版依赖 Vercel Blob）。


**4. [Tencent/WeMM-Embedding](https://github.com/Tencent/WeMM-Embedding)** ⭐935 · 🍴65 · Python · Apache-2.0 · size 1502KB
- **一句话**：WeChat Vision 团队多模态 embedding 系列（2B/4B/9B 三档），MMEB-v2/v3 公开 SOTA，覆盖文本 / 图像 / 视频 / 视觉文档 / 交错多模态。
- **核心定位**：三档共享架构，全部支持 Matryoshka dimensions（2B: 64-2048 / 4B: 64-2560 / 9B: 64-4096）。最后一层 hidden state 在专用 `<embedding>` token 取出后做 L2 normalize；**音频暂不支持**。
- **基线（README 公开数字）**：MMEB-v2 78 数据集均值 2B 77.9 / 4B 79.2 / 9B 80.6，超过同档 VLM2Vec-V2 (59.3) / GME (55.4) / Qwen3-VL-Embedding (73.2) / DME-Small (74.8) / DME-Medium (78.4)；9B 在 Image/Video/VisDoc 三列全部 SOTA（81.9 / 74.3 / 83.3）。MMEB-v3（190 任务，含 53 text / 47 agent / 11 audio / MCMR）继续领先。
- **部署实测**：vLLM 0.27.0 (`--runner pooling --chat-template <path>/embedding_chat_template.jinja`) 和 SGLang 0.5.9 (`patch_sglang_video.py` + `--is-embedding --enable-precise-embedding-interpolation`) 两端都给了一行 wrapper。Matryoshka trick：2B 在 256 维保留 98.7% 全维 image+video 性能。
- **实战反馈**：[#3](https://github.com/Tencent/WeMM-Embedding/issues/3) `@NielsRogge`（HF 开源团队）已把论文和 6 个 paper-native evaluation 挂上 Papers with Code：4B 在 [COCO Captions I→T](https://paperswithcode.co/benchmark/coco-captions-image-to-text?task=image-understanding&eval=28342) + [Flickr30K I→T](https://paperswithcode.co/benchmark/flickr30k-image-to-text?task=image-understanding&eval=28344) 双榜第一；9B 在 [MMEB-v2](https://paperswithcode.co/benchmark/mmeb-v2?task=embedding-models&eval=28340) 和 [MMEB-v3](https://paperswithcode.co/benchmark/mmeb-v3?task=embedding-models&eval=28341) 双榜第一。[#2](https://github.com/Tencent/WeMM-Embedding/issues/2) `@JessyTsui`（Cerul.ai 视频理解 / 检索）官方问询细粒度动作 / 时序定位 / OCR / 长视频 / 组合查询提升点、延迟吞吐、是否有 MLX / 量化 / 托管 API 计划，作者尚未公开回复。
- **横向对比**：Qwen3-VL-Embedding 同样多模态 embedding 路径偏阿里生态；GME / VLM2Vec-V2 是学术开源；WeMM 是中文大厂首发 + 技术报告 + PWC 已挂榜的工业化对手。
- **信号判断**：✅ 实战（PWC 已挂、权重已上 Hugging Face、vLLM/SGLang 双部署）+ 研究诚信；已知空白：暂无音频 / 量化 / MLX。
- **适用场景**：**适合**：需要中文 + 多模态（图像 / 视频 / 视觉文档）混合 embedding 的 RAG / 检索团队 · **不适合**：纯文本 embedding、需音频 embedding（暂不支持）。


**5. [amosblomqvist/learn](https://github.com/amosblomqvist/learn)** ⭐907 · 🍴90 · TypeScript · **license 未声明** · size 277KB
- **一句话**：作者本人用的 AI 学习系统——把教学法编码进 skill、把可视化 / 出题 / 子代理拆成 extension，配套 `.pi` 配置直接 clone 用。
- **核心定位**：仓库本身就是一个 `.pi` 目录：`git clone https://github.com/amosblomqvist/learn .pi`，再打开 pi 就能用。模块：① `skills/teach/`（教学哲学 + 流程）；② `skills/visualize/`（idea 更适合看图时加一张最小可用图）；③ `extensions/ask-user-question/`（agent UI 弹窗问用户）；④ `extensions/quiz/`（带 ✓/✗ + 正确答案 + 解释的即时反馈题）；⑤ `extensions/md-log/`（markdown 文件关联 session）；⑥ `extensions/visual-tools/`；⑦ `agents/`（`researcher` / `svg-maker` / `mermaid-maker` 三个子代理）。
- **教学法本质**：先列"无条件成立的事实"，再问"我自己怎么发现这条"；用二分探测找认知边界；quiz-option construction procedure 把选择题变成对错立判的训练题。视觉化不是装饰、是结构化压缩（"the click"——孤立事实坍缩成可再生成的少数根概念）。
- **实战反馈**：[#4](https://github.com/amosblomqvist/learn/issues/4) `@xl188`：赞美 `skills/teach` 是"见过的最有思考的 AI 教学系统"，已在 Hermes Agent skill 体系做中文适配（quiz → 对话式 quiz 协议 / ask_user_question → clarify / researcher subagent → delegate_task），想 MIT 发布衍生版本、署原作，需要作者先给 license。[#3](https://github.com/amosblomqvist/learn/issues/3) `@bocho8`：直接问 "Will this repo have licensing?"。[#2](https://github.com/amosblomqvist/learn/issues/2) `@HwFee` 提增强：全局知识图跨 session 存活（每节点 = 原子概念 + 状态 + established_in + 依赖 + misconception_history），掌握驱动坍缩 / 展开（已掌握子图 → 存"再生成根"的超级节点；重验按连接度而非时间排）。
- **横向对比**：和 [Anthropic prompt-library / educational](https://docs.anthropic.com/en/resources/prompt-engineering/use-cases) 比，learn 把"教学法"显式编码为可复用 skill，而非 prompt template；和 Obsidian 比，learn 把"二分探测 + 坍缩/展开"自动化，不依赖用户主动整理。
- **信号判断**：✅ 实战（社区已有中文 Hermes 适配 + MIT 衍生请求）+ ⚠️ 安全（仓库**未声明 license**，GitHub 默认 all-rights-reserved；社区强烈呼吁加 LICENSE）+ 增长（24 号上线 7 天 907 星）。
- **适用场景**：**适合**：想用一个 pi 配置开箱即用的 AI 学习教练、且愿意自己按学习法改 skill 的个人学习者 · **不适合**：要商用或闭源分发的团队（缺 LICENSE）。


**6. [kacperkapusciak/goldie](https://github.com/kacperkapusciak/goldie)** ⭐718 · 🍴58 · TypeScript · MIT · size 3781KB
- **一句话**：给 coding agent 用的 App Store 截图生成器——驱动 iOS 模拟器录流程 → 加设备框/背景/标题 → 出 6.9" 截图 + 15-30s H.264 预览。
- **核心定位**：和 [software-mansion/argent](https://github.com/software-mansion/argent) 配套：argent 在模拟器回放 app 流程，goldie 给捕获画面加设备边框、背景、标题，并按 Apple 上传规则校验。框架无关（驱动模拟器，对 SwiftUI / UIKit / Flutter / React Native / Kotlin Multiplatform 都通用）。安装：`npm i -g goldie` + `npx skills add kacperkapusciak/goldie`。
- **设计哲学**：coding agent 直接驱动（"create App Store screenshots using goldie" 触发探索、写 flows + config、打开 studio）；同样 config 可 hand-run（`goldie doctor` / `goldie all` / `goldie studio`）；设计与 CLI 共用 `goldie.design.json`，避免"画一套、出另一套"。模板 6 套（editorial / showcase / magazine / storyboard / dynamic + 自定义 layout sequence），字体栈带 5 个内嵌。
- **实战反馈**：[#2](https://github.com/kacperkapusciak/goldie/issues/2) `@qiangweihewu` 报 `npm i -g goldie` 失败：`@swmansion/argent@^0.22.0` 在 npm 上不存在（`latest` / `next` 都指向 0.13.0）。**当前所有已发布 goldie 版本（0.2.0、0.2.1）的依赖都解析不出**，install 100% 失败——这是新用户最大障碍。[#4](https://github.com/kacperkapusciak/goldie/issues/4) `@badboy-tian` 报中文 marketing 文案渲染为 tofu：`goldie frame` 用 `@napi-rs/canvas`，默认 `-apple-system` / "SF Pro Display" 字体栈不含 CJK glyph；app 截图内文字正常，只影响"headline / subhead 加的 marketing 文本"。zh-CN 设备 `iphone-6.9` 100% 中招。
- **横向对比**：与 Figma 模板人工出图比，goldie 是"agent 跑一遍就能出全套"；与 [fastlane/deliver](https://github.com/fastlane/fastlane/tree/master/deliver) 比，goldie 不只是上传、还做视觉生成；argent 是上下游，不是竞品。
- **信号判断**：⚠️ 实战（**当前版本装不上** + CJK 字体栈对中文 App Store 截图硬阻断）+ 安全 / 兼容绿灯。Software Mansion 赞助发布。
- **适用场景**：**适合**：iOS 独立开发者 / 小团队，要把"agent 跑出截图"做成 CI 流水线的一环 · **不适合**：纯 Android 团队、纯中文 App Store 截图（要先解决 CJK 字体栈）。


**7. [cbrock84/headcount](https://github.com/cbrock84/headcount)** ⭐688 · 🍴102 · Markdown（实际是文档 + skill 仓库）· MIT · size 2999KB
- **一句话**：给 Claude Code 装一个"虚拟公司"——16 部门、146 skill，每个部门独立可安装的 plugin，按需加载。
- **核心定位**：把"在 Claude Code 里跑公司"做成结构化产物。主张："**Add a department, not a prompt**"。每个 skill 命名按 `department:skill`（如 `security:threat-modeling`、`finance:unit-economics`），名字空间天然不冲突。装法：`/plugin marketplace add cbrock84/headcount` + `/plugin install security@headcount`，按项目需要装部门。
- **核心设计**：① 16 个部门（CEO / Technology / Security / Finance / Demand Generation / Product / 等）+ Office of the CEO 主席；② 跨 7 个场景（SOC 2 enterprise 需求、安全事件、stalled funnel 等）走 [USE-CASES.md](https://github.com/cbrock84/headcount/blob/main/docs/USE-CASES.md) 端到端，包含"reviewer-class 部门在哪个节点叫停、不再加意见"；③ 每个部门还附 agent charter（`.claude/agents/`），可作为独立 subagent 委派、独占写表面；④ 配可交互 org chart（[cbrock84.github.io/headcount/org-chart.html](https://cbrock84.github.io/headcount/org-chart.html)），可搜索 / 进入部门 / 跳源码。
- **实战反馈**：仓库暂无公开 issue（开仓一周多、688 星已属高增；可能是用户都直接装 plugin 用、bug 反馈走 plugin 安装日志、还在快速迭代期问题往往通过 PR 收敛）。
- **横向对比**：和 [awesome-claude-code](https://github.com/anthropic-experimental/awesome-claude-code) 类资源目录比，headcount 是**单一公司组织形态**，skill 命名 + 部门归属 + 评审机制都打包。
- **信号判断**：✅ 实战（[cbrock84.github.io/headcount](https://cbrock84.github.io/headcount/) 已上线交互式 org chart）+ 增长 + 兼容（直接走 Claude Code plugin marketplace）。
- **适用场景**：**适合**：Claude Code 重度用户 / 团队，要把"安全 / 财务 / 增长 / 战略"等多个职能变成可加载部门、并按需加载不一次性下载所有 skill · **不适合**：只用 Cursor / Codex / 其它 agent 的团队（目前是 Claude Code 专用）。


**8. [chrisgreg/boop](https://github.com/chrisgreg/boop)** ⭐603 · 🍴29 · Go · MIT · size 695KB
- **一句话**：自托管的极简开发者通知收件箱——应用 POST 事件，Go 服务直接推到 Apple APNs，iOS 客户端拉详情。
- **核心定位**：1 个 Go 二进制 + 1 个 SQLite 文件 + 1 个 Docker 容器，没有托管 relay、没有账号系统、没有遥测。架构：apps 用 project API key POST 事件 → Go 服务 redact 后存 SQLite → 直接用 `.p8` 推 APNs（payload 只含 title/body/event id）→ iOS 客户端用自己设备凭据从服务端拉完整事件详情。零第三方依赖、零云中转。
- **产品形态**：① HTTP API（`POST /api/v1/events`），level: info/success/warning/error/critical；② 富事件体（`data.exception / stacktrace / tags / context / breadcrumbs` 渲染得更漂亮，自动 redact 敏感键）；③ Actions（最多 3 个按钮开 URL，长按 / 下拉通知本体 + 事件详情）；④ 嵌入式 web UI（Svelte，内嵌在 Go 二进制里）管 project + device + 配对 QR；⑤ iOS app（SwiftUI，iOS 26，自己 build + sign）；⑥ 历史回滚 + 备份一行命令（`sqlite3 data/boop.db ".backup backup.db"`）。
- **实战反馈**：唯一公开 issue 是 [feature: Android App](https://github.com/chrisgreg/boop/issues) `@cvreyher`（Discussion：Android App），目前 iOS only，Android 是 roadmap 上"planned"。
- **横向对比**：和 [ntfy](https://github.com/binwiederhier/ntfy) 比，boop 走"开发者向"（事件级别 + Actions + 富 stacktrace），ntfy 走"通用消息"；和 Pushover 比，boop 自托管零外部账号。
- **信号判断**：✅ 实战（Quick start 给 docker compose + binary 两条路径）+ 安全（httpOnly cookie / sqlite redact / 自托管无遥测）+ 兼容（amd64 + arm64 + Linux/macOS/Windows 静态二进制 + 内嵌 web UI）。
- **适用场景**：**适合**：个人开发者 / 小团队，需要把生产环境的 error_tracker / backup / deploy / payment 事件直推到手机，且不愿把事件交给第三方 relay · **不适合**：需要邮件 / Slack / Webhook 多通道的人（boop 暂只 APNs）、需要 Android 客户端的（计划中）。


**9. [gtlhuyidan-sketch/life-ipo](https://github.com/gtlhuyidan-sketch/life-ipo)** ⭐547 · 🍴19 · TypeScript + Python · MIT · size 28104KB
- **一句话**：「人生 IPO」——把财务 / 健康 / 知识 / 人脉 / AI 决策 / 团队执行装进一套可度量、可规划、可复盘的个人数据操作系统。
- **核心定位**：传统记账软件只回答"钱去了哪里"，人生 IPO 多回答三层：① 我拥有什么？② 健康 / 能力 / 关系是否在增值？③ 下一阶段最值得投入的事情是什么？计划能否真正执行？数据架构用主站 D1 + 专业工作台本地 SQLite / IndexedDB 的混合存储：主账号作为数据锚点（API 从 JWT 推导 `users.id`），专业工作台显式同步才成为主站快照。
- **六大能力域**：① 💰 财务资产（收支 / 预算信封 / 账户 / 资产 / 负债 / 投资组合 → 三张报表 + 净资产趋势 + 现金流）；② 🫀 健康资产（科室卡片 / 检查大项小项 / 连续指标 / 影像 / 诊疗路径 → 健康信号 + 期刊式趋势图 + 3D 图谱 + 医疗时间轴）；③ 📚 知识资产（学历 / 证书 / 知识产权 / 技能 / 作品 → 能力雷达 + 证据链 + 知识资本台账）；④ 🤝 人脉资产（人物档案 / 关系温度 / 互动时间线 → 关系网络 + 沟通策略 + 可核验识人报告）；⑤ 🧭 AI 问策（19 个决策维度主动读取主站 D1 五域字典 + 多轮质询 + 红队 + 综合裁决 → 事实简报 + 分歧网络 + 行动计划 + RACI + 指标 + 复盘）；⑥ 🌌 个人 / 团队（团队看板 / 甘特图 / OKR / RACI / 投票 / 审批 / 复盘 / 协作驾驶舱）。
- **设计原则**：① 主账号 = 数据锚点；② 五域事实先于 AI 结论；③ 记录 ≠ 洞察（连续指标 + 趋势 + 来源 + 反证共同构成可复盘判断）；④ 计划必须可执行（每项建议落到负责人 / 期限 / 领先指标 / 停止条件 / 复盘节奏）；⑤ 混合存储、最小暴露（本地 SQLite / IndexedDB + 主站 D1 各司其职，专业服务默认监听回环地址）。
- **实战反馈**：仓库暂无公开 issue；README 用脱敏演示数据展示 14 张核心界面截图；处于 Alpha 状态（status badge `Status-Alpha`），首发 25 号 / 31 号仍在 commit。
- **横向对比**：和 [firefly-iii](https://github.com/firefly-iii/firefly-iii) 比，人生 IPO 不止记账、还把健康 / 知识 / 人脉作为"资产"管理；和 Notion 比，life-ipo 给"五域数据 + 19 决策维度"做了硬结构，不是自由文档。
- **信号判断**：⚠️ 增长（547 星 / 24h 内 +71）+ 安全（主站用 JWT + 专业服务默认回环监听是正确姿态）+ 研究诚信（设计原则写清"主账号 ≠ 单一数据库"边界，避免伪统一）；**风险**：Alpha 状态、单兵开发、需要本地 Python 工作台配套、size 28MB，对生产部署尚未稳定。
- **适用场景**：**适合**：愿意自己搭一个"个人数据底座 + AI 问策"工作台的个人 / 极小团队、能接受 Alpha 阶段持续参与反馈 · **不适合**：想"开箱即用 + 不用自己维护"的个人用户、纯企业财务或医疗合规场景。


**10. [OnlyTerp/opengrok](https://github.com/OnlyTerp/opengrok)** ⭐383 · 🍴47 · JavaScript · MIT · size 2844KB
- **一句话**：让 Grok Bot harness 能跑任意模型——每个 agent 选模型、保存、native 协议通讯，扛过官方 bundle 升级。
- **核心定位**：直接抓痛点——把"非 Grok 模型"塞进 Grok Bot 通常"跑得起来但手感不对"（更慢、更笨、token 烧得凶）。原因不是模型本身，是 harness mismatch：模型在自家 harness 上 RL 训练，到了 Grok Bot 拿到通用 prompt shape + 错误推理开关。opengrok 提供 provider-maps（per-provider wire truth，**已验证、版本化、有测试**），覆盖 Grok / GLM / Claude / Gemini / DeepSeek / 本地 llama.cpp，每个 provider 一张"wire claim"对照表，每个声明都由 `wire-captures/` 里的真实抓包支撑。
- **核心设计**：① Contract A = `provider-maps.cjs`（客户端 direct body map 通道）；② Contract B = `provider-maps-hop.cjs` 的 `applyHarnessControls()`（hop 通道，真正在 box 上跑）；③ Cloud agent 多一步：stock Grok Bot cloud host **不读 `model-bindings.json`**，要靠 `tools/apply-box-patch.py`（带 anchor、idempotent、先 backup）把 binding consumer 打进 host bundle；④ `doctor.py` 给每台机 baseline，watch 文件 / 服务 / 缓存，**官方 bundle 升级后告诉你到底哪里动了**；⑤ "The laws"五条铁律：Evidence or it doesn't ship / 200-accepted ≠ honored / Silence is not cheap / 共享连接池撑不住负载 / Fail-closed over fake success。
- **实战反馈**：[#5](https://github.com/OnlyTerp/opengrok/issues/5) `@eafire15`：在 stock Grok Bot cloud host 上 `apply-box-patch.py` 不可用——它要打的 `openai-hop-session.cjs` 和 host 锚点（`resolvedTopLevelModelId` / `createOpenAiHopSession` / `hopBaseUrl` / `model-bindings` / `applyHarnessControls`）在 stock bundle 里**grep 计数全 0**，根目录只有单文件 webpack bundle `host-main.cjs` 25,645,078 字节，没有独立的 hop-session 文件，要求作者提供缺失的 base artifacts。[#8](https://github.com/OnlyTerp/opengrok/issues/8) `@dewa1981`：在 bundle version `3976e0c` 上 `apply-box-patch.py --dry-run` 直接 `ERROR: hop not found`，与 #5 同根。[#4](https://github.com/OnlyTerp/opengrok/issues/4) `@terrichan-git`：`doctor.py` 在 `setup.py` 写入 `bindings.sha = null` 的基线后，再跑 `doctor.py` 时 line 277 `kb.get('sha','')` 返回 None 而非默认空串，触发 `TypeError: 'NoneType' object is not subscriptable`，**工具被永久 wedge**——修复点是 `check_bindings()` 在文件缺失时返回带默认值的 dict 而不是空 dict。
- **横向对比**：和 [browser-use/macos-harness](https://github.com/browser-use) 这类"通用 agent harness"比，opengrok 不做 agent 编排、专攻"模型↔harness 协议层"；和 langchain 比，opengrok 把"模型原生 wire"做成显式可探测 / 可热加载的 map，而不是封装在抽象层背后。
- **信号判断**：⚠️ 实战（**当前 cloud-host 路径装不上**——issue #5 / #8 是硬阻断；#4 doctor.py first-run wedge 是简单 bug）+ 安全（fail-closed + 证据驱动 + 无外部依赖 + 自托管）+ 增长（383 星 / 5 天）+ 兼容（零依赖声明、零 JS bundler / build step）。
- **适用场景**：**适合**：在 Grok Bot / 类似 harness 框架下需要切多模型、有 wire-probe 能力、愿意本地跑 doctor baseline 的 agent 玩家 · **不适合**：只用单一模型 + 不在意 harness mismatch 的普通用户（被 #5 / #8 撞住的云端用户在 fix 之前请走 local mode）。



### 完整前 30

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 语言 | 一句话 |
| ---: | --- | ---: | ---: | --- | --- | --- | --- |
| 1 | [sapientinc/PRAXIST](https://github.com/sapientinc/PRAXIST) | 4530 | - | 检索 | 新上 | Python | Autonomous research system for measurable, computer-executable research. |
| 2 | [XiaoDuoYa/codex-with-chatgpt](https://github.com/XiaoDuoYa/codex-with-chatgpt) | 1382 | - | mcp | 新上 | TypeScript | ChatGPT thinks. Codex works. Use ChatGPT as the planning brain while keeping the Codex har |
| 3 | [wide-trace/open-higgsfield](https://github.com/wide-trace/open-higgsfield) | 1080 | - | 模型 | 新上 | TypeScript | A studio for image and video generation — one prompt bar, each model’s own settings, and e |
| 4 | [Tencent/WeMM-Embedding](https://github.com/Tencent/WeMM-Embedding) | 935 | - | 模型 | 新上 | Python | WeMM-Embedding is a family of universal multimodal embedding models by the WeChat Vision T |
| 5 | [amosblomqvist/learn](https://github.com/amosblomqvist/learn) | 907 | - | 其他 | 新上 | TypeScript | My AI learning system. |
| 6 | [Nanako0129/sepia](https://github.com/Nanako0129/sepia) | 905 | - | agent | 新上 | - | De-AI writing skill for Claude Code, Codex, Grok Build, and Antigravity — narrative-archit |
| 7 | [kacperkapusciak/goldie](https://github.com/kacperkapusciak/goldie) | 718 | - | agent | 新上 | TypeScript | ✨ agentic app store previews and screenshots |
| 8 | [yding-git/personal-edge-proxy](https://github.com/yding-git/personal-edge-proxy) | 698 | - | 其他 | 新上 | - | A practical multi-inbound, multi-outbound personal proxy setup with Xray, Hysteria2, REALI |
| 9 | [cbrock84/headcount](https://github.com/cbrock84/headcount) | 688 | - | mcp | 新上 | Markdown | An agent organization for Claude Code, structured as a company — 15+ departments, 125+ ski |
| 10 | [jprx/darwin-vm](https://github.com/jprx/darwin-vm) | 623 | - | 其他 | 新上 | Python | Run iOS/ macOS in Qemu. Virtual iPhone 17, 16, 15, 14, 13, 12 and M5-M1 Apple Si Macs supp |
| 11 | [chrisgreg/boop](https://github.com/chrisgreg/boop) | 603 | - | 其他 | 新上 | Go | A tiny, self-hosted notification inbox for developers. Something happened in one of your a |
| 12 | [gtlhuyidan-sketch/life-ipo](https://github.com/gtlhuyidan-sketch/life-ipo) | 545 | - | 其他 | 新上 | TypeScript | 人生 IPO：统一财务、健康、知识、人脉、AI 决策与团队执行的个人数据操作系统。 |
| 13 | [POUND0423/AI-drama-pound](https://github.com/POUND0423/AI-drama-pound) | 513 | - | 其他 | 新上 | - |  |
| 14 | [breslee1707/VI-Translate](https://github.com/breslee1707/VI-Translate) | 437 | - | 其他 | 新上 | Python |  |
| 15 | [OnlyTerp/opengrok](https://github.com/OnlyTerp/opengrok) | 383 | - | agent | 新上 | JavaScript | Run any model in Grok Bot — one-command setup, model picker UI, evidence-based provider wi |
| 16 | [leopard627/fire-your-seo-agency](https://github.com/leopard627/fire-your-seo-agency) | 371 | - | 模型 | 新上 | - | Fire your SEO·GEO agency 🔥 A Claude Code skill that audits and optimizes SEO·AEO·GEO·LLMO· |
| 17 | [tt-a1i/simplify-codebase](https://github.com/tt-a1i/simplify-codebase) | 360 | - | agent | 新上 | - | Prove and remove accidental codebase complexity without breaking behavior. |
| 18 | [hkqr/my-free-code](https://github.com/hkqr/my-free-code) | 351 | - | agent | 新上 | Python | Open-source multi-provider AI gateway for Claude Code and other coding agents, with model  |
| 19 | [mouredev/hello-sdd](https://github.com/mouredev/hello-sdd) | 341 | - | 其他 | 新上 | Python | Curso de SDD (Spec-Driven Development) desde cero |
| 20 | [KKKKhazix/sun-style-writing](https://github.com/KKKKhazix/sun-style-writing) | 336 | - | agent | 新上 | - | 从孙割19年白月光的痛彻心扉中蒸馏出来的无上心法 |
| 21 | [oboroge0/hayamimi](https://github.com/oboroge0/hayamimi) | 312 | - | 其他 | 新上 | Python | 早耳 - Real-time multilingual speech-to-text on CPU only. Live subtitles, browser dashboard, |
| 22 | [S1N6H/pentest-harness](https://github.com/S1N6H/pentest-harness) | 300 | - | agent | 新上 | TypeScript | Pentest Harness — Heaven for Hackers. A self-hosted AI agent harness for authorized pentes |
| 23 | [buaacyw/code-world-model](https://github.com/buaacyw/code-world-model) | 298 | - | 模型 | 新上 | Python | Code World Model  Official Repo |
| 24 | [DavidCarliez/trustmebro](https://github.com/DavidCarliez/trustmebro) | 283 | - | 模型 | 新上 | Go | Bypass llm guardrails by confusing it with fabricated tool output. |
| 25 | [nateherkai/snagtime](https://github.com/nateherkai/snagtime) | 279 | - | 其他 | 新上 | TypeScript | Free, self-hostable scheduling app with booking links, Google Calendar sync, SMTP notifica |
| 26 | [Tencent-Hunyuan/Hy4-preview](https://github.com/Tencent-Hunyuan/Hy4-preview) | 279 | - | 其他 | 新上 | Python |  |
| 27 | [QwenLM/Qwen3.8-Flash-Next](https://github.com/QwenLM/Qwen3.8-Flash-Next) | 265 | - | 模型 | 新上 | - | Qwen3.8-Flash-Next is the foundation model developed by Qwen Team, Alibaba Group. |
| 28 | [CHENG-LIANG1/real-company-interview-ai-coding-projects](https://github.com/CHENG-LIANG1/real-company-interview-ai-coding-projects) | 262 | - | agent | 新上 | - | 三个匿名化真实 AI Coding 面试项目题与一套通用解题方法 |
| 29 | [czm15053/linuxdo-idea-ui](https://github.com/czm15053/linuxdo-idea-ui) | 262 | - | 其他 | 新上 | JavaScript | 给 linux.do 换装的油猴脚本合集：JetBrains/Darcula IDE 风格、飞书 IM、钉钉 IM 三种外观，仅换皮不碰数据 |
| 30 | [lvgalvao/projeto-dados-ia-databricks](https://github.com/lvgalvao/projeto-dados-ia-databricks) | 258 | - | 其他 | 新上 | Python |  |

### 数据方法

口径：GitHub Search API `search/repositories?q=created:2026-08-24..2026-08-30+archived:false+(ai+OR+llm+OR+agent+OR+mcp+OR+assistant)+in:readme&sort=stars&order=desc&per_page=50`。窗口按 UTC 日历日（GitHub `created:A..B` 闭区间），本档窗口 2026-08-24..2026-08-30（周一~周日）。榜单按 stars 降序，再经 `rank.py` 剔除空壳 / 擦边后取前 30，已剔除 2 条空壳（`saurabhkumar8112/cyclomatic-complexity-skill`、`Straniero44/wenai`）。slug `github-weekly-2026-08-24..2026-08-30` 形式，本期 `github-weekly-2026-W35`。深挖顺序按本期前 10 名 1→10。
