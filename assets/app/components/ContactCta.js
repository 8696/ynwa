/**
 * 全站联系区。邮箱来自 SITE_EMAIL，GitHub 复用 db.nav 里已有的外链，避免写两份地址。
 */
function ContactCta() {
  var github = getGithubNav(useDB().db)
  // 邮箱和 GitHub 都没有就整段不渲染，避免空 CTA
  if (!SITE_EMAIL && !github) return null

  return (
    <section className="cta" id="contact" aria-labelledby="cta-title">
      <svg className="cta-deco cta-deco-mail" width="90" height="66" viewBox="0 0 90 66" aria-hidden="true">
        <rect x="2" y="2" width="86" height="62" fill="#FFE135" stroke="#000" strokeWidth="4"></rect>
        <path d="M2 2 L45 36 L88 2" fill="none" stroke="#000" strokeWidth="4"></path>
      </svg>
      <svg className="cta-deco cta-deco-circle" width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r="36" fill="#ffffff" stroke="#000" strokeWidth="4"></circle>
        <circle cx="40" cy="40" r="18" fill="#FFE135" stroke="#000" strokeWidth="4"></circle>
      </svg>
      <div className="wrap cta-inner">
        <span className="eyebrow">Contact · 联系</span>
        <h2 id="cta-title" className="section-title section-title--display">有想法？<br />来聊聊。</h2>
        <p className="cta-lede">不管是文章讨论、合作，还是单纯想交流——邮件最快。</p>
        <div className="cta-actions">
          {SITE_EMAIL ? (
            <a className="btn btn-ink" href={'mailto:' + SITE_EMAIL}>✉ {SITE_EMAIL}</a>
          ) : null}
          {github ? (
            <a
              className="btn btn-ghost"
              href={github.value}
              target="_blank"
              rel="noopener noreferrer"
            >
              {github.label || 'GitHub'} ↗
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
