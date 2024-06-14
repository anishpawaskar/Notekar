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
import { useDispatch, useSelector } from 'react-redux';
import {
  handleActiveActionModal,
  handleColor,
  handleImage,
  handleLabelsForAddition,
  handleSaveNote,
} from '../NoteForm/noteFormSlice';

export const EditNoteForm = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetNoteQuery(noteId);
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const {
    formData: { bgColor, hoverBackgroundColor, imgUrl, labelsToAdd },
    activeActionModal,
  } = useSelector((state) => state.noteForm);

  const dispatch = useDispatch();

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
      dispatch(handleLabelsForAddition({ labels: data.note?.labels }));
      if (data.note?.imageUrl) {
        dispatch(handleImage({ imageUrl: data.note?.imageUrl }));
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
    const uniqueLablesToAdd = labelsToAdd.filter((label) => {
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
        navigate(-1);
        break;
      }

      case 'addLabel': {
        e.preventDefault();
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
    const newNoteLabels = labelsToAdd.filter((label) => label._id !== labelId);
    dispatch(handleLabelsForAddition({ labels: newNoteLabels }));
    dispatch(handleActiveActionModal({ activeActionModal: null }));
    const labelToDelete = data.note?.labels.find(
      (label) => label._id === labelId,
    );

    if (labelToDelete) {
      labelsToDeleteRef.current.push(labelId);
      console.log('labels', labelsToDeleteRef);
    }
  };

  if (isLoading) {
    return <h1 className="mt-4 text-center">Loading....</h1>;
  }

  return (
    <EditNoteFormPresentation
      title={data?.note?.title ?? ''}
      description={data?.note?.description ?? ''}
      imgUrl={imgUrl}
      bgColor={bgColor}
      hoverBackgroundColor={hoverBackgroundColor}
      labelsToAdd={labelsToAdd}
      notesActions={NOTES_EDIT_FORM_ACTIONS}
      activeActionModal={activeActionModal}
      handleKeyDown={handleKeyDown}
      saveNote={saveNote}
      noteFormTitleRef={noteFormTitleRef}
      noteFormDescriptionRef={noteFormDescriptionRef}
      handleActions={handleActions}
      imageFileDataRef={imageFileDataRef}
      imageHandler={imageHandler}
      labelsToDeleteRef={labelsToDeleteRef}
      handleRemoveLabel={handleRemoveLabel}
    />
  );
};
