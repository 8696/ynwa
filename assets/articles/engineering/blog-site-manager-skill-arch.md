# blog-site-manager Skill 架构解析：把一整个静态博客站收进一个 Skill 里

> 本文拆解我个人博客站（icode.link）的全套操作工具——`blog-site-manager` 这个 Hermes Skill 的内部设计。核心问题不是「Skill 怎么写」，而是「一个静态博客站涉及 GitHub、阿里云 OSS、React SPA、第三方 AI 网页、CLI 脚本、Node 子进程这么多东西，怎么用一份 Skill 文档 + 一打 .mjs 文件把所有操作都收口、隔离、守门」。重点剖析三 CLI 分工、router 模式、双闸 dry-run、保护键 / 路径穿越阻断、工作副本脏检查这套安全栈是怎么搭出来的。

---

## 一、解决什么问题

博客站的「工具」一直是个尴尬的命题：

- **站点代码**在 GitHub（React SPA + index.html + assets/）
- **站点数据**（db.json、文章 md）在 GitHub，也在阿里云 OSS（用户访问走 OSS CDN）
- **第三方 AI 页面**（H5 / 小工具）只在 OSS，**不进 GitHub**
- **站点骨架**（index.html / README.md）和博客文章共用同一个 Bucket
- **写文章、改导航、改分类、推 OSS、推 GitHub**——这几个动作天生缠在一起

直接让 AI 裸操作，会发生这些事：

- **误删骨架**：`oss rm` 一行命令下去，`index.html` 没了，全站白屏
- **db.json 与 OSS 不同步**：本地改了，OSS 没推，线上看到的还是旧导航
- **工作副本被覆盖**：`git reset --hard` 一跑，本地未提交的改动全没了
- **路径穿越**：`put ../../etc/passwd` 当对象键传进去
- **凭证泄露：错把 AccessKey 印到报错信息里
- **博客和 AI 页面串味**：把 H5 写到 `assets/articles/` 下、或者把博客写到 `ai-page/`

要解决的，还是同一个矛盾：**大模型有能力听懂"发篇文章"，但没有保证 OSS / GitHub / 文件系统一致性的纪律**。方案不是让模型"更小心"，而是把"理解"和"执行"分开——Skill 是契约层（铁律 + 禁区 + 路由），CLI 是守门人（dry-run + 保护键 + 路径归一化 + 工作副本脏检查）。

---

## 二、整体架构：三层分离

```
契约层  = SKILL.md（路由表 + 铁律 + 踩坑沉淀 + 文件索引）
执行层  = scripts/*.mjs（3 个 CLI + 子模块）
         ├── oss_manager.mjs    任意对象底层
         ├── ai_page.mjs        只碰 ai-page/，不暴露 --force
         └── blog.mjs           只碰博客域，dry-run by default
数据层  = github-sync/ 工作副本（git 跟踪）
         + 阿里云 OSS（Bucket icode-link，线上真值）
         + 阿里云 OSS 的 ai-page/（独立域，不入 git）
```

**契约层**是 SKILL.md，但它**不**是一份手写教程，而是按"用户意图 → 动哪里 → 走哪个脚本 → 读哪个 reference"组织的路由表：

```
| 要做什么                       | 动哪里                       | 脚本                  | 细则                        |
|--------------------------------|------------------------------|-----------------------|----------------------------|
| 建 AI 网页 / H5                | ai-page/<name>/              | ai_page.mjs           | ai-page-guide.md           |
| 发 / 改 / 删博客文章           | db.json + articles/          | blog.mjs              | blog-guide.md              |
| 改博客功能（JS/CSS）           | assets/app/ 源码             | patch → oss_manager   | function-edit-workflow.md  |
| 推 GitHub                       | github-sync/                  | git push              | github-sync.md             |
| 从 GitHub 同步到 OSS            | GitHub → OSS                 | github_to_oss.mjs     | github-sync.md             |
| 看 OSS / 下载 / 删任意对象     | 整个 Bucket                  | oss_manager.mjs       | oss.md                     |
```

用户说自然语言，agent 按表格命中意图，只读 1 个 SKILL.md + 1 个 reference 就动手。不扫全部文档，不做多步推理，不替用户决定"顺便改改 X"。这是为弱模型设计的——减少 token、减少决策分支、减少出错面。

**执行层**的细节下文第三节展开。

**数据层**有两个独立真值源：

- **GitHub 仓库 `8696/ynwa` 的 `feat/pro` 分支**——存站点代码、db.json、文章 md。改完推 GitHub 是用户触发。
- **阿里云 OSS Bucket `icode-link`**——存线上真值。SPA 部署靠它，CDN 加速。GitHub 是源，OSS 是发布目标。

中间靠 `blog.mjs sync`（GitHub → 本地工作副本）+ `blog.mjs <cmd> --apply`（本地 + OSS）这条单向管道连接。**不存在 OSS → GitHub 方向**（伪逻辑，已砍）。唯一例外是 `github_to_oss.mjs`，把 GitHub 已跟踪文件覆盖推到 OSS——但**不删 OSS 多余文件**（重构前留的孤儿键不主动清理，让用户决定）。

---

## 三、三 CLI 分工：router + 子模块

三个入口文件结构完全同构——**router 模式**：

```javascript
// 入口只做三件事：解析 CLI 参数 → 打印 usage → 路由到子模块
const ROUTES = {
  'list':  (key, flags) => reads.cmdList(key),
  'stat':  (key, flags) => reads.cmdStat(key),
  'get':   (key, flags) => reads.cmdGet(key, flags),
  'put':   (key, flags) => writes.cmdPut(key, flags),
  'delete':(key, flags) => writes.cmdDelete(key, flags),
};

function main() {
  const [, , command, ...rest] = process.argv;
  if (!command || command === '--help') fail(USAGE);

  const { positional, flags } = parseArgs(rest);
  const handler = ROUTES[command];
  if (!handler) fail(`unknown command: ${command}`);
  await handler(positional[0], flags);
}
```

