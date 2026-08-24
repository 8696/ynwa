/**
 * 列表中的单篇文章卡片。cover 经 resolvePublicAssetUrl，可走站内或公网根。
 * 有封面时窄屏上图下文、≥768px 左文右图（由 CSS 控制）。
 * 搜索页传入 titleHtml / summaryHtml（已转义的高亮 HTML）和 openInNewTab。
 */
function ArticleCard(props) {
  var post = props.post
  var db = props.db
  var openInNewTab = !!props.openInNewTab
  var titleHtml = props.titleHtml
  var summaryHtml = props.summaryHtml
  // 斑马线条：与作品卡同款随机皮肤（约 32% 出条），条纹色吃 --accent 随主题换装。
  // keyed post.id：同一张卡在同一次挂载内重渲（db 就绪/翻页）不重抽。
  var look = React.useMemo(function () {
    return { stripe: Math.random() < 0.32 }
  }, [post.id])
  var pinned = isPinnedArticle(post, db && db.articles)
  var catList = getCategoryList(db, post.categories)
  var dateStr = formatDate(post.date)
  var coverRaw = typeof post.cover === 'string' ? post.cover.trim() : ''
  var cover = coverRaw ? resolvePublicAssetUrl(coverRaw) : ''
  var to = '/article/' + post.id
  var href = '/article/' + encodeURIComponent(post.id)
  var tab = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
  var titleProps = titleHtml
    ? { dangerouslySetInnerHTML: { __html: titleHtml } }
    : { children: post.title }
  var titleLink = openInNewTab
    ? <a href={href} {...tab} {...titleProps} />
    : <ReactRouterDOM.Link to={to} {...titleProps} />
  var moreLink = openInNewTab
    ? <a href={href} className="btn btn--sm" {...tab}>阅读全文 →</a>
    : <ReactRouterDOM.Link to={to} className="btn btn--sm">阅读全文 →</ReactRouterDOM.Link>
  var coverLink = cover
    ? (openInNewTab
        ? <a href={href} className="article-cover" {...tab}><img src={cover} alt={post.title} loading="lazy" /></a>
        : <ReactRouterDOM.Link to={to} className="article-cover"><img src={cover} alt={post.title} loading="lazy" /></ReactRouterDOM.Link>)
    : null

  return (
    <article className={'article-card' + (look.stripe ? ' article-card--stripe' : '') + (pinned ? ' article-card--pinned' : '')}>
      {look.stripe ? <div className="article-stripe" aria-hidden="true"></div> : null}
      <div className={cover ? 'article-card-row article-card-row--with-cover' : ''}>
        <div className={cover ? 'article-card-main' : ''}>
          <h2 className="article-card-title">
            {pinned ? <span className="chip chip--static chip--pin">置顶</span> : null}
            {titleLink}
          </h2>
          {summaryHtml
            ? <p className="article-summary" dangerouslySetInnerHTML={{ __html: summaryHtml }} />
            : <p className="article-summary">{post.summary}</p>}
          <div className="article-meta">
            <time className="article-date">{dateStr}</time>
            {catList.map(function (c) {
              return (
                <ReactRouterDOM.Link key={c.id} to={'/category/' + c.id} className="chip" {...tab}>
                  {c.name}
                </ReactRouterDOM.Link>
              )
            })}
            <div className="tag-list">
              <TagLinks tagIds={post.tags} db={db} openInNewTab={openInNewTab} />
            </div>
          </div>
        </div>
        {coverLink}
      </div>
      <div className="article-more">
        {moreLink}
      </div>
    </article>
  )
}
