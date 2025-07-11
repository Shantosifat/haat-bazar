import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const AdvertisementForm = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const newAd = {
        title: data.title,
        description: data.description,
        image: data.image,
        createdBy: user.email, // <-- Must include this!
        status: "pending",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/ads", newAd);
      if (res?.data?.insertedId) {
        toast.success("Advertisement added successfully!");
        reset();
      } else {
        Swal.fire("Error", "Failed to add advertisement.", "error");
      }
    } catch (error) {
      console.error("Add ad error:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className=" w-4xl mx-auto p-4  rounded-lg shadow">
      <h2 className="text-3xl text-center font-bold my-5 text-green-700">
        Add New Advertisement
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Ad Title</label>
          <input
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter ad title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm">Title is required</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Short Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="Write a short description"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">Description is required</p>
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
            <p className="text-red-600 text-sm">Image URL is required</p>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-green-600 w-full text-white hover:bg-green-700"
        >
          Add Advertisement
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AdvertisementForm;
