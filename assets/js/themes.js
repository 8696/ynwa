/**
 * 全站强调色。须在 style.css 之前以经典脚本加载，把变量写到 <html>，
 * 避免首屏先画出 :root 默认黄。浅强调色配 ink，深强调色配 paper。改色/加组只动这张表。
 * 选取规则：按「当天日期的天数 % 主题数」顺序轮换——同一天所有访客、所有刷新
 * 都是同一组（各看各的本地日历，不做时区换算），次日换下一组，11 组一轮永不连色。
 * SPA 的 Link 不重载文档，跨天停留的旧页要刷新后才换色。
 */
;(function () {
  var paper = '#f5f5f0'
  var ink = '#0a0a0a'
  var themes = [
    { name: 'yellow',  accent: '#ffe135', soft: '#fff8d6', accent2: '#ff5a47', onAccent: ink,   onAccent2: ink },
    { name: 'blue',    accent: '#2f6bd8', soft: '#dce9fb', accent2: '#ffe135', onAccent: paper, onAccent2: ink },
    { name: 'green',   accent: '#2ec27e', soft: '#d9f2e4', accent2: '#ffe135', onAccent: ink,   onAccent2: ink },
    { name: 'pink',    accent: '#ff7eb6', soft: '#ffdeee', accent2: '#2f6bd8', onAccent: ink,   onAccent2: paper },
    { name: 'purple',  accent: '#9b7ede', soft: '#e9e2fb', accent2: '#ffe135', onAccent: paper, onAccent2: ink },
    { name: 'orange',  accent: '#ff8a3d', soft: '#ffe5d3', accent2: '#2f6bd8', onAccent: ink,   onAccent2: paper },
    { name: 'cyan',    accent: '#00c2d1', soft: '#d2f4f7', accent2: '#ffe135', onAccent: ink,   onAccent2: ink },
    { name: 'lime',    accent: '#a8e10c', soft: '#effbd2', accent2: '#ff5a47', onAccent: ink,   onAccent2: ink },
    { name: 'red',     accent: '#c8102e', soft: '#f5d4d9', accent2: '#f6eb61', onAccent: paper, onAccent2: ink },
    { name: 'magenta', accent: '#e6399f', soft: '#fbd8ee', accent2: '#7ed0ff', onAccent: ink,   onAccent2: ink },
    { name: 'coffee',  accent: '#8d6748', soft: '#eadfd2', accent2: '#ffe135', onAccent: paper, onAccent2: ink }
  ]
  try {
    var day = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000)   // 本地今日零点 → 天数，本地日历翻页才换色
    var pick = themes[day % themes.length]
    if (!pick) return
    var root = document.documentElement
    root.setAttribute('data-theme', pick.name)
    root.style.setProperty('--accent', pick.accent)
    root.style.setProperty('--accent-soft', pick.soft)
    root.style.setProperty('--accent-2', pick.accent2)
    root.style.setProperty('--on-accent', pick.onAccent)
    root.style.setProperty('--on-accent-2', pick.onAccent2)
  } catch (e) { /* 失败则沿用 style.css :root 默认黄 */ }
})()
