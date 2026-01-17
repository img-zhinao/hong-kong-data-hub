import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { subDays } from 'date-fns';

export interface ProjectTender {
  id: string;
  external_id: string;
  title: string;
  description: string | null;
  country: string | null;
  publish_date: string | null;
  original_url: string | null;
  source_platform: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

interface UseProjectTendersOptions {
  search?: string;
  sourcePlatforms?: string[];
  dateRange?: 'all' | '3days' | '1week' | '1month';
}

function getDateThreshold(range: string): Date | null {
  const now = new Date();
  switch (range) {
    case '3days':
      return subDays(now, 3);
    case '1week':
      return subDays(now, 7);
    case '1month':
      return subDays(now, 30);
    default:
      return null;
  }
}

export function useProjectTenders(options: UseProjectTendersOptions = {}) {
  const { search, sourcePlatforms, dateRange = 'all' } = options;

  return useQuery({
    queryKey: ['project_tenders', options],
    queryFn: async () => {
      let query = supabase
        .from('project_tenders')
        .select('*')
        .order('publish_date', { ascending: false, nullsFirst: false });

      // Search filter
      if (search && search.trim()) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // Source platform filter
      if (sourcePlatforms && sourcePlatforms.length > 0) {
        const platformFilters = sourcePlatforms.map(p => `source_platform.ilike.%${p}%`).join(',');
        query = query.or(platformFilters);
      }

      // Date range filter
      const dateThreshold = getDateThreshold(dateRange);
      if (dateThreshold) {
        query = query.gte('publish_date', dateThreshold.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as ProjectTender[];
    },
  });
}