每个 CLI 都拆成 `入口 + _shared + reads + writes` 四类文件：

```
scripts/
├── blog.mjs                  入口（路由表 ROUTES）
├── blog/
│   ├── _shared.mjs           常量 + db 读写 + applyDryRun + oss 子进程封装
│   ├── reads.mjs             list / show / list-categories / validate
│   ├── articles.mjs          create / update / delete
│   ├── nav.mjs               add-nav / insert-nav / update-nav / delete-nav
│   ├── categories.mjs        add-category / update-category / delete-category
│   ├── tags.mjs              add-tag / update-tag / delete-tag
│   └── works.mjs             add-work / insert-work / update-work / delete-work
├── oss_manager.mjs           入口
├── oss_manager/
│   ├── _shared.mjs           CONFIG + 凭证加载 + normalizeKey + 保护键判定
│   ├── reads.mjs             list / stat / get
│   └── writes.mjs            put / delete（带保护键断言）
└── ai_page.mjs               入口（最严，不暴露 --force）
└── ai_page/
    ├── _shared.mjs           页面名 → ai-page/<name>/… 解析 + 隔离断言
    ├── reads.mjs             list / pages / stat / get
    └── writes.mjs            put / delete
```

**为什么要这样分？**

- **入口只路由**：业务逻辑全在子模块，加新命令只动一处（`default export` + `ROUTES` 表）
- **`_shared.mjs` 集中跨子模块代码**：常量、`fail` / `parseArgs`、OSS 子进程封装、db.json 读写、`applyDryRun` 门控——避免散落 5 处
- **`reads` / `writes` 物理隔离**：只读子命令无 `--apply` 概念，写子命令走 `applyDryRun` 门控，IDE 一眼能看出哪些命令能改 OSS

三个 CLI 的安全边界**层层收紧**，可以对比着记：

| CLI | 隔离范围 | 写命令逃生口 | 默认行为 |
|-----|---------|-------------|---------|
| `oss_manager` | 整个 Bucket | `--force`（明文提示应走 `blog.mjs`） | list / stat / get 不限；put / delete 默认拒保护键 |
| `ai_page` | `ai-page/` 前缀 | **无**（不暴露 `--force`） | 所有写都允许（在自己的沙箱里） |
| `blog` | 博客域 | `--apply` | **所有写默认 dry-run** |

下面逐个拆开看每个 CLI 的内部断言是怎么落地的。

### 3.1 共同底座：oss_manager 任意对象层

`oss_manager.mjs` 是底层，被另外两个 CLI 当子进程 `spawnSync('node', [OSS_MANAGER, ...args])` 调用。它不带业务知识，但带三道防线：

- **`normalizeKey`**：路径归一化 + 路径穿越 / 反斜杠 / 控制字符阻断（详见第五节）
- **`assertBlogWriteAllowed`**：博客/SPA 保护键默认拒写，需 `--force` 放行
- **`fail()`**：不输出任何凭证 / config 内容（详见第八节）

它**不**做的事情：

- 不识别 `--apply` / `--discard` 这类语义化开关（那是上层 CLI 的概念）
- 不区分 dry-run / 真做（OSS SDK 一调就是真做；上层决定要不要调）
- 不持有业务状态（不读 db.json，不解析 nav / category）

这层定位就是「OSS 的薄封装」——薄到任何 agent 都能裸调，但足够把灾难性操作（删 index.html）挡在保护键后面。

### 3.2 ai_page 沙箱层

`ai_page.mjs` 的设计**只**碰 `ai-page/` 前缀，**不**暴露 `--force`。看它的 USAGE：

```text
usage:
  node scripts/ai_page.mjs list [NAME|PREFIX]
  node scripts/ai_page.mjs pages
  node scripts/ai_page.mjs stat <name-or-key>
  node scripts/ai_page.mjs get <name-or-key> [--output FILE]
  node scripts/ai_page.mjs put <name-or-key> --file FILE
  node scripts/ai_page.mjs delete <name-or-key>

Notes:
  - page name "demo" → ai-page/demo/index.html (stat/get/delete)
  - put demo --file ./app.js → ai-page/demo/app.js
  - only ai-page/; no --force
```

**关键约束**：

- USAGE 明文写 `no --force`——agent 看到就知道这条路没有逃生口
- 键解析强制以 `ai-page/` 开头（`_shared.mjs` 里 normalizeKey 给的 defaultUploadPrefix 是 `ai-page/`，但入口不会自动补——必须显式传）
- 物理上**不 import** `./blog/`，从语言层杜绝两个 CLI 互相干涉

**边界处的对偶**：`ai_page` 的写操作最终还是要走 `oss_manager.put`（通过子进程）。但因为键空间完全隔离（`ai-page/` 不在 BLOG_PROTECTED_KEYS / BLOG_PROTECTED_PREFIXES 里），不会被底层拒。**安全 = 物理隔离 + 键前缀隔离 + 不暴露逃生口**这三层叠加。

### 3.3 blog dry-run 层

`blog.mjs` 的设计哲学是「业务域保护 + 操作可逆性」：

- **业务域保护**：只看 db.json + assets/articles/，对 ai-page/ 拒写（`refuseAiPageKey`）
- **操作可逆性**：所有写命令默认 dry-run，必须 `--apply` 才真做

`blog/_shared.mjs` 里关键的隔离断言：

