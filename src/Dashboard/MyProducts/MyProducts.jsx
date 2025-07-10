import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../pages/Shared/Loading";
import UseAuth from "../../hooks/UseAuth";

const MyProducts = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const [deletingProduct, setDeletingProduct] = useState(null);

  // 🔄 Fetch all products for the current vendor
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vendor-products", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user.email}`);
      return res.data;
    },
  });

  // 🔴 Handle product delete
  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/products/${id}`);
      if (res.data?.deletedCount > 0) {
        toast.success("✅ Product deleted successfully!");
        refetch();
        setDeletingProduct(null);
      } else {
        toast.error("⚠️ Failed to delete product.");
      }
    } catch (error) {
      toast.error("❌ Server error while deleting.");
      console.error(error);
    }
  };

  // 🔵 Handle update - Navigate to update page
  const handleUpdate = (id) => {
    navigate(`/dashboard/update-product/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        📦 My Submitted Products
      </h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="table w-full">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Price/Unit</th>
                <th>Market</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={p._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{p.itemName}</td>
                  <td>৳ {p.pricePerUnit}</td>
                  <td>{p.marketName}</td>
                  <td>{p.date}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        p.status === "pending"
                          ? "bg-yellow-500"
                          : p.status === "approved"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {p.status}
                    </span>
                    {p.status === "rejected" && p.feedback && (
                      <p className="text-xs text-red-700 mt-1">
                        💬 {p.feedback}
                      </p>
                    )}
                  </td>
                  <td className="flex gap-2 justify-center items-center">
                    <button
                      onClick={() => handleUpdate(p._id)}
                      className="btn btn-xs bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDeletingProduct(p)}
                      className="btn btn-xs bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔴 Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4 text-red-700">
              Confirm Delete
            </h3>
            <p className="mb-4">
              Are you sure you want to delete <b>{deletingProduct.itemName}</b>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(deletingProduct._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeletingProduct(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
