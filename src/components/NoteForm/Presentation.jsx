import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NotesActions } from '../NotesActions';

export const NoteFormPresentation = ({
  handleDescriptionChange,
  handleTitleChange,
  saveNote,
  description,
  noteFormDescriptionRef,
  noteFormTitleRef,
  handleKeyDown,
  notesActions,
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
      <div className="w-[400px] sm:w-[600px] max-[450px]:w-[300px] m-auto mt-4 rounded shadow-lg p-3 border relative z-30 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4">
          <input
            ref={noteFormTitleRef}
            onChange={(e) => handleTitleChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            className="h-5 focus:outline-none font-medium text-base"
            placeholder="Title"
          />
          <input
            ref={noteFormDescriptionRef}
            onChange={(e) => handleDescriptionChange(e)}
            className="h-5 focus:outline-none text-sm"
            type="text"
            value={description}
            placeholder="Take a note..."
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <NotesActions notesActions={notesActions} />
          <button
            onClick={saveNote}
            className="px-6 py-[6px] hover:bg-[--hover-color] rounded text-sm"
          >
            Close
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};
