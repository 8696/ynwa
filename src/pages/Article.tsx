import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import { useDB } from '../hooks/useDB'
import { formatDate, getCategoryList } from '../utils'
import { SITE_NAME } from '../config'
import TagLinks from '../components/TagLinks'

/**
 * 文章详情页
 * - 根据 URL 中的 :id 查找文章元数据
 * - 远程加载 Markdown 文件并用 marked 解析为 HTML
 * - 渲染后对代码块执行 highlight.js 语法高亮
 * - 自动为外部链接添加 target="_blank"
 */
export default function Article() {
  const { id } = useParams()
  const { db } = useDB()
  const navigate = useNavigate()
  const [content, setContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const post = db?.articles.find(p => p.id === id)

  // 加载 Markdown 文件并渲染为 HTML
  useEffect(() => {
    if (!post) return
    document.title = `${post.title} · ${SITE_NAME}`

    let cancelled = false
    async function load() {
      try {
        const file = post!.file
        const filePath = file.startsWith('/') ? file : '/' + file
        const res = await fetch(filePath)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const mdText = await res.text()
        if (cancelled) return

        marked.setOptions({ gfm: true, breaks: false })
        const unsafeHtml = marked.parse(mdText) as string
        const safeHtml = DOMPurify.sanitize(unsafeHtml, {
          USE_PROFILES: { html: true },
          // 仅允许常见安全协议 + 站内相对路径，避免 javascript: 等危险协议
          ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|\/|\.\/|\.\.\/)/i,
        })
        setContent(safeHtml)
      } catch (err) {
        if (!cancelled) setError((err as Error).message)
      }
    }
    load()
    return () => { cancelled = true }
  }, [post])

  // HTML 渲染完成后，对代码块应用语法高亮并为外部链接设置新窗口打开
  useEffect(() => {
    if (!content) return
    const container = document.getElementById('post-content')
    if (!container) return
    container.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el as HTMLElement))
    container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]').forEach(a => {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    })
  }, [content])

  if (!db) {
    return (
      <main className="max-w-[784px] mx-auto px-8 flex-1 w-full">
        <div className="py-20 text-center text-[#8e8e93] text-[15px] font-normal">加载中…</div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="max-w-[784px] mx-auto px-8 flex-1 w-full">
        <div className="py-20 text-center text-[#8e8e93]">文章不存在</div>
      </main>
    )
  }

  const catList = getCategoryList(db, post.categories)

  return (
    <main className="max-w-[784px] mx-auto px-8 flex-1 w-full">
      <div className="pt-12 pb-9 border-b border-[#e5e5ea] mb-9">
        {window.history.length > 1 ? (
          <a
            onClick={e => { e.preventDefault(); navigate(-1) }}
            className="cursor-pointer inline-flex items-center gap-1.5 text-[15px] font-normal text-[#8e8e93] pb-4 hover:text-[#1c1c1e] no-underline"
          >
            ← 返回
          </a>
        ) : (
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[15px] font-normal text-[#8e8e93] pb-4 hover:text-[#1c1c1e] no-underline"
          >
            ← 首页
          </Link>
        )}

        <h1 className="text-[38px] font-semibold tracking-[-0.03em] leading-[1.12] mb-3 text-[#1c1c1e]">
          {post.title}
        </h1>

        {post.summary && (
          <p className="text-[17px] text-[#8e8e93] font-normal leading-relaxed mb-5">{post.summary}</p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <time className="text-[13px] font-normal text-[#8e8e93] whitespace-nowrap">{formatDate(post.date)}</time>
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {catList.map(c => (
              <Link
                key={c.id}
                to={`/category/${c.id}`}
                className="cursor-pointer text-[12px] font-medium text-[#636366] px-2 py-0.5 bg-[#f2f2f7] rounded-full hover:bg-[#e5e5ea] no-underline transition-colors duration-150"
              >
                {c.name}
              </Link>
            ))}
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
            <TagLinks tagIds={post.tags} db={db} />
          </div>
        </div>
      </div>

      {error ? (
        <div className="py-20 text-center text-[#8e8e93]">文章内容加载失败：{error}</div>
      ) : content ? (
        <div
          id="post-content"
          className="markdown-body pb-16"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className="py-20 text-center text-[#8e8e93] text-[15px] font-normal">加载中…</div>
      )}
    </main>
  )
}
