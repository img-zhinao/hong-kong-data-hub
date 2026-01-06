import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DataProduct {
  id: string;
  provider_id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  price: number | null;
  currency: string | null;
  data_format: string | null;
  data_volume: string | null;
  delivery_method: string | null;
  resource_url: string | null;
  tags: string[] | null;
  view_count: number | null;
  download_count: number | null;
  published_at: string | null;
  updated_at: string | null;
  status: string | null;
  metadata: Record<string, unknown> | null;
  // Joined from data_merchants
  provider?: {
    id: string;
    name: string;
    logo_url: string | null;
  };
}

interface UseDataProductsOptions {
  tag?: string;
  priceType?: 'all' | 'free' | 'paid';
  search?: string;
  limit?: number;
}

export function useDataProducts(options: UseDataProductsOptions = {}) {
  const { tag, priceType, search, limit } = options;

  return useQuery({
    queryKey: ['data_products', options],
    queryFn: async () => {
      let query = supabase
        .from('data_products')
        .select(`
          *,
          provider:data_merchants!provider_id (
            id,
            name,
            logo_url
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (tag && tag !== 'all') {
        query = query.contains('tags', [tag]);
      }

      if (priceType === 'free') {
        query = query.eq('price', 0);
      } else if (priceType === 'paid') {
        query = query.gt('price', 0);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,summary.ilike.%${search}%`);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as DataProduct[];
    },
  });
}

export function useDataProduct(slug: string) {
  return useQuery({
    queryKey: ['data_product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_products')
        .select(`
          *,
          provider:data_merchants!provider_id (
            id,
            name,
            logo_url
          )
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (error) throw error;
      return data as DataProduct | null;
    },
    enabled: !!slug,
  });
}
