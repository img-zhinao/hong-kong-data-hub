import { CreditCard, Plug, ShieldCheck, Gauge } from 'lucide-react';
import { Card } from '@/components/ui/card';

const items = [
  {
    icon: CreditCard,
    pain: '国际大模型支付 / 合规难',
    solution: '香港主体统一开票，HKD / USD / USDC 结算，免去海外信用卡与外汇困扰。',
  },
  {
    icon: Plug,
    pain: '多模型 API 切换成本高',
    solution: '单一 OpenAI 兼容接口聚合 GPT、Claude、Gemini、Llama 等主流模型，一次接入随时切换。',
  },
  {
    icon: ShieldCheck,
    pain: '数据出海合规风险',
    solution: '香港合规通道 + Token 化脱敏 + 完整审计追溯，符合跨境数据流通监管要求。',
  },
  {
    icon: Gauge,
    pain: '起量门槛高、试错成本大',
    solution: '按 Token 实际消耗计费，无最低消费、无月费，按需充值，适配中小企业节奏。',
  },
];

export function SMEValueSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium mb-3 tracking-wider">
            FOR SME · 面向中小企业
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            为什么中小企业选择 Token Hub
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            一站式解决中小企业接入国际 AI 与数据资产出海的四大核心痛点。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <Card key={i} className="p-6 hover:border-gold/30 transition-colors">
              <div className="w-11 h-11 rounded-lg bg-gold/10 text-gold flex items-center justify-center mb-4">
                <it.icon className="w-5 h-5" />
              </div>
              <div className="text-xs text-muted-foreground mb-1">痛点</div>
              <h3 className="font-semibold text-foreground mb-3">{it.pain}</h3>
              <div className="text-xs text-gold mb-1">Token Hub 方案</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.solution}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
