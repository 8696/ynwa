# 糖果屋 (candy-house)

## 页面用途

Neo-Brutalism 风格的个人作品集单页：技能 / 项目 Bento / 经历时间线一屏打尽。HTML 静态页，无构建步骤，浏览器直接打开即跑。

## 设计方式

- Neo-Brutalism 主线：高饱和荧光色（pink / yellow / blue / lime / orange / purple）+ 纯黑硬边描边 + 5–8px 实心阴影
- 米白纸色底（`--paper: #F5F5F0`）配点阵纹理铺底，全局 `::selection` 用黄底高亮
- Sticky 顶导航：宽屏横排，≤820px 折叠成汉堡；移动端链接区展开为整列黑边分隔块
- 滚动揭示：`.reveal` 进入视口时透明度 0→1 + 上移 28px，配合 `reveal-d1..d5` 类错峰
- 字体三层：标题 Plus Jakarta Sans / 正文 Inter / 代码 JetBrains Mono（Google Fonts CDN）
- 可访问性：`#skip-link` 跳转、`:focus-visible` 蓝粗描边、热区 ≥ 48px

## 设计原理

- Brutalism 不用 box-shadow 模糊——阴影 = 5px/8px 实心黑块 + 配合 hover/active 整体平移，按钮按下是「位移吃阴影」反馈
- Bento 布局走 CSS Grid + 大圆角黑边卡片，颜色按主题分组（粉/黄/蓝/绿/橙/紫），节奏靠颜色错位不靠间距
- 滚动揭示用 `IntersectionObserver`（在 HTML 内联脚本里），加错峰延迟避免「全屏一齐动」的廉价感
- 噪点纹理走固定层 SVG `<feTurbulence>`，`opacity:.06` 提质感不抢内容
- 平滑滚动 `scroll-behavior:smooth` + `scroll-padding-top:96px` 配 sticky 导航，锚点不被遮

## 使用技术

- 纯 HTML + CSS（无 JS 框架、无打包）
- Google Fonts（Plus Jakarta Sans / Inter / JetBrains Mono）
- 内联 SVG 噪点纹理；零构建，浏览器直开

## 文件结构

```
ai-agent/candy-house/
├── index.html   # 单文件作品集（HTML + 内联 CSS + 内联脚本）
└── README.md    # 本文件
```