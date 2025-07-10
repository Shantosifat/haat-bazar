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
      <NavLink className="text-gray-800" to="/allProducts">
        All Products
      </NavLink>
    </>
  );

  return (
    <nav className="bg-amber-200 shadow-md px-6 py-3">
      <div className="flex items-center justify-between py-2 ">
        {/* Left: Logo + Website Name */}
        <div className="mr-60">
          <Logo></Logo>
        </div>

        {/* Center: All Products */}
        <div className="w-1/3 text-center hidden md:block">{links}</div>

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
                <img
                  src={user.profilePicUrl}
                  alt="User Profile"
                  className="w-9 h-9 rounded-full border border-gray-300"
                  title={user.name}
                />
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
        <div className="md:hidden mt-4 flex flex-col space-y-3">
          <NavLink
            to="/allProducts"
            className="block ml-10 px-3 py-2 rounded text-gray-700 font-semibold"
          >
            All Products
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
