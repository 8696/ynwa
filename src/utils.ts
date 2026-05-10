import type { DB, Article, PaginatedResult, SearchResult } from './types'
import { PUBLIC_ASSET_BASE } from './config'

/** 将日期字符串格式化为中文长日期，如 "2026年4月25日" */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

/** 根据 ID 查找分类名称，找不到则返回原始 ID */
export function getCategoryName(db: DB, id: string): string {
  const cat = db.categories.find(c => c.id === id)
  return cat ? cat.name : id
}

/** 将分类 ID 列表解析为 { id, name } 对象数组，兼容 string / string[] / undefined 三种输入 */
export function getCategoryList(db: DB, categories: string[] | string | undefined): { id: string; name: string }[] {
  const ids = Array.isArray(categories) ? categories : categories ? [categories] : []
  return ids.map(id => {
    const cat = db.categories.find(c => c.id === id)
    return { id, name: cat ? cat.name : id }
  })
}

/** 将标签 ID 列表解析为可读名称列表 */
export function getTagNames(db: DB, ids: string[]): string[] {
  return (ids || []).map(id => {
    const t = db.tags.find(x => x.id === id)
    return t ? t.name : id
  })
}

/**
 * 通用分页函数：对文章列表进行分页切割
 * @returns 分页元信息（当前页、总页数、总条数）及当前页的文章切片
 */
export function paginate(items: Article[], page: number, size: number): PaginatedResult<Article> {
  const total = items.length
  const totalPages = Math.ceil(total / size) || 1
  // 确保 current 在 [1, totalPages] 范围内
  const current = Math.max(1, Math.min(page, totalPages))
  const start = (current - 1) * size
  return { items: items.slice(start, start + size), current, totalPages, total }
}

/**
 * 构建分页器中显示的页码序列
 * 规则：总页数 ≤7 时全部展示；否则显示首尾页 + 当前页前后各1页 + 省略号
 */
export function buildPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  if (current > 3) pages.push('...')
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
}

/** HTML 特殊字符转义，防止 XSS */
export function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 对文本中的搜索关键词进行高亮标记
 * 使用大小写不敏感匹配，命中部分用 <mark> 包裹
 */
export function highlightOne(text: string | undefined, q: string): string {
  if (!q || !text) return escapeHtml(text ?? '')
  const t = String(text)
  const idx = t.toLowerCase().indexOf(q.trim().toLowerCase())
  if (idx < 0) return escapeHtml(t)
  const before = escapeHtml(t.slice(0, idx))
  const mid = escapeHtml(t.slice(idx, idx + q.trim().length))
  const after = escapeHtml(t.slice(idx + q.trim().length))
  return `${before}<mark class="bg-amber-100 text-[#1c1c1e] rounded px-0.5">${mid}</mark>${after}`
}

/** 在文章标题和摘要中搜索关键词，返回匹配结果（标题匹配优先） */
export function searchArticles(db: DB, query: string): SearchResult[] {
  const q = (query || '').trim()
  if (!q) return []
  const qLower = q.toLowerCase()
  const results: SearchResult[] = []
  for (const post of (db.articles || [])) {
    if (!post) continue
    const inTitle = post.title && String(post.title).toLowerCase().includes(qLower)
    const inSummary = post.summary && String(post.summary).toLowerCase().includes(qLower)
    if (inTitle || inSummary) {
      results.push({ post, matchedField: inTitle ? 'title' : 'summary' })
    }
  }
  return results
}

/**
 * db.json 中 article.file：站内或 OSS 相对路径统一为单前导 `/`；完整 http(s) URL 保持原样。
 */
export function normalizeArticleFilePath(file: string): string {
  const p = file.trim()
  if (!p) return ''
  if (/^https?:\/\//i.test(p)) return p
  return '/' + p.replace(/^\/+/, '')
}

/**
 * 将 db 中的 file / cover 转为可请求的 URL。
 * 已是 http(s) 则原样返回；否则若有 PUBLIC_ASSET_BASE 则拼到 OSS 根下；否则作为站内路径（前导 /）。
 */
export function resolvePublicAssetUrl(path: string): string {
  const raw = path.trim()
  if (!raw) return ''
  if (/^https?:\/\//i.test(raw)) return raw
  const p = normalizeArticleFilePath(raw)
  const base = PUBLIC_ASSET_BASE
  if (!base) return p
  const rel = p.replace(/^\/+/, '')
  return `${base}/${rel}`
}
