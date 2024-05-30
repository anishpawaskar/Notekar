import { useRef } from 'react';
import { RegisterPresentation } from './Presentation';

export const Register = () => {
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleRegistration = (e) => {
    e.preventDefault();
    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (firstName && lastName && email && password) {
      console.log(
        'do api call to register and navigate user to /notes after successfull res',
      );
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
      handleRegistration={handleRegistration}
    />
  );
};
