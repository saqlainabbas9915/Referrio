-- Create referrals table if not exists
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_name TEXT NOT NULL,
  position TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert test data
INSERT INTO referrals (candidate_name, position, status, created_at)
VALUES 
  ('John Doe', 'Senior Software Engineer', 'pending', NOW() - INTERVAL '2 days'),
  ('Jane Smith', 'Product Manager', 'accepted', NOW() - INTERVAL '5 days'),
  ('Mike Johnson', 'UX Designer', 'rejected', NOW() - INTERVAL '1 day'),
  ('Sarah Williams', 'Frontend Developer', 'pending', NOW() - INTERVAL '3 days'),
  ('Alex Brown', 'DevOps Engineer', 'accepted', NOW() - INTERVAL '7 days');

-- Insert test referrals
INSERT INTO public.referrals 
    (candidate_name, position, status, email, notes, phone, linkedin_url, expected_salary, years_of_experience)
VALUES
    ('John Doe', 'Senior Software Engineer', 'pending', 'john@example.com', 'Strong backend experience', '+1234567890', 'https://linkedin.com/in/johndoe', '120,000', 5),
    ('Jane Smith', 'Product Manager', 'accepted', 'jane@example.com', 'Great product sense', '+1234567891', 'https://linkedin.com/in/janesmith', '140,000', 7),
    ('Mike Johnson', 'UX Designer', 'pending', 'mike@example.com', 'Portfolio looks promising', '+1234567892', 'https://linkedin.com/in/mikej', '95,000', 3),
    ('Sarah Williams', 'Frontend Developer', 'pending', 'sarah@example.com', 'React expert', '+1234567893', 'https://linkedin.com/in/sarahw', '110,000', 4),
    ('Alex Brown', 'DevOps Engineer', 'rejected', 'alex@example.com', 'Good with AWS', '+1234567894', 'https://linkedin.com/in/alexb', '130,000', 6);

-- Create analytics view for easier querying
CREATE OR REPLACE VIEW referral_analytics AS
SELECT
  COUNT(*) as total_referrals,
  COUNT(CASE WHEN status = 'accepted' THEN 1 END) as successful_referrals,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_referrals,
  json_agg(json_build_object(
    'date', DATE_TRUNC('day', created_at)::DATE,
    'count', 1
  ) ORDER BY created_at) as historical_data
FROM referrals; 