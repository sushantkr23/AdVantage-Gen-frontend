import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiZap, FiArrowRight, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Login failed. Check your credentials.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const features = [
    'Generate images with Hugging Face AI',
    'Write copy with Google Gemini',
    'Auto-overlay your logo & CTA',
    'Export for Instagram, LinkedIn & more',
  ];

  return (
    <div className="min-h-screen flex">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex-col justify-between p-12 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500 opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
            <FiZap size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl font-poppins">AdVantage Gen</span>
        </div>

        {/* Center content */}
        <div className="relative">
          <h2 className="text-4xl font-bold text-white mb-4 font-poppins leading-tight">
            Create stunning<br />
            <span className="gradient-text">ad campaigns</span><br />
            in seconds
          </h2>
          <p className="text-gray-400 mb-10 text-base leading-relaxed">
            One prompt. AI generates your image, caption, hashtags and branded CTA — ready to publish.
          </p>
          <div className="space-y-3">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                  <FiCheck size={10} className="text-orange-400" />
                </div>
                <span className="text-gray-300 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <div className="flex -space-x-2">
              {['🧑', '👩', '👨'].map((e, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-xs border-2 border-slate-900">
                  {e}
                </div>
              ))}
            </div>
            <span className="text-gray-300 text-xs">Join 1,000+ marketers using AdVantage Gen</span>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
            <p className="text-gray-500 text-sm mb-7">Sign in to continue to your dashboard</p>

            {/* ── Google Button ── */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl py-3 px-4 text-gray-700 font-medium text-sm shadow-sm hover:shadow-md hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99] transition-all duration-200"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium px-1">or sign in with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* ── Email Form ── */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
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

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="label mb-0">Password</label>
                  <Link to="/forgot-password" className="text-xs text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-primary pl-10 pr-10"
                    placeholder="••••••••"
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

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 mt-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><span>Sign In</span><FiArrowRight size={15} /></>
                }
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                Sign up free
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            By signing in, you agree to our{' '}
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">Terms</span>
            {' & '}
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
