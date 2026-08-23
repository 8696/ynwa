# GitHub 日榜 · 2026-08-22 · Claude Code 高级网页 skill 单日 345⭐ + Zig 写 MCP 调试器首日 339⭐

> 快照时间：2026-08-23 20:50 CST（UTC 12:50）。数据口径与排序规则见文末「数据方法」。

## 核心信号

- **Claude Code Skill 形态两开花**：昨日 Top 1 `nateherkai/scroll-craft`（Claude Code 高级滚动网站 skill，345⭐）和 Top 5 `bam-bam-2/solo-skills`（1인 사업가 49 件自动化 skill 套件，137⭐）都是 SKILL.md 形态的子仓库。这跟 8-23 周榜 `ip-as-logo-skill` 3847⭐ 的爆点同源——**Agent Skill 已从「零散单点」进入「批量涌现」阶段**。
- **MCP 协议继续深入垂直工具**：Top 2 `duty1g/x64dbg-mcp-server`（Zig 写的 x64dbg 原生 MCP 插件，339⭐，零依赖、71 工具、22 事件回调）证明 MCP 不只是「Claude 接数据库」的玩具，已能下钻到**反编译器 / 调试器**这种深度工具领域。Zig + x32/x64 双架构交叉编译的工程化设计也值得对照参考。
- **「生物安全 Agent」概念冒头**：Top 3 `Forsy-AI/biosecurity-agent`（209⭐，TypeScript）是 Forsy AI 发布的开源 agent，主打「给你保护的标的，agent 自动建世界、追踪变化、预测下一步、推荐防御」——把 OSINT / 监控 / 仿真 串成一条「防御型 agent 工作流」。HuggingFace 上同步放出了 `BiosecurityAgent0` 数据集。
- **Windows 文件系统元搜索进入实战阶段**：Top 5 `josiah-nelson/eidos`（Rust，164⭐，单 owner 25 个 PR/issue 全是工程化 PR，ADR-0008~0010 三连发把搜索 p95 从 532ms 拉到 174ms）——这不是 demo 项目，是**严肃的 Windows-first 文件系统 catalog + 搜索引擎**，已经有可工作的 native NTFS enumeration + USN journal + Tantivy 索引 + Axum HTTP API + web UI。
- **NSFW spam 混进 Top 10**：昨日第 4 名 `aj-2-c-2-a/undress-designses`（188⭐）是 9KB 空壳，topics 全是 `ai-sex / ai-porn-videos / uncensored-ai` 这种 NSFW 标签——属于 SEO 星刷仓库。**本榜不深挖**（项目本体无价值），但需要点名提示读者榜单存在这种偏差。
- **昨日新仓 9KB 空壳比例偏高**：Top 10 里 3 个仓库（`Forsy-AI/biosecurity-agent` / `h9-tec/AI-Glossary-Handbook` / `aj-2-c-2-a/undress-designses`）都是无 description 或 9KB 空壳——但因为「ai/llm/agent/mcp/assistant」关键词命中即算，所以单日新仓容易被刷星词条冲进 Top 10。这是日榜 vs 周/月榜最大的口径差异。

## 昨日 Top 10 · 2026-08-22（单日窗口 created:2026-08-22..2026-08-23 UTC）

> 窗口：`created:2026-08-22..2026-08-23`（单日 UTC，左闭右开），按 stars 降序。`in:readme` 命中 `ai OR llm OR agent OR mcp OR assistant`，stars 阈值 `>0`（单日新仓阈值放低，避免漏掉刚爆的）。

### Top 1 · `nateherkai/scroll-craft` ⭐345

一个 Claude Code skill，做"高端滚动驱动网站"，但它的真正卖点是**「不让 AI 网页滑向两种失败」**的设计哲学。

**仓库元数据**：JavaScript（4788 KB），topics：`accessibility / agent-skills / ai-web-design / anthropic / claude-code`，无 homepage，创建 2026-08-22 UTC。

**核心价值**（来自 README 全文精读）：
1. **「交互 + 工艺 = 一件事」**：作者观察 AI 生成的网页会走向两个极端——「乖巧但平庸」或「花哨但 2.1:1 字号、6 行标题」。scroll-craft 把两者当成同一份工作，硬性要求 build 必须**同时**满足。
2. **8 种互斥的页面语法**：filmic one-shot / chaptered editorial / live surface / continuous world / typographic poster / gallery / split stage / rhythmic cutlist。每种语法**禁止**另一种所必需的——所以两次 build 不会悄悄同化。
3. **指纹门（fingerprint gate）**：新 build 必须跟已建页面在 6 个维度（grammar / nav / hero / act shape / close / signature move）上至少 4 个不同，否则改方案不改记录。
4. **Peak-end 规则字面化**：每个页面只允许一个「设计预算峰」，给资产、给安静、给最长滚动距离。**有 3 个峰 = 一个都没有**。
5. **签名动作强制**：每个 build 必须发明一个**该站独有的**交互。「换个 spotlight 颜色」不算。

**Issue 实战反馈**（issues 列表为空，全是 star 而来的新仓）：
- 暂无 issue/评论——昨日刚发布，深挖信号需等 2-3 天。
- 但 README 里写明的「Three builds, three completely different pages」（Orrery 旅行 / PERKFORM 蛋白咖啡 / Fallowbank 景观设计）本身就是 3 个真实可点开的样例，HTML 资产（`media/*.webp`）均在仓库内。

