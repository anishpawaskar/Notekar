import { NotesCardPresentation } from './Presentation';
import {
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '../../../../app/services/api';
import { useState } from 'react';

export const NotesCard = ({ note, notesActions }) => {
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);

  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const handleActions = async (e, action) => {
    e.preventDefault();
    switch (action) {
      case 'changeBackground': {
        setIsColorPaletteVisible(true);
        break;
      }

      case 'archive': {
        await updateNote({
          noteId: note._id,
          body: {
            states: {
              isArchived: true,
            },
          },
        }).unwrap();
        break;
      }

      case 'delete': {
        await deleteNote(note._id).unwrap();
        break;
      }
    }
  };

  const closeColorPalette = (e) => {
    e.preventDefault();
    setIsColorPaletteVisible(false);
  };

  const colorHandler = async (color, hoverBgColor, e) => {
    e.preventDefault();
    await updateNote({
      noteId: note._id,
      body: {
        theme: {
          backgroundColor: color,
          hoverBackgroundColor: hoverBgColor,
        },
      },
    }).unwrap();
  };

  const handleRemoveLabel = async (e, noteId, labelId) => {
    e.preventDefault();
    await updateNote({
      noteId,
      body: {
        labelsToDelete: [labelId],
      },
    }).unwrap();
  };

  return (
    <NotesCardPresentation
      note={note}
      notesActions={notesActions}
      handleActions={handleActions}
      bgColor={note?.theme?.backgroundColor}
      isColorPaletteVisible={isColorPaletteVisible}
      closeColorPalette={closeColorPalette}
      colorHandler={colorHandler}
      handleRemoveLabel={handleRemoveLabel}
    />
  );
};
