/**
 * 单张作品卡。外链新窗口打开；无 href 时降级为 <article>，避免空链。
 */
function WorksCard(props) {
  var item = props.item
  var look = props.look || {}
  var index = props.index
  var isMore = !!props.isMore
  var href = item.href ? String(item.href).trim() : ''
  var tags = Array.isArray(item.tags) ? item.tags : []
  var num = look.showNum && index != null ? String(index + 1).padStart(2, '0') : ''
  var className = [
    'bento-card',
    'bento-card--' + (look.tone || 'white'),
    look.stripe ? 'bento-card--stripe' : '',
    look.numLeft ? 'bento-card--num-left' : '',
    isMore ? 'bento-card--more' : '',
  ].filter(Boolean).join(' ')
  var inner = (
    <React.Fragment>
      {look.stripe ? <div className="bento-stripe" aria-hidden="true"></div> : null}
      {num ? <span className="bento-num" aria-hidden="true">{num}</span> : null}
      {item.kicker ? <span className="chip chip--static">{item.kicker}</span> : null}
      <h3>{item.title}</h3>
      {item.summary ? <p>{item.summary}</p> : null}
      {tags.length ? (
        <div className="bento-tags">
          {tags.map(function (tag) {
            return <span key={tag} className="chip chip--static">{tag}</span>
          })}
        </div>
      ) : null}
      {href ? <WorksCardArrow /> : null}
    </React.Fragment>
  )

  if (href) {
    // http(s) 与 /ai-page/ 都不是 SPA 路由：ai-page 是独立静态页，收进 Router 会落到 NotFound
    var external = /^https?:\/\//i.test(href) || href.indexOf('/ai-page/') === 0
    if (!external) {
      return (
        <ReactRouterDOM.Link className={className} to={href} aria-label={item.title}>
          {inner}
        </ReactRouterDOM.Link>
      )
    }
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.title}
      >
        {inner}
      </a>
    )
  }

  return <article className={className}>{inner}</article>
}
