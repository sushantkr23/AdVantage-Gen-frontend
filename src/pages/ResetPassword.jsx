import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiLock, FiEye, FiEyeOff, FiZap, FiArrowRight, FiCheck } from 'react-icons/fi';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const strength = newPassword.length >= 8
    ? newPassword.match(/[A-Z]/) && newPassword.match(/[0-9]/) ? 'Strong' : 'Medium'
    : newPassword.length > 0 ? 'Weak' : '';

  const strengthColor = { Strong: 'text-green-500', Medium: 'text-yellow-500', Weak: 'text-red-500' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, newPassword });
      setDone(true);
      toast.success('Password reset successfully!');
      setTimeout(() => navigate('/login'), 2500);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8">

          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <FiZap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text font-poppins">AdVantage Gen</span>
          </div>

          {!done ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Set New Password</h1>
              <p className="text-gray-500 text-sm mb-8">
                Create a strong password for <strong className="text-gray-700">{email}</strong>
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">New Password</label>
                  <div className="relative">
                    <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input-primary pl-10 pr-10"
                      placeholder="Min. 6 characters"
                      required
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                  {strength && (
                    <p className={`text-xs mt-1.5 font-medium ${strengthColor[strength]}`}>
                      Password strength: {strength}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">Confirm Password</label>
                  <div className="relative">
                    <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-primary pl-10"
                      placeholder="Repeat password"
                      required
                    />
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs mt-1.5 text-red-500">Passwords do not match</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || newPassword !== confirmPassword}
                  className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><span>Reset Password</span><FiArrowRight size={16} /></>
                  }
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck size={28} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Password Reset!</h2>
              <p className="text-gray-500 text-sm">Redirecting you to login...</p>
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div className="bg-orange-500 h-1 rounded-full animate-[width_2.5s_ease-in-out]" style={{ width: '100%', transition: 'width 2.5s' }} />
                </div>
              </div>
            </div>
          )}

          {!done && (
            <Link to="/login" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mt-6 justify-center">
              Back to Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
