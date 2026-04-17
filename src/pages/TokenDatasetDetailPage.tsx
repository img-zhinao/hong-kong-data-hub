import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Database, Star, Shield, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PricingPackages } from '@/components/tokenhub/PricingPackages';
import { useTokenDataset, MODALITY_LABEL } from '@/hooks/useTokenDatasets';
import { formatTokenCount } from '@/lib/formatters';

export default function TokenDatasetDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: dataset, isLoading } = useTokenDataset(slug);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!dataset) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p className="text-muted-foreground mb-4">未找到该数据集</p>
          <Link to="/token-hub">
            <Button variant="outline">返回 Token Hub</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`${dataset.name} · Token Hub`}
        description={dataset.description?.slice(0, 150) || '高质量数据集词元交易'}
        keywords={`${dataset.name},${dataset.industry},词元交易,Token,${dataset.tags?.join(',') || ''}`}
        canonicalUrl={`https://hkbde.fun/token-hub/${dataset.slug}`}
        ogType="product"
        product={{
          name: dataset.name,
          description: dataset.description || undefined,
          price: Number(dataset.price_per_1k_tokens),
          currency: 'HKD',
          category: dataset.industry,
          brand: dataset.provider_name || 'HKBDE',
        }}
      />

      <div className="container py-8 lg:py-12">
        <Link to="/token-hub" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> 返回数据集列表
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-primary/30 text-primary">{dataset.industry}</Badge>
              <Badge variant="secondary" className="gap-1">
                <Database className="w-3 h-3" />
                {MODALITY_LABEL[dataset.modality] || dataset.modality}
              </Badge>
              {dataset.license && <Badge variant="outline">{dataset.license}</Badge>}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{dataset.name}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="font-medium text-foreground">{Number(dataset.quality_score).toFixed(1)}</span>
                质量分
              </span>
              {dataset.provider_name && (
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  数据提供方：{dataset.provider_name}
                </span>
              )}
            </div>

            <Card className="p-6">
              <h2 className="font-semibold text-foreground mb-3">数据集描述</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {dataset.description}
              </p>
            </Card>

            <Card className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat label="总词元" value={formatTokenCount(dataset.total_tokens)} />
              <Stat label="千词元单价" value={`¥${Number(dataset.price_per_1k_tokens).toFixed(2)}`} />
              <Stat label="模态" value={MODALITY_LABEL[dataset.modality] || dataset.modality} />
              <Stat label="质量分" value={Number(dataset.quality_score).toFixed(1)} />
            </Card>

            {dataset.tags && dataset.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {dataset.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                </div>
              </div>
            )}

            {dataset.sample_url && (
              <a href={dataset.sample_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  查看样例数据 <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <PricingPackages
              packages={dataset.package_options || []}
              pricePer1k={Number(dataset.price_per_1k_tokens)}
            />
            <Card className="p-5 text-sm text-muted-foreground space-y-2">
              <p>· 购买后获得专属 API Key</p>
              <p>· 调用接口按词元计费扣减余额</p>
              <p>· 支持词元包预购与按调用付费两种方式</p>
              <p>· 数据使用须遵守对应许可证条款</p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold text-foreground mt-1">{value}</div>
    </div>
  );
}
