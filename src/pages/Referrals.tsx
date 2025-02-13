import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { ReferralCard } from '../components/ReferralTracking/ReferralCard';
import { Loading } from '../components/common/Loading';
import { Plus } from 'lucide-react';
import { NewReferralModal } from '../components/ReferralTracking/NewReferralModal';

interface Referral {
  id: string;
  candidate_name: string;
  position: string;
  status: string;
  created_at: string;
  email?: string;
  notes?: string;
  phone?: string;
  linkedin_url?: string;
  expected_salary?: string;
  years_of_experience?: number;
  resume_url?: string;
}

export function Referrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewReferralModal, setShowNewReferralModal] = useState(false);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReferrals(data || []);
    } catch (err) {
      console.error('Error fetching referrals:', err);
      setError('Failed to load referrals');
    } finally {
      setLoading(false);
    }
  };

  const handleNewReferralSuccess = () => {
    fetchReferrals(); // Refresh the list after adding new referral
    setShowNewReferralModal(false);
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Referrals</h1>
        <div className="flex items-center gap-4">
          <select 
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => {
              // Add filter functionality here
            }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <button
            onClick={() => setShowNewReferralModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Referral
          </button>
        </div>
      </div>

      {referrals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No referrals found</p>
          <button
            onClick={() => setShowNewReferralModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Your First Referral
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {referrals.map((referral) => (
            <ReferralCard 
              key={referral.id} 
              referral={referral}
            />
          ))}
        </div>
      )}

      {showNewReferralModal && (
        <NewReferralModal
          onClose={() => setShowNewReferralModal(false)}
          onSuccess={handleNewReferralSuccess}
        />
      )}
    </div>
  );
} 