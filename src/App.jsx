import React from "react";
import { use_GetTodo_Query, useDeleteTodoMutation } from "./api/TodoApi";

const App = () => {
  const { data, isLoading, status, isError, isFetching, isSuccess, refetch } =
    use_GetTodo_Query();
  const [deleteTodo, { isLoading: isLoadingDelete }] = useDeleteTodoMutation();
  const handleDelete = (id) => {
    deleteTodo(id);
  };
  return (
    <div>
      {status}
      {isSuccess ? "Success" : "Failed"}
      {isLoading || isLoadingDelete || isFetching ? (
        <p>....loading</p>
      ) : (
        data?.map((e) => {
          return (
            <div>
              {e.name}
              <button onClick={() => handleDelete(e.id)}>delete</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default App;
