-- Create a security definer function to check if user is admin/editor
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'editor')
  );
END;
$$;

-- Drop existing permissive INSERT policy
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.articles;

-- Drop existing permissive UPDATE policy  
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.articles;

-- Create admin-only INSERT policy
CREATE POLICY "Admin only insert" ON public.articles
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Create admin-only UPDATE policy
CREATE POLICY "Admin only update" ON public.articles
FOR UPDATE
TO authenticated
USING (public.is_admin());