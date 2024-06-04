import deleteIcon from './assets/delete-icon.png';

export const NoteImagePresentation = ({
  imgUrl,
  isImgDeleteBtnVisible,
  handleMouseEnter,
  handleMouseLeave,
  imageDeleteHandler,
}) => {
  return (
    imgUrl && (
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
            <img className="h-[1.12rem]" src={deleteIcon} alt="delete-icon" />
          </button>
        )}
      </div>
    )
  );
};
