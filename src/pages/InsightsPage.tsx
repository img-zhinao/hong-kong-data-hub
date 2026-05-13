import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Lightbulb, Quote, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useInsights, type Insight } from '@/hooks/useInsights';
import { formatDate } from '@/lib/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import { SEO } from '@/components/SEO';
import { getResponsiveImage } from '@/lib/responsiveImage';

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
      <SEO
        title="专家观点"
        description="汇集行业领袖、学术专家的深度见解与前沿洞察，涵盖数据要素市场化、AI与数据、数据资产化、跨境数据流通等热门话题。"
        keywords="专家观点,行业洞察,数据要素观点,AI与数据,数据资产化,跨境数据流通"
        canonicalUrl="https://hkbde.fun/insights"
        itemList={insights?.slice(0, 20).map((it, i) => ({
          name: it.author_name,
          url: `/insights/${it.id}`,
          position: i + 1,
        }))}
      />
      
      {/* Page Header */}
      <header className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-primary-foreground">专家观点</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            汇集行业领袖、学术专家的深度见解与前沿洞察
          </p>
        </div>
      </header>

      <main className="container py-8">
        {/* Search & Topics */}
        <div className="mb-8">
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input 
              placeholder="搜索专家观点..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="搜索专家观点"
            />
          </div>
          <nav aria-label="话题筛选">
            <ul className="flex flex-wrap gap-2" role="list">
              {topics.map((topic) => (
                <li key={topic}>
                  <button
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedTopic === topic 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Insights Grid */}
        <section aria-label="专家观点列表">
          <ul className="grid md:grid-cols-2 gap-6" role="list">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="bg-card rounded-xl p-6 border">
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
                </li>
              ))
            ) : insights && insights.length > 0 ? (
              insights.map((insight, index) => (
                <InsightCard key={insight.id} insight={insight} index={index} />
              ))
            ) : (
              <li className="col-span-2 text-center py-12 text-muted-foreground">
                暂无相关专家观点
              </li>
            )}
          </ul>
        </section>
      </main>
    </Layout>
  );
}

interface InsightCardProps {
  insight: Insight;
  index: number;
}

function InsightCard({ insight, index }: InsightCardProps) {
  return (
    <li>
      <article>
        <Link
          to={`/insights/${insight.id}`}
          className="block bg-card rounded-xl p-6 border hover-lift group animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
        >
          <header className="flex items-center gap-4 mb-4">
            <figure>
              <img
                src={insight.author_avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                alt=""
                loading="lazy"
                decoding="async"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover"
              />
            </figure>
            <div>
              <h2 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {insight.author_name}
              </h2>
              <p className="text-sm text-muted-foreground">{insight.author_role}</p>
            </div>
          </header>
          
          <blockquote className="relative mb-4">
            <Quote className="absolute -left-1 -top-1 w-8 h-8 text-primary/10" aria-hidden="true" />
            <p className="text-muted-foreground leading-relaxed pl-6 italic">
              "{insight.quote}"
            </p>
          </blockquote>

          <footer className="flex items-center justify-between pt-4 border-t">
            <span className="tag tag-insight">{insight.topic}</span>
            <time dateTime={insight.created_at || undefined} className="text-sm text-muted-foreground">
              {formatDate(insight.created_at)}
            </time>
          </footer>
        </Link>
      </article>
    </li>
  );
}
