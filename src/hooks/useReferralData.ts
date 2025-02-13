import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { format, subDays } from 'date-fns';

interface Referral {
  id: string;
  candidate_name: string;
  position: string;
  status: string;
  created_at: string;
}

interface Analytics {
  total_referrals: number;
  successful_referrals: number;
  pending_referrals: number;
  historical_data: {
    date: string;
    count: number;
  }[];
}

export const useReferralData = (userId?: string) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchReferrals = async () => {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReferrals(data || []);

      // Calculate analytics from referrals data
      if (data) {
        const total = data.length;
        const successful = data.filter(r => r.status === 'accepted').length;
        const pending = data.filter(r => r.status === 'pending').length;

        // Generate historical data for the last 30 days
        const historicalData = Array.from({ length: 30 }, (_, i) => {
          const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
          const count = data.filter(r => 
            format(new Date(r.created_at), 'yyyy-MM-dd') === date
          ).length;
          return { date, count };
        }).reverse();

        setAnalytics({
          total_referrals: total,
          successful_referrals: successful,
          pending_referrals: pending,
          historical_data: historicalData
        });
      }
    } catch (error) {
      console.error('Error fetching referrals:', error);
    }
  };

  const refetch = () => {
    setLoading(true);
    fetchReferrals().then(() => setLoading(false));
  };

  useEffect(() => {
    fetchReferrals().then(() => setLoading(false));
  }, [userId]);

  return { referrals, analytics, loading, refetch };
}; 