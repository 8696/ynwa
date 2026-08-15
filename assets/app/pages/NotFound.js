/** 未匹配路由的占位页。不猜「返回上一页」，避免外链直达时 navigate(-1) 离开本站 */
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
