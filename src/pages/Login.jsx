import React from "react";
import { API } from "../utils/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  async function login(userName, password) {
    const res = await API.post("Account/login", { userName, password });

    if (res.data.data) {
      localStorage.setItem("accessToken", res.data.data);
      navigate("/");
    }

    return res.data;
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    let userName = e.target["userName"].value;
    let password = e.target["password"].value;
    login(userName, password);
  };
  return (
    <div>
      <form onSubmit={handlesubmit} action="">
        <input name="userName" type="text" />
        <input name="password" type="text" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
