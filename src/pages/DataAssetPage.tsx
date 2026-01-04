import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Shield, 
  BarChart3, 
  Settings, 
  Database,
  TrendingUp,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
  Layers,
  Lock,
  Zap
} from 'lucide-react';

const painPoints = [
  { icon: FileText, label: '权属界定困难', position: 'left-1' },
  { icon: BarChart3, label: '成本归集和分摊难度', position: 'left-2' },
  { icon: Shield, label: '合规风险高', position: 'left-3' },
  { icon: Database, label: 'SaaS部署平台', position: 'center' },
  { icon: Settings, label: '产品组位部署', position: 'right-1' },
  { icon: TrendingUp, label: '资本化时点难把握', position: 'right-2' },
  { icon: Lock, label: '数据资产 折旧使用寿命难确定', position: 'right-3' },
];

const productFeatures = [
  {
    id: 'process',
    title: '完善的资本化流程',
    description: '平台完全按照财务准则规范设计全套的流程，支持数据资产登记、数据资本化合规、权属归类确认、区域归属管理、辅入以来需监控排位次类、再认知的资料归入账户发送状态等一整套完善的体系以及适当入账与否决等。',
    icon: BarChart3
  },
  {
    id: 'compliance',
    title: '全面的财务合规体系',
    description: '严格遵循国家会计准则和数据资产入表相关规定，提供完整的合规审计追踪和报告功能。',
    icon: Shield
  },
  {
    id: 'efficiency',
    title: '高效的分步确认',
    description: '支持分阶段、分批次的数据资产确认流程，灵活应对不同规模企业的需求。',
    icon: Zap
  },
  {
    id: 'audit',
    title: '专业的监管层审计性',
    description: '内置完整的审计日志和监管报送功能，满足监管机构的各项要求。',
    icon: FileText
  },
  {
    id: 'rights',
    title: '支持自由产权认定',
    description: '灵活的产权登记和确认机制，支持多种数据资产权属类型的认定和管理。',
    icon: Award
  },
];

const coreFeatures = [
  {
    id: 'entry',
    title: '数据录入',
    description: '企业可将数据资源基本信息录入并按行业归类归为不同标签，同时根据资本化流程完成相应的数据认证流程。包括数据归类与分类、无形资产或存货性质认定、合理归集开发成本并分摊归属等流程。',
    tags: ['业务型财务', '分类识别', '成本核算', '开发成本'],
    icon: Database
  },
  {
    id: 'valuation',
    title: '资产评估入库',
    description: '对数据资产进行专业评估，建立标准化的数据资产入库流程。',
    tags: ['价值评估', '标准入库', '质量评级'],
    icon: BarChart3
  },
  {
    id: 'trading',
    title: '资产交易',
    description: '提供安全可靠的数据资产交易平台，支持多种交易模式。',
    tags: ['交易撮合', '合约管理', '结算清算'],
    icon: TrendingUp
  },
  {
    id: 'audit',
    title: '后端报表/审计',
    description: '自动生成财务报表和审计资料，满足监管和合规要求。',
    tags: ['财务报表', '审计追踪', '合规报告'],
    icon: FileText
  },
  {
    id: 'lifecycle',
    title: '全流程跟踪/归档',
    description: '全生命周期管理，从登记到退出的完整跟踪和归档。',
    tags: ['生命周期', '档案管理', '状态追踪'],
    icon: Layers
  },
];

const productValues = [
  {
    title: '量化',
    subtitle: '企业数据价值',
    description: '帮助企业科学量化数据资产价值，为财务报表提供准确的数据支撑，提升企业整体估值和融资能力。',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: '改善',
    subtitle: '企业财务报表',
    description: '规范数据资产入表流程，优化资产结构，改善财务指标，增强企业财务健康度。',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: '促进',
    subtitle: '企业数据流通',
    description: '打通数据资产交易通道，促进企业间数据要素流通，释放数据价值潜力。',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    title: '推动',
    subtitle: '数据资源资产化',
    description: '助力企业完成数据资源向数据资产的转化，推动数字经济高质量发展。',
    color: 'from-teal-500 to-teal-600'
  },
];

