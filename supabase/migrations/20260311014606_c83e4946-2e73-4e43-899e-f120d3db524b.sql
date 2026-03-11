CREATE TABLE public.openclaw_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_code text UNIQUE NOT NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'available',
  hardware text NOT NULL,
  employees text[] NOT NULL DEFAULT '{}',
  run_days integer NOT NULL DEFAULT 0,
  total_revenue numeric NOT NULL DEFAULT 0,
  price numeric NOT NULL DEFAULT 0,
  monthly_revenue numeric NOT NULL DEFAULT 0,
  annual_return numeric NOT NULL DEFAULT 0,
  revenue_history jsonb NOT NULL DEFAULT '[]',
  tcr numeric NOT NULL DEFAULT 0,
  memory_entries integer NOT NULL DEFAULT 0,
  memory_compression numeric NOT NULL DEFAULT 0,
  geo_score numeric NOT NULL DEFAULT 0,
  apple_id_unbound boolean NOT NULL DEFAULT false,
  pii_sanitized boolean NOT NULL DEFAULT false,
  soul_md_uploaded boolean NOT NULL DEFAULT false,
  identity_md_uploaded boolean NOT NULL DEFAULT false,
  hw_model text NOT NULL DEFAULT 'Mac Mini M4',
  hw_ram integer NOT NULL DEFAULT 16,
  hw_storage integer NOT NULL DEFAULT 256,
  hw_quantity integer NOT NULL DEFAULT 1,
  hw_coefficient numeric NOT NULL DEFAULT 1.0,
  soul_description text,
  identity_description text,
  created_at timestamptz DEFAULT (now() AT TIME ZONE 'Asia/Hong_Kong'),
  updated_at timestamptz DEFAULT (now() AT TIME ZONE 'Asia/Hong_Kong')
);

ALTER TABLE public.openclaw_agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
  ON public.openclaw_agents FOR SELECT TO public USING (true);

CREATE POLICY "Admin only insert" ON public.openclaw_agents
  FOR INSERT TO authenticated WITH CHECK (is_admin());

CREATE POLICY "Admin only update" ON public.openclaw_agents
  FOR UPDATE TO authenticated USING (is_admin());

CREATE POLICY "Admin only delete" ON public.openclaw_agents
  FOR DELETE TO authenticated USING (is_admin());