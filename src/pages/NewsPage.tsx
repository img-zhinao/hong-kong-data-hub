import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Clock, Eye, Newspaper, Search, TrendingUp } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useArticles, useArticleSubCategories, type Article } from '@/hooks/useArticles';
import { formatDate } from '@/lib/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import { SEO } from '@/components/SEO';

export default function NewsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const tabFromUrl = searchParams.get('tab') || 'all';
  const [currentTab, setCurrentTab] = useState(tabFromUrl);

  const { data: subCategories = [] } = useArticleSubCategories('news');

  useEffect(() => {
    setCurrentTab(tabFromUrl);
  }, [tabFromUrl]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ tab: value });
    }
  };

  const { data: currentNews, isLoading: currentLoading } = useArticles({
    category: 'news',
    subCategory: currentTab === 'all' ? undefined : currentTab,
    search: searchTerm || undefined,
  });

  const { data: hotNews } = useArticles({
    category: 'news',
    limit: 5,
    orderBy: 'view_count',
  });

  return (
    <Layout>
      <SEO
        title="行业动态"
        description="实时追踪全球及国内数据交易机构的最新进展，把握数据要素行业发展脉搏，了解数交所动态、行业资讯和企业快讯。"
        keywords="数据交易新闻,行业动态,数交所动态,数据要素资讯,大数据行业新闻"
      />
      
      {/* Page Header */}
      <header className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-primary-foreground">行业动态</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            实时追踪全球及国内数据交易机构的最新进展，把握行业发展脉搏
          </p>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <section className="flex-1" aria-label="新闻列表">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Input 
                placeholder="搜索新闻资讯..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="搜索新闻"
              />
            </div>

            {/* Tabs */}
            <Tabs value={currentTab} onValueChange={handleTabChange} className="mb-6">
              <TabsList className="w-full h-auto bg-muted/40 rounded-lg p-1 grid" style={{ gridTemplateColumns: `repeat(${subCategories.length + 1}, 1fr)` }}>
                <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:border data-[state=active]:border-border data-[state=active]:shadow-none rounded-md py-2 text-sm">全部</TabsTrigger>
                {subCategories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-background data-[state=active]:border data-[state=active]:border-border data-[state=active]:shadow-none rounded-md py-2 text-sm">{cat}</TabsTrigger>
                ))}
              </TabsList>

              <ul className="mt-6 space-y-4" role="list">
                {currentLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <li key={i} className="news-card flex gap-4 p-4">
                      <Skeleton className="hidden sm:block w-40 h-28 rounded-lg" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </li>
                  ))
                ) : currentNews && currentNews.length > 0 ? (
                  currentNews.map((news, index) => (
                    <NewsCard key={news.id} news={news} index={index} />
                  ))
                ) : (
                  <li className="text-center py-12 text-muted-foreground">
                    暂无相关资讯
                  </li>
                )}
              </ul>
            </Tabs>
          </section>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6" aria-label="侧边栏">
            {/* Hot News */}
            <nav className="bg-card rounded-xl border p-6" aria-label="热门资讯">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />
                热门资讯
              </h2>
              <ol className="space-y-3" role="list">
                {hotNews?.slice(0, 5).map((news, index) => (
                  <li key={news.id}>
                    <Link
                      to={`/news/${news.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className={`flex-shrink-0 w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${
                        index < 3 ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                      }`} aria-label={`排名第${index + 1}`}>
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {news.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Quick Links */}
            <nav className="bg-muted/30 rounded-xl p-6" aria-label="快速入口">
              <h2 className="font-semibold mb-4">快速入口</h2>
              <ul className="space-y-2" role="list">
                <li>
                  <Link to="/policy">
                    <Button variant="outline" className="w-full justify-start">
                      政策法规
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/insights">
                    <Button variant="outline" className="w-full justify-start">
                      专家观点
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/data-merchants">
                    <Button variant="outline" className="w-full justify-start">
                      数商生态
                    </Button>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </main>
    </Layout>
  );
}

interface NewsCardProps {
  news: Article;
  index: number;
}

function NewsCard({ news, index }: NewsCardProps) {
  return (
    <li>
      <article>
        <Link
          to={`/news/${news.slug}`}
          className="news-card flex gap-4 p-4 animate-fade-in"
          style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
        >
          {news.cover_image_url && (
            <figure className="hidden sm:block w-40 h-28 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={news.cover_image_url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </figure>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
              {news.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {news.summary}
            </p>
            <footer className="flex items-center gap-4 text-xs text-muted-foreground">
              <time dateTime={news.published_at || undefined} className="flex items-center gap-1">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {formatDate(news.published_at)}
              </time>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" aria-hidden="true" />
                <span aria-label={`${(news.view_count || 0).toLocaleString()}次阅读`}>
                  {(news.view_count || 0).toLocaleString()}
                </span>
              </span>
            </footer>
          </div>
        </Link>
      </article>
    </li>
  );
}
