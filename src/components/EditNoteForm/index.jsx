import { useState, useRef, useEffect } from 'react';
import { EditNoteFormPresentation } from './Presentation';
import { useParams } from 'react-router-dom';
import {
  useDeleteNoteMutation,
  useGetNoteQuery,
  useUpdateNoteMutation,
} from '../../app/services/api';
import { NOTES_EDIT_FORM_ACTIONS } from '../NotesActions/NotesActionsConstants';

export const EditNoteForm = () => {
  const { noteId } = useParams();
  const { data, isLoading } = useGetNoteQuery(noteId);
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const [bgColor, setBgColor] = useState('');
  const [hoverBackgroundColor, setHoverBackgroundColor] = useState('');
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);

  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);

  useEffect(() => {
    if (!isLoading && data?.note) {
      setBgColor(data.note?.theme?.backgroundColor);
      setHoverBackgroundColor(data.note?.theme?.hoverBackgroundColor);
    }
  }, [data, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      noteFormDescriptionRef.current.focus();
    }
  };

  const saveNote = async () => {
    const title = noteFormTitleRef.current.value;
    const description = noteFormDescriptionRef.current.value;
    try {
      if (title || description) {
        updateNote({
          noteId,
          body: {
            title,
            description,
            theme: {
              backgroundColor: bgColor,
              hoverBackgroundColor: hoverBackgroundColor,
            },
            states: {
              isArchived: false,
            },
          },
        }).unwrap();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleActions = async (e, action) => {
    switch (action) {
      case 'changeBackground': {
        e.preventDefault();
        setIsColorPaletteVisible(true);
        break;
      }

      case 'delete': {
        await deleteNote(noteId).unwrap();
        break;
      }
    }
  };

  const closeColorPalette = () => {
    setIsColorPaletteVisible(false);
  };

  const colorHandler = (color, hoverBgColor) => {
    setBgColor(color);
    setHoverBackgroundColor(hoverBgColor);
  };

  if (isLoading) {
    return <h1 className="mt-4 text-center">Loading....</h1>;
  }

  return (
    <EditNoteFormPresentation
      handleKeyDown={handleKeyDown}
      saveNote={saveNote}
      title={data?.note?.title ?? ''}
      description={data?.note?.description ?? ''}
      noteFormTitleRef={noteFormTitleRef}
      noteFormDescriptionRef={noteFormDescriptionRef}
      handleActions={handleActions}
      notesActions={NOTES_EDIT_FORM_ACTIONS}
      bgColor={bgColor}
      hoverBackgroundColor={hoverBackgroundColor}
      isColorPaletteVisible={isColorPaletteVisible}
      closeColorPalette={closeColorPalette}
      colorHandler={colorHandler}
    />
  );
};
