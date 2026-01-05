-- Insert profiles for existing users who don't have one
INSERT INTO public.profiles (id, email, full_name, company_name)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'full_name', ''), 
  COALESCE(raw_user_meta_data->>'company_name', '')
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;