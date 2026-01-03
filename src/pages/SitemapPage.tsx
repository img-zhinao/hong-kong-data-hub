import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { 
  Map, 
  Home, 
  FileText, 
  Newspaper, 
  Lightbulb, 
  Calendar, 
  Building2, 
  Info,
  Shield,
  Scale,
  ExternalLink
} from 'lucide-react';

interface SitemapSection {
  title: string;
  icon: React.ReactNode;
  description: string;
  links: {
    name: string;
    path: string;
    description?: string;
    external?: boolean;
  }[];
}

export default function SitemapPage() {
  const sitemapSections: SitemapSection[] = [
    {
      title: '首页',
      icon: <Home className="h-5 w-5" />,
      description: '香港大数据交易所官方网站首页',
      links: [
        { name: '网站首页', path: '/', description: '了解香港大数据交易所的核心服务和最新动态' },
      ],
    },
    {
      title: '资讯中心',
      icon: <Newspaper className="h-5 w-5" />,
      description: '获取数据交易行业最新政策法规、行业动态和专业资讯',
      links: [
        { name: '政策法规', path: '/policy', description: '浏览国家及地方数据交易相关政策法规' },
        { name: '行业动态', path: '/news', description: '了解数据交易行业最新新闻和发展趋势' },
        { name: '专家观点', path: '/insights', description: '阅读行业专家对数据要素市场的深度分析' },
        { name: '活动会议', path: '/events', description: '查看即将举办和过往的行业活动会议' },
      ],
    },
    {
      title: '数商生态',
      icon: <Building2 className="h-5 w-5" />,
      description: '探索香港大数据交易所的数商合作伙伴网络',
      links: [
        { name: '数商目录', path: '/data-merchants', description: '浏览已入驻的优质数据服务商' },
        { name: '数商入驻', path: '/data-merchants/apply', description: '申请成为香港大数据交易所认证数商' },
      ],
    },
    {
      title: '业务服务',
      icon: <FileText className="h-5 w-5" />,
      description: '了解香港大数据交易所提供的专业服务',
      links: [
        { name: '数据交易', path: '/services/trading', description: '安全合规的数据资产交易撮合服务' },
        { name: '数据确权', path: '/services/rights', description: '数据资产权属登记与确权认证服务' },
        { name: '数据资产评估', path: '/services/valuation', description: '专业数据资产价值评估咨询服务' },
      ],
    },
    {
      title: '关于我们',
      icon: <Info className="h-5 w-5" />,
      description: '了解香港大数据交易所的使命、愿景和团队',
      links: [
        { name: '交易所介绍', path: '/about', description: '了解香港大数据交易所的发展历程和核心优势' },
        { name: '组织架构', path: '/about/structure', description: '查看交易所的组织结构和管理团队' },
        { name: '联系我们', path: '/about/contact', description: '获取联系方式和办公地点信息' },
        { name: '加入我们', path: '/about/careers', description: '浏览当前开放的职位和人才招聘信息' },
      ],
    },
    {
      title: '法律信息',
      icon: <Scale className="h-5 w-5" />,
      description: '查阅平台法律条款和隐私政策',
      links: [
        { name: '隐私政策', path: '/privacy', description: '了解我们如何收集、使用和保护您的个人信息' },
        { name: '服务条款', path: '/terms', description: '查阅使用香港大数据交易所服务的条款和条件' },
        { name: '网站地图', path: '/sitemap', description: '浏览网站完整的页面结构和导航' },
      ],
    },
    {
      title: '友情链接',
      icon: <ExternalLink className="h-5 w-5" />,
      description: '相关数据交易所和合作伙伴链接',
      links: [
        { name: '北京国际大数据交易所', path: 'https://www.bjidex.com', external: true },
        { name: '深圳数据交易所', path: 'https://www.szdata.com', external: true },
        { name: '贵阳大数据交易所', path: 'https://www.gbdex.com', external: true },
        { name: '上海数据交易所', path: 'https://www.chinadep.com', external: true },
      ],
    },
  ];

  return (
    <Layout>
      {/* SEO Meta */}
      <title>网站地图 | 香港大数据交易所 HKBDE</title>
      <meta name="description" content="香港大数据交易所网站地图，快速导航至所有页面，包括资讯中心、数商生态、业务服务、关于我们等栏目。" />
      
      <article className="min-h-screen bg-background" itemScope itemType="https://schema.org/WebPage">
        {/* Hero Section */}
        <header className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">站点导航</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" itemProp="name">
              网站地图
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl" itemProp="description">
              快速访问香港大数据交易所的所有页面和功能模块。本网站地图帮助您轻松找到所需信息。
            </p>
          </div>
        </header>

        {/* Sitemap Content */}
        <div className="container max-w-5xl py-12 md:py-16">
          {/* Schema.org SiteNavigationElement */}
          <nav aria-label="网站地图导航" itemScope itemType="https://schema.org/SiteNavigationElement">
            <div className="grid gap-8 md:gap-12">
              {sitemapSections.map((section, index) => (
                <section 
                  key={section.title} 
                  className="p-6 md:p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-1">{section.title}</h2>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                  
                  <ul className="grid gap-3 md:grid-cols-2">
                    {section.links.map((link) => (
                      <li key={link.path} itemProp="hasPart" itemScope itemType="https://schema.org/WebPage">
                        {link.external ? (
                          <a
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            itemProp="url"
                          >
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors" itemProp="name">
                                {link.name}
                              </span>
                              {link.description && (
                                <p className="text-xs text-muted-foreground mt-0.5" itemProp="description">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </a>
                        ) : (
                          <Link
                            to={link.path}
                            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            itemProp="url"
                          >
                            <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors" itemProp="name">
                                {link.name}
                              </span>
                              {link.description && (
                                <p className="text-xs text-muted-foreground mt-0.5" itemProp="description">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </nav>

          {/* Additional SEO Content */}
          <section className="mt-12 p-6 rounded-xl bg-muted/30 border">
            <h2 className="text-lg font-semibold text-foreground mb-3">关于香港大数据交易所</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              香港大数据交易所（HKBDE）是香港领先的数据要素市场基础设施，致力于打造安全、合规、高效的数据交易生态。
              我们为数据供需双方提供专业的交易撮合服务，推动数据资产的合规流通与价值释放。
              通过本网站地图，您可以快速访问我们的政策法规资讯、行业动态、专家观点、数商目录等核心功能模块。
            </p>
          </section>

          {/* XML Sitemap Reference */}
          <section className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              搜索引擎可访问我们的 <a href="/robots.txt" className="text-primary hover:underline">robots.txt</a> 文件获取爬取指引。
            </p>
          </section>
        </div>
      </article>
    </Layout>
  );
}
