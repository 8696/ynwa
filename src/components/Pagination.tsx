import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { buildPageRange } from '../utils'

/**
 * 分页导航组件
 * @param current   当前页码
 * @param totalPages 总页数
 * @param buildUrl   根据页码生成对应 URL 的函数
 */
export default function Pagination({ current, totalPages, buildUrl }: {
  current: number
  totalPages: number
  buildUrl: (n: number) => string
}) {
  // 必须在 early return 之前调用 hooks，避免违反 Rules of Hooks
  const pageRange = useMemo(() => buildPageRange(current, totalPages), [current, totalPages])

  // 只有一页时不渲染分页器
  if (totalPages <= 1) return null

  const itemBase =
    'cursor-pointer inline-flex items-center justify-center h-8 px-2 text-[14px] font-normal text-[#8e8e93] no-underline transition-colors duration-150'
  const itemHover = 'hover:text-[#1c1c1e]'

  return (
    <nav className="flex flex-wrap items-center justify-start gap-1 sm:gap-2 py-8 md:py-10">
      {current > 1 ? (
        <Link className={`${itemBase} pl-0 ${itemHover}`} to={buildUrl(current - 1)}>
          上一页
        </Link>
      ) : (
        <span className={`${itemBase} pl-0 opacity-35 pointer-events-none`}>上一页</span>
      )}

      {pageRange.map((n, i) =>
        n === '...' ? (
          <span key={`dot-${i}`} className="text-[14px] text-[#aeaeb2] px-1">…</span>
        ) : (
          <Link
            key={n}
            to={buildUrl(n)}
            className={
              n === current
                ? `${itemBase} text-[#1c1c1e] font-medium border-b border-[#c7c7cc]`
                : `${itemBase} ${itemHover}`
            }
          >
            {n}
          </Link>
        ),
      )}

      {current < totalPages ? (
        <Link className={`${itemBase} ${itemHover}`} to={buildUrl(current + 1)}>
          下一页
        </Link>
      ) : (
        <span className={`${itemBase} opacity-35 pointer-events-none`}>下一页</span>
      )}
    </nav>
  )
}
