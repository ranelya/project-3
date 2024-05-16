import { createSlice } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';

const initialState = {
  email: null,
  token: localStorage.getItem('auth_token') || null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem('auth_token', action.payload.token);
      redirect('/');
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      localStorage.removeItem('auth_token');
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