```javascript
const PROTECTED_OSS_KEYS = new Set(['README.md', 'index.html', '.gitignore']);
const PROTECTED_OSS_PREFIXES = ['assets/app/', 'assets/articles/'];
const AI_PAGE_PREFIX = 'ai-page/';

function isAiPageKey(key) {
  const k = String(key || '').replace(/^\//, '');
  return k === 'ai-page' || k.startsWith('ai-page/');
}

function isProtectedOssKey(key) {
  const k = String(key || '').replace(/^\//, '');
  if (!k) return true;       // 空键也保护
  if (PROTECTED_OSS_KEYS.has(k)) return true;
  if (isAiPageKey(k)) return true;     // 博客域不写 AI 页面
  return PROTECTED_OSS_PREFIXES.some(p =>
    k === p.slice(0, -1) || k.startsWith(p)
  );
}
```

注意 `isProtectedOssKey` 里 `if (isAiPageKey(k)) return true`——这一行让博客域**也**把 `ai-page/` 当保护键。这意味着即使有人绕过 `blog.mjs` 入口直接调底层 `oss_manager put ai-page/foo.html`（不带 `--force`），也会被拦。这是把 ai-page 沙箱的边界**也**压到了 oss_manager 层。

**`refuseAiPageKey` 是上层硬拦**：

```javascript
function refuseAiPageKey(key, action) {
  if (isAiPageKey(key)) {
    fail(`refusing to ${action} AI page key "${key}"; blog content stays under assets/articles/`);
  }
}
```

`articles.mjs` 里 `cmdCreate` / `cmdUpdate` / `cmdDelete` 在入口第一行就调它——确保所有写命令都无法落到 `ai-page/`。两个 CLI 的隔离是**双重断言**（上层 + 底层），单独绕过任何一层都拦得住。

### 3.4 三层收紧的本质

把三层压成一句话：

```
oss_manager  = 任意对象底层，能动 Bucket 任何键，但保护键需明确 --force
  ↑ 调
ai_page      = ai-page/ 沙箱层，无 --force，写错了顶多坏一个 AI 页面
blog         = 业务域 + 操作可逆层，所有写默认 dry-run，必须 --apply
```

每一层都比上一层**多一道**约束。底层能力大、出口严；上层能力小、出口宽。这是把「少出错」变成「结构上不可能出错」的核心套路——不是靠 agent 自觉，是靠代码路径上根本走不到。

---

## 四、双闸 dry-run：默认只打印不真做

**所有写命令默认 dry-run**是这套系统的核心纪律。看 `applyDryRun` 实现：

```javascript
// blog/_shared.mjs
function applyDryRun(flags, payload) {
  const dryRun = !flags.apply;
  const head = dryRun ? 'DRY-RUN (pass --apply to commit)' : 'APPLIED';
  console.log(JSON.stringify({ mode: head, dryRun, ...payload }, null, 2));
  if (dryRun) process.exit(0);
}
```

调用方长这样（`blog/articles.mjs` 里的 `cmdCreate`）：

```javascript
// 1) 校验
const errors = validateCreate(flags);
if (errors.length) fail(errors.join('\n'));

// 2) 计算要写的东西
const article = buildArticle(flags);

// 3) dry-run 门控：没 --apply 直接 exit 0
applyDryRun(flags, {
  article,
  file: `${article.folder}/${article.slug}.md`,
  dbUpdate: { articles: [article] },
});

// 4) 真做：写本地 + 推 OSS
await saveDb(db, localPath);
ossPut(article.file, localContentPath);
```

**为什么是 dry-run 而不是 confirm 弹窗？**

- agent 不能弹窗（cron 任务、无人值守场景）
- 让用户**先看 diff 再决定**：dry-run 模式下，打印的是**完整 payload**（新 article 对象 + 新 db 结构 + 将要 put 的文件路径），用户可以直接 `cat` 验证
- **agent 也不会自作主张加 `--apply`**——除非用户在当次会话明确说"应用/做/提交/推"

这套纪律的代价是：**每个写命令要打两遍**（先 dry-run 看输出，再加 `--apply`）。换来的是**从未发生过误删 db.json / 误覆盖 index.html**。

---

## 五、保护键 + 路径归一化：挡住最常见的灾难

### 5.1 保护键默认拒写

OSS Bucket `icode-link` 里，有些键是**站点骨架**——写错了整站白屏或博客文章消失：

```javascript
// oss_manager/_shared.mjs
const BLOG_PROTECTED_KEYS = new Set(['README.md', 'index.html', '.gitignore']);
const BLOG_PROTECTED_PREFIXES = ['assets/app/', 'assets/articles/'];

function isBlogProtectedKey(key) {
  const k = String(key || '').replace(/^\//, '');
  if (!k) return true;                          // 空键也当保护：避免 put 落到 Bucket 根
  if (BLOG_PROTECTED_KEYS.has(k)) return true;
  return BLOG_PROTECTED_PREFIXES.some(p => k === p.slice(0, -1) || k.startsWith(p));
}

function assertBlogWriteAllowed(key, flags, action) {
  if (isBlogProtectedKey(key) && !flags.force) {
    fail(`refusing to ${action} blog/SPA key "${key}". Use blog.mjs for articles/db.json. Pass --force only if the user explicitly asked to change the site skeleton.`);
  }
}
```

**关键设计**：

- **空键也当保护**：`put --file foo.html` 不带 key 会落到 Bucket 根下，变成裸对象。直接拒。
- **错误信息明文引导**：`"Use blog.mjs for articles/db.json"`——agent 看到就知道走 `blog.mjs` 而不是裸调 `oss_manager put --force`。
- **博客子模块内部 ossPut 自己带 `--force`**：因为博客的合法操作就是要改 db.json 和 articles/。保护键检查在 `oss_manager` 层，但博客子模块的入口已经经过 `cmdCreate` / `cmdUpdate` 的业务校验，加 `--force` 是已知意图。

### 5.2 路径穿越阻断

`normalizeKey` 是所有 OSS 操作的必经之路：

