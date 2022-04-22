import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: sessionStorage.getItem("accessToken") || "",
    expiredToken: false,
  },
  reducers: {
    setToken: (state, action) => {
      sessionStorage.setItem("accessToken", action.payload);
      state.token = sessionStorage.getItem("accessToken");
    },
    removeToken: (state) => {
      sessionStorage.removeItem("accessToken");
      state.token = "";
    },
    resetToken: (state, action) => {
      state.expiredToken = action.payload;
    },
  },
});

export const { setToken, removeToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
