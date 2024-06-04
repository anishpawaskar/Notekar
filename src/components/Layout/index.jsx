import { Filter } from '../Filter';
import { Navbar } from '../Navbar';
import { NoteForm } from '../NoteForm/index';
import { Outlet, useLocation } from 'react-router-dom';

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {location.search !== '?archive=true' && (
        <div className="flex gap-3 justify-center mt-4 px-4">
          <Filter />
          <NoteForm />
        </div>
      )}
      <Outlet />
    </>
  );
};
