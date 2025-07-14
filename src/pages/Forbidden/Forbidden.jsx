import React from "react";
import { Link } from "react-router";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center bg-white shadow-lg rounded-2xl p-8 max-w-md border border-red-100"
      >
        <div className="text-red-500 text-5xl mb-4 flex justify-center">
          <FiLock />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <Link
          to="/"
          className="btn bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-lg"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Forbidden;
