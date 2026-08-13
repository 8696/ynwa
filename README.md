# YNWA

一个 **静态 HTML / CSS + React** 博客站点：无需构建，页面由浏览器直接加载；运行时库全部来自公开 CDN。数据来自 `assets/data/db.json`，文章 Markdown 放在 `assets/articles/`。

---

## 架构概览

- **渲染形态**：单页应用（`index.html` 挂载 React，`react-router-dom` 路由）。
- **样式**：`assets/css/style.css`。
- **脚本**：`assets/js/` 下的 JS / JSX；JSX 由 CDN 上的 Babel Standalone 在浏览器中转换。
- **数据层**：`DBProvider` 加载 `/assets/data/db.json`，并按环境使用 `localStorage` 做缓存。
  - **本地开发**（`localhost/127.0.0.1`）：每次强制拉取最新数据
  - **生产环境**：优先读缓存，过期再请求
- **内容层**：文章详情根据 `db.json` 的 `articles[].file` 请求 Markdown；相对路径可在 `assets/js/config.js` 的 `PUBLIC_ASSET_BASE` 中解析到公网根。解析后用 `marked` 渲染，并用 `highlight.js` 高亮代码块。

---

## CDN 依赖（jsDelivr）

| 库 | 版本 | 用途 |
| --- | --- | --- |
| react / react-dom | 18.3.1 | UI 渲染（UMD，便于 `<script>` 直接引入） |
| @remix-run/router / react-router / react-router-dom | 6.30.1 | 前端路由 |
| marked | 15.0.7 | Markdown → HTML |
| DOMPurify | 3.4.2 | 文章 HTML 消毒 |
| highlight.js | 11.11.1 | 代码高亮 |
| @babel/standalone | 7.28.5 | 浏览器内编译 JSX |

版本钉在 `index.html` 的 script / link 地址上。

---

## 路由与页面

路由定义在 `assets/js/app.js`：

- `/`：首页（文章列表 + 分页，`?page=`）
- `/article/:id`：文章详情（Markdown 渲染）
- `/category/:id`：分类页（按分类筛选）
- `/tag/:id`：标签页（按标签筛选）
- `/search`：搜索页（标题/摘要关键词匹配，`?q=`）
- `*`：404

---

## 站点配置

编辑 `assets/js/config.js`：

| 变量 | 说明 |
|------|------|
| `PUBLIC_ASSET_BASE` | 可选。文章 `file`、`cover` 为相对路径且资源在其他域名时的**公网根 URL**（无尾斜杠）。留空时按站内路径请求。 |
| `SITE_NAME` / `PAGE_SIZE` / 缓存与页脚常量 | 站点名称、分页、缓存策略、ICP 等 |

---

## 项目结构

```
ynwa/
├── index.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/                 # 站点脚本
    ├── data/db.json        # 导航 / 分类 / 标签 / 文章元数据
    └── articles/**         # 文章 Markdown
```

---

## 本地预览

需要用 HTTP 服务打开（`file://` 无法加载 Babel 的 `src` 脚本，也无法 fetch `db.json`）。

```bash
http-server ./ -c-1
```

或：

```bash
npx --yes serve -s . -l 3000
```

浏览器访问提示的本地地址。若使用 `serve -s`，未知路径会回退到 `index.html`，刷新内页不会 404。

---

## 内容管理（db.json 驱动）

### 新增文章（纯静态）

1) 在 `assets/articles/` 下新增 Markdown，例如：

```
assets/articles/my-article.md
```

2) 在 `assets/data/db.json` 的 `articles` 数组追加一条记录：

```json
{
  "id": "201",
  "title": "文章标题",
  "categories": ["engineering"],
  "tags": ["javascript", "frontend"],
  "date": "2026-05-01",
  "summary": "一句话摘要。",
  "file": "/assets/articles/my-article.md",
  "cover": ""
}
```

### 配置顶部导航（nav）

顶部导航由 `assets/data/db.json` 的 `nav` 数组驱动：

- `category` → `/category/<value>`
- `tag` → `/tag/<value>`
- `link` → 外部链接（可配 `target: "_blank"`）

---

## 部署

将 `index.html` 与 `assets/` 部署到任意静态托管平台。静态服务器需配置 **SPA fallback**（前端路由回退到 `index.html`）。

若 Markdown 与封面不在本站，请在 `assets/js/config.js` 中设置 `PUBLIC_ASSET_BASE`。
