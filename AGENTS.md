# AGENTS

给后续 Agent 的操作手册：改功能、发文章先读本文件。

- **架构说明、`db.json` 字段表、缓存策略、路由语义、部署注意** → 见 `README.md`
- **本文件** → 按任务找文件、硬约束、编码约定、逐步操作清单、自检

改了约定（目录、脚本/样式顺序、数据入口、CSS 变量用法、发文流程）必须同步更新本文件；改了字段含义或架构还要同步 `README.md`。

**不要把本手册写进 `README.md`。** `README.md` 同时是一篇已发布文章的正文（`articles[].file` 为 `/README.md`），改它等于改那篇文章。

---

## 目录速览（动手前先认路）

```
assets/
├── articles/                 Markdown 正文（articles[].file 指向这里）
└── app/                      前端应用根
    ├── db.json               全站内容索引（nav / categories / tags / articles / works）
    ├── core/                 主题、配置、工具、数据入口、基础样式、应用入口
    │   ├── themes.js         强调色；必须在一切站点 CSS 之前加载
    │   ├── base.css          变量兜底、reset、.page / .btn / .chip / .section-title
    │   ├── config.js         站点身份、DB_URL、缓存键、页脚、「更多」卡文案
    │   ├── utils.js          纯函数（日期、搜索、URL、分页…）
    │   ├── db-context.js     唯一读 db.json 的地方：DBProvider / useDB
    │   └── main.js           路由表、滚动、createRoot 挂载
    ├── components/           可复用块与页内子块：同名 .js + .css 成对
    └── pages/                仅 Routes 登记的路由页：同名 .js + .css 成对
```

仓库根还有 `index.html`（CDN + 全部 `<link>` / `<script>` 顺序）、`AGENTS.md`、`README.md`。独立作品页在同域 `/ai-page/<目录>/`，**不进本仓库、不进 React 路由**。

### `pages/` 与 `components/` 各干什么

| 目录 | 作用 | 放什么 | 不放什么 |
| --- | --- | --- | --- |
| **`pages/`** | 路由级页面：每个文件对应 `core/main.js` 里 `<Routes>` 的一条路由 | `Home`、`Article`、`Category`、`Tag`、`Search`、`Works`、`NotFound`（及同名 `.css`） | 只被某个页面用到的子块、可复用卡片、顶栏/页脚 |
| **`components/`** | 可复用 UI，以及**不是独立路由**的页内子块 | `Header`、`ArticleCard`、`HomeHero`、`SearchResultRow`、`WorksSection`…（及同名 `.css`） | 带自己 URL、在 `<Routes>` 里登记的整页 |

**怎么判断放哪：**

1. 有没有独立 URL、要不要写进 `main.js` 的 `<Routes>`？  
   - **要** → `pages/`（例如 `/search` → `pages/Search.js`）  
   - **不要** → `components/`（例如首页 Hero、搜索结果行）
2. 会不会被多个页面或壳层复用？  
   - **会** → 一定在 `components/`（例如 `ArticleCard`、`Pagination`、`DbState`）
3. 首页底下的 `#works` / `#about` / `#contact` 挂在路由出口外，也算组件，**不进** `pages/`。

两边都是「一个全局函数 + 同名 `.css`」；差别只在是否对应一条路由。

### `core/` 各文件约束

`core/` 是应用内核：无业务列表 UI、无路由页。六个文件职责互斥，**不要把 A 该管的东西塞进 B**。改内核前先对一下本表与磁盘上的现文件。

