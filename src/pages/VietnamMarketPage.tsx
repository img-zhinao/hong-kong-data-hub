import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/toaster';
import { supabase } from '@/integrations/supabase/client';
import {
  Scale, ShieldCheck, Network, BrainCircuit, ArrowRight,
  Factory, ShoppingCart, Sprout, FileCheck, Loader2,
} from 'lucide-react';

type Lang = 'zh' | 'en' | 'vi';

const COPY = {
  hero: {
    badge: { zh: '🇻🇳 越南数据市场专区', en: '🇻🇳 Vietnam Data Market Zone', vi: '🇻🇳 Khu thị trường dữ liệu Việt Nam' },
    title: {
      zh: '越南数据合规与跨境流通枢纽',
      en: 'Vietnam Data Compliance & Cross-border Hub',
      vi: 'Trung tâm tuân thủ và lưu chuyển dữ liệu xuyên biên giới Việt Nam',
    },
    desc: {
      zh: 'HKBDE 以香港国际合规框架为越南企业提供"可信合规背书"，连接大湾区数据供给与越南本地需求，覆盖越南四大数据法规的解读、合规数据集流通与持牌律所咨询服务。',
      en: 'HKBDE leverages Hong Kong\'s international compliance framework to provide trusted compliance endorsement for Vietnamese enterprises—bridging GBA data supply and Vietnam\'s local demand. We cover interpretation of Vietnam\'s four core data laws, compliant dataset distribution, and licensed legal advisory.',
      vi: 'HKBDE sử dụng khung pháp lý quốc tế của Hồng Kông để cung cấp "bảo chứng tuân thủ đáng tin cậy" cho doanh nghiệp Việt Nam — kết nối nguồn dữ liệu GBA với nhu cầu trong nước, bao gồm phân tích bốn đạo luật dữ liệu Việt Nam, lưu thông tập dữ liệu tuân thủ và tư vấn từ hãng luật được cấp phép.',
    },
  },
  tabs: {
    laws: { zh: '越南四法解读', en: 'Vietnam 4 Laws Brief', vi: 'Phân tích 4 đạo luật' },
    products: { zh: '合规数据产品', en: 'Compliant Datasets', vi: 'Tập dữ liệu tuân thủ' },
    consult: { zh: '合规咨询预约', en: 'Book Legal Consult', vi: 'Đặt lịch tư vấn' },
  },
};

const t3 = (lang: Lang, obj: Record<Lang, string>) => obj[lang] ?? obj.zh;

