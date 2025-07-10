import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../pages/Shared/Loading";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Fetch the product
  const { data: product = [], isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      reset(data);
    },
  });

  const onSubmit = async (data) => {
    const updatedProduct = {
      itemName: data.itemName,
      pricePerUnit: parseFloat(data.pricePerUnit),
      marketName: data.marketName,
      marketDescription: data.marketDescription,
      itemDescription: data.itemDescription,
      date: data.date,
      image: data.image,
    };

    try {
      const res = await axiosSecure.patch(`/products/${id}`, updatedProduct);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Product Updated!",
          text: "✅ Product updated successfully.",
        });
        navigate("/dashboard/myproduct");
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "No fields were modified.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "❌ Something went wrong.",
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
        ✏️ Update Product
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl shadow"
      >
        {/* Item Name */}
        <div>
          <label className="font-medium">Item Name</label>
          <input
            {...register("itemName", { required: true })}
            className="input input-bordered w-full"
            defaultValue={product.itemName}
          />
          {errors.itemName && (
            <span className="text-red-600 text-sm">Required</span>
          )}
        </div>

        {/* Price Per Unit */}
        <div>
          <label className="font-medium">Price per Unit (৳)</label>
          <input
            type="number"
            step="0.01"
            {...register("pricePerUnit", { required: true })}
            className="input input-bordered w-full"
            defaultValue={product.pricePerUnit}
          />
        </div>

        {/* Market Name */}
        <div>
          <label className="font-medium">Market Name</label>
          <input
            {...register("marketName", { required: true })}
            className="input input-bordered w-full"
            defaultValue={product.marketName}
          />
        </div>

        {/* Market Description */}
        <div>
          <label className="font-medium">Market Description</label>
          <input
            {...register("marketDescription")}
            className="input input-bordered w-full"
            defaultValue={product.marketDescription}
          />
        </div>

        {/* Item Description */}
        <div className="md:col-span-2">
          <label className="font-medium">Item Description</label>
          <textarea
            {...register("itemDescription")}
            className="textarea textarea-bordered w-full"
            defaultValue={product.itemDescription}
          />
        </div>

        {/* Date */}
        <div className="md:col-span-2">
          <label className="font-medium">Date</label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="input input-bordered w-full"
            defaultValue={
              product.createdAt ? product.createdAt.slice(0, 10) : ""
            }
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="font-medium">Image URL</label>
          <input
            {...register("image", { required: true })}
            className="input input-bordered w-full"
            defaultValue={product.image}
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="btn bg-green-600 text-white hover:bg-green-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
