import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const initialState = {
    data: []
};

const userSlice = createSlice({
  name: "favPiza",
  initialState,
  reducers: {
    addFavPizza: (state,actipon) => {
        
    }
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
