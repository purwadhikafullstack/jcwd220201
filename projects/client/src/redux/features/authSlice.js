import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  email: "",
  role: "",
  profile_picture: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.profile_picture = action.payload.profile_picture;
    },
    logout: (state) => {
      state.id = 0;
      state.email = "";
      state.role = "";
      state.username = "";
      state.profile_picture = state.profile_picture;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
