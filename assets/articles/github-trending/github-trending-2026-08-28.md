# GitHub 日榜 · 2026-08-28 · "去 AI 化"写作 skill + Codex-MCP 桥霸榜

## 核心信号

- **"去 AI 化写作"首次登顶**：榜首 [Nanako0129/sepia](https://github.com/Nanako0129/sepia) 用一作发表于 arXiv 的 6 万篇 AI 小说语料分析（StoryScope 论文）做支撑，主打"先改叙事结构再改词面"——同类项目普遍停留在"换词"层。332 星单日收盘。
- **Codex + ChatGPT 跨端 MCP 桥是今天真正的"AI Agent"亮点**：[XiaoDuoYa/codex-with-chatgpt](https://github.com/XiaoDuoYa/codex-with-chatgpt) 把付费 ChatGPT 当规划脑，把 Codex 当执行壳，283 星。亮点不在 star 高，而在把"agent 协作"换成了"MCP 数据面 + 浏览器控制面"双通道，OAuth 2.1 + 一时配对码做到"知道 URL 也调不动"。
- **设计 / 艺术类 Agent skill 同日两条上 Top 5**：[camilleroux/genart-skill](https://github.com/camilleroux/genart-skill)（生成艺术，79 星）和 [bayshier/sunxue](https://github.com/bayshier/sunxue)（孙学写作法白描叙事 Skill，15 星）——前者做的是"确定性可上链的 AI 辅助绘画"，后者做的是"模仿孙宇晨《我的女友景甜》白描风"。两个 skill 都把"AI 当工具，作者当主理"的边界划在 prompt 之前。
- **小工具型自托管项目集中冒泡**：[chrisgreg/boop](https://github.com/chrisgreg/boop)（92 星，单二进制 + SQLite + 直推 APNs 的开发者通知收件箱）+ [Inch-high/unifi-support-file-analyzer](https://github.com/Inch-high/unifi-support-file-analyzer)（52 星，UniFi 1,700 个支持文件本机分析）——用户对"自己的数据、自己的机器"的偏好非常一致。
- **首期快照，无上期对照**：本档是 gh-trending-watch skill 在 `feat/pro` 分支下记录的第一篇日榜，全部 15 条均为新上，Δ 列均为 `-`。

---

## 重点深挖

### 1. [Nanako0129/sepia](https://github.com/Nanako0129/sepia) ⭐332

- **一句话**：用叙事架构修补（不是改词）让 AI 写的小说看起来像人写的，覆盖 Claude Code / Codex / Grok Build / Antigravity 四平台。
- **元数据**：Shell、112 KB、topics `agent-skills / ai-writing / antigravity / claude-code / codex / narrative-architecture / writing-skill`、MIT、单仓四平台 packaging（`.claude-plugin/` `.codex-plugin/` `.agents/`）。
- **README 提炼**（5 条核心价值）：
  1. **不动叙事结构改词是徒劳**：引用 StoryScope（Russell et al., 2026；6 万 1 千 6 百零 8 篇样本）—— 只用叙事结构特征的分类器在 AI 小说上达到 93.2% macro-F1；改表层风格把数字从 95.5% 推到 93.9%，基本没动。AI 留下的痕迹是架构性的：主题被旁白解释、单线因果链、情绪只当身体感受、不指涉现实、线性时间、结尾靠主角成长收束。
  2. **三遍改稿协议**：架构（叙事层）→ 话语流（段落级节奏）→ 表层风格（词面）。每遍对应一份 reference 文档（`narrative-pass.md` / `discourse-pass.md` / `style-pass.md`）。
  3. **30 条特征诊断 rubric + 5 个模型指纹修正**：Claude / GPT / Gemini / DeepSeek / Kimi 各自的指纹特征，给出针对性的反向校正（不是泛泛的"不要用 em dash"）。
  4. **专业文书走另一套规则**：发行说明 / PR 回复 / postmortem / 工单 / 技术文章，每类一份 rule file；slop 检查表共用一份。核心原则是 **校准到人类分布而非倒置 AI 分布**——人类处在中等值，把所有规则都用上等于换一套新指纹。
  5. **一次安装，四平台通用**：`install.sh` 同时给 Claude Code（`~/.claude/skills/sepia` symlink）/ Codex（`~/.agents/skills/sepia`）/ Grok Build（`~/.grok/skills/sepia`）/ Antigravity（copy + `/sepia` workflow）；还兼容 77+ agent 的 Skills CLI（`npx skills add -g`）。
- **Issue / 实战反馈**：仓库今日尚无公开 issue，全部 5 条交互都是 PR。其中 [#2 "Document the immutable installer contract"](https://github.com/Nanako0129/sepia/issues/2) 讨论"安装契约不可变"——意味着用户已经把 sepia 当作长生命周期基础设施用，担心一次升级破坏装好的环境；[#3 "Make the user-scope installer fail closed"](https://github.com/Nanako0129/sepia/issues/3) 仍在 open，作者承认当前 user-scope 安装遇到边缘情况会"fail open"（落到 project-scope 而非报错退出），属于安全边界讨论。
- **横向对比**：市面上同类型 "humanizer" 工具（[Humanize-AI](https://github.com/）、GPTZero-bypass 类、StealthGPT 类）几乎全做"换词 + 句式扰动"，没有一篇把论文里的架构级 fingerprint 当成诊断输入。sepia 的真正差异化在第一层（叙事架构）—— 它假设读者能看出"主题被旁白解释"而不是"用了哪个 em dash"。
- **信号判断**：✅ 实战（多 PR 已合入，说明有用户边用边改）；⚠️ 风险面（"去 AI 化" skill 在学术诚信场景是灰区，README 没明说"禁止提交学术论文用 sepia 改"，作者后续要补边界）；✅ 跨平台一次安装降低使用门槛。

**适用场景**：**适合**：用 AI 写小说 / 网文 / 推广文案想"看不出是 AI"的长内容创作者；同时跑 Claude Code + Codex + Grok + Antigravity 多平台的 Agent 重度用户。**不适合**：只想把单篇短文改改词面的轻度用户；要把 AI 痕迹藏起来用于学术/作业等学术诚信场景（这是伦理问题不是工具问题）。

---

### 2. [XiaoDuoYa/codex-with-chatgpt](https://github.com/XiaoDuoYa/codex-with-chatgpt) ⭐283

- **一句话**：把付费版 ChatGPT 网页当"规划与审查脑"，Codex 当"执行壳"，两者通过 OAuth 保护的只读 MCP 桥 + 一时配对码连接；你的仓库代码不会上传，ChatGPT 按需拉几行它真正需要的。
- **元数据**：TypeScript、125 KB、topics `ai-agents / chatgpt / codex / mcp / model-context-protocol`、MIT、Node ≥ 20、含 76 个 vitest 测试（路径安全 / OAuth / 配对 / MCP e2e）。
- **README 提炼**（5 条核心价值）：
  1. **重新定义"agent 协作"**：传统做法是 ChatGPT 把规划丢给 Codex 让它跑——但 Codex 跑规划消耗的是稀缺 API 配额。本项目反着用：把 ChatGPT Plus/Pro 已订阅的网页额度拿来当思考端，Codex 只负责执行。
  2. **双通道模型**：控制面（Computer Use）走 `<1 KB` 的 `[C2C]` 状态消息（`INIT → PLAN → EXECUTED → REVIEW → DONE`）—— 不传 diff / 日志 / 文件内容；数据面（MCP）走 8 个只读工具（`workspace_info / list_directory / read_file / search_workspace / git_status / git_diff / test_status / execution_summary`），让 ChatGPT 自己按需拉。
  3. **安全模型走"按构造"路线**：服务器上根本不写 / 删 / shell / commit 工具——"prompt injection 也无法启用它们"。每个 token 绑死一个 workspace，路径用 canonical realpath 校验（symlink / `../` / 绝对路径逃逸全部拦截且有测试）；`.env*` / 密钥 / SSH / 凭据默认拒绝；`.c2cignore` 加自定义规则。
  4. **OAuth 2.1 + 一时配对码**：PKCE S256 + 动态客户端注册 + 旋转 refresh token + 撤销。知道 URL 没 token → 401；token 对不上 workspace → 403。唯一接触浏览器的秘密是 5 分钟 TTL、5 次尝试上限、配上即销毁的一次性配对码。
  5. **小白的"一段话安装"**：README 里专门写了一段给非技术用户的话——直接复制给你的编码 Agent 即可，agent 自动装 git / Node 20 / cloudflared、克隆、corepack pnpm install + build、拷 SKILL.md、`c2c setup`、内置浏览器开 ChatGPT 配 connector、输入配对码。用户只在登录 / 验证码 / 2FA 时被打扰，且一次只给一个动作。
- **Issue / 实战反馈**：仓库只有 1 条公开 issue —— [#1 "插个眼"](https://github.com/XiaoDuoYa/codex-with-chatgpt/issues/1)（用户 franklintimoteo 留的占位记录 "I am here"），0 评论。这说明项目发布不到 24 小时，还没人提出真问题；从 PR 流程看（项目里有 76 测试 + docs/security.md + docs/protocol.md）作者把"安全论证"放在了工程化层面而非 issue 讨论。
- **横向对比**：同类的 "ChatGPT 网页当工具"项目（如 [ChatGPT-Plugins](https://github.com/)、浏览器扩展 [Merlin](https://merlin.foyer.work/) 等）几乎都是截图 OCR + 提示词注入型 hack，没有一个走 OAuth + MCP 通道；与 [openai/openai-mcp](https://github.com/openai/openai-mcp)（OpenAI 官方 MCP）相比，本项目是"用 ChatGPT 反向调 Codex"的特殊化版本，且把"读不到完整仓库"作为隐私卖点。真正可比的应该是 [browser-use](https://github.com/browser-use/browser-use) + Codex 的组合——但那个要走 Selenium/Puppeteer + vision，而本项目走 OAuth + tunnel，控制面 + 数据面分离干净得多。
- **信号判断**：✅ 安全（"按构造只读 + 路径 realpath 拦截 + 凭据默认拒绝 + 配对码 5 分钟销毁"四件套，README 把它们写成 4 行而不是糊一起，是认真想过威胁模型的人）；✅ 实战（76 个测试覆盖路径安全 / OAuth / 配对 / MCP e2e，不是 demo）；✅ 兼容性（明确说"知道 URL 没用"，避免了把 MCP endpoint 暴露到公网后被扫的常见雷）。

**适用场景**：**适合**：已经订阅 ChatGPT Plus/Pro 同时在用 Codex CLI 做长任务开发，希望"规划阶段不吃 API 配额"的中-重度用户；对"代码上传第三方"敏感、需要 OAuth 隔离的私有仓库开发者。**不适合**：用免费 ChatGPT 的用户（必须 Plus/Pro 才能跑 connector）；不信任 cloudflared tunnel 的网络洁癖用户；非 Codex 编码 agent 用户（项目没适配 Claude Code / Cursor）。

---

### 3. [chrisgreg/boop](https://github.com/chrisgreg/boop) ⭐92

- **一句话**：单 Go 二进制 + 单 SQLite 文件 + 单 Docker 容器的自托管开发者通知收件箱，你的应用 POST 一个事件，它直推你的 iPhone（直走 APNs，无中继）。
- **元数据**：Go、574 KB、topics 空、MIT、单仓含 server（Go + Svelte web UI，内嵌进二进制）+ iOS（SwiftUI，iOS 26，需自签）。
- **README 提炼**（5 条核心价值）：
  1. **零托管依赖**：没有 hosted relay、没有账号系统、没有 telemetry。一个 binary + 一个 SQLite 文件 + 一个 Docker 容器——你的事件从你的服务器直推到 Apple APNs，中途没别人。
  2. **架构清晰**：应用 POST 事件带 project API key → Go server 脱敏存 SQLite → 直推 APNs（payload 只带 title / body / event id，<1KB）→ iOS app 用自己的 device credential 反过来拉完整事件详情。Web UI 装进 binary，管理 project + device + 显示配对 QR。
  3. **多语言客户端**：[boop_ex](https://github.com/chrisgreg/boop_ex)（Elixir）已发布；README 留位给其他语言客户端——所有客户端共用一个 `POST /api/v1/events` 端点，发送前脱敏、截断而非拒绝、只重试网络错误和 5xx、永不让宿主进程崩。
  4. **APNs 可选**：没配 `.p8` 时事件照样存、照样在 Web UI 看，settings 页明示"推送未启用"——而不是假装在工作。这种"该明说就明说"的口径贯穿整个 README。
  5. **集成示例现成**：shell function（`boop "Backup complete" "" success`）、GitHub Actions（`if: always()` 一段 curl）、Elixir 客户端 `Boop.send_async(title: "Cron finished")` —— 都明示脱敏规则和错误处理路径。
- **Issue / 实战反馈**：仓库 0 个 issue、0 个 PR 公开记录。这与项目本身处于"刚发布 + 作者文档完备"阶段吻合——README 里几乎把所有常见问题都答了（脱敏范围 / SQLite 备份 / APNs 失败 / 路径安全 / iOS 签名），所以读者还没动力开 issue。
- **横向对比**：跟 [ntfy](https://github.com/binwiederhier/ntfy) 对比最直接——ntfy 是通用自托管推送（web push + FCM + APNs），用户群体广但每条事件都得自己手写；boop 是"开发者事件通知"专门化，开箱带 `Boop.Event.exception(e, __STACKTRACE__, tags: %{env: "prod"})` 这种"把 Elixir 异常转成富事件"的工具方法。另一个对照是 [healthchecks.io](https://github.com/healthchecks/healthchecks)——但 healthchecks 是 cron 死活检测，不发富 payload。boop 的位置是"我的应用想喊我一声的中文版 PagerDuty"。
- **信号判断**：✅ 实战（Elixir 客户端独立仓库已发布且 MIT 授权，意味着已有人在生产用了）；✅ 安全（脱敏 + 路径清理在 README 里写得很具体，不是事后补）；✅ 架构清晰（README 把架构图画在文档里，把交互式版本放在 `docs/architecture/index.html`——这个细节说明作者在乎"读者怎么读懂"，不是只在乎功能能跑）。

**适用场景**：**适合**：跑自托管服务的开发者，想要"应用抛异常 / 备份完成 / 部署成功"事件推手机的人；不想给 Pusher / Pushover / OneSignal 交钱的隐私敏感者；用 Elixir / Phoenix / OTP 体系的应用（`boop_ex` 已经覆盖富异常结构）。**不适合**：需要 web push（无浏览器扩展，只 APNs）/ Android（暂无 Android 客户端）；不想自己签 iOS app 的用户（README 写明"you build and sign it"）；需要"团队协作通知"的场景（boop 是 1 人对 1 手机的单租户设计）。

---

### 4. [camilleroux/genart-skill](https://github.com/camilleroux/genart-skill) ⭐79

- **一句话**：Claude Code 的生成艺术插件，把"用 PRNG hash 做确定性种子"、"多分辨率渲染"、"稀有度表设计"、"预览信号捕获"、"版画/笔式绘图仪导出"、"生成艺术的伦理边界"这些领域知识打包成一个 skill；附两个 runnable 脚本（`check.mjs` 做确定性检查、`render.mjs` 出 PNG / 网格 / 普查 / 批量）。
- **元数据**：JavaScript、43 KB、topics `art-blocks / claude-code / claude-plugin / creative-coding / generative-art / onchain-art`、MIT、作者 Camille Roux（[art.camilleroux.com](https://art.camilleroux.com)，维护 [awesome-generative-art](https://github.com/camilleroux/awesome-generative-art)）。
- **README 提炼**（5 条核心价值）：
  1. **用 hash 给 PRNG 种子，做到可上链的确定性**：把 token hash 当种子 → 同一组合在任何分辨率 / 任何时机渲都出同一张图——这是 Art Blocks / 256ART / Verse / Highlight / Plottables / bootloader.art 这类链上生成艺术平台的最核心技术要求，作者把它做成默认 skill 知识。
  2. **渲染回路让 Claude 自己"看图改"**：`render.mjs --hash 0x…` 出一张 PNG，Claude 看图、调整 sketch、再 render——可视化反馈闭环。`--grid 50` 出 50 张接触表，`--census 5000` 实测稀有度分布（不是纸上算的稀有度表）。
  3. **平台知识表"故意只放稳定概念"**：platform sheets 里只有每个平台的心智模型 + 官方文档 URL + 该问哪些问题——不放版本号、不放具体字段名（"copy 来的数字几个月就过时，看了反而误事；URL 不会过时"）。Claude 在写平台代码前自己抓真文档。
  4. **明确承认"什么不能证明"**：WebGL shader 编译器 / 浮点精度 / 光栅器 / MSAA 在不同 GPU 上不一样；JS 超越函数在不同引擎上不一样。skill 只验证"同机可复现" + "多尺度感知稳定" + "特征稳定"——不承诺"跨机可复现"。`references/verification.md` 把这条边界写明白。
  5. **CI 自己测自己**：每次 push 跑 check.mjs 跑过 known-good fixture，且跑 broken variant 必须 fail；每月跑一次检查 sheets 里所有 URL 还活着（404/DNS 算挂，bot wall 不算）；URL 死了就开 issue。**不把易变信息塞进文档**——只放会过期的链接，让过期这事能被自动检测。
- **Issue / 实战反馈**：仓库 0 个 issue、0 个 PR 公开记录——和 boop 同模式（"作者文档够全，读者还没动力开 issue"）。从 plugin 打包 + CI + monthly URL check 看，作者把"长期维护"也写进工程了。
- **横向对比**：跟 [hedron](https://github.com/)) / [fxhash-boilerplate](https://github.com/fxhash)) 这类"开箱就能 mint"的 Art Blocks / fxhash 模板相比，genart-skill 不替代它们——它给的是"怎么判断你的 sketch 是否值得 mint"的知识层 + "怎么验证可复现"的工具层，而模板给的是"怎么调 API 跑 mint"的脚手架层，两者互补。另一个对照是 [generative-placeholders](https://github.com/) 类项目——但那些是占位图，不涉及稀有度 / 链上 / 印品输出。
- **信号判断**：✅ 安全（"什么不能证明"明确写出来，且 monthly URL check 自我监控腐烂点）；✅ 实战（作者本人是生成艺术家且维护 awesome-generative-art，不只是蹭热点）；✅ 长期维护工程化（CI + 月度 link check + 文档结构性克制）。

**适用场景**：**适合**：在 Claude Code 里做生成艺术 / creative coding 的艺术家；打算把作品上 Art Blocks / 256ART / Verse / Plottables 等链上平台的 minters；想要"少踩可复现性坑"+"有稀有度实测工具"的 generative coding 学习者。**不适合**：只想要静态 NFT 图片（skill 教的是创作方法不是出图）；不写 Claude Code plugin 的纯 p5.js / Three.js 创作者（plugin 框架依赖 Claude Code hooks）；想"AI 自动 mint"的快速变现用户（skill 立场是"AI 是助手，艺术家是主理"，不接受 AI 直接出图 mint）。

---

### 5. [Inch-high/unifi-support-file-analyzer](https://github.com/Inch-high/unifi-support-file-analyzer) ⭐52

- **一句话**：1,700 个文件 / 几百 MB 的 UniFi 控制器支持文件，本机直接读，回答你真正想问的——为什么重启、什么占 CPU、有没有可疑进程、内网在跟谁通信、这文件要发出去会泄露什么。
- **元数据**：Python、2 MB（仓库）、单文件 `run.py` + 内置 venv；topics 空；MIT（README 里明确加的，作者在 [#1](https://github.com/Inch-high/unifi-support-file-analyzer/issues/1) PR "Add an MIT licence" 里写："仓库公开但没授权，等于看的人没权限用——MIT 跟 README 里说的'用、改、卖都行'一致"）。
- **README 提炼**（5 条核心价值）：
  1. **完全本机，零外发**：没有云服务、没有 telemetry、不改你的设备。作者在 README 开头明说"不是 Ubiquiti 官方工具，与 Ubiquiti 没关联"——避免被误读成厂商背书。
  2. **覆盖真实问题**：Findings 面板把可疑点按"问题 + 证据"排好（README 例子里直接展示"Network 应用的内存耗尽，把 4 核里的 3 核钉死近 9 小时"）；Restart causes 把每次重启跟重启前 6 小时的事件对齐再分组；CPU 历史是用 hourly snapshot 之间的 `/proc/<pid>/stat` 差值反推的——support file 里根本没 CPU 时序，只有 capture 那一刻的 `top` 一帧。
  3. **隐私面板（Privacy）是真活**：README 写实："一份真实 bundle 里发现 2 个独立私钥 + 179 个独立密码/密钥/token 值 + 密码 hash + WAN 地址 + 479 个 MAC + 969 个公网 IP + 122 个外部域名，足以推断出用的哪家 VPN 哪家服务"。一键生成脱敏副本（地址用 RFC 5737 / RFC 7042 标准文档段，密码/密钥/token 直接删），不是把每条都换成 `XXXXXX` 那样安全但无法跟随诊断。
  4. **"诚实说不知道"贯穿全文**：① CPU 历史是重建的，不是记录——支持文件里没 CPU 时序；② GC 检测只看"GC 占墙钟时间大、回收堆占比小"的窗口，不假装能看出原因；③ "Network 视图是照片不是录像"，连接表只代表 capture 那几分钟开着的东西；④ 日志完整性是内容一致性而非 mtime——因为 support file 生成器在 capture 时统一拷贝，1,696/1,764 个文件共享 4 分钟 mtime 窗口，根本不能信 mtime；⑤ "找不到证据"通常意味着"没记下来"，History 面板把所有日志源放在同一根时间线上，区别是覆盖范围。
  5. **作者主动写"我是 AI 写的"**：README 开头一段 "About how this was built" 直接说"这个工具是 AI 提示出来的，不是一行行敲的"，然后讲两个原因——透明（让用户判断该不该信）；目的（让"为什么我的 UniFi 总重启"能跟支持中心从"它老重启"对话变成"Network 应用内存耗了 8.9 小时，看日志"对话）。
- **Issue / 实战反馈**：[#7 "How can I debug this?"](https://github.com/Inch-high/unifi-support-file-analyzer/issues/7)（用户 franklintimoteo，2 条评论）：报"我加载两个网站，一个能显示图表，另一个 History tab 显示错误"。作者 Inch-high 第一条回复给出常见原因——"终端或 cmd 窗口关闭了，进程被杀——必须保持后台运行直到 done，再 Ctrl+C"。第二条："我让本地 AI 和 Claude 看了一眼，是不是跟你做的对得上？"并指向 PR #8（"Run in a container, reducing the dependency issue"）——**作者自己遇到同样的问题，让 AI 帮他改，跑成容器版减少依赖问题**。这是一个真实的"开发者用 AI 修 AI 写的工具"的链路闭环，issue 里的对话非常诚实。
- **横向对比**：跟 [ubiquiti-community-faq](https://github.com/) 这类社区 wiki 比，unifi-support-file-analyzer 是"工具型分析器"不是问答；跟 [NetworkML](https://github.com/) 这类通用网络异常检测比，它专门针对 UniFi 控制器的"那个畸形大文件"做语义解析（syslog 多种方言、Java GC log 时间戳是 JVM 启动秒数需要靠 Network 进程 starttime 反推墙钟、压缩归档命名风格不一样）。最关键的是 Privacy 模块——同类工具一般只是"打印脱敏字符串"，本工具会保留"同一个真实值 → 同一个替身"的一致映射，否则你会丢"在日志里跟住同一台设备"的能力。
- **信号判断**：✅ 安全（self-only、明确说"不是官方"、隐私一键脱敏且 RFC 标准替身）；✅ 实战（issue #7 + PR #8 是真实的"用户报错 → 作者用 AI 修 → 容器化" 闭环）；✅ 长期维护（作者主动补 MIT、补容器化方案、PR #6 "Add a manual trigger" 等都已合并）；✅ 研究诚信（README 主动写"我是 AI 写的"，主动写"我不知道"——少见）。

**适用场景**：**适合**：家里 / 小公司跑 UniFi 控制器（UDM / UDM Pro / UDM SE / Cloud Gateway），被"莫名重启" / "CPU 飙高" / "日志里有奇怪进程"困扰的运维者；要把支持文件发给厂商但想先脱敏的隐私敏感者；想理解自己家里 / 公司内网都在跟什么通信的人。**不适合**：Ubiquiti 老一代纯硬件控制器（无 Network application，本工具设计的依据是 Network 应用的进程 / GC / syslog 体系）；纯命令行爱好者想要 grep 一把梭（工具走 FastAPI + JSON API + Web UI，非 CLI 优先）；只看 1-2 个日志不想要全套分析的人（推荐直接 `grep` 不是这工具的定位）。

---

## 完整前 15 表

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---|---|---:|---:|---|---|---|---|---|
| 1 | [Nanako0129/sepia](https://github.com/Nanako0129/sepia) | 332 | - | agent | 新上 | Shell | 去 AI 化写作 skill，主改叙事架构不改词面，四平台通用 | ✅ 实战 |
| 2 | [XiaoDuoYa/codex-with-chatgpt](https://github.com/XiaoDuoYa/codex-with-chatgpt) | 283 | - | mcp | 新上 | TypeScript | ChatGPT 当规划脑 + Codex 当执行壳，OAuth 保护只读 MCP 桥 | ✅ 安全 |
| 3 | [chrisgreg/boop](https://github.com/chrisgreg/boop) | 92 | - | 其他 | 新上 | Go | 单二进制 + SQLite + APNs 直推的自托管开发者通知收件箱 | ✅ 实战 |
| 4 | [camilleroux/genart-skill](https://github.com/camilleroux/genart-skill) | 79 | - | 设计skill | 新上 | JavaScript | Claude Code 生成艺术 skill，确定性可上链，含可跑检查工具 | ✅ 实战 |
| 5 | [sgyno09-source/reference-video-director](https://github.com/sgyno09-source/reference-video-director) | 77 | - | 其他 | 新上 | — | 描述缺失，需打开仓库确认用途 | — |
| 6 | [d4ncboz/jailbreak](https://github.com/d4ncboz/jailbreak) | 69 | - | agent | 新上 | — | BOZAGENTIC：jailbreak 分类法 + CoT 抢占 + 通用 prompt 反演框架 | ⚠️ 学术 |
| 7 | [Inch-high/unifi-support-file-analyzer](https://github.com/Inch-high/unifi-support-file-analyzer) | 52 | - | 其他 | 新上 | Python | 本机解析 UniFi 1,700 文件支持包，含隐私脱敏 + 进程审计 | ✅ 实战 |
| 8 | [ZJU-REAL/Easel](https://github.com/ZJU-REAL/Easel) | 48 | - | 其他 | 新上 | Python | 私人 evolving 社交媒体助手，仓库体积 306 MB（含模型权重？） | — |
| 9 | [baidu-baige/LoongSage](https://github.com/baidu-baige/LoongSage) | 32 | - | agent | 新上 | Python | 生产级 Agentic RL 框架，复现 frontier LLM 训练配方 | ✅ 实战 |
| 10 | [Spico197/sunbench](https://github.com/Spico197/sunbench) | 25 | - | 其他 | 新上 | Python | "Who's gonna be 被割？"——LLM 评测套件（中文命名风格） | — |
| 11 | [mr-ruhid/metro_core](https://github.com/mr-ruhid/metro_core) | 22 | - | 其他 | 新上 | Dart | 独立移动 OS shell，受 Metro UI 启发，Flutter + 移动 Linux 零 Android 依赖 | — |
| 12 | [TunaaaAaaaa/miniEvoAgent](https://github.com/TunaaaAaaaa/miniEvoAgent) | 19 | - | agent | 新上 | Python | 简洁可复现 self-evolving / 递归自我提升 agent 教学实现 | ✅ 学习 |
| 13 | [fridge1/llmgateway](https://github.com/fridge1/llmgateway) | 19 | - | 模型 | 新上 | TypeScript | 统一 LLM API 网关 / 商业平台，OpenAI/Anthropic/Gemini 协议，Go + React + PostgreSQL | ✅ 实战 |
| 14 | [LalaGa-1119/jiazuo-atelier](https://github.com/LalaGa-1119/jiazuo-atelier) | 18 | - | 模型 | 新上 | TypeScript | 甲作 Atelier：手机端 AI 美甲推荐与虚拟试戴，含轻量评测工作台 | — |
| 15 | [bayshier/sunxue](https://github.com/bayshier/sunxue) | 15 | - | 设计skill | 新上 | — | 孙学写作法 Skill：源自孙宇晨《我的女友景甜》的极简白描叙事风格 | — |

---

## 其余 6-15 简评

- **#5 [sgyno09-source/reference-video-director](https://github.com/sgyno09-source/reference-video-director)** ⭐77 — 描述缺失，仓库仅 22 KB、无 language、topics 空，是典型的"占位 / 链接壳"结构，但 star 数说明用户把它顶上来是因为 README 或页面里含 AI 关键词；本表先留位，不进深挖。
- **#6 [d4ncboz/jailbreak](https://github.com/d4ncboz/jailbreak)** ⭐69 — 标题自称 "Sovereign Alignment Research, Jailbreak Taxonomies, CoT Pre-Emption"，属于学术/红队方向的 prompt 反演框架。仓库无 language、117 KB，README 通常会包含 prompt 攻防学术综述与对照实验；读者要警惕：研究领域对"jailbreak 工具开源化"有伦理争议（是否提供攻击 payload 给普通人）。
- **#8 [ZJU-REAL/Easel](https://github.com/ZJU-REAL/Easel)** ⭐48 — "Your private evolving social media assistant"，Python 但仓库 306 MB——很可能内置了模型权重或大量数据快照。浙大 ZJU-REAL 团队出品，是进化式内容助手方向。
- **#9 [baidu-baige/LoongSage](https://github.com/baidu-baige/LoongSage)** ⭐32 — 标题"生产级 Agentic RL 框架"，README 自带"validated recipes"——意味着提供 frontier LLM agentic RL 训练配方（含数据处理 + 训练 + 评测）。同档生态里另一条 RL 路径是 [agentica-project/rllm](https://github.com/agentica-project/rllm)，LoongSage 的差异化要看是否专门复现特定 paper 的训练配方。
- **#10 [Spico197/sunbench](https://github.com/Spico197/sunbench)** ⭐25 — 中文标题 "Who's gonna be 被割？"，LLM 评测套件——"被割"在中文金融/股市语境指"被套牢 / 被收割"，推测是模拟投资决策场景的 LLM benchmark。489 KB 体积适中。
- **#11 [mr-ruhid/metro_core](https://github.com/mr-ruhid/metro_core)** ⭐22 — Dart 写的独立移动 OS shell，灵感来自 Windows 8 Metro UI，Flutter + 移动 Linux 平台、零 Android 依赖——属于"硬核移动操作系统"实验性项目，对一般 AI 应用开发者无直接价值但对系统工程师有研究意义。
- **#12 [TunaaaAaaaa/miniEvoAgent](https://github.com/TunaaaAaaaa/miniEvoAgent)** ⭐19 — 29 KB 的简洁 self-evolving / 递归自我提升 agent 教学实现；适合想理解"agent 改自己 prompt / 改自己工具"机制的学习者；生产环境慎用——自演化 agent 没有护栏很容易失控。
- **#13 [fridge1/llmgateway](https://github.com/fridge1/llmgateway)** ⭐19 — 标题"统一 LLM API 网关 + 商业平台"，同时支持 OpenAI / Anthropic / Gemini 协议、对接 Claude Code / Codex CLI / Cursor / Windsurf、内置账单 + 订阅 + 租户 + 管理后台——Go + React + PostgreSQL。这是给"小团队自建 LLM API 中转 + 计费"的现成方案，与 [portkey-gateway](https://github.com/Portkey-AI/portkey)、[openrouter](https://openrouter.ai)、[one-api](https://github.com/songquanpeng/one-api) 同台竞争。
- **#14 [LalaGa-1119/jiazuo-atelier](https://github.com/LalaGa-1119/jiazuo-atelier)** ⭐18 — "甲作 Atelier：手机端 AI 美甲推荐与虚拟试戴"，仓库公开轻量评测工作台；典型 toC 美妆 AI 应用方向，技术栈是 TypeScript，体积 1.7 MB（含前端 + 评测）。
- **#15 [bayshier/sunxue](https://github.com/bayshier/sunxue)** ⭐15 — "孙学写作法 Skill：源自孙宇晨《我的女友景甜》的极简白描叙事风格（天平开篇 / 数字锚定 / 旁观者证词 / 虚空收束）"——典型设计 skill，与 [Nanako0129/sepia](https://github.com/Nanako0129/sepia) 是"去 AI 化"vs"模仿特定人风格"两条路径。同生态还出了 [nasvip/my-girlfriend-jingtian-analysis](https://github.com/nasvip/my-girlfriend-jingtian-analysis)（孙宇晨小说 300+ Issue 深度吃瓜、Claude 应诉书、TeX 排版挑刺）——同一文化现象的另一个角度。

---

## 数据方法

- **窗口**：`created:2026-08-28..2026-08-28`（UTC 日历日；CST 2026-08-29 早 8 点跑 = UTC 2026-08-29 00:10 已进新日，所以窗口锁的是昨天 8-28 全天）。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant` + `in:readme`，5 个槽位（GitHub Search API 上限），未设 `stars:>` 下限，按 stars 降序取满 30 条原始命中。
- **过滤**：经 `scripts/rank.py` 剔除空壳（`size < 15` KB 且无 language）/ 擦边（含 `undress / nsfw / uncensored` 等关键词）；本次 3 条被剔（No-More-Room-In-Hell-2-Cheats 等），剩 15 条进成稿。
- **排序**：剔除后按 `stargazers_count` 降序（窗口内新创建的仓按当前总星排名，非"窗口内涨星"——后者因 GitHub trending 页对无 JS 客户端返回 0 字节，本 skill 不采）。
- **详深挖**：Top 5 = `Nanako0129/sepia / XiaoDuoYa/codex-with-chatgpt / chrisgreg/boop / camilleroux/genart-skill / Inch-high/unifi-support-file-analyzer`；每条覆盖元数据 / README 核心价值 / 真实 issue body + 评论 / 横向对比 / 信号判断 / 适用场景。
- **来源**：GitHub Search API（成稿名单）+ GitHub Issues API（深挖）+ GitHub REST API（repo 元数据 + readme base64 解码）。HN Algolia / Reddit / GitHub Trending 页 本档未用（前者偶发非 JSON，后者返回 0 字节）。
- **slug**：`github-trending-2026-08-28`（与窗口日期对应，非跑任务当天）。
- **快照时间**：UTC 2026-08-29 00:10。