import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (localStorage.getItem('token') && !user && !loading) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user, loading]);
  
  return {
    user,
    isAuthenticated,
    loading,
    error,
  };
};