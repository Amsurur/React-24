import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetData = createAsyncThunk("todos/GetData", async () => {
  try {
    const { data } = await axios.get(
      "https://6697657702f3150fb66d72df.mockapi.io/users"
    );
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const TodoApi = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6697657702f3150fb66d72df.mockapi.io/",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    _GetTodo_: builder.query({
      query: () => `users`,
      providesTags: ["Users"],
    }),
    DeleteTodo: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { use_GetTodo_Query, useDeleteTodoMutation } = TodoApi;
