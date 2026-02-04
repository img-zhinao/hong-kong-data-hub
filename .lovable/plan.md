

## 域名更新：从 hkbde.lovable.app 更改为 hkbde.fun

### 需要修改的文件

以下 **4 个文件** 包含旧域名配置，需要更新为 `https://hkbde.fun`：

| 文件路径 | 修改内容 |
|----------|----------|
| `src/components/SEO.tsx` | 更新 `SITE_URL` 常量 |
| `public/robots.txt` | 更新注释和 Sitemap URL |
| `public/sitemap.xml` | 更新所有页面的 `<loc>` 标签 |
| `supabase/functions/sitemap/index.ts` | 更新 `SITE_URL` 常量 |

---

### 具体修改详情

#### 1. `src/components/SEO.tsx`

```typescript
// 修改前
const SITE_URL = 'https://hkbde.lovable.app';

// 修改后
const SITE_URL = 'https://hkbde.fun';
```

#### 2. `public/robots.txt`

```text
# 修改前
# https://hkbde.lovable.app
Sitemap: https://hkbde.lovable.app/sitemap.xml
Sitemap: https://hkbde.lovable.app/functions/v1/sitemap

# 修改后
# https://hkbde.fun
Sitemap: https://hkbde.fun/sitemap.xml
Sitemap: https://hkbde.fun/functions/v1/sitemap
```

#### 3. `public/sitemap.xml`

所有 `<loc>` 标签中的 URL 都需要更改：

```xml
<!-- 修改前 -->
<loc>https://hkbde.lovable.app/</loc>
<loc>https://hkbde.lovable.app/products</loc>
...

<!-- 修改后 -->
<loc>https://hkbde.fun/</loc>
<loc>https://hkbde.fun/products</loc>
...
```

#### 4. `supabase/functions/sitemap/index.ts`

```typescript
// 修改前
const SITE_URL = 'https://hkbde.lovable.app'

// 修改后
const SITE_URL = 'https://hkbde.fun'
```

---

### 修改后的效果

| 功能 | 更新结果 |
|------|----------|
| SEO 元数据 | Open Graph 图片链接指向 `hkbde.fun` |
| JSON-LD 结构化数据 | Schema.org URL 使用 `hkbde.fun` |
| robots.txt | 爬虫将使用 `hkbde.fun` 的 Sitemap |
| 静态 sitemap.xml | 所有页面 URL 更新为 `hkbde.fun` |
| 动态 Sitemap | Edge Function 生成的 sitemap 使用 `hkbde.fun` |

---

### 域名配置提醒

更新代码后，您还需要在 Lovable 项目设置中配置自定义域名：

1. 进入项目设置 → **Domains**
2. 点击 **Connect Domain** 并输入 `hkbde.fun`
3. 在您的域名注册商处添加 DNS 记录：
   - **A 记录**（根域名）：`@` → `185.158.133.1`
   - **A 记录**（www 子域名）：`www` → `185.158.133.1`
   - **TXT 记录**：`_lovable` → Lovable 提供的验证码

