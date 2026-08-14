/**
 * 全站 db.json 的 React Context。
 * 默认 loadDB 直接 reject，用于在未包 DBProvider 时尽早暴露接入错误。
 */
var DBContext = React.createContext({
  db: null,
  loadDB: function () {
    return Promise.reject(new Error('DBContext: missing DBProvider'))
  },
})

/** 仅当查询参数值为字面量 "1" 时视为要禁用缓存，避免 nocache=true 等误伤 */
function isCacheDisableParamValue(raw) {
  return raw && String(raw).trim() === '1'
}

/** 读取本地「永久禁用缓存」标记；隐私模式等读失败时当作未禁用，回退网络请求 */
function isCacheDisabledLocally() {
  try {
    return localStorage.getItem(CACHE_DISABLED_KEY) === '1'
  } catch (e) {
    return false
  }
}

/**
 * URL 带有效 nocache 参数时：写入永久禁用标识，并清掉已有 db 缓存。
 * 无该参数则只返回本地是否已禁用。写存储失败时仍返回 true，保证本次会话不走缓存。
 */
function applyCacheDisableFromUrl() {
  var params = new URLSearchParams(window.location.search)
  if (!isCacheDisableParamValue(params.get(CACHE_DISABLE_PARAM))) {
    return isCacheDisabledLocally()
  }

  try {
    localStorage.setItem(CACHE_DISABLED_KEY, '1')
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(CACHE_TS_KEY)
  } catch (e) {
    // localStorage 不可用时仍按本次会话禁用缓存
  }
  return true
}

/**
 * 从 /assets/data/db.json 加载全站数据，并按环境使用 localStorage：
 * - localhost / 127.0.0.1：始终拉最新，避免开发时被旧缓存卡住
 * - ?nocache=1 或本地已有禁用标识：永久跳过读写缓存
 * - 生产：TTL 内优先读缓存，过期或解析失败再请求
 */
function DBProvider(props) {
  var _useState = React.useState(null)
  var db = _useState[0]
  var setDb = _useState[1]
  /** 加载失败原因；成功或新一轮尝试中为 null。页面据此把「加载中」换成错误 + 重试 */
  var _errState = React.useState(null)
  var dbError = _errState[0]
  var setDbError = _errState[1]
  /** 重试计数：bump 后重建 loadDB，让下方 effect 重新走一次完整加载 */
  var _retryState = React.useState(0)
  var retryCount = _retryState[0]
  var setRetryCount = _retryState[1]
  /**
   * 进行中的 fetch Promise。
   * StrictMode 双调用、多组件同时 useDB 时复用同一请求，避免打两次 db.json。
   */
  var inflightRef = React.useRef(null)

  var loadDB = React.useCallback(function () {
    if (db) return Promise.resolve(db)
    if (inflightRef.current) return inflightRef.current
    // 新一轮尝试先清掉上次的错误，避免旧文案盖住本次状态
    setDbError(null)

    var p = (function () {
      var hostname = window.location.hostname
      var cacheDisabled = applyCacheDisableFromUrl()
      var forceFresh =
        cacheDisabled || hostname === 'localhost' || hostname === '127.0.0.1'

      if (!forceFresh) {
        try {
          var ts = parseInt(localStorage.getItem(CACHE_TS_KEY) || '0', 10)
          var now = Date.now()
          if (ts && now - ts < CACHE_TTL_MS) {
            var raw = localStorage.getItem(CACHE_KEY)
            if (raw) {
              var cached = JSON.parse(raw)
              setDb(cached)
              return Promise.resolve(cached)
            }
          }
        } catch (e) {
          // 缓存损坏或 JSON 不合法时放弃缓存，走网络
        }
      }

      // 追加时间戳，降低中间层/浏览器把 db.json 当成长期静态文件的概率
      return fetch(DB_URL + '?_=' + Date.now()).then(function (res) {
        if (!res.ok) throw new Error('DB load failed: HTTP ' + res.status)
        return res.json()
      }).then(function (data) {
        // 列表页默认按发布日倒序；写回内存后再决定是否落盘
        data.articles.sort(function (a, b) {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

        if (!cacheDisabled) {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data))
            localStorage.setItem(CACHE_TS_KEY, String(Date.now()))
          } catch (e) {
            // 配额满时忽略，页面仍可用刚拉取的 data
          }
        }

        setDb(data)
        return data
      })
    })()

    inflightRef.current = p
    return p.then(function (data) {
      inflightRef.current = null
      return data
    }, function (err) {
      inflightRef.current = null
      // 失败原因必须进 state：没有它，断网时所有页面只会永远停在「加载中」
      setDbError(err && err.message ? err.message : String(err))
      throw err
    })
  }, [db, retryCount])

  /** 手动重试入口：bump 计数器 → loadDB 重建 → effect 重新执行一次完整加载 */
  var retryDB = React.useCallback(function () {
    setRetryCount(function (n) { return n + 1 })
  }, [])

  React.useEffect(function () {
    // 失败已记入 state；这里吞掉 rejection，避免每次加载失败都抛 unhandled rejection
    loadDB().catch(function () {})
  }, [loadDB])

  return (
    <DBContext.Provider value={{ db: db, loadDB: loadDB, error: dbError, retryDB: retryDB }}>
      {props.children}
    </DBContext.Provider>
  )
}

/** 读取全局 db；须在 DBProvider 子树内调用 */
function useDB() {
  return React.useContext(DBContext)
}
