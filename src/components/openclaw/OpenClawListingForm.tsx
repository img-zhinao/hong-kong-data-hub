import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface OpenClawListingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPlan?: string;
}

export function OpenClawListingForm({ open, onOpenChange, defaultPlan = 'preferred' }: OpenClawListingFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      toast.success('挂牌申请已提交', {
        description: '我们的团队将在 1-3 个工作日内与您联系，请保持电话畅通。',
      });
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-[#0d1f3c] border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">提交挂牌申请</DialogTitle>
          <DialogDescription className="text-slate-400">
            填写以下信息，我们将尽快审核并与您联系
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label className="text-slate-300">军团名称</Label>
            <Input required placeholder="例：Alpha-7 内容创作军团" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">硬件配置</Label>
              <select required className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <option value="" className="bg-[#0d1f3c] text-white">请选择</option>
                <option value="m2" className="bg-[#0d1f3c] text-white">Mac Mini M2</option>
                <option value="m2pro" className="bg-[#0d1f3c] text-white">Mac Mini M2 Pro</option>
                <option value="m4" className="bg-[#0d1f3c] text-white">Mac Mini M4</option>
                <option value="m4pro" className="bg-[#0d1f3c] text-white">Mac Mini M4 Pro</option>
                <option value="other" className="bg-[#0d1f3c] text-white">其他</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">AI员工数量</Label>
              <Input required type="number" min={1} placeholder="例：12" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">已运行天数</Label>
              <Input required type="number" min={0} placeholder="例：90" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">累计收益 (¥)</Label>
              <Input required type="number" min={0} placeholder="例：15000" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">联系人姓名</Label>
              <Input required placeholder="您的姓名" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">联系电话</Label>
              <Input required type="tel" placeholder="+852 / +86" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">邮箱</Label>
            <Input required type="email" placeholder="your@email.com" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">选择套餐</Label>
            <RadioGroup defaultValue={defaultPlan} className="grid grid-cols-3 gap-3">
              {[
                { value: 'basic', label: '基础挂牌', price: '¥2,999' },
                { value: 'preferred', label: '优选挂牌', price: '¥5,999' },
                { value: 'flagship', label: '旗舰挂牌', price: '¥9,999' },
              ].map((plan) => (
                <div key={plan.value} className="relative">
                  <RadioGroupItem value={plan.value} id={plan.value} className="peer sr-only" />
                  <Label
                    htmlFor={plan.value}
                    className="flex flex-col items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer peer-data-[state=checked]:border-[hsl(43,75%,47%)] peer-data-[state=checked]:bg-[hsl(43,75%,47%)]/10 transition-colors"
                  >
                    <span className="text-sm font-medium text-white">{plan.label}</span>
                    <span className="text-xs text-[hsl(43,75%,47%)]">{plan.price}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">补充说明（选填）</Label>
            <Textarea placeholder="军团特色、收益模式等补充信息..." className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 min-h-[60px]" />
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
            {submitting ? '提交中...' : '提交挂牌申请'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
