/**
 * 纯函数工具。无 React 依赖，由经典脚本加载后挂到全局。
 */

/**
 * 将日期字符串格式化为「YYYY-MM-DD HH:MM:SS」，按数据库原始时间戳展示到秒。
 * 例：'2026-04-25 14:00:00' → '2026-04-25 14:00:00'。
 * 非法日期会得到浏览器默认的 Invalid Date 文案。
 */
function formatDate(dateStr) {
  var d = new Date(dateStr)
  if (isNaN(d.getTime())) return d.toString()
  var pad = function (n) { return n < 10 ? '0' + n : '' + n }
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
    ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds())
}

/** 根据分类 ID 取展示名；db 里找不到时回退为原始 ID，避免空白 */
function getCategoryName(db, id) {
  var cat = db.categories.find(function (c) { return c.id === id })
  return cat ? cat.name : id
}

/**
 * 把文章上的 categories 字段规范成 { id, name }[]。
 * 兼容历史数据：可能是 string、string[] 或缺省。
 */
function getCategoryList(db, categories) {
  var ids = Array.isArray(categories) ? categories : categories ? [categories] : []
  return ids.map(function (id) {
    var cat = db.categories.find(function (c) { return c.id === id })
    return { id: id, name: cat ? cat.name : id }
  })
}

/** 标签 ID → 可读名称；未知 ID 原样返回，保证链接仍可点 */
function getTagNames(db, ids) {
  return (ids || []).map(function (id) {
    var t = db.tags.find(function (x) { return x.id === id })
    return t ? t.name : id
  })
}

/**
 * 对文章列表分页。current 会被夹在 [1, totalPages]，避免 ?page=0 或超大页码越界。
 * totalPages 至少为 1，空列表时分页器仍可按「第 1 页」处理。
 */
function paginate(items, page, size) {
  var total = items.length
  var totalPages = Math.ceil(total / size) || 1
  var current = Math.max(1, Math.min(page, totalPages))
  var start = (current - 1) * size
  return { items: items.slice(start, start + size), current: current, totalPages: totalPages, total: total }
}

/**
 * 分页器页码序列：总页数 ≤7 时全部列出；否则保留首页、末页、当前页±1，中间用 '...' 省略。
 */
function buildPageRange(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, function (_, i) { return i + 1 })
  }
  var pages = [1]
  if (current > 3) pages.push('...')
  for (var i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
}

/** 转义 HTML 特殊字符，供搜索高亮拼字符串前使用，避免关键词本身带标签时注入 */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 在一段文本里高亮「第一次」大小写不敏感命中；未命中则整段转义后返回。
 * 只标第一处是为了结果列表简洁，且避免复杂正则在用户输入下的开销。
 */
function highlightOne(text, q) {
  if (!q || !text) return escapeHtml(text || '')
  var t = String(text)
  var idx = t.toLowerCase().indexOf(q.trim().toLowerCase())
  if (idx < 0) return escapeHtml(t)
  var before = escapeHtml(t.slice(0, idx))
  var mid = escapeHtml(t.slice(idx, idx + q.trim().length))
  var after = escapeHtml(t.slice(idx + q.trim().length))
  return before + '<mark class="search-mark">' + mid + '</mark>' + after
}

/**
 * 只在标题、摘要中做子串匹配（不含正文）。
 * 标题命中时 matchedField 记为 title，便于后续若要区分展示权重。
 */
function searchArticles(db, query) {
  var q = (query || '').trim()
  if (!q) return []
  var qLower = q.toLowerCase()
  var results = []
  var articles = db.articles || []
  for (var i = 0; i < articles.length; i++) {
    var post = articles[i]
    if (!post) continue
    var inTitle = post.title && String(post.title).toLowerCase().indexOf(qLower) >= 0
    var inSummary = post.summary && String(post.summary).toLowerCase().indexOf(qLower) >= 0
    if (inTitle || inSummary) {
      results.push({ post: post, matchedField: inTitle ? 'title' : 'summary' })
    }
  }
  return results
}

/**
 * 规范化 article.file / 同类相对路径：http(s) 原样保留；否则压成单一前导 /，避免 // 或缺斜杠。
 */
function normalizeArticleFilePath(file) {
  var p = file.trim()
  if (!p) return ''
  if (/^https?:\/\//i.test(p)) return p
  return '/' + p.replace(/^\/+/, '')
}

/**
 * 把 db 里的 file、cover 转成浏览器可请求的 URL。
 * 已是绝对 http(s) 则不改；否则有 PUBLIC_ASSET_BASE 时拼到该根下，没有则当站内路径。
 */
function resolvePublicAssetUrl(path) {
  var raw = path.trim()
  if (!raw) return ''
  if (/^https?:\/\//i.test(raw)) return raw
  var p = normalizeArticleFilePath(raw)
  var base = PUBLIC_ASSET_BASE
  if (!base) return p
  var rel = p.replace(/^\/+/, '')
  return base + '/' + rel
}

/**
 * 从 db.nav 里找出 GitHub 外链：label 为 GitHub，或 URL 含 github.com。
 * 没有则返回 null，联系区/页脚不渲染该按钮。
 */
function getGithubNav(db) {
  if (!db || !Array.isArray(db.nav)) return null
  var found = null
  db.nav.forEach(function (item) {
    if (found || !item || item.type !== 'link' || !item.value) return
    var label = String(item.label || '').toLowerCase()
    var value = String(item.value || '').toLowerCase()
    if (label === 'github' || value.indexOf('github.com') >= 0) found = item
  })
  return found
}
