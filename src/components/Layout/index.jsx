import { EditLabels } from '../EditLabels';
import { Filter } from '../Filter';
import { NoteForm } from '../NoteForm/index';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="flex gap-3 justify-center mt-4 px-4">
        <Filter />
        <NoteForm />
      </div>
      <div>
        <EditLabels />
      </div>
      <Outlet />
    </>
  );
};
