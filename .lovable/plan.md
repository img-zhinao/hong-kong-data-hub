

## OpenClaw 数字资产挂牌交易 — 实施方案

### 概述

创建一个完整的 OpenClaw 数字资产交易页面 (`/openclaw`)，使用硬编码示例数据，设计风格匹配现有深色金融主题。

### 需要创建/修改的文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/pages/OpenClawPage.tsx` | 新建 | 主页面，包含所有 7 个板块 |
| `src/components/openclaw/OpenClawHero.tsx` | 新建 | Hero 区域 |
| `src/components/openclaw/OpenClawStats.tsx` | 新建 | 核心数据指标（4列） |
| `src/components/openclaw/OpenClawProductGrid.tsx` | 新建 | 交易标的卡片网格 |
| `src/components/openclaw/OpenClawDetailDialog.tsx` | 新建 | 军团详情弹窗（含收益曲线图） |
| `src/components/openclaw/OpenClawProcess.tsx` | 新建 | 交易流程（4步骤） |
| `src/components/openclaw/OpenClawRiskNotice.tsx` | 新建 | 风险提示 |
| `src/components/openclaw/OpenClawFAQ.tsx` | 新建 | FAQ 手风琴 |
| `src/App.tsx` | 修改 | 添加 `/openclaw` 路由 |
| `src/components/layout/Header.tsx` | 修改 | 导航菜单添加 OpenClaw 入口 |

### 设计规范

- 页面整体背景：`bg-[#0a1628]`（深蓝黑）
- 金色强调：`text-[#d4af37]`，按钮用 `bg-gradient-to-r from-[#d4af37] to-[#b8962e]`
- 收益率/正向数据：`text-green-400`（#22c55e）
- 卡片：`bg-white/5 border border-white/10 rounded-2xl`，hover 时 `border-[#d4af37]/50`
- 复用现有 Accordion、Dialog、Button、Badge、Card 组件
- 收益曲线图使用已安装的 `recharts`

### 各板块设计

**1. Hero** — 左侧标题+副标题+CTA 按钮，右侧 Mac Mini 占位图（使用 unsplash 科技图片）

**2. 核心指标** — 4 列卡片，金色大号数字 + TrendingUp 图标，示例数据：已挂牌 12 台 / 累计交易额 ¥168 万 / 平均收益率 58%/月 / 运行中军团 8 个

**3. 交易标的网格** — 3 列网格，每张卡片含状态 Badge（可交易/已售罄/预售中）、配置信息、挂牌价（金色）、月收益/年化（绿色）、购买按钮

**4. 详情弹窗** — Dialog 组件，左侧产品图，右侧配置详情 + recharts 折线图（收益曲线），底部 3 个 CTA 按钮

**5. 交易流程** — 4 步横向排列，图标 + 连接线 + 文字描述

**6. 风险提示** — 黄色边框警告卡片

**7. FAQ** — Accordion 组件，3 个常见问题

### 示例数据（硬编码）

```typescript
const mockProducts = [
  {
    id: 'OC-001',
    name: 'OpenClaw 黄金军团 #001',
    status: 'available', // available | sold | presale
    hardware: 'Mac Mini M4 Pro × 2台',
    employees: ['BossAgent', 'DataMiner', 'ContentWriter', 'CodeReviewer', 'Designer', 'Analyst'],
    runDays: 45,
    totalRevenue: 12580,
    price: 18999,
    monthlyRevenue: 3200,
    annualReturn: 64,
    image: 'unsplash-tech-image-url',
  },
  // ... 5 more items
];
```

### 导航入口

在 Header 导航中，"数商生态" 下拉菜单添加 "OpenClaw 交易" 子项，指向 `/openclaw`。

