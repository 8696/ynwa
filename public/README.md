# YNWA

一个 **Vite + React + TypeScript** 的静态博客站点：数据来自 `public/data/db.json`，文章内容为 `public/` 下的 Markdown 文件；构建后产物输出到 `dist/`，可部署到任意静态托管平台。

---

## 架构概览

- **渲染形态**：React SPA（`react-router-dom` 路由）。
- **数据层**：`DBProvider`（Context）加载 `/data/db.json`，并按环境使用 `localStorage` 做缓存。
  - **本地开发**（`localhost/127.0.0.1`）：每次强制拉取最新数据
  - **生产环境**：优先读缓存，过期再请求
- **内容层**：文章详情页根据 `db.json` 的 `articles[].file` 拉取对应 Markdown，用 `marked` 解析，并用 `highlight.js` 高亮代码块。

---

## 路由与页面

路由定义在 `src/App.tsx`：

- `/`：首页（文章列表 + 分页，`?page=`）
- `/article/:id`：文章详情（Markdown 渲染）
- `/category/:id`：分类页（按分类筛选）
- `/tag/:id`：标签页（按标签筛选）
- `/search`：搜索页（标题/摘要关键词匹配，`?q=`）
- `*`：404

---

## 项目结构（核心）

```
ynwa/
├── src/
│   ├── main.tsx                 # 入口：BrowserRouter + DBProvider
│   ├── App.tsx                  # 路由表 + 顶/底布局
│   ├── config.ts                # 站点常量（站点名、分页、缓存等）
│   ├── context/DBContext.tsx    # /data/db.json 加载 + 缓存策略
│   ├── pages/                   # Home/Article/Category/Tag/Search/NotFound
│   ├── components/              # Header/Footer/ArticleCard/Pagination/TagLinks
│   ├── utils.ts                 # 分页/搜索/高亮/格式化等纯函数
│   └── types.ts                 # DB 数据结构类型
├── public/
│   ├── data/db.json             # 全站数据源（导航/分类/标签/文章元数据）
│   └── articles/**              # 文章 Markdown（由 db.json 的 file 字段引用）
├── dist/                        # 构建产物（部署该目录）
├── vite.config.js
└── package.json
```

---

## 本地开发

```bash
yarn
yarn dev
```

常用命令：

```bash
yarn build    # 构建到 dist/
yarn preview  # 本地预览 dist/
```

---

## 内容管理（db.json 驱动）

### 新增文章

1) 在 `public/` 下新增 Markdown，例如：

```
public/articles/my-article.md
```

2) 在 `public/data/db.json` 的 `articles` 数组追加一条记录（`file` 为相对 `public/` 的路径）：

```json
{
  "id": "201",
  "title": "文章标题",
  "categories": ["engineering"],
  "tags": ["javascript", "frontend"],
  "date": "2026-05-01",
  "summary": "一句话摘要。",
  "file": "articles/my-article.md",
  "cover": ""
}
```

### 配置顶部导航（nav）

顶部导航由 `public/data/db.json` 的 `nav` 数组驱动（见 `src/components/Header.tsx`）：

- `category` → `/category/<value>`
- `tag` → `/tag/<value>`
- `link` → 外部链接（可配 `target: "_blank"`）

---

## 部署

将 `yarn build` 生成的 `dist/` 目录部署到任意静态托管平台（GitHub Pages / Netlify / Vercel / Cloudflare Pages 等）即可。
