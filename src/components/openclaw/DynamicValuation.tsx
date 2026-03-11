import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { type OpenClawAgent, calculateBasePrice } from './openClawData';

function ParamTip({ label, desc }: { label: string; desc: string }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-gold font-mono cursor-help underline decoration-dashed underline-offset-2">{label}</span>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-navy border-white/20 text-white max-w-[200px] text-xs">
          {desc}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function DynamicValuation({ agent }: { agent: OpenClawAgent }) {
  const basePrice = calculateBasePrice(agent);
  const diff = agent.price - basePrice;
  const diffPct = ((diff / basePrice) * 100).toFixed(1);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-semibold text-white">动态估值器</h3>
      </div>

      {/* Formula display */}
      <div className="p-4 rounded-xl bg-white/5 border border-gold/20 mb-5">
        <div className="font-mono text-sm text-gold text-center leading-relaxed">
          P<sub>base</sub> = (
          <ParamTip label="α" desc="TCR 权重系数 = 100" /> · TCR +{' '}
          <ParamTip label="β" desc="运行时长权重 = 500" /> · log(T) +{' '}
          <ParamTip label="γ" desc="员工数量权重 = 200" /> · S<sub>count</sub>
          ) × <ParamTip label="C_HW" desc={`硬件折算系数 = ${agent.hardwareSpec.hwCoefficient}`} />
        </div>
      </div>

      {/* Parameter values */}
      <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
        <div className="flex justify-between p-2 rounded-lg bg-white/5">
          <span className="text-muted-foreground">TCR</span>
          <span className="text-white font-medium">{agent.metrics.tcr}%</span>
        </div>
        <div className="flex justify-between p-2 rounded-lg bg-white/5">
          <span className="text-muted-foreground">运行天数 T</span>
          <span className="text-white font-medium">{agent.runDays} 天</span>
        </div>
        <div className="flex justify-between p-2 rounded-lg bg-white/5">
          <span className="text-muted-foreground">员工数 S</span>
          <span className="text-white font-medium">{agent.employees.length}</span>
        </div>
        <div className="flex justify-between p-2 rounded-lg bg-white/5">
          <span className="text-muted-foreground">C<sub>HW</sub></span>
          <span className="text-white font-medium">{agent.hardwareSpec.hwCoefficient}</span>
        </div>
      </div>

      {/* Result */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-gold/30 bg-gold/5">
        <div>
          <div className="text-xs text-muted-foreground">公式基准价</div>
          <div className="text-2xl font-bold text-gold">¥{basePrice.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">挂牌价差异</div>
          <div className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            <span className={`text-lg font-semibold ${diff > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {diff > 0 ? '+' : ''}{diffPct}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
