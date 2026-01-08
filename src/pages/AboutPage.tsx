import { Layout } from "@/components/layout/Layout";
import { Building, Users, Target, Award, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/hkbde-logo.png";
export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-hero py-20">
        <div className="container text-center">
          <img src={logo} alt="HKBDE" className="h-24 w-auto mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">香港大数据交易所</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">Hong Kong Big Data Exchange</p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-2xl mb-6">关于我们</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">
                香港大数据交易所（HKBDE）成立于2014年，是香港领先的数据要素市场基础设施，致力于打造安全、合规、高效的数据交易生态。作为粤港澳大湾区数据要素流通的重要枢纽，我们连接内地与国际市场，促进数据资源的优化配置和价值释放。
              </p>
              <p className="mb-4">
                依托香港"一国两制"的独特优势和国际金融中心的地位，香港大数据交易所在跨境数据流通、数据合规、数据资产化等领域具有天然优势，为数据供需双方提供专业、可信的交易服务。
              </p>
              <p>
                我们汇聚金融、医疗、物流、制造等多个行业的优质数商，提供数据产品交易、数据资产评估、数据确权登记等全方位服务，助力企业释放数据价值，推动数字经济高质量发展。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 border text-center hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">使命</h3>
              <p className="text-muted-foreground">推动数据要素市场化配置，释放数据价值，赋能数字经济高质量发展</p>
            </div>

            <div className="bg-card rounded-xl p-8 border text-center hover-lift">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4">愿景</h3>
              <p className="text-muted-foreground">成为亚太区最具影响力的数据交易基础设施和国际数据枢纽</p>
            </div>

            <div className="bg-card rounded-xl p-8 border text-center hover-lift">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-4">价值观</h3>
              <p className="text-muted-foreground">安全合规、创新引领、开放协作、价值共创</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-hero">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-primary-foreground">发展成果</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                value: "800+",
                label: "入驻数商",
              },
              {
                value: "5,000+",
                label: "数据产品",
              },
              {
                value: "150亿+",
                label: "交易规模（港元）",
              },
              {
                value: "12,000+",
                label: "完成交易",
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="section-title text-2xl mb-8 text-center justify-center">领导团队</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "于海洋",
                role: "董事长",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
              },
              {
                name: "李婷",
                role: "首席执行官",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
              },
              {
                name: "卢向彤",
                role: "首席技术官",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="section-title text-2xl mb-8 text-center justify-center">联系我们</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl border p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Room 815, 8/F., Star House, 3 Salisbury Road, Tsim Sha Tsui, Kowloon,hongkong</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>   +852 3749 9968 FAX:37499970 </span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>info@hkbde.fun</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <Button variant="hero" className="w-full">
                  发送商务咨询
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
