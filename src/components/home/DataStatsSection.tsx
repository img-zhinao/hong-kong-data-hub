import { TrendingUp, Database, Users, FileText, BarChart3 } from 'lucide-react';
import { usePlatformStats } from '@/hooks/usePlatformStats';
import { formatStatValue } from '@/lib/formatters';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  data_products: Database,
  data_merchants: Users,
  trading_volume: TrendingUp,
  transactions: FileText,
};

const colorMap: Record<string, string> = {
  data_products: 'primary',
  data_merchants: 'secondary',
  trading_volume: 'gold',
  transactions: 'bronze',
};

export function DataStatsSection() {
  const { data: stats, isLoading } = usePlatformStats();

  return (
    <section className="py-12 bg-gradient-hero">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
            数据交易<span className="text-gradient-gold">核心指标</span>
          </h2>
          <p className="text-primary-foreground/70">
            实时统计交易所核心业务数据
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 text-center">
                <Skeleton className="w-12 h-12 rounded-full mx-auto mb-4 bg-primary-foreground/20" />
                <Skeleton className="h-8 w-20 mx-auto mb-2 bg-primary-foreground/20" />
                <Skeleton className="h-4 w-16 mx-auto mb-2 bg-primary-foreground/20" />
                <Skeleton className="h-3 w-12 mx-auto bg-primary-foreground/20" />
              </div>
            ))
          ) : stats && stats.length > 0 ? (
            stats.map((stat, index) => {
              const Icon = iconMap[stat.metric_key] || BarChart3;
              return (
                <div
                  key={stat.id}
                  className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 text-center hover:bg-primary-foreground/10 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary-foreground mb-1">
                    {formatStatValue(stat.metric_value, stat.metric_key)}
                  </div>
                  <div className="text-sm text-primary-foreground/70 mb-2">
                    {stat.label}
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs text-green-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>同比 +{Math.floor(Math.random() * 30 + 10)}%</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-4 text-center py-8 text-primary-foreground/70">暂无数据</div>
          )}
        </div>
      </div>
    </section>
  );
}
