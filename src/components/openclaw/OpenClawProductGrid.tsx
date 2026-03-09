import { useState } from 'react';
import { Monitor, Bot, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockProducts, type OpenClawProduct } from './openClawData';
import { OpenClawDetailDialog } from './OpenClawDetailDialog';

const statusConfig = {
  available: { label: '可交易', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  sold: { label: '已售罄', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  presale: { label: '预售中', className: 'bg-gold/20 text-gold border-gold/30' },
};

export function OpenClawProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<OpenClawProduct | null>(null);

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">在售军团</h2>
          <p className="text-slate-400">精选已训练完成的AI数字员工军团，即买即用</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => {
            const status = statusConfig[product.status];
            return (
              <div
                key={product.id}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-gold/40 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Header with status */}
                <div className="relative p-5 pb-3">
                  <Badge className={`absolute top-4 right-4 ${status.className} border text-xs`}>
                    {status.label}
                  </Badge>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                      <Monitor className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{product.name}</h3>
                      <p className="text-slate-500 text-xs">{product.id}</p>
                    </div>
                  </div>
                </div>

                {/* Employee icons */}
                <div className="px-5 pb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {product.employees.map((emp) => (
                      <span key={emp} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 text-slate-400 text-xs">
                        <Bot className="w-3 h-3" />
                        {emp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Config */}
                <div className="px-5 pb-3 space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>硬件配置</span>
                    <span className="text-slate-300">{product.hardware}</span>
                  </div>
                  {product.runDays > 0 && (
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 已运行</span>
                      <span className="text-slate-300">{product.runDays} 天</span>
                    </div>
                  )}
                  {product.totalRevenue > 0 && (
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 累计收益</span>
                      <span className="text-green-400">¥{product.totalRevenue.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Price + ROI */}
                <div className="border-t border-white/10 p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-slate-500 text-xs">挂牌价格</span>
                    <span className="text-2xl font-bold text-gold">¥{product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="text-slate-500">预期月收益 </span>
                      <span className="text-green-400 font-semibold">¥{product.monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">年化 </span>
                      <span className="text-green-400 font-semibold">{product.annualReturn}%</span>
                    </div>
                  </div>
                  <Button
                    variant="gold"
                    className="w-full"
                    disabled={product.status === 'sold'}
                  >
                    {product.status === 'sold' ? '已售罄' : product.status === 'presale' ? '预约购买' : '立即购买'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <OpenClawDetailDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
