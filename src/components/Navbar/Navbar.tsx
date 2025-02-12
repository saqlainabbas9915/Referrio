import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, BarChart2, Settings } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Referrio</span>
            </Link>
          </div>

          <div className="flex space-x-4">
            <NavLink to="/" icon={<Home size={20} />} text="Home" />
            <NavLink to="/dashboard" icon={<BarChart2 size={20} />} text="Dashboard" />
            <NavLink to="/referrals" icon={<Users size={20} />} text="Referrals" />
            <NavLink to="/settings" icon={<Settings size={20} />} text="Settings" />
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
  >
    <span className="mr-2">{icon}</span>
    {text}
  </Link>
); 