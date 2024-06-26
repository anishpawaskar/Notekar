import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
  },
  reducers: {
    addNote: (state, { payload: { title, description, states } }) => {
      if (title && description) {
        state.notes.push({
          id: uuidv4(),
          title,
          description,
          states,
        });
      } else if (title) {
        state.notes.push({
          id: uuidv4(),
          title,
          states,
        });
      } else {
        state.notes.push({
          id: uuidv4(),
          description,
          states,
        });
      }
    },
    updateNote: (state, { payload: { noteId, propertyToUpdate } }) => {
      state.notes = state.notes.map((note) =>
        note.id === noteId ? { ...note, ...propertyToUpdate } : note,
      );
    },
  },
});

export const { addNote, updateNote } = notesSlice.actions;
export const selectNotes = (state) => state.notes.notes;

export default notesSlice.reducer;
