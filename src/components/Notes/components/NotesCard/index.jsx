import { NotesCardPresentation } from './Presentation';
import {
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '../../../../app/services/api';
import { useState } from 'react';

export const NotesCard = ({ note, notesActions }) => {
  const [bgColor, setBgColor] = useState(null);
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const handleActions = async (e, action) => {
    e.preventDefault();
    switch (action) {
      case 'archive': {
        await updateNote({
          noteId: note._id,
          body: {
            states: {
              isArchived: true,
            },
          },
        }).unwrap();
        break;
      }

      case 'delete': {
        await deleteNote(note._id).unwrap();
        break;
      }
    }
  };
  return (
    <NotesCardPresentation
      note={note}
      notesActions={notesActions}
      handleActions={handleActions}
    />
  );
};
