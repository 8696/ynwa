2026-08-24 · AI/agent/LLM 热门

### 核心信号

- **Agent Skill 当道**：昨日 15 条命中有 5 条明确属于 `claude-code / codex` Skill 生态，其中 [yizhiyanhua-ai/fireworks-open-eli5](https://github.com/yizhiyanhua-ai/fireworks-open-eli5)、[ericlitman/open-pstack](https://github.com/ericlitman/open-pstack) 走的是「把别人的 skill 移植/封装到双 Agent」路线；DSH（同花顺）周边在 [zhuyifang/tonghuasun-agent](https://github.com/zhuyifang/tonghuasun-agent) 上同时冒出来，能挂 Codex/Claude Code/WorkBuddy/ZCode/OpenClaw/DSH 6 个 harness。
- **真实安全/兼容信号集中在两条实战 issue**：[zhuyifang/tonghuasun-agent](https://github.com/zhuyifang/tonghuasun-agent) 的 [#2](https://github.com/zhuyifang/tonghuasun-agent/issues/2)（作者主动公开「闭源 DLL 未签名、覆盖无归属校验」）和 [#3](https://github.com/zhuyifang/tonghuasun-agent/issues/3)（同花顺远航版 12.1.1.6 上 `MissingFieldException` 交易崩溃）是本日榜上少见的「读者可以照着 Issue 评估是否敢用」的信号样本。
- **DSH 预设生态进入「破限玩法」阶段**：[Rain-kl/dsh-preset-plus](https://github.com/Rain-kl/dsh-preset-plus) 走的是仿 SillyTavern 预设的「伪造模型服从输出」路线；同类 DSH jailbreak / preset 编辑器在榜上虽然没有第二家，但 README 已经把"AB 双模式 / 注入顺序 / console 打印验证"这套工程套路摊开。
- **"中文/国际化阅读场景"的长尾题材集中**：广州地铁 3 号线挤车小游戏 ([ns2250225/jiditie](https://github.com/ns2250225/jiditie))、葡语 KYC 合规控制台 ([juliosanzovo/identia](https://github.com/juliosanzovo/identia))、巴西数据库夜课 ([lvgalvao/projeto-dados-ia-databricks](https://github.com/lvgalvao/projeto-dados-ia-databricks))、Haizhu 系列逆向封装 ([HaizhuAI/HaizhuRemakefaceWebui](https://github.com/HaizhuAI/HaizhuRemakefaceWebui)) 都是「非英语长尾 + 本地化素材」组合，可读性高、信号杂。
- **上期（2026-08-23）15 条全部掉出**：本期 15 条都是新上榜（无上期「还在榜」项），表示昨天新创建的 AI 项目活跃度足够高、但还没有第二个 24h 窗口形成连续性。分布上 5 条 Python、3 条 JavaScript、3 条 TypeScript、1 条 HTML、1 条 Ada、2 条未声明语言；中英文项目 7 / 8 接近对半。

### 重点深挖

**1. [yizhiyanhua-ai/fireworks-open-eli5](https://github.com/yizhiyanhua-ai/fireworks-open-eli5)** ⭐51

- 一句话：把"系统如何工作"做成可点开、可逐证据校验的离线 HTML 交互说明，主要面向 Codex / Claude Code 的 Agent Skill。
- 仓库元数据：JavaScript / Apache-2.0 / 587 KB / 6 topics（含 `claude-code / codex / eli5 / agent-skills / offline-first / visualization`），2026-08-24 当日创建、当日首次提交，目前 0 个 issue，5×4 commit 节奏非常快。
- README 提炼（10KB 文档，把"为什么不同"放在最前）：
  - **Truth Ladder（真话阶梯）** 是核心心智模型：把"类比、技术机制、警告"三层分开写，每一屏都标"这段是哪种话"，不让读者把类比当结论。
  - **证据绑在结论上**：每个场景旁边挂"来源状态 / 核心文本 / 支撑范围 / URL 或明确无定位边界"，没有证据就不能下结论；适配 Anthropic 社区 `eli5` skill，但作者明示 "is not endorsed by Anthropic"。
  - **四类故事语法**：概念、仓库模块、工程权衡、事故复盘，每类都有专属摘要视图和语义校验器；不是"一张图通吃"，而是按读者想问的问题形状切模板。
  - **可重放的细节轨迹**：全局 / 场景级轨迹动画化"节点 / 关系 / 标签 / 证据卡"四个要素，分入场 / 停留 / 退场三阶段，活跃场景始终保持可见。
  - **本地导出与本地工作台**：PDF / 单场景 PNG / 全场景 PPTX / Pages 兼容 DOCX / 可选的原生 `.pages`（仅 macOS，必须能被 Pages 真正打开才算合格，不能用 DOCX 改后缀冒充）；同源历史、收藏、纯文本批注默认 opt-in，不开本地库就连文件系统都不扫。
  - **离线可移植是硬约束**：没有 `npm install`、没有远端字体、渲染时不发网络；HTML 内的 CSP 是白名单制，禁止 `eval`、HTML 字符串插 DOM、XHR、WebSocket；可选的原生 Pages 转换走 `127.0.0.1` 回环 + 旋转令牌。
- Issue / PR 信号：本日 0 issue。社区动态只能从 README 推断：作者用 `npm run check` 把"语法 / 聚焦测试 / 标准样例 / release 包内容 / 解包后渲染 canary" 串成一个发布门；额外加了一个 `npm run check:agent-install`，在 Node 22.20+ 上跑"Codex 与 Claude Code 两条真实安装路径"。
- 横向对比：同类项目大多落在三类：
  - ① **画流程图**：Mermaid / draw.io / Excalidraw，重在"画"，证据靠人脑补；
  - ② **PPT/Notebook 模板**：Jupyter + reveal.js，重在"展示"，几乎没有"逐证据校验"；
  - ③ **纯 LLM 解释器**：Anthropic eli5 / OpenAI 自家 cookbook 的系统解释，重在"模型替你讲"，但你说的每一句都没有可点开的 URL 当锚点。
  - Fireworks ELI5 的差异化是把这三类的"证据 / 可重放 / 离线可移植"三件事都做了，并且把"导出"做成"真的能在 Apple Pages 里打开"那种硬验证，而不是改后缀。
- 信号判断：✅ 实战价值（在真实 Codex / Claude Code 里跑过 release canary，且 README 给的安装指令覆盖两条 harness）；⚠️ 研究诚信（明示非 Anthropic 官方）；⚠️ 学习成本（schema 是 1.0 版本，要写好"故事 spec"还得读 `references/spec-contract.md`）；✅ 安全（默认无远端、CSP 白名单、`SECURITY.md` 在场）；✅ 增长（5 个 commit / 4 小时内、51 星 / 24 小时，节奏健康）。
- **适用场景**：**适合**要在团队 / 客户 / 新人面前"讲清楚一个系统怎么走完一遍"的开发者，特别是写技术评审 / 事故复盘 / 复杂架构讲解的；**不适合**只想画一张图就走的场景（直接用 Mermaid 更划算），也不适合需要把"模型替你讲"作为终态输出的场景。

**2. [zhuyifang/tonghuasun-agent](https://github.com/zhuyifang/tonghuasun-agent)** ⭐29

- 一句话：把"本机同花顺远航版"的行情 / K 线 / 持仓 / 委托 / 成交挂到 Codex、Claude Code、WorkBuddy、ZCode、OpenClaw 和 DeepSeek Harness 6 个 Agent 上的本地桥；交易工具默认关闭、需用户手动开启并二次确认。
- 仓库元数据：JavaScript + C#（闭源部分）/ AGPL-3.0（开源部分）/ 7883 KB / 0 topics，2026-08-24 创建；本日已 `pushed 2 次`，覆盖 SDK、配置器、传输桥、本机插件多模块。
- README 提炼：
  - **安装路径对齐 6 个 harness**：每个 harness 一个子目录 README（`codex/`、`claude-code/`、`workbuddy/`、`zcode/`、`openclaw/`、`deepseek-harness/`），统一入口是一句聊天命令：「配置同花顺插件，插件项目地址：`https://gitee.com/qicuo/tonghuasun-agent.git`」，按提示选客户端目录后重启同花顺即可。
  - **服务只监听本机地址**：行情 / 账户 / 委托数据全部来自本机同花顺客户端，本机访问令牌不写进仓库或安装包模板；交易工具默认关闭、开启后下单 / 撤单 / 改单前必须二次确认。
  - **官方/独立边界明示**：README 第一段就写"这是一个独立开发项目，不是同花顺官方产品"；AGPL-3.0-only 仅覆盖 Agent 入口、配置器、传输桥和 SDK，C# 编写的同花顺本机插件暂时闭源、暂无 Windows 代码签名，README 给出 SHA-256 清单供用户核对。
- Issue / 评论实战信号（本日榜最强）：
  - **实战兼容问题 #3**：[#3](https://github.com/zhuyifang/tonghuasun-agent/issues/3) 由真实用户报告：插件 0.2.5 在同花顺远航版 12.1.1.6 上，所有交易类工具立即报 `MissingFieldException: Hevo.Sdk.trader_instance.m_list_xiadan_queue`；行情 / K 线 / 分时仍正常。作者 `zhuyifang` 回复 [v0.2.6](https://github.com/zhuyifang/tonghuasun-agent/releases/tag/v0.2.6) 已加入兼容路径、字段缺失时走兜底逻辑，但手里没 12.1.1.6 环境无法验证，**保持 Issue 开启**请升级到 0.2.6 后确认。  
  - **作者自报安全缺口 #2**：[#2](https://github.com/zhuyifang/tonghuasun-agent/issues/2) 由作者本人列出 4 项安装前需要解决的隐患：①核心闭源 DLL `Get-AuthenticodeSignature` 均为 `NotSigned`，SHA-256 清单只能证"文件没被动"不能证"发行者"；②覆盖文件时无来源归属校验；③升级时清理旧状态的边界不清；④本机令牌保护强度未公开。`npm ci && npm test` 11 个测试通过、公开依赖无已知漏洞——但作者还是把"测试没覆盖、影响真实使用安全"的点摊在公开 Issue 里，要求推广前解决。作者在评论里确认 [v0.2.6](https://github.com/zhuyifang/tonghuasun-agent/releases/tag/v0.2.6) 已完成 Issue 中"与安装安全直接相关"的改进（安装前只读检查、不覆盖来源不明文件、升级只清理可确认属于旧版本的文件、卸载支持只读预检），但核心 DLL 仍闭源且未签名。
  - **真实用户提需求 #1（已关）**：[#1](https://github.com/zhuyifang/tonghuasun-agent/issues/1) 用户 `liu657039-debug` 提出 `/api/v2/wencai/query` 只返回证券身份、缺数据列；通过 `sortFieldValue` 0..399 枚举发现"主力净流入 / 主力净占比"等资金流列不在宿主通用排序字段里，应来自 `RequestWencaiRealtime/V3` 等专用视图（未通过 REST 暴露）。作者回复 [v0.2.6](https://github.com/zhuyifang/tonghuasun-agent/releases/tag/v0.2.6) 已修复并附实测结果（88 条记录均带证券名称和数据列）。
- 横向对比：  
  - 同花顺官方只做客户端，不接 Agent；本仓是市面上少数几个"把同花顺远航版挂到 LLM harness"的桥。  
  - 与"通用券商 SDK"（如 Tushare、Wind）比：本仓只走本机同花顺客户端、不上传任何账户/委托数据到云，账户侧风险面比云端 SDK 小一个量级；代价是"本机必须装同花顺 + 闭源 DLL 必须信任"。  
  - 与"通达信 / 文华财经"的同类桥项目比：本仓亮点是覆盖 6 个 Agent harness（WorkBuddy / ZCode / OpenClaw / DSH 这种非主流 harness 也直接给 README），但安全边界由作者自己公开列在 Issue 里——风险透明度反而是同类里最高的。
- 信号判断：✅ 实战（3 条 issue 都是真实业务，1 条由用户报、1 条作者自报、1 条用户提需求）；⚠️ 安全（核心 DLL 未签名、需用户自担信任；README 给 SHA-256 是底线不是上限）；✅ 兼容性维护节奏（0.2.5 → 0.2.6 一日响应 Issue #3 并保留 issue 状态求二次验证）；⚠️ 维护边界（维护者单人手搓 6 个 harness，量级大；好在 AGPL + 闭源边界公开透明）；✅ 研究诚信（README 与 Issue 口径一致，"不是同花顺官方"明示两遍）。
- **适用场景**：**适合** Windows 11 / 10 上已经在用同花顺远航版、需要把行情 / K 线 / 持仓 / 委托数据挂到 Codex / Claude Code / DSH 等 Agent 跑的量化 / 复盘用户，且愿意接受"本机闭源 DLL + SHA-256 自核对"信任模型；**不适合** macOS / Linux 用户、只用云端 SDK 的人、对未签名 DLL 零容忍的人、追求"全自动无人值守交易"的场景（README 明示交易仍需二次确认）。

**3. [zunmax/technocore-did-starter](https://github.com/zunmax/technocore-did-starter)** ⭐48

- 一句话：在 Windows / macOS / Linux 上生成加密的 Ed25519 本地身份、用 `did:key:z6Mk...` 在 Technocore 上签发"房间 / nonce / 标准化文本"三段消息；自带教程鼓励你发推 / 视频 / 文章为潜在的 `$FLOP` 空投做贡献证据链。
- 仓库元数据：Python / MIT / 71 KB / 2 topics（`flop / technocore`），2026-08-24 单日 0.5 小时内 push 两次、4 条 PR 全是"补 Windows curl fallback / WSL 教程 / 幂等注册 / 贡献证明"这类文档与稳健性补丁，没有 issue。
- README 提炼：教程把 7 步流程写死——安装 → 生成 DID → 加 Technocore 房间 → 做原创贡献（推文 / 视频 / 文章 / 翻译 / 图表 / 研究报告 / 工具） → 在对应平台发出去 → 把公开贡献 URL 用同一个 DID 登记回 Technocore → 在 X 上把"贡献 / DID / 房间 / 序列号"全摆出来做证据链；Git 类工作可附一条"与精确公开 commit 绑定"的可选签名证明。
- Issue / PR 信号：4 条 PR 全是作者 / 协作者自己提的（`Add Technocore contribution proof` / `Add idempotent DID registration workflow` / `docs: add WSL DID starter notes` / `Add Windows curl fallback for signed writes`），代表性的是 PR #3：补 `status` + 幂等 `register-did` 命令，支持 passphrase 文件 / 容量限制重试信号 / 冲突保护 / 回读校验，加 6 个标准库测试；PR #1 是给 Windows curl 兜底写（Python HTTPS 报 TLS 记录错误 / 反复读超时时用 curl.exe 转发已签名的 public envelope），3 个离线测试通过。
- 横向对比：典型的"教程+签名 CLI" 模式，跟 `didkit` / `did-method-key` 等通用 DID 工具相比，它把"教程、Technocore 协议、$FLOP 空投叙事"捆在一起，对只想用 Ed25519 做身份签名的人来说过厚、对只想领空投的人来说又必须真做一条公开贡献才能拿到证据链——定位是"营销型 + 工具型"的混合。
- 信号判断：⚠️ 研究诚信（README 明示"完成本教程不能保证 $FLOP 分配"；`$FLOP` 只是 Flop Labs 暗示的可能空投，不是已上线的治理权益）；✅ 安全（私钥本地生成 + 加密 + 签名在 Python 内完成、只有 public envelope 出网）；✅ 实战（PR 节奏健康、Windows curl fallback 是真踩过坑才补的）；⚠️ 增长天花板（项目价值与 $FLOP 叙事绑定，叙事退潮后流量会迅速消失）。
- **适用场景**：**适合**已经决定要跟进 `$FLOP` 空投叙事、想用一条"可验证的 DID + 公开贡献证据链"区分自己与水军的用户；**不适合**只想用 Ed25519 做通用身份签名的人（直接用 `didkit` 更轻），也不适合不想参与任何空投叙事的开发者。

**4. [ns2250225/jiditie](https://github.com/ns2250225/jiditie)** ⭐38

- 一句话：把广州地铁 3 号线早高峰"挤上车"做成 2D 网页小游戏，Vite + TypeScript + Canvas 2D + Web Audio + 自研空间哈希碰撞，34 个车站独立关卡。
- 仓库元数据：TypeScript / 无 license / 50 KB（轻量）/ 0 topics / homepage `https://f184d1d4.pinme.dev/` / 2026-08-24 凌晨 3 点到 6 点之间完成主体 commit、首次 push；当日 0 issue，纯属个人项目。
- README 提炼：题材是「挤广州地铁 3 号线」，完整 34 站通勤战役，每站独立客流 / NPC 配比 / 车门时间 / 特色机制；闯关越往后"更多乘客、更短开门时间、更快速度、更慢体力恢复、更强人群阻力、更多冲刺客、换乘大站难度峰值"逐步加压；操作是 `WASD/方向键` 移动、`空格` 扒拉、`Esc` 暂停，按一次空格就立即随机向左/向右拨一次；评价维度"通勤时间 / 体力 / 文明度 / 效率 / 星级"5 个并存；NPC 类型覆盖普通乘客 / 手机党 / 行李游客 / 地铁老手 / 大块头 / 老人 / 冲刺客 / 学生 / 快递员 / 游客，每类有独立移动速度 / 碰撞半径 / 重量 / 扒拉抗性；存档走 `localStorage`，成就、称号、最佳成绩、本地通关数都留底。
- Issue / PR 信号：当日 0 issue。技术栈口径与实现强相关：自研"圆形碰撞 + 重量差异 + 局部排斥 + 连锁挤压"做人群物理；声音全程序化生成、避免版权风险；明确写"项目为游戏化创作，与广州地铁官方无隶属关系"。
- 横向对比：与"Flappy Bird / 通勤类小品游戏"比，本仓亮点是把"地方通勤文化（广州 3 号线）+ NPC 物理 + 长线关卡"三件事压到 50KB 的 TS 代码里；不是引擎派（Godot / Unity），是 web canvas 派的精品小游戏。  
- 信号判断：✅ 文化贴近度（广州本地题材、34 站名实 / 换乘大站、扒拉动作都写实）；✅ 完整度（34 关 + 5 维评价 + 成就体系 + 本地存档，是完整游戏骨架不是 demo）；⚠️ 版权风险（自述"非真实录音 / 非受版权保护素材"，但站点名 / 线路图属于公共信息，不构成侵权）；✅ 增长（38 星 / 12 小时内，挂 Vercel 风格域名 `pinme.dev`，传播靠本地化共鸣）。
- **适用场景**：**适合**玩通勤类 / 物理搞笑小品、想找"打发地铁时间 + 看得懂中文关卡"的玩家与开发者，以及想看"Canvas 2D 空间哈希 + 自研人群 AI"完整实现的游戏开发者；**不适合**期待 3D 渲染 / 长剧情 / 多平台发行的玩家，以及任何对"广州 3 号线"题材无共鸣的人。

**5. [juliosanzovo/identia](https://github.com/juliosanzovo/identia)** ⭐17

- 一句话：葡语圈的 KYC 合规分析师控制台，开新案子（CPF / CNPJ + 证件照片）后由系统自动交叉查工商档案、用 Google Gemini 抽视觉信息、生成风险评分与建议，最终决定权始终留给分析师，全程留审计轨迹。
- 仓库元数据：TypeScript / 无 license / 449 KB / 0 topics / 2026-08-24 当日凌晨 2 点到 3 点完成主体 commit；当日 0 issue、0 PR；README 1.1 万字符、含 1 张 Mermaid 流程图 + 多张 badge，技术栈列得很整齐（Next.js 14 + TypeScript 5 + React 18 + Tailwind 3 + Google Gemini）。
- README 提炼：核心定位是「给合规桌用的内部控制台」，不是面向最终用户的 KYC 产品；分析师拿到 CPF / CNPJ 和证件照片后，系统做 ① 工商档案查询（Hub do Desenvolvedor 公开接口）② 视觉分析（RG / CNH 等证件，Google Gemini）③ 生成风险评分 + 信号 + 理由 + 推荐 ④ 分析师自己点「通过 / 驳回 / 申请复核」⑤ 全程时间线写进审计日志；关键工程决策是「当 AI 接口超限，降级到本地规则」，避免合规桌「AI 一挂就停摆」。Mermaid 流程图把链路画成 `Analista → Novo caso → Hub Cadastral + Upload doc → Visão Gemini → Parecer de risco → Decisão analista → Auditoria`，结尾永远落在人手里。
- Issue / PR 信号：当日 0 issue、0 PR。可观察的信号是仓库本身——1.1 万字符 README 把产品定位 / 功能 / 流程 / 安装 / 配置 / 使用 / API / 架构全列了，是"教学型仓库"节奏。
- 横向对比：合规 / KYC 这块在巴西市场通常是 Serasa / Boa Vista / itau 等大厂私有 SaaS + 集成商定制，本仓的"开源分析师控制台"是少见形态；跟 Onfido / Jumio / Veriff 这类国际化 KYC 平台比，本仓目标不是「替企业完成 KYC」而是「给合规分析师一个本地化、可审计、模型失败可降级的工作台」。  
- 信号判断：⚠️ 安全（README 没看到审计字段加密、没看到密钥管理细节；本机演示 / 内部用问题不大、外接真合规桌会要更多配置）；⚠️ 监管（README 强调"AI 推荐 / 人决定"，但未提 LGPD / BACEN 等合规口径——巴西合规桌要进生产得自己补）；✅ 实战（README 写得很工整，像是给真合规桌看的工具书不是项目炫技）；✅ 工程稳健（"AI 降级到本地规则"是合规桌核心需求，作者把它放在 README 第一屏）；✅ 研究诚信（明示 AI 推荐 / 人定，避免"AI 自动决定"误导）。
- **适用场景**：**适合**巴西 / 葡语区小到中型合规桌想搭一个本地化的 KYC 分析师工作台、对"AI 降级到本地规则 / 审计轨迹"两项硬需求有明确认知的人；**不适合**追求一站式 SaaS 的合规负责人（直接用 Serasa / Veriff 更划算）、美 / 中 / 欧市场用户（数据源是巴西工商接口）、对 LGPD 合规细节无暇自理的团队。

### 完整前 N 表

| # | 仓库 | ⭐ | Δ | 赛道 | 态 | 语言 | 一句话 | 信号 |
|---|---|---:|---:|---|---|---|---|---|
| 1 | [lvgalvao/projeto-dados-ia-databricks](https://github.com/lvgalvao/projeto-dados-ia-databricks) | 147 | - | 其他 | 新上 | Python | 葡语直播课「4 晚从 0 搭 B2B 数据 + AI 销售区」(Databricks Free / SQL / Python / Claude Code) | ✅ |
| 2 | [yizhiyanhua-ai/fireworks-open-eli5](https://github.com/yizhiyanhua-ai/fireworks-open-eli5) | 51 | - | agent | 新上 | JavaScript | 把"系统怎么走"做成离线可校验的交互 HTML 说明，Codex / Claude Code Skill | ✅ |
| 3 | [zunmax/technocore-did-starter](https://github.com/zunmax/technocore-did-starter) | 48 | - | 其他 | 新上 | Python | Ed25519 本地 DID + Technocore 签名消息 + `$FLOP` 空投教程 | ⚠️ |
| 4 | [ns2250225/jiditie](https://github.com/ns2250225/jiditie) | 38 | - | 其他 | 新上 | TypeScript | 「挤上广州地铁 3 号线」2D 网页小游戏，34 关 + 自研人群物理 | ✅ |
| 5 | [Jingyi-Wu-Richael/replicate-video-ad](https://github.com/Jingyi-Wu-Richael/replicate-video-ad) | 32 | - | 设计skill | 新上 | Python | Codex Skill：参考视频 → 电商 story-ad 拆解 + 可复制 prompt | ✅ |
| 6 | [zhuyifang/tonghuasun-agent](https://github.com/zhuyifang/tonghuasun-agent) | 29 | - | agent | 新上 | JavaScript | 把本机同花顺远航版挂到 Codex/Claude Code/WorkBuddy/ZCode/OpenClaw/DSH | ✅⚠️ |
| 7 | [ShyamRV/demo-linkedin-agent](https://github.com/ShyamRV/demo-linkedin-agent) | 29 | - | agent | 新上 | Python | Fetch.ai uAgent + ASI:One，每天 18:00 IST 自动写文 + 生图 + 发 LinkedIn | ✅ |
| 8 | [mkanat/skills](https://github.com/mkanat/skills) | 26 | - | agent | 新上 | - | Max Kanat-Alexander 的代码质量 Skills（`cleanup` 在示例项目里跑出 1.34× 提速 + 100% 覆盖率） | ✅ |
| 9 | [juliosanzovo/identia](https://github.com/juliosanzovo/identia) | 17 | - | 其他 | 新上 | TypeScript | 巴西合规桌用的 KYC 分析师控制台，AI 推荐 + 人定 + 全程审计 | ⚠️ |
| 10 | [kajalpandey0101/Webopsy](https://github.com/kajalpandey0101/Webopsy) | 16 | - | 其他 | 新上 | Python | 全栈网站取证 + 情报平台（Flask / SQLAlchemy / Celery / Redis / Vue 3 / OpenAI+Gemini 接口） | ✅ |
| 11 | [ovenpasta/adi2](https://github.com/ovenpasta/adi2) | 15 | - | 其他 | 新上 | Ada | Ada 2022 现代 GUI 库：CSS 样式 + XML UI + SDL3 后端 | ✅ |
| 12 | [SXP-Simon/repo-evolution-visualization-skill](https://github.com/SXP-Simon/repo-evolution-visualization-skill) | 15 | - | 设计skill | 新上 | HTML | 把任意 Git 仓库历史 / Star 增长 / 贡献者星环做成手绘涂鸦风交互看板 | ✅ |
| 13 | [Rain-kl/dsh-preset-plus](https://github.com/Rain-kl/dsh-preset-plus) | 14 | - | agent | 新上 | JavaScript | DSH 预设增强插件，仿 SillyTavern 预设做"破限场景的伪服从输出" | ⚠️ |
| 14 | [ericlitman/open-pstack](https://github.com/ericlitman/open-pstack) | 14 | - | 其他 | 新上 | TypeScript | 把 Cursor pstack 移植到 Claude Code / Codex，跟上游 | ✅ |
| 15 | [HaizhuAI/HaizhuRemakefaceWebui](https://github.com/HaizhuAI/HaizhuRemakefaceWebui) | 13 | - | 其他 | 新上 | Python | 逆向 RemakeFace Ai.apk v1.7.7 PRO 破解版后端协议，封装成 Web 工作台 + OpenAI 兼容 API 网关 | ⚠️ |

### 其余简评

**6. [zhuyifang/tonghuasun-agent](https://github.com/zhuyifang/tonghuasun-agent)** ⭐29 · agent · 新上 · JavaScript
独立项目，把本机同花顺远航版的行情 / K 线 / 持仓 / 委托 / 成交数据挂到 Codex / Claude Code / WorkBuddy / ZCode / OpenClaw / DeepSeek Harness 六个 harness；服务端只监听本机地址、交易工具默认关闭、下单前需用户二次确认。AGPL-3.0 仅覆盖 Agent 入口 + 配置器 + 传输桥 + SDK，C# 编写的同花顺本机插件暂时闭源且未做 Windows 代码签名，README 给 SHA-256 清单供用户核对——是市面上少数把"安全边界"公开写在 Issue 里的同类型项目。详见上文 #2 深挖。

**7. [ShyamRV/demo-linkedin-agent](https://github.com/ShyamRV/demo-linkedin-agent)** ⭐29 · agent · 新上 · Python
Fetch.ai uAgent + ASI:One 教程型仓库：让一个 uAgent 用 ASI:One 写文案 + 生图 + LinkedIn API 发布 + 每天 18:00 IST 自动跑一遍；支持 Windows / Mac，提供 Agentverse / ASI:One Chat Protocol 入口。17KB 仓库、README 占 12KB（README 写完就是教程），适合想跑通「Agentverse + ASI:One + LinkedIn API」最小链路的开发者。

**8. [mkanat/skills](https://github.com/mkanat/skills)** ⭐26 · agent · 新上 · CC0-1.0
Max Kanat-Alexander（Bugs Everywhere / Asana 早期成员）出的代码质量 Skills 合集，重点是 `cleanup` skill：在示例 `minibuild` 项目里"反复找重复信息 / 重复劳动 / 不必要防御代码 / 偶然复杂度"，跑出 32 项实质性清理、整体提速 1.34×、内存更少、100% 测试覆盖率；CC0-1.0 协议、商用零摩擦。两条 open issue：#1 自荐性发版帖，#2 用户建议加 `user-invocable: false`（避免被模型自动调用）。

**9. [juliosanzovo/identia](https://github.com/juliosanzovo/identia)** ⭐17 · 其他 · 新上 · TypeScript
葡语 KYC 合规分析师控制台（CPF/CNPJ + 证件照片 → Gemini 视觉 + 工商档案查询 → 风险评分 + 推荐 → 分析师定夺 → 全程审计时间线），AI 超限时降级到本地规则。详见上文 #5 深挖。

**10. [kajalpandey0101/Webopsy](https://github.com/kajalpandey0101/Webopsy)** ⭐16 · 其他 · 新上 · Python
Flask + SQLAlchemy + Celery + Redis + Vue 3 全栈网站取证 / 情报平台：URL intake 带 SSRF 防护、安全 BFS 爬虫带证据采集、SEO / 性能 / 可访问性 / 安全 / UX 多维分析、中央化打分引擎、AI 诊断抽象层（OpenAI / Gemini provider 接口）、JWT 鉴权、Dashboard / Report / Monitor / 历史对比视图；64KB 仓库，README 写得工整，是"教学型仓库 + Docker Compose 起栈"标准流程。

**11. [ovenpasta/adi2](https://github.com/ovenpasta/adi2)** ⭐15 · 其他 · 新上 · Ada
Ada 2022 现代 GUI 库：CSS 样式、XML UI、SDL3 后端；15KB 仓库、6 topics（`ada / ada2022 / css / graphics / gui / sdl3`）；在 AI/agent/LLM 关键词命中的情况下属于"小众语言现代 GUI 复活"项目，给想用 Ada 做图形界面的开发者一个比 GtkAda 更现代的选择。

**12. [SXP-Simon/repo-evolution-visualization-skill](https://github.com/SXP-Simon/repo-evolution-visualization-skill)** ⭐15 · 设计skill · 新上 · HTML
把任意 Git 仓库的提交历史 / GitHub Star 增长曲线 / 贡献者星环 / 里程碑生成手绘涂鸦风的交互式 Web 演化看板 + 60 FPS 演示视频；适配 Antigravity / Claude Code / Cursor / Codex 几个 harness，也可命令行独立跑。4016KB（演示资源偏多）、MIT、5 topics 缺位；适合做开源项目周年总结 / 年度回顾 / 社区致谢。

**13. [Rain-kl/dsh-preset-plus](https://github.com/Rain-kl/dsh-preset-plus)** ⭐14 · agent · 新上 · JavaScript（DSH 同生态衍生）
DeepSeek Harness (DSH) 预设增强插件，仿 SillyTavern 预设模型做"伪造模型服从输出从而提升破限效果"，提供 `preset-plus` 模式 + AB 双模式（自动首条注入 / 手动 `/preset-plus prefill`）；2 条 issue：#1 已关（GitHub 安装时 `cordis.patch.yml` 的 `name` 字段应写 `@rain-kl/dsh-preset-plus`），#2 仍开（Web 端 dsh manager 装时报 `loaded without registering "@rain-kl/dsh-preset-plus"`，作者已识别是 QUALITY CHECK 校验链路问题）。同 DSH 生态本期无第二家冒头，作者把"注入顺序 / console 验证 / scopedPresets"这套工程细节摊得很清楚。

**14. [ericlitman/open-pstack](https://github.com/ericlitman/open-pstack)** ⭐14 · 其他 · 新上 · TypeScript
把 Cursor 的 Lauren Tan（@poteto）的 [pstack](https://github.com/cursor/plugins/tree/main/pstack) 移植到 Claude Code 和 Codex："一个任务 → 进入 poteto-mode → 路由到多个 focused skill → 通过真实应用验证 → 收敛成可审 PR"的工作流。1498KB、MIT、追踪上游 Cursor pstack；今日 7 issue / 5 PR 全是产品级打磨：典型的是 #11 / #12 修复"pstack-runner 在 Grok CLI 自更新窗口期会把已认证通道判为 `unauthenticated`" 边界（保留两次 preflight 证据 / 单次 5 秒后重试），README 把 Mermaid 流程图换成静态 hero 图。

**15. [HaizhuAI/HaizhuRemakefaceWebui](https://github.com/HaizhuAI/HaizhuRemakefaceWebui)** ⭐13 · 其他 · 新上 · Python
逆向 `RemakeFace Ai.apk` v1.7.7 PRO 破解版后端协议后重新封装的生图 Web 工作台：9 个 PRO 模型全部解锁（`priceCredit=0`）、提供 OpenAI 兼容 API 网关（`/v1/models` + `/v1/images/generations`）、能力覆盖文生图 / 图生图 / 人脸替换 / 多图混合 / NSFW 检测；自带 HaizhuDesignSkill 深色工作台 + 三层表面分层 + 克制动效，管理员密码访问（默认 `admin123`）。23760KB 仓库、未声明 license、README 明示基于破解版 APK 协议——属于"研究 / 复刻"范畴，部署前需评估法律 + 合规风险。

### 数据方法

- **窗口**：本次按 UTC 切窗，覆盖 `2026-08-24` 单日内新创建的 GitHub 仓库（`created:2026-08-24..2026-08-24`，闭区间），口径与本 skill 日榜系列一致；不在窗口内的仓库不参与排序。
- **关键词**：`(ai OR llm OR agent OR mcp OR assistant) in:readme` + `archived:false` + `sort=stars&order=desc&per_page=30`，5 个槽位按 `ai / llm / agent / mcp / assistant` 优先级。
- **过滤**：`scripts/rank.py --route daily` 标记空壳 / 擦边仓剔除，本期剔除 3 条（`mztacat/Simplified-FLOP-Labs-Technocore-Agent-Guid` / `Minglink/DeepSeek-Harness-Hub` / `Wecncode/Social-Sentinel`，均为 `empty-shell`）；最终 27 条入库、15 条上表。
- **排序**：在窗口 + 关键词过滤后按 `stargazers_count` 降序，无 `stars:>N` 下限；不足 15 条按实际条数写、本期实满 15 条。
- **上期对照**：`rank.py compare` 对照 `daily--2026-08-23.json` 快照，本期 15 条全部为新上榜、上一期 15 条全部掉出，`star_delta={}` 表示本期无"还在榜"项。
- **深挖**：以 `rank.py deep_targets` 为准（日档前 5 个 deep_ok 仓），共 5 条；其余条目走简评或归入"其余简评"。Issue / PR 评论原文经翻译后呈现，作者与用户名保留。
- **来源**：GitHub Search API（主）+ GitHub Issues / PRs REST API（深挖）+ `scripts/rank.py`（过滤 / 排序 / 上期对比）+ `scripts/windows.py`（窗口 / slug / title_time）。
- **slug**：`github-trending-2026-08-24`（取自 `windows.py daily.slug`，与 heading / title_time 同源；不取跑任务当天）。