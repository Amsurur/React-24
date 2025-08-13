import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GetData } from "../api/TodoApi";


const TodoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (nemon) => {
    nemon.addCase(GetData.pending, (state, { payload }) => {
      state.loading = true;
    }),
      nemon.addCase(GetData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      nemon.addCase(GetData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default TodoSlice.reducer;
