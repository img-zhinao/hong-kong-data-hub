import { Link } from 'react-router-dom';
import { Coins, Database, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TokenDataset, MODALITY_LABEL } from '@/hooks/useTokenDatasets';
import { formatTokenCount } from '@/lib/formatters';

interface DatasetCardProps {
  dataset: TokenDataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <Link to={`/token-hub/${dataset.slug}`}>
      <Card className="group h-full p-6 hover:border-gold/50 hover:shadow-lg transition-all duration-300 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <Badge variant="outline" className="border-primary/30 text-primary">
            {dataset.industry}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Database className="w-3 h-3" />
            {MODALITY_LABEL[dataset.modality] || dataset.modality}
          </Badge>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-gold transition-colors">
          {dataset.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
          {dataset.description}
        </p>

        <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-gold text-gold" />
          <span className="font-medium text-foreground">{Number(dataset.quality_score).toFixed(1)}</span>
          <span>· 质量分</span>
          {dataset.provider_name && (
            <span className="ml-auto text-xs truncate max-w-[120px]">{dataset.provider_name}</span>
          )}
        </div>

        <div className="border-t pt-3 flex items-end justify-between">
          <div>
            <div className="text-xs text-muted-foreground">总词元</div>
            <div className="text-sm font-semibold text-foreground">
              {formatTokenCount(dataset.total_tokens)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
              <Coins className="w-3 h-3" />
              单价
            </div>
            <div className="text-base font-bold text-gold">
              ¥{Number(dataset.price_per_1k_tokens).toFixed(2)}
              <span className="text-xs text-muted-foreground font-normal"> /1K tokens</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
