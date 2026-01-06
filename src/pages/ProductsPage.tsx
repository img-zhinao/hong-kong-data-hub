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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Database, FileJson, Clock, Filter, X, ArrowUpDown, Eye, DollarSign, Calendar } from 'lucide-react';
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

const sortOptions = [
  { value: 'published_at-desc', label: '最新发布', icon: Calendar },
  { value: 'published_at-asc', label: '最早发布', icon: Calendar },
  { value: 'price-asc', label: '价格从低到高', icon: DollarSign },
  { value: 'price-desc', label: '价格从高到低', icon: DollarSign },
  { value: 'view_count-desc', label: '浏览量最高', icon: Eye },
  { value: 'view_count-asc', label: '浏览量最低', icon: Eye },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [priceType, setPriceType] = useState<'all' | 'free' | 'paid'>('all');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [sortValue, setSortValue] = useState('published_at-desc');

  const [sortBy, sortOrder] = sortValue.split('-') as ['published_at' | 'price' | 'view_count', 'asc' | 'desc'];

  const { data: products, isLoading, error } = useDataProducts({
    tag: selectedTag,
    priceType,
    search: searchTerm,
    sortBy,
    sortOrder,
  });

  const clearFilters = () => {
    setSelectedTag('all');
    setPriceType('all');
    setSearchTerm('');
    setSortValue('published_at-desc');
  };

  const hasActiveFilters = selectedTag !== 'all' || priceType !== 'all' || searchTerm !== '';

  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`space-y-6 ${isMobile ? '' : 'sticky top-24'}`}>
      {/* Industry Tags */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Database className="h-4 w-4 text-primary" />
          行业分类
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedTag('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedTag === 'all'
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            全部行业
          </button>
          {industryTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">价格区间</h3>
        <div className="space-y-1">
          {priceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setPriceType(option.value as 'all' | 'free' | 'paid')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                priceType === option.value
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="w-full"
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
      {/* Hero Section - matching DataMerchantsPage */}
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary-foreground">数据产品交易市场</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            探索来自全球数据商的高质量数据产品，助力您的业务决策与创新发展
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="w-full gap-2"
            >
              <Filter className="h-4 w-4" />
              {showMobileFilter ? '隐藏筛选' : '显示筛选'}
            </Button>
            {showMobileFilter && (
              <div className="mt-4 p-4 bg-card rounded-xl border">
                <FilterSidebar isMobile />
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-card rounded-xl border p-4">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search Bar & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索数据产品..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortValue} onValueChange={setSortValue}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {isLoading ? '加载中...' : `共找到 ${products?.length || 0} 个数据产品`}
              </p>
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  {selectedTag !== 'all' && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {selectedTag}
                    </Badge>
                  )}
                  {priceType !== 'all' && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {priceType === 'free' ? '免费' : '付费'}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-destructive">加载数据时出错，请稍后重试</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl border overflow-hidden p-6">
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && products && products.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <Link 
                    key={product.id} 
                    to={`/products/${product.slug}`}
                    className="bg-card rounded-xl border overflow-hidden hover-lift group animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
                  >
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {product.title}
                        </h3>
                        {product.provider && (
                          <p className="text-sm text-primary">
                            {product.provider.name}
                          </p>
                        )}
                      </div>

                      {product.summary && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {product.summary}
                        </p>
                      )}

                      {/* Tags */}
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {product.tags.length > 2 && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                              +{product.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer Info */}
                      <div className="flex items-center justify-between pt-4 border-t text-sm">
                        <div className="flex items-center gap-3 text-muted-foreground">
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
                            ? 'text-primary'
                            : 'text-amber-500'
                        }`}>
                          {!product.price || product.price === 0
                            ? '免费'
                            : `${product.currency || 'HKD'} ${product.price}`}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && (!products || products.length === 0) && (
              <div className="text-center py-16">
                <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">暂无数据产品</h3>
                <p className="text-muted-foreground mb-6">
                  {hasActiveFilters
                    ? '没有找到符合筛选条件的数据产品，请尝试调整筛选条件'
                    : '数据产品正在上架中，敬请期待'}
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    清除筛选条件
                  </Button>
                )}
              </div>
            )}
          </main>
        </div>

        {/* CTA - matching DataMerchantsPage */}
        <div className="bg-gradient-gold rounded-2xl p-8 text-center mt-12">
          <h2 className="text-2xl font-bold text-primary-foreground mb-2">
            发布您的数据产品
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            加入香港大数据交易所，将您的数据资产转化为价值，触达全球数据需求方
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              立即发布产品
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              了解发布流程
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
