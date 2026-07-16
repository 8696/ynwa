import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDB } from '../hooks/useDB'
import { paginate } from '../utils'
import { SITE_NAME, PAGE_SIZE } from '../config'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'

/** 首页：展示全部分页文章列表 */
export default function Home() {
  const { db } = useDB()
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)

  useEffect(() => {
    document.title = SITE_NAME
  }, [])

  const { items, current, totalPages } = useMemo(
    () => paginate(db?.articles ?? [], page, PAGE_SIZE),
    [db?.articles, page]
  )

  if (!db) {
    return (
      <main className="max-w-[784px] mx-auto px-4 md:px-8 flex-1 w-full">
        <div className="pt-8 md:pt-12 pb-9 border-b border-[#e5e5ea] mb-9">
          <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#8e8e93] mb-2">最新文章</p>
          <h1 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.05]">所有文章</h1>
          <p className="mt-2 text-[17px] font-normal text-[#8e8e93] leading-relaxed">记录技术、思考与生活</p>
        </div>
        <div className="py-20 text-center text-[#8e8e93] text-[15px] font-normal">加载中…</div>
      </main>
    )
  }
  // 第一页使用干净的 "/" 路径，避免 /?page=1

  return (
    <main className="max-w-[784px] mx-auto px-4 md:px-8 flex-1 w-full">
      <div className="pt-8 md:pt-12 pb-9 border-b border-[#e5e5ea] mb-9">
        <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#8e8e93] mb-2">最新文章</p>
        <h1 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.05]">所有文章</h1>
        <p className="mt-2 text-[17px] font-normal text-[#8e8e93] leading-relaxed">记录技术、思考与生活</p>
      </div>

      <div className="flex flex-col">
        {items.length
          ? items.map(p => <ArticleCard key={p.id} post={p} db={db} />)
          : <div className="py-20 text-center text-[#8e8e93]">暂无文章</div>
        }
      </div>

      <Pagination
        current={current}
        totalPages={totalPages}
        buildUrl={n => n === 1 ? '/' : `/?page=${n}`}
      />
    </main>
  )
}
