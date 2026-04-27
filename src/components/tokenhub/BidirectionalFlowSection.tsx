import { ArrowRight, ArrowLeft, Ship, PlaneLanding, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function BidirectionalFlowSection() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Token 双向流转 · 一个香港枢纽
          </h2>
          <p className="text-muted-foreground">
            香港作为中立、合规、可结算的国际数据港，让 Token 资产与算力服务在两个方向上自由、安全地流动。
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          {/* 出海 */}
          <Card className="p-6 lg:p-8 border-gold/20 bg-gradient-to-br from-gold/5 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gold/15 text-gold flex items-center justify-center">
                <Ship className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gold font-medium tracking-wider uppercase">Outbound</div>
                <h3 className="text-xl font-semibold text-foreground">Token 出海</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              帮助大陆数据持有方、模型方将资产 Token 化、合规出境，对接全球买家。
            </p>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li className="flex gap-2"><span className="text-gold">›</span>数据资产 Token 化与质量评分</li>
              <li className="flex gap-2"><span className="text-gold">›</span>合规出境通道与审计追溯</li>
              <li className="flex gap-2"><span className="text-gold">›</span>多币种结算与全球开票</li>
              <li className="flex gap-2"><span className="text-gold">›</span>面向全球 AI 训练 / 推理买家分发</li>
            </ul>
            <div className="mt-5 flex items-center gap-2 text-gold text-sm font-medium">
              大陆 <ArrowRight className="w-4 h-4" /> 香港 <ArrowRight className="w-4 h-4" /> 全球
            </div>
          </Card>

          {/* 中央枢纽 */}
          <div className="hidden lg:flex flex-col items-center justify-center px-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-2xl" />
              <div className="relative w-28 h-28 rounded-full border-2 border-gold/40 bg-background flex flex-col items-center justify-center">
                <Building2 className="w-8 h-8 text-gold mb-1" />
                <div className="text-xs font-bold text-foreground">HONG KONG</div>
                <div className="text-[10px] text-muted-foreground">Token Hub</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground text-center max-w-[140px]">
              合规 · 结算 · 路由
            </div>
          </div>

          {/* 入境 */}
          <Card className="p-6 lg:p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                <PlaneLanding className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-primary font-medium tracking-wider uppercase">Inbound</div>
                <h3 className="text-xl font-semibold text-foreground">全球大模型入境</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              为大陆中小企业提供经香港合规调用国际领先大模型（OpenAI / Anthropic / Google / Meta）的统一入口。
            </p>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li className="flex gap-2"><span className="text-primary">›</span>统一 OpenAI 兼容 API 网关</li>
              <li className="flex gap-2"><span className="text-primary">›</span>聚合 GPT / Claude / Gemini / Llama</li>
              <li className="flex gap-2"><span className="text-primary">›</span>HKD / USD / USDC 结算，香港主体开票</li>
              <li className="flex gap-2"><span className="text-primary">›</span>按 Token 计费，无最低消费</li>
            </ul>
            <div className="mt-5 flex items-center gap-2 text-primary text-sm font-medium">
              全球 <ArrowLeft className="w-4 h-4" /> 香港 <ArrowLeft className="w-4 h-4" /> 大陆中小企业
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
