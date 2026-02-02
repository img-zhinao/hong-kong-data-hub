

## 统计"已发布文章"和"举办活动"并动态显示

### 问题分析

当前 `platform_stats` 表中的数据：
| metric_key | label | metric_value |
|------------|-------|--------------|
| total_articles | 已发布文章 | 0 |
| total_events | 举办活动 | 0 |

实际数据库数据：
- `articles` 表中有 **153** 篇已发布文章
- `events` 表中有 **2** 个活动

### 解决方案

有两种实现方式：

---

### 方案 A：前端直接查询（推荐）

修改 `usePlatformStats` hook，在获取 `platform_stats` 数据后，动态查询 `articles` 和 `events` 表的实际数量，并覆盖对应的统计值。

**修改文件：** `src/hooks/usePlatformStats.ts`

```text
实现逻辑：
1. 查询 platform_stats 表获取基础数据
2. 并行查询 articles 表的已发布文章数量
3. 并行查询 events 表的活动数量
4. 将实际数量合并到 platform_stats 数据中返回
```

**优点：**
- 实时准确，数据始终是最新的
- 无需维护数据库触发器
- 实现简单

---

### 方案 B：数据库触发器自动更新

创建数据库触发器，在 `articles` 或 `events` 表有数据变化时自动更新 `platform_stats` 表。

**优点：**
- 减少前端查询次数
- 统计逻辑集中在数据库

**缺点：**
- 需要创建和维护触发器
- 数据可能存在短暂延迟

---

### 推荐实施：方案 A

#### 修改 `src/hooks/usePlatformStats.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type PlatformStat = Tables<'platform_stats'>;

export function usePlatformStats() {
  return useQuery({
    queryKey: ['platform_stats'],
    queryFn: async () => {
      // 并行查询所有数据
      const [statsResult, articlesResult, eventsResult] = await Promise.all([
        supabase.from('platform_stats').select('*').order('id', { ascending: true }),
        supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('events').select('id', { count: 'exact', head: true }),
      ]);

      if (statsResult.error) throw statsResult.error;

      const stats = statsResult.data as PlatformStat[];
      const articlesCount = articlesResult.count ?? 0;
      const eventsCount = eventsResult.count ?? 0;

      // 用实际数量覆盖静态值
      return stats.map(stat => {
        if (stat.metric_key === 'total_articles') {
          return { ...stat, metric_value: articlesCount };
        }
        if (stat.metric_key === 'total_events') {
          return { ...stat, metric_value: eventsCount };
        }
        return stat;
      });
    },
  });
}
```

### 预期效果

修改后，首页统计区域将显示：

| 指标 | 修改前 | 修改后 |
|------|--------|--------|
| 已发布文章 | 0 | 153 |
| 举办活动 | 0 | 2 |

数据将实时从数据库统计，每次页面加载时自动更新。

