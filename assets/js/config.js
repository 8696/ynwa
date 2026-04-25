/* ============================================================
   config.js — 全站可调常量（先于其他 js 加载）
   ============================================================ */

/** 站点显示名：顶栏 Logo 文案、各页 `document.title` 后缀等 */
const SITE_NAME = 'YNWA';

/** data/db.json 的相对路径（所有页面从站点根目录出发） */
const DB_URL = './data/db.json';

/** 列表每页文章条数 */
const PAGE_SIZE = 10;

/** localStorage 中缓存 db 数据与时间戳的 key */
const CACHE_KEY = 'DA_CACHE_KEY';
const CACHE_TS_KEY = 'DA_CACHE_TS_KEY';

/** 缓存有效期（毫秒），改为 0 则几乎每次都会重新请求 */
const CACHE_TTL_MS = 3600 * 1000;

/**
 * 与顶栏、各页 `document.title` 共用。`SITE_NAME` 为空时回退为 YNWA。
 */
function getSiteName() {
  return SITE_NAME;
}

/**
 * 各页在根元素上标 `data-pm-title`（home | category | tag | post | search），
 * 在 `config.js` 加载后设首屏 `document.title`，与 `SITE_NAME` 一致，避免在各 HTML 里写内联。
 */
function setInitialDocumentTitle() {
  const page = document.documentElement.getAttribute('data-pm-title');
  if (!page) return;
  const s = getSiteName();
  if (page === 'home') document.title = s;
  else if (page === 'category') document.title = '分类 · ' + s;
  else if (page === 'tag') document.title = '标签 · ' + s;
  else if (page === 'post') document.title = '文章 · ' + s;
  else if (page === 'search') document.title = '搜索 · ' + s;
}

setInitialDocumentTitle();
