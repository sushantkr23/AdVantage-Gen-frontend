import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { FiZap, FiClock, FiSettings, FiLogOut, FiUser, FiMenu, FiX, FiDollarSign } from 'react-icons/fi';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLink = (to, label, Icon) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
        isActive(to)
          ? 'bg-orange-50 text-orange-600'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon size={15} />
      {label}
    </Link>
  );

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md">
              <FiZap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text font-['Poppins']">AdVantage Gen</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {isAuthenticated ? (
              <>
                {navLink('/dashboard', 'Create', FiZap)}
                {navLink('/history', 'History', FiClock)}
                {navLink('/settings', 'Settings', FiSettings)}
                <div className="w-px h-5 bg-gray-200 mx-2" />
                <div className="flex items-center gap-2 pl-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user?.name?.split(' ')[0] || 'User'}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-1 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Logout"
                  >
                    <FiLogOut size={16} />
                  </button>
                </div>
              </>
            ) : (
              <>
                {navLink('/pricing', 'Pricing', FiDollarSign)}
                <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm px-5 py-2">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1 shadow-lg">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              {navLink('/dashboard', 'Create Campaign', FiZap)}
              {navLink('/history', 'History', FiClock)}
              {navLink('/settings', 'Settings', FiSettings)}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <FiLogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              {navLink('/pricing', 'Pricing', FiDollarSign)}
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Sign In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block btn-primary text-center text-sm mt-2">Get Started Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
