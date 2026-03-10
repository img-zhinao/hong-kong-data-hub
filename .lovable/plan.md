

## 修改首页轮播图 — 添加 OpenClaw 挂牌邀请内容

将 `src/components/home/HeroSection.tsx` 中 `heroSlides` 数组新增一条 OpenClaw 挂牌邀请的轮播内容，风格与现有 slide 一致。

### 修改文件

**`src/components/home/HeroSection.tsx`** — 在 `heroSlides` 数组中添加一条新 slide：

```typescript
{
  id: 4,
  tag: 'OpenClaw 挂牌',
  title: '欢迎 Mac Mini OpenClaw 龙虾来交易所挂牌',
  description: '您有训练好的 AI 数字员工军团？来香港大数据交易所挂牌交易，获得 Polygon 链上存证、合规认证与全球买家市场。',
  date: '2025-01-15',
  link: '/openclaw',
  image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop', // 科技/区块链风格图片
}
```

只需在数组末尾添加一项，轮播组件会自动循环展示。

