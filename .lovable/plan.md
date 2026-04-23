## 多语言（中文 / 英语 / 阿拉伯语）支持

### 范围
- **翻译对象**：UI 框架静态文案 —— 导航、页脚、按钮、表单 label、页面标题/副标题、空状态提示、Toast 文案。
- **不翻译**：数据库内容（文章、政策、数据集、活动等）保持原中文显示。
- **布局**：阿拉伯语保持 LTR，仅切换文字内容。

### 一、技术方案

引入 `react-i18next` + `i18next` + `i18next-browser-languagedetector`：
- 业界标准、生态完善，支持命名空间、插值、复数。
- 自动从 `localStorage` / 浏览器语言检测首选语言。

### 二、文件结构

```
src/i18n/
  index.ts              # i18n 初始化
  locales/
    zh.json             # 中文（基准）
    en.json             # 英文
    ar.json             # 阿拉伯语
src/components/
  LanguageSwitcher.tsx  # 语言下拉切换器（替换 Header 里的"English"）
```

### 三、翻译 key 组织（命名空间扁平结构）

```json
{
  "nav": { "home": "首页", "products": "数据产品", "tokenHub": "Token Hub", ... },
  "common": { "search": "搜索", "login": "登录 / 注册", "logout": "登出", "loading": "加载中...", ... },
  "footer": { "about": "关于我们", "contact": "联系方式", ... },
  "auth": { "signIn": "登录", "signUp": "注册", "email": "邮箱", "password": "密码", ... },
  "home": { "heroTitle": "...", "heroSubtitle": "...", ... },
  "tokenHub": { "title": "...", "addToCart": "加入购物车", ... },
  "openclaw": { ... },
  "news": { ... },
  "policy": { ... },
  ...（每个页面一个命名空间）
}
```

阿拉伯语和英语翻译由 AI 一次性生成（基于中文 zh.json 一对一翻译），后续可在 json 里手工微调。

### 四、改造范围（约 25-30 个文件）

| 文件 | 改动 |
|------|------|
| `src/main.tsx` | import './i18n' 初始化 |
| `src/i18n/index.ts` + 3 个 json | 新建 |
| `src/components/LanguageSwitcher.tsx` | 新建：下拉显示 中文 / English / العربية，点击 `i18n.changeLanguage()` 并写入 localStorage |
| `src/components/layout/Header.tsx` | 删除静态 "English"，接入 `LanguageSwitcher`；导航项改用 `t('nav.xxx')` |
| `src/components/layout/Footer.tsx` | `t('footer.xxx')` |
| `src/components/home/*.tsx`（6 个） | 首页各 section 静态文案 → `t()` |
| `src/pages/AuthPage.tsx` | 表单 label/按钮/校验提示 → `t()` |
| 其他 page 顶部静态标题/描述（NewsPage, PolicyPage, EventsPage, AboutPage, OpenClawPage, TokenHubPage 等） | 标题、副标题、tab 名、空态文本 → `t()` |
| `src/components/SEO.tsx` | 默认 title/description 支持当前语言变体 |
| `index.html` | `<html lang="zh-CN">` 由 i18n 在 `i18n.on('languageChanged')` 钩子里动态更新 |

文章详情页、产品详情页、Admin 页面这类**内容主体来自数据库**的页面，仅翻译外壳（"返回列表"、"发布于"、"阅读全文"等按钮文案），正文不动。

### 五、语言切换器 UI

Header 右上角，下拉样式（替换现在的"English"文本）：

```
🌐 中文  ▾
   ├─ 中文
   ├─ English
   └─ العربية
```

- 当前语言高亮
- 选择后立即生效（无需刷新），同时持久化到 localStorage
- 移动端菜单底部也加入同款切换器

### 六、SEO 兼容

- canonical 仍指向 `hkbde.fun`（不分语言版本，因翻译只在客户端生效，URL 不变）
- `<html lang>` 跟随当前语言动态切换，便于无障碍和搜索引擎识别

### 七、不在本次范围

- 数据库内容多语言（文章/政策/数据集翻译）
- URL 路径加语言前缀（`/en/news`）—— 无 SEO 多语言需求时无必要
- RTL 布局
- AI 实时翻译

如果未来需要数据库内容翻译，可在 Phase 2 引入 Edge Function + AI Gateway 做按需翻译并缓存。
