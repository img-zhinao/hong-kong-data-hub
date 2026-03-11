import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { OpenClawHero } from '@/components/openclaw/OpenClawHero';
import { OpenClawStats } from '@/components/openclaw/OpenClawStats';
import { OpenClawProcess } from '@/components/openclaw/OpenClawProcess';
import { OpenClawRiskNotice } from '@/components/openclaw/OpenClawRiskNotice';
import { OpenClawFAQ } from '@/components/openclaw/OpenClawFAQ';
import { TalentMarket } from '@/components/openclaw/TalentMarket';
import { BreederDashboard } from '@/components/openclaw/BreederDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function OpenClawPage() {
  return (
    <Layout>
      <SEO
        title="OpenClaw Agentic AI 资产交易平台 - 香港大数据交易所"
        description="面向 AI 智能体的资产化交易平台。育种者仪表盘挂牌训练好的 AI 军团，用工市场按需挑选即买即用的数字员工。"
      />
      <div className="bg-navy min-h-screen">
        <OpenClawHero />
        <OpenClawStats />

        {/* Tabs */}
        <section id="market-tabs" className="py-4">
          <div className="container">
            <Tabs defaultValue="market">
              <TabsList className="w-full max-w-md mx-auto bg-white/5 border border-white/10 h-12 rounded-xl p-1">
                <TabsTrigger
                  value="market"
                  className="flex-1 rounded-lg text-sm font-medium data-[state=active]:bg-gold data-[state=active]:text-white data-[state=active]:shadow-none text-white/60"
                >
                  🦞 用工市场 Talent Market
                </TabsTrigger>
                <TabsTrigger
                  value="breeder"
                  className="flex-1 rounded-lg text-sm font-medium data-[state=active]:bg-gold data-[state=active]:text-white data-[state=active]:shadow-none text-white/60"
                >
                  🧬 育种者仪表盘 Breeder
                </TabsTrigger>
              </TabsList>

              <TabsContent value="market">
                <TalentMarket />
              </TabsContent>
              <TabsContent value="breeder">
                <BreederDashboard />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <OpenClawProcess />
        <OpenClawRiskNotice />
        <OpenClawFAQ />
      </div>
    </Layout>
  );
}
