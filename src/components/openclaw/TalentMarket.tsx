import { useState, useMemo } from 'react';
import { Monitor, Bot, Clock, TrendingUp, Brain, Globe, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useOpenClawAgents } from '@/hooks/useOpenClawAgents';
import type { OpenClawAgent } from './openClawData';
import { ComplianceLabels } from './ComplianceLabels';
import { AgentDetailDialog } from './AgentDetailDialog';

const statusConfig = {
  available: { label: '可交易', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  sold: { label: '已售罄', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  presale: { label: '预售中', className: 'bg-gold/20 text-gold border-gold/30' },
};

export function TalentMarket() {
  const { data: agents = [], isLoading, error } = useOpenClawAgents();
  const [selectedAgent, setSelectedAgent] = useState<OpenClawAgent | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [hwFilter, setHwFilter] = useState('all');
  const [tcrFilter, setTcrFilter] = useState('all');

  const filtered = useMemo(() => {
    return agents.filter(a => {
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (hwFilter !== 'all' && !a.hardwareSpec.model.includes(hwFilter)) return false;
      if (tcrFilter === '80+' && a.metrics.tcr < 80) return false;
      if (tcrFilter === '60-80' && (a.metrics.tcr < 60 || a.metrics.tcr >= 80)) return false;
      if (tcrFilter === '<60' && a.metrics.tcr >= 60) return false;
      return true;
    });
  }, [agents, statusFilter, hwFilter, tcrFilter]);

  if (error) {
    return (
      <section className="py-10">
        <div className="container text-center text-red-400">加载失败，请稍后重试。</div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="container">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
          <Filter className="w-4 h-4 text-gold" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] bg-white/5 border-white/10 text-white text-sm h-9">
              <SelectValue placeholder="状态" />
            </SelectTrigger>
            <SelectContent className="bg-[#0d1f3c] border-white/10">
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="available">可交易</SelectItem>
              <SelectItem value="presale">预售中</SelectItem>
              <SelectItem value="sold">已售罄</SelectItem>
            </SelectContent>
          </Select>
          <Select value={hwFilter} onValueChange={setHwFilter}>
            <SelectTrigger className="w-[150px] bg-white/5 border-white/10 text-white text-sm h-9">
              <SelectValue placeholder="硬件型号" />
            </SelectTrigger>
            <SelectContent className="bg-[#0d1f3c] border-white/10">
              <SelectItem value="all">全部型号</SelectItem>
              <SelectItem value="M4 Pro">M4 Pro</SelectItem>
              <SelectItem value="M4">M4 (标准)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tcrFilter} onValueChange={setTcrFilter}>
            <SelectTrigger className="w-[130px] bg-white/5 border-white/10 text-white text-sm h-9">
              <SelectValue placeholder="TCR" />
            </SelectTrigger>
            <SelectContent className="bg-[#0d1f3c] border-white/10">
              <SelectItem value="all">全部 TCR</SelectItem>
              <SelectItem value="80+">TCR ≥ 80%</SelectItem>
              <SelectItem value="60-80">60-80%</SelectItem>
              <SelectItem value="<60">{"< 60%"}</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs text-muted-foreground ml-auto">{isLoading ? '...' : `${filtered.length} 个结果`}</span>
        </div>

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4">
                <Skeleton className="h-12 w-3/4 bg-white/10" />
                <Skeleton className="h-6 w-1/2 bg-white/10" />
                <Skeleton className="h-20 w-full bg-white/10" />
                <Skeleton className="h-10 w-full bg-white/10" />
              </div>
            ))}
          </div>
        ) : (
          /* Cards grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(agent => {
              const status = statusConfig[agent.status];
              const tcrColor = agent.metrics.tcr >= 80 ? 'text-green-400' : agent.metrics.tcr >= 60 ? 'text-yellow-400' : 'text-red-400';
              return (
                <div
                  key={agent.id}
                  className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-gold/40 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="relative p-5 pb-3">
                    <Badge className={`absolute top-4 right-4 ${status.className} border text-xs`}>{status.label}</Badge>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                        <Monitor className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{agent.name}</h3>
                        <p className="text-muted-foreground text-xs">{agent.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics bar */}
                  <div className="px-5 pb-3 flex gap-4">
                    <div className="flex items-center gap-1 text-xs">
                      <Brain className="w-3 h-3 text-gold" />
                      <span className="text-muted-foreground">TCR</span>
                      <span className={`font-semibold ${tcrColor}`}>{agent.metrics.tcr}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Globe className="w-3 h-3 text-gold" />
                      <span className="text-muted-foreground">GEO</span>
                      <span className="text-gold font-semibold">{agent.metrics.geoScore}</span>
                    </div>
                  </div>

                  {/* Employees */}
                  <div className="px-5 pb-3">
                    <div className="flex flex-wrap gap-1">
                      {agent.employees.slice(0, 4).map(emp => (
                        <span key={emp} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground text-xs">
                          <Bot className="w-3 h-3" />{emp}
                        </span>
                      ))}
                      {agent.employees.length > 4 && (
                        <span className="text-xs text-muted-foreground px-1.5 py-0.5">+{agent.employees.length - 4}</span>
                      )}
                    </div>
                  </div>

                  {/* Compliance compact */}
                  <div className="px-5 pb-3">
                    <ComplianceLabels compliance={agent.compliance} compact />
                  </div>

                  {/* Config */}
                  <div className="px-5 pb-3 space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>硬件配置</span>
                      <span className="text-white/80">{agent.hardware}</span>
                    </div>
                    {agent.runDays > 0 && (
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 已运行</span>
                        <span className="text-white/80">{agent.runDays} 天</span>
                      </div>
                    )}
                    {agent.totalRevenue > 0 && (
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 累计收益</span>
                        <span className="text-green-400">¥{agent.totalRevenue.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="border-t border-white/10 p-5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-muted-foreground text-xs">挂牌价格</span>
                      <span className="text-2xl font-bold text-gold">¥{agent.price.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-4 text-xs">
                      <div><span className="text-muted-foreground">月收益 </span><span className="text-green-400 font-semibold">¥{agent.monthlyRevenue.toLocaleString()}</span></div>
                      <div><span className="text-muted-foreground">年化 </span><span className="text-green-400 font-semibold">{agent.annualReturn}%</span></div>
                    </div>
                    <Button variant="gold" className="w-full" disabled={agent.status === 'sold'}>
                      {agent.status === 'sold' ? '已售罄' : agent.status === 'presale' ? '预约购买' : '立即购买'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AgentDetailDialog agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </section>
  );
}
