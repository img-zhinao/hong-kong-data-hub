import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SITE_URL = 'https://hkbde.fun'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch all data in parallel
    const [articlesRes, productsRes, statsRes, merchantsRes] = await Promise.all([
      supabase
        .from('articles')
        .select('title, slug, summary, category, sub_category')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(100),
      supabase
        .from('data_products')
        .select('title, slug, summary, category')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(50),
      supabase
        .from('platform_stats')
        .select('metric_key, metric_value, label'),
      supabase
        .from('data_merchants')
        .select('id', { count: 'exact', head: true }),
    ])

    const articles = articlesRes.data
    const products = productsRes.data
    const stats = statsRes.data
    const merchantCount = merchantsRes.count || 0

    // Group articles by sub_category
    const articlesByCategory: Record<string, typeof articles> = {}
    for (const article of articles || []) {
      const cat = article.sub_category || article.category || '其他'
      if (!articlesByCategory[cat]) articlesByCategory[cat] = []
      articlesByCategory[cat].push(article)
    }

    // Build llms.txt content
    let content = `# 香港大数据交易所 (Hong Kong Big Data Exchange, HKBDE)

> 香港领先的数据要素市场基础设施，致力于打造安全、合规、高效的数据交易生态。连接全球数据供需双方，推动数据要素价值释放。

## 网站信息
- 官方网址: ${SITE_URL}
- 地址: Room 815, 8/F., Star House, 3 Salisbury Road, Tsim Sha Tsui, Kowloon, Hong Kong
- 电话: +852 3749 9968
- 传真: +852 3749 9970

## 平台统计
- 入驻数据商: ${merchantCount} 家
- 数据产品: ${products?.length || 0} 个
- 文章资讯: ${articles?.length || 0} 篇
`
    // Add platform_stats metrics
    if (stats && stats.length > 0) {
      for (const stat of stats) {
        if (stat.label && stat.metric_value != null) {
          content += `- ${stat.label}: ${stat.metric_value}\n`
        }
      }
    }

    content += `
## 主要页面
- [首页](${SITE_URL}/): 了解香港大数据交易所的核心服务和最新动态
- [数据产品](${SITE_URL}/products): 浏览和搜索可交易的数据产品
- [数据商](${SITE_URL}/data-merchants): 查看入驻数据服务商信息
- [行业动态](${SITE_URL}/news): 数交所动态、行业资讯、企业快讯
- [政策法规](${SITE_URL}/policy): 数据相关政策法规解读
- [专家观点](${SITE_URL}/insights): 行业专家分析与洞察
- [活动中心](${SITE_URL}/events): 行业会议、研讨会等活动信息
- [项目招标](${SITE_URL}/opportunities): 数据相关项目招标信息
- [数据资产入门](${SITE_URL}/data-asset): 数据资产化基础知识
- [关于我们](${SITE_URL}/about): 公司简介与联系方式

## 核心服务
- 数据产品交易撮合
- 数据资产评估与定价
- 数据合规咨询
- 跨境数据流通服务
- 数据要素市场基础设施建设

## 行业覆盖
工业制造、现代农业、商贸流通、交通运输、金融服务、科技创新、文化旅游、医疗健康、应急管理、气象服务、城市治理、绿色低碳
`

    // Articles section
    if (Object.keys(articlesByCategory).length > 0) {
      content += `\n## 最新文章\n`
      for (const [category, catArticles] of Object.entries(articlesByCategory)) {
        content += `\n### ${category}\n`
        for (const article of catArticles!.slice(0, 10)) {
          const routePrefix = article.category === 'policy' ? '/policy' : '/news'
          const summary = article.summary ? `: ${article.summary.slice(0, 80)}` : ''
          content += `- [${article.title}](${SITE_URL}${routePrefix}/${article.slug})${summary}\n`
        }
      }
    }

    // Products section
    if (products && products.length > 0) {
      content += `\n## 数据产品\n`
      for (const product of products) {
        const summary = product.summary ? `: ${product.summary.slice(0, 80)}` : ''
        content += `- [${product.title}](${SITE_URL}/products/${product.slug})${summary}\n`
      }
    }

    content += `\n## 相关资源
- [Sitemap](${SITE_URL}/functions/v1/sitemap): XML 格式站点地图
- [隐私政策](${SITE_URL}/privacy)
- [服务条款](${SITE_URL}/terms)
`

    return new Response(content, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error generating llms.txt:', error)
    return new Response(`Error: ${errorMessage}`, {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
})
