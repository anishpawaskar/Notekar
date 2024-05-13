import { Link } from 'react-router-dom';
import { NotesActions } from '../NotesActions';
import { ColorPalette } from '../ColorPalette';

export const EditNoteFormPresentation = ({
  handleKeyDown,
  saveNote,
  title,
  description,
  noteFormTitleRef,
  noteFormDescriptionRef,
  handleActions,
  notesActions,
  bgColor,
  hoverBackgroundColor,
  isColorPaletteVisible,
  closeColorPalette,
  colorHandler,
}) => {
  return (
    <>
      <Link to="/">
        <div
          onClick={saveNote}
          className="w-full h-full absolute top-0 left-0 z-10 bg-[#79797B] opacity-[0.6]"
        />
      </Link>
      <div
        style={{ background: bgColor, borderColor: bgColor }}
        className="w-[400px] sm:w-[600px] max-[450px]:w-[300px] absolute left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%]  mt-4 rounded shadow-lg p-3 border z-30 flex flex-col gap-4"
      >
        <div className="w-full flex flex-col gap-4">
          <input
            defaultValue={title}
            ref={noteFormTitleRef}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            className="h-5 focus:outline-none text-black placeholder:text-black bg-transparent text-md"
            placeholder="Title"
          />
          <input
            defaultValue={description}
            ref={noteFormDescriptionRef}
            className="h-5 focus:outline-none text-black placeholder:text-black text-sm bg-transparent"
            type="text"
            placeholder="Take a note..."
          />
        </div>
        {isColorPaletteVisible && (
          <ColorPalette
            closeColorPalette={closeColorPalette}
            colorHandler={colorHandler}
          />
        )}
        <div className="w-full flex justify-between items-center">
          <NotesActions
            handleActions={handleActions}
            notesActions={notesActions}
          />
          <Link to="/">
            <button
              onClick={saveNote}
              className={`px-6 py-[6px] hover:bg-[${hoverBackgroundColor}] rounded text-sm relative z-20`}
            >
              Close
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
