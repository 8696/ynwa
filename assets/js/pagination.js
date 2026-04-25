/* ============================================================
   pagination.js — 本地分页与分页条 DOM
   依赖：无
   ============================================================ */

/**
 * 对列表切片分页。
 * @returns {{ items, current, totalPages, total }}
 */
function paginate(items, page, size) {
  const total = items.length;
  const totalPages = Math.ceil(total / size) || 1;
  const current = Math.max(1, Math.min(page, totalPages));
  const start = (current - 1) * size;
  return { items: items.slice(start, start + size), current, totalPages, total };
}

/**
 * 在 container 内渲染分页导航；仅一页时清空容器。
 * @param {function(number): string} buildUrl 页码 → href
 */
function renderPager(container, current, totalPages, buildUrl) {
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  const itemBase = 'cursor-pointer inline-flex items-center justify-center h-8 px-2 text-[14px] font-normal text-[#8e8e93] no-underline transition-colors duration-150';
  const itemHover = 'hover:text-[#1c1c1e]';

  let html = '<nav class="flex items-center justify-start gap-2 py-10">';

  if (current > 1) {
    html += `<a class="${itemBase} pl-0 ${itemHover}" href="${buildUrl(current - 1)}">← 上一页</a>`;
  } else {
    html += `<span class="${itemBase} pl-0 opacity-35 pointer-events-none">← 上一页</span>`;
  }

  buildPageRange(current, totalPages).forEach(n => {
    if (n === '...') {
      html += `<span class="text-[14px] text-[#aeaeb2] px-1">…</span>`;
    } else {
      const active = n === current
        ? 'text-[#1c1c1e] font-medium border-b border-[#c7c7cc]'
        : `${itemHover}`;
      html += `<a class="${itemBase} ${active}" href="${buildUrl(n)}">${n}</a>`;
    }
  });

  if (current < totalPages) {
    html += `<a class="${itemBase} ${itemHover}" href="${buildUrl(current + 1)}">下一页 →</a>`;
  } else {
    html += `<span class="${itemBase} opacity-35 pointer-events-none">下一页 →</span>`;
  }

  html += '</nav>';
  container.innerHTML = html;
}

/** 页码列表，总页数大时在中间用省略号压缩 */
function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [1];
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}
