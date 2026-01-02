import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDataMerchants } from '@/hooks/useDataMerchants';
import { Skeleton } from '@/components/ui/skeleton';

export function DataMerchantsSection() {
  const { data: merchants, isLoading } = useDataMerchants({ limit: 6 });

  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title mb-2">数商生态</h2>
            <p className="text-muted-foreground text-sm">
              优质数据服务商，提供安全合规的数据产品与服务
            </p>
          </div>
          <Link to="/data-merchants">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              查看全部 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border text-center">
                <Skeleton className="w-16 h-16 rounded-xl mx-auto mb-3" />
                <Skeleton className="h-4 w-20 mx-auto mb-1" />
                <Skeleton className="h-3 w-12 mx-auto mb-2" />
                <Skeleton className="h-3 w-16 mx-auto" />
              </div>
            ))
          ) : merchants && merchants.length > 0 ? (
            merchants.map((merchant, index) => (
              <Link
                key={merchant.id}
                to={`/data-merchants/${merchant.id}`}
                className="bg-card rounded-xl p-4 border text-center hover-lift group animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="relative inline-block mb-3">
                  <img
                    src={merchant.logo_url || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop'}
                    alt={merchant.name}
                    className="w-16 h-16 rounded-xl object-cover mx-auto"
                  />
                  {merchant.verification_status && (
                    <Shield className="absolute -right-1 -bottom-1 w-5 h-5 text-green-500 bg-card rounded-full p-0.5" />
                  )}
                </div>
                <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {merchant.name}
                </h4>
                <span className="text-xs text-muted-foreground block mb-2">
                  {merchant.service_type || '数据服务'}
                </span>
                <div className="flex items-center justify-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-primary">
                    <Star className="w-3 h-3 fill-current" />
                    {merchant.rating || 5.0}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    {merchant.product_count || 0}款
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-6 text-center py-8 text-muted-foreground">暂无数商</div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-gold rounded-xl px-8 py-4">
            <div className="text-left">
              <h3 className="font-bold text-primary-foreground">成为数商伙伴</h3>
              <p className="text-sm text-primary-foreground/80">
                加入香港大数据交易所生态，开启数据价值变现之旅
              </p>
            </div>
            <Link to="/data-merchants/apply">
              <Button variant="secondary" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                立即入驻
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
