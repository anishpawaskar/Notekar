import { useRef } from 'react';
import { NoteFormModalButton } from './ModalButton';
import { NoteFormPresentation } from './Presentation';
import { useAddNewNoteMutation } from '../../app/services/api';
import { NOTES_FORM_ACTIONS } from '../NotesActions/NotesActionsConstants';
import { fetchIMGUrl } from '../../utils/fetchImageUrl';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleActiveActionModal,
  handleDescriptionChange2,
  handleImage,
  handleLabelsForAddition,
  handleSaveNote,
  showModal,
  showModalOnInput,
} from './noteFormSlice';
import { useNavigate } from 'react-router-dom';

export const NoteForm = () => {
  const {
    isModalOpen,
    formData: {
      description,
      bgColor,
      hoverBackgroundColor,
      imgUrl,
      labelsToAdd,
    },
    activeActionModal,
  } = useSelector((state) => state.noteForm);

  const [addNewNote] = useAddNewNoteMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteFormModalButtonRef = useRef(null);
  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);
  const isNoteArchived = useRef(false);
  const imageFileDataRef = useRef(null);

  let isNoteSaved = false;

  const openModal = () => {
    dispatch(showModal());
  };

  const openModalOnInput = (e) => {
    if (e.target.value !== '') {
      dispatch(showModalOnInput({ description: e.target.value }));
    }
  };

  const handleDescriptionChange = (e) => {
    dispatch(handleDescriptionChange2({ description: e.target.value }));
  };

  const saveNote = async () => {
    const title = noteFormTitleRef.current.value;
    let noteImgUrl = '';
    const labels = labelsToAdd.map((label) => label._id);

    try {
      if (!isNoteSaved) {
        isNoteSaved = true;
        if (imageFileDataRef.current) {
          noteImgUrl = await fetchIMGUrl(imageFileDataRef.current);
        }
        if (title || description || imageFileDataRef.current) {
          await addNewNote({
            title,
            description,
            theme: {
              backgroundColor: bgColor,
              hoverBackgroundColor: hoverBackgroundColor,
            },
            imageUrl: noteImgUrl,
            states: { isArchived: isNoteArchived.current },
            labels,
          }).unwrap();
          noteFormTitleRef.current.value = '';
          noteFormDescriptionRef.current.value = '';
          imageFileDataRef.current = null;
          dispatch(handleSaveNote());
          navigate('/notes');
        }
        dispatch(handleSaveNote());
        imageFileDataRef.current = null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      noteFormDescriptionRef.current.focus();
    }
  };

  const handleActions = async (e, action) => {
    switch (action) {
      case 'archive': {
        const title = noteFormTitleRef.current.value;

        if (title || description) {
          isNoteArchived.current = true;
          await saveNote();
          break;
        }
      }

      case 'changeBackground': {
        dispatch(
          handleActiveActionModal({
            activeActionModal:
              activeActionModal === 'labels'
                ? 'colorPalette'
                : activeActionModal
                  ? null
                  : 'colorPalette',
          }),
        );
        break;
      }

      case 'addLabel': {
        dispatch(
          handleActiveActionModal({
            activeActionModal:
              activeActionModal === 'colorPalette'
                ? 'labels'
                : activeActionModal
                  ? null
                  : 'labels',
          }),
        );
        break;
      }
    }
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    imageFileDataRef.current = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      dispatch(handleImage({ imageUrl: reader.result }));
    };

    e.target.value = null;
  };

  const handleRemoveLabel = (labelId) => {
    const newLabelsToAdd = labelsToAdd.filter((label) => label._id !== labelId);
    dispatch(handleLabelsForAddition({ labels: newLabelsToAdd }));
    dispatch(handleActiveActionModal({ activeActionModal: null }));
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
      description={description}
      imgUrl={imgUrl}
      bgColor={bgColor}
      hoverBackgroundColor={hoverBackgroundColor}
      labelsToAdd={labelsToAdd}
      notesActions={NOTES_FORM_ACTIONS}
      activeActionModal={activeActionModal}
      handleDescriptionChange={handleDescriptionChange}
      noteFormTitleRef={noteFormTitleRef}
      saveNote={saveNote}
      noteFormDescriptionRef={noteFormDescriptionRef}
      handleKeyDown={handleKeyDown}
      handleActions={handleActions}
      imageHandler={imageHandler}
      imageFileDataRef={imageFileDataRef}
      handleRemoveLabel={handleRemoveLabel}
    />
  );
};
