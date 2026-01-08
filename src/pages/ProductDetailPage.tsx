import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useDataProduct } from '@/hooks/useDataProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Eye,
  FileJson,
  HardDrive,
  Download,
  ShoppingCart,
  MessageSquare,
  ExternalLink,
  Database,
} from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import DOMPurify from 'dompurify';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useDataProduct(slug || '');

  if (isLoading) {
    return (
      <Layout>
        <div className="bg-gradient-hero py-12">
          <div className="container">
            <Skeleton className="h-8 w-32 bg-muted mb-4" />
            <Skeleton className="h-10 w-3/4 bg-muted" />
          </div>
        </div>
        <section className="py-8">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-6 w-1/2 bg-muted" />
                <Skeleton className="h-64 w-full bg-muted" />
              </div>
              <div>
                <Skeleton className="h-80 w-full bg-muted" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="bg-gradient-hero py-12">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary-foreground">数据产品详情</h1>
            </div>
          </div>
        </div>
        <section className="py-16">
          <div className="container text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">产品未找到</h2>
            <p className="text-muted-foreground mb-6">该数据产品不存在或已下架</p>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回产品列表
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const isFree = !product.price || product.price === 0;

  return (
    <Layout>
      {/* Hero Section - matching other pages */}
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <Link
            to="/products"
            className="inline-flex items-center text-primary-foreground/70 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回产品列表
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              {product.title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
            {product.provider && (
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {product.provider.name}
              </span>
            )}
            {product.published_at && (
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(product.published_at), 'yyyy年MM月dd日', {
                  locale: zhCN,
                })}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {product.view_count || 0} 次浏览
            </span>
          </div>
        </div>
      </div>

      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Summary */}
              {product.summary && (
                <Card className="bg-card border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-foreground">产品简介</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{product.summary}</p>
                  </CardContent>
                </Card>
              )}

              {/* Content */}
              {product.content && (
                <Card className="bg-card border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-foreground">详细介绍</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose prose-neutral dark:prose-invert max-w-none 
                        prose-headings:text-foreground prose-p:text-muted-foreground 
                        prose-a:text-primary prose-strong:text-foreground
                        prose-li:text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(product.content),
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Data Specifications */}
              <Card className="bg-card border">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">数据规格</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {product.data_format && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">数据格式</p>
                        <p className="text-sm text-foreground flex items-center gap-2">
                          <FileJson className="h-4 w-4 text-primary" />
                          {product.data_format}
                        </p>
                      </div>
                    )}
                    {product.data_volume && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">数据量</p>
                        <p className="text-sm text-foreground flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-secondary" />
                          {product.data_volume}
                        </p>
                      </div>
                    )}
                    {product.delivery_method && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">交付方式</p>
                        <p className="text-sm text-foreground flex items-center gap-2">
                          <Download className="h-4 w-4 text-primary" />
                          {product.delivery_method === 'download'
                            ? '在线下载'
                            : product.delivery_method === 'api'
                            ? 'API 接口'
                            : product.delivery_method}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Purchase Card */}
            <div className="lg:col-span-1">
              <Card className="bg-card border sticky top-24">
                <CardHeader className="pb-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">产品价格</p>
                    <p
                      className={`text-3xl font-bold ${
                        isFree ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      {isFree ? '免费' : `${product.currency || 'HKD'} ${product.price}`}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Separator />

                  {/* Quick Info */}
                  <div className="space-y-3 text-sm">
                    {product.data_format && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">数据格式</span>
                        <span className="text-foreground">{product.data_format}</span>
                      </div>
                    )}
                    {product.data_volume && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">数据量</span>
                        <span className="text-foreground">{product.data_volume}</span>
                      </div>
                    )}
                    {product.delivery_method && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">交付方式</span>
                        <span className="text-foreground">
                          {product.delivery_method === 'download'
                            ? '在线下载'
                            : product.delivery_method === 'api'
                            ? 'API 接口'
                            : product.delivery_method}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {isFree ? (
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                        <Download className="h-5 w-5 mr-2" />
                        立即下载
                      </Button>
                    ) : (
                      <>
                        <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12">
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          立即购买
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full h-12"
                        >
                          <MessageSquare className="h-5 w-5 mr-2" />
                          联系数据商
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Provider Info */}
                  {product.provider && (
                    <>
                      <Separator />
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-2">数据供应商</p>
                        <Link
                          to={`/data-merchants/${product.provider.id}`}
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        >
                          {product.provider.name}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