**横向对比**：
- 跟 8-23 周榜 `s1dashu/ip-as-logo-skill`（3847⭐）同属「Agent Skill 形态」——scroll-craft 是「网页设计 skill」，ip-as-logo-skill 是「logo 设计 skill」。
- 跟 8-23 月榜 `oso95/scroll-world`（8480⭐）都强调 scroll-driven 体验，但 scroll-world 是「品牌→3D 滚动落地页」一次性工具，scroll-craft 是「skill 形态让 agent 在对话里按需产出」。
- 跟周榜 `Vincentwei1021/video-shotcraft`（6117⭐，152 shot recipe cards）同属「AI 视频/网页强约束 skill」家族——都把「设计哲学」编码成可执行约束。

**信号判断**：✅ 设计哲学清晰（README 写得极成熟，常见 AI 工具 README 不会这么有「作者品味」）、⚠️ 暂无社区实战反馈（昨日新仓是常态，需等一周）、✅ 三个 demo 真实可看（README 嵌了 webp，证据链完整）。增长信号中等——Claude Code skill 生态有 ip-as-logo-skill 这种 3 天 3800+ 星的前例，scroll-craft 走「网页」这种更窄赛道 345⭐ 已经是健康开局。

**适用场景**：**适合**：用 Claude Code 搭产品页 / 作品集 / 品牌页且要「每个站长得不一样」的开发者 · **不适合**：要 SaaS 后台 / 仪表盘 / 表单密集页（scroll-craft 强项是品牌叙事型，不擅长工具型 UI）。

### Top 2 · `duty1g/x64dbg-mcp-server` ⭐339

Zig 写的 x64dbg 原生 MCP 插件，让 Claude / Codex / 任何 MCP 客户端能**直接驾驶 x64dbg 调试器**。

**仓库元数据**：Zig（1740 KB），topics：`ai-agents / ai-debugging / binary-analysis / claude / claude-code`，无 homepage，创建 2026-08-22 UTC。

**核心价值**（README + 配置节选）：
1. **71 MCP 工具**：完整覆盖反汇编、单步、断点、内存分配、寄存器、模块、线程、调用栈、pattern scan、字符串提取、xref、符号、书签、PE 分析、OEP 检测、模块 dump、PEB/SEH 检查、trace——基本上是「x64dbg 命令行版全功能」。
2. **22 事件回调**：init / stop / breakpoint / exception / step / attach / detach / DLL load / DLL unload / 线程事件——agent 能**订阅**调试器事件做 reactive 控制。
3. **零依赖单二进制**：「Pure native plugin, no runtime or framework needed」——Zig 的卖点就是 cimport + cross-compile 一步出 x32 + x64 .dll，丢进 x64dbg `plugins/` 就跑。
4. **双传输**：Streamable HTTP + SSE（兼容新旧 MCP 客户端）；默认端口 x64 用 9094、x32 用 9095。
5. **跨平台编译**：从 Linux / macOS / WSL 都能交叉编译出 Windows 插件——给 reverse engineering 工程师的 CI 友好度直接拉满。

**Issue 实战反馈**（issues 列表为空）：
- 跟 Top 1 一样是昨日新仓，issue 反馈要等 1-2 天。
- 但 `releases` 页（README 顶部已加 badge）显示**已有正式 release + 下载量统计**——说明作者在发布前就准备了完整 release pipeline，不是「刚 push 完就跑来上榜」。

**横向对比**：
- 跟周榜 `cinderline/northcinder`（1206⭐，MCP 比价服务）同属「垂直工具 MCP 化」——x64dbg 是调试器，northcinder 是购物比价。
- 跟 8-23 月榜 `kvcache-ai/AgentENV`（3281⭐，Rust 写的「分布式 agent 环境平台」）形成对照：AgentENV 是「agent 跑的沙箱」，x64dbg-mcp-server 是「agent 操作真实调试器」——前者模拟环境，后者接入现有工具。
- 同类项目 `GhidraMCP` / `BinaryNinjaMCP`（这两个 Ghidra/BinaryNinja 的 MCP 插件）有，但都用 Python + pyhidra / Java 重型栈，**没有 Zig 零依赖版的对照**。这是这个项目的差异化护城河。

**信号判断**：✅ 工程化扎实（release pipeline + 跨平台 + 双传输 + 22 事件回调）、✅ 填补市场空白（Zig 写 x64dbg 插件，全网少见）、⚠️ 仅支持 x64dbg（不开源 Ghidra / IDA / BinaryNinja 版的话，用户群被锁在 x64dbg 圈）。增长信号强——Zig + 调试器 + MCP 三标签同时命中，受众精准。

**适用场景**：**适合**：用 Claude / Codex 做 reverse engineering / 二进制分析 / CTF 题目研究的安全研究员 · **不适合**：要分析 Java/JS/dotnet 等托管运行时（x64dbg 是 native-only 调试器，这些场景用 JADX/IDApython/其他栈更合适）。

### Top 3 · `Forsy-AI/biosecurity-agent` ⭐209

Forsy AI 发布的「生物安全 agent」开源版——给 agent 一个「要保护的标的」，它自动建一个目标中心的生物安全世界、跟踪变化、预测下一步、给可证据链回溯的防御建议。

**仓库元数据**：TypeScript（1796 KB），topics 为空，homepage 空，npm 包名 `@forsy/biosecurity-agent`，配套 HuggingFace 数据集 `Forsy-AI/BiosecurityAgent0`。创建 2026-08-22 UTC。

