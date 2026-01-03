-- Add admin write policies for insights table
CREATE POLICY "Admin only insert" ON public.insights
FOR INSERT TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin only update" ON public.insights
FOR UPDATE TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin only delete" ON public.insights
FOR DELETE TO authenticated
USING (public.is_admin());

-- Add admin write policies for events table
CREATE POLICY "Admin only insert" ON public.events
FOR INSERT TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin only update" ON public.events
FOR UPDATE TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin only delete" ON public.events
FOR DELETE TO authenticated
USING (public.is_admin());

-- Add admin write policies for data_merchants table
CREATE POLICY "Admin only insert" ON public.data_merchants
FOR INSERT TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin only update" ON public.data_merchants
FOR UPDATE TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin only delete" ON public.data_merchants
FOR DELETE TO authenticated
USING (public.is_admin());

-- Add admin write policies for platform_stats table
CREATE POLICY "Admin only insert" ON public.platform_stats
FOR INSERT TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin only update" ON public.platform_stats
FOR UPDATE TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin only delete" ON public.platform_stats
FOR DELETE TO authenticated
USING (public.is_admin());