const LAWS = [
  {
    code: 'Data Law',
    icon: Scale,
    title: { zh: '《数据法》Data Law (2024)', en: 'Data Law (2024)', vi: 'Luật Dữ liệu (2024)' },
    effective: '2025-07-01',
    summary: {
      zh: '越南首部综合性数据法律，确立数据所有权、数据分类分级、国家数据库与数据交易基础规则。',
      en: 'Vietnam\'s first comprehensive data law: ownership, classification, national database, and trading rules.',
      vi: 'Luật dữ liệu toàn diện đầu tiên của Việt Nam: quyền sở hữu, phân loại, CSDL quốc gia và quy tắc giao dịch.',
    },
    points: [
      { zh: '数据三分类：核心 / 重要 / 一般', en: 'Three tiers: Core / Important / General', vi: 'Ba cấp: Cốt lõi / Quan trọng / Thông thường' },
      { zh: '核心数据出境需政府批准', en: 'Core data export requires government approval', vi: 'Dữ liệu cốt lõi cần phê duyệt khi xuất' },
      { zh: '建立国家数据中心与数据产品交易机制', en: 'National Data Center & data product trading', vi: 'Trung tâm dữ liệu quốc gia & cơ chế giao dịch' },
    ],
  },
  {
    code: 'PDPL',
    icon: ShieldCheck,
    title: { zh: '《个人数据保护法》PDPL', en: 'Personal Data Protection Law (PDPL)', vi: 'Luật Bảo vệ Dữ liệu Cá nhân (PDPL)' },
    effective: '2026-01-01',
    summary: {
      zh: '取代 PDPD 13/2023，明确数据主体权利、跨境传输影响评估（TIA）与高额罚款机制。',
      en: 'Replaces Decree 13/2023; defines data subject rights, transfer impact assessment (TIA), and steep fines.',
      vi: 'Thay thế Nghị định 13/2023; quyền chủ thể dữ liệu, đánh giá tác động chuyển giao (TIA) và mức phạt cao.',
    },
    points: [
      { zh: '处理前需完成 DPIA 与 TIA 备案', en: 'DPIA & TIA filing before processing', vi: 'Nộp DPIA & TIA trước khi xử lý' },
      { zh: '违规罚款最高达营业额 5%', en: 'Fines up to 5% of annual revenue', vi: 'Phạt tới 5% doanh thu' },
      { zh: '敏感数据处理需明示同意', en: 'Explicit consent for sensitive data', vi: 'Chấp thuận rõ ràng cho dữ liệu nhạy cảm' },
    ],
  },
  {
    code: 'DTI Law',
    icon: Network,
    title: { zh: '《数字技术产业法》DTI Law', en: 'Digital Technology Industry Law (DTI)', vi: 'Luật Công nghiệp Công nghệ số (DTI)' },
    effective: '2026-01-01',
    summary: {
      zh: '推动半导体、AI、数字平台战略产业发展，明确数字资产、加密资产法律地位与税收优惠。',
      en: 'Promotes semiconductor, AI and digital platforms; clarifies legal status of digital/crypto assets and tax incentives.',
      vi: 'Thúc đẩy bán dẫn, AI và nền tảng số; làm rõ địa vị pháp lý tài sản số/crypto và ưu đãi thuế.',
    },
    points: [
      { zh: '战略数字技术企业可享 10% 优惠税率', en: 'Strategic tech firms enjoy 10% tax rate', vi: 'Doanh nghiệp công nghệ chiến lược: thuế 10%' },
      { zh: '首次承认加密资产为合法财产', en: 'Crypto assets recognized as legal property', vi: 'Tài sản crypto được công nhận hợp pháp' },
      { zh: '数据中心、云服务列入战略基础设施', en: 'Data centers & cloud as strategic infra', vi: 'TT dữ liệu & cloud là hạ tầng chiến lược' },
    ],
  },
  {
    code: 'AI Law',
    icon: BrainCircuit,
    title: { zh: '《人工智能法》AI Law', en: 'Artificial Intelligence Law', vi: 'Luật Trí tuệ Nhân tạo' },
    effective: '2026',
    summary: {
      zh: '基于风险分级的 AI 治理框架，强制要求训练数据具有"合法来源"，高风险 AI 须注册与审计。',
      en: 'Risk-tiered AI governance; mandates lawful-source training data; high-risk AI must register & be audited.',
      vi: 'Quản trị AI theo mức rủi ro; bắt buộc nguồn dữ liệu hợp pháp; AI rủi ro cao phải đăng ký và kiểm toán.',
    },
    points: [
      { zh: '训练数据必须可追溯、来源合法', en: 'Training data must be traceable & lawful', vi: 'Dữ liệu huấn luyện phải truy xuất & hợp pháp' },
      { zh: '高风险 AI 系统强制备案', en: 'Mandatory registration for high-risk AI', vi: 'Đăng ký bắt buộc với AI rủi ro cao' },
      { zh: '生成式 AI 内容需明示标识', en: 'Generative AI output must be labeled', vi: 'Nội dung AI tạo sinh phải gắn nhãn' },
    ],
  },
] as const;