**核心价值**（README 精读）：
1. **「AI agent + 标的 → 全球生物安全世界 → 追踪 → 预测 → 保护」五段式**架构：把传统生物安全工作的「数据收集 / 关联 / 推演 / 建议」四步串成一条可执行 agent 工作流。
2. **目标中心的世界模型**：用户描述要保护的人 / 动物 / 植物 / 产品 / 地点 / 组织（自然语言），agent 自动建一个以这些目标为节点的「世界」，实体间关系从公开 OSINT / 官方源 / 新闻 / 社交 / 传感器数据自动抽取。
3. **观察 / 推断 / 仿真三种声明分层**：终端展示里**始终区分**三种 claim——观察到的（observed）、推断的（inferred）、仿真出的（simulated）。这种「声明类型显式标注」是研究诚信层面的设计。
4. **本地优先 + 权限明确**：targets / 文件 / secrets 不上传 Forsy；外部内容一律当 untrusted；动作要显式权限。README 明确写「designed for defensive biosecurity — not pathogen engineering or clinical diagnosis」——划清楚边界。
5. **可复活的世界**：终端退出后再次启动，targets / watchers / world 状态本地恢复——agent 工作流不是「一次性脚本」。

**Issue 实战反馈**（issues 列表为空）：
- 跟 Top 1/2 一样是昨日新仓。
- 但 npm 包名 + HuggingFace 数据集 + TS 工程化说明**作者有完整产品化预期**，不是 hobby 实验。

**横向对比**：
- 跟月榜 `elder-plinius/T3MP3ST`（5646⭐，multi-agent 红队 / offensive-security meta-harness）形成**对立镜像**：T3MP3ST 是「attack-side agent」，biosecurity-agent 是「defense-side agent」。两者在 agent 工具栈上对称。
- 跟周榜 `browser-use/macos-harness`（715⭐）同属「垂直领域 agent 框架」——前者管桌面浏览器，后者管生物安全世界。
- 跟 `synthetic-sciences/openscience`（月榜 #31，3323⭐，「AI workbench for scientific research」）同属「AI + 科学」赛道，但 openscience 是通用的科研工作台，biosecurity-agent 是单一垂直（生物安全）深耕。

**信号判断**：✅ 防御定位清晰（README 显式排除 pathogen engineering）、✅ 声明分层（observed/inferred/simulated 区分）显示研究诚信设计、✅ 本地优先（隐私不外传）适合政府/医疗/企业用户、⚠️ 暂无 issue 反馈 / ⚠️ HuggingFace 数据集是 RC 不是正式版（README 写 `BiosecurityAgent0` RC）。增长信号中等——生物安全是合规驱动型市场（爆发不靠社区，靠政府采购），但**对国内监管严的生物医药 / 农业 / 检验检疫机构可能价值显著**。

**适用场景**：**适合**：需要 OSINT 持续监控 / 多源证据链归并 / 仿真预警的生物安全研究人员、政府公共卫生部门、动植物检验检疫团队 · **不适合**：临床诊断 / 病原工程（README 显式排除）/ 个人养生场景。

### Top 4 · `aj-2-c-2-a/undress-designses` ⭐188

⚠️ **NSFW spam 仓库，本榜不深挖。** 9KB 空壳、无 description、topics 全是 `ai-sex / ai-porn-videos / uncensored-ai / coomer-party / hitomi-la` 等 SEO 关键词。属于典型「关键词堆砌 + 刷星」仓库。

**为什么点名**：单日新仓里这种 NSFW 噪音占比不低，读者看到 `⭐188` 可能误判「AI 安全/合规研究热点」——实际是 9KB 空壳 + 18 个 SEO tag + 刷星。**本榜存在的偏差**（见末尾「数据方法」第 3 条）。

### Top 5 · `josiah-nelson/eidos` ⭐164

一个**单 owner 严肃项目**——Rust 写的 Windows-first 文件系统 catalog / 内容索引 / 存储分析 / 搜索服务。**25 个 PR/issue 全部由 owner `josiah-nelson` 一人提交**，全是带 ADR（架构决策记录）的工程化 PR。

**仓库元数据**：Rust（565 KB），topics：`filesystem / indexer / ntfs / rust / search`，无 homepage，创建 2026-08-22 UTC。**搜索性能已被 PR 链拉到实战级**。

**核心价值**（README + 三个最新 PR 精读）：
1. **catalog 跟 path 解耦**：文件对象有稳定 ID，路径只是「投影」——重命名 / 移动 / 硬链接不会让同一个文件看起来像新内容。Everything / WinDirStat / dtSearch 都不这么做。
2. **NTFS 原生枚举 + USN change journal**：批量原生 enumeration + 亚秒级变更可见。Everything 也是这么做的，但 eidos 把 catalog 和 search index 完全分两层。
3. **可信 catalog 承诺**：scans 原子发布；中断或离线 source **永不被悄悄清空**；每个 search response 显式说明 per-source completeness。Issue #22、#25、#26 把这个承诺写进 ADR。
4. **目录是一等公民**：`has:idb has:cs` / `files:>1000` / `subtree:>1G` 这种**针对子树的谓词**，能直接搜「包含大型数据库项目的目录」——Everything 不支持。
5. **MCP 工具在 roadmap**：README 明确写「MCP tools」是未来项，意味着这项目会接进 Claude / Codex。

**Issue 实战反馈**（issues 列表实际抓到 25 条，全是 owner PR/issue）：
- ✅ **PR #29 已 merged（2026-08-23）**「search: trigram query plans for regexes and a memory-mapped chunk store (ADR-0009)」：**性能数字扎实**——`content:/timed? ?out after \d+/` 这条弱字面量 regex，p95 从 532ms（subset）拉到 **174ms（exact）**；`content:/[A-Z][a-z]+Exception: /c ext:log` 从 78ms→60ms。**数字不是吹的，是 full catalog 4.15M entries / 1.82M chunks 30 次迭代的 p95**。
- ✅ **PR #30 + #31（2026-08-23 open，stacked）**「archive: ZIP central-directory inventory + ZIP manifests in catalog/pipeline/API/CLI (ADR-0010)」：把 ZIP 当作「内容候选」而非「不支持」，单 ZIP 最多 1M members / 256 MiB directory / 4 KiB names。**新增 `eidos archive requeue <source>` CLI** 给已存在 catalog 一次性回填。
- ✅ **Issue #27（open，enhancement）**「Add property and fuzz tests for query parsing and candidate soundness」：owner 自己提的——**要补 property-based test + fuzz test**，确保 query 解析 / 候选生成优化不会漏掉真命中。这种「自己提 TODO」的做法是研究诚信信号。
- ✅ **Issue #26（open）**「Expand CI with cross-platform Rust checks and dependency security auditing」：owner 想加 Ubuntu Rust check / cargo-audit / cargo-deny / npm audit——**连「跨平台编译 + 依赖审计」都想好了**，不是「Windows only 拍脑袋」。

