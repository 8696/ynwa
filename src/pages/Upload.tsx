import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import OSS from 'ali-oss'
import type { DB, Article } from '../types'
import { normalizeArticleFilePath } from '../utils'

// ─── 常量 ────────────────────────────────────────────────────────────────────

const CONFIG_KEY = 'OSS_CONFIG'
const DB_API = '/data/db.json'

interface OSSConfig {
  accessKeyId: string
  accessKeySecret: string
  bucket: string
  region: string
  ossDir: string
}

type Step = 'config' | 'file' | 'meta' | 'db'

// ─── 工具 ────────────────────────────────────────────────────────────────────

function loadConfig(): Partial<OSSConfig> {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveConfig(cfg: OSSConfig) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg))
}

function clearConfig() {
  localStorage.removeItem(CONFIG_KEY)
}

function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 36; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

/**
 * 上传页「OSS 目标目录」：统一前导 /、无尾 /；空为默认 `/articles`；仅 `/` 表示 Bucket 根目录。
 */
function normalizeOssTargetDir(dir: string): string {
  const s = dir.trim().replace(/\/+/g, '/')
  if (!s) return '/articles'
  if (s === '/') return '/'
  const noTrail = s.replace(/\/$/, '')
  return noTrail.startsWith('/') ? noTrail : '/' + noTrail
}

/** 转为 OSS 对象键前缀（无首尾 /）；根目录返回 '' */
function ossTargetDirToKeyPrefix(normalizedDir: string): string {
  if (normalizedDir === '/') return ''
  return normalizedDir.replace(/^\/+|\/+$/g, '')
}

/** 与当前 bucket/region 对应的 OSS 公网根 URL（仅用于上传页封面预览，不写入 db.json） */
function ossPublicBase(cfg: { bucket: string; region: string }): string {
  const b = cfg.bucket?.trim()
  const r = cfg.region?.trim()
  if (!b || !r) return ''
  return `https://${b}.${r}.aliyuncs.com`
}

