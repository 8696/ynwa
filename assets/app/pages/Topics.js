/**
 * 分类与标签总览页 /topics：把 db.categories / db.tags 全量列出，不分页。
 * 点击分类卡跳 /category/:id，点击标签跳 /tag/:id，复用各自列表页已有的过滤逻辑。
 */
function Topics() {
  var db = useDB().db

  React.useEffect(function () {
    document.title = '分类 · 标签 · ' + SITE_NAME
  }, [])

  var catCounts = React.useMemo(function () {
    if (!db) return {}
    var counts = {}
    db.articles.forEach(function (p) {
      var ids = Array.isArray(p.categories) ? p.categories : p.categories ? [p.categories] : []
      ids.forEach(function (id) { counts[id] = (counts[id] || 0) + 1 })
    })
    return counts
  }, [db && db.articles])

  var tagCounts = React.useMemo(function () {
    if (!db) return {}
    var counts = {}
    db.articles.forEach(function (p) {
      ;(p.tags || []).forEach(function (id) { counts[id] = (counts[id] || 0) + 1 })
    })
    return counts
  }, [db && db.articles])

  if (!db) {
    return (
      <main className="page">
        <DbState />
      </main>
    )
  }

  return (
    <main className="page">
      <div className="page-hero">
        <p className="eyebrow">分类 · 标签</p>
        <h1 className="page-title">按分类 / 标签浏览</h1>
        <p className="page-desc">全部分类和标签都在这里，点一下就能看对应的文章列表。</p>
      </div>

      <section aria-label="全部分类" id="topics-cats">
        <h2 className="section-title">分类</h2>
        {db.categories.length ? (
          <div className="cat-grid">
            {db.categories.map(function (c) {
              return (
                <ReactRouterDOM.Link key={c.id} to={'/category/' + c.id} className="cat-card">
                  <div className="cat-card-head">
                    <span className="cat-card-name">{c.name}</span>
                    <span className="cat-card-count">{catCounts[c.id] || 0}</span>
                  </div>
                  {c.description ? <p className="cat-card-desc">{c.description}</p> : null}
                </ReactRouterDOM.Link>
              )
            })}
          </div>
        ) : (
          <div className="status">暂无分类</div>
        )}
      </section>

      <section aria-label="全部标签" className="topics-section" id="topics-tags">
        <h2 className="section-title">标签</h2>
        {db.tags.length ? (
          <div className="tag-cloud">
            {db.tags.map(function (t) {
              return (
                <ReactRouterDOM.Link key={t.id} to={'/tag/' + t.id} className="tag-pill" title={t.description || ''}>
                  {t.name}
                  <span className="tag-pill-count">{tagCounts[t.id] || 0}</span>
                </ReactRouterDOM.Link>
              )
            })}
          </div>
        ) : (
          <div className="status">暂无标签</div>
        )}
      </section>
    </main>
  )
}
