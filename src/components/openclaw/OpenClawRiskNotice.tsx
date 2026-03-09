import { AlertTriangle } from 'lucide-react';

export function OpenClawRiskNotice() {
  return (
    <section className="py-8">
      <div className="container">
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-6">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-slate-300">
              <h3 className="font-semibold text-yellow-500 text-base">风险提示</h3>
              <p>
                数字资产投资存在一定风险。过往收益不代表未来表现，预期收益率仅供参考，实际收益可能因市场环境、技术变化等因素产生波动。
              </p>
              <p>
                请在充分了解产品运作模式、技术架构及潜在风险后，根据自身风险承受能力做出投资决策。本平台不对投资损失承担责任。
              </p>
              <p className="text-yellow-500/70 text-xs">
                * 所有收益数据均基于历史运营记录，不构成投资建议。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
