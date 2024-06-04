import { useRef } from 'react';
import { NoteFormModalButton } from './ModalButton';
import { NoteFormPresentation } from './Presentation';
import { useAddNewNoteMutation } from '../../app/services/api';
import { NOTES_FORM_ACTIONS } from '../NotesActions/NotesActionsConstants';
import { fetchIMGUrl } from '../../utils/fetchImageUrl';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleActiveActionModal,
  handleColor,
  handleDescriptionChange2,
  handleImage,
  handleImageBtnVisibility,
  handleLabelsForAddition,
  handleSaveNote,
  showModal,
  showModalOnInput,
} from './noteFormSlice';

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
    isImgDeleteBtnVisible,
  } = useSelector((state) => state.noteForm);

  const [addNewNote] = useAddNewNoteMutation();

  const dispatch = useDispatch();

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

  const closeColorPalette = () => {
    dispatch(handleActiveActionModal({ activeActionModal: null }));
  };

  const colorHandler = (color, hoverBgColor) => {
    dispatch(
      handleColor({ bgColor: color, hoverBackgroundColor: hoverBgColor }),
    );
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    imageFileDataRef.current = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      dispatch(handleImage({ imageFile: reader.result }));
    };

    e.target.value = null;
  };

  const handleMouseEnter = () => {
    dispatch(handleImageBtnVisibility({ isImgDeleteBtnVisible: true }));
  };

  const handleMouseLeave = () => {
    dispatch(handleImageBtnVisibility({ isImgDeleteBtnVisible: false }));
  };

  const imageDeleteHandler = () => {
    dispatch(handleImage({ imageFile: null }));
    imageFileDataRef.current = null;
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
      handleDescriptionChange={handleDescriptionChange}
      saveNote={saveNote}
      description={description}
      noteFormTitleRef={noteFormTitleRef}
      noteFormDescriptionRef={noteFormDescriptionRef}
      handleKeyDown={handleKeyDown}
      notesActions={NOTES_FORM_ACTIONS}
      handleActions={handleActions}
      closeColorPalette={closeColorPalette}
      bgColor={bgColor}
      hoverBackgroundColor={hoverBackgroundColor}
      colorHandler={colorHandler}
      imageHandler={imageHandler}
      imgUrl={imgUrl}
      isImgDeleteBtnVisible={isImgDeleteBtnVisible}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      imageDeleteHandler={imageDeleteHandler}
      labelsToAdd={labelsToAdd}
      handleRemoveLabel={handleRemoveLabel}
      activeActionModal={activeActionModal}
    />
  );
};
