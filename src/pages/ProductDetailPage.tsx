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
        <section className="py-8 bg-slate-900 min-h-screen">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-32 bg-slate-700 mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-12 w-3/4 bg-slate-700" />
                <Skeleton className="h-6 w-1/2 bg-slate-700" />
                <Skeleton className="h-64 w-full bg-slate-700" />
              </div>
              <div>
                <Skeleton className="h-80 w-full bg-slate-700" />
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
        <section className="py-16 bg-slate-900 min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">产品未找到</h1>
            <p className="text-slate-400 mb-6">该数据产品不存在或已下架</p>
            <Link to="/products">
              <Button className="bg-green-600 hover:bg-green-700">
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
      <section className="py-8 bg-slate-900 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            to="/products"
            className="inline-flex items-center text-slate-400 hover:text-green-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回产品列表
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {product.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
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

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-slate-700 text-slate-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator className="bg-slate-700" />

              {/* Summary */}
              {product.summary && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-3">产品简介</h2>
                  <p className="text-slate-300 leading-relaxed">{product.summary}</p>
                </div>
              )}

              {/* Content */}
              {product.content && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-3">详细介绍</h2>
                  <div
                    className="prose prose-invert prose-slate max-w-none 
                      prose-headings:text-white prose-p:text-slate-300 
                      prose-a:text-green-400 prose-strong:text-white
                      prose-li:text-slate-300"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(product.content),
                    }}
                  />
                </div>
              )}

              {/* Data Specifications */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">数据规格</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {product.data_format && (
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400">数据格式</p>
                        <p className="text-sm text-white flex items-center gap-2">
                          <FileJson className="h-4 w-4 text-green-400" />
                          {product.data_format}
                        </p>
                      </div>
                    )}
                    {product.data_volume && (
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400">数据量</p>
                        <p className="text-sm text-white flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-blue-400" />
                          {product.data_volume}
                        </p>
                      </div>
                    )}
                    {product.delivery_method && (
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400">交付方式</p>
                        <p className="text-sm text-white flex items-center gap-2">
                          <Download className="h-4 w-4 text-amber-400" />
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
              <Card className="bg-slate-800 border-slate-700 sticky top-24">
                <CardHeader className="pb-4">
                  <div className="text-center">
                    <p className="text-sm text-slate-400 mb-1">产品价格</p>
                    <p
                      className={`text-3xl font-bold ${
                        isFree ? 'text-green-400' : 'text-amber-400'
                      }`}
                    >
                      {isFree ? '免费' : `${product.currency || 'HKD'} ${product.price}`}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Separator className="bg-slate-700" />

                  {/* Quick Info */}
                  <div className="space-y-3 text-sm">
                    {product.data_format && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">数据格式</span>
                        <span className="text-white">{product.data_format}</span>
                      </div>
                    )}
                    {product.data_volume && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">数据量</span>
                        <span className="text-white">{product.data_volume}</span>
                      </div>
                    )}
                    {product.delivery_method && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">交付方式</span>
                        <span className="text-white">
                          {product.delivery_method === 'download'
                            ? '在线下载'
                            : product.delivery_method === 'api'
                            ? 'API 接口'
                            : product.delivery_method}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-slate-700" />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {isFree ? (
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12">
                        <Download className="h-5 w-5 mr-2" />
                        立即下载
                      </Button>
                    ) : (
                      <>
                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white h-12">
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          立即购买
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 h-12"
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
                      <Separator className="bg-slate-700" />
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-2">数据供应商</p>
                        <Link
                          to={`/data-merchants/${product.provider.id}`}
                          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
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
