import { createSlice } from "@reduxjs/toolkit";


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
