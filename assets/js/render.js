/* ============================================================
   render.js — 顶部分类导航、页脚、文章卡片
   依赖：config.js、utils.js、db.js
   ============================================================ */

/** 页脚挂载点 id，各页面放置空 <footer id="site-footer"></footer> */
const FOOTER_MOUNT_ID = 'site-footer';

const FOOTER_CLASS = 'border-t border-[#e5e5ea] py-8 text-center text-[13px] font-normal text-[#8e8e93]';

/** 版权区间起始年（与当前年组成 © 2020–2026） */
const FOOTER_COPYRIGHT_START = 2020;

const FOOTER_ICP = '粤ICP备17039322号-3';
const FOOTER_ICP_LINK = 'https://beian.miit.gov.cn';

/**
 * 渲染全站统一样式页脚：© 起始年–当前年 | 备案号
 * 需在 DOM 已存在 #site-footer 后调用（通常放在各页脚本开头）
 */
function renderFooter() {
  const el = document.getElementById(FOOTER_MOUNT_ID);
  if (!el) return;
  el.className = FOOTER_CLASS;
  const y = new Date().getFullYear();
  el.innerHTML = `© ${FOOTER_COPYRIGHT_START}–${y} &nbsp;|&nbsp; <a href="${FOOTER_ICP_LINK}" target="_blank" rel="noopener noreferrer" class="no-underline text-inherit hover:opacity-70 transition-opacity duration-150">${FOOTER_ICP}</a>`;
}

/**
 * 将顶栏站点名称写入所有 `.site-title` 元素。名称见 `getSiteName()`（config.js）
 */
function applySiteName() {
  const name = getSiteName();
  document.querySelectorAll('.site-title').forEach(el => {
    el.textContent = name;
  });
}

/**
 * 单条文章 → 列表卡片 HTML
 */
function renderPostCard(post, db) {
  const catList = getCategoryList(db, post.categories);
  const catsHtml = catList.map(c =>
    `<a href="category.html?id=${encodeURIComponent(c.id)}"
        class="cursor-pointer text-[12px] font-medium text-[#636366] px-2 py-0.5 bg-[#f2f2f7] rounded-full hover:bg-[#e5e5ea] no-underline transition-colors duration-150">
      ${c.name}
    </a>`
  ).join('');
  const dateStr = formatDate(post.date);
  const tagsHtml = renderTagLinks(post.tags, db);
  const cover = typeof post.cover === 'string' ? post.cover.trim() : '';
  const coverHtml = cover
    ? `
      <a href="article.html?id=${post.id}" class="block w-[180px] h-[108px] shrink-0 rounded-xl overflow-hidden bg-[#f2f2f7]">
        <img src="${cover}" alt="${post.title}" loading="lazy" class="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-200">
      </a>`
    : '';
  const contentClass = cover ? 'min-w-0 flex-1' : '';
  const cardBodyClass = cover ? 'flex items-start gap-5' : '';

  return `
    <article class="py-9 border-b border-[#f2f2f7] first:pt-0">
      <div class="${cardBodyClass}">
        <div class="${contentClass}">
          <h2 class="text-[22px] font-semibold tracking-[-0.02em] leading-tight mb-3">
            <a href="article.html?id=${post.id}" class="cursor-pointer text-[#1c1c1e] no-underline hover:opacity-70 transition-opacity duration-150">${post.title}</a>
          </h2>
          <p class="text-[#8e8e93] text-[15px] font-normal leading-relaxed mb-5 overflow-hidden"
             style="-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box">${post.summary}</p>
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
            <time class="text-[13px] font-normal text-[#8e8e93] whitespace-nowrap">${dateStr}</time>
            ${catsHtml}
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">${tagsHtml}</div>
          </div>
        </div>
        ${coverHtml}
      </div>
      <div class="flex items-center justify-end gap-4">
        <a href="article.html?id=${post.id}"
           class="cursor-pointer text-[14px] font-normal text-[#aeaeb2] no-underline whitespace-nowrap shrink-0 hover:text-[#8e8e93] transition-colors duration-150">
          阅读全文 →
        </a>
      </div>
    </article>`;
}

/**
 * 按 db.nav 配置渲染顶部导航。
 * activeNav 形如：{ type: 'category'|'tag'|'link'|'home', value?: string }
 */
async function renderNav(activeNav = { type: 'home' }) {
  const db = await loadDB();
  applySiteName();
  const nav = document.getElementById('nav-categories');
  if (!nav) return;

  // 顶栏：未选中为细字 + 灰，选中为 semibold + 主色下划线
  const linkBase =
    'inline-flex cursor-pointer items-center whitespace-nowrap text-[15px] font-normal ' +
    'text-[#8e8e93] tracking-tight px-3.5 no-underline ' +
    'transition-colors duration-200 ' +
    'hover:text-[#636366]';
  const linkActive =
    'inline-flex cursor-pointer items-center whitespace-nowrap text-[15px] font-semibold ' +
    'text-[#1c1c1e] tracking-tight px-3.5 no-underline';

  const isHomeActive = !activeNav || activeNav.type === 'home';
  let html = `<a class="${isHomeActive ? linkActive : linkBase}" href="index.html">首页</a>`;

  const navItems = Array.isArray(db.nav) ? db.nav : [];
  navItems.forEach(item => {
    if (!item || !item.type || !item.label) return;

    let href = '#';
    let targetAttr = '';
    let relAttr = '';
    let isActive = false;

    const itemValue = item.value ?? '';

    if (item.type === 'category') {
      href = `category.html?id=${encodeURIComponent(itemValue)}`;
      isActive = activeNav?.type === 'category' && activeNav?.value === itemValue;
    } else if (item.type === 'tag') {
      href = `tag.html?id=${encodeURIComponent(itemValue)}`;
      isActive = activeNav?.type === 'tag' && activeNav?.value === itemValue;
    } else if (item.type === 'link') {
      href = itemValue || '#';
      if (item.target === '_blank') {
        targetAttr = ' target="_blank"';
        relAttr = ' rel="noopener noreferrer"';
      }
      isActive = activeNav?.type === 'link' && activeNav?.value === itemValue;
    } else {
      return;
    }

    html += `<a class="${isActive ? linkActive : linkBase}" href="${href}"${targetAttr}${relAttr}>${item.label}</a>`;
  });
  const searchIcon = `
    <svg aria-hidden="true" viewBox="0 0 24 24" class="w-[16px] h-[16px]" fill="none" stroke="currentColor" stroke-width="1.75">
      <circle cx="11" cy="11" r="7"></circle>
      <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
    </svg>`;
  html += `<a class="${linkBase} ml-auto" href="search.html" aria-label="搜索" title="搜索">${searchIcon}</a>`;
  nav.innerHTML = html;
}
