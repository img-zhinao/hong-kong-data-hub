import { Layout } from '@/components/layout/Layout';
import { Clock, Eye, FileText, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const policies = [
  {
    id: 1,
    title: '新疆公共数据资源登记实施细则出台',
    summary: '为规范公共数据资源登记，构建全区一体化公共数据资源登记体系，促进公共数据资源合规高效开发利用，日前新疆维吾尔自治区数字化发展局制定了《新疆维吾尔自治区公共数据资源登记实施细则(试行)》，将于10月1日起正式施行。',
    date: '2024-12-28',
    source: '新疆维吾尔自治区数字化发展局',
    views: 2341,
    category: '地方政策',
  },
  {
    id: 2,
    title: '北京印发数据资产管理试点方案 激活数据要素价值赋能数字经济',
    summary: '数据资产作为经济社会数字化转型进程中的新兴资产类型，正日益成为推动数字中国建设和加快数字经济发展的重要战略资源。为落实财政部关于数据资产全过程管理试点要求，健全本市数据资产管理基础制度、释放数据价值、保障数据安全。',
    date: '2024-12-27',
    source: '北京市财政局',
    views: 1856,
    category: '地方政策',
  },
  {
    id: 3,
    title: '国家数据局：加快印发梯次培育数字产业集群行动计划',
    summary: '记者获悉，国家数据局近日会同有关部门召开数字中国建设工作推进会议，提出要加快印发梯次培育数字产业集群的行动计划，加强体系化促进平台经济健康发展政策研究。',
    date: '2024-12-26',
    source: '国家数据局',
    views: 3421,
    category: '国家政策',
  },
  {
    id: 4,
    title: '江苏：到2027年底建设不少于1000个高质量数据集',
    summary: '着力打造3个数据标注基地，集中培育10个左右创新引领力强、要素集聚力强、行业影响力强的数据标注重点企业，建设1000个完整规范、准确实用的高质量数据集，遴选100个可复制、可推广的典型应用案例。',
    date: '2024-12-25',
    source: '江苏省数据局',
    views: 1534,
    category: '地方政策',
  },
  {
    id: 5,
    title: '工信部：分行业分区域培育一批深耕行业的制造业数字化转型促进中心',
    summary: '工业和信息化部党组成员、副部长辛国斌出席培训班并作开班讲话，他指出，推进制造业数字化转型是构建现代化产业体系的重要路径，是扩大有效投资需求的重要手段，是打造产业国际竞争新优势的战略举措。',
    date: '2024-12-24',
    source: '工业和信息化部',
    views: 2187,
    category: '国家政策',
  },
];

const categories = ['全部', '国家政策', '地方政策', '香港政策', '行业标准'];

export default function PolicyPage() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary-foreground">政策法规</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            汇集国家级、地方级关于数据资产、数据要素、数字经济的政策文件及专业解读
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="搜索政策法规..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                筛选
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat, index) => (
                <Button
                  key={cat}
                  variant={index === 0 ? 'default' : 'outline'}
                  size="sm"
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Policy List */}
            <div className="space-y-4">
              {policies.map((policy, index) => (
                <Link
                  key={policy.id}
                  to={`/policy/${policy.id}`}
                  className="news-card block p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag tag-policy">{policy.category}</span>
                    <span className="text-xs text-muted-foreground">{policy.source}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {policy.summary}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {policy.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {policy.views.toLocaleString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Hot Topics */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                热门政策
              </h3>
              <ul className="space-y-3">
                {policies.slice(0, 5).map((policy, index) => (
                  <li key={policy.id}>
                    <Link
                      to={`/policy/${policy.id}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className={`flex-shrink-0 w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${
                        index < 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {policy.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-gold rounded-xl p-6 text-primary-foreground">
              <h3 className="font-semibold mb-2">订阅政策速递</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">
                第一时间获取最新政策法规解读
              </p>
              <Input 
                placeholder="输入邮箱地址" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 mb-3"
              />
              <Button variant="secondary" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                立即订阅
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
