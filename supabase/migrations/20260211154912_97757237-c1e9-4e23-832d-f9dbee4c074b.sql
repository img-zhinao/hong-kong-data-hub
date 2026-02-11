-- Rename exchange to 数交所动态
UPDATE public.articles SET sub_category = '数交所动态' WHERE category = 'news' AND sub_category = 'exchange';

-- Merge industry into 行业资讯
UPDATE public.articles SET sub_category = '行业资讯' WHERE category = 'news' AND sub_category = 'industry';

-- Merge enterprise into 企业快讯
UPDATE public.articles SET sub_category = '企业快讯' WHERE category = 'news' AND sub_category = 'enterprise';