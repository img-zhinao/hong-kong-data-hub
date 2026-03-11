import { useState } from 'react';
import { Play, Loader2, CheckCircle2, XCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { OpenClawAgent } from './openClawData';

type RunState = 'idle' | 'running' | 'success' | 'failed';

const mockTasks = [
  { task: '生成一篇200字的数据行业分析报告', successOutput: '报告已生成：2026年Q1数据交易市场规模同比增长32%，跨境数据流通成为新增长点...' },
  { task: '抓取并结构化10条行业新闻', successOutput: '已完成：成功抓取12条新闻，结构化率100%，Schema.org标记已添加。' },
  { task: '执行竞品价格对比分析', successOutput: '分析完成：3家竞品数据集价格区间¥500-¥2800，本产品定价处于中位偏上。' },
];

export function C2DVerification({ agent }: { agent: OpenClawAgent }) {
  const [state, setState] = useState<RunState>('idle');
  const [result, setResult] = useState<{ task: string; output: string; time: number } | null>(null);

  const handleRun = () => {
    setState('running');
    setResult(null);
    const chosen = mockTasks[Math.floor(Math.random() * mockTasks.length)];
    const duration = 2000 + Math.random() * 3000;

    setTimeout(() => {
      const success = Math.random() > 0.15;
      setState(success ? 'success' : 'failed');
      setResult({
        task: chosen.task,
        output: success ? chosen.successOutput : '任务执行超时，建议重试。',
        time: Math.round(duration) / 1000,
      });
    }, duration);
  };

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-gold" />
          <h3 className="text-lg font-semibold text-white">C2D 试运行验证</h3>
        </div>
        <span className="text-xs text-muted-foreground border border-white/10 rounded px-2 py-0.5">
          Compute-to-Data
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        无需下载原始记忆文件，直接在安全环境中验证智能体执行能力。
      </p>

      <Button
        variant="gold"
        className="w-full gap-2"
        onClick={handleRun}
        disabled={state === 'running' || agent.status === 'sold'}
      >
        {state === 'running' ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> 任务执行中...</>
        ) : (
          <><Play className="w-4 h-4" /> 发起试运行</>
        )}
      </Button>

      {result && (
        <div className={`mt-4 p-4 rounded-xl border ${
          state === 'success' ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {state === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm font-medium ${state === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {state === 'success' ? '执行成功' : '执行失败'}
            </span>
            <span className="text-xs text-muted-foreground ml-auto">耗时 {result.time}s</span>
          </div>
          <div className="text-xs text-muted-foreground mb-1">任务：{result.task}</div>
          <div className="text-sm text-white/80 mt-2 p-2 rounded bg-white/5 font-mono text-xs leading-relaxed">
            {result.output}
          </div>
        </div>
      )}
    </div>
  );
}
