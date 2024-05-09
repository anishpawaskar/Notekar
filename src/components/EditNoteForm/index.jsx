import { useState, useRef, useEffect } from 'react';
import { EditNoteFormPresentation } from './Presentation';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotes, updateNote } from '../../app/slices/notesSlice';
import { useParams } from 'react-router-dom';
import { useGetNoteQuery } from '../../app/services/api';

export const EditNoteForm = () => {
  const { noteId } = useParams();
  const { data, isLoading } = useGetNoteQuery(noteId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);

  useEffect(() => {
    if (!isLoading && data?.note) {
      setTitle(data.note.title ?? '');
      setDescription(data.note.description ?? '');
    }
  }, [data, isLoading]);

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

  if (isLoading) {
    return <h1 className="mt-4 text-center">Loading....</h1>;
  }

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
