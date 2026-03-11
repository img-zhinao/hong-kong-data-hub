

## 重构 OpenClaw 页面 — Agentic AI 资产化交易平台

将 `/openclaw` 页面从简单的军团销售页改造为专业的 AI 智能体资产化交易平台，分为**育种者仪表盘**和**用工市场**两大模块。

---

### 页面整体架构

使用 Tabs 组件将页面分为两个视图：

```text
┌─────────────────────────────────────────────┐
│  OpenClaw Hero (简化，突出平台定位)           │
├──────────────────┬──────────────────────────┤
│  育种者仪表盘 Tab │  用工市场 Tab              │
├──────────────────┴──────────────────────────┤
│  Tab 内容区                                  │
└─────────────────────────────────────────────┘
```

---

### 新增 / 重构组件

| 文件 | 说明 |
|------|------|
| `src/components/openclaw/OpenClawHero.tsx` | **修改** — 更新标题为 Agentic AI 资产交易平台定位 |
| `src/components/openclaw/openClawData.ts` | **修改** — 扩展数据模型，增加 TCR、记忆深度、GEO 评分、硬件系数、安全合规字段 |
| `src/components/openclaw/AgentPassport.tsx` | **新建** — 龙虾简历/体检报告卡片组件 |
| `src/components/openclaw/DynamicValuation.tsx` | **新建** — 动态估值器公式组件 |
| `src/components/openclaw/C2DVerification.tsx` | **新建** — 试运行 C2D 验证 UI |
| `src/components/openclaw/ComplianceLabels.tsx` | **新建** — 安全合规标签组件 |
| `src/components/openclaw/BreederDashboard.tsx` | **新建** — 育种者仪表盘（资产挂牌表单） |
| `src/components/openclaw/TalentMarket.tsx` | **新建** — 用工市场（浏览、筛选、详情） |
| `src/components/openclaw/AgentDetailDialog.tsx` | **新建** — 替代旧 DetailDialog，整合 Passport + 估值 + C2D + 合规 |
| `src/pages/OpenClawPage.tsx` | **修改** — 整合 Tabs 布局 |

---

### 1) 数据模型扩展 (`openClawData.ts`)

在现有 `OpenClawProduct` 基础上增加字段：

```typescript
interface AgentMetrics {
  tcr: number;              // 任务成功率 0-100
  memoryEntries: number;    // MEMORY.md 条目数
  memoryCompression: number;// 压缩比 (如 0.35)
  geoScore: number;         // GEO 友好度 0-100
}

interface ComplianceStatus {
  appleIdUnbound: boolean;  // Apple ID 已解绑
  piiSanitized: boolean;    // PII 已脱敏
  soulMdUploaded: boolean;  // SOUL.md 已上传
  identityMdUploaded: boolean; // IDENTITY.md 已上传
}

interface HardwareSpec {
  model: string;            // 'Mac Mini M4' | 'Mac Mini M4 Pro'
  ram: number;              // GB
  storage: number;          // GB
  quantity: number;
  hwCoefficient: number;    // C_HW 硬件折算系数
}

// 扩展后的产品接口
interface OpenClawAgent extends OpenClawProduct {
  metrics: AgentMetrics;
  compliance: ComplianceStatus;
  hardwareSpec: HardwareSpec;
  soulDescription?: string;
  identityDescription?: string;
  basePrice?: number;       // 公式计算的基准价
}
```

Mock 数据为每个现有产品补充上述字段。

---

### 2) 龙虾简历 Agent Passport (`AgentPassport.tsx`)

一个卡片组件，展示智能体的"体检报告"：

- **TCR 仪表盘** — 圆环进度条显示任务成功率（绿色 > 80%，黄色 60-80%，红色 < 60%）
- **记忆深度** — 条目数 + 压缩比，用进度条可视化
- **GEO 友好度** — 评分 + 星级标识
- 所有指标排列在 2×2 网格中，配色与现有深蓝金色一致

---

### 3) 动态估值器 (`DynamicValuation.tsx`)

- 展示公式 `P_base = (α·TCR + β·log(T) + γ·S_count) × C_HW`
- 公式用金色高亮，参数说明以 tooltip 展示
- 实时计算并展示基准价（前端纯计算，α=100, β=500, γ=200 为默认系数）
- 与挂牌价对比显示差异百分比

---

### 4) C2D 试运行 (`C2DVerification.tsx`)

- "试运行"按钮，点击后模拟发起任务
- 展示 loading 动画 → 模拟返回执行结果（成功/失败 + 耗时 + 输出摘要）
- 明确标注"无需下载原始记忆文件"
- 暂为前端 mock，后续可接后端接口

---

### 5) 安全合规标签 (`ComplianceLabels.tsx`)

- 4 个检查项：Apple ID 解绑、PII 脱敏、SOUL.md 上传、IDENTITY.md 上传
- 通过的显示绿色勾 ✓，未通过显示红色 ✗
- 紧凑的水平标签行，嵌入到智能体卡片和详情弹窗

---

### 6) 育种者仪表盘 (`BreederDashboard.tsx`)

改造现有 `OpenClawListing` + `OpenClawListingForm`：

- **资产挂牌表单**（全页面，非弹窗）：
  - 上传 SOUL.md / IDENTITY.md 描述文本框
  - 硬件参数选择（型号、RAM、存储、数量）
  - AI 员工配置
  - 运营数据填写（运行天数、TCR、收益）
- 保留原有三档收费标准
- 提交后 toast 提示

---

### 7) 用工市场 (`TalentMarket.tsx`)

改造现有 `OpenClawProductGrid`：

- 筛选栏：按状态、硬件型号、TCR 范围筛选
- 卡片增加：TCR 指标、GEO 评分、合规标签
- 点击进入 `AgentDetailDialog`（整合 Passport + 估值器 + C2D + 合规）

---

### 8) 页面组装 (`OpenClawPage.tsx`)

```tsx
<Layout>
  <OpenClawHero />   {/* 更新文案 */}
  <OpenClawStats />  {/* 保留 */}
  <Tabs defaultValue="market">
    <TabsList>
      <TabsTrigger value="market">用工市场 Talent Market</TabsTrigger>
      <TabsTrigger value="breeder">育种者仪表盘 Breeder Dashboard</TabsTrigger>
    </TabsList>
    <TabsContent value="market">
      <TalentMarket />
    </TabsContent>
    <TabsContent value="breeder">
      <BreederDashboard />
    </TabsContent>
  </Tabs>
  <OpenClawProcess />    {/* 保留 */}
  <OpenClawRiskNotice />  {/* 保留 */}
  <OpenClawFAQ />        {/* 更新 FAQ 内容 */}
</Layout>
```

---

### 设计风格

- 延续现有深蓝 `#0a1628` + 金色 `#d4af37` 主题
- 新增数据可视化：圆环进度条（TCR）、线性进度条（记忆深度）
- 公式使用 monospace 字体 + 金色高亮
- 合规标签使用绿/红色简洁标记