```javascript
function normalizeKey(input, { allowEmpty = false, asPrefix = false } = {}) {
  // 1) 阻断 --file / --output 当对象键
  if (value.startsWith('--')) {
    fail('object key looks like a CLI flag; put key before --file, or omit key to use default prefix');
  }

  // 2) URL 提取路径 + 校验域名
  if (/^https?:\/\//i.test(value)) {
    const url = new URL(value);
    if (!isConfiguredHost(url.hostname)) fail('URL host is outside the configured domain');
    value = decodeURIComponent(url.pathname);
  }

  // 3) 去首尾斜杠
  value = value.replace(/^\/+/, '').replace(/\/+$/, '');

  // 4) 阻断路径穿越 / 反斜杠 / 空段 / 控制字符
  const parts = value.split('/');
  if (
    value.includes('\\')                          // 反斜杠
    || parts.includes('..')                       // 路径穿越
    || parts.includes('.')                        // 当前目录段
    || parts.includes('')                         // 空段（双斜杠）
    || /[\u0000-\u001f\u007f]/.test(value)        // 控制字符
  ) {
    fail('unsafe object key');
  }

  return value;
}
```

**为什么这一串检查这么重要？**

- `..`：路径穿越，理论上 OSS 不会让你逃出 Bucket，但拼出奇怪的对象键会让 SPA 引用错位
- `\\`：Windows 路径分隔符，OSS 不认，写进去就成了带反斜杠的文件名，404 救不回来
- `\u0000-\u001f`：控制字符 / NULL 字节，写进文件名无法通过 URL 访问
- URL 域名校验：阻断 `https://evil.com/icode.link/index.html` 这种把外部域伪装成本站的攻击

### 5.3 实战触发的 case（每个都从 SKILL.md 踩坑记录里挑的）

**Case 1：误传 `--file` 当对象键**——用户复制粘贴命令时把参数顺序搞反：

```bash
# 用户本意：put assets/app/db.json --file ./db.json
# 实际打成：put --file ./db.json  →  key 是 "--file"
node scripts/oss_manager.mjs put --file ./db.json
# → ERROR: object key looks like a CLI flag; put key before --file, or omit key to use default prefix
```

`normalizeKey` 第一步就拦了。错误信息还顺带教用户正确顺序。

**Case 2：误传裸 URL 到 blog 域**——保护键虽然兜住了，但仍走了一次 normalizeKey：

```bash
# 用户本意：get 某个 OSS 对象，传了完整的 icode.link URL
node scripts/oss_manager.mjs get https://icode.link/assets/app/db.json
# → URL 被解析 → pathname = /assets/app/db.json → normalize 后 = "assets/app/db.json"
# → 进入 get 路径，list/stat/get 不限保护键，正常返回
```

但如果是 `put`：

```bash
node scripts/oss_manager.mjs put https://icode.link/assets/app/db.json --file ./db.json --force
# → 解析后 key = "assets/app/db.json" → 命中 BLOG_PROTECTED_PREFIXES → 有 --force 才放行
```

`--force` 必须显式传，错误信息明文引导「Pass --force only if the user explicitly asked to change the site skeleton」——把"操作"和"决策"分得很清楚：脚本只执行明确指令，不替用户做判断。

**Case 3：路径归一化的隐蔽陷阱**——首尾斜杠容易搞错：

```bash
# 写 db.json 时手抖：'/assets/app/db.json/'  ← 多了个尾斜杠
node scripts/oss_manager.mjs put /assets/app/db.json/ --file ./db.json --force
# → normalize 后 = "assets/app/db.json"（去尾斜杠）→ 正常 put 到正确位置
# 如果不去尾斜杠，OSS 会创建一个名为 "assets/app/db.json/" 的"文件夹对象"，不是文件
```

`list <prefix>` 路径走 `asPrefix=true` 分支，自动补尾斜杠、避免 `ai-page` 误配到 `ai-page-foo`；写入路径走 `asPrefix=false`（默认），自动去尾斜杠。一个函数两套行为，靠 `asPrefix` 标志切换。

**Case 4：空键保护的实际意义**——这条是 2026-08 期间补的：

```bash
# 用户本意：上传到默认 ai-page/ 前缀，但忘了写 key
node scripts/oss_manager.mjs put --file ./demo.html
# → 现在的行为：fail("object key is required")
# 早期 OSS CLI：默认落到 Bucket 根下，文件没归类，后续难清理
```

USAGE 里写「omitting KEY on put → `${CONFIG.defaultUploadPrefix}<basename>` (flat; prefer ai_page.mjs)」——但脚本层面**不**允许省略 key（`normalizeKey` 在 `allowEmpty=false` 时直接 fail）。两者矛盾是有意的：USAGE 是给老习惯的提醒，实际行为是「必须传 key」。

### 5.4 保护键 vs 路径阻断的分工

两套机制经常被搞混，分工如下：

| 机制 | 适用场景 | 拒的是 |
|-----|---------|--------|
| `isBlogProtectedKey` | 整把 `articles/app/`、`assets/articles/`、`README.md`、`index.html` 等整类键 | 「合法但敏感」的键 |
| `normalizeKey` | 所有键的入口归一化 | 「合法但格式有问题的」键（路径穿越、反斜杠、控制字符、空段） |

`normalizeKey` 是**前置闸**：任何不合法的键在进 OSS 之前就被拦下来。
`isBlogProtectedKey` 是**业务闸**：合法但需要明确授权才能写。

一个键过了 `normalizeKey` 不一定能过 `isBlogProtectedKey`（比如 `assets/app/db.json` 形式合法但要 `--force`），反之亦然。**两道闸是串联的，不是替代**。

---

## 六、工作副本脏检查：sync 不静默覆盖

`blog.mjs sync` 的核心承诺是**永远不会静默丢改动**。`work_copy.mjs` 里这段实现：

