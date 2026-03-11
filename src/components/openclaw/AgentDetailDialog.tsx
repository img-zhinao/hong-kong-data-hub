import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Monitor, Clock, TrendingUp } from 'lucide-react';
import { AgentPassport } from './AgentPassport';
import { DynamicValuation } from './DynamicValuation';
import { C2DVerification } from './C2DVerification';
import { ComplianceLabels } from './ComplianceLabels';
import type { OpenClawAgent } from './openClawData';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RTooltip } from 'recharts';

const statusConfig = {
  available: { label: '可交易', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  sold: { label: '已售罄', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  presale: { label: '预售中', className: 'bg-gold/20 text-gold border-gold/30' },
};

export function AgentDetailDialog({ agent, onClose }: { agent: OpenClawAgent | null; onClose: () => void }) {
  if (!agent) return null;
  const status = statusConfig[agent.status];

  return (
    <Dialog open={!!agent} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-3xl bg-[#0d1f3c] border-white/10 text-white max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-gold" />
              </div>
              <div>
                <DialogTitle className="text-xl text-white">{agent.name}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-0.5">{agent.id} · {agent.hardware}</p>
              </div>
            </div>
            <Badge className={`${status.className} border`}>{status.label}</Badge>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* SOUL & IDENTITY descriptions */}
          {(agent.soulDescription || agent.identityDescription) && (
            <div className="grid gap-3">
              {agent.soulDescription && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-mono text-gold">SOUL.md</span>
                  <p className="text-sm text-white/80 mt-1">{agent.soulDescription}</p>
                </div>
              )}
              {agent.identityDescription && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-mono text-gold">IDENTITY.md</span>
                  <p className="text-sm text-white/80 mt-1">{agent.identityDescription}</p>
                </div>
              )}
            </div>
          )}

          {/* Employees */}
          <div>
            <h4 className="text-sm text-muted-foreground mb-2">AI 员工编制</h4>
            <div className="flex flex-wrap gap-1.5">
              {agent.employees.map(emp => (
                <span key={emp} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-white/80 text-xs">
                  <Bot className="w-3 h-3 text-gold" />{emp}
                </span>
              ))}
            </div>
          </div>

          {/* Hardware specs */}
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { label: '型号', value: agent.hardwareSpec.model },
              { label: 'RAM', value: `${agent.hardwareSpec.ram}GB` },
              { label: '存储', value: `${agent.hardwareSpec.storage}GB` },
              { label: '数量', value: `${agent.hardwareSpec.quantity}台` },
            ].map(s => (
              <div key={s.label} className="p-2 rounded-lg bg-white/5">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="text-sm font-medium text-white mt-0.5">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Revenue chart */}
          {agent.revenueHistory.length > 0 && (
            <div>
              <h4 className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> 收益曲线
              </h4>
              <div className="h-40 w-full">
                <ResponsiveContainer>
                  <AreaChart data={agent.revenueHistory}>
                    <defs>
                      <linearGradient id="agGold" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(43 75% 47%)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(43 75% 47%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={50} />
                    <RTooltip contentStyle={{ background: '#0d1f3c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(43 75% 47%)" fill="url(#agGold)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Agent Passport */}
          <AgentPassport agent={agent} />

          {/* Dynamic Valuation */}
          <DynamicValuation agent={agent} />

          {/* Compliance */}
          <ComplianceLabels compliance={agent.compliance} />

          {/* C2D Verification */}
          <C2DVerification agent={agent} />

          {/* Price + CTA */}
          <div className="border-t border-white/10 pt-5 flex items-center justify-between">
            <div>
              <span className="text-muted-foreground text-sm">挂牌价格</span>
              <div className="text-3xl font-bold text-gold">¥{agent.price.toLocaleString()}</div>
              <div className="flex gap-3 text-xs mt-1">
                <span className="text-muted-foreground">预期月收益 <span className="text-green-400 font-semibold">¥{agent.monthlyRevenue.toLocaleString()}</span></span>
                <span className="text-muted-foreground">年化 <span className="text-green-400 font-semibold">{agent.annualReturn}%</span></span>
              </div>
            </div>
            <Button variant="gold" size="lg" disabled={agent.status === 'sold'}>
              {agent.status === 'sold' ? '已售罄' : agent.status === 'presale' ? '预约购买' : '立即购买'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
