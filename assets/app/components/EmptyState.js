/**
 * 空态组件。404 / 分类不存在 / 标签不存在 / 空分类 / 空标签 共用视觉骨架。
 * props: eyebrow (顶部等宽小标签) · code (主题色大数字块) · title (标题) · desc (描述)
 */
function EmptyState(props) {
  return (
    <section className="empty">
      <p className="eyebrow">{props.eyebrow}</p>
      <p className="empty-code">{props.code}</p>
      <p className="empty-title">{props.title}</p>
      <p className="empty-desc">{props.desc}</p>
    </section>
  )
}
