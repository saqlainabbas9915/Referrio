-- Drop existing table if exists
DROP TABLE IF EXISTS public.referrals;

-- Create the initial referrals table
CREATE TABLE public.referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    candidate_name TEXT NOT NULL,
    position TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    email TEXT,
    notes TEXT,
    phone TEXT,
    linkedin_url TEXT,
    expected_salary TEXT,
    years_of_experience NUMERIC(4,1),
    resume_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('referrals', 'referrals', false)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Allow authenticated uploads" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
    bucket_id = 'referrals' 
    AND (storage.foldername(name))[1] = 'resumes'
);

CREATE POLICY "Allow authenticated reads" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (bucket_id = 'referrals'); 