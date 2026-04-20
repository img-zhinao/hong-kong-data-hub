import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Clock, Eye, FileText, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useArticles, useArticleSubCategories, type Article } from '@/hooks/useArticles';
import { formatDate } from '@/lib/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import { SEO } from '@/components/SEO';

export default function PolicyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const { data: subCategories = [] } = useArticleSubCategories('policy');

  const { data: policiesData, isLoading } = useArticles({
    category: 'policy',
    subCategory: selectedCategory === '全部' ? undefined : selectedCategory,
    search: searchTerm || undefined,
  });
  const policies = policiesData?.articles;

  const { data: hotPoliciesData } = useArticles({
    category: 'policy',
    limit: 5,
    orderBy: 'view_count',
  });
  const hotPolicies = hotPoliciesData?.articles;

  return (
    <Layout>
      <SEO
        title="政策法规"
        description="汇集国家级、地方级关于数据资产、数据要素、数字经济的政策文件及专业解读，包括国家政策、地方政策、香港政策和行业标准。"
        keywords="数据政策,数据法规,数据要素政策,数字经济政策,数据安全法,个人信息保护法"
        canonicalUrl="https://hkbde.fun/policy"
      />
      
      {/* Page Header */}
      <header className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-primary-foreground">政策法规</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            汇集国家级、地方级关于数据资产、数据要素、数字经济的政策文件及专业解读
          </p>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <section className="flex-1" aria-label="政策法规列表">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input 
                  placeholder="搜索政策法规..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="搜索政策法规"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" aria-hidden="true" />
                筛选
              </Button>
            </div>

            {/* Category Tabs */}
            <nav aria-label="政策分类" className="mb-6">
              <ul className="flex flex-wrap gap-2" role="list">
                <li>
                  <Button
                    variant={selectedCategory === '全部' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('全部')}
                  >
                    全部
                  </Button>
                </li>
                {subCategories.map((cat) => (
                  <li key={cat}>
                    <Button
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Policy List */}
            <ul className="space-y-4" role="list">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="news-card p-6">
                    <div className="flex gap-2 mb-2">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-3 w-32" />
                  </li>
                ))
              ) : policies && policies.length > 0 ? (
                policies.map((policy, index) => (
                  <PolicyCard key={policy.id} policy={policy} index={index} />
                ))
              ) : (
                <li className="text-center py-12 text-muted-foreground">
                  暂无相关政策法规
                </li>
              )}
            </ul>
          </section>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6" aria-label="侧边栏">
            {/* Hot Topics */}
            <nav className="bg-card rounded-xl border p-6" aria-label="热门政策">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" aria-hidden="true" />
                热门政策
              </h2>
              <ol className="space-y-3" role="list">
                {hotPolicies?.slice(0, 5).map((policy, index) => (
                  <li key={policy.id}>
                    <Link
                      to={`/policy/${policy.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className={`flex-shrink-0 w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${
                        index < 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`} aria-label={`排名第${index + 1}`}>
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {policy.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Newsletter */}
            <section className="bg-gradient-gold rounded-xl p-6 text-primary-foreground" aria-label="订阅政策速递">
              <h2 className="font-semibold mb-2">订阅政策速递</h2>
              <p className="text-sm text-primary-foreground/80 mb-4">
                第一时间获取最新政策法规解读
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <Input 
                  type="email"
                  placeholder="输入邮箱地址" 
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 mb-3"
                  aria-label="邮箱地址"
                />
                <Button variant="secondary" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  立即订阅
                </Button>
              </form>
            </section>
          </aside>
        </div>
      </main>
    </Layout>
  );
}

interface PolicyCardProps {
  policy: Article;
  index: number;
}

function PolicyCard({ policy, index }: PolicyCardProps) {
  return (
    <li>
      <article>
        <Link
          to={`/policy/${policy.slug}`}
          className="news-card block p-6 animate-fade-in"
          style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
        >
          <header className="flex items-center gap-2 mb-2">
            <span className="tag tag-policy">{policy.sub_category || '政策法规'}</span>
            <span className="text-xs text-muted-foreground">{policy.source_agency}</span>
          </header>
          <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors mb-2">
            {policy.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {policy.summary}
          </p>
          <footer className="flex items-center gap-4 text-xs text-muted-foreground">
            <time dateTime={policy.published_at || undefined} className="flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {formatDate(policy.published_at)}
            </time>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" aria-hidden="true" />
              <span aria-label={`${(policy.view_count || 0).toLocaleString()}次阅读`}>
                {(policy.view_count || 0).toLocaleString()}
              </span>
            </span>
          </footer>
        </Link>
      </article>
    </li>
  );
}
