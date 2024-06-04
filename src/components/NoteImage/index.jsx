import { useDispatch, useSelector } from 'react-redux';
import { NoteImagePresentation } from './Presentation';
import {
  handleImage,
  handleImageBtnVisibility,
} from '../NoteForm/noteFormSlice';

export const NoteImage = ({ imageFileDataRef }) => {
  const {
    formData: { imgUrl },
    isImgDeleteBtnVisible,
  } = useSelector((state) => state.noteForm);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    dispatch(handleImageBtnVisibility({ isImgDeleteBtnVisible: true }));
  };

  const handleMouseLeave = () => {
    dispatch(handleImageBtnVisibility({ isImgDeleteBtnVisible: false }));
  };

  const imageDeleteHandler = () => {
    dispatch(handleImage({ imageUrl: null }));
    imageFileDataRef.current = null;
  };

  return (
    <NoteImagePresentation
      imgUrl={imgUrl}
      isImgDeleteBtnVisible={isImgDeleteBtnVisible}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      imageDeleteHandler={imageDeleteHandler}
    />
  );
};
