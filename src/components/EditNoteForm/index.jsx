import { useState, useRef, useEffect } from 'react';
import { EditNoteFormPresentation } from './Presentation';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteNoteMutation,
  useGetLabelsQuery,
  useGetNoteQuery,
  useUpdateNoteMutation,
} from '../../app/services/api';
import { NOTES_EDIT_FORM_ACTIONS } from '../NotesActions/NotesActionsConstants';
import { fetchIMGUrl } from '../../utils/fetchImageUrl';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleActiveActionModal,
  handleColor,
  handleSaveNote,
} from '../NoteForm/noteFormSlice';

export const EditNoteForm = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetNoteQuery(noteId);
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const {
    formData: { bgColor, hoverBackgroundColor },
    activeActionModal,
  } = useSelector((state) => state.noteForm);

  const dispatch = useDispatch();

  const [imgUrl, setImgUrl] = useState(null);
  const [isImgDeleteBtnVisible, setIsImgDeleteBtnVisible] = useState(false);
  const [noteLabels, setNoteLabels] = useState([]);
  const [isLabelsVisible, setIsLabelsVisible] = useState(false);

  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);
  const isNoteArchived = useRef(null);
  const imageFileDataRef = useRef(null);
  const labelsToDeleteRef = useRef([]);

  let isNoteSaved = false;

  useEffect(() => {
    if (!isLoading && data?.note) {
      dispatch(
        handleColor({
          bgColor: data.note?.theme?.backgroundColor,
          hoverBackgroundColor: data.note?.theme?.hoverBackgroundColor,
        }),
      );
      setNoteLabels(data.note?.labels);
      if (data.note?.imageUrl) {
        setImgUrl(data.note?.imageUrl);
        imageFileDataRef.current = data.note?.imageUrl;
      }
      isNoteArchived.current = data.note.states.isArchived;
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
    const uniqueLablesToAdd = noteLabels.filter((label) => {
      return !data.note.labels.some((noteLabel) => label._id === noteLabel._id);
    });
    const labels = uniqueLablesToAdd.map((label) => label._id);

    try {
      if (!isNoteSaved) {
        isNoteSaved = true;
        if (imageFileDataRef.current) {
          noteImgUrl = await fetchIMGUrl(imageFileDataRef.current);
        }
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
            labelsToAdd: labels,
            labelsToDelete: labelsToDeleteRef.current,
          },
        }).unwrap();
        dispatch(handleSaveNote());
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleActions = async (e, action) => {
    switch (action) {
      case 'changeBackground': {
        e.preventDefault();
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

      case 'archive': {
        isNoteArchived.current = isNoteArchived.current ? false : true;
        await saveNote();
        break;
      }

      case 'delete': {
        await deleteNote(noteId).unwrap();
        navigate('/notes');
        break;
      }

      case 'addLabel': {
        e.preventDefault();
        setIsLabelsVisible(true);
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
    const isLabelAlreadyAdded = noteLabels.find(
      (label) => label._id === labelId,
    );

    const labelToDelete = data.note.labels.find(
      (label) => label._id === labelId,
    );

    if (labelToDelete) {
      labelsToDeleteRef.current.push(labelId);
    }

    if (isLabelAlreadyAdded) {
      const newNoteLabels = noteLabels.filter((label) => label._id !== labelId);
      setNoteLabels(newNoteLabels);
    } else {
      setNoteLabels([...noteLabels, label]);
    }
  };

  const handleRemoveLabel = (labelId) => {
    const newNoteLabels = noteLabels.filter((label) => label._id !== labelId);
    setNoteLabels(newNoteLabels);
    setIsLabelsVisible(false);
    const labelToDelete = data.note?.labels.find(
      (label) => label._id === labelId,
    );

    if (labelToDelete) {
      labelsToDeleteRef.current.push(labelId);
    }
  };

  const closeLabels = () => {
    setIsLabelsVisible(false);
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
      activeActionModal={activeActionModal}
      imgUrl={imgUrl}
      isImgDeleteBtnVisible={isImgDeleteBtnVisible}
      imageHandler={imageHandler}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      imageDeleteHandler={imageDeleteHandler}
      noteLabels={noteLabels}
      handleLabel={handleLabel}
      closeLabels={closeLabels}
      isLabelsVisible={isLabelsVisible}
      handleRemoveLabel={handleRemoveLabel}
    />
  );
};
