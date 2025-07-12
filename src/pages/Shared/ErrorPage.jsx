import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-green-50 to-white px-6">
      {/* Text Section */}
      <motion.div
        className="text-center lg:text-left max-w-xl"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-7xl font-extrabold text-green-700">404</h1>
        <p className="mt-4 text-3xl font-semibold text-gray-800">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-600 text-lg">
          Sorry, we couldn’t find the page you were looking for.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 inline-block px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-lg transition"
        >
          ⬅ Back to Homepage
        </button>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="mt-10 lg:mt-0 lg:ml-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <img
          src="https://i.ibb.co/0jTJkvw2/Chat-GPT-Image-Jul-10-2025-06-00-19-PM.png" // Replace with your brand illustration
          alt="404 Illustration"
          className="w-[300px] h-[600px] md:w-[400px] lg:w-[500px]"
        />
      </motion.div>
    </div>
  );
};

export default ErrorPage;
