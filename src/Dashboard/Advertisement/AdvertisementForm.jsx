import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const AdvertisementForm = () => {
  const axiosSecure = UseAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      description: data.description,
      image: data.image,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/advertisements", formData);
      if (res.data.insertedId) {
        Swal.fire("✅ Success!", "Ad submitted successfully!", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="w-11/12 mt-4 mx-auto px-6 py-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-green-700 mb-8">
        📢 Submit Advertisement
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Ad Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Advertisement Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title", { required: true })}
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g. Super Discount on Local Veggies!"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">Title is required</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Write a compelling promotional message..."
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">Description is required</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Banner Image URL <span className="text-red-500">*</span>
          </label>
          <input
            {...register("image", { required: true })}
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="https://example.com/your-banner.jpg"
          />
          {errors.image && (
            <p className="text-sm text-red-600 mt-1">Image URL is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full btn bg-green-600 text-white hover:bg-green-700 transition duration-200"
          >
            🚀 Submit Advertisement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvertisementForm;
