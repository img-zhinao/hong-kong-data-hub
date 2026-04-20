import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Building2, Search, Shield, Star, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDataMerchants } from '@/hooks/useDataMerchants';
import { Skeleton } from '@/components/ui/skeleton';
import { SEO } from '@/components/SEO';

const categories = ['全部', '金融数据', '医疗健康', '物流运输', '智能制造', '能源环保', '文化旅游'];

export default function DataMerchantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const { data: merchants, isLoading } = useDataMerchants({
    serviceType: selectedCategory === '全部' ? undefined : selectedCategory,
    search: searchTerm || undefined,
  });

  return (
    <Layout>
      <SEO
        title="数商生态"
        description="优质数据服务商生态，提供安全合规的数据产品与服务。探索金融数据、医疗健康、物流运输等多个领域的专业数商。"
        keywords="数商,数据服务商,数据供应商,金融数据,医疗数据,物流数据,智能制造"
        canonicalUrl="https://hkbde.fun/data-merchants"
      />
      
      {/* Page Header */}
      <header className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-primary-foreground">数商生态</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            优质数据服务商生态，提供安全合规的数据产品与服务
          </p>
        </div>
      </header>

      <main className="container py-8">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input 
              placeholder="搜索数商..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="搜索数商"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" aria-hidden="true" />
            筛选
          </Button>
        </div>

        {/* Categories */}
        <nav aria-label="分类筛选" className="mb-8">
          <ul className="flex flex-wrap gap-2" role="list">
            {categories.map((cat) => (
              <li key={cat}>
                <Button
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Merchants Grid */}
        <section aria-label="数商列表">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" role="list">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="bg-card rounded-xl border overflow-hidden p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Skeleton className="w-16 h-16 rounded-xl" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                </li>
              ))
            ) : merchants && merchants.length > 0 ? (
              merchants.map((merchant, index) => (
                <li key={merchant.id}>
                  <article>
                    <Link
                      to={`/data-merchants/${merchant.id}`}
                      className="block bg-card rounded-xl border overflow-hidden hover-lift group animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
                    >
                      <div className="p-6">
                        <header className="flex items-start gap-4 mb-4">
                          <figure className="relative">
                            <img
                              src={merchant.logo_url || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop'}
                              alt=""
                              className="w-16 h-16 rounded-xl object-cover"
                              loading="lazy"
                            />
                            {merchant.verification_status && (
                              <Shield className="absolute -right-1 -bottom-1 w-5 h-5 text-green-500 bg-card rounded-full p-0.5" aria-label="已认证" />
                            )}
                          </figure>
                          <div className="flex-1 min-w-0">
                            <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {merchant.name}
                            </h2>
                            <span className="text-sm text-primary">{merchant.service_type || '数据服务'}</span>
                          </div>
                        </header>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {merchant.description || '专业数据服务商，提供高质量数据产品与服务'}
                        </p>

                        {merchant.merchant_tags && merchant.merchant_tags.length > 0 && (
                          <ul className="flex flex-wrap gap-1 mb-4" role="list" aria-label="标签">
                            {merchant.merchant_tags.slice(0, 3).map(tag => (
                              <li key={tag}>
                                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                                  {tag}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <footer className="flex items-center justify-between pt-4 border-t text-sm">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 text-primary">
                              <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                              <span aria-label={`评分${merchant.rating || 5.0}`}>{merchant.rating || 5.0}</span>
                            </span>
                            <span className="text-muted-foreground">
                              {merchant.product_count || 0}款产品
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <TrendingUp className="w-3 h-3" aria-hidden="true" />
                            {merchant.transaction_count || 0}笔
                          </span>
                        </footer>
                      </div>
                    </Link>
                  </article>
                </li>
              ))
            ) : (
              <li className="col-span-3 text-center py-12 text-muted-foreground">
                暂无相关数商
              </li>
            )}
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-gradient-gold rounded-2xl p-8 text-center" aria-label="入驻邀请">
          <h2 className="text-2xl font-bold text-primary-foreground mb-2">
            成为数商伙伴
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            加入香港大数据交易所生态，享受专业的数据交易服务，开启数据价值变现之旅
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              立即申请入驻
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              了解入驻流程
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
