# 我搭了一套 24 个模块的 AI Agent 学习仓库：架构、内容与陪跑设计

> 一篇「仓库介绍文」，讲我最近在做的项目 [`8696/ai-agents-learning`](https://github.com/8696/ai-agents-learning)：为什么做、怎么组织、24 个模块覆盖哪些知识、代码怎么落，以及它怎么被设计成一个 AI **陪跑仓库**——打开它，对面的 Cursor / Claude Code / Codex / Hermes 会自动切到「陪跑老师」模式，按 `coach start` 一条一条讲清楚。
>
> 上一版我把仓库写成「docs + 5 个 apps + demos」三段式——那是开搭时的设想，跑了两个月发现落地不干净，现在代码落点收敛到了「**`apps/` 一个根目录**」。这篇按真实架构重写。

## 起因

做这个仓库的契机其实挺俗的：我想正经学一遍 AI Agent 开发，不是看两篇文章那种「懂了个大概」，是能自己设计、实现、评测、部署一个生产级 Agent 出来。

但打开 Claude / ChatGPT 学了一圈后我很快撞上三个具体问题：

1. **教程是碎片化的**。一篇讲 Tool Calling、一篇讲 RAG、一篇讲 Multi-Agent，但没人告诉我**先学什么后学什么**、**学到什么程度算过**。我每次都靠脑补排序，学到第二个模块就忘了第一个。
2. **代码是看不完的**。GitHub 上 Agent 项目很多，但大部分是「跑起来就好」的 demo。我看不出哪些能力是必须手写的、哪些是可以用框架替代的——直到真要用的时候才发现少了某一块。
3. **AI 助手是过路客**。我让 Cursor 给我讲 Tool Calling，它讲得挺好；等我下次新开对话，Cursor 就完全不知道我学到哪了、之前问过什么、卡在哪。陪跑不是「这一轮讲清楚」，是「陪着我把整条路线走完」。

第三个问题尤其让我难受。我不缺能讲清楚的 AI，缺的是一个**有进度感**的 AI——它知道我现在卡在模块 02 的 SSE 那一节，知道我上一轮问过 AbortController，知道我下次打开不用再说一遍背景。

所以我决定：**自己搭一个仓库，把文档、代码、进度、陪跑契约全放在一起，让任何打开它的 AI 助手自动切到陪跑模式。**

这个仓库就是 [`8696/ai-agents-learning`](https://github.com/8696/ai-agents-learning)。

---

## 仓库结构：只有一个代码落点 `apps/`

打开仓库你只会看到两类东西：

```text
ai-agents-learning/
├── docs/                    ← 学习文档（顶层 00–07 总纲 + 学习模块/ 一模块一文件夹）
└── apps/                    ← 唯一代码落点
```

没有 monorepo、没有 packages/、没有平行 mini-app、没有专门的 `demos/`。`docs/` 和 `apps/` 各自有 `README.md`。

### `apps/` 里到底装什么

`apps/` 是**唯一**的代码落点，两类子文件夹，互不 import：

| 类型 | 位置 | 干什么 |
| --- | --- | --- |
| **模块 00 mini-app** | `apps/00-环境准备/01-mini-app/` | **唯一**的三入口代码落点：CLI 协议 A（流式 OpenAI Chat Completions）/ CLI 协议 B（对照 Anthropic Messages）/ HTTP+SSE + 浏览器聊天页（`http://127.0.0.1:3000/`） |
| **外部小节 Demo** | `apps/{模块文件夹}/{小节文件夹}/` | 每条外部小节的最小可运行 Demo，**只**验证当前这一条，**不**为后面条目做铺垫 |

模块 00 mini-app 是 `apps/` 的唯一特殊结构（三个入口 + 公共 `load-root-env.ts`），不在任何地方拆开。所有其它模块的小节 Demo 都是「单文件夹 + 一份 `index.ts` + 一份 `README.md`」。

为什么没有「5 个实战项目」？我试过——一开始我设了 5 个端到端 app（ChatGPT Mini、Tool Agent、Knowledge Agent、Research Agent、Coding Agent），跑了几周发现：

- **项目数一多每个都做不厚**，最后五个浅 Demo 远不如一个做透的项目；
- **小节和项目脱钩**——学到 SSE 我没法在「5 个项目」里挑一个塞进去，硬塞就破坏项目边界；
- **回填路径太长**——一个能力从学到用要「小节笔记 → 演示 demo → 选项目 → 改项目 → 跑通验收」，中间任何一步都可能被跳过。

新架构把这一步砍掉：学到一条 Demo 就落 `apps/{模块}/{小节}/`，**回填到项目**这件事留到本模块「本地产出」行（每个模块 README 最后一行）做收口。**先沉淀、再回填**，不要边学边开新项目。

为什么没有 `demos/`？同一套理由：单独建一个 `demos/` 会让小节 Demo 和模块 00 mini-app 形成「两套并行代码」，互相不引用但都引用外部依赖，结构上多一层心智负担。直接放 `apps/{模块}/{小节}/` 跟 `apps/00-环境准备/01-mini-app/` 同一个根，所有代码都从这一根摸得到。

### 共用配置放在 `apps/` 下，不放在仓库根

`apps/.nvmrc` / `apps/.env.example` / `apps/tsconfig.base.json` 这三个共用配置放在 `apps/` 下：

- 仓库根不放业务代码，连 `.nvmrc` 都不要——仓库根是给 AI 读 `AGENTS.md` 切角色的；
- `apps/` 是 `cd apps && yarn install && yarn typecheck` 一次跑完所有代码；
- `.env` 不进 git，Key 只在 `apps/.env`，所有入口通过 `apps/load-root-env.ts` 读。

---

## 24 个模块覆盖什么

`docs/学习模块/` 下是 24 个模块（编号 00–23），**一模块一文件夹**：

```text
docs/学习模块/
├── README.md                    ← 学习模块总览
├── 00-环境准备/                 ← 模块 00：Key 安全 + Node ≥22 + mini-app 三入口
│   ├── README.md                ← 小节进度 + 验收 + 本地拆步
│   └── 01-{小节}.md … 04-本地产出.md
├── 01-AI与LLM基础认知/          ← AI/ML 边界、Token、Context、Transformer、Embedding、幻觉
├── 02-LLM-API开发/             ← Streaming/SSE、协议 A vs B、AbortController、Rate-Limit
├── 03-Prompt-Engineering/       ← System vs User、Few-shot、CoT、版本管理
├── 04-Structured-Output/        ← JSON Schema、JSON Mode ≠ Structured Output
├── 05-Tool-Calling/             ← 调用闭环、description、幂等、Gateway
├── 06-多轮对话与Context/        ← Context ≠ Memory、摘要 vs 滑动窗口、Token Budget
├── 07-手写Agent/                ← ReAct Loop、规划 vs 逐步、三种停止条件
├── 08-RAG基础/                  ← Load→Chunk→Embed→Retrieve→Generate
├── 09-RAG进阶/                  ← BM25、粗排+精排、Query Rewrite
├── 10-Memory/                   ← 工作 / episodic / semantic
├── 11-Agent-State-Workflow/     ← 状态机、Checkpoint、HITL
├── 12-MCP/                      ← 三原语、stdio vs HTTP、Skills vs MCP
├── 13-Agent-Framework/          ← 框架省了什么、State Graph
├── 14-Multi-Agent/              ← Supervisor、成本、A2A vs MCP
├── 15-Browser-Computer-Agent/   ← a11y tree、Computer Use
├── 16-Coding-Agent/             ← 文件 + Shell + Git、patch、AGENTS.md
├── 17-Agent-Evaluation/         ← Judge 偏差、轨迹、CI ship/no-ship
├── 18-Observability/            ← Trace / Span
├── 19-可靠性成本性能/           ← 熔断、缓存、按任务总成本路由
├── 20-AI-Security/              ← 注入、Jailbreak ≠ Injection、Gateway
├── 21-后端与基础设施/           ← SSE buffer、队列、对象存储
├── 22-AI全栈产品化/            ← 流式 Markdown、Agent Steps UI
└── 23-Production-Agent-Architecture/  ← 全链路取舍、1000 DAU 成本、原理串讲
```

每个模块的 README 里有一张「小节进度」表，从上到下勾：

- **外部学习行**：先讲概念（`coach start` 默认 §6.2 详解 + 本条产出预告），出门学点名才出门包；讲完写小节 MD（按 §7.2 九节模板），Demo 按 §5.2 判断（无 / 伪代码 / 可运行）。**禁止先写代码后讲概念**。
- **本地产出行**（每模块最后一行）：对照该 README **验收收口**，写 `{NN}-本地产出.md`，有代码则同步更新对应 `apps/{模块}/{小节}/README.md`。

### 模块分布的逻辑

不是按热度排，是按「**能力栈深度**」：

| 阶段 | 模块 | 学什么 |
| --- | --- | --- |
| ① LLM 基础 | 00、01 | 环境 + Token/Context/Transformer/Embedding/幻觉 |
| ② LLM Application | 02、03、04、06 | API、Prompt、Structured Output、多轮 |
| ③ Agent 核心 | 05、07、10、11 | Tool Calling、手写 Agent Loop、Memory、State |
| ④ 知识与扩展 | 08、09、12 | RAG（基础+进阶）、MCP |
| ⑤ 框架化 | 13 | 框架省了什么、State Graph |
| ⑥ 高级 | 14、15、16 | Multi-Agent、Browser、Coding Agent |
| ⑦ 生产化 | 17、18、19、20 | Evaluation、Observability、可靠性/成本/性能、Security |
| ⑧ 全栈与收口 | 21、22、23 | 后端、AI 全栈产品化、Production Architecture |

`docs/06-学习总览.md` 把这 24 个模块列成一张进度表，每行带「页 / 外部 / 本地 / 代码落点 / 外部先搞清」五列。当前进度（截至 2026-09-01）模块 00–02 三个已过完，模块 03–23 都还是 ⬜。

### 「能力分级」是另一个值得讲的设计

仓库里把所有 Agent 能力分成 **S / A / B / C 四档**，每档给一个投入比例（在 `docs/03-学习路线.md` §2.6.1）：

| 档位 | 投入 | 掌握标准 | 举例 |
| --- | --- | --- | --- |
| **S** | 70% 精力 | 能手写 + 能讲清取舍 + 项目里真实用过 | LLM API · Tool Calling · 手写 Agent Loop · RAG · Context Engineering · State/Workflow · Evaluation · Observability · Security · MCP · Coding Agent |
| **A** | 20% | 能熟练使用 + 能讲清它解决什么问题 | Browser/Computer Use · Agent Framework · Memory · Multi-Agent · Skills/AGENTS.md |
| **B** | 10% | 技术讨论中不露怯聊两分钟 | A2A · Dify · Python Agent · Transformer 深入 · LoRA |
| **C** | 0% | 知道是什么、知道和自己无关 | CUDA · 从零训练 LLM |

这条分级反「平均用力」——24 个模块如果每个花一样时间，最后哪个都没学透。我自己学的时候，模块 07（手写 Agent）花了一周，模块 13（框架）只花了一个晚上——权重差就来自 S 和 A 的分配。

---

## 怎么跑

```bash
# Node ≥22；apps/.nvmrc 推荐 22
cd apps
nvm use
yarn install
cp .env.example .env
# 编辑 apps/.env：填 MINIMAX_API_KEY

# 模块 00 mini-app（三入口）
yarn app:00-01-mini-cli-a          # CLI 协议 A（流式 OpenAI Chat Completions）
yarn app:00-01-mini-cli-b          # CLI 协议 B（对照 Anthropic Messages）
yarn app:00-01-mini-server         # HTTP + SSE + 浏览器聊天页（http://127.0.0.1:3000/）

# 其它入口（按 docs/学习模块/README.md 里的小节）
yarn app:01-02-token               # 例：模块 01 · Token
yarn app:02-01-streaming-sse       # 例：模块 02 · Streaming/SSE
```

几个「约定先死」：

- **TS 5 + Node ≥22 + yarn**，不设上限；`apps/package.json` 里 `engines: ">=22"`，`@types/node` ^22。
- **Zod 守门**——外部数据 + 环境变量全部过 Zod 校验，错的进来就拒掉，不让运行时崩。
- **MiniMax / 智谱**做 OpenAI + Anthropic 双协议（同 Key 换 baseURL），Anthropic 官方 SDK 允许在模块 00 mini-app 里**超前**存在（`@anthropic-ai/sdk`），但对照验收要等到模块 02。
- **不预装**智谱专属 SDK / LangChain / 向量库 / Playwright——没学到模块就不装，多装依赖 = 多一份心智负担。
- **不抽共享 npm 包**——`apps/` 各子文件夹互不 import，包括模块 00 mini-app。新建入口时复制 `apps/load-root-env.ts` 即可，不要建 `packages/`。

---

## 陪跑设计：怎么让打开仓库的 AI 自动切到陪跑模式

这是这套仓库**最有意思**的部分，也是让我愿意花一个月写文档的部分。

仓库根有一个 `AGENTS.md`——**不是**给人看的，是给 AI 看的。文件开头第一行：

> 你是 Cursor、Claude Code、Codex，或任何打开本仓库的模型，角色只有一个：**陪跑教练 / 陪跑老师**，不是路过改两行字的助手。

任何 AI 助手打开仓库时会自动读根目录的 `AGENTS.md`，然后切角色。这是 GitHub Copilot / Claude Code 这类工具的「自动契约」机制——它们读 `AGENTS.md` 当系统提示用。

`AGENTS.md` 里写的东西跟普通 README 不一样，它是一份**给 Agent 的陪跑契约**，分章节把每一条规则钉死。下面挑五条最硬的讲。

### 1. 当前小节锁定：对话中途绝不换条

> 当前条 = 该模块小节进度里第一个 ⬜/🔄。一旦本会话认准，整场对话（讲概念、追问、对照旧知识、沉淀）都钉在这一条上，直到走完 `coach next` 才前进。

这条规则是为了一个具体问题：你打开仓库问「Token 是什么」，AI 给你讲得很透；但你接着问「RAG 怎么搞」，它就立刻扔掉 Token 把 RAG 整节讲完。**学知识不是搜知识**——当前条不换锁，讲到哪是哪。

更狠的是「**学习/维护双模式**」：

- 默认是**学习模式**——任何会话进来只要没点名「进入维护模式 / 改协议 / 改陪跑规则」就走学习。
- 维护模式须**手动指定**或**意图足够明显**（你明确说「改协议」「改陪跑规则」），AI **不会**自动切。
- 你问一个知识点（「Token 怎么算」/「幻觉从哪来」），哪怕聊得再深，也**不**算维护意图——下一句「回到学习」就立刻回来。

### 2. 三条命令：`coach status` / `coach start` / `coach next`

| 命令 | 什么时候 | 做什么 |
| --- | --- | --- |
| `coach status` | 忘了进度、开新会话先看一眼 | 打**五行报告** + **进度四格** + 当前条小节 MD 状态。**到此停**——不要出门包、不要讲课。 |
| `coach start` | 要学当前条、不知道从哪下手 | 先打五行。外部条：**默认**按 §6.2 把当前条讲完 + **本条产出预告**（要不要写 Demo；默认先不落，你说写就写）。出门包**仅**当学习者说「出门包 / 我要出门学」。 |
| `coach next` | 当前条达标，要进下一条 | 先确认小节 MD 已按 §7.2 写过且过关自检覆盖「本条要能讲清」列；外部条还须 §5.2 Demo 判断块；本地产出还需 `{NN}-本地产出.md` + 子文件夹 README 跟上。**不替学习者决定「学完了没」。** |

**五行报告**（`coach status` 和 `coach start` 开头都打，固定模板）：

```text
当前模块：XX 名称
节奏：外部学习 | 本地产出
当前条目：该模块 README 小节进度该行重点名
代码落点：apps/{模块}/{小节} | 笔记即可（Demo §5.2）
动作：新建 | 不建目录 | 外部（可 Demo） | 本地产出（验收收口）
```

**进度四格**（`coach status` 紧接五行之后）：

| 格子 | 填什么 |
| --- | --- |
| **上一节** | 当前条**正上方**最近一条 ✅ 的「重点」 |
| **现在学** | 当前条「重点」+「本条要能讲清」（一句话） |
| **下一节** | 当前条正下方下一行「重点」；若是本模块最后一条外部 → 「本地产出」 |
| **本模块进度** | 本模块共几条、已完成几条、当前第几条（例：`2/11`） |

### 3. 出门包 + 完整讲解 + 产出预告

**默认 `coach start` 不出门包**，只讲 §6.2 详解 + 本条产出预告。学习者说「出门包 / 我要出门学 / 问另一套 AI 的提问」时，再按下面整份交付：

1. 网上搜（3~6 组关键词）+ **问另一套 AI 的完整可复制正文**（单独代码块；不能比详解更瘦）；
2. 概念锚点 3~8 句（出门对照清单，不是详解）；
3. 过关自检（对照「本条要能讲清」列，可短）。

出门包里那份「问另一套 AI」的提问必须写**完整约束**——前端转 Agent、中文答、术语留英文；禁止推公式、禁止把后面条目提前讲完、禁止一次写出整个 app；必须覆盖当前条学习要求（「本条要能讲清」列每一项 + 是什么/为什么/易混 + 每个核心对象至少 1 个通俗例子）。**学习者应能全选代码块、粘贴到另一套 AI 直接用。**

讲概念本身另有 §6.2 硬标准：

> 要求**广度、深度、完整**。把当前要讲的这块讲清楚：是什么、为什么、易混、例子、数据怎么走。**不怕内容长，不怕讲得更多。** 不允许说不清楚、少说、漏说、用提纲交差。每个核心对象至少 **1 个**能演一遍「数据怎么走」的生活或前端例子；缺例子 = 没讲完。

这条是为了一个具体教训：Token / Context / Transformer 这类对前端学习者并不好懂。如果 AI 只给定义，学习者合上文件就忘了；必须给「3 个 token 在你浏览器里跑一圈」这种看得见摸得着的例子。

讲完当前条必须明确告诉学习者「本条要不要写 Demo？要不要回填项目？」——这叫**本条产出预告**：

```text
本条产出预告（默认讲完先不落；你说写就立刻写 Demo）
- Demo：无 | 伪代码 | 可运行
  你学完要：不写 Demo | 落 apps/{模块}/{小节}/，入口 yarn app:{模块两位}-{小节两位}-{短名}
  理由：{一句话，对照「本条要能讲清」}
```

Demo 判断当场判完（§5.2），禁止只说「后面会判断」。**说写就立刻写**——这是硬规则，不接受「等沉淀完再写」。

### 4. 沉淀流程：学习者不手打笔记

每次讲完当前条，学习者说「**沉淀文档**」/「沉淀」/「写回当前条」时，AI 按 §6.3 **先定位小节**（默认 = 当前条，不是对话里最近提到的旧节）→ 判**首次 / 增量**（增量要先打差异块再合并）→ 按 §7.0 扩写 + §7.2 九节模板落盘。

九节模板（金标准是模块 01 前四篇，结构是固定的）：

1. **是什么** — 一句话说清
2. **为什么** — 重要在哪，1~3 个现在会踩的后果
3. **易混点** — 该条自己的易混对比（如能力边界 vs 幻觉 vs Context 上限）
4. **例子** — 数据怎么走（生活或前端例子，**每个核心对象至少 1 个**）
5. **我追问过的** — 学习者实际问过的有用部分（**只减不加**）
6. **取舍** — 选这条路的好处 + 痛的地方 + 设计里已经挡掉的机制
7. **踩坑** — 真实踩过的，不是想象中的
8. **过关自检** — 对照「本条要能讲清」列，能复述即过
9. **还没搞懂的** — 学习者自评

学习者**不手打**笔记正文——学习者最后一行回复「去掉 X」就删掉 X，其余默认保留。**不替学习者验收「够了吗」**——对照「本条要能讲清」 + §7.0 自判，问「够了吗」是被禁止的。

### 5. 概念讲解必带通俗例子 + 不要把陪跑动作漏给外行

每个核心对象至少 1 个能演一遍「数据怎么走」的生活或前端例子，**禁止**整篇一个总类比打发。每个例子的「比喻里的数字不能硬凑、不能写死」（这条是我被学习者抓到过坑后加的）：讲 5 人圆桌会议就是 5 人，不为了画面热闹硬把 3 token 写成 5 人——学习者会把比喻数字当机制参数问，走偏到机制层。

不在陪跑范围里的事——比如「今天天气 / 帮我看下 git status / jsDelivr 是什么 / review 报错」——**先正常回答**；**只有**真正影响陪跑流程的动作（擅自勾进度 / 替用户 commit / 推进度到下一条 / 改其它用户数据）才拒绝。

---

## 一些设计上我反复改过的细节

下面这几条不是规范，是真实踩过的坑。

### 不抽共享包 / 不上 monorepo

第一版我抽了一个 `packages/shared-types/` 放通用 TypeScript 类型，五个项目都引用。后来发现**项目互相 import 是反模式**——你说项目 2 是独立的，结果它要靠项目 1 才能跑。删掉共享包后，`apps/` 下每个子文件夹真正变成「互不依赖」，删除任意一个其它照样跑。

yarn workspaces / pnpm workspaces 一开始看着很美（统一 `node_modules`、统一 TypeScript），后来发现它把项目边界模糊化了——`apps/01-AI与LLM基础认知/02-Token/` 不再是「能给别人独立 clone 下来跑」的项目，而是「仓库里的一部分」。每个 app 自己 `package.json` + 自己 `yarn install`，反而清晰。

### 笔记写在 `docs/学习模块/`，不写在 `apps/`

`apps/{模块}/{小节}/README.md` 只写怎么跑、当前能做什么、对应哪一条笔记（**没有 LEARNING.md**）。**概念笔记写在 `docs/学习模块/0X-.../{NN}-{name}.md`**。

为什么？因为概念笔记**和代码不同步**——学到模块 04 时我对 Zod 的理解可能还幼稚，到模块 19 时回头看模块 04 会觉得「当时写得不对」。如果笔记写在 `apps/01-.../02-Token/README.md` 里，会污染「现在怎么跑」的当前地图。分开写，让两边各管各的：子文件夹 README 是「现在的代码长什么样」，小节 MD 是「当时我理解这个概念是什么样」。

### 不做框架驱动学习

`docs/03-学习路线.md` §2.6.2 里专门写了一节「不要框架驱动学习」：

> 看到 LangChain → LangGraph → Mastra → Vercel AI SDK → MCP，很容易变成「今天学框架、明天学新框架」，最后：**会 5 个框架，但是不会写 Agent**。
>
> **第一遍完全手写**（Node + TS + LLM API + Zod）：`LLM → Tool Call → 执行 → Result → LLM → … → Final Answer`。
>
> **第二遍再用框架。** 你会发现 LangGraph 的 State / Node / Edge / Checkpoint，就是你手写过的东西被抽象起来了。

这条对我影响很大。第一遍学的时候我**没**用 LangGraph 写 Agent Loop，自己写了 200 行循环函数（ReAct、停止条件、错误恢复、最大迭代）。等我第二遍用 LangGraph 重写的时候，**30 秒就懂了 State Graph 是什么**——因为我自己实现过。

如果你跳过第一遍直接上框架，等于把自己学 Agent 的最核心体验给跳过了。

### 编号不要混

`docs/01-使用协议.md`（顶层第 1 篇）和**模块 01（AI & LLM 基础认知）**是两个东西。这条在 README 里专门高亮：「说『01』时写全名或写路径。」看起来很基础，但真学起来很容易混——我自己在第三个模块就指错过一次，AI 也跟着错，最后才加上这条。

### 「apps/ 子文件夹之间互不 import」是死规矩

跨模块 / 跨小节的复用冲动是真的：模块 02 写完 Token 计数想拿去模块 05 用，模块 05 写完 Tool Registry 想拿去模块 07 用——**忍住**。互不 import 是为了让每个子文件夹「删了不影响其它」，这条规矩前两版仓库我都没坚持住，第三版才钉死。

### AGENTS.md 自己也要被改

仓库里有一条硬规矩：「**AGENTS.md 是给 Agent 的陪跑契约**」。它不是只读文档——踩过的坑会写回去，新加的约束也会写进去。但**改动它本身需要学习者授权**——AI 默认不在陪跑过程中改 `AGENTS.md`（那是维护模式的事）。

---

## 进度 & 怎么参与 / 围观

### 当前进度（2026-09-01）

| 模块 | 外部 | 本地 |
| --- | --- | --- |
| 00 环境准备 | ✅ | ✅ |
| 01 AI & LLM 基础认知 | ✅ | ✅ |
| 02 LLM API 开发 | ✅ | ✅ |
| 03 ~ 23 | ⬜ | ⬜ |

完整 24 模块进度表见 `docs/06-学习总览.md`。

### 怎么开始

- **GitHub 仓库**：[github.com/8696/ai-agents-learning](https://github.com/8696/ai-agents-learning)
- **配套可读站点**：[http://icode.link/ai-agents-learning/index.html](http://icode.link/ai-agents-learning/index.html)（一个双源阅读器，本地 fetch `./<path>` 或远程 fetch `raw.githubusercontent.com/8696/ai-agents-learning/refs/heads/master/<path>`，二选一不复制）
- **怎么开始**：`git clone` 下来，用 Cursor / Claude Code / Codex / Hermes 打开，对助手说 `coach start` 就行。它会自动读 `AGENTS.md` 切到陪跑模式，找到当前条，给你讲第一条。

如果你是 Agent 开发老手，可以直接看 `docs/06-学习总览.md` 的 24 模块主表 + S/A/B/C 能力分级，按你自己需要的档位挑着学；如果你是前端转 Agent，强烈建议按 `coach start` 从模块 00 开始走。

---

## 最后

搭这个仓库的一个隐性收获是：我发现**「设计一个让 AI 愿意遵守的仓库」比「学 Agent 本身」更有意思**。

`AGENTS.md` 里每一条规则都是我踩过坑后加的——当前条锁定是为了不被新会话带跑；学习/维护双模式是为了不让 AI 替我决定协议；出门包 + 产出预告是为了不让「讲概念」变成「念 PPT」；Demo 当场判断是为了不让「回填项目」变成无限期拖延。这些约束加起来，AI 助手的行为就从「过路客」变成「陪跑老师」。

我还会继续学下去，也会继续改 `AGENTS.md` 和文档。如果你也在搭类似的学习陪跑仓库，欢迎交流——尤其是你怎么处理「**学习者换 AI 工具后进度怎么续**」这个问题，我现在还没想清楚。

—— 上一版我把仓库写成「docs + 5 个 apps + demos」三段式，那只是开搭时的设想。这一版按跑了两个月的真实架构重写：代码落点收敛到 `apps/` 一个根，没有平行 mini-app、也没有单独的 demos。如果你看到的是更老的版本，欢迎来 GitHub 提 Issue。
