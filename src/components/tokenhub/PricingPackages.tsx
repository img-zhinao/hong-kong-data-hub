import { useState } from 'react';
import { Check, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TokenPackage } from '@/hooks/useTokenDatasets';
import { formatTokenCount } from '@/lib/formatters';
import { useToast } from '@/components/ui/toaster';

interface PricingPackagesProps {
  packages: TokenPackage[];
  pricePer1k: number;
  currency?: string;
}

export function PricingPackages({ packages, pricePer1k, currency = 'HKD' }: PricingPackagesProps) {
  const [selected, setSelected] = useState(0);
  const { toast } = useToast();

  if (!packages || packages.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Coins className="w-4 h-4" />
          按调用计费：¥{Number(pricePer1k).toFixed(2)} / 1K tokens
        </div>
      </Card>
    );
  }

  const handleBuy = () => {
    toast({
      title: '即将开放',
      description: '词元包购买与支付功能即将上线，敬请期待。',
    });
  };

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">词元包选择</h3>
        <p className="text-sm text-muted-foreground">
          挑选适合你模型训练规模的词元包，或按调用计费 ¥{Number(pricePer1k).toFixed(2)} / 1K tokens
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {packages.map((pkg, i) => {
          const active = i === selected;
          const unit = (pkg.price / (pkg.tokens / 1000)).toFixed(2);
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative text-left p-4 rounded-lg border-2 transition-all ${
                active
                  ? 'border-gold bg-gold/5'
                  : 'border-border hover:border-gold/50'
              }`}
            >
              {active && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                  <Check className="w-3 h-3 text-background" />
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                {formatTokenCount(pkg.tokens)} tokens
              </div>
              <div className="text-2xl font-bold text-foreground mt-1">
                ¥{pkg.price.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                折合 ¥{unit} / 1K
              </div>
            </button>
          );
        })}
      </div>

      <Button variant="gold" size="lg" className="w-full" onClick={handleBuy}>
        加入购物车（即将开放）
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        购买后将获得专属 API Key，可直接调用数据集接口，{currency} 计价
      </p>
    </Card>
  );
}
