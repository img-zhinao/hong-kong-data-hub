import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  canonicalUrl?: string;
  noIndex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const DEFAULT_TITLE = '香港大数据交易所';
const DEFAULT_DESCRIPTION = '香港大数据交易所是香港领先的数据要素市场基础设施，致力于打造安全、合规、高效的数据交易生态。';
const DEFAULT_KEYWORDS = '香港大数据交易所,HKBDE,数据交易,数据要素,大数据,AI,数据资产,数据产品';
const DEFAULT_OG_IMAGE = '/hkbde-logo.png';
const SITE_NAME = '香港大数据交易所 | HKBDE';
const SITE_URL = 'https://hkbde.fun';

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
  article,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : SITE_NAME;
  const finalOgTitle = ogTitle || title || DEFAULT_TITLE;
  const finalOgDescription = ogDescription || description;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph Tags */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`} />
      <meta property="og:locale" content="zh_CN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`} />
      
      {/* Article-specific tags */}
      {article && ogType === 'article' && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ogType === 'article' ? 'Article' : 'WebPage',
          name: finalOgTitle,
          description: finalOgDescription,
          image: ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`,
          publisher: {
            '@type': 'Organization',
            name: '香港大数据交易所',
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/hkbde-logo.png`,
            },
          },
          ...(article && ogType === 'article' && {
            datePublished: article.publishedTime,
            dateModified: article.modifiedTime,
            author: {
              '@type': 'Person',
              name: article.author,
            },
          }),
        })}
      </script>
    </Helmet>
  );
}
