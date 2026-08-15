/**
 * 文章详情：按 :id 取元数据，再 fetch Markdown → marked → DOMPurify。
 * cancelled 用于切文章或卸载时丢弃过期响应，避免旧正文写进新页。
 */
function Article() {
  var id = ReactRouterDOM.useParams().id
  var db = useDB().db
  var navigate = ReactRouterDOM.useNavigate()
  var _content = React.useState(null)
  var content = _content[0]
  var setContent = _content[1]
  var _error = React.useState(null)
  var error = _error[0]
  var setError = _error[1]

  var post = db && db.articles.find(function (p) { return p.id === id })

  /** 正文重试计数：bump 后重跑下方 effect 重新 fetch */
  var _retryState = React.useState(0)
  var reloadCount = _retryState[0]
  var bumpReload = _retryState[1]

  React.useEffect(function () {
    if (!post) return
    document.title = post.title + ' · ' + SITE_NAME

    // 切换文章或重试时先清旧正文/旧错误，避免上一篇的内容在新标题下短暂残留
    setContent(null)
    setError(null)

    var cancelled = false
    function load() {
      var filePath = resolvePublicAssetUrl(post.file)
      fetch(filePath).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.text()
      }).then(function (mdText) {
        if (cancelled) return
        marked.setOptions({ gfm: true, breaks: false })
        var unsafeHtml = marked.parse(mdText)
        // 仅允许常见文档协议与相对路径，挡住 javascript: 等
        var safeHtml = DOMPurify.sanitize(unsafeHtml, {
          USE_PROFILES: { html: true },
          ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|\/|\.\/|\.\.\/)/i,
        })
        setContent(safeHtml)
      }).catch(function (err) {
        if (!cancelled) setError(err.message)
      })
    }
    load()
    return function () { cancelled = true }
  }, [post, reloadCount])

  // 消毒后的 HTML 入 DOM 后再做高亮和外链新窗口；依赖 content 以免容器尚未挂载
  React.useEffect(function () {
    if (!content) return
    var container = document.getElementById('post-content')
    if (!container) return
    container.querySelectorAll('pre code').forEach(function (el) {
      hljs.highlightElement(el)
    })
    container.querySelectorAll('a[href^="http"]').forEach(function (a) {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    })
  }, [content])

  if (!db) {
    return (
      <main className="page">
        <DbState />
      </main>
    )
  }

  if (!post) {
    return (
      <main className="page">
        <div className="status">文章不存在</div>
      </main>
    )
  }

  var catList = getCategoryList(db, post.categories)

  return (
    <main className="page">
      <div className="page-hero">
        {/* 有站内历史则返回上一页；新标签直达时 length 往往为 1，改链到首页以免 navigate(-1) 离开本站 */}
        {window.history.length > 1 ? (
          <a
            onClick={function (e) { e.preventDefault(); navigate(-1) }}
            className="back-link"
          >
            ← 返回
          </a>
        ) : (
          <ReactRouterDOM.Link to="/" className="back-link">
            ← 首页
          </ReactRouterDOM.Link>
        )}

        <h1 className="post-title">{post.title}</h1>

        {post.summary && <p className="post-summary">{post.summary}</p>}

        <div className="article-meta">
          <time className="article-date">{formatDate(post.date)}</time>
          <span className="tag-list">
            {catList.map(function (c) {
              return (
                <ReactRouterDOM.Link key={c.id} to={'/category/' + c.id} className="chip">
                  {c.name}
                </ReactRouterDOM.Link>
              )
            })}
          </span>
          <div className="tag-list">
            <TagLinks tagIds={post.tags} db={db} />
          </div>
        </div>
      </div>

      {error ? (
        <div className="status">
          <p>文章内容加载失败：{error}</p>
          <button type="button" className="btn status-retry" onClick={function () { bumpReload(function (n) { return n + 1 }) }}>重试</button>
        </div>
      ) : content ? (
        <div
          id="post-content"
          className="markdown-body post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className="status">加载中…</div>
      )}
    </main>
  )
}
