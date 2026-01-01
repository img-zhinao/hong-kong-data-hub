import { TrendingUp, Database, Users, FileText } from 'lucide-react';

const stats = [
  {
    icon: Database,
    value: '5,000+',
    label: '数据产品',
    trend: '+12%',
    color: 'primary',
  },
  {
    icon: Users,
    value: '800+',
    label: '入驻数商',
    trend: '+28%',
    color: 'secondary',
  },
  {
    icon: TrendingUp,
    value: '150亿',
    label: '交易规模（港元）',
    trend: '+45%',
    color: 'gold',
  },
  {
    icon: FileText,
    value: '12,000+',
    label: '完成交易',
    trend: '+35%',
    color: 'bronze',
  },
];

export function DataStatsSection() {
  return (
    <section className="py-12 bg-gradient-hero">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
            数据交易<span className="text-gradient-gold">核心指标</span>
          </h2>
          <p className="text-primary-foreground/70">
            实时统计交易所核心业务数据
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 text-center hover:bg-primary-foreground/10 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/70 mb-2">
                {stat.label}
              </div>
              <div className="inline-flex items-center gap-1 text-xs text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>同比 {stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
