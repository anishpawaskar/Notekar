import { useRef, useState } from 'react';
import { NoteFormModalButton } from './ModalButton';
import { NoteFormPresentation } from './Presentation';
import { useAddNewNoteMutation } from '../../app/services/api';

export const NoteForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [addNewNote] = useAddNewNoteMutation();

  const noteFormModalButtonRef = useRef(null);
  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);

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
          states: { isDeleted: false },
        }).unwrap();
        setTitle('');
        setDescription('');
        setIsModalOpen(false);
        noteFormDescriptionRef.current.value = '';
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      noteFormDescriptionRef.current.focus();
    }
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
    />
  );
};
