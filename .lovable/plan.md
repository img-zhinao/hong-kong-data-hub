

## 新增 "Token Hub" 数据集词元交易栏目

### 背景
对接国家数据局《行业高质量数据集建设方案》中"词元交易"新模式，在 HKBDE 增加 Token Hub 栏目，构建以词元（Token）为基础、可量化、可定价的数据集交易市场。最终实现完整交易闭环（浏览 → 下单 → 支付 → 凭证 → 调用）。

### 一、产品形态

Token Hub 是面向 AI 训练/推理的高质量数据集词元市场。卖家上架数据集（按 Token 计价），买家以"词元包"或"按调用计费"两种方式购买，通过 API Key 调用获取数据。

### 二、分阶段实施路线

**Phase 1 — 栏目骨架与浏览（本次实施）**
- 导航入口 + 落地页 + 数据集列表 + 详情页 + 数据库表
- 支持按行业（12 个"数据要素×"领域）、模态（文本/图像/音频/视频/知识图谱/具身）、计价方式筛选

**Phase 2 — 上架与订单**
- 卖家上架数据集表单（需登录）
- 购物车 + 订单创建（待支付状态）
- 用户中心"我的订单 / 我的词元包"

**Phase 3 — 支付与履约**
- Stripe / Paddle 支付集成
- 支付成功后生成 API Key + Token 余额
- Edge Function: `/token-hub-call` 校验 Key、扣减 Token、返回数据样本/签名 URL

**Phase 4 — 治理增强**
- 卖家结算面板、Token 流水、合规标签、词元定价建议（基于数据规模/质量分）

### 三、Phase 1 详细设计

#### 1) 导航入口
**`Header.tsx`** — 在"数据产品"右侧、"数据资产入表"左侧插入：
- 名称：`Token Hub`，路径：`/token-hub`，highlight 样式（金色边框，与 OpenClaw 同等级）

#### 2) 路由
**`App.tsx`** — 新增：
- `/token-hub` → `TokenHubPage`
- `/token-hub/:slug` → `TokenDatasetDetailPage`

#### 3) 数据库（迁移）

```sql
-- 数据集
CREATE TABLE token_datasets (
  id uuid PK, slug text UNIQUE, name text, description text,
  industry text,        -- 12 个行业枚举
  modality text,        -- text/image/audio/video/kg/embodied
  total_tokens bigint,  -- 总词元数
  price_per_1k_tokens numeric, -- ¥/千词元
  package_options jsonb,-- [{tokens:100000, price:99}, ...]
  quality_score numeric,
  sample_url text, license text, tags text[],
  provider_id uuid, status text default 'published',
  view_count int default 0, created_at, updated_at
);

-- 订单（Phase 2 启用，先建表）
CREATE TABLE token_orders (
  id uuid PK, user_id uuid, dataset_id uuid FK,
  tokens_purchased bigint, amount numeric, currency text default 'HKD',
  status text default 'pending', -- pending/paid/cancelled/refunded
  payment_provider text, payment_ref text,
  created_at, paid_at
);

-- 用户词元余额 + API Key
CREATE TABLE token_balances (
  id uuid PK, user_id uuid, dataset_id uuid,
  tokens_remaining bigint, api_key text UNIQUE,
  created_at, updated_at
);
```

RLS：
- `token_datasets`：public read（status='published'），admin 写
- `token_orders` / `token_balances`：用户仅可见自己的（`auth.uid() = user_id`）

#### 4) 页面与组件

| 文件 | 说明 |
|------|------|
| `src/pages/TokenHubPage.tsx` | Hero（词元交易理念）+ 统计条（数据集数/总词元/行业数）+ 筛选（行业/模态/价格段）+ 数据集卡片网格 |
| `src/pages/TokenDatasetDetailPage.tsx` | 详情：描述、模态、质量分、词元包选项、样例预览、"加入购物车"（Phase 1 占位按钮，提示"即将开放"） |
| `src/components/tokenhub/TokenHubHero.tsx` | 暗色 Hero，引用国家数据局方案 |
| `src/components/tokenhub/DatasetCard.tsx` | 卡片：名称/行业标签/模态/总词元/单价 |
| `src/components/tokenhub/PricingPackages.tsx` | 词元包选择器 |
| `src/hooks/useTokenDatasets.ts` | 列表 + 单条查询，支持筛选与分页（每页 12） |

#### 5) 种子数据
插入 6-8 条示例数据集（覆盖工业制造、医疗健康、金融服务、交通运输、文旅、城市治理等行业；含文本/图像/知识图谱模态）。

#### 6) SEO
页面通过 `<SEO>` 注入标题/描述/关键词（词元交易、Token、高质量数据集、AI 训练数据）。

### 四、Phase 2-4 预留
- 表结构已为订单 / 余额 / API Key 预留，后续无需破坏性迁移
- 详情页 CTA 按钮位置预留，Phase 2 接入购物车
- 支付方式倾向 Stripe（后续询问用户确认）

### 涉及文件（Phase 1）

| 文件 | 操作 |
|------|------|
| Supabase migration | 新建 3 张表 + RLS |
| `src/components/layout/Header.tsx` | 新增导航项 |
| `src/App.tsx` | 新增 2 条路由 |
| `src/pages/TokenHubPage.tsx` | 新建 |
| `src/pages/TokenDatasetDetailPage.tsx` | 新建 |
| `src/components/tokenhub/*` | 新建 4 个组件 |
| `src/hooks/useTokenDatasets.ts` | 新建 |
| 种子数据 | 通过 insert 工具 |

