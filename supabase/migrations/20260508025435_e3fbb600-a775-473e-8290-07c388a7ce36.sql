-- 1) data_merchants.contact_email: revoke column-level access from public roles
REVOKE SELECT (contact_email) ON public.data_merchants FROM anon, authenticated;

-- 2) openclaw_agents: admin-only inserts
DROP POLICY IF EXISTS "Authenticated users can insert" ON public.openclaw_agents;
CREATE POLICY "Admin only insert" ON public.openclaw_agents
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

-- 3) vietnam_consultations: prevent spoofing user_id on anonymous insert
DROP POLICY IF EXISTS "Anyone can create consultation" ON public.vietnam_consultations;
CREATE POLICY "Anyone can create consultation" ON public.vietnam_consultations
  FOR INSERT
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

-- 4) storage.objects cms_images: admin-only writes
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Admin only cms_images insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms_images' AND public.is_admin());
CREATE POLICY "Admin only cms_images update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'cms_images' AND public.is_admin());
CREATE POLICY "Admin only cms_images delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'cms_images' AND public.is_admin());