-- Add geo_metadata column to platform_stats for storing daily change data
ALTER TABLE public.platform_stats
ADD COLUMN IF NOT EXISTS geo_metadata jsonb DEFAULT '{}'::jsonb;