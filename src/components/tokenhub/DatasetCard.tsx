import { Link } from 'react-router-dom';
import { Coins, Database, Star, ArrowRight, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TokenDataset, MODALITY_LABEL } from '@/hooks/useTokenDatasets';
import { formatTokenCount } from '@/lib/formatters';

interface DatasetCardProps {
  dataset: TokenDataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  const hasPackages = Array.isArray(dataset.package_options) && dataset.package_options.length > 0;

  return (
    <Card className="group h-full p-6 hover:border-gold/50 hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <Badge variant="outline" className="border-primary/30 text-primary">
          {dataset.industry}
        </Badge>
        <div className="flex gap-1.5">
          <Badge variant="secondary" className="gap-1">
            <Database className="w-3 h-3" />
            {MODALITY_LABEL[dataset.modality] || dataset.modality}
          </Badge>
          {hasPackages && (
            <Badge variant="outline" className="border-gold/40 text-gold gap-1">
              <Package className="w-3 h-3" />
              套餐
            </Badge>
          )}
        </div>
      </div>

      <Link to={`/token-hub/${dataset.slug}`} className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-gold transition-colors">
          {dataset.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
          {dataset.description}
        </p>
      </Link>

      <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
        <Star className="w-4 h-4 fill-gold text-gold" />
        <span className="font-medium text-foreground">{Number(dataset.quality_score).toFixed(1)}</span>
        <span>· 质量分</span>
        {dataset.provider_name && (
          <span className="ml-auto text-xs truncate max-w-[120px]">{dataset.provider_name}</span>
        )}
      </div>

      <div className="border-t pt-3 flex items-end justify-between mb-3">
        <div>
          <div className="text-xs text-muted-foreground">总词元</div>
          <div className="text-sm font-semibold text-foreground">
            {formatTokenCount(dataset.total_tokens)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
            <Coins className="w-3 h-3" />
            按量计费
          </div>
          <div className="text-base font-bold text-gold">
            ¥{Number(dataset.price_per_1k_tokens).toFixed(2)}
            <span className="text-xs text-muted-foreground font-normal"> /1K tokens</span>
          </div>
        </div>
      </div>

      <Link to={`/token-hub/${dataset.slug}`} className="block">
        <Button variant="outline" size="sm" className="w-full gap-1.5 group-hover:border-gold/50 group-hover:text-gold">
          查看详情
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </Card>
  );
}
