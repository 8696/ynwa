/**
 * 顶栏：站点名 + db.nav 驱动的链接 + 搜索。
 * ≥768px 横排；更窄时汉堡菜单。文章详情页高亮所属第一个分类，而不是「首页」。
 */
function Header() {
  var db = useDB().db
  var location = ReactRouterDOM.useLocation()
  var pathname = location.pathname
  var _menu = React.useState(false)
  var menuOpen = _menu[0]
  var setMenuOpen = _menu[1]

  // 路由变化后收起移动端菜单，避免跳转后菜单仍挡内容
  React.useEffect(function () {
    setMenuOpen(false)
  }, [pathname])

  React.useEffect(function () {
    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    var mq = window.matchMedia('(min-width: 768px)')
    function onBreakpoint() {
      if (mq.matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    mq.addEventListener('change', onBreakpoint)
    return function () {
      window.removeEventListener('keydown', onKeyDown)
      mq.removeEventListener('change', onBreakpoint)
    }
  }, [])

  /** 路径片段可能已编码；解码失败时沿用原串，避免 throw 打断渲染 */
  function safeDecode(s) {
    try {
      return decodeURIComponent(s)
    } catch (e) {
      return s
    }
  }

  /**
   * 根据当前路径决定哪一项高亮。
   * 文章页 db 未就绪时返回 none，避免先误亮「首页」再跳到分类。
   */
  function getActiveNav() {
    if (pathname === '/') return { type: 'home' }
    if (pathname.indexOf('/category/') === 0) {
      return { type: 'category', value: safeDecode(pathname.slice('/category/'.length)) }
    }
    if (pathname.indexOf('/tag/') === 0) {
      return { type: 'tag', value: safeDecode(pathname.slice('/tag/'.length)) }
    }
    if (pathname.indexOf('/search') === 0) return { type: 'search' }
    if (pathname.indexOf('/article/') === 0) {
      if (!db) return { type: 'none' }
      var id = safeDecode(pathname.slice('/article/'.length))
      var post = db.articles.find(function (p) { return p.id === id })
      var firstCat = post && post.categories && post.categories[0]
      if (firstCat) return { type: 'category', value: firstCat }
    }
    return { type: 'none' }
  }

  var activeNav = getActiveNav()
  var navItems = Array.isArray(db && db.nav) ? db.nav : []

  /** 把 db.nav 单项转成站内 Link 或外链 <a>；外链 target=_blank 时补 rel 防 tabnabbing */
  function resolveNavItem(item) {
    var to = '/'
    var isActive = false
    var external = false
    var target
    var rel

    if (item.type === 'category') {
      to = '/category/' + item.value
      isActive = activeNav.type === 'category' && activeNav.value === item.value
    } else if (item.type === 'tag') {
      to = '/tag/' + item.value
      isActive = activeNav.type === 'tag' && activeNav.value === item.value
    } else if (item.type === 'link') {
      to = item.value || '#'
      external = true
      if (item.target === '_blank') {
        target = '_blank'
        rel = 'noopener noreferrer'
      }
      isActive = activeNav.type === 'link' && activeNav.value === item.value
    }

    return { to: to, isActive: isActive, external: external, target: target, rel: rel }
  }

  function navClass(isActive) {
    return 'nav-link' + (isActive ? ' nav-link--active' : '')
  }

  function mobileNavClass(isActive) {
    return 'nav-mobile-link' + (isActive ? ' nav-mobile-link--active' : '')
  }

  var searchIcon = (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="11" cy="11" r="7"></circle>
      <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
    </svg>
  )

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <ReactRouterDOM.Link to="/" className="site-title">
          {SITE_NAME}
        </ReactRouterDOM.Link>

        <nav className="nav-desktop">
          <ReactRouterDOM.Link to="/" className={navClass(activeNav.type === 'home')}>
            首页
          </ReactRouterDOM.Link>
          {navItems.map(function (item, i) {
            if (!item || !item.type || !item.label) return null
            var resolved = resolveNavItem(item)
            if (resolved.external) {
              return (
                <a key={i} href={resolved.to} target={resolved.target} rel={resolved.rel} className={navClass(resolved.isActive)}>
                  {item.label}
                </a>
              )
            }
            return (
              <ReactRouterDOM.Link key={i} to={resolved.to} className={navClass(resolved.isActive)}>
                {item.label}
              </ReactRouterDOM.Link>
            )
          })}
          <ReactRouterDOM.Link to="/search" className="nav-link nav-link--search" aria-label="搜索" title="搜索">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="nav-search-icon" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
            </svg>
          </ReactRouterDOM.Link>
        </nav>

        <div className="header-tools">
          <ReactRouterDOM.Link to="/search" className="icon-btn" aria-label="搜索" title="搜索">
            {searchIcon}
          </ReactRouterDOM.Link>
          <button
            type="button"
            className="icon-btn icon-btn--menu"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            onClick={function () { setMenuOpen(function (open) { return !open }) }}
          >
            {menuOpen ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <line x1="6" y1="6" x2="18" y2="18"></line>
                <line x1="6" y1="18" x2="18" y2="6"></line>
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="17" x2="20" y2="17"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="nav-mobile">
          <ReactRouterDOM.Link
            to="/"
            className={mobileNavClass(activeNav.type === 'home')}
            onClick={function () { setMenuOpen(false) }}
          >
            首页
          </ReactRouterDOM.Link>
          {navItems.map(function (item, i) {
            if (!item || !item.type || !item.label) return null
            var resolved = resolveNavItem(item)
            if (resolved.external) {
              return (
                <a
                  key={i}
                  href={resolved.to}
                  target={resolved.target}
                  rel={resolved.rel}
                  className={mobileNavClass(resolved.isActive)}
                  onClick={function () { setMenuOpen(false) }}
                >
                  {item.label}
                </a>
              )
            }
            return (
              <ReactRouterDOM.Link
                key={i}
                to={resolved.to}
                className={mobileNavClass(resolved.isActive)}
                onClick={function () { setMenuOpen(false) }}
              >
                {item.label}
              </ReactRouterDOM.Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}

/** 页脚版权年份用「起始年–今年」，避免每年改常量 */
function Footer() {
  var y = new Date().getFullYear()
  return (
    <footer className="site-footer">
      © {FOOTER_COPYRIGHT_START}–{y} &nbsp;|&nbsp;{' '}
      <a href={FOOTER_ICP_LINK} target="_blank" rel="noopener noreferrer">
        {FOOTER_ICP}
      </a>
    </footer>
  )
}

/** 标签 ID 列表 → 可点击的 /tag/:id 链接；未知 ID 用 ID 本身当文案 */
function TagLinks(props) {
  var tagIds = props.tagIds
  var db = props.db
  var tags = React.useMemo(function () {
    return (tagIds || []).map(function (tagId) {
      var t = db.tags.find(function (x) { return x.id === tagId })
      return { id: tagId, label: t ? t.name : tagId }
    })
  }, [db.tags, tagIds])

  return (
    <React.Fragment>
      {tags.map(function (tag) {
        return (
          <ReactRouterDOM.Link key={tag.id} to={'/tag/' + tag.id} className="tag-link">
            {tag.label}
          </ReactRouterDOM.Link>
        )
      })}
    </React.Fragment>
  )
}

/**
 * 列表中的单篇文章卡片。cover 经 resolvePublicAssetUrl，可走站内或公网根。
 * 有封面时窄屏上图下文、≥768px 左文右图（由 CSS 控制）。
 */
function ArticleCard(props) {
  var post = props.post
  var db = props.db
  var catList = getCategoryList(db, post.categories)
  var dateStr = formatDate(post.date)
  var coverRaw = typeof post.cover === 'string' ? post.cover.trim() : ''
  var cover = coverRaw ? resolvePublicAssetUrl(coverRaw) : ''

  return (
    <article className="article-card">
      <div className={cover ? 'article-card-row article-card-row--with-cover' : ''}>
        <div className={cover ? 'article-card-main' : ''}>
          <h2 className="article-card-title">
            <ReactRouterDOM.Link to={'/article/' + post.id}>{post.title}</ReactRouterDOM.Link>
          </h2>
          <p className="article-summary">{post.summary}</p>
          <div className="article-meta">
            <time className="article-date">{dateStr}</time>
            {catList.map(function (c) {
              return (
                <ReactRouterDOM.Link key={c.id} to={'/category/' + c.id} className="chip">
                  {c.name}
                </ReactRouterDOM.Link>
              )
            })}
            <div className="tag-list">
              <TagLinks tagIds={post.tags} db={db} />
            </div>
          </div>
        </div>
        {cover && (
          <ReactRouterDOM.Link to={'/article/' + post.id} className="article-cover">
            <img src={cover} alt={post.title} loading="lazy" />
          </ReactRouterDOM.Link>
        )}
      </div>
      <div className="article-more">
        <ReactRouterDOM.Link to={'/article/' + post.id} className="article-more-link">
          阅读全文 →
        </ReactRouterDOM.Link>
      </div>
    </article>
  )
}

/**
 * 分页。buildUrl(n) 由页面决定路径形态（首页第 1 页用 / 而不是 /?page=1）。
 * 仅一页时不渲染，避免无意义控件。
 */
function Pagination(props) {
  var current = props.current
  var totalPages = props.totalPages
  var buildUrl = props.buildUrl
  var pageRange = React.useMemo(function () {
    return buildPageRange(current, totalPages)
  }, [current, totalPages])

  if (totalPages <= 1) return null

  return (
    <nav className="pagination">
      {current > 1 ? (
        <ReactRouterDOM.Link className="page-btn page-btn--prev" to={buildUrl(current - 1)}>
          上一页
        </ReactRouterDOM.Link>
      ) : (
        <span className="page-btn page-btn--prev page-btn--disabled">上一页</span>
      )}

      {pageRange.map(function (n, i) {
        if (n === '...') {
          return <span key={'dot-' + i} className="page-ellipsis">…</span>
        }
        return (
          <ReactRouterDOM.Link
            key={n}
            to={buildUrl(n)}
            className={'page-btn' + (n === current ? ' page-btn--current' : '')}
          >
            {n}
          </ReactRouterDOM.Link>
        )
      })}

      {current < totalPages ? (
        <ReactRouterDOM.Link className="page-btn" to={buildUrl(current + 1)}>
          下一页
        </ReactRouterDOM.Link>
      ) : (
        <span className="page-btn page-btn--disabled">下一页</span>
      )}
    </nav>
  )
}
