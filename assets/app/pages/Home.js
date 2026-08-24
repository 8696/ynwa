/** 首页：置顶文（最多 PINNED_MAX）在前，其余按日期倒序；页码来自 ?page=，第 1 页链接写成 / 以免污染地址栏 */
function Home() {
  var db = useDB().db
  var searchParams = ReactRouterDOM.useSearchParams()[0]
  // ?page=abc 会 parseInt 成 NaN；兜底回第 1 页，避免分页夹取失效渲染空列表
  var page = parseInt(searchParams.get('page') || '1', 10) || 1

  React.useEffect(function () {
    document.title = SITE_NAME
  }, [])

  var list = React.useMemo(function () {
    return orderArticlesWithPinned(db && db.articles ? db.articles : [])
  }, [db && db.articles])

  var paged = React.useMemo(function () {
    return paginate(list, page, PAGE_SIZE)
  }, [list, page])

  return (
    <main className="home">
      <HomeHero db={db} />

      <div className="page">
        <div className="home-posts-head" id="articles">
          <span className="eyebrow">Posts · 文章</span>
          <h2 className="section-title section-title--lg">最近写下的</h2>
        </div>

        {!db ? (
          <DbState />
        ) : (
          <React.Fragment>
            <div className="article-list">
              {paged.items.length
                ? paged.items.map(function (p) {
                    return <ArticleCard key={p.id} post={p} db={db} />
                  })
                : <div className="status">暂无文章</div>
              }
            </div>
            {/* 第 1 页写成 / 而不是 /?page=1，分享首页地址更干净 */}
            <Pagination
              current={paged.current}
              totalPages={paged.totalPages}
              buildUrl={function (n) { return n === 1 ? '/' : '/?page=' + n }}
            />
          </React.Fragment>
        )}
      </div>
    </main>
  )
}
