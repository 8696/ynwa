# AGENTS

给后续 Agent 的操作手册：改功能、发文章先读本文件。架构说明、`db.json` 字段表、缓存、路由、部署见 `README.md`。

改了约定（脚本顺序、数据入口、CSS 变量、发文流程）必须同步更新本文件；改了字段/架构还要同步 `README.md`。

**不要把本手册写进 `README.md`。** `README.md` 同时是一篇已发布文章的正文（`articles[].file` 为 `/README.md`），改它等于改那篇文章。

---

## 下手对照表

按任务找文件，不要全仓扫。

| 你要做的事 | 改哪些文件 | 不要动 |
| --- | --- | --- |
| **发 / 改 / 下线文章** | `assets/data/db.json` 的 `articles[]` + `assets/articles/**/*.md`（封面图若有） | 不要改已发布文章的 `id`；不要把正文写进 JSON |
| **加分类 / 标签** | `db.json` 的 `categories[]` 或 `tags[]`；分类若要上顶栏再改 `nav[]` | 文章里必须写词典 **id**，不要写展示名 |
| **改顶栏栏目** | `db.json` 的 `nav[]` | 「首页」和搜索是代码写死的，不要写进 `nav` |
| **加 AI 作品卡** | `db.json` 的 `works[]`；独立页部署到同域 `/ai-page/<目录>/` | 不要把作品页收进 React 路由；本仓库不收 `ai-page/` 源码 |
| **改站点名 / 关于 / 邮箱 / 页脚** | `assets/js/config.js` | 作品条目、栏目、文章不放这里 |
| **改强调色 / 加一套主题** | `assets/js/themes.js` 的 `themes` 数组 | 不要写进 `config.js` 或 `index.html` 底部，否则首屏闪默认黄 |
| **改列表卡片 / 顶栏 / 页脚 / 作品卡 / 关于 / 联系** | `assets/js/components.js` + 必要时 `assets/css/style.css` | 不要在页面里复制一份卡片 DOM |
| **改某个路由页（首页、详情、搜索…）** | `assets/js/pages.js` + 必要时 `style.css` | 页面不要自己 `fetch db.json` |
| **加一条新路由** | `pages.js` 写页面 → `app.js` 的 `<Routes>` 登记；要上顶栏再改 `nav[]` | 托管必须继续把未知路径回退到 `index.html` |
| **加纯函数（日期、搜索、URL）** | `assets/js/utils.js` | 无 JSX、无 `import`/`export` |
| **改缓存 / 数据加载** | `assets/js/db-context.js` | 全站只允许这一处读 `db.json` |
| **加 CDN 库或新脚本文件** | `index.html` 按现有顺序插入 `<script>` | 不能调换 React → Router → Babel 的顺序 |
| **改样式** | `assets/css/style.css`，优先用已有 CSS 变量 | 不要再写一套 Markdown 正文样式；不要硬编码强调色 |

字段含义、当前分类/标签/作品清单见 `README.md` 的「`db.json`：全站内容索引」。

---

## 硬约束

站点按静态文件部署。违反下面任意一条，页面会白屏、闪错色、或刷新内页 404。

1. **没有打包器、没有 `package.json` 依赖、没有构建步骤。** 不要引入 npm 包、不要写 `import`/`export`、不要上 TypeScript。新库只能用 jsDelivr **UMD**，版本钉在 URL 上，并在 `index.html` 按顺序加入。
2. **React 钉在 18.3.1，React Router 钉在 6.30.1**（没有浏览器 UMD 的 19 / 7）。JSX 用 Babel Standalone 在浏览器里编。
3. **所有站内资源用根绝对路径**（`/assets/...`、`/article/:id`）。相对路径会在子路由下解析错。
4. **`index.html` 脚本顺序不能调换。** `themes.js` 必须在 `style.css` 之前；Babel 必须在 `type="text/babel"` 之前；`config.js` / `utils.js` 必须在组件脚本之前；`app.js` 最后挂载。
5. **数据只从 `useDB()` 来。** 禁止在页面或卡片里再 `fetch('/assets/data/db.json')`。资源 URL 一律 `resolvePublicAssetUrl`。
6. **调用方向只允许从上往下：** `app.js` → `pages.js` / `components.js` → `db-context.js` → `utils.js` / `config.js`。`themes.js` 只在 CSS 前执行，不要让 React 代码去读它。
7. **JSON 必须合法。** 末项禁止逗号，字符串用双引号。`db.json` 坏掉时全站列表变成「数据加载失败」。
8. **本机预览必须走 HTTP**（`file://` 加载不了 Babel 的 `src`，也 `fetch` 不了 `db.json`）。

