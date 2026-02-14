
-- Fix: Restrict profiles SELECT to own profile only (prevents email harvesting)
DROP POLICY "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);
