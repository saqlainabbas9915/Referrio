import React from 'react';
import { X, Calendar, Briefcase, User, Clock, Phone, Mail, DollarSign, Linkedin, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabaseClient';

interface ReferralDetailsProps {
  referral: {
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
  };
  onClose: () => void;
}

export const ReferralDetails: React.FC<ReferralDetailsProps> = ({ referral, onClose }) => {
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

  const getResumeUrl = (path: string) => {
    const { data } = supabase.storage.from('referrals').getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Referral Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{referral.candidate_name}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <Briefcase size={16} className="mr-2" />
                  <span>{referral.position}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(referral.status)}`}>
                {referral.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>Submitted: {format(new Date(referral.created_at), 'MMM dd, yyyy')}</span>
                </div>

                {referral.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span>{referral.phone}</span>
                  </div>
                )}

                {referral.email && (
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <span>{referral.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {referral.years_of_experience && (
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>{referral.years_of_experience} years experience</span>
                  </div>
                )}

                {referral.expected_salary && (
                  <div className="flex items-center text-gray-600">
                    <DollarSign size={16} className="mr-2" />
                    <span>Expected: {referral.expected_salary}</span>
                  </div>
                )}

                {referral.linkedin_url && (
                  <a
                    href={referral.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Linkedin size={16} className="mr-2" />
                    <span>LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </div>

            {referral.resume_url && (
              <div className="mt-4">
                <a
                  href={getResumeUrl(referral.resume_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  <FileText size={16} className="mr-2" />
                  <span>View Resume</span>
                </a>
              </div>
            )}

            {referral.notes && (
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Notes</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{referral.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 