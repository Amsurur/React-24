import React, { useState } from "react";
import { useTodo } from "./store/zustand";

const App = () => {
  const [elem, setElem] = useState();
  const { data, addUser, showData, editUser } = useTodo((state) => state);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let newUser = {
            id: Date.now(),
            name: e.target[0].value,
            age: e.target[1].value,
            status: false,
          };
          addUser(newUser);
        }}
        action=""
      >
        <input type="text" />
        <input type="text" />
        <button type="submit">submit</button>
      </form>
      <div>
        {data.map((e) => {
          return (
            <div key={e.id}>
              <h1>{e.name}</h1>
              <h1>{e.age}</h1>
              <h1>{e.status ? "active" : "inactive"}</h1>
              <button onClick={() => setElem(e)}>edit</button>
              <button onClick={() => setElem(showData(e.id))}>show</button>
              {elem?.id == e.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    let newUser = {
                      id: elem.id,
                      name: e.target[0].value,
                      age: e.target[1].value,
                      status: elem.status,
                    };
                    editUser(newUser);
                    setElem("");
                  }}
                  action=""
                >
                  <input defaultValue={elem.name} type="text" />
                  <input defaultValue={elem.age} type="text" />
                  <button type="submit">submit</button>
                </form>
              ) : null}
              <input
                checked={e.status}
                onChange={() => editUser({ ...e, status: !e.status })}
                type="checkbox"
                name=""
                id=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
