import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, CheckCircle2, Building2, User, Mail, Phone, Gauge, CreditCard, Cpu, FileText, Calendar, Hash } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  getTicket, type TokenTicket,
  STATUS_LABELS, SETTLEMENT_LABELS, MODEL_LABELS,
} from '@/lib/tokenTickets';

const STAGES: Array<{ key: string; label: string }> = [
  { key: 'submitted', label: '已提交' },
  { key: 'reviewing', label: '审核中' },
  { key: 'approved', label: '已开通' },
];

export default function TokenTicketPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<TokenTicket | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ticketId) return;
    setTicket(getTicket(ticketId) ?? null);
  }, [ticketId]);

  const copyId = async () => {
    if (!ticket) return;
    await navigator.clipboard.writeText(ticket.id);
    setCopied(true);
    toast.success('工单编号已复制');
    setTimeout(() => setCopied(false), 2000);
  };

  if (ticket === undefined) {
    return (
      <Layout>
        <div className="container py-20 text-center text-muted-foreground">加载中...</div>
      </Layout>
    );
  }

  if (ticket === null) {
    return (
      <Layout>
        <SEO title="工单未找到 | Token Hub" description="该工单不存在或已过期" />
        <div className="container py-20 max-w-xl mx-auto">
          <Card className="p-10 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-3">工单未找到</h1>
            <p className="text-sm text-muted-foreground mb-6">
              工单编号 <code className="text-gold">{ticketId}</code> 在本设备中无记录。<br />
              工单数据保存在您当前设备本地，请使用提交时的浏览器查看。
            </p>
            <Link to="/token-hub#apply">
              <Button>返回模型接入申请</Button>
            </Link>
          </Card>
        </div>
      </Layout>
    );
  }

  const status = STATUS_LABELS[ticket.status];
  const currentStageIdx = ticket.status === 'rejected' ? -1
    : STAGES.findIndex((s) => s.key === ticket.status);

  const fields: Array<{ icon: any; label: string; value: React.ReactNode }> = [
    { icon: Building2, label: '公司名称', value: ticket.companyName },
    { icon: User, label: '联系人', value: ticket.contactName },
    { icon: Mail, label: '企业邮箱', value: ticket.email },
    { icon: Phone, label: '联系电话', value: ticket.phone },
    { icon: Gauge, label: '预计调用量', value: ticket.volume },
    { icon: CreditCard, label: '结算方式', value: SETTLEMENT_LABELS[ticket.settlement] || ticket.settlement },
    {
      icon: Cpu, label: '所需模型',
      value: (
        <div className="flex flex-wrap gap-1.5">
          {ticket.models.map((m) => (
            <Badge key={m} variant="secondary">{MODEL_LABELS[m] || m}</Badge>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <SEO
        title={`工单 ${ticket.id} · Token Hub 模型接入`}
        description={`${ticket.companyName} 的 Token Hub 模型接入申请工单详情，当前状态：${status.label}`}
      />
      <div className="container py-8 lg:py-12 max-w-4xl mx-auto">
        <Link to="/token-hub#apply" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold mb-6">
          <ArrowLeft className="w-4 h-4" />
          返回 Token Hub
        </Link>

        {/* Header */}
        <Card className="p-6 lg:p-8 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Hash className="w-3.5 h-3.5" />
                工单编号
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <code className="text-xl lg:text-2xl font-mono font-bold text-gold tracking-wider">
                  {ticket.id}
                </code>
                <Button size="sm" variant="outline" onClick={copyId}>
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="ml-1">{copied ? '已复制' : '复制'}</span>
                </Button>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3">
                <Calendar className="w-3.5 h-3.5" />
                提交于 {new Date(ticket.createdAt).toLocaleString('zh-HK')}
              </div>
            </div>
            <Badge className={`${status.color} border px-3 py-1 text-sm`} variant="outline">
              {status.label}
            </Badge>
          </div>

          {/* Progress */}
          {ticket.status !== 'rejected' && (
            <div className="mt-8">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
                <div
                  className="absolute top-4 left-0 h-0.5 bg-gold transition-all"
                  style={{ width: `${(currentStageIdx / (STAGES.length - 1)) * 100}%` }}
                />
                {STAGES.map((s, i) => {
                  const done = i <= currentStageIdx;
                  return (
                    <div key={s.key} className="relative flex flex-col items-center gap-2 z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        done ? 'bg-gold border-gold text-background' : 'bg-background border-border text-muted-foreground'
                      }`}>
                        {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                      </div>
                      <div className={`text-xs ${done ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-6">
                香港 Token Hub 团队将在 1 个工作日内通过邮件与您联系，开通沙箱 API Key
              </p>
            </div>
          )}
        </Card>

        {/* Submitted info */}
        <Card className="p-6 lg:p-8">
          <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold" />
            提交信息
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
            {fields.map((f) => (
              <div key={f.label} className="flex gap-3">
                <f.icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground mb-1">{f.label}</div>
                  <div className="text-sm text-foreground break-words">{f.value}</div>
                </div>
              </div>
            ))}
          </div>
          {ticket.notes && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-xs text-muted-foreground mb-2">备注</div>
              <div className="text-sm text-foreground whitespace-pre-wrap">{ticket.notes}</div>
            </div>
          )}
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-6">
          工单数据保存在您当前设备的本地存储中。如需在多设备间同步，请在登录后绑定账户。
        </p>
      </div>
    </Layout>
  );
}
