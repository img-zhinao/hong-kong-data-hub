

## GEO（生成引擎优化）自动更新方案

### 概述

创建一个 Supabase Edge Function `llms-txt`，动态生成 `llms.txt` 文件，供 AI 爬虫（GPTBot、Claude-Web 等）理解网站结构和内容。同时更新 `robots.txt` 和现有的 `sitemap` Edge Function，确保三者协同工作并自动从数据库获取最新内容。

### llms.txt 规范

`llms.txt` 是一种新兴的 GEO 标准，用纯文本/Markdown 格式向 AI 模型描述网站内容和结构，方便 LLM 理解和引用。

### 需要创建/修改的文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `supabase/functions/llms-txt/index.ts` | 新建 | 动态生成 llms.txt，从数据库拉取最新文章和产品 |
| `public/robots.txt` | 更新 | 添加 llms.txt 的引用路径 |
| `supabase/config.toml` | 更新 | 添加 llms-txt 函数配置（关闭 JWT 验证） |

现有的 `sitemap` Edge Function 和静态 `sitemap.xml` 已经完善，无需修改。

### 技术细节

#### 1. 新建 `supabase/functions/llms-txt/index.ts`

动态生成符合 llms.txt 规范的 Markdown 文件，内容包括：

- 网站基本信息（名称、描述、联系方式）
- 所有静态页面及其用途说明
- 从 `articles` 表动态获取最新发布的文章列表（按 sub_category 分组）
- 从 `data_products` 表动态获取最新数据产品列表
- 输出格式为纯文本 Markdown

```text
# 香港大数据交易所 (HKBDE)

> 香港领先的数据要素市场基础设施，致力于打造安全、合规、高效的数据交易生态。

## 网站信息
- 官方网址: https://hkbde.fun
- 地址: Room 815, 8/F., Star House, 3 Salisbury Road, Tsim Sha Tsui, Kowloon, Hong Kong
- 电话: +852 3749 9968

## 主要页面
- [首页](https://hkbde.fun/): 了解核心服务和最新动态
- [数据产品](https://hkbde.fun/products): 浏览数据交易产品
...

## 最新文章

### 数交所动态
- [文章标题](https://hkbde.fun/news/slug): 摘要...

### 行业资讯
...
```

#### 2. 更新 `public/robots.txt`

在现有内容基础上添加 llms.txt 引用：

```text
# LLM/AI Content Guide
# llms.txt for AI model consumption
Sitemap: https://hkbde.fun/functions/v1/llms-txt
```

#### 3. 更新 `supabase/config.toml`

```toml
[functions.llms-txt]
verify_jwt = false
```

### 自动更新机制

三个文件都通过 Supabase Edge Function 动态生成（sitemap 已有，llms-txt 新建），每次请求时实时查询数据库。设置 1 小时缓存（Cache-Control），既保证内容新鲜度又减少数据库压力。

- `robots.txt`：静态文件，指向动态端点
- `sitemap`：已有 Edge Function，实时生成
- `llms-txt`：新建 Edge Function，实时生成

