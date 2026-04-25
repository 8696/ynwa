# YNWA

纯静态个人博客，无框架、无构建步骤，直接部署一个文件夹即可运行。

---

## 项目结构

```
ynwa/
├── index.html          # 首页：全部文章列表 + 分页
├── category.html       # 分类页：某分类的文章列表 + 分页
├── tag.html            # 标签页：含该标签的文章列表 + 分页
├── article.html        # 详情页：Markdown 渲染 + 代码高亮
├── search.html         # 搜索页：对 db.json 全字段实时搜索
├── assets/
│   ├── css/
│   │   ├── style.css                   # 补充样式（毛玻璃顶栏、prose 排版、markdown-body 等）
│   │   └── vendor/
│   │       └── highlight.github.min.css  # highlight.js GitHub 主题
│   └── js/
│       ├── config.js       # 全站常量（站点名、数据路径、分页数、缓存时长）
│       ├── utils.js        # 工具函数（URL 参数、日期格式化、分类/标签名、标签链接 HTML）
│       ├── db.js           # 加载 db.json + localStorage 缓存
│       ├── pagination.js   # 本地切片分页 + 分页条 DOM 渲染
│       ├── render.js       # 顶部导航、全站页脚、文章列表卡片
│       ├── search.js       # db.json 全字段深度搜索 + 结果高亮渲染
│       └── vendor/
│           ├── tailwindcss.js      # Tailwind CSS（本地离线版）
│           ├── marked.min.js       # Markdown 解析
│           └── highlight.min.js    # 代码语法高亮
└── data/
    └── db.json         # 数据源：导航、分类、标签、文章元数据
```

---

## 本地预览

直接用浏览器打开 `file://` 路径会因跨域限制无法 fetch，需要启动本地 HTTP 服务：

```bash
# Python 3
python3 -m http.server 8080

# Node.js（http-server）
npx http-server ./ -c-1

# Node.js（serve）
npx serve .
```

访问 `http://localhost:8080` 即可。

---

## 内容管理

### 新增文章

**第一步**：在任意位置新建 Markdown 文件（推荐放在 `articles/` 目录）：

```
articles/my-article.md
```

**第二步**：在 `data/db.json` 的 `posts` 数组末尾追加一条记录：

```json
{
  "id": "201",
  "title": "文章标题",
  "category": "engineering",
  "tags": ["javascript", "frontend"],
  "date": "2026-05-01",
  "summary": "一句话摘要，显示在列表页卡片与详情页头部。",
  "file": "articles/my-article.md",
  "cover": ""
}
```

字段说明：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 全局唯一，用作文章页 URL 参数（`?id=201`） |
| `title` | string | 文章标题 |
| `category` | string | 分类 id，需在 `categories` 数组中存在 |
| `tags` | string[] | 标签 id 列表，需在 `tags` 数组中存在 |
| `date` | string | 发布日期，格式 `YYYY-MM-DD`，列表页按此降序排列 |
| `summary` | string | 摘要文字，列表卡片最多展示 2 行 |
| `file` | string | Markdown 文件相对路径（从站点根目录出发） |
| `cover` | string | 封面图 URL，留空则卡片不显示图片 |

**第三步**：保存文件，刷新页面即可看到新文章。

> 若启用了 localStorage 缓存，可在浏览器控制台执行 `clearDBCache()` 强制重新加载，无需等待缓存过期。

---

### 新增分类

在 `data/db.json` 的 `categories` 数组中添加：

```json
{ "id": "essay", "name": "随笔", "description": "日常随想" }
```

顶部导航中若同时在 `nav` 配置了对应条目，会自动显示链接并在分类页高亮。

---

### 新增标签

在 `data/db.json` 的 `tags` 数组中添加：

```json
{ "id": "rust", "name": "Rust" }
```

文章列表卡片与详情页的标签均可点击，跳转到 `tag.html?id=<标签id>`，列出所有含该标签的文章（支持分页）。

---

### 配置顶部导航（nav）

顶部导航完全由 `data/db.json` 的 `nav` 数组驱动，支持三种类型：

```json
[
  { "type": "category", "label": "AI",      "value": "AI" },
  { "type": "category", "label": "技术实践", "value": "engineering" },
  { "type": "tag",      "label": "JavaScript", "value": "javascript" },
  { "type": "link",     "label": "GitHub",  "value": "https://github.com", "target": "_blank" }
]
```

| `type` | 跳转目标 | 说明 |
|--------|----------|------|
| `category` | `category.html?id=<value>` | 分类页，当前分类会高亮 |
| `tag` | `tag.html?id=<value>` | 标签页，当前标签会高亮 |
| `link` | `value` 原始地址 | 任意外链，可配 `"target": "_blank"` |

导航最右侧固定渲染一个搜索图标，跳转到 `search.html`。

---

### 修改站点名称

在 `assets/js/config.js` 中修改 `SITE_NAME`：

```js
const SITE_NAME = 'YNWA';
```

该值用于：
- 顶栏 Logo 文字（`.site-title` 元素）
- 各页 `document.title`（如 `文章标题 · YNWA`）

各页根元素的 `data-pm-title` 属性（`home` / `category` / `tag` / `post` / `search`）决定 `document.title` 的前缀，由 `config.js` 加载时自动设置。

---

## 缓存机制

`db.json` 加载后会写入 `localStorage`，有效期内刷新页面不发网络请求。

| 配置项 | 位置 | 默认值 |
|--------|------|--------|
| 缓存有效期 | `assets/js/config.js` → `CACHE_TTL_MS` | `3600000 ms`（1 小时） |
| 缓存数据 key | `assets/js/config.js` → `CACHE_KEY` | `DA_CACHE_KEY` |
| 缓存时间戳 key | `assets/js/config.js` → `CACHE_TS_KEY` | `DA_CACHE_TS_KEY` |

修改 `db.json` 后若需立即生效，在控制台执行：

```js
clearDBCache()
```

---

## 搜索功能

搜索页（`search.html`）对 `db.posts` 数组中所有文章条目的**字段值**做深度递归搜索（不比较键名），不区分大小写，实时防抖响应（200 ms）。

- 搜索关键词会同步到 URL 参数 `?q=`，支持直接分享搜索链接
- 匹配结果按文章去重，最多显示 50 条（`SEARCH_MAX_RESULTS`）
- 命中内容用 `<mark>` 高亮首处匹配片段

---

## JS 模块依赖顺序

各页面按以下顺序加载脚本（`config.js` 最先加载，详情页额外引入 Markdown/高亮库）：

```
config.js → utils.js → db.js → pagination.js → render.js
                                               └─ search.js（仅 search.html）
vendor/marked.min.js + vendor/highlight.min.js（仅 article.html）
```

---

## 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 + 原生 JS | 页面结构与所有交互逻辑 |
| [Tailwind CSS](https://tailwindcss.com)（本地离线） | 工具类样式 |
| [marked.js](https://marked.js.org) | Markdown → HTML（GFM 模式） |
| [highlight.js](https://highlightjs.org) | 代码块语法高亮（GitHub 主题） |
| localStorage | db.json 短期缓存 |

所有第三方库均以本地文件形式存放在 `assets/js/vendor/` 和 `assets/css/vendor/`，无 CDN 依赖，离线可用。

---

## 部署

任意静态托管平台，将整个目录上传即可：

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

无需构建步骤，无需 Node.js 环境，上传即生效。
