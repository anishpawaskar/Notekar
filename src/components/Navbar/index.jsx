import { NAV_LINKS } from './NavbarConstants';
import { NavbarPresentation } from './Presentation';
import { useGetActiveLink } from '../../hooks/useGetActiveLink';
import { useState } from 'react';

export const Navbar = () => {
  const [activeLink] = useGetActiveLink();
  const [isMobileNavbarVisible, setIsMobileNavbarVisible] = useState(false);
  const [isEditLabelsVisible, setIsEditLabelsVisible] = useState(false);

  const handleEditLabel = () => {
    setIsEditLabelsVisible((prevState) => !prevState);
    setIsMobileNavbarVisible(false);
  };

  const closeEditLabels = () => {
    setIsEditLabelsVisible(false);
  };

  const handleNavlink = () => {
    setIsMobileNavbarVisible((prevState) => !prevState);
  };

  return (
    <NavbarPresentation
      navlinks={NAV_LINKS}
      activeLink={activeLink}
      isMobileNavbarVisible={isMobileNavbarVisible}
      handleEditLabel={handleEditLabel}
      handleNavlink={handleNavlink}
      isEditLabelsVisible={isEditLabelsVisible}
      closeEditLabels={closeEditLabels}
    />
  );
};
