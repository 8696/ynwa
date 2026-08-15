/** 放大镜图标；桌面导航与头部工具按钮共用，className 透传控制尺寸 */
function SearchIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="11" cy="11" r="7"></circle>
      <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
    </svg>
  )
}