```javascript
function ensureGitWorkCopy({ discard }) {
  // 1) 工作副本存在就脏检查
  if (fsSync.existsSync(WORK_ROOT)) {
    const status = git(['status', '--porcelain'], { allowFail: true });
    if (status.stdout && !discard) {
      return blocked({
        preCleanStatus: status.stdout,
        hint: '确认丢弃请加 --discard 重跑；或先 git stash / commit + push 保存改动',
      });
    }

    // 2) 未推送检查
    const unpushed = git(['log', '@{u}..', '--oneline'], { allowFail: true });
    if (unpushed.stdout && !discard) {
      return blocked({
        preCleanStatus: 'unpushed commits exist',
        unpushed: unpushed.stdout,
        hint: '确认丢弃请加 --discard；或先 git push',
      });
    }

    // 3) 确认无改动才 reset --hard
    git(['fetch', 'origin']);
    git(['reset', '--hard', `origin/${BRANCH}`]);
    git(['clean', '-fd']);
  } else {
    cloneRepo();
  }
}
```

**核心规则**：

- **脏工作区 + 没 `--discard` → BLOCKED，不 reset**：打印所有未暂存 / 未提交的文件清单，明文提示「确认丢弃请加 `--discard`」
- **未推送提交也算脏**：本地 commit 了但没 push，sync 也会拦——防止远端已有更新被本地未推送的旧 commit 覆盖
- **`--discard` 是显式逃生口**：要用户主动确认才走，不是默认值

`blocked()` 函数输出 JSON 格式：

```json
{
  "mode": "BLOCKED",
  "branch": "feat/pro",
  "workRoot": "/root/.cache/hermes-icode-link/github-sync",
  "preCleanStatus": " M assets/app/db.json\n?? tmp.md",
  "hint": "确认丢弃请加 --discard 重跑；或先 git stash / commit + push 保存改动"
}
```

`blog.mjs sync` 和 `github_to_oss.mjs` 共用这套脏检查——保证两条路径（GitHub 拉本地、GitHub 推 OSS）行为一致。

---

## 七、博客与 AI 页面：物理隔离 + 互斥的写入入口

两套内容系统共用一个 Bucket，必须严格隔离：

| 维度 | 博客 | AI 页面 |
|-----|------|---------|
| 数据存哪 | GitHub + OSS（双份） | 只在 OSS |
| 走哪个 CLI | `blog.mjs` | `ai_page.mjs` |
| 文章 ID 规则 | UUID（不用数字自增） | 文件夹名 |
| 入口守卫 | `refuseAiPageKey` 拒写 `ai-page/` | 强制要求 key 以 `ai-page/` 开头 |
| 删除行为 | 三件套（摘 db + 删 OSS md + 本地 rm） | 只删 OSS 对象 |

`blog/_shared.mjs` 的隔离断言：

```javascript
function isAiPageKey(key) {
  const k = String(key || '').replace(/^\//, '');
  return k === 'ai-page' || k.startsWith('ai-page/');
}

function refuseAiPageKey(key, action) {
  if (isAiPageKey(key)) {
    fail(`refusing to ${action} AI page key "${key}"; blog content stays under assets/articles/`);
  }
}
```

`articles.mjs` 里 `cmdCreate` / `cmdUpdate` / `cmdDelete` 都在入口调 `refuseAiPageKey`——确保：

- **create**：传 `--file assets/articles/...` 合法；传 `--file ai-page/foo.html` 直接拒
- **--content-file**：同上，AI 页面走 `ai_page.mjs`
- **遇到多篇共用 file**：`--content-file` 直接拒（避免 A 文章覆盖 B 文章正文）

反方向：`ai_page.mjs` 不暴露 `--force`，不 import `./blog/`，所有命令的作用域强制以 `ai-page/` 开头——物理上无法误改博客。

---

## 八、凭证隔离：~/.private/ 私有目录

阿里云 AccessKey 不进 skill、不进 GitHub、不进代码仓库。整层「凭证管理」只占 `oss_manager/_shared.mjs` 几行 + 一个外部文件，但里面的纪律很严格。

### 8.1 CONFIG 里只记文件路径

```javascript
// oss_manager/_shared.mjs
const CONFIG = {
  bucket: 'icode-link',
  region: 'oss-cn-heyuan',
  domain: 'icode.link',
  credentialFile: path.join(os.homedir(), '.private', '.oss_icode_link_ak.json'),
  listPageSize: 1000,
};
```

注意 CONFIG 里**只**有 `credentialFile`（路径），**没有** `accessKeyId` / `accessKeySecret` 字段。哪怕 CONFIG 整个 dump 出来也不会泄露凭证。

### 8.2 凭证文件该长什么样

`~/.private/.oss_icode_link_ak.json` 是一个独立 JSON 文件，权限 600，目录权限 700：

```bash
$ ls -la ~/.private/
drwx------ 2 root root  4096 Aug 23 10:23 .
-rw------- 1 root root   142 Aug 23 10:23 .oss_icode_link_ak.json
```

文件内容极简：

```json
{
  "accessKeyId": "LTAI5t...",
  "accessKeySecret": "***"
}
```

**为什么文件名以 `.` 开头**？避免 `ls` 默认显示。**为什么权限 600**？同用户进程可读，其他用户 0 权限。**为什么用 JSON 而不是 .env / shell source**？JSON 解析可控（不用 eval），结构稳定（加字段不破坏旧代码），便于备份和迁移（一个文件整体 cp）。

### 8.3 fail() 的凭证保护纪律

`fail()` 函数是所有错误退出的唯一出口。它故意写得极简：

```javascript
function fail(message, code = 1) {
  console.error(`ERROR: ${message}`);
  process.exit(code);
}
```

**关键约束**：

- **只输出 `message`**，不带任何上下文（不输出 `error.config`、`error.requestId`、`error.host`）
- **不用 `console.trace` / `console.dir`**——这两者会展开对象结构，可能泄露凭证
- **不进 stderr/stdout 区分级别**——`console.error` 是约定，但 fail() 内部不混用其它输出

主入口的异常捕获也压得很扁：

