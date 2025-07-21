import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  FiBarChart2,
  FiCast,
  FiHome,
  FiList,
  FiMonitor,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import useUserRole from "../hooks/UseUSerRole";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const DashboardLayout = () => {
  const { logOut } = UseAuth();
  const navigate = useNavigate();

  const { role, roleLoading } = useUserRole();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Log Out Successful!");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        {/* Drawer main content */}
        <div className="drawer-content flex flex-col ">
          {/* Mobile navbar toggle (already exists) */}
          <div className="navbar bg-base-300 w-full lg:hidden">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">Dashboard</div>
          </div>

          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full space-y-3.5 w-80 p-4">
            {/* Sidebar content here */}

            <div className="space-y-4">
              <NavLink to="/dashBoard" className="flex items-center gap-2">
                <FiHome /> Home
              </NavLink>
              {/* vendor link */}
              {!roleLoading && role === "vendor" && (
                <>
                  <NavLink
                    to="/dashboard/addProduct"
                    className="flex items-center gap-2"
                  >
                    <FiPlusCircle /> Add Product
                  </NavLink>
                  <NavLink
                    to="/dashboard/myProduct"
                    className="flex items-center gap-2"
                  >
                    <FiPackage /> My Products
                  </NavLink>
                  <NavLink
                    to="/dashboard/ads"
                    className="flex items-center gap-2"
                  >
                    <FiCast />
                    Add Advertisement
                  </NavLink>
                  <NavLink
                    to="/dashboard/myAds"
                    className="flex items-center gap-2"
                  >
                    <FiList />
                    My Advertisements
                  </NavLink>
                </>
              )}
              {/* admin link */}
              {!roleLoading && role === "admin" && (
                <>
                  <NavLink
                    to="/dashboard/allAds"
                    className="flex items-center gap-2"
                  >
                    <FiMonitor /> All Advertisements
                  </NavLink>
                  <NavLink
                    to="/dashboard/allUsers"
                    className="flex items-center gap-2"
                  >
                    <FiUsers /> All Users
                  </NavLink>
                  <NavLink
                    to="/dashboard/products"
                    className="flex items-center gap-2"
                  >
                    <FiUsers /> All Products
                  </NavLink>
                  <NavLink
                    to="/dashboard/allOrders"
                    className="flex items-center gap-2"
                  >
                    <FiUsers /> All Orders
                  </NavLink>
                </>
              )}
              {!roleLoading && role === "user" && (
                <>
                  <NavLink
                    to="/dashboard/orders"
                    className="flex items-center gap-2"
                  >
                    <FiShoppingCart /> My Order List
                  </NavLink>

                  <NavLink
                    to="/dashboard/watchlist"
                    className="flex items-center gap-2"
                  >
                    <FiTool /> Manage Watchlist
                  </NavLink>

                  <NavLink
                    to="/dashboard/priceTrends"
                    className="flex items-center gap-2"
                  >
                    <FiBarChart2 /> View Price Trends
                  </NavLink>
                </>
              )}
              {/* <button
                onClick={handleLogOut}
                className="px-4 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50"
              >
                🚪 Logout
              </button> */}
            </div>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
