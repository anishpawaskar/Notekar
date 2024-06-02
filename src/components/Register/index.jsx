import { useRef } from 'react';
import { RegisterPresentation } from './Presentation';
import { useRegistersUserMutation } from '../../app/services/api';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [registerUser, { isLoading }] = useRegistersUserMutation();
  const navigate = useNavigate();

  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (firstName && lastName && email && password) {
      await registerUser({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      navigate('/notes');
    }
  };
  return (
    <RegisterPresentation
      refs={{
        firstNameInputRef,
        lastNameInputRef,
        emailInputRef,
        passwordInputRef,
      }}
      isLoading={isLoading}
      handleRegistration={handleRegistration}
    />
  );
};
