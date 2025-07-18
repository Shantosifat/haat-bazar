import React from "react";
import {
  FaUsers,
  FaBox,
  FaClipboardList,
  FaBullhorn,
} from "react-icons/fa";
import { Link } from "react-router";

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        🛠️ Admin Dashboard
      </h2>

      {/* Admin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Link to="/dashboard/allUsers">
          <div className="shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaUsers className="text-4xl text-indigo-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Manage Users</h3>
            <p className="text-sm text-gray-500">Edit roles & access levels</p>
          </div>
        </Link>

        <Link to="/dashboard/products">
          <div className="shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaBox className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Manage Products</h3>
            <p className="text-sm text-gray-500">Approve, reject or update</p>
          </div>
        </Link>

        <Link to="/dashboard/allOrders">
          <div className="shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaClipboardList className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Manage Orders</h3>
            <p className="text-sm text-gray-500">Track and fulfill orders</p>
          </div>
        </Link>

        <Link to="/dashboard/allAds">
          <div className="shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaBullhorn className="text-4xl text-orange-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Manage Ads</h3>
            <p className="text-sm text-gray-500">Review ad submissions</p>
          </div>
        </Link>
      </div>

      {/* Admin Info Section */}
      <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
        <h3 className="text-2xl font-semibold text-black mb-4">📢 Admin Notices</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Review and approve new product listings regularly.</li>
          <li>Ensure fair advertisement visibility for all vendors.</li>
          <li>Monitor order flow and resolve vendor-user disputes.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
