import { useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDB } from '../hooks/useDB'
import { paginate } from '../utils'
import { SITE_NAME, PAGE_SIZE } from '../config'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'

/** 标签详情页：展示包含指定标签的文章列表（分页） */
export default function Tag() {
  const { id: tagId = '' } = useParams()
  const { db } = useDB()
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)

  const tag = useMemo(() => db?.tags.find(t => t.id === tagId), [db, tagId])

  useEffect(() => {
    if (tag) document.title = `${tag.name} · 标签 · ${SITE_NAME}`
  }, [tag])

  if (!db) {
    return (
      <main className="max-w-[784px] mx-auto px-4 md:px-8 flex-1 w-full">
        <div className="py-20 text-center text-[#8e8e93] text-[15px] font-normal">加载中…</div>
      </main>
    )
  }

  if (!tag) {
    return (
      <main className="max-w-[784px] mx-auto px-4 md:px-8 flex-1 w-full">
        <div className="pt-8 md:pt-12 pb-9 border-b border-[#e5e5ea] mb-9">
          <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#8e8e93] mb-2">标签</p>
          <h1 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.05]">标签不存在</h1>
        </div>
        <div className="py-20 text-center text-[#8e8e93]">找不到该标签</div>
      </main>
    )
  }

  const filtered = useMemo(() => db.articles.filter(p => (p.tags || []).includes(tagId)), [db.articles, tagId])
  const { items, current, totalPages } = useMemo(() => paginate(filtered, page, PAGE_SIZE), [filtered, page])

  return (
    <main className="max-w-[784px] mx-auto px-4 md:px-8 flex-1 w-full">
      <div className="pt-8 md:pt-12 pb-9 border-b border-[#e5e5ea] mb-9">
        <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#8e8e93] mb-2">标签</p>
        <h1 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.05]">{tag.name}</h1>
        <p className="mt-2 text-[17px] font-normal text-[#8e8e93] leading-relaxed">含此标签的文章</p>
      </div>

      <div className="flex flex-col">
        {items.length
          ? items.map(p => <ArticleCard key={p.id} post={p} db={db} />)
          : <div className="py-20 text-center text-[#8e8e93]">暂无带此标签的文章</div>
        }
      </div>

      <Pagination
        current={current}
        totalPages={totalPages}
        buildUrl={n => `/tag/${tagId}?page=${n}`}
      />
    </main>
  )
}
