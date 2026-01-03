import { Layout } from '@/components/layout/Layout';
import { Shield, Lock, Eye, Database, UserCheck, Bell, Mail, MapPin } from 'lucide-react';

export default function PrivacyPage() {
  const lastUpdated = '2024年12月1日';

  return (
    <Layout>
      {/* SEO Meta */}
      <title>隐私政策 | 香港大数据交易所 HKBDE</title>
      <meta name="description" content="了解香港大数据交易所如何收集、使用和保护您的个人信息。我们承诺遵守香港《个人资料（私隐）条例》及相关法规，确保您的数据安全。" />
      
      <article className="min-h-screen bg-background" itemScope itemType="https://schema.org/WebPage">
        {/* Hero Section */}
        <header className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">法律文件</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" itemProp="name">
              隐私政策
            </h1>
            <p className="text-lg text-muted-foreground mb-4" itemProp="description">
              香港大数据交易所（以下简称"本所"）重视用户隐私保护，本政策详细说明我们如何收集、使用、存储和保护您的个人信息。
            </p>
            <p className="text-sm text-muted-foreground">
              最后更新日期：<time dateTime="2024-12-01" itemProp="dateModified">{lastUpdated}</time>
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="container max-w-4xl py-12 md:py-16">
          <div className="prose prose-lg dark:prose-invert max-w-none" itemProp="mainContentOfPage">
            
            {/* Section 1 */}
            <section className="mb-12" id="scope">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">一、适用范围</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                本隐私政策适用于香港大数据交易所提供的所有服务，包括但不限于：
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>香港大数据交易所官方网站（hkbde.com）</li>
                <li>数据交易平台及相关在线服务</li>
                <li>数商入驻及会员服务</li>
                <li>活动报名及资讯订阅服务</li>
                <li>客户服务及技术支持</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-12" id="collection">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">二、信息收集</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 您主动提供的信息</h3>
              <p className="text-muted-foreground leading-relaxed">
                当您注册账户、申请入驻、参与活动或联系我们时，可能需要提供以下信息：
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>基本信息：</strong>姓名、电子邮件地址、电话号码、公司名称</li>
                <li><strong>身份信息：</strong>身份证明文件、营业执照、授权委托书</li>
                <li><strong>业务信息：</strong>数据产品描述、交易需求、合作意向</li>
                <li><strong>支付信息：</strong>银行账户信息、发票资料（如适用）</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.2 自动收集的信息</h3>
              <p className="text-muted-foreground leading-relaxed">
                当您访问我们的网站或使用服务时，我们可能自动收集：
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>设备信息：</strong>设备类型、操作系统、浏览器类型及版本</li>
                <li><strong>日志信息：</strong>访问时间、页面浏览记录、点击行为</li>
                <li><strong>位置信息：</strong>IP地址及大致地理位置</li>
                <li><strong>Cookies：</strong>用于改善用户体验的技术标识符</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-12" id="usage">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">三、信息使用</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                我们收集的信息将用于以下目的：
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>提供、维护和改进我们的服务</li>
                <li>处理您的注册、入驻申请及交易请求</li>
                <li>向您发送服务通知、更新和安全提醒</li>
                <li>进行身份验证和风险防控</li>
                <li>开展市场研究和数据分析以优化服务</li>
                <li>遵守法律法规及监管要求</li>
                <li>保护本所及用户的合法权益</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-12" id="protection">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">四、信息保护</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                我们采取多重安全措施保护您的个人信息：
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>技术措施：</strong>SSL/TLS加密传输、数据加密存储、访问控制机制</li>
                <li><strong>管理措施：</strong>严格的数据访问权限管理、员工保密培训</li>
                <li><strong>物理措施：</strong>安全的数据中心、访问监控系统</li>
                <li><strong>应急响应：</strong>完善的安全事件响应机制</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                我们遵守香港《个人资料（私隐）条例》（第486章）及其他适用的数据保护法规，确保您的数据得到妥善保护。
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-12" id="sharing">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">五、信息共享</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                除以下情况外，我们不会向第三方披露您的个人信息：
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>获得您的明确同意或授权</li>
                <li>为完成交易而必须向交易对手方披露</li>
                <li>向我们的关联公司或合作伙伴共享以提供服务</li>
                <li>根据法律法规、法院命令或政府机关的强制要求</li>
                <li>为保护本所、用户或公众的权益、财产或安全</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-12" id="rights">
              <h2 className="text-2xl font-bold text-foreground mb-4">六、您的权利</h2>
              <p className="text-muted-foreground leading-relaxed">
                根据适用的数据保护法律，您享有以下权利：
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>访问权：</strong>查阅我们持有的您的个人资料</li>
                <li><strong>更正权：</strong>更正不准确或不完整的个人资料</li>
                <li><strong>删除权：</strong>在特定情况下要求删除您的个人资料</li>
                <li><strong>反对权：</strong>反对我们处理您的个人资料用于直接营销</li>
                <li><strong>投诉权：</strong>向香港个人资料私隐专员公署提出投诉</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-12" id="cookies">
              <h2 className="text-2xl font-bold text-foreground mb-4">七、Cookies政策</h2>
              <p className="text-muted-foreground leading-relaxed">
                我们使用Cookies和类似技术来提升您的浏览体验。您可以通过浏览器设置管理或禁用Cookies，但这可能影响网站的某些功能。我们使用的Cookies类型包括：
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>必要性Cookies：</strong>确保网站正常运作</li>
                <li><strong>功能性Cookies：</strong>记住您的偏好设置</li>
                <li><strong>分析性Cookies：</strong>了解网站使用情况以优化服务</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-12" id="updates">
              <h2 className="text-2xl font-bold text-foreground mb-4">八、政策更新</h2>
              <p className="text-muted-foreground leading-relaxed">
                我们可能会不时更新本隐私政策。政策变更后，我们将在网站上发布更新版本并注明生效日期。重大变更时，我们会通过显著方式通知您。建议您定期查阅本政策以了解最新内容。
              </p>
            </section>

            {/* Contact Section */}
            <section className="p-6 rounded-xl bg-muted/50 border" id="contact">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">九、联系我们</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                如您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：
              </p>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>电子邮件：privacy@hkbde.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>地址：香港特别行政区中环皇后大道中99号中环中心</span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </article>
    </Layout>
  );
}
