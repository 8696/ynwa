# YNWA

一个 **Vite + React + TypeScript** 的静态博客站点：数据来自 `public/data/db.json`，文章内容可为 `public/` 下的 Markdown，或通过 **阿里云 OSS** 托管；构建产物输出到 `dist/`，可部署到任意静态托管平台。

---

## 架构概览

- **渲染形态**：React SPA（`react-router-dom` 路由）。
- **数据层**：`DBProvider`（Context）加载 `/data/db.json`，并按环境使用 `localStorage` 做缓存。
  - **本地开发**（`localhost/127.0.0.1`）：每次强制拉取最新数据
  - **生产环境**：优先读缓存，过期再请求
- **内容层**：文章详情根据 `db.json` 的 `articles[].file` 请求 Markdown；相对路径可通过环境变量 `VITE_PUBLIC_ASSET_BASE` 解析到 OSS 公网根，与站内 `/public` 资源统一处理（`resolvePublicAssetUrl` / `normalizeArticleFilePath`）。解析后用 `marked` 渲染，并用 `highlight.js` 高亮代码块。
- **发布工具**：`/upload` 提供分步流程（配置 OSS → 选择文件 → 填写元数据 → 更新/合并 `db.json`），将文章与封面上传到 OSS，便于与静态站点分离托管。

---

## 路由与页面

路由定义在 `src/App.tsx`：

- `/`：首页（文章列表 + 分页，`?page=`）
- `/article/:id`：文章详情（Markdown 渲染）
- `/category/:id`：分类页（按分类筛选）
- `/tag/:id`：标签页（按标签筛选）
- `/search`：搜索页（标题/摘要关键词匹配，`?q=`）
- `/upload`：OSS 上传与发布（阿里云 OSS，本地填写密钥；生产部署请改用 STS 等安全方案）
- `*`：404

---

## 环境变量（Vite）

构建或开发前可在项目根目录配置 `.env` / `.env.production`：

| 变量 | 说明 |
|------|------|
| `VITE_PUBLIC_ASSET_BASE` | 可选。文章 `file`、`cover` 为相对路径且资源托管在 OSS 时的**公网根 URL**（无尾斜杠），例如 `https://bucket.oss-cn-shenzhen.aliyuncs.com`。未设置时，相对路径仍按站内路径（前导 `/`）请求。 |

---

## 项目结构（核心）

```
ynwa/
├── src/
│   ├── main.tsx                 # 入口：BrowserRouter + DBProvider
│   ├── App.tsx                  # 路由表 + 顶/底布局
│   ├── config.ts                # 站点常量、分页、缓存、`PUBLIC_ASSET_BASE` 等
│   ├── context/DBContext.tsx    # /data/db.json 加载 + 缓存策略
│   ├── pages/                   # Home/Article/Category/Tag/Search/Upload/NotFound
│   ├── components/              # Header/Footer/ArticleCard/Pagination/TagLinks
│   ├── utils.ts                 # 分页/搜索/高亮/格式化、公共资源 URL 解析等
│   └── types.ts                 # DB 数据结构类型
├── public/
│   ├── data/db.json             # 全站数据源（导航/分类/标签/文章元数据）
│   └── articles/**              # 文章 Markdown（本地托管时由 db.json 的 file 引用）
├── dist/                        # 构建产物（部署该目录）
├── vite.config.js
└── package.json
```

依赖说明：`ali-oss` 用于上传页的浏览器端上传（开发依赖声明于 `package.json`）。

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

若文章正文或封面在 OSS 上，本地预览前可设置 `VITE_PUBLIC_ASSET_BASE`，以便详情页与列表正确加载资源。

---

## 内容管理（db.json 驱动）

### 新增文章（纯静态）

1) 在 `public/` 下新增 Markdown，例如：

```
public/articles/my-article.md
```

2) 在 `public/data/db.json` 的 `articles` 数组追加一条记录（`file` 为相对 `public/` 的路径，或以 `/` 开头的站内路径；亦可填完整 `http(s)` URL）：

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

### 通过 OSS 上传页发布（`/upload`）

在开发环境访问 `/upload`，按页面步骤配置 OSS、上传 Markdown/封面、填写标题/分类/标签等元数据，并合并写入 `db.json` 逻辑（具体字段与流程以页面为准）。部署到公网时，**不建议将永久 AccessKey 暴露给浏览器**，应改为 STS 临时凭证或后端签发上传策略。

### 配置顶部导航（nav）

顶部导航由 `public/data/db.json` 的 `nav` 数组驱动（见 `src/components/Header.tsx`）：

- `category` → `/category/<value>`
- `tag` → `/tag/<value>`
- `link` → 外部链接（可配 `target: "_blank"`）

---

## 部署

将 `yarn build` 生成的 `dist/` 目录部署到任意静态托管平台（GitHub Pages / Netlify / Vercel / Cloudflare Pages 等）即可。若 Markdown 与封面在 OSS，请同时配置生产环境构建所用的 `VITE_PUBLIC_ASSET_BASE`，与线上 `db.json` 中的相对路径一致。
