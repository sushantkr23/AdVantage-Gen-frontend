import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import CampaignCard from '../components/CampaignCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiZap, FiFilter } from 'react-icons/fi';

const platforms = ['All', 'Instagram', 'LinkedIn', 'Facebook', 'Twitter'];

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.get('/campaigns')
      .then((r) => setCampaigns(r.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => setCampaigns((prev) => prev.filter((c) => c._id !== id));

  const filtered = filter === 'All' ? campaigns : campaigns.filter((c) => c.platform === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaign History</h1>
            <p className="text-gray-500 text-sm mt-1">
              {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <Link to="/dashboard" className="btn-primary text-sm inline-flex items-center gap-2 self-start sm:self-auto">
            <FiZap size={15} /> New Campaign
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <FiFilter size={15} className="text-gray-400 flex-shrink-0" />
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === p
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-24">
            <LoadingSpinner size="lg" text="Loading your campaigns..." />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-24 text-center px-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiZap size={28} className="text-orange-400" />
            </div>
            <h3 className="font-bold text-gray-700 text-lg mb-2">
              {filter === 'All' ? 'No campaigns yet' : `No ${filter} campaigns`}
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
              {filter === 'All'
                ? 'Create your first AI-powered campaign to see it here.'
                : `Switch to a different platform filter or create a new ${filter} campaign.`}
            </p>
            <Link to="/dashboard" className="btn-primary text-sm inline-flex items-center gap-2">
              <FiZap size={15} /> Create Campaign
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((campaign) => (
              <CampaignCard key={campaign._id} campaign={campaign} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignHistory;
