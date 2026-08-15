/** 作品卡配色；相邻卡不会抽到同一色。tone 吃主题变量，随 [data-theme] 一起换装 */
var WORKS_TONES = ['accent', 'white', 'accent-soft', 'ink', 'accent-2']

/**
 * 为 n 张卡抽一版外观：色、条纹、编号。固定两列瀑布流，高度由内容决定。
 * 相邻不同色。
 */
function buildWorksLooks(count) {
  var looks = []
  var prevTone = ''

  for (var i = 0; i < count; i++) {
    // 从「上一张以外」的色里抽，避免两列里上下/左右撞成同一块
    var pool = WORKS_TONES.filter(function (t) { return t !== prevTone })
    var tone = pool[Math.floor(Math.random() * pool.length)]
    prevTone = tone
    looks.push({
      tone: tone,
      stripe: Math.random() < 0.32,
      showNum: i !== count - 1 && Math.random() < 0.6,
      numLeft: Math.random() < 0.45,
    })
  }
  return looks
}
