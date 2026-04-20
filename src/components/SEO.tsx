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
  /** Use NewsArticle schema instead of Article (for news category items) */
  isNewsArticle?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  product?: {
    name: string;
    description?: string;
    price?: number;
    currency?: string;
    availability?: string;
    brand?: string;
    category?: string;
    image?: string;
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  itemList?: Array<{
    name: string;
    url: string;
    position: number;
  }>;
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
  isNewsArticle = false,
  article,
  product,
  breadcrumbs,
  itemList,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : SITE_NAME;
  const finalOgTitle = ogTitle || title || DEFAULT_TITLE;
  const finalOgDescription = ogDescription || description;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  // Build JSON-LD based on page type
  const jsonLdScripts: object[] = [];

  // Base WebPage / Article / NewsArticle
  if (ogType === 'article' && article) {
    jsonLdScripts.push({
      '@context': 'https://schema.org',
      '@type': isNewsArticle ? 'NewsArticle' : 'Article',
      headline: finalOgTitle,
      description: finalOgDescription,
      image: fullOgImage,
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime || article.publishedTime,
      author: {
        '@type': 'Organization',
        name: article.author || '香港大数据交易所',
      },
      publisher: {
        '@type': 'Organization',
        name: '香港大数据交易所',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/hkbde-logo.png`,
        },
      },
      articleSection: article.section,
      keywords: article.tags?.join(', '),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl || SITE_URL,
      },
    });
  } else if (ogType !== 'product') {
    jsonLdScripts.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: finalOgTitle,
      description: finalOgDescription,
      image: fullOgImage,
      publisher: {
        '@type': 'Organization',
        name: '香港大数据交易所',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/hkbde-logo.png`,
        },
      },
    });
  }

  // Product JSON-LD
  if (product) {
    jsonLdScripts.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description || finalOgDescription,
      image: product.image || fullOgImage,
      ...(product.brand && {
        brand: {
          '@type': 'Organization',
          name: product.brand,
        },
      }),
      ...(product.category && { category: product.category }),
      offers: {
        '@type': 'Offer',
        price: product.price || 0,
        priceCurrency: product.currency || 'HKD',
        availability: product.availability || 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: product.brand || '香港大数据交易所',
        },
      },
    });
  }

  // BreadcrumbList JSON-LD
  if (breadcrumbs && breadcrumbs.length > 0) {
    jsonLdScripts.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((bc, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: bc.name,
        item: bc.url.startsWith('http') ? bc.url : `${SITE_URL}${bc.url}`,
      })),
    });
  }

  // ItemList JSON-LD (for listing pages)
  if (itemList && itemList.length > 0) {
    jsonLdScripts.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: itemList.map((item) => ({
        '@type': 'ListItem',
        position: item.position,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
      })),
    });
  }

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
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:locale" content="zh_CN" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      
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

      {/* Product-specific OG tags */}
      {product && ogType === 'product' && (
        <>
          <meta property="product:price:amount" content={String(product.price || 0)} />
          <meta property="product:price:currency" content={product.currency || 'HKD'} />
        </>
      )}
      
      {/* Schema.org JSON-LD */}
      {jsonLdScripts.map((script, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(script)}
        </script>
      ))}
    </Helmet>
  );
}
