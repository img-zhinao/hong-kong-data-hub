

## 更新 Supabase URL 为自定义域名

### 概述

将 Supabase 客户端的连接 URL 从默认的 `https://otsowcnwqsduapurqnjb.supabase.co` 更改为您的自定义域名 `https://db.hkbde.fun`。

### 需要修改的文件

| 文件路径 | 修改内容 |
|----------|----------|
| `src/integrations/supabase/client.ts` | 更新 `SUPABASE_URL` 常量 |

### 具体修改

#### `src/integrations/supabase/client.ts`

```typescript
// 修改前
const SUPABASE_URL = "https://otsowcnwqsduapurqnjb.supabase.co";

// 修改后
const SUPABASE_URL = "https://db.hkbde.fun";
```

其余代码（anon key、auth 配置等）保持不变。

### 前提条件

在修改代码之前，请确认您已在 Supabase 项目设置中完成自定义域名配置：

1. 在 Supabase Dashboard → **Settings** → **Custom Domains** 中添加 `db.hkbde.fun`
2. 在域名注册商处添加 Supabase 要求的 **CNAME** 记录，将 `db.hkbde.fun` 指向 Supabase 提供的目标地址
3. 等待 DNS 生效并通过 Supabase 的域名验证

如果自定义域名尚未在 Supabase 端完成配置和验证，更改 URL 后应用将无法连接到数据库。

### 修改后的效果

- 所有前端 API 请求将通过 `https://db.hkbde.fun` 访问 Supabase
- 用户浏览器中不再暴露默认的 Supabase 项目 URL
- 品牌一致性更好，URL 更简洁

