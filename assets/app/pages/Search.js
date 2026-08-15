/** 搜索结果上限，防止关键词过宽时一次渲染过多 DOM */
var SEARCH_MAX_RESULTS = 50

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
    // replace 而不是 push：分享链接仍带 ?q=，但连续输入不会堆一串搜索历史
    setSearchParams(q ? { q: q } : {}, { replace: true })
  }, [setSearchParams])

  function handleInput(e) {
    var v = e.target.value
    setQuery(v)
    if (timerRef.current) clearTimeout(timerRef.current)
    // 输入框立刻变，URL 等 200ms：每次按键都 replace 会把中文 IME 组字写进历史
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
