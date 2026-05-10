import { Link } from 'react-router-dom'
import { formatDate, getCategoryList, resolvePublicAssetUrl } from '../utils'
import TagLinks from './TagLinks'
import type { Article, DB } from '../types'

/** 文章列表中的单张卡片组件，展示标题、摘要、日期、分类、标签和封面图 */
export default function ArticleCard({ post, db }: { post: Article; db: DB }) {
  const catList = getCategoryList(db, post.categories)
  const dateStr = formatDate(post.date)
  const coverRaw = typeof post.cover === 'string' ? post.cover.trim() : ''
  const cover = coverRaw ? resolvePublicAssetUrl(coverRaw) : ''
  // 有封面时采用左右布局：左侧文字 + 右侧缩略图

  return (
    <article className="py-9 border-b border-[#f2f2f7] first:pt-0">
      <div className={cover ? 'flex items-start gap-5' : ''}>
        <div className={cover ? 'min-w-0 flex-1' : ''}>
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] leading-tight mb-3">
            <Link
              to={`/article/${post.id}`}
              className="cursor-pointer text-[#1c1c1e] no-underline hover:opacity-70 transition-opacity duration-150"
            >
              {post.title}
            </Link>
          </h2>
          <p className="text-[#8e8e93] text-[15px] font-normal leading-relaxed mb-5 overflow-hidden line-clamp-2">
            {post.summary}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
            <time className="text-[13px] font-normal text-[#8e8e93] whitespace-nowrap">{dateStr}</time>
            {catList.map(c => (
              <Link
                key={c.id}
                to={`/category/${c.id}`}
                className="cursor-pointer text-[12px] font-medium text-[#636366] px-2 py-0.5 bg-[#f2f2f7] rounded-full hover:bg-[#e5e5ea] no-underline transition-colors duration-150"
              >
                {c.name}
              </Link>
            ))}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
              <TagLinks tagIds={post.tags} db={db} />
            </div>
          </div>
        </div>
        {cover && (
          <Link to={`/article/${post.id}`} className="block w-[180px] h-[108px] shrink-0 rounded-xl overflow-hidden bg-[#f2f2f7]">
            <img src={cover} alt={post.title} loading="lazy" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-200" />
          </Link>
        )}
      </div>
      <div className="flex items-center justify-end gap-4">
        <Link
          to={`/article/${post.id}`}
          className="cursor-pointer text-[14px] font-normal text-[#aeaeb2] no-underline whitespace-nowrap shrink-0 hover:text-[#8e8e93] transition-colors duration-150"
        >
          阅读全文 →
        </Link>
      </div>
    </article>
  )
}
