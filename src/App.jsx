import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Layout from "./pages/Layout";
import { ProtectedRoute } from "./utils/protectedRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        index: true,
        element: (
          // <ProtectedRoute allowedRoles={["User"]}>
            <Cart />
          // </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
