import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const storedUserName = localStorage.getItem("userName");
const authority = localStorage.getItem("authority");

const initialState = {
  token: initialToken,
  isLoggedIn: initialToken ? true : false,
  userName: storedUserName ? storedUserName : "",
  authority: authority ? authority : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandler(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userName", action.payload.firstname);
      localStorage.setItem(
        "authority",
        action.payload.authorities[0].authority
      );
      state.isLoggedIn = true;
    },
    logoutHandler(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("authority");
      state.token = null;
      state.isLoggedIn = false;
      state.authority = null;
      state.userName = "";
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
