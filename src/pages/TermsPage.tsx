import { Layout } from '@/components/layout/Layout';
import { FileText, Scale, Users, AlertTriangle, CreditCard, Ban, Gavel, Mail, MapPin } from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = '2024年12月1日';
  const effectiveDate = '2024年12月15日';

  return (
    <Layout>
      {/* SEO Meta */}
      <title>服务条款 | 香港大数据交易所 HKBDE</title>
      <meta name="description" content="香港大数据交易所服务条款规定了用户使用本所数据交易平台及相关服务的权利与义务。请在使用服务前仔细阅读。" />
      
      <article className="min-h-screen bg-background" itemScope itemType="https://schema.org/WebPage">
        {/* Hero Section */}
        <header className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">法律文件</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" itemProp="name">
              服务条款
            </h1>
            <p className="text-lg text-muted-foreground mb-4" itemProp="description">
              欢迎使用香港大数据交易所（以下简称"本所"）提供的服务。本服务条款构成您与本所之间的法律协议，请仔细阅读。
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <p>最后更新：<time dateTime="2024-12-01" itemProp="dateModified">{lastUpdated}</time></p>
              <p>生效日期：<time dateTime="2024-12-15">{effectiveDate}</time></p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container max-w-4xl py-12 md:py-16">
          <div className="prose prose-lg dark:prose-invert max-w-none" itemProp="mainContentOfPage">
            
            {/* Important Notice */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-12">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-amber-800 dark:text-amber-200 m-0 text-sm">
                  <strong>重要提示：</strong>使用本所服务即表示您同意遵守本服务条款。如您不同意任何条款，请勿使用我们的服务。
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <section className="mb-12" id="definitions">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">一、定义与解释</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">在本服务条款中，除非上下文另有要求：</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>"本所"</strong>指香港大数据交易所有限公司及其关联公司</li>
                <li><strong>"用户"或"您"</strong>指注册并使用本所服务的个人或机构</li>
                <li><strong>"服务"</strong>指本所通过网站或平台提供的所有数据交易及相关服务</li>
                <li><strong>"数据产品"</strong>指在本所平台上交易的各类数据资产</li>
                <li><strong>"数商"</strong>指在本所平台上提供数据产品的供应商</li>
                <li><strong>"平台"</strong>指本所运营的数据交易网站及相关系统</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-12" id="eligibility">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">二、服务资格</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 注册条件</h3>
              <p className="text-muted-foreground leading-relaxed">使用本所服务，您需满足以下条件：</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>具有完全民事行为能力的自然人（年满18周岁）</li>
                <li>依法成立并有效存续的法人或其他组织</li>
                <li>提供真实、准确、完整的注册信息</li>
                <li>同意并遵守本服务条款及相关规则</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.2 账户安全</h3>
              <p className="text-muted-foreground leading-relaxed">
                您有责任妥善保管账户信息和密码。您应对账户下的所有活动承担责任。如发现账户被盗用或存在安全问题，请立即通知本所。
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-12" id="services">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">三、服务内容</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">本所提供以下服务：</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>数据交易服务：</strong>为数据供需双方提供交易撮合平台</li>
                <li><strong>数据确权服务：</strong>提供数据资产权属登记及确权服务</li>
                <li><strong>数据资产评估：</strong>提供数据资产价值评估咨询</li>
                <li><strong>数商入驻服务：</strong>为数据供应商提供平台入驻渠道</li>
                <li><strong>资讯服务：</strong>提供行业政策、动态及专家观点资讯</li>
                <li><strong>活动服务：</strong>举办行业会议、培训及交流活动</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                本所保留随时修改、暂停或终止部分或全部服务的权利，并将提前通知用户。
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-12" id="obligations">
              <h2 className="text-2xl font-bold text-foreground mb-4">四、用户义务</h2>
              <p className="text-muted-foreground leading-relaxed">使用本所服务时，您同意：</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>遵守所有适用的法律法规</li>
                <li>不从事任何违法或侵害他人权益的行为</li>
                <li>不上传或传播违法、有害或侵权内容</li>
                <li>不干扰或破坏本所平台的正常运行</li>
                <li>不未经授权访问、使用或披露他人数据</li>
                <li>如实提供并及时更新个人或企业信息</li>
                <li>遵守本所发布的各项规则和政策</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-12" id="fees">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">五、费用与支付</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>本所服务可能涉及各类费用，具体收费标准将在相关服务页面或协议中载明</li>
                <li>您同意按时支付应付费用，逾期支付可能导致服务暂停</li>
                <li>除另有约定外，已支付费用一般不予退还</li>
                <li>本所保留调整收费标准的权利，调整前将提前通知用户</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-12" id="ip">
              <h2 className="text-2xl font-bold text-foreground mb-4">六、知识产权</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>本所平台的所有内容（包括但不限于文字、图片、软件、设计）的知识产权归本所或相关权利人所有</li>
                <li>未经授权，您不得复制、修改、分发或以其他方式使用本所的知识产权</li>
                <li>您通过平台发布的内容，授予本所非独占、全球性、免许可费的使用许可</li>
                <li>本所尊重知识产权，如您认为平台内容侵犯您的权益，请联系我们处理</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-12" id="liability">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Ban className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">七、责任限制</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>本所服务按"现状"提供，不作任何明示或暗示的保证</li>
                <li>本所不对因不可抗力、系统故障、第三方行为等导致的损失承担责任</li>
                <li>本所不对数据产品的质量、准确性或合法性承担保证责任</li>
                <li>在法律允许范围内，本所的总责任不超过您支付的服务费用</li>
                <li>用户因违反本条款或法律法规造成的损失，由用户自行承担</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-12" id="termination">
              <h2 className="text-2xl font-bold text-foreground mb-4">八、终止</h2>
              <p className="text-muted-foreground leading-relaxed">
                本所有权在以下情况下暂停或终止您的账户：
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>您违反本服务条款的任何规定</li>
                <li>您提供虚假信息或从事欺诈行为</li>
                <li>您的行为可能对本所或其他用户造成损害</li>
                <li>根据法律法规或监管要求</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                您可随时申请注销账户。账户终止后，部分条款（如知识产权、责任限制）将继续有效。
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-12" id="dispute">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Gavel className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">九、争议解决</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>本服务条款受香港特别行政区法律管辖</li>
                <li>任何争议应首先通过友好协商解决</li>
                <li>协商不成的，任一方可提交香港国际仲裁中心按其仲裁规则进行仲裁</li>
                <li>仲裁地点为香港，仲裁语言为中文</li>
                <li>仲裁裁决为终局裁决，对双方均有约束力</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section className="mb-12" id="amendments">
              <h2 className="text-2xl font-bold text-foreground mb-4">十、条款修订</h2>
              <p className="text-muted-foreground leading-relaxed">
                本所保留随时修订本服务条款的权利。修订后的条款将在网站上公布，并于公布之日起生效。您继续使用本所服务即视为接受修订后的条款。重大变更将通过显著方式通知您。
              </p>
            </section>

            {/* Contact Section */}
            <section className="p-6 rounded-xl bg-muted/50 border" id="contact">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">十一、联系方式</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                如您对本服务条款有任何疑问，请通过以下方式联系我们：
              </p>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>电子邮件：legal@hkbde.com</span>
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
