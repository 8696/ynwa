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
