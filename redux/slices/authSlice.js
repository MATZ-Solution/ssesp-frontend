import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = {};
    },
    setFormStatus: (state, action) => {
      state.user = {...state.user, ...action.payload}
    }
  },
});

export const { setUser, removeUser, setFormStatus } = authSlice.actions;
export default authSlice.reducer;
