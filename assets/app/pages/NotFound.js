/** 未匹配路由的占位页。不猜「返回上一页」，避免外链直达时 navigate(-1) 离开本站 */
function NotFound() {
  React.useEffect(function () {
    document.title = '404 · ' + SITE_NAME
  }, [])

  return (
    <main className="page page--center">
      <EmptyState
        eyebrow="Error"
        code="404"
        title="页面不存在"
        desc="你访问的地址可能已被删除、改名，或暂时不可用。"
      />
    </main>
  )
}
