import { useRef, useState } from 'react';
import { NoteFormModalButton } from './ModalButton';
import { NoteFormPresentation } from './Presentation';
import { useDispatch } from 'react-redux';
import { addNote } from '../../app/slices/notesSlice';

export const NoteForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

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

  const saveNote = () => {
    if (title || description) {
      // fetch('http://localhost:3000/notes', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     title: title,
      //     description: description,
      //     states: {
      //       isDeleted: false,
      //     },
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((d) => {
      //     console.log('response from server', d);
      //   });
      dispatch(
        addNote({
          title,
          description,
          states: {
            isDeleted: false,
          },
        }),
      );
      console.log(notes);
      setIsModalOpen(false);
      setDescription('');
      noteFormDescriptionRef.current.value = '';
    }
    setIsModalOpen(false);
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
    />
  );
};
