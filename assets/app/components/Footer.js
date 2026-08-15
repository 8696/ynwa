/** 页脚版权年份用「起始年–今年」，避免每年改常量 */
function Footer() {
  var y = new Date().getFullYear()
  // GitHub 地址只维护在 db.nav，页脚和联系区共用 getGithubNav，避免两份 URL 漂移
  var github = getGithubNav(useDB().db)
  return (
    <footer className="site-footer">
      <div className="site-footer-brand-line">
        <span className="site-footer-brand">
          {SITE_NAME}{SITE_SLOGAN ? ' · ' + SITE_SLOGAN : ''}
        </span>
      </div>
      <p className="site-footer-copy">
        © {FOOTER_COPYRIGHT_START}–{y} ·{' '}
        <a href={FOOTER_ICP_LINK} target="_blank" rel="noopener noreferrer">
          {FOOTER_ICP}
        </a>
      </p>
      {github ? (
        <p className="site-footer-links">
          <a href={github.value} target="_blank" rel="noopener noreferrer">
            {github.label || 'GitHub'} ↗
          </a>
        </p>
      ) : null}
    </footer>
  )
}
