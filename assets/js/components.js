/**
 * 可复用 UI 块。不直接 fetch db.json；封面/正文 URL 一律走 resolvePublicAssetUrl。
 * 首页 Works / About / Contact 由 app.js 挂在路由出口之外，本文件只提供组件，不负责何时出现。
 */

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

/** 页脚版权年份用「起始年–今年」，避免每年改常量 */
function Footer() {
  var y = new Date().getFullYear()
  // GitHub 地址只维护在 db.nav，页脚和联系区共用 getGithubNav，避免两份 URL 漂移
  var github = getGithubNav(useDB().db)
  return (
    <footer className="site-footer">
      <ReactRouterDOM.Link to="/" className="site-footer-brand">{SITE_NAME}</ReactRouterDOM.Link>
      <p className="site-footer-links">
        {SITE_EMAIL ? (
          <a href={'mailto:' + SITE_EMAIL}>{SITE_EMAIL}</a>
        ) : null}
        {SITE_EMAIL && github ? <span aria-hidden="true"> · </span> : null}
        {github ? (
          <a href={github.value} target="_blank" rel="noopener noreferrer">
            {github.label || 'GitHub'} ↗
          </a>
        ) : null}
      </p>
      © {FOOTER_COPYRIGHT_START}–{y} ·{' '}
      <a href={FOOTER_ICP_LINK} target="_blank" rel="noopener noreferrer">
        {FOOTER_ICP}
      </a>
    </footer>
  )
}

/** 放大镜图标；桌面导航与头部工具按钮共用，className 透传控制尺寸 */
function SearchIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="11" cy="11" r="7"></circle>
      <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
    </svg>
  )
}

/**
 * db 加载态统一出口：加载中/失败展示对应文案，失败附重试按钮。
 * 各页面「db 未就绪」的分支都用它，避免断网时永远停在「加载中…」且无路可走。
 */
function DbState(props) {
  var ctx = useDB()
  if (ctx.db) return null
  var cls = props.compact ? 'status status--compact' : 'status'
  if (!ctx.error) return <div className={cls}>加载中…</div>
  return (
    <div className={cls}>
      <p>数据加载失败：{ctx.error}</p>
      <button type="button" className="btn status-retry" onClick={ctx.retryDB}>重试</button>
    </div>
  )
}

/** Bento 卡角落箭头，作品卡与「更多」共用 */
function WorksCardArrow() {
  return (
    <svg className="bento-arrow" width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <path d="M6 28 L28 6 M14 6 h14 v14" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
    </svg>
  )
}

/** 作品卡配色；相邻卡不会抽到同一色。tone 吃主题变量，随 [data-theme] 一起换装 */
var WORKS_TONES = ['accent', 'white', 'accent-soft', 'ink', 'accent-2']

/**
 * 为 n 张卡抽一版外观：色、条纹、编号。固定两列瀑布流，高度由内容决定。
 * 相邻不同色。
 */
function buildWorksLooks(count) {
  var looks = []
  var prevTone = ''

  for (var i = 0; i < count; i++) {
    // 从「上一张以外」的色里抽，避免两列里上下/左右撞成同一块
    var pool = WORKS_TONES.filter(function (t) { return t !== prevTone })
    var tone = pool[Math.floor(Math.random() * pool.length)]
    prevTone = tone
    looks.push({
      tone: tone,
      stripe: Math.random() < 0.32,
      showNum: i !== count - 1 && Math.random() < 0.6,
      numLeft: Math.random() < 0.45,
    })
  }
  return looks
}

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

/**
 * 「屏幕之外的我」。文案来自 SITE_AUTHOR / SITE_CITY / SITE_ABOUT_BIO / SITE_ABOUT_TAGS。
 */
