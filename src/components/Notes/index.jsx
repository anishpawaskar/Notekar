import { useSelector } from 'react-redux';
import { NotesPresentation } from './Presentation';
import { selectNotes } from '../../app/slices/notesSlice';

export const Notes = () => {
  const notes = useSelector(selectNotes);

  return <NotesPresentation notes={notes} />;
};
