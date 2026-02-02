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
