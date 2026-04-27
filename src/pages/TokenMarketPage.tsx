import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Search, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from '@/components/ui/pagination';
import { DatasetCard } from '@/components/tokenhub/DatasetCard';
import {
  useTokenDatasets, INDUSTRIES, MODALITIES,
} from '@/hooks/useTokenDatasets';

const PAGE_SIZE = 12;

type BillingMode = 'all' | 'metered' | 'package';

export default function TokenMarketPage() {
  const [industry, setIndustry] = useState<string>('all');
  const [modality, setModality] = useState<string>('all');
  const [billing, setBilling] = useState<BillingMode>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // 拉取较大批量后在前端按计费方式过滤（套餐字段为 jsonb，无法在 PostgREST 直接 length 过滤）
  const { data, isLoading } = useTokenDatasets({
    industry, modality, search, page: 1, pageSize: 200,
  });

  const filteredAll = useMemo(() => {
    const list = data?.datasets || [];
    if (billing === 'all') return list;
    return list.filter((d) => {
      const hasPkg = Array.isArray(d.package_options) && d.package_options.length > 0;
      return billing === 'package' ? hasPkg : !hasPkg;
    });
  }, [data, billing]);

  const totalCount = filteredAll.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    return filteredAll.slice(from, from + PAGE_SIZE);
  }, [filteredAll, page]);

  const resetPage = () => setPage(1);

  const resetFilters = () => {
    setIndustry('all'); setModality('all'); setBilling('all');
    setSearch(''); setPage(1);
  };

  return (
    <Layout>
      <SEO
        title="Token 资产市场 | 已 Token 化数据资产 · 香港 Token Hub"
        description="浏览所有已完成 Token 化的高质量数据资产，支持按行业、模态、计费方式（按量 / 套餐包）筛选，一键查看详情，经香港合规通道面向全球流转。"
        keywords="Token 资产市场,Token化数据,数据资产,按量计费,数据套餐,香港 Token Hub"
        canonicalUrl="https://hkbde.fun/token-hub/market"
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 lg:py-20 bg-gradient-to-b from-background to-muted/20 border-b border-border">
        <div className="container relative z-10">
          <Link to="/token-hub" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold mb-4">
            <ArrowLeft className="w-4 h-4" />
            返回 Token Hub
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-medium mb-4">
              出海方向 · OUTBOUND
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Token 资产市场
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              所有数据集已完成 Token 化与质量评分，可经香港合规通道按词元计价、向全球买家流转。
              支持<span className="text-foreground">按量计费</span>与<span className="text-foreground">套餐包采购</span>两种结算方式。
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="container py-10 lg:py-14">
        <Card className="p-4 lg:p-5 mb-6 border-gold/15 bg-muted/10">
          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
            <SlidersHorizontal className="w-4 h-4" />
            筛选条件
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="lg:col-span-2 relative">
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
            <Select value={billing} onValueChange={(v: BillingMode) => { setBilling(v); resetPage(); }}>
              <SelectTrigger><SelectValue placeholder="计费方式" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部计费方式</SelectItem>
                <SelectItem value="metered">按量计费（按 Token）</SelectItem>
                <SelectItem value="package">套餐包采购</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50 text-sm">
            <span className="text-muted-foreground">
              共 <span className="text-foreground font-semibold">{totalCount}</span> 个 Token 资产
            </span>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
              重置筛选
            </Button>
          </div>
        </Card>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : !pageItems.length ? (
          <Card className="p-12 text-center text-muted-foreground">
            暂无符合条件的 Token 资产，请调整筛选条件
          </Card>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pageItems.map((d) => <DatasetCard key={d.id} dataset={d} />)}
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
    </Layout>
  );
}
