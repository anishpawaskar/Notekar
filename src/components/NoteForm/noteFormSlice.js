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
  noteId: null,
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
    handleImage: (state, { payload: { imageUrl } }) => {
      state.formData.imgUrl = imageUrl;
    },
    handleImageBtnVisibility: (
      state,
      { payload: { isImgDeleteBtnVisible } },
    ) => {
      state.isImgDeleteBtnVisible = isImgDeleteBtnVisible;
    },
    handleLabelsForAddition: (state, { payload: { labels } }) => {
      state.formData.labelsToAdd = labels;
    },
    handleActiveActionModal: (state, { payload: { activeActionModal } }) => {
      state.activeActionModal = activeActionModal;
    },
    handleSaveNote: (state) => {
      state.isModalOpen = false;
      state.formData = initialState.formData;
      state.isImgDeleteBtnVisible = false;
      state.activeActionModal = null;
    },
    setNoteId: (state, { payload: { noteId } }) => {
      state.noteId = noteId;
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
  handleLabelsForAddition,
  handleSaveNote,
  setNoteId,
} = noteFormSlice.actions;
export default noteFormSlice.reducer;
