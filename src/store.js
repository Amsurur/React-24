import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./reducers/todoSlice";
import { TodoApi } from "./api/TodoApi";

export const store = configureStore({
  reducer: {
    todo: TodoSlice,
    [TodoApi.reducerPath]: TodoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TodoApi.middleware),
});
  