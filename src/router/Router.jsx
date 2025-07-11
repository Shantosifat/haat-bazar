import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Components/Home";
import AllProducts from "../pages/Home/AllProducts/AllProducts";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "../Routes/PrivateRoute";
import AddProduct from "../Dashboard/AddProduct/AddProduct";
import MyProducts from "../Dashboard/MyProducts/MyProducts";
import UpdateProduct from "../Dashboard/updateproduct/UpdateProduct";
import AdvertisementForm from "../Dashboard/Advertisement/AdvertisementForm";

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
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "addProduct",
        Component: AddProduct,
      },
      {
        path: "myProduct",
        Component: MyProducts,
      },
      {
        path: "ads",
        Component: AdvertisementForm,
      },
      {
        path: "updateProduct/:id",
        Component: UpdateProduct,
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
    ],
  },
]);
