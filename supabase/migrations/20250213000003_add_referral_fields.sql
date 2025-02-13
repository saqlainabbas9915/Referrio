-- Add new columns to referrals table
ALTER TABLE referrals
ADD COLUMN phone TEXT,
ADD COLUMN linkedin_url TEXT,
ADD COLUMN expected_salary TEXT,
ADD COLUMN years_of_experience NUMERIC(4,1),
ADD COLUMN resume_url TEXT;

-- Create a storage bucket for resumes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('referrals', 'referrals', false);

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'referrals' 
  AND (storage.foldername(name))[1] = 'resumes'
);

-- Allow authenticated users to read their own uploads
CREATE POLICY "Allow authenticated reads" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (bucket_id = 'referrals'); 