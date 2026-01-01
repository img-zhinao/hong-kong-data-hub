import { Layout } from '@/components/layout/Layout';
import { Lightbulb, Quote, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const insights = [
  {
    id: 1,
    author: '李明教授',
    role: '香港科技大学数据科学研究院院长',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    quote: '数据要素市场化配置是推动数字经济高质量发展的关键举措，香港凭借其独特的区位优势和制度优势，将在大湾区数据要素流通中发挥不可替代的作用。',
    fullContent: '数据要素市场化配置是推动数字经济高质量发展的关键举措。香港作为国际金融中心，具有法治健全、信息自由流通、国际化程度高等独特优势。在粤港澳大湾区建设背景下，香港将成为连接内地与国际市场的数据桥梁...',
    topic: '数据要素市场化',
    date: '2024-12-28',
  },
  {
    id: 2,
    author: '张伟博士',
    role: '香港大数据协会会长',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    quote: 'AI大模型的发展离不开高质量数据集的支撑，香港作为国际数据枢纽，在跨境数据流动和数据合规方面具有天然优势。',
    fullContent: '人工智能大模型的训练需要海量高质量数据支撑。在全球数据监管日趋严格的背景下，如何在保障数据安全的前提下实现数据价值最大化成为关键...',
    topic: 'AI与数据',
    date: '2024-12-26',
  },
  {
    id: 3,
    author: '王芳女士',
    role: '数据资产评估专家',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    quote: '数据资产入表是企业数字化转型的重要里程碑，它不仅是财务处理的创新，更是对企业数据治理能力的全面检验。',
    fullContent: '随着财政部发布数据资产入表相关政策，企业数据资产化进入实质性推进阶段。数据资产入表不仅能够增加企业资产总额，更重要的是倒逼企业提升数据治理水平...',
    topic: '数据资产化',
    date: '2024-12-24',
  },
  {
    id: 4,
    author: '陈华先生',
    role: '跨境数据流通研究员',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    quote: '粤港澳大湾区跨境数据流通机制的建立，将为全国乃至全球的跨境数据治理提供宝贵经验。',
    fullContent: '跨境数据流通是数字经济全球化的必然要求。粤港澳大湾区作为"一国两制"下的特殊区域，在探索跨境数据流通方面具有独特的试验价值...',
    topic: '跨境数据流通',
    date: '2024-12-22',
  },
  {
    id: 5,
    author: '刘强教授',
    role: '数据安全与隐私保护专家',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
    quote: '隐私计算技术是实现数据"可用不可见"的关键，它让数据价值释放与隐私保护不再矛盾。',
    fullContent: '隐私计算技术包括安全多方计算、联邦学习、可信执行环境等多种技术路线。这些技术的成熟应用，使得数据可以在不暴露原始数据的情况下实现价值挖掘...',
    topic: '隐私计算',
    date: '2024-12-20',
  },
];

const topics = ['全部', '数据要素市场化', 'AI与数据', '数据资产化', '跨境数据流通', '隐私计算'];

export default function InsightsPage() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary-foreground">专家观点</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            汇集行业领袖、学术专家的深度见解与前沿洞察
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Search & Topics */}
        <div className="mb-8">
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="搜索专家观点..." className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <button
                key={topic}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <Link
              key={insight.id}
              to={`/insights/${insight.id}`}
              className="bg-card rounded-xl p-6 border hover-lift group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={insight.avatar}
                  alt={insight.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {insight.author}
                  </h4>
                  <p className="text-sm text-muted-foreground">{insight.role}</p>
                </div>
              </div>
              
              <div className="relative mb-4">
                <Quote className="absolute -left-1 -top-1 w-8 h-8 text-primary/10" />
                <p className="text-muted-foreground leading-relaxed pl-6 italic">
                  "{insight.quote}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="tag tag-insight">{insight.topic}</span>
                <span className="text-sm text-muted-foreground">{insight.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
