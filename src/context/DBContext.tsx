import { createContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { DB_URL, CACHE_KEY, CACHE_TS_KEY, CACHE_TTL_MS } from '../config'
import type { DB } from '../types'

interface DBContextValue {
  db: DB | null
  loadDB: () => Promise<DB>
}

export const DBContext = createContext<DBContextValue>({
  db: null,
  loadDB: async () => {
    throw new Error('DBContext: missing DBProvider')
  },
})

/**
 * 数据库 Context Provider
 * 负责从 /data/db.json 加载全站数据，并提供带 localStorage 缓存的读取策略：
 * - 本地开发环境（localhost）每次都强制重新请求
 * - 生产环境优先读取 localStorage 缓存，过期后重新请求
 */
export function DBProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<DB | null>(null)
  const inflightRef = useRef<Promise<DB> | null>(null)

  const loadDB = useCallback(async (): Promise<DB> => {
    // 已加载过则直接返回内存缓存
    if (db) return db
    // StrictMode / 多处调用时，复用同一个 in-flight 请求，避免重复 fetch
    if (inflightRef.current) return inflightRef.current

    const p = (async (): Promise<DB> => {
      const hostname = window.location.hostname
      // 本地开发环境跳过缓存，始终拉取最新数据
      const forceFresh = hostname === 'localhost' || hostname === '127.0.0.1'

      if (!forceFresh) {
        try {
          // 检查 localStorage 缓存是否在有效期内
          const ts = parseInt(localStorage.getItem(CACHE_TS_KEY) || '0', 10)
          const now = Date.now()
          if (ts && now - ts < CACHE_TTL_MS) {
            const raw = localStorage.getItem(CACHE_KEY)
            if (raw) {
              const data: DB = JSON.parse(raw)
              setDb(data)
              return data
            }
          }
        } catch {
          // 缓存解析失败，回退到网络请求
        }
      }

      // 带时间戳参数防止浏览器缓存
      const res = await fetch(DB_URL + '?_=' + Date.now())
      if (!res.ok) throw new Error(`DB load failed: HTTP ${res.status}`)
      const data: DB = await res.json()
      // 文章按发布日期降序排列
      data.articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        localStorage.setItem(CACHE_TS_KEY, String(Date.now()))
      } catch {
        // localStorage 满了也不影响功能
      }

      setDb(data)
      return data
    })()

    inflightRef.current = p
    try {
      return await p
    } finally {
      inflightRef.current = null
    }
  }, [db])

  // 组件挂载时自动加载数据库
  useEffect(() => {
    loadDB()
  }, [loadDB])

  return (
    <DBContext.Provider value={{ db, loadDB }}>
      {children}
    </DBContext.Provider>
  )
}
