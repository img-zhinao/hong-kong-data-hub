-- Create a SECURITY DEFINER function to safely increment article view counts
-- This allows anonymous and authenticated users to increment view counts
-- without needing UPDATE permissions on the articles table

CREATE OR REPLACE FUNCTION public.increment_article_view_count(article_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only increment for published articles
  UPDATE articles
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = article_id 
    AND status = 'published';
END;
$$;

-- Grant execute to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.increment_article_view_count(UUID) TO anon, authenticated;