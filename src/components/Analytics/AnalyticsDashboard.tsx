import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

interface AnalyticsDashboardProps {
  data: {
    total_referrals: number;
    successful_referrals: number;
    pending_referrals: number;
  };
  historicalData: {
    date: string;
    count: number;
  }[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data, historicalData }) => {
  const formatDate = (dateStr: string) => {
    return format(parseISO(dateStr), 'MMM d');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Referrals"
          value={data.total_referrals}
          description="All time referrals"
        />
        <StatCard
          title="Successful Referrals"
          value={data.successful_referrals}
          description="Candidates hired"
          className="text-green-600"
        />
        <StatCard
          title="Pending Referrals"
          value={data.pending_referrals}
          description="Awaiting response"
          className="text-yellow-600"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Referral Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                interval={6}
              />
              <YAxis allowDecimals={false} />
              <Tooltip 
                labelFormatter={formatDate}
                formatter={(value: number) => [`${value} referrals`, 'Count']}
              />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, className = "text-blue-600" }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className={`text-3xl font-bold ${className}`}>{value}</p>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
); 