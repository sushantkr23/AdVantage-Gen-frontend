import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiZap, FiArrowRight, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      await dispatch(register(formData)).unwrap();
      toast.success('Account created! Welcome 🎉');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Registration failed');
    }
  };

  const perks = [
    '10 free campaigns per month',
    'AI image + copy generation',
    'Brand logo compositing',
    'No credit card required',
  ];

  return (
    <div className="min-h-screen flex">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500 opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500 opacity-10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
            <FiZap size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl font-poppins">AdVantage Gen</span>
        </div>

        {/* Center content */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-300 text-xs font-medium">Free forever plan available</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 font-poppins leading-tight">
            Start creating<br />
            <span className="gradient-text">AI-powered ads</span><br />
            today
          </h2>
          <p className="text-gray-400 mb-10 text-base leading-relaxed">
            Join thousands of marketers who save hours every week with AdVantage Gen.
          </p>
          <div className="space-y-3">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                  <FiCheck size={10} className="text-green-400" />
                </div>
                <span className="text-gray-300 text-sm">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-gray-300 text-sm italic mb-2">
              "AdVantage Gen cut our campaign creation time from 3 hours to 30 seconds."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-xs text-white font-bold">S</div>
              <div>
                <p className="text-white text-xs font-semibold">Sarah K.</p>
                <p className="text-gray-500 text-xs">Marketing Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50 min-h-screen">
        <div className="w-full max-w-[420px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <FiZap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text font-poppins">AdVantage Gen</span>
          </div>

          <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-gray-500 text-sm mb-7">Free forever. No credit card needed.</p>

            {/* ── Google Button ── */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl py-3 px-4 text-gray-700 font-medium text-sm shadow-sm hover:shadow-md hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99] transition-all duration-200"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium px-1">or register with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <div className="relative">
                  <FiUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={set('name')}
                    className="input-primary pl-10"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={set('email')}
                    className="input-primary pl-10"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={formData.password}
                    onChange={set('password')}
                    className="input-primary pl-10 pr-10"
                    placeholder="Min. 6 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="label">Confirm Password</label>
                <div className="relative">
                  <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={set('confirmPassword')}
                    className="input-primary pl-10"
                    placeholder="Repeat password"
                    required
                  />
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1.5">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 mt-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><span>Create Account</span><FiArrowRight size={15} /></>
                }
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            By creating an account, you agree to our{' '}
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">Terms</span>
            {' & '}
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
