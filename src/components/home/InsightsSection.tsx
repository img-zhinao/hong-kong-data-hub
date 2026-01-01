import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const insights = [
  {
    id: 1,
    author: '李明教授',
    role: '香港科技大学数据科学研究院院长',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    quote: '数据要素市场化配置是推动数字经济高质量发展的关键举措，香港凭借其独特的区位优势和制度优势，将在大湾区数据要素流通中发挥不可替代的作用。',
    topic: '数据要素市场化',
  },
  {
    id: 2,
    author: '张伟博士',
    role: '香港大数据协会会长',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    quote: 'AI大模型的发展离不开高质量数据集的支撑，香港作为国际数据枢纽，在跨境数据流动和数据合规方面具有天然优势。',
    topic: 'AI与数据',
  },
  {
    id: 3,
    author: '王芳女士',
    role: '数据资产评估专家',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    quote: '数据资产入表是企业数字化转型的重要里程碑，它不仅是财务处理的创新，更是对企业数据治理能力的全面检验。',
    topic: '数据资产化',
  },
];

export function InsightsSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">专家观点</h2>
          <Link to="/insights">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              更多观点 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <Link
              key={insight.id}
              to={`/insights/${insight.id}`}
              className="bg-card rounded-xl p-6 border hover-lift group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={insight.avatar}
                  alt={insight.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {insight.author}
                  </h4>
                  <p className="text-xs text-muted-foreground">{insight.role}</p>
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -left-1 -top-1 w-6 h-6 text-primary/20" />
                <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                  {insight.quote}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t">
                <span className="tag tag-insight">{insight.topic}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
