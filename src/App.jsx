import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  deleteData,
  handleAdd,
  handleChangeValue,
  increment,
} from "./reducers/todoSlice";

const App = () => {
  const { data, counter, value } = useSelector((store) => store.counter);
  const dispatch = useDispatch();
  console.log(value);

  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <input
        value={value}
        onChange={(e) => dispatch(handleChangeValue(e.target.value))}
        type="text"
      />
      <button onClick={() => dispatch(handleAdd(value))}>add</button>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>Completed: {item.completed ? "Yes" : "No"}</p>
            <button onClick={() => dispatch(deleteData(item.id))}>
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
