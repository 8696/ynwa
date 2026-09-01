# GitHub 日榜 · 2026-08-30 · yname 字符级 RNN 抢注 YC 名字 + PixelML 4×170HX 攒 256 GB HBM 池

## 核心信号

- **当日星标分布极度扁平**：Top 1 仅 ⭐44、Top 15 全部 ⭐8 以下，对照昨日 ⭐33 登顶的 [Timefiles404/lean-mode-skill](https://github.com/Timefiles404/lean-mode-skill)，今日是 2026-08-23 周以来"新仓热度最稀薄"的一天——榜单由"小而锐利"的工具而非"现象级爆款"撑起，说明昨日几大主题（`AI 维护者 / Code Bot / Hack 工具`）被算法短暂压制后，回归了"个人开发者小工具"基本面。
- **"为某个人/某家厂商写的小型工具"集中冒头**：[aadithyanr/yname](https://github.com/aadithyanr/yname) 用 1,720 KB 字符级 RNN 给 YC 抢注公司名；[rileycx/strafe](https://github.com/rileycx/strafe) 给 macOS 写 1,100 行 Space 切换加速；[EthanXing-xyy/TheOtherManDetector](https://github.com/EthanXing-xyy/TheOtherManDetector) 给 PSoC 6 写移门异常检测；[sharn25/Curved-Gauge-Card](https://github.com/sharn25/Curved-Gauge-Card) 给 Home Assistant 写可视化仪表盘。共同模式是"极小代码量、极具体痛点、零云依赖"——与昨日"自托管收件箱 / 本地视觉"的偏好完全一致。
- **量化和权重视觉化首次进入 Top 10**：[alesha-pro/atlas](https://github.com/alesha-pro/atlas)（12 星，TypeScript + `dataviz / interpretability / llm / quantization` topics）把 [Qwen3.8-27B](https://github.com/QwenLM/Qwen3) 的 1,199 个权重张量铺到一个画布上，每个张量挂"实测 SQNR / INT4 通道比 / 奇异值谱 / 百分位"。是 2026-08-23 "GPTQ-Auto / mlx-explore" 之后的"严肃量化可观测"路线的首个可视化产物——配合 [PixelML/club-170hx](https://github.com/PixelML/club-170hx) 在 CMP 170HX 上实测的 NVFP4 / Q8 数据，等于"权重侧可视化 + 推理侧硬件实测"两端联动。
- **DSH 生态插件化正式落地**：[oh-my-dsh/dsh-plugin-upgrade-skill](https://github.com/oh-my-dsh/dsh-plugin-upgrade-skill)（9 星，JavaScript）把 [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) 的版本迁移做成 Claude Code / Codex / Gemini / Cursor 四家 plugin 一致的 agent skill，参考卡片已经写到 `v0.1.2-alpha.2`。本周榜单里的 DSH 周边已不只有"桌面 + 插件市场"，首次出现"版本迁移工具"——这是 2026-08-23 那一周 DSH Harness 单生态吃掉大半热度后，第二阶段的"插件生态基建"信号。
- **MCP 再次向垂直行业渗透**：[drephantom/wq-brain-mcp-server](https://github.com/drephantom/wq-brain-mcp-server)（9 星，Python）给 WorldQuant BRAIN 量化平台写 MCP Server，**故意不在 MCP 层暴露 submit**——Agent 只能跑研究，提交走独立 CLI + 多重闸门。这是继昨日 [knx-ai/knx-ets-mcp](https://github.com/knx-ai/knx-ets-mcp) 之后第二个"垂直行业 MCP"，但更值得关注的是它的"安全边界设计"：把高风险操作刻意移到 MCP 协议之外。
- **首期无上期对照**：`scripts/rank.py` 的 `compare` 显示本档 15 条全部 `new`、`staying` 为空、`dropped` 包含昨日全部 15 条——这与 GitHub 每日新创建仓按当前总星排序的口径一致（同一仓库无法同日同时进日榜两次）。

---

## 重点深挖

### 1. [aadithyanr/yname](https://github.com/aadithyanr/yname) ⭐44

- **一句话**：用 1,720 KB 的字符级 RNN 在浏览器里生成 YC 风格公司名——`6,194` 个 YC 公司名训练、零 LLM、零后端、跑完即下架名字。
- **元数据**：Python（前端 Vite + React）、1,720 KB、topics `machine-learning / name-generator / react / vite / y-combinator`、MIT；模型是 6,194 行 YC 公司名字符级 LSTM，权重塞前端 `web/` 目录。
- **README 提炼**（5 条核心价值）：
  1. **核心约束：No LLM, No backend**：模型跑在浏览器里、训练数据走 Context.dev 公开爬的 YC 公司名列表。等于"名字生成"的工具不依赖任何一家大厂 API——既无 key，也无网。
  2. **数据集规模公开**：`data/yc_name_training_corpus.csv` 6,194 条；意味着能完全本地复现、能在训练集上做 ablate（小数据集的过拟合风险作者明确放在 README 里）。
  3. **可重训 + 可导出**：`python model/train.py --data data/yc_name_training_corpus.csv --output-dir model/artifacts` + `cd web && npm run export-models`——把模型训练产物直接喂回 web 静态资源。README 把"本地重训"和"前端导出"分开两步，避免 WebAssembly/TFJS 的环境陷阱。
  4. **品牌安全声明**：`This is an unofficial project and is not affiliated with or endorsed by Y Combinator.`——明确标注"我们爬了 YC 名单做训练，但跟 YC 没合作"。这种边界在 AI 项目里被反复踩坑（v0.dev / Cursor / NotebookLM 都有过类似纠纷），README 直接在 7 行处放出来反而加分。
  5. **用途是"抢先"而非"建议"**：副标题写 `Generate a YC startup name before someone else does`——使用场景是"`域名还在` → 起个名字 → 立刻注册"，跟"帮你想一个好名字"的 prompt 工具有本质差异：越怪越好，能注册就行。
- **Issue / 实战反馈**：仓库 1 个 PR（[#1](https://github.com/aadithyanr/yname/pull/1) feat(web): add industry-specific RDAP domain availability checks by [AjayK47](https://github.com/AjayK47)），于 2026-08-30 16:43 UTC 提交、同日 16:52 UTC 被作者 [aadithyanr](https://github.com/aadithyanr) merge。标题明确"按用户所在行业的 RDAP 域名可用性检查"，评论 1 条。是"作者 - 贡献者"典型小 PR 闭环，没有 issue body 留痕。
- **横向对比**：与 [OpenAI Naming Things](https://help.openai.com/)、[Namelix](https://namelix.com/)、[ai-name-generator](https://github.com/search?q=name+generator&type=repositories) 等"基于 LLM / RNN 的命名工具"走同一条路线。差异点：① 字符级 LSTM 不是 token 级 LLM，token 用得少（一个名字不到 10 个字符），后端可零；② RDAP 域名可用性检查 = 直接拿到名字后能查到 `.com / .dev / .ai` 是否被注册。比"生成名字"的工具更进一步。同类对比还有 [ai-name-art](https://github.com/topics/name-generator) 主题下大量 fork 出的 React + Express 套壳，本仓是少数把"训练 + 推理 + 检查"做成单仓可跑闭环的。
- **信号判断**：✅ 安全（完全本地、无网络、无 LLM 凭证）；✅ 兼容（Vite + React 标准栈，CI 可跑）；⚠️ 实战待验证（仅 1 个 PR 涉及 RDAP，行业覆盖还少）；✅ 长期可信度（README 把"unaffiliated"和数据集规模写清楚——边界 + 复现度都到位）。

**适用场景**：**适合**：抢注 YC 风格 .com / .ai / .dev 域名的早期创始人；想要"零 API 成本"的字符级生成 demo 教学者；做"反 LLM 依赖"训练流程的工程师（README 本身就是教科书级小样本教学）。**不适合**：需要"语义合理 + 业务可解释"的名字（字符级 LSTM 没有词义，会生成看似合理但读不通的组合）；需要 A/B 测试多套品牌名的市场团队（要可解释的命名学，本仓不能给）。

### 2. [rileycx/strafe](https://github.com/rileycx/strafe) ⭐30

- **一句话**：macOS 1,100 行 Swift 写的 Space 切换加速器——把三指滑动的"动画期 168.5ms → 49.6ms"硬压缩，让用户在动画结束前就能点击落地窗口。
- **元数据**：Swift、1,642 KB、topics `macos / productivity / spaces / swift / trackpad`、MIT；零运行时依赖、~1k 行 Swift、菜单栏 accessory（无 Dock 图标）。
- **README 提炼**（5 条核心价值）：
  1. **真实痛点的真实数字**：作者实测 168.5ms 的 native "time to interactivity"，"150ms × 50 次/小时 × 8 小时 = 60 秒/天"——把"手感差距"翻译成"每天损失一分钟"，这种自我量化是把开发者工具变成"为我而做"的关键。
  2. **不替代系统动画，只解掉 dead time**：strafe 拦截三指滑动手势并直接跳到目标 Space，跳过动画期让点击"立刻生效"——不是"消除动画"那种 UX 入侵。读源码能验证"event tap mask 仅覆盖手势事件"，没有网络 / 子进程 / 写文件代码。
  3. **严谨的 benchmark 自证**：Apple M3 Pro 18 GB / macOS 26.3 / 20 trials / zero timeouts；表格里 `native 149-185 ms` vs `strafe 30-79 ms`，作者诚实地标"native 是人感觉的下限 / native 还会被更轻的滑动拉长"。这种"我先承认自己有偏"的写法是 benchmark 该有的样子。
  4. **Agent 协作链路完整**：README 给出"Copy this into Claude Code (or any coding agent) and it will handle everything except the one click macOS reserves for you"——含审计 + 构建 + 安装 + 权限授予 + 重启 + 验证 6 步，并明确"审计不是装饰，因为 strafe 要 Accessibility 权限"。等于"任何用户都能复制粘贴给 agent 装好"。
  5. **零依赖 + 源码审计可读**：`grep -R "import" . | wc -l` = 仅系统 framework；README 中"source-only, zero dependencies, ~1k lines" 这一句的硬约束 = "任何 reviewer 都能通读"。
- **Issue / 实战反馈**：仓库 0 issue / 0 PR——单日发布即获 30 星，但还没有实战反馈进入 issue 渠道。
- **横向对比**：与 [Hammerspoon](https://www.hammerspoon.org/) / [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) 这类 macOS 系统扩展工具共享"键盘/触控板快捷键定制"的能力域。差异点：① strafe 只做 Space 切换这一件事，~1k 行 Swift；Hammerspoon 是 Lua 配置的 swiss army knife；② strafe 写的是"加速 macOS 原生动画的特定路径"，而不是"模拟键盘事件 / 重映射按键"——边界更窄、效果更精确。技术栈上比 [Amethyst](https://github.com/ianyh/Amethyst)（窗口平铺管理器）也更轻量：Amethyst 处理"窗口放哪儿"，strafe 处理"窗口切到时多快能点"。
- **信号判断**：✅ 安全（仅手势事件 tap / 零网络 / 源码可审计）；✅ 实战（benchmark 自证 30-79 ms vs 149-185 ms）；✅ 兼容（macOS 26.3 起支持，不破坏系统手势）；⚠️ 实战待验证（同日 0 issue，需要看 macOS 小版本升级时手势识别是否会被破坏）；✅ 研究诚信（bench harness 全公开 + "native 是下限"诚实声明）。

**适用场景**：**适合**：重度使用多 Space 全屏切换的 macOS 用户（设计师 / 全栈 / 多项目并行开发）；想用 agent 装一遍就完事、不想折腾 Hammerspoon 配置的人；"愿意给 Accessibility 权限给开源工具 + 自审源码"的安全偏好的开发者。**不适合**：只在两个 Space 间切换的轻度用户（动画延迟感知不明显）；不愿授予 macOS Accessibility 权限给非 App Store 来源的用户；Windows / Linux 用户（仓库只支持 macOS）。

### 3. [ih8d8/yt-dlp-manager](https://github.com/ih8d8/yt-dlp-manager) ⭐29

- **一句话**：单 Go 二进制的自托管 yt-dlp 下载管理器——同一个共享队列上挂 Web UI / TUI / CLI / Unix-socket daemon 四个前端。
- **元数据**：Go、1,540 KB、topics 空、MIT；Docker 镜像 `ghcr.io/ih8d8/yt-dlp-manager`、含 `Dockerfile` + `Makefile` + `compose.yaml` + `compose.prod.yaml`。
- **README 提炼**（5 条核心价值）：
  1. **多前端共用一队列**：`Web UI / TUI / CLI / Daemon` 共享一个 `manager` 和状态文件，但任何时刻**只有一个进程拥有它**——避免多端并发改队列导致状态错乱。等于"多端 UI 抢一个工作流"，不是"每个端各跑各的"。
  2. **容器安全细节做到位**：`PUID:PGID` 非 root、`cap_drop: ALL`（仅放回 `CHOWN/FOWNER/SETUID/SETGID`）、`/tmp` 挂 `noexec,nosuid,nodev`、`no-new-privileges`、read-only root fs——这种 hardening 对外暴露的 Web UI 才有意义。文档逐项写明，README 是"看得见的 security.md"。
  3. **没有默认密码 + setup token 一次一签**：管理员密码首次登录时设置，容器场景下必须从日志抓 `setup token` 粘进去——"setup token 每次启动换新、设密码后立刻失效"，是给"被人在你装好之前抢注管理员"这个攻击面做的硬堵。
  4. **yt-dlp 集成抗 YouTube 反爬**：镜像里**预先打包 yt-dlp（pin 死版本 + checksum 校验）、ffmpeg、QuickJS**——YouTube 改 player.js 时可以一键换 JS 运行时 `quickjs/deno/node`。这种"二进制 / 解释器都打包"的范式跟 [youtube-dl-docker](https://github.com/search?q=youtube-dl+docker) 时代的"挂载二进制"思路完全不同。
  5. **CLI 命令与 TUI 键位同样齐全**：`yt-dlp-manager add [URL|-] / list / pause / resume / remove / clear-finished / start-now / daemon` —— 能脚本化（CI / cron 喂 URL），也能交互（TUI 实时改优先级），两套 UI 共用同一状态文件是设计而非偶发。
- **Issue / 实战反馈**：仓库 1 个 PR（[#1](https://github.com/ih8d8/yt-dlp-manager/pull/1) Bump golang.org/x/sys from 0.44.0 to 0.47.0 by [dependabot[bot]](https://github.com/apps/dependabot)），2026-08-30 5:36 UTC 提交、同日 5:51 UTC 被作者 [ih8d8](https://github.com/ih8d8) merge。依赖更新通过 dependabot 自动跑通——这是"作者 CI / 依赖治理到位"的标志。
- **横向对比**：与 [Streama](https://github.com/streamaserver/streama)、[Jellyfin](https://github.com/jellyfin/jellyfin) 的"媒体服务"差异明显——这些是"已经下载完的媒体怎么展示"，yt-dlp-manager 是"还没下载的 URL 怎么排队下"。同类对比更接近 [ytdl-web](https://github.com/topics/yt-dlp-web) 主题下的几个 Node + Python 项目：差异点是 ① 单 Go 二进制 + Docker = 部署成本最低；② `PUID:PGID` 非 root + 权限收窄 = 自托管安全姿态最严；③ 不暴露默认密码 = 防"装好即被扫"的姿态。
- **信号判断**：✅ 安全（容器 hardening / 一次性 setup token / 显式 admin 路径）；✅ 实战（dependabot + CI + Docker 镜像 + 多前端）；✅ 兼容（任意前端可选，浏览器 / TUI / 脚本混用）；✅ 研究诚信（README 把"挂反代时需要哪些设置"逐条写清）；⚠️ 实战待验证（29 星仍偏小，需看 YouTube 改 player 时打包的 quickjs 还能顶多久）。

**适用场景**：**适合**：自托管下载站、NAS 用户、把 YouTube 当个人媒体源的内容创作者；想用 cron + CLI 自动化批量下载的运维；把"下载工具"和"媒体库展示"分开的用户（yt-dlp-manager 不替代 Jellyfin / Plex）。**不适合**：只想下单个视频的轻度用户（直接 `yt-dlp URL` 就行）；需要"内嵌 Web 播放器"的场景（这是下载管理器不是媒体服务）；不愿自托管、只想用 SaaS 下载服务的用户。

### 4. [sharn25/Curved-Gauge-Card](https://github.com/sharn25/Curved-Gauge-Card) ⭐13

- **一句话**：Home Assistant 的可视化仪表盘卡片——半圆弧形 gauge + SVG `<textPath>` 排版曲线标签 + 5 个内置预设 + 图形化配置编辑器。
- **元数据**：JavaScript、335 KB、topics 空、MIT；HACS 自定义仓、HACS badge + License badge + HA 2024.1+ 兼容 badge 全挂上；支持 `temperature / humidity / bmi / battery / air_quality` 5 个内置 preset。
- **README 提炼**（5 条核心价值）：
  1. **SVG `<textPath>` 让数字真的"沿弧线走"**：boundary 数字 + 类别标签都沿弧线曲率排版，不是"放上去假装弧线"。这是 web 前端的老技巧但在家居圈少见——`authentic curved typography` 这一句在 README 里有截图直接证明。
  2. **5 个内置 preset + 1-click 应用**：`temperature / humidity / bmi / battery / air_quality`——意味着不用读文档也能上手，YAML 一行 `preset: temperature` 就出来一个可用的仪表盘。
  3. **图形化 GUI Card Editor**：HA Dashboard 直接出"标题 / 副标题 / 图标 / 预设"编辑面板，**不用手写 YAML**——对非技术用户的友好度跳跃式提升。
  4. **零硬编码语义**：preset 之外可自定义 `segments: [{from, to, label, color}]` 做任意区间配色（如示例里的 Solar / Power 用 `Low / Optimal / Peak` 三段），单位可配置 `min/max/unit`。等于"既给懒人、也给硬核"。
  5. **分段弧形 + 颜色 + marker 动画**：颜色分段 + 间隙 + marker 平滑移动；视觉上能看出"目标区域"，跟"普通线性 gauge"是两种语言。
- **Issue / 实战反馈**：仓库 0 issue / 0 PR——单日发布即 13 星，README 已经写完安装 / 配置 / preset / YAML 五个示例，没有任何 issue 通道的反馈。
- **横向对比**：与 Home Assistant 社区的 [custom:mini-graph-card](https://github.com/kalkih/mini-graph-card)、[custom:bubble-card](https://github.com/Clooos/Bubble-Card)、[custom:mushroom-cards](https://github.com/piitaya/lovelace-mushroom) 走"扩展 HA 仪表盘 UI"同一赛道。差异点：① 专攻"半圆 gauge"这一形态而不是通用卡片；② 弧形 `<textPath>` 是细节差异；③ 5 preset + GUI Editor 是面向非技术用户的差异化。同类里 [custom:gauge-card](https://github.com/custom-cards/gauge-card) 是最接近的，但它是圆形 gauge，sharn25 是半圆 + 弧线字体。
- **信号判断**：✅ 兼容（HA 2024.1+ + HACS + 资源添加三种安装路径）；✅ 实战（preset + GUI Editor 让普通 HA 用户也能用）；⚠️ 实战待验证（0 issue，需要看 HACS 安装实际是否能跑）；✅ 研究诚信（README 把"半圆 vs 全圆"的取舍、YAML 与 GUI 两种路径都写明）。

**适用场景**：**适合**：Home Assistant 用户想要一个比官方 gauge 更"有设计感"的仪表盘；做智能家居可视化的非技术用户（依赖 GUI Editor）；多传感器可视化（温度 / 湿度 / 电量 / 空气质量）的家庭装爱好者。**不适合**：只用 HA 看开关状态、不需要数值可视化的极简用户；想要"曲线图 / 趋势图"的场景（这是 gauge 不是 line chart）；不想安装 HACS 自定义仓、只用官方组件的用户。

### 5. [PixelML/club-170hx](https://github.com/PixelML/club-170hx) ⭐13

- **一句话**：把 NVIDIA CMP 170HX（矿卡时代的 SM80 计算卡）攒成"4 卡 256 GB HBM"的低成本 SM80 计算池，给 LLM 推理 / 图像生成 / CUDA 验证等场景做实测基线。
- **元数据**：Cuda、349 KB、topics 空、MIT；含 `docs/`（Hardware / Installation / QC / Cooling-and-Power / Cluster / Troubleshooting / Benchmarks / Workloads）+ `scripts/`（只读 inventory / model-fit / card-validation 工具）+ `workloads/` + `results/`。
- **README 提炼**（5 条核心价值）：
  1. **不是 A100 替代品**：README 开门见山写"It is **not an A100 replacement**: it has an unsupported software path, no display output, no NVLink, limited PCIe behavior in common passthrough setups, and unusual cooling and power requirements."——把"矿卡的局限"前置出来，避免用户抱错期待。
  2. **4 卡 256 GB HBM 的物理事实**：作者实测 "4 × CMP 170HX installed, each reporting 64 GiB VRAM"——总 256 GB HBM2e，"一箱 256 GB SM80 内存"是这套平台最硬的卖点。配合 RTX 3090 / DGX Spark 做"消费级 CUDA / 低成本 SM80+HBM / GB10"三档对比。
  3. **基线固定到版本号**：Ubuntu 22.04 / Proxmox Q35 VM + SeaBIOS / Linux 6.8 / NVIDIA 610.43.03 open kernel modules / 钉死 `cmpunlocker v0.1` / 125 W 静默策略 / 180 W benchmark 策略——所有"能跑"的东西都被 pin 住，等于一份可重放的 recipe。
  4. **实测工作负载公开**：Qwen3.8-27B NVFP4 单卡 136.38 tok/s @ 180 W（3 卡均值）/ DeepSeek-V4-Flash-0731 三卡流水线并行 83.3 tok/s 聚合 decode @ 180 W·卡 / GLM-5.3-Flash NVFP4 三卡不兼容（SM121 格式权重）。"实测应用结果，不是理论峰值"在 README 显眼位置标出来。
  5. **负结果同样记录**：GLM-5.3-Flash NVFP4 三卡 "Not compatible: SM121-format weights and runtime path"——把"哪些跑不通"也写进 [BENCHMARKS.md#negative-results-matter](docs/BENCHMARKS.md#negative-results-matter)，这在 AI 仓库里很少见。
- **Issue / 实战反馈**：仓库当前 9 个 issue / PR，活跃的是 [#6 PCIe bottleneck benchmark](https://github.com/PixelML/club-170hx/issues/6)（[Riconec](https://github.com/Riconec) 开）："Hi! Wondered about how much pcie 2 x16 limits tensor split, like Qwen3.8-27B@Q8 running on 1, 2 or 4 cards split evenly. So basically run model that can fit on single model and see how performance scales"——3 条评论。[seanphan](https://github.com/seanphan) 答："actually I can't run Gen 2 x16 due to I have this card install in promox and gen 2 has bug not show up. currently I'm running at Gen 1 16x and get around 138-147k tok/s" + [Qwen3.8-27B-CMP-170HX](https://github.com/PixelML/Qwen3.8-27B-CMP-170HX) 链接 + "will schedule these test on 1-2-4 cards and reply here"。第二条评论 seanphan："NVLINK now not work for 170hx / rumor said there potentially more HBMe2 unlockable"——把"170HX NVLINK 已挂"的实测写下来。第三条评论是 Codex chief-of-staff 代 seanphan 发的："This benchmark is now queued and tracked in seanphan/pixelml#58... controlled matrix: prompts, seeds, context, concurrency, sampling, batch... separate prompt-processing from generation throughput... record cold/warm TTFT and latency... per-card VRAM, power, temperature, PCIe link state, errors, representative output quality... at least three measured repetitions where practical. The complete recipe, sanitized raw results, CSV, methodology, and charts will be submitted to PixelML/Qwen3.8-27B-CMP-170HX"——已经把"控制矩阵 + 提交目标"列得很细。这是 2026-08-23 周以来"硬件实测类仓库"最规范的 issue 反馈链之一。
- **横向对比**：与 [huggingface/text-generation-inference](https://github.com/huggingface/text-generation-inference)、[vllm-project/vllm](https://github.com/vllm-project/vllm) 跑同一组 LLM 推理 workload 的差异：① 后两者是推理引擎软件，club-170hx 是"硬件 + 软件的固定 recipe"，对硬件细节负责；② 与 [NVIDIA/cmpunlocker](https://github.com/NVIDIA/cmpunlocker) 同名议题——其实本仓用 `cmpunlocker v0.1` 解锁 PCIe，是"矿卡解锁生态"的一份实测 recipe。同类还有 [bizonhardware/bizon-ai-bench](https://github.com/topics/bizon-ai-bench)、[lambdal/deep-learning-benchmarks](https://github.com/lambdal/deep-learning-benchmarks) 这类"硬件 benchmark 集"，club-170hx 在"具体到 1 款矿卡 + 1 组 pinned 版本"上更落地。
- **信号判断**：✅ 安全（read-only / 文档型仓库，不下发破坏性操作）；✅ 实战（seanphan 实测在 Proxmox + Gen 1 16x 跑到 138-147k tok/s，issue 评论落地）；✅ 兼容（Ubuntu 22.04 + Proxmox Q35 + SeaBIOS + 钉死的驱动版本）；✅ 研究诚信（"Not A100 replacement" + "GLM-5.3 不兼容也记录" + 实测数字给来源 + pinned 版本）；✅ 增长（Codex chief-of-staff 已经在排 controlled matrix，社区实测闭环可见）。

**适用场景**：**适合**：手上有 CMP 170HX 想组低成本 SM80 池的极客 / 小型 AI 实验室；用 Qwen3.8-27B / DeepSeek-V4-Flash 做消费级硬件实测的研究者；想"矿卡解锁 + LLM 推理"端到端跑通的 CUDA 重度用户。**不适合**：想要 A100 / H100 替代品的用户（README 明确写"不是 A100 替代品"）；只想跑标准 benchmark、不想管硬件差异的团队；不愿跑 Proxmox + Linux 6.8 的 Windows / macOS 用户。

---

## 完整前 15 表

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---|---|---:|---:|---|---|---|---|---|
| 1 | [aadithyanr/yname](https://github.com/aadithyanr/yname) | 44 | - | 其他 | 新上 | Python | 字符级 RNN + 6,194 YC 公司名训练，浏览器本地生成 YC 风格公司名 + RDAP 域名检查 | ✅ 安全 |
| 2 | [rileycx/strafe](https://github.com/rileycx/strafe) | 30 | - | 其他 | 新上 | Swift | macOS Space 切换加速器，~1k 行 Swift / 零依赖，把 168.5ms 动画期压到 49.6ms | ✅ 实战 |
| 3 | [ih8d8/yt-dlp-manager](https://github.com/ih8d8/yt-dlp-manager) | 29 | - | 其他 | 新上 | Go | 自托管 yt-dlp 下载管理器，单 Go 二进制 + Web UI/TUI/CLI/daemon 四前端共享队列 | ✅ 安全 |
| 4 | [reactor-team/infinite-livestream](https://github.com/reactor-team/infinite-livestream) | 19 | - | 其他 | 新上 | Python | 聊天驱动永不结束的 AI 视频直播，Twitch/YouTube chat → LLM → FastH3 768p + RTMP | — |
| 5 | [sharn25/Curved-Gauge-Card](https://github.com/sharn25/Curved-Gauge-Card) | 13 | - | 其他 | 新上 | JavaScript | Home Assistant 半圆仪表盘卡片，SVG `<textPath>` 弧形字体 + 5 preset + GUI 编辑器 | ✅ 兼容 |
| 6 | [PixelML/club-170hx](https://github.com/PixelML/club-170hx) | 13 | - | 其他 | 新上 | Cuda | 4×CMP 170HX 攒 256 GB HBM 计算池，Qwen3.8-27B NVFP4 实测基线 + 负结果公开 | ✅ 研究诚信 |
| 7 | [alesha-pro/atlas](https://github.com/alesha-pro/atlas) | 12 | - | 模型 | 新上 | TypeScript | Qwen3.8-27B 权重视觉化画布，1,199 张量 + 实测 INT8/INT4 SQNR + 通道比 + 奇异值谱 | ✅ 实战 |
| 8 | [joeynyc/awesome-microduck](https://github.com/joeynyc/awesome-microduck) | 11 | - | agent | 新上 | — | Pollen Robotics × Hugging Face Microduck 双足机器人 awesome-list，sim2real 政策 + MCP + ONNX | — |
| 9 | [sameh514/ai-life-skills-toolkit](https://github.com/sameh514/ai-life-skills-toolkit) | 11 | - | 设计skill | 新上 | Python | 8 个 Codex Skill：学习 / PowerPoint / 笔记 / 播客 / 客服 / 教学 / 浏览器 / 隐私，Windows + macOS | — |
| 10 | [SSYH1896/BIT-AI-Layered-Exam-Course-Materials](https://github.com/SSYH1896/BIT-AI-Layered-Exam-Course-Materials) | 10 | - | 其他 | 新上 | — | 北理工 2026 级研究生 AI 分层考试复习资料，8 道样卷 + 4 题型结构 + PyTorch 编程要点 | — |
| 11 | [EthanXing-xyy/TheOtherManDetector](https://github.com/EthanXing-xyy/TheOtherManDetector) | 10 | - | 其他 | 新上 | C | "隔壁老王检测器"——PSoC 6 移门 Audio-IMU 多模态 Edge AI 异常检测 | — |
| 12 | [oh-my-dsh/dsh-plugin-upgrade-skill](https://github.com/oh-my-dsh/dsh-plugin-upgrade-skill) | 9 | - | 设计skill | 新上 | JavaScript | DSH 插件升级 agent skill，Claude Code / Codex / Gemini / Cursor 四家 plugin 一致 | ✅ 兼容 |
| 13 | [drephantom/wq-brain-mcp-server](https://github.com/drephantom/wq-brain-mcp-server) | 9 | - | mcp | 新上 | Python | WorldQuant BRAIN 量化平台 MCP Server，**故意不在 MCP 层暴露 submit**，提交走独立 CLI 多重闸门 | ✅ 安全 |
| 14 | [RexaDB/RexaDB](https://github.com/RexaDB/RexaDB) | 9 | - | 其他 | 新上 | TypeScript | 多数据库桌面客户端，PostgreSQL / MySQL / MongoDB / SQLite / ClickHouse / Redis / SQL Server + AI 查询生成 | — |
| 15 | [alphaparkinc/genpark-os-gui-desktop-automation-vision-agent-skill](https://github.com/alphaparkinc/genpark-os-gui-desktop-automation-vision-agent-skill) | 8 | - | agent | 新上 | Python | OS GUI 桌面自动化视觉 agent skill（Computer Use 形态），MCP 兼容 | — |

---

## 其余 6-15 简评

- **#4 [reactor-team/infinite-livestream](https://github.com/reactor-team/infinite-livestream)** ⭐19 — Python / 608 KB / 无 description。读者在 Twitch/YouTube 直播间发 `!prompt <idea>`，LLM 把它扩展成一组分镜脚本，`fast-h3`（基于 [FastVideo](https://github.com/hao-ai-lab/FastVideo) 把 MiniMax-H3 35B 蒸馏到 4 步 transformer forward）逐镜渲染 768p 视频 + 同步音频，输出通过 RTMP 拼成永不结束的直播。是 2026-08-23 周 `FastH3 Preview v1` 发布后的第一个"端到端部署 + chat 驱动"产物，`reactor-sdk` + `fast-h3` 两个仓分别承担"模型 / 客户端"。代码许可 Apache-2.0，模型许可独立（MiniMax H3 Community License）。
- **#6 [PixelML/club-170hx](https://github.com/PixelML/club-170hx)** ⭐13 — Cuda / 349 KB。完整深挖见上文重点 #5。要点：① 4 张 170HX 共 256 GB HBM2e 是这套平台最硬的卖点；② 实测 Qwen3.8-27B NVFP4 单卡 136.38 tok/s @ 180 W / DeepSeek-V4-Flash-0731 三卡 83.3 tok/s 聚合；③ seanphan 在 issue #6 把 "Gen 2 x16 in Proxmox 不能跑 / 当前 Gen 1 16x 跑到 138-147k tok/s / NVLINK now not work for 170hx" 三条实战反馈全写出来了——是本档唯一有真实硬件 issue 反馈链的仓库。
- **#7 [alesha-pro/atlas](https://github.com/alesha-pro/atlas)** ⭐12 — TypeScript / ~10 MB / topics `dataviz / interpretability / llm / quantization / visualization`。第一个模型是 Qwen3.8-27B，1,199 个张量铺到一个 pan/zoom 画布——每个张量挂 29 log₂|w| 直方图 + INT8/INT4 SQNR + 通道比 + 奇异值谱 + 1-D 张量字段标注"not applicable"。8 个 canvas 区域：`start / architecture / wall / links / depth / herbarium / living model`——含"模型看自己的截图"这种最末梢的实验性视图。Bilingual EN/RU 切换，本地 `npm run dev` 跑得通，加新模型只要把 `atlas.jsonl` 丢进 `public/models/<slug>/`。
- **#8 [joeynyc/awesome-microduck](https://github.com/joeynyc/awesome-microduck)** ⭐11 — 无 language / topics `awesome / awesome-list / hugging-face / microduck / mujoco / pollen-robotics / reinforcement-learning / robotics`。Pollen Robotics × Hugging Face 联合推出的 Microduck（25 cm / ~800 g / 15 motor + 摄像头 + 8×8 ToF + 2× IMU + 抓嘴）双足机器人 awesome-list。预购 2026-08-27 开放、首批发货目标 2026 年圣诞前，几乎无人手上有真机。所以三类工具分层很清楚：① sim-only（沙盒、`microduck_rl`、`onnxruntime-web` 50 Hz 仿真）现在能跑；② MCP server / gateway / CLI 都基于 mock transport，硬件层尚未验证；③ Pollen 的 M8 里程碑（Model channel）未发，所以政策分发还是 daemon 内置，社区目录只读。
- **#9 [sameh514/ai-life-skills-toolkit](https://github.com/sameh514/ai-life-skills-toolkit)** ⭐11 — Python / ~10 MB / topics `accessibility / ai / automation / codex / learning / macos / privacy / productivity / windows`。Sameh 因为 ADHD 把"AI 让生活更可启动"的 8 个工作流做成 Codex Skill：`build-course-fill-in-workbook / build-effective-powerpoint-decks / correct-handwritten-study-notes / create-course-study-podcast / customer-service / run-adaptive-teaching-session / use-preferred-browser / use-private-profile-safely`。Windows + macOS 同源、CI 跑通、install 走 `python scripts/install_skills.py`。README 醒目标注"Never put real personal information in this repository"——这是 ADHD 友好工具与"AI 监视工具"的分水岭声明。
- **#10 [SSYH1896/BIT-AI-Layered-Exam-Course-Materials](https://github.com/SSYH1896/BIT-AI-Layered-Exam-Course-Materials)** ⭐10 — 无 language / 142 字节（README 极小）/ description 直接写"北理工入学 AI 分层考试"。考试时间 2026-09-10 09:00-11:00（120 分钟在线），题型 4 类（基础简答 / 前沿简答 / PyTorch 改错 / PyTorch 补全 CNN）+ 5 套模拟卷 + 课程大纲（张华平/李秋池/李磊/张宝华 4 位授课老师 10 课时）+ 复习建议（CNN 尺寸推导占 25 min）。8 道样卷直接对照正式考试——是中国高校 AI 公共基础课 "课程仓库" 形态的代表，跟 2026-08-23 周的"课程 / 教学 skill"路径一致。
- **#11 [EthanXing-xyy/TheOtherManDetector](https://github.com/EthanXing-xyy/TheOtherManDetector)** ⭐10 — C / 18 KB / 中英 README 双版本。**"隔壁老王检测器"**——本质是 PSoC 6 MCU 上的 Audio-IMU 多模态 Edge AI 异常检测系统：同步采 PDM 麦克风 + 6 轴 IMU、学正常移门交互模式（脚步节奏 / 拉门速度 / 声学振动 / 运动动力学），异常时报警。**不识别人身份，不是步态识别系统**——这点在 README 中显式声明（避免被误解为安防监控）。硬件目标 Infineon CY8CKIT-062S2-AI PSoC 6 AI Evaluation Kit，部署路径：原始数据集 → 清洗对齐 → 重建表征学习 → encoder-only 部署模型 → 32-D embedding → StandardScaler + K=2 prototype + LedoitWolf Mahalanobis → PT2 导出 → DEEPCRAFT Model Converter → 生成 C/H → PSoC 6 实时推理。是"严肃 Edge AI 异常检测"路径上的极小但完整的端到端 demo。
- **#12 [oh-my-dsh/dsh-plugin-upgrade-skill](https://github.com/oh-my-dsh/dsh-plugin-upgrade-skill)** ⭐9 — JavaScript / 10 MB。完整深挖见重点 #5 之外的部分。这是 DSH（[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) "一切皆插件"的 agent harness）首次出现"版本迁移专用 skill"。四模式安全升级：`plugin-upgrade`（只读检查 / 已安装升级 / 宿主兼容迁移）+ `plugin-write` + `plugin-test` + `plugin-release`。版本卡片已写到 `v0.1.2-alpha.1 / alpha.2 / rollup-0.1.2.md`，正式版 0.1.2 tag 未发（依赖官方发布）。Discussion #5120 是社区实践痛点来源、@zhu1090093659 的 [dsh-web](https://github.com/zhu1090093659/dsh-web) 是真实迁移案例。本档 DSH 周边首次出现"版本迁移工具"——是 DSH 单生态三阶段中的"插件基建"阶段信号。
- **#13 [drephantom/wq-brain-mcp-server](https://github.com/drephantom/wq-brain-mcp-server)** ⭐9 — Python / 11 MB。把 [WorldQuant BRAIN](https://platform.worldquantbrain.com) 量化研究平台能力封装成 8 个 MCP 工具（`wq_auth_status / wq_get_platform_setting_options / wq_list_datasets / wq_search_datafields / wq_get_operators / wq_recent_alphas / wq_write_candidates / wq_run_multisim_file`），**故意不暴露 submit**——提交走独立 CLI + 交易日/日额度/交易成本/PnL 稳定性多重闸门。架构里 MCP 服务器代码中**不存在 submit 工具**——是"防止 Agent 自主提交消耗真实账户配额"的安全边界设计。`wq_run_multisim_file` 必须显式 `confirm_run=true` 才消耗配额，批量 2-10、并发 1-8，大批量强制 `background=true` 或显式放行防 UI 阻塞。这是 2026-08-23 周"垂直行业 MCP"路径上**安全姿态最严肃**的一份。
- **#14 [RexaDB/RexaDB](https://github.com/RexaDB/RexaDB)** ⭐9 — TypeScript / 2 KB（README 极简）。多数据库桌面客户端：PostgreSQL / MySQL / MongoDB / SQLite / ClickHouse / Redis / SQL Server，"100+ 数据库连接管理"。Monaco SQL 编辑器（语法高亮 + autocomplete + 查询历史）+ 数据可视化（图表 + AG Grid 表）+ AI 集成（Anthropic / Google / OpenAI 生成 + 优化查询）+ 跨平台（macOS arm64/Intel / Windows / Linux）。GPL-3.0-or-later。比 [DBeaver](https://github.com/dbeaver/dbeaver) 轻量、比 [Sequel Ace](https://github.com/Sequel-Ace/Sequel-Ace) 数据库覆盖广，AI 集成是差异点。
- **#15 [alphaparkinc/genpark-os-gui-desktop-automation-vision-agent-skill](https://github.com/alphaparkinc/genpark-os-gui-desktop-automation-vision-agent-skill)** ⭐8 — Python / 2 KB（README 极简）。OS GUI 桌面自动化视觉 agent skill，Computer Use 形态：截屏 → 模型决策 → OS 操作。MCP 兼容，`python mcp_server.py` 启动，`python example_usage.py` 跑示例。license MIT。GenPark AI Agent Skill 命名，架构图 `User/Agent → JSON Request → Skill → CoreEngine → Structured Output → User`。本档 #15 与 #13 同属"agent 通过视觉 / 协议接管 OS" 路径，但这一份面向桌面、#13 面向量化平台。

---

## 数据方法

- **窗口**：`created:2026-08-30..2026-08-30`（UTC 日历日；CST 2026-08-31 早 8 点跑 = UTC 2026-08-31 00:10 已进新日，所以窗口锁的是昨天 8-30 全天）。
- **关键词**：`ai OR llm OR agent OR mcp OR assistant` + `in:readme`，5 个槽位（GitHub Search API 上限），未设 `stars:>` 下限，按 stars 降序取满 30 条原始命中（raw_count=30, total_count=36172）。
- **过滤**：经 `scripts/rank.py` 剔除空壳（`size < 15` KB 且无 language）/ 擦边（含 `undress / nsfw / uncensored` 等关键词）；本次剔除 2 条（`dmitry-taylor-ops95b4/winhance / breko861-hash/sol-luna-codex-orchestrator` 均属 empty-shell），剩 15 条进成稿。
- **排序**：剔除后按 `stargazers_count` 降序（窗口内新创建的仓按当前总星排名，非"窗口内涨星"——后者因 GitHub trending 页对无 JS 客户端返回 0 字节，本 skill 不采）。
- **详深挖**：Top 5 = `aadithyanr/yname / rileycx/strafe / ih8d8/yt-dlp-manager / sharn25/Curved-Gauge-Card / PixelML/club-170hx`；每条覆盖元数据 / README 核心价值 / 真实 issue body + 评论（含 seanphan 在 club-170hx 的 3 条实战反馈、aadithyanr/yname PR #1 AjayK47 RDAP 行业检查、ih8d8/yt-dlp-manager dependabot PR #1）/ 横向对比 / 信号判断 / 适用场景。
- **来源**：GitHub Search API（成稿名单）+ GitHub Issues API（深挖）+ GitHub REST API（repo 元数据 + readme base64 解码）。HN Algolia / Reddit / GitHub Trending 页 本档未用（前者偶发非 JSON，后者返回 0 字节）。
- **slug**：`github-trending-2026-08-30`（与窗口日期对应，非跑任务当天）。
- **快照时间**：UTC 2026-08-31 00:10。
- **上期对照**：`/root/.hermes/skills/gh-trending-watch/data/snapshots/daily--2026-08-29.json` 存在，对照显示本档 15 条全部为新上、无重复，无上期在榜。