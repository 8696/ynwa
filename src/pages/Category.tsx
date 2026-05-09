import { useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDB } from '../hooks/useDB'
import { paginate } from '../utils'
import { SITE_NAME, PAGE_SIZE } from '../config'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'

/** 分类详情页：展示属于指定分类的文章列表（分页） */
export default function Category() {
  const { id: catId = '' } = useParams()
  const { db } = useDB()
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)

  const cat = useMemo(() => db?.categories.find(c => c.id === catId), [db, catId])

  const filtered = useMemo(() => {
    if (!db) return []
    return db.articles.filter(p =>
      Array.isArray(p.categories) ? p.categories.includes(catId) : p.categories === catId,
    )
  }, [db, catId])

  const { items, current, totalPages } = useMemo(
    () => paginate(filtered, page, PAGE_SIZE),
    [filtered, page],
  )

  useEffect(() => {
    if (cat) document.title = `${cat.name} · ${SITE_NAME}`
  }, [cat])

  if (!db) {
    return (
      <main className="max-w-[784px] mx-auto px-8 flex-1 w-full">
        <div className="py-20 text-center text-[#8e8e93] text-[15px] font-normal">加载中…</div>
      </main>
    )
  }

  if (!cat) {
    return (
      <main className="max-w-[784px] mx-auto px-8 flex-1 w-full">
        <div className="pt-12 pb-9 border-b border-[#e5e5ea] mb-9">
          <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#8e8e93] mb-2">分类</p>
          <h1 className="text-[40px] font-semibold tracking-[-0.03em] leading-[1.05]">分类不存在</h1>
        </div>
        <div className="py-20 text-center text-[#8e8e93]">找不到该分类</div>
      </main>
    )
  }

  return (
    <main className="max-w-[784px] mx-auto px-8 flex-1 w-full">
      <div className="pt-12 pb-9 border-b border-[#e5e5ea] mb-9">
        <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#8e8e93] mb-2">分类</p>
        <h1 className="text-[40px] font-semibold tracking-[-0.03em] leading-[1.05]">{cat.name}</h1>
        {cat.description && (
          <p className="mt-2 text-[17px] font-normal text-[#8e8e93] leading-relaxed">{cat.description}</p>
        )}
      </div>

      <div className="flex flex-col">
        {items.length
          ? items.map(p => <ArticleCard key={p.id} post={p} db={db} />)
          : <div className="py-20 text-center text-[#8e8e93]">该分类暂无文章</div>
        }
      </div>

      <Pagination
        current={current}
        totalPages={totalPages}
        buildUrl={n => `/category/${catId}?page=${n}`}
      />
    </main>
  )
}
