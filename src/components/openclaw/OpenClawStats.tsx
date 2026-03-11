import { TrendingUp, Server, DollarSign, Percent, Cpu } from 'lucide-react';
import { useOpenClawAgents } from '@/hooks/useOpenClawAgents';
import { useMemo } from 'react';

export function OpenClawStats() {
  const { data: agents = [] } = useOpenClawAgents();

  const stats = useMemo(() => {
    const listed = agents.length;
    const totalTx = agents.reduce((s, a) => s + a.totalRevenue, 0);
    const avgReturn = agents.length > 0 ? Math.round(agents.reduce((s, a) => s + a.annualReturn, 0) / agents.length) : 0;
    const running = agents.filter(a => a.runDays > 0).length;

    return [
      { label: '已挂牌资产', value: String(listed), unit: '台', icon: Server },
      { label: '累计交易额', value: totalTx >= 10000 ? String(Math.round(totalTx / 10000)) : String(totalTx), unit: totalTx >= 10000 ? '万' : '元', prefix: '¥', icon: DollarSign },
      { label: '平均收益率', value: String(avgReturn), unit: '%/年', icon: Percent },
      { label: '运行中军团', value: String(running), unit: '个', icon: Cpu },
    ];
  }, [agents]);

  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center hover:border-gold/40 transition-colors group"
            >
              <stat.icon className="w-8 h-8 text-gold/60 mx-auto mb-3 group-hover:text-gold transition-colors" />
              <div className="text-3xl lg:text-4xl font-bold text-gold flex items-center justify-center gap-1">
                {stat.prefix && <span className="text-xl">{stat.prefix}</span>}
                {stat.value}
                <span className="text-lg text-gold/70">{stat.unit}</span>
                <TrendingUp className="w-5 h-5 text-green-400 ml-1" />
              </div>
              <p className="text-slate-400 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
