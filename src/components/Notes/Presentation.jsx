import { Outlet } from 'react-router-dom';
import { NoteCard } from './components/noteCard';

export const NotesPresentation = ({
  data,
  isLoading,
  notesActions,
  handleActions,
}) => {
  let noteSection;

  if (isLoading) {
    noteSection = <h1 className="mt-4 text-center">Loading.....</h1>;
  } else {
    noteSection = data?.notes?.map((note) => {
      return (
        <NoteCard
          note={note}
          key={note._id}
          notesActions={notesActions}
          handleActions={handleActions}
        />
      );
    });
  }

  return (
    <div className="mt-12">
      {data?.notes.length === 0 && (
        <h2 className="text-center">Write down your thoughts!</h2>
      )}
      {noteSection}
      <Outlet />
    </div>
  );
};
