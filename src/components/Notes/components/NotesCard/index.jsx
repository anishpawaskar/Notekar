import { NotesCardPresentation } from './Presentation';
import {
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '../../../../app/services/api';
import { useEffect, useState } from 'react';

export const NotesCard = ({ note, notesActions }) => {
  const [bgColor, setBgColor] = useState(null);
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);

  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  useEffect(() => {
    setBgColor(note.theme.backgroundColor);
  }, [note.theme.backgroundColor]);

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
    setBgColor(color);
    await updateNote({
      noteId: note._id,
      body: {
        theme: {
          backgroundColor: color,
          hoverBackgroundColor: hoverBgColor,
        },
      },
    });
  };
  return (
    <NotesCardPresentation
      note={note}
      notesActions={notesActions}
      handleActions={handleActions}
      bgColor={bgColor}
      isColorPaletteVisible={isColorPaletteVisible}
      closeColorPalette={closeColorPalette}
      colorHandler={colorHandler}
    />
  );
};
