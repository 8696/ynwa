/** 首页 Hero：高亮标题、最近一篇侧卡、计数、分类/标签跑马灯 */
function HomeHero(props) {
  var db = props.db
  var articles = db && Array.isArray(db.articles) ? db.articles : []
  var categories = db && Array.isArray(db.categories) ? db.categories : []
  var tags = db && Array.isArray(db.tags) ? db.tags : []

  var latest = React.useMemo(function () {
    if (!articles.length) return null
    return articles.slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date)
    })[0]
  }, [articles])

  var latestCat = latest && db ? getCategoryList(db, latest.categories)[0] : null

  var marqueeBits = React.useMemo(function () {
    var names = categories.map(function (c) { return c.name })
      .concat(tags.map(function (t) { return t.name }))
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
            <a className="btn" href="#articles">看文章 ↓</a>
            <ReactRouterDOM.Link className="btn btn-ghost" to="/search">搜索</ReactRouterDOM.Link>
          </div>
          <div className="home-stats">
            <div className="stat-chip">
              <b>{articles.length}</b>
              <span>篇文章</span>
            </div>
            <div className="stat-chip">
              <b>{categories.length}</b>
              <span>个分类</span>
            </div>
            <div className="stat-chip">
              <b>{tags.length}</b>
              <span>个标签</span>
            </div>
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
            <path d="M26 2 L31 19 L48 19 L34 30 L39 47 L26 37 L13 47 L18 30 L4 19 L21 19 Z" fill="#FFE135" stroke="#000" strokeWidth="2.5"></path>
          </svg>
          <svg className="hero-deco hero-deco-zig" width="80" height="26" viewBox="0 0 80 26" aria-hidden="true">
            <path d="M2 22 L14 4 L26 22 L38 4 L50 22 L62 4 L74 22" fill="none" stroke="#000" strokeWidth="3"></path>
          </svg>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>
    </section>
  )
}

