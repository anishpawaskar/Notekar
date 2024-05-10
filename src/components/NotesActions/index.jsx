import { NOTES_ACTIONS } from './NotesActionsConstants';
import { NotesActionsPresentation } from './Presentation';

export const NotesActions = ({ handleActions }) => {
  return (
    <NotesActionsPresentation
      notesActions={NOTES_ACTIONS}
      handleActions={handleActions}
    />
  );
};
