import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NotesActions } from '../NotesActions';
import { ColorPalette } from '../ColorPalette';

export const NoteFormPresentation = ({
  handleDescriptionChange,
  handleTitleChange,
  saveNote,
  description,
  noteFormDescriptionRef,
  noteFormTitleRef,
  handleKeyDown,
  notesActions,
  handleActions,
  isColorPaletteVisible,
  closeColorPalette,
  bgColor,
  colorHandler,
}) => {
  useEffect(() => {
    noteFormDescriptionRef.current.focus();
  }, []);

  return (
    <>
      <div
        onClick={saveNote}
        className="w-full h-full absolute top-0 left-0 z-10"
      />
      <div
        style={{ background: bgColor }}
        className="w-[400px] sm:w-[600px] max-[450px]:w-[300px] m-auto mt-4 rounded-lg shadow-lg p-3 border relative z-30 flex flex-col gap-4 transition-all ease-in duration-500"
      >
        <div className="w-full flex flex-col gap-4">
          <input
            ref={noteFormTitleRef}
            onChange={(e) => handleTitleChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            className="h-5 focus:outline-none font-medium text-base placeholder:text-black bg-transparent"
            placeholder="Title"
          />
          <input
            ref={noteFormDescriptionRef}
            onChange={(e) => handleDescriptionChange(e)}
            className="h-5 focus:outline-none text-sm placeholder:text-black bg-transparent"
            type="text"
            value={description}
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
            notesActions={notesActions}
            handleActions={handleActions}
          />
          <button
            onClick={saveNote}
            className="px-6 py-[6px] hover:bg-[--hover-color] rounded text-sm relative z-20"
          >
            Close
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};
