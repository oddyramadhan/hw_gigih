import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./Slicer";

const store = configureStore({
  reducer: {
    token: tokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
