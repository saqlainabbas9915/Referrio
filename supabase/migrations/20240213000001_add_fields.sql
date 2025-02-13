-- Add new columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'referrals' AND column_name = 'email') THEN
        ALTER TABLE referrals ADD COLUMN email TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'referrals' AND column_name = 'phone') THEN
        ALTER TABLE referrals ADD COLUMN phone TEXT;
    END IF;
    
    -- Add other columns similarly
END $$; 