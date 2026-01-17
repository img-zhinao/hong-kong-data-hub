import { useState, useMemo } from 'react';
import { Globe, Landmark, Building2, Search, Radar, ExternalLink, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useProjectTenders, ProjectTender } from '@/hooks/useProjectTenders';
import { formatDate } from '@/lib/formatters';

// Source platform options
const SOURCE_PLATFORMS = [
  { id: 'world-bank', label: 'World Bank', value: 'World Bank' },
  { id: 'adb', label: 'Asian Development Bank (ADB)', value: 'ADB' },
  { id: 'ungm', label: 'UNGM', value: 'UNGM' },
];

// Date range options
const DATE_RANGES = [
  { id: 'all', label: '全部', value: 'all' as const },
  { id: '3days', label: '近3天', value: '3days' as const },
  { id: '1week', label: '近1周', value: '1week' as const },
  { id: '1month', label: '近1个月', value: '1month' as const },
];

// Get icon based on source platform
function getSourceIcon(sourcePlatform: string | null) {
  if (!sourcePlatform) return { Icon: Building2, className: 'text-muted-foreground' };
  
  const platform = sourcePlatform.toLowerCase();
  if (platform.includes('world bank')) {
    return { Icon: Landmark, className: 'text-blue-500' };
  }
  if (platform.includes('adb') || platform.includes('asian development')) {
    return { Icon: Globe, className: 'text-orange-500' };
  }
  if (platform.includes('gov')) {
    return { Icon: Building2, className: 'text-slate-500' };
  }
  return { Icon: Building2, className: 'text-muted-foreground' };
}

// Tender Card Component
function TenderCard({ tender }: { tender: ProjectTender }) {
  const { Icon, className: iconClassName } = getSourceIcon(tender.source_platform);
  const displayTags = tender.tags?.slice(0, 4) || [];

  return (
    <div className="bg-card rounded-xl border p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Icon Section */}
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${iconClassName}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>

        {/* Main Info Section */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
            {tender.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {tender.source_platform && (
              <span className="font-medium">{tender.source_platform}</span>
            )}
            {tender.country && (
              <>
                <span>•</span>
                <span>{tender.country}</span>
              </>
            )}
            {tender.publish_date && (
              <>
                <span>•</span>
                <span>{formatDate(tender.publish_date)}</span>
              </>
            )}
          </div>
          {tender.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {tender.description}
            </p>
          )}
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-1.5 sm:w-48 sm:justify-end">
          {displayTags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Section */}
        <div className="flex-shrink-0 flex items-start">
          <Button
            variant="default"
            size="sm"
            className="whitespace-nowrap"
            onClick={() => tender.original_url && window.open(tender.original_url, '_blank', 'noopener,noreferrer')}
            disabled={!tender.original_url}
          >
            <ExternalLink className="w-4 h-4 mr-1.5" />
            查看原件
          </Button>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton
function TenderCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex gap-4">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
}

// Empty State
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Radar className="w-10 h-10 text-muted-foreground animate-pulse" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        正在同步全球最新商机...
      </h3>
      <p className="text-muted-foreground max-w-md">
        New tenders from World Bank/ADB are updated daily. Check back soon for the latest opportunities.
      </p>
    </div>
  );
}

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<'all' | '3days' | '1week' | '1month'>('all');

  const { data: tenders, isLoading, error } = useProjectTenders({
    search: searchQuery,
    sourcePlatforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
    dateRange,
  });

  const hasActiveFilters = selectedPlatforms.length > 0 || dateRange !== 'all' || searchQuery.trim() !== '';

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const clearFilters = () => {
    setSelectedPlatforms([]);
    setDateRange('all');
    setSearchQuery('');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
              <Globe className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              全球数商需求大厅
            </h1>
            <p className="text-lg text-primary-foreground/80">
              汇聚世界银行、亚洲开发银行及全球政府的数字化项目招标信息
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-xl border p-5 sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">筛选条件</h3>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs h-7 px-2"
                    >
                      <X className="w-3 h-3 mr-1" />
                      清除
                    </Button>
                  )}
                </div>

                {/* Source Platform Filter */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">来源平台</h4>
                  <div className="space-y-2">
                    {SOURCE_PLATFORMS.map((platform) => (
                      <div key={platform.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={platform.id}
                          checked={selectedPlatforms.includes(platform.value)}
                          onCheckedChange={() => handlePlatformToggle(platform.value)}
                        />
                        <Label 
                          htmlFor={platform.id}
                          className="text-sm cursor-pointer"
                        >
                          {platform.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Range Filter */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">发布时间</h4>
                  <RadioGroup
                    value={dateRange}
                    onValueChange={(value) => setDateRange(value as typeof dateRange)}
                  >
                    {DATE_RANGES.map((range) => (
                      <div key={range.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={range.value} id={`date-${range.id}`} />
                        <Label 
                          htmlFor={`date-${range.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {range.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="搜索招标项目..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                  />
                </div>
              </div>

              {/* Results Count */}
              {!isLoading && tenders && (
                <div className="mb-4 text-sm text-muted-foreground">
                  共找到 <span className="font-medium text-foreground">{tenders.length}</span> 条招标信息
                </div>
              )}

              {/* Tender List */}
              <div className="space-y-4">
                {isLoading ? (
                  <>
                    <TenderCardSkeleton />
                    <TenderCardSkeleton />
                    <TenderCardSkeleton />
                    <TenderCardSkeleton />
                  </>
                ) : error ? (
                  <div className="text-center py-12 text-destructive">
                    加载失败，请稍后重试
                  </div>
                ) : tenders && tenders.length > 0 ? (
                  tenders.map((tender) => (
                    <TenderCard key={tender.id} tender={tender} />
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-gold text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">发现更多商机</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            订阅我们的通知服务，第一时间获取符合您业务领域的最新招标信息
          </p>
          <Button variant="secondary" size="lg">
            订阅商机通知
          </Button>
        </div>
      </section>
    </Layout>
  );
}
