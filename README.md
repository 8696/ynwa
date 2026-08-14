# YNWA

无构建步骤的个人博客 SPA。浏览器直接吃 HTML / CSS / JSX，运行时库全部来自 jsDelivr UMD。

YNWA 取自利物浦队歌 *You'll Never Walk Alone*。

本地必须走 HTTP（`file://` 加载不了 Babel 的 `src` 脚本，也 `fetch` 不了 `db.json`）：

```bash
npx --yes serve -s . -l 3000
```

`serve -s` 把未知路径回退到 `index.html`，这是 `BrowserRouter` 能刷新内页的前提。

---

## 约束

站点按静态文件部署（OSS / 任意静态托管），因此刻意不做这些事：

- 没有打包器、没有 `node_modules`、没有构建产物
- React 19 / React Router 7 没有浏览器 UMD，运行时钉在 React 18.3.1 + RR 6.30.1
- 所有站内资源用根绝对路径（`/assets/...`），避免 `/article/:id` 把相对 URL 解析错
- 脚本顺序写死在 `index.html`，调换即挂

---

## 运行时引导

```
index.html
  ├─ CDN UMD：React → ReactDOM → Remix Router → react-router → react-router-dom
  ├─ CDN UMD：marked / DOMPurify / highlight.js / Babel Standalone
  ├─ 经典脚本：config.js → utils.js          （无 JSX，注入全局）
  └─ Babel 脚本：db-context → components → pages → app
```

两层脚本不能混：

| 层 | 加载方式 | 为什么 |
| --- | --- | --- |
| `config.js` / `utils.js` | 普通 `<script>` | 常量与纯函数先挂到 `window`，后面的 JSX 文件直接当全局用 |
| `db-context.js` 起 | `type="text/babel" data-presets="react"` | 浏览器内编译 JSX；`data-presets="react"` 避免再套 env |
| `app.js` | 最后执行 | 依赖前面所有全局函数已存在，再 `createRoot` 挂载 |

CDN 版本钉在 URL 上，不走「最新」。highlight.js 主题 stylesheet 必须先于 `style.css`，否则 `.markdown-body` 盖不住代码块背景。

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
        Routes          ← Home / Article / Category / Tag / Search / *
        WorksSection    ┐
        AboutSection    ├ 仅 pathname === '/'
        ContactCta      ┘
        Footer
```

首页区块不塞进 `Home`，是因为它们在路由出口之外：列表分页只影响 `#main`，作品集 / 关于 / 联系始终贴在列表下面。

---

## 数据从哪来

三份数据，职责拆开，避免把正文塞进索引。

```
config.js          站点身份、作品集、缓存键、页脚
     │
db.json            nav / categories / tags / articles 元数据
     │  DBProvider 一次加载，Context 下发
     ▼
Markdown           articles[].file 指向的正文；进入详情才 fetch
```

| 源 | 形态 | 何时读 |
| --- | --- | --- |
| `config.js` | 全局变量 | 脚本加载时立刻生效（含改 `<title>` / meta description） |
| `db.json` | 一份 JSON 索引 | 应用启动时由 `DBProvider` 拉一次，列表 / 导航 / 搜索都吃这份内存 |
| Markdown | 独立文件 | `/article/:id` 按 `post.file` 再请求；不进索引、不进 localStorage |

`db.json` 进内存后按 `date` 倒序。分类 / 标签页是对这份数组的过滤；搜索只扫 `title` 和 `summary`，不打开正文。

作品集（`SITE_WORKS`）不走 `db.json`：那些页面是站根下独立的 `ai-agent/<目录>/`，不进 React 树，本仓库也不收它们。

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

`?nocache=1` 是粘性开关：值必须是字面量 `1`，写入后即使去掉查询参数也继续拉新，直到清存储。

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

消毒白名单只放常见文档协议和相对路径，挡住 `javascript:`。切文章或卸载时用 `cancelled` 丢弃过期响应，避免旧正文写进新页。

`PUBLIC_ASSET_BASE` 把相对 `file` / `cover` 指到别的域名（例如 OSS）；已是 `http(s)` 的 URL 原样保留。空则按站内绝对路径请求。

---

## 路由与导航

| 路径 | 页面做什么 |
| --- | --- |
| `/` | 全站文章分页；`?page=`，第 1 页写成 `/` |
| `/article/:id` | 元数据 + 正文管道 |
| `/category/:id` / `/tag/:id` | 过滤后再分页 |
| `/search?q=` | `searchArticles` 扫标题 / 摘要 |
| `*` | 404 |

滚动策略在壳上统一处理，页面不管：

- `PUSH` / `REPLACE` 且无 hash → 滚到顶部
- `POP`（后退 / 前进）→ 保持原位
- 首页带 hash → `scrollIntoView` 对应 `id`（`#articles` / `#works` / `#about` / `#contact`）

顶栏不写死栏目，由 `db.nav[]` 分发：

| `type` | 去哪 |
| --- | --- |
| `category` / `tag` | `/category/:id`、`/tag/:id` |
| `anchor` | `{ pathname: '/', hash }`，跨页也能回到首页再锚定 |
| `link` | 外链；`target=_blank` 时补 `rel` |

高亮规则：分类 / 标签页对 `value`；文章页取该文第一个分类（db 未就绪时不高亮，避免先闪「首页」）。「首页」和搜索是顶栏固定项，不进 `nav`。

联系区 / 页脚的 GitHub 按钮不是第二份配置，而是从 `nav` 里找 `label === GitHub` 或 URL 含 `github.com` 的 `link`。找不到就不渲染。

---

## 部署

静态托管即可，但必须满足：

1. **SPA fallback**：未知路径 → `index.html`，否则刷新 `/article/:id` 会 404
2. 站点脚本与样式走根路径 `/assets/...`
3. 正文或封面若在站外，设 `PUBLIC_ASSET_BASE`
4. `ai-agent/` 与 SPA 同域部署，但不进本仓库、不进 React 路由
