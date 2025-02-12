-- Create enum for referral status
CREATE TYPE referral_status AS ENUM (
  'pending',
  'reviewed',
  'interviewed',
  'hired',
  'rejected'
);

-- Referrals table
CREATE TABLE referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES auth.users(id),
  candidate_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  status referral_status DEFAULT 'pending',
  referral_bonus DECIMAL(10,2),
  application_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_status_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analytics tracking table
CREATE TABLE referral_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  total_referrals INTEGER DEFAULT 0,
  successful_referrals INTEGER DEFAULT 0,
  total_bonus_paid DECIMAL(10,2) DEFAULT 0,
  avg_time_to_hire INTERVAL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create triggers to update analytics
CREATE OR REPLACE FUNCTION update_referral_analytics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update analytics when referral status changes
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.status != NEW.status) THEN
    UPDATE referral_analytics
    SET 
      total_referrals = CASE WHEN TG_OP = 'INSERT' THEN total_referrals + 1 ELSE total_referrals END,
      successful_referrals = (
        SELECT COUNT(*) FROM referrals 
        WHERE status = 'hired' 
        AND company_id = NEW.company_id
      ),
      updated_at = CURRENT_TIMESTAMP
    WHERE company_id = NEW.company_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER referral_analytics_trigger
AFTER INSERT OR UPDATE ON referrals
FOR EACH ROW
EXECUTE FUNCTION update_referral_analytics(); 