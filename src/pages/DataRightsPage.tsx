import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  FileSignature,
  Fingerprint,
  Scale,
  Database,
  Users,
  Workflow,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const rightsTypes = [
  {
    icon: Database,
    title: '数据资源持有权',
    desc: '确认数据持有主体对数据资源的合法占有、自主管理与处分权利。',
  },
  {
    icon: Workflow,
    title: '数据加工使用权',
    desc: '明确数据加工方对数据进行清洗、聚合、建模等加工行为的合法授权。',
  },
  {
    icon: Users,
    title: '数据产品经营权',
    desc: '保障数据产品提供方在交易、授权、转让等经营场景中的合法权益。',
  },
];

const process = [
  { step: '01', title: '主体核验', desc: '企业资质、法人身份、数据来源合规性核验。' },
  { step: '02', title: '数据登记', desc: '数据资源描述、来源链路、字段元数据登记入册。' },
  { step: '03', title: '合规审查', desc: '依据《数据安全法》《个人信息保护法》等开展合规审查。' },
  { step: '04', title: '存证上链', desc: '关键证据哈希上链存证，形成可追溯、不可篡改的权属凭证。' },
  { step: '05', title: '颁发证书', desc: '颁发《数据权属登记证书》，支持后续交易、入表、融资。' },
];

const benefits = [
  '为数据资产入表提供合规权属基础',
  '支持跨境数据交易与授权流转',
  '助力数据资产融资、质押与证券化',
  '区块链存证，权属可追溯、可举证',
  '对接香港及内地多家数据交易场所',
  '配套法律意见书与合规审查服务',
];

const DataRightsPage = () => {
  return (
    <Layout>
      <SEO
        title="数据确权登记 | 业务服务"
        description="香港大数据交易所提供数据资源持有权、加工使用权、产品经营权三权登记服务，结合区块链存证与合规审查，为数据资产入表、交易与融资奠定权属基础。"
        keywords="数据确权,数据权属登记,数据三权,数据资产入表,数据存证,香港大数据交易所"
        canonicalUrl="https://hkbde.fun/services/rights"
      />
      <main>
        {/* Hero */}
        <section className="bg-navy text-primary-foreground py-20">
          <div className="container">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">业务服务 · 数据确权</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                数据确权登记服务
                <span className="block text-primary mt-2 text-2xl md:text-3xl">
                  让每一份数据资产都有清晰、合规、可追溯的权属凭证
                </span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
                依据国家"数据二十条"提出的"三权分置"框架，香港大数据交易所联合法律、审计、技术合作伙伴，为数据持有者提供权属登记、合规审查与区块链存证一站式服务，
                夯实数据要素市场化配置的基础。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary text-navy hover:bg-primary/90" asChild>
                  <Link to="/data-merchants/apply">立即申请确权</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary/10"
                  asChild
                >
                  <Link to="/about/contact">咨询专家顾问</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Three Rights */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">数据"三权分置"登记</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                围绕数据资源持有权、数据加工使用权、数据产品经营权三类权利，提供清晰的权属界定服务。
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {rightsTypes.map((r) => (
                <Card key={r.title} className="border-border hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <r.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{r.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{r.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">五步完成数据确权</h2>
              <p className="text-muted-foreground">标准化流程，平均 5–10 个工作日完成确权登记。</p>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              {process.map((p) => (
                <Card key={p.step} className="border-border">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">{p.step}</div>
                    <h3 className="font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">为什么选择 HKBDE 确权服务</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  依托香港国际金融与法律体系，结合内地数据要素市场实践，为数据资产提供具有公信力的权属凭证。
                </p>
                <ul className="space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-border">
                  <CardContent className="pt-6 text-center">
                    <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold">合规</div>
                    <div className="text-sm text-muted-foreground mt-1">国家及香港双重合规</div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="pt-6 text-center">
                    <Fingerprint className="w-10 h-10 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold">可信</div>
                    <div className="text-sm text-muted-foreground mt-1">区块链存证不可篡改</div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="pt-6 text-center">
                    <FileSignature className="w-10 h-10 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold">权威</div>
                    <div className="text-sm text-muted-foreground mt-1">法律意见书背书</div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="pt-6 text-center">
                    <Scale className="w-10 h-10 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold">可用</div>
                    <div className="text-sm text-muted-foreground mt-1">入表、融资、交易通用</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-navy text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">开启您的数据资产确权之旅</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              提交基础信息，专属顾问将在 1 个工作日内与您联系，量身制定确权方案。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary text-navy hover:bg-primary/90" asChild>
                <Link to="/data-merchants/apply">
                  立即申请 <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10"
                asChild
              >
                <Link to="/services/valuation">了解数据资产评估</Link>
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/60 mt-8">
              联系电话：+852 3749 9968 ｜ 地址：Room 815, 8/F., Star House, 3 Salisbury Road, Tsim Sha Tsui, Kowloon, Hong Kong
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default DataRightsPage;
