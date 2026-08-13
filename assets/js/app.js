/**
 * 应用壳：顶栏 + 路由出口 + 页脚。
 * 未匹配路径走 * → NotFound。BrowserRouter 依赖静态服务器把未知路径回退到 index.html。
 */
function App() {
  return (
    <React.Fragment>
      <Header />
      <ReactRouterDOM.Routes>
        <ReactRouterDOM.Route path="/" element={<Home />} />
        <ReactRouterDOM.Route path="/article/:id" element={<Article />} />
        <ReactRouterDOM.Route path="/category/:id" element={<Category />} />
        <ReactRouterDOM.Route path="/tag/:id" element={<Tag />} />
        <ReactRouterDOM.Route path="/search" element={<Search />} />
        <ReactRouterDOM.Route path="*" element={<NotFound />} />
      </ReactRouterDOM.Routes>
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