| 文件 | 作用 | 放什么（以现文件为准） | 不放什么 |
| --- | --- | --- | --- |
| **`themes.js`** | 首屏前写入强调色 | 仅：IIFE 内的 `themes` 表 + 按本地日历日 `% length` 选色；写 `--accent` / `--accent-soft` / `--accent-2` / `--on-accent` / `--on-accent-2` 与 `data-theme` | `SITE_*` 文案、`db`、任何 React/JSX、读 `localStorage`；不要把色值再抄进 `config.js` 或组件 CSS |
| **`base.css`** | 全站共用样式与变量兜底 | 仅：`:root` 兜底（含 `--accent*`）、reset、`body` 条纹底、`.skip-link` / `.page` / `.wrap` / `.site-header-inner`、`.btn*` / `.chip*` / `.section-title*` / `.eyebrow` / `.page-title` / `.page-desc`、`prefers-reduced-motion` | `Header`/`ArticleCard`/`Works*` 等私有布局（进同名 `.css`）；`.markdown-body`（进 `pages/Article.css`）；不要在这里「业务写死」某天的强调色 |
| **`config.js`** | 站点身份与运行常量 | 仅：`PUBLIC_ASSET_BASE`、`SITE_*`（含 `SITE_ABOUT_*` / `SITE_WORKS_*`）、`DB_URL`、`PAGE_SIZE`、`CACHE_*`、`FOOTER_*`；可顺带设默认 `document.title` / `meta description` | `articles[]`/`nav[]`/`works[]` 等列表（进 `db.json`）；`themes` 表；缓存读写/`fetch`（进 `db-context.js`）；JSX / React |
| **`utils.js`** | 纯函数工具箱 | 仅全局纯函数：`formatDate`、`getCategoryName`、`getCategoryList`、`paginate`、`buildPageRange`、`escapeHtml`、`highlightOne`、`searchArticles`、`normalizeArticleFilePath`、`resolvePublicAssetUrl`、`getGithubNav` | `React.*`、JSX、`createRoot`、DOM 副作用、`fetch(DB_URL)`、站点文案常量（进 `config.js`） |
| **`db-context.js`** | `db.json` 唯一入口 | 仅：`DBContext`、`DBProvider`、`useDB`，以及本文件私有的缓存辅助（`isCacheDisable*` / `applyCacheDisableFromUrl`）；读 `config` 的 `DB_URL`/`CACHE_*`；排序后写入内存的 `db` | 第二个 `fetch(DB_URL)`；页面/卡片 UI；在别处再定义一份 `CACHE_KEY`；改 `DB_URL` 字符串本身（那是 `config.js`） |
| **`main.js`** | 应用壳 + 挂载 | 仅：`App`（`Header` + `<Routes>` + 首页路由外 `#works/#about/#contact` + `Footer` + skip-link）、滚动策略、`createRoot` 包 `BrowserRouter`/`DBProvider` | 具体页面 JSX（进 `pages/`）；卡片/子块 DOM（进 `components/`）；`loadDB` 实现（进 `db-context.js`）；新业务常量（进 `config.js`） |

**加载形态（不可混）：**

| 文件 | `index.html` 里怎么挂 |
| --- | --- |
| `themes.js` | 普通 `<script>`，**一切站点 CSS 之前** |
| `base.css` | `<link>`，在 `themes.js` 之后、组件/页面 CSS 之前 |
| `config.js` → `utils.js` | 普通 `<script>`，在 Babel 脚本之前（`config` 必须先于 `utils` / `db-context`） |
| `db-context.js` | 第一个 `type="text/babel"`（之后才是 components / pages） |
| `main.js` | **最后一个** Babel 脚本 |

**互相引用方向：** `main` / `pages` / `components` → `useDB` / `utils` 函数 / `config` 常量；`themes` 不给 React 读；`utils` 不依赖 React、不读 DOM；`db-context` 只读 `config` 里的 `DB_URL`/`CACHE_*`，不反向改配置文件结构；`base.css` 只消费 `themes` 已写入的变量，不反向驱动 JS。

---

## 下手对照表

按任务找文件，不要全仓扫。路径未写绝对前缀时，相对 `assets/app/`。