**横向对比**：
- 跟 Everything（Windows 文件名搜索标杆）对比：Everything 极快但只搜名字 + metadata，eidos **名字 + metadata + 内容 + 目录树** 都搜。
- 跟 Spotlight（macOS 系统搜索）对比：Spotlight 也搜内容但不可信（索引更新不原子、缺 completeness 报告），eidos 显式做可信 catalog 承诺。
- 跟 ripgrep 对比：rg 是一次性 grep 工具，eidos 是常驻服务（带 HTTP API + web UI + CLI）。**目标用户是「想替代 Everything + dtSearch + WinDirStat 三件套」**。

**信号判断**：✅ 工程化扎实（25 个 ADR-编号 PR，每个带性能数字）、✅ 数字可验证（p95 表格、4.15M entries 全量测试）、✅ 跨平台 CI + 依赖审计已规划、✅ search 内容功能在 milestone 5 推进、⚠️ 暂无外部 issue（单 owner 是事实不是缺点，issue #27/#26/#25/#24/#23/#22 全是 owner 自己提的 TODO——说明这是一个「正在被作者严肃建设」的项目）。增长信号**不靠营销靠工程质量**——164⭐ 配 25 个工程化 PR，是「慢热」型项目典型形态。

**适用场景**：**适合**：Windows 重度用户（开发者 / 研究员 / 系统管理员）要在本地建一个「可信、可审计、能搜内容」的文件系统索引层 · **不适合**：要 GUI 即装即用（还在 milestone 0.5，README 写「no packaged release yet」，必须自己 cargo build） · macOS / Linux 用户（roadmap 里要等 0.5 之后）。

### Top 6 · `bam-bam-2/solo-skills` ⭐137

韩国 1人 사업가（独立创业者）整理的「1 个人代替 49 个工作」skill 套件，**公开了 26 个 SKILL.md 给 Claude Code / Codex / OpenCode 直接用**，外加 8 个真能跑的脚本。

**仓库元数据**：Python（283 KB），topics：`agent-skills / ai-agent / automation / claude-code / korean`，无 homepage，创建 2026-08-22 UTC。

**核心价值**（README 全文精读 + 几个核心 skill 详情）：
1. **49 → 26 的取舍**：作者一人运营 6 期社区，把「产品视频 / 电子书 PDF / 博客 / 会议纪要 / 客户消息」全自动化，49 个任务里**只有 26 个 skill 抽出来能复用到别人环境**。剩下 23 个绑在作者账号/服务器上，仅 fleet.md 留索引。
2. **「执行脚本 vs 纯 procedure」的诚实分层**：8 个 skill 自带真能跑的 `.sh / .py / .mjs`（如 `web-demo-video` 配 OBS 都不用的「伪鼠标点击 + 决定论截图 + ffmpeg 合成」），其他 18 个只有 procedure（因为执行逻辑要碰作者私有账号）。
3. **`web-demo-video` 反常识设计**：不用 OBS 也不用录屏——做一个「舞台页」嵌产品页 iframe + 注入 SVG 假鼠标 + 触发**真实** click 事件 + `window.__tick(帧号)` 决定论生成每帧。**能重新生成完全相同的视频**。跨同源（重要坑：舞台页跟产品页**必须同源**否则 `iframe.contentDocument` 跨域被堵）。
4. **`book-pdf` 反常识坑**：Paged.js 排版的电子 PDF，**章/节 opener 禁 flexbox**——会破分页计算。README 把这种「试错出来的坑」明文写出来。
5. **作者本人在 agent 工作流里的真实痛点**：「agent 跑完不发 Slack 通知，因为没接 IM」这种问题他写进了 skill。

**Issue 实战反馈**（issues 列表为空）：
- 跟前面几个 Top 一样是昨日新仓。
- 但 README 的「2일차 업데이트」明确写了「**作者公开第二天**就回头补了 5 个 skill（因为发现仓库有两处，初始只公开了一半）」——这种「坦诚补仓」是工程诚信信号。

**横向对比**：
- 跟周榜 `Yuzzyuk/marketing-os`（287⭐，「整个营销部门 14 模块 Claude skill」）、`Vincentwei1021/video-shotcraft`（6117⭐，152 shot recipe cards）同属「**领域 skill 集**」——solo-skills 是「独立创业者全栈」粒度最广。
- 跟 8-23 周榜 `s1dashu/ip-as-logo-skill`（3847⭐）同属「**单点设计 skill**」——ip-as-logo-skill 把 logo 做透，solo-skills 把独立创业 26 件事做广。
- 跟 `jakubkrehel/skills`（月榜 #25，4184⭐，「帮你做出好 UI 的 agent skills」）相比，jakubkrehel 是「产品 UI」一个垂直面，solo-skills 是「营销/视频/出版/客服」4-5 个垂直面。

**信号判断**：✅ 26 个 skill 全有 SKILL.md 可读、✅ 8 个脚本真在作者机器上跑、✅ 公开「哪些没公开」清单（fleet.md）、⚠️ 缺 issue 反馈、⚠️ 仓库结构是「作者个人工作流快照」不是「通用最佳实践」（其他创业者复用要适配）。增长信号中等——137⭐ 在 SKILL 形态仓库里属于「第一波种子 + Korean 社区传播」水平。

