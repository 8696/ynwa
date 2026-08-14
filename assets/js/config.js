/**
 * 站点运行时常量。通过经典 <script> 注入全局，供 utils / 页面直接读取。
 *
 * 文章 file、cover 若为相对路径且资源不在本站，将 PUBLIC_ASSET_BASE 改为公网根 URL（无尾斜杠），例如：
 *   var PUBLIC_ASSET_BASE = 'https://bucket.oss-cn-shenzhen.aliyuncs.com'
 * 留空则相对路径按站内绝对路径（前导 /）请求。
 */
var PUBLIC_ASSET_BASE = ''

/** 站点名称，用于标题、顶栏、页脚与 logo 首字母 */
var SITE_NAME = 'YNWA'
/** 站点口号，拼在首页 Hero 眉题：{SITE_NAME} · {SITE_SLOGAN} */
var SITE_SLOGAN = "You'll Never Walk Alone"
/** 站点一句话介绍，写入 <meta name="description">，也用作首页 Hero 导语 */
var SITE_DESCRIPTION = '记录技术、思考与生活'
/** 联系邮箱，用于首页联系区和 mailto */
var SITE_EMAIL = 'y201899@gmail.com'
/** 关于区：名字、城市、短介绍、标签。全空则不渲染该区块 */
var SITE_AUTHOR = '啊龙'
var SITE_CITY = '深圳'
/** 关于区右侧「为什么叫 YNWA」正文，可多段 */
var SITE_ABOUT_WHY = [
  '因为喜欢利物浦。YNWA 是队歌 You\'ll Never Walk Alone：安菲尔德唱起来的时候，意思很简单——你不会一个人走。',
  '这就是足球精神。比分会变，人还在；跌倒了站起来，身边总有人。写代码、过日子，我也想按这个来。',
]
var SITE_ABOUT_BIO = '人在深圳。写代码，也关心盘面和路面。'
/** 关于区左侧条目：name 为标签，desc 为一句说明 */
var SITE_ABOUT_TAGS = [
  { name: '咖啡', desc: '续命。清醒往往从一杯开始。' },
  { name: '股市', desc: '图的是清醒：不把情绪交给行情，涨不昏，跌不慌。' },
  { name: '跑步', desc: '出门跑两圈，把噪音跑掉。' },
  { name: '足球', desc: '利物浦。跌倒了还一起走。' },
  { name: '脑洞', desc: '用不上的想法，也得有地方放。' },
]
/**
 * 首页「AI 页面作品集」。条目数据在 db.json 的 works 数组（blog.mjs add-work 管理）。
 * 最多展示 SITE_WORKS_MAX 张卡；仅当作品数超过该上限（溢出）时才追加末尾「更多」卡。
 */
var SITE_WORKS_MAX = 4
/** 「更多」卡文案；href 指向完整作品集页 /works（SPA 内路由） */
var SITE_WORKS_MORE = {
  title: '更多',
  kicker: '全部作品',
  summary: '后面做的 AI 页面会继续放到这里。',
  href: '/works',
}

/**
 * 全站主题调色板。每次访问随机挑一组写入 <html data-theme>，
 * style.css 按 [data-theme=xx] 覆盖强调色变量。改色/加组只动这里。
 * 命名 = 主题名 = data-theme 值（kebab-case）。
 */
var SITE_THEMES = [
  { name: 'yellow',  label: '经典黄',  vars: { accent: '#ffe135', accentSoft: '#fff8d6', accent2: '#ff5a47' } },
  { name: 'blue',    label: '克莱因蓝', vars: { accent: '#2f6bd8', accentSoft: '#dce9fb', accent2: '#ffe135' } },
  { name: 'green',   label: '薄荷绿',  vars: { accent: '#2ec27e', accentSoft: '#d9f2e4', accent2: '#ffe135' } },
  { name: 'pink',    label: '荧光粉',  vars: { accent: '#ff7eb6', accentSoft: '#ffdeee', accent2: '#2f6bd8' } },
  { name: 'purple',  label: '紫罗兰',  vars: { accent: '#9b7ede', accentSoft: '#e9e2fb', accent2: '#ffe135' } },
  { name: 'orange',  label: '活力橙',  vars: { accent: '#ff8a3d', accentSoft: '#ffe5d3', accent2: '#2f6bd8' } },
  { name: 'cyan',    label: '青瓷',   vars: { accent: '#00c2d1', accentSoft: '#d2f4f7', accent2: '#ffe135' } },
  { name: 'lime',    label: '青柠',   vars: { accent: '#a8e10c', accentSoft: '#effbd2', accent2: '#ff5a47' } },
  { name: 'red',     label: '信号红',  vars: { accent: '#ff3b30', accentSoft: '#ffd9d6', accent2: '#2f6bd8' } },
  { name: 'magenta', label: '洋红',   vars: { accent: '#e6399f', accentSoft: '#fbd8ee', accent2: '#7ed0ff' } },
  { name: 'coffee',  label: '咖啡',   vars: { accent: '#8d6748', accentSoft: '#eadfd2', accent2: '#ffe135' } },
]

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

document.title = SITE_NAME
var _metaDesc = document.querySelector('meta[name="description"]')
if (_metaDesc && SITE_DESCRIPTION) _metaDesc.setAttribute('content', SITE_DESCRIPTION)
