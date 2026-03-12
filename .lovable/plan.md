

## GEO 全面优化方案

本方案涵盖 8 项优化任务，提升网站对 AI 搜索引擎和传统搜索引擎的可见性。

---

### 1. 修复 llms-txt Edge Function

当前 Edge Function 可能返回 HTML 错误页面。重新部署并验证返回 `Content-Type: text/plain`。

### 2. 更新静态 `public/llms.txt`

补充更多结构化信息：核心服务详细描述、平台统计数据、行业分类列表，增强事实密度。

### 3. 添加 Schema.org 结构化标记

**`index.html`** — 添加全局 Organization + WebSite JSON-LD：
```json
{
  "@type": "Organization",
  "name": "香港大数据交易所",
  "url": "https://hkbde.fun",
  "logo": "...",
  "contactPoint": { "telephone": "+852 3749 9968" },
  "sameAs": []
}
```

**`SEO.tsx`** — 已有基础 JSON-LD，增强为：
- 首页：Organization + WebSite（含 SearchAction）
- 文章页：Article 标记（已有，保持）
- 产品页：Product 标记（新增）

**`ProductDetailPage.tsx`** — 添加 Product JSON-LD：
```json
{
  "@type": "Product",
  "name": "...",
  "description": "...",
  "offers": { "@type": "Offer", "price": "...", "priceCurrency": "HKD" }
}
```

### 4. 优化 Meta 标签

**`index.html`**：
- 补充 `og:url`、`og:locale`、`og:site_name`
- 补充 `twitter:card`、`twitter:site`
- OG image 使用完整 URL

**`SEO.tsx`**：
- 添加 `og:url`（基于当前路由）
- 已有完善的 OG/Twitter 标签，保持

**`ProductDetailPage.tsx`**：
- 添加 `<SEO>` 组件（当前缺失）

### 5. 添加 noscript 兜底内容

**`index.html`**：
```html
<noscript>
  <div>
    <h1>香港大数据交易所 (HKBDE)</h1>
    <p>香港领先的数据要素市场基础设施...</p>
    <nav>
      <a href="/products">数据产品</a>
      <a href="/news">行业动态</a>
      ...
    </nav>
    <p>联系电话: +852 3749 9968</p>
    <p>地址: Room 815, 8/F., Star House...</p>
  </div>
</noscript>
```

### 6. 数据产品页面结构化标记

**`ProductDetailPage.tsx`**：
- 引入 `<SEO>` 组件，设置 title/description/ogType="product"
- 添加 Product JSON-LD（含 offers、provider/brand）
- 使用语义化 HTML（`<article>`、`<header>`、`<section>`）

**`ProductsPage.tsx`**：
- 添加 ItemList JSON-LD，列出所有产品

### 7. 文章系统优化

**`ArticleDetailPage.tsx`**：
- 已有良好的语义 HTML 和 Article JSON-LD
- 补充 `BreadcrumbList` JSON-LD 结构化标记
- 确保 `datePublished`/`dateModified` 格式为 ISO 8601

### 8. 补充统计数据提高事实密度

**`public/llms.txt`** + **Edge Function**：
- 添加平台统计数据（从 `platform_stats` 表动态获取）
- 补充行业分类完整列表
- 添加数据商数量、产品数量等关键数字

---

### 修改文件清单

| 文件 | 变更 |
|------|------|
| `index.html` | Organization/WebSite JSON-LD + OG 完善 + noscript |
| `src/components/SEO.tsx` | 增强 JSON-LD 支持多类型 |
| `src/pages/ProductDetailPage.tsx` | 添加 SEO 组件 + Product JSON-LD |
| `src/pages/ProductsPage.tsx` | 添加 ItemList JSON-LD |
| `src/pages/ArticleDetailPage.tsx` | 添加 BreadcrumbList JSON-LD |
| `public/llms.txt` | 补充统计数据和行业分类 |
| `supabase/functions/llms-txt/index.ts` | 添加 platform_stats 查询 + 增强内容 |
| `public/robots.txt` | 确认 llms.txt 引用路径完整 |

