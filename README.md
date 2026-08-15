# YNWA

无构建步骤的个人博客 SPA。浏览器直接吃 HTML / CSS / JSX，运行时库全部来自 jsDelivr UMD。

YNWA 取自利物浦队歌 *You'll Never Walk Alone*。

线上预览：[http://www.icode.link/](http://www.icode.link/)

改功能或发文章请先读 [`AGENTS.md`](AGENTS.md)（操作手册：找文件、逐步清单、翻车对照）。本文件讲**架构与内容约定**。注意：当前有一篇文章的 `file` 指向本文件 `/README.md`，改这里等于改那篇正文。

站点按静态文件部署（OSS / 任意静态托管），因此刻意不做这些事：

- 没有打包器、没有 `node_modules`、没有构建产物
- React 19 / React Router 7 没有浏览器 UMD，运行时钉在 React 18.3.1 + RR 6.30.1
- 所有站内资源用根绝对路径（`/assets/...`），避免 `/article/:id` 把相对 URL 解析错
- 脚本与样式顺序写死在 `index.html`，调换即挂
- 前端代码集中在 `assets/app/`：`core/`（内核）+ `components/` + `pages/` + `db.json`；同名 `.js` 与 `.css` 成对同目录

---

## 本地预览

必须走 HTTP：`file://` 加载不了 Babel 的 `src` 脚本，也 `fetch` 不了 `db.json`。

```bash
npx --yes serve -s . -l 3000
```

`serve -s` 把未知路径回退到 `index.html`，这是 `BrowserRouter` 能刷新内页（例如 `/article/:id`）的前提。其它静态托管（Nginx、OSS 静态网站、Cloudflare Pages…）也必须配置同等 SPA fallback。

开发时改 `assets/app/db.json` 立刻生效：本机 `localhost` / `127.0.0.1` 永远拉最新，不走 localStorage 缓存。生产环境强制刷新见下方「缓存」。改完前端脚本后建议硬刷新，避免浏览器缓存旧的 Babel 编译结果。

---

## 目录

```
.
├── index.html                 入口：CDN 库 + 全部 <link> / <script> 顺序
├── README.md                  架构与内容约定（亦是一篇已发布文章的正文）
├── AGENTS.md                  给 Agent 的改功能 / 发文章手册
├── assets/
│   ├── articles/              Markdown 正文；路径写在 articles[].file
│   └── app/                   前端应用根（路径前缀 /assets/app/）
│       ├── db.json            全站内容索引（nav / categories / tags / articles / works）
│       ├── core/              主题、配置、工具、数据入口、基础样式、应用入口
│       │   ├── themes.js      强调色；须在一切站点 CSS 之前加载
│       │   ├── base.css       变量兜底 / reset / 共用 .page .btn .chip …
│       │   ├── config.js      站点身份、DB_URL、缓存键、页脚（无 JSX）
│       │   ├── utils.js       纯函数（无 JSX）
│       │   ├── db-context.js  唯一数据入口 + 缓存（DBProvider / useDB）
│       │   └── main.js        入口：路由表、滚动、createRoot 挂载
│       ├── components/        可复用块与页内子块：同名 .js + .css 成对
│       └── pages/             仅 Routes 登记的路由页：同名 .js + .css 成对
└── ai-page/                   独立静态作品页（同域部署，不进本仓库、不进 React 树）
```

`ai-page/<目录>/index.html` 是完整 HTML 页，点作品卡会新窗口打开。本仓库不收这些文件，但 `db.json` 的 `works[].href` 必须指向它们实际部署后的路径。

### `pages/` 与 `components/` 的分工

这两个目录都是「一个全局函数 + 同名 `.css`」，差别在**是否对应一条路由**。

| 目录 | 作用 | 放什么 | 不放什么 |
| --- | --- | --- | --- |
| **`pages/`** | 路由级页面。每个文件对应 `core/main.js` 里 `<Routes>` 的一条 `path` | 整页：读 URL / `useDB()`、改 `document.title`、拼该路由的布局 | 只被某一页用到的局部 UI、全站壳（顶栏/页脚）、可复用卡片 |
| **`components/`** | 可复用 UI，以及**没有独立 URL** 的页内子块 | 顶栏、页脚、列表卡、分页、首页 Hero、搜索结果行、首页底部 `#works` / `#about` / `#contact` 等 | 在 `<Routes>` 里登记、有自己路径的整页 |

**判定口诀：**

- 要进 `<Routes>`、有自己的路径（`/`、`/article/:id`、`/search`…）→ **`pages/`**
- 被页面或壳引用、自己没有路由 → **`components/`**
- 不确定时：若拆出去后不能单独作为「打开某个 URL 看到的那一屏」，就放 `components/`

当前路由页只有：`Home`、`Article`、`Category`、`Tag`、`Search`、`Works`、`NotFound`。  
`HomeHero`、`SearchResultRow` 等虽名字像页面，但是子块，在 `components/`。

### `core/` 各文件约束

`core/` 是应用内核（无业务列表 UI、无路由页）。六个文件职责互斥，以磁盘现文件为准：

| 文件 | 作用 | 放什么（现文件） | 不放什么 |
| --- | --- | --- | --- |
| **`themes.js`** | 首屏前写强调色 | IIFE：`themes` 表 + 本地日历日 `% length`；写 `--accent*` / `--on-accent*` 与 `data-theme` | `SITE_*`、`db`、React/JSX、`localStorage`；色值不要抄进 `config.js` 或组件 CSS |
| **`base.css`** | 共用样式与变量兜底 | `:root` 兜底、reset、条纹底、`.skip-link` / `.page*` / `.wrap` / `.btn*` / `.chip*` / `.section-title*` / `.eyebrow` 等 | 组件私有布局；`.markdown-body`（`pages/Article.css`）；不要业务写死某天强调色 |
| **`config.js`** | 站点身份与运行常量 | `PUBLIC_ASSET_BASE`、`SITE_*`（含 `SITE_ABOUT_*` / `SITE_WORKS_*`）、`DB_URL`、`PAGE_SIZE`、`CACHE_*`、`FOOTER_*`；默认可设 `document.title` / meta | 列表数据（`db.json`）；`themes` 表；缓存/`fetch` 实现；JSX |
| **`utils.js`** | 纯函数工具箱 | `formatDate`、`getCategoryName`/`List`、`paginate`、`buildPageRange`、`escapeHtml`、`highlightOne`、`searchArticles`、`normalizeArticleFilePath`、`resolvePublicAssetUrl`、`getGithubNav` | React/JSX、DOM 副作用、`fetch(DB_URL)`、文案常量 |
| **`db-context.js`** | `db.json` 唯一入口 | `DBProvider` / `useDB`（+ 本文件私有缓存辅助）；读 `config` 的 `DB_URL`/`CACHE_*` | 第二处 `fetch(DB_URL)`；UI；在别处再定义 `CACHE_KEY` |
| **`main.js`** | 壳 + 挂载 | `App`（`Header` + `<Routes>` + 首页外挂 `#works/#about/#contact` + `Footer`）、滚动、`createRoot` | 页面实现（`pages/`）；卡片 DOM（`components/`）；`loadDB` 实现 |

加载：`themes.js`（一切站点 CSS 前）→ `base.css` → … → `config.js` → `utils.js` → `db-context.js` → components → pages → **`main.js` 最后**。调用只能从上往下；`themes` 不给 React 读；`utils` 不依赖 React。操作细则见 `AGENTS.md` 同名小节。

### `components/` 与 `pages/` 清单

每个逻辑单元一个全局函数，文件名与函数名一致；样式在同目录同名 `.css`。无独立样式时 CSS 文件保留注释占位，不删除。

**components（可复用 UI / 页内子块）**

| 文件 | 职责 |
| --- | --- |
| `SearchIcon` | 顶栏放大镜 SVG |
| `Header` | 顶栏：站点名、`db.nav`、搜索、汉堡菜单 |
| `Footer` | 页脚版权、ICP、可选 GitHub（从 `nav` 解析） |
| `DbState` | db 加载中 / 失败 + 重试 |
| `WorksCardArrow` / `buildWorksLooks` / `WorksCard` | 作品卡箭头、随机配色、单卡 |
| `WorksSection` | 首页 `#works`（含末尾「更多」） |
| `AboutSection` / `ContactCta` | 首页 `#about` / `#contact` |
| `TagLinks` | 标签 id → `/tag/:id` |
| `ArticleCard` | 文章列表卡（支持搜索高亮、`openInNewTab`） |
| `SearchResultRow` | 搜索结果行（复用 `ArticleCard`） |
| `Pagination` | 分页；`buildUrl(n)` 由页面传入 |
| `HomeHero` | 首页 Hero |

**pages（路由页）**

| 文件 | 路由 |
| --- | --- |
| `Home` | `/` |
| `Article` | `/article/:id` |
| `Category` / `Tag` | `/category/:id`、`/tag/:id` |
| `Search` | `/search` |
| `Works` | `/works` |
| `NotFound` | `*` |

改功能时按文件下手的对照表见 `AGENTS.md`。

---

## 运行时引导

浏览器打开站点后，实际顺序是：

```
index.html
  head:
    ├─ core/themes.js                 按本地日历天数选一组主题，写 CSS 变量到 <html>
    ├─ highlight.js 主题 CSS
    ├─ core/base.css                  变量兜底、reset、共用控件
    ├─ components/*.css               与 JS 同序：叶子先于组合件
    └─ pages/*.css
  body 末尾:
    ├─ CDN：React → ReactDOM → Remix Router → react-router → react-router-dom
    ├─ CDN：marked → DOMPurify → highlight.js → Babel Standalone
    ├─ 经典脚本：core/config.js → core/utils.js
    ├─ Babel：core/db-context.js
    ├─ Babel：components/*.js（叶子先）
    ├─ Babel：pages/*.js（叶子先）
    └─ Babel：core/main.js            createRoot 挂载
```

| 层 | 加载方式 | 为什么 |
| --- | --- | --- |
| `core/themes.js` | 普通 `<script>`，且在一切站点 CSS 之前 | 先写强调色，避免首屏闪 `base.css` `:root` 默认黄 |
| `core/config.js` / `core/utils.js` | 普通 `<script>` | 常量与纯函数先挂到 `window`，后面的 JSX 文件当全局调用 |
| `core/db-context.js` 起 | `type="text/babel" data-presets="react"` | 浏览器内编译 JSX；`data-presets="react"` 避免再套 env |
| `core/main.js` | 最后执行 | 依赖前面所有全局函数已存在，再挂载 |

补充约定：

- CDN 版本钉在 URL 上，不走「最新」
- highlight.js 主题 stylesheet 必须先于含 `.markdown-body` 的 `pages/Article.css`，否则盖不住代码块背景
- 无打包、无 `import`/`export`：依赖关系完全由 `index.html` 里的标签顺序表达
- 被调用的全局函数所在脚本，必须排在调用方之前（例如 `TagLinks` 先于 `ArticleCard`，`HomeHero` 先于 `Home`；页内子块在 `components/`）

当前 `index.html` 里 components / pages 的具体顺序与 `AGENTS.md`「加载顺序」一致。

---

## 分层

```
┌─────────────────────────────────────────────┐
│  core/main.js    入口：路由表、滚动、挂载    │
├─────────────────────────────────────────────┤
│  pages/*         路由页（仅 Routes 登记）    │
│  components/*    可复用 UI / 页内子块         │
├─────────────────────────────────────────────┤
│  core/db-context.js  唯一数据入口 + 缓存     │
├─────────────────────────────────────────────┤
│  core/utils.js · config.js · base.css ·      │
│  themes.js（均在 assets/app/core/）          │
└─────────────────────────────────────────────┘
```

调用方向只允许从上往下。页面不直接 `fetch` `db.json`；卡片不自己拼资源 URL，一律走 `resolvePublicAssetUrl`。

### 组件树

```
StrictMode
  BrowserRouter
    DBProvider          ← 必须在 Router 内，才能读 ?nocache=
      App（定义在 core/main.js）
        Header
        #main
          Routes        ← Home / Article / Category / Tag / Search / Works / *
        WorksSection    ┐
        AboutSection    ├ 仅 pathname === '/'
        ContactCta      ┘
        Footer
```

首页区块不塞进 `Home`，是因为它们在路由出口之外：列表分页只换 `#main` 里的内容，作品集 / 关于 / 联系始终贴在列表下面，不会随翻页卸载。锚点：`#articles`、`#works`、`#about`、`#contact`。

### 同名 JS + CSS

- 每个组件/页面一个 `.js`，样式在同目录同名 `.css`
- **`pages/` = 路由页；`components/` = 非路由 UI**（分工见上文「`pages/` 与 `components/` 的分工」）
- 跨组件共用的变量、reset、`.page`、`.btn`、`.chip`、`.section-title` 放在 `core/base.css`
- 正文 Markdown 排版只在 `pages/Article.css` 的 `.markdown-body`
- 新增文件必须在 `index.html` 同时登记 `<link>` 与 `<script>`

---

## 数据从哪来

职责拆开：强调色不进内容库；正文不进索引；站点身份不进 `db.json`。

```
core/themes.js     强调色调色板（须在站点 CSS 前加载）
core/config.js     站点身份、关于区、缓存键、页脚、「更多」卡、DB_URL
     │
assets/app/db.json nav / categories / tags / articles / works
     │  DBProvider 一次加载，Context 下发；列表/导航/搜索/作品都吃这份内存
     ▼
Markdown           articles[].file 指向的正文；进入 /article/:id 才 fetch
```

| 源 | 路径 | 形态 | 何时读 |
| --- | --- | --- | --- |
| 主题 | `assets/app/core/themes.js` | 经典脚本，写 CSS 变量 | 站点 CSS 之前；失败则沿用 `base.css` `:root` 默认黄 |
| 配置 | `assets/app/core/config.js` | 全局 `var` | 脚本加载时立刻生效（含改 `<title>` / meta description） |
| 索引 | `assets/app/db.json`（`DB_URL`） | 一份 JSON | 应用启动时由 `DBProvider` 拉一次 |
| 正文 | `articles[].file` | Markdown 文件或 URL | 详情页再请求；不进索引、不进 localStorage |

`db.json` 进内存后按 `date` 倒序。分类 / 标签页是对这份数组的过滤；搜索只扫 `title` 和 `summary`，不打开正文。页面通过 `useDB()` 拿到 `{ db, loadDB, error, retryDB }`；加载失败时走 `DbState`（加载中 / 错误 + 重试）。

---

## 主题系统

调色板**只**在 `assets/app/core/themes.js` 维护：不要写进 `config.js`、`base.css` 业务规则或组件 CSS。该文件须在一切站点 CSS 之前以经典脚本加载。

选取规则：按「本地日历的日期天数 % 主题数」顺序轮换——同一天所有访客、所有刷新都是同一组（各看各的本地日历，不做时区换算），次日换下一组。当前约 15 组一轮。SPA 的 `Link` 不重载文档，跨天停留的旧页要**刷新**后才换色。

每组字段：`name`、`accent`、`soft`、`accent2`、`onAccent`、`onAccent2`。脚本会写入：

- `--accent` / `--accent-soft` / `--accent-2`
- `--on-accent` / `--on-accent-2`（按钮、CTA 上的字色；深色强调时用浅色纸色）
- `data-theme="<name>"` 挂在 `<html>`

`base.css` 的 `:root` 只作脚本失败时的黄底兜底。业务样式一律吃变量，不要写死 `#ffe135`。

---

## `db.json`：全站内容索引

路径：`/assets/app/db.json`（常量 `DB_URL`，定义在 `core/config.js`）。这是站点的**唯一内容数据库**：顶栏栏目、分类页、标签页、文章列表、搜索、作品集全部读它。改内容几乎只改这一份文件 + 对应 Markdown / 静态页。

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

### 关系一览

```
nav[].value
  ├─ /category/{categories[].id}     顶栏栏目 → 分类页
  ├─ /works                          作品集页（读 works[]）
  ├─ #about / #contact / #works      回首页滚锚点（关于/联系统文案在 config.js）
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

联系区 / 页脚的 GitHub 按钮不是第二份配置：从 `nav` 里找 `label === "GitHub"`（大小写不敏感）或 `value` 含 `github.com` 的项。找不到就不渲染。页脚展示 brand + slogan、可选 GitHub、ICP 版权；联系区邮箱由 `SITE_EMAIL` 驱动；页脚 slogan 来自 `SITE_SLOGAN`。

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

`PUBLIC_ASSET_BASE`（`assets/app/core/config.js`）非空时，非 http(s) 的路径会拼到那个根下，方便正文/封面放 OSS。已是 `http(s)` 的 URL 不改。

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

`searchArticles`（`core/utils.js`）对 `title` 和 `summary` 做大小写不敏感子串匹配，**不扫正文、不扫标签名**。摘要写清楚，搜索才找得到。结果最多展示 50 条（`SEARCH_MAX_RESULTS`，在 `pages/Search.js`）。

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

首页最多展示 `SITE_WORKS_MAX`（默认 4）张卡，其中**最后一张永远是「更多」**，所以作品只切前 `max - 1` 条。`SITE_WORKS_MORE` 的文案和 `href: "/works"` 写在 `core/config.js`，不在 `db.json`。完整列表在 `/works`，不分页、也不再塞「更多」。

数组顺序 = 展示顺序（与文章不同，**不按日期排**）。想置顶就把条目挪到前面。

当前条目：糖果屋、墨叙工作室、构形实验室、浮岛、构象艺术，对应 `/ai-page/{candy-house,muxu-studio,form-grid,floating-island,construct-art}/index.html`。

---

### 增删改清单

逐步操作与自检清单以 `AGENTS.md` 为准；这里只列原则。

**发一篇新文章**

1. Markdown 放到 `assets/articles/.../xxx.md`（或 OSS + `PUBLIC_ASSET_BASE`）
2. 确认分类 / 标签已在词典里（可选再加 `nav`）
3. 在 `articles[]` 追加元数据（`id` 用 UUID，`date` 用 `YYYY-MM-DD HH:MM`，无封面 `cover: ""`）
4. 本地 `serve` 确认列表、分类、标签、搜索、详情
5. 生产若被缓存：`/?nocache=1` 或等 TTL

**改 / 下线**

- 只改正文：编辑 `.md`
- 改标题、摘要、分类、标签、日期、封面：改 JSON 字段；**不要改已发布 `id`**
- 下线：从 `articles[]` 删除对象；`.md` 可留着

**加作品**

1. 独立页部署到同域 `/ai-page/<目录>/index.html`
2. `works[]` 追加 `title` / `kicker` / `summary` / `tags` / `href`
3. 首页默认前 3 个作品 + 「更多」；完整列表在 `/works`

**加分类 / 标签**

先加词典，再在文章里引用 id。分类若要出现在顶栏，还要加 `nav`，`value` 写成 `/category/{id}`。

JSON 必须合法：末项不要逗号、字符串用双引号。坏掉的话全站列表变「数据加载失败」。

---

## 缓存

只缓存索引（`db.json`），不缓存 Markdown。

```
loadDB()
  ├─ localhost / 127.0.0.1     → 始终 fetch
  ├─ ?nocache=1                → 写入永久禁用标记，清掉旧缓存，之后一直 fetch
  └─ 生产
        ├─ TTL 内且 JSON 合法  → 读 localStorage
        └─ 过期 / 损坏 / 未命中 → fetch，再写回
```

请求 URL 带 `?_=<timestamp>`，降低 CDN / 浏览器把 `db.json` 当长期静态文件的概率。并发的 `useDB()` 共用同一个 in-flight Promise，避免 StrictMode 双调用打两次。

`?nocache=1` 是粘性开关：值必须是字面量 `1`，写入后即使去掉查询参数也继续拉新，直到清站点存储。相关键名在 `core/config.js`：`CACHE_DISABLED_KEY`（`DA_CACHE_DISABLED`）、`CACHE_KEY`（`DA_CACHE_KEY`）、`CACHE_TS_KEY`（`DA_CACHE_TS_KEY`）。TTL 默认 1 小时（`CACHE_TTL_MS`）。

实现集中在 `assets/app/core/db-context.js`，页面不要自己再写一套缓存。

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
  → dangerouslySetInnerHTML（#post-content.markdown-body）
  → highlight.js 扫 <pre><code>
  → http(s) 锚点补 target=_blank + rel
```

消毒白名单只放常见文档协议和相对路径，挡住 `javascript:`。切文章或卸载时用 `cancelled` 丢弃过期响应，避免旧正文写进新页。加载失败可点重试。正文样式只在 `pages/Article.css`。

---

## 路由与滚动

| 路径 | 页面 | 做什么 |
| --- | --- | --- |
| `/` | `Home`（含 `HomeHero`） | 全站文章分页；`?page=`，第 1 页写成 `/` |
| `/article/:id` | `Article` | 元数据 + 正文管道 |
| `/category/:id` | `Category` | 过滤后再分页；第 1 页也带 `?page=1` |
| `/tag/:id` | `Tag` | 同上 |
| `/search?q=` | `Search` | 扫标题 / 摘要；输入 200ms 防抖后 `replace` 写入 URL |
| `/works` | `Works` | `works[]` 全部卡片，不分页、无「更多」 |
| `*` | `NotFound` | 404 |

每页条数 `PAGE_SIZE`（默认 10，`core/config.js`）。总页数 ≤7 时页码全列；否则保留首页、末页、当前页 ±1，中间省略（`buildPageRange`）。

滚动策略在 `core/main.js` 统一处理，页面不管：

- `PUSH` / `REPLACE` 且无 hash → 滚到顶部
- `POP`（后退 / 前进）→ 保持原位
- 首页带 hash → `requestAnimationFrame` 后再 `scrollIntoView`（等区块挂上）

搜索结果复用 `ArticleCard`（含封面、条纹），点进文章会新窗口打开（`openInNewTab`），方便对照阅读而不离开搜索页。

---

## `config.js` 里改什么

路径：`assets/app/core/config.js`。**只放常量**，不进 `db.json`、不含 JSX、不实现缓存读写（缓存逻辑在 `db-context.js`）。改完刷新即生效：


| 常量 | 作用 |
| --- | --- |
| `SITE_NAME` / `SITE_SLOGAN` / `SITE_DESCRIPTION` | 标题、Hero、meta；`SITE_SLOGAN` 还在页脚 brand 旁 |
| `SITE_EMAIL` | 联系区 mailto |
| `SITE_AUTHOR` / `SITE_CITY` / `SITE_ABOUT_*` | 关于区；名字、介绍、「为什么叫 YNWA」全空则整段不渲染 |
| `SITE_WORKS_MAX` / `SITE_WORKS_MORE` | 首页作品卡上限与「更多」文案 / 链接 |
| `PUBLIC_ASSET_BASE` | 正文 / 封面的公网根；空则站内路径 |
| `DB_URL` | 索引地址，默认 `/assets/app/db.json` |
| `PAGE_SIZE` | 列表分页大小 |
| `CACHE_*` | localStorage 键名、禁用参数名、TTL |
| `FOOTER_*` | 版权起始年、ICP 文案与链接 |

脚本末尾会立刻把 `document.title` 和 meta description 设成站点默认值；进入文章 / 分类后再由对应页面覆盖。

作品条目本身在 `db.json` 的 `works`，不要写回 `config.js`。强调色调色板在 `assets/app/core/themes.js`，改色只动那张表。

---

## 样式约定（架构侧）

- 强调色：`--accent` / `--accent-soft` / `--accent-2` / `--on-accent` / `--on-accent-2`
- 内容宽：`.page` / `.wrap` / `.site-header-inner`（最大宽 `--page-max`）
- 硬阴影与描边：`--stroke`、`--shadow`、`--shadow-sm` / `--md` / `--lg`
- 斑马条纹：`--stripe`（随主题换装）
- 区块标题：`.section-title`（`--lg` / `--display`）
- 按钮：`.btn` / `.btn--sm` / `.btn-ghost` / `.btn-ink`
- 正文：只走 `.markdown-body`
- 断点：作品瀑布流 `640px`，其余布局 `768px`
- `prefers-reduced-motion`：缩短动画，并去掉卡片/按钮的位移 hover

共用规则进 `core/base.css`；组件/页面私有规则进各自同名 CSS。

---

## 部署

静态托管即可，但必须满足：

1. **SPA fallback**：未知路径 → `index.html`，否则刷新 `/article/:id` 会 404
2. 站点脚本与样式走根路径 `/assets/...`（含 `/assets/app/...`）
3. 正文或封面若在站外，设 `PUBLIC_ASSET_BASE`
4. `ai-page/` 与 SPA 同域部署，但不进本仓库、不进 React 路由
5. 更新 `db.json` 后，访客可能仍吃一小时内的 localStorage 缓存；需要立刻看见可让他们打开 `/?nocache=1`
6. 若改过 `index.html` 脚本列表，确认每个 `components/*`、`pages/*` 的 `.js` / `.css` 都已挂上，且依赖顺序正确

动手改功能、发文章、加路由的逐步清单与翻车对照，见 [`AGENTS.md`](AGENTS.md)。
