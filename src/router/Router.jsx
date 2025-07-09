import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Components/Home";
import AllProducts from "../pages/Home/AllProducts/AllProducts";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";
import AuthLayout from "../Layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allProducts",
        Component: AllProducts,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
        {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ]
  },
]);
