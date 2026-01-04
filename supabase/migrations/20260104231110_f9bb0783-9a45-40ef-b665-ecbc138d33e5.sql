-- Create a function to automatically make the first registered user an admin
CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO admin_count FROM admin_profiles;
  
  IF admin_count = 0 THEN
    INSERT INTO admin_profiles (id, role, full_name)
    VALUES (NEW.id, 'admin', COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to execute the function when a new user is created
CREATE TRIGGER on_auth_user_created_first_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_first_user_admin();

-- Also create an RPC function for existing admins to create new admin users
CREATE OR REPLACE FUNCTION public.create_admin_profile(
  user_id UUID,
  new_role TEXT,
  full_name TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Unauthorized: Only admins can create admin profiles';
  END IF;
  
  IF new_role NOT IN ('admin', 'editor') THEN
    RAISE EXCEPTION 'Invalid role: must be admin or editor';
  END IF;
  
  INSERT INTO admin_profiles (id, role, full_name)
  VALUES (user_id, new_role, full_name)
  ON CONFLICT (id) DO UPDATE
  SET role = EXCLUDED.role, full_name = EXCLUDED.full_name, updated_at = (now() AT TIME ZONE 'Asia/Hong_Kong');
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_admin_profile(UUID, TEXT, TEXT) TO authenticated;