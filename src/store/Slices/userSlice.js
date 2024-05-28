// src/store/Slices/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    token: '',
    id: '',
    isAdmin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isAdmin = action.payload.isAdmin || false;
    },
    clearUser: (state) => {
      state.email = '';
      state.token = '';
      state.id = '';
      state.isAdmin = false;
    },
    removeUser: (state) => {
      state.email = '';
      state.token = '';
      state.id = '';
      state.isAdmin = false;
    },
  },
});

export const { setUser, clearUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
