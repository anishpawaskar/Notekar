import { NotesPresentation } from './Presentation';
import {
  useDeleteNoteMutation,
  useGetNotesQuery,
  useUpdateNoteMutation,
} from '../../app/services/api';
import { NOTES_CARD_ACTIONS } from '../NotesActions/NotesActionsConstants';

export const Notes = () => {
  const { data, isLoading } = useGetNotesQuery();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const handleActions = async (e, action, noteId) => {
    e.preventDefault();
    switch (action) {
      case 'archive': {
        await updateNote({
          noteId,
          body: {
            states: {
              isArchived: true,
            },
          },
        }).unwrap();
        break;
      }

      case 'delete': {
        await deleteNote(noteId).unwrap();
        break;
      }
    }
  };
  return (
    <NotesPresentation
      data={data}
      isLoading={isLoading}
      notesActions={NOTES_CARD_ACTIONS}
      handleActions={handleActions}
    />
  );
};
