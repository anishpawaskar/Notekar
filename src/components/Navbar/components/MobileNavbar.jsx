import notekarLogo from '../assets/logo-main.png';
import cancelIcon from '../assets/cancel-icon.png';
import { NavItems } from './NavItems';
import { MobileNavItems } from './MobileNavItems';

export const MobileNavbar = ({
  navlinks,
  handleEditLabel,
  handleNavlink,
  activeLink,
}) => {
  return (
    <>
      <div
        onClick={handleNavlink}
        className="w-full h-full absolute top-0 left-0 z-1 bg-red"
      />
      <div className="fixed top-0 left-0 z-[100] w-52 bg-white shadow-lg border h-full flex flex-col gap-4">
        <div className="flex justify-end  mr-4 mt-2">
          <button onClick={handleNavlink}>
            <img src={cancelIcon} alt="close-menu" />
          </button>
        </div>
        <div className="flex items-center px-6 top-[3.75rem]">
          <img className="w-10" src={notekarLogo} alt="notkar-logo" />
          <h1 className="font-semibold text-2xl">notekar</h1>
        </div>
        <ul className="flex flex-col">
          {navlinks.map((navlink) => {
            return (
              <MobileNavItems
                navlink={navlink}
                activeLink={activeLink}
                handleEditLabel={handleEditLabel}
                handleNavlink={handleNavlink}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};
