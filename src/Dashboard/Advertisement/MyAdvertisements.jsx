import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../pages/Shared/Loading";
import toast, { Toaster } from "react-hot-toast";

const MyAdvertisements = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [selectedAd, setSelectedAd] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: {ads = []}={},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-ads", user?.email],
    // enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/ads?email=${user.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onUpdateSubmit = async (data) => {
    try {
      const updatedAd = {
        title: data.title,
        description: data.description,
        image: data.image,
        status: "pending",
      };

      const res = await axiosSecure.patch(`/ads/${selectedAd._id}`, updatedAd);
      if (res.data.modifiedCount > 0) {
        toast.success(" Advertisement updated successfully.");
        refetch();
        setIsModalOpen(false);
        setSelectedAd(null);
      } else {
        Swal.fire("ℹ️ No Changes", "No fields were modified.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to update advertisement.", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the ad permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/ads/${id}`);
          if (res.data.deletedCount > 0) {
            toast.success("Ad deleted successfully!");
            refetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleEditClick = (ad) => {
    setSelectedAd(ad);
    setIsModalOpen(true);
    reset(ad); // pre-fill form
  };

  return (
    <div className="px-10 py-5">
      <h2 className="text-3xl text-center font-bold mb-5 text-green-700">
         My Advertisements
      </h2>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-x-auto  shadow rounded-xl">
          <table className="table w-full">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad, index) => (
                <tr key={ad._id}>
                  <td>{index + 1}</td>
                  <td>{ad.title}</td>
                  <td>{ad.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        ad.status === "pending"
                          ? "badge-warning"
                          : ad.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditClick(ad)}
                      className="btn btn-xs bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(ad._id)}
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

      {/* Embedded Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-cyan-600  p-6 rounded-xl w-full max-w-2xl relative shadow-lg">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedAd(null);
              }}
              className="absolute right-4 top-4 text-xl text-gray-500"
            >
              ✖
            </button>
            <h3 className="text-2xl text-center font-bold mb-4 text-green-200">
              {" "}
              Update Advertisement
            </h3>
            <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Ad Title</label>
                <input
                  {...register("title", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter ad title"
                />
                {errors.title && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Short Description
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  placeholder="Write a short description"
                />
                {errors.description && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Image URL</label>
                <input
                  {...register("image", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="https://example.com/banner.jpg"
                />
                {errors.image && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
              <button
                type="submit"
                className="btn bg-green-600 w-full text-white hover:bg-green-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default MyAdvertisements;
