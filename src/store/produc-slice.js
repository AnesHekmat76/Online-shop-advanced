import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    displayStatus(state, action) {
      state.status = action.payload;
    },
    hideStatus(state) {
      state.status = "";
    },
  },
});

export const productAction = productSlice.actions;
export const productReducer = productSlice.reducer;
