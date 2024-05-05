import notkarLogo from './assets/logo-main.png';

export const NavbarPresentation = () => {
  return (
    <nav className="flex px-4 py-3 justify-between items-center">
      <div className="flex items-center">
        <img className="w-10" src={notkarLogo} alt="notkar-logo" />
        <h1 className="font-semibold text-2xl">notkar</h1>
      </div>
      <div className="">
        <button className="h-9 w-9 rounded-full bg-[--primary-color]">A</button>
      </div>
    </nav>
  );
};
