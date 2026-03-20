

## 新闻页面分页 — 每页 10 条

### 方案

在 `useArticles` hook 增加分页支持（`page` + `pageSize` 参数，使用 Supabase `range()` + `count`），然后在 `NewsPage` 添加分页控件。

### 修改文件

| 文件 | 变更 |
|------|------|
| `src/hooks/useArticles.ts` | `useArticles` 新增 `page`/`pageSize` 参数，查询使用 `select('*', { count: 'exact' })` + `.range(from, to)`，返回 `{ data, totalCount }` |
| `src/pages/NewsPage.tsx` | 添加 `currentPage` state（切换 tab/搜索时重置为 1），传入 `page: currentPage, pageSize: 10`，底部使用 Pagination 组件显示页码 |

### 关键实现

**useArticles 返回结构变更**：
```typescript
// 返回 { articles: Article[], totalCount: number }
// 使用 .select('*', { count: 'exact' }).range(from, to)
```

**NewsPage 分页逻辑**：
- `currentPage` state，tab 切换和搜索时重置为 1
- 传 `page` 和 `pageSize: 10` 给 hook
- 列表下方渲染 `Pagination` 组件（已有 `src/components/ui/pagination.tsx`）
- 显示总条数和当前页范围

