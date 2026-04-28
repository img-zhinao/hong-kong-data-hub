import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Copy, CheckCircle2, Send, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const MODELS = [
  { id: 'openai-gpt', label: 'OpenAI GPT 系列' },
  { id: 'anthropic-claude', label: 'Anthropic Claude 系列' },
  { id: 'google-gemini', label: 'Google Gemini 系列' },
  { id: 'meta-llama', label: 'Meta Llama 系列' },
  { id: 'mistral', label: 'Mistral 系列' },
];

const VOLUMES = [
  '< 100 万 tokens / 月',
  '100 万 - 1000 万 tokens / 月',
  '1000 万 - 1 亿 tokens / 月',
  '> 1 亿 tokens / 月',
];

const SETTLEMENTS = [
  { value: 'hkd-prepaid', label: '港币预付（HKD Prepaid）' },
  { value: 'usd-postpaid', label: '美元后付（USD Postpaid）' },
  { value: 'cny-onshore', label: '人民币境内结算（CNY Onshore）' },
  { value: 'crypto', label: '稳定币结算（USDT / USDC）' },
];

const schema = z.object({
  companyName: z.string().trim().min(2, '请输入公司名称').max(100),
  contactName: z.string().trim().min(2, '请输入联系人').max(50),
  email: z.string().trim().email('邮箱格式不正确').max(255),
  phone: z.string().trim().min(6, '请输入有效电话').max(30),
  volume: z.string().min(1, '请选择预计调用量'),
  settlement: z.string().min(1, '请选择结算方式'),
  models: z.array(z.string()).min(1, '请至少选择一个模型'),
  notes: z.string().max(500).optional(),
});

function generateTicketId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `THK-${ts}-${rand}`;
}

export function ModelAccessForm() {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [volume, setVolume] = useState('');
  const [settlement, setSettlement] = useState('');
  const [models, setModels] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleModel = (id: string) => {
    setModels((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({
      companyName, contactName, email, phone, volume, settlement, models, notes,
    });
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || '请检查表单');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const id = generateTicketId();
    setTicketId(id);
    setSubmitting(false);
    toast.success('申请已提交，工单已生成');
  };

  const copyTicket = async () => {
    if (!ticketId) return;
    await navigator.clipboard.writeText(ticketId);
    setCopied(true);
    toast.success('工单编号已复制');
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setCompanyName(''); setContactName(''); setEmail(''); setPhone('');
    setVolume(''); setSettlement(''); setModels([]); setNotes('');
    setTicketId(null);
  };

  if (ticketId) {
    return (
      <Card className="p-8 lg:p-10 max-w-2xl mx-auto text-center">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">申请提交成功</h3>
        <p className="text-sm text-muted-foreground mb-6">
          我们的香港 Token Hub 团队将在 1 个工作日内通过邮件与您联系，开通沙箱 API Key。
        </p>
        <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
          <div className="text-xs text-muted-foreground mb-2">您的工单编号</div>
          <div className="flex items-center justify-center gap-3">
            <code className="text-lg lg:text-xl font-mono font-bold text-gold tracking-wider">
              {ticketId}
            </code>
            <Button size="sm" variant="outline" onClick={copyTicket}>
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="ml-1">{copied ? '已复制' : '复制'}</span>
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-3">
            请妥善保管编号，后续沟通、对账与发票均需引用
          </div>
        </div>
        <Button variant="ghost" onClick={reset}>提交另一份申请</Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 lg:p-8 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">公司名称 *</Label>
            <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="如：深圳某某科技有限公司" maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">联系人 *</Label>
            <Input id="contact" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="姓名" maxLength={50} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">企业邮箱 *</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@company.com" maxLength={255} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">联系电话 *</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+852 / +86 ..." maxLength={30} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>预计月调用量 *</Label>
            <Select value={volume} onValueChange={setVolume}>
              <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
              <SelectContent>
                {VOLUMES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>结算方式 *</Label>
            <Select value={settlement} onValueChange={setSettlement}>
              <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
              <SelectContent>
                {SETTLEMENTS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>所需模型 *（可多选）</Label>
          <div className="grid sm:grid-cols-2 gap-2 p-4 border border-border rounded-md bg-muted/30">
            {MODELS.map((m) => (
              <label key={m.id} className="flex items-center gap-2 cursor-pointer hover:text-gold transition-colors">
                <Checkbox
                  checked={models.includes(m.id)}
                  onCheckedChange={() => toggleModel(m.id)}
                />
                <span className="text-sm">{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">备注（可选）</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="您的业务场景、特殊合规需求、目标上线时间等"
            rows={3}
            maxLength={500}
          />
        </div>

        <Button type="submit" disabled={submitting} className="w-full" size="lg">
          <Send className="w-4 h-4 mr-2" />
          {submitting ? '提交中...' : '提交申请'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          提交即表示同意《Token Hub 服务协议》及《数据跨境流动合规说明》
        </p>
      </form>
    </Card>
  );
}
