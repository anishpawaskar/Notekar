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
  toggleModal,
  handleLogout,
  isModalOpen,
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
      <div onClick={toggleModal} className="relative">
        <button className="h-9 w-9 rounded-full bg-[--primary-color]">A</button>
        {isModalOpen && (
          <div className="flex flex-col shadow-2xl px-2 py-2 absolute left-[-90px] bottom-[-55px]">
            <button
              onClick={handleLogout}
              className="px-8 h-8 border bg-[#f7f7f7] hover:bg-[#8f8f8f] text-base rounded-md active:bg-[#f7f7f7]"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
