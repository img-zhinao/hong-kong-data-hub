import { useState } from 'react';
import { Loader2, Search, Database, Coins, Layers } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from '@/components/ui/pagination';
import { TokenHubHero } from '@/components/tokenhub/TokenHubHero';
import { DatasetCard } from '@/components/tokenhub/DatasetCard';
import { BusinessModelSection } from '@/components/tokenhub/BusinessModelSection';
import { BidirectionalFlowSection } from '@/components/tokenhub/BidirectionalFlowSection';
import { SMEValueSection } from '@/components/tokenhub/SMEValueSection';
import { ModelGatewaySection } from '@/components/tokenhub/ModelGatewaySection';
import { UnifiedAccessLayerSection } from '@/components/tokenhub/UnifiedAccessLayerSection';
import { HongKongAdvantageSection } from '@/components/tokenhub/HongKongAdvantageSection';
import { ModelAccessForm } from '@/components/tokenhub/ModelAccessForm';
import {
  useTokenDatasets, useTokenDatasetStats,
  INDUSTRIES, MODALITIES,
} from '@/hooks/useTokenDatasets';
import { formatTokenCount } from '@/lib/formatters';

const PAGE_SIZE = 12;

export default function TokenHubPage() {
  const [industry, setIndustry] = useState<string>('all');
  const [modality, setModality] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useTokenDatasets({
    industry, modality, search, page, pageSize: PAGE_SIZE,
  });
  const { data: stats } = useTokenDatasetStats();

  const totalPages = Math.max(1, Math.ceil((data?.totalCount || 0) / PAGE_SIZE));

  const resetPage = () => setPage(1);

  return (
    <Layout>
      <SEO
        title="Token Hub · 香港 Token 流转平台 | 大模型入境 + 数据出海"
        description="香港大数据交易所 Token Hub —— 依托香港国际数据自由港优势，为中小企业提供 Token 双向流转：大陆数据资产合规出海，国际领先大模型（OpenAI / Claude / Gemini）经香港合规入境。统一 OpenAI 兼容 API、多币种结算。"
        keywords="Token Hub,香港 Token 流转,OpenAI 香港接入,Claude 大陆调用,Gemini API,数据出海,Token 跨境,中小企业 AI,香港大数据交易所,AI 网关"
        canonicalUrl="https://hkbde.fun/token-hub"
      />

      <TokenHubHero />

      <BidirectionalFlowSection />

      {/* Stats */}
      <section className="container py-8 lg:py-10">
        <div className="grid grid-cols-3 gap-3 lg:gap-6 max-w-4xl mx-auto">
          {[
            { icon: Database, label: 'Token 化数据集', value: stats?.datasetCount ?? '—' },
            { icon: Coins, label: '总词元储备', value: stats ? formatTokenCount(stats.totalTokens) : '—' },
            { icon: Layers, label: '覆盖行业', value: stats?.industryCount ?? '—' },
          ].map((s, i) => (
            <Card key={i} className="p-4 lg:p-6 text-center">
              <s.icon className="w-5 h-5 lg:w-6 lg:h-6 text-gold mx-auto mb-2" />
              <div className="text-2xl lg:text-3xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs lg:text-sm text-muted-foreground mt-1">{s.label}</div>
            </Card>
          ))}
        </div>
      </section>

      <SMEValueSection />

      <UnifiedAccessLayerSection />

      <ModelGatewaySection />

      {/* Datasets */}
      <section id="datasets" className="container py-12 lg:py-16">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Token 资产市场 <span className="text-gold text-lg">· 出海方向</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              以下数据集已完成 Token 化，可经香港合规通道面向全球买家流转 · 共 {data?.totalCount || 0} 个，按行业 / 模态筛选
            </p>
          </div>
          <a href="/token-hub/market" className="text-sm text-gold hover:underline whitespace-nowrap">
            进入完整市场（含计费方式筛选）→
          </a>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-3 mb-8">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索数据集名称..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              className="pl-9"
            />
          </div>
          <Select value={industry} onValueChange={(v) => { setIndustry(v); resetPage(); }}>
            <SelectTrigger><SelectValue placeholder="行业" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部行业</SelectItem>
              {INDUSTRIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={modality} onValueChange={(v) => { setModality(v); resetPage(); }}>
            <SelectTrigger><SelectValue placeholder="模态" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部模态</SelectItem>
              {MODALITIES.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : !data?.datasets.length ? (
          <Card className="p-12 text-center text-muted-foreground">
            暂无符合条件的数据集
          </Card>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.datasets.map((d) => <DatasetCard key={d.id} dataset={d} />)}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-10">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={p === page}
                        onClick={() => setPage(p)}
                        className="cursor-pointer"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </section>

      <HongKongAdvantageSection />

      {/* Model Access Application */}
      <section id="apply" className="container py-12 lg:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
            模型接入申请 <span className="text-gold text-lg">· 入境方向</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
            填写下方表单，香港 Token Hub 团队将在 1 个工作日内为您开通沙箱 API Key，
            统一接入 OpenAI / Claude / Gemini 等国际领先大模型。
          </p>
        </div>
        <ModelAccessForm />
      </section>

      <BusinessModelSection />
    </Layout>
  );
}
