import { Sparkles, Brain, Bot, Cpu, Wind, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const models = [
  { icon: Sparkles, name: 'OpenAI', tag: 'GPT-5 / GPT-5 mini' },
  { icon: Brain, name: 'Anthropic', tag: 'Claude Sonnet / Opus' },
  { icon: Bot, name: 'Google', tag: 'Gemini 3 Pro / Flash' },
  { icon: Cpu, name: 'Meta', tag: 'Llama 4 系列' },
  { icon: Wind, name: 'Mistral', tag: 'Large / Codestral' },
  { icon: Zap, name: 'xAI', tag: 'Grok 系列' },
];

const codeSample = `// OpenAI 兼容接口 · 香港合规网关
const res = await fetch(
  "https://api.tokenhub.hk/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer <YOUR_TOKENHUB_KEY>",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-5",          // 也可换为 anthropic/claude-* 或 google/gemini-*
      messages: [{ role: "user", content: "你好" }],
    }),
  }
);`;

export function ModelGatewaySection() {
  return (
    <section id="model-gateway" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            国际大模型聚合网关
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            一个 API Key、一个 OpenAI 兼容接口，随时切换全球领先大模型。所有调用经由香港合规网关，统一 Token 计费与结算。
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {models.map((m) => (
            <Card key={m.name} className="p-4 text-center hover:border-gold/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center mx-auto mb-2">
                <m.icon className="w-5 h-5" />
              </div>
              <div className="font-semibold text-foreground text-sm">{m.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{m.tag}</div>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden border-gold/20">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border text-xs">
            <span className="text-muted-foreground font-mono">tokenhub-quickstart.ts</span>
            <span className="text-gold">OpenAI 兼容 · 香港 Endpoint</span>
          </div>
          <pre className="p-4 lg:p-6 text-xs lg:text-sm text-foreground/90 overflow-x-auto leading-relaxed">
            <code>{codeSample}</code>
          </pre>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-4">
          * 接口 Endpoint 与 API Key 申请正在面向首批中小企业灰度开放，详情请联系香港大数据交易所。
        </p>
      </div>
    </section>
  );
}
