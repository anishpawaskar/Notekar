import { Link } from 'react-router-dom';

export const NavItems = ({ navlink, activeLink }) => {
  return navlink.name === 'Edit labels' ? (
    <li className="font-medium hover:border-b-2 hover:border-b-[--primary-color]">
      <button>{navlink.name}</button>
    </li>
  ) : (
    <Link
      className={`${activeLink === navlink.name && 'border-b-[--primary-color] border-b-2'} hover:border-b-2 hover:border-b-[--primary-color]`}
      to={navlink?.to}
    >
      <li className="font-medium">{navlink.name}</li>
    </Link>
  );
};
