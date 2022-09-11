import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingSpinnerDisplayed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    displaySpinner(state) {
      state.isLoadingSpinnerDisplayed = true;
    },
    hideSpinner(state) {
      state.isLoadingSpinnerDisplayed = false;
    },
  },
});

export const uiAction = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
