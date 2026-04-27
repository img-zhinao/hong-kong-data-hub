# Token Hub 重新定位：香港 Token 流转平台

## 战略定位

依托香港作为国际数据自由港的独特优势，将 Token Hub 从单纯的"数据集词元市场"升级为面向**中小企业（SME）**的双向 Token 流转枢纽：

- **Token 出海**：帮助大陆数据/模型方将 Token 化资产合规出境，对接全球买家
- **Token 入境**：让大陆中小企业通过香港枢纽，合规调用 OpenAI、Anthropic、Google 等国际领先大模型
- **桥梁角色**：香港中立、合规、可结算（HKD/USD/CNH/USDC）

## 页面改造范围（仅 UI 框架文字 + 静态结构，不改数据库）

### 1. 改造 Hero 区（`TokenHubHero.tsx`）

新标题与定位文案：

- 主标题：**Token Hub · 香港 Token 流转平台**
- 副标题：**Token 出海 · 全球大模型入境 · 一站式枢纽**
- 描述：依托香港国际数据港优势，为中小企业提供合规、低门槛的 Token 双向流转通道——既支持大陆数据资产 Token 化出海，也支持大陆企业经香港合规调用 OpenAI / Anthropic / Google 等国际领先大模型服务。
- CTA：`接入国际大模型` / `Token 资产出海`（取代原 `浏览数据集` / `商业模式说明`）

### 2. 新增「双向流转」核心区块（新组件 `BidirectionalFlowSection.tsx`）

放在 Hero 之下、Stats 之上。两栏对称卡片 + 中央香港枢纽图示（CSS/SVG，无外部图）：

```text
   大陆数据 / 模型           ←→  [ 香港 Token Hub ]  ←→        国际大模型 / 买家
   (出海方向)                     合规 · 结算 · 路由              (入境方向)
```

- 左卡「Token 出海」：数据资产 Token 化、合规出境、结算结汇、面向全球买家
- 右卡「全球模型入境」：统一 API 网关、聚合 OpenAI/Anthropic/Google/Meta、HKD/USDC 结算、对中小企业零门槛

### 3. 新增「面向中小企业」价值主张区（新组件 `SMEValueSection.tsx`）

四张卡片，突出中小企业痛点解决：

| 痛点 | Token Hub 方案 |
|---|---|
| 国际大模型支付/合规难 | 香港主体统一开票、HKD/USD/USDC 结算 |
| 多模型 API 切换成本高 | 单一 OpenAI 兼容接口聚合主流模型 |
| 数据出海合规风险 | 香港合规通道 + Token 化脱敏 |
| 起量门槛高 | 按 Token 计费、无最低消费、按需充值 |

### 4. 新增「国际大模型聚合」展示区（新组件 `ModelGatewaySection.tsx`）

展示已聚合的国际模型品牌（纯文字 + lucide 图标，避免外链 logo 版权）：
- OpenAI（GPT-5 系列）
- Anthropic（Claude）
- Google（Gemini）
- Meta（Llama）
- Mistral / xAI 等

含一段简短代码片段卡片，展示「OpenAI 兼容接口」调用示例（仅展示，不真实运行），并标注：API endpoint 由香港合规网关提供。

### 5. 新增「香港优势」区（新组件 `HongKongAdvantageSection.tsx`）

四个要点：
- 国际数据自由港，跨境数据流通便利
- 多币种结算（HKD/USD/CNH/USDC），全球开票
- 普通法体系 + 国际仲裁，合同与 IP 保护
- 与 CEPA / 大湾区数据跨境政策衔接

### 6. 调整「商业模式」区（`BusinessModelSection.tsx`）

保留原 4 阶段结构，但补充一段说明：在「Token 流转平台」定位下，前两阶段（数据包销售、API 调用）即对应「出海」与「模型入境」两条主线，强化与新定位的衔接。

### 7. 数据集市场区（`TokenHubPage.tsx` 中段）

- 标题由「数据集市场」→「**Token 资产市场（出海方向）**」
- 增加副标题说明：以下数据集已完成 Token 化，可面向全球买家流转
- 列表/筛选/分页逻辑、`useTokenDatasets` Hook、数据库均**不改动**

### 8. SEO 更新

`SEO` 组件 props：
- title：`Token Hub · 香港 Token 流转平台 | 大模型入境 + 数据出海`
- description：突出「中小企业」「国际大模型」「Token 出海」「香港枢纽」
- keywords：补充 `OpenAI 香港接入, Claude 大陆调用, 数据出海, Token 跨境, 中小企业 AI`

## 不做的事

- 不改 Supabase 数据库 / `token_datasets` 表 / Hooks
- 不接入真实的 OpenAI/Anthropic 转发能力（属于后续 Edge Function 工作，本次仅做定位与 UI 框架）
- 不改导航菜单结构
- 不做 RTL / 不影响 i18n（页面内容均为静态中文，与既有 i18n 框架不冲突）

## 文件清单

新建：
- `src/components/tokenhub/BidirectionalFlowSection.tsx`
- `src/components/tokenhub/SMEValueSection.tsx`
- `src/components/tokenhub/ModelGatewaySection.tsx`
- `src/components/tokenhub/HongKongAdvantageSection.tsx`

修改：
- `src/components/tokenhub/TokenHubHero.tsx`（文案 + CTA）
- `src/components/tokenhub/BusinessModelSection.tsx`（补充说明段）
- `src/pages/TokenHubPage.tsx`（编排新区块顺序、调整数据集市场标题、更新 SEO）

## 页面新顺序

1. TokenHubHero（新文案）
2. BidirectionalFlowSection（双向流转核心图示）
3. Stats（保留）
4. SMEValueSection（中小企业价值）
5. ModelGatewaySection（国际大模型聚合）
6. 数据集市场（更名为 Token 资产市场）
7. HongKongAdvantageSection（香港优势）
8. BusinessModelSection（保留 + 补充）

## 后续可选（非本次范围）

- Edge Function `ai-gateway-proxy`：实际承接国际大模型 API 转发（OpenAI 兼容接口）
- 中小企业账户体系：充值钱包、用量看板、API Key 管理
- 跨境结算对接（Stripe HK / Airwallex / USDC on-chain）
