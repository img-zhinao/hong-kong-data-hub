import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Eye, Building2, Tag, Share2 } from 'lucide-react';
import { useArticle, useIncrementViewCount } from '@/hooks/useArticles';
import { formatDate } from '@/lib/formatters';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const categoryLabels: Record<string, string> = {
  policy: '政策法规',
  news: '新闻资讯',
};

const subCategoryLabels: Record<string, string> = {
  national: '国家政策',
  local: '地方政策',
  standard: '标准规范',
  exchange: '交易所动态',
  industry: '行业资讯',
  enterprise: '企业新闻',
};

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticle(slug || '');
  const incrementViewCount = useIncrementViewCount();

  // 增加阅读量
  useEffect(() => {
    if (article?.id) {
      incrementViewCount.mutate(article.id);
    }
  }, [article?.id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          url: window.location.href,
        });
      } catch (err) {
        // 用户取消分享
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">文章加载失败</h1>
          <p className="text-muted-foreground mb-8">抱歉，无法加载该文章内容</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-6 w-64 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
          <p className="text-muted-foreground mb-8">该文章可能已被删除或不存在</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
        </div>
      </Layout>
    );
  }

  const categoryPath = article.category === 'policy' ? '/policy' : '/news';
  const categoryLabel = categoryLabels[article.category] || article.category;

  return (
    <Layout>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 面包屑导航 */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">首页</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={categoryPath}>{categoryLabel}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[200px] truncate">
                {article.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 文章头部 */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
            {article.title}
          </h1>

          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            {article.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.published_at)}</span>
              </div>
            )}
            {article.source_agency && (
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>{article.source_agency}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{(article.view_count || 0) + 1} 次阅读</span>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap items-center gap-2">
            {article.sub_category && (
              <Badge variant="secondary">
                {subCategoryLabels[article.sub_category] || article.sub_category}
              </Badge>
            )}
            {article.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* 封面图 */}
        {article.cover_image_url && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* 摘要 */}
        {article.summary && (
          <div className="mb-8 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
            <p className="text-muted-foreground leading-relaxed">{article.summary}</p>
          </div>
        )}

        {/* 正文内容 */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content || '' }}
        />

        {/* 底部操作 */}
        <footer className="flex items-center justify-between pt-8 border-t">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回列表
          </Button>
          <Button variant="ghost" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            分享
          </Button>
        </footer>
      </article>
    </Layout>
  );
}
