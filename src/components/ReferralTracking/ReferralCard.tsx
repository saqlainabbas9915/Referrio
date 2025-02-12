import React from 'react';
import { formatDistance } from 'date-fns';

interface ReferralCardProps {
  referral: {
    candidate_name: string;
    job_title: string;
    status: string;
    application_date: string;
    referral_bonus: number;
    last_status_update: string;
  };
}

export const ReferralCard: React.FC<ReferralCardProps> = ({ referral }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    reviewed: 'bg-blue-100 text-blue-800',
    interviewed: 'bg-purple-100 text-purple-800',
    hired: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{referral.candidate_name}</h3>
          <p className="text-gray-600">{referral.job_title}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[referral.status]}`}>
          {referral.status}
        </span>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>Applied: {formatDistance(new Date(referral.application_date), new Date(), { addSuffix: true })}</p>
        <p>Last update: {formatDistance(new Date(referral.last_status_update), new Date(), { addSuffix: true })}</p>
      </div>
      {referral.referral_bonus > 0 && (
        <div className="mt-2 text-green-600 font-medium">
          Potential bonus: ${referral.referral_bonus}
        </div>
      )}
    </div>
  );
}; 