import React from "react";
import { Link } from "react-router";
import {
  FaBullhorn,
  FaClipboardList,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { motion } from "framer-motion";

const VendorDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-8 text-gray-500"
      >
        📦 Welcome to Your Vendor Dashboard
      </motion.h2>

      {/* Split Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Product Management */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white shadow rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-700">
            <MdInventory className="text-2xl" /> Manage Your Products
          </h3>

          <p className="text-sm text-gray-600 mb-6">
            Add new items, update prices, or check the approval status of your products.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              to="/dashboard/myProduct"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
            >
              📝 View & Manage Products
            </Link>
            <Link
              to="/dashboard/addProduct"
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
            >
              ➕ Add New Product
            </Link>
          </div>
        </motion.div>

        {/* Right: Actions */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 shadow rounded-xl p-6 space-y-6"
        >
          {/* Advertisement */}
          <Link to="/dashboard/myAds" className="block group">
            <div className="bg-white text-black p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <FaBullhorn className="text-3xl text-pink-500" />
                <div>
                  <h4 className="font-semibold text-lg group-hover:text-pink-600">
                    My Advertisements
                  </h4>
                  <p className="text-sm text-gray-500">Boost visibility & reach</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Orders */}
          <Link to="/dashboard/vendor-orders" className="block group">
            <div className="bg-white text-black p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <FaClipboardList className="text-3xl text-yellow-500" />
                <div>
                  <h4 className="font-semibold text-lg group-hover:text-yellow-600">
                    Orders Received
                  </h4>
                  <p className="text-sm text-gray-500">Track customer orders</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Payments */}
          <Link to="/dashboard/vendor-payments" className="block group">
            <div className="bg-white text-black p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <FaMoneyCheckAlt className="text-3xl text-green-600" />
                <div>
                  <h4 className="font-semibold text-lg group-hover:text-green-700">
                    Payment History
                  </h4>
                  <p className="text-sm text-gray-500">Review your earnings</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorDashboard;
