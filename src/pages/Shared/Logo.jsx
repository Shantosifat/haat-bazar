import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
  <Link to='/'>
    <div className="flex items-center space-x-2 w-1/3">
      <span className="text-2xl">🥦</span>
      <span className="text-xl font-bold text-green-600">কাঁচাবাজার</span>
    </div>
  </Link>
  );
};

export default Logo;
