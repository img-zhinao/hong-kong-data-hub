-- Enable RLS on admin_profiles table
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for admin profiles - only allow authenticated users to read their own profile
CREATE POLICY "Users can view their own admin profile" 
ON public.admin_profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Allow authenticated users to update their own profile
CREATE POLICY "Users can update their own admin profile" 
ON public.admin_profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id);