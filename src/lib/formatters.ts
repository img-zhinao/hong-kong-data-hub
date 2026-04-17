import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function formatDate(dateString: string | null, formatStr: string = 'yyyy-MM-dd'): string {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), formatStr, { locale: zhCN });
  } catch {
    return dateString;
  }
}

export function formatEventDate(dateString: string | null): string {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'MM月dd日', { locale: zhCN });
  } catch {
    return dateString;
  }
}

export function formatNumber(value: number | null): string {
  if (value === null) return '0';
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(0)}亿`;
  }
  if (value >= 10000) {
    return `${(value / 10000).toFixed(0)}万`;
  }
  return value.toLocaleString('zh-CN');
}

export function formatTokenCount(value: number | null | undefined): string {
  if (value == null) return '0';
  const n = Number(value);
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatStatValue(value: number | null, key: string): string {
  if (value === null) return '0';
  
  // Handle special cases based on metric key
  if (key === 'trading_volume') {
    return `${(value / 100000000).toFixed(0)}亿`;
  }
  
  if (value >= 1000) {
    return `${value.toLocaleString('zh-CN')}+`;
  }
  
  return value.toString();
}
