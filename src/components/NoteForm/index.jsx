import { useRef, useState } from 'react';
import { NoteFormModalButton } from './ModalButton';

export const NoteForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const noteFormModalButtonRef = useRef(null);
  console.log(description);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalOnInput = (e) => {
    if (e.target.value !== '') {
      setIsModalOpen(true);
      setDescription(e.target.value);
    }
  };

  return (
    <NoteFormModalButton
      noteFormModalButtonRef={noteFormModalButtonRef}
      openModal={openModal}
      openModalOnInput={openModalOnInput}
    />
  );
};
