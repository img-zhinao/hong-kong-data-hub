import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Insight {
  id: string;
  author_name: string;
  author_role: string | null;
  author_avatar_url: string | null;
  quote: string;
  topic: string | null;
  tags: string[] | null;
  status: string | null;
  display_order: number | null;
  view_count: number | null;
  created_at: string | null;
  updated_at: string | null;
}

interface UseInsightsOptions {
  limit?: number;
  topic?: string;
  search?: string;
}

export function useInsights(options: UseInsightsOptions = {}) {
  const { limit, topic, search } = options;

  return useQuery({
    queryKey: ['insights', options],
    queryFn: async () => {
      let query = supabase
        .from('insights')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      if (topic) {
        query = query.eq('topic', topic);
      }

      if (search) {
        query = query.or(`author_name.ilike.%${search}%,quote.ilike.%${search}%`);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Insight[];
    },
  });
}

export function useInsight(id: string) {
  return useQuery({
    queryKey: ['insight', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Insight | null;
    },
    enabled: !!id,
  });
}
