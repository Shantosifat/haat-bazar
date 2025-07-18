import React from "react";
import { FaBoxOpen, FaHeart, FaMoneyBillWave, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const UserDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        👤 Welcome to Your Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Link to="/dashboard/orders">
          <div className=" shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaBoxOpen className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">My Orders</h3>
            <p className="text-sm text-gray-500">View and manage your orders</p>
          </div>
        </Link>

        <Link to='/dashboard/watchlist'>
          <div className=" shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaHeart className="text-4xl text-pink-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Watchlist</h3>
            <p className="text-sm text-gray-500">Track products you love</p>
          </div>
        </Link>

        <Link>
          <div className=" shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaMoneyBillWave className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Payments</h3>
            <p className="text-sm text-gray-500">Check your payment history</p>
          </div>
        </Link>

        <div className=" shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <FaUser className="text-4xl text-purple-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold">Profile</h3>
          <p className="text-sm text-gray-500">Edit your personal details</p>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
        <h3 className="text-2xl font-semibold mb-4">📰 Latest Updates</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Check today’s top deals from your favorite markets.</li>
          <li>Track real-time price trends on essentials.</li>
          <li>Explore new features coming to your dashboard soon!</li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
