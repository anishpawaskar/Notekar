import { useState, useRef } from 'react';
import { EditNoteFormPresentation } from './Presentation';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotes, updateNote } from '../../app/slices/notesSlice';
import { useParams } from 'react-router-dom';

export const EditNoteForm = () => {
  const { noteId } = useParams();
  const notes = useSelector(selectNotes);
  const note = notes.find((note) => note.id === noteId);

  const [title, setTitle] = useState(note.title ?? '');
  const [description, setDescription] = useState(note.description ?? '');

  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);

  const dispatch = useDispatch();

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

  const saveNote = () => {
    if (title || description) {
      dispatch(
        updateNote({
          noteId,
          propertyToUpdate: {
            title,
            description,
            states: {
              isDeleted: false,
            },
          },
        }),
      );
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
