import type { FC } from 'react';
import { Job } from '../types';
import { MapPin, Building, Calendar } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
          <div className="flex items-center mt-2 text-gray-600">
            <Building className="h-4 w-4 mr-2" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center mt-1 text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center mt-1 text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(job.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <button
          onClick={() => onApply(job.id)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Request Referral
        </button>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-600 line-clamp-3">{job.description}</p>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {job.requirements.slice(0, 3).map((req, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
          >
            {req}
          </span>
        ))}
        {job.requirements.length > 3 && (
          <span className="text-gray-500 text-sm">
            +{job.requirements.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}