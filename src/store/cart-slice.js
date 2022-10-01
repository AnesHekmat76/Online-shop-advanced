import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: null,
  totalPrice: 0,
  numberOfItems: null,
};

const cartSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cartItems = action.payload;
      let numberOfCartItems = 0;
      for (let item of action.payload) {
        numberOfCartItems += item.number;
      }
      let cartTotalPrice = 0;
      for (let item of action.payload) {
        cartTotalPrice += item.product.price * item.number;
      }
      state.numberOfItems = numberOfCartItems;
      state.totalPrice = cartTotalPrice;
    },
  },
});

export const cartAction = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
