import { ShoppingCart, CreditCard, ArrowRightLeft, Coins } from 'lucide-react';

const steps = [
  { icon: ShoppingCart, title: '选购军团', desc: '浏览在售军团，查看配置与收益数据' },
  { icon: CreditCard, title: '支付购买', desc: '确认订单，完成安全支付' },
  { icon: ArrowRightLeft, title: '过户移交', desc: '硬件寄送+远程配置，账户完整移交' },
  { icon: Coins, title: '开始收益', desc: '军团立即开始运营，收益自动结算' },
];

export function OpenClawProcess() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">交易流程</h2>
          <p className="text-slate-400">四步完成军团过户，即刻开始收益</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/40 to-gold/10" />
              )}
              <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <step.icon className="w-8 h-8 text-gold" />
              </div>
              <div className="text-gold text-xs font-semibold mb-1">STEP {i + 1}</div>
              <h3 className="text-white font-semibold mb-1">{step.title}</h3>
              <p className="text-slate-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
