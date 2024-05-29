import { useRef } from 'react';
import { LoginPresentation } from './Presentation';

export const Login = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    console.log('email', email);
    console.log('password', password);

    //write login endpoint logic here and if it is successfull then naviagte user to /notes
  };
  return (
    <LoginPresentation
      emailInputRef={emailInputRef}
      passwordInputRef={passwordInputRef}
      handleLogin={handleLogin}
    />
  );
};