| 你要做的事 | 改哪些文件 | 不要动 / 注意 |
| --- | --- | --- |
| **发 / 改 / 下线文章** | `db.json` 的 `articles[]` + `assets/articles/**/*.md`（封面若有） | 不要改已发布文章的 `id`；不要把正文写进 JSON |
| **加分类 / 标签** | `db.json` 的 `categories[]` 或 `tags[]`；分类要上顶栏再改 `nav[]` | 文章里必须写词典 **id**，不要写展示名 |
| **改顶栏栏目** | `db.json` 的 `nav[]` | 「首页」和搜索是代码写死的，不要写进 `nav` |
| **加 AI 作品卡** | `db.json` 的 `works[]`；独立页部署到同域 `/ai-page/<目录>/` | 不要把作品页收进 React 路由；本仓库不收 `ai-page/` 源码 |
| **改站点名 / 关于 / 邮箱 / 页脚 / 分页大小 / 缓存键** | `core/config.js` | 作品条目、栏目、文章不放这里 |
| **改强调色 / 加一套主题** | `core/themes.js` 的 `themes` 数组 | 不要写进 `config.js` 或 `index.html` 底部，否则首屏闪默认黄 |
| **改列表卡片 / 顶栏 / 页脚 / 作品卡 / 关于 / 联系** | `components/<Name>.js` + 同名 `.css` | 不要在页面里复制一份卡片 DOM；新组件还要在 `index.html` 登记 `<script>` 与 `<link>` |
| **改某个路由页（首页、详情、搜索…）** | `pages/<Name>.js` + 同名 `.css` | 页面不要自己 `fetch db.json`；数据只用 `useDB()` |
| **加一条新路由** | 新建 `pages/<Name>.{js,css}` → `index.html` 登记 → `core/main.js` 的 `<Routes>`；要上顶栏再改 `nav[]` | 托管必须继续把未知路径回退到 `index.html` |
| **加纯函数（日期、搜索、URL）** | `core/utils.js` | 无 JSX、无 `import`/`export`；挂到全局 `function foo()` |
| **改缓存 / 数据加载** | `core/db-context.js` | 全站只允许这一处读 `db.json`；`DB_URL` 在 `config.js` |
| **改共用样式（按钮、chip、页面宽）** | `core/base.css` | 强调色走 CSS 变量，不要硬编码 |
| **改正文 Markdown 排版** | `pages/Article.css`（`.markdown-body`） | 不要再写一套 `.prose` |
| **加 CDN 库** | `index.html` 按现有顺序插入 UMD | 不能调换 React → Router → Babel 那几段顺序 |

字段含义、当前分类/标签/作品清单见 `README.md` 的「`db.json`：全站内容索引」。

---

## 硬约束

站点按静态文件部署。违反下面任意一条，页面会白屏、闪错色、或刷新内页 404。

1. **没有打包器、没有 `package.json` 依赖、没有构建步骤。** 不要引入 npm 包、不要写 `import`/`export`、不要上 TypeScript。新库只能用 jsDelivr **UMD**，版本钉在 URL 上，并在 `index.html` 按顺序加入。
2. **React 钉在 18.3.1，React Router 钉在 6.30.1**（没有浏览器 UMD 的 19 / 7）。JSX 用 Babel Standalone 在浏览器里编。
3. **所有站内资源用根绝对路径**（`/assets/...`、`/article/:id`）。相对路径会在子路由下解析错。
4. **`index.html` 脚本与样式顺序不能调换。** 见下一节「加载顺序」。
5. **数据只从 `useDB()` 来。** 禁止在页面或卡片里再 `fetch('/assets/app/db.json')`。资源 URL 一律 `resolvePublicAssetUrl`。
6. **调用方向只允许从上往下：** `core/main.js` → `pages/*` / `components/*` → `core/db-context.js` → `core/utils.js` / `core/config.js`。`core/themes.js` 只在 CSS 前执行，不要让 React 代码去读它。无 `import`/`export`，依赖靠 `index.html` 加载顺序把全局函数挂好。
7. **`core/` 六文件职责互斥。** 主题只进 `themes.js`，常量只进 `config.js`，纯函数只进 `utils.js`，读 `db.json` 只进 `db-context.js`，共用样式只进 `base.css`，壳与挂载只进 `main.js`。详见「`core/` 各文件约束」。
8. **JSON 必须合法。** 末项禁止逗号，字符串用双引号。`db.json` 坏掉时全站列表变成「数据加载失败」。
9. **本机预览必须走 HTTP**（`file://` 加载不了 Babel 的 `src`，也 `fetch` 不了 `db.json`）。

