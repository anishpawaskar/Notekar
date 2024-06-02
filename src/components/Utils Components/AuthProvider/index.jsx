import { useEffect } from 'react';
import { useGetSelfDetailsQuery } from '../../../app/services/api';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setSelfDetails } from '../../../app/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const { data, isLoading, isError } = useGetSelfDetailsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
        dispatch(setSelfDetails({ selfData: data?.userData }));
        navigate('/notes', { replace: true });
      } else if (isError) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        navigate('/', { replace: true });
      }
    }
  }, [data, isLoading, isError]);

  return children;
};
