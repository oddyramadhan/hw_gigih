import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./Slicer";

export default configureStore({
  reducer: {
    token: tokenSlice,
  },
});
