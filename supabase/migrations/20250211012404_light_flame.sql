/*
  # Add automatic profile creation

  1. New Function
    - Creates a trigger function to automatically create profiles for new users
    - Ensures profile exists before referrals can be created
  
  2. Security
    - Function executes with security definer permissions
    - Maintains existing RLS policies
*/

-- Create a function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, created_at, updated_at)
  VALUES (new.id, now(), now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call this function after a new user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure profile exists for any existing auth users
INSERT INTO public.profiles (id, created_at, updated_at)
SELECT id, created_at, created_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;