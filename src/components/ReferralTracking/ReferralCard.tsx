import React, { useState } from 'react';
import { Calendar, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { ReferralDetails } from './ReferralDetails';

interface ReferralCardProps {
  referral: {
    id: string;
    candidate_name: string;
    position: string;
    status: string;
    created_at: string;
    phone?: string;
    linkedin_url?: string;
    expected_salary?: string;
    years_of_experience?: number;
    resume_url?: string;
  };
}

export const ReferralCard: React.FC<ReferralCardProps> = ({ referral }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {referral.candidate_name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <Briefcase size={16} className="mr-2" />
              <span>{referral.position}</span>
            </div>
          </div>
          <span 
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(referral.status)}`}
          >
            {referral.status}
          </span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Calendar size={16} className="mr-2" />
          <span>{format(new Date(referral.created_at), 'MMM dd, yyyy')}</span>
        </div>

        <button 
          onClick={() => setShowDetails(true)} 
          className="w-full text-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-2 rounded-md transition-colors"
        >
          View Details
        </button>
      </div>

      {showDetails && (
        <ReferralDetails
          referral={referral}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}; 