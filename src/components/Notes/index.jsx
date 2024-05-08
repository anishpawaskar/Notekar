import { useDispatch, useSelector } from 'react-redux';
import { NotesPresentation } from './Presentation';
import { selectNotes, updateNote } from '../../app/slices/notesSlice';
import { useState } from 'react';

export const Notes = () => {
  const notes = useSelector(selectNotes);

  return <NotesPresentation notes={notes} />;
};
