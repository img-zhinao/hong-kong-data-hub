import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type DataMerchant = Tables<'data_merchants'>;

interface UseDataMerchantsOptions {
  serviceType?: string;
  limit?: number;
  search?: string;
}

export function useDataMerchants(options: UseDataMerchantsOptions = {}) {
  const { serviceType, limit, search } = options;

  return useQuery({
    queryKey: ['data_merchants', options],
    queryFn: async () => {
      let query = supabase
        .from('data_merchants')
        .select('*')
        .order('display_order', { ascending: true });

      if (serviceType && serviceType !== 'all') {
        query = query.eq('service_type', serviceType);
      }

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as DataMerchant[];
    },
  });
}

export function useDataMerchant(id: string) {
  return useQuery({
    queryKey: ['data_merchant', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_merchants')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as DataMerchant | null;
    },
    enabled: !!id,
  });
}
