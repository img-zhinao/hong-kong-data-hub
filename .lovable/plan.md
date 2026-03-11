

## 将 OpenClaw Agent 数据接入 Supabase

### 1) 创建数据库表

创建 `openclaw_agents` 表，将当前 mock 数据的所有字段映射为列：

```sql
CREATE TABLE public.openclaw_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_code text UNIQUE NOT NULL,          -- 'OC-001'
  name text NOT NULL,
  status text NOT NULL DEFAULT 'available', -- available/sold/presale
  hardware text NOT NULL,
  employees text[] NOT NULL DEFAULT '{}',
  run_days integer NOT NULL DEFAULT 0,
  total_revenue numeric NOT NULL DEFAULT 0,
  price numeric NOT NULL DEFAULT 0,
  monthly_revenue numeric NOT NULL DEFAULT 0,
  annual_return numeric NOT NULL DEFAULT 0,
  revenue_history jsonb NOT NULL DEFAULT '[]',
  -- Agent metrics
  tcr numeric NOT NULL DEFAULT 0,
  memory_entries integer NOT NULL DEFAULT 0,
  memory_compression numeric NOT NULL DEFAULT 0,
  geo_score numeric NOT NULL DEFAULT 0,
  -- Compliance
  apple_id_unbound boolean NOT NULL DEFAULT false,
  pii_sanitized boolean NOT NULL DEFAULT false,
  soul_md_uploaded boolean NOT NULL DEFAULT false,
  identity_md_uploaded boolean NOT NULL DEFAULT false,
  -- Hardware spec
  hw_model text NOT NULL DEFAULT 'Mac Mini M4',
  hw_ram integer NOT NULL DEFAULT 16,
  hw_storage integer NOT NULL DEFAULT 256,
  hw_quantity integer NOT NULL DEFAULT 1,
  hw_coefficient numeric NOT NULL DEFAULT 1.0,
  -- Descriptions
  soul_description text,
  identity_description text,
  -- Timestamps
  created_at timestamptz DEFAULT (now() AT TIME ZONE 'Asia/Hong_Kong'),
  updated_at timestamptz DEFAULT (now() AT TIME ZONE 'Asia/Hong_Kong')
);

ALTER TABLE public.openclaw_agents ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Enable read access for all users"
  ON public.openclaw_agents FOR SELECT TO public USING (true);

-- Admin write
CREATE POLICY "Admin only insert" ON public.openclaw_agents
  FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin only update" ON public.openclaw_agents
  FOR UPDATE TO authenticated USING (is_admin());
CREATE POLICY "Admin only delete" ON public.openclaw_agents
  FOR DELETE TO authenticated USING (is_admin());
```

### 2) 插入现有 mock 数据

将 6 条 mock agent 数据 INSERT 到新表中。

### 3) 创建 React Query hook

新建 `src/hooks/useOpenClawAgents.ts`：
- 从 `openclaw_agents` 表 SELECT 全部数据
- 将 snake_case 列映射回 `OpenClawAgent` 接口（camelCase）
- 导出 `useOpenClawAgents()` hook

### 4) 更新组件引用

- **`TalentMarket.tsx`** — 替换 `mockAgents` 为 `useOpenClawAgents()` hook，增加 loading/error 状态
- **`OpenClawStats.tsx`** — 从数据库数据计算实际统计数字（挂牌数、交易额、平均收益率、运行中军团数）
- **`openClawData.ts`** — 保留类型定义和 `calculateBasePrice` 函数，移除 mock 数据导出

### 5) 育种者仪表盘写入

- **`BreederDashboard.tsx`** — 表单提交时 INSERT 到 `openclaw_agents` 表（需登录），成功后刷新缓存

### 涉及文件

| 文件 | 操作 |
|------|------|
| Supabase migration | 新建表 + RLS + 插入种子数据 |
| `src/hooks/useOpenClawAgents.ts` | 新建 |
| `src/components/openclaw/TalentMarket.tsx` | 修改 |
| `src/components/openclaw/OpenClawStats.tsx` | 修改 |
| `src/components/openclaw/BreederDashboard.tsx` | 修改 |
| `src/components/openclaw/openClawData.ts` | 修改（保留类型，删除 mock） |

