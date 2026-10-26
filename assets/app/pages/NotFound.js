/**
 * 短链（short link）映射表：短路径 → 目标地址。
 * 用途是把站内很长的内部链接（如 /ai-agents-learning/index.html#docs/03-学习路线.md）
 * 换成 /ai 这样的短路径发给别人。
 *
 * value 两种写法：
 * - 站内绝对路径（以 / 开头）→ 拼当前站 origin 后跳转
 * - http(s):// 完整地址     → 原样跳转（外站）
 */
var SHORT_LINKS = {
  '/ai': '/ai-agents-learning/index.html#docs/03-学习路线.md',
  '/bd': 'http://baidu.com',
}

/**
 * 把短链 value 解析成可跳转的 URL。
 * 站内路径拼当前 origin（避免 http/https、www 裸域名之间跳来跳去丢 hash）；
 * 完整 http(s) 地址原样返回。
 */
function resolveShortLinkTarget(value) {
  if (!value) return ''
  var v = String(value).trim()
  if (/^https?:\/\//i.test(v)) return v
  if (v.charAt(0) !== '/') v = '/' + v
  return window.location.origin + v
}

/** 未匹配路由的占位页。不猜「返回上一页」，避免外链直达时 navigate(-1) 离开本站 */
function NotFound() {
  // 短链命中时首帧就不渲染 404，避免「先闪一下 404 再跳走」。
  // 判定放在渲染期（不是 useEffect），这样命中路径根本不进 DOM。
  var shortLinkTarget = resolveShortLinkTarget(SHORT_LINKS[window.location.pathname])

  React.useEffect(function () {
    document.title = '404 · ' + SITE_NAME
  }, [])

  React.useEffect(function () {
    if (shortLinkTarget) window.location.replace(shortLinkTarget)
  }, [shortLinkTarget])

  // 命中短链：留空页等跳转，不渲染 404 内容
  if (shortLinkTarget) return null

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
