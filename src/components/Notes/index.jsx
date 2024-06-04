import { NotesPresentation } from './Presentation';
import { useGetNotesQuery } from '../../app/services/api';
import { NOTES_CARD_ACTIONS } from '../NotesActions/NotesActionsConstants';
import { useLocation } from 'react-router-dom';

export const Notes = () => {
  const location = useLocation();

  const { data, isLoading } = useGetNotesQuery(location.search);

  return (
    <NotesPresentation
      location={location}
      data={data}
      isLoading={isLoading}
      notesActions={NOTES_CARD_ACTIONS}
    />
  );
};
