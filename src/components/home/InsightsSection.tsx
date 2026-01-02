import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInsights } from '@/hooks/useInsights';
import { Skeleton } from '@/components/ui/skeleton';

export function InsightsSection() {
  const { data: insights, isLoading } = useInsights({ limit: 3 });

  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">专家观点</h2>
          <Link to="/insights">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              更多观点 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="pt-4 border-t">
                  <Skeleton className="h-5 w-20" />
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
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={insight.author_avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                    alt={insight.author_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {insight.author_name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{insight.author_role}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -left-1 -top-1 w-6 h-6 text-primary/20" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-4 line-clamp-4">
                    {insight.quote}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <span className="tag tag-insight">{insight.topic}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-muted-foreground">暂无专家观点</div>
          )}
        </div>
      </div>
    </section>
  );
}
