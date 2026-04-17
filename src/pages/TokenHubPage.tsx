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
        title="Token Hub 数据集词元交易"
        description="香港大数据交易所 Token Hub —— 行业高质量数据集词元（Token）交易市场。覆盖工业、医疗、金融、交通等 12 个行业的多模态高质量数据集，按词元计价，可量化、可定价、可组合。"
        keywords="Token Hub,词元交易,高质量数据集,AI训练数据,行业数据集,数据要素,香港大数据交易所"
        canonicalUrl="https://hkbde.fun/token-hub"
      />

      <TokenHubHero />

      {/* Stats */}
      <section className="container -mt-10 relative z-10">
        <div className="grid grid-cols-3 gap-3 lg:gap-6 max-w-4xl mx-auto">
          {[
            { icon: Database, label: '数据集', value: stats?.datasetCount ?? '—' },
            { icon: Coins, label: '总词元', value: stats ? formatTokenCount(stats.totalTokens) : '—' },
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

      {/* Datasets */}
      <section id="datasets" className="container py-12 lg:py-16">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">数据集市场</h2>
            <p className="text-sm text-muted-foreground mt-1">
              共 {data?.totalCount || 0} 个数据集，按行业 / 模态筛选
            </p>
          </div>
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

      <BusinessModelSection />
    </Layout>
  );
}
