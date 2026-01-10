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
  category?: string;
  priceType?: 'all' | 'free' | 'paid';
  search?: string;
  limit?: number;
  sortBy?: 'published_at' | 'price' | 'view_count';
  sortOrder?: 'asc' | 'desc';
}

export function useDataProducts(options: UseDataProductsOptions = {}) {
  const { category, priceType, search, limit, sortBy = 'published_at', sortOrder = 'desc' } = options;

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
        .eq('status', 'published');

      // Build OR conditions for filters (category, priceType, search)
      const orConditions: string[] = [];

      if (category) {
        orConditions.push(`category.eq.${category}`);
      }

      if (priceType === 'free') {
        orConditions.push('price.eq.0');
      } else if (priceType === 'paid') {
        orConditions.push('price.gt.0');
      }

      if (search) {
        orConditions.push(`title.ilike.%${search}%`);
        orConditions.push(`summary.ilike.%${search}%`);
      }

      // Apply OR conditions if any exist
      if (orConditions.length > 0) {
        query = query.or(orConditions.join(','));
      }

      // Apply sorting
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

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
