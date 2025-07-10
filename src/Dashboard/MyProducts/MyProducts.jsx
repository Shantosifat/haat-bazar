import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../pages/Shared/Loading";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";

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
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "✅ Product deleted successfully!",
            timer: 1000,
            showConfirmButton: false,
          });
          refetch();
          setDeletingProduct(null);
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "⚠️ Failed to delete product.",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "❌ Something went wrong on the server.",
        });
      }
    }
  };

  // 🔵 Handle update - Navigate to update page
  const handleUpdate = (id) => {
    navigate(`/dashboard/updateProduct/${id}`);
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
                      onClick={() => handleDelete(p._id)}
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
    </div>
  );
};

export default MyProducts;
