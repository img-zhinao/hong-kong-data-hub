import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TokenPackage {
  tokens: number;
  price: number;
}

export interface TokenDataset {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  industry: string;
  modality: string;
  total_tokens: number;
  price_per_1k_tokens: number;
  package_options: TokenPackage[];
  quality_score: number;
  sample_url: string | null;
  license: string | null;
  tags: string[];
  provider_name: string | null;
  status: string;
  view_count: number;
  cover_image_url: string | null;
  created_at: string;
}

export interface TokenDatasetFilters {
  industry?: string;
  modality?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const INDUSTRIES = [
  '工业制造', '现代农业', '商贸流通', '交通运输',
  '金融服务', '科技创新', '文化旅游', '医疗健康',
  '应急管理', '气象服务', '城市治理', '绿色低碳',
];

export const MODALITIES = [
  { value: 'text', label: '文本' },
  { value: 'image', label: '图像' },
  { value: 'audio', label: '音频' },
  { value: 'video', label: '视频' },
  { value: 'kg', label: '知识图谱' },
  { value: 'embodied', label: '具身交互' },
];

export const MODALITY_LABEL: Record<string, string> = MODALITIES.reduce(
  (acc, m) => ({ ...acc, [m.value]: m.label }),
  {}
);

export function useTokenDatasets(filters: TokenDatasetFilters = {}) {
  const { industry, modality, search, page = 1, pageSize = 12 } = filters;

  return useQuery({
    queryKey: ['token_datasets', { industry, modality, search, page, pageSize }],
    queryFn: async () => {
      let query = supabase
        .from('token_datasets')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (industry && industry !== 'all') query = query.eq('industry', industry);
      if (modality && modality !== 'all') query = query.eq('modality', modality);
      if (search) query = query.ilike('name', `%${search}%`);

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;
      if (error) throw error;
      return {
        datasets: (data || []) as unknown as TokenDataset[],
        totalCount: count || 0,
      };
    },
  });
}

export function useTokenDataset(slug: string | undefined) {
  return useQuery({
    queryKey: ['token_dataset', slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('token_datasets')
        .select('*')
        .eq('slug', slug!)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as TokenDataset | null;
    },
  });
}

export function useTokenDatasetStats() {
  return useQuery({
    queryKey: ['token_datasets_stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('token_datasets')
        .select('total_tokens, industry')
        .eq('status', 'published');
      if (error) throw error;
      const totalTokens = (data || []).reduce(
        (s, d: any) => s + Number(d.total_tokens || 0),
        0
      );
      const industries = new Set((data || []).map((d: any) => d.industry));
      return {
        datasetCount: data?.length || 0,
        totalTokens,
        industryCount: industries.size,
      };
    },
  });
}
