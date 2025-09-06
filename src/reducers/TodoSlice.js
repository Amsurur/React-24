import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [{ id: 1, name: "Davlat", age: 13 }],
  value: 0,
};

export const counterSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    deleteUser: (state, { payload }) => {
      state.data = state.data.filter((e) => e.id != payload);
    },
    addUser: (state, { payload }) => {
      state.data.push(payload);
      console.log(state.data);
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteUser, addUser } = counterSlice.actions;

export default counterSlice.reducer;
