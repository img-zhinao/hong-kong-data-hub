import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { OpenClawHero } from '@/components/openclaw/OpenClawHero';
import { OpenClawStats } from '@/components/openclaw/OpenClawStats';
import { OpenClawProductGrid } from '@/components/openclaw/OpenClawProductGrid';
import { OpenClawProcess } from '@/components/openclaw/OpenClawProcess';
import { OpenClawListing } from '@/components/openclaw/OpenClawListing';
import { OpenClawRiskNotice } from '@/components/openclaw/OpenClawRiskNotice';
import { OpenClawFAQ } from '@/components/openclaw/OpenClawFAQ';

export default function OpenClawPage() {
  return (
    <Layout>
      <SEO
        title="OpenClaw 数字资产挂牌交易 - 香港大数据交易所"
        description="Mac Mini + AI数字员工军团，即买即用，持续产生收益。浏览已训练完成的AI军团，开箱即用，稳定运营。"
      />
      <div className="bg-navy min-h-screen">
        <OpenClawHero />
        <OpenClawStats />
        <OpenClawProductGrid />
        <OpenClawProcess />
        <OpenClawListing />
        <OpenClawRiskNotice />
        <OpenClawFAQ />
      </div>
    </Layout>
  );
}
