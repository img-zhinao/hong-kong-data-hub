import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type PlatformStat = Tables<'platform_stats'>;

export function usePlatformStats() {
  return useQuery({
    queryKey: ['platform_stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('platform_stats')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      return data as PlatformStat[];
    },
  });
}
