/**
 * 站点运行时常量。通过经典 <script> 注入全局，供 utils / 页面直接读取。
 *
 * 文章 file、cover 若为相对路径且资源不在本站，将 PUBLIC_ASSET_BASE 改为公网根 URL（无尾斜杠），例如：
 *   var PUBLIC_ASSET_BASE = 'https://bucket.oss-cn-shenzhen.aliyuncs.com'
 * 留空则相对路径按站内绝对路径（前导 /）请求。
 */
var PUBLIC_ASSET_BASE = ''

/** 站点名称，用于标题与顶栏 */
var SITE_NAME = 'YNWA'
/** 全站元数据 JSON；须与静态目录 assets/data/db.json 一致 */
var DB_URL = '/assets/data/db.json'
/** 列表页每页条数 */
var PAGE_SIZE = 10
/** localStorage：缓存的 db.json 正文 */
var CACHE_KEY = 'DA_CACHE_KEY'
/** localStorage：上次写入缓存的时间戳（毫秒） */
var CACHE_TS_KEY = 'DA_CACHE_TS_KEY'
/**
 * localStorage：永久跳过 db 缓存的开关。
 * URL 一旦带 nocache=1 就会写成 '1'，之后即使去掉查询参数也继续强制拉新，直到手动清存储。
 */
var CACHE_DISABLED_KEY = 'DA_CACHE_DISABLED'
/** 禁用缓存的查询参数名；仅值为 1 时生效，如 /?nocache=1 */
var CACHE_DISABLE_PARAM = 'nocache'
/** 生产环境缓存有效期：1 小时 */
var CACHE_TTL_MS = 3600 * 1000
/** 页脚版权起始年，与当前年拼成区间 */
var FOOTER_COPYRIGHT_START = 2020
/** ICP 备案号，展示在页脚 */
var FOOTER_ICP = '粤ICP备17039322号-3'
/** 工信部备案查询入口 */
var FOOTER_ICP_LINK = 'https://beian.miit.gov.cn'
