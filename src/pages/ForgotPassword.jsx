import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiMail, FiArrowLeft, FiZap, FiArrowRight } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
      toast.success('OTP sent! Check your email.');
    } catch {
      toast.error('Something went wrong. Try again.');
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

          {!sent ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Forgot Password?</h1>
              <p className="text-gray-500 text-sm mb-8">
                Enter your email and we'll send a 6-digit OTP to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">Email Address</label>
                  <div className="relative">
                    <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-primary pl-10"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><span>Send OTP</span><FiArrowRight size={16} /></>
                  }
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail size={28} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Check Your Email!</h2>
              <p className="text-gray-500 text-sm mb-6">
                We sent a 6-digit OTP to <strong>{email}</strong>. It expires in 10 minutes.
              </p>
              <Link
                to={`/verify-otp?email=${encodeURIComponent(email)}`}
                className="btn-primary w-full py-3 justify-center"
              >
                Enter OTP <FiArrowRight size={16} />
              </Link>
            </div>
          )}

          <Link to="/login" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mt-6 justify-center">
            <FiArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
