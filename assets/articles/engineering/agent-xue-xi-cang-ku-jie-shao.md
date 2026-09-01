# 我搭了一套 23 个模块的 AI Agent 学习仓库：架构、内容与陪跑设计

> 这是一篇「仓库介绍文」。讲我最近在做的项目 `8696/ai-agents-learning`：为什么做、怎么组织、24 个模块覆盖哪些知识、五个实战项目长什么样，以及它怎么被设计成一个 AI 陪跑仓库——打开它，对面的 Cursor / Claude Code / Codex 会自动切换成「陪跑老师」模式，跟着我一条一条地讲清楚。
>
> 文末给了 GitHub 链接和我现在的进度。想直接看仓库的可以跳到最后。

## 起因

做这仓库的契机其实挺俗的：我想正经学一遍 AI Agent 开发，不是看两篇文章那种「懂了个大概」，是能自己设计、实现、评测、部署一个生产级 Agent 出来。

但打开 Claude / ChatGPT 学了一圈后我很快发现三个问题：

1. **教程是碎片化的**。一篇讲 Tool Calling、一篇讲 RAG、一篇讲 Multi-Agent，但没有人告诉我**先学什么后学什么**、**学到什么程度算过**。我每次都靠脑补排序，学到第二个模块就忘了第一个。
2. **代码是看不完的**。GitHub 上 Agent 项目很多，但大部分是「跑起来就好」的 demo。我看不出哪些能力是必须手写的、哪些是可以用框架替代的——直到真要用的时候才发现少了某一块。
3. **AI 助手是过路客**。我让 Cursor 给我讲 Tool Calling，它讲得挺好；等我下次新开对话，Cursor 就完全不知道我学到哪了、之前问过什么、卡在哪。陪跑不是「这一轮讲清楚」，是「陪着我把整条路线走完」。

第三个问题尤其让我难受。我不缺能讲清楚的 AI，缺的是一个**有进度感**的 AI——它知道我现在卡在模块 02 的 SSE 那一节，知道我上一轮问过 AbortController，知道我下次打开不用再说一遍背景。

所以我决定：**自己搭一个仓库，把文档、代码、进度、陪跑契约全放在一起，让任何打开它的 AI 助手自动切到陪跑模式。**

这个仓库就是 `8696/ai-agents-learning`。

---

## 仓库结构：为什么是「docs + 5 个 apps」而不是别的

打开仓库你只会看到三类东西：

```
ai-agents-learning/
├── docs/              ← 学习文档（24 模块 + 路线 + 题库）
├── apps/              ← 最多 5 个实战项目（互不依赖）
└── demos/             ← 外部小节的可运行小样例（和 5 个项目隔离）
```

没有 monorepo，没有共享包，每个 `apps/0N-xxx` 自己有 `package.json`。`apps/.nvmrc` / `apps/.env.example` / `apps/tsconfig.base.json` 这三个共用配置放在 `apps/` 下，不放在仓库根——因为仓库根不放业务代码。

为什么是 5 个项目而不是更多？我试过 24 个项目，发现**项目数一多每个都做不厚**，最后五个浅 Demo 远不如一个做透的项目。新能力**回填**进已有项目，不开第 6 个 app——这是这条规矩背后真正的约束。

为什么 `demos/` 单独存在？`apps/` 是要交付的作品，回填是主战场。但学到某些小节时（比如模块 02 的「Streaming vs 非流式」、模块 01 的「Temperature 影响」），我想跑一个可运行的小样例看效果——这种 demo 不属于任何一个作品，又不想污染主项目。所以**小节 Demo 单独放 `demos/`，与 5 个项目、与其他小节互相不引用**。这条边界很硬，AGENTS.md 里专门写了一段「禁止把 demo 升级成新项目，也禁止用它们跳过本地回填」。

---

## 24 个模块覆盖什么

`docs/学习模块/` 下是 24 个模块（编号 00–23），一模块一文件夹，每模块一个小节进度表 + 多个小节笔记（笔记由 AI 写，我不手打）。

模块分布大致是按「**能力栈深度**」排列的，不是按热度：

```
① LLM 基础         00 环境准备 + 01 Token/Context/Transformer/Embedding
② LLM Application  02 API · 03 Prompt · 04 Structured Output · 06 多轮对话
③ Agent 核心       05 Tool Calling · 07 手写 Agent Loop · 10 Memory · 11 State/Workflow
④ 知识与扩展       08–09 RAG（基础+进阶）· 12 MCP
⑤ 框架化           13 AI SDK / LangGraph / Mastra + Dify 体验
⑥ 高级             14 Multi-Agent · 15 Browser · 16 Coding Agent
⑦ 生产化           17 Evaluation · 18 Observability · 19 可靠性/成本/性能 · 20 Security
⑧ 全栈与收口       21 后端 · 22 AI 全栈产品化 · 23 Production Architecture
```

