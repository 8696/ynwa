/**
 * 完整作品集页 /works。渲染 db.json works 全部条目，不分页、也不再塞「更多」卡（那张只在首页）。
 * 复用首页 WorksSection 的 bento-card 卡片样式（WorksCard / buildWorksLooks）。
 */
function Works() {
  var ctx = useDB()
  var source = ctx.db && Array.isArray(ctx.db.works) ? ctx.db.works : []
  var items = source.filter(function (item) {
    return item && item.title
  })
  var looks = React.useMemo(function () {
    return buildWorksLooks(items.length)
  }, [items.length])

  React.useEffect(function () {
    document.title = '作品集 · ' + SITE_NAME
  }, [])

  if (!ctx.db) return (
    <main className="page">
      <DbState />
    </main>
  )

  return (
    <main className="page">
      <div className="page-hero">
        <p className="eyebrow">Works · 作品</p>
        <h1 className="page-title">AI 页面作品集</h1>
        <p className="page-desc">用 AI 搭过的独立页面，全部在这里。点开一张卡片就能看。</p>
      </div>
      <section className="works works--full" aria-label="AI 页面作品集">
        {items.length ? (
          <div className="bento">
            {items.map(function (item, i) {
              return (
                <WorksCard
                  key={item.href || item.title}
                  item={item}
                  index={i}
                  look={looks[i]}
                />
              )
            })}
          </div>
        ) : (
          <div className="status">还没有作品，先去首页看看吧。</div>
        )}
      </section>
    </main>
  )
}
