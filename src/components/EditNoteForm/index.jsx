import { useState, useRef } from 'react';
import { EditNoteFormPresentation } from './Presentation';
import { useSelector } from 'react-redux';
import { selectNotes } from '../../app/slices/notesSlice';

export const EditNoteForm = ({ noteId, saveNote }) => {
  const notes = useSelector(selectNotes);
  const note = notes.find((note) => note.id === noteId);

  const [title, setTitle] = useState(note.title ?? '');
  const [description, setDescription] = useState(note.description ?? '');

  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      noteFormDescriptionRef.current.focus();
    }
  };

  return (
    <EditNoteFormPresentation
      handleTitleChange={handleTitleChange}
      handleKeyDown={handleKeyDown}
      handleDescriptionChange={handleDescriptionChange}
      saveNote={saveNote}
      title={title}
      description={description}
      noteFormTitleRef={noteFormTitleRef}
      noteFormDescriptionRef={noteFormDescriptionRef}
    />
  );
};
