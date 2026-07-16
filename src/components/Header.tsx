import { useEffect, useState } from 'react'
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
 * - 响应式断点使用 Tailwind 的 md（min-width: 768px）：
 *   · 视口 < 768px：汉堡按钮展开竖排菜单
 *   · 视口 ≥ 768px：横排导航（首页 / nav / 搜索）
 * - 根据当前 URL 路径自动高亮对应导航项
 * - 文章详情页会高亮其所属的第一个分类
 */
export default function Header() {
  const { db } = useDB()
  const location = useLocation()
  const pathname = location.pathname
  const [menuOpen, setMenuOpen] = useState(false)

  // 路由变化时关闭移动端（< 768px）折叠菜单
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Esc 关闭；拉宽到 md 及以上时同步关闭，避免状态残留
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const mq = window.matchMedia('(min-width: 768px)')
    const onBreakpoint = () => {
      if (mq.matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    mq.addEventListener('change', onBreakpoint)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      mq.removeEventListener('change', onBreakpoint)
    }
  }, [])

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

  // 桌面横排导航链接样式（≥ 768px / md: 时使用）
  const linkBase =
    'inline-flex cursor-pointer items-center whitespace-nowrap text-[15px] font-normal ' +
    'text-[#8e8e93] tracking-tight px-3.5 no-underline ' +
    'transition-colors duration-200 hover:text-[#636366]'
  const linkActive =
    'inline-flex cursor-pointer items-center whitespace-nowrap text-[15px] font-semibold ' +
    'text-[#1c1c1e] tracking-tight px-3.5 no-underline'

  // 移动端竖排菜单链接样式（< 768px 汉堡展开时使用）
  const mobileLinkBase =
    'block cursor-pointer text-[16px] font-normal text-[#8e8e93] tracking-tight px-4 py-3 no-underline ' +
    'transition-colors duration-200 hover:text-[#636366] hover:bg-[#f2f2f7]'
  const mobileLinkActive =
    'block cursor-pointer text-[16px] font-semibold text-[#1c1c1e] tracking-tight px-4 py-3 no-underline bg-[#f2f2f7]'

  const navItems: NavItem[] = Array.isArray(db?.nav) ? db.nav : []

  /** 解析单个 nav 项的目标与激活状态 */
  const resolveNavItem = (item: NavItem) => {
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

    return { to, isActive, external, target, rel }
  }

  return (
    <header className="header-blur sticky top-0 z-50 border-b border-[#f2f2f7]">
      <div className="max-w-[784px] mx-auto px-4 md:px-8 min-h-14 md:min-h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="site-title shrink-0 self-center text-[22px] md:text-[26px] font-semibold text-[#1c1c1e] tracking-tight no-underline hover:opacity-60 transition-opacity duration-200"
        >
          YNWA
        </Link>

        {/* 桌面横排导航：hidden md:flex → 仅 ≥ 768px 显示 */}
        <nav className="hidden md:flex flex-1 min-w-0 items-center justify-start flex-wrap gap-x-0.5">
          <Link to="/" className={activeNav.type === 'home' ? linkActive : linkBase}>
            首页
          </Link>
          {navItems.map((item, i) => {
            if (!item || !item.type || !item.label) return null
            const { to, isActive, external, target, rel } = resolveNavItem(item)

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
          <Link to="/search" className={linkBase + ' ml-auto'} aria-label="搜索" title="搜索">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
            </svg>
          </Link>
        </nav>

        {/* 移动端工具区：flex md:hidden → 仅 < 768px 显示（搜索 + 汉堡） */}
        <div className="flex md:hidden items-center gap-1">
          <Link
            to="/search"
            className="inline-flex items-center justify-center w-10 h-10 text-[#8e8e93] hover:text-[#636366] transition-colors"
            aria-label="搜索"
            title="搜索"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
            </svg>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 text-[#8e8e93] hover:text-[#636366] transition-colors"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.75">
                <line x1="6" y1="6" x2="18" y2="18"></line>
                <line x1="6" y1="18" x2="18" y2="6"></line>
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.75">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="17" x2="20" y2="17"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 汉堡展开的竖排菜单：仅 < 768px 渲染；md:hidden 防止桌面误显 */}
      {menuOpen && (
        <nav className="md:hidden border-t border-[#f2f2f7] max-w-[784px] mx-auto px-0 pb-2">
          <Link
            to="/"
            className={activeNav.type === 'home' ? mobileLinkActive : mobileLinkBase}
            onClick={() => setMenuOpen(false)}
          >
            首页
          </Link>
          {navItems.map((item, i) => {
            if (!item || !item.type || !item.label) return null
            const { to, isActive, external, target, rel } = resolveNavItem(item)

            if (external) {
              return (
                <a
                  key={i}
                  href={to}
                  target={target}
                  rel={rel}
                  className={isActive ? mobileLinkActive : mobileLinkBase}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            }

            return (
              <Link
                key={i}
                to={to}
                className={isActive ? mobileLinkActive : mobileLinkBase}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
