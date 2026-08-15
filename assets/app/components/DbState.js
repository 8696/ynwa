/**
 * db 加载态统一出口：加载中/失败展示对应文案，失败附重试按钮。
 * 各页面「db 未就绪」的分支都用它，避免断网时永远停在「加载中…」且无路可走。
 */
function DbState(props) {
  var ctx = useDB()
  if (ctx.db) return null
  var cls = props.compact ? 'status status--compact' : 'status'
  if (!ctx.error) return <div className={cls}>加载中…</div>
  return (
    <div className={cls}>
      <p>数据加载失败：{ctx.error}</p>
      <button type="button" className="btn status-retry" onClick={ctx.retryDB}>重试</button>
    </div>
  )
}