每个模块的 README 里有一张「小节进度」表，从上到下勾：先外部（概念 + 出场包 + 写笔记），最后一行是「本地产出」（对照 README 验收 + 写 `{NN}-本地产出.md`，有代码就更新 `apps/0N/LEARNING.md`）。

这条节奏是为了一个目的：**让学习者是按模块过完的，不是按章节攒知识点的**。每个模块走完都能交付一个具体产出（一个概念笔记、几行代码、一个 demo），而不是看了十篇教程依然不知道「我到底走到哪了」。

`docs/03-学习路线.md` 里有一张「24 模块主表」，把每个模块的「需要学习的内容 / 学习重点 / 实战产出 / 优先级」都列了。例如模块 08 RAG 基础那一行：

> **学习重点**：让 Agent 能使用外部知识
> **实战产出**：Markdown/PDF → Chunk → Embedding → Vector DB → Retrieval → LLM，并把检索封装成 Tool
> **优先级**：⭐⭐⭐⭐⭐

`docs/02-怎么用.md` 给默认选型：TypeScript 5 + Node.js ≥22 + yarn，模型用 MiniMax（OpenAI + Anthropic 双协议），智谱 + Anthropic 官方放后面做对照。我在国内，MiniMax 同 Key 换 Base URL 跑 OpenAI 和 Anthropic 两套协议，调试特别省事。

### 「能力分级」是另一个值得讲的设计

仓库里把所有 Agent 能力分成 **S / A / B / C 四档**，每档给一个投入比例：

| 档位 | 投入策略 | 掌握标准 | 举例 |
| --- | --- | --- | --- |
| **S** | 70% 精力 | 能手写 + 能讲清取舍 + 项目里真实用过 | LLM API · Tool Calling · 手写 Agent Loop · RAG · Context Engineering · State/Workflow · Evaluation · Observability · Security · MCP · Coding Agent |
| **A** | 20% | 能熟练使用 + 能讲清它解决什么问题 | Browser/Computer Use · Agent Framework · Memory · Multi-Agent · Skills/AGENTS.md |
| **B** | 10% | 技术讨论中不露怯聊两分钟 | A2A · Dify · Python Agent · Transformer 深入 · LoRA |
| **C** | 0% | 知道是什么、和自己无关即可 | CUDA · 从零训练 LLM |

这条分级写在 `docs/03-学习路线.md` §2.6.1。它的作用是反「平均用力」——很多教程会让你觉得「啥都重要、啥都得学」，但 24 个模块如果每个花一样时间，最后哪个都没学透。

我自己学的时候，模块 07（手写 Agent）花了一周，模块 13（框架）只花了一个晚上——这俩权重差就来自 S 和 A 的分配。

---

## 五个项目长什么样

`apps/` 下固定五个项目，按难度递进，每个项目都不是「调一次模型就结束」的 demo：

| # | 项目 | 路径 | 关键模块 | 它要解决的问题 |
| - | --- | --- | --- | --- |
| **1** | **ChatGPT Mini** | `apps/01-chatgpt-mini` | 00、02、03、04、06 + 22 最简 UI | 跑通一条「发消息 → 流式回复」的完整链路，包括 SSE、Zod 校验、多轮对话、Token 用量统计、429/超时处理。**第一家模型 + 一种协议**，先把骨架立住。 |
| **2** | **Tool Agent** | `apps/02-tool-agent` | 05、07，回填 10、11 手写 | 自己从零写 Agent Loop：Reason → Act → Observe，无框架。Tool Registry + 3–4 个 Tool 完整调用闭环，至少一个 Tool 幂等，杀掉进程能 resume 且不重复有副作用的 Tool。 |
| **3** | **Knowledge Agent** | `apps/03-knowledge-agent` | 08、09，回填 17、18 | Markdown/PDF → Chunk → Embedding → 向量检索 → 注入 Prompt；Hybrid Search + Rerank + Query Rewrite + 引用；≥20 条 RAG 评测集 + Golden Dataset + 自动评测（一条命令出 ship/no-ship）。 |
| **4** | **Research Agent** | `apps/04-research-agent` | 11 框架态、12、13、14，回填 19、21 | 自己写的 MCP Server（≥2 Tool + 1 Resource）被 Agent 当 Client 调通；HTTP 形态 + 最简鉴权；用 Vercel AI SDK / LangGraph.js 重构有状态 Workflow；Researcher + Writer + Reviewer。 |
| **5** | **Coding Agent** | `apps/05-coding-agent` | 15、16、20，回填 22、23 | Playwright 基础 Tool + Accessibility Tree；读/改文件 + 受限 Shell + Git + Sandbox + 危险操作 HITL；一份约束 Agent 行为的 AGENTS.md / SKILL.md；完整 Security Audit。 |

