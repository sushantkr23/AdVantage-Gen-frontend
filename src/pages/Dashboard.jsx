import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CampaignGenerator from '../components/CampaignGenerator';
import api from '../services/api';
import { FiZap, FiClock, FiTrendingUp, FiAward } from 'react-icons/fi';

const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [recentCount, setRecentCount] = useState(0);

  const generated = user?.subscription?.campaignsGenerated || 0;
  const limit = user?.subscription?.monthlyLimit || 10;
  const remaining = limit - generated;
  const plan = user?.subscription?.plan || 'free';

  useEffect(() => {
    api.get('/campaigns?limit=5').then((r) => setRecentCount(r.data.pagination?.total || 0)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">Create a new campaign or check your history below.</p>
          </div>
          <Link to="/history" className="btn-secondary text-sm inline-flex items-center gap-2 self-start sm:self-auto">
            <FiClock size={15} /> View History
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<FiZap size={20} />} label="Campaigns Used" value={generated} sub={`of ${limit} this month`} color="bg-gradient-to-br from-orange-400 to-red-500" />
          <StatCard icon={<FiTrendingUp size={20} />} label="Remaining" value={remaining} sub="campaigns left" color="bg-gradient-to-br from-green-400 to-emerald-500" />
          <StatCard icon={<FiClock size={20} />} label="Total Campaigns" value={recentCount} sub="all time" color="bg-gradient-to-br from-blue-400 to-indigo-500" />
          <StatCard icon={<FiAward size={20} />} label="Current Plan" value={plan.charAt(0).toUpperCase() + plan.slice(1)} sub={<Link to="/pricing" className="text-orange-500 hover:underline">Upgrade →</Link>} color="bg-gradient-to-br from-violet-400 to-purple-600" />
        </div>

        {/* Usage bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Monthly Usage</span>
            <span className="text-sm text-gray-500">{generated} / {limit} campaigns</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((generated / limit) * 100, 100)}%` }}
            />
          </div>
          {remaining <= 2 && remaining > 0 && (
            <p className="text-xs text-orange-500 mt-2 font-medium">⚠️ Only {remaining} campaign{remaining !== 1 ? 's' : ''} left. <Link to="/pricing" className="underline">Upgrade now</Link></p>
          )}
          {remaining === 0 && (
            <p className="text-xs text-red-500 mt-2 font-medium">🚫 Monthly limit reached. <Link to="/pricing" className="underline">Upgrade to continue</Link></p>
          )}
        </div>

        {/* Generator */}
        <CampaignGenerator />
      </div>
    </div>
  );
};

export default Dashboard;