/** 预览用：路径会拼 OSS 域名；若以 http(s) 开头则原样用于预览 */
function coverToPreviewUrl(cover: string, cfg: { bucket: string; region: string }): string {
  const v = cover.trim()
  if (!v) return ''
  if (/^https?:\/\//i.test(v)) return v
  const base = ossPublicBase(cfg)
  if (!base) return v
  const path = v.replace(/^\/+/, '')
  return `${base}/${path}`
}

// ─── 子组件：输入框 ──────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  onBlur,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  onBlur?: () => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[13px] font-medium text-[#636366] tracking-wide">
        {label}
        {required && <span className="text-[#ff3b30] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className="px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-[15px] text-[#1c1c1e] outline-none focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/15 transition-all"
      />
    </div>
  )
}

// ─── 步骤条 ──────────────────────────────────────────────────────────────────

const STEPS: { key: Step; label: string }[] = [
  { key: 'config', label: 'OSS 配置' },
  { key: 'file', label: '上传文件' },
  { key: 'meta', label: '文章信息' },
  { key: 'db', label: '更新 db.json' },
]

function Stepper({ current }: { current: Step }) {
  const idx = STEPS.findIndex(s => s.key === current)
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-colors ${
                i < idx
                  ? 'bg-[#34c759] text-white'
                  : i === idx
                  ? 'bg-[#007aff] text-white'
                  : 'bg-[#f2f2f7] text-[#aeaeb2]'
              }`}
            >
              {i < idx ? '✓' : i + 1}
            </div>
            <span
              className={`mt-1 text-[11px] whitespace-nowrap ${
                i === idx ? 'text-[#007aff] font-medium' : 'text-[#aeaeb2]'
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-10 h-px mb-4 transition-colors ${i < idx ? 'bg-[#34c759]' : 'bg-[#e5e5ea]'}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── 主页面 ──────────────────────────────────────────────────────────────────

export default function Upload() {
  const [step, setStep] = useState<Step>('config')

  // OSS 配置
  const [config, setConfig] = useState<OSSConfig>(() => {
    const saved = loadConfig()
    return {
      accessKeyId: saved.accessKeyId || '',
      accessKeySecret: saved.accessKeySecret || '',
      bucket: saved.bucket || '',
      region: saved.region || 'oss-cn-hangzhou',
      ossDir: normalizeOssTargetDir(saved.ossDir ?? '/articles'),
    }
  })

  // 文件上传
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [ossKey, setOssKey] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [uploadError, setUploadError] = useState('')

  // 文章元数据
  const [db, setDb] = useState<DB | null>(null)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [cover, setCover] = useState('')

  // 封面图上传（预览 URL 由 cover + bucket/region 推导，db.json 仍只存路径）
  const coverFileRef = useRef<HTMLInputElement>(null)
  const [uploadingCover, setUploadingCover] = useState(false)
  const coverPreviewUrl = useMemo(
    () => coverToPreviewUrl(cover, config),
    [cover, config.bucket, config.region]
  )

  // db.json 输出
  const [newDbJson, setNewDbJson] = useState('')
  const [copied, setCopied] = useState(false)
  const [uploadingDb, setUploadingDb] = useState(false)
  const [uploadDbResult, setUploadDbResult] = useState<{ ok: boolean; msg: string } | null>(null)

  useEffect(() => {
    document.title = 'OSS 上传 · YNWA'
  }, [])

  // 加载 db.json
  const fetchDB = useCallback(async () => {
    try {
      const res = await fetch(`${DB_API}?_=${Date.now()}`)
      const data: DB = await res.json()
      setDb(data)
      return data
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    fetchDB()
  }, [fetchDB])

  // 当文件变化时自动填充 ossKey（OSS 对象键无前导 /）
  useEffect(() => {
    if (file) {
      const prefix = ossTargetDirToKeyPrefix(normalizeOssTargetDir(config.ossDir))
      setOssKey(prefix ? `${prefix}/${file.name}` : file.name)
      setTitle(file.name.replace(/\.md$/, ''))
    }
  }, [file, config.ossDir])

  // ── Step 1: 配置 ──────────────────────────────────────────────────────────

  function handleConfigNext() {
    if (!config.accessKeyId || !config.accessKeySecret || !config.bucket || !config.region) {
      alert('请填写完整的 OSS 认证信息')
      return
    }
    const ossDir = normalizeOssTargetDir(config.ossDir)
    const next = { ...config, ossDir }
    setConfig(next)
    saveConfig(next)
    setStep('file')
  }

  // ── Step 2: 上传 ──────────────────────────────────────────────────────────

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setUploadError('')
    setUploadProgress(0)

    try {
      const client = new OSS({
        region: config.region,
        accessKeyId: config.accessKeyId,
        accessKeySecret: config.accessKeySecret,
        bucket: config.bucket,
      })

      await client.multipartUpload(ossKey, file, {
        progress: (p: number) => setUploadProgress(Math.round(p * 100)),
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
      })

      setUploadedUrl(ossKey)
      setUploadProgress(100)
      setStep('meta')
    } catch (err: unknown) {
      setUploadError((err as Error).message || '上传失败')
    } finally {
      setUploading(false)
    }
  }

  // ── 封面图上传 ────────────────────────────────────────────────────────────

  async function handleCoverUpload(imgFile: File) {
    setUploadingCover(true)
    try {
      const ext = imgFile.name.split('.').pop() || 'jpg'
      const randomId = generateId()
      const coverKey = `cover/${randomId}.${ext}`

      const client = new OSS({
        region: config.region,
        accessKeyId: config.accessKeyId,
        accessKeySecret: config.accessKeySecret,
        bucket: config.bucket,
      })

      await client.put(coverKey, imgFile, {
        headers: { 'Content-Type': imgFile.type || 'image/jpeg' },
      })

      setCover('/' + coverKey)
    } catch (err: unknown) {
      alert('封面上传失败：' + ((err as Error).message || '未知错误'))
    } finally {
      setUploadingCover(false)
    }
  }

  // ── Step 3: 元数据 → 生成 db.json ─────────────────────────────────────────

  async function handleMetaNext() {
    if (!title.trim()) {
      alert('请填写文章标题')
      return
    }

    const currentDb = db || (await fetchDB())
    if (!currentDb) {
      alert('无法加载 db.json，请检查服务是否运行')
      return
    }

    if (currentDb.categories.length > 0 && selectedCats.length === 0) {
      alert('请至少选择一个分类')
      return
    }
    if (currentDb.tags.length > 0 && selectedTags.length === 0) {
      alert('请至少选择一个标签')
      return
    }

    const fileInDb = normalizeArticleFilePath(ossKey)
    const existing = currentDb.articles.find(
      a => normalizeArticleFilePath(a.file) === fileInDb
    )
    let newArticles: Article[]

    if (existing) {
      newArticles = currentDb.articles.map(a =>
        normalizeArticleFilePath(a.file) === fileInDb
          ? {
              ...a,
              title,
              summary,
              date,
              categories: selectedCats,
              tags: selectedTags,
              cover,
              file: fileInDb,
            }
          : a
      )
    } else {
      const newArticle: Article = {
        id: generateId(),
        title,
        summary,
        date,
        categories: selectedCats,
        tags: selectedTags,
        file: fileInDb,
        cover,
      }
      newArticles = [newArticle, ...currentDb.articles]
    }

    const updatedDb: DB = { ...currentDb, articles: newArticles }
    setNewDbJson(JSON.stringify(updatedDb, null, 2))
    setUploadDbResult(null)
    setStep('db')
  }

  // ── Step 4: 复制 db.json ──────────────────────────────────────────────────

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(newDbJson)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert('复制失败，请手动全选复制')
    }
  }

  async function handleUploadDb() {
    const content = newDbJson.trim()
    if (!content) {
      setUploadDbResult({ ok: false, msg: '内容为空，无法上传' })
      return
    }
    try {
      JSON.parse(content)
    } catch {
      setUploadDbResult({ ok: false, msg: '当前内容不是合法的 JSON，请先修正' })
      return
    }

    setUploadingDb(true)
    setUploadDbResult(null)
    try {
      const blob = new Blob([content], { type: 'application/json' })
      const dbFile = new File([blob], 'db.json', { type: 'application/json' })

      const client = new OSS({
        region: config.region,
        accessKeyId: config.accessKeyId,
        accessKeySecret: config.accessKeySecret,
        bucket: config.bucket,
      })

      // DB_URL 是 '/data/db.json'，去掉开头的 / 作为 OSS 对象键
      const dbOssKey = 'data/db.json'
      await client.put(dbOssKey, dbFile, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      })

      setUploadDbResult({ ok: true, msg: `oss://${config.bucket}/${dbOssKey}` })
    } catch (err: unknown) {
      setUploadDbResult({ ok: false, msg: (err as Error).message || '上传失败' })
    } finally {
      setUploadingDb(false)
    }
  }

  function handleDownloadDb() {
    const blob = new Blob([newDbJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'db.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleFinishClick() {
    if (uploadDbResult?.ok) {
      window.alert(
        'db.json 已成功上传到 OSS。\n\n' + uploadDbResult.msg
      )
      window.location.reload()
      return
    }
    if (uploadDbResult && !uploadDbResult.ok) {
      const go = window.confirm(
        'db.json 上传失败：' +
          uploadDbResult.msg +
          '\n\n仍要刷新页面吗？'
      )
      if (go) window.location.reload()
      return
    }
    const go = window.confirm(
      '尚未成功将 db.json 上传到 OSS（请先点击「上传 db.json 到 OSS」）。\n\n仍要刷新页面吗？'
    )
    if (go) window.location.reload()
  }

  // ─── 渲染 ─────────────────────────────────────────────────────────────────

  return (
    <main className="max-w-[784px] mx-auto px-8 flex-1 w-full pb-20">
      <div className="pt-12 pb-9 border-b border-[#e5e5ea] mb-9">
        <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#8e8e93] mb-2">
          工具
        </p>
        <h1 className="text-[40px] font-semibold tracking-[-0.03em] leading-[1.05]">
          OSS 上传
        </h1>
        <p className="mt-2 text-[17px] font-normal text-[#8e8e93] leading-relaxed">
          上传 Markdown 到阿里云 OSS，并生成更新后的 db.json
        </p>
      </div>

      <Stepper current={step} />

      {/* ── Step 1: OSS 配置 ── */}
      {step === 'config' && (
        <section className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Access Key ID"
              value={config.accessKeyId}
              onChange={v => setConfig(c => ({ ...c, accessKeyId: v }))}
              required
            />
            <Field
              label="Access Key Secret"
              value={config.accessKeySecret}
              onChange={v => setConfig(c => ({ ...c, accessKeySecret: v }))}
              type="password"
              required
            />
            <Field
              label="Bucket 名称"
              value={config.bucket}
              onChange={v => setConfig(c => ({ ...c, bucket: v }))}
              placeholder="my-bucket"
              required
            />
            <Field
              label="Region"
              value={config.region}
              onChange={v => setConfig(c => ({ ...c, region: v }))}
              placeholder="oss-cn-hangzhou"
              required
            />
            <Field
              label="OSS 目标目录"
              value={config.ossDir}
              onChange={v => setConfig(c => ({ ...c, ossDir: v }))}
              onBlur={() =>
                setConfig(c => ({ ...c, ossDir: normalizeOssTargetDir(c.ossDir) }))
              }
              placeholder="/articles/2026"
            />
          </div>

          <p className="text-[13px] text-[#8e8e93]">
            配置保存在当前浏览器中，下次打开页面无需重新填写。
          </p>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleConfigNext}
              className="px-5 py-2 rounded-lg bg-[#007aff] text-white text-[15px] font-medium hover:bg-[#0066d6] transition-colors"
            >
              下一步
            </button>
            <button
              onClick={() => {
                clearConfig()
                setConfig({
                  accessKeyId: '',
                  accessKeySecret: '',
                  bucket: '',
                  region: 'oss-cn-hangzhou',
                  ossDir: '/articles',
                })
              }}
              className="px-4 py-2 rounded-lg text-[#ff3b30] text-[14px] hover:bg-[#fff5f5] transition-colors"
            >
              清除配置
            </button>
          </div>
        </section>
      )}

      {/* ── Step 2: 文件上传 ── */}
      {step === 'file' && (
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[#636366] tracking-wide">
              选择 Markdown 文件<span className="text-[#ff3b30] ml-0.5">*</span>
            </label>
            <div
              className="relative border-2 border-dashed border-[#e5e5ea] rounded-xl p-10 text-center hover:border-[#007aff] transition-colors cursor-pointer"
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault()
                const f = e.dataTransfer.files[0]
                if (f?.name.endsWith('.md')) setFile(f)
                else alert('请选择 .md 文件')
              }}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".md"
                className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0]
                  if (f) setFile(f)
                }}
              />
              {file ? (
                <div>
                  <p className="text-[17px] font-medium text-[#1c1c1e]">{file.name}</p>
                  <p className="text-[13px] text-[#8e8e93] mt-1">
                    {(file.size / 1024).toFixed(1)} KB · 点击重新选择
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-[17px] text-[#8e8e93]">点击选择或拖放 .md 文件</p>
                </div>
              )}
            </div>
          </div>

          {file && (
            <Field
              label="OSS 对象键（路径）"
              value={ossKey}
              onChange={setOssKey}
              placeholder="articles/2026/my-post.md"
            />
          )}

          {uploadError && (
            <p className="text-[14px] text-[#ff3b30] bg-[#fff5f5] px-4 py-3 rounded-lg">
              {uploadError}
            </p>
          )}

          {uploading && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[13px] text-[#8e8e93]">
                <span>上传中…</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#f2f2f7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#007aff] rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-5 py-2 rounded-lg bg-[#007aff] text-white text-[15px] font-medium hover:bg-[#0066d6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? '上传中…' : '上传到 OSS'}
            </button>
            <button
              onClick={() => setStep('config')}
              className="px-4 py-2 rounded-lg text-[#8e8e93] text-[14px] hover:bg-[#f2f2f7] transition-colors"
            >
              上一步
            </button>
          </div>
        </section>
      )}

      {/* ── Step 3: 文章元数据 ── */}
      {step === 'meta' && (
        <section className="flex flex-col gap-5">
          {uploadedUrl && (
            <div className="bg-[#f2fff6] border border-[#34c759]/30 rounded-xl px-4 py-3">
              <p className="text-[13px] font-medium text-[#1c7a3a] mb-1">上传成功</p>
              <p className="text-[13px] text-[#636366] break-all font-mono">{uploadedUrl}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="文章标题" value={title} onChange={setTitle} required />
            </div>
            <div className="sm:col-span-2">
              <Field label="摘要（可选）" value={summary} onChange={setSummary} />
            </div>
            <Field label="日期" value={date} onChange={setDate} type="date" />
          </div>

          {/* 封面图 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#636366] tracking-wide">封面图（可选）</label>
            <div className="flex gap-3 items-start">
              {/* 点击上传区域 */}
              <div
                className="relative shrink-0 w-32 h-20 border-2 border-dashed border-[#e5e5ea] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#007aff] transition-colors overflow-hidden"
                onClick={() => coverFileRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault()
                  const f = e.dataTransfer.files[0]
                  if (f?.type.startsWith('image/')) handleCoverUpload(f)
                  else alert('请选择图片文件')
                }}
              >
                <input
                  ref={coverFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0]
                    if (f) handleCoverUpload(f)
                    e.target.value = ''
                  }}
                />
                {coverPreviewUrl ? (
                  <img src={coverPreviewUrl} alt="封面预览" className="w-full h-full object-cover" />
                ) : uploadingCover ? (
                  <span className="text-[12px] text-[#8e8e93]">上传中…</span>
                ) : (
                  <span className="text-[12px] text-[#aeaeb2] text-center px-2">点击或拖放图片</span>
                )}
                {uploadingCover && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                    <span className="text-[12px] text-[#007aff]">上传中…</span>
                  </div>
                )}
              </div>
              {/* 手动输入 URL */}
              <div className="flex-1 flex flex-col gap-1.5">
                <input
                  type="text"
                  value={cover}
                  onChange={e => setCover(e.target.value)}
                  placeholder="/cover/xxx.jpg 或完整 https URL"
                  className="px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-[15px] text-[#1c1c1e] outline-none focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/15 transition-all"
                />
                {cover && (
                  <button
                    onClick={() => setCover('')}
                    className="self-start text-[12px] text-[#ff3b30] hover:underline"
                  >
                    清除封面
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 分类多选 */}
          {db && db.categories.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#636366] tracking-wide">
                分类<span className="text-[#ff3b30] ml-0.5">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {db.categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setSelectedCats(prev =>
                        prev.includes(cat.id) ? prev.filter(c => c !== cat.id) : [...prev, cat.id]
                      )
                    }
                    className={`px-3 py-1 rounded-full text-[13px] font-medium border transition-colors ${
                      selectedCats.includes(cat.id)
                        ? 'bg-[#007aff] text-white border-[#007aff]'
                        : 'bg-white text-[#636366] border-[#e5e5ea] hover:border-[#007aff] hover:text-[#007aff]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 标签多选 */}
          {db && db.tags.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#636366] tracking-wide">
                标签<span className="text-[#ff3b30] ml-0.5">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {db.tags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() =>
                      setSelectedTags(prev =>
                        prev.includes(tag.id) ? prev.filter(t => t !== tag.id) : [...prev, tag.id]
                      )
                    }
                    className={`px-3 py-1 rounded-full text-[13px] font-medium border transition-colors ${
                      selectedTags.includes(tag.id)
                        ? 'bg-[#5856d6] text-white border-[#5856d6]'
                        : 'bg-white text-[#636366] border-[#e5e5ea] hover:border-[#5856d6] hover:text-[#5856d6]'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleMetaNext}
              className="px-5 py-2 rounded-lg bg-[#007aff] text-white text-[15px] font-medium hover:bg-[#0066d6] transition-colors"
            >
              生成 db.json
            </button>
            <button
              onClick={() => setStep('file')}
              className="px-4 py-2 rounded-lg text-[#8e8e93] text-[14px] hover:bg-[#f2f2f7] transition-colors"
            >
              上一步
            </button>
          </div>
        </section>
      )}

      {/* ── Step 4: 更新 db.json ── */}
      {step === 'db' && (
        <section className="flex flex-col gap-5">
          <div className="bg-[#fff9e6] border border-[#ffcc00]/40 rounded-xl px-4 py-3 text-[14px] text-[#7a5c00]">
            以下是更新后的 <code className="font-mono">db.json</code> 内容，可直接上传到 OSS（<code className="font-mono">data/db.json</code>），或下载后手动替换本地文件再 git commit。
          </div>

          <div className="relative">
            <textarea
              value={newDbJson}
              onChange={e => {
                setNewDbJson(e.target.value)
                setUploadDbResult(null)
              }}
              rows={20}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5ea] bg-[#fafafa] font-mono text-[13px] text-[#1c1c1e] outline-none focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/15 resize-y transition-all"
              spellCheck={false}
            />
          </div>

          {/* 上传结果提示 */}
          {uploadDbResult && (
            <div
              className={`rounded-xl px-4 py-3 text-[14px] ${
                uploadDbResult.ok
                  ? 'bg-[#f2fff6] border border-[#34c759]/30 text-[#1c7a3a]'
                  : 'bg-[#fff5f5] border border-[#ff3b30]/30 text-[#cc2200]'
              }`}
            >
              {uploadDbResult.ok ? (
                <>
                  <p className="font-medium mb-1">db.json 已上传到 OSS</p>
                  <p className="text-[13px] font-mono text-[#1c7a3a]">{uploadDbResult.msg}</p>
                </>
              ) : (
                <p>上传失败：{uploadDbResult.msg}</p>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleUploadDb}
              disabled={uploadingDb}
              className="px-5 py-2 rounded-lg bg-[#007aff] text-white text-[15px] font-medium hover:bg-[#0066d6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {uploadingDb ? '上传中…' : '上传 db.json 到 OSS'}
            </button>
            <button
              onClick={handleCopy}
              className="px-5 py-2 rounded-lg border border-[#007aff] text-[#007aff] text-[15px] font-medium hover:bg-[#007aff]/5 transition-colors"
            >
              {copied ? '已复制 ✓' : '复制内容'}
            </button>
            <button
              onClick={handleDownloadDb}
              className="px-5 py-2 rounded-lg border border-[#e5e5ea] text-[#636366] text-[15px] font-medium hover:bg-[#f2f2f7] transition-colors"
            >
              下载 db.json
            </button>
            <button
              type="button"
              onClick={handleFinishClick}
              className="px-5 py-2 rounded-lg bg-[#34c759] text-white text-[15px] font-medium hover:bg-[#28a745] transition-colors"
            >
              完成
            </button>
            <button
              onClick={() => setStep('meta')}
              className="px-4 py-2 rounded-lg text-[#8e8e93] text-[14px] hover:bg-[#f2f2f7] transition-colors"
            >
              上一步
            </button>
          </div>
        </section>
      )}

    </main>
  )
}
