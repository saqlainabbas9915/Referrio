/*
  # Initial Schema Setup for Referrio Platform

  1. New Tables
    - `profiles`
      - Extends auth.users with additional profile information
      - Stores user details like name, title, company
    - `jobs`
      - Stores job listings
      - Contains job details, requirements, and posting information
    - `referrals`
      - Manages referral relationships between jobs and users
      - Tracks referral status and related information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure data privacy and access control
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text,
  title text,
  company text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  description text NOT NULL,
  requirements text[] NOT NULL DEFAULT '{}',
  location text NOT NULL,
  type text NOT NULL,
  user_id uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  referrer_id uuid REFERENCES profiles(id),
  candidate_id uuid REFERENCES profiles(id),
  status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Jobs policies
CREATE POLICY "Anyone can view jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Job creators can update their jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Referrals policies
CREATE POLICY "Users can view their referrals"
  ON referrals FOR SELECT
  TO authenticated
  USING (
    auth.uid() = referrer_id OR 
    auth.uid() = candidate_id
  );

CREATE POLICY "Users can create referrals"
  ON referrals FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = referrer_id OR 
    auth.uid() = candidate_id
  );

CREATE POLICY "Users can update their referrals"
  ON referrals FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = referrer_id OR 
    auth.uid() = candidate_id
  );