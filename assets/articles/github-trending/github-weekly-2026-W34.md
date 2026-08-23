# DeepSeek Harness 单生态吃掉本周大半热度 · GitHub 周榜 · 2026-W34

本周 AI / agent / LLM 圈最大的故事只有一个：**DeepSeek 官方在前一周（8-13）开源的 DSH（DeepSeek Harness）agent harness，把本周 GitHub 热门前 10 一口气吃掉了 6 个名额**。剩下 4 个名额，1 个是 DSH 衍生的 IP-as-logo Agent Skill（用 Codex/Doubao 等图像模型生成简化 IP 吉祥物）、1 个是 AI 内容水印剥离工具、1 个是反对"代码注水"的 oxlint 规则集、1 个是 agent 作为"群成员"的团队协作平台 Cumora。从语言分布看，TypeScript 5 个、Python 2 个、JavaScript 1 个、PowerShell 1 个，HTML / Zig / Shell / Java 各 1 个——这是 DSH 把一堆 JavaScript/TypeScript 上下游插件炸出水面后带来的明显倾斜。

另外几个值得读者留意的趋势：第一，**"AI 自身的去痕迹工具"开始严肃化**——本周 guillaumemeyer/watermarks-remover 一夜跑到 17k stars，针对的覆盖层是文本 token-sampling 隐式水印、C2PA / EXIF / XMP 元数据、Unicode 不可见字符；第二，**agent 生态开始反噬"代码注水"**——dmmulroy/anti-slop 提供一组基于 oxlint 的硬规则，专门拦截 AI 写 TS/JS 时容易出现的"过度类型断言 / 模糊参数 / mock 全局对象"等低证据模式；第三，**agent 当作团队一员**——yetone/cumora 把 AI agent 放进"同 roster / 同 DM / 同看板"的群里，并提供 BYOA（Bring Your Own Agent）让你把自己 Mac 上的 Claude Code 或 Codex 串进来当"大脑"，服务器端永远拿不到 provider key。

> 仓库样本 = `created:2026-08-10..2026-08-23`（UTC，左闭右开）窗口内被 stars 排序的前 30 个新仓库，关键词 `ai OR llm OR agent OR mcp OR assistant` + `in:readme`。

---

## Top 10 详深挖

### 1. [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) · ⭐186,453 · TypeScript

