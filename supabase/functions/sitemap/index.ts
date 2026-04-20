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

function formatLastmod(date: string | null | undefined): string {
  if (!date) return new Date().toISOString()
  return new Date(date).toISOString()
}

/** Boost priority for content updated within the last 30 days. */
function freshnessBoost(date: string | null | undefined, base: number): number {
  if (!date) return base
  const ageMs = Date.now() - new Date(date).getTime()
  const ageDays = ageMs / (1000 * 60 * 60 * 24)
  if (ageDays <= 7) return Math.min(0.95, base + 0.2)
  if (ageDays <= 30) return Math.min(0.9, base + 0.1)
  return base
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map((url) => {
      const parts = [`    <loc>${escapeXml(url.loc)}</loc>`]
      if (url.lastmod) parts.push(`    <lastmod>${url.lastmod}</lastmod>`)
      if (url.changefreq) parts.push(`    <changefreq>${url.changefreq}</changefreq>`)
      if (url.priority !== undefined) parts.push(`    <priority>${url.priority.toFixed(2)}</priority>`)
      return `  <url>\n${parts.join('\n')}\n  </url>`
    })
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

    const now = new Date().toISOString()

    // Static pages with priorities (filter out admin/auth/profile/404)
    const staticUrls: SitemapUrl[] = [
      { loc: `${SITE_URL}/`, lastmod: now, changefreq: 'daily', priority: 1.0 },
      { loc: `${SITE_URL}/products`, lastmod: now, changefreq: 'daily', priority: 0.9 },
      { loc: `${SITE_URL}/data-merchants`, lastmod: now, changefreq: 'daily', priority: 0.9 },
      { loc: `${SITE_URL}/token-hub`, lastmod: now, changefreq: 'daily', priority: 0.9 },
      { loc: `${SITE_URL}/openclaw`, lastmod: now, changefreq: 'weekly', priority: 0.85 },
      { loc: `${SITE_URL}/news`, lastmod: now, changefreq: 'daily', priority: 0.8 },
      { loc: `${SITE_URL}/policy`, lastmod: now, changefreq: 'weekly', priority: 0.8 },
      { loc: `${SITE_URL}/insights`, lastmod: now, changefreq: 'weekly', priority: 0.7 },
      { loc: `${SITE_URL}/events`, lastmod: now, changefreq: 'weekly', priority: 0.7 },
      { loc: `${SITE_URL}/opportunities`, lastmod: now, changefreq: 'daily', priority: 0.7 },
      { loc: `${SITE_URL}/data-asset`, lastmod: now, changefreq: 'weekly', priority: 0.6 },
      { loc: `${SITE_URL}/about`, lastmod: now, changefreq: 'monthly', priority: 0.6 },
      { loc: `${SITE_URL}/sitemap`, lastmod: now, changefreq: 'monthly', priority: 0.3 },
      { loc: `${SITE_URL}/privacy`, lastmod: now, changefreq: 'yearly', priority: 0.2 },
      { loc: `${SITE_URL}/terms`, lastmod: now, changefreq: 'yearly', priority: 0.2 },
    ]

    // Fetch published articles (newest first)
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, category, updated_at, published_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false })
      .limit(2000)

    // Fetch published data products (newest first)
    const { data: products } = await supabase
      .from('data_products')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false })
      .limit(2000)

    // Fetch published token datasets
    const { data: tokenDatasets } = await supabase
      .from('token_datasets')
      .select('slug, updated_at, created_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false })
      .limit(1000)

    // Generate article URLs based on category, with freshness-based priority boost
    const articleUrls: SitemapUrl[] = (articles || [])
      .filter((a) => a.slug)
      .map((article) => {
        const routePrefix = article.category === 'policy' ? '/policy' : '/news'
        const lastDate = article.updated_at || article.published_at
        return {
          loc: `${SITE_URL}${routePrefix}/${article.slug}`,
          lastmod: formatLastmod(lastDate),
          changefreq: 'weekly' as const,
          priority: freshnessBoost(lastDate, 0.6),
        }
      })

    const productUrls: SitemapUrl[] = (products || [])
      .filter((p) => p.slug)
      .map((product) => {
        const lastDate = product.updated_at || product.published_at
        return {
          loc: `${SITE_URL}/products/${product.slug}`,
          lastmod: formatLastmod(lastDate),
          changefreq: 'weekly' as const,
          priority: freshnessBoost(lastDate, 0.7),
        }
      })

    const tokenUrls: SitemapUrl[] = (tokenDatasets || [])
      .filter((d) => d.slug)
      .map((d) => {
        const lastDate = d.updated_at || d.created_at
        return {
          loc: `${SITE_URL}/token-hub/${d.slug}`,
          lastmod: formatLastmod(lastDate),
          changefreq: 'weekly' as const,
          priority: freshnessBoost(lastDate, 0.7),
        }
      })

    // Order: static (high-priority hub pages) → products → token → articles
    const allUrls = [...staticUrls, ...productUrls, ...tokenUrls, ...articleUrls]

    const sitemapXml = generateSitemapXml(allUrls)

    console.log(
      `Generated sitemap with ${allUrls.length} URLs (` +
        `${staticUrls.length} static, ${articleUrls.length} articles, ` +
        `${productUrls.length} products, ${tokenUrls.length} token datasets)`
    )

    return new Response(sitemapXml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
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
