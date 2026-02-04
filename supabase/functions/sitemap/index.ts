import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SITE_URL = 'https://hkbde.fun'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

function formatDate(date: string | null): string {
  if (!date) return new Date().toISOString().split('T')[0]
  return new Date(date).toISOString().split('T')[0]
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Static pages with priorities
    const staticUrls: SitemapUrl[] = [
      { loc: `${SITE_URL}/`, lastmod: formatDate(null), changefreq: 'daily', priority: 1.0 },
      { loc: `${SITE_URL}/products`, lastmod: formatDate(null), changefreq: 'daily', priority: 0.9 },
      { loc: `${SITE_URL}/data-merchants`, lastmod: formatDate(null), changefreq: 'daily', priority: 0.9 },
      { loc: `${SITE_URL}/news`, lastmod: formatDate(null), changefreq: 'daily', priority: 0.8 },
      { loc: `${SITE_URL}/policy`, lastmod: formatDate(null), changefreq: 'weekly', priority: 0.8 },
      { loc: `${SITE_URL}/insights`, lastmod: formatDate(null), changefreq: 'weekly', priority: 0.7 },
      { loc: `${SITE_URL}/events`, lastmod: formatDate(null), changefreq: 'weekly', priority: 0.7 },
      { loc: `${SITE_URL}/opportunities`, lastmod: formatDate(null), changefreq: 'daily', priority: 0.7 },
      { loc: `${SITE_URL}/data-asset`, lastmod: formatDate(null), changefreq: 'weekly', priority: 0.6 },
      { loc: `${SITE_URL}/about`, lastmod: formatDate(null), changefreq: 'monthly', priority: 0.6 },
      { loc: `${SITE_URL}/privacy`, lastmod: formatDate(null), changefreq: 'monthly', priority: 0.3 },
      { loc: `${SITE_URL}/terms`, lastmod: formatDate(null), changefreq: 'monthly', priority: 0.3 },
      { loc: `${SITE_URL}/sitemap`, lastmod: formatDate(null), changefreq: 'monthly', priority: 0.2 },
    ]

    // Fetch published articles
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, category, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (articlesError) {
      console.error('Error fetching articles:', articlesError)
    }

    // Fetch published data products
    const { data: products, error: productsError } = await supabase
      .from('data_products')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (productsError) {
      console.error('Error fetching products:', productsError)
    }

    // Generate article URLs based on category
    const articleUrls: SitemapUrl[] = (articles || []).map((article) => {
      // Determine the route prefix based on category
      let routePrefix = '/news'
      if (article.category === 'policy') {
        routePrefix = '/policy'
      }
      
      return {
        loc: `${SITE_URL}${routePrefix}/${article.slug}`,
        lastmod: formatDate(article.updated_at || article.published_at),
        changefreq: 'weekly' as const,
        priority: 0.6,
      }
    })

    // Generate product URLs
    const productUrls: SitemapUrl[] = (products || []).map((product) => ({
      loc: `${SITE_URL}/products/${product.slug}`,
      lastmod: formatDate(product.updated_at || product.published_at),
      changefreq: 'weekly' as const,
      priority: 0.7,
    }))

    // Combine all URLs
    const allUrls = [...staticUrls, ...articleUrls, ...productUrls]

    // Generate XML
    const sitemapXml = generateSitemapXml(allUrls)

    console.log(`Generated sitemap with ${allUrls.length} URLs (${staticUrls.length} static, ${articleUrls.length} articles, ${productUrls.length} products)`)

    return new Response(sitemapXml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error generating sitemap:', error)
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
