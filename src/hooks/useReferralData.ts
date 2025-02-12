import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useReferralData = (userId: string) => {
  const [referrals, setReferrals] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch referrals
        const { data: referralsData, error: referralsError } = await supabase
          .from('referrals')
          .select(`
            *,
            candidate:candidate_id(name),
            job:job_id(title)
          `)
          .eq('referrer_id', userId)
          .order('application_date', { ascending: false });

        if (referralsError) throw referralsError;

        // Fetch analytics
        const { data: analyticsData, error: analyticsError } = await supabase
          .from('referral_analytics')
          .select('*')
          .single();

        if (analyticsError) throw analyticsError;

        setReferrals(referralsData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching referral data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { referrals, analytics, loading };
}; 