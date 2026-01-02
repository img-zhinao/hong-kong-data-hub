import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Clock, Eye, Newspaper, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useArticles, type Article } from '@/hooks/useArticles';
import { formatDate } from '@/lib/formatters';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('all');

  const { data: allNews, isLoading: loadingAll } = useArticles({
    category: 'news',
    search: searchTerm || undefined,
  });

  const { data: exchangeNews, isLoading: loadingExchange } = useArticles({
    category: 'news',
    subCategory: 'exchange',
    search: searchTerm || undefined,
  });

  const { data: industryNews, isLoading: loadingIndustry } = useArticles({
    category: 'news',
    subCategory: 'industry',
    search: searchTerm || undefined,
  });

  const { data: enterpriseNews, isLoading: loadingEnterprise } = useArticles({
    category: 'news',
    subCategory: 'enterprise',
    search: searchTerm || undefined,
  });

  const { data: hotNews } = useArticles({
    category: 'news',
    limit: 5,
    orderBy: 'view_count',
  });

  const getNewsForTab = () => {
    switch (currentTab) {
      case 'exchange': return { data: exchangeNews, loading: loadingExchange };
      case 'industry': return { data: industryNews, loading: loadingIndustry };
      case 'enterprise': return { data: enterpriseNews, loading: loadingEnterprise };
      default: return { data: allNews, loading: loadingAll };
    }
  };

  const { data: currentNews, loading: currentLoading } = getNewsForTab();

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary-foreground">行业动态</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            实时追踪全球及国内数据交易机构的最新进展，把握行业发展脉搏
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="搜索新闻资讯..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Tabs */}
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="exchange">数交所动态</TabsTrigger>
                <TabsTrigger value="industry">行业资讯</TabsTrigger>
                <TabsTrigger value="enterprise">企业快讯</TabsTrigger>
              </TabsList>

              <div className="mt-6 space-y-4">
                {currentLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="news-card flex gap-4 p-4">
                      <Skeleton className="hidden sm:block w-40 h-28 rounded-lg" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))
                ) : currentNews && currentNews.length > 0 ? (
                  currentNews.map((news, index) => (
                    <NewsCard key={news.id} news={news} index={index} />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    暂无相关资讯
                  </div>
                )}
              </div>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Hot News */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                热门资讯
              </h3>
              <ul className="space-y-3">
                {hotNews?.slice(0, 5).map((news, index) => (
                  <li key={news.id}>
                    <Link
                      to={`/news/${news.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className={`flex-shrink-0 w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${
                        index < 3 ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {news.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="font-semibold mb-4">快速入口</h3>
              <div className="space-y-2">
                <Link to="/policy">
                  <Button variant="outline" className="w-full justify-start">
                    政策法规
                  </Button>
                </Link>
                <Link to="/insights">
                  <Button variant="outline" className="w-full justify-start">
                    专家观点
                  </Button>
                </Link>
                <Link to="/data-merchants">
                  <Button variant="outline" className="w-full justify-start">
                    数商生态
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

interface NewsCardProps {
  news: Article;
  index: number;
}

function NewsCard({ news, index }: NewsCardProps) {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="news-card flex gap-4 p-4 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
    >
      {news.cover_image_url && (
        <div className="hidden sm:block w-40 h-28 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={news.cover_image_url}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
          {news.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {news.summary}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(news.published_at)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {(news.view_count || 0).toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
