import { ColorPalettePresentation } from './Presentation';
import { COLORS } from './ColorPaletteConstants';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleActiveActionModal,
  handleColor,
  setNoteId,
} from '../NoteForm/noteFormSlice';
import { useUpdateNoteMutation } from '../../app/services/api';

export const ColorPalette = ({ usingIn }) => {
  const [updateNote] = useUpdateNoteMutation();

  const { noteId } = useSelector((state) => state.noteForm);
  const dispatch = useDispatch();

  const colorHandler = async (color, hoverBgColor) => {
    if (usingIn === 'NotesCard') {
      await updateNote({
        noteId: noteId,
        body: {
          theme: {
            backgroundColor: color,
            hoverBackgroundColor: hoverBgColor,
          },
        },
      }).unwrap();
      dispatch(setNoteId({ noteId: null }));
    } else {
      dispatch(
        handleColor({ bgColor: color, hoverBackgroundColor: hoverBgColor }),
      );
    }
  };

  const closeColorPalette = () => {
    dispatch(handleActiveActionModal({ activeActionModal: null }));
    dispatch(setNoteId({ noteId: null }));
  };

  return (
    <ColorPalettePresentation
      colors={COLORS}
      closeColorPalette={closeColorPalette}
      colorHandler={colorHandler}
      usingIn={usingIn}
    />
  );
};