**适用场景**：**适合**：Claude Code / Codex / OpenCode 用户找「垂直场景 + SKILL.md 即装即用」模板 · 1人 사업가 找「先把哪件事自动化」的灵感 · **不适合**：要 SaaS 化全栈（这套是「skill 库」不是「产品」）/ 不读韩文但需要 Korean 平台（Naver SMTP / Threads KR）适配。

### Top 7 · `zhaoxuya520/MeshLAN` ⭐134

Go 写的「自托管 P2P-first 虚拟局域网」，基于 Nebula overlay，**重点是「AI 自动化」嵌入到 mesh 网络运维**。

**仓库元数据**：Go（3111 KB），topics：`golang / mesh-network / nat-traversal / nebula / p2p`，无 homepage，创建 2026-08-22 UTC。

**一句话定位**：把 Nebula（Lighthouse 协调 + Curve25519 加密 + UDP 打洞）的 mesh 组网能力包成「`meshlan up` 一条命令开服务」，并把「AI 自动响应节点离线 / 切换 relay / 扩缩容」作为内置功能。

**核心价值**（README 简评）：
- **P2P-first**：节点之间默认直连（UDP 打洞），relay 只在打洞失败时兜底——这跟传统 VPN（强制中心 relay）架构不同。
- **multi-relay 冗余**：单 relay 挂了自动切下一个，AI 帮忙判定「当前最优 relay 路径」。
- **service sharing**：mesh 内任意节点的服务（HTTP / SSH / 数据库）可被其他节点通过统一 mesh DNS 访问——自带「服务发现」语义。
- **AI 自动化**：「AI 自动化」在 description 里被列为 built-in feature，但 README 细节未给（暂未深挖到这一层）——可能是「节点健康告警 + 自动容灾」类。

**Issue 实战反馈**：issues 列表为空，新仓常态。

**横向对比**：
- 跟传统 Tailscale / ZeroTier 对比：MeshLAN 借 Nebula 协议（非 WireGuard），且 description 强调「AI automation」——差异化点在「AI 自动化 mesh 运维」。
- 跟 8-23 周榜 `vvxw/deploy-vercel`（1188⭐，AI 辅助 Vercel 部署）形成对照——一个是把 AI 放进「网络层」，一个把 AI 放进「部署层」。

**信号判断**：✅ 协议选择清晰（Nebula 比 WireGuard 更轻量）、⚠️ 「AI 自动化」细节未明、⚠️ 单 owner 新仓。增长信号弱（134⭐ 处于「早期种子」区间）。

**适用场景**：**适合**：要自建跨地域 mesh 网络（避开中心 VPN 服务商）/ 已有 Nebula 经验想加 AI 自动化层 · **不适合**：个人翻墙（用 Tailscale 体验更成熟）/ 不熟悉 Nebula / mTLS 体系的新手。

### Top 8 · `h9-tec/AI-Glossary-Handbook` ⭐90

无 description、9KB 空壳——只命中了关键词「ai」，是昨日新仓的「SEO 词条」型刷星。**本榜不深挖**。

### Top 9 · `preporato/claude-certification-guide` ⭐89

针对 Anthropic Claude 全系列认证（CCA-F / CCDV-F / CCAO-F / CCAR-P）的备考指南站，homepage `preporato.com/exams`，260 KB markdown 资源。

**一句话定位**：把 Anthropic 4 个 Claude 认证考试拆解成 domain-by-domain 的备考材料，含题库、考点提示、模拟题。Anthropic 官方目前没有系统化的备考指南——这填补了一个市场空白。

**Issue 实战反馈**：issues 列表为空，新仓常态。

**横向对比**：
- 跟 8-23 月榜 `code-learner/certified-claude-architect-guide`（同类未上榜，但同形态）属于「**认证备考站**」——Anthropic 认证体系上线后这种站大概率会批量冒头。
- 跟月榜 `xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer`（4289⭐，「FDE 入门指南基于范冰《增长黑客》框架」）同属「**职业认证 / 角色入门指南**」——但 FDE 那本基于已有书，claude-certification-guide 是**纯原创配套**。

**信号判断**：✅ 抓窗口（Anthropic 认证刚上线，备考需求大）、⚠️ 89⭐ 配 260KB 内容 + 域名站说明「有产品化预期」但「还没传播开」。

**适用场景**：**适合**：准备考 Claude CCA-F / CCDV-F / CCAO-F / CCAR-P 的人 · **不适合**：只看产品文档不考认证的（直接读 docs.claude.com 更权威）。

### Top 10 · `cyunlab/narrant` ⭐72

`narrant` 项目的公共 release 仓库——仓库本身无 description，但**项目主页 `narrant.io` 提供了「公开研究记录 + 决策解释」的发布通道**（README 仅写「Public release repository for Narrant」），739 KB markdown / data。

**一句话定位**：把研究项目（narrant）的版本化 release / 数据集 / 决策文档公开到 GitHub 做版本控制。属于「**研究项目公共 release 渠道**」形态。

**Issue 实战反馈**：issues 列表为空，新仓常态。

**横向对比**：
- 跟月榜 `synthetic-sciences/openscience`（3323⭐）、「AI workbench for scientific research」同属「**AI 科研工程化**」——openscience 是工作台，narrant 是「单项目 release 渠道」。
- 跟 `aipoch/open-science`（月榜 #38，2958⭐）同属「**开源科研**」——narrant 偏「项目 release 渠道」，aipoch 偏「研究工作台」。

**信号判断**：⚠️ 缺 description / homepage 缺失让项目定位模糊、✅ release 仓库的工程化做法（版本控制研究数据）值得肯定。增长信号弱。

