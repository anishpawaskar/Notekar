import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  formData: {
    description: '',
    bgColor: '#fff',
    hoverBackgroundColor: '#e0e0e0',
    imgUrl: null,
    labelsToAdd: [],
  },
  isImgDeleteBtnVisible: false,
  activeActionModal: null,
};

const noteFormSlice = createSlice({
  name: 'noteForm',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isModalOpen = true;
    },
    showModalOnInput: (state, { payload: { description } }) => {
      if (description) {
        state.isModalOpen = true;
        state.formData.description = description;
      }
    },
    handleDescriptionChange2: (state, { payload }) => {
      state.formData.description = payload.description;
    },
    handleColor: (state, { payload: { bgColor, hoverBackgroundColor } }) => {
      state.formData.bgColor = bgColor;
      state.formData.hoverBackgroundColor = hoverBackgroundColor;
    },
    handleImage: (state, { payload: { imageFile } }) => {
      state.formData.imgUrl = imageFile;
    },
    handleImageBtnVisibility: (
      state,
      { payload: { isImgDeleteBtnVisible } },
    ) => {
      state.isImgDeleteBtnVisible = isImgDeleteBtnVisible;
    },
    handleActiveActionModal: (state, { payload: { activeActionModal } }) => {
      state.activeActionModal = activeActionModal;
    },
  },
});

export const {
  showModal,
  showModalOnInput,
  handleDescriptionChange2,
  handleActiveActionModal,
  handleColor,
  handleImage,
  handleImageBtnVisibility,
} = noteFormSlice.actions;
export default noteFormSlice.reducer;
