/* ============================================================
   db.js — 加载 data/db.json、localStorage 缓存
   依赖：config.js（DB_URL, CACHE_*, CACHE_TTL_MS）
   ============================================================ */

let _db = null;

/**
 * 加载并缓存 db.json；命中 localStorage 且未过期则不发请求。
 * 返回对象中 posts 已按 date 降序。
 */
async function loadDB() {
  if (_db) return _db;
  const hostname = window.location.hostname;
  const forceFresh = hostname === 'localhost' || hostname === '127.0.0.1';

  if (!forceFresh) {
    try {
      const ts = parseInt(localStorage.getItem(CACHE_TS_KEY) || '0', 10);
      const now = Date.now();
      if (ts && now - ts < CACHE_TTL_MS) {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          _db = JSON.parse(raw);
          console.log('[DB] 命中缓存，剩余有效期', Math.round((CACHE_TTL_MS - (now - ts)) / 1000), 's');
          return _db;
        }
      } else if (ts) {
        console.log('[DB] 缓存已过期，重新请求');
      }
    } catch (e) {
      console.log('[DB] localStorage 读取失败，降级为网络请求', e);
    }
  } else {
    console.log('[DB] 本地开发环境，跳过缓存强制拉取最新');
  }

  const res = await fetch(DB_URL+ '?_=' + new Date().getTime());
  _db = await res.json();
  _db.posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(_db));
    localStorage.setItem(CACHE_TS_KEY, String(Date.now()));
    console.log('[DB] 已写入缓存，有效期', CACHE_TTL_MS / 1000, 's');
  } catch (e) {
    console.log('[DB] localStorage 写入失败（可能已满）', e);
  }

  return _db;
}

/** 清缓存后下次 loadDB 会重新拉取。控制台可执行 clearDBCache() */
function clearDBCache() {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_TS_KEY);
  _db = null;
  console.info('[DB] 缓存已清除');
}
