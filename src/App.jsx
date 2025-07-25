import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Users from "./pages/Users";
import UserById from "./pages/UserById";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Users />} />
        <Route path="user/:id" element={<UserById />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
