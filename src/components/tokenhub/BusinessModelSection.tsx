import { Package, Code, Boxes, Layers, Coins } from 'lucide-react';
import { Card } from '@/components/ui/card';

const stages = [
  { icon: Package, title: '基础数据包销售', desc: '一次性打包下载' },
  { icon: Code, title: 'API 调用', desc: '按调用次数 / 词元计费' },
  { icon: Boxes, title: '模型化解决方案', desc: '数据 + 微调模型组合输出' },
  { icon: Layers, title: '全栈服务', desc: '数据 + 模型 + 算力 + 应用' },
];

export function BusinessModelSection() {
  return (
    <section id="business-model" className="py-12 md:py-16 lg:py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            商业模式梯次跃升
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            响应国家数据局指引，Token Hub 支持从传统数据包销售向 API、模型化、全栈服务的渐进升级，
            构建以<span className="text-gold font-semibold">词元为基础、可量化、可定价</span>的数据集价值体系。
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3">
            在「香港 Token 流转平台」定位下，<span className="text-gold">基础数据包销售</span>与
            <span className="text-gold"> API 调用</span>分别对应 Token 出海与全球大模型入境两条主线，
            后续可延伸至模型化解决方案与全栈服务。
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stages.map((s, i) => (
            <Card key={i} className="p-6 text-center relative overflow-hidden">
              <div className="absolute top-2 right-3 text-5xl font-bold text-muted/30 select-none">
                0{i + 1}
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 lg:p-8 border-gold/30 bg-gradient-to-br from-gold/5 to-transparent">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gold/20 text-gold flex items-center justify-center flex-shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                词元（Token）交易：新型数据集交易模式
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Token Hub 推动以词元为基础单位的数据集计价与结算。买卖双方以可量化、可审计的词元数为交易标的，
                既匹配 AI 大模型训练 / 推理的实际消耗逻辑，也使数据集定价更精细、更公允，便于跨数据集对比与组合采购。
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
