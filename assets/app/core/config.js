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
/** 首页 Hero 导语下的补充说明；空则不渲染。不进 meta */
var SITE_HERO_NOTE = '本站由 AI 生成。'
/** 本站源码仓库；Hero 说明里展示，空则不渲染该链接 */
var SITE_REPO_URL = 'https://github.com/8696/ynwa'
/** 联系邮箱，用于首页联系区和 mailto */
var SITE_EMAIL = 'y201899@gmail.com'
/** 关于区：名字、城市、身份、文案。全空则不渲染该区块 */
var SITE_AUTHOR = '啊龙'
var SITE_CITY = '深圳'
/** 名字下方一句身份，可空 */
var SITE_ROLE = '写代码的人'
/** 区块大标题下的导语，可空 */
var SITE_ABOUT_LEDE = '人在深圳。白天对着屏幕把事情做完，晚上看盘或出门跑两圈。咖啡负责续命，一首安菲尔德的歌负责提醒：别一个人硬扛。'
/** 关于区右侧「为什么叫 YNWA」正文，可多段 */
var SITE_ABOUT_WHY = [
  '因为喜欢利物浦。YNWA 是队歌 You\'ll Never Walk Alone。安菲尔德唱起来的时候，意思很简单——你不会一个人走。比分会变，人还在；跌倒了站起来，身边总有人。',
  '这就是我理解的足球精神。写代码也一样：需求会改、线上会炸、行情会抽风，但总有办法接着走。这个站名不是装饰，是我给自己立的规矩。',
  '日子过得碎，足球、代码、盘面、跑步，看起来不挨着。但它们教同一件事：别把情绪交给比分，也别把清醒外包给别人。',
]
/** 「这个站」小标题；空则用默认「这个站干什么」 */
var SITE_ABOUT_HERE_TITLE = '这个站干什么'
/** 关于区介绍，可字符串或段落数组 */
var SITE_ABOUT_BIO = [
  '这个站不是作品集，也不是简历。是一个能搜到的笔记本：技术笔记、踩过的坑，以及和代码无关但还想留下的念头。做过的事如果不写下来，过几个月就像没发生过。',
  '我尽量把标题和摘要写清楚。以后的自己找得到，路过的人也能扫一眼决定要不要往下读。写短一点没关系，写假话才没意思。',
  '屏幕之内是工程；屏幕之外是咖啡、路面和周末的一场球。两边我都不想装成只有一面。',
]
/** 关于区左侧条目：name 为标签，desc 为一句说明 */
var SITE_ABOUT_TAGS = [
  { name: '咖啡', desc: '续命。很多清醒的早晨，是从一杯开始的。' },
  { name: '股市', desc: '图的不是一夜暴富，是练习：涨不昏，跌不慌，不把情绪交给行情。' },
  { name: '跑步', desc: '出门跑两圈，把噪音跑掉。路况比盘面稳。' },
  { name: '足球', desc: '利物浦。队歌听过就忘不掉：跌倒了，还一起走。' },
  { name: '脑洞', desc: '用不上的想法也得有地方放，不然它们会在不该出现的时候冒出来。' },
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

/** 全站元数据 JSON；须与静态目录 assets/app/db.json 一致 */
var DB_URL = '/assets/app/db.json'
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

// 首屏先用站点名；进文章/分类后再由对应页面改 document.title。meta 与 index.html 占位保持一致。
document.title = SITE_NAME
var _metaDesc = document.querySelector('meta[name="description"]')
if (_metaDesc && SITE_DESCRIPTION) _metaDesc.setAttribute('content', SITE_DESCRIPTION)
