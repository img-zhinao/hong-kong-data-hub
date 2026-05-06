-- Vietnam consultation bookings
CREATE TABLE public.vietnam_consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  topic TEXT NOT NULL,
  preferred_language TEXT NOT NULL DEFAULT 'zh',
  preferred_date DATE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.vietnam_consultations ENABLE ROW LEVEL SECURITY;

-- Anyone (incl. anonymous) can submit a booking
CREATE POLICY "Anyone can create consultation"
ON public.vietnam_consultations
FOR INSERT
WITH CHECK (true);

-- Users can view their own bookings (matched by auth.uid)
CREATE POLICY "Users can view own consultations"
ON public.vietnam_consultations
FOR SELECT
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Admins can view/manage all
CREATE POLICY "Admins can view all consultations"
ON public.vietnam_consultations
FOR SELECT
USING (public.is_admin());

CREATE POLICY "Admins can update consultations"
ON public.vietnam_consultations
FOR UPDATE
USING (public.is_admin());

CREATE POLICY "Admins can delete consultations"
ON public.vietnam_consultations
FOR DELETE
USING (public.is_admin());

CREATE TRIGGER update_vietnam_consultations_updated_at
BEFORE UPDATE ON public.vietnam_consultations
FOR EACH ROW
EXECUTE FUNCTION public.update_profiles_updated_at();

CREATE INDEX idx_vietnam_consultations_user ON public.vietnam_consultations(user_id);
CREATE INDEX idx_vietnam_consultations_status ON public.vietnam_consultations(status);