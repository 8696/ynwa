# YNWA — Agent 约定

无构建步骤的个人博客 SPA。详细架构见 `README.md`。本文件只写改代码时必须遵守的约束。

## 硬约束（不要破）

- 不要引入打包器、`package.json`、`node_modules`、TypeScript、CSS 预处理器。
- 不要升级到 React 19 / React Router 7（无浏览器 UMD）。运行时钉在 `index.html` 里的 CDN 版本。
- 不要用 ES modules：`import` / `export` 在本仓库不工作。所有 JS 通过 `<script>` 顺序加载，符号挂在全局。
- 不要用相对资源路径。站内 URL 一律根绝对路径：`/assets/...`。
- 不要调换 `index.html` 里的脚本顺序。
- 不要把 `ai-agent/` 页面收进本仓库或塞进 React 路由。作品集只在 `config.js` 的 `SITE_WORKS` 里挂外链。

本地预览必须走 HTTP（`file://` 加载不了 Babel `src`，也 `fetch` 不了 `db.json`）：

```bash
npx --yes serve -s . -l 3000
```

`serve -s` 的 SPA fallback 是刷新 `/article/:id` 能工作的前提。

## 文件职责

| 文件 | 做什么 | 不要在这里做 |
| --- | --- | --- |
| `index.html` | CDN + 脚本顺序 | 业务逻辑 |
| `assets/js/config.js` | 站点身份、作品集、缓存键；经典脚本 | JSX、fetch |
| `assets/js/utils.js` | 纯函数；经典脚本 | React、副作用 |
| `assets/js/db-context.js` | 唯一数据入口 + 缓存 | UI |
| `assets/js/components.js` | 可复用块 | 直接 `fetch` `db.json`；自己拼资源 URL |
| `assets/js/pages.js` | 路由页面 | 直接 `fetch` `db.json` |
| `assets/js/app.js` | 路由表、滚动、挂载 | 页面内容 |
| `assets/data/db.json` | nav / categories / tags / 文章元数据 | 正文 Markdown |
| `assets/css/style.css` | 全站样式 | 第三方主题覆盖顺序：highlight.js 须先于本文件 |

调用只允许从上往下：`app → pages → components → db-context → utils/config`。

卡片封面、正文路径一律走 `resolvePublicAssetUrl(...)`。

## JS 写法

Babel 只有 `data-presets="react"`，没有 env / modules。按现有代码写：

- `var` + `function`，不要 `const` / `let` / 箭头函数当主风格。
- React：`React.useState`、`React.useEffect`、`React.Fragment`。
- 路由：`ReactRouterDOM.Link` / `useLocation` / `Routes`。
- 有 JSX 的文件用 `type="text/babel"`；`config.js` / `utils.js` 保持经典脚本。
- 注释用中文，说明「为什么」，不要复述代码在干什么。
- 新增脚本必须同时改 `index.html` 的 `<script>` 标签，并插到正确层。

## 数据与发文

三份数据不要混：

- 站点身份 / 作品集 → `config.js`
- 列表索引 → `db.json`（`DBProvider` 启动时拉一次）
- 正文 → Markdown 文件，仅详情页按 `articles[].file` 再 fetch

新增文章：

1. 把 `.md` 放到 `assets/articles/<分类>/...`
2. 在 `db.json` 的 `articles` 追加一条：`id`（UUID）、`title`、`categories[]`、`tags[]`、`date`（`YYYY-MM-DD HH:MM`）、`summary`、`file`（根路径）、`cover`（可空）
3. `categories` / `tags` 的 id 必须已存在于同文件的目录表；没有就先加目录
4. 不要把正文塞进 `db.json`

`db.json` 进内存后按 `date` 倒序。搜索只扫 `title` 和 `summary`。

改完 `db.json` 后，生产环境有 1 小时 localStorage 缓存。验证最新数据用 `/?nocache=1`（粘性开关，清存储才恢复缓存）。localhost 始终不走缓存。

## UI / CSS

- 视觉：克制 Neo-Brutalism（纸色底、黑边、硬阴影、单一黄强调 `--yellow`）。外壳可以跳；`.markdown-body` 保持安静阅读。
- 颜色、阴影、字体走 `:root` 变量，不要散落魔法色。
- 首页 `WorksSection` / `AboutSection` / `ContactCta` 放在路由出口之外（`app.js`），不要塞进 `Home`。分页只影响 `#main`。
- 顶栏栏目来自 `db.nav[]`，不要在 `Header` 写死栏目。`type`：`category` / `tag` / `anchor` / `link`。

## 改之前先想

- 这条改动是不是在逼项目变成「需要构建」？是就停。
- 新依赖有没有 UMD CDN？没有就不要加。
- 用户要的是内容还是代码？发文只动 `db.json` + Markdown，不要重构 SPA。
