import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ReferralDashboard } from './pages/ReferralDashboard';
import { Referrals } from './pages/Referrals';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { useAuth } from './contexts/AuthContext';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { Auth } from './pages/Auth';
import Jobs from './pages/Jobs';
import { Loading } from './components/common/Loading';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navbar />}
      <main className="container mx-auto py-6">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={user ? <ReferralDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/referrals" 
            element={user ? <Referrals /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/settings" 
            element={user ? <Settings /> : <Navigate to="/login" />} 
          />
          
          {/* Auth routes */}
          <Route 
            path="/auth" 
            element={!user ? <Auth /> : <Navigate to="/referrals" />} 
          />
          <Route 
            path="/jobs" 
            element={user ? <Jobs /> : <Navigate to="/auth" />} 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;