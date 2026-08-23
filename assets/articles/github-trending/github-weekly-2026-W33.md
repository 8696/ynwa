# GitHub 周榜 · 2026-W33 · DeepSeek Harness 单生态吃掉本周大半热度 + AI 水印剥离 / 任务感知路由三线齐发

> 数据口径：基于 [GitHub Search API](https://api.github.com/search/repositories) `q=created:2026-08-10..2026-08-16+archived:false+(ai OR llm OR agent OR mcp OR assistant)+in:readme&sort=stars&order=desc&per_page=50` 抓取 2026-08-10..2026-08-16（UTC 整周 7 天闭区间）新创建仓库；关键词五槽位 `ai / llm / agent / mcp / assistant`；不限 stars 下限、不限语言、不限 archived。快照时间：2026-08-23 CST 凌晨。ISO 周编号 W33（上周一 2026-08-10 至 上周日 2026-08-16，UTC）。

上周共有 50 条新创建仓库进入候选池（README 命中 ai/llm/agent/mcp/assistant 任一关键词；周窗口抓 50 条时 GitHub 已截断，没再扩大窗口）。Top 30 取上周（按 star 数降序）。本周榜重点深挖 Top 10。

## 核心信号

- **DeepSeek Harness 单生态吃掉上周大半热度**：Top 30 中 19 条直接挂在 DeepSeek Harness（DSH）插件/桌面端/生态名单下——[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) 本身 18.7 万⭐登顶（官方账号 + 社区在用）；[anywhere-labs/deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop)（1.88 万⭐）和 [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market)（2005⭐）分别解决"桌面"和"市场"两条用户侧缺位；[awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)（1.18 万⭐）直接做了 awesome 索引 + awesome-dsh-plugin.com 站点。同生态还包括 [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard)、[zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui)、[ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI)、[Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale)、[dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop)、[bowenliang123/dsh-context](https://github.com/bowenliang123/dsh-context)、[NanmiCoder/dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams)、[zouyuxuan122/Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC)、[alchaincyf/deepseek-harness-orange-book](https://github.com/alchaincyf/deepseek-harness-orange-book)、[dsh-tauri-desk/deepseek-harness-desktop](https://github.com/dsh-tauri-desk/deepseek-harness-desktop)、[ysr666/dsh-vision-router](https://github.com/ysr666/dsh-vision-router)、[0xsline/awesome-deepseek-harness](https://github.com/0xsline/awesome-deepseek-harness)、[yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite)、[Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report)。**Harness = agents 时代的操作系统内核**，所有插件作者押注"一个插件能装进 DSH = 全平台用户能装"。
- **AI 水印剥离工具出现，定位是"自有内容的出处管理"**：[guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover)（1.73 万⭐，Python stdlib 实现 + agent skill）位居上周第三，覆盖 Claude / Gemini SynthID-Text / OpenAI provenance / Kirchenbauer / Aaronson 多家 + 文件层 C2PA / EXIF / XMP。README 自承"privacy & hygiene on content you own"——和通常被贴"水印绕过"标签的工具定位不同，作者明确把它定位为"自有内容的出处剥离/迁移"。本期周榜同主题只此一家。
- **任务感知 / 模型轨迹锚定 涌现"机制研究"层**：[xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard)（3728⭐，两阶段锚定 + Minimal 起步 Standard 提升）从工程视角给出"agent 怎么按任务切 persona"的预设骨架。但作者 2026-08-17 在 README 明确写"项目已停止维护"（DeepSeek 官方 API 和 opencode go 订阅涨价，评估循环跑不起），只剩"机制发现 + dose-response 数据 + tooling（context-gate / prefab pipeline / probe suite）"留在仓库，**这是上周榜里唯一一个明确"主人在告别"的高位项目**。
- **DSH Desktop 的"内置 vs 升级"是上周榜最实在的工程痛点**：[anywhere-labs/deepseek-harness-desktop#506](https://github.com/anywhere-labs/deepseek-harness-desktop/issues/506) 报告"内置 dsh-market v1.17.1 不显示升级按钮，但 npm / GitHub 已到 v1.20.0"；#508 报告"bundled dshmarket 把裸 npm target 送到 desktop exact-version gate"——本质都是"打包壳 vs 线上 npm"两套版本节奏不一致。同生态的 [dsh-market/dsh-market#293](https://github.com/dsh-market/dsh-market/issues/293) 给出补充："点开插件卡片或截图预览后市场界面空白"是宿主 React 根和 `createPortal(..., document.body)` 的双根冲突，1.20.3 已用"自有容器 + append 末尾"修。**结论：DSH 生态第一波热度全在"多端装上 + 跑通"，第二波热点会集中在"跨端版本同步 + 状态一致性"**。
- **TUI/桌面端 UX 0.9.0 回归成 Top 10 标志事件**：[ccch1mneyyy/dsh-TUI#497](https://github.com/ccch1mneyyy/dsh-TUI/issues/497) 报"Windows Terminal + WSL 下消息正文排版崩坏（加粗符原样、中文碎行、英文拦腰断）"，作者排查指向 0.9.0 新增依赖 `get-east-asian-width` 的 CJK 宽度回归；同 #493 报"0.9.0 移除浮层负 y 钳制导致模型选择器焦点行不可见"。两条 0.9.0 已知问题 + 同生态 #496 "/review 被碰撞过滤挡掉，rawInput 丢失"——"周内爆款"的副作用是密集的 UX 回归，README 给的应急方案是回退到 0.8.8。
- **Cordis 框架 + Paper 完成学术闭环**：DSH 选用的 [Cordis](https://github.com/cordiverse/cordis) 框架背后有一份独立 pre-print 仓库（[cordiverse/paper](https://github.com/cordiverse/paper)）——给"可逆时空组合性"提供学术形式化基础。这是 Top 30 内**唯一非代码仓**，进入简评（第 9）。
- **anti-slop 把"低证据 TS/JS 写法"做成 Oxlint 规则层**：[dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop)（3469⭐）用 `npx skills add` 给 coding agent 一份"识别并拒绝低证据代码"的 lint 规则集；29 个 open issue（项目从 28→25 一路排下来）集中在"CI 改善 / 规则文档 / alias 解析盲点 / SAFETY 注释空字符串绕过"——AI 生成代码质量管控是上周 Top 30 里工程化最扎实的一档。
- **样本语言分布（Top 30）**：TypeScript 14 · JavaScript 3 · Python 3 · Rust 2 · HTML 2 · Java 1 · PowerShell 1 · Zig 1 · Shell 1 · 未知 2。TS+JS 占 56%，是 harness / 桌面端 / 工具生态的天然主场；Rust + Zig 各 1，是 desktop-binary-side 的新尝试（[dsh-tauri-desk/deepseek-harness-desktop](https://github.com/dsh-tauri-desk/deepseek-harness-desktop) 5MB 安装包 / [vercel-labs/fx](https://github.com/vercel-labs/fx) 7.8 MiB 二进制）。
- **样本中英文分布**：英文 16 / 中文 11 / 双语（中英 README 并列）3。周榜中文占比明显上升，主要来自 DSH 中文插件作者群（梁神模式 / 鲸鱼娘 / 橙皮书）。

## 重点深挖 Top 10

### 1. [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) ⭐187,477

- **一句话**：DeepSeek 官方开源 agent harness，架构原则"万物皆插件"，由 Cordis 框架承载。
- **元数据**：TypeScript / 108.9 MB / topics `ai-agents / cordis / dsh / dsh-plugin` / 创建 2026-07-25；累计 star 18.7 万含本仓库早期阶段；DSH 官方账号 `deepseek-ai`。
- **核心价值**：① **架构原则"万物皆插件"**——README 一句"everything is a plugin"，模型、工具、沙箱、会话存储、UI、agent loop 本身都是可替换的插件，不存在"硬编码的 agent"；② **Cordis 框架底层支撑**——README 明示底层用 [Cordis](https://github.com/cordiverse/cordis)，其设计哲学（"可逆时空组合性"）有独立 [paper pre-print](https://github.com/cordiverse/paper) 写完整；③ **两条入口**——`npx @deepseek-ai/dsh web` 直接起本地 Web（默认 `http://127.0.0.1:3080`），或源码 `pnpm install && pnpm run build && pnpm dsh web`，对 npm 一键 / 二次开发友好；④ **协议入口**——插件仓库打 [`dsh-plugin`](https://github.com/topics/dsh-plugin) topic 即可被搜索，是"被发现"的低门槛路径。
- **README 提示**：当前 developer preview 阶段，**会有破坏性更新**——作者不藏这层风险。
- **信号**：仓库无公开 issue 数据（API 返回 0 条）；同生态周边仓的 issue 多反向指向 DSH 协议层的兼容性（如 [anywhere-labs/deepseek-harness-desktop#506](https://github.com/anywhere-labs/deepseek-harness-desktop/issues/506) 的内置版本与 npm 不同步）。横向对比 [LangChain](https://github.com/langchain-ai/langchain)（Python 优先 / 重 SDK）、[AutoGen](https://github.com/microsoft/autogen)（多 agent 框架 / 单代码仓巨型 SDK）——DSH 的"插件协议 + Cordis 组合性"和这两家"统一 SDK + 异步回调"是两种完全不同的 agent 工程哲学。
- **争议信号**：⚠️ developer preview 阶段会有破坏性更新——这意味着上周榜里 19 条 DSH 周边插件在 DSH 升级后**很可能**要改 hook 路径或 manifest 字段；社区目前没有公开兼容窗口公告。
- **适用场景**：**适合**：想在 1 个月内把"agent loop + 工具 + 模型 + UI"全部可替换的团队 · **不适合**：希望"装一次稳一辈子"的生产场景（prepreview 阶段）、不熟悉 Cordis / TypeScript 的个人开发者。

### 2. [anywhere-labs/deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop) ⭐18,881

- **一句话**：社区开源的 DSH 桌面客户端（Windows x64 + macOS Universal），"万物皆插件"的桌面本体也是插件。
- **元数据**：TypeScript / 118.8 MB / 创建 2026-08-10；明确标注"独立的社区开源项目，与深度求索不存在隶属、合作、授权或背书关系。本仓库目前无深度求索员工或 DeepSeek Harness 上游官方团队成员参与"。
- **核心价值**：① **下载即用**——Windows NSIS 安装程序 + macOS DMG，零额外环境；② **协议层集成**——把上游 DSH 的本地 Web UI、Host 服务、插件系统集成到原生窗口里，提供托盘、终端、自动更新、工作配置；③ **声明式边界**——README 明示"无上游贡献者参与"，避免用户误以为这是 DSH 官方桌面；④ **生态沟通**——README 提到"在和 awesome-dsh-plugin / dsh-market 谈统一 contract"——[awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 当前显示"客户端中立，不强制适配特定桌面"，双方还在对话。
- **issue 信号**：[#506](https://github.com/anywhere-labs/deepseek-harness-desktop/issues/506) 是上周最实质的工程 bug——"内置 dsh-market v1.17.1 在 npm / GitHub 已发 v1.20.0 的情况下 UI 没显示升级按钮"，issue 正文给出 `GET /dsh-market/status` 的真实接口返回（`{"version":"1.17.1","installed":{"@nanmicoder/dsh-agent-teams":"0.1.13"}}`），评论区 `zp-home` 给了一键复现截图。本质是"打包壳版本 vs 线上 npm 版本"两套节奏的同步问题；#508 同源——bundled dshmarket 把裸 npm target 送到 desktop 的 exact-version gate。
- **争议信号**：⚠️ 社区主线 vs DSH 上游的"事实关系"——README 主动写"无上游参与"是透明化，但 README 里同时保留 GitHub Contributors 显示的上游贡献者（来自 fork 继承）。读者第一次扫到会觉得矛盾，对账要往下读 README。
- **适用场景**：**适合**：Mac / Windows 用户想用桌面端跑 DSH，不愿意开 npm + 手动 dev · **不适合**：要求每周自动同步上游最新版（当前内置版本节奏滞后于 npm）的"前沿用户"。

### 3. [guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) ⭐17,337

- **一句话**：剥离多厂商 AI 出处水印的 agent skill + Python stdlib 服务，定位"自有内容的出处管理"。
- **元数据**：Python / 1.2 MB（极小）/ 创建 2026-08-12；latest release v0.5.0；skill 路径 `skills/remove-ai-marks/`，服务路径 `service/`；前身 `remove-claude-marks`（slash alias 仍保留）。
- **核心价值**：① **三层剥离**——A 层（不可见 Unicode / 双向控制符 / Tag 字符）用确定性 Python 脚本，B 层（统计型 token-sampling 水印，包括 Kirchenbauer 绿名单 / Aaronson 键控 Gumbel / EXP）走 agent rewrite + 可选 `rewrite_text.py` 钩子，文件层（C2PA / EXIF / XMP / 文档属性）覆盖 PNG / JPEG / WebP / AVIF / HEIC / BMP / GIF / TIFF / SVG / PDF / DOCX / XLSX / PPTX / EPUB / ODT / HTML / Markdown / MP4 / MOV / M4A / M4V / WAV / MP3 / FLAC；② **跨 Agent 主机**——一份 installer 覆盖 Claude Code（个人 + 项目）、Cowork / claude.ai / 云会话、Cursor，`--list` 列出当前可用 skill，`--link` 软链本地 checkout；③ **零外部依赖**——服务是 Python 3.10+ stdlib，agent 主机不需要 Python；④ **多厂商覆盖**——Claude / Gemini SynthID-Text / OpenAI provenance / open-LLM Kirchenbauer / 键控 Gumbel / Aaronson。
- **issue 信号**：[#225](https://github.com/guillaumemeyer/watermarks-remover/issues/225) 是关闭的"模板缺失"issue——用户贴了一个 file:// URL 作为标题，正文只填了占位符；维护者 `poorvith-mp` 关闭评论"Closing as incomplete. The issue template contains no repro steps, diagnostic output, or environment details."。**这个关闭本身就是信号**：仓库对 issue 模板合规性有硬规则，对一个原本"隐私敏感话题"的工具这是必要纪律（避免擦边 issue 累积）。
- **争议信号**：⚠️ 工具名 + topic 都涉及"水印剥离"，合规边界由用户自负——README 明文写"for privacy and hygiene on content **you own**"，但仓库不验证调用方是否有内容版权。建议读者把这条工具定位成"自迁移"工具而非"对抗审计"工具。
- **适用场景**：**适合**：把 Claude / ChatGPT 输出脱敏后做内部 wiki / 把厂商出处标记换成自有标识 / PDF 内嵌元数据清洗 · **不适合**：传播他人受版权保护的内容。

### 4. [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) ⭐11,844

- **一句话**：DSH 插件精选列表（[awesome-dsh-plugin.com](https://awesome-dsh-plugin.com)）+ 自动收录脚本。
- **元数据**：Python / 59.7 MB（含站点资源）/ 创建 2026-08-10；自带 plugin count badge（`awesome-dsh-plugin.com/count.json`）——README 顶部展示当前收录插件数；license MIT；awesome.re 徽章。
- **核心价值**：① **收录规则中立**——README 明示"client-agnostic"：只要插件声明 `dsh.bundle` manifest、能 `dsh plugin add` 装上即可，不强制适配任何桌面；② **市场插件协议分流**——README 推荐安装 [`dsh-market`](https://github.com/dsh-market/dsh-market) 作为图形化入口（`dsh plugin --profile web add dshmarket`），chat 风格用户可装 [`dsh-find-plugin`](https://github.com/awesome-dsh-plugin/dsh-find-plugin) 让 agent 推荐插件；③ **客户端协作透明**——README 明文"在与 `anywhere-labs/deepseek-harness-desktop` 谈统一 contract 合作，会更新本节"。
- **issue 信号**：仓库 issue 列表 API 返回空（仓库新）。这意味着收录质量目前靠 PR review 维护，没有 issue 区里的反向讨论——awesome 列表类项目的常态，但读者要意识到"列入 = 协议合规 ≠ 维护活跃 ≠ 安全性"。
- **争议信号**：✅ **生态健康信号**——README 把"插件市场的产品与安全设计"单列一节（[DSH Community Market README](https://github.com/dsh-market/dsh-market) 链接过去），把 awesome 列表的"列表判断"和"市场判断"显式分开，避免 awesome 收录 = 市场背书的误解。
- **适用场景**：**适合**：DSH 用户想知道"现在有什么插件能装" / 插件作者想被收录 · **不适合**：需要"插件安全审计结论"的读者（README 不做安全评级）。

### 5. [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) ⭐5,730

- **一句话**：DSH Web GUI 的插件与皮肤生态，"一切皆插件"在 Web 端最完整的落地。
- **元数据**：TypeScript / 406 MB（demo 资源多）/ 创建 2026-08-11；license Apache-2.0；npm `@linxin666/dsh-web-ui-all`；CI badge 显示主分支过测。
- **核心价值**：① **全家桶 vs 零散插件**——`dsh-web-ui-all` 聚合包一次性装齐梁神模式 + 任务看板 + 移动端远程 + SSH 运维 + 图像理解 + 鲸鱼娘宠物 + 皮肤中心 19 套主题；② **皮肤解耦**——v2 皮肤是纯资产目录（skin.json + 样式 + 贴图 + 可选特效脚本），由皮肤中心统一加载，DSH 升级不再牵动皮肤；③ **官方 profile 挂载**——所有插件都走 DSH 官方 profile 机制挂到 `dsh web`，不改 DSH 源码；④ **分发走 [dsh-market.com](https://dsh-market.com)**——皮肤、宠物、插件统一在市场分发。
- **issue 信号**：[#1048](https://github.com/zhu1090093659/dsh-web-ui/issues/1048) 报"皮肤中心关闭皮肤后，每次重启 dsh web 默认皮肤会自动复活（active:null 与首次启动无法区分）"——bug 已关闭但维护者 `github-actions[bot]` 给的关闭原因是"未使用仓库要求的 Issue 模板"——这不是技术关闭，是模板合规性自动关闭（[#1046](https://github.com/zhu1090093659/dsh-web-ui/issues/1046) 同因）。读者扫 issue 列表时要把这条过滤掉才有意义。[#1050](https://github.com/zhu1090093659/dsh-web-ui/issues/1050) 提"皮肤中心应增加直接下载并创意工坊中的皮肤"是开放的功能请求。
- **争议信号**：⚠️ 406 MB 的 size + Apache-2.0 license + npm 包同步分发——三方分发的同步节奏是大风险点，皮肤作者改一次主题要在三处（GitHub / npm / 创意工坊）同步。
- **适用场景**：**适合**：DSH 用户希望"一次性装齐 Web 端所有增强" · **不适合**：希望"自己挑一个插件试水"且不要 19 套皮肤的人（用 `dsh-web-ui-all` 会一次性装齐）。

### 6. [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard) ⭐3,728

- **一句话**：两阶段 DSH agent preset——Minimal 起步锚定 + Standard 工具按需提升——已宣布停维。
- **元数据**：JavaScript / 589 KB / 创建 2026-08-13；中文 README + 英文 README 双语；附 FAREWELL.md（中文告别信）+ ACKNOWLEDGEMENTS.md 贡献者名单。
- **核心价值**：① **两阶段锚定预设骨架**——Anchored Standard（首次模型请求 2 个工具，Minimal 工具 schema，promote 信号：`first durable tool/call or assistant/message`）、Zero-Anchored Standard（0 工具，固定 anchor turn）、Whoami Standard（0 工具，"你是谁"自介绍 turn）、Prefab Seeded（预设注入 seed）共 4 种模式；② **机制研究沉淀**——dose-response 数据 + tooling（context-gate / prefab pipeline / probe suite）保留在仓库，"largely model-agnostic"；③ **诚实停维**——README 2026-08-17 写"active development has effectively stopped"，原因是"DeepSeek 官方 API 和 opencode go 订阅涨价，评估循环（Project2-class runs + multi-trial roll/probe experiments）跑不起"；④ **替代推荐**——指向 [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) 和 [Tiger3807861189/J-Space-Cognition-Suite-V3.6](https://github.com/Tiger3807861189/J-Space-Cognition-Suite-V3.6) 两个"用户报告更好"的同生态项目。
- **issue 信号**：[#78](https://github.com/xiaobright/dsh-anchored-standard/issues/78)（关闭）的 `instructionHint` 持久化校验错误——issue body 给出复现路径 + 持久化事件形状 + 校验报错原文；维护者 `xiaobright` 的关闭评论很值钱："`buildInstructionHint()` 不在本仓，在 [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) 和 [dsh-desktop](https://github.com/neko233-com/dsh-desktop) 的 `packages/dsh-liangshen/presets/liangshen/tool-bootstrap.mjs`——同名不同实现"。**这一句把 DSH 同生态三个仓库的"看上去相似但不是同一份代码"的关系说清楚了**——是研究 DSH 插件源码绕不开的一手资料。[#76](https://github.com/xiaobright/dsh-anchored-standard/issues/76)（开放）`instruction-hint` 进程重启后重复注入——issue 报告者 `hongshuxifan321` 的修复与维护者自己的修复思路不同，评论里展开了两条路径的取舍；[#75](https://github.com/xiaobright/dsh-anchored-standard/issues/75) bash 工具 heredoc 死锁。
- **争议信号**：✅ **研究诚信信号**——停维公告写得非常具体（涨价 → 评估循环跑不起 → 只做维护），附告别信 + 致谢名单 + 替代项目链接，这是开源项目"体面停维"的范例（少见）。
- **适用场景**：**适合**：研究 DSH agent 怎么"按任务切 persona"的工程研究者 / 想要现成 dose-response 数据的实验者 · **不适合**：要"装上立刻能跑生产"的运营方（已停维）。

### 7. [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) ⭐3,469

- **一句话**：Oxlint 规则层，专门拒绝"低证据 / 低信号"的 TS / JS 写法，给 coding agent 装一份质量护栏。
- **元数据**：TypeScript / 62 KB（极小）/ 创建 2026-08-11；自带 agent skill `install-anti-slop`；installation 走 `npx skills add dmmulroy/anti-slop --skill install-anti-slop`；29 个 open issue。
- **核心价值**：① **vendor-and-adapt 模型**——README 明示"copy the rules into your repository, read them, and change them to match your team's standards"，不是固定 npm 依赖；② **15+ 规则**——`no-chained-type-assertions / no-conditional-empty-object-spread / no-known-value-widening / no-module-mocking / no-object-parameters / no-reflect-apply / no-reflect-get / no-runtime-typeof / no-shape-in-symbol-names / no-unknown-parameters / no-unknown-returns / no-unknown-type-aliases / no-unsafe-dictionary-type / no-widen-then-assert / require-safety-comment-for-type-assertion`——每一条都直指 TS / JS 工程里"AI 生成代码常见但证据不足"的写法；③ **agent skill 装法**——`npx skills add` 后让 coding agent 自己 copy + 配置 + 启用 + 验证，agent 可读；④ **Effect 兼容**——依赖 Effect 的仓库自动启用 opt-in Effect rule group。
- **issue 信号**：开放 issue 集中在工程纪律建设：[#28](https://github.com/dmmulroy/anti-slop/issues/28) "CI 加 lints 和 checks" / [#27](https://github.com/dmmulroy/anti-slop/issues/27) "require-safety-comment 看不见 `export const` 上方的注释" / [#26](https://github.com/dmmulroy/anti-slop/issues/26) "no-unknown-parameters / no-object-parameters 报错信息含类型" / [#25](https://github.com/dmmulroy/anti-slop/issues/25) "alias 解析盲点" / [#24](https://github.com/dmmulroy/anti-slop/issues/24) "空 SAFETY 标记绕过 require-safety-comment"——全是规则误报 / 漏报 / 报告质量，不是设计争议。[#23](https://github.com/dmmulroy/anti-slop/issues/23) 讨论"用 `eslintCompatPlugin` 让 Oxlint 兼容 ESLint"——用户 `christopher-buss` 与 `cluther-livefront` 在评论里给出 ESLint 兼容路径。
- **争议信号**：✅ **工程化扎实信号**——29 个 issue 全部围绕规则准确度与 CI 工程，没有"项目方向"或"商业化"争议——AI 工具生态里少见的健康状态。
- **适用场景**：**适合**：TS / JS 团队想要"AI 生成代码质量护栏" / 想 vendor 一份可改的规则集 · **不适合**：希望"装上零配置"的开发者（README 自承"copy + change to match your team"，默认不是即装即用）。

### 8. [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) ⭐2,367

- **一句话**：Claude Code 风格的 TUI 补位插件——鲸鱼顶栏 / 双流光大字 / 双击 Esc 回滚 / 上下文进度 + TPS 仪表。
- **元数据**：TypeScript / 14.1 MB / 创建 2026-08-13；npm `@deepseek-harness-tui/dsh-tui`；status "Public beta"；DeepSeek Harness 官方公众号"内测用户精选插件"收录。
- **核心价值**：① **零核心改动**——纯插件挂载到 `dsh web`，卸载后不残留补丁；② **视觉要素**——像素鲸鱼顶栏 + 双流光大字 + 实时工作状态行 + 思考流式展开 + 双击 Esc 时间回溯 + 蓝白上下文进度条 + TPS 仪表；③ **官方收录背书**——被 DeepSeek Harness 官方公众号推文作为"内测用户精选插件"展示；④ **npx 一键安装**——`npm i -g @deepseek-harness-tui/dsh-tui`。
- **issue 信号**：0.9.0 是上周的回归炸弹——[#497](https://github.com/ccch1mneyyy/dsh-TUI/issues/497) "Windows Terminal + WSL 下消息正文排版崩坏（加粗符原样、中文碎行、英文拦腰断）"给出完整环境（dsh CLI 0.1.1-rc.2 / dsh-tui 0.9.0 / 0.8.8 回退正常），并指向 0.9.0 新增依赖 `get-east-asian-width` 是 CJK 宽度回归源；同 #493 "0.9.0 移除浮层负 y 钳制导致 /model 选择器焦点行不可见"指向 commit 6681913；#496 "/review 被碰撞过滤挡掉，rawInput 丢失"。**三条 0.9.0 已知问题**对应 README 给的"应急方案：回退 0.8.8"——这意味着当前 0.9.0 在 Windows + WSL + Windows Terminal 这个组合下不可日常使用。
- **争议信号**：⚠️ **版本节奏 vs 用户预期**——0.9.0 引入多个 0.8.7 / 0.8.8 都没有的回归，作者修复路径清晰但仍在 0.9.0 主分支；用户要分清"装最新 = 拿到回归"和"用 0.8.8 = 拿到稳定"两种选择。
- **适用场景**：**适合**：Linux / macOS 原生终端用户（回归集中在 Windows Terminal + WSL）/ 想要 Claude Code 风格 TUI 但又想留在 DSH 生态 · **不适合**：Windows + WSL + Windows Terminal 的当前用户（等 0.9.1 修）。

### 9. [vercel-labs/fx](https://github.com/vercel-labs/fx) ⭐2,201

- **一句话**：Vercel Labs 出的 Unix-like coding agent harness 与 CLI，Zig 写成，7.8 MiB 二进制。
- **元数据**：Zig / 7.7 MB / 创建 2026-08-13；license Apache-2.0；安装 `curl -fsSL https://fx.sh/setup.sh | bash`；⚠️ 状态"Experimental. Use at your own risk."
- **核心价值**：① **Unix-like 形态**——README 自承"CLI 输出风格和形态更接近 Unix shell 而不是 IDE 风格的 TUI"——给 agent 工具集、特性集、prompt 设计都按"少即是多"路线；② **小尺寸**——7.8 MiB 单二进制，可嵌入更大系统；③ **多 provider 登录**——`fx login`（Vercel AI Gateway）、`fx login codex`（ChatGPT 订阅 OAuth，token 不发到 Gateway，存 `~/.fx/chatgpt-auth.json`）、`fx login grok`（xAI OAuth 同理）；④ **模型无关**——`/setup` 切 provider、`/model` 列当前 provider 模型、`/fast`（Codex 走 OpenAI priority tier，扣 ChatGPT Fast 模式额度）、`/logout codex` / `/logout grok` 清订阅不影响其他 provider。
- **issue 信号**：[#367](https://github.com/vercel-labs/fx/issues/367) 报"切回 zai/glm-5.2-fast 模型报错"——issue body 没给完整复现路径，是开放未修复；issue 列表较新（仓库新）。
- **争议信号**：⚠️ 实验状态（README 自承"Experimental. Use at your own risk"）+ OAuth 路径多（Vercel Gateway / ChatGPT / xAI 三套订阅 token）——读者扫一眼 setup script 内容再装，不要直接 `| bash`。
- **适用场景**：**适合**：研究 / 嵌入场景想要"小型可改的 coding agent 框架" / 已有 ChatGPT / Grok 订阅想要 CLI 入口 · **不适合**：要"装上立刻用"的非实验用户。

### 10. [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) ⭐2,005

- **一句话**：DSH 内部的插件市场——Settings → Plugin Market，浏览、搜索、一键装、一键切主题。
- **元数据**：TypeScript / 13.1 MB / 创建 2026-08-13；npm `dshmarket`；安装 `dsh plugin --profile web add dshmarket`；要求 dsh web ≥ 0.1.0-rc.6（旧宿主会禁用并在 console 提示，不会"假装可用"）。
- **核心价值**：① **1550+ 插件一站式**——category 过滤 + star 数 + top / new 排序 + 双语描述（跟 UI 语言）+ 截图预览（作者截图→卡片自动 / 没作者截图→README 自动提取）；② **主题切换不用重启**——点完 active 立即生效；③ **客户端中立**——README 明示"any host that speaks the standard DeepSeek Harness protocol"即可用，DSH Desktop 用户另有内置路径；④ **协议升级保护**——`#139` 跟踪"bundled vs npm"版本不同步（与 [anywhere-labs/deepseek-harness-desktop#506](https://github.com/anywhere-labs/deepseek-harness-desktop/issues/506) 同源）。
- **issue 信号**：[#294](https://github.com/dsh-market/dsh-market/issues/294) 开放"插件更新前看不到改动内容，希望提供更新信息预览"；[#293](https://github.com/dsh-market/dsh-market/issues/293) "下载完之后点设置里的市场空白，关闭一分钟又好了"——issue 评论里维护者 `fkysly` 给出高质量诊断回应："1.20.3 已发，按你指的那条线修。你这份报告的价值不在于报了问题，而在于**你把根因查到了行**——服务端排查、三个版本对照、clean 重装排除安装污染、再到 `createPortal(..., document.body)` 与宿主 Modal 的双根冲突。我此前收到过两份同样症状的报告（#286、#241），都因为复现不了而卡住；你给的那一步『点开插件卡片或截图预览』正是我一直漏掉的——我只切了 tab，从没打开过 lightbox。"**这条评论把"用户发现的关键复现步骤"和"维护者两次漏掉该步骤"都明文写出来**——是开源社区里难得的复盘文档。[#289](https://github.com/dsh-market/dsh-market/issues/289) 关闭"dsh-market 默认开启 auto-install-peers，导致拉取未发布的 `@deepseek-ai/dsh-type-meta` 报 40x"——是依赖管理的实战修复。
- **争议信号**：✅ **市场健康信号**——`fkysly` 在 #293 评论里给出"1.20.3 已发布"+ 修复代码片段（`createPortal(..., document.body)` → `createPortal(..., 自有容器)`）——透明度 + 修复合一；[#290](https://github.com/dsh-market/dsh-market/issues/290) "改进主题浏览：图片优先、可全屏的响应式画廊"——产品方向有社区反馈。
- **适用场景**：**适合**：所有 DSH 用户（图形化插件入口） · **不适合**：还在用 dsh web 0.1.0-rc.5 及更早版本的宿主（市场会主动禁用）。

## 上周 Top 30 表

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 深挖 | 简评 |
|---:|---|---:|---:|---|---|---|---|
| 1 | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) | 187,477 | – | agent | 首期 | ✅ | DSH 官方，万物皆插件 + Cordis 框架 |
| 2 | [anywhere-labs/deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop) | 18,881 | – | agent | 首期 | ✅ | 社区开源桌面客户端，macOS / Windows 一键装 |
| 3 | [guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) | 17,337 | – | agent | 首期 | ✅ | 多厂商 AI 出处水印剥离，自有内容定位 |
| 4 | [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | 11,844 | – | agent | 首期 | ✅ | DSH 插件精选列表 + 站点，客户端中立 |
| 5 | [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) | 6,696 | – | agent | 首期 | – | 注入器 × 思维模式路由预设，三行为带 + 任务感知 |
| 6 | [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 5,730 | – | agent | 首期 | ✅ | DSH Web GUI 插件与皮肤生态，梁神模式 + 任务看板 + 移动端 |
| 7 | [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard) | 3,728 | – | agent | 首期 | ✅ | 两阶段锚定 Standard 预设（Minimal → Standard），已停维 |
| 8 | [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) | 3,469 | – | agent | 首期 | ✅ | Oxlint 规则：拒绝低证据 TS/JS 写法，vendor-and-adapt |
| 9 | [cordiverse/paper](https://github.com/cordiverse/paper) | 2,716 | – | 其他 | 首期 | – | Cordis 框架背后的学术 pre-print（可逆时空组合性） |
| 10 | [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 2,367 | – | agent | 首期 | ✅ | Claude Code 风格 TUI，鲸鱼顶栏 / Esc 回滚 / TPS，DSH 官方收录 |
| 11 | [vercel-labs/fx](https://github.com/vercel-labs/fx) | 2,201 | – | agent | 首期 | ✅ | Vercel Labs Unix-like coding agent，Zig 7.8 MiB |
| 12 | [gvzdv/claudish-to-english](https://github.com/gvzdv/claudish-to-english) | 2,142 | – | 其他 | 首期 | – | （描述空） |
| 13 | [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 2,005 | – | agent | 首期 | ✅ | DSH 内部插件市场，浏览/搜索/一键装/主题切换 |
| 14 | [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 1,976 | – | agent | 首期 | – | 同生态 DSH Desktop 衍生，与 anywhere-labs 版差异化 |
| 15 | [Hisn00w/ASu-skills](https://github.com/Hisn00w/ASu-skills) | 1,898 | – | 设计skill | 首期 | – | 简历包装 HTML 模板集合 |
| 16 | [SMNETSTUDIO/WeChat-AI](https://github.com/SMNETSTUDIO/WeChat-AI) | 1,830 | – | 其他 | 首期 | – | 自托管微信角色扮演对话服务 |
| 17 | [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 1,629 | – | agent | 首期 | – | 同生态 DSH 鲸鱼娘系列皮肤 |
| 18 | [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | 1,476 | – | 其他 | 首期 | – | 开源 Grok Bot 替代，给 bot 一台 VM |
| 19 | [ZSvirt/zsvirt](https://github.com/ZSvirt/zsvirt) | 1,203 | – | 其他 | 首期 | – | IaaS 内核 + 云基础设施，KVM / Proxmox / vSphere 视角 |
| 20 | [zouyuxuan122/Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC) | 1,196 | – | agent | 首期 | – | 同生态 DSH Desktop 衍生：揽尽万象 EAC 版本 |
| 21 | [alchaincyf/deepseek-harness-orange-book](https://github.com/alchaincyf/deepseek-harness-orange-book) | 1,161 | – | agent | 首期 | – | 同生态 DSH 橙皮书《从开机到拆开》，官方文档没有的一手实测 |
| 22 | [elie222/rakazo](https://github.com/elie222/rakazo) | 1,155 | – | agent | 首期 | – | 开源 Grok Bot 替代，自选模型 + 沙箱 |
| 23 | [Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report) | 1,039 | – | agent | 首期 | – | DeepSeek V4 × J-Space V3.7 能力释放报告，基准对照 |
| 24 | [dsh-tauri-desk/deepseek-harness-desktop](https://github.com/dsh-tauri-desk/deepseek-harness-desktop) | 995 | – | agent | 首期 | – | 同生态 DSH Tauri 桌面版，5 MB 安装包 |
| 25 | [vercel-labs/eve-software-factory-template](https://github.com/vercel-labs/eve-software-factory-template) | 992 | – | agent | 首期 | – | Vercel Eve Foreman 模板，软件工厂式 agent 编排 |
| 26 | [lexmount/moli](https://github.com/lexmount/moli) | 974 | – | agent | 首期 | – | AI agent 用 headless 浏览器，Rust / Servo，高兼容 |
| 27 | [ysr666/dsh-vision-router](https://github.com/ysr666/dsh-vision-router) | 943 | – | agent | 首期 | – | 同生态，给纯文本 DSH agent 加内置免费视觉链 |
| 28 | [bowenliang123/dsh-context](https://github.com/bowenliang123/dsh-context) | 936 | – | agent | 首期 | – | 同生态 DSH 上下文洞察 + 管理插件 |
| 29 | [NanmiCoder/dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) | 897 | – | agent | 首期 | – | 同生态 DSH Agent Teams 插件 |
| 30 | [0xsline/awesome-deepseek-harness](https://github.com/0xsline/awesome-deepseek-harness) | 851 | – | mcp | 首期 | – | 同生态 DSH 周边 awesome 列表（与 #4 收录维度互补） |

> 上表 Δ / 态 / 赛道列均来自 rank.py 对照上期快照生成。本期为首次周榜快照（无前一周 W32 快照可比对），全部条目态 = "首期"，Δ = "–"。

## 简评 11-30

- **[yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite)** ⭐6,696：DSH 同生态 runtime 注入器 + 任务感知思维模式路由预设，PowerShell 实现，"router-standard" 系列；属上文 `dsh-anchored-standard` FAREWELL.md 推荐的"用户报告更好"替代项目之一。
- **[cordiverse/paper](https://github.com/cordiverse/paper)** ⭐2,716：上周 Top 30 内唯一非代码仓，给 DSH 选用 [Cordis](https://github.com/cordiverse/cordis) 框架的"可逆时空组合性"补完学术 pre-print 形态。
- **[gvzdv/claudish-to-english](https://github.com/gvzdv/claudish-to-english)** ⭐2,142：仓库描述空，Shell 语言，含 `claudish` 字样的英文 / 转换类工具，待补描述。
- **[dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop)** ⭐1,976：DSH Desktop 衍生版本，与 [anywhere-labs/deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop) 并存，社区两条桌面路径竞争 / 互补。
- **[Hisn00w/ASu-skills](https://github.com/Hisn00w/ASu-skills)** ⭐1,898：HTML 模板集合，"简历包装"类设计 skill；track 归到"设计skill"。
- **[SMNETSTUDIO/WeChat-AI](https://github.com/SMNETSTUDIO/WeChat-AI)** ⭐1,830：TypeScript 实现的自托管微信角色扮演对话服务，瞄的是"微信内 AI 角色"这个国内场景空白。
- **[Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale)** ⭐1,629：DSH 同生态"鲸鱼娘系列皮肤"，与 [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) 皮肤中心对接。
- **[milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot)** ⭐1,476：TypeScript 写的开源 Grok Bot 替代，给 bot 一台虚拟机用；与 [elie222/rakazo](https://github.com/elie222/rakazo) 同赛道。
- **[ZSvirt/zsvirt](https://github.com/ZSvirt/zsvirt)** ⭐1,203：Java 写的 IaaS 内核 + 云基础设施，topics 含 `cloud-native / hypervisor / kvm / proxmox / vsphere`——上周榜里唯一的"非 AI 直接相关、但出现在 AI 仓候选池"的纯基础设施项目。
- **[zouyuxuan122/Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC)** ⭐1,196：DSH Desktop 衍生 "揽尽万象" EAC 版本，与 anywhere-labs / dataelement / dsh-tauri-desk 形成桌面端四线并行。
- **[alchaincyf/deepseek-harness-orange-book](https://github.com/alchaincyf/deepseek-harness-orange-book)** ⭐1,161：DSH 橙皮书《从开机到拆开》，官方文档没有的一手实测——含完整系统提示词、129 行启动清单、三份原始会话日志，PDF/EPUB/HTML 三格式。
- **[elie222/rakazo](https://github.com/elie222/rakazo)** ⭐1,155：TypeScript / Electron / Expo，开源 Grok Bot 替代，topics `ai-agents / chatgpt / docker / grok / llm / self-hosted`。
- **[Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report)** ⭐1,039：DeepSeek V4 × J-Space V3.7 在 Terminal Bench 2.1 / DeepSWE / GAIA 几个基准的能力释放报告，含基准对照。
- **[dsh-tauri-desk/deepseek-harness-desktop](https://github.com/dsh-tauri-desk/deepseek-harness-desktop)** ⭐995：DSH 同生态 Tauri 桌面版，宣称 5 MB 安装包 + 零环境配置 + preset 启动。
- **[vercel-labs/eve-software-factory-template](https://github.com/vercel-labs/eve-software-factory-template)** ⭐992：Vercel Labs Foreman，软件工厂式 agent 编排模板——和 [vercel-labs/fx](https://github.com/vercel-labs/fx) 是同一团队两条线（实验 CLI vs 工程模板）。
- **[lexmount/moli](https://github.com/lexmount/moli)** ⭐974：Rust + Servo 写的 headless 浏览器，专给 AI agent 用，topics `ai-agents / playwright / puppeteer / web-crawler`——上周榜 AI agent 浏览器层少见的 Rust 实现。
- **[ysr666/dsh-vision-router](https://github.com/ysr666/dsh-vision-router)** ⭐943：DSH 同生态，给纯文本 DSH agent 加内置免费视觉链（无需 key）。
- **[bowenliang123/dsh-context](https://github.com/bowenliang123/dsh-context)** ⭐936：DSH 同生态上下文洞察 + 管理插件，"the best DeepSeek Harness plugin for context insight and management"。
- **[NanmiCoder/dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams)** ⭐897：DSH 同生态 AgentTeams 插件，多 agent 协作视角。
- **[0xsline/awesome-deepseek-harness](https://github.com/0xsline/awesome-deepseek-harness)** ⭐851：DSH 周边 awesome 列表，与 [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)（#4）收录维度互补——track 标 mcp 是因为仓库声明含 MCP 兼容条目。

---

## 数据方法

- **窗口**：`created:2026-08-10..2026-08-16`（UTC 整周 7 天闭区间），ISO 周编号 W33；slug `github-weekly-2026-W33`。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant`（`in:readme`），5 槽位按用户 2026-08-23 终极版要求固定。
- **排序**：star 数降序，`per_page=50`，无 `stars:>N` 下限。
- **过滤**：跑完 `rank.py` 剔除空壳 / 擦边，本期 dropped=0；保留 30 / raw 50；`short_of_take=False`。
- **样本规模说明**：GitHub Search API 对应窗口理论上有 263,586 条 README 命中候选（实际仅在 `q=` 关键词+`created:` 窗口下排序），按 `per_page=50` 取排序前 50 条全部进 rank.py。**入榜 30 条是"窗口内 + 排序后取前 50 + 通过 rank.py 过滤 + 按 star 降序截前 30"的最终结果**——和"窗口内全部新创建 AI 仓"是两件事，读者不要把 Top 30 当窗口全集。
- **同生态压缩**：DSH 单生态占 19 条；表中保留全部 19 条，详深挖只给 Top 10；其余 DSH 衍生以"同生态衍生"在简评里给一句话定位。
- **上期快照**：本期为首次周榜快照，无 W32 可比——`compare.has_previous=false`，全部条目态 = "首期"，Δ = "–"。下周 W34 跑完后会有真实 "新上 / 还在 / 掉出 / Δ" 数据。
- **仓库引用格式**：所有可点击链接走 `[owner/repo](https://github.com/owner/repo)`，issue 引用走 `[#N](https://github.com/owner/repo/issues/N)`。
- **深挖英文原文**：所有 issue body / 评论 / README 关键句已翻译成中文，不直接贴英文原文。
- **横向对比 / 信号判断**：每个深挖末尾的"适用场景 / 不适合"块来自"机制对比 + issue 实战反馈"的综合判断，不是仓库自述。
