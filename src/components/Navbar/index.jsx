import { NAV_LINKS } from './NavbarConstants';
import { NavbarPresentation } from './Presentation';
import { useGetActiveLink } from '../../hooks/useGetActiveLink';
import { useState } from 'react';
import { useLogoutUserMutation } from '../../app/services/api';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [activeLink] = useGetActiveLink();
  const [isMobileNavbarVisible, setIsMobileNavbarVisible] = useState(false);
  const [isEditLabelsVisible, setIsEditLabelsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

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

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await logoutUser()
      .unwrap()
      .then((data) => {
        if (data) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
      toggleModal={toggleModal}
      handleLogout={handleLogout}
      isModalOpen={isModalOpen}
    />
  );
};