更完整的分层图见 `README.md` 的「运行时引导」「分层」。

---

## 加载顺序（改 `index.html` 时照这个排）

```
head:
  core/themes.js                          ← 写 --accent 等到 <html>，必须最先
  highlight.js 主题 CSS
  core/base.css
  components/*.css（叶子可并行，组合件后于其依赖）
  pages/*.css

body 末尾:
  React → ReactDOM → Remix Router → react-router → react-router-dom
  marked → DOMPurify → highlight.js → Babel Standalone
  core/config.js → core/utils.js          ← 经典脚本，无 JSX
  core/db-context.js                      ← 起 Babel
  components/*.js（叶子先于组合件）
  pages/*.js（叶子先于使用它们的页面）
  core/main.js                            ← 最后挂载
```

**components 推荐顺序（与当前 `index.html` 一致）：**

`SearchIcon` → `Header` → `Footer` → `DbState` → `WorksCardArrow` → `buildWorksLooks` → `WorksCard` → `WorksSection` → `AboutSection` → `ContactCta` → `TagLinks` → `ArticleCard` → `SearchResultRow` → `Pagination` → `HomeHero`

**pages 推荐顺序（仅 Routes 登记的页面）：**

`Home` → `Article` → `Category` → `Tag` → `Search` → `Works` → `NotFound`

依赖规则：被调用的全局函数所在脚本，必须排在调用方之前。例如 `ArticleCard` 用 `TagLinks`，则 `TagLinks.js` 在前；`Search` 用 `SearchResultRow`，则 `SearchResultRow.js` 在前（后者属于 `components/`）。

**约定：`pages/` 只放 `core/main.js` 的 `<Routes>` 里登记的页面。** 页内子块（如首页 Hero、搜索结果行）放 `components/`。详见上文「`pages/` 与 `components/` 各干什么」。

---

## 代码写在哪、怎么写

以下路径均相对 `assets/app/`。

| 文件 | 放什么 | 写法 |
| --- | --- | --- |
| `db.json` | 导航、分类、标签、文章元数据、作品列表 | 合法 JSON；字段见 README |
| `core/themes.js` | **仅**强调色表 + 按日轮换写 CSS 变量 | 经典脚本，IIFE，无 JSX；细则见「`core/` 各文件约束」 |
| `core/config.js` | **仅**站点身份与运行常量（含 `DB_URL` / `CACHE_*`） | 经典脚本，`var` 全局；无 JSX；列表数据不进这里 |
| `core/utils.js` | **仅**纯函数 | 经典脚本，`function foo()`；无 React / 无 JSX |
| `core/db-context.js` | **仅** `DBProvider` / `useDB` + 缓存 | `type="text/babel"`；全站唯一读 `db.json` |
| `core/base.css` | **仅**变量兜底、reset、跨组件共用样式 | 组件私有布局 / `.markdown-body` 不在这里 |
| `core/main.js` | **仅**壳：`Routes`、滚动、挂载、首页外挂区块 | 页面实现与卡片 DOM 不写这里 |
| `components/<Name>.js` + `<Name>.css` | 可复用组件或页内子块（非路由）及其样式 | 同目录同名；无独立样式时 CSS 留注释占位 |
| `pages/<Name>.js` + `<Name>.css` | **仅** `main.js` `<Routes>` 登记的路由页及其样式 | 同上；正文 Markdown 样式在 `pages/Article.css` |

### 现有 components（文件名 = 全局函数名）

