import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import authReducer from './slices/authSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    notes: notesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
