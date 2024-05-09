import { NotesPresentation } from './Presentation';
import { useGetNotesQuery } from '../../app/services/api';

export const Notes = () => {
  const { data, isLoading } = useGetNotesQuery();
  return <NotesPresentation data={data} isLoading={isLoading} />;
};
