import { NoteCard } from './components/noteCard';

export const NotesPresentation = ({ notes }) => {
  const notesList = notes.map((note) => {
    return <NoteCard note={note} />;
  });

  return (
    <div className="mt-12">
      {notes.length === 0 && (
        <h2 className="text-center">Write down your thoughts!</h2>
      )}
      {notesList}
    </div>
  );
};
