import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: localStorage.getItem("accessToken") || "",
    expiredToken: false,
  },
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("accessToken", action.payload);
      state.token = localStorage.getItem("accessToken");
    },
    removeToken: (state) => {
      localStorage.removeItem("accessToken");
      state.token = "";
    },
    resetToken: (state, action) => {
      state.expiredToken = action.payload;
    },
  },
});

export const { setToken, removeToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
