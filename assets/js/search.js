/* ============================================================
  search.js — 在 db.articles 的 title / summary 字段中搜索，以文章为单位展示结果
   依赖：无（在页面中于 utils 之后、render 之后加载）
   ============================================================ */

const SEARCH_MAX_RESULTS = 50;

/**
 * 转义用于 HTML 文本节点展示
 */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * 将匹配片段用 <mark> 标出（仅首处，不区分大小写）
 */
function highlightOne(text, q) {
  if (!q || !text) return escapeHtml(text);
  const t = String(text);
  const idx = t.toLowerCase().indexOf(q.trim().toLowerCase());
  if (idx < 0) return escapeHtml(t);
  const before = escapeHtml(t.slice(0, idx));
  const mid = escapeHtml(t.slice(idx, idx + q.trim().length));
  const after = escapeHtml(t.slice(idx + q.trim().length));
  return `${before}<mark class="bg-amber-100 text-[#1c1c1e] rounded px-0.5">${mid}</mark>${after}`;
}

/**
 * 在 articles 的 title / summary 中搜索，返回匹配的文章数组
 * 每篇文章只出现一次，附带 matchedField 标记首个命中字段
 */
function searchDatabaseAllFields(db, query) {
  const q = (query || '').trim();
  if (!q) return [];
  const articles = db && Array.isArray(db.articles) ? db.articles : [];
  const qLower = q.toLowerCase();
  const results = [];
  for (const post of articles) {
    if (!post) continue;
    const inTitle = post.title && String(post.title).toLowerCase().includes(qLower);
    const inSummary = post.summary && String(post.summary).toLowerCase().includes(qLower);
    if (inTitle || inSummary) {
      results.push({ post, matchedField: inTitle ? 'title' : 'summary' });
    }
  }
  return results;
}

/**
 * 渲染单条搜索结果 HTML（与 renderPostCard 保持一致的视觉样式）
 */
function renderSearchResultRow(item, query, db) {
  const { post } = item;
  const href = `article.html?id=${encodeURIComponent(post.id)}`;
  const newWindowAttrs = 'target="_blank" rel="noopener noreferrer"';
  const titleHtml = highlightOne(post.title || '', query);
  const summaryHtml = post.summary
    ? `<p class="text-[#8e8e93] text-[15px] font-normal leading-relaxed mb-5 overflow-hidden"
         style="-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box">${highlightOne(post.summary, query)}</p>`
    : '';

  const catList = getCategoryList(db, post.categories);
  const catsHtml = catList.map(c =>
    `<a href="category.html?id=${encodeURIComponent(c.id)}" ${newWindowAttrs}
        class="cursor-pointer text-[12px] font-medium text-[#636366] px-2 py-0.5 bg-[#f2f2f7] rounded-full hover:bg-[#e5e5ea] no-underline transition-colors duration-150">
      ${c.name}
    </a>`
  ).join('');
  const dateStr = formatDate(post.date);
  const tagsHtml = renderTagLinks(post.tags, db).replace(/<a /g, `<a ${newWindowAttrs} `);
  const cover = typeof post.cover === 'string' ? post.cover.trim() : '';
  const coverHtml = cover
    ? `<a href="${href}" ${newWindowAttrs} class="block w-[180px] h-[108px] shrink-0 rounded-xl overflow-hidden bg-[#f2f2f7]">
        <img src="${cover}" alt="${escapeHtml(post.title || '')}" loading="lazy" class="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-200">
       </a>`
    : '';
  const cardBodyClass = cover ? 'flex items-start gap-5' : '';
  const contentClass = cover ? 'min-w-0 flex-1' : '';

  return `
    <article class="py-9 border-b border-[#f2f2f7] first:pt-0">
      <div class="${cardBodyClass}">
        <div class="${contentClass}">
          <h2 class="text-[22px] font-semibold tracking-[-0.02em] leading-tight mb-3">
            <a href="${href}" ${newWindowAttrs} class="cursor-pointer text-[#1c1c1e] no-underline hover:opacity-70 transition-opacity duration-150">${titleHtml}</a>
          </h2>
          ${summaryHtml}
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
            <time class="text-[13px] font-normal text-[#8e8e93] whitespace-nowrap">${dateStr}</time>
            ${catsHtml}
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">${tagsHtml}</div>
          </div>
        </div>
        ${coverHtml}
      </div>
      <div class="flex items-center justify-end gap-4">
        <a href="${href}" ${newWindowAttrs} class="cursor-pointer text-[14px] font-normal text-[#aeaeb2] no-underline whitespace-nowrap shrink-0 hover:text-[#8e8e93] transition-colors duration-150">
          阅读全文 →
        </a>
      </div>
    </article>`;
}
