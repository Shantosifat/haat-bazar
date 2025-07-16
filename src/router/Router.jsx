import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Components/Home";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "../Routes/PrivateRoute";
import AddProduct from "../Dashboard/AddProduct/AddProduct";
import MyProducts from "../Dashboard/MyProducts/MyProducts";
import UpdateProduct from "../Dashboard/updateproduct/UpdateProduct";
import AdvertisementForm from "../Dashboard/Advertisement/AdvertisementForm";
import MyAdvertisements from "../Dashboard/Advertisement/MyAdvertisements";
import AllUsers from "../Dashboard/Admin/AllUsers";
import AllAdvertisements from "../Dashboard/Admin/AllAdvertisements";
import ErrorPage from "../pages/Shared/ErrorPage";
import AdminRoute from "../Routes/AdminRoute";
import Forbidden from "../pages/Forbidden/Forbidden";
import VendorRoute from "../Routes/VendorRoute";
import AllProducts from "../Dashboard/Admin/AllProducts";
import ProductDetails from "../pages/Home/ProductSection/ProductDetails";
import MyOrders from "../Dashboard/MyOrders/MyOrders";
import ManageWatchlist from "../Dashboard/Managelist/ManageWatchlist";
import Products from "../pages/Products/Products";
import AllOrders from "../Dashboard/Admin/AllOrders";
import PaymentCard from "../Dashboard/Payment/PaymentCard";
import PriceTrends from "../Dashboard/PriceTrends";

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
        path:'product/:id',
        Component:ProductDetails
      },
      {
        path:'products',
        Component: Products
      }
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
        element: (
          <VendorRoute>
            <AddProduct></AddProduct>
          </VendorRoute>
        ),
      },
      {
        path: "myProduct",
        element: (
          <VendorRoute>
            <MyProducts></MyProducts>
          </VendorRoute>
        ),
      },
      {
        path: "ads",
        element: (
          <VendorRoute>
            <AdvertisementForm></AdvertisementForm>
          </VendorRoute>
        ),
      },
      {
        path: "myAds",
        element: (
          <VendorRoute>
            <MyAdvertisements></MyAdvertisements>
          </VendorRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "allAds",
        element: (
          <AdminRoute>
            <AllAdvertisements></AllAdvertisements>
          </AdminRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <AdminRoute>
            <AllOrders></AllOrders>
          </AdminRoute>
        ),
      },
      {
        path: "products",
        element: (
          <AdminRoute>
            <AllProducts></AllProducts>
          </AdminRoute>
        ),
      },
      {
        path: "updateProduct/:id",
        Component: UpdateProduct,
      },
      {
        path: "orders",
        Component: MyOrders,
      },
      {
        path: "paymentcard/:id",
        Component: PaymentCard,
      },
      {
        path: "watchlist",
        Component: ManageWatchlist,
      },
      {
        path: "priceTrends",
        Component: PriceTrends,
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
  {
    path: "*",
    Component: ErrorPage,
  },
  {
    path: "forbidden",
    Component: Forbidden,
  },
]);
