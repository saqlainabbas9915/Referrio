import React from 'react';
import { useReferralData } from '../hooks/useReferralData';
import { ReferralCard } from '../components/ReferralTracking/ReferralCard';
import { AnalyticsDashboard } from '../components/Analytics/AnalyticsDashboard';
import { Loading } from '../components/common/Loading';

export const ReferralDashboard: React.FC = () => {
  const { referrals, analytics, loading } = useReferralData(/* userId */);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Referral Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          New Referral
        </button>
      </div>
      
      {analytics && (
        <AnalyticsDashboard 
          data={analytics}
          historicalData={analytics.historical_data}
        />
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Your Referrals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referrals.map((referral) => (
            <ReferralCard key={referral.id} referral={referral} />
          ))}
        </div>
      </div>
    </div>
  );
}; 