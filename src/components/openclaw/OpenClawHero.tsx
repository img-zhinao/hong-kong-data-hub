import { Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImg from '@/assets/openclaw-hero.png';

export function OpenClawHero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium">
              <Bot className="w-4 h-4" />
              Agentic AI 资产化交易平台
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              OpenClaw
              <br />
              <span className="text-gold">智能体资产交易</span>
            </h1>
            <p className="text-lg text-white/70 max-w-lg leading-relaxed">
              面向 AI 智能体的资产化交易平台。育种者挂牌训练好的 AI 军团，用工市场按需挑选即买即用的数字员工。
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#market-tabs">
                <Button variant="gold" size="xl" className="gap-2">
                  进入用工市场
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="#market-tabs">
                <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  我要挂牌
                </Button>
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImg}
              alt="OpenClaw Agentic AI 资产交易平台"
              decoding="async"
              fetchPriority="high"
              width={1200}
              height={800}
              className="rounded-2xl border border-white/10 shadow-2xl w-full h-auto object-cover aspect-[3/2]"
            />
            <div className="absolute -inset-2 rounded-3xl border border-gold/20 animate-pulse-glow pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
