import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  views: number;
  image?: string;
}

const latestNews: NewsItem[] = [
  {
    id: 1,
    title: '国家数据局：加快印发梯次培育数字产业集群行动计划',
    summary: '记者获悉，国家数据局近日会同有关部门召开数字中国建设工作推进会议，提出要加快印发梯次培育数字产业集群的行动计划。',
    date: '2024-12-28',
    category: '政策法规',
    views: 2341,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    title: '香港数字资产上市公司联合会成立，助力香港发展数字金融',
    summary: '香港数字资产上市公司联合会正式成立，旨在推动香港成为亚太区数字资产交易和金融科技创新中心。',
    date: '2024-12-27',
    category: '行业动态',
    views: 1856,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: '中国高质量数据集产业基地揭牌，数据资产价值超千亿',
    summary: '据相关负责人介绍，数据资产价值预计超过1100亿元，其中公共数据资源价值约900亿元，数字产业发展前景广阔。',
    date: '2024-12-26',
    category: '行业动态',
    views: 1534,
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop',
  },
];

const policyNews: NewsItem[] = [
  {
    id: 4,
    title: '新疆公共数据资源登记实施细则出台',
    summary: '为规范公共数据资源登记，构建全区一体化公共数据资源登记体系。',
    date: '2024-12-28',
    category: '政策法规',
    views: 892,
  },
  {
    id: 5,
    title: '北京印发数据资产管理试点方案',
    summary: '健全本市数据资产管理基础制度、释放数据价值、保障数据安全。',
    date: '2024-12-27',
    category: '政策法规',
    views: 756,
  },
  {
    id: 6,
    title: '江苏：到2027年底建设不少于1000个高质量数据集',
    summary: '着力打造3个数据标注基地，培育10个创新引领力强的数据标注重点企业。',
    date: '2024-12-26',
    category: '政策法规',
    views: 634,
  },
  {
    id: 7,
    title: '工信部：分行业分区域培育制造业数字化转型促进中心',
    summary: '推进制造业数字化转型是构建现代化产业体系的重要路径。',
    date: '2024-12-25',
    category: '政策法规',
    views: 589,
  },
];

export function NewsSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Latest News - Main Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">最新资讯</h2>
              <Link to="/news">
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  更多资讯 <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {latestNews.map((news, index) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className={`news-card flex gap-4 p-4 animate-fade-in stagger-${index + 1}`}
                  style={{ opacity: 0, animationFillMode: 'forwards' }}
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
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`tag ${news.category === '政策法规' ? 'tag-policy' : 'tag-news'}`}>
                        {news.category}
                      </span>
                    </div>
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
                        {news.views}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Policy News - Sidebar */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">政策法规</h2>
              <Link to="/policy">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  更多 <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-lg border p-4">
              <ul className="divide-y divide-border">
                {policyNews.map((news) => (
                  <li key={news.id}>
                    <Link
                      to={`/policy/${news.id}`}
                      className="block py-3 group"
                    >
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {news.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{news.date}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {news.views}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