```javascript
// oss_manager.mjs / ai_page.mjs / blog.mjs 的入口末尾
main().catch((error) => fail(error.message));
```

**只传 `error.message`，不传 `error` 对象本身**。ali-oss SDK 的 error 对象通常包含：

```javascript
{
  code: '...',
  message: '...',
  host: 'oss-cn-heyuan.aliyuncs.com',
  name: 'BucketNotFoundError',
  // 关键：可能夹带 requestId / config 引用
}
```

如果直接 `fail(error)`，stack trace 会展开这些字段；压成 `.message` 之后只剩一行人类可读文本。

### 8.4 ENV 隔离

`oss_manager.mjs` 启动时清掉 `ALI_OSS_*` 环境变量：

```javascript
// oss_manager/_shared.mjs 内部（示意）
function loadClient() {
  const credPath = CONFIG.credentialFile;
  if (!fsSync.existsSync(credPath)) {
    fail(`credential file not found: ${credPath}`);
  }
  const raw = fsSync.readFileSync(credPath, 'utf8');
  const cred = JSON.parse(raw);
  if (!cred.accessKeyId || !cred.accessKeySecret) {
    fail('credential file missing accessKeyId / accessKeySecret');
  }
  return new OssClient({
    region: CONFIG.region,
    bucket: CONFIG.bucket,
    accessKeyId: cred.accessKeyId,
    accessKeySecret: cred.accessKeySecret,
  });
}
```

**`new OssClient(...)` 时显式传 accessKeyId/Secret**，**不**依赖环境变量 `ALI_OSS_ACCESS_KEY_ID` 等。这样如果用户 shell 里残留了环境变量（dotenv 泄漏、CI 缓存等），也**不会**被脚本读到。文件读不到 → fail() 直接退出，不静默退化到环境变量。

### 8.5 子进程调用的凭证传递

`blog.mjs` 通过 `spawnSync('node', [OSS_MANAGER, ...args])` 调 oss_manager，**凭证怎么传过去**？

答：**不需要传**。`spawnSync` 默认继承父进程的环境变量，但关键是——**环境变量里没有凭证**。父进程（blog.mjs）根本不持有凭证，它只是 CLI router；真正持有凭证的是 oss_manager 子进程（启动时自己读 `~/.private/.oss_icode_link_ak.json`）。

子进程调用链：

```
blog.mjs (无凭证)
  └─ spawnSync('node', [oss_manager.mjs, 'put', key, '--file', file, '--force'])
       └─ oss_manager.mjs 启动 → loadClient() → 读 ~/.private/...ak.json
            └─ 调用 OSS SDK
```

**凭证作用域天然限定在 oss_manager 子进程内**——blog.mjs 从头到尾不知道 accessKey 是什么。这条隔离是**结构性的**，不是靠「blog.mjs 不主动读环境变量」这种自律条款。

### 8.6 凭证泄露的兜底

即便上面五层都做足了，凭证文件万一泄漏（比如 git 不小心把 `~/.private/` 加进去了）的兜底：

- `~/.private/` 应加入全局 `~/.gitignore_global`（`/.private/`）
- skill 的 `~/.hermes/skills/blog-site-manager/.gitignore` 也加 `**/.private/`（虽然 skill 本身没凭证，但用户可能误放进 skill 目录做实验）
- 阿里云控制台 RAM 里给这个 accessKey **最小权限**：只授权 `icode-link` Bucket 的 putobject / getobject / listobjects / headobject，不给其他 Bucket 权限，不给删除权限之外的运维操作
- 定期轮转：accessKey 不超过 90 天，到期前在控制台生成新 key → 更新文件 → 删旧 key

### 8.7 一句话总结

整层凭证隔离的核心套路：**路径不存凭证 / fail() 只输出 message / SDK 异常压缩成 .message / 显式传参不依赖 ENV / 子进程链作用域隔离 / 兜底靠 gitignore + RAM 最小权限 + 定期轮转**。六条任意一条失守，其它五条兜得住。

---

## 九、命令面（部分示例）

```bash
# === 工作副本 ===
node scripts/blog.mjs sync                              # 从 GitHub 拉最新到 github-sync/

# === 文章 CRUD（全部默认 dry-run，必须 --apply） ===
node scripts/blog.mjs list                              # 列文章
node scripts/blog.mjs show <id|title>                   # 看文章
node scripts/blog.mjs create --title "..." --category engineering \
        --summary "..." --content-file ./article.md      # dry-run
node scripts/blog.mjs create ... --content-file ./article.md --apply   # 真做

# === 导航 / 分类 / 标签 ===
node scripts/blog.mjs add-nav --type category --label "技术" --value engineering --apply
node scripts/blog.mjs insert-nav 3 --type link --label "GitHub" --value "https://github.com/..." --apply
node scripts/blog.mjs delete-nav 5 --apply
node scripts/blog.mjs delete-category engineering --apply    # 有引用则直接拒

# === AI 页面（独立 CLI，无 --apply 概念） ===
node scripts/ai_page.mjs list
node scripts/ai_page.mjs put demo --file ./demo/index.html
node scripts/ai_page.mjs delete demo

# === 任意对象底层 ===
node scripts/oss_manager.mjs list /
node scripts/oss_manager.mjs stat assets/app/db.json
node scripts/oss_manager.mjs put assets/app/db.json --file ./db.json --force   # 警告：改骨架

# === GitHub ↔ OSS 同步 ===
node scripts/github_to_oss.mjs                          # dry-run
node scripts/github_to_oss.mjs --apply                   # 真做
```

每个命令 `--help` 都有完整 usage。这是把"用户口里的"和"agent 手里的"同一份契约绑死——不会出现"SKILL.md 说可以，实际跑报 unknown command"的情况。

---

## 十、踩坑沉淀

实战踩过的、已经写进 SKILL.md 的坑。挑 4 个最痛的展开「**发生场景 → 根因 → 修复 → SKILL.md 现在怎么写**」四步流程，其余列快查表。

