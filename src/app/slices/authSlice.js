import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    selfDetails: null,
  },
  reducers: {
    setIsLoggedIn: (state, { payload: { isLoggedIn } }) => {
      state.isLoggedIn = isLoggedIn;
    },
    setSelfDetails: (state, { payload: { selfData } }) => {
      state.selfDetails = selfData;
    },
  },
});

export const { setIsLoggedIn, setSelfDetails } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;
