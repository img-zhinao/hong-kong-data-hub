import { TrendingUp, Server, DollarSign, Percent, Cpu } from 'lucide-react';

const stats = [
  { label: '已挂牌资产', value: '12', unit: '台', icon: Server },
  { label: '累计交易额', value: '168', unit: '万', prefix: '¥', icon: DollarSign },
  { label: '平均收益率', value: '58', unit: '%/月', icon: Percent },
  { label: '运行中军团', value: '8', unit: '个', icon: Cpu },
];

export function OpenClawStats() {
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