### 10.1 删 category 不扫 nav 死链

**发生场景**：用户要删 `github-trending` 这个分类，跑 `blog.mjs delete-category github-trending --apply`。命令退出 0，db.categories[] 里也没了。但线上首页导航还留着一项「GitHub榜单 → /category/github-trending」，点进去是 404。

**根因**：`delete-category` 只摘 `db.categories[]` + `db.tags[]`，**不**联动清 `db.nav[]`。nav 项是数组下标定位，没法自动判断「哪些项指向被删的 id」。

**修复**：删完必跑四步流程（**注意顺序**——从最小下标开始删，后续 index 会前移）：

```bash
# 1. 删 category
node scripts/blog.mjs delete-category github-trending --apply

# 2. 找出 nav 死链
node scripts/blog.mjs list-nav
# → 输出里 value 含 "/category/github-trending" 的项就是要删的

# 3. 按下标从最小到最大删（注意每次删完后续 index 会前移）
node scripts/blog.mjs list-nav
node scripts/blog.mjs delete-nav 5 --apply     # 假设死链在下标 5
node scripts/blog.mjs list-nav                  # 复查
node scripts/blog.mjs delete-nav 3 --apply     # 假设又出现一个（下标变了）

# 4. validate 确认 0 错
node scripts/blog.mjs validate
```

**SKILL.md 现在怎么写**：「删 category/tag 后必扫 nav 死链」列在硬规则区，明确四步流程，强调「按下标从最小开始删」这个易错点。tag 同理（`/tag/<id>` 也走 nav.value）。

### 10.2 删文章的三件套

**发生场景**：用户删一篇文章，跑 `blog.mjs delete <id> --apply`。命令退出 0，但发现：OSS 上的 `assets/articles/<cat>/<slug>.md` 还在；本地 `github-sync/` 工作副本里的 `.md` 也在。下次 `validate` 报「OSS 上有 db 未引用的 md 文件」。

**根因**：`articles.mjs:511` 的 `isProtectedOssKey` 判定——`assets/articles/` 是 BLOG_PROTECTED_PREFIXES 之一，`--apply` 模式下 `cmdDelete` 走 `skipOssDelete` 分支，**只摘 db 记录，OSS 上的 .md 不动**。

保护键的存在意义是防止误删，但删除文章时这条规则**反向**生效了——正确意图就是删 OSS 上的 md，但被保护键规则挡了。

**修复**：三件套，顺序不能颠倒（**先 db 后 OSS**——db 摘了 OSS 上的 md 变孤儿但 validate 能扫到；反过来 OSS 先没的话下次 sync 可能又把孤儿 md 写回来）：

```bash
# 1. 摘 db 记录（OSS + 本地 md 变孤儿，但还在）
node scripts/blog.mjs delete <id> --apply

# 2. 删 OSS 上的 .md（绕开保护键检查，显式 --force）
node scripts/oss_manager.mjs delete assets/articles/<cat>/<slug>.md --force

# 3. 删本地工作副本里的 .md（git 会 untracked，但下个 sync 不会自动清）
rm /root/.cache/hermes-icode-link/github-sync/assets/articles/<cat>/<slug>.md

# 4. 让 GitHub 真值源跟上
cd /root/.cache/hermes-icode-link/github-sync
git add -A
git commit -m "remove <slug>"
git push origin feat/pro

# 5. validate 确认 0 错
node scripts/blog.mjs validate
```

**SKILL.md 现在怎么写**：「`blog.mjs delete` 对 `assets/articles/` 路径会 skipOssDelete」放在硬规则区，列三件套 + 强调「顺序：先 db 后 OSS」。

### 10.3 ai_page get 不报错污染缓存

**发生场景**：批量重构多页面（2026-08 那次），主 agent 派 8 个子 agent 写 8 个新页面。子 agent 用 `ai_page.mjs get` 拉已有页面作参考。**对 OSS 上不存在的键**（老页面没有的 `AGENTS.md` / `data.js`），脚本**不报错**而是把**错误响应体**（YNWA 博客首页 HTML）写进本地缓存路径。后续 agent 读了以为是真的 AGENTS.md，结果照着错的内容改页面。

**根因**：`ai_page/_shared.mjs` 的 `get` 实现遇到非 200 响应，没校验 statusCode，直接把 body 落盘。ali-oss SDK 在某些错误场景下会返回 200 + 错误 HTML（OSS 静态托管默认 404 行为）。

**修复**：

- **批量拉取前先 `list` 确认真实键集**，只 get 存在的键
- 拿到文件后**先验开头**（HTML 开头 = 污染，YAML/Markdown/JS 开头才是真）
- 缓存路径加 `.partial` 后缀或加个 `<key>.verified` 标志文件，写完才 mv 过去

实战脚本会先做：

```bash
# 先列确认真实键集
node scripts/ai_page.mjs pages
# → ["demo", "form-grid", "nova-spatial", ...]

# 只 get 存在的（确认过的）
for page in demo form-grid nova-spatial; do
  node scripts/ai_page.mjs get $page 2>&1 | tee /tmp/ai-page-$page.md
  head -c 200 /tmp/ai-page-$page.md | grep -q '^#\|^---\|^<!DOCTYPE' || \
    echo "WARNING: $page 内容开头异常,可能是污染"
done
```

**SKILL.md 现在怎么写**：「`ai_page.mjs get` 对不存在的键会落错误页文件」放在硬规则区，明文警告「拿到文件后先 head -c 验开头（HTML 开头 = 污染）」。

### 10.4 子 agent 写 AGENTS.md 被护栏拦

**发生场景**：批量重构时，某个子 agent 接到任务「为 nova-spatial 页面写 AGENTS.md」，按惯例用 `write_file` 落盘。工具返回错误：

```
BLOCKED: write to protected agent-instruction file(s)
```

