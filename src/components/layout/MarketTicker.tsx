import { TrendingUp, TrendingDown } from 'lucide-react';
import { usePlatformStats } from '@/hooks/usePlatformStats';
import { Skeleton } from '@/components/ui/skeleton';

interface TickerItem {
  key: string;
  label: string;
  value: string;
  change?: number;
  changePercent?: number;
  isCore?: boolean;
}

const METRIC_LABELS: Record<string, string> = {
  hkbde_index: 'HKBDE Data Index',
  hstech_index: 'Hang Seng Tech',
  usd_cny: 'USD/CNY',
  total_volume_hkd: 'Total Volume',
  total_products: 'Listed Products',
};

const TICKER_KEYS = ['hkbde_index', 'hstech_index', 'usd_cny', 'total_volume_hkd', 'total_products'];

function formatValue(key: string, value: number): string {
  if (key === 'total_volume_hkd') {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  }
  if (key === 'usd_cny') {
    return value.toFixed(4);
  }
  if (key === 'total_products') {
    return value.toLocaleString();
  }
  // For indices
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function TickerItemDisplay({ item }: { item: TickerItem }) {
  const hasChange = item.change !== undefined && item.changePercent !== undefined;
  const isPositive = hasChange && item.change! >= 0;
  const changeColor = isPositive ? 'text-emerald-400' : 'text-red-400';

  return (
    <div className="flex items-center gap-2 px-6 whitespace-nowrap">
      <span className="text-slate-400 text-sm">{item.label}</span>
      <span className={`font-mono ${item.isCore ? 'font-bold text-white' : 'text-slate-100'}`}>
        {item.value}
      </span>
      {hasChange && (
        <span className={`flex items-center gap-1 text-sm ${changeColor}`}>
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span className="font-mono">
            {isPositive ? '+' : ''}{item.changePercent!.toFixed(2)}%
          </span>
        </span>
      )}
    </div>
  );
}

export function MarketTicker() {
  const { data: stats, isLoading } = usePlatformStats();

  if (isLoading) {
    return (
      <div className="bg-slate-900 h-10 flex items-center justify-center">
        <Skeleton className="h-4 w-96 bg-slate-700" />
      </div>
    );
  }

  if (!stats || stats.length === 0) {
    return null;
  }

  // Filter and map the stats to ticker items
  const tickerItems: TickerItem[] = stats
    .filter((stat) => TICKER_KEYS.includes(stat.metric_key))
    .map((stat) => {
      const geoMeta = (stat as any).geo_metadata as { daily_change?: number; daily_change_percent?: number } | null;
      const showChange = stat.metric_key === 'hkbde_index' || stat.metric_key === 'hstech_index';
      
      return {
        key: stat.metric_key,
        label: METRIC_LABELS[stat.metric_key] || stat.label || stat.metric_key,
        value: formatValue(stat.metric_key, Number(stat.metric_value) || 0),
        change: showChange ? geoMeta?.daily_change : undefined,
        changePercent: showChange ? geoMeta?.daily_change_percent : undefined,
        isCore: stat.metric_key === 'hkbde_index',
      };
    })
    .sort((a, b) => TICKER_KEYS.indexOf(a.key) - TICKER_KEYS.indexOf(b.key));

  if (tickerItems.length === 0) {
    return null;
  }

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="bg-slate-900 h-10 overflow-hidden relative group">
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
      
      <div 
        className="flex items-center h-full animate-marquee group-hover:[animation-play-state:paused]"
        style={{ width: 'max-content' }}
      >
        {duplicatedItems.map((item, index) => (
          <TickerItemDisplay key={`${item.key}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
