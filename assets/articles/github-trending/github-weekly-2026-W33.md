# GitHub 周榜 · 2026-W33 · DeepSeek Harness 单生态吃掉本周大半热度 + 实测 V8 OOM 等关键 bug 待修

> 数据口径：基于 [GitHub Search API](https://api.github.com/search/repositories) `q=created:2026-08-10..2026-08-17+stars:>50+archived:false+(ai OR llm OR agent OR mcp OR assistant)+in:readme&sort=stars&order=desc&per_page=30` 抓取上周（UTC 整周 7 天，左闭右开）新创建仓库。关键词五槽位 `ai / llm / agent / mcp / assistant`，不限 stars 下限、不限语言、不限 archived。快照时间：2026-08-23 21:13 CST。ISO 周编号 W33（2026-08-10 周一至 2026-08-17 周一）。

上周共有 511 条新创建仓库进入候选池（README 命中 ai/llm/agent/mcp/assistant 任一关键词）。Top 30 取本周（按 star 数降序）。本周榜重点深挖 Top 10。

## 核心信号

- **DeepSeek Harness 单生态吃掉本周大半热度**：Top 30 中 11 条直接挂在 DeepSeek Harness（DSH）插件/桌面端/生态名单下——[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) 本身本周登顶（18.7 万⭐，含累计）；[anywhere-labs/deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop)（1.88 万⭐）、[awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)（1.18 万⭐）、[dsh-market/dsh-market](https://github.com/dsh-market/dsh-market)（1956⭐）、[zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui)（5695⭐）、[yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite)（6683⭐）、[xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard)（3726⭐）等都是同生态。**Harness = "agents 时代的操作系统内核"**，所有插件作者押注"一个插件能装进 DSH = 全平台用户能装"。
- **AI 水印剥离工具出现两个并行实现**：[guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover)（1.73 万⭐，Python stdlib 实现，覆盖 C2PA / SynthID / Kirchenbauer / Aaronson 多家）位居本周第三；社区对"AI 出文如何脱掉出处"的关注已从概念验证进入可工具化阶段，且分散多家实现，没有出现唯一事实标准。
- **Trajectory 锚定 / 思维模式路由 涌现"机制研究"层**：yjh051108/dsh-routing-suite（router-standard 路由预设）、xiaobright/dsh-anchored-standard（两阶段锚定 + 论文级别实测量化 P1-P23）、Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report（J-Space 推理认知控制层 + 基准报告）三件套——这不是新 agent，而是 agent 怎么"按任务感知"切换 persona 的工程研究，是 harness 的"上层认知操作系统"。
- **V8 OOM / token-meter 负数 / heredoc 死锁三大 bug 同时出现在 Top 10 仓库**：DSH Desktop / dsh-anchored-standard / dsh-routing-suite 三个仓库本周都收到关键稳定性 issue——这是"周内爆款"的副作用：项目 7 天涨到数千⭐，但底层 schema 校验、缓存写入、bash 工具调用路径还没扛过重度会话的考验。
- **cordiverse/paper 把"Cordis 范式"补完学术侧**：Top 10 内唯一非代码仓库，[cordiverse/paper](https://github.com/cordiverse/paper)（2707⭐）给"可逆时空组合性"提供学术 pre-print，深挖见后文——它是 DSH 选用的 [Cordis](https://github.com/cordiverse/cordis) 框架背后的形式化基础。
- **AI 编程助手类长尾持续**：本周 Top 30 中至少 8 条直接是某 Agent Skill（Claude Code / Cursor / Codex 风格）；其中 [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop)（3455⭐）是 Oxlint 规则层，专门用来识别"低证据的 TS/JS 写法"——AI 生成代码质量管控成了周内新热点。
- **样本语言分布（Top 30）**：TypeScript 14 · JavaScript 4 · Python 2 · HTML 2 · Rust 2 · PowerShell 1 · Zig 1 · Shell 1 · Java 1 · 未知 2。TS+JS 占 60%，是 harness / 桌面端 / 工具生态的天然主场。

## 本周 Top 30 · 2026-W33（UTC 整周 7 天窗口：2026-08-10..2026-08-17）

| # | 仓库 | ⭐ | 语言 | 一句话 | 信号 |
|---|---|---:|---|---|---|
| 1 | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) | 186,849 | TypeScript | DeepSeek Harness（DSH）开源 agent harness，「万物皆插件」 | ✅ 全场登顶 |
| 2 | [anywhere-labs/deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop) | 18,762 | TypeScript | 基于 DSH 的 Windows + macOS 桌面客户端，桌面本身也是插件 | ✅ 实战 |
| 3 | [guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) | 17,262 | Python | AI 出处水印剥离工具，覆盖 C2PA / SynthID / Kirchenbauer 多家 | ⚠️ 安全 |
| 4 | [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | 11,761 | Python | DeepSeek Harness 插件精选清单（含 awesome-dsh-plugin.com 站点） | ✅ 索引 |
| 5 | [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) | 6,683 | PowerShell | 注入器 × 思维模式路由预设套装，三行为带 + 任务感知路由 | ✅ 机制研究 |
| 6 | [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 5,695 | TypeScript | DSH Web GUI 插件与皮肤生态，梁神模式 + 任务看板 + 移动端 | ✅ 全家桶 |
| 7 | [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard) | 3,726 | JavaScript | 两阶段锚定 Standard 预设（Minimal 起步 → Standard 工具），已停止维护 | ⚠️ 已停维 |
| 8 | [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) | 3,455 | TypeScript | Oxlint 规则：拒绝低证据的 TS/JS 写法，vendor-and-adapt 模型 | ✅ 工程实践 |
| 9 | [yetone/cumora](https://github.com/yetone/cumora) | 2,916 | TypeScript | 跨平台团队聊天，AI agent 与人是同 roster / DM / 看板，BYOA 模型 | ✅ 实战 |
| 10 | [cordiverse/paper](https://github.com/cordiverse/paper) | 2,707 | – | 论文 pre-print：可逆时空组合性编程范式（Cordis 的形式化基础） | ✅ 学术 |
| 11 | [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | 2,411 | TypeScript | 开源 AI coworker，每个 bot 自带一台电脑（OpenBot） | ✅ 早期 |
| 12 | [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 2,355 | TypeScript | DSH TUI 补位插件，Claude Code 风，鲸鱼顶栏 + 流式思考 + 双击 Esc 回滚 | ✅ 单点 |
| 13 | [vercel-labs/fx](https://github.com/vercel-labs/fx) | 2,172 | Zig | Unix 风格编码 agent（实验性，Vercel Labs） | ✅ 实验 |
| 14 | [gvzdv/claudish-to-english](https://github.com/gvzdv/claudish-to-english) | 2,135 | Shell | 把 Claude 输出翻成人话（社区工具） | ✅ 工具 |
| 15 | [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 1,956 | TypeScript | DSH 创意工坊（dsh-market.com），皮肤/宠物/插件三位一体分发 | ✅ 生态 |
| 16 | [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 1,938 | TypeScript | DSH Desktop（独立实现，与 Top 2 是兄弟仓库） | ✅ 工具 |
| 17 | [Hisn00w/ASu-skills](https://github.com/Hisn00w/ASu-skills) | 1,878 | HTML | 简历包装 skill（HTML 输出模板） | ✅ 单点 |
| 18 | [SMNETSTUDIO/WeChat-AI](https://github.com/SMNETSTUDIO/WeChat-AI) | 1,829 | TypeScript | 自托管微信角色扮演对话服务（个人向） | ✅ 早期 |
| 19 | [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 1,621 | TypeScript | 鲸鱼娘皮肤系列（DSH 桌面皮肤包） | ✅ 单点 |
| 20 | [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | 1,464 | TypeScript | 开源替代 Grok Bot（带虚拟沙箱机的 AI 对话） | ✅ 实验 |
| 21 | [cinderline/northcinder](https://github.com/cinderline/northcinder) | 1,206 | JavaScript | MCP server：商品对比 / 提问导购（开源） | ✅ MCP |
| 22 | [ZSvirt/zsvirt](https://github.com/ZSvirt/zsvirt) | 1,203 | Java | Core IaaS 引擎 + 云基础设施基础（ZSvirt） | ✅ 基础设施 |
| 23 | [zouyuxuan122/Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC) | 1,183 | JavaScript | DSH Desktop 另一分支（EAC：Embracing All Conditions） | ✅ 单点 |
| 24 | [alchaincyf/deepseek-harness-orange-book](https://github.com/alchaincyf/deepseek-harness-orange-book) | 1,157 | HTML | DSH 橙皮书《从开机到拆开》：完整系统提示词 + 129 行启动清单 + 三份原始会话 | ✅ 教程 |
| 25 | [elie222/rakazo](https://github.com/elie222/rakazo) | 1,150 | TypeScript | 开源 Grok Bot 替代，自选模型 + 完整本地化 | ✅ 替代 |
| 26 | [Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report) | 1,039 | – | DeepSeek V4 × J-Space 能力现实化报告（Terminal Bench 2.1 / DeepSWE / GAIA 对照） | ⚠️ 争议 |
| 27 | [vercel-labs/eve-software-factory-template](https://github.com/vercel-labs/eve-software-factory-template) | 992 | TypeScript | Vercel Labs 的 eve 软件工厂模板（Foreman） | ✅ 实验 |
| 28 | [dsh-tauri-desk/deepseek-harness-desktop](https://github.com/dsh-tauri-desk/deepseek-harness-desktop) | 987 | Rust | DSH Tauri 桌面版（5 MB 安装包，零环境依赖） | ✅ 单点 |
| 29 | [lexmount/moli](https://github.com/lexmount/moli) | 965 | Rust | AI agent 专用 headless 浏览器，轻量/快/高兼容 | ✅ 工具 |
| 30 | [ysr666/dsh-vision-router](https://github.com/ysr666/dsh-vision-router) | 942 | JavaScript | 给纯文本 DSH agent 加视觉：内置免费图像理解路由 | ✅ 单点 |

### 本周 Top 10 深挖

#### 1. [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) ⭐186,849
- **一句话**：DeepSeek AI 官方开源的 agent harness（代号 DSH），核心理念「Everything is a Plugin」，构建于 [Cordis](https://github.com/cordiverse/cordis) 框架之上。
- **元数据**：TypeScript · 106 MB · MIT · 创建 2026-08-13 · topics `ai-agents / cordis / dsh / dsh-plugin` · 上次 push 2026-08-21。
- **核心价值**：① 「插件即一切」——模型、工具、沙箱、会话存储、UI 甚至 agent 循环本身都是插件，可替换可拼装；② 内置 Web UI（`dsh web` 默认起 `127.0.0.1:3080`，浏览器自开），同时支持 SSH-only 模式（不打开浏览器，仅打印 URL）；③ 官方明确警告「THERE WILL BE COMPATIBILITY-BREAKING CHANGES」——目前是 developer preview，迭代速度极快。横向对比 Cursor / Claude Code / Codex CLI：DSH 把"agent 循环"也开放成插件，意味着你可以替换主控循环本身。
- **争议信号**：⚠️ 仓库 Issues 区域被禁用——开源治理上的大红旗，所有 bug 报告都得走 Discussion 或 fork 仓库；下游插件作者（如 [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite)）就在自己的 issue 区开"upstream-candidate"来记录上游 bug，间接说明官方收集反馈的链路弱。
- **适用场景**：**适合**：想自己搭一套"可拼装 agent 平台"的团队、需要替换 agent 主循环做实验的研究者、想要一个不被某家厂商绑死的开源 harness · **不适合**：需要稳定 SLA 的企业用户（developer preview + 上游 issues 关闭）、对"插件也能加插件"不熟悉的初级用户。

#### 2. [anywhere-labs/deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop) ⭐18,762
- **一句话**：基于 DSH 的 Windows + macOS 桌面客户端（TypeScript / Electron），固定运行特定上游版本，提供窗口/托盘/终端/更新/工作配置。
- **元数据**：TypeScript · 116 MB · MIT · 创建 2026-08-13 · topics `cordis / cordis-plugin / deepseek / deepseek-harness / desktop / dsh / dsh-plugin / dsh-plugin-desktop` · 上次 push 2026-08-23。
- **核心价值**：① 把 DSH 的本地 Web UI、Host 服务、插件系统打包成桌面应用，免去 `npx dsh web` 的环境门槛；② README 主动声明"独立社区项目，与深度求索不存在隶属、合作、授权或背书关系"——GitHub Contributors 里显示的上游贡献者来自 fork 继承和同步提交历史；③ 同时跟进上游 `anywhere-labs` 与 `awesome-dsh-plugin/awesome-dsh-plugin`（"We're talking with anywhere-labs/deepseek-harness-desktop about working together again"），可能合并。
- **关键 bug**：issue #4（💬1）报告 `dsh-token-meter`（v0.1.0-rc.7）的会话投影 `contextBreakdown` 在上下文压缩后 `messageTokens=-4840`，schema 校验 `too_small` 抛错，导致**历史会话直接无法加载**（GUI 提示 `history unavailable for session ...`）；issue #5（💬0）报告 DSH Desktop 2.0.2 在长会话中反复 V8 OOM 崩溃，原因是 `session_projcache.json` 巨大，重命名缓存能恢复。
- **争议信号**：⚠️ README 第三方合作声明 + README 强调"插件生态开放"——但 issue #2、#3 显示真实用户体验问题（模式超过 6 个后第 7 个被截断看不见、macOS 输入框 cmd+v 无效）尚未修复，社区需要更稳定的 issue 响应。
- **适用场景**：**适合**：想要免安装 DSH 桌面环境的非技术用户 · **不适合**：在意长会话稳定性的重度用户（V8 OOM 与 token-meter 负数 bug 仍 open）。

#### 3. [guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) ⭐17,262
- **一句话**：AI 出处水印剥离工具，三层覆盖：Unicode 不可见字符、统计型 token 采样水印、C2PA / EXIF / XMP 文件元数据；支持 Claude / Gemini-SynthID / OpenAI provenance / Kirchenbauer / Aaronson 多家实现。
- **元数据**：Python 3.10+ stdlib（无依赖） · 1.16 MB · MIT · 创建 2026-08-11 · topics 含 `agent-skill / ai / anthropic / c2pa / chatgpt / claude / gemini / openai / provenance / synthid / watermark / watermark-detection / watermark-tools / watermarking / watermarks` · 上次 push 2026-08-23。
- **核心价值**：① skill 只是一份 markdown（无代码），通过 HTTP 调用本地 service，所以 agent 主机无需 Python 环境——这设计是给 Claude Code / Cursor / Cowork / claude.ai 多 host 通吃的；② 三层矩阵（A 不可见 Unicode / B 统计型 / C 文件元数据），每层独立可单独运行；③ 支持的厂商水印覆盖最广，包括 OpenAI provenance、Claude 字符指纹、SynthID-Text、open-LLM Kirchenbauer（绿名单）与 Aaronson（keyed-Gumbel / EXP）——等于把"我能脱哪几家"做成了显式表格。
- **争议信号**：⚠️ **安全**：issue 中报告 `_synthid_score_http` 函数（`image_meta.py:1424`）使用 `urllib.request.urlopen` 没屏蔽 HTTP 跳转，允许通过 redirect chain 发起 SSRF。仓库本质是把"AI 出文 → 洗掉出处"做成 agent skill——任何下游模型托管 / 内容审核平台都必须重新审视这个工具的流通路径。
- **适用场景**：**适合**：在自己内容上做卫生处理（去除不必要的不可见 Unicode / 隐藏元数据）的开发者、隐私研究人员、合规审计 · **不适合**：用来绕过内容出处披露规则制造误导——伦理与法律风险并存。

#### 4. [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) ⭐11,761
- **一句话**：DeepSeek Harness（DSH）插件精选列表，含 awesome-dsh-plugin.com 站点（一站式浏览）+ `dsh-market` 插件市场入口。
- **元数据**：Python · 57 MB（多数是 README 资源图） · CC0-1.0 · 创建 2026-08-13 · topics `awesome / awesome-list / deepseek-harness / dsh / dsh-plugin` · 上次 push 2026-08-23。
- **核心价值**：① 列表是 client-agnostic——只要 plugin 声明 `dsh.bundle` manifest、能 `dsh plugin add` 装上、行为与一句话描述一致、维护中，就能进；不"为了适配某个客户端"是门槛；② README 主动警告"列入此清单不等于安全审查，第三方代码会跑在你机器上，有你的权限、能读你的文件、用你的凭证"——这条免责声明是目前同类 awesome 列表里最直接的安全标注；③ 同时把 [`dsh-market/dsh-market`](https://github.com/dsh-market/dsh-market)（Top 15）和 [`awesome-dsh-plugin/dsh-find-plugin`](https://github.com/awesome-dsh-plugin/dsh-find-plugin) 串起来——精选列表 / 插件市场 / agent 找插件 skill 三件套。
- **争议信号**：⚠️ 列出仓库多但 review 流程是否真的能挡住恶意插件，README 没说审查细节——本周被收录的 11 个 DSH 生态仓里至少有 3 个 power-shell / install.ps1 路径的"安装脚本型"插件（[yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) 等），执行未签名脚本前用户仍需自查。
- **适用场景**：**适合**：新装 DSH 想快速浏览可用插件、插件作者想让自己的仓被收录 · **不适合**：把"awesome-list 收录 = 安全背书"等同——这条 README 自己明确否了。

#### 5. [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) ⭐6,683
- **一句话**：「运行时注入器 × 思维模式路由预设」套装——先装注入器（无重启运行时管理层），再用它装配 router-standard 预设（任务感知 persona 路由，P1-P23 实测）。
- **元数据**：PowerShell · 18 KB（仓库极小） · 无 license · 创建 2026-08-14 · topics `ai-agents / cordis / deepseek-harness / dsh / dsh-plugin` · 上次 push 2026-08-23。
- **核心价值**：① 把 DSH 「工具调用 → 模型选 persona → 思维模式」拆成三层独立模块（injector 是工具层 / router 是 routing 层），用 submodule + 一键 install 串成套装；② 三行为带 + weak 内路由（spec 计划集体 / react 执行者 / mixed 陷阱 / weak 模型自分类），按模型（Pro / Flash）选不同 persona（+5.0 / +5.7）；③ 单任务三锚（回顾 + 收敛 + 反跑题）—— 报告里说"开放任务完成率 0% → 100%"。这套思路是把"思维模式"从抽象 prompt 工程拉到"可路由 / 可测 / 可调试"的工程层。
- **关键 bug**：issue #5（💬2）报告 install.ps1 路径错误——`Copy-Item` 路径在 #25 的修复之后又有新 bug，导致装配链在第二步就断；issue #1（💬2）装完插件后 API 调用次数飙升 2-3 倍但 token 消耗不多、缓存命中 99%——典型的注入器每轮额外调一次的副作用。
- **争议信号**：⚠️ v0.3.0 修了"近距离引导每轮多 1 次 API 调用 = 费用 2×"（[issues/55](https://github.com/yjh051108/dsh-routing-suite/issues/55)），之前版本实际跑出来费用翻倍——这类"机制补丁涉及金钱开销"的问题需要装前看 changelog。
- **适用场景**：**适合**：DSH 重度用户（每天 50+ 次任务）需要给不同任务配不同 persona、agent harness 机制研究者 · **不适合**：偶尔用 DSH 的轻度用户（套装安装复杂度溢出日常需要）。

#### 6. [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) ⭐5,695
- **一句话**：DeepSeek Harness（DSH）Web GUI 插件与皮肤生态，"一切皆插件"理念在 Web 端最完整的落地——任务看板、移动端远程、SSH 运维、皮肤中心、创意工坊。
- **元数据**：TypeScript · 395 MB（含演示素材） · Apache-2.0 · 创建 2026-08-12 · topics `cordis / deepseek-harness / dsh / dsh-plugin / dsh-web / dsh-web-ui` · 上次 push 2026-08-23。
- **核心价值**：① "原生 dsh web" vs "dsh-web-ui 全家桶"对照表清晰——官方没的（任务看板 / 移动端远程 / 远程 SSH 运维 / 图像理解 / 文件预览 / Git 可视化 / 主题皮肤）一栏全做了；② v2 皮肤解耦——不再是耦合官方的 npm 包，而是 `skin.json` 清单 + 纯资产目录，皮肤中心单一加载器，官方升级不再牵动皮肤；③ 创意工坊（dsh-market.com）= Steam Workshop 定位，皮肤/宠物/插件三位一体按设备点赞排序，前三名登上首页颁奖台；站点是纯静态构建（`scripts/market-build`）由 Cloudflare Workers（D1 + R2）承载。
- **争议信号**：⚠️ 体积 395 MB（含大量 demo 截图）——clone 整个仓库对网络差用户不友好；issue #1（💬0）报告手机端 `/m/` 没法处理桌面会话的"工具授权"与"提问"——mux 帧只覆盖 `session/event` 与 `session/projection`，没处理 `approval/requested` 与 `question/requested`，长连接在弱网不可靠（远程会话只能挂起等桌面）；issue #2（💬0）远程控制带 `ip:3080/m` 可访问，但不带 `/m` 报 `crypto.randomUUID is not a function`（`dsh-task-board` 子组件兼容性问题）。
- **适用场景**：**适合**：想把 DSH 当团队日常开发工作台用、喜欢皮肤/宠物陪伴、需要手机远程开会话的 DSH 用户 · **不适合**：网络差 clone 不动 395 MB 仓库、只用 DSH 跑单 agent 简单任务的轻量用户。

#### 7. [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard) ⭐3,726
- **一句话**：两阶段锚定 Standard 预设（Minimal 起步 → Standard 工具），含 7 种模式（anchored / zero-anchored / whoami / prefab / eternal-minimal / wire-think-execute / combo-anchored）。
- **元数据**：JavaScript · 580 KB · NOASSERTION · 创建 2026-08-14 · topics `deepseek / deepseek-harness / dsh-plugin / llm-agent` · 上次 push 2026-08-17 · **README 已声明"active development has effectively stopped"**。
- **核心价值**：① 锚定机制——session 起步用 Minimal tool schema（最小工具集，不注入上下文），session 持久化后 promote 到 Standard 工具目录（heavy tools 按需解锁），减少了早期大工具目录对模型注意力的稀释；② 模式矩阵透明——一张表列清楚 7 种模式的首模型请求、锚定机制、晋升信号、成本增量；③ 论文级别实测量化（P1-P23）、dose-response 数据与 probe 套件——这是 harness "上层认知操作系统"研究的关键样本。仓库本身代码量不大，但维护者 [xiaobright/modeltest](https://github.com/xiaobright/modeltest) 与 [FAREWELL.md](./FAREWELL.md) 留有大量评测笔记。
- **争议信号**：⚠️ **已停止维护**——README 明写"Following the price increases on both the DeepSeek official API and the opencode go subscription, active development of this project has effectively stopped: the evaluation loops these presets depend on are no longer affordable. The repository stays available as-is and receives maintenance only."；issue #5（💬0）另一位用户也证实"quit using deepseek (flash) due to price increase too"，并指出小米 mimo 提供同等价位（~$3-5/月）但基准水平相近。
- **关键 bug**：issue #1（💬0）`buildInstructionHint()` 持久化的消息没有 `id` 字段，导致整个会话无法 reload；issue #3（💬1）`preset/instruction-hint.mjs` 进程重启后会重新注入同一 hint，dedup 只在内存 `Set` 里——这是 "维护停止 + 重度用户仍在用" 的典型副作用。issue #4（💬0）bash 工具在 heredoc terminator 不匹配时永远等 PS2 续行提示（"Again dsh> hang with a Python heredoc?!"），这是 anchored-standard 长会话的高频问题。
- **适用场景**：**适合**：DSH 机制研究者、想复现"两阶段锚定"实验的模型评测者 · **不适合**：生产用户（README 明示已停维、关键 issue 仍未修）。

#### 8. [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) ⭐3,455
- **一句话**：Oxlint 规则集，专门识别并拒绝"低证据 / 低信号"的 TS/JS 写法（chain type assertion、空对象 spread、unsafe dictionary、未知参数等 15 条规则）。
- **元数据**：TypeScript · 60 KB · MIT · 创建 2026-08-12 · topics `agent-skills / linting / oxlint / typescript` · 上次 push 2026-08-18。
- **核心价值**：① "vendor-and-adapt" 模型——README 强调不当作固定 npm 依赖用，而是 `src/` 直接拷到目标仓 `tools/oxlint/anti-slop/`，**复制 + 改成本团队标准**；② `npx skills add dmmulroy/anti-slop --skill install-anti-slop` 让 agent 帮你拷+装+启用，AI 编程助手场景下零摩擦集成；③ 15 条规则覆盖"AI 编程助手经常犯的低证据写法"：chained type assertion、empty object spread、unsafe dictionary、unknown parameters、conditional spreads——每条规则都精准对位"AI 输出 low-quality code" 的常见路径。issue #7（💬0）报告有人在 568k 行 TS monorepo 全部 15 条规则上做了完整命中分布，"哪些规则在大代码库里有实际命中、哪些是装饰"。
- **争议信号**：⚠️ 规则 strict 度高——`require-safety-comment-for-type-assertion` 要求 type assertion 上方必须 `// SAFETY:` 注释（issue #1、#4 报告空 marker 也能过 + export const 上方注释识别不到）；issue #5（💬2）用户问 ESLint 支持——目前只 Oxlint，对已有 ESLint 配置的项目迁移成本不低。
- **适用场景**：**适合**：用 Oxlint 或愿意迁移到 Oxlint 的 TS/JS 团队、需要严格 type assertion 安全注释规范的项目 · **不适合**：已有 ESLint 严格规则的代码库（迁移成本高于收益）。

#### 9. [yetone/cumora](https://github.com/yetone/cumora) ⭐2,916
- **一句话**：跨平台团队聊天（Electron / PWA / iOS / Android），AI agent 与人是同一 roster / DM / 群聊 / 看板 / 日历；两种"大脑"路径——Cumora Cloud（managed K8s pod）或 BYOA（自带 Claude Code / Codex / Grok Build / Cursor Agent CLI）。
- **元数据**：TypeScript · 25.6 MB · MIT · 创建 2026-08-17 · 上次 push 2026-08-22。
- **核心价值**：① 架构清晰——Frontend（React 18 + Vite + TS + Tailwind） / Backend（Express + ws + Postgres + Redis） / Agent runtime（K8s pods 或 BYOA daemons）/ Coordination（seen-cursor freshness gate + atomic claims + small-brain triage gate）四层文档齐全；② BYOA 模型——agent 大脑是你的本地 Claude Code / Codex，server 永远看不到你的 provider 密钥，LLM 调用全部入"成本总账"；③ 多平台对齐——Electron 桌面 / PWA / iOS / Android 共用同一份 React 组件，agent 与人"同一个房间"不是营销话术。
- **关键 bug**：issue #2（💬0）Windows BYOA daemon 启动 tip 误推 `--install-service`——实际只 macOS/Linux 实现，Windows 直接 `throw new Error("--install-service supports macOS/Linux")`，且 tip 没有平台后缀判断；issue #3（💬0）`resolveSpawn` 修复（PR #5/#6，commit `ce339a2b` 已 merge 2026-08-18）但**未发布到 npm**，`cumora@0.1.127` 仍是修复前版本（2026-07-30 release），Windows 用户照官方文档装会持续 `spawn ENOENT`——典型的"修了但没 ship"导致用户体验断档。
- **适用场景**：**适合**：希望 AI agent 与团队成员在同一协作工具内运转、需要数据主权（BYOA）的企业 · **不适合**：macOS / Linux 之外 Windows-only 团队（npm 版本缺失 spawn 修复）、对 React 18 + Vite + Tailwind 之外的 UI 框架有强偏好者。

#### 10. [cordiverse/paper](https://github.com/cordiverse/paper) ⭐2,707
- **一句话**：论文 pre-print（PDF）——「可逆时空组合性编程范式」（Spatiotemporal Composability），formalize 了两条正交维度：temporal composability（卸载时完整 revert 副作用）+ spatial composability（声明式 reactive 管理组件间依赖），并落到 [Cordis](https://github.com/cordiverse/cordis) 框架。
- **元数据**：PDF（882 KB） · 创建 2026-08-13 · 上次 push 2026-08-22 · 邮箱 shigma@cordis.io 收反馈。
- **核心价值**：① **概念工具**——「revertible effects」（每次上下文变换都带 inverse，runtime 追踪）+「reactive coeffects」（context 变化通知组件）合一成 context type，构成一个编程范式；② 论文直接给出了一个组件 calculus，并证明 metatheory 能把"spatiotemporal composability"从单组件推到整个系统；③ 工程验证——Cordis 框架是 DSH 的底层（[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) README 明示"powered by Cordis"），所以本 paper 的工程对应物已经在生产跑——可与"形式化与实现同源"的现状对照。
- **争议信号**：⚠️ README 明示"preprint under active revision. The content may change substantially; please cite the latest version and check back before relying on specific results."——是草稿不是定稿；issues 区域为空（新仓），comments / critique 通道尚未激活。
- **适用场景**：**适合**：对 plugin 系统 / agent harness 形式化基础感兴趣的学术研究者、需要给"插件能加能卸"做数学论证的工程师 · **不适合**：只看代码不看论文、不读 formalization 的纯应用开发者。

## 数据方法

- **来源**：[GitHub Search API](https://api.github.com/search/repositories)（不是 trending HTML——GitHub 已对无 JS 客户端封了 trending 页）。
- **窗口**：UTC 整周 7 天 `created:2026-08-10..2026-08-17`，左闭右开；对应 ISO W33 周一（2026-08-10 00:00 UTC）至 ISO W34 周一（2026-08-17 00:00 UTC）前一天。
- **关键词**：`ai / llm / agent / mcp / assistant`（5 槽位 OR）+ `in:readme`。
- **过滤**：stars > 50；不限制语言、不限制 archived、不限制中文/英文（按 README 命中关键词即收录）。
- **排序**：按 `stargazers_count` 降序取前 30。
- **样本**：511 条候选，本周 Top 30 入选。
- **深挖**：5 维度——仓库元数据 / README 全文提炼 / issue body 原文摘录（含用户名）/ 横向对比同类 / 信号判断（安全 / 实战 / 兼容 / 增长 / 研究诚信）。
- **快照时间**：2026-08-23 21:13 CST（UTC 13:13）。
- **认证**：GitHub PAT，5000/h 充足。
- **slug**：`github-weekly-2026-W33`。
- **标签**：`github / ai / agent / llm / github-weekly-ranking`。
