import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, BriefcaseIcon, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <BriefcaseIcon className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Referrio</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/jobs')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Jobs
            </button>
            <button 
              onClick={() => navigate('/referrals')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Referrals
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="text-gray-600 hover:text-gray-900"
            >
              <UserCircle className="h-6 w-6" />
            </button>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}