这是本周的"现象级仓库"——**19 万星、2 万 fork、库体积 109 MB**，全部压在一周之内堆出来。它不是又一个"AI 编程助手"产品壳，而是 DeepSeek 官方开源的 **agent harness**：让任何 coding agent（Web 端 / headless 端）跑起来的运行时骨架。架构最核心的一句宣言写在 README 第二段：**"everything is a plugin"**——模型、工具、沙箱、会话存储、UI、agent 主循环本身，都是插件。它的底层是 [Cordis](https://github.com/cordiverse/cordis)，设计论文被引用为《A Programming Paradigm for Spatiotemporal Composability》（[cordiverse/paper](https://github.com/cordiverse/paper)，也在本周 Top 11），哲学底座就是"时空可组合性"。

**README 提炼出的核心价值**：① "万物皆插件"——声明式 manifest（`dsh.bundle`），用 `npx @deepseek-ai/dsh web` 一行就能起一个本地 Web 端 coding agent；② 公开的反向兼容态度——仓库顶部明确写"**DEVELOPER PREVIEW, BREAKING CHANGES WILL HAPPEN**"，给社区打预防针；③ 设计论文公开——核心抽象不是 `Function call`，而是"可被替换的运行时切片"；④ 三入口分发——npm 一键跑、源码 build、给 agent 用的 AGENTS.md 独立成册。

**项目状态信号**：在它内部，[#500 issue](https://github.com/anywhere-labs/deepseek-harness-desktop/issues/500) 已经爆出 **DSH 0.1.0-rc.7 自带的 `dsh-token-meter` 在上下文压缩后会算出负数 token（`messageTokens=-4840`）**，结果整个会话历史加载失败。开发者 @EkkoXy 在评论里直接调出了根本位置：`SessionProjectionRegistry.restore()` 在 `dsh-session-projection/lib/index.js:243` 用了"无防护的 `stateSchema.parse(row.val)`"，负数行能过 version match 但 schema 校验必抛错——这就是"DEVELOPER PREVIEW"的真实代价：上游主线测不出来的边界条件，下游桌面客户端先撞上。

**横向对比**：跟 OpenAI Codex CLI、Anthropic Claude Code 这类**闭源 agent 宿主**比，DSH 的最大差异是**"宿主本身没有内置大脑"**——它是壳不是脑，所有模型/工具/技能都能换；跟 LangChain、LlamaIndex 这类**库**比，DSH 是**可执行运行时**，不是 SDK。

**适用场景**：**适合**：要做"自托管 coding agent"、要把 Claude / GPT / DeepSeek 模型混着调、要给团队搭一套带 UI 的 agent 工作台、要写 DSH 插件并进 `dsh-market` 的人。**不适合**：只想跑一次 LLM 调用、要立刻稳定的生产环境（DEVELOPER PREVIEW 阶段破坏性变更可能发生）。

---

### 2. [anywhere-labs/deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop) · ⭐18,685 · TypeScript

如果说 deepseek-harness 是引擎，**这个就是方向盘**——把 DSH 装进 macOS 和 Windows 原生桌面应用里。它的 README 里**特别声明**："本项目是独立的社区开源项目，与深度求索不存在隶属、合作、授权或背书关系。本仓库目前无深度求索员工或 DeepSeek Harness 上游官方团队成员参与；GitHub Contributors 中显示的上游贡献者来自 fork 继承和同步的提交历史。"——这是在抢"DSH 桌面端入口"赛道的同时主动撇清跟官方的关系，避免合规问题。

**核心能力**（从 README 第 50 行表格直读）：① 把上游 Web UI / Host 服务 / 插件系统**封装成原生窗口、托盘、终端、自动更新和工作配置**；② 一键下载安装（Windows x64 NSIS / macOS Universal DMG），**不需要预装 Node.js**；③ 用一个统一"插件协议层"（`dsh-plugin-desktop`）把上游能力组合给桌面端。

**issue 信号**：除了上面提到的 [#500 token 负数](https://github.com/anywhere-labs/deepseek-harness-desktop/issues/500)，仓库里另一个**实战爆雷**是 [#499 "插件安装中断后遗留永久 pending 事务锁，桌面 CLI 全部阻塞，必须重启客户端解锁"](https://github.com/anywhere-labs/deepseek-harness-desktop/issues)——意味着装第三方插件时如果中途崩溃，桌面端会锁死到下次重启。**这是"插件即代码"架构的代价**，awesome-list 在 README 顶部专门用大段 WARNING 提示用户"安装插件等于用你的权限跑第三方代码，工具审批不会沙箱化插件代码"。

**横向对比**：跟 DSH 另一个桌面客户端 [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) 和 [hairyf/deepseek-harness-desktop](https://github.com/hairyf/deepseek-harness-desktop) 比，anywhere-labs 走的是"原生壳 + 内置 dsh-market"路线（README 明确提到内置商店），另外两个则把安装命令留给用户自己跑。

**适用场景**：**适合**：想要"下载即用"的 DSH 桌面端、要把 DSH 部署给非技术同事用、需要稳定 release 包（每月 1 号下载量统计）的场景。**不适合**：在 Linux 上工作的人（只支持 macOS / Windows）、想跑最新 DSH 源码的人（项目"固定并原样运行特定上游版本"）。

---

### 3. [guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) · ⭐17,214 · Python

本周最敏感也最硬核的仓库——**17k 星、1980 fork、86 KB README**，专门剥离 AI 厂商加在文本和文件里的"出处水印"。作者很明确：定位是 "**for privacy and hygiene on content you own**"（你自己拥有的内容做隐私与卫生），并把所有厂商的"剥离难度"摊成三层模型：

- **Layer A（确定性脚本）**：清除**不可见 Unicode 字符、双向控制符、tag 字符、异体空格**——这些都是 OpenAI / Anthropic 经常被观察到会注入的字符；
- **Layer B（统计改写）**：对付 **token-sampling 隐式水印**（Kirchenbauer green-list、Aaronson EXP / keyed-Gumbel），做法是让 agent 重写 + 可选 `rewrite_text.py` hook；
- **Files（文件元数据）**：剥 **C2PA / EXIF / XMP / 文档属性**——覆盖 PNG / JPEG / WebP / AVIF / HEIC / BMP / GIF / TIFF / SVG / PDF / DOCX / XLSX / PPTX / EPUB / ODT / HTML / Markdown / MP4 / MOV / WAV / MP3 / FLAC，几乎所有主流文件类型。

**README 提炼的工程哲学**：① **"skill 只是一个 HTTP 薄客户端"**——agent 主机不需要装 Python，服务跑在 `127.0.0.1:8765`；② **多 host 支持**——一个 `install_skill.py` 同时给 Claude Code（personal / project）、Cowork / claude.ai 云会话、Cursor 等安装；③ **覆盖厂商最广**——Claude / Gemini SynthID-Text / OpenAI provenance / 开源 LLM 的 Kirchenbauer / Aaronson 水印；④ **vendor-neutral 安装**——Claude Code 用户可以直接走 marketplace，其他 host 走统一 installer。

**issue 信号**：仓库现在几乎所有活跃 issue 都是 PR（license 更新、CODE_OF_CONDUCT、停止 Windows 子进程弹控制台窗口的 fix），最早的 [#225 issue](https://github.com/guillaumemeyer/watermarks-remover/issues/225) 被作者 @poorvith-mp **以"无复现步骤、无诊断输出、无环境详情"为由关闭**——这表明项目对**"贡献质量门槛"**有清晰的纪律。

**横向对比**：跟只对付 OpenAI provenance 的小工具（如 `openai-watermark-remover`）比，本仓库是**多厂商统一接口**；跟 `c2patool` 这类"签名验证工具"比，本仓库**方向相反**——`c2patool` 是验证水印是否存在，本仓库是验证后帮你去掉。

**适用场景**：**适合**：要批量清洗自己写的 AI 辅助内容（公司内部文档、个人博客）、要做"AI 内容与人类内容混合"工作流的合规检查、要研究 token-sampling 水印的可剥离性。**不适合**：想去掉他人版权水印做侵权（项目 README 明确反对这种用法）、只想剥 PNG 元数据的简单场景（用 `exiftool` 就够了）。

---

### 4. [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) · ⭐11,706 · Python

DSH 生态的"插件黄页"——**一周内 11.7k 星、1.8k fork**，README 直接挂 `awesome.re` 徽章。它的运行规则写得很死：**"plugin 必须用 `dsh plugin add` 能装、必须声明 `dsh.bundle` manifest、按类别分到对的位置、必须被维护"**——每条收录提交都会先对着源码审一遍描述是否属实。

**README 提炼出的"插件市场哲学"**：① **客户端中立**——一个 plugin 不因为适配某个桌面端就能上榜，只因它遵循协议；② **协议即契约**——`dsh.bundle` manifest 是唯一接入凭证；③ **警告摆在最显眼位置**——直接在大字里写"安装插件等于用你的权限跑第三方代码，工具审批不会沙箱化插件代码；这个 list 不是安全审计，**装之前自己看源码**"；④ **自带 `dsh-market` 推荐**——README 第一屏就推荐官方商店，附安装命令 `dsh plugin --profile web add dshmarket`。

**issue 信号**：10 条开放 issue 全部是 **"Add XXX" 的 PR 请求**——涵盖 `linkingoscar/dsh-billing-glass`（液态玻璃账单覆盖层）、`dsh-theme-customizer`、`MengYuil/dsh-ponytail`、`Moon-shiyue/dsh-github-connect`、`Machine-126/dsh-alert-sound` 等。说明 DSH 插件提交热度已爆发，**维护者面对的是"收录门槛 vs 接受速度"的典型 awesome-list 难题**。

**横向对比**：跟通用 awesome-list（如 `awesome-llm`）比，这个 list 的特殊性是**强协议**——没 `dsh.bundle` manifest 直接拒收，跟 `awesome-claude-code`（按主题分类、无硬协议）相比维护成本更低。

**适用场景**：**适合**：想知道 DSH 现在能装哪些插件、想找生产可用的工具（不是 demo）、要在企业内部组织一份"已审过的 DSH 插件清单"。**不适合**：寻找"AI 编程 prompt 集"（这是 awesome-prompts 类资源的活，不是这里的活）。

---

### 5. [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) · ⭐6,676 · PowerShell

把"思维模式路由"做成 DSH 可装套件的工程实现——**6.7k 星、PowerShell 写的 install 脚本**。它的核心思路是 DSH agent 一次会话里**按当前任务自动切换行为带**：spec（计划 + 集体）、react（执行者）、mixed（陷阱，刻意回避）、weak（模型自分类）。

**README 提炼的工程要点**：① **三步安装链**——`git clone --recurse-submodules` → `install.ps1` 一键装配（注入器 + router-standard 预设 + 布局自检）；② **近距离引导走 `agent/pre-step`**——直接把引导塞进用户消息同一请求，**每轮不再额外产生一次 API 调用**（v0.2.x 时代的双倍费用问题被根治）；③ **首轮路由真实生效**——v0.3.0 修了 [#13](https://github.com/yjh051108/dsh-routing-suite/issues/13) issue 报告的"首条真实用户消息在装配后才被 claim，第一个请求才能按任务分类"；④ **三锚静态策略**——回顾 + 收敛 + 反跑题三件事放在 persona section 内，**开放任务完成率从 0% 拉到 100%**（作者实测数据）。

**issue 信号**：仓库里**最值得关注的两条实战反馈**——[#55 "安装后 API 调用飙升 2-3 倍"](https://github.com/yjh051108/dsh-routing-suite/issues/55)，**作者 @yjh051108 在 v0.3.0 修复并加 26/26 集成测试**；[#56 "install.ps1 路径错误"](https://github.com/yjh051108/dsh-routing-suite/issues/56)，用户 @limpidautumn 在评论里直接给了子模块 commit hash 协助定位。

**最深度的实战反馈来自 [#55 评论](https://github.com/yjh051108/dsh-routing-suite/issues/55) @7889545**：他在 pre-v0.3.0 版本上做了一次端到端 instrumented 实测——**turn 1 = 2 个 API 请求**（首次分类后再注入引导触发 resend），**turn 2+ = 每轮 1 个**——精确复现了 #55 报告的"双调用"机制。这是难得的"普通用户独立测量 vs 维护者修复"的完整闭环。

**横向对比**：跟裸用 DSH（无预设）比，**router-standard 预设相当于给 DSH 加了一个"任务分类路由器"**；跟 Claude Code 的 `--reasoning-effort` / `--permission-mode` 切档位比，这套路由是**在 prompt 内部做自适应**，不依赖用户切开关。

**适用场景**：**适合**：在 DSH 里跑开放任务（写作 / 规划 / 设计）总被模型带偏、要给 V4 Pro 这种"let me 漂移"明显的模型加锁、要在 PowerShell 自动化场景里部署 agent。**不适合**：只想做"线性 coding 任务"（直接用官方 Standard 预设就够了）、不用 DSH 的人（这是 DSH 专用预设）。

---

### 6. [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) · ⭐5,675 · TypeScript

DSH Web GUI 的"皮肤 + 插件 + 创意工坊"全家桶——**5.7k 星、35 KB README、库体积 405 MB**（含 WebGL 壁纸等大资产）。它在原生 `dsh web` 的基础上加了：梁神模式（两阶段锚定预设）、任务看板（含 cron 定时执行）、移动端远程、SSH 运维、图像理解、右侧面板、鲸鱼娘宠物与皮肤中心。

**README 提炼的"插件即资产"哲学**：① **皮肤 v2 不再是 npm 包**——是纯资产目录（`skin.json` 清单 + 样式 + 贴图 + 可选特效脚本），由皮肤中心加载器即时加载，**官方升级不再牵动皮肤，新增皮肤无需发布/安装**；② **创意工坊对标 Steam Workshop**——皮肤 / 宠物 / 插件三位一体、按设备点赞热度排序、前三名登上首页颁奖台；③ **插件机制走官方 `profile` 机制**——所有插件经 `dsh web` 的 profile 挂载，**不动 DSH 源码**；④ **聚合包**——`@linxin666/dsh-web-ui-all` 把外部插件（如 `dsh-better-sidebar`）拼进全家桶。

**issue 信号**：[#1024 "远程控制报错 crypto.randomUUID is not a function"](https://github.com/zhu1090093659/dsh-web-ui/issues/1024) 报告移动端远程场景下 polyfill 缺失；[#1023](https://github.com/zhu1090093659/dsh-web-ui/issues/1023) 请求把 Miku 桌宠插件（`stushansusu/miku-pet`）登记进社区插件索引（已合并）——Mik 宠物带"工作 / 商店 / 属性彩条 / 待机动作"完整养成玩法，配套登记 PR #1022 已通过全部机器人检查；[#1020](https://github.com/zhu1090093659/dsh-web-ui/issues/1020) 是同个 Miku 项目建议"内置 dsh-pet 参考这套玩法"。

**横向对比**：跟原生 `dsh web` 比，这套全家桶是"**实用化补丁 + 视觉扩展**"——把 DSH 从"开发预览版工具"变成"日常能看两小时的桌面应用"；跟 [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) 比，本仓库聚焦 Web GUI 皮肤与插件，桌面壳本身交给其他项目。

**适用场景**：**适合**：要把 DSH Web UI 改造成"日常工作站"（任务看板 + 远程 + SSH）、要做 DSH 主题皮肤二次创作并上架创意工坊、要在 Windows / macOS / Linux 上做远程配对。**不适合**：只想跑一次 coding 任务（原生 DSH 就够了）、完全不在意界面外观（皮肤中心对你没价值）。

---

### 7. [s1dashu/ip-as-logo-skill](https://github.com/s1dashu/ip-as-logo-skill) · ⭐3,838

本周唯一冲进 Top 10 的"AI 图像生成"项目——**3.8k 星、3 天内长出来**。它把"为公司做 IP 吉祥物 logo"这件事**压缩成一个 Agent Skill**，专门跑在 Codex / Doubao / Coze / Workbuddy 这些支持图像模型的 agent 里。

**README 提炼出的设计哲学**（每条都是硬约束）：① **一个主导剪影 + 4-7 个大基础形**——坚决拒绝复杂细节；② **三色默认**（两个 IP 主色 + 一个背景色），三方向提案 → 用户拍板 → 六张独立出图；③ **默认动物主体**——其他主体（机器、奇幻物品、抽象生物）必须有明确产品理由；④ **主体颜色上下文感知** + 背景色"轻微新拟物深度"，禁止堆百分比和渐变公式；⑤ **大主导 IP 柔性从左下/右下角升起来**，禁止固定裁切；⑥ **不输出 SVG**，强制走图像模型；⑦ **默认 6 张图**（3 左下 + 3 右下）。

**安装方式**：跟 Agent Skills 生态对接——`npx skills@latest add s1dashu/ip-as-logo-skill`（项目级）或 `--global`（全局）。要求 agent 配有顶级图像模型：GPT Image 2 / Seedance 5.0 Pro / Nano Banana Pro / Nano Banana 2。

**issue 信号**：[#8 "Generated logo PNG fails to load (404) from cdn.ipaslogo.com"](https://github.com/s1dashu/ip-as-logo-skill/issues/8) 报告 CDN 上的 logo 文件加载失败，作者 @s1dashu 在评论里做了**非常专业的响应**："我在多个设备和网络上自测都能下载；建议换网络/设备，关掉 VPN/代理/广告拦截器再试；如果还是失败请贴具体浏览器控制台/网络报错"——**这是 skill 作者面对"用户环境 vs CDN 边缘"问题的标准做法**：先排除环境变量，再调网络层。

**衍生信号**：仓库自带 [ipaslogo.com](https://ipaslogo.com) 网站，Cloudflare R2 + Supabase 后端，提供"免费 logo 库"对外导流；每张 logo "可商用免费"——这是用免费资产池驱动 Skill 安装量的典型套路。

**横向对比**：跟传统设计工具（如 Figma 模板）比，这套 Skill 把"决策约束"写在 prompt 里——让 AI 替代设计师做风格统一性；跟一般 AI logo 生成器比，本仓库**禁止复杂方向、只接受动物默认**，放弃"千变万化"换取"统一质量"。

**适用场景**：**适合**：要给 SaaS 产品 / 移动 App / 早期创业公司做吉祥物、要在多个平台统一品牌 IP、要批量给客户提案"6 张不同风格"方案。**不适合**：要做严肃品牌识别系统（logo 需要专业设计团队全程介入）、要做矢量 logo（Skill 强制输出 PNG，不走 SVG）。

---

### 8. [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard) · ⭐3,724 · JavaScript

DSH 预设实验性项目——**两阶段锚定**：先用 Minimal 工具 schema（不自动注入上下文）把会话轨迹锚住，等首次 `tool/call` 或 `assistant/message` 完成"promoteOn: either"晋升，再解锁 Standard 工具目录。

**README 提炼的 7 个 mode**（每个都独立可装）：

| Mode | 起始工具 | 锚机制 | 晋升信号 | 额外成本 |
|---|---|---|---|---|
| Anchored Standard | 2 tools（Minimal pair） | Minimal 工具 schema | 首次 `tool/call` 或 `assistant/message` | 0 |
| Zero-Anchored Standard | 0 tools | 1 个固定锚 turn | 锚 reply | +1 次模型调用 |
| Whoami Standard | 0 tools | "你是谁"自我介绍 turn | 自我介绍 reply | +1 次模型调用 |
| Prefab Anchored Standard | 已播种 rolled history | 内置成功轨迹 | 已在 seed 里 promote | 0 次模型调用 |
| Eternal Minimal | 2 tools 永久 | 可见目录永不增长，重型工具走 `dshx` bash gateway | 无（无 phase） | 0 |
| Wire Think-Execute Standard | 工具有但 `tool_choice: none` on the wire | think 步骤路由分发 | 每轮 steer 自身 | +1/turn，prefix cache churn |
| Combo Anchored | 0 tools，每 turn | think/execute split + depth gate + 三个独立行 | per-mechanism | +1/turn |

**项目状态信号（关键）**：README 顶部明确写"**Following the price increases on both the DeepSeek official API and the opencode go subscription, active development of this project has effectively stopped... The repository stays available as-is and receives maintenance only**"——这是 DSH 生态里**罕见的"作者主动停更"信号**。作者写了一份 [FAREWELL.md](https://github.com/xiaobright/dsh-anchored-standard/blob/main/FAREWELL.md)（中文），承认"评测环路（Project2-class runs + 多轮 roll/probe 实验）跑不起了"。issue [#71 "轨迹恒温器"](https://github.com/xiaobright/dsh-anchored-standard/issues/71) 实质上就是这份 FAREWELL 的副产品——proposal 发出后被作者 @xiaobright 在评论里直接说明"**本项目已转维护期，新插件思路应提交到 [0liveiraaa/DeepseekCotexplorations](https://github.com/0liveiraaa/DeepseekCotexplorations)**"，@slicenferqin 主动撤回提案。

**实战爆雷（深挖最有价值）**：[#78 "instructionHint messages are persisted without an id"](https://github.com/xiaobright/dsh-anchored-standard/issues/78)——`buildInstructionHint()` 没给消息加 `id`，DSH 持久化后所有 `user/message` 都会过 `assertMessageEventShape` 校验缺 `id` 必抛错，**整个会话无法加载**。`@hongshuxifan321` 在 [#76 评论](https://github.com/xiaobright/dsh-anchored-standard/issues/76) 里实测复现：在 DSH web 0.1.0-rc.8 上 host 重启 3 次后同一会话累积 3 条同 id 的 `instruction-hint-session-<id>` `user/message`，客户端抛 `received more than one start Match`——会话完全失活（无任何回复）。这位用户给的修复比作者原本的"去重扫描"方案更优雅：**让 id 每次注入唯一**（`id: instruction-hint-${session.id}-${randomUUID()}`）。

**横向对比**：跟 [yjh051108/dsh-routing-suite](https://github.com/yjh051108/dsh-routing-suite) 比，本仓库是"轨迹锁"，**锁住 V4 Pro 的 `let me` 漂移**；dsh-routing-suite 是"任务路由"，**按任务切 persona**。两者可叠加（README 的 "Community projects" 章节明确推荐 dsh-routing-suite 作为"某些场景下更好"的替代）。

**适用场景**：**适合**：要在 DSH 里跑长会话、V4 Pro 上 `let me / The user wants` 漂移严重、要实验"先 Minimal 再晋升"的轨迹工程。**不适合**：项目已停更，需持续迭代的环境（除非接受维护期节奏）、预算受限且要跑 Project2 级评测的团队。

---

### 9. [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) · ⭐3,438 · TypeScript

本周最值得前端工程师看的仓库——**给 oxlint 配的一组"反 AI 注水"硬规则**：拦截低证据、低信号的 TS/JS 模式。它把自己定位成"**vendored rules, not a dependency**"——把规则复制进项目仓库，**根据团队标准自己改自己维护**。

**15 条核心规则**（从 README 列出来）：① `no-chained-type-assertions`（连串类型断言）；② `no-conditional-empty-object-spread`（条件空对象 spread）；③ `no-known-value-widening`（已知值拓宽成联合）；④ `no-module-mocking`（全局模块 mock）；⑤ `no-object-parameters`（对象参数）；⑥ `no-reflect-apply` / `no-reflect-get`（Reflect API 滥用）；⑦ `no-runtime-typeof`（运行时 typeof）；⑧ `no-shape-in-symbol-names`（Symbol 名带形状）；⑨ `no-unknown-parameters` / `no-unknown-returns` / `no-unknown-type-aliases`（用 unknown 当万能退路）；⑩ `no-unsafe-dictionary-type`（不安全字典类型）；⑪ `no-widen-then-assert`（先拓宽再断言）；⑫ `require-safety-comment-for-type-assertion`（类型断言必须有 SAFETY 注释）；**加可选的 Effect 规则** `no-service-constructor-imports`（Effect 服务构造器导入）。

**issue 信号·实战数据**：[#21 "Adoption report: all 15 rules measured against a 568k-line TypeScript monorepo"](https://github.com/dmmulroy/anti-slop/issues/21)——作者实测一个 568,443 行 TS（4,421 文件，18.1 万行注释）的 pnpm monorepo，把所有规则跑一遍再决定是否采纳。结果：8 条"adopted"（包括 `no-widen-then-assert`、`no-object-parameters`、`no-chained-type-assertions`），几条 deferred。**这是开源圈里罕见的"规则命中率透明报告"**，一般 rule repo 不会公开告诉你"某条规则在你的代码里会触发多少次"。

**[#22 "NPM Package + SKILL inside the npm package"](https://github.com/dmmulroy/anti-slop/issues/22)** 讨论"为什么不发到 npm 然后让 `npx skills add` 同时装 skill + 装 npm 包"，社区给了三个 workaround 链接：[@fisch0920/oxlint-plugin-anti-slop](https://www.npmjs.com/package/@fisch0920/oxlint-plugin-anti-slop)、transitive-bullshit 的 fork、josep-qdrant 指向 [issues#13](https://github.com/dmmulroy/anti-slop/issues/13) 的同款请求——**典型"用户比维护者更急"的 issue 节奏**。

**[#23 "ESLint support"](https://github.com/dmmulroy/anti-slop/issues/23)** 收到务实回答：@christopher-buss 指出 "Oxlint APIs 通过 `eslintCompatPlugin` 向后兼容 ESLint"；@cluther-livefront 直接说"让 AI 把规则集转成 eslint 就行，**我刚测了能用**"——**这是 ESLint 用户的真实过渡路径**，不需要等作者发原生支持。

**横向对比**：跟 ESLint 的 `eslint-plugin-no-secrets` 这类**通用硬规则**比，anti-slop 的特殊性是**专门针对"AI 生成代码"的反模式**——`no-module-mocking`、`no-unknown-type-aliases`、`no-shape-in-symbol-names` 这些都是 AI 在写 TS 时最爱偷懒的形态。

**适用场景**：**适合**：用 oxlint 的 TS/JS 项目、要主动拦截 AI coding 助手写出来的低证据模式、要"rule as vendored asset"风格的团队治理。**不适合**：项目还在 ESLint 且短期内不切 oxlint（虽然有 workaround）、只用 JS 不写 TS 的项目（规则不适用）。

---

### 10. [yetone/cumora](https://github.com/yetone/cumora) · ⭐2,912 · TypeScript

本周最野的"agent 协作平台"——**让 AI agent 当作团队的一员**：**同一个 roster、同一个 DM、同一个群聊、同一个看板、同一个日历**。agent 不只是"被戳的时候回答"，而是**持 persona 和记忆、认领工作、互相协调不撞车、能收发真实邮件**，可以跑在 Cumora 云或你自己机器上。

**核心架构**（README 架构图直读）：① **前端** `src/`——纯 UI：React 18 + Vite + TS + Tailwind，覆盖 `desktop / mobile / web / admin` 四个 shell 共享同一套组件；② **后端** `server/`——无状态 Node：Express + `ws`，Postgres 当真值源（pg pool + Drizzle schema），Redis 做 pub/sub fan-out 和在线状态；③ **Agent runtime**——云 agent 跑在 per-agent Kubernetes pod（Go FUSE driver 挂服务端 workspace），BYOA agent 跑在用户机器上，**两套都通过同一个 `cumora` CLI 协议**，所有 LLM 调用（云端 + BYOA）都落到一个 `llm_calls` 成本账本里；④ **Coordination**——同房间里 agent 不撞车：服务端用**seen-cursor freshness gate**（过时回复被 HOLD 让它重看新消息再决定）+ **原子认领工作单元** + **小脑 triage gate 屏蔽大模型**。

**两条脑路径**：① **Cumora Cloud**——每个 agent 跑在托管的 per-agent pod 里，跑多跳工具调用循环（bash / 文件 / 浏览器 / 邮件 / 记忆 / skills…）；② **BYOA**——用 `npx cumora agent computer` 把本地 Mac/VPS 串进来，**agent 的大脑就是本地的 Claude Code / Codex / Grok Build / Cursor Agent CLI，用你自己的订阅，服务器永远拿不到 provider key**。

**issue 信号**：仓库当前开放 issue 主要是 Windows BYOA 的"启动提示 bug"——[#59 "Windows BYOA: startup tip suggests --install-service, but it is macOS/Linux only"](https://github.com/yetone/cumora/issues/59)、[#58 "npm@latest (0.1.127) still ships the pre-fix resolveSpawn"](https://github.com/yetone/cumora/issues/58)。已合并的 PR 包括 i18n 层（含完整简体中文翻译）、embeddings backfill retry 热循环修复、stale 请求覆盖 workspace state 修复——**说明项目还在密集修补 BYOA 边缘 case**。

**横向对比**：跟 Slack/Discord 的"bot 集成"比，Cumora 的核心差异是 **agent 是 first-class participant**——bot 集成是"在一个给人用的 IM 里加一个被戳才回应的脚本"，Cumora 是"agent 跟人坐同一个 roster、按同一套 coordination 协议行动"；跟 AutoGen / CrewAI 这类**纯库**比，Cumora 是**带 UI 的产品**，有 Electron 桌面壳、PWA、iOS、Android。

**适用场景**：**适合**：要给团队搭"agent 长期协作"工作流、要让 agent 互相认领任务不撞车、要保留 provider key 不出本机的合规场景。**不适合**：只是想做个 chatbot 演示（AutoGen 就够了）、不想管 Postgres + Redis 全栈的人（项目本地起步要起这两个）。

---

## Top 11-30 简评

| # | 仓库 | ⭐ | 一句话 |
|---|---|---:|---|
| 11 | [cordiverse/paper](https://github.com/cordiverse/paper) | 2,698 | DSH 底座 Cordis 的设计论文《A Programming Paradigm for Spatiotemporal Composability》，讲"可被替换的运行时切片"如何表达时空组合；DSH 哲学根。 |
| 12 | [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | 2,398 | CopilotKit 推出的开源通用 agent 框架，强调 in-app agent 而非独立聊天产品；TS 写。 |
| 13 | [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 2,344 | DSH 终端 UI 客户端，给不喜欢开浏览器的硬核用户；DSH 客户端生态第三种形态。 |
| 14 | [vercel-labs/fx](https://github.com/vercel-labs/fx) | 2,153 | Vercel 实验性项目，Zig 写的可观察函数执行沙箱；Zig 在 AI infra 层的典型现身。 |
| 15 | [gvzdv/claudish-to-english](https://github.com/gvzdv/claudish-to-english) | 2,127 | Shell 脚本，把 Claude 系列模型的中文回复翻成英文输出——跨境场景下的"语言转换管道"。 |
| 16 | [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 1,940 | DSH 官方插件商店实现（web 端），配套 `dsh-market.com` 创意工坊；Cloudflare Workers + D1 边缘架构。 |
| 17 | [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 1,914 | DSH 另一款桌面客户端（**内置 dsh-market**），跟 anywhere-labs 走不同路线。 |
| 18 | [Hisn00w/ASu-skills](https://github.com/Hisn00w/ASu-skills) | 1,864 | HTML/JS 集合的 Agent Skills 库，强调"通用 agent 都能装"而非绑定特定 agent 产品。 |
| 19 | [SMNETSTUDIO/WeChat-AI](https://github.com/SMNETSTUDIO/WeChat-AI) | 1,829 | TypeScript 写的微信 + AI 桥接，把企业微信 / 微信消息接入 LLM 自动回复。 |
| 20 | [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 1,616 | DSH "鲸鱼娘"宠物插件，带情感状态机；DSH Web UI 衍生。 |
| 21 | [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | 1,449 | TypeScript 多 agent 协作 bot 框架，强调"可观察 agent 间通信"。 |
| 22 | [wang2122/sprix-sage-router](https://github.com/wang2122/sprix-sage-router) | 1,359 | Python 写的"路由器"型 agent 中间件，把请求按任务路由到不同模型/工具；类 dsh-routing-suite 思路。 |
| 23 | [Leutenegger/book-to-skill](https://github.com/Leutenegger/book-to-skill) | 1,230 | Python 工具：把电子书 / 长文档自动转成 Agent Skill 格式；知识资产化管线。 |
| 24 | [cinderline/northcinder](https://github.com/cinderline/northcinder) | 1,206 | JavaScript 项目，北向 API 网关，专门对接 AI 模型 API 做配额管理与审计。 |
| 25 | [ZSvirt/zsvirt](https://github.com/ZSvirt/zsvirt) | 1,203 | Java 写的 LLM agent 沙箱，强调 JVM 安全隔离。 |
| 26 | [zouyuxuan122/Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC) | 1,178 | DSH 增强插件合集（EAC = Enhanced Agent Components）。 |
| 27 | [vvxw/deploy-vercel](https://github.com/vvxw/deploy-vercel) | 1,175 | JavaScript 工具：AI agent 一键把项目部署到 Vercel。 |
| 28 | [alchaincyf/deepseek-harness-orange-book](https://github.com/alchaincyf/deepseek-harness-orange-book) | 1,153 | HTML/文档项目，DSH "橘子书"——从入门到实战的电子书。 |
| 29 | [elie222/rakazo](https://github.com/elie222/rakazo) | 1,144 | TypeScript 项目，针对 macOS 优化的本地 LLM 推理加速器。 |
| 30 | [Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report](https://github.com/Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report) | 1,039 | V4 J-Space 推理能力实测报告——xiaobright 推荐的"模型无关推理时认知控制层"系列文档。 |

---

## 数据方法

- **快照时间**：2026-08-23（CST），对应 GitHub API `created:2026-08-10..2026-08-23`（UTC，左闭右开）
- **时间窗口**：上周一 UTC（2026-08-10 00:00:00）到本周一 UTC（2026-08-23 00:00:00），整周 7 天
- **ISO 周数**：2026-W34（按 ISO 8601；CST 周日 16:00 后到 24:00 的 8 小时在 GitHub UTC 切日下会算到下周——本榜单接受这个 16 小时偏差）
- **关键词**：`q=(ai OR llm OR agent OR mcp OR assistant) + in:readme`，5 个 OR 项上限（用泛词 assistant 代替品牌词）
- **排序**：stars 降序，取前 30
- **详深挖条数**：Top 10（每条 800-1500 字）；其余 11-30 各 80-100 字简评
- **来源**：GitHub Search API（PAT: `~/.private/gh-trending-token`，5000/h）
- **Cron 来源**：周榜 cron（`0 7 * * 1` CST）
- **Slug**：`github-weekly-2026-W34`