import { Monitor, Bot, Clock, TrendingUp, Eye, PhoneCall } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { OpenClawProduct } from './openClawData';

const statusConfig = {
  available: { label: '可交易', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  sold: { label: '已售罄', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  presale: { label: '预售中', className: 'bg-gold/20 text-gold border-gold/30' },
};

interface Props {
  product: OpenClawProduct | null;
  onClose: () => void;
}

export function OpenClawDetailDialog({ product, onClose }: Props) {
  if (!product) return null;
  const status = statusConfig[product.status];

  return (
    <Dialog open={!!product} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl bg-[hsl(220,35%,12%)] border-white/10 text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl text-white">{product.name}</DialogTitle>
            <Badge className={`${status.className} border text-xs`}>{status.label}</Badge>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left: Visual */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="text-center space-y-3">
                <Monitor className="w-16 h-16 text-gold mx-auto" />
                <p className="text-gold font-semibold">{product.hardware}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.employees.map((emp) => (
                <span key={emp} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gold/10 text-gold text-xs border border-gold/20">
                  <Bot className="w-3 h-3" />
                  {emp}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-3 text-center">
                <Clock className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{product.runDays} 天</p>
                <p className="text-xs text-slate-500">已运行</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-center">
                <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-400">¥{product.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-slate-500">累计收益</p>
              </div>
            </div>

            {/* Revenue chart */}
            {product.revenueHistory.length > 0 && (
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-3">收益曲线</p>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={product.revenueHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: 'hsl(220,35%,15%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }}
                      formatter={(value: number) => [`¥${value.toLocaleString()}`, '累计收益']}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2} dot={{ fill: '#d4af37', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Price */}
            <div className="rounded-xl bg-gold/5 border border-gold/20 p-4 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-400 text-sm">挂牌价格</span>
                <span className="text-3xl font-bold text-gold">¥{product.price.toLocaleString()}</span>
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-slate-500">预期月收益 </span>
                  <span className="text-green-400 font-semibold">¥{product.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500">年化收益率 </span>
                  <span className="text-green-400 font-semibold">{product.annualReturn}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-white/10 p-6 flex flex-wrap gap-3">
          <Button variant="gold" size="lg" className="flex-1" disabled={product.status === 'sold'}>
            {product.status === 'sold' ? '已售罄' : '立即购买'}
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
            <Eye className="w-4 h-4 mr-2" />
            加入观察清单
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
            <PhoneCall className="w-4 h-4 mr-2" />
            联系顾问
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
