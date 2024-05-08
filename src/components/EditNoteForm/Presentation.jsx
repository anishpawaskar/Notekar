export const EditNoteFormPresentation = ({
  handleTitleChange,
  handleKeyDown,
  handleDescriptionChange,
  saveNote,
  title,
  description,
  noteFormTitleRef,
  noteFormDescriptionRef,
}) => {
  return (
    <>
      <div
        onClick={() => saveNote(title, description)}
        className="w-full h-full absolute top-0 left-0 z-10 bg-[#79797B] opacity-[0.6]"
      />
      <div className="w-[400px] sm:w-[600px] max-[450px]:w-[300px] absolute left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%]  mt-4 rounded shadow-lg p-3 border z-30 flex flex-col gap-4 bg-white">
        <div className="w-full flex flex-col gap-4">
          <input
            ref={noteFormTitleRef}
            onChange={(e) => handleTitleChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            className="h-5 focus:outline-none font-medium text-base"
            value={title}
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
        <div className="w-full flex justify-end">
          <button
            onClick={() => saveNote(title, description)}
            className="px-6 py-[6px] hover:bg-[--hover-color] rounded text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
