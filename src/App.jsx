import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "./reducers/TodoSlice";

const App = () => {
  const [state, setState] = useState(0);
  const { value, data } = useSelector((store) => store.todo);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      id: Date.now(),
      name: e.target["name"].value,
      age: e.target["age"].value,
    };

    dispatch(addUser(obj));
  };
  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <input name="name" type="text" />
        <input name="age" type="text" />
        <button type="submit"> submit</button>
      </form>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {data.map((e) => {
          return (
            <div
              key={e.id}
              style={{
                width: "200px",
                textAlign: "center",
                padding: "20px",
                borderRadius: "16px",
                background: "skyblue",
              }}
            >
              <h1>{e.name}</h1>
              <h3>{e.age}</h3>
              <button onClick={() => dispatch(deleteUser(e.id))}>🗑️</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
