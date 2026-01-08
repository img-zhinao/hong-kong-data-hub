import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Article = Tables<'articles'>;

interface UseArticlesOptions {
  category?: string;
  subCategory?: string;
  status?: string;
  limit?: number;
  orderBy?: 'published_at' | 'view_count' | 'created_at';
  search?: string;
}

export function useArticles(options: UseArticlesOptions = {}) {
  const { category, subCategory, status = 'published', limit, orderBy = 'published_at', search } = options;

  return useQuery({
    queryKey: ['articles', options],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select('*')
        .eq('status', status)
        .order(orderBy, { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      if (subCategory) {
        query = query.eq('sub_category', subCategory);
      }

      if (search) {
        query = query.ilike('title', `%${search}%`);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Article[];
    },
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as Article | null;
    },
    enabled: !!slug,
  });
}

export function useIncrementViewCount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articleId: string) => {
      // Validate UUID format to prevent injection
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(articleId)) {
        throw new Error('Invalid article ID format');
      }
      
      // Use SECURITY DEFINER RPC function to increment view count
      // This allows all users (including anonymous) to increment view counts
      const { error } = await supabase.rpc('increment_article_view_count', { 
        article_id: articleId 
      });
      
      if (error) {
        console.error('View count increment failed:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}
