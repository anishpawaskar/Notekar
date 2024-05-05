import { useEffect } from 'react';

export const NoteFormPresentation = ({
  handleDescriptionChange,
  handleTitleChange,
  saveNote,
  description,
  noteFormDescriptionRef,
  noteFormTitleRef,
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
      <div className="max-w-[600px] m-auto mt-4 rounded shadow-lg p-3 border relative z-30 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4">
          <input
            ref={noteFormTitleRef}
            onChange={(e) => handleTitleChange(e.target.value)}
            type="text"
            className="h-5 focus:outline-none font-medium text-base"
            placeholder="Title"
          />
          <input
            ref={noteFormDescriptionRef}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="h-5 focus:outline-none text-sm"
            type="text"
            value={description}
            placeholder="Take a note..."
          />
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={saveNote}
            className="px-6 py-[6px] hover:bg-[--hover-color] rounded text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
