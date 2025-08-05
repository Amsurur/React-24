import { createSlice } from "@reduxjs/toolkit";

const CounterSlice = createSlice({
  name: "counter",
  initialState: {
    data: [
      {
        id: 1,
        title: "Learn React",
        completed: false,
      },
      {
        id: 2,
        title: "Learn Redux",
        completed: true,
      },
    ],
    counter: 0,
    value: "0",
  },
  reducers: {
    increment: (state, { payload }) => {
      state.counter += 1;
    },
    decrement: (state, action) => {
      state.counter -= 1;
    },
    handleChangeValue: (state, { payload }) => {
      state.value = payload;
    },
    handleAdd: (state, { payload }) => {
      state.counter += +payload;
    },
    deleteData: (state, { payload }) => {
      state.data = state.data.filter((e) => e.id !== payload);
    },
  },
});
export const {
  increment,
  decrement,
  handleChangeValue,
  deleteData,
  handleAdd,
} = CounterSlice.actions;

export default CounterSlice.reducer;
