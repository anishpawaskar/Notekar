import { Link } from 'react-router-dom';
import { NotesActions } from '../NotesActions';
import { ColorPalette } from '../ColorPalette';
import deleteIcon from './assets/delete-icon.png';

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
  imgUrl,
  isImgDeleteBtnVisible,
  imageHandler,
  handleMouseEnter,
  handleMouseLeave,
  imageDeleteHandler,
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
        className="w-[400px] sm:w-[600px] max-[450px]:w-[300px] absolute left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%]  mt-4 rounded-lg shadow-lg z-30 flex flex-col gap-4"
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
      </div>
    </>
  );
};
