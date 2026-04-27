import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../store/slices/authSlice';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiUser, FiLock, FiAward, FiSave, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SectionCard = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
      <span className="text-orange-500">{icon}</span>
      <h2 className="font-bold text-gray-800">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    defaultBrandVoice: user?.preferences?.defaultBrandVoice || 'Professional',
    defaultPlatform: user?.preferences?.defaultPlatform || 'Instagram',
    defaultCta: user?.preferences?.defaultCta || 'Shop Now',
  });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [saving, setSaving] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/auth/profile', {
        name: profile.name,
        preferences: {
          defaultBrandVoice: profile.defaultBrandVoice,
          defaultPlatform: profile.defaultPlatform,
          defaultCta: profile.defaultCta,
        },
      });
      dispatch(getCurrentUser());
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) { toast.error('Passwords do not match'); return; }
    if (passwords.newPass.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setChangingPass(true);
    try {
      await api.post('/auth/change-password', { currentPassword: passwords.current, newPassword: passwords.newPass });
      toast.success('Password changed!');
      setPasswords({ current: '', newPass: '', confirm: '' });
    } catch {
      toast.error('Failed to change password. Check current password.');
    } finally {
      setChangingPass(false);
    }
  };

  const generated = user?.subscription?.campaignsGenerated || 0;
  const limit = user?.subscription?.monthlyLimit || 10;
  const plan = user?.subscription?.plan || 'free';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <SectionCard icon={<FiUser size={18} />} title="Profile & Preferences">
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="input-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Default Brand Voice</label>
                  <select value={profile.defaultBrandVoice} onChange={(e) => setProfile({ ...profile, defaultBrandVoice: e.target.value })} className="input-primary">
                    {['Witty', 'Professional', 'Urgent', 'Inspirational'].map((v) => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Default Platform</label>
                  <select value={profile.defaultPlatform} onChange={(e) => setProfile({ ...profile, defaultPlatform: e.target.value })} className="input-primary">
                    {['Instagram', 'LinkedIn', 'Facebook', 'Twitter'].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Default CTA Text</label>
                <input type="text" value={profile.defaultCta} onChange={(e) => setProfile({ ...profile, defaultCta: e.target.value })} className="input-primary" maxLength={50} />
              </div>
              <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave size={15} />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </SectionCard>

          {/* Password */}
          <SectionCard icon={<FiLock size={18} />} title="Change Password">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="label">Current Password</label>
                <input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="input-primary" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">New Password</label>
                  <input type="password" value={passwords.newPass} onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })} className="input-primary" required />
                </div>
                <div>
                  <label className="label">Confirm New</label>
                  <input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="input-primary" required />
                </div>
              </div>
              <button type="submit" disabled={changingPass} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                {changingPass ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiLock size={15} />}
                {changingPass ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </SectionCard>

          {/* Subscription */}
          <SectionCard icon={<FiAward size={18} />} title="Subscription">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-gray-900 capitalize text-lg">{plan} Plan</p>
                <p className="text-sm text-gray-500">{generated} of {limit} campaigns used this month</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${plan === 'free' ? 'bg-gray-100 text-gray-600' : plan === 'pro' ? 'bg-orange-100 text-orange-600' : 'bg-violet-100 text-violet-600'}`}>
                {plan}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all" style={{ width: `${Math.min((generated / limit) * 100, 100)}%` }} />
            </div>
            {plan !== 'enterprise' && (
              <Link to="/pricing" className="btn-primary text-sm inline-flex items-center gap-2">
                Upgrade Plan <FiArrowRight size={14} />
              </Link>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Settings;
