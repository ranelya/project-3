import { createSlice } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const initialState = {
  email: null,
  token: null,
  id: null,
};

let cookie = new Cookies();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      cookie.set('auth-token', action.payload.token);
      redirect('/');
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      cookie.remove('auth-token', { path: '/' });
      console.log(qwe);
      console.log(qwe);
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
