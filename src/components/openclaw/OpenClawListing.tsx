import { useState } from 'react';
import { FileText, Link2, ShieldCheck, Store, Award, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OpenClawListingForm } from './OpenClawListingForm';

const listingSteps = [
  { icon: FileText, title: '提交申请', desc: '填写军团信息与收益数据' },
  { icon: Link2, title: '链上存证', desc: 'Polygon 公链存证基础信息' },
  { icon: ShieldCheck, title: '交易所审核', desc: '合规审核 + 技术验证' },
  { icon: Store, title: '挂牌交易', desc: '正式上架，面向全球买家' },
  { icon: Award, title: '颁发证书', desc: '数字资产挂牌认证证书' },
];

const plans = [
  {
    id: 'basic',
    name: '基础挂牌',
    price: '2,999',
    features: ['Polygon 链上存证', '基础合规审核', '标准展位展示', '挂牌证书（电子版）'],
    recommended: false,
  },
  {
    id: 'preferred',
    name: '优选挂牌',
    price: '5,999',
    features: ['包含基础挂牌全部服务', '首页推荐展示 30 天', '专属挂牌顾问', '收益认证报告', '挂牌证书（实体+电子）'],
    recommended: true,
  },
  {
    id: 'flagship',
    name: '旗舰挂牌',
    price: '9,999',
    features: ['包含优选挂牌全部服务', '专业视频展示制作', '社群推广与曝光', '优先匹配买家资源', 'VIP 一对一服务'],
    recommended: false,
  },
];

export function OpenClawListing() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('preferred');

  const openWithPlan = (planId: string) => {
    setSelectedPlan(planId);
    setFormOpen(true);
  };

  return (
    <section className="py-20 border-t border-white/5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-[hsl(43,75%,47%)]/10 text-[hsl(43,75%,47%)] border-[hsl(43,75%,47%)]/20 mb-4">
            开放挂牌
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            您也有训练好的龙虾？来交易所挂牌！
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            邀请市场上基于 Mac Mini 的 AI 军团到香港大数据交易所挂牌交易，获得合规认证与更广泛的买家市场
          </p>
        </div>

        {/* 5-Step Listing Process */}
        <div className="mb-20">
          <h3 className="text-xl font-semibold text-white text-center mb-8">挂牌流程</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {listingSteps.map((step, i) => (
              <div key={step.title} className="relative text-center group">
                {i < listingSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-[hsl(43,75%,47%)]/40 to-[hsl(43,75%,47%)]/10" />
                )}
                <div className="w-20 h-20 rounded-2xl bg-[hsl(43,75%,47%)]/10 border border-[hsl(43,75%,47%)]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[hsl(43,75%,47%)]/20 transition-colors">
                  <step.icon className="w-8 h-8 text-[hsl(43,75%,47%)]" />
                </div>
                <div className="text-[hsl(43,75%,47%)] text-xs font-semibold mb-1">STEP {i + 1}</div>
                <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white text-center mb-8">收费标准</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 transition-all hover:-translate-y-1 ${
                  plan.recommended
                    ? 'bg-white/[0.08] border-2 border-[hsl(43,75%,47%)]/50 shadow-[0_0_30px_-10px_hsl(43,75%,47%,0.2)]'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {plan.recommended && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(43,75%,47%)] text-white border-0">
                    推荐
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h4 className="text-white font-semibold text-lg mb-2">{plan.name}</h4>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-[hsl(43,75%,47%)] text-3xl font-bold">¥{plan.price}</span>
                    <span className="text-slate-500 text-sm">/次</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-[hsl(43,75%,47%)] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.recommended ? 'gold' : 'outline'}
                  className={`w-full ${!plan.recommended ? 'border-white/20 text-white hover:bg-white/10 bg-transparent' : ''}`}
                  onClick={() => openWithPlan(plan.id)}
                >
                  立即申请
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="gold" size="xl" onClick={() => setFormOpen(true)}>
            立即提交挂牌申请
          </Button>
          <p className="text-slate-500 text-sm mt-3">提交后 1-3 个工作日内审核回复</p>
        </div>
      </div>

      <OpenClawListingForm open={formOpen} onOpenChange={setFormOpen} defaultPlan={selectedPlan} />
    </section>
  );
}
