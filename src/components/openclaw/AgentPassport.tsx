import { Brain, Database, Globe, Activity } from 'lucide-react';
import type { OpenClawAgent } from './openClawData';

function CircularProgress({ value, size = 80, strokeWidth = 6 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? 'hsl(142 71% 45%)' : value >= 60 ? 'hsl(48 96% 53%)' : 'hsl(0 84% 60%)';

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(220 25% 20%)" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" className="transition-all duration-700"
      />
    </svg>
  );
}

export function AgentPassport({ agent }: { agent: OpenClawAgent }) {
  const { metrics } = agent;
  const tcrColor = metrics.tcr >= 80 ? 'text-green-400' : metrics.tcr >= 60 ? 'text-yellow-400' : 'text-red-400';
  const compressionPct = Math.round((1 - metrics.memoryCompression) * 100);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Activity className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-semibold text-white">龙虾简历 Agent Passport</h3>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* TCR */}
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5">
          <div className="relative">
            <CircularProgress value={metrics.tcr} />
            <span className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${tcrColor}`}>
              {metrics.tcr}%
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Brain className="w-3.5 h-3.5" />
            <span>任务成功率 TCR</span>
          </div>
        </div>

        {/* Memory Depth */}
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5">
          <div className="text-center">
            <div className="text-2xl font-bold text-gold">{metrics.memoryEntries.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">MEMORY.md 条目</div>
          </div>
          <div className="w-full">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>压缩比</span>
              <span className="text-gold">{(metrics.memoryCompression * 100).toFixed(0)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${compressionPct}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Database className="w-3.5 h-3.5" />
            <span>记忆深度</span>
          </div>
        </div>

        {/* GEO Score */}
        <div className="col-span-2 flex items-center justify-between p-4 rounded-xl bg-white/5">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gold" />
            <span className="text-sm text-muted-foreground">GEO 友好度评分</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gold">{metrics.geoScore}</span>
            <span className="text-muted-foreground text-sm">/100</span>
            <div className="flex gap-0.5 ml-1">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className={`text-sm ${metrics.geoScore >= star * 20 ? 'text-gold' : 'text-white/20'}`}>★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
