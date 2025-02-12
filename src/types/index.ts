export interface User {
  id: string;
  email: string;
  name: string;
  title?: string;
  company?: string;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  created_at: string;
  user_id: string;
}

export interface Referral {
  id: string;
  job_id: string;
  referrer_id: string;
  candidate_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  notes?: string;
  created_at: string;
}