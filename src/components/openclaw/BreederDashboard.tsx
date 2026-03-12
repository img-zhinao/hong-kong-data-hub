import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload, Cpu, Bot, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

const HW_COEFFICIENTS: Record<string, number> = {
  'm4': 1.0,
  'm4pro': 1.35,
  'm2': 0.8,
  'm2pro': 1.1,
};

const HW_LABELS: Record<string, string> = {
  'm4': 'Mac Mini M4',
  'm4pro': 'Mac Mini M4 Pro',
  'm2': 'Mac Mini M2',
  'm2pro': 'Mac Mini M2 Pro',
};

export function BreederDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);
  const [plan, setPlan] = useState('preferred');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error('请先登录后再提交挂牌申请');
      return;
    }

    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const hwModel = fd.get('hw_model') as string;
    const hwQuantity = Number(fd.get('hw_quantity')) || 1;
    const hwRam = Number(fd.get('hw_ram')) || 16;
    const hwStorage = Number(fd.get('hw_storage')) || 256;
    const runDays = Number(fd.get('run_days')) || 0;
    const tcr = Number(fd.get('tcr')) || 0;
    const totalRevenue = Number(fd.get('total_revenue')) || 0;
    const monthlyRevenue = Number(fd.get('monthly_revenue')) || 0;
    const name = fd.get('name') as string;
    const soulDescription = fd.get('soul_description') as string;
    const identityDescription = fd.get('identity_description') as string;
    const price = Number(fd.get('price')) || 0;

    const agentCode = `OC-${String(Date.now()).slice(-4)}`;
    const hwLabel = HW_LABELS[hwModel] || 'Mac Mini M4';
    const hwCoeff = HW_COEFFICIENTS[hwModel] || 1.0;

    const { error } = await supabase.from('openclaw_agents' as any).insert({
      agent_code: agentCode,
      name,
      status: 'presale',
      hardware: `${hwLabel} × ${hwQuantity}台`,
      employees: ['BossAgent'],
      run_days: runDays,
      total_revenue: totalRevenue,
      price,
      monthly_revenue: monthlyRevenue,
      annual_return: monthlyRevenue > 0 && price > 0 ? Math.round((monthlyRevenue * 12 / price) * 100) : 0,
      revenue_history: [],
      tcr,
      memory_entries: 0,
      memory_compression: 0,
      geo_score: 0,
      apple_id_unbound: false,
      pii_sanitized: false,
      soul_md_uploaded: !!soulDescription,
      identity_md_uploaded: !!identityDescription,
      hw_model: hwLabel,
      hw_ram: hwRam,
      hw_storage: hwStorage,
      hw_quantity: hwQuantity,
      hw_coefficient: hwCoeff,
      soul_description: soulDescription || null,
      identity_description: identityDescription || null,
    } as any);

    setSubmitting(false);

    if (error) {
      toast.error('提交失败', { description: error.message });
    } else {
      toast.success('挂牌申请已提交', { description: '我们的团队将在 1-3 个工作日内与您联系。' });
      queryClient.invalidateQueries({ queryKey: ['openclaw-agents'] });
      form.reset();
    }
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
                name="soul_description"
                required
                placeholder="描述智能体的核心能力、使命和价值观..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[100px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">IDENTITY.md — 身份标识描述</Label>
              <Textarea
                name="identity_description"
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
                <Select name="hw_model" required>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="选择型号" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d1f3c] border-white/10 text-white">
                    <SelectItem value="m4" className="text-white/90 focus:bg-white/10 focus:text-white">Mac Mini M4</SelectItem>
                    <SelectItem value="m4pro" className="text-white/90 focus:bg-white/10 focus:text-white">Mac Mini M4 Pro</SelectItem>
                    <SelectItem value="m2" className="text-white/90 focus:bg-white/10 focus:text-white">Mac Mini M2</SelectItem>
                    <SelectItem value="m2pro" className="text-white/90 focus:bg-white/10 focus:text-white">Mac Mini M2 Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">设备数量</Label>
                <Input name="hw_quantity" required type="number" min={1} placeholder="例：2" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">RAM (GB)</Label>
                <Select name="hw_ram">
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="选择内存" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d1f3c] border-white/10 text-white">
                    <SelectItem value="16" className="text-white/90 focus:bg-white/10 focus:text-white">16 GB</SelectItem>
                    <SelectItem value="24" className="text-white/90 focus:bg-white/10 focus:text-white">24 GB</SelectItem>
                    <SelectItem value="36" className="text-white/90 focus:bg-white/10 focus:text-white">36 GB</SelectItem>
                    <SelectItem value="48" className="text-white/90 focus:bg-white/10 focus:text-white">48 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">存储 (GB)</Label>
                <Select name="hw_storage">
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="选择存储" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d1f3c] border-white/10 text-white">
                    <SelectItem value="256" className="text-white/90 focus:bg-white/10 focus:text-white">256 GB</SelectItem>
                    <SelectItem value="512" className="text-white/90 focus:bg-white/10 focus:text-white">512 GB</SelectItem>
                    <SelectItem value="1024" className="text-white/90 focus:bg-white/10 focus:text-white">1 TB</SelectItem>
                    <SelectItem value="2048" className="text-white/90 focus:bg-white/10 focus:text-white">2 TB</SelectItem>
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
              <Input name="name" required placeholder="例：Alpha-7 内容创作军团" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">已运行天数</Label>
                <Input name="run_days" required type="number" min={0} placeholder="例：45" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">挂牌价格 (¥)</Label>
                <Input name="price" required type="number" min={0} placeholder="例：18999" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
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
                <Input name="tcr" required type="number" min={0} max={100} placeholder="例：92" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">累计收益 (¥)</Label>
                <Input name="total_revenue" required type="number" min={0} placeholder="例：12580" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">月收益 (¥)</Label>
                <Input name="monthly_revenue" required type="number" min={0} placeholder="例：3200" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
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

          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
            {submitting ? '提交中...' : '提交挂牌申请'}
          </Button>
        </form>
      </div>
    </section>
  );
}