/** 首页：全站文章倒序列表；页码来自 ?page=，第 1 页链接写成 / 以免污染地址栏 */
function Home() {
  var db = useDB().db
  var searchParams = ReactRouterDOM.useSearchParams()[0]
  // ?page=abc 会 parseInt 成 NaN；兜底回第 1 页，避免分页夹取失效渲染空列表
  var page = parseInt(searchParams.get('page') || '1', 10) || 1

  React.useEffect(function () {
    document.title = SITE_NAME
  }, [])

  var paged = React.useMemo(function () {
    return paginate(db && db.articles ? db.articles : [], page, PAGE_SIZE)
  }, [db && db.articles, page])

  return (
    <main className="home">
      <HomeHero db={db} />

      <div className="page">
        <div className="home-posts-head" id="articles">
          <span className="eyebrow">Posts · 文章</span>
          <h2 className="home-posts-title">最近写下的</h2>
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

/**
 * 文章详情：按 :id 取元数据，再 fetch Markdown → marked → DOMPurify。
 * cancelled 用于切文章或卸载时丢弃过期响应，避免旧正文写进新页。
 */
function Article() {
  var id = ReactRouterDOM.useParams().id
  var db = useDB().db
  var navigate = ReactRouterDOM.useNavigate()
  var _content = React.useState(null)
  var content = _content[0]
  var setContent = _content[1]
  var _error = React.useState(null)
  var error = _error[0]
  var setError = _error[1]

  var post = db && db.articles.find(function (p) { return p.id === id })

  /** 正文重试计数：bump 后重跑下方 effect 重新 fetch */
  var _retryState = React.useState(0)
  var reloadCount = _retryState[0]
  var bumpReload = _retryState[1]

  React.useEffect(function () {
    if (!post) return
    document.title = post.title + ' · ' + SITE_NAME

    // 切换文章或重试时先清旧正文/旧错误，避免上一篇的内容在新标题下短暂残留
    setContent(null)
    setError(null)

    var cancelled = false
    function load() {
      var filePath = resolvePublicAssetUrl(post.file)
      fetch(filePath).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.text()
      }).then(function (mdText) {
        if (cancelled) return
        marked.setOptions({ gfm: true, breaks: false })
        var unsafeHtml = marked.parse(mdText)
        // 仅允许常见文档协议与相对路径，挡住 javascript: 等
        var safeHtml = DOMPurify.sanitize(unsafeHtml, {
          USE_PROFILES: { html: true },
          ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|\/|\.\/|\.\.\/)/i,
        })
        setContent(safeHtml)
      }).catch(function (err) {
        if (!cancelled) setError(err.message)
      })
    }
    load()
    return function () { cancelled = true }
  }, [post, reloadCount])

  // 消毒后的 HTML 入 DOM 后再做高亮和外链新窗口；依赖 content 以免容器尚未挂载
  React.useEffect(function () {
    if (!content) return
    var container = document.getElementById('post-content')
    if (!container) return
    container.querySelectorAll('pre code').forEach(function (el) {
      hljs.highlightElement(el)
    })
    container.querySelectorAll('a[href^="http"]').forEach(function (a) {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    })
  }, [content])

  if (!db) {
    return (
      <main className="page">
        <DbState />
      </main>
    )
  }

  if (!post) {
    return (
      <main className="page">
        <div className="status">文章不存在</div>
      </main>
    )
  }

  var catList = getCategoryList(db, post.categories)

  return (
    <main className="page">
      <div className="page-hero">
        {window.history.length > 1 ? (
          <a
            onClick={function (e) { e.preventDefault(); navigate(-1) }}
            className="back-link"
          >
            ← 返回
          </a>
        ) : (
          <ReactRouterDOM.Link to="/" className="back-link">
            ← 首页
          </ReactRouterDOM.Link>
        )}

        <h1 className="post-title">{post.title}</h1>

        {post.summary && <p className="post-summary">{post.summary}</p>}

        <div className="article-meta">
          <time className="article-date">{formatDate(post.date)}</time>
          <span className="tag-list">
            {catList.map(function (c) {
              return (
                <ReactRouterDOM.Link key={c.id} to={'/category/' + c.id} className="chip">
                  {c.name}
                </ReactRouterDOM.Link>
              )
            })}
          </span>
          <div className="tag-list">
            <TagLinks tagIds={post.tags} db={db} />
          </div>
        </div>
      </div>

      {error ? (
        <div className="status">
          <p>文章内容加载失败：{error}</p>
          <button type="button" className="btn status-retry" onClick={function () { bumpReload(function (n) { return n + 1 }) }}>重试</button>
        </div>
      ) : content ? (
        <div
          id="post-content"
          className="markdown-body post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className="status">加载中…</div>
      )}
    </main>
  )
}

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

  var paged = React.useMemo(function () {
    return paginate(filtered, page, PAGE_SIZE)
  }, [filtered, page])

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
      <main className="page">
        <div className="page-hero">
          <p className="eyebrow">分类</p>
          <h1 className="page-title">分类不存在</h1>
        </div>
        <div className="status">找不到该分类</div>
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
          : <div className="status">该分类暂无文章</div>
        }
      </div>

      <Pagination
        current={paged.current}
        totalPages={paged.totalPages}
        buildUrl={function (n) { return '/category/' + catId + '?page=' + n }}
      />
    </main>
  )
}

