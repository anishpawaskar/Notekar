import { NotesActionsPresentation } from './Presentation';

export const NotesActions = ({ handleActions, notesActions, imageHandler }) => {
  return (
    <NotesActionsPresentation
      notesActions={notesActions}
      handleActions={handleActions}
      imageHandler={imageHandler}
    />
  );
};
