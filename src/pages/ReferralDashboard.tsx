import React, { useState, useMemo } from 'react';
import { useReferralData } from '../hooks/useReferralData';
import { ReferralCard } from '../components/ReferralTracking/ReferralCard';
import { ReferralFilters } from '../components/ReferralTracking/ReferralFilters';
import { NewReferralModal } from '../components/ReferralTracking/NewReferralModal';
import { AnalyticsDashboard } from '../components/Analytics/AnalyticsDashboard';
import { Loading } from '../components/common/Loading';
import { Plus } from 'lucide-react';

export const ReferralDashboard: React.FC = () => {
  const [showNewReferralModal, setShowNewReferralModal] = useState(false);
  const { referrals, analytics, loading, refetch } = useReferralData();
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredAndSortedReferrals = useMemo(() => {
    let filtered = [...(referrals || [])];
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(ref => 
        ref.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'name':
          return a.candidate_name.localeCompare(b.candidate_name);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtered;
  }, [referrals, statusFilter, sortBy]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Referral Dashboard</h1>
        <button 
          onClick={() => setShowNewReferralModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          New Referral
        </button>
      </div>

      {analytics && (
        <div className="mb-8">
          <AnalyticsDashboard 
            data={analytics}
            historicalData={analytics.historical_data}
          />
        </div>
      )}

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Referrals</h2>
          <ReferralFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedReferrals.map((referral) => (
            <ReferralCard key={referral.id} referral={referral} />
          ))}
        </div>
      </div>

      {showNewReferralModal && (
        <NewReferralModal
          onClose={() => setShowNewReferralModal(false)}
          onSuccess={() => {
            refetch();
          }}
        />
      )}
    </div>
  );
}; 