/**
 * 应用壳：顶栏 + 路由出口 + 页脚。
 * 未匹配路径走 * → NotFound。BrowserRouter 依赖静态服务器把未知路径回退到 index.html。
 */
function App() {
  var location = ReactRouterDOM.useLocation()
  var isHome = location.pathname === '/'
  var navType = ReactRouterDOM.useNavigationType()

  React.useEffect(function () {
    // PUSH（进入新页面）/ REPLACE → 滚到顶部；POP（后退/前进）保持原位
    if (navType !== 'POP' && !location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, navType])

  React.useEffect(function () {
    if (!isHome || !location.hash) return
    var id = location.hash.slice(1)
    var frame = requestAnimationFrame(function () {
      var el = document.getElementById(id)
      if (el) el.scrollIntoView()
    })
    return function () { cancelAnimationFrame(frame) }
  }, [isHome, location.hash])

  return (
    <React.Fragment>
      <a className="skip-link" href="#main">跳到主内容</a>
      <Header />
      <div id="main" tabIndex="-1">
        <ReactRouterDOM.Routes>
          <ReactRouterDOM.Route path="/" element={<Home />} />
          <ReactRouterDOM.Route path="/article/:id" element={<Article />} />
          <ReactRouterDOM.Route path="/category/:id" element={<Category />} />
          <ReactRouterDOM.Route path="/tag/:id" element={<Tag />} />
          <ReactRouterDOM.Route path="/search" element={<Search />} />
          <ReactRouterDOM.Route path="*" element={<NotFound />} />
        </ReactRouterDOM.Routes>
      </div>
      {isHome ? <AboutSection /> : null}
      {isHome ? <ContactCta /> : null}
      <Footer />
    </React.Fragment>
  )
}

/**
 * 入口挂载。外层 StrictMode 便于开发期暴露副作用；
 * DBProvider 包在 Router 内，以便读 location.search 里的 nocache。
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactRouterDOM.BrowserRouter>
      <DBProvider>
        <App />
      </DBProvider>
    </ReactRouterDOM.BrowserRouter>
  </React.StrictMode>
)
