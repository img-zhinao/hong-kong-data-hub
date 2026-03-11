import { Check, X } from 'lucide-react';
import type { ComplianceStatus } from './openClawData';

const items: { key: keyof ComplianceStatus; label: string }[] = [
  { key: 'appleIdUnbound', label: 'Apple ID 已解绑' },
  { key: 'piiSanitized', label: 'PII 已脱敏' },
  { key: 'soulMdUploaded', label: 'SOUL.md' },
  { key: 'identityMdUploaded', label: 'IDENTITY.md' },
];

export function ComplianceLabels({ compliance, compact = false }: { compliance: ComplianceStatus; compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map(item => {
          const ok = compliance[item.key];
          return (
            <span
              key={item.key}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${
                ok ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-red-500/30 bg-red-500/10 text-red-400'
              }`}
            >
              {ok ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              {item.label}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
      <h4 className="text-sm font-semibold text-white mb-3">安全合规检查</h4>
      <div className="grid grid-cols-2 gap-3">
        {items.map(item => {
          const ok = compliance[item.key];
          return (
            <div key={item.key} className={`flex items-center gap-2 p-2.5 rounded-lg border ${
              ok ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'
            }`}>
              {ok ? <Check className="w-4 h-4 text-green-400 shrink-0" /> : <X className="w-4 h-4 text-red-400 shrink-0" />}
              <span className={`text-sm ${ok ? 'text-green-400' : 'text-red-400'}`}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
