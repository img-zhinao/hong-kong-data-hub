import { Key, GitBranch, Wallet, Bot, X, Check, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const capabilities = [
  {
    icon: Key,
    title: 'Unified API Access',
    subtitle: '统一接入层',
    desc: '一把 API Key，覆盖 OpenAI、Anthropic、Google、Meta、Mistral、xAI 等主流模型。OpenAI 兼容协议，零迁移成本，账单与配额在香港合规网关侧统一结算。',
    tags: ['OpenAI Compatible', 'Single Key', 'Unified Billing'],
  },
  {
    icon: GitBranch,
    title: 'Multi-Model Routing',
    subtitle: '多模型路由与编排',
    desc: '按延迟、成本、上下文长度或合规域智能路由；同一请求可并行对比多模型输出，亦可在 Agent 工作流中动态切换 / 回退，避免单一模型供给侧风险。',
    tags: ['Smart Routing', 'A/B Compare', 'Fallback'],
  },
  {
    icon: Wallet,
    title: 'Web3 Native Access',
    subtitle: '原生 Web3 接入',
    desc: '支持钱包登录与稳定币结算，降低跨境注册与支付摩擦。链上凭证可作为 Token 调用配额，使数据集与模型调用具备可组合的资产属性。',
    tags: ['Wallet Login', 'Stablecoin Pay', 'On-chain Quota'],
  },
  {
    icon: Bot,
    title: 'Agent-First Infrastructure',
    subtitle: '面向 Agent 的基础设施',
    desc: '原生适配 AI Agent 与自动化工作流：长连接、流式输出、函数调用、工具协议（MCP / Function Calling）一致暴露，配套 SDK、可观测与速率治理。',
    tags: ['Streaming', 'Function Call', 'MCP Ready'],
  },
];

const compareRows = [
  { legacy: '在多个模型平台分别注册、各自 KYC', modern: '一次接入，统一身份与配额' },
  { legacy: '维护多个 API Key、多套 SDK 与计费口径', modern: '单一 Key、OpenAI 兼容协议、统一账单' },
  { legacy: '跨境支付受限，信用卡 / 发票流程繁琐', modern: '法币 + 稳定币双通道，钱包即结算' },
  { legacy: '模型切换需改代码，缺乏路由与回退', modern: '声明式多模型路由、对比与故障切换' },
  { legacy: 'Agent / 工具链需自行适配各家差异', modern: '统一的流式、函数调用与工具协议' },
  { legacy: '调用日志与合规审计分散在各供应商', modern: '香港合规网关侧统一审计与可观测' },
];

export function UnifiedAccessLayerSection() {
  return (
    <section id="unified-access" className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-gold/90 border border-gold/25 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            ACCESS LAYER · v2
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            面向 AI Agent 与全球开发者的<br className="hidden lg:block" />
            <span className="text-gold">统一接入层</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            新一代 Token Hub 不再只是 Token 列表或入口聚合，而是把模型、数据、支付、身份与合规收敛到一个可编程的接入层。
            一次接入，便可在多模型之间自由调度，让中小企业与 Agent 开发者以更低的摩擦获得稳定、合规、可结算的全球 AI 能力。
          </p>
        </div>

        {/* Capability cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {capabilities.map((c) => (
            <Card
              key={c.title}
              className="group relative p-6 bg-card/60 backdrop-blur-sm border-border/60 hover:border-gold/40 transition-all duration-300 overflow-hidden"
            >
              {/* micro glow */}
              <div className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{ boxShadow: '0 0 0 1px hsl(var(--gold) / 0.25), 0 8px 40px -12px hsl(var(--gold) / 0.25)' }} />
              <div className="relative">
                <div className="w-10 h-10 rounded-md bg-gold/10 text-gold flex items-center justify-center mb-5 border border-gold/20">
                  <c.icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-muted-foreground tracking-wider mb-1">
                  {c.title}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  {c.subtitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {c.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Compare module */}
        <div className="grid lg:grid-cols-2 gap-px bg-border/60 rounded-xl overflow-hidden border border-border/60 mb-12">
          {/* Legacy */}
          <div className="bg-card/40 p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-muted-foreground tracking-wider">LEGACY</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-6">
              传统接入方式
            </h3>
            <ul className="space-y-3">
              {compareRows.map((r) => (
                <li key={r.legacy} className="flex items-start gap-3 text-sm">
                  <X className="w-4 h-4 text-muted-foreground/70 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{r.legacy}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Token Hub */}
          <div className="bg-gradient-to-br from-gold/[0.04] to-transparent p-6 lg:p-8 relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-gold tracking-wider">TOKEN HUB</span>
              <span className="h-px flex-1 bg-gold/20" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Token Hub 接入方式
            </h3>
            <ul className="space-y-3">
              {compareRows.map((r) => (
                <li key={r.modern} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">{r.modern}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 rounded-lg border border-border/60 bg-card/40">
          <div>
            <div className="text-sm font-semibold text-foreground mb-0.5">
              申请沙箱 API Key,体验统一接入层
            </div>
            <div className="text-xs text-muted-foreground">
              首批面向中小企业与 Agent 开发者灰度开放 · 1 个工作日内开通
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="#model-gateway">查看接口文档</a>
            </Button>
            <Button variant="gold" size="sm" asChild>
              <a href="#apply" className="gap-1.5">
                立即申请 <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
