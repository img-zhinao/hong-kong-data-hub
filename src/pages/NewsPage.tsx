import { Layout } from '@/components/layout/Layout';
import { Clock, Eye, Newspaper, Search, TrendingUp } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const newsData = {
  exchange: [
    {
      id: 1,
      title: '香港大数据交易所2024年度交易报告发布',
      summary: '2024年度交易总额突破150亿港元，数据产品上架数量增长45%，数商入驻数量达到800家。',
      date: '2024-12-28',
      views: 3421,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: '香港大数据交易所与深圳数据交易所签署战略合作协议',
      summary: '双方将在数据产品互认、跨境数据流通、技术标准对接等方面开展深度合作。',
      date: '2024-12-25',
      views: 2567,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    },
  ],
  industry: [
    {
      id: 3,
      title: '香港数字资产上市公司联合会成立 助香港发展数字金融',
      summary: '香港数字资产上市公司联合会正式成立，旨在推动香港成为亚太区数字资产交易和金融科技创新中心。',
      date: '2024-12-27',
      views: 1856,
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      title: '2025中国国际大数据产业博览会"数据交易生态大会"在贵阳成功举办',
      summary: '大会由北京国际大数据交易所、深圳数据交易所、贵阳大数据交易所联合主办。',
      date: '2024-12-26',
      views: 2341,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      title: '中国高质量数据集产业基地揭牌 数据资产价值超千亿',
      summary: '数据资产价值预计超过1100亿元，其中公共数据资源价值约900亿元。',
      date: '2024-12-25',
      views: 1534,
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop',
    },
  ],
  enterprise: [
    {
      id: 6,
      title: '某科技公司成功完成首笔数据资产质押融资',
      summary: '通过数据知识产权质押从银行获取4000万元贷款支持，创下数据知识产权质押融资最高纪录。',
      date: '2024-12-24',
      views: 1234,
      image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=400&h=300&fit=crop',
    },
    {
      id: 7,
      title: '完成首笔行政事业单位数据资产入账工作',
      summary: '在数据资产全过程管理试点中迈出关键一步，为数据资产管理创新模式提供示范。',
      date: '2024-12-23',
      views: 987,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    },
  ],
};

const allNews = [...newsData.exchange, ...newsData.industry, ...newsData.enterprise];

export default function NewsPage() {
  const { category } = useParams();
  const currentTab = category || 'all';

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary-foreground">行业动态</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            实时追踪全球及国内数据交易机构的最新进展，把握行业发展脉搏
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="搜索新闻资讯..." className="pl-10" />
            </div>

            {/* Tabs */}
            <Tabs defaultValue={currentTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="exchange">数交所动态</TabsTrigger>
                <TabsTrigger value="industry">行业资讯</TabsTrigger>
                <TabsTrigger value="enterprise">企业快讯</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {allNews.map((news, index) => (
                    <NewsCard key={news.id} news={news} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="exchange" className="mt-6">
                <div className="space-y-4">
                  {newsData.exchange.map((news, index) => (
                    <NewsCard key={news.id} news={news} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="industry" className="mt-6">
                <div className="space-y-4">
                  {newsData.industry.map((news, index) => (
                    <NewsCard key={news.id} news={news} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="enterprise" className="mt-6">
                <div className="space-y-4">
                  {newsData.enterprise.map((news, index) => (
                    <NewsCard key={news.id} news={news} index={index} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Hot News */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                热门资讯
              </h3>
              <ul className="space-y-3">
                {allNews.slice(0, 5).map((news, index) => (
                  <li key={news.id}>
                    <Link
                      to={`/news/${news.id}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className={`flex-shrink-0 w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${
                        index < 3 ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {news.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="font-semibold mb-4">快速入口</h3>
              <div className="space-y-2">
                <Link to="/policy">
                  <Button variant="outline" className="w-full justify-start">
                    政策法规
                  </Button>
                </Link>
                <Link to="/insights">
                  <Button variant="outline" className="w-full justify-start">
                    专家观点
                  </Button>
                </Link>
                <Link to="/data-merchants">
                  <Button variant="outline" className="w-full justify-start">
                    数商生态
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

interface NewsCardProps {
  news: {
    id: number;
    title: string;
    summary: string;
    date: string;
    views: number;
    image?: string;
  };
  index: number;
}

function NewsCard({ news, index }: NewsCardProps) {
  return (
    <Link
      to={`/news/${news.id}`}
      className="news-card flex gap-4 p-4 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
    >
      {news.image && (
        <div className="hidden sm:block w-40 h-28 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
          {news.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {news.summary}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {news.date}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {news.views.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
