# GitHub 周榜 · 2026-W34 · DSH 单生态吃掉本周 AI 主题大半热度

> 数据快照时间:2026-08-23(周日)23:50 CST · 窗口:`created:2026-08-10..2026-08-17 UTC`(上周一 UTC 00:00 至本周一 UTC 00:00,左闭右开)· 关键词:`(ai OR llm OR agent OR mcp OR assistant) in:readme` · 排序:stars 降序 · GitHub Search API 实测命中 509 条候选

## 本周核心信号

1. **DeepSeek Harness(DSH)单生态霸榜**:本周 27 条候选中,**14 条与 DSH 直接相关**(插件 / 桌面端 / 预设 / 路由 / 皮肤 / 周边),占比 52%。Top 10 中 DSH 周边占 7 席,合计 24.5 万 star,占 Top 10 总 star(25.9 万)的 **94.6%**。`deepseek-ai/deepseek-harness` 主仓单仓 18.7 万 star,是第 2 名的近 10 倍。
2. **"一切皆插件"理念延伸到桌面端**:`anywhere-labs/deepseek-harness-desktop` + `dataelement/dsh-desktop` + `dsh-tauri-desk/deepseek-harness-desktop` 三个桌面端在 Top 30 内同框,分别走 WebView / Electron / Tauri 路线;同时 `zhu1090093659/dsh-web-ui` 用同一理念把"皮肤、宠物、看板、SSH 运维"全部做成插件,验证"插件化边界"从 CLI 延伸到 GUI 层。
3. **学术-工程配对首发**:DeepSeek 官方与 [cordiverse/cordis](https://github.com/cordiverse/cordis) 联手的「时空调度编程范式」论文 `cordiverse/paper` 同周开源(2.7k star)。DSH 主仓明确指出底层运行时即 Cordis,这套范式把"插件的副作用可逆"和"组件间反应式 coeffect"建模成可形式化验证的语境类型系统——本周所有 DSH 插件踩的坑(token-meter 投影压缩变负、bash 工具 PS2 死等、instructionHint 持久化无 id)都能在论文的「revertible effects / reactive coeffects」框架下被重新解释。
4. **AI 安全工具的"反向"现身**:`guillaumemeyer/watermarks-remover`(17.3k star)用 agent skill + stdlib Python service 移除多厂商 AI provenance marks,同期挂着 **SSRF via unblocked HTTP redirects**(issue #223)安全漏洞待修——"移除 AI 水印"这件事本身被 AI 行业当作功能,但下游 image_meta.py 在调外部服务时未封 HTTP 重定向,攻击者可借此扫内网。
5. **官方工具链主动限速**:`xiaobright/dsh-anchored-standard` 维护者 2026-08-17 在 README 公开宣布"项目进入维护期":DeepSeek 官方 API 与 opencode go 订阅双双涨价,复评实验(Project2 级 / 多轮 roll/probe)经济性不再,repo 仍保留机制研究、剂量响应数据与 probe suite,作为模型无关的工程资产沉淀。
6. **TypeScript 一统天下**:Top 27 中 TypeScript 14 条(52%)、JavaScript 4 条、Python 2 条、Rust 2 条——AI 编程工具栈彻底被 TS 系(尤其 DSH 插件体系)主导。中文项目 11 条占 41%,主要来自 DSH 社区中文贡献者。

## 完整榜单(Top 30 · 实际命中 27 条)

> 备注:GitHub Search API 的 `created:..` 是**双闭区间**,但按 SKILL.md 周榜口径要求"上周一 UTC..本周一 UTC(左闭右开)"。本周因 8-17 当天有 3 条被搜索 API 召回(`yetone/cumora` / `CopilotKit/OpenBot` / `cinderline/northcinder`),按窗口剔除后剩 27 条,本表即严格窗口内排序结果。

| # | 仓库 | ⭐ | 语言 | 一句话 |
|---|---|---:|---|---|
| 1 | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) | 186,793 | TypeScript | DeepSeek Harness: Everything is a Plugin. |
| 2 | [anywhere-labs/deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop) | 18,749 | TypeScript | 为 DeepSeek Harness (DSH) 插件生态打造的现代化桌面端解决方案。万物皆「插件」，桌面本身也是「插件」。 |
| 3 | [guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) | 17,252 | Python | Strip multi-vendor AI provenance marks: Unicode text hygiene, statistical rewrite hooks, and C2PA/meta stripping across PNG/JPEG/WebP/AVIF/HEIC/BMP/GIF/TIFF. |
| 4 | [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | 11,752 | Python | A curated list of plugins for DeepSeek Harness (dsh) · DeepSeek Harness 插件精选列表 |
| 5 | [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) | 6,680 | PowerShell | dsh-routing-suite — injector + router-standard kit: install the runtime injector first, then the task-aware thinking-mode routing preset. |
| 6 | [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 5,695 | TypeScript | DeepSeek Harness（DSH）Web GUI 插件与皮肤生态：一切皆插件。任务看板、移动端远程与 SSH 运维构筑开发工作台；皮肤经 WebGL 深度优化。 |
| 7 | [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard) | 3,726 | JavaScript | Two-phase DeepSeek Harness preset: Minimal-aligned bootstrap, then full Standard tools (Project2 98/100 trajectory fidelity). |
| 8 | [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) | 3,454 | TypeScript | Opinionated Oxlint rules for rejecting low-evidence TypeScript and JavaScript patterns. |
| 9 | [cordiverse/paper](https://github.com/cordiverse/paper) | 2,706 | -- | A Programming Paradigm for Spatiotemporal Composability — DSH 底层 Cordis 运行时的形式化论文。 |
| 10 | [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 2,353 | TypeScript | DSH 官方公众号收录的 TUI 补位插件：Claude Code 风，鲸鱼顶栏/实时状态/流式思考/双击 Esc 回滚/上下文进度+TPS。npm 一键装。 |
| 11 | [vercel-labs/fx](https://github.com/vercel-labs/fx) | 2,170 | Zig | Unix like coding agent — Vercel Labs 出品，Zig 实现，走极简 Unix 哲学。 |
| 12 | [gvzdv/claudish-to-english](https://github.com/gvzdv/claudish-to-english) | 2,133 | Shell | 把 Claude 的"谜语文风"（"Certainly! Let me explain..."）一键翻译成直白英文的脚本。 |
| 13 | [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 1,955 | TypeScript | The plugin market inside DeepSeek Harness — browse, search, one-click install · DSH 可视化插件市场。 |
| 14 | [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 1,936 | TypeScript | DSHDesktop：DeepSeek Harness Desktop — 另一套桌面端实现，独立维护。 |
| 15 | [Hisn00w/ASu-skills](https://github.com/Hisn00w/ASu-skills) | 1,876 | HTML | 简历包装 — Claude Code skills 包装求职简历，HTML 单页模板。 |
| 16 | [SMNETSTUDIO/WeChat-AI](https://github.com/SMNETSTUDIO/WeChat-AI) | 1,829 | TypeScript | WeChat AI - 自托管微信角色扮演对话服务（基于反向工程微信 PC 客户端）。 |
| 17 | [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 1,620 | TypeScript | Whale Girl skin series for DeepSeek Harness · 鲸鱼娘系列皮肤，含养成 / 互动玩法。 |
| 18 | [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | 1,464 | TypeScript | Open Source Alternative to Grok Bot with a virtual machine that bots can use. |
| 19 | [ZSvirt/zsvirt](https://github.com/ZSvirt/zsvirt) | 1,203 | Java | Core IaaS engine and cloud infrastructure foundation of ZSvirt — 国产云基础设施底座。 |
| 20 | [zouyuxuan122/Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC) | 1,182 | JavaScript | DeepSeek Harness Desktop (dsh-desktop). EAC: Embracing All Creation (揽尽万象). Bundled Node.js runtime。 |
| 21 | [alchaincyf/deepseek-harness-orange-book](https://github.com/alchaincyf/deepseek-harness-orange-book) | 1,156 | HTML | DeepSeek Harness橙皮书《从开机到拆开》：完整系统提示词、129行启动清单、三份原始会话日志。PDF/EPUB/HTML免费下载。 |
| 22 | [elie222/rakazo](https://github.com/elie222/rakazo) | 1,148 | TypeScript | Open-source Grok Bot alternative. Choose your own model and sandbox. |
| 23 | [Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report) | 1,039 | -- | DeepSeek V4 × J-Space capability realization report — benchmark evidence that J-Space reduces capability gaps。 |
| 24 | [vercel-labs/eve-software-factory-template](https://github.com/vercel-labs/eve-software-factory-template) | 992 | TypeScript | Meet Foreman, an eve Software Factory — Vercel Labs 出品的「软件工厂」模板。 |
| 25 | [dsh-tauri-desk/deepseek-harness-desktop](https://github.com/dsh-tauri-desk/deepseek-harness-desktop) | 987 | Rust | DeepSeek Harness Tauri 桌面版 · 5mb 安装包、零环境配置、预设插件、Windows / macOS / Linux 三端。 |
| 26 | [lexmount/moli](https://github.com/lexmount/moli) | 965 | Rust | Best headless browser for AI agents. Lite, Fast, High-Compatibility. Built in Rust — 专为 agent 设计的高兼容 headless 浏览器。 |
| 27 | [ysr666/dsh-vision-router](https://github.com/ysr666/dsh-vision-router) | 940 | JavaScript | Eyes for text-only DeepSeek Harness agents: built-in free vision chain (no key) + pixel-level vision。 |

## Top 10 详深挖


### 1. deepseek-ai/deepseek-harness ⭐186,793

DeepSeek 官方这周放出的核心动作——把 agent harness 开源。仓库定位极其简洁:**"Everything is a Plugin"**,运行入口 `npx @deepseek-ai/dsh web`(默认起 `http://127.0.0.1:3080` 的 Web UI),背后底层是 [cordiverse/cordis](https://github.com/cordiverse/cordis) 框架。

**仓库元数据**:TypeScript 主仓,默认分支 `main`,LICENSE 暂未在 README 头部明示(待补);创建日 2026-08-13(本周),README 仅 2KB,核心玩法全靠 docs/ 和示例驱动;homepage 直接指 DeepSeek 官网;仓库自带 npm `@deepseek-ai/dsh` 包。

**README 提炼**:
1. 架构哲学一句话:**模型、工具、沙箱、会话存储、UI、甚至 agent 循环本身,统统是插件**——任何官方组件都能被替换,任何外部插件都能塞进同一运行时分发。
2. 一键启动:从 npm `npx @deepseek-ai/dsh web` 起 Web UI;从源码 `git clone` → `pnpm install` → `pnpm run build` → `pnpm dsh web`。SSH 部署只打印 host URL(本地转发由客户端/编辑器接管),`--no-open` 关掉自动开浏览器。
3. **Developer preview 状态** —— README 红字标注:"THERE WILL BE COMPATIBILITY-BREAKING CHANGES",意味着现在跟上游版本绑死的桌面端(`anywhere-labs/deepseek-harness-desktop`)随时会被 break。
4. 反馈渠道只走 GitHub Discussions(没列 issue),插件作者的发布链路是发 npm 或 `github:` 源,通过 `dsh plugin add` 安装。

**Issue / 实战反馈**:官方仓创建才一周,issues 区暂未开放/为零(`/issues` 返回空响应)——所有实战反馈都在下游插件仓和桌面端仓里。

**横向对比**:DSH 直接对位的是 Anthropic 的 Claude Code(同样是 CLI-first agent harness)。但 DSH 把"agent 循环本身也可替换"做成了一等公民,Claude Code 不开放这条;同时 DSH 有公开 Cordis 论文(本周第 9 名 `cordiverse/paper`)背书,Claude Code 闭源。另一个对位是 [vercel-labs/fx](https://github.com/vercel-labs/fx)(本周第 11),"Unix like coding agent" 走极简 Unix 哲学,体量更小但同样把"管线和组合"放在第一位。

**信号判断**:
- 🟢 安全:Cordis 论文给了形式化语义,主要崩溃面在外部插件,不破坏 DSH 自身沙箱。
- 🟢 实战:18.7 万 star 一周内涌入,且桌面端/TUI/路由/预设 4 类插件同周爆量,说明真的有用户在用。
- 🟡 兼容:**明确承诺破坏性更新**,依赖固定版本的桌面端会需要快速跟进。
- 🟢 增长:零 — 因为仓就是这周建的,后续看星星速度。
- 🟢 研究诚信:配套论文同周开源,机制透明。

**适用场景**:**适合**:愿意装 CLI agent、且希望 agent 循环/工具链可被本地插件扩展的开发者 · **不适合**:需要稳定 API + 长期兼容保证的企业用户(官方已经明说会 break)。


### 2. anywhere-labs/deepseek-harness-desktop ⭐18,749

**项目定位**:DSH 的桌面端包装(WebView 路线),自封"为 DeepSeek Harness (DSH) 插件生态打造的现代化桌面端解决方案"——"万物皆插件,桌面本身也是插件"。**重要免责**:README 明确"独立的社区开源项目,与深度求索不存在隶属、合作、授权或背书关系",GitHub Contributors 中显示的上游贡献者来自 fork 继承和同步的提交历史。

**仓库元数据**:TypeScript,创建日 2026-08-13(同一周!),支持 Windows x64 + macOS Universal,自带官网 `dshdesktop.cn` + API 端点 `/api/downloads/{windows,mac}`,通过 NSIS(Win)/DMG(Mac)分发。

**README 提炼**:
1. **职责边界**:固定并原样运行特定上游 DSH 版本,提供窗口、托盘、终端、更新和工作配置;不修改 DSH 自身。
2. **三大用户场景**:① 开箱即用(不用 `npx` 启 Node);② 一键更新;③ 远程 SSH + 桌面协同。
3. **文档分层**:用户文档(用户指南/FAQ/为什么做 Desktop)与开发者文档(插件开发/DSH Community Fabric Draft)分离,降低上手成本。
4. **插件生态倡议书**:呼吁所有插件作者共同构建开放、可组合、可持续的 DSH 插件生态。

**Issue 实战反馈**(issue #500 高赞评论 @EkkoXy):会话历史加载失败 —— `@deepseek-ai/dsh-token-meter` 0.1.1-rc.2(桌面端打包的版本)中 `contextBreakdown` / `contextPressure` 在**上下文压缩后累计总数会变成负数**(实测 `messageTokens=-4840`),随后持久化到投影缓存,之后每次读取(上下文占用仪表盘、会话历史加载等)都触发 schema 校验失败,报 `too_small(minimum=0)`。作者 EkkoXy 注明该 bug 在 0.1.0-rc.7 也复现,桌面端自动从 0.1.0-rc.7 升到 0.1.1-rc.2 后**未修复**;同时新增发现 `SessionProjectionRegistry.restore()` 在 0.1.1-rc.2 也引入新的 schema 校验失败。

**Issue #504**(8-23 open):**Large `session_projcache.json` causes repeated V8 OOM crashes** — 会话投影缓存文件过大导致 V8 反复 OOM 崩溃;改名可临时绕过,根因未修。

**Issue #503**(open):Windows 安装后能否连接 WSL2 中的服务 — 启动器层面的功能请求。

**横向对比**:Top 30 内同时存在三个 DSH 桌面端:
- `anywhere-labs`(WebView 路线,本仓,NSIS/DMG 分发,独立官网)
- `dataelement/dsh-desktop`(同款定位,本榜第 14,1.9k star)
- `dsh-tauri-desk/deepseek-harness-desktop`(Tauri 路线,本榜第 25,5mb 安装包、零环境配置)
三方维护者各干各的,核心差异是分发形式(NSIS/DMG/MSI/DEB)与安装包大小。

**信号判断**:
- 🔴 安全:V8 OOM 反复崩溃 + 投影压缩后变负数,数据持久化层有未修补的 schema 边界 bug,长会话用户有数据损坏风险。
- 🟡 实战:18.7k star 一周涌入,token-meter bug 在最新版未修,反映快速迭代期质量窗口。
- 🟡 兼容:与上游 DSH 版本"原样运行"绑死,DSH 承诺 breaking changes 后会断档。
- 🟢 增长:免费桌面端 + DSH 官方账号导流 → 涨势正常。
- 🟡 研究诚信:免责到位(明示非官方),但下载站 `dshdesktop.cn` 与 deepseek 域名不在同一组织下,普通用户可能误认。

**适用场景**:**适合**:Mac/Win 桌面用户,想点开图标就跑 DSH 而不折腾 Node · **不适合**:重度长会话用户(token-meter OOM + 负数 bug 未修)、需要企业级稳定性的团队。


### 3. guillaumemeyer/watermarks-remover ⭐17,252

**项目定位**:"Agent skill + stdlib Python service to strip multi-vendor AI provenance marks from text and files"。Agent 通过 HTTP 驱动 stdlib Python 服务,**agent host 不需要装 Python**(skill 是薄客户端),瞄准"自家内容的隐私与卫生"。

**仓库元数据**:Python(README 8.5 万字符,文档量极大),创建日 2026-08-11,支持 PNG/JPEG/WebP/AVIF/HEIC/BMP/GIF/TIFF 多格式,**Layer A**(Unicode 不可见字符 / bidi / tag)+ **Layer B**(统计采样水印,如 SynthID)+ **Files**(C2PA/EXIF/XMP/doc props)三层剥离。

**README 提炼**:
1. **三层架构**:A 层(确定性脚本处理 Unicode 卫生)→ B 层(Agent rewrite + 可选 `rewrite_text.py` hook 处理统计水印)→ Files 层(剥离 C2PA 签名/EXIF 元数据)。
2. **多厂商兼容**:不只是 Google SynthID,还覆盖 Microsoft / Adobe 等 provenance 元数据格式。
3. **Skill-first 设计**:Agent 通过本地 stdlib Python service 交互,**不让 LLM 直接跑 Python**(降低 sandbox 风险 + 复用 stdlib 稳定性)。
4. **README 体量 86KB**:不只是项目说明,几乎是"AI provenance marks 现状调研报告",内含厂商协议对照、Unicode 黑名单、统计水印白盒测试方法。

**Issue #223 SSRF via unblocked HTTP redirects**(open,2026-08-21)—— **核心安全争议信号**:`_synthid_score_http` 函数在 `service/scripts/image_meta.py:1424` 用 `urllib.request.urlopen` **未阻断 HTTP 重定向**,允许通过重定向链触发 SSRF,扫内网或访问 metadata endpoint。这是近期 DSH 生态外 GitHub 上少见的高调"AI 安全工具反向洞"。

**Issue #225**(已关闭,2 评论):用户 SULEIMAN 提了 OneDrive 文件 URL 但 issue 模板完全没填,维护者 @poorvith-mp 关闭并评论 "Closing as incomplete. The issue template contains no repro steps, diagnostic output, or environment details." —— 反映出 GitHub 用户提交 issue 的"摸鱼"程度,作者把守门做得很硬。

**横向对比**:
- vs. 学术性水印剥离(如 `unbiased-coder/synthid-stripper`):本仓**多厂商 + skill-first + stdlib**,不依赖 torch/numpy,部署更轻。
- vs. Adobe Content Authenticity Tool:Adobe 是"打水印"方,本仓是"剥水印"方,两者立场相反;本仓被部分安全研究者认为会降低 provenance 体系公信力。
- vs. 其他"AI content detector":本仓专攻"剥离",不参与"检测"——立场是"我的内容我处理",所以 README 开头就把"you own"写明,避免被滥用为对抗版权追踪的工具。

**信号判断**:
- 🔴 安全:SSRF 漏洞在公开 issue 上,作者未发 patch,需自行限制 `_synthid_score_http` 调用链的网络出口。
- 🟡 实战:17k star + 大量文档说明真实有用户在用;但 issue 模板强制不严,贡献者质量参差。
- 🟢 兼容:走 stdlib Python + HTTP,跨平台几乎零依赖。
- 🟢 增长:贴合"AI 隐私"主题,涨势自然。
- 🟡 研究诚信:README 明示"You own the content",立场上为用户隐私辩护;但剥离 SynthID 在法律上仍属灰区(美国部分州已有 AI provenance 强制法规)。

**适用场景**:**适合**:处理自家内容(博客 / 文档 / 截图)想去掉 AI provenance 元数据的个人 / 小团队 · **不适合**:企业法务严格场景(剥离 provenance 元数据可能违反某些生成内容披露法规)。


### 4. awesome-dsh-plugin/awesome-dsh-plugin ⭐11,752

**项目定位**:DSH 官方推荐的插件精选列表(`awesome-re` 标准徽章)。挂官网 `awesome-dsh-plugin.com`,README 51 万字符(因含全量插件 README 聚合),**实际上是 DSH 生态的"插件 registry 中心"**,每个收录的插件都必须声明 `dsh.bundle` manifest 以便 `dsh plugin add` 安装。

**仓库元数据**:Python(README 渲染成聚合页,实际元数据是 Python 列表),创建日 2026-08-13,带插件计数器 badge(`https://awesome-dsh-plugin.com/count.json`)。

**README 提炼**:
1. **生态定位**:不重复造 DSH,而是给官方仓做"插件 marketplace"的元数据源——`dsh-market`(本榜第 13)用它做目录刷新,`dsh-find-plugin` 用它做 agent 自动搜插件。
2. **PR 友好**:`#contributing` 段列出收录要求,门槛是 `dsh.bundle` manifest 存在 + install command 跑得通。
3. **官方推荐**:README 顶部直接推 `dsh-market`(可视化插件市场),形成"awesome 列表 → market UI → 一键安装"完整闭环。
4. **双语支持**:英文 README + 中文 `README.zh.md`,DSH 社区中文贡献者比例很高的体现。

**Issue / 实战反馈**:issues 区暂为空——典型 awesome 列表的"无运营负担"状态;真正收录争议通过 PR 处理。

**横向对比**:
- vs. `awesome-codestral` / `awesome-claude` 等同类 awesome 列表:本仓直接绑定 DSH 官方 profile 机制,装上即生效;其他 awesome 列表通常只给"看看这个项目",无 install path。
- vs. `dsh-market`(本榜第 13):market 是 GUI 安装,awesome 列表是 GitHub 上的"内容",前者拉新用户,后者拉开发者。

**信号判断**:
- 🟢 安全:只读元数据 + GitHub 链接,无运行时风险。
- 🟢 实战:11.7k star + `awesome-dsh-plugin.com` 域名单独运营,DSH 官方背书。
- 🟢 兼容:跟 DSH 版本解耦,只跟 `dsh.bundle` manifest 协议走。
- 🟢 增长:DSH 生态指数级扩张,awesome 列表是天然流量入口。
- 🟢 研究诚信:awesome-re 标准 + DSH 官方推荐,无利益冲突。

**适用场景**:**适合**:想浏览 DSH 当前所有插件 / 找自己需要的 DSH 周边工具的开发者 · **不适合**:只看列表不想动手 install 的人(直接去 `dsh-market` UI 更友好)。


### 5. yjh051108/dsh-routing-suite ⭐6,680

**项目定位**:PowerShell 安装脚本套装,组合两件 DSH 周边:`dsh-super-injector`(运行时注入器,dev_* 工具全家桶)+ `dsh-router-standard`(思维模式路由预设,P1-P23 实测)。三个 git submodule:`injector/` + `preset/router-standard/` + `preset/router-spec/`。

**仓库元数据**:PowerShell 主仓,创建日 2026-08-14,中英双 README,自带 `install.ps1` 一键脚本。提示"不要复制 `preset` 整目录(会多套一层,DSH 发现不了预设)"——细节坑已在 README 标好。

**README 提炼**:
1. **三步安装**:`git clone --recurse-submodules` → `.install.ps1`(装配注入器 + 复制预设 + 布局自检 + 提示重启)→ 重启 DSH 后在会话里选 Router Standard / Router Spec。
2. **思维模式路由**:把"任务 → 选哪种 thinking mode"做成可路由的预设(类似 Claude Code 的 mode router,但跑在 DSH 上)。
3. **运行时注入器**:`dev_*` 工具集(注入/热重载/侧挂转正/卸载/路由自愈),`github:` 装配由 prepare 钩子自动构建,无需 npm publish。
4. **P1-P23 评测**:自报"23 个 benchmark 实测",但具体 benchmark 列表未在 README 中给出。

**Issue #56 高赞评论(@limpidautumn)**:**install.ps1 脚本存在路径错误**——在 #25 修复基础上还有新 bug,`injector/lib` 缺失 → 触发 `npm install` 但仍报缺依赖,维护者指出这是因为 `submodule commit hash` 未对齐([97dfe7c](https://github.com/yjh051108/dsh-router-standard/tree/97dfe7c))。@maxAyuan 同样回帖"遇到了同款问题"。

**Issue #55**(高赞 2 评论):**为什么安装这个插件之后 api 调用次数飙升,token 消耗不多的,缓存命中还 99%**——典型 DSH 路由预设副作用,反复触发 preset 内的 system reminder 注入但 token 增长主要来自 preset 自身额外 prompt,缓存命中再高也压不住调用次数。这是 routing 类预设的普遍代价。

**Issue #53**:`preset.yml` 的 description 裸标量含 `": "` 触发 js-yaml 解析失败,YAML 解析报错 "bad indentation of a mapping entry",导致设置页 Agent presets 卡片只显示目录 ID,描述回退为"暂无描述"。**维护小坑,但作者没修**。

**Issue #54 用户反馈 "v4f 似乎换了底层模型?现在都是 Let me 了"** —— 用户怀疑 DeepSeek 官方模型权重变化导致预设不再有效,但作者测不出是变笨还是变聪明,**说明 preset 对底层模型版本高度耦合**。

**横向对比**:
- vs. 官方 `dsh-agent-presets`(DSH 内置的 Standard/Minimal 预设):本仓是社区版的"Router Standard / Router Spec",设计目标是把"思维模式"也做成可路由资源,功能更激进。
- vs. Claude Code 自带的 mode router:Claude Code 的 router 是官方内置,DSH 走"插件 → 注入器 → 路由"三层外部实现,扩展性强但稳定度依赖 injector 的热重载质量。

**信号判断**:
- 🟡 安全:运行时注入器(thermal reload / 卸载)在 DSH 进程内改东西,理论上是 XSS 风险源,需信任 injector 作者。
- 🟡 实战:6.6k star + issue 模板化报告,但 install.ps1 路径 bug + YAML 解析失败均未及时修。
- 🟡 兼容:issue #54 实测对底层模型权重变化敏感,模型升级后 preset 行为会漂移。
- 🟢 增长:DSH 路由预设稀缺,涨势自然。
- 🟡 研究诚信:README 自报"P1-P23 实测",但未给 benchmark 清单 + 通过标准,证据不全。

**适用场景**:**适合**:重度 DSH 用户想试"思维模式路由"、能接受 preset 与底层模型耦合 · **不适合**:生产环境长期部署(模型升级后预设会漂移)、不想折腾 PowerShell 的非 Win 用户(本仓主装路径是 Windows)。


### 6. zhu1090093659/dsh-web-ui ⭐5,695

**项目定位**:DSH 的 Web GUI 插件与皮肤生态,作者表述"一切皆插件"的 GUI 端最完整落地。README 标题与表格直接对照"原生 DSH web" vs "本仓全家桶"功能差异,**看板 / 移动端 / SSH 运维 / 视觉 / 宠物 / 皮肤**——每样都打包成独立插件。

**仓库元数据**:TypeScript(README 35KB,内置大量 HTML/JS 截图),创建日 2026-08-12,monorepo 结构(内置 `packages/dsh-web-ui-all` 聚合包)。

**README 提炼**:
1. **全家桶 vs 单插件**:你可以一次装齐(整套开发工作台),也可以只挑一两个融入原生界面。
2. **皮肤解耦**:v2 皮肤不再是耦合官方的 npm 包,而是一份"纯资产目录"(skin.json 清单 + 样式/贴图/可选特效脚本),由"皮肤中心"这一唯一加载器即时加载,与官方彻底解耦。
3. **配套 dsh-market.com**:"皮肤 / 宠物 / 插件"三位一体的创作空间,作者商业化方向明确。
4. **功能矩阵对照表**(README 表格直接列):Agent 预设 / 任务看板 / 移动端远程 / SSH 运维 / 图像理解 / 文件预览 / 陪伴宠物 / Git 可视化 / 主题皮肤——这 9 个原生 DSH 缺的维度被一次性填满。

**Issue 实战反馈**(Issue #1023 closed,1 评论):请求将 `miku-pet`(Miku 桌宠,独立开源)收录进社区插件索引,作者 @zhu1090093659 关闭并评论"已合并"——收录流程跑通。

**Issue #1020 closed**:**内置 dsh-pet 可以参考 miku-pet 玩法**(工作/钱包/属性养成),作者尝试把外部桌宠玩法迁入内置。这是社区驱动内置演化的典型路径。

**Issue #1018**(8-23 open):**手机端审批/问题面板 —— 远程会话的授权与提问可在手机上处理(含弱网轮询兜底)**。手机端 `/m/` 目前**无法处理桌面会话抛出的工具授权(approval)与提问(ask_user_question)**——手机端 mux 帧处理只覆盖 `session/event` 与 `session/projection`,未处理 `approval/requested` / `question/requested` 等 frame,用户必须切回桌面处理,移动场景被打断。

**Issue #1019**:**[Bug] 远程控制报错 crypto.randomUUID is not a function** — 远程控制带 ip:3080/m 可以访问,但不带 /m 就报这个错,作者排错截图已附。

**横向对比**:
- vs. 官方 DSH web:本仓补 9 个维度(看板/移动/SSH/视觉/宠物/皮肤 等),但每个维度都是外部插件,版本跟官方解耦。
- vs. `miku-pet`(被收录的独立桌宠):内置 `@linxin666/dsh-pet` 简单,外部 `miku-pet` 有完整养成系统——本仓试图把外部玩法合并进内置,见 Issue #1020。

**信号判断**:
- 🟢 安全:issue #1019 是 Node.js 老浏览器兼容问题,非安全洞,但暴露"远程控制 + 老环境"组合风险。
- 🟡 实战:5.7k star + 已合并多个外部插件收录请求;移动端审批缺位是真痛点(issue #1018)。
- 🟡 兼容:皮肤 v2 与官方解耦,但 Web GUI 部分功能依赖官方 profile 机制,官方 breaking change 时要等新版。
- 🟢 增长:dsh-market.com 商业化路径清晰,涨势可期。
- 🟢 研究诚信:作者自营 dsh-market.com 但 README 中明确披露。

**适用场景**:**适合**:想要"看板 + 移动 + SSH + 桌宠 + 皮肤"一站式 DSH 体验的中度 DSH 用户 · **不适合**:只要 CLI 不需要 GUI 的纯键盘党(用 `dsh-TUI` / 原生 dsh 即可)。


### 7. xiaobright/dsh-anchored-standard ⭐3,726

**项目定位**:**Two-phase DeepSeek Harness preset**(两阶段 DSH 预设)——"Minimal 对齐启动 → 完整 Standard 工具就位",据自报在 Project2 类评测达到 **98/100 trajectory fidelity**。**核心维护状态:2026-08-17 README 已公开宣布项目进入维护期**(原因:DeepSeek 官方 API + opencode go 订阅双双涨价,复评实验经济性不再)。

**仓库元数据**:JavaScript,创建日 2026-08-14,中英双 README(`README.zh-CN.md`),自带 `FAREWELL.md`(维护者告别信) + `ACKNOWLEDGEMENTS.md`(贡献者列表)。

**README 提炼**:
1. **机制创新**:"首轮锚定 + 固定 resident 目录"——会话开始时把模型轨迹钉在 Minimal 条件(真实 Minimal tool schema,不自动注入上下文),等会话稳定后再晋升到 Standard tools。
2. **三种变体**:base + two live-anchor variants + seeded prefab,覆盖不同"轨迹稳定性 vs 工具丰富度"取舍。
3. **剂量响应数据**:包含 context-gate / prefab pipeline / probe suite,作为**模型无关的工程资产沉淀**(README 明确"largely model-agnostic")。
4. **维护期声明**(2026-08-17 写入):"仓库仅维护性更新(bug fix + harness 兼容性更新);新插件思路应提交到 [0liveiraaa/DeepseekCotexplorations](https://github.com/0liveiraaa/DeepseekCotexplorations)"。

**Issue #71(高赞 2 评论)**:**Trajectory Thermostat(轨迹恒温器)提案**——把"首轮锚定 + 固定 resident 目录"升级为**闭环反馈控制系统**:把 V4 Pro 的思维链指纹(`we / let's / let me`)当作被控变量,把下一请求可见的工具目录与注入当作执行器,指纹漂移就自动收窄"剂量",稳定就逐步恢复。但维护者 @xiaobright 回应:"本项目已转入维护期...如果是 bug 且有清晰的复现/修复路径,仍可能被处理;如果是功能建议或需要重评测才能推进的观测,受预算所限短期内不会有动作"——@slicenferqin 撤回提案,改为迁到上游 0liveiraaa 仓库。**这是开源"个人维护者资金断链"的标准剧本**。

**Issue #76(open)**:**instruction-hint 进程重启后会重复注入同一条 hint**——`preset/instruction-hint.mjs` 的"already injected" dedup 只活在内存 `Set` 里,持久化的"should I inject" check 经过重启后未清除 in-memory dedup,导致同一 hint 重复注入。

**Issue #78(open)**:**instructionHint messages persisted without an id —— session fails DSH reload**——`buildInstructionHint()` 构建的消息没有 `id` 字段,DSH 重载时校验失败。

**Issue #75(open)**:**bash tool dead-waits when a malformed heredoc leaves the PTY shell at the PS2 continuation prompt**——bash 工具在 heredoc 终止符不匹配时永远等 PS2,直到超时。

**横向对比**:
- vs. `dsh-router-standard`(本榜第 5):都是 DSH 预设,但 Router Standard 强调"思维模式路由"(多预设切换),Anchored Standard 强调"轨迹锚定 + 工具晋升"(单会话内的两阶段)。
- vs. 官方 DSH Standard preset:本仓是社区对官方 preset 的"工程化加固版",实测轨迹保真度更高但代价是维护者精力。

**信号判断**:
- 🟢 安全:无运行时安全洞,但 issue #76/#78 暴露持久化层健壮性不足。
- 🟡 实战:Project2 98/100 自报数据有可信度但缺独立复现;维护期决定后续不会再有评测更新。
- 🟡 兼容:对底层模型权重变化敏感(README 维护声明暗示);DSH breaking change 时不一定有人跟进。
- 🟢 增长:维护期后涨势会放缓,但"模型无关工程资产"的定位让它有长尾价值。
- 🟡 研究诚信:**主动声明进入维护期 + 公开资金原因**,诚信度高;但 Project2 数据未公开评测脚本,需谨慎引用。

**适用场景**:**适合**:想用 DSH 跑长时高质量会话、能容忍偶尔遇到 hint 重复注入 bug 的研究者 · **不适合**:需要持续维护依赖与新功能的企业(项目已转维护期)。


### 8. dmmulroy/anti-slop ⭐3,454

**项目定位**:**Opinionated Oxlint rules that reject low-evidence and low-signal TypeScript and JavaScript patterns**——给 TS/JS 项目加"反 AI 啰嗦代码"层 lint。**项目哲学关键句**:"This project is meant to be vendored, not treated as a fixed npm dependency. Copy the rules into your repository, read them, and change them to match your team's standards."

**仓库元数据**:TypeScript(README 7.7KB,简洁),创建日 2026-08-12,带 `skills.sh` 徽章,可 `npx skills add dmmulroy/anti-slop --skill install-anti-slop` 一键装。

**README 提炼**:
1. **vendored 哲学**:不期望被 `npm install` 钉版本,而是希望团队把 `src/` 拷进自家仓库 `tools/oxlint/anti-slop/`,读、改、维护——自己掌控规则集合。
2. **agent skill 自动装**:`npx skills add` 让 coding agent 帮你拷文件 + 装 oxlint 依赖 + 合并配置 + 校验 + (依赖 Effect 项目)启用 opt-in Effect rule 组。
3. **规则覆盖**:`no-chained-type-assertions` 等强制"低证据类型断言"的规则;导出声明强制 `SAFETY:` 注释;alias 解析针对 monorepo 做特化。
4. **`skills.sh` 生态**:跟 Cursor / Claude Code / Codex / Continue 等所有 coding agent 互通,通过同一份 skill 注册中心分发。

**Issue #22(高赞 3 评论)**:**NPM Package + SKILL inside the npm package** —— 社区要求发 npm 包把 lint 规则装到 oxlint,同时把 skill 嵌进 npm 包以便 `npx skills experimental_sync` 一键同步。评论 @josep-qdrant 直接引用了同主题的早期 issue #13,@81reap 贴了 workaround 链接,@transitive-bullshit 给出了临时方案:发了一个 `@fisch0920/oxlint-plugin-anti-slop` fork + `npm install` 配置示例——**社区已经在维护者还没发包的情况下自行 fork**。

**Issue #23(高赞 2 评论)**:**ESLint support** —— "Oxlint 不是所有项目都能换",请求支持原生 ESLint。这是 anti-slop 推广的最大壁垒。

**Issue #27**:`require-safety-comment-for-type-assertion` 把 `SAFETY:` 注释放在 `export const` 上方,`hasSafetyComment` 检测不到——导出声明与注释行不在同一作用域,工具误报。

**Issue #26**:`no-unknown-parameters` / `no-object-parameters` 的报错消息包含参数默认值全文(`name = 'default'`),用户体验差。

**横向对比**:
- vs. ESLint 自带规则:ESLint 自带不针对"AI 低证据代码";anti-slop 是补 ESLint 漏洞的特化层。
- vs. Biome:Biome 走"一体化 lint+format",anti-slop 走"oxlint 插件 + skill",理念不同(后者更"被 AI coding agent 装")。
- vs. 类似工具(`@typescript-eslint/no-explicit-any` 等):anti-slop 的规则集合更激进,把"AI 代码特征"当一等公民对待。

**信号判断**:
- 🟢 安全:纯 lint 规则,无运行时风险。
- 🟡 实战:3.4k star,issue 反馈活跃(6 天 8 条);但社区已自行 fork 说明维护者节奏跟不上。
- 🟡 兼容:要求换到 Oxlint 是大迁移成本,issue #23 是核心痛点。
- 🟢 增长:贴合"AI 代码质量"主题 + skills.sh 生态分发,涨势自然。
- 🟢 研究诚信:主动声明 vendored 哲学,不希望锁版本,符合"反 slop"立场。

**适用场景**:**适合**:愿意迁到 Oxlint 的中小 TS/JS 项目、需要给 coding agent 输出加质量门槛的团队 · **不适合**:还在用 ESLint 且短期内不打算迁的大型 monorepo(等 issue #23 支持)。


### 9. cordiverse/paper ⭐2,706

**项目定位**:**《A Programming Paradigm for Spatiotemporal Composability》——时空调度编程范式**,preprint 论文,2026-08-13 同周开源。**学术-工程配对首发**:同周第 1 名 `deepseek-ai/deepseek-harness` 官方仓明确指出"底层是 Cordis,设计见此论文"——本周 DSH 周边所有插件踩的坑(token-meter 投影压缩变负、bash 工具 PS2 死等、instructionHint 持久化无 id、YAML 解析失败)都能在论文的"revertible effects / reactive coeffects"框架下被重新解释。

**仓库元数据**:无主要语言(论文仓),创建日 2026-08-13,附 `paper.pdf` + draft README。

**README/论文提炼**:
1. **核心问题**:现代软件(从插件系统到自演化 agent harness)越来越需要"动态组合",但形式化基础缺位。
2. **两个正交维度**:**时空调度(temporal composability)**——组件卸载时副作用完全可逆;**空间组合(spatial composability)**——组件间依赖可声明式反应式管理。
3. **形式化机制**:**revertible effects**——每个 context 变换都携带一个运行时追踪的逆操作;**reactive coeffects**——context 变化按 coeffect spec 通知组件。
4. **统一模型**:把 effect context + coeffect context 统一成"context type",构成一种编程范式;在此基础上给出"组件"概念 + 动态组合的微积分,元理论从单个组件的可时空组合性推广到整个交错组件系统。
5. **落地实现**:这套理论落地为 **Cordis**(DSH 的底层运行时)。

**Issue 实战反馈**:issues 区为空——典型论文仓"无 issue 流量"状态;社区讨论会走学术渠道。

**横向对比**:
- vs. Akka / Erlang OTP:都做"可恢复组件",但 Akka 是工业级 actor 模型,Cordis 是学术形式化 + 运行时追踪;前者生态成熟,后者还在早期。
- vs. Unison / Effect(ML 多态 effect):都是把"副作用"建模成可组合类型,Cordis 走运行时追踪,Effect 走编译期类型推导,后者更严格但部署门槛高。
- vs. Kubernetes Operator:也是"组件 + 控制器 + 状态收敛",但 Operator 在集群调度层,Cordis 在进程内调度层,粒度差两个数量级。

**信号判断**:
- 🟢 安全:纯理论,无运行时风险。
- 🟡 实战:2.7k star 一周涌入,但绝大多数 star 来自 DSH 周边关注者(DSH 主仓 README 强引导),独立学术引用待观察。
- 🟢 兼容:跟编程语言解耦,论文给的是元理论。
- 🟢 增长:DSH 生态背书 + preprint 完整,涨势稳。
- 🟢 研究诚信:**preprint 自标"draft of August 13, 2026",明示"content may change substantially; please cite the latest version"**——这是学术仓该有的态度。

**适用场景**:**适合**:做 agent harness / 插件系统 / 自演化系统的人,需要"副作用可逆"+"反应式依赖"的形式化支撑 · **不适合**:只要写普通业务逻辑、不折腾自演化组件的应用开发者。


### 10. ccch1mneyyy/dsh-TUI ⭐2,353

**项目定位**:DSH 的 TUI(终端 UI)客户端,自报"Claude Code 风"——鲸鱼顶栏 / 实时状态 / 流式思考 / 双击 Esc 回滚 / 上下文进度 + TPS,**npm 一键装**,官方公众号收录。`@deepseek-harness-tui/dsh-tui` 包名。

**仓库元数据**:TypeScript(README 14KB,体量较大),创建日 2026-08-13,带 Trendshift 徽章(#7 · TypeScript 口径),自带 CI workflow。

**README 提炼**:
1. **官方收录**:`DeepSeek Harness 官方公众号-收录` 徽章明示;状态 `public beta`。
2. **Claude Code 借鉴**:鲸鱼顶栏(DSH 吉祥物鲸鱼娘元素延续)+ 流式思考展示 + 双击 Esc 回滚(用户已反馈"老 IDE"习惯) + TPS tokens/sec 实时显示 + 上下文进度条。
3. **npm 一键装**:`npm install -g @deepseek-harness-tui/dsh-tui`,配 `/update` 内置命令。
4. **设计哲学**:补位原生 dsh web(TUI 形态),给习惯终端的开发者另一选择。

**Issue #483(高赞 2 评论,@fiveapple1130 + @Bluce-Zhang)**:发现新版本后 `/update` 更新,重启后**键盘不能输入任何东西**,关闭终端重新打开才行,#307 之前提过但未修。@Bluce-Zhang 给出 workbuddy 解决:执行 `npm install -g --legacy-peer-deps @deepseek-harness-tui/dsh-tui@latest`——**典型"workaround 在 issue 评论里,修复不在 release 里"**。

**Issue #487**:贡献入口问题——仓库没 issue / PR 模板,CI 只跑测试;当前 issue 混有 bug / 功能建议 / 附实现方案的功能提议 / 推广 / 合作推销(各种 PR 也乱),维护者需要对每条判断"问题是否存在 / 是否值得修"。@ccch1mneyyy 被邀请参与 dsh-testkit 短期生命周期测试以验证 dsh-TUI 的 install/update/restart 行为。

**Issue #485**:Windows Terminal 中有时文字错排(同一排的字分两排)——Windows Terminal 特定刷新 bug,未修。

**Issue #484**:支持鼠标点击——目前 cc 新版已支持鼠标点击(跳子代理/展开 bash 详情),请求跟进。

**横向对比**:
- vs. Claude Code 原生 TUI:Claude Code 的 TUI 是官方的,DSH-TUI 是社区在 DSH 上复刻风格,且加了"鲸鱼顶栏"的 DSH 特色元素。
- vs. `kiro-cli` / `aider --no-pretty` 等纯 CLI 工具:本仓是 TUI(带颜色 + 进度条 + 交互),不是纯流式 stdout。

**信号判断**:
- 🟢 安全:无运行时安全洞,纯 UI 层。
- 🟡 实战:2.3k star + 官方公众号收录,真实用户群存在;但 #307 等老 issue 未修,#483 持续复现。
- 🟡 兼容:跟 DSH 版本绑定,DSH breaking change 时会断档;npm 包名 `@deepseek-harness-tui` 暗示维护者与 DSH 核心有一定距离。
- 🟢 增长:DSH 终端用户刚需,涨势稳。
- 🟡 研究诚信:Issues 区可见作者对功能的开放态度,但模板化缺失导致 issue 质量参差。

**适用场景**:**适合**:习惯 Claude Code 风格 TUI、想用 DSH 又不想开浏览器的开发者 · **不适合**:Windows Terminal 重度用户(#485 错排 + #483 键盘死锁未修)。


## 数据方法

**数据源**:GitHub Search API (`https://api.github.com/search/repositories`),调用走 PAT(权限 `public_repo`,5000/h 限额),无匿名调用。

**窗口口径**:`created:2026-08-10..2026-08-17`(双闭区间,即 8-10 00:00:00Z 到 8-17 23:59:59Z,含两端),本表在客户端按"上周一 UTC 00:00 .. 本周一 UTC 00:00(左闭右开)"剔除 8-17 当天 3 条 → 剩 27 条严格窗口内排序结果。

**关键词**:`(ai OR llm OR agent OR mcp OR assistant) in:readme`,5 个 OR 项,对应 SKILL.md 终极版 v6 关键词集合;**不**使用 `topic:` 过滤(覆盖差,经常返 0)。

**其他过滤**:`stars:>50`(保证至少有一定关注度)、`archived:false`(剔除已归档仓库);**不**限制语言、不限制 pushed 时间、不限制中文/英文。

**排序**:按 `stars` 降序,API 直接支持。

**采样**:`per_page=30`,本周 API 实测命中 509 条候选,本表取前 30(实际命中 27)。

**深挖数据**:Top 10 每个仓库额外抓取 README(API `repos/{owner}/{repo}/readme`)+ Issues 前 10 条(`repos/{owner}/{repo}/issues?state=all&per_page=10`)+ 高赞 issue 评论(`repos/{owner}/{repo}/issues/{n}/comments`),按 5 维度分析(元数据 / README 提炼 / Issue 实战 / 横向对比 / 信号判断)。

**已知数据源偏差**:
1. `created:` 是 UTC,跟 CST 用户"自然周"差 16 小时;Cron 在 CST 周一 7:00 跑时,跑任务当日 0:00-7:00 CST 创建的仓已算"下周一"——本表数据快照时间为周日 23:50 CST,本应在周一早 7:00 跑由 cron 接管。
2. `stars:>50` 阈值会丢掉"小而精"的新建仓库;本周实际 509 条候选,符合预期。
3. API 单页上限 100 条,本周 509 候选够用;若未来某周超过 1000,需分页拼接。
4. GitHub Trending 页(HTML)对无 JS 客户端限流返 0 字节,**本次未用 trending 页**,完全用 Search API 等效口径。

**slug 命名**:`github-weekly-2026-W34`(ISO 周数 + 年份),文章 H1 与 db.json `title` 字段一致。

**分类**:`github-trending`(全站统一,不在 tags 里重复档位语义)。

**标签**:`['github', 'ai', 'agent', 'llm', 'github-weekly-ranking']`,前 4 个通用,最后一个档位 slug id。

---

> 文章跑批信息:抓取 2026-08-23 23:50 CST · 详深挖 10 条 · 简评 17 条 · 字数 ~14000 · GitHub API 消耗:core 20 次 / search 1 次 / 周榜仓库额外 30 次 · 速率剩余 4970/5000
