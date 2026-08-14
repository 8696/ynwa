# YNWA

无构建步骤的个人博客 SPA。浏览器直接吃 HTML / CSS / JSX，运行时库全部来自 jsDelivr UMD。

YNWA 取自利物浦队歌 *You'll Never Walk Alone*。

线上预览：[http://www.icode.link/](http://www.icode.link/)

改功能或发文章请先读 [`AGENTS.md`](AGENTS.md)。本文件讲架构和内容约定。注意：当前有一篇文章的 `file` 指向本文件 `/README.md`，改这里等于改那篇正文。

站点按静态文件部署（OSS / 任意静态托管），因此刻意不做这些事：

- 没有打包器、没有 `node_modules`、没有构建产物
- React 19 / React Router 7 没有浏览器 UMD，运行时钉在 React 18.3.1 + RR 6.30.1
- 所有站内资源用根绝对路径（`/assets/...`），避免 `/article/:id` 把相对 URL 解析错
- 脚本顺序写死在 `index.html`，调换即挂

---

## 本地预览

必须走 HTTP：`file://` 加载不了 Babel 的 `src` 脚本，也 `fetch` 不了 `db.json`。

```bash
npx --yes serve -s . -l 3000
```

`serve -s` 把未知路径回退到 `index.html`，这是 `BrowserRouter` 能刷新内页（例如 `/article/:id`）的前提。

开发时改 `db.json` 立刻生效：本机 `localhost` / `127.0.0.1` 永远拉最新，不走 localStorage 缓存。生产环境强制刷新见下方「缓存」。

---

## 目录

```
.
├── index.html                 入口：CDN 库 + 站点脚本顺序
├── README.md                  架构与内容约定（亦是一篇已发布文章的正文）
├── AGENTS.md                  给 Agent 的改功能 / 发文章手册
├── assets/
│   ├── css/style.css          全站样式；强调色变量由 themes.js 写入
│   ├── data/db.json           全站内容索引（导航 / 分类 / 标签 / 文章 / 作品）
│   ├── articles/              Markdown 正文；路径写在 articles[].file
│   └── js/
│       ├── themes.js          强调色调色板；须在 style.css 前加载
│       ├── config.js          站点身份、缓存键、页脚（无 JSX）
│       ├── utils.js           纯函数（无 JSX）
│       ├── db-context.js      唯一数据入口 + 缓存
│       ├── components.js      Header / 卡片 / 作品集 / 关于 / 联系 / 分页
│       ├── pages.js           路由页面
│       └── app.js             壳：路由表、滚动、挂载
└── ai-page/                   独立静态作品页（同域部署，不进本仓库、不进 React 树）
```

`ai-page/<目录>/index.html` 是完整 HTML 页，点作品卡会新窗口打开。本仓库不收这些文件，但 `db.json` 的 `works[].href` 必须指向它们实际部署后的路径。

---

## 运行时引导

```
index.html
  ├─ themes.js（head）：随机抽一组主题，把 --accent 等写到 <html>
  ├─ highlight.js CSS → style.css     （主题脚本必须在这之前）
  ├─ CDN UMD：React → ReactDOM → Remix Router → react-router → react-router-dom
  ├─ CDN UMD：marked / DOMPurify / highlight.js / Babel Standalone
  ├─ 经典脚本：config.js → utils.js          （无 JSX，注入全局）
  └─ Babel 脚本：db-context → components → pages → app
```

脚本分层不能混：

| 层 | 加载方式 | 为什么 |
| --- | --- | --- |
| `themes.js` | 普通 `<script>`，且在 `style.css` 之前 | 先写强调色变量，避免首屏闪默认黄 |
| `config.js` / `utils.js` | 普通 `<script>` | 常量与纯函数先挂到 `window`，后面的 JSX 文件直接当全局用 |
| `db-context.js` 起 | `type="text/babel" data-presets="react"` | 浏览器内编译 JSX；`data-presets="react"` 避免再套 env |
| `app.js` | 最后执行 | 依赖前面所有全局函数已存在，再 `createRoot` 挂载 |

CDN 版本钉在 URL 上，不走「最新」。highlight.js 主题 stylesheet 必须先于 `style.css`，否则 `.markdown-body` 盖不住代码块背景。

整页加载时抽一次主题；SPA 的 `Link` 不重载文档，主题保持到下次刷新。调色板只在 `themes.js` 里维护（含 `--on-accent` / `--on-accent-2`），该脚本必须在 `style.css` 之前加载；`:root` 只作脚本失败时的黄底兜底。

---

## 分层

```
┌─────────────────────────────────────────────┐
│  app.js          壳：路由表、滚动、挂载      │
├─────────────────────────────────────────────┤
│  pages.js        路由页面（读 db + URL）     │
│  components.js   可复用块（Header / 卡片 /  │
│                  作品集 / 关于 / 联系 / 分页）│
├─────────────────────────────────────────────┤
│  db-context.js   唯一数据入口 + 缓存策略     │
├─────────────────────────────────────────────┤
│  utils.js        纯函数，无 React            │
│  config.js       运行时常量                  │
│  themes.js       强调色（CSS 前执行）        │
└─────────────────────────────────────────────┘
```

调用方向只允许从上往下。页面不直接 `fetch` `db.json`；卡片不自己拼资源 URL，一律走 `resolvePublicAssetUrl`。

组件树：

```
StrictMode
  BrowserRouter
    DBProvider          ← 必须在 Router 内，才能读 ?nocache=
      App
        Header
        Routes          ← Home / Article / Category / Tag / Search / Works / *
        WorksSection    ┐
        AboutSection    ├ 仅 pathname === '/'
        ContactCta      ┘
        Footer
```

首页区块不塞进 `Home`，是因为它们在路由出口之外：列表分页只影响 `#main`，作品集 / 关于 / 联系始终贴在列表下面。

---

## 数据从哪来

职责拆开，避免把正文塞进索引；强调色也不进内容库。

```
themes.js          强调色调色板（须在 style.css 前加载）
config.js          站点身份、关于区、缓存键、页脚、「更多」卡文案
     │
db.json            nav / categories / tags / articles / works
     │  DBProvider 一次加载，Context 下发
     ▼
Markdown           articles[].file 指向的正文；进入详情才 fetch
```

| 源 | 形态 | 何时读 |
| --- | --- | --- |
| `themes.js` | 经典脚本，写 CSS 变量 | `style.css` 之前；失败则沿用 `:root` 默认黄 |
| `config.js` | 全局变量 | 脚本加载时立刻生效（含改 `<title>` / meta description） |
| `db.json` | 一份 JSON 索引 | 应用启动时由 `DBProvider` 拉一次，列表 / 导航 / 搜索 / 作品都吃这份内存 |
| Markdown | 独立文件 | `/article/:id` 按 `post.file` 再请求；不进索引、不进 localStorage |

`db.json` 进内存后按 `date` 倒序。分类 / 标签页是对这份数组的过滤；搜索只扫 `title` 和 `summary`，不打开正文。

---

## `db.json`：全站内容索引

路径：`/assets/data/db.json`（常量 `DB_URL`）。这是站点的**唯一内容数据库**：顶栏栏目、分类页、标签页、文章列表、搜索、作品集全部读它。改内容几乎只改这一份文件 + 对应 Markdown / 静态页。

顶层五个数组，缺一不可（可以是空数组 `[]`，不要删键）：

```json
{
  "nav": [],
  "categories": [],
  "tags": [],
  "articles": [],
  "works": []
}
```

页面通过 `useDB()` 拿到整份对象。加载失败时各页走 `DbState`（加载中 / 错误 + 重试），不会永远停在空白。

### 关系一览

```
nav[].value
  ├─ /category/{categories[].id}     顶栏栏目 → 分类页
  ├─ /works                          作品集页（读 works[]）
  ├─ #about / #contact               回首页滚锚点（文案在 config.js）
  └─ https://… 或 target=_blank      外链

categories[].id  ←── articles[].categories[]     一篇文可挂多个分类
tags[].id        ←── articles[].tags[]           一篇文可挂多个标签
articles[].id        路由 /article/:id 只认这个 UUID
articles[].file      详情页再 fetch 的 Markdown 路径
works[].href         独立静态页或 SPA 内路径
```

`categories` / `tags` 是词典：文章只存 **id 字符串**。展示名、描述一律从词典解析；词典里找不到时，UI 用原始 id 当文案，避免空白，但分类页 / 标签页会显示「不存在」。

---

### `nav[]`：顶栏栏目

「首页」和搜索是顶栏写死的，**不要**写进 `nav`。数组顺序 = 顶栏从左到右的顺序。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `label` | string | 是 | 按钮文案。空则该项不渲染 |
| `value` | string | 是 | 地址本身，没有单独的 `type`。空则该项不渲染 |
| `target` | string | 否 | 只有 `"_blank"` 有意义：强制当外链，新窗口打开并补 `rel` |

`value` 按前缀分发：

| `value` 形态 | 行为 | 例子 |
| --- | --- | --- |
| 以 `#` 开头 | 回到 `/` 再滚到对应 `id`（跨页也能用） | `"#about"`、`"#contact"`、`"#works"` |
| 以 `http` 开头 | 原生 `<a>`，站外 | `"https://github.com/you"` |
| `target` 为 `_blank` | 同样走原生 `<a>`（`Link` 会拦点击） | 任意站内路径想新窗口时 |
| 其余以 `/` 开头 | React Router `Link` | `"/category/AI"`、`"/works"` |

高亮规则：

- 站内路径与当前 `pathname` 精确相等才亮
- 文章详情页映射到**该文第一个分类**的 `/category/:id`，与 nav 里写的分类路径对齐
- `db` 未就绪时不高亮，避免先闪「首页」

联系区 / 页脚的 GitHub 按钮不是第二份配置：从 `nav` 里找 `label === "GitHub"`（大小写不敏感）或 `value` 含 `github.com` 的项。找不到就不渲染。当前这份 `db.json` 没有 GitHub 项，所以页脚和联系区只出邮箱。

锚点区块只挂在首页：`#articles`（文章列表）、`#works`（作品集）、`#about`、`#contact`。

---

### `categories[]`：分类词典

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 稳定标识。出现在 URL：`/category/{id}`。文章的 `categories` 数组存的就是它 |
| `name` | string | 是 | 顶栏、卡片 chip、分类页标题用的展示名 |
| `description` | string | 否 | 分类页副标题。空则不显示 |

约束与习惯：

- `id` 一旦被文章引用就不要改；改了旧链接、nav 里的 `/category/...` 都要一起改
- `id` 可以是英文（`engineering`）或中文（不推荐，URL 会编码），大小写敏感：`AI` 与 `ai` 是两个分类
- 首页 Hero 跑马灯会拼上所有 `categories[].name` 和 `tags[].name`

当前词典：

| id | name | 用途 |
| --- | --- | --- |
| `AI` | AI | 围绕 AI 的探索与实践 |
| `engineering` | 技术实践 | 前端工程、性能与开发流程 |
| `writing` | 随便写写 | 想到什么写什么 |
| `life` | 生活记录 | 日常观察、习惯复盘 |

新增分类：在本数组加一条，再在 `nav` 里加 `{ "label": "展示名", "value": "/category/新id", "target": "" }`，然后文章的 `categories` 里写这个 id。

---

### `tags[]`：标签词典

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 稳定标识。URL：`/tag/{id}`。文章 `tags` 数组存它 |
| `name` | string | 是 | 卡片 / 标签页展示名 |
| `description` | string | 否 | 标签页副标题；缺省时页面用「含此标签的文章」 |

没有顶栏入口：标签只出现在文章卡片、详情页、搜索结果里，点进去才到 `/tag/:id`。

当前词典：`AI`、`Hermes-Agent`、`frontend`、`javascript`、`性能优化`、`productivity`、`writing`、`life`、`skill`。

`id` 与 `name` 可以不同（例如 id `Hermes-Agent`、name `Hermes Agent`）。文章必须写 **id**，不要写展示名。

---

### `articles[]`：文章元数据

列表、搜索、分类、标签、详情页的标题区都只读这里。**正文不在 JSON 里**。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 路由主键：`/article/{id}`。必须全局唯一。推荐 UUID，避免用标题拼音（改标题会断链） |
| `title` | string | 是 | 列表标题、详情 `<h1>`、`document.title` |
| `categories` | string[] | 建议 | 分类 **id** 列表，须能在 `categories[]` 里找到。可多选。也兼容历史数据：单个字符串 |
| `tags` | string[] | 否 | 标签 **id** 列表，须能在 `tags[]` 里找到 |
| `date` | string | 是 | 发布时间。加载后按它**倒序**。格式见下 |
| `summary` | string | 强烈建议 | 列表摘要、详情导语、**搜索会扫到的字段**。搜索不打开 Markdown |
| `file` | string | 是 | Markdown 路径或绝对 URL。详情页才 fetch |
| `cover` | string | 否 | 封面图路径或绝对 URL。空字符串 `""` 表示无封面 |

#### `id`

详情页 `db.articles.find(p => p.id === :id)`，找不到就显示「文章不存在」。不要复用已发布过的 id。

#### `date`

`DBProvider` 用 `new Date(date).getTime()` 排序。推荐：

```text
YYYY-MM-DD HH:MM
```

例如 `"2026-08-13 18:39"`。列表上的展示经 `formatDate` 裁到分钟。非法日期会得到浏览器的 `Invalid Date` 文案，排序也会乱，不要留空。

JSON 里的书写顺序无所谓，进内存后一律按日期新→旧。

#### `file`

三种写法：

| 写法 | 结果 |
| --- | --- |
| 站内绝对路径 `"/assets/articles/.../foo.md"` | 从本站拉 |
| 相对路径 `"assets/articles/..."`（缺前导 `/`） | 会被规范成 `/assets/articles/...` |
| `https://...` | 原样请求，不拼站点根 |

`PUBLIC_ASSET_BASE`（`config.js`）非空时，非 http(s) 的路径会拼到那个根下，方便正文/封面放 OSS。已是 `http(s)` 的 URL 不改。

约定目录（可按分类分子目录，不是强制）：

```
/assets/articles/ai/hermes/workflow-summary.md
/assets/articles/engineering/ai-personal-data-sqlite-skills.md
```

也可以把某篇的 `file` 指到仓库根的 `"/README.md"`（当前有一篇就是这样）。

Markdown 只在进入 `/article/:id` 时请求，不进 `db.json` 缓存、不进 localStorage。改正文只需改 `.md` 文件；改标题 / 摘要 / 分类必须改 JSON。

#### `cover`

空字符串不要删键（保持字段整齐即可）。有值时卡片：窄屏上图下文，`≥768px` 左文右图。同样走 `resolvePublicAssetUrl`。

#### `categories` / `tags`

```json
"categories": ["engineering", "AI"],
"tags": ["javascript", "frontend", "AI"]
```

- 必须是词典里的 **id**，不是 `name`
- 分类页过滤：`categories` 数组包含当前 `:id` 即入选（旧数据若是单个字符串也认）
- 标签页过滤：`tags` 数组包含当前 `:id`
- 顶栏高亮用 `categories[0]`：把最能代表该文的分类放第一位
- 未知 id 在卡片上仍会显示（用 id 当文案），但点进 `/category/未知` 会「分类不存在」

#### 搜索行为

`searchArticles` 对 `title` 和 `summary` 做大小写不敏感子串匹配，**不扫正文、不扫标签名**。摘要写清楚，搜索才找得到。结果最多展示 50 条。

---

### `works[]`：AI 页面作品集

首页 `#works` 和独立页 `/works` 都读这个数组。这些页面是站根下的独立 `ai-page/<目录>/`，**不进 React 路由**；href 若指向 `/ai-page/` 或 `http(s)`，卡片会新窗口打开，避免被 SPA 接到 404。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | string | 是 | 卡片标题。无 title 的条目会被过滤掉 |
| `kicker` | string | 否 | 标题上方的小 chip，例如「个人作品集」 |
| `summary` | string | 否 | 卡片说明 |
| `tags` | string[] | 否 | 展示用字符串，**不是**文章标签词典。随便写 `"React 19"`、`"HTML"` |
| `href` | string | 建议 | 点击去哪。空则卡片不可点，降级为 `<article>` |

`href` 分发：

| 形态 | 行为 |
| --- | --- |
| `/ai-page/candy-house/index.html` | 新窗口打开独立静态页 |
| `https://...` | 新窗口打开外链 |
| 其它站内路径，如 `/works` | SPA `Link`（首页「更多」卡用这个） |

首页最多展示 `SITE_WORKS_MAX`（默认 4）张卡，其中**最后一张永远是「更多」**，所以作品只切前 `max - 1` 条。`SITE_WORKS_MORE` 的文案和 `href: "/works"` 写在 `config.js`，不在 `db.json`。完整列表在 `/works`，不分页、也不再塞「更多」。

数组顺序 = 展示顺序（与文章不同，**不按日期排**）。想置顶就把条目挪到前面。

当前条目：糖果屋、墨叙工作室、构形实验室、浮岛、构象艺术，对应 `/ai-page/{candy-house,muxu-studio,form-grid,floating-island,construct-art}/index.html`。

---

### 增删改清单

**发一篇新文章**

1. 把 Markdown 放到 `assets/articles/.../xxx.md`（或 OSS，再配 `PUBLIC_ASSET_BASE`）
2. 确认要用的分类 / 标签已在词典里，没有就先加词典（以及可选的 nav）
3. 在 `articles` 末尾（或任意位置）追加：

```json
{
  "id": "用 uuidgen 或同类工具生成",
  "title": "标题",
  "categories": ["engineering"],
  "tags": ["frontend"],
  "date": "2026-08-14 21:00",
  "summary": "会出现在列表和搜索里的一句话。",
  "file": "/assets/articles/engineering/xxx.md",
  "cover": ""
}
```

4. 本地 `serve` 打开首页，确认列表、分类、标签、搜索、详情正文都通
5. 生产环境若被缓存，用 `/?nocache=1` 或等一小时 TTL

**改一篇已发布的文章**

- 只改正文：编辑 `.md`，不必动 JSON（注意 CDN / 浏览器对 `.md` 的缓存）
- 改标题、摘要、分类、标签、日期、封面：改对应字段
- **不要改 `id`**，否则旧 `/article/:id` 全部失效

**下线一篇文章**

从 `articles` 删掉该对象即可。Markdown 文件可留着，站点不会再列出。

**加一个作品**

1. 把独立页部署到同域 `/ai-page/<目录>/index.html`（或外链）
2. 在 `works` 里追加 `title` / `kicker` / `summary` / `tags` / `href`
3. 首页默认只露出前 3 个作品 + 「更多」；第 4 个起要进 `/works` 才看得到（或调大 `SITE_WORKS_MAX`）

**加分类 / 标签**

先加词典，再在文章里引用 id。分类若要出现在顶栏，还要加 `nav` 项，`value` 写成 `/category/{id}`。

JSON 必须合法：末项不要逗号、字符串用双引号。坏掉的话 `DBProvider` 会失败，全站列表变「数据加载失败」。

---

## 缓存

只缓存索引，不缓存 Markdown。

```
loadDB()
  ├─ localhost / 127.0.0.1     → 始终 fetch
  ├─ ?nocache=1                → 写入永久禁用标记，清掉旧缓存，之后一直 fetch
  └─ 生产
        ├─ TTL 内且 JSON 合法  → 读 localStorage
        └─ 过期 / 损坏 / 未命中 → fetch，再写回
```

请求 URL 带 `?_=<timestamp>`，降低 CDN / 浏览器把 `db.json` 当长期静态文件的概率。并发的 `useDB()` 共用同一个 in-flight Promise，避免 StrictMode 双调用打两次。

`?nocache=1` 是粘性开关：值必须是字面量 `1`，写入后即使去掉查询参数也继续拉新，直到清站点存储（键名 `DA_CACHE_DISABLED` / `DA_CACHE_KEY` / `DA_CACHE_TS_KEY`）。TTL 默认 1 小时（`CACHE_TTL_MS`）。

---

## 正文管道

详情页只认 `articles[].id`，正文路径由元数据给出：

```
:id
  → db.articles.find
  → resolvePublicAssetUrl(post.file)
  → fetch 文本
  → marked.parse（GFM）
  → DOMPurify.sanitize
  → dangerouslySetInnerHTML
  → highlight.js 扫 <pre><code>
  → http(s) 锚点补 target=_blank + rel
```

消毒白名单只放常见文档协议和相对路径，挡住 `javascript:`。切文章或卸载时用 `cancelled` 丢弃过期响应，避免旧正文写进新页。加载失败可点重试。

---

## 路由与滚动

| 路径 | 页面做什么 |
| --- | --- |
| `/` | 全站文章分页；`?page=`，第 1 页写成 `/` |
| `/article/:id` | 元数据 + 正文管道 |
| `/category/:id` / `/tag/:id` | 过滤后再分页；第 1 页也带 `?page=1` |
| `/search?q=` | 扫标题 / 摘要；输入 200ms 防抖后 `replace` 写入 URL |
| `/works` | `works[]` 全部卡片，不分页 |
| `*` | 404 |

每页条数 `PAGE_SIZE`（默认 10）。总页数 ≤7 时页码全列；否则保留首页、末页、当前页 ±1，中间省略。

滚动策略在壳上统一处理，页面不管：

- `PUSH` / `REPLACE` 且无 hash → 滚到顶部
- `POP`（后退 / 前进）→ 保持原位
- 首页带 hash → `scrollIntoView` 对应 `id`

搜索结果复用列表里的 `ArticleCard`（含封面、条纹），点进文章会新窗口打开（`openInNewTab`），方便对照阅读而不离开搜索页。

---

## `config.js` 里改什么

不进 `db.json`、改完刷新即生效的站点身份：

| 常量 | 作用 |
| --- | --- |
| `SITE_NAME` / `SITE_SLOGAN` / `SITE_DESCRIPTION` | 标题、Hero、meta |
| `SITE_EMAIL` | 联系区 / 页脚 mailto |
| `SITE_AUTHOR` / `SITE_CITY` / `SITE_ABOUT_*` | 关于区；名字、介绍、「为什么叫 YNWA」全空则整段不渲染 |
| `SITE_WORKS_MAX` / `SITE_WORKS_MORE` | 首页作品卡上限与「更多」文案 |
| `PUBLIC_ASSET_BASE` | 正文 / 封面的公网根；空则站内路径 |
| `PAGE_SIZE` / `CACHE_*` | 分页与缓存 |
| `FOOTER_*` | 版权起始年、ICP |

作品条目本身在 `db.json` 的 `works`，不要写回 `config.js`。强调色调色板在 `themes.js`，改色只动那张表。

---

## 部署

静态托管即可，但必须满足：

1. **SPA fallback**：未知路径 → `index.html`，否则刷新 `/article/:id` 会 404
2. 站点脚本与样式走根路径 `/assets/...`
3. 正文或封面若在站外，设 `PUBLIC_ASSET_BASE`
4. `ai-page/` 与 SPA 同域部署，但不进本仓库、不进 React 路由
5. 更新 `db.json` 后，访客可能仍吃一小时内的 localStorage 缓存；需要立刻看见可让他们打开 `/?nocache=1`
