import { Outlet } from 'react-router-dom';
import { EditNoteForm } from '../EditNoteForm';
import { NoteCard } from './components/NoteCard';

export const NotesPresentation = ({ notes }) => {
  const notesList = notes.map((note) => {
    return <NoteCard note={note} key={note.id} />;
  });

  return (
    <div className="mt-12">
      {notes.length === 0 && (
        <h2 className="text-center">Write down your thoughts!</h2>
      )}
      {notesList}
      <Outlet />
    </div>
  );
};
