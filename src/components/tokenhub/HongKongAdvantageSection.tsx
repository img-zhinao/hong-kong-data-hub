import { Globe2, Banknote, Scale, Network } from 'lucide-react';
import { Card } from '@/components/ui/card';

const advantages = [
  {
    icon: Globe2,
    title: '国际数据自由港',
    desc: '跨境数据流通便利，中立可信，连接大陆与全球 AI 生态。',
  },
  {
    icon: Banknote,
    title: '多币种结算',
    desc: '支持 HKD / USD / CNH / USDC，香港主体全球开票，财务合规省心。',
  },
  {
    icon: Scale,
    title: '普通法体系',
    desc: '完善的合同法与 IP 保护，国际仲裁中心，跨境交易争议可控。',
  },
  {
    icon: Network,
    title: '政策衔接',
    desc: '与 CEPA、大湾区数据跨境流通政策衔接，享受制度型开放红利。',
  },
];

export function HongKongAdvantageSection() {
  return (
    <section className="py-16 lg:py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            为什么是<span className="text-gold">香港</span>
          </h2>
          <p className="text-muted-foreground">
            香港的独特制度优势，使其成为 Token 跨境流转、AI 服务双向接入的最佳枢纽。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {advantages.map((a, i) => (
            <Card key={i} className="p-6 text-center hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
                <a.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
