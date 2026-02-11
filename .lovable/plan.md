

## 文章页面动态子分类标签

### 概述

为所有使用 `articles` 表的页面添加基于数据库 `sub_category` 字段的动态子分类标签筛选，替换当前的硬编码分类。

### 当前数据库中的子分类

| category | sub_category 值 |
|----------|-----------------|
| news | exchange, industry, enterprise, 行业资讯, 企业快讯 |
| policy | 国家政策, 地方政策, 香港政策, 行业标准 |

### 需要修改的文件

| 文件 | 修改内容 |
|------|----------|
| `src/hooks/useArticles.ts` | 新增 `useArticleSubCategories` hook，动态查询指定 category 下的所有 sub_category |
| `src/pages/NewsPage.tsx` | 用动态 hook 替换硬编码的 4 个 tab，统一查询逻辑 |
| `src/pages/PolicyPage.tsx` | 用动态 hook 替换硬编码的 `categories` 数组 |

### 技术细节

#### 1. 新增 `useArticleSubCategories` hook（在 `useArticles.ts` 中）

从数据库查询指定 category 下所有 distinct 的 sub_category 值：

```typescript
export function useArticleSubCategories(category: string) {
  return useQuery({
    queryKey: ['article-sub-categories', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('sub_category')
        .eq('category', category)
        .eq('status', 'published')
        .not('sub_category', 'is', null);
      if (error) throw error;
      const unique = [...new Set(data.map(d => d.sub_category).filter(Boolean))];
      return unique as string[];
    },
    enabled: !!category,
  });
}
```

#### 2. 改造 `NewsPage.tsx`

- 移除 4 个独立的 `useArticles` 调用（allNews, exchangeNews, industryNews, enterpriseNews）
- 使用 `useArticleSubCategories('news')` 动态获取子分类列表
- 使用单个 `useArticles` 调用，根据当前选中的 tab 传入 `subCategory` 参数
- Tab 列表动态渲染：`['全部', ...subCategories]`

#### 3. 改造 `PolicyPage.tsx`

- 移除硬编码的 `categories` 数组
- 使用 `useArticleSubCategories('policy')` 动态获取子分类
- 按钮列表改为动态渲染

### 改造后的效果

- 在数据库中新增文章并设置新的 sub_category 时，前端自动出现对应的筛选标签
- 无需修改代码即可扩展分类
- 减少不必要的并行查询（NewsPage 从 4 个查询减少为 2 个）
