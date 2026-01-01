import { Layout } from '@/components/layout/Layout';
import { Building2, Search, Shield, Star, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const merchants = [
  {
    id: 1,
    name: '香港金融数据科技有限公司',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    description: '专注于金融行业大数据分析与风控模型服务，提供实时市场数据、信用评估数据等产品。',
    category: '金融数据',
    products: 156,
    transactions: 2340,
    rating: 4.9,
    verified: true,
    tags: ['信用评估', '风险控制', '市场分析'],
  },
  {
    id: 2,
    name: '亚太医疗数据研究院',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop',
    description: '聚焦医疗健康领域的数据研究与应用，提供临床数据、药物研发数据等高质量数据产品。',
    category: '医疗健康',
    products: 89,
    transactions: 1560,
    rating: 4.8,
    verified: true,
    tags: ['临床数据', '药物研发', '健康管理'],
  },
  {
    id: 3,
    name: '智慧物流数据平台',
    logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=200&h=200&fit=crop',
    description: '整合港口、航运、陆运全链条物流数据，助力供应链优化与智能调度。',
    category: '物流运输',
    products: 234,
    transactions: 4521,
    rating: 4.7,
    verified: true,
    tags: ['供应链', '港口数据', '运输追踪'],
  },
  {
    id: 4,
    name: '粤港澳制造业大数据中心',
    logo: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=200&h=200&fit=crop',
    description: '服务大湾区智能制造升级，提供工业生产、质量控制、设备运维等数据服务。',
    category: '智能制造',
    products: 178,
    transactions: 3210,
    rating: 4.9,
    verified: true,
    tags: ['工业物联网', '质量控制', '预测维护'],
  },
  {
    id: 5,
    name: '环球能源数据服务商',
    logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200&h=200&fit=crop',
    description: '专业能源数据服务商，覆盖电力、石油、天然气、新能源等多个细分领域。',
    category: '能源环保',
    products: 67,
    transactions: 890,
    rating: 4.6,
    verified: true,
    tags: ['电力数据', '碳排放', '新能源'],
  },
  {
    id: 6,
    name: '文旅产业数据智库',
    logo: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop',
    description: '深耕文化旅游产业数据研究，提供游客行为分析、景区运营数据等服务。',
    category: '文化旅游',
    products: 112,
    transactions: 1870,
    rating: 4.8,
    verified: true,
    tags: ['游客分析', '景区运营', '文化消费'],
  },
];

const categories = ['全部', '金融数据', '医疗健康', '物流运输', '智能制造', '能源环保', '文化旅游'];

export default function DataMerchantsPage() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary-foreground">数商生态</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            优质数据服务商生态，提供安全合规的数据产品与服务
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="搜索数商..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            筛选
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat, index) => (
            <Button
              key={cat}
              variant={index === 0 ? 'default' : 'outline'}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Merchants Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {merchants.map((merchant, index) => (
            <Link
              key={merchant.id}
              to={`/data-merchants/${merchant.id}`}
              className="bg-card rounded-xl border overflow-hidden hover-lift group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={merchant.logo}
                      alt={merchant.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    {merchant.verified && (
                      <Shield className="absolute -right-1 -bottom-1 w-5 h-5 text-green-500 bg-card rounded-full p-0.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {merchant.name}
                    </h3>
                    <span className="text-sm text-primary">{merchant.category}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {merchant.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {merchant.tags.map(tag => (
                    <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-primary">
                      <Star className="w-4 h-4 fill-current" />
                      {merchant.rating}
                    </span>
                    <span className="text-muted-foreground">
                      {merchant.products}款产品
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    {merchant.transactions}笔
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-gold rounded-2xl p-8 text-center">
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
        </div>
      </div>
    </Layout>
  );
}