**适用场景**：**适合**：研究项目想用 GitHub 做 release 渠道 / 数据集版本控制 · **不适合**：要快速看懂项目做什么（README 几乎是空信息）。

---

## 本周 Top 30 · 2026-08-16 ~ 2026-08-23（created 窗口：上周一 UTC..本周一 UTC）

> 窗口：`created:2026-08-16..2026-08-23`（整周 7 天），按 stars 降序。深挖见周榜文章 `github-weekly-2026-W34`。

本周三档亮点：**DeepSeek Harness (DSH) 生态霸榜**（Top 1 ip-as-logo-skill 实际是 DSH 品牌 → logo skill，Top 11 DeepSeek-Balance-Whale-Widget / Top 18 pilot-harness / Top 27 HarnessEval-W 都是 DSH 周边）、**Agent Skill 集体冒头**（Top 1/8/14/19/22/23 都是 skill 形态）、**MCP 协议层扩张**（Top 5 northcinder MCP 比价 / Top 20 x64dbg MCP 调试器）。本周 Top 10 完整深挖见 `github-weekly-2026-W34.md`。

| # | 仓库 | ⭐ | 语言 | 一句话 |
|---|---|---:|---|---|
| 1 | s1dashu/ip-as-logo-skill | 3849 | - | Agent skill：把任意 IP 转成极简、圆润、轻微卡通化 logo |
| 2 | yetone/cumora | 2913 | TypeScript | 跨平台团队聊天客户端，每个团队成员可以是一个 AI Agent（BYOA） |
| 3 | CopilotKit/OpenBot | 2408 | TypeScript | 通用 agent 框架的「bot SDK」，让 LLM 应用接入 OpenBot 协议 |
| 4 | wang2122/sprix-sage-router | 1386 | Python | 多模型路由代理（Claude / GPT / DeepSeek 按规则切换） |
| 5 | cinderline/northcinder | 1206 | JavaScript | MCP 比价服务（暴露商品比价能力给 Claude / Codex） |
| 6 | vvxw/deploy-vercel | 1188 | JavaScript | AI 辅助 Vercel 部署（写说明 → 自动生成 vercel.json + 部署） |
| 7 | Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report | 1039 | - | DeepSeek V4 J-Space 能力落地报告（中文研究报告） |
| 8 | Spielewoy/autoprompt-skill | 734 | JavaScript | Agent skill：自动写 prompt（基于用户描述产出可复用 prompt） |
| 9 | browser-use/macos-harness | 715 | Python | macOS 桌面 agent harness（让 agent 驾驶 macOS GUI） |
| 10 | SigmanticAI/apex-inference-chip | 681 | Python | 推理加速 chip 项目（apex 推理性能 bench） |
| 11 | MeteorNOX/DeepSeek-Balance-Whale-Widget | 654 | JavaScript | DeepSeek Harness 余额监视小部件（右下角弹弹鲸鱼） |
| 12 | missuo/herdrm | 609 | Swift | macOS herdr 控制台（多 agent 终端统一管理） |
| 13 | bawadou/ai-data-extractor | 541 | Python | Claude Code / Cursor / Windsurf / Aider / Cline 聊天记录导出器 |
| 14 | flaqai/backlink_skills | 531 | Python | 「为你的网站提交到 free 网站」的 skill 集（SEO 自动化） |
| 15 | iAmCorey/Wake | 513 | Rust | Mac 上所有 coding-agent 会话集中查看/搜索/恢复（Rust + GPUI） |
| 16 | cclank/lanshu-create-ai-presenter-video | 494 | Python | Provider-neutral Codex skill：脚本+授权人物照→AI 主播视频 |
| 17 | b-nnett/codex-subscription-router | 375 | Go | Codex 订阅路由（多账号 / 多 region 切换） |
| 18 | almendili/skills | 355 | TypeScript | Codex / Claude Code 双栖 skill 集 |
| 19 | nateherkai/scroll-craft | 345 | JavaScript | Claude Code skill：高端滚动驱动网站（**本榜 Top 1 详深挖**） |
| 20 | duty1g/x64dbg-mcp-server | 339 | Zig | x64dbg 原生 MCP 插件，零依赖，71 工具，22 事件（**本榜 Top 2 详深挖**） |
| 21 | Ariescar/anyCreature | 307 | JavaScript | 「任何生物」动画生成（输入物种描述→loop gif） |
| 22 | Yuzzyuk/marketing-os | 287 | - | 整个营销部门一个 skill：14 模块 / 18 战术 hook engine |
| 23 | LBH-123-AI/Comfyui_MiniMax_H3_Latent_Upscaler | 285 | Python | ComfyUI 节点：Minimax H3 24ch 神经 latent 升频器（绕过 VAE） |
| 24 | jaredrhod/fullstack-agent | 277 | Shell | 完整 AI agent 栈：memory + voice + face + hands 一键装 |
| 25 | amagine-ai/Amagine3D | 275 | TypeScript | Amagine3D：从硬件需求到可编辑 3D 设计的端到端 |
| 26 | op7418/pilot-harness | 252 | TypeScript | Pilot Harness：CodePilot-inspired 桌面客户端 + 插件套件（DSH 系） |
| 27 | MirroS-Lab/HarnessEval-W | 250 | Python | HarnessEval-W：把「视觉世界评估」agent 化 |
| 28 | sam70361/emotion-ball | 241 | JavaScript | 32 种表情的纯 SVG 表情引擎（AI 助手情感反馈） |
| 29 | JetBrains/benjamin-plus-skill | 237 | Shell | coding agent token 效率 skill：实测中位数省 17.9% 成本 |
| 30 | DFarm6/Prism-Browser-Community | 231 | TypeScript | Local-first Chromium 多 profile 指纹浏览器（基于 Electron） |

