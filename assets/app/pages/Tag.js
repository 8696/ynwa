/** 标签页：文章 tags 数组包含当前 :id 即入选 */
function Tag() {
  var tagId = ReactRouterDOM.useParams().id || ''
  var db = useDB().db
  var searchParams = ReactRouterDOM.useSearchParams()[0]
  // ?page=abc 会 parseInt 成 NaN；兜底回第 1 页，避免分页夹取失效渲染空列表
  var page = parseInt(searchParams.get('page') || '1', 10) || 1

  var tag = React.useMemo(function () {
    return db && db.tags.find(function (t) { return t.id === tagId })
  }, [db, tagId])

  React.useEffect(function () {
    if (tag) document.title = tag.name + ' · 标签 · ' + SITE_NAME
  }, [tag])

  var filtered = React.useMemo(function () {
    if (!db) return []
    return db.articles.filter(function (p) {
      return (p.tags || []).indexOf(tagId) >= 0
    })
  }, [db && db.articles, tagId])

  var ordered = React.useMemo(function () {
    return orderArticlesWithPinned(filtered, db && db.articles)
  }, [filtered, db && db.articles])

  var paged = React.useMemo(function () {
    return paginate(ordered, page, PAGE_SIZE)
  }, [ordered, page])

  if (!db) {
    return (
      <main className="page">
        <DbState />
      </main>
    )
  }

  if (!tag) {
    return (
      <main className="page page--center">
        <EmptyState
          eyebrow="Error"
          code="404"
          title="这个标签不存在"
          desc="标签可能被删除或重命名，试试别的。"
        />
      </main>
    )
  }

  return (
    <main className="page">
      <div className="page-hero">
        <p className="eyebrow">标签</p>
        <h1 className="page-title">{tag.name}</h1>
        {tag.description ? <p className="page-desc">{tag.description}</p> : <p className="page-desc">含此标签的文章</p>}
      </div>

      <div className="article-list">
        {paged.items.length
          ? paged.items.map(function (p) {
              return <ArticleCard key={p.id} post={p} db={db} />
            })
          : (
            <EmptyState
              eyebrow="Empty"
              code="0"
              title="暂无带此标签的文章"
              desc="还没有文章贴上这个标签。"
            />
          )
        }
      </div>

      {/* 与分类页相同：路径留 tag id，翻页只改 ?page= */}
      <Pagination
        current={paged.current}
        totalPages={paged.totalPages}
        buildUrl={function (n) { return '/tag/' + tagId + '?page=' + n }}
      />
    </main>
  )
}
