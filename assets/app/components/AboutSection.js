/**
 * 「屏幕之外的我」。文案来自 SITE_AUTHOR / SITE_CITY / SITE_ROLE / SITE_ABOUT_*。
 */
function AboutSection() {
  var tags = (Array.isArray(SITE_ABOUT_TAGS) ? SITE_ABOUT_TAGS : []).map(function (tag) {
    // 兼容旧数据：条目可能是字符串，也可能是 { name, desc }
    if (tag && typeof tag === 'object') {
      return { name: tag.name, desc: tag.desc || '' }
    }
    return { name: String(tag), desc: '' }
  }).filter(function (tag) { return tag.name })
  var why = Array.isArray(SITE_ABOUT_WHY) ? SITE_ABOUT_WHY : SITE_ABOUT_WHY ? [SITE_ABOUT_WHY] : []
  var bio = Array.isArray(SITE_ABOUT_BIO) ? SITE_ABOUT_BIO : SITE_ABOUT_BIO ? [SITE_ABOUT_BIO] : []
  var hereTitle = SITE_ABOUT_HERE_TITLE || '这个站干什么'
  // 名字、介绍、由来全空则整段不出现，避免空白锚点区
  if (!SITE_AUTHOR && !bio.length && !why.length) return null

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="about-head">
          <span className="eyebrow">About · 关于</span>
          <h2 id="about-title" className="section-title">屏幕之外的我</h2>
          {SITE_ABOUT_LEDE ? <p className="about-lede">{SITE_ABOUT_LEDE}</p> : null}
        </div>
        <div className="about-grid">
          <div className="about-portrait">
            <div className="about-portrait-dots" aria-hidden="true"></div>
            <div className="about-portrait-body">
              {SITE_AUTHOR ? <h3>{SITE_AUTHOR}</h3> : null}
              {SITE_ROLE ? <p className="about-role">{SITE_ROLE}</p> : null}
              {SITE_CITY ? <p className="about-city">{SITE_CITY}</p> : null}
              {tags.length ? (
                <ul className="about-facts">
                  {tags.map(function (tag) {
                    return (
                      <li key={tag.name}>
                        <div>
                          <span className="about-fact-name">{tag.name}</span>
                          {tag.desc ? <p className="about-fact-desc">{tag.desc}</p> : null}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="about-text">
            {why.length ? (
              <div className="about-block">
                <h3>为什么叫「{SITE_NAME}」？</h3>
                {why.map(function (p, i) {
                  return <p key={i}>{p}</p>
                })}
              </div>
            ) : null}
            {bio.length ? (
              <div className="about-block">
                <h3>{hereTitle}</h3>
                {bio.map(function (p, i) {
                  return <p key={i}>{p}</p>
                })}
              </div>
            ) : null}
            {tags.length ? (
              <div className="about-tags">
                {tags.map(function (tag) {
                  return <span key={tag.name} className="chip chip--static">{tag.name}</span>
                })}
              </div>
            ) : null}
            <p className="about-sign">
              想聊技术、足球，或随便什么——
              <a href="#contact">往下留个言</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
