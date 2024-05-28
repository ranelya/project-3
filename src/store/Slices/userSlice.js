import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: localStorage.getItem("auth_token") || null,
  id: null,
  isAdmin: false, // Добавляем флаг администратора
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isAdmin = action.payload.isAdmin; // Сохраняем флаг администратора
      localStorage.setItem("auth_token", action.payload.token);
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isAdmin = false; // Сбрасываем флаг администратора
      localStorage.removeItem("auth_token");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
