import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiZap, FiArrowRight } from 'react-icons/fi';

const VerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/verify-otp', { email, otp: otpString });
      toast.success('OTP verified!');
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Invalid OTP');
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('New OTP sent!');
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } catch {
      toast.error('Failed to resend OTP');
    } finally {
      setResending(false);
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

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Enter OTP</h1>
          <p className="text-gray-500 text-sm mb-8">
            We sent a 6-digit code to <strong className="text-gray-700">{email}</strong>
          </p>

          <form onSubmit={handleSubmit}>
            {/* OTP Boxes */}
            <div className="flex gap-3 justify-center mb-8" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl outline-none transition-all duration-200
                    ${digit ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200 text-gray-800'}
                    focus:border-orange-500 focus:bg-orange-50`}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><span>Verify OTP</span><FiArrowRight size={16} /></>
              }
            </button>
          </form>

          <div className="text-center mt-5">
            <p className="text-sm text-gray-500">
              Didn't receive it?{' '}
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-orange-500 font-semibold hover:text-orange-600 disabled:opacity-50"
              >
                {resending ? 'Sending...' : 'Resend OTP'}
              </button>
            </p>
          </div>

          <Link to="/forgot-password" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mt-4 justify-center">
            <FiArrowLeft size={14} /> Change Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
