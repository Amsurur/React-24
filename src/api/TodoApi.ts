import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TodoApi = createApi({
  reducerPath: "TodoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://37.27.29.18:8001/" }),
  tagTypes: ["Todo", "TodoById"],
  endpoints: (build) => ({
    getTodo: build.query({
      query: () => `api/to-dos`,
      providesTags: ["Todo"],
    }),
    getTodoById: build.query({
      query: (id) => `api/to-dos/${id}`,
      providesTags: ["TodoById"],
    }),
    addTodo: build.mutation({
      query: (newObj) => ({
        url: "api/to-dos",
        method: "POST",
        body: newObj,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `api/to-dos?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteImage: build.mutation({
      query: (id) => ({
        url: `api/to-dos/images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TodoById"],
    }),
    addImage: build.mutation({
      query: ({ id, newObj }) => ({
        url: `api/to-dos/${id}/images`,
        method: "POST",
        body: newObj,
      }),
      invalidatesTags: ["TodoById"],
    }),
  }),
});

export const {
  useGetTodoQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
  useDeleteImageMutation,
  useAddImageMutation,
} = TodoApi;
