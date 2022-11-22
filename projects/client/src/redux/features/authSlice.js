import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
  name: "",
  email: "",
  role: "",
  profile_picture: "",
  gender: "",
  phone: "",
  date_of_birth: "",
  password: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.name = action.payload.name
      state.role = action.payload.role
      state.profile_picture = action.payload.profile_picture
      state.gender = action.payload.gender
      state.phone = action.payload.phone
      state.date_of_birth = action.payload.date_of_birth
      state.password = action.payload.profile_picture
    },
    logout: (state) => {
      state.id = 0
      state.email = ""
      state.role = ""
      state.name = ""
      state.profile_picture = ""
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
