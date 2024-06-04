import { useEffect } from 'react';
import { NotesActions } from '../NotesActions';
import { ColorPalette } from '../ColorPalette';
import deleteIcon from './assets/delete-icon.png';
import { Labels } from '../Labels';

export const NoteFormPresentation = ({
  handleDescriptionChange,
  saveNote,
  description,
  noteFormDescriptionRef,
  noteFormTitleRef,
  handleKeyDown,
  notesActions,
  handleActions,
  bgColor,
  hoverBackgroundColor,
  imageHandler,
  imgUrl,
  isImgDeleteBtnVisible,
  handleMouseEnter,
  handleMouseLeave,
  imageDeleteHandler,
  labelsToAdd,
  handleRemoveLabel,
  activeActionModal,
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
        className="w-[400px] sm:w-[600px] max-[450px]:w-[300px] rounded-lg shadow-lg border relative z-30 flex flex-col gap-4 transition-all ease-in duration-500"
      >
        {imgUrl && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full relative rounded-t-lg"
          >
            <img
              className="w-full object-contain rounded-t-lg"
              src={imgUrl}
              alt="img"
            />
            {isImgDeleteBtnVisible && (
              <button
                onClick={imageDeleteHandler}
                className="absolute w-8 h-8 rounded-sm flex justify-center items-center right-2 bottom-2 bg-[#424242b2] hover:bg-[#333333]"
              >
                <img
                  className="h-[1.12rem]"
                  src={deleteIcon}
                  alt="delete-icon"
                />
              </button>
            )}
          </div>
        )}
        <div
          className={`w-full flex flex-col gap-4 px-3 ${imgUrl ? 'pt-0' : 'pt-3'}`}
        >
          <input
            ref={noteFormTitleRef}
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
        {activeActionModal === 'colorPalette' && <ColorPalette />}
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
        {activeActionModal === 'labels' && <Labels />}
        <div className="w-full flex justify-between items-center px-3 pb-3">
          <NotesActions
            notesActions={notesActions}
            handleActions={handleActions}
            imageHandler={imageHandler}
          />
          <button
            onClick={saveNote}
            className={`px-6 py-[6px] hover:bg-[${hoverBackgroundColor}] rounded text-sm relative z-20`}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
