import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal-slice";
import { alertReducer } from "./alert-slice";
import { authReducer } from "./auth-slice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    alert: alertReducer,
    auth: authReducer
  },
});

export default store;
