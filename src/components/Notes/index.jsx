import { NotesPresentation } from './Presentation';
import { useGetNotesQuery } from '../../app/services/api';
import { NOTES_CARD_ACTIONS } from '../NotesActions/NotesActionsConstants';

export const Notes = () => {
  const { data, isLoading } = useGetNotesQuery();

  return (
    <NotesPresentation
      data={data}
      isLoading={isLoading}
      notesActions={NOTES_CARD_ACTIONS}
    />
  );
};
