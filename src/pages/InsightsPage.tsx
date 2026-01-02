import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Lightbulb, Quote, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useInsights } from '@/hooks/useInsights';
import { formatDate } from '@/lib/formatters';
import { Skeleton } from '@/components/ui/skeleton';

const topics = ['全部', '数据要素市场化', 'AI与数据', '数据资产化', '跨境数据流通', '隐私计算'];

export default function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('全部');

  const { data: insights, isLoading } = useInsights({
    topic: selectedTopic === '全部' ? undefined : selectedTopic,
    search: searchTerm || undefined,
  });

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary-foreground">专家观点</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            汇集行业领袖、学术专家的深度见解与前沿洞察
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Search & Topics */}
        <div className="mb-8">
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="搜索专家观点..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTopic === topic 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border">
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-28 mb-2" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/5 mb-4" />
                <div className="flex justify-between pt-4 border-t">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))
          ) : insights && insights.length > 0 ? (
            insights.map((insight, index) => (
              <Link
                key={insight.id}
                to={`/insights/${insight.id}`}
                className="bg-card rounded-xl p-6 border hover-lift group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={insight.author_avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                    alt={insight.author_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {insight.author_name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{insight.author_role}</p>
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <Quote className="absolute -left-1 -top-1 w-8 h-8 text-primary/10" />
                  <p className="text-muted-foreground leading-relaxed pl-6 italic">
                    "{insight.quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="tag tag-insight">{insight.topic}</span>
                  <span className="text-sm text-muted-foreground">{formatDate(insight.created_at)}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-muted-foreground">
              暂无相关专家观点
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