每个项目的**交付标准**是同一套（`docs/03-学习路线.md` §2.7.2）：

- **README** — 打开就能看懂做什么、怎么跑、数据流、技术选型与不选另一种方案的理由；按文档能跑通。
- **架构图** — 图画的模块和仓库里的目录对得上。
- **能讲清** — 不看资料能讲完一次真实输入怎么变成最终输出。
- **能复盘** — 每个项目能写出「最难的三处、怎么处理的、若重做改哪三处」。
- **学习总览对应格子** — 知识库类还要有评测报告，能执行真实操作的还要有安全审计。
- **能不能合进主线** — 用模块 17 的数字决定，不凭感觉。

这条标准我抄过几次，但每次抄都加深一层理解：**写代码不是目的，能讲清楚才是**。等五个项目都做完了，我可以不查资料把 Token → Tool Call → Agent Loop → RAG → MCP 串起来讲一遍——这才是真正「过完」。

现在五个项目的实际状态：项目 1 ChatGPT Mini 已经做出来（流式 + Zod + HTTP + SSE + 浏览器聊天 UI 都有了），其它四个还是空目录等学到对应模块再建。这不是偷懒——AGENTS.md 明文禁止「提前建空的 apps/0N-*」。

---

## 陪跑设计：怎么让打开仓库的 AI 自动切到陪跑模式

这是这套仓库**最有意思**的部分，也是让我愿意花一个月写文档的部分。

仓库根有一个 `AGENTS.md`——**不是**给人看的，是给 AI 看的。文件开头第一行：

> 你打开本仓库的角色只有一个：**陪跑教练 / 陪跑老师**，不是路过改两行字的助手。

任何 AI 助手（Cursor / Claude Code / Codex / Hermes）打开仓库时会自动读根目录的 AGENTS.md，然后切角色。这是 GitHub Copilot 和 Claude Code 这类工具的「自动契约」机制——它们读 `AGENTS.md` 当系统提示用。

`AGENTS.md` 里写的东西跟普通 README 不一样，它包含：

### 1. 进度识别与锁死

> **当前条** = 该模块小节进度里第一个 ⬜/🔄。一旦本会话认准，整场对话都钉在这一条上，直到走完 `coach next` 才前进。

这条规则是为了解决一个具体问题：你打开仓库问「Token 是什么」，AI 给你讲得很透；但你接着问「RAG 怎么搞」，它就立刻扔掉 Token 把 RAG 整节讲完。**学知识不是搜知识**——当前条不换锁，讲到哪是哪。

### 2. 学习 / 维护双模式

> 默认是**学习模式**。维护模式须学习者**手动指定**或**意图足够明显**（「改陪跑」「改协议」「改学习流程」），不自动切。

这条是为了防止另一类问题：你学累了想「这节课暂停一下，让 AI 帮我把这个 repo 改下结构」，AI 立刻说「好的，进入维护模式，把 24 模块合并成 6 模块」——它不知道你想暂停的是**学习**本身，不是**协议**。

### 3. 出门包 + 完整讲解 + 产出预告

每次 `coach start` 讲当前条前，必须先出**出门包**（一段可复制去问另一套 AI 的提问代码块）+ **概念锚点 3~8 句** + **完整详解**。讲完必须明确告诉学习者：「本条要不要写 demo？要不要回填项目？」——默认先不落，你说写就写。

这条「讲概念不许提纲交差、必须讲透」是仓库最硬的规则之一，原文：

> 要求**广度、深度、完整**。把当前要讲的这块讲清楚：是什么、为什么、易混、例子、数据怎么走。**不怕内容长，不怕讲得更多。** 不允许说不清楚、少说、漏说、用提纲交差。

### 4. 沉淀流程

每次讲完当前条，学习者说「沉淀文档」或「写回小节 MD」时，AI 先**定位小节**（当前条 = 进度表第一个 ⬜/🔄，不是对话里最近提到的旧节），再判定**首次沉淀**还是**增量更新**（增量要先打差异块再合并），然后写文件。

这条是为了让学习者**只减不加**：学习者不手打笔记正文，无论知识点是从哪学的（网上、Claude、Codex、本对话），都按模板写成「能给前端小白复习用的教学笔记」。学习者最后一行回复「去掉 X」就删掉 X，其余默认保留。

### 5. 概念讲解必带通俗例子

每个核心对象至少 1 个能演一遍「数据怎么走」的生活或前端例子，不能只给定义、术语表或提纲。

这条是为了一个具体教训：Token / Context / Transformer 这类对前端学习者并不好懂。如果 AI 只给定义，学习者合上文件就忘了；必须给「3 个 token 在你浏览器里跑一圈」这种看得见摸得着的例子。

---

## 一些设计上我反复改过的细节

下面这几条不是规范，是真实踩过的坑。

### 不抽共享包

第一版我抽了一个 `packages/shared-types/` 放通用 TypeScript 类型，五个项目都引用。后来发现**项目互相 import 是反模式**——你说项目 2 是独立的，结果它要靠项目 1 才能跑。删掉共享包后，五个项目真正变成「互不依赖」，你删除任意一个其它四个照样跑。

### 不上 monorepo

yarn workspaces / pnpm workspaces 一开始看着很美（统一 `node_modules`、统一 TypeScript），后来发现它把项目边界模糊化了——`apps/01-chatgpt-mini` 不再是一个「能给别人独立 clone 下来跑」的项目，而是「仓库里的一部分」。每个 app 自己 `package.json` + 自己 `yarn install`，反而清晰。

### 笔记写在 `docs/学习模块/`，不写在项目里

项目里有 `LEARNING.md`（当前代码地图，行号随代码改），但**概念笔记写在 `docs/学习模块/0X-.../{NN}-{name}.md`**。

为什么？因为概念笔记**和代码不同步**——学到模块 04 时我对 Zod 的理解可能还幼稚，到模块 19 时回头看模块 04 会觉得「当时写得不对」。如果笔记写在 `apps/01-chatgpt-mini/LEARNING.md` 里，会污染「现在怎么跑」的当前地图。分开写，让两边各管各的：项目 LEARNING 是「现在的代码长什么样」，小节 MD 是「当时我理解这个概念是什么样」。

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

`docs/01-使用协议.md`（文档第 1 篇）和**模块 01（AI & LLM 基础认知）**是两个东西。这条在 README 里专门高亮：「说『01』时写全名或写路径。」看起来很基础，但真学起来很容易混——我自己在第三个模块就指错过一次，AI 也跟着错，最后才加上这条。

---

### 怎么参与 / 围观

- **GitHub 仓库**：[github.com/8696/ai-agents-learning](https://github.com/8696/ai-agents-learning)
- **配套可读站点**：[http://icode.link/ai-agents-learning/index.html](http://icode.link/ai-agents-learning/index.html)（一个双源阅读器，本地 fetch `./<path>` 或远程 fetch `raw.githubusercontent.com/8696/ai-agents-learning/refs/heads/master/<path>`，二选一不复制）
- **怎么开始**：`git clone` 下来，用 Cursor / Claude Code / Codex 打开，对助手说 `coach start` 就行。它会自动读 `AGENTS.md` 切到陪跑模式，找到当前条，给你讲第一条。

如果你是 Agent 开发老手，可以直接看 `docs/03-学习路线.md` 的 24 模块主表 + S/A/B/C 能力分级，按你自己需要的档位挑着学；如果你是前端转 Agent，强烈建议按 `coach start` 从模块 00 开始走。

---

## 最后

搭这个仓库的一个隐性收获是：我发现**「设计一个让 AI 愿意遵守的仓库」比「学 Agent 本身」更有意思**。

AGENTS.md 里每一条规则都是我踩过坑后加的——进度锁死是为了不被新会话带跑；学习/维护双模式是为了不让 AI 替我决定协议；出门包 + 产出预告是为了不让「讲概念」变成「念 PPT」。这些约束加起来，AI 助手的行为就从「过路客」变成「陪跑老师」。

我还会继续学下去，也会继续改 `AGENTS.md` 和文档。如果你也在搭类似的学习陪跑仓库，欢迎交流——尤其是你怎么处理「学习者换 AI 工具后进度怎么续」这个问题，我现在还没想清楚。
