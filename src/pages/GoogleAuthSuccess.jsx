import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../store/slices/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      dispatch(getCurrentUser()).then(() => navigate('/dashboard'));
    } else {
      navigate('/login?error=google_failed');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-gray-500 mt-4">Signing you in with Google...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