const PRODUCTS = [
  {
    icon: Factory,
    sector: { zh: '制造业', en: 'Manufacturing', vi: 'Sản xuất' },
    title: { zh: '越南北部工业园供应链数据集', en: 'Northern VN Industrial Park Supply Chain Dataset', vi: 'Tập dữ liệu chuỗi cung ứng KCN miền Bắc VN' },
    desc: {
      zh: '覆盖北宁、海防 12 个工业园，2,300+ 家电子/纺织制造商的产能、订单与物流数据，月度更新。',
      en: '12 industrial parks in Bac Ninh & Hai Phong, 2,300+ electronics/textile manufacturers; capacity, orders, logistics. Monthly.',
      vi: '12 KCN tại Bắc Ninh & Hải Phòng, 2.300+ nhà sản xuất điện tử/dệt may; công suất, đơn hàng, logistics. Hàng tháng.',
    },
    rows: '2.3M', price: 'USD 4,800',
  },
  {
    icon: ShoppingCart,
    sector: { zh: '电商', en: 'E-commerce', vi: 'Thương mại điện tử' },
    title: { zh: '越南主流电商平台商品价格指数', en: 'Vietnam E-commerce Price Index', vi: 'Chỉ số giá TMĐT Việt Nam' },
    desc: {
      zh: 'Shopee / Lazada / Tiki 全品类 SKU 价格、库存、销量趋势，用于市场分析与定价模型。',
      en: 'Shopee / Lazada / Tiki SKU prices, stock and sales trends across all categories.',
      vi: 'Giá SKU, tồn kho và xu hướng doanh số của Shopee / Lazada / Tiki theo mọi ngành hàng.',
    },
    rows: '8.6M', price: 'USD 2,400',
  },
  {
    icon: Sprout,
    sector: { zh: '农业', en: 'Agriculture', vi: 'Nông nghiệp' },
    title: { zh: '湄公河三角洲农产品产销数据', en: 'Mekong Delta Agri Production & Trade Data', vi: 'Dữ liệu SX-TM nông sản ĐBSCL' },
    desc: {
      zh: '稻米、咖啡、水果产量、价格、出口流向，融合卫星遥感与地面收购站数据。',
      en: 'Rice, coffee and fruit yield, price and export flows; satellite + ground collection stations.',
      vi: 'Sản lượng, giá, dòng xuất khẩu lúa, cà phê, trái cây; vệ tinh + trạm thu mua mặt đất.',
    },
    rows: '1.1M', price: 'USD 3,200',
  },
  {
    icon: ShoppingCart,
    sector: { zh: '电商', en: 'E-commerce', vi: 'TMĐT' },
    title: { zh: '越南跨境电商消费者画像', en: 'VN Cross-border E-commerce Consumer Profiles', vi: 'Hồ sơ NTD TMĐT xuyên biên giới VN' },
    desc: {
      zh: '基于 PDPL 合规脱敏的越南消费者购买偏好、品类偏好、价格敏感度数据。',
      en: 'PDPL-compliant anonymized buying preferences, categories and price sensitivity of Vietnamese consumers.',
      vi: 'Dữ liệu đã ẩn danh tuân thủ PDPL về sở thích mua, ngành hàng và độ nhạy giá của NTD VN.',
    },
    rows: '540K', price: 'USD 1,800',
  },
  {
    icon: Factory,
    sector: { zh: '制造业', en: 'Manufacturing', vi: 'Sản xuất' },
    title: { zh: '越南汽车与零部件出口数据', en: 'VN Auto & Components Export Dataset', vi: 'Tập dữ liệu xuất khẩu ô tô & linh kiện' },
    desc: {
      zh: '海关编码 8703-8708 完整出口流向、买方画像与季度价格曲线。',
      en: 'HS 8703-8708 export flows, buyer profiles, quarterly price curves.',
      vi: 'Mã HS 8703-8708, dòng xuất, hồ sơ người mua, đường giá theo quý.',
    },
    rows: '320K', price: 'USD 2,900',
  },
] as const;

