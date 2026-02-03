import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { NewsSection } from '@/components/home/NewsSection';
import { DataStatsSection } from '@/components/home/DataStatsSection';
import { InsightsSection } from '@/components/home/InsightsSection';
import { EventsSection } from '@/components/home/EventsSection';
import { DataMerchantsSection } from '@/components/home/DataMerchantsSection';
import { SEO } from '@/components/SEO';

const Index = () => {
  return (
    <Layout>
      <SEO
        title="首页"
        description="香港大数据交易所是香港领先的数据要素市场基础设施，致力于打造安全、合规、高效的数据交易生态，连接内地与国际市场。"
        keywords="香港大数据交易所,HKBDE,数据交易,数据要素,大数据,AI,数据资产,数据产品,粤港澳大湾区"
      />
      <main>
        <HeroSection />
        <NewsSection />
        <DataStatsSection />
        <InsightsSection />
        <DataMerchantsSection />
        <EventsSection />
      </main>
    </Layout>
  );
};

export default Index;
