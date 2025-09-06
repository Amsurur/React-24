import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/TodoSlice";

export const store = configureStore({
  reducer: {
    todo: counterSlice,
  },
});
