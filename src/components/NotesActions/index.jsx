import { NotesActionsPresentation } from './Presentation';

export const NotesActions = ({ handleActions, notesActions }) => {
  return (
    <NotesActionsPresentation
      notesActions={notesActions}
      handleActions={handleActions}
    />
  );
};
