import { Coins, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TokenHubHero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium">
            <Coins className="w-4 h-4" />
            行业高质量数据集 · 词元交易市场
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
            Token Hub
            <br />
            <span className="text-gold">以词元为单位的数据交易</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            响应国家数据局《关于推进行业高质量数据集建设行动的实施方案》，构建以词元（Token）为基础、可量化、可定价的数据集价值体系，
            推动商业模式从基础数据包销售向 API 调用、模型化解决方案及全栈服务梯次跃升。
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a href="#datasets">
              <Button variant="gold" size="xl" className="gap-2">
                浏览数据集
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a href="#business-model">
              <Button variant="outline" size="xl">
                商业模式说明
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