---

## 本月 Top 50 · 2026-07-01 ~ 2026-08-01（created 窗口：上月 1 号 UTC..本月 1 号 UTC）

> 窗口：`created:2026-07-01..2026-08-01`（整月 31 天），按 stars 降序。深挖见月榜文章 `github-monthly-2026-08`。

本月三档亮点：**单生态吃掉大半热度**（Top 1 JustVugg/colibri 25924⭐ + Top 2 xai-org/grok-build 25916⭐ + Top 3 andrewyng/openworker 14952⭐ 三者都与大模型 / agent runtime 强相关）、**Agent 工具栈从单点进入套装**（Top 16 drumih/turbo-fieldfare 6269⭐「Gemma 4 26B-A4B 跑在 2GB RAM」+ Top 15 FareedKhan-dev/kimi-k3-in-c 6311⭐「2.78T Kimi K3 跑在 8.24GB RAM 纯 C99」+ Top 14 MDX-Tom/gpt-5.6-instruct 6344⭐ 是「模型极限 demo」三连击）、**Harness / Skill 全栈化**（Top 19 elder-plinius/T3MP3ST 5646⭐ + Top 27 truefoundry/trueforge 3633⭐ + Top 17 video-shotcraft 6117⭐ 都是「agent runtime 套件」）。本月 Top 10 完整深挖见 `github-monthly-2026-08.md`。

| # | 仓库 | ⭐ | 语言 | 一句话 |
|---|---|---:|---|---|
| 1 | JustVugg/colibri | 25924 | C | C 写的极轻量 LLM 推理框架（CPU/GPU 都跑） |
| 2 | xai-org/grok-build | 25916 | Rust | xAI 官方 grok-build 开源版（构建/部署 agent） |
| 3 | andrewyng/openworker | 14952 | Python | OpenWorker：开源 worker runtime（agent 后台执行环境） |
| 4 | yc-software/qm | 14092 | TypeScript | yc-software 出品 QM：消息队列 + agent 任务调度 |
| 5 | Fei-Away/Codex-Dream-Skin | 14050 | JavaScript | Codex 主题皮肤：把 Codex CLI 渲染成 dream 风格 |
| 6 | img2threejs/img2threejs | 12936 | Python | 图片→Three.js 3D 场景自动生成 |
| 7 | openai/codex-security | 10097 | TypeScript | OpenAI 官方 codex-security：codex 配套安全审计工具 |
| 8 | trycompai/crm | 8825 | TypeScript | AI 优先的开源 CRM（trycompai 出品） |
| 9 | MoonshotAI/Kimi-K3 | 8585 | - | 月之暗面 Kimi K3 模型仓库（推理 + 训练脚本） |
| 10 | unicity-aos/aos-ce | 8554 | Rust | 通用 agent runtime CE 版（unicity-aos 出品） |
| 11 | oso95/scroll-world | 8480 | JavaScript | 品牌→3D 滚动落地页 skill（与 scroll-craft 同赛道） |
| 12 | MiniMax-AI/MiniMax-H3 | 6779 | Python | MiniMax H3 模型仓库（24ch latent 架构） |
| 13 | LiamGvchi/gc-minimal-zine-poster | 6563 | - | Codex skill：quiet minimal zine 风编辑海报 prompt+生图 |
| 14 | MDX-Tom/gpt-5.6-instruct | 6344 | Python | gpt-5.6 系列 Codex 破甲 prompt + 测试包 |
| 15 | FareedKhan-dev/kimi-k3-in-c | 6311 | C | 2.78T 参数 Kimi K3 跑在 8.24GB RAM 纯 C99（无 BLAS） |
| 16 | drumih/turbo-fieldfare | 6269 | Swift | Gemma 4 26B-A4B 推理跑在 2GB RAM M 系 Mac |
| 17 | Vincentwei1021/video-shotcraft | 6117 | TypeScript | Claude Code / Codex AI 视频 skill：152 shot recipe cards |
| 18 | petergyang/no-ai-slop | 5779 | Python | 移除 20+ 种「AI 写作味」模式（去 slop 工具） |
| 19 | elder-plinius/T3MP3ST | 5646 | TypeScript | 自主红队平台：multi-agent offensive-security meta-harness |
| 20 | nyblnet/bento | 4449 | TypeScript | Bento：装在一个文件里的办公套件 |
| 21 | NanoNets/Graft | 4327 | TypeScript | Claude Code / Cursor / Codex / Gemini 加速层 |
| 22 | xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer | 4289 | - | FDE（前沿部署工程师）从零入门指南 |
| 23 | Zeejay0/gathered-scenes-zine-skill | 4260 | - | Codex skill：场景集合 zine 排版 |
| 24 | DavidHDev/canvas-ui | 4222 | TypeScript | 创意 canvas 组件库：HTML + WebGL 效果，React/Vue/Svelte/vanilla |
| 25 | jakubkrehel/skills | 4184 | Markdown | agent skills 集合，帮你做出好 UI |
| 26 | slvDev/esp32-ai | 4141 | Python | ESP32 上的 AI 推理（边缘设备 LLM） |
| 27 | truefoundry/trueforge | 3633 | TypeScript | 开源 agent harness：让 LLM 变成可工作 agent 的 runtime 层 |
| 28 | genspark-ai/genoffice | 3514 | TypeScript | 开源 AI 办公套件（Word/Excel/PPT/PDF 跨平台） |
| 29 | microsoft/skill-recorder | 3359 | TypeScript | 录屏→GitHub Copilot CLI 重建为 intent + 操作序列 |
| 30 | xuchonglang/investing-for-beginners | 3334 | JavaScript | 小隐寺投资百科：美股/期权/加密货币知识框架 |
| 31 | synthetic-sciences/openscience | 3323 | TypeScript | 开源 AI 科研工作台 |
| 32 | bryanthaboi/gen1recomp | 3313 | C | Gen 1 Pokemon 复刻（Lua / LÖVE2D） |
| 33 | kvcache-ai/AgentENV | 3281 | Rust | AgentENV：分布式 agent 环境运行平台 |
| 34 | isjiamu/gzh-design-skill | 3267 | HTML | Markdown → 公众号可粘 HTML（6 主题 + 主题生成器） |
| 35 | mshumer/Claude-of-Duty | 3252 | JavaScript | Three.js 写的 CoD 级 FPS，单条 prompt 出来 |
| 36 | kirodotdev/KiroCrew | 3182 | Python | 持久化工作区：自改进 + 跨会话延续开发 |
| 37 | Tiger3807861189/J-Space-Cognition-Suite-V3.7 | 3018 | Python | AI 认知增强 Skills（基于 Anthropic J-space 研究） |
| 38 | aipoch/open-science | 2958 | TypeScript | 开源 AI 科研工作台 + 可复现研究 agent |
| 39 | FlashML-org/FreeToken | 2846 | Python | （无 description，需点仓库看） |
| 40 | duolahypercho/codex-router | 2787 | JavaScript | Codex 外接模型路由：Kimi OAuth / DeepSeek 引导 + 回滚 |
| 41 | QwenLM/Qwen-MM-Plugins | 2757 | HTML | 让任何 agent harness 原生多模态 |
| 42 | yynxxxxx/Codex-X | 2742 | Rust | Codex 桌面端/CLI 可视化管理（Provider 切换/会话同步/Skills 管理） |
| 43 | AminBlg/SimpleEnglish | 2729 | Python | agent skill：让 LLM 写 ASD-STE100 简化技术英文文档 |
| 44 | lopopolo/harness-engineering | 2557 | Python | Ryan Lopopolo 的「harness engineering」文集 + agent 上下文包 |
| 45 | Jakubantalik/thinking-orbs | 2555 | TypeScript | AI / agent UI 的「点状思考球」加载指示器（9 种调过、2 尺寸） |
| 46 | zerx-lab/FluxDown | 2534 | Rust | Rust 多协议下载管理器（HTTP/FTP/BT 磁力/HLS/DASH） |
| 47 | chuspeeism/dashi-taskboard | 2471 | JavaScript | （无 description，需点仓库看） |
| 48 | AlephAITech/WorkBuddyGuide | 2428 | TypeScript | WorkBuddy 实战蓝皮书（教程 + 真实工作流 + Skills） |
| 49 | powerycy/goutoujunshi | 2380 | Python | 恋爱军师 Codex：接住情绪→分析关系→可执行策略（多元关系） |
| 50 | DannyMac180/sol-advisor | 2309 | Shell | Codex-native 架构师编排（Luna/Terra 实施 lane + 强制 fresh Sol review） |

