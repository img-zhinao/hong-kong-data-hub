import { Link } from 'react-router-dom';
import logo from '@/assets/hkbde-logo.png';

const footerLinks = {
  关于我们: [
    { name: '交易所介绍', path: '/about' },
    { name: '组织架构', path: '/about/structure' },
    { name: '联系我们', path: '/about/contact' },
    { name: '加入我们', path: '/about/careers' },
  ],
  业务服务: [
    { name: '数据交易', path: '/services/trading' },
    { name: '数据确权', path: '/services/rights' },
    { name: '数据资产评估', path: '/services/valuation' },
    { name: '数商入驻', path: '/data-merchants/apply' },
  ],
  资讯中心: [
    { name: '政策法规', path: '/policy' },
    { name: '行业动态', path: '/news' },
    { name: '专家观点', path: '/insights' },
    { name: '活动会议', path: '/events' },
  ],
  友情链接: [
    { name: '北京国际大数据交易所', path: 'https://www.bjidex.com', external: true },
    { name: '深圳数据交易所', path: 'https://www.szdata.com', external: true },
    { name: '贵阳大数据交易所', path: 'https://www.gbdex.com', external: true },
    { name: '上海数据交易所', path: 'https://www.chinadep.com', external: true },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground">
      {/* Partners Marquee */}
      <div className="border-b border-navy-light py-4 overflow-hidden">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-primary-foreground/60 whitespace-nowrap">合作伙伴：</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">北京国际大数据交易所</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">深圳数据交易所</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">贵阳大数据交易所</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">上海数据交易所</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">香港数码港</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">香港科技园</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="HKBDE" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              香港大数据交易所是香港领先的数据要素市场基础设施，致力于打造安全、合规、高效的数据交易生态。
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-primary mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-light">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© 2024 香港大数据交易所 HKBDE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">隐私政策</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">服务条款</Link>
            <Link to="/sitemap" className="hover:text-primary transition-colors">网站地图</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
