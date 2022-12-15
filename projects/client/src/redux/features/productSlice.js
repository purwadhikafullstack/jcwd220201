import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
  product_name: "",
  description: "",
  price: 0,
  category_id: 0,
  weight: 0,
}

const authSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    product: (state, action) => {
      state.id = action.payload.id
      state.product_name = action.payload.product_name
      state.description = action.payload.description
      state.price = action.payload.price
      state.category_id = action.payload.category_id
      state.weight = action.payload.weight
    },
  },
})

export const { product } = authSlice.actions

export default authSlice.reducer
