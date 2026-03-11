import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload, Cpu, Bot, FileText } from 'lucide-react';

export function BreederDashboard() {
  const [submitting, setSubmitting] = useState(false);
  const [plan, setPlan] = useState('preferred');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('挂牌申请已提交', { description: '我们的团队将在 1-3 个工作日内与您联系。' });
    }, 1200);
  };

  return (
    <section className="py-10">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">育种者仪表盘</h2>
          <p className="text-muted-foreground">将您训练好的 AI 军团挂牌上架，开始交易</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl bg-white/5 border border-white/10 p-8">
          {/* SOUL.md & IDENTITY.md */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-gold">
              <FileText className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">智能体描述</h3>
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">SOUL.md — 核心灵魂描述</Label>
              <Textarea
                required
                placeholder="描述智能体的核心能力、使命和价值观..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[100px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">IDENTITY.md — 身份标识描述</Label>
              <Textarea
                placeholder="描述智能体的身份、资质和历史记录（选填）..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[80px] font-mono text-sm"
              />
            </div>
          </div>

          {/* Hardware */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-gold">
              <Cpu className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">硬件参数</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">设备型号</Label>
                <Select required>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="选择型号" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d1f3c] border-white/10">
                    <SelectItem value="m4">Mac Mini M4</SelectItem>
                    <SelectItem value="m4pro">Mac Mini M4 Pro</SelectItem>
                    <SelectItem value="m2">Mac Mini M2</SelectItem>
                    <SelectItem value="m2pro">Mac Mini M2 Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">设备数量</Label>
                <Input required type="number" min={1} placeholder="例：2" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">RAM (GB)</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="选择内存" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d1f3c] border-white/10">
                    <SelectItem value="16">16 GB</SelectItem>
                    <SelectItem value="24">24 GB</SelectItem>
                    <SelectItem value="36">36 GB</SelectItem>
                    <SelectItem value="48">48 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">存储 (GB)</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="选择存储" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d1f3c] border-white/10">
                    <SelectItem value="256">256 GB</SelectItem>
                    <SelectItem value="512">512 GB</SelectItem>
                    <SelectItem value="1024">1 TB</SelectItem>
                    <SelectItem value="2048">2 TB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* AI Employees */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gold">
              <Bot className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">AI 员工配置</h3>
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">军团名称</Label>
              <Input required placeholder="例：Alpha-7 内容创作军团" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">AI 员工数量</Label>
                <Input required type="number" min={1} placeholder="例：6" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">已运行天数</Label>
                <Input required type="number" min={0} placeholder="例：45" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
            </div>
          </div>

          {/* Operational data */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gold">
              <Upload className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">运营数据</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">TCR 成功率 (%)</Label>
                <Input required type="number" min={0} max={100} placeholder="例：92" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">累计收益 (¥)</Label>
                <Input required type="number" min={0} placeholder="例：12580" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">月收益 (¥)</Label>
                <Input required type="number" min={0} placeholder="例：3200" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">联系信息</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">联系人姓名</Label>
                <Input required placeholder="您的姓名" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">联系电话</Label>
                <Input required type="tel" placeholder="+852 / +86" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">邮箱</Label>
              <Input required type="email" placeholder="your@email.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </div>
          </div>

          {/* Pricing plan */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">选择挂牌套餐</h3>
            <RadioGroup value={plan} onValueChange={setPlan} className="grid grid-cols-3 gap-3">
              {[
                { value: 'basic', label: '基础挂牌', price: '¥2,999', desc: '基础审核 + 标准展示' },
                { value: 'preferred', label: '优选挂牌', price: '¥5,999', desc: '深度审核 + 优先推荐' },
                { value: 'flagship', label: '旗舰挂牌', price: '¥9,999', desc: '全面审核 + 首页推广' },
              ].map(p => (
                <div key={p.value} className="relative">
                  <RadioGroupItem value={p.value} id={`plan-${p.value}`} className="peer sr-only" />
                  <Label
                    htmlFor={`plan-${p.value}`}
                    className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-4 cursor-pointer peer-data-[state=checked]:border-gold peer-data-[state=checked]:bg-gold/10 transition-colors"
                  >
                    <span className="text-sm font-semibold text-white">{p.label}</span>
                    <span className="text-lg font-bold text-gold">{p.price}</span>
                    <span className="text-xs text-muted-foreground text-center">{p.desc}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="text-white/80">补充说明（选填）</Label>
            <Textarea placeholder="军团特色、收益模式等补充信息..." className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[60px]" />
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
            {submitting ? '提交中...' : '提交挂牌申请'}
          </Button>
        </form>
      </div>
    </section>
  );
}
