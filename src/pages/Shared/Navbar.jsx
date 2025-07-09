import React, { useState } from "react";
import { NavLink } from "react-router";

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = (
    <>
      <NavLink
        to="/allProducts"
        className="block px-3 py-2 rounded text-black hover:bg-blue-100"
        activeClassName="text-blue-600 font-semibold"
      >
        All Products
      </NavLink>
    </>
  );

  return (
    <nav className="bg-amber-200 shadow-md px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Website Name */}
        <div className="flex items-center space-x-2 w-1/3">
          <span className="text-2xl">🥦</span>
          <span className="text-xl font-bold text-green-600">কাঁচাবাজার</span>
        </div>

        {/* Center: All Products */}
        <div className="w-1/3 text-center hidden md:block">
          {links}
        </div>

        {/* Right: Hamburger + Auth/User */}
        <div className="w-1/3 flex justify-end items-center space-x-4">
          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

          {/* Auth/User (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <a
                  href="/login"
                  className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                >
                  🔐 Login
                </a>
                <a
                  href="/signup"
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  🧾 Sign-up
                </a>
              </>
            ) : (
              <>
                <img
                  src={user.profilePicUrl}
                  alt="User Profile"
                  className="w-9 h-9 rounded-full border border-gray-300"
                  title={user.name}
                />
                <button
                  onClick={onLogout}
                  className="px-4 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50"
                >
                  🚪 Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3">
          <NavLink
            to="/allProducts"
            className="block px-3 py-2 rounded hover:bg-blue-100 text-gray-700 font-semibold"
          >
            🛍️ All Products
          </NavLink>

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
                className="w-9 h-9 rounded-full border border-gray-300 mx-auto"
                title={user.name}
              />
              <button
                onClick={onLogout}
                className="px-4 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50 text-center"
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
