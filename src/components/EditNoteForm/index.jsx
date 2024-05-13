import { useState, useRef, useEffect } from 'react';
import { EditNoteFormPresentation } from './Presentation';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteNoteMutation,
  useGetNoteQuery,
  useUpdateNoteMutation,
} from '../../app/services/api';
import { NOTES_EDIT_FORM_ACTIONS } from '../NotesActions/NotesActionsConstants';
import { fetchIMGUrl } from '../../utils/fetchImageUrl';

export const EditNoteForm = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetNoteQuery(noteId);
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const [bgColor, setBgColor] = useState('');
  const [hoverBackgroundColor, setHoverBackgroundColor] = useState('');
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [isImgDeleteBtnVisible, setIsImgDeleteBtnVisible] = useState(false);

  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);
  const isNoteArchived = useRef(false);
  const imageFileDataRef = useRef(null);

  useEffect(() => {
    if (!isLoading && data?.note) {
      setBgColor(data.note?.theme?.backgroundColor);
      setHoverBackgroundColor(data.note?.theme?.hoverBackgroundColor);
      if (data.note?.imageUrl) {
        setImgUrl(data.note?.imageUrl);
        imageFileDataRef.current = data.note?.imageUrl;
        console.log('from effect', imageFileDataRef);
      }
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
    let noteImgUrl = '';
    if (imageFileDataRef.current) {
      noteImgUrl = await fetchIMGUrl(imageFileDataRef.current);
    }
    try {
      await updateNote({
        noteId,
        body: {
          title,
          description,
          imageUrl: noteImgUrl,
          theme: {
            backgroundColor: bgColor,
            hoverBackgroundColor: hoverBackgroundColor,
          },
          states: {
            isArchived: isNoteArchived.current,
          },
        },
      }).unwrap();
      navigate('/');
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

      case 'archive': {
        isNoteArchived.current = true;
        await saveNote();
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

  const imageHandler = (e) => {
    const file = e.target.files[0];
    imageFileDataRef.current = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgUrl(reader.result);
    };

    e.target.value = null;
  };

  const handleMouseEnter = () => {
    setIsImgDeleteBtnVisible(true);
  };

  const handleMouseLeave = () => {
    setIsImgDeleteBtnVisible(false);
  };

  const imageDeleteHandler = () => {
    setImgUrl(null);
    imageFileDataRef.current = null;
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
      imgUrl={imgUrl}
      isImgDeleteBtnVisible={isImgDeleteBtnVisible}
      imageHandler={imageHandler}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      imageDeleteHandler={imageDeleteHandler}
    />
  );
};
