import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useArticles } from '@/hooks/useArticles';
import { formatDate } from '@/lib/formatters';
import { Skeleton } from '@/components/ui/skeleton';

export function NewsSection() {
  const { data: latestNews, isLoading: loadingNews } = useArticles({ 
    category: 'news', 
    limit: 3,
    orderBy: 'published_at'
  });
  
  const { data: policyNews, isLoading: loadingPolicy } = useArticles({ 
    category: 'policy', 
    limit: 4,
    orderBy: 'published_at'
  });

  return (
    <section className="py-12 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Latest News - Main Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">最新资讯</h2>
              <Link to="/news">
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  更多资讯 <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {loadingNews ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="news-card flex gap-4 p-4">
                    <Skeleton className="hidden sm:block w-40 h-28 rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))
              ) : latestNews && latestNews.length > 0 ? (
                latestNews.map((news, index) => (
                  <Link
                    key={news.id}
                    to={`/news/${news.slug}`}
                    className={`news-card flex gap-4 p-4 animate-fade-in stagger-${index + 1}`}
                    style={{ opacity: 0, animationFillMode: 'forwards' }}
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="tag tag-news">
                          {news.sub_category || '行业动态'}
                        </span>
                      </div>
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
                          {news.view_count || 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">暂无资讯</div>
              )}
            </div>
          </div>

          {/* Policy News - Sidebar */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">政策法规</h2>
              <Link to="/policy">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  更多 <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-lg border p-4">
              {loadingPolicy ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="py-3 border-b last:border-0">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {policyNews && policyNews.length > 0 ? (
                    policyNews.map((news) => (
                      <li key={news.id}>
                        <Link
                          to={`/policy/${news.slug}`}
                          className="block py-3 group"
                        >
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                            {news.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{formatDate(news.published_at)}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {news.view_count || 0}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-center text-muted-foreground text-sm">暂无政策</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
