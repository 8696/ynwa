import { useEffect } from 'react'
import { SITE_NAME } from '../config'

/** 404 页面：匹配所有未命中的路由 */
export default function NotFound() {
  useEffect(() => {
    document.title = `404 · ${SITE_NAME}`
  }, [])

  return (
    <main className="max-w-[784px] mx-auto px-4 md:px-8 flex-1 w-full flex items-center">
      <section className="w-full py-20 md:py-28 text-center">
        <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#8e8e93] mb-3">Error</p>
        <h1 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.03em] leading-none mb-3">404</h1>
        <p className="text-[20px] md:text-[24px] font-semibold tracking-[-0.02em] leading-tight mb-3">页面不存在</p>
        <p className="text-[17px] text-[#8e8e93] leading-relaxed max-w-[520px] mx-auto">
          你访问的地址可能已被删除、改名，或暂时不可用。
        </p>
      </section>
    </main>
  )
}
