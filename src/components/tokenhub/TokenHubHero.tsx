import { Coins, ArrowRight, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TokenHubHero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs sm:text-sm font-medium">
            <Globe2 className="w-4 h-4" />
            <span className="hidden sm:inline">香港 · 国际数据自由港 · </span>Token 双向流转枢纽
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
            Token Hub
            <br />
            <span className="text-gold">香港 Token 流转平台</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            依托香港国际数据自由港优势，为<span className="text-foreground font-semibold">中小企业</span>提供合规、低门槛的 Token 双向流转通道——
            既支持大陆数据资产 <span className="text-gold">Token 化合规出海</span>，
            也支持大陆企业经香港枢纽合规调用 <span className="text-gold">OpenAI / Anthropic / Google</span> 等国际领先大模型服务。
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-2">
            <a href="#model-gateway" className="w-full sm:w-auto">
              <Button variant="gold" size="xl" className="gap-2 w-full sm:w-auto">
                接入国际大模型
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a href="#datasets" className="w-full sm:w-auto">
              <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto">
                <Coins className="w-5 h-5" />
                Token 资产出海
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
