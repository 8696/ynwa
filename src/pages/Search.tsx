import { useEffect, useState, useRef, useCallback, useMemo, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDB } from '../hooks/useDB'
import { searchArticles, highlightOne, formatDate, getCategoryList } from '../utils'
import { SITE_NAME } from '../config'
import type { Article, DB } from '../types'

/** 搜索结果最大展示条数 */
const SEARCH_MAX_RESULTS = 50

/** 单条搜索结果行：高亮显示命中关键词 */
function SearchResultRow({ post, query, db }: { post: Article; query: string; db: DB }) {
  const href = `/article/${encodeURIComponent(post.id)}`
  const catList = useMemo(() => getCategoryList(db, post.categories), [db, post.categories])
  const highlightedTitle = useMemo(() => highlightOne(post.title || '', query), [post.title, query])
  const highlightedSummary = useMemo(() => highlightOne(post.summary, query), [post.summary, query])
  const tags = useMemo(() => (post.tags || []).map(tagId => {
    const t = db.tags.find(x => x.id === tagId)
    return { id: tagId, label: t ? t.name : tagId }
  }), [db.tags, post.tags])

  return (
    <article className="py-7 md:py-9 border-b border-[#f2f2f7] first:pt-0">
      <div>
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] leading-tight mb-3">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-[#1c1c1e] no-underline hover:opacity-70 transition-opacity duration-150"
              dangerouslySetInnerHTML={{ __html: highlightedTitle }}
            />
          </h2>
          {post.summary && (
            <p
              className="text-[#8e8e93] text-[15px] font-normal leading-relaxed mb-5 overflow-hidden line-clamp-2"
              dangerouslySetInnerHTML={{ __html: highlightedSummary }}
            />
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
            <time className="text-[13px] font-normal text-[#8e8e93] whitespace-nowrap">{formatDate(post.date)}</time>
            {catList.map(c => (
              <a
                key={c.id}
                href={`/category/${c.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-[12px] font-medium text-[#636366] px-2 py-0.5 bg-[#f2f2f7] rounded-full hover:bg-[#e5e5ea] no-underline transition-colors duration-150"
              >
                {c.name}
              </a>
            ))}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
              {tags.map(tag => (
                <a
                  key={tag.id}
                  href={`/tag/${tag.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-[12px] font-normal text-[#aeaeb2] px-0.5 py-0 no-underline hover:text-[#8e8e93] transition-colors duration-150"
                >
                  {tag.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-[14px] font-normal text-[#aeaeb2] no-underline whitespace-nowrap shrink-0 hover:text-[#8e8e93] transition-colors duration-150"
        >
          阅读全文 →
        </a>
      </div>
    </article>
  )
}

/**
 * 搜索页
 * - 在文章标题和摘要中执行关键词匹配
 * - 使用 URL 查询参数 (?q=xxx) 同步搜索状态，支持浏览器前进/后退
 * - 输入防抖 200ms 后更新 URL
 */
export default function Search() {
  const { db } = useDB()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    document.title = `搜索 · ${SITE_NAME}`
  }, [])

  // 兼容浏览器前进/后退或外部跳转：当 URL 的 q 变化时同步输入框
  useEffect(() => {
    const q = searchParams.get('q') || ''
    if (q !== query) setQuery(q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // 卸载时清理防抖定时器，避免 setState 在卸载后触发
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const updateURL = useCallback((q: string) => {
    setSearchParams(q ? { q } : {}, { replace: true })
  }, [setSearchParams])

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setQuery(v)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => updateURL(v.trim()), 200)
  }, [updateURL])

  const rows = useMemo(() => db ? searchArticles(db, query) : [], [db, query])
  const visibleRows = useMemo(() => rows.slice(0, SEARCH_MAX_RESULTS), [rows])
  const isTruncated = useMemo(() => rows.length > SEARCH_MAX_RESULTS, [rows])

  return (
    <main className="max-w-[784px] mx-auto px-4 md:px-8 flex-1 w-full">
      <div className="pt-8 md:pt-12 pb-9 border-b border-[#e5e5ea] mb-9">
        <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#8e8e93] mb-2">文章搜索</p>
        <h1 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.05]">搜索</h1>
        <p className="mt-2 text-[17px] font-normal text-[#8e8e93] leading-relaxed">输入关键词，在全部文章条目的字段值中匹配</p>
      </div>

      <div className="mb-8">
        <label htmlFor="search-input" className="sr-only">搜索关键词</label>
        <input
          type="search"
          id="search-input"
          autoComplete="off"
          placeholder="输入关键词…"
          value={query}
          onChange={handleInput}
          className="w-full px-4 py-3.5 text-[16px] rounded-xl border border-[#e5e5ea] bg-[#fafafa] text-[#1c1c1e] placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-[#1c1c1e]/10 focus:border-[#c7c7cc] transition-shadow"
        />
        <p className="mt-2 text-[13px] text-[#8e8e93] leading-relaxed">
          <code className="text-[12px] font-mono">结果最多显示 50 条</code>
        </p>
      </div>

      <div className="flex flex-col min-h-[120px]">
        {!db ? (
          <div className="py-12 text-center text-[#8e8e93] text-[15px] font-normal">加载中…</div>
        ) : !query.trim() ? null : rows.length === 0 ? (
          <div className="py-12 text-center text-[#8e8e93] text-[15px] font-normal">未找到匹配项</div>
        ) : (
          <>
            {isTruncated && (
              <p className="mb-4 text-[13px] text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                结果已截断为前 {SEARCH_MAX_RESULTS} 条，请缩小关键词范围。
              </p>
            )}
            <p className="text-[14px] text-[#8e8e93] mb-4">共 {visibleRows.length} 条结果</p>
            <div className="flex flex-col">
              {visibleRows.map(r => (
                <SearchResultRow key={r.post.id} post={r.post} query={query} db={db} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
