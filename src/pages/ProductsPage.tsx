import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useDataProducts } from '@/hooks/useDataProducts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Search, Database, FileJson, Clock, Filter, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const industryTags = [
  '工业制造',
  '现代农业',
  '商贸流通',
  '交通运输',
  '金融服务',
  '科技创新',
  '文化旅游',
  '医疗健康',
  '应急管理',
  '气象服务',
  '城市治理',
  '绿色低碳',
];

const priceOptions = [
  { value: 'all', label: '全部' },
  { value: 'free', label: '免费' },
  { value: 'paid', label: '付费' },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [priceType, setPriceType] = useState<'all' | 'free' | 'paid'>('all');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const { data: products, isLoading, error } = useDataProducts({
    tag: selectedTag,
    priceType,
    search: searchTerm,
  });

  const clearFilters = () => {
    setSelectedTag('all');
    setPriceType('all');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedTag !== 'all' || priceType !== 'all' || searchTerm !== '';

  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`space-y-6 ${isMobile ? '' : 'sticky top-24'}`}>
      {/* Industry Tags */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Database className="h-4 w-4 text-green-500" />
          行业分类
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedTag('all')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedTag === 'all'
                ? 'bg-green-600/20 text-green-400 font-medium'
                : 'text-muted-foreground hover:bg-slate-800 hover:text-foreground'
            }`}
          >
            全部行业
          </button>
          {industryTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-green-600/20 text-green-400 font-medium'
                  : 'text-muted-foreground hover:bg-slate-800 hover:text-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <Separator className="bg-slate-700" />

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">价格区间</h3>
        <div className="space-y-1">
          {priceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setPriceType(option.value as 'all' | 'free' | 'paid')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                priceType === option.value
                  ? 'bg-green-600/20 text-green-400 font-medium'
                  : 'text-muted-foreground hover:bg-slate-800 hover:text-foreground'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <Separator className="bg-slate-700" />
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <X className="h-4 w-4 mr-2" />
            清除筛选
          </Button>
        </>
      )}
    </div>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-12 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              数据产品交易市场
            </h1>
            <p className="text-lg text-slate-300">
              探索来自全球数据商的高质量数据产品，助力您的业务决策与创新发展
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-slate-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="w-full border-slate-600 text-slate-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showMobileFilter ? '隐藏筛选' : '显示筛选'}
              </Button>
              {showMobileFilter && (
                <div className="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <FilterSidebar isMobile />
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                <FilterSidebar />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="搜索数据产品..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 h-12"
                  />
                </div>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-slate-400">
                  {isLoading ? '加载中...' : `共找到 ${products?.length || 0} 个数据产品`}
                </p>
                {hasActiveFilters && (
                  <div className="flex items-center gap-2">
                    {selectedTag !== 'all' && (
                      <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                        {selectedTag}
                      </Badge>
                    )}
                    {priceType !== 'all' && (
                      <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                        {priceType === 'free' ? '免费' : '付费'}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-400">加载数据时出错，请稍后重试</p>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="bg-slate-800 border-slate-700">
                      <CardHeader className="space-y-3">
                        <Skeleton className="h-5 w-3/4 bg-slate-700" />
                        <Skeleton className="h-4 w-1/2 bg-slate-700" />
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Skeleton className="h-4 w-full bg-slate-700" />
                        <Skeleton className="h-4 w-2/3 bg-slate-700" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-16 bg-slate-700" />
                          <Skeleton className="h-6 w-16 bg-slate-700" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Products Grid */}
              {!isLoading && products && products.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link key={product.id} to={`/products/${product.slug}`}>
                      <Card className="bg-slate-800 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 h-full group">
                        <CardHeader className="pb-3">
                          <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                          {product.provider && (
                            <p className="text-sm text-slate-400">
                              {product.provider.name}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {product.summary && (
                            <p className="text-sm text-slate-300 line-clamp-2">
                              {product.summary}
                            </p>
                          )}

                          {/* Tags */}
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {product.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="bg-slate-700 text-slate-300 text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {product.tags.length > 2 && (
                                <Badge
                                  variant="secondary"
                                  className="bg-slate-700 text-slate-400 text-xs"
                                >
                                  +{product.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}

                          <Separator className="bg-slate-700" />

                          {/* Footer Info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                              {product.data_format && (
                                <span className="flex items-center gap-1">
                                  <FileJson className="h-3 w-3" />
                                  {product.data_format}
                                </span>
                              )}
                              {product.published_at && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatDistanceToNow(new Date(product.published_at), {
                                    addSuffix: true,
                                    locale: zhCN,
                                  })}
                                </span>
                              )}
                            </div>
                            <span className={`font-semibold ${
                              !product.price || product.price === 0
                                ? 'text-green-400'
                                : 'text-amber-400'
                            }`}>
                              {!product.price || product.price === 0
                                ? '免费'
                                : `${product.currency || 'HKD'} ${product.price}`}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && (!products || products.length === 0) && (
                <div className="text-center py-16">
                  <Database className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">暂无数据产品</h3>
                  <p className="text-slate-400 mb-6">
                    {hasActiveFilters
                      ? '没有找到符合筛选条件的数据产品，请尝试调整筛选条件'
                      : '数据产品正在上架中，敬请期待'}
                  </p>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      清除筛选条件
                    </Button>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </Layout>
  );
}