脚本加载顺序、分层图见 `README.md` 的「运行时引导」「分层」。

---

## 代码写在哪、怎么写

| 文件 | 放什么 | 写法 |
| --- | --- | --- |
| `themes.js` | 强调色表 + 按本地日期天数 % 主题数轮换写入 CSS 变量（同一天全球访客同色，次日换下一组） | 经典脚本，IIFE，无 JSX |
| `config.js` | 站点身份常量 | 经典脚本，`var` 全局；无 JSX |
| `utils.js` | 纯函数 | 经典脚本，`function foo()` 挂到全局；无 JSX |
| `db-context.js` | `DBProvider` / `useDB` | `type="text/babel"`，可用 JSX |
| `components.js` | Header、Footer、ArticleCard、Works*、About、Contact、Pagination、DbState | 同上 |
| `pages.js` | Home、Article、Category、Tag、Search、Works、NotFound | 同上 |
| `app.js` | 路由表、滚动、挂载 | 新路由只在这里的 `<Routes>` 加 |
| `style.css` | 全站样式 | 单一文件；颜色/阴影/边框走 CSS 变量 |

JSX 文件约定（与现有代码保持一致）：

- 用 `var` 和 `function`，不要 `let`/`const`/`import`/`export`/`class`
- React API 写全名：`React.useState`、`React.useEffect`、`React.useMemo`、`ReactRouterDOM.Link`
- 解构用下标：`var _s = React.useState(0); var x = _s[0]; var setX = _s[1]`
- 注释写中文，说明「为什么」，不要复述代码
- 新全局函数加在 `utils.js`，后面的 Babel 文件可以直接调用，不必 import

样式约定：

- 强调色用 `--accent` / `--accent-soft` / `--accent-2` / `--on-accent` / `--on-accent-2`，不要写死 `#ffe135`
- 内容宽用已有的 `.page` / `.wrap` / `.site-header-inner`
- 黑边硬阴影用 `--stroke`、`--shadow`、`--shadow-sm` / `--md` / `--lg`
- 斑马条纹用 `--stripe`，不要再复制一份 `repeating-linear-gradient`
- 区块大标题用 `.section-title`（更大用 `--lg` / `--display`）
- 按钮用 `.btn`，小按钮叠加 `.btn--sm`
- 正文只走 `.markdown-body`，不要再加一套 `.prose`
- 断点：作品瀑布流 `640px`，其余 `768px`

现有组件先搜再改，不要重写：`Header`、`Footer`、`ArticleCard`、`Pagination`、`DbState`、`WorksSection`、`WorksCard`、`AboutSection`、`ContactCta`、`Home`、`Article`、`Category`、`Tag`、`Search`、`Works`、`NotFound`。

`useDB()` 返回 `{ db, loadDB, error, retryDB }`。

---

## 发一篇新文章

只改内容时，**通常只动 `db.json` + 一个 `.md` 文件**。不要改 JS。

### 1. 准备正文

把 Markdown 放到 `assets/articles/<分类目录>/xxx.md`。现有习惯：

```
/assets/articles/ai/hermes/...
/assets/articles/engineering/...
```

也可以放到 OSS，再把 `config.js` 的 `PUBLIC_ASSET_BASE` 设成公网根（无尾斜杠）。

### 2. 确认分类和标签已在词典里

打开 `assets/data/db.json`（当前 id 以文件为准，README 里有一份清单）：

