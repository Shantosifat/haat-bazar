import React, { useState } from "react";
import { NavLink } from "react-router";

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = (
    <>
      <NavLink
        to="/allProducts"
        className="block px-3 py-2 rounded hover:bg-blue-100"
        activeClassName="text-blue-600 font-semibold"
      >
        All Products
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Website Name */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🥦</span>
          <span className="text-xl font-bold text-green-600">কাঁচাবাজার</span>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Simple hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Nav links + Auth buttons: hidden on mobile by default, shown if menuOpen */}
        <div
          className={`flex-col md:flex-row md:flex items-center md:space-x-4 ${
            menuOpen ? "flex" : "hidden"
          } w-full md:w-auto mt-3 md:mt-0`}
        >
          {/* Center: All Products (public route) */}
          <ul className="flex flex-col md:flex-row md:space-x-4 text-gray-700 font-medium">
            {links}
          </ul>

          {/* Right: Login/Signup OR Profile + Logout */}
          <div className="flex flex-col md:flex-row md:space-x-4 mt-3 md:mt-0">
            {!user ? (
              <>
                <a
                  href="/login"
                  className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-center"
                >
                  🔐 Login
                </a>
                <a
                  href="/signup"
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
                >
                  🧾 Sign-up
                </a>
              </>
            ) : (
              <>
                <img
                  src={user.profilePicUrl}
                  alt="User Profile"
                  className="w-9 h-9 rounded-full border border-gray-300 mx-auto md:mx-0"
                  title={user.name}
                />
                <button
                  onClick={onLogout}
                  className="px-4 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50 mt-2 md:mt-0"
                >
                  🚪 Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
