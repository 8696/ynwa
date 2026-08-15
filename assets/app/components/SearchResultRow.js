/**
 * 单条搜索结果。标题/摘要 HTML 来自 highlightOne（已转义再包 <mark>）。
 * 新窗口打开，方便对照阅读而不离开搜索页。
 */
function SearchResultRow(props) {
  var post = props.post
  var query = props.query
  var titleHtml = React.useMemo(function () {
    return highlightOne(post.title || '', query)
  }, [post.title, query])
  var summaryHtml = React.useMemo(function () {
    return post.summary ? highlightOne(post.summary, query) : ''
  }, [post.summary, query])
  return (
    <ArticleCard
      post={post}
      db={props.db}
      openInNewTab
      titleHtml={titleHtml}
      summaryHtml={summaryHtml}
    />
  )
}
