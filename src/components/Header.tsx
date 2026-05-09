import { Link, useLocation } from 'react-router-dom'
import { useDB } from '../hooks/useDB'
import type { NavItem } from '../types'

/** 当前激活的导航项信息 */
interface ActiveNav {
  type: 'none' | 'home' | 'category' | 'tag' | 'search' | 'link'
  value?: string
}

/**
 * 顶部导航栏组件
 * - 左侧显示站点名称 + 导航链接（由 db.json 的 nav 字段驱动）
 * - 右侧显示搜索图标
 * - 根据当前 URL 路径自动高亮对应导航项
 * - 文章详情页会高亮其所属的第一个分类
 */
export default function Header() {
  const { db } = useDB()
  const location = useLocation()
  const pathname = location.pathname

  const safeDecode = (s: string) => {
    try {
      return decodeURIComponent(s)
    } catch {
      return s
    }
  }

  /** 根据当前路径推断哪个导航项应该高亮 */
  const getActiveNav = (): ActiveNav => {
    if (pathname === '/') return { type: 'home' }
    if (pathname.startsWith('/category/')) {
      const id = safeDecode(pathname.slice('/category/'.length))
      return { type: 'category', value: id }
    }
    if (pathname.startsWith('/tag/')) {
      const id = safeDecode(pathname.slice('/tag/'.length))
      return { type: 'tag', value: id }
    }
    if (pathname.startsWith('/search')) return { type: 'search' }
    // 文章页：高亮该文章所属的第一个分类
    if (pathname.startsWith('/article/')) {
      // db 未加载时不要错误高亮“首页”，等 db 到位后再计算所属分类
      if (!db) return { type: 'none' }
      const id = safeDecode(pathname.slice('/article/'.length))
      const post = db?.articles.find(p => p.id === id)
      const firstCat = post?.categories?.[0]
      if (firstCat) return { type: 'category', value: firstCat }
    }
    return { type: 'none' }
  }

  const activeNav = getActiveNav()

  // 导航链接的基础样式与激活样式
  const linkBase =
    'inline-flex cursor-pointer items-center whitespace-nowrap text-[15px] font-normal ' +
    'text-[#8e8e93] tracking-tight px-3.5 no-underline ' +
    'transition-colors duration-200 hover:text-[#636366]'
  const linkActive =
    'inline-flex cursor-pointer items-center whitespace-nowrap text-[15px] font-semibold ' +
    'text-[#1c1c1e] tracking-tight px-3.5 no-underline'

  const navItems: NavItem[] = Array.isArray(db?.nav) ? db.nav : []

  return (
    <header className="header-blur sticky top-0 z-50 border-b border-[#f2f2f7]">
      <div className="max-w-[784px] mx-auto px-8 min-h-16 flex items-stretch justify-start gap-8">
        <Link
          to="/"
          className="site-title shrink-0 self-center text-[26px] font-semibold text-[#1c1c1e] tracking-tight no-underline hover:opacity-60 transition-opacity duration-200"
        >
          YNWA
        </Link>
        <nav className="flex flex-1 min-w-0 items-center justify-start flex-wrap gap-x-0.5">
          <Link to="/" className={activeNav.type === 'home' ? linkActive : linkBase}>
            首页
          </Link>
          {/* 根据 db.json 中的 nav 配置动态渲染导航项 */}
          {navItems.map((item, i) => {
            if (!item || !item.type || !item.label) return null

            let to = '/'
            let isActive = false
            let external = false
            let target: string | undefined = undefined
            let rel: string | undefined = undefined

            if (item.type === 'category') {
              to = `/category/${item.value}`
              isActive = activeNav.type === 'category' && activeNav.value === item.value
            } else if (item.type === 'tag') {
              to = `/tag/${item.value}`
              isActive = activeNav.type === 'tag' && activeNav.value === item.value
            } else if (item.type === 'link') {
              to = item.value || '#'
              external = true
              if (item.target === '_blank') {
                target = '_blank'
                rel = 'noopener noreferrer'
              }
              isActive = activeNav.type === 'link' && activeNav.value === item.value
            }

            // 外部链接用 <a>，内部链接用 React Router 的 <Link>
            if (external) {
              return (
                <a
                  key={i}
                  href={to}
                  target={target}
                  rel={rel}
                  className={isActive ? linkActive : linkBase}
                >
                  {item.label}
                </a>
              )
            }

            return (
              <Link key={i} to={to} className={isActive ? linkActive : linkBase}>
                {item.label}
              </Link>
            )
          })}
          {/* 搜索按钮，固定在导航栏最右侧 */}
          <Link to="/search" className={linkBase + ' ml-auto'} aria-label="搜索" title="搜索">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  )
}
