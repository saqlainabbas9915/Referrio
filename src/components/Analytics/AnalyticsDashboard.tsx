import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AnalyticsProps {
  data: {
    total_referrals: number;
    successful_referrals: number;
    total_bonus_paid: number;
    success_rate: number;
    avg_time_to_hire: number;
  };
  historicalData: Array<{
    date: string;
    referrals: number;
    hires: number;
  }>;
}

export const AnalyticsDashboard: React.FC<AnalyticsProps> = ({ data, historicalData }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Referral Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm text-gray-600">Total Referrals</h3>
          <p className="text-2xl font-bold text-blue-600">{data.total_referrals}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-sm text-gray-600">Success Rate</h3>
          <p className="text-2xl font-bold text-green-600">
            {(data.success_rate * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm text-gray-600">Total Bonus Paid</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${data.total_bonus_paid.toLocaleString()}
          </p>
        </div>
        
        <div className="p-4 bg-orange-50 rounded-lg">
          <h3 className="text-sm text-gray-600">Avg Time to Hire</h3>
          <p className="text-2xl font-bold text-orange-600">
            {data.avg_time_to_hire} days
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Referral Trends</h3>
        <div className="h-[300px]">
          <LineChart width={800} height={300} data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="referrals" stroke="#2563eb" />
            <Line type="monotone" dataKey="hires" stroke="#16a34a" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}; 