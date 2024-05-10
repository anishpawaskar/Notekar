import { useRef, useState } from 'react';
import { NoteFormModalButton } from './ModalButton';
import { NoteFormPresentation } from './Presentation';
import { useAddNewNoteMutation } from '../../app/services/api';
import { NOTES_FORM_ACTIONS } from '../NotesActions/NotesActionsConstants';

export const NoteForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);
  const [bgColor, setBgColor] = useState('#fff');

  const [addNewNote] = useAddNewNoteMutation();

  const noteFormModalButtonRef = useRef(null);
  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);
  const isNoteArchived = useRef(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalOnInput = (e) => {
    if (e.target.value !== '') {
      setIsModalOpen(true);
      setDescription(e.target.value);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const saveNote = async () => {
    try {
      if (title || description) {
        await addNewNote({
          title,
          description,
          states: { isArchived: isNoteArchived.current },
        }).unwrap();
        setTitle('');
        setDescription('');
        noteFormDescriptionRef.current.value = '';
        setBgColor('#fff');
        setIsColorPaletteVisible(false);
        setIsModalOpen(false);
      }
      setBgColor('#fff');
      setIsModalOpen(false);
      setIsColorPaletteVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      noteFormDescriptionRef.current.focus();
    }
  };

  const handleActions = async (action) => {
    switch (action) {
      case 'archive': {
        if (title || description) {
          isNoteArchived.current = true;
          await saveNote();
        }
      }

      case 'changeBackground': {
        setIsColorPaletteVisible(true);
      }
    }
  };

  const closeColorPalette = () => {
    setIsColorPaletteVisible(false);
  };

  const colorHandler = (color) => {
    setBgColor(color);
  };

  if (!isModalOpen) {
    return (
      <NoteFormModalButton
        noteFormModalButtonRef={noteFormModalButtonRef}
        openModal={openModal}
        openModalOnInput={openModalOnInput}
      />
    );
  }

  return (
    <NoteFormPresentation
      handleDescriptionChange={handleDescriptionChange}
      handleTitleChange={handleTitleChange}
      saveNote={saveNote}
      description={description}
      noteFormTitleRef={noteFormTitleRef}
      noteFormDescriptionRef={noteFormDescriptionRef}
      handleKeyDown={handleKeyDown}
      notesActions={NOTES_FORM_ACTIONS}
      handleActions={handleActions}
      isColorPaletteVisible={isColorPaletteVisible}
      closeColorPalette={closeColorPalette}
      bgColor={bgColor}
      colorHandler={colorHandler}
    />
  );
};
