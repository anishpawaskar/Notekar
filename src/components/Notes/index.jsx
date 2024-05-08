import { useDispatch, useSelector } from 'react-redux';
import { NotesPresentation } from './Presentation';
import { selectNotes, updateNote } from '../../app/slices/notesSlice';
import { useState } from 'react';

export const Notes = () => {
  const [noteId, setNoteId] = useState(null);
  const notes = useSelector(selectNotes);

  const dispatch = useDispatch();

  const noteHandler = (id) => {
    setNoteId(id);
  };

  const saveNote = (title, description) => {
    if (title || description) {
      dispatch(
        updateNote({
          noteId,
          propertyToUpdate: {
            title,
            description,
            states: {
              isDeleted: false,
            },
          },
        }),
      );
      setNoteId(null);
    } else {
      setNoteId(null);
    }
  };

  return (
    <NotesPresentation
      notes={notes}
      noteId={noteId}
      noteHandler={noteHandler}
      saveNote={saveNote}
    />
  );
};
