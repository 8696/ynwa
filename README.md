# YNWA

个人博客：**无需构建、无打包器**。浏览器直接加载 HTML / CSS / JSX，运行时库全部来自 jsDelivr。

YNWA 取自利物浦队歌 *You'll Never Walk Alone*。站点记录技术、思考与生活。

- 在线仓库：[github.com/8696/ynwa](https://github.com/8696/ynwa)
- 内容源：`assets/data/db.json`（导航、分类、标签、文章元数据）
- 正文：`assets/articles/` 下的 Markdown

---

## 特点

- 单页应用：React 18 + React Router 6，`index.html` 挂载即可
- JSX 由 Babel Standalone 在浏览器内转换，本地零依赖
- Markdown → HTML（`marked`）后经 `DOMPurify` 消毒，代码块用 `highlight.js` 高亮
- 生产环境用 `localStorage` 缓存 `db.json`（1 小时）；本地开发始终拉最新
- 首页含 Hero、文章列表、关于、联系区；内页为分类 / 标签 / 搜索 / 文章详情

---

## 快速开始

必须用 HTTP 服务打开。`file://` 无法加载 Babel 的 `src` 脚本，也无法 `fetch` `db.json`。

```bash
npx --yes serve -s . -l 3000
```

或：

```bash
npx --yes http-server ./ -c-1
```

浏览器访问提示的本地地址。`serve -s` 会把未知路径回退到 `index.html`，刷新 `/article/:id` 等内页不会 404。

强制跳过数据缓存（写入 localStorage 后会一直生效，直到手动清存储）：

```
http://localhost:3000/?nocache=1
```

---

## 项目结构

```
ynwa/
├── index.html                 # 入口：CDN 脚本 + 站点脚本
├── README.md
└── assets/
    ├── css/style.css          # 全站样式
    ├── data/db.json           # 导航 / 分类 / 标签 / 文章元数据
    ├── articles/              # 文章 Markdown
    └── js/
        ├── config.js          # 站点常量（名称、分页、缓存、页脚）
        ├── utils.js           # 纯函数：日期、分页、搜索、资源 URL
        ├── db-context.js      # DBProvider：加载并缓存 db.json
        ├── components.js      # Header、Footer、卡片、分页等
        ├── pages.js           # 各路由页面 + 首页关于/联系区
        └── app.js             # 路由表与挂载
```

加载顺序固定在 `index.html`：React → Router → marked / DOMPurify / highlight.js → Babel → `config.js` / `utils.js` → 带 JSX 的脚本。不要调换。

---

## 路由

定义在 `assets/js/app.js`：

| 路径 | 页面 |
| --- | --- |
| `/` | 首页（Hero + 文章列表，分页 `?page=`） |
| `/article/:id` | 文章详情（拉取 Markdown 并渲染） |
| `/category/:id` | 按分类筛选 |
| `/tag/:id` | 按标签筛选 |
| `/search` | 搜索标题 / 摘要（`?q=`，不含正文） |
| `*` | 404 |

首页额外渲染关于区与联系区；其它路由只有顶栏、主内容、页脚。

---

## 站点配置

编辑 `assets/js/config.js`：

| 变量 | 说明 |
| --- | --- |
| `SITE_NAME` / `SITE_SLOGAN` / `SITE_DESCRIPTION` | 站点名、口号、简介（写入 `<title>` 与 meta description） |
| `SITE_EMAIL` / `SITE_AUTHOR` / `SITE_CITY` | 联系邮箱、关于区作者信息 |
| `SITE_ABOUT_*` | 关于区正文与标签；作者相关字段全空则不渲染该区块 |
| `PUBLIC_ASSET_BASE` | 可选。文章 `file`、`cover` 为相对路径且资源在其他域名时的公网根 URL（无尾斜杠）。留空则按站内路径请求 |
| `PAGE_SIZE` | 列表每页条数 |
| `CACHE_*` | `db.json` 的 localStorage 键、TTL、`?nocache=1` 开关 |
| `FOOTER_*` | 版权起始年、ICP 备案号与链接 |

---

## 数据与缓存

`DBProvider`（`assets/js/db-context.js`）请求 `/assets/data/db.json`，并按环境决定是否读缓存：

| 环境 | 行为 |
| --- | --- |
| `localhost` / `127.0.0.1` | 每次强制拉取最新 |
| `?nocache=1` | 写入永久禁用标记，之后即使去掉参数也继续拉新 |
| 生产 | TTL（默认 1 小时）内优先读缓存，过期或损坏再请求 |

文章列表在内存中按 `date` 倒序。请求 URL 会追加时间戳，降低中间层把 `db.json` 当成长期静态文件的概率。

---

## 内容管理

站点没有后台。改 Markdown 和 `db.json` 即可。

### 新增文章

1. 在 `assets/articles/` 下新增 Markdown，例如 `assets/articles/engineering/my-article.md`。
2. 在 `assets/data/db.json` 的 `articles` 数组追加一条记录。`id` 建议用 UUID，且全站唯一：

```json
{
  "id": "3e4de540-55bd-41e6-ab7a-e8654dd70059",
  "title": "文章标题",
  "categories": ["engineering"],
  "tags": ["javascript", "frontend"],
  "date": "2026-05-01",
  "summary": "一句话摘要。",
  "file": "/assets/articles/engineering/my-article.md",
  "cover": ""
}
```

`categories` / `tags` 必须对应 `db.json` 里已有的 `id`。`file`、`cover` 可以是站内绝对路径或完整 `http(s)` URL。

### 顶部导航

由 `db.json` 的 `nav` 数组驱动：

| `type` | 行为 |
| --- | --- |
| `category` | 跳转到 `/category/<value>` |
| `tag` | 跳转到 `/tag/<value>` |
| `link` | 外链；可配 `target: "_blank"` |

联系区与页脚会自动识别 label 为 `GitHub` 或 URL 含 `github.com` 的外链。

---

## CDN 依赖

版本钉在 `index.html` 的 script / link 地址上。React 19 与 React Router 7 没有浏览器 UMD，因此钉在 18.3.1 / 6.30.1。

| 库 | 版本 | 用途 |
| --- | --- | --- |
| react / react-dom | 18.3.1 | UI 渲染（UMD） |
| @remix-run/router / react-router / react-router-dom | 6.30.1 | 前端路由 |
| marked | 15.0.7 | Markdown → HTML |
| DOMPurify | 3.4.2 | 文章 HTML 消毒 |
| highlight.js | 11.11.1 | 代码高亮 |
| @babel/standalone | 7.28.5 | 浏览器内编译 JSX |

---

## 部署

把 `index.html` 与 `assets/` 放到任意静态托管即可。服务器必须配置 **SPA fallback**：未知路径回退到 `index.html`，否则刷新内页会 404。

若 Markdown 或封面不在本站，在 `config.js` 里设置 `PUBLIC_ASSET_BASE`。
