import React, { useState } from 'react';
import { FiTrash2, FiInstagram, FiLinkedin, FiFacebook, FiTwitter, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';

const platformConfig = {
  Instagram: { icon: <FiInstagram size={13} />, color: 'text-pink-500 bg-pink-50' },
  LinkedIn:  { icon: <FiLinkedin size={13} />,  color: 'text-blue-600 bg-blue-50' },
  Facebook:  { icon: <FiFacebook size={13} />,  color: 'text-blue-500 bg-blue-50' },
  Twitter:   { icon: <FiTwitter size={13} />,   color: 'text-sky-400 bg-sky-50' },
};

const statusConfig = {
  completed:  { label: 'Completed',  cls: 'bg-green-100 text-green-700' },
  processing: { label: 'Processing', cls: 'bg-amber-100 text-amber-700' },
  failed:     { label: 'Failed',     cls: 'bg-red-100 text-red-600' },
  pending:    { label: 'Pending',    cls: 'bg-gray-100 text-gray-600' },
};

const CampaignCard = ({ campaign, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Delete this campaign?')) return;
    setDeleting(true);
    try {
      await api.delete(`/campaigns/${campaign._id}`);
      toast.success('Campaign deleted');
      onDelete(campaign._id);
    } catch {
      toast.error('Failed to delete');
      setDeleting(false);
    }
  };

  const handleDownload = async () => {
    if (!campaign.finalAsset?.url) return;
    const res = await fetch(campaign.finalAsset.url);
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `campaign-${campaign._id}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const platform = platformConfig[campaign.platform] || platformConfig.Instagram;
  const status = statusConfig[campaign.status] || statusConfig.pending;

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${deleting ? 'opacity-50 pointer-events-none' : ''}`}>

      {/* Image */}
      <div className="relative group aspect-square overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
        {campaign.finalAsset?.url ? (
          <img src={campaign.finalAsset.url} alt="Campaign" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiInstagram size={32} className="text-gray-300" />
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          {campaign.finalAsset?.url && (
            <button onClick={handleDownload} className="bg-white text-gray-800 p-2.5 rounded-xl hover:bg-orange-500 hover:text-white transition-colors shadow-lg" title="Download">
              <FiDownload size={16} />
            </button>
          )}
          <button onClick={handleDelete} className="bg-white text-gray-800 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-colors shadow-lg" title="Delete">
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${platform.color}`}>
            {platform.icon} {campaign.platform}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${status.cls}`}>
            {status.label}
          </span>
        </div>

        <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed mb-2">{campaign.prompt}</p>

        {campaign.generatedCopy?.headline && (
          <p className="text-xs font-semibold text-orange-500 line-clamp-1 mb-3 italic">
            "{campaign.generatedCopy.headline}"
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-xs text-gray-400">
            {new Date(campaign.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full capitalize">
            {campaign.brandVoice || 'Professional'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
