import { Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImg from '@/assets/openclaw-hero.png';

export function OpenClawHero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium">
              <Bot className="w-4 h-4" />
              数字资产挂牌交易
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              OpenClaw
              <br />
              <span className="text-gold">数字资产挂牌交易</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
              Mac Mini + AI数字员工军团，即买即用，持续产生收益。
              已训练好的AI军团，开箱即用，稳定运营。
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="gold" size="xl" className="gap-2">
                浏览在售军团
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10">
                了解运作模式
              </Button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Mac Mini visual */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Monitor className="w-20 h-20 text-gold mx-auto" />
                  <p className="text-white font-semibold text-lg">Mac Mini M4 Pro</p>
                  <div className="flex flex-wrap justify-center gap-2 px-6">
                    {['BossAgent', 'DataMiner', 'Writer', 'Coder', 'Designer', 'Analyst'].map((name) => (
                      <span key={name} className="px-2 py-1 rounded-md bg-gold/10 text-gold text-xs border border-gold/20">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Animated ring */}
              <div className="absolute -inset-4 rounded-3xl border border-gold/20 animate-pulse-glow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
