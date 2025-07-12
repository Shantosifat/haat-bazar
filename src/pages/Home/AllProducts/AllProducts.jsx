import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const AllProducts = () => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const handleApprove = async (id) => {
    const res = await axiosSecure.patch(`/products/${id}`, { status: "approved" });
    if (res.data.modifiedCount > 0) {
      toast.success("✅ Product approved");
      refetch();
    }
  };

  const handleReject = (product) => {
    setSelectedProduct(product);
    setIsRejectModalOpen(true);
  };

  const submitRejection = async (data) => {
    const res = await axiosSecure.patch(`/products/${selectedProduct._id}`, {
      status: "rejected",
      feedback: data.feedback,
    });
    if (res.data.modifiedCount > 0) {
      toast.error("❌ Product rejected");
      refetch();
      setIsRejectModalOpen(false);
      reset();
    }
  };

  const handleUpdate = (product) => {
    navigate(`/dashboard/vendor/update-product/${product._id}`);
  };

  const handleDelete = async () => {
    const res = await axiosSecure.delete(`/products/${selectedProduct._id}`);
    if (res.data.deletedCount > 0) {
      toast.success("🗑️ Product deleted");
      setIsDeleteModalOpen(false);
      refetch();
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">🧾 All Products</h2>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="table w-full">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Vendor</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={p._id}>
                  <td>{index + 1}</td>
                  <td>{p.title}</td>
                  <td>{p.vendorEmail}</td>
                  <td>৳ {p.price}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.status === "pending"
                          ? "badge-warning"
                          : p.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2 justify-center">
                    {p.status === "pending" && (
                      <>
                        <button
                          className="btn btn-xs bg-green-600 text-white hover:bg-green-700"
                          onClick={() => handleApprove(p._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-xs bg-red-600 text-white hover:bg-red-700"
                          onClick={() => handleReject(p)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-xs bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => handleUpdate(p)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-xs bg-gray-600 text-white hover:bg-gray-700"
                      onClick={() => {
                        setSelectedProduct(p);
                        setIsDeleteModalOpen(true);
                      }}
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

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md relative">
            <button
              onClick={() => setIsRejectModalOpen(false)}
              className="absolute right-4 top-4 text-lg"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4 text-red-600">Reject Product</h3>
            <form onSubmit={handleSubmit(submitRejection)} className="space-y-4">
              <textarea
                {...register("feedback", { required: true })}
                placeholder="Enter feedback reason..."
                className="textarea textarea-bordered w-full"
              />
              <button className="btn bg-red-600 text-white w-full hover:bg-red-700">
                Submit Rejection
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center relative">
            <h3 className="text-lg font-bold mb-4 text-red-600">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
