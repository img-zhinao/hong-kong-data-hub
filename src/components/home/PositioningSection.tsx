import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, Building2, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function PositioningSection() {
  return (
    <section className="py-10 md:py-12 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-6 md:mb-8 gap-3">
          <h2 className="section-title">升级定位</h2>
          <Link to="/token-hub">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 whitespace-nowrap">
              了解更多 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <Card className="p-6 sm:p-8 lg:p-10 border-gold/20 bg-gradient-to-br from-gold/5 via-background to-primary/5 mb-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-medium mb-4 tracking-wider">
              <Globe2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">STRATEGIC POSITIONING · </span>国际合规中间层
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-snug mb-4">
              <span className="text-gold">大湾区数据供给</span> × <span className="text-gold">东南亚数据需求</span>
              <br />
              的国际合规中间层
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              香港的独特价值在于：它是唯一同时对接<span className="text-foreground font-semibold">内地数据要素政策（数据二十条）</span>和
              <span className="text-foreground font-semibold">国际合规标准（英美法系）</span>的司法管辖区。
              越南 AI Law 要求"合法来源数据"，但越南本地没有成熟的合规数据流通基础设施——
              <span className="text-gold font-semibold">HKBDE 正好是那个可以用香港法律框架为越南企业提供"可信合规背书"的中间节点。</span>
            </p>
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-6 hover:border-gold/40 transition-colors hover-lift">
            <div className="w-12 h-12 rounded-lg bg-gold/15 text-gold flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-xs text-gold font-medium tracking-wider mb-2">HONG KONG</div>
            <h4 className="text-lg font-semibold text-foreground mb-2">香港</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              合规背书 + 国际信任。普通法体系与国际接轨，提供可信赖的法律框架与跨境结算能力。
            </p>
          </Card>

          <Card className="p-6 hover:border-primary/40 transition-colors hover-lift">
            <div className="w-12 h-12 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <div className="text-xs text-primary font-medium tracking-wider mb-2">VIETNAM · SEA</div>
            <h4 className="text-lg font-semibold text-foreground mb-2">越南 / 东南亚</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              本地数据供给 + 市场准入。庞大的本地数据资源与高速增长的 AI 应用市场需求。
            </p>
          </Card>

          <Card className="p-6 hover:border-gold/40 transition-colors hover-lift">
            <div className="w-12 h-12 rounded-lg bg-gold/15 text-gold flex items-center justify-center mb-4">
              <Network className="w-6 h-6" />
            </div>
            <div className="text-xs text-gold font-medium tracking-wider mb-2">MAINLAND CHINA</div>
            <h4 className="text-lg font-semibold text-foreground mb-2">内地</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              大数据供给 + 技术支持。全球领先的数据规模与 AI 工程能力，依托数据二十条合规出海。
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
