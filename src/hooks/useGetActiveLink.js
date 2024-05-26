import { useLocation } from 'react-router-dom';

export const useGetActiveLink = () => {
  const location = useLocation();
  let activeLink;

  if (location.pathname === '/' && location.search === '') {
    activeLink = 'Notes';
  } else if (location.search === '?archive=true') {
    activeLink = 'Archive';
  } else {
    const label = location?.search?.split('=')[1]?.split('%20')?.join(' ');
    activeLink = label;
  }

  return [activeLink];
};
