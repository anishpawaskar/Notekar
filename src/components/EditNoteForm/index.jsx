import { useState, useRef, useEffect } from 'react';
import { EditNoteFormPresentation } from './Presentation';
import { useParams } from 'react-router-dom';
import {
  useDeleteNoteMutation,
  useGetNoteQuery,
  useUpdateNoteMutation,
} from '../../app/services/api';
import { NOTES_EDIT_FORM_ACTIONS } from '../NotesActions/NotesActionsConstants';

export const EditNoteForm = () => {
  const { noteId } = useParams();
  const { data, isLoading } = useGetNoteQuery(noteId);
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const noteFormTitleRef = useRef(null);
  const noteFormDescriptionRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      noteFormDescriptionRef.current.focus();
    }
  };

  const saveNote = async () => {
    const title = noteFormTitleRef.current.value;
    const description = noteFormDescriptionRef.current.value;
    try {
      if (title || description) {
        updateNote({
          noteId,
          body: {
            title,
            description,
            states: {
              isDeleted: false,
            },
          },
        }).unwrap();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleActions = async (action) => {
    switch (action) {
      case 'delete': {
        await deleteNote(noteId).unwrap();
      }

      default:
        return action;
    }
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
    />
  );
};
