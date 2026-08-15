/**
 * 应用壳：顶栏 + 路由出口 + 页脚。
 * 未匹配路径走 * → NotFound。BrowserRouter 依赖静态服务器把未知路径回退到 index.html，
 * 否则刷新 /article/:id 会 404。
 */
function App() {
  var location = ReactRouterDOM.useLocation()
  var isHome = location.pathname === '/'
  var navType = ReactRouterDOM.useNavigationType()

  React.useEffect(function () {
    // PUSH / REPLACE 进新页滚到顶；POP（浏览器后退/前进）保持原滚动，避免「返回却跳到顶部」
    // 带 hash 时交给下面的 scrollIntoView，这里不要抢先滚到 0
    if (navType !== 'POP' && !location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, navType])

  React.useEffect(function () {
    // 锚点区块（#works / #about / #contact）只挂在首页路由外，其它页没有这些 id
    if (!isHome || !location.hash) return
    var id = location.hash.slice(1)
    // 等本轮渲染把区块挂上再滚；否则从文章页点「关于」时 getElementById 还是 null
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
          <ReactRouterDOM.Route path="/works" element={<Works />} />
          <ReactRouterDOM.Route path="*" element={<NotFound />} />
        </ReactRouterDOM.Routes>
      </div>
      {/* 作品/关于/联系挂在路由外：分页只换 #main 里的列表，这三块始终在首页底下，不被 Home 重挂 */}
      {isHome ? <WorksSection /> : null}
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