/** 标签页：文章 tags 数组包含当前 :id 即入选 */
function Tag() {
  var tagId = ReactRouterDOM.useParams().id || ''
  var db = useDB().db
  var searchParams = ReactRouterDOM.useSearchParams()[0]
  // ?page=abc 会 parseInt 成 NaN；兜底回第 1 页，避免分页夹取失效渲染空列表
  var page = parseInt(searchParams.get('page') || '1', 10) || 1

  var tag = React.useMemo(function () {
    return db && db.tags.find(function (t) { return t.id === tagId })
  }, [db, tagId])

  React.useEffect(function () {
    if (tag) document.title = tag.name + ' · 标签 · ' + SITE_NAME
  }, [tag])

  var filtered = React.useMemo(function () {
    if (!db) return []
    return db.articles.filter(function (p) {
      return (p.tags || []).indexOf(tagId) >= 0
    })
  }, [db && db.articles, tagId])

  var paged = React.useMemo(function () {
    return paginate(filtered, page, PAGE_SIZE)
  }, [filtered, page])

  if (!db) {
    return (
      <main className="page">
        <DbState />
      </main>
    )
  }

  if (!tag) {
    return (
      <main className="page">
        <div className="page-hero">
          <p className="eyebrow">标签</p>
          <h1 className="page-title">标签不存在</h1>
        </div>
        <div className="status">找不到该标签</div>
      </main>
    )
  }

  return (
    <main className="page">
      <div className="page-hero">
        <p className="eyebrow">标签</p>
        <h1 className="page-title">{tag.name}</h1>
        <p className="page-desc">含此标签的文章</p>
      </div>

      <div className="article-list">
        {paged.items.length
          ? paged.items.map(function (p) {
              return <ArticleCard key={p.id} post={p} db={db} />
            })
          : <div className="status">暂无带此标签的文章</div>
        }
      </div>

      <Pagination
        current={paged.current}
        totalPages={paged.totalPages}
        buildUrl={function (n) { return '/tag/' + tagId + '?page=' + n }}
      />
    </main>
  )
}

/** 搜索结果上限，防止关键词过宽时一次渲染过多 DOM */
var SEARCH_MAX_RESULTS = 50

/**
 * 单条搜索结果。标题/摘要 HTML 来自 highlightOne（已转义再包 <mark>）。
 * 使用原生 <a target=_blank>，方便对照阅读而不离开搜索页。
 */