---

## 数据方法

- **窗口（GitHub UTC，单日窗口，左闭右开）**：
  - 昨日：`created:2026-08-22..2026-08-23`（Y=2026-08-22, Y1=2026-08-23，单日 UTC）。slug `github-trending-2026-08-22` = Y（**用昨天日期不是当天**）。
  - 本周：`created:2026-08-16..2026-08-23`（上周一 UTC 00:00:00 → 本周一 UTC 00:00:00）。
  - 本月：`created:2026-07-01..2026-08-01`（上月 1 号 UTC 00:00:00 → 本月 1 号 UTC 00:00:00）。
- **关键词**：`q=(ai OR llm OR agent OR mcp OR assistant) in:readme`（5 槽位终极版，覆盖用户 AI 全谱诉求）。
- **过滤**：不限 stars 阈值（单日新仓阈值放低到 0）；`archived:false`；不限制语言；不限制中文/英文。
- **排序**：每档按 `stars` 降序，取前 N。
- **样本量与偏差**：
  - 昨日窗口总命中 **54,845 个**仓库，**Top 10 语言分布**：JavaScript 1 / Zig 1 / TypeScript 1 / Rust 1 / Python 1 / Go 1 / 无主语言 4。**英文 / 中文比例** ≈ 8:2（中文集中在 DeepSeek/Codex 周边如 `Tiger3807861189/J-Space-Cognition-Suite-V3.7`）。
  - 已知偏差：`in:readme` 会把 README 里只字未提「ai/llm/agent/mcp/assistant」的项目排除（如 `xai-org/grok-build` 月榜 #2 的 README 不含这些词）。榜单偏向「README 显式提及 AI 元素」的项目，而非「产品名带 AI 但 README 没提」的项目。
  - 已知偏差 2：单日新仓容易被 SEO 词条 + 刷星仓库冲进 Top 10（如 `aj-2-c-2-a/undress-designses` NSFW 词条、`h9-tec/AI-Glossary-Handbook` 9KB 空壳）。**深挖阶段已识别并标 ⚠️，建议读者优先看带仓库元数据 + 真实 commit/PR 历史的项目**。
- **数据源**：
  - GitHub Search API `https://api.github.com/search/repositories?sort=stars&order=desc`。
  - GitHub Trending 页（`/trending?since=daily`）因对无 JS 客户端限流返回 0 字节，**不**使用。
  - 项目内调研：每条 Top 5 抓 README 全文 + 最近 10 条 issues/PRs（issue body 原文 + 实战反馈）。
- **slug 命名**：`github-trending-YYYY-MM-DD`（**用 Y 不是当天**）。
- **跑批**：每日 CST 早 8 点由 cron job `8f1a83d062df` 自动跑，单日窗口 = 昨天 UTC。
