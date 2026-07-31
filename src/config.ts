/**
 * 静态资源公网根（无尾斜杠）。文章 `file`、`cover` 若存相对路径且托管在 OSS，
 * 构建前设置环境变量 `VITE_PUBLIC_ASSET_BASE`，例如：https://bucket.oss-cn-shenzhen.aliyuncs.com
 */
export const PUBLIC_ASSET_BASE = (
  import.meta.env.VITE_PUBLIC_ASSET_BASE as string | undefined
)?.trim()
  .replace(/\/$/, '') ?? ''

/** 站点名称 */
export const SITE_NAME = 'YNWA'
/** 文章数据库 JSON 文件路径 */
export const DB_URL = '/data/db.json'
/** 每页文章数量 */
export const PAGE_SIZE = 10
/** localStorage 中缓存数据库内容的 key */
export const CACHE_KEY = 'DA_CACHE_KEY'
/** localStorage 中缓存时间戳的 key */
export const CACHE_TS_KEY = 'DA_CACHE_TS_KEY'
/** localStorage 中永久禁用 db.json 缓存的标识 key */
export const CACHE_DISABLED_KEY = 'DA_CACHE_DISABLED'
/** 任意页面 URL 上用于禁用缓存的查询参数名；仅 nocache=1 生效（如 /?nocache=1） */
export const CACHE_DISABLE_PARAM = 'nocache'
/** 缓存有效期：1 小时（毫秒） */
export const CACHE_TTL_MS = 3600 * 1000
/** 版权起始年份 */
export const FOOTER_COPYRIGHT_START = 2020
/** ICP 备案号 */
export const FOOTER_ICP = '粤ICP备17039322号-3'
/** ICP 备案查询链接 */
export const FOOTER_ICP_LINK = 'https://beian.miit.gov.cn'
