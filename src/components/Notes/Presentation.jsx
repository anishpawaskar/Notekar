import { EditNoteForm } from '../EditNoteForm';
import { NoteCard } from './components/NoteCard';

export const NotesPresentation = ({ notes, noteId, noteHandler, saveNote }) => {
  const notesList = notes.map((note) => {
    return <NoteCard note={note} key={note.id} noteHandler={noteHandler} />;
  });

  return (
    <div className="mt-12">
      {notes.length === 0 && (
        <h2 className="text-center">Write down your thoughts!</h2>
      )}
      {notesList}
      {noteId && <EditNoteForm noteId={noteId} saveNote={saveNote} />}
    </div>
  );
};
