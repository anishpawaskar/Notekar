import { NotesActions } from '../NotesActions';
import { ColorPalette } from '../ColorPalette';
import { Labels } from '../Labels/index';
import { NoteImage } from '../NoteImage';

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
  activeActionModal,
  imgUrl,
  imageFileDataRef,
  imageHandler,
  labelsToAdd,
  labelsToDeleteRef,
  handleRemoveLabel,
}) => {
  return (
    <>
      <div
        onClick={saveNote}
        className="w-full h-full absolute top-0 left-0 z-10 bg-[#79797B] opacity-[0.6]"
      />
      <div
        style={{ background: bgColor, borderColor: bgColor }}
        className="w-[400px] sm:w-[600px] max-[450px]:w-[300px] absolute left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%]  mt-4 rounded-lg shadow-lg z-30 flex flex-col gap-4"
      >
        {imgUrl && <NoteImage imageFileDataRef={imageFileDataRef} />}
        <div
          className={`w-full flex flex-col gap-4 px-3 ${imgUrl ? 'pt-0' : 'pt-3'}`}
        >
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
        {labelsToAdd.length > 0 && (
          <ul className="px-3 flex gap-2 relative z-50">
            {labelsToAdd.map((label) => {
              return (
                <li
                  className="m-0 text-xs bg-[#EBEBEB] px-3 py-1 rounded-xl relative group"
                  key={label._id}
                >
                  {label.name}
                  <button
                    onClick={() => handleRemoveLabel(label._id)}
                    className="hidden w-4 h-4 absolute right-[-5px] top-[-6px] bg-black text-white text-sm items-center justify-center rounded-full group-hover:flex"
                  >
                    x
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <div className="w-full flex justify-between items-center px-3 pb-3">
          <NotesActions
            handleActions={handleActions}
            notesActions={notesActions}
            imageHandler={imageHandler}
          />
          <button
            onClick={saveNote}
            className={`px-6 py-[6px] hover:bg-[${hoverBackgroundColor}] rounded text-sm relative z-20`}
          >
            Close
          </button>
        </div>
        {activeActionModal === 'colorPalette' && <ColorPalette />}
        {activeActionModal === 'labels' && (
          <Labels labelsToDeleteRef={labelsToDeleteRef} />
        )}
      </div>
    </>
  );
};
