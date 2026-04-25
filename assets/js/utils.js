/* ============================================================
   utils.js — URL/日期/分类标签名等小工具
   依赖：无（不依赖 config / db）
   ============================================================ */

/**
 * 从当前 URL 查询串读取参数。
 * 例：?page=2&id=tech → getParam('id') 为 'tech'
 */
function getParam(key) {
  return new URLSearchParams(location.search).get(key);
}

/**
 * 将日期字符串格式化为中文展示（如 2026年4月20日）
 */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** 按分类 id 取显示名，找不到则返回 id */
function getCategoryName(db, id) {
  const cat = db.categories.find(c => c.id === id);
  return cat ? cat.name : id;
}

/**
 * post.category 支持字符串或数组，统一返回 { id, name }[] 列表
 */
function getCategoryList(db, category) {
  const ids = Array.isArray(category) ? category : (category ? [category] : []);
  return ids.map(id => {
    const cat = db.categories.find(c => c.id === id);
    return { id, name: cat ? cat.name : id };
  });
}

/** 将标签 id 列表转为显示名列表 */
function getTagNames(db, ids) {
  return ids.map(id => {
    const t = db.tags.find(t => t.id === id);
    return t ? t.name : id;
  });
}

/**
 * 标签 id 列表 → 可点击的 HTML 片段（跳转 tag.html）
 */
function renderTagLinks(tagIds, db) {
  const cls =
    'cursor-pointer text-[12px] font-normal text-[#aeaeb2] px-0.5 py-0 ' +
    'no-underline hover:text-[#8e8e93] transition-colors duration-150';
  return (tagIds || []).map(tagId => {
    const t = db.tags.find(x => x.id === tagId);
    const label = t ? t.name : tagId;
    return `<a href="tag.html?id=${encodeURIComponent(tagId)}" class="${cls}">${label}</a>`;
  }).join('');
}
