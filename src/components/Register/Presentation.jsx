import { Link } from 'react-router-dom';
import authBgImg from './assets/auth-bg.jpg';
import logoMain from './assets/logo-main.png';

export const RegisterPresentation = ({
  refs,
  isLoading,
  isError,
  handleRegistration,
}) => {
  const {
    firstNameInputRef,
    lastNameInputRef,
    emailInputRef,
    passwordInputRef,
  } = refs;

  return (
    <div>
      <img
        className="w-dvw h-dvh object-cover max-[450px]:hidden"
        src={authBgImg}
        alt="register-bg"
      />
      <div className="flex flex-col items-center gap-3 bg-white absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[25rem] bg-[--primary-color] rounded p-[1.625rem] max-[450px]:w-full max-[450px]:h-full max-[450px]:bg-[--primary-color]">
        <div className="flex flex-col items-center gap-4">
          <div className="hidden max-[450px]:flex max-[450px]:items-center gap-2">
            <img className="w-10" src={logoMain} alt="notekar-logo" />
            <h1 className=" text-3xl font-semibold">notekar</h1>
          </div>
          <h2 className="text-center text-2xl font-semibold">Welcome back!</h2>
          <p className="text-center">We are so exicted to see you again!</p>
        </div>
        <form
          onSubmit={(e) => handleRegistration(e)}
          className="flex flex-col gap-4 w-full"
        >
          <div>
            <label
              className="uppercase font-medium text-xs"
              htmlFor="firstName"
            >
              First name <span className="mt-0 text-red-700">*</span>
            </label>
            <input
              ref={firstNameInputRef}
              placeholder="First name"
              className="w-full h-8 mt-2 rounded text-black text-[0.93rem] font-normal focus:outline-none px-2 py-[1.1rem] border border-[#afafaf]"
              type="text"
              name="firstName"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="uppercase font-medium text-xs">
              Last name <span className="text-red-700">*</span>
            </label>
            <input
              ref={lastNameInputRef}
              placeholder="Last name"
              className="w-full h-8 mt-2 rounded text-black text-[0.93rem] font-normal focus:outline-none px-2 py-[1.1rem] border border-[#afafaf]"
              type="text"
              name="lastName"
              required
            />
          </div>
          <div>
            <label className="uppercase font-medium text-xs" htmlFor="email">
              Email <span className="mt-0 text-red-700">*</span>
            </label>
            <input
              ref={emailInputRef}
              placeholder="Enter email"
              className="w-full h-8 mt-2 rounded text-black text-[0.93rem] font-normal focus:outline-none px-2 py-[1.1rem] border border-[#afafaf]"
              type="email"
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="uppercase font-medium text-xs">
              Password <span className="text-red-700">*</span>
            </label>
            <input
              ref={passwordInputRef}
              placeholder="Password"
              className="w-full h-8 mt-2 rounded text-black text-[0.93rem] font-normal focus:outline-none px-2 py-[1.1rem] border border-[#afafaf]"
              type="password"
              name="password"
              minLength="8"
              required
            />
          </div>
          {isError && (
            <p className="text-sm text-red-700 font-medium">
              Email is already taken.
            </p>
          )}
          <button
            disabled={isLoading ? true : false}
            className="bg-[--primary-color] rounded py-2 text-white font-medium max-[450px]:bg-white max-[450px]:text-black"
          >
            Register
          </button>
        </form>
        <Link
          to="/login"
          className="self-start text-sm font-semibold text-[--primary-color] max-[450px]:text-black"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
};
