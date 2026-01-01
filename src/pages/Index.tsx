import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { NewsSection } from '@/components/home/NewsSection';
import { DataStatsSection } from '@/components/home/DataStatsSection';
import { InsightsSection } from '@/components/home/InsightsSection';
import { EventsSection } from '@/components/home/EventsSection';
import { DataMerchantsSection } from '@/components/home/DataMerchantsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <NewsSection />
      <DataStatsSection />
      <InsightsSection />
      <DataMerchantsSection />
      <EventsSection />
    </Layout>
  );
};

export default Index;