export default function VietnamMarketPage() {
  const { i18n } = useTranslation();
  const langRaw = (i18n.language || 'zh').split('-')[0];
  const lang: Lang = (['zh', 'en', 'vi'].includes(langRaw) ? langRaw : 'zh') as Lang;
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: '', company_name: '', email: '', phone: '',
    topic: 'PDPL', preferred_language: lang, preferred_date: '', message: '',
  });

  const seo = useMemo(() => ({
    title: t3(lang, { zh: '越南数据市场专区 — HKBDE', en: 'Vietnam Data Market — HKBDE', vi: 'Khu Thị trường Dữ liệu Việt Nam — HKBDE' }),
    desc: t3(lang, COPY.hero.desc),
  }), [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.company_name || !form.email || !form.topic) {
      toast({ title: t3(lang, { zh: '请填写必填字段', en: 'Please complete required fields', vi: 'Vui lòng điền các trường bắt buộc' }), variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('vietnam_consultations').insert({
      full_name: form.full_name,
      company_name: form.company_name,
      email: form.email,
      phone: form.phone || null,
      topic: form.topic,
      preferred_language: form.preferred_language,
      preferred_date: form.preferred_date || null,
      message: form.message || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: t3(lang, { zh: '提交失败', en: 'Submission failed', vi: 'Gửi thất bại' }), description: error.message, variant: 'destructive' });
      return;
    }
    toast({
      title: t3(lang, { zh: '预约提交成功', en: 'Booking received', vi: 'Đã nhận đăng ký' }),
      description: t3(lang, { zh: '我们将在 1 个工作日内联系您。', en: 'We will contact you within 1 business day.', vi: 'Chúng tôi sẽ liên hệ trong 1 ngày làm việc.' }),
    });
    setForm({ full_name: '', company_name: '', email: '', phone: '', topic: 'PDPL', preferred_language: lang, preferred_date: '', message: '' });
  };

  return (
    <Layout>
      <SEO title={seo.title} description={seo.desc} canonicalUrl="https://hkbde.fun/vietnam" />

      {/* Hero */}
      <section className="relative overflow-hidden py-12 md:py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 max-w-4xl text-center space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs sm:text-sm font-medium">
            {t3(lang, COPY.hero.badge)}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground leading-tight">
            {t3(lang, COPY.hero.title)}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            {t3(lang, COPY.hero.desc)}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center pt-2">
            <Badge variant="outline" className="border-gold/40 text-gold text-xs">Hong Kong Compliance</Badge>
            <Badge variant="outline" className="border-primary/40 text-primary text-xs">PDPL · Data Law · DTI · AI Law</Badge>
            <Badge variant="outline" className="text-xs">3 Languages 中 / EN / VI</Badge>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-10 md:py-12 bg-background">
        <div className="container">
          <Tabs defaultValue="laws" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8 md:mb-10 h-auto">
              <TabsTrigger value="laws" className="text-xs sm:text-sm py-2 whitespace-normal leading-tight">{t3(lang, COPY.tabs.laws)}</TabsTrigger>
              <TabsTrigger value="products" className="text-xs sm:text-sm py-2 whitespace-normal leading-tight">{t3(lang, COPY.tabs.products)}</TabsTrigger>
              <TabsTrigger value="consult" className="text-xs sm:text-sm py-2 whitespace-normal leading-tight">{t3(lang, COPY.tabs.consult)}</TabsTrigger>
            </TabsList>

            {/* LAWS */}
            <TabsContent value="laws">
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {LAWS.map((law) => {
                  const Icon = law.icon;
                  return (
                    <Card key={law.code} className="p-6 border-gold/20 hover:border-gold/40 transition-colors">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gold/15 text-gold flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-gold/15 text-gold border-gold/30 hover:bg-gold/20">{law.code}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {t3(lang, { zh: '生效', en: 'Effective', vi: 'Hiệu lực' })}: {law.effective}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">{t3(lang, law.title)}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t3(lang, law.summary)}</p>
                      <div className="text-xs text-gold font-medium mb-2 tracking-wider uppercase">
                        {t3(lang, { zh: '合规操作要点', en: 'Compliance Highlights', vi: 'Điểm tuân thủ' })}
                      </div>
                      <ul className="space-y-2 text-sm text-foreground/90">
                        {law.points.map((p, i) => (
                          <li key={i} className="flex gap-2">
                            <FileCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                            <span>{t3(lang, p)}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* PRODUCTS */}
            <TabsContent value="products">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {PRODUCTS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <Card key={i} className="p-6 hover:border-primary/40 transition-colors flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <Badge variant="outline">{t3(lang, p.sector)}</Badge>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 leading-snug">{t3(lang, p.title)}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{t3(lang, p.desc)}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="text-xs text-muted-foreground">
                          {t3(lang, { zh: '记录数', en: 'Records', vi: 'Bản ghi' })}: <span className="text-foreground font-medium">{p.rows}</span>
                        </div>
                        <div className="text-gold font-semibold">{p.price}</div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        {t3(lang, { zh: '申请样本', en: 'Request sample', vi: 'Yêu cầu mẫu' })}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Card>
                  );
                })}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-6">
                {t3(lang, {
                  zh: '所有数据集均通过 PDPL / Data Law 合规审查，由香港法律框架背书。',
                  en: 'All datasets pass PDPL / Data Law compliance review, endorsed under Hong Kong legal framework.',
                  vi: 'Tất cả tập dữ liệu đều vượt qua kiểm tra tuân thủ PDPL / Luật Dữ liệu, được bảo chứng theo khung pháp lý Hồng Kông.',
                })}
              </p>
            </TabsContent>

            {/* CONSULTATION */}
            <TabsContent value="consult">
              <Card className="p-5 sm:p-6 lg:p-10 max-w-3xl mx-auto border-gold/20">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {t3(lang, { zh: '预约越南合规专家咨询', en: 'Book Vietnam Compliance Consultation', vi: 'Đặt lịch tư vấn tuân thủ Việt Nam' })}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                  {t3(lang, {
                    zh: '我们将为您匹配持越南法律执照的合作律所，提供 PDPL / Data Law / DTI / AI Law 专项咨询。',
                    en: 'We will match you with our partner law firms licensed in Vietnam for PDPL / Data Law / DTI / AI Law advisory.',
                    vi: 'Chúng tôi kết nối bạn với hãng luật đối tác có giấy phép tại Việt Nam cho PDPL / Luật Dữ liệu / DTI / Luật AI.',
                  })}
                </p>
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">{t3(lang, { zh: '姓名 *', en: 'Full name *', vi: 'Họ tên *' })}</Label>
                    <Input id="full_name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="company_name">{t3(lang, { zh: '公司 *', en: 'Company *', vi: 'Công ty *' })}</Label>
                    <Input id="company_name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="email">{t3(lang, { zh: '邮箱 *', en: 'Email *', vi: 'Email *' })}</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t3(lang, { zh: '电话', en: 'Phone', vi: 'Điện thoại' })}</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label>{t3(lang, { zh: '咨询主题 *', en: 'Topic *', vi: 'Chủ đề *' })}</Label>
                    <Select value={form.topic} onValueChange={(v) => setForm({ ...form, topic: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDPL">PDPL — {t3(lang, { zh: '个人数据保护', en: 'Personal Data Protection', vi: 'Bảo vệ dữ liệu cá nhân' })}</SelectItem>
                        <SelectItem value="Data Law">Data Law — {t3(lang, { zh: '数据法', en: 'Data Law', vi: 'Luật Dữ liệu' })}</SelectItem>
                        <SelectItem value="DTI Law">DTI Law — {t3(lang, { zh: '数字技术产业', en: 'Digital Tech Industry', vi: 'Công nghiệp CN số' })}</SelectItem>
                        <SelectItem value="AI Law">AI Law — {t3(lang, { zh: '人工智能法', en: 'AI Law', vi: 'Luật AI' })}</SelectItem>
                        <SelectItem value="Cross-border">{t3(lang, { zh: '跨境数据流通', en: 'Cross-border Data Flow', vi: 'Dữ liệu xuyên biên giới' })}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t3(lang, { zh: '偏好语言', en: 'Preferred language', vi: 'Ngôn ngữ ưu tiên' })}</Label>
                    <Select value={form.preferred_language} onValueChange={(v) => setForm({ ...form, preferred_language: v as Lang })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh">中文</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="preferred_date">{t3(lang, { zh: '期望日期', en: 'Preferred date', vi: 'Ngày mong muốn' })}</Label>
                    <Input id="preferred_date" type="date" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="message">{t3(lang, { zh: '需求说明', en: 'Message', vi: 'Mô tả nhu cầu' })}</Label>
                    <Textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" variant="gold" size="lg" disabled={submitting} className="w-full sm:w-auto">
                      {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {t3(lang, { zh: '提交预约', en: 'Submit booking', vi: 'Gửi đăng ký' })}
                    </Button>
                  </div>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
