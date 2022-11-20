import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubmitted: false,
  isVerified: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    submit: (state) => {
      state.isSubmitted = true;
    },
    verify: (state) => {
      state.isVerified = true;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { submit, verify } = registerSlice.actions;
export default registerSlice.reducer;
