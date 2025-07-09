import React from "react";
import Logo from "../pages/Shared/Logo";
import Navbar from "../pages/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <header className="w-11/12  mx-auto mt-5">
        <Logo></Logo>
      </header>
      <main className="w-11/12 mx-auto py-4">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default AuthLayout;