| 文件 | 职责 |
| --- | --- |
| `SearchIcon` | 顶栏放大镜 SVG |
| `Header` | 顶栏：站点名、`db.nav`、搜索、汉堡菜单 |
| `Footer` | 页脚版权与 GitHub（GitHub 从 `nav` 取） |
| `DbState` | db 加载中 / 失败 + 重试；各页空态也可复用 `.status` |
| `WorksCardArrow` | 作品卡箭头 |
| `buildWorksLooks` | 作品卡随机配色（无 DOM；CSS 占位） |
| `WorksCard` | 单张作品卡 |
| `WorksSection` | 首页 `#works` 区块（含「更多」） |
| `AboutSection` | 首页 `#about` |
| `ContactCta` | 首页 `#contact` |
| `TagLinks` | 标签 id → `/tag/:id` 链接 |
| `ArticleCard` | 文章列表卡（支持搜索高亮、`openInNewTab`） |
| `SearchResultRow` | 搜索结果行（内部复用 `ArticleCard`） |
| `Pagination` | 分页；`buildUrl(n)` 由页面传入 |
| `HomeHero` | 首页 Hero 区块 |

### 现有 pages（仅 Routes 登记的页面）

| 文件 | 路由 |
| --- | --- |
| `Home` | `/` |
| `Article` | `/article/:id` |
| `Category` | `/category/:id` |
| `Tag` | `/tag/:id` |
| `Search` | `/search` |
| `Works` | `/works` |
| `NotFound` | `*` |

无独立样式的文件（如 `buildWorksLooks.css`、`Category.css`、`Tag.css`）保留一行注释占位，**不要删**，以免与 JS 一一对应关系断裂。

### JSX 约定（与现有代码保持一致）

- 用 `var` 和 `function`，不要 `let`/`const`/`import`/`export`/`class`
- React API 写全名：`React.useState`、`React.useEffect`、`React.useMemo`、`ReactRouterDOM.Link`
- 解构用下标：`var _s = React.useState(0); var x = _s[0]; var setX = _s[1]`
- 注释写中文，说明「为什么」，不要复述代码
- 新全局函数加在 `core/utils.js`，后面的 Babel 文件可以直接调用，不必 import
- 现有组件先搜再改，不要重写；文件名与全局函数名一致

### 样式约定

- 强调色用 `--accent` / `--accent-soft` / `--accent-2` / `--on-accent` / `--on-accent-2`，不要写死 `#ffe135`
- 内容宽用已有的 `.page` / `.wrap` / `.site-header-inner`
- 黑边硬阴影用 `--stroke`、`--shadow`、`--shadow-sm` / `--md` / `--lg`
- 斑马条纹用 `--stripe`，不要再复制一份 `repeating-linear-gradient`
- 区块大标题用 `.section-title`（更大用 `--lg` / `--display`）
- 按钮用 `.btn`，小按钮叠加 `.btn--sm`
- 正文只走 `.markdown-body`，不要再加一套 `.prose`
- 断点：作品瀑布流 `640px`，其余 `768px`
- 组件/页面样式写在同名 `.css`；跨组件共用的才进 `core/base.css`

`useDB()` 返回 `{ db, loadDB, error, retryDB }`。`db` 未就绪时用 `<DbState />`（或页面自带空态文案），不要假设 `db` 一定有值。

---

## 发一篇新文章

只改内容时，**通常只动 `db.json` + 一个 `.md` 文件**。不要改 JS。

### 1. 准备正文

把 Markdown 放到 `assets/articles/<分类目录>/xxx.md`。现有习惯：

```
/assets/articles/ai/hermes/...
/assets/articles/engineering/...
```

也可以放到 OSS：把 `core/config.js` 的 `PUBLIC_ASSET_BASE` 设成公网根（无尾斜杠），`file` / `cover` 仍可写站内绝对路径，运行时会拼到该根下。已是 `http(s)://` 的 URL 不改。

### 2. 确认分类和标签已在词典里

打开 `assets/app/db.json`（当前 id 以文件为准，README 里有一份清单）：

- 文章里填的是 **id**，不是 `name`（标签写 `frontend` 不要写「前端」；写 `Hermes-Agent` 不要写 `Hermes Agent`）
- 没有就先在 `categories[]` / `tags[]` 加一条
- 分类若要上顶栏，再往 `nav[]` 加：

```json
{ "label": "展示名", "value": "/category/新id", "target": "" }
```

### 3. 在 `articles[]` 追加一条

