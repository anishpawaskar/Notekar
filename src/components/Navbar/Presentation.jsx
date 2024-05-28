import notkarLogo from './assets/logo-main.png';
import hamburgerIcon from './assets/hamburger-icon.png';
import { NavItems } from './components/NavItems';
import { MobileNavbar } from './components/MobileNavbar';
import { EditLabels } from '../EditLabels';

export const NavbarPresentation = ({
  navlinks,
  activeLink,
  isMobileNavbarVisible,
  handleEditLabel,
  handleNavlink,
  isEditLabelsVisible,
  closeEditLabels,
}) => {
  return (
    <nav className="flex px-4 py-3 justify-between items-center">
      <div className="flex gap-5 items-center max-[639px]:hidden">
        <div className="flex items-center">
          <img className="w-10" src={notkarLogo} alt="notkar-logo" />
          <h1 className="font-semibold text-2xl">notekar</h1>
        </div>
        <ul className="flex gap-4">
          {navlinks.map((navlink) => {
            return (
              <NavItems
                key={navlink.id}
                navlink={navlink}
                activeLink={activeLink}
                handleEditLabel={handleEditLabel}
              />
            );
          })}
        </ul>
      </div>
      {isMobileNavbarVisible && (
        <MobileNavbar
          navlinks={navlinks}
          handleEditLabel={handleEditLabel}
          handleNavlink={handleNavlink}
          activeLink={activeLink}
        />
      )}
      <div className="mt-0 sm:hidden">
        <button onClick={handleNavlink}>
          <img src={hamburgerIcon} alt="menu" />
        </button>
      </div>
      {isEditLabelsVisible && <EditLabels closeEditLabels={closeEditLabels} />}
      <div className="">
        <button className="h-9 w-9 rounded-full bg-[--primary-color]">A</button>
      </div>
    </nav>
  );
};
