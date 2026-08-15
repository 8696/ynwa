/**
 * 首页 AI 页面作品集。条目来自 db.json 的 works 数组（useDB）。
 * 首页最多 SITE_WORKS_MAX 张（含末尾「更多」），所以作品只切前 max-1 条。
 * 「更多」始终占末位，点进去是完整 /works 页。卡片色块每次挂载抽一版，刷新即换。
 */
function WorksSection() {
  var ctx = useDB()
  var max = typeof SITE_WORKS_MAX === 'number' && SITE_WORKS_MAX > 1 ? SITE_WORKS_MAX : 4
  var source = ctx.db && Array.isArray(ctx.db.works) ? ctx.db.works : []
  var items = source.filter(function (item) {
    return item && item.title
  })
  // 给「更多」留一张卡位；作品再少也照样出「更多」，避免首页没有进 /works 的入口
  var visible = items.slice(0, max - 1)
  var more = SITE_WORKS_MORE && SITE_WORKS_MORE.title ? SITE_WORKS_MORE : {
    title: '更多',
    summary: '后面做的 AI 页面会继续放到这里。',
  }
  var cardCount = visible.length + 1
  var looks = React.useMemo(function () {
    return buildWorksLooks(cardCount)
  }, [cardCount])

  // 本区块挂在路由外，db 没来时整段不渲染，免得首页先闪一排空卡
  if (!ctx.db) return null

  return (
    <section className="works" id="works" aria-labelledby="works-title">
      <div className="wrap">
        <div className="works-head">
          <span className="eyebrow">Works · 作品</span>
          <h2 id="works-title" className="section-title">AI 页面作品集</h2>
          <p className="works-lede">用 AI 搭过的独立页面。先放几个，后面继续往这里加。</p>
        </div>
        <div className="bento">
          {visible.map(function (item, i) {
            return (
              <WorksCard
                key={item.href || item.title}
                item={item}
                index={i}
                look={looks[i]}
              />
            )
          })}
          <WorksCard item={more} isMore look={looks[visible.length]} />
        </div>
      </div>
    </section>
  )
}
