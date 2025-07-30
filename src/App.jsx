import React, { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";

// Lazy-loaded components
const Users = React.lazy(() => import("./pages/Users"));
const UserById = React.lazy(() => import("./pages/UserById"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <Users />
          </Suspense>
        }
      />
      <Route
        path="user/:id"
        element={
          <Suspense fallback={<Loading text="Loading User..." />}>
            <UserById />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