const architectureLayers = [
  {
    title: '全链条产解服务',
    items: ['资产估值', '财务核验', '入表证明', '风险评估', '资产托管', '融资通道']
  },
  {
    title: '安全框架',
    items: ['入表证明', '权属认定', '托管登记', '资产审计', '资产评估']
  },
  {
    title: '数据资产目录',
    items: ['资产登记', '资产评估', '资产存证', '资产交易']
  },
  {
    title: '场景资产服务方式',
    items: ['开发成本归集', '财务摊销', '合规管理']
  },
];

export default function DataAssetPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              数据资源入表一站式服务平台
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              企业数据管理流程在商业策略中越来越具有战略意义，如何提升企业核心竞争力离不开商业价值重实体化的流程创新，评估企业自有内部数据价值的方法，可提升其价值效益展望。
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                开始使用 <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                了解更多
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b bg-card sticky top-[104px] z-40">
        <div className="container">
          <nav className="flex items-center gap-8 overflow-x-auto py-4">
            {['用户痛点', '产品特性', '核心功能', '产品架构', '产品价值', '相关资源'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary whitespace-nowrap transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Pain Points Section */}
      <section id="用户痛点" className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-16">用户痛点</h2>
          <div className="relative max-w-4xl mx-auto">
            {/* Central Diagram */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { icon: FileText, label: '权属界定困难' },
                  { icon: BarChart3, label: '成本归集和分摊难度' },
                  { icon: Shield, label: '合规风险高' },
                  { icon: Database, label: '数据资产平台入表' },
                  { icon: Settings, label: '产品组位部署' },
                  { icon: TrendingUp, label: '资本化时点难把握' },
                  { icon: Lock, label: '折旧使用寿命难确定' },
                  { icon: Layers, label: '折计使用规范难' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border bg-card hover:shadow-lg hover:border-primary/30 transition-all ${
                      index === 3 ? 'bg-primary/10 border-primary/30' : ''
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${index === 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section id="产品特性" className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">产品特性</h2>
          <Tabs defaultValue="process" className="max-w-4xl mx-auto">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
              {productFeatures.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {feature.title.slice(0, 8)}...
                </TabsTrigger>
              ))}
            </TabsList>
            {productFeatures.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                <div className="bg-card rounded-xl p-8 border shadow-sm">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div className="w-32 h-32 bg-primary/10 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-16 h-16 text-primary" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="核心功能" className="py-20 bg-slate-900 text-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">核心功能</h2>
          <Tabs defaultValue="entry" className="max-w-4xl mx-auto">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-slate-800">
              {coreFeatures.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-slate-300"
                >
                  {feature.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {coreFeatures.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary rounded-lg">
                      <feature.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {feature.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
                        • {tag}
                      </span>
                    ))}
                  </div>
                  <Button className="gap-2">
                    产品咨询 <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Product Architecture Section */}
      <section id="产品架构" className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">产品架构</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-4">
              {architectureLayers.map((layer, index) => (
                <div key={index} className="bg-card rounded-xl border p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-48 font-semibold text-primary">{layer.title}</div>
                    <div className="flex-1 flex flex-wrap gap-2">
                      {layer.items.map((item) => (
                        <span key={item} className="px-4 py-2 bg-muted rounded-lg text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-medium">SaaS</span>
                  <span className="font-semibold">SaaS模式</span>
                </div>
                <p className="text-sm text-muted-foreground">云端部署，快速启用，按需付费</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-purple-500 text-white rounded text-sm font-medium">私有</span>
                  <span className="font-semibold">本地模式</span>
                </div>
                <p className="text-sm text-muted-foreground">私有化部署，数据完全自主可控</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Value Section */}
      <section id="产品价值" className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">产品价值</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {productValues.map((value, index) => (
              <div key={index} className="relative group">
                <div className="bg-card rounded-2xl border p-6 h-full hover:shadow-xl transition-all">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl font-bold text-white">{value.title}</span>
                  </div>
                  <h3 className="text-center font-semibold mb-2">{value.subtitle}</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section id="相关资源" className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">相关资源</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: '数据资产入表指南', desc: '详细的入表流程说明和操作手册', icon: FileText },
              { title: '政策法规解读', desc: '最新数据资产相关政策法规汇编', icon: Shield },
              { title: '案例分析', desc: '行业典型案例分析与最佳实践', icon: BarChart3 },
            ].map((resource, index) => (
              <div key={index} className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all group cursor-pointer">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">开始您的数据资产入表之旅</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            立即体验一站式数据资产入表服务，让数据价值真正转化为企业竞争力
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary" className="gap-2">
              免费试用 <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10">
              联系我们
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
