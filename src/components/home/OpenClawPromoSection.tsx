import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Monitor, DollarSign, Percent, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImg from '@/assets/openclaw-hero.png';

const stats = [
  { icon: Monitor, value: '12', unit: '台', label: '已挂牌资产' },
  { icon: DollarSign, value: '¥168', unit: '万', label: '累计交易额' },
  { icon: Percent, value: '58', unit: '%/月', label: '平均收益率' },
  { icon: Server, value: '8', unit: '个', label: '运行中军团' },
];

export function OpenClawPromoSection() {
  return (
    <section className="py-16 bg-[hsl(220,50%,8%)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium">
              <Bot className="w-4 h-4" />
              数字资产挂牌交易
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              <span className="text-gold">OpenClaw</span>
              <br />
              数字资产挂牌交易
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-lg">
              Mac Mini + AI数字员工军团，即买即用，持续产生收益。已训练好的AI军团，开箱即用，稳定运营。
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/openclaw">
                <Button variant="gold" size="lg" className="gap-2">
                  浏览在售军团
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/openclaw">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  了解运作模式
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <img
              src={heroImg}
              alt="OpenClaw Mac Mini AI数字员工军团工作站"
              className="rounded-2xl border border-white/10 shadow-2xl w-full object-cover"
            />
            <div className="absolute -inset-2 rounded-3xl border border-gold/20 pointer-events-none" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 p-6 text-center">
              <stat.icon className="w-6 h-6 text-slate-400 mx-auto mb-3" />
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-3xl font-bold text-gold">{stat.value}</span>
                <span className="text-base text-slate-400">{stat.unit}</span>
                <span className="text-green-400 text-sm ml-1">↗</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
