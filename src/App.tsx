import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Article from './pages/Article'
import Category from './pages/Category'
import Tag from './pages/Tag'
import Search from './pages/Search'
import Upload from './pages/Upload'
import NotFound from './pages/NotFound'

/**
 * 应用根组件
 * 布局结构：顶部导航 → 页面内容区（由路由控制） → 底部版权
 *
 * 路由表：
 *  /                → 首页（文章列表 + 分页）
 *  /article/:id     → 文章详情（Markdown 渲染）
 *  /category/:id    → 分类页（按分类筛选文章）
 *  /tag/:id         → 标签页（按标签筛选文章）
 *  /search          → 搜索页（标题 / 摘要关键词匹配）
 *  *                → 404 页面
 */
export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/tag/:id" element={<Tag />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}