`id` 用 UUID（macOS：`uuidgen`），**不要用标题拼音、不要改已发布文章的 id**。`date` 用 `YYYY-MM-DD HH:MM`。无封面时 `cover` 留 `""`，不要删键。不要把正文粘进 JSON。数组末项不要逗号。

```json
{
  "id": "用 uuidgen 生成的 UUID",
  "title": "标题",
  "categories": ["engineering"],
  "tags": ["frontend"],
  "date": "2026-08-14 21:00",
  "summary": "会出现在列表、详情导语和搜索里的一句话。搜索不打开正文，摘要要能被搜到。",
  "file": "/assets/articles/engineering/xxx.md",
  "cover": ""
}
```

- `categories[0]` 决定从该文进详情时顶栏高亮哪个分类（把最能代表该文的分类放第一位）
- `file` 用站内绝对路径（前导 `/`）或 `https://...`
- 搜索只扫 `title` 和 `summary`，不扫正文、不扫标签名
- JSON 数组书写顺序无所谓，进内存后按 `date` 倒序

### 4. 自检

本机：

```bash
npx --yes serve -s . -l 3000
```

（必须 HTTP）打开后确认：

1. 首页列表能看到，且按日期排在该出现的位置
2. 详情：标题、摘要、正文、代码高亮正常
3. 分类 chip、标签过滤含这篇文章
4. 搜索摘要里的关键词能命中
5. `db.json` 仍能被 `JSON.parse`（可用 `python3 -c 'import json; json.load(open("assets/app/db.json"))'`）

本机 `localhost` / `127.0.0.1` 不走 localStorage 缓存。生产访客可能仍吃一小时缓存：`/?nocache=1` 或等 TTL。

### 改 / 下线 / 加作品

| 改什么 | 动哪里 |
| --- | --- |
| 只改正文 | 只编辑 `.md`（注意 CDN / 浏览器对 `.md` 的缓存） |
| 标题、摘要、分类、标签、日期、封面 | 改 `articles[]` 对应字段；**不要改 `id`** |
| 下线 | 从 `articles[]` 删掉该对象；`.md` 可留着 |
| 加作品 | 见下一节 |

---

## 加一张 AI 作品卡

1. 把独立静态页部署到同域 `/ai-page/<目录>/index.html`（完整 HTML，不进本仓库）
2. 在 `db.json` 的 `works[]` 追加一条，例如：

```json
{
  "title": "作品名",
  "kicker": "个人作品集",
  "summary": "一句话说明",
  "tags": ["React", "HTML"],
  "href": "/ai-page/某目录/index.html"
}
```

3. 注意：
   - `works[].tags` 是**展示字符串**，不是文章标签词典
   - `href` 指向 `/ai-page/` 或 `http(s)` 时卡片新窗口打开；其它站内路径走 SPA `Link`
   - 首页最多 `SITE_WORKS_MAX`（默认 4）张卡，**末张永远是「更多」**（文案在 `core/config.js` 的 `SITE_WORKS_MORE`），所以首页只露出前 3 个作品；完整列表在 `/works`
   - `works[]` 顺序 = 展示顺序（不按日期排）

---

## 加功能时怎么接

### 新路由页

1. 新建 `assets/app/pages/<Name>.js`：数据用 `useDB()`，空态/失败用 `<DbState />`，容器用 `className="page"`
2. 新建同名 `assets/app/pages/<Name>.css`（哪怕暂时只有一行注释）
3. 在 `index.html`：
   - `<head>` 里、其它 pages CSS 附近加 `<link rel="stylesheet" href="/assets/app/pages/<Name>.css" />`
   - `<body>` 里、`core/main.js` **之前**加 `<script type="text/babel" data-presets="react" src="/assets/app/pages/<Name>.js"></script>`
   - 若依赖其它组件叶子（如 `Home` 依赖 `HomeHero`），对应 `components/*` 脚本须已先加载
4. 在 `core/main.js` 的 `<Routes>` 加一条，放在 `path="*"` **之前**
5. 需要顶栏入口 → `db.json` `nav[]`
6. `document.title` 在该页 `useEffect` 里改，参考现有页面

首页底下的作品 / 关于 / 联系**不要塞进 `Home`**：它们挂在 `core/main.js`、路由出口之外，列表翻页不会卸掉。新的「分页后仍留在首页底部」的区块同样挂在 `isHome ? ...` 旁边，并给锚点 `id`（现有：`#articles`、`#works`、`#about`、`#contact`）。

### 新卡片 / 复用 UI

1. 优先扩展 `components/` 里已有组件（`ArticleCard` 已支持搜索高亮和 `openInNewTab`）
2. 真要新建：`components/<Name>.js` + `<Name>.css`，全局 `function Name(...)`
3. 在 `index.html` 按依赖插入 `<link>` 与 `<script>`（见「加载顺序」）
4. 不要在 `pages/` 再复制一套卡片 DOM

### 新脚本 / CDN

1. 无 JSX → 普通 `<script src="/assets/app/core/xxx.js">`，放在 `config.js` / `utils.js` 附近
2. 有 JSX → `type="text/babel" data-presets="react"`，放进 `components/` 或 `pages/`，在 `main.js` 之前
3. 必须在首屏前生效（如主题）→ 放在 `core/base.css` **之前**，参考 `core/themes.js`
4. 新库只加 UMD。React / Router 那五段顺序不可改

`config.js` 常量列表、`themes.js` 调色板说明见 `README.md` 的「`config.js` 里改什么」。

### 改强调色

只改 `core/themes.js` 的 `themes` 数组。每组需要：`name`、`accent`、`soft`、`accent2`、`onAccent`、`onAccent2`。深色强调色时 `onAccent` 用浅色纸色，保证按钮/CTA 字可读。不要把颜色写进 `base.css` 的业务规则或组件 CSS。

---

## 常见翻车点

| 症状 | 常见原因 |
| --- | --- |
| 白屏 | `index.html` 脚本顺序错；JSX 文件在 Babel 之前；全局函数尚未定义就被调用 |
| 首屏闪默认黄 | `themes.js` 没在站点 CSS 之前，或主题被写进了 `config.js` / HTML 底部 |
| 刷新 `/article/:id` 404 | 静态托管没有 SPA fallback 到 `index.html` |
| 列表「数据加载失败」 | `db.json` 非法 JSON，或 `DB_URL` 路径错 |
| 子路由下 CSS/图 404 | 用了相对路径，应改成 `/assets/...` |
| 搜索找不到新文 | 关键词只写在正文里；搜索不扫 Markdown，只扫 `title` / `summary` |
| 分类/标签页「不存在」 | 文章写了展示名而不是词典 `id` |
| 深色主题按钮看不清 | 该主题的 `onAccent` / `onAccent2` 没配浅色字 |
| 改了组件但样式没变 | 忘了加/改同名 `.css`，或忘了在 `index.html` 加 `<link>` |
| 内核职责混乱 | 把列表数据塞进 `config.js`、在页面里 `fetch db.json`、把路由页写进 `main.js`、把组件私有 CSS 塞进 `base.css`（违反「`core/` 各文件约束」） |

---

## 改完怎么验

内容改动：走上面「发一篇新文章 → 自检」。

功能改动至少确认：

1. 本机 HTTP 预览，**硬刷新**后再看（避免旧 Babel/JS 缓存）
2. 首页、一篇详情、一个分类、搜索、作品集、404 都能打开
3. 刷新 `/article/:id` 不是服务器 404（SPA fallback）
4. 窄屏顶栏汉堡菜单、宽屏横排导航
5. 若动过主题：深色强调（蓝 / 咖啡等）上按钮和 CTA 的字仍然能看清
6. 若动过 `db.json`：文件仍是合法 JSON
7. 若动过约定：同步更新 `AGENTS.md`；若动过字段/架构：同步更新 `README.md`
8. 若增删了 `components/*` 或 `pages/*`：`index.html` 的 `<link>` / `<script>` 与磁盘文件一一对应，无漏挂、无指向已删文件
