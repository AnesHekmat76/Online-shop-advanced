import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal-slice";
import { alertReducer } from "./alert-slice";
import { authReducer } from "./auth-slice";
import { productReducer } from "./produc-slice";
import { uiReducer } from "./ui-slice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    alert: alertReducer,
    auth: authReducer,
    product: productReducer,
    ui: uiReducer,
  },
});

export default store;
