/**
 * 顶栏：站点名 + db.nav 驱动的栏目 + 搜索。
 * ≥768px 横排；更窄时汉堡菜单。文章详情页高亮所属第一个分类，而不是「首页」。
 * 「首页」和搜索是固定项，不进 db.nav，避免和栏目配置抢位置。
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
    // Escape 关菜单；拉宽到桌面断点时也关，避免汉堡面板在宽屏残留
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
   * 当前该高亮哪条站内路径。
   * 文章页映射到该文第一个分类的 /category/:id，与 nav 里写的路径对齐；
   * db 未就绪时返回空串，避免先误亮「首页」。
   */
  function getActivePath() {
    if (pathname.indexOf('/article/') === 0) {
      if (!db) return ''
      var id = safeDecode(pathname.slice('/article/'.length))
      var post = db.articles.find(function (p) { return p.id === id })
      var firstCat = post && post.categories && post.categories[0]
      return firstCat ? '/category/' + firstCat : ''
    }
    return pathname
  }

  var activePath = getActivePath()
  var navItems = Array.isArray(db && db.nav) ? db.nav : []

  /**
   * 把 db.nav 单项转成「点了去哪、用哪种标签、是否高亮」。
   * nav 没有 type：value 就是地址，看前缀决定怎么走。
   * - #about → 回首页再滚锚点（跨页也能用）
   * - http(s) 或 target=_blank → 原生 <a>（Link 会拦点击）
   * - /category/AI、/works → React Router Link
   */
  function resolveNavItem(item) {
    var value = item.value || '#'
    var to = value
    var isActive = false
    var external = false
    var target
    var rel

    if (value.charAt(0) === '#') {
      to = { pathname: '/', hash: value }
    } else {
      to = value
      external = value.indexOf('http') === 0
      isActive = !external && activePath === value
    }

    if (item.target === '_blank') {
      external = true
      target = '_blank'
      rel = 'noopener noreferrer'
      if (typeof to !== 'string') {
        to = (to && to.pathname ? to.pathname : '/') + (to && to.hash ? to.hash : '')
      }
    }

    return { to: to, isActive: isActive, external: external, target: target, rel: rel }
  }

  function navClass(isActive) {
    return 'nav-link' + (isActive ? ' nav-link--active' : '')
  }

  function mobileNavClass(isActive) {
    return 'nav-mobile-link' + (isActive ? ' nav-mobile-link--active' : '')
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <ReactRouterDOM.Link to="/" className="site-title">
          <span className="logo-badge" aria-hidden="true">{SITE_NAME.charAt(0)}</span>
          {SITE_NAME}
        </ReactRouterDOM.Link>

        <nav className="nav-desktop">
          {/* 首页、搜索写死在顶栏，不进 db.nav */}
          <ReactRouterDOM.Link to="/" className={navClass(pathname === '/')}>
            首页
          </ReactRouterDOM.Link>
          {navItems.map(function (item, i) {
            if (!item || !item.label || !item.value) return null
            var resolved = resolveNavItem(item)
            // 外链或 target=_blank 用 <a>：Link 会拦点击，新窗口打不开
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
          <ReactRouterDOM.Link to="/search" className={navClass(pathname.indexOf('/search') === 0) + ' nav-link--search'} aria-label="搜索" title="搜索">
            <SearchIcon className="nav-search-icon" />
          </ReactRouterDOM.Link>
        </nav>

        <div className="header-tools">
          {/* 窄屏才显示：桌面搜索在 nav-desktop 里，这里再放一份给汉堡栏旁用（CSS 控制显隐） */}
          <ReactRouterDOM.Link to="/search" className="icon-btn" aria-label="搜索" title="搜索">
            <SearchIcon />
          </ReactRouterDOM.Link>
          <button
            type="button"
            className="icon-btn icon-btn--menu"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            onClick={function () { setMenuOpen(function (open) { return !open }) }}
          >
            {menuOpen ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="6" y1="6" x2="18" y2="18"></line>
                <line x1="6" y1="18" x2="18" y2="6"></line>
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
          {/* 点任意项都会 setMenuOpen(false)；路由 effect 也会关，这里再关一次是为了点外链时菜单立刻收 */}
          <ReactRouterDOM.Link
            to="/"
            className={mobileNavClass(pathname === '/')}
            onClick={function () { setMenuOpen(false) }}
          >
            首页
          </ReactRouterDOM.Link>
          {navItems.map(function (item, i) {
            if (!item || !item.label || !item.value) return null
            var resolved = resolveNavItem(item)
            // 与桌面栏同一套规则：外链 / _blank 用 <a>，其余用 Link
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
