/** 首页 Hero：高亮标题、最近一篇侧卡、计数、分类/标签跑马灯 */
function HomeHero(props) {
  var db = props.db
  var articles = db && Array.isArray(db.articles) ? db.articles : []
  var categories = db && Array.isArray(db.categories) ? db.categories : []
  var tags = db && Array.isArray(db.tags) ? db.tags : []

  var latest = React.useMemo(function () {
    if (!articles.length) return null
    // DBProvider 已按 date 倒序，这里再排一次以免 Hero 依赖调用方是否排过
    return articles.slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date)
    })[0]
  }, [articles])

  var latestCat = latest && db ? getCategoryList(db, latest.categories)[0] : null

  var marqueeBits = React.useMemo(function () {
    var names = categories.map(function (c) { return c.name })
      .concat(tags.map(function (t) { return t.name }))
    // db 还没来或目录为空时用站点名占位，避免跑马灯空白
    if (!names.length) names = [SITE_NAME, '技术', '思考', '生活']
    return names
  }, [categories, tags])

  var marqueeText = marqueeBits.join('  ✦  ') + '  ✦  '

  return (
    <section className="home-hero">
      <div className="wrap home-hero-grid">
        <div>
          <span className="eyebrow">{SITE_SLOGAN ? SITE_NAME + ' · ' + SITE_SLOGAN : SITE_NAME}</span>
          <h1 className="home-hero-title">
            记录 <span className="hl">技术</span>、思考<br />
            与 <span className="hl">生活</span>。
          </h1>
          <p className="home-hero-lede">
            {SITE_DESCRIPTION}{SITE_SLOGAN ? '。' + SITE_SLOGAN : ''}
          </p>
          <div className="home-hero-actions">
            {/* 同页锚点用 <a href>：Router Link 对 #articles 不会滚，App 只处理首页 hash 且要等 rAF */}
            <a className="btn" href="#articles">看文章 ↓</a>
            <ReactRouterDOM.Link className="btn btn-ghost" to="/search">搜索</ReactRouterDOM.Link>
          </div>
          <div className="home-stats">
            {/* 同页锚点用 <a href>：Router Link 对 #articles 不会滚，App 只处理首页 hash 且要等 rAF */}
            <a className="stat-chip stat-chip--link" href="#articles">
              <b>{articles.length}</b>
              <span>篇文章</span>
            </a>
            {/* 分类/标签统计卡兼作入口：都指向合并后的分类与标签总览页 */}
            {/* 跨页锚点：跳到 /topics 后滚到 #topics-cats；main.js 的 useEffect 会等区块挂上再 scrollIntoView */}
            <ReactRouterDOM.Link className="stat-chip stat-chip--link" to="/topics#topics-cats">
              <b>{categories.length}</b>
              <span>个分类</span>
            </ReactRouterDOM.Link>
            <ReactRouterDOM.Link className="stat-chip stat-chip--link" to="/topics#topics-tags">
              <b>{tags.length}</b>
              <span>个标签</span>
            </ReactRouterDOM.Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-stripes" aria-hidden="true"></div>
          <span className="eyebrow">正在写</span>
          <h3>{latest ? '最近在写' : '还没动笔'}</h3>
          {latest ? (
            <React.Fragment>
              <p>
                <ReactRouterDOM.Link to={'/article/' + latest.id}>{latest.title}</ReactRouterDOM.Link>
              </p>
              <p className="hero-card-meta">
                {formatDate(latest.date)}
                {latestCat ? ' · ' + latestCat.name : ''}
              </p>
            </React.Fragment>
          ) : (
            <p>有想法就写下来。第一篇可以很短。</p>
          )}
          <svg className="hero-deco hero-deco-star" width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
            <path d="M26 2 L31 19 L48 19 L34 30 L39 47 L26 37 L13 47 L18 30 L4 19 L21 19 Z" fill="var(--accent)" stroke="var(--black)" strokeWidth="2.5"></path>
          </svg>
          <svg className="hero-deco hero-deco-zig" width="80" height="26" viewBox="0 0 80 26" aria-hidden="true">
            <path d="M2 22 L14 4 L26 22 L38 4 L50 22 L62 4 L74 22" fill="none" stroke="var(--black)" strokeWidth="3"></path>
          </svg>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {/* 两份相同文案首尾相接，CSS 位移 50% 时看起来像无限循环 */}
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>
    </section>
  )
}