function SearchResultRow(props) {
  var post = props.post
  var query = props.query
  var db = props.db
  var href = '/article/' + encodeURIComponent(post.id)
  var catList = React.useMemo(function () {
    return getCategoryList(db, post.categories)
  }, [db, post.categories])
  var highlightedTitle = React.useMemo(function () {
    return highlightOne(post.title || '', query)
  }, [post.title, query])
  var highlightedSummary = React.useMemo(function () {
    return highlightOne(post.summary, query)
  }, [post.summary, query])
  var tags = React.useMemo(function () {
    return (post.tags || []).map(function (tagId) {
      var t = db.tags.find(function (x) { return x.id === tagId })
      return { id: tagId, label: t ? t.name : tagId }
    })
  }, [db.tags, post.tags])

  return (
    <article className="article-card">
      <div>
        <h2 className="article-card-title">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            dangerouslySetInnerHTML={{ __html: highlightedTitle }}
          />
        </h2>
        {post.summary && (
          <p
            className="article-summary"
            dangerouslySetInnerHTML={{ __html: highlightedSummary }}
          />
        )}
        <div className="article-meta">
          <time className="article-date">{formatDate(post.date)}</time>
          {catList.map(function (c) {
            return (
              <a
                key={c.id}
                href={'/category/' + c.id}
                target="_blank"
                rel="noopener noreferrer"
                className="chip"
              >
                {c.name}
              </a>
            )
          })}
          <div className="tag-list">
            {tags.map(function (tag) {
              return (
                <a
                  key={tag.id}
                  href={'/tag/' + tag.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag-link"
                >
                  {tag.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <div className="article-more">
        <a href={href} target="_blank" rel="noopener noreferrer" className="article-more-link">
          阅读全文 →
        </a>
      </div>
    </article>
  )
}

/**
 * 搜索页。输入即时更新本地 state，200ms 防抖后再 replace 写入 ?q=，
 * 以便分享 URL / 浏览器前进后退，同时不把每次按键都推进历史栈。
 */
function Search() {
  var db = useDB().db
  var _sp = ReactRouterDOM.useSearchParams()
  var searchParams = _sp[0]
  var setSearchParams = _sp[1]
  var _query = React.useState(searchParams.get('q') || '')
  var query = _query[0]
  var setQuery = _query[1]
  var timerRef = React.useRef(null)

  React.useEffect(function () {
    document.title = '搜索 · ' + SITE_NAME
  }, [])

  // 外部改 URL（后退、粘贴）时把输入框同步过来
  React.useEffect(function () {
    var q = searchParams.get('q') || ''
    if (q !== query) setQuery(q)
  }, [searchParams])

  React.useEffect(function () {
    return function () {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  var updateURL = React.useCallback(function (q) {
    setSearchParams(q ? { q: q } : {}, { replace: true })
  }, [setSearchParams])

  function handleInput(e) {
    var v = e.target.value
    setQuery(v)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(function () {
      updateURL(v.trim())
    }, 200)
  }

  var rows = React.useMemo(function () {
    return db ? searchArticles(db, query) : []
  }, [db, query])
  var visibleRows = React.useMemo(function () {
    return rows.slice(0, SEARCH_MAX_RESULTS)
  }, [rows])
  var isTruncated = rows.length > SEARCH_MAX_RESULTS

  return (
    <main className="page">
      <div className="page-hero">
        <p className="eyebrow">文章搜索</p>
        <h1 className="page-title">搜索</h1>
        <p className="page-desc">输入关键词，在全部文章条目的字段值中匹配</p>
      </div>

      <div className="search-box">
        <label htmlFor="search-input" className="sr-only">搜索关键词</label>
        <input
          type="search"
          id="search-input"
          autoComplete="off"
          placeholder="输入关键词…"
          value={query}
          onChange={handleInput}
          className="search-input"
        />
        <p className="search-hint">
          <code>结果最多显示 {SEARCH_MAX_RESULTS} 条</code>
        </p>
      </div>

      <div className="search-results">
        {!db ? (
          <DbState compact />
        ) : !query.trim() ? null : rows.length === 0 ? (
          <div className="status status--compact">未找到匹配项</div>
        ) : (
          <React.Fragment>
            {isTruncated && (
              <p className="search-truncate">
                结果已截断为前 {SEARCH_MAX_RESULTS} 条，请缩小关键词范围。
              </p>
            )}
            <p className="search-count">共 {visibleRows.length} 条结果</p>
            <div className="article-list">
              {visibleRows.map(function (r) {
                return <SearchResultRow key={r.post.id} post={r.post} query={query} db={db} />
              })}
            </div>
          </React.Fragment>
        )}
      </div>
    </main>
  )
}

/**
 * 完整作品集页 /works。渲染 SITE_WORKS 全部条目，不分页；
 * 复用首页 WorksSection 的 bento-card 卡片样式（WorksCard / buildWorksLooks 在 components.js）。
 */
function Works() {
  var source = Array.isArray(SITE_WORKS) ? SITE_WORKS : []
  var items = source.filter(function (item) {
    return item && item.title
  })
  var looks = React.useMemo(function () {
    return buildWorksLooks(items.length)
  }, [items.length])

  React.useEffect(function () {
    document.title = '作品集 · ' + SITE_NAME
  }, [])

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

/** 未匹配路由的占位页 */
function NotFound() {
  React.useEffect(function () {
    document.title = '404 · ' + SITE_NAME
  }, [])

  return (
    <main className="page page--center">
      <section className="not-found">
        <p className="eyebrow">Error</p>
        <h1 className="not-found-code">404</h1>
        <p className="not-found-title">页面不存在</p>
        <p className="not-found-desc">
          你访问的地址可能已被删除、改名，或暂时不可用。
        </p>
      </section>
    </main>
  )
}
