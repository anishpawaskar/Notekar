import { NotesCardPresentation } from './Presentation';
import {
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '../../../../app/services/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleActiveActionModal,
  setNoteId,
} from '../../../NoteForm/noteFormSlice';

export const NotesCard = ({ note, notesActions }) => {
  const { activeActionModal, noteId } = useSelector((state) => state.noteForm);
  const dispatch = useDispatch();

  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const handleActions = async (e, action) => {
    e.preventDefault();
    switch (action) {
      case 'changeBackground': {
        dispatch(setNoteId({ noteId: note._id }));
        dispatch(
          handleActiveActionModal({
            activeActionModal: activeActionModal ? null : 'colorPalette',
          }),
        );
        break;
      }

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

  const closeColorPalette = (e) => {
    e.preventDefault();
    dispatch(handleActiveActionModal({ activeActionModal: null }));
    dispatch(setNoteId({ noteId: null }));
  };

  const handleRemoveLabel = async (e, noteId, labelId) => {
    e.preventDefault();
    await updateNote({
      noteId,
      body: {
        labelsToDelete: [labelId],
      },
    }).unwrap();
  };

  return (
    <NotesCardPresentation
      note={note}
      noteId={noteId}
      notesActions={notesActions}
      handleActions={handleActions}
      bgColor={note?.theme?.backgroundColor}
      activeActionModal={activeActionModal}
      closeColorPalette={closeColorPalette}
      handleRemoveLabel={handleRemoveLabel}
    />
  );
};
