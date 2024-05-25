import { Link } from 'react-router-dom';

export const MobileNavItems = ({
  navlink,
  activeLink,
  handleNavlink,
  handleEditLabel,
}) => {
  return navlink.name === 'Edit labels' ? (
    <li className="font-medium hover:border-b-2 px-6">
      <button onClick={handleEditLabel}>{navlink.name}</button>
    </li>
  ) : (
    <Link
      className={`${activeLink === navlink.name && 'bg-[--primary-color]'} px-6`}
      to={navlink?.to}
    >
      <li onClick={handleNavlink} className="font-medium">
        {navlink.name}
      </li>
    </Link>
  );
};
