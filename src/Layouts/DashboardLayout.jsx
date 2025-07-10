import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FiBarChart2, FiHome, FiShoppingCart, FiTool } from "react-icons/fi";
import Logo from "../pages/Shared/Logo";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        {/* Navbar */}
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
          <div className="hidden flex-none lg:block"></div>
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
          <div className="mb-8">
            <Logo></Logo>
          </div>
          <div className="space-y-4">
            <NavLink to="/dashBoard" className="flex items-center gap-2">
              <FiHome /> Home
            </NavLink>
            <NavLink to="/dashboard/addProduct" className="flex items-center gap-2">
              <FiShoppingCart /> Add Product
            </NavLink>
            <NavLink to="/dashboard/orders" className="flex items-center gap-2">
              <FiShoppingCart /> My Order List
            </NavLink>

            <NavLink
              to="/dashboard/watchlist"
              className="flex items-center gap-2"
            >
              <FiTool /> Manage Watchlist
            </NavLink>

            <NavLink
              to="/dashboard/price-trends"
              className="flex items-center gap-2"
            >
              <FiBarChart2 /> View Price Trends
            </NavLink>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
