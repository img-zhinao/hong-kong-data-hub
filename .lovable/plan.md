# 首页轮播图：Token 流转市场上线

## 目标
将首页 `HeroSection` 第一张轮播图（当前为「香港数据要素市场化配置改革全面启动」）替换为 Token Hub / Token 流转市场正式上线的宣传位，引流到 `/token-hub`。

## 改动范围
仅修改一个文件：`src/components/home/HeroSection.tsx`

替换 `heroSlides` 数组中 `id: 1` 的那一项：

- **tag**：`重磅上线`
- **title**：`Token 流转市场正式上线 · 数据出海 × 大模型入境`
- **description**：`香港大数据交易所 Token Hub 依托香港国际数据自由港优势，为中小企业打通双向 Token 流转通道：内地数据资产合规出海，OpenAI / Claude / Gemini 等国际领先大模型经港合规入境，统一 OpenAI 兼容 API、多币种结算。`
- **date**：`2026-04-28`（今日）
- **link**：`/token-hub`
- **image**：选用一张能体现「跨境流转 / 网络节点 / 香港夜景」氛围的 Unsplash 图片，例如 `https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop`（电路板/网络节点，呼应 Token 流转主题）

其余两张 slide（首批数商入驻、OpenClaw 挂牌）保持不变，Token 流转市场作为首屏第一张优先展示。

## 不需要改动
- 路由（`/token-hub` 已存在）
- 轮播组件逻辑、样式、自动播放、左右箭头与 dots 全部沿用现状
- SEO、其他首页 section 不动
