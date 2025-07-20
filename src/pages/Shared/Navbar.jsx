import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "./Logo";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = UseAuth();

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

  const links = (
    <>
      <li>
        <NavLink className="font-semibold" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="font-semibold" to="/products">
          All Products
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink className="font-semibold" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-slate-700 shadow-md px-6 py-3">
      <div className="flex items-center justify-between py-2">
        {/* Left: Logo */}
        <div className="mr-60">
          <Logo />
        </div>

        {/* Center: Desktop Links */}
        <div className="w-1/3 text-center hidden md:block">
          <ul className="menu menu-horizontal pl-5 text-white">{links}</ul>
        </div>

        {/* Right: Hamburger + User */}
        <div className="w-1/3 flex justify-end items-center space-x-4">
          {/* Hamburger */}
          <button
            className="md:hidden text-white focus:outline-none"
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

          {/* Desktop User/Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                >
                  🔐 Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  🧾 Sign-up
                </Link>
              </>
            ) : (
              <>
                <div className="md:flex flex-col text-right">
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="w-9 h-9 rounded-full border border-gray-300"
                    title={`${user.name} (${user.email})`}
                  />
                </div>
                <button
                  onClick={handleLogOut}
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
        <div className="md:hidden mt-4 flex flex-col space-y-3 text-white">
          <NavLink
            to="/"
            className="block ml-10 px-3 py-2 rounded hover:bg-slate-600 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            🏠 Home
          </NavLink>
          <NavLink
            to="/products"
            className="block ml-10 px-3 py-2 rounded hover:bg-slate-600 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            🛒 All Products
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="block ml-10 px-3 py-2 rounded hover:bg-slate-600 font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                📊 Dashboard
              </NavLink>
              <div className="flex items-center ml-10 space-x-3">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-9 h-9 rounded-full border border-gray-300"
                />
                <button
                  onClick={() => {
                    handleLogOut();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50"
                >
                  🚪 Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block ml-10 px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-center"
                onClick={() => setMenuOpen(false)}
              >
                🔐 Login
              </Link>
              <Link
                to="/signup"
                className="block ml-10 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
                onClick={() => setMenuOpen(false)}
              >
                🧾 Sign-up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
