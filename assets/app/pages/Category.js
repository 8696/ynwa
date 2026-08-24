/**
 * 分类页。categories 可能是字符串（旧数据）或数组，过滤时两种都认。
 */
function Category() {
  var catId = ReactRouterDOM.useParams().id || ''
  var db = useDB().db
  var searchParams = ReactRouterDOM.useSearchParams()[0]
  // ?page=abc 会 parseInt 成 NaN；兜底回第 1 页，避免分页夹取失效渲染空列表
  var page = parseInt(searchParams.get('page') || '1', 10) || 1

  var cat = React.useMemo(function () {
    return db && db.categories.find(function (c) { return c.id === catId })
  }, [db, catId])

  var filtered = React.useMemo(function () {
    if (!db) return []
    return db.articles.filter(function (p) {
      return Array.isArray(p.categories) ? p.categories.indexOf(catId) >= 0 : p.categories === catId
    })
  }, [db, catId])

  var ordered = React.useMemo(function () {
    return orderArticlesWithPinned(filtered, db && db.articles)
  }, [filtered, db && db.articles])

  var paged = React.useMemo(function () {
    return paginate(ordered, page, PAGE_SIZE)
  }, [ordered, page])

  React.useEffect(function () {
    if (cat) document.title = cat.name + ' · ' + SITE_NAME
  }, [cat])

  if (!db) {
    return (
      <main className="page">
        <DbState />
      </main>
    )
  }

  if (!cat) {
    return (
      <main className="page page--center">
        <EmptyState
          eyebrow="Error"
          code="404"
          title="这个分类不存在"
          desc="分类可能被删除或重命名，试试别的。"
        />
      </main>
    )
  }

  return (
    <main className="page">
      <div className="page-hero">
        <p className="eyebrow">分类</p>
        <h1 className="page-title">{cat.name}</h1>
        {cat.description && <p className="page-desc">{cat.description}</p>}
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
              title="该分类暂无文章"
              desc="这个分类目前还没有文章。"
            />
          )
        }
      </div>

      {/* 分类 id 在路径里；页码进查询串。第 1 页也带 ?page=1，与首页「第 1 页写成 /」不同 */}
      <Pagination
        current={paged.current}
        totalPages={paged.totalPages}
        buildUrl={function (n) { return '/category/' + catId + '?page=' + n }}
      />
    </main>
  )
}
