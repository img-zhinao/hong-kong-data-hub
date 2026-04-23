import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/hkbde-logo.png';

export function Footer() {
  const { t } = useTranslation();

  const footerGroups = [
    {
      title: t('footer.groupAbout'),
      links: [
        { name: t('footer.aboutIntro'), path: '/about' },
        { name: t('footer.aboutStructure'), path: '/about/structure' },
        { name: t('footer.aboutContact'), path: '/about/contact' },
        { name: t('footer.aboutCareers'), path: '/about/careers' },
      ],
    },
    {
      title: t('footer.groupServices'),
      links: [
        { name: t('footer.svcTrading'), path: '/services/trading' },
        { name: t('footer.svcRights'), path: '/services/rights' },
        { name: t('footer.svcValuation'), path: '/services/valuation' },
        { name: t('footer.svcMerchantApply'), path: '/data-merchants/apply' },
      ],
    },
    {
      title: t('footer.groupNews'),
      links: [
        { name: t('footer.newsPolicy'), path: '/policy' },
        { name: t('footer.newsIndustry'), path: '/news' },
        { name: t('footer.newsInsights'), path: '/insights' },
        { name: t('footer.newsEvents'), path: '/events' },
      ],
    },
    {
      title: t('footer.groupPartners'),
      links: [
        { name: '北京国际大数据交易所', path: 'https://www.bjidex.com', external: true },
        { name: '深圳数据交易所', path: 'https://www.szdata.com', external: true },
        { name: '贵阳大数据交易所', path: 'https://www.gbdex.com', external: true },
        { name: '上海数据交易所', path: 'https://www.chinadep.com', external: true },
        { name: '深圳文化产权交易所', path: 'https://www.szcaee.cn', external: true },
      ] as Array<{ name: string; path: string; external?: boolean }>,
    },
  ];

  return (
    <footer className="bg-navy text-primary-foreground">
      {/* Partners Marquee */}
      <div className="border-b border-navy-light py-4 overflow-hidden">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-primary-foreground/60 whitespace-nowrap">{t('footer.partnersLabel')}</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">北京国际大数据交易所</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">深圳数据交易所</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">贵阳大数据交易所</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">上海数据交易所</span>
              <span className="text-sm text-primary-foreground/80 whitespace-nowrap">深圳文化产权交易所</span>
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
              {t('brand.tagline')}
            </p>
          </div>

          {/* Links */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-primary mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
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
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
            <Link to="/sitemap" className="hover:text-primary transition-colors">{t('footer.sitemap')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