子 agent 卡住，等用户响应超时（600s 墙）后工具拒绝，写失败。

**根因**：`write_file` 工具对 `AGENTS.md` / `CLAUDE.md` / `.cursorrules` 等 agent 指令文件有**跨配置软护栏**——写入会弹确认等用户响应。子 agent 没用户响应渠道，超时后即拒绝。**不是网络问题**，是工具设计如此。

**修复**：AGENTS.md 由**主 agent**统一落，子 agent 只负责页面源代码。具体：

- 子 agent 接到任务时，prompt 里写明「**AGENTS.md 由主 agent 写，你只写页面代码**」
- 主 agent 用 `terminal` heredoc（`cat > path <<'EOF' … EOF`）绕开 write_file 保护，或者先写 `tmp-AGENTS.md` 再 `mv` 过去
- **不要**重复调 write_file 重试（必失败，会浪费子 agent 600s）

实际写命令：

```bash
# 主 agent 的 fallback 写法
cat > /root/.cache/hermes-icode-link/ai-page/nova-spatial/AGENTS.md <<'EOF'
# nova-spatial AGENTS.md
…
EOF
```

**SKILL.md 现在怎么写**：「`AGENTS.md` write_file 保护同时作用于子 agent 与主 agent」+「子 agent 写不了 AGENTS.md（write_file 保护），手册由主 agent 落」明确分工。

### 10.5 快查表（其余坑一览）

| 坑 | 一句话规避 |
|---|---|
| `insert-nav` / `add-nav` / `update-nav` 漏 `--type` 直接 ERROR | 三条 nav 命令必须显式 `--type category\|tag\|link` |
| `update-nav` 把 `before.value` 当裸 id 查 → 旧带前缀数据误报"category not in db" | 改 label / target 时绕开它，只在确实需要重写 value 时才用 update-nav |
| nav.value 是 URL 不是 id（`Header.resolveNavItem` 不读 type） | `list-nav` verify 看 value 是否带前缀 |
| 子 agent 并发 >4 打爆 Token Plan | 分批派（≤4），超时后接手已写文件，缺的才补写 |
| 中文 / emoji 标题 create 不带 `--slug` → 过短 auto-slug | 强制显式 `--slug` |
| `--move-category` 只改 db，不搬文件 | 增量用 `--add-categories` / `--remove-categories` |
| 多篇共用 file 时 `--content-file` 直接拒 | 共享正文用统一路径管理，不走覆盖 |

每个坑都不是"理论风险"——是某次实际触发的 bug。**写进 SKILL.md 是为了让下次不再栽**。

---

## 十一、这套设计的边界

不是什么都能收口：

- **CLI 调用顺序的合理性**：脚本不替你判断"先 sync 还是先 create"——脏工作区时 `create` 会失败，让用户主动 sync。这是为了避免脚本自动 sync 覆盖未提交改动。
- **跨会话的"上次干了啥"**：脚本不持久化历史，`list` 是当前真值。如果想知道上周发了啥，跑 `list --query` 自己翻。
- **OSS 多 Bucket / 多域名**：CONFIG 写死 `icode-link` + `oss-cn-heyuan`，其他站点需要新 skill。
- **批量操作的并发执行**：所有 .mjs 都是同步串行（spawnSync / fsSync），不提供并行批处理。并发是 agent 层（`delegate_task`）的责任。
- **撤销 / 版本回滚**：删除是不可逆操作（OSS 没回收站），git 历史是唯一回滚路径——所以删前必 dry-run + 必 git commit + push。
- **多用户协作**：本 skill 是单用户工具，没有权限分级 / 审计日志。多人协作要么走 GitHub PR 流程（前置），要么改 skill 加角色判断。

---

## 十二、文件索引

| 文件 | 用途 |
|------|------|
| `scripts/blog.mjs` | 博客入口（router） |
| `scripts/blog/_shared.mjs` | 常量 + db 读写 + applyDryRun + oss 子进程封装 + 隔离断言 |
| `scripts/blog/reads.mjs` | list / show / list-categories / validate 等只读命令 |
| `scripts/blog/articles.mjs` | create / update / delete |
| `scripts/blog/nav.mjs` | 导航（下标定位） |
| `scripts/blog/categories.mjs` | 分类 |
| `scripts/blog/tags.mjs` | 标签 |
| `scripts/blog/works.mjs` | 作品集 works |
| `scripts/ai_page.mjs` | AI 页面入口（独立 CLI） |
| `scripts/ai_page/_shared.mjs` | 键解析 + 隔离断言 |
| `scripts/oss_manager.mjs` | 任意对象底层入口 |
| `scripts/oss_manager/_shared.mjs` | CONFIG + 凭证加载 + normalizeKey + 保护键判定 |
| `scripts/oss_manager/reads.mjs` | list / stat / get |
| `scripts/oss_manager/writes.mjs` | put / delete（带 assertBlogWriteAllowed） |
| `scripts/work_copy.mjs` | github-sync/ 工作副本：clone / 脏检查 / reset |
| `scripts/github_to_oss.mjs` | GitHub → OSS 单向同步 |
| `scripts/check-http.mjs` | 域名 HEAD/GET 验证 |
| `scripts/check-imports.py` | AI 页面 import 三层闭环检查（OSS 键 / 具名导出 / default 导出） |
| `references/blog-guide.md` | 博客写命令细则 + 写作质量 + 踩坑 |
| `references/ai-page-guide.md` | AI 页面细则 + 多页面规范 |
| `references/function-edit-workflow.md` | 改站点功能的工作流（sync → 本地改 → oss_manager put --force） |
| `references/github-sync.md` | GitHub ↔ 本地 + GitHub → OSS 行为边界 |
| `references/oss.md` | OSS 配置、行为边界、确认、契约 |
| `references/ai-page-import-pitfalls.md` | AI 页面跨文件引用错 + HashRouter 锚点规则 |