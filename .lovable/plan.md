# 移动端适配方案（首页 / Token Hub / 越南专区）

聚焦三个核心页面的响应式优化，保留现有汉堡菜单与行情条（仅缩小字号），不改业务逻辑、不改后端、不改桌面端体验。

## 范围

- `/`（首页 + 各 home section）
- `/token-hub`（含 TokenHub 各 section）
- `/vietnam`（VietnamMarketPage）
- 全局：Header（窄屏间距）、MarketTicker（字号）、Layout/容器内边距

## 通用基础（一次性）

1. **MarketTicker**：移动端 `text-xs`、`h-9`、`px-3`，给主内容更多空间。
2. **Header**：窄屏 logo 缩小、隐藏品牌文字（已是 `hidden sm:block`，确认即可）；搜索框窄屏改为图标弹层而非占位输入；汉堡菜单子项保持折叠。
3. **容器/排版基线**：检查 `.container` 在 `< 640px` 的左右 padding（建议 `px-4`），section 上下间距统一改为 `py-10 md:py-16`。
4. **字号阶梯**：H1/H2 从默认大字号下调至 `text-2xl md:text-3xl lg:text-4xl`，正文 `text-sm md:text-base`。
5. **CTA 按钮**：移动端 full-width（`w-full sm:w-auto`），按钮组改为纵向堆叠。
6. **横向溢出**：给 `body`/`Layout` 加 `overflow-x-hidden`，并修复任何 `min-w-*` 或固定宽度元素。

## 首页（/）

- **HeroSection**：高度 `h-[360px] sm:h-[420px] md:h-[500px]`；标题 `text-xl sm:text-2xl md:text-4xl`；description 改为 `line-clamp-3`；左右箭头窄屏隐藏（用 dots + 滑动）；按钮组纵向堆叠并将日期换行。
- **DataStatsSection / PositioningSection**：`grid-cols-2 md:grid-cols-4` 替换可能的 4 列直排。
- **NewsSection / InsightsSection / EventsSection / DataMerchantsSection**：卡片网格统一 `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`；标签栏（Tabs）允许横向滚动 `overflow-x-auto`；图片改 `aspect-video` 自适应。
- **OpenClawPromoSection**：左右两栏在 `< md` 改纵向堆叠，图在上文字在下。

## Token Hub（/token-hub）

- **TokenHubHero**：标题缩级、CTA 堆叠。
- **Stats 三连卡**（已是 `grid-cols-3`）：保留 3 列但 `p-3` + `text-lg` 缩字号，避免溢出。
- **筛选区**：`grid md:grid-cols-4` 在 `< md` 改 `grid-cols-1`，搜索框单独一行，两个 Select 横向 2 列。
- **DatasetCard 网格**：已是 `sm:grid-cols-2 lg:grid-cols-3`，确认 card 内长字段（token 数、价格）允许换行。
- **UnifiedAccessLayerSection**：4 张能力卡 `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`；左右对比模块在 `< md` 改纵向堆叠（"传统 vs Token Hub" 上下排）；CTA 按钮堆叠。
- **ModelGatewaySection / BidirectionalFlowSection / SMEValueSection / HongKongAdvantageSection / BusinessModelSection**：所有 `grid-cols-N` 加 `grid-cols-1 sm:grid-cols-2` 兜底；箭头/连接线类装饰元素在 `< md` 隐藏。
- **ModelAccessForm**：表单字段改单列；按钮 full-width。
- **Pagination**：在窄屏只显示当前页 ± 1 + Prev/Next，避免页码溢出。

## 越南专区（/vietnam）

- Hero/标题字号阶梯化。
- 四法解读 Tabs：`overflow-x-auto` + 防换行。
- 数据产品卡片网格：`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`。
- 合规预约表单：单列、字段全宽、按钮 full-width。
- 任何左右双栏（如对比、CTA）改 `flex-col md:flex-row`。

## 不在此次范围

- /products、/news、/data-merchants、/openclaw、/admin、/profile 等其他页面（用户选"仅核心 3 个页面"）
- 业务逻辑、API、数据库

## 技术细节

- 全部通过 Tailwind 响应式前缀（`sm: md: lg:`）完成，不引入新依赖。
- 不修改 `index.css` 设计 token，仅可能新增一两个 utility（如 `.container` padding 微调）。
- 每个 section 单独 PR-style 编辑，便于回滚。
- 验证：用 `preview_ui--set_preview_device_viewport` 切到 mobile（375×812）和 tablet 逐页过一遍，并用 `browser--screenshot` 快照确认无溢出、无重叠。

## 交付顺序

1. 通用基础（MarketTicker / Header / 容器 / 字号 utility）
2. 首页所有 section
3. Token Hub 所有 section
4. 越南专区
5. 移动视口截图复核
