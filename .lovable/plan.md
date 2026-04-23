## 在 GEO 文件中加入新域名 hkbde.net

新域名 `hkbde.net`（及 `www.hkbde.net`）已申请并解析。需要在所有面向搜索引擎与 AI 爬虫的 GEO 文件中将其登记为站点的备用域名 / sameAs，便于 Google、Baidu、AI 爬虫识别同一品牌的多域名归属。

### 主域策略
- **主域 (canonical)**：保持 `https://hkbde.fun`（GSC 已验证、sitemap 已收录，避免短期内主域漂移导致排名波动）
- **备用域 (alternate / sameAs)**：`https://hkbde.net`、`https://www.hkbde.net`

### 修改清单

| 文件 | 变更 |
|------|------|
| `index.html` | Organization JSON-LD 增加 `sameAs: ['https://hkbde.net','https://www.hkbde.net']`；WebSite JSON-LD 同步加 `sameAs`；保持 `og:url` 与 canonical 仍指向 hkbde.fun |
| `public/llms.txt` | "网站信息"区块加："官方网址（备用）: https://hkbde.net" |
| `supabase/functions/llms-txt/index.ts` | 同步动态版加备用域行 |
| `public/robots.txt` | 顶部注释加 "Mirror domains: https://hkbde.net" |
| `public/sitemap.xml` | 不复制一份新 URL（避免重复内容），仅在头部注释说明备用域 |
| `supabase/functions/sitemap/index.ts` | 同上，注释说明 |

### 不修改的内容
- `src/components/SEO.tsx` 与各页面的 `canonicalUrl`：继续使用 `hkbde.fun`，避免 GSC 中产生新的"备用网页"问题
- `meta property="og:url"`：保持 hkbde.fun
- 各页面的 `<link rel="canonical">`：保持 hkbde.fun

### 后续运维提醒（不在本次代码改动内）
1. 在域名服务商把 `hkbde.net` 与 `www.hkbde.net` 通过 301 永久重定向到 `https://hkbde.fun`（推荐做法），或在 Lovable Project Settings → Domains 里把 hkbde.net 也加进来并设 hkbde.fun 为 Primary
2. 在 Google Search Console 单独添加 `hkbde.net` 资源并验证，提交相同 sitemap
3. 如未来要切换主域到 hkbde.net，再统一替换全站 canonical 与 og:url
