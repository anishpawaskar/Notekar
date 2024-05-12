import { NotesActionsPresentation } from './Presentation';

export const NotesActions = ({ handleActions, notesActions, noteId }) => {
  return (
    <NotesActionsPresentation
      notesActions={notesActions}
      handleActions={handleActions}
      noteId={noteId}
    />
  );
};
