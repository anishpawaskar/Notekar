import { Link } from 'react-router-dom';
import { NotesActions } from '../../../NotesActions';
import { ColorPalette } from '../../../ColorPalette';

export const NotesCardPresentation = ({
  note,
  notesActions,
  handleActions,
  bgColor,
  isColorPaletteVisible,
  closeColorPalette,
  colorHandler,
}) => {
  return (
    <>
      {isColorPaletteVisible && (
        <div
          onClick={(e) => closeColorPalette(e)}
          className="w-full h-full absolute top-0 left-0 z-10"
        ></div>
      )}
      <Link className="block max-w-[250px] mt-4 mx-auto" to={`/${note._id}`}>
        <div
          style={{
            background: bgColor,
          }}
          className="max-w-[250px] max-h-[300px]  flex flex-col gap-4 mt-4 mx-auto rounded-md p-4 shadow-md border relative"
        >
          {note.title && (
            <p className="font-medium whitespace-pre-wrap break-words max-h-[140px] overflow-hidden">
              {note.title}
            </p>
          )}
          {note.description && (
            <p className="text-lg whitespace-pre-wrap break-words max-h-[140px] overflow-hidden ">
              {note.description}
            </p>
          )}
          {note.title === '' && note.description === '' && (
            <p className="m-0 text-xl">Empty note</p>
          )}
          {isColorPaletteVisible && (
            <div
              onClick={(e) => closeColorPalette(e)}
              className="w-full h-full absolute top-0 left-0 z-10"
            >
              <ColorPalette
                closeColorPalette={closeColorPalette}
                colorHandler={colorHandler}
                usingIn="NotesCard"
              />
            </div>
          )}
          <NotesActions
            notesActions={notesActions}
            handleActions={handleActions}
          />
        </div>
      </Link>
    </>
  );
};
