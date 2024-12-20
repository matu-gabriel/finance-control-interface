import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import { Register } from "../pages/register";
import { PrivateRoute } from "./PivateRoute";
import { ErrorPage } from "./ErrorPage";
import { Manage } from "../pages/manage";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/manage",
    element: <Manage />,
  },
  {
    path: "/",
    element: <PrivateRoute element={<Home />} />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
