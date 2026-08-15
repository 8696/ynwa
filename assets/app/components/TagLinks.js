/** 标签 ID 列表 → 可点击的 /tag/:id 链接；未知 ID 用 ID 本身当文案 */
function TagLinks(props) {
  var tagIds = props.tagIds
  var db = props.db
  var openInNewTab = !!props.openInNewTab
  var tags = React.useMemo(function () {
    return (tagIds || []).map(function (tagId) {
      var t = db.tags.find(function (x) { return x.id === tagId })
      return { id: tagId, label: t ? t.name : tagId }
    })
  }, [db.tags, tagIds])
  var tab = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <React.Fragment>
      {tags.map(function (tag) {
        return (
          <ReactRouterDOM.Link key={tag.id} to={'/tag/' + tag.id} className="tag-link" {...tab}>
            {tag.label}
          </ReactRouterDOM.Link>
        )
      })}
    </React.Fragment>
  )
}
