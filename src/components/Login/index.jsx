import { useRef } from 'react';
import { LoginPresentation } from './Presentation';
import { useLoginUserMutation } from '../../app/services/api';
import { setIsLoggedIn, setSelfDetails } from '../../app/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (email && password) {
      const data = await loginUser({
        email,
        password,
      }).unwrap();

      if (data) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
        dispatch(setSelfDetails({ selfData: data?.userData }));
        navigate('/notes', { replace: true });
      }
    }
  };

  return (
    <LoginPresentation
      emailInputRef={emailInputRef}
      passwordInputRef={passwordInputRef}
      handleLogin={handleLogin}
    />
  );
};
