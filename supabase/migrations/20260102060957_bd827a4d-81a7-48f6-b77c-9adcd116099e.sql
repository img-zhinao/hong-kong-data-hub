-- Create insights table for expert opinions
CREATE TABLE public.insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_avatar_url TEXT,
  quote TEXT NOT NULL,
  topic TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'published',
  display_order INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Enable read access for all users" 
ON public.insights 
FOR SELECT 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_insights_status ON public.insights(status);
CREATE INDEX idx_insights_display_order ON public.insights(display_order);

-- Add some sample data
INSERT INTO public.insights (author_name, author_role, author_avatar_url, quote, topic, tags) VALUES
('李明教授', '香港科技大学数据科学研究院院长', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', '数据要素市场化配置是推动数字经济高质量发展的关键举措，香港凭借其独特的区位优势和制度优势，将在大湾区数据要素流通中发挥不可替代的作用。', '数据要素市场化', ARRAY['数据要素', '大湾区', '数字经济']),
('张伟博士', '香港大数据协会会长', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', 'AI大模型的发展离不开高质量数据集的支撑，香港作为国际数据枢纽，在跨境数据流动和数据合规方面具有天然优势。', 'AI与数据', ARRAY['AI', '数据集', '跨境数据']),
('王芳女士', '数据资产评估专家', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', '数据资产入表是企业数字化转型的重要里程碑，它不仅是财务处理的创新，更是对企业数据治理能力的全面检验。', '数据资产化', ARRAY['数据资产', '入表', '数字化转型']);