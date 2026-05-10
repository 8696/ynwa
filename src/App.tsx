import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Category = lazy(() => import('./pages/Category'))
const Tag = lazy(() => import('./pages/Tag'))
const Search = lazy(() => import('./pages/Search'))
const Upload = lazy(() => import('./pages/Upload'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
      <Suspense fallback={<div className="h-screen w-full bg-white"></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/tag/:id" element={<Tag />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}
