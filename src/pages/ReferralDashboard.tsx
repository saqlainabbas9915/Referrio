import React, { useState, useEffect } from 'react';
import { Loading } from '../components/common/Loading';
import { supabase } from '../lib/supabaseClient';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReferralStats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  monthlyData: {
    month: string;
    count: number;
  }[];
}

export const ReferralDashboard: React.FC = () => {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all referrals to calculate stats
      const { data: referrals, error: referralsError } = await supabase
        .from('referrals')
        .select('*');

      if (referralsError) throw referralsError;

      // Calculate stats from referrals
      const total = referrals?.length || 0;
      const pending = referrals?.filter(r => r.status === 'pending').length || 0;
      const accepted = referrals?.filter(r => r.status === 'accepted').length || 0;
      const rejected = referrals?.filter(r => r.status === 'rejected').length || 0;

      // Calculate monthly data
      const monthlyData = referrals?.reduce((acc: any[], referral) => {
        const month = new Date(referral.created_at).toLocaleString('default', { month: 'long' });
        const existingMonth = acc.find(m => m.month === month);
        if (existingMonth) {
          existingMonth.count += 1;
        } else {
          acc.push({ month, count: 1 });
        }
        return acc;
      }, []) || [];

      setStats({
        total,
        pending,
        accepted,
        rejected,
        monthlyData
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Referrals</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.total || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats?.pending || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Accepted</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.accepted || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{stats?.rejected || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Referrals</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.monthlyData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Success Rate</h3>
          <div className="flex flex-col items-center justify-center h-80">
            <p className="text-6xl font-bold text-green-600">
              {stats ? Math.round((stats.accepted / stats.total) * 100) : 0}%
            </p>
            <p className="text-gray-500 mt-2">Acceptance Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 