import { Link } from 'react-router-dom';
import authBgImg from './assets/auth-bg.jpg';
import logoMain from './assets/logo-main.png';

export const LoginPresentation = ({
  emailInputRef,
  passwordInputRef,
  handleLogin,
  isLoading,
  isError,
}) => {
  return (
    <div>
      <img
        className="w-dvw h-dvh object-cover max-[450px]:hidden"
        src={authBgImg}
        alt="login-bg"
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
          onSubmit={(e) => handleLogin(e)}
          className="flex flex-col gap-4 w-full"
        >
          <div>
            <label className="uppercase font-medium text-sm" htmlFor="email">
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
            <label htmlFor="password" className="uppercase font-medium text-sm">
              Password <span className="text-red-700">*</span>
            </label>
            <input
              ref={passwordInputRef}
              placeholder="Password"
              className="w-full h-8 mt-2 rounded text-black text-[0.93rem] font-normal focus:outline-none px-2 py-[1.1rem] border border-[#afafaf]"
              type="password"
              name="password"
              required
            />
            <Link
              to="/forgot-password"
              className="block mt-2 text-sm font-semibold text-[--primary-color] max-[450px]:text-black"
            >
              Forgot your password?
            </Link>
          </div>
          {isError && (
            <p className="text-sm text-red-700 font-medium">
              Email or password is invalid.
            </p>
          )}
          <div>
            <button
              disabled={isLoading ? true : false}
              className="bg-[--primary-color] rounded py-2 text-white font-medium max-[450px]:bg-white max-[450px]:text-black w-full"
            >
              Log In
            </button>
            <p className="mt-2 text-sm">
              Need an account?{' '}
              <Link
                to="/register"
                className="text-[--primary-color] font-semibold max-[450px]:text-black"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
