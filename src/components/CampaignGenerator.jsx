import React, { useState } from 'react';
import { useMutation } from 'react-query';
import api from '../services/api';
import toast from 'react-hot-toast';
import BrandVoiceSelector from './BrandVoiceSelector';
import LogoUploader from './LogoUploader';
import ImagePreview from './ImagePreview';
import CopyGenerator from './CopyGenerator';
import LoadingSpinner from './LoadingSpinner';
import { FiZap, FiInstagram, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi';

const platformIcons = {
  Instagram: <FiInstagram size={14} />,
  LinkedIn: <FiLinkedin size={14} />,
  Facebook: <FiFacebook size={14} />,
  Twitter: <FiTwitter size={14} />,
};

const platforms = ['Instagram', 'LinkedIn', 'Facebook', 'Twitter'];

const CampaignGenerator = () => {
  const [formData, setFormData] = useState({
    prompt: '',
    brandVoice: 'Professional',
    platform: 'Instagram',
    ctaText: 'Shop Now',
    logo: null,
  });
  const [generatedAsset, setGeneratedAsset] = useState(null);

  const generateMutation = useMutation(
    async (data) => {
      const fd = new FormData();
      fd.append('prompt', data.prompt);
      fd.append('brandVoice', data.brandVoice);
      fd.append('platform', data.platform);
      fd.append('ctaText', data.ctaText);
      if (data.logo) fd.append('logo', data.logo);
      const response = await api.post('/campaigns', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    },
    {
      onSuccess: (data) => {
        setGeneratedAsset(data);
        toast.success('Campaign generated! 🎉');
      },
      onError: () => {
        toast.error('Generation failed. Please try again.');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.prompt.trim()) {
      toast.error('Please enter a campaign prompt');
      return;
    }
    generateMutation.mutate(formData);
  };

  const isLoading = generateMutation.isLoading;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

      {/* ── Left: Form (2/5) ── */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FiZap size={18} /> Campaign Settings
            </h2>
            <p className="text-orange-100 text-xs mt-0.5">Fill in the details below to generate your ad</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Prompt */}
            <div>
              <label className="label">Campaign Prompt <span className="text-red-400">*</span></label>
              <textarea
                value={formData.prompt}
                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                rows={4}
                className="input-primary resize-none"
                placeholder="E.g., Eco-friendly coffee cup in a rainy cafe, focused on sustainability..."
                maxLength={500}
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{formData.prompt.length}/500</p>
            </div>

            {/* Platform */}
            <div>
              <label className="label">Platform</label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, platform: p })}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      formData.platform === p
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                  >
                    {platformIcons[p]} {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Voice */}
            <BrandVoiceSelector
              value={formData.brandVoice}
              onChange={(v) => setFormData({ ...formData, brandVoice: v })}
            />

            {/* CTA */}
            <div>
              <label className="label">Call to Action Text</label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="input-primary"
                placeholder="Shop Now"
                maxLength={50}
              />
            </div>

            {/* Logo */}
            <LogoUploader onLogoUpload={(file) => setFormData({ ...formData, logo: file })} />

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <><FiZap size={18} /><span>Generate Campaign</span></>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Right: Output (3/5) ── */}
      <div className="lg:col-span-3 space-y-5">
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 flex flex-col items-center justify-center py-24 gap-4">
            <LoadingSpinner size="lg" />
            <div className="text-center">
              <p className="font-semibold text-gray-700">Generating your campaign...</p>
              <p className="text-sm text-gray-400 mt-1">AI is creating image & copy in parallel</p>
            </div>
            <div className="flex gap-6 mt-2">
              {['🎨 Image', '✍️ Copy', '🏷️ Hashtags'].map((s) => (
                <div key={s} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        ) : generatedAsset ? (
          <>
            <ImagePreview imageUrl={generatedAsset.finalAsset?.url} platform={generatedAsset.platform} />
            <CopyGenerator copy={generatedAsset.generatedCopy} />
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-soft border border-dashed border-gray-200 flex flex-col items-center justify-center py-24 text-center px-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-4">
              <FiZap size={28} className="text-orange-400" />
            </div>
            <h3 className="font-bold text-gray-700 text-lg mb-2">Your campaign will appear here</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Fill in the form on the left and click "Generate Campaign" to create your AI-powered ad.
            </p>
            <div className="flex gap-4 mt-6 text-xs text-gray-400">
              <span>🖼️ AI Image</span>
              <span>📝 Caption</span>
              <span>#️⃣ Hashtags</span>
              <span>🔘 CTA Button</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignGenerator;
