import { useRef, useState } from 'react';
import { NoteFormModalButton } from './ModalButton';
import { NoteFormPresentation } from './Presentation';
import { useAddNewNoteMutation } from '../../app/services/api';
import { NOTES_FORM_ACTIONS } from '../NotesActions/NotesActionsConstants';
import { fetchIMGUrl } from '../../utils/fetchImageUrl';

export const NoteForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);
  const [bgColor, setBgColor] = useState('#fff');
  const [hoverBackgroundColor, setHoverBackgroundColor] = useState('#e0e0e0');
  const [imgUrl, setImgUrl] = useState(null);
  const [isImgDeleteBtnVisible, setIsImgDeleteBtnVisible] = useState(false);
  const [labelsToAdd, setLabelsToAdd] = useState([]);
  const [isLabelsVisible, setIsLabelsVisible] = useState(false);

  const [addNewNote] = useAddNewNoteMutation();

  const noteFormModalButtonRef = useRef(null);
  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);
  const isNoteArchived = useRef(false);
  const imageFileDataRef = useRef(null);

  let isNoteSaved = false;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalOnInput = (e) => {
    if (e.target.value !== '') {
      setIsModalOpen(true);
      setDescription(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
          setDescription('');
          noteFormDescriptionRef.current.value = '';
          setBgColor('#fff');
          setHoverBackgroundColor('#e0e0e0');
          setIsColorPaletteVisible(false);
          setIsLabelsVisible(false);
          setLabelsToAdd([]);
          setImgUrl(null);
          imageFileDataRef.current = null;
          setIsModalOpen(false);
        }
        setBgColor('#fff');
        setHoverBackgroundColor('#e0e0e0');
        setImgUrl(null);
        imageFileDataRef.current = null;
        setLabelsToAdd([]);
        setIsModalOpen(false);
        setIsColorPaletteVisible(false);
        setIsLabelsVisible(false);
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
        if (title || description) {
          isNoteArchived.current = true;
          await saveNote();
          break;
        }
      }

      case 'changeBackground': {
        setIsColorPaletteVisible(true);
        break;
      }

      case 'addLabel': {
        setIsLabelsVisible(true);
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

  const handleLabel = (label, labelCheckboxRef) => {
    const labelId = label._id;

    labelCheckboxRef.current.checked = !labelCheckboxRef.current.checked;
    const isLabelAlreadyAdded = labelsToAdd.find(
      (label) => label._id === labelId,
    );

    if (isLabelAlreadyAdded) {
      const newLabelsToAdd = labelsToAdd.filter(
        (label) => label._id !== labelId,
      );
      setLabelsToAdd(newLabelsToAdd);
    } else {
      setLabelsToAdd([...labelsToAdd, label]);
    }
  };

  const handleRemoveLabel = (labelId) => {
    const newLabelsToAdd = labelsToAdd.filter((label) => label._id !== labelId);
    setLabelsToAdd(newLabelsToAdd);
    setIsLabelsVisible(false);
  };

  const closeLabels = () => {
    setIsLabelsVisible(false);
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
      isColorPaletteVisible={isColorPaletteVisible}
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
      handleLabel={handleLabel}
      labelsToAdd={labelsToAdd}
      handleRemoveLabel={handleRemoveLabel}
      isLabelsVisible={isLabelsVisible}
      closeLabels={closeLabels}
    />
  );
};