function AboutSection() {
  // 名字、介绍、「为什么叫 YNWA」全空则整段不出现，避免空白锚点区
  if (!SITE_AUTHOR && !SITE_ABOUT_BIO && !(SITE_ABOUT_WHY && SITE_ABOUT_WHY.length)) return null
  var tags = (Array.isArray(SITE_ABOUT_TAGS) ? SITE_ABOUT_TAGS : []).map(function (tag) {
    // 兼容旧数据：条目可能是字符串，也可能是 { name, desc }
    if (tag && typeof tag === 'object') {
      return { name: tag.name, desc: tag.desc || '' }
    }
    return { name: String(tag), desc: '' }
  }).filter(function (tag) { return tag.name })
  var why = Array.isArray(SITE_ABOUT_WHY) ? SITE_ABOUT_WHY : SITE_ABOUT_WHY ? [SITE_ABOUT_WHY] : []

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="about-head">
          <span className="eyebrow">About · 关于</span>
          <h2 id="about-title" className="section-title">屏幕之外的我</h2>
        </div>
        <div className="about-grid">
          <div className="about-portrait">
            <div className="about-portrait-dots" aria-hidden="true"></div>
            <div className="about-portrait-body">
              {SITE_AUTHOR ? <h3>{SITE_AUTHOR}</h3> : null}
              {SITE_CITY ? <p className="about-city">{SITE_CITY}</p> : null}
              {tags.length ? (
                <ul className="about-facts">
                  {tags.map(function (tag) {
                    return (
                      <li key={tag.name}>
                        <div>
                          <span className="about-fact-name">{tag.name}</span>
                          {tag.desc ? <p className="about-fact-desc">{tag.desc}</p> : null}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="about-text">
            <h3>为什么叫「{SITE_NAME}」？</h3>
            {why.map(function (p, i) {
              return <p key={i}>{p}</p>
            })}
            {SITE_ABOUT_BIO ? <p>{SITE_ABOUT_BIO}</p> : null}
            {tags.length ? (
              <div className="about-tags">
                {tags.map(function (tag) {
                  return <span key={tag.name} className="chip chip--static">{tag.name}</span>
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 全站联系区。邮箱来自 SITE_EMAIL，GitHub 复用 db.nav 里已有的外链，避免写两份地址。
 */
function ContactCta() {
  var github = getGithubNav(useDB().db)
  // 邮箱和 GitHub 都没有就整段不渲染，避免空 CTA
  if (!SITE_EMAIL && !github) return null

  return (
    <section className="cta" id="contact" aria-labelledby="cta-title">
      <svg className="cta-deco cta-deco-mail" width="90" height="66" viewBox="0 0 90 66" aria-hidden="true">
        <rect x="2" y="2" width="86" height="62" fill="#FFE135" stroke="#000" strokeWidth="4"></rect>
        <path d="M2 2 L45 36 L88 2" fill="none" stroke="#000" strokeWidth="4"></path>
      </svg>
      <svg className="cta-deco cta-deco-circle" width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r="36" fill="#ffffff" stroke="#000" strokeWidth="4"></circle>
        <circle cx="40" cy="40" r="18" fill="#FFE135" stroke="#000" strokeWidth="4"></circle>
      </svg>
      <div className="wrap cta-inner">
        <span className="eyebrow">Contact · 联系</span>
        <h2 id="cta-title" className="section-title section-title--display">有想法？<br />来聊聊。</h2>
        <p className="cta-lede">不管是文章讨论、合作，还是单纯想交流——邮件最快。</p>
        <div className="cta-actions">
          {SITE_EMAIL ? (
            <a className="btn btn-ink" href={'mailto:' + SITE_EMAIL}>✉ {SITE_EMAIL}</a>
          ) : null}
          {github ? (
            <a
              className="btn btn-ghost"
              href={github.value}
              target="_blank"
              rel="noopener noreferrer"
            >
              {github.label || 'GitHub'} ↗
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/** 标签 ID 列表 → 可点击的 /tag/:id 链接；未知 ID 用 ID 本身当文案 */
function TagLinks(props) {
  var tagIds = props.tagIds
  var db = props.db
  var openInNewTab = !!props.openInNewTab
  var tags = React.useMemo(function () {
    return (tagIds || []).map(function (tagId) {
      var t = db.tags.find(function (x) { return x.id === tagId })
      return { id: tagId, label: t ? t.name : tagId }
    })
  }, [db.tags, tagIds])
  var tab = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <React.Fragment>
      {tags.map(function (tag) {
        return (
          <ReactRouterDOM.Link key={tag.id} to={'/tag/' + tag.id} className="tag-link" {...tab}>
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
    <article className={look.stripe ? 'article-card article-card--stripe' : 'article-card'}>
      {look.stripe ? <div className="article-stripe" aria-hidden="true"></div> : null}
      <div className={cover ? 'article-card-row article-card-row--with-cover' : ''}>
        <div className={cover ? 'article-card-main' : ''}>
          <h2 className="article-card-title">{titleLink}</h2>
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
      {/* 边界页用 span 而不是 Link，避免点「上一页」仍跳到当前 URL */}
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
