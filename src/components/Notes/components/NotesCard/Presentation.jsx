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
  handleRemoveLabel,
}) => {
  return (
    <>
      {isColorPaletteVisible && (
        <div
          onClick={(e) => closeColorPalette(e)}
          className="w-full h-full absolute top-0 left-0 z-10"
        ></div>
      )}
      <Link
        className="block w-[400px] sm:w-[600px] max-[450px]:w-[300px] mt-4 mx-auto"
        to={`/${note._id}`}
      >
        <div
          style={{
            background: bgColor,
          }}
          className="w-full max-h-[300px]  flex flex-col gap-4 mt-4 mx-auto rounded-md shadow-md border relative"
        >
          {note.imageUrl && (
            <div>
              <img
                className="w-full object-contain rounded-t-md"
                src={note.imageUrl}
                alt="note-img"
              />
            </div>
          )}
          {!note.title && !note.description && !note.imageUrl && (
            <p className="m-0 text-xl">Empty note</p>
          )}
          {note.title && (
            <p
              className={`font-medium whitespace-pre-wrap break-words max-h-[140px] overflow-hidden px-4 ${note.imageUrl ? 'pt-0' : 'pt-4'}`}
            >
              {note.title}
            </p>
          )}
          {note.description && (
            <p
              className={`text-lg whitespace-pre-wrap break-words max-h-[140px] overflow-hidden px-4 ${note.imageUrl ? 'pt-0' : 'pt-4'}`}
            >
              {note.description}
            </p>
          )}
          {note.labels.length > 0 && (
            <ul className="px-4 flex gap-2">
              {note.labels.slice(0, 3).map((label) => {
                return (
                  <li
                    className="m-0 text-xs bg-[#EBEBEB] px-3 py-1 rounded-xl relative z-50 group"
                    key={label._id}
                    onClick={(e) => e.preventDefault()}
                  >
                    {label.name}
                    <button
                      onClick={(e) => handleRemoveLabel(e, note._id, label._id)}
                      className="hidden w-4 h-4 absolute right-[-5px] top-[-6px] bg-black text-white text-sm items-center justify-center rounded-full group-hover:flex"
                    >
                      x
                    </button>
                  </li>
                );
              })}
              {note.labels.length > 3 && (
                <li className="m-0 text-xs bg-[#EBEBEB] px-3 py-1">
                  +{note.labels.length - 3}
                </li>
              )}
            </ul>
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
          <div className="px-4 pb-4">
            <NotesActions
              notesActions={notesActions}
              handleActions={handleActions}
            />
          </div>
        </div>
      </Link>
    </>
  );
};