- 文章里填的是 **id**，不是 `name`（标签写 `frontend` 不要写「前端」；写 `Hermes-Agent` 不要写 `Hermes Agent`）
- 没有就先在 `categories[]` / `tags[]` 加一条
- 分类若要上顶栏，再往 `nav[]` 加 `{ "label": "展示名", "value": "/category/新id", "target": "" }`

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

- `categories[0]` 决定从该文进详情时顶栏高亮哪个分类
- `file` 用站内绝对路径（前导 `/`）或 `https://...`
- 搜索只扫 `title` 和 `summary`，不扫正文、不扫标签名

### 4. 自检

本机 `npx --yes serve -s . -l 3000`（必须 HTTP）打开后确认：

1. 首页列表能看到，且按日期排在该出现的位置
2. 详情：标题、摘要、正文、代码高亮正常
3. 分类 chip、标签过滤含这篇文章
4. 搜索摘要里的关键词能命中
5. `db.json` 仍能被 `JSON.parse`

本机 `localhost` 不走 localStorage 缓存。生产访客可能仍吃一小时缓存：`/?nocache=1` 或等 TTL。

### 改 / 下线 / 加作品

| 改什么 | 动哪里 |
| --- | --- |
| 只改正文 | 只编辑 `.md` |
| 标题、摘要、分类、标签、日期、封面 | 改 `articles[]` 对应字段 |
| 下线 | 从 `articles[]` 删掉该对象；`.md` 可留着 |
| 加作品 | 独立页放到同域 `/ai-page/<目录>/index.html`（不要进 React 路由），再在 `works[]` 追加。`works[].tags` 是展示字符串，不是文章标签词典。首页最多 4 张卡且末张是「更多」，所以首页只露出前 3 个；完整列表在 `/works` |

---

## 加功能时怎么接

### 新路由页

1. 在 `pages.js` 写页面组件，数据用 `useDB()`，空态/失败用 `<DbState />`
2. 在 `app.js` 的 `<Routes>` 加一条，放在 `path="*"` **之前**
3. 需要顶栏入口 → `db.json` `nav[]`
4. 样式加在 `style.css`，内容容器用 `className="page"`
5. `document.title` 在该页 `useEffect` 里改，参考现有页面

首页底下的作品 / 关于 / 联系**不要塞进 `Home`**：它们挂在 `app.js`、路由出口之外，列表翻页不会卸掉。新的「分页后仍留在首页底部」的区块同样挂在 `isHome ? ...` 旁边，并给锚点 `id`（现有：`#articles`、`#works`、`#about`、`#contact`）。

### 新卡片 / 复用 UI

优先扩展 `components.js` 里已有组件（`ArticleCard` 已支持搜索高亮和 `openInNewTab`）。不要在 `pages.js` 再复制一套 DOM。

### 新脚本 / CDN

1. 无 JSX → 普通 `<script src="/assets/js/xxx.js">`，放在 `config.js` / `utils.js` 附近
2. 有 JSX → `type="text/babel" data-presets="react"`，放在 `components.js` / `pages.js` 附近，且在 `app.js` 之前
3. 必须在首屏前生效（如主题）→ 放在 `style.css` **之前**，参考 `themes.js`
4. 新库只加 UMD。React / Router 那五段顺序不可改

`config.js` 常量、`themes.js` 调色板说明见 `README.md` 的「`config.js` 里改什么」。

---

## 改完怎么验

内容改动：走上面「发一篇新文章 → 自检」。

功能改动至少确认：

1. 本机 HTTP 预览，硬刷新后再看
2. 首页、一篇详情、一个分类、搜索、作品集、404 都能打开
3. 刷新 `/article/:id` 不是服务器 404（SPA fallback）
4. 窄屏顶栏汉堡菜单、宽屏横排导航
5. 若动过主题：深色强调（蓝 / 咖啡等）上按钮和 CTA 的字仍然能看清
6. 若动过 `db.json`：文件仍是合法 JSON
7. 若动过约定：同步更新 `AGENTS.md`；若动过字段/架构：同步更新 `README.md`
