-- 1) token_datasets
CREATE TABLE public.token_datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  industry text NOT NULL,
  modality text NOT NULL,
  total_tokens bigint DEFAULT 0,
  price_per_1k_tokens numeric DEFAULT 0,
  package_options jsonb DEFAULT '[]'::jsonb,
  quality_score numeric DEFAULT 0,
  sample_url text,
  license text,
  tags text[] DEFAULT '{}',
  provider_name text,
  provider_id uuid,
  status text DEFAULT 'published',
  view_count integer DEFAULT 0,
  cover_image_url text,
  created_at timestamptz DEFAULT (now() AT TIME ZONE 'Asia/Hong_Kong'),
  updated_at timestamptz DEFAULT (now() AT TIME ZONE 'Asia/Hong_Kong')
);

ALTER TABLE public.token_datasets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published datasets"
ON public.token_datasets FOR SELECT
USING (status = 'published');

CREATE POLICY "Admin can insert datasets"
ON public.token_datasets FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admin can update datasets"
ON public.token_datasets FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin can delete datasets"
ON public.token_datasets FOR DELETE
TO authenticated
USING (is_admin());

CREATE INDEX idx_token_datasets_industry ON public.token_datasets(industry);
CREATE INDEX idx_token_datasets_modality ON public.token_datasets(modality);
CREATE INDEX idx_token_datasets_status ON public.token_datasets(status);

-- 2) token_orders
CREATE TABLE public.token_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  dataset_id uuid NOT NULL REFERENCES public.token_datasets(id) ON DELETE CASCADE,
  tokens_purchased bigint NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'HKD',
  status text DEFAULT 'pending',
  payment_provider text,
  payment_ref text,
  created_at timestamptz DEFAULT (now() AT TIME ZONE 'Asia/Hong_Kong'),
  paid_at timestamptz
);

ALTER TABLE public.token_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
ON public.token_orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
ON public.token_orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all orders"
ON public.token_orders FOR SELECT
TO authenticated
USING (is_admin());

CREATE INDEX idx_token_orders_user ON public.token_orders(user_id);
CREATE INDEX idx_token_orders_dataset ON public.token_orders(dataset_id);

-- 3) token_balances
CREATE TABLE public.token_balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  dataset_id uuid NOT NULL REFERENCES public.token_datasets(id) ON DELETE CASCADE,
  tokens_remaining bigint NOT NULL DEFAULT 0,
  api_key text UNIQUE,
  created_at timestamptz DEFAULT (now() AT TIME ZONE 'Asia/Hong_Kong'),
  updated_at timestamptz DEFAULT (now() AT TIME ZONE 'Asia/Hong_Kong')
);

ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own balances"
ON public.token_balances FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX idx_token_balances_user ON public.token_balances(user_id);
CREATE UNIQUE INDEX idx_token_balances_user_dataset ON public.token_balances(user_id, dataset_id);