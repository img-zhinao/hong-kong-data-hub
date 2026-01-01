import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const merchants = [
  {
    id: 1,
    name: '香港金融数据科技有限公司',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    category: '金融数据',
    products: 156,
    rating: 4.9,
    verified: true,
  },
  {
    id: 2,
    name: '亚太医疗数据研究院',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    category: '医疗健康',
    products: 89,
    rating: 4.8,
    verified: true,
  },
  {
    id: 3,
    name: '智慧物流数据平台',
    logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100&h=100&fit=crop',
    category: '物流运输',
    products: 234,
    rating: 4.7,
    verified: true,
  },
  {
    id: 4,
    name: '粤港澳制造业大数据中心',
    logo: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=100&h=100&fit=crop',
    category: '智能制造',
    products: 178,
    rating: 4.9,
    verified: true,
  },
  {
    id: 5,
    name: '环球能源数据服务商',
    logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop',
    category: '能源环保',
    products: 67,
    rating: 4.6,
    verified: true,
  },
  {
    id: 6,
    name: '文旅产业数据智库',
    logo: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop',
    category: '文化旅游',
    products: 112,
    rating: 4.8,
    verified: true,
  },
];

export function DataMerchantsSection() {
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
          {merchants.map((merchant, index) => (
            <Link
              key={merchant.id}
              to={`/data-merchants/${merchant.id}`}
              className="bg-card rounded-xl p-4 border text-center hover-lift group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="relative inline-block mb-3">
                <img
                  src={merchant.logo}
                  alt={merchant.name}
                  className="w-16 h-16 rounded-xl object-cover mx-auto"
                />
                {merchant.verified && (
                  <Shield className="absolute -right-1 -bottom-1 w-5 h-5 text-green-500 bg-card rounded-full p-0.5" />
                )}
              </div>
              <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                {merchant.name}
              </h4>
              <span className="text-xs text-muted-foreground block mb-2">
                {merchant.category}
              </span>
              <div className="flex items-center justify-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-primary">
                  <Star className="w-3 h-3 fill-current" />
                  {merchant.rating}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  {merchant.products}款
                </span>
              </div>
            </Link>
          ))}
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
