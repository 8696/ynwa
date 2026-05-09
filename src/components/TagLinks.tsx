import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { DB } from '../types'

/** 将一组标签 ID 渲染为可点击的标签链接列表 */
export default function TagLinks({ tagIds, db }: { tagIds: string[]; db: DB }) {
  const tags = useMemo(() => (tagIds || []).map(tagId => {
    const t = db.tags.find(x => x.id === tagId)
    return { id: tagId, label: t ? t.name : tagId }
  }), [db.tags, tagIds])

  return <>{tags.map(tag => (
    <Link
      key={tag.id}
      to={`/tag/${tag.id}`}
      className="cursor-pointer text-[12px] font-normal text-[#aeaeb2] px-0.5 py-0 no-underline hover:text-[#8e8e93] transition-colors duration-150"
    >
      {tag.label}
    </Link>
  ))}</>
}
