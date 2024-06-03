import { Outlet } from 'react-router-dom';
import { NotesCard } from './components/NotesCard';
import archiveIcon from './assets/archive-icon.png';

export const NotesPresentation = ({
  location,
  data,
  isLoading,
  notesActions,
}) => {
  let noteSection;

  if (isLoading) {
    noteSection = <h1 className="mt-4 text-center">Loading.....</h1>;
  } else {
    noteSection = data?.notes?.map((note) => {
      return (
        <NotesCard note={note} key={note._id} notesActions={notesActions} />
      );
    });
  }

  console.log(
    location.search === '?archive=true' &&
      data.notes.length === 0 &&
      'Arhice note distil',
  );

  return (
    <div className="mt-12">
      {location.search !== '?archive=true' && data?.notes.length === 0 && (
        <h2 className="text-center">Write down your thoughts!</h2>
      )}
      {location.search === '?archive=true' && data?.notes.length === 0 && (
        <div className="flex flex-col items-center ">
          <img src={archiveIcon} alt="archive-icon" />
          <h2 className="mt-0 text-2xl">Your archived notes appear here</h2>
        </div>
      )}
      {noteSection}
      <Outlet />
    </div>
  );
};
