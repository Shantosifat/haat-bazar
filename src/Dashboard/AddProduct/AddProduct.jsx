import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
 import toast, { Toaster } from "react-hot-toast";

const AddProduct = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure()
  const [date, setDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


const onSubmit = async (data) => {
  const product = {
    vendorEmail: user?.email,
    vendorName: user?.displayName,
    marketName: data.marketName,
    date: date.toISOString().split("T")[0],
    marketDescription: data.marketDescription,
    itemName: data.itemName,
    status: "pending",
    image: data.image,
    pricePerUnit: parseFloat(data.pricePerUnit),
    prices: [
      {
        date: date.toISOString().split("T")[0],
        price: parseFloat(data.pricePerUnit),
      },
    ],
    itemDescription: data.itemDescription || "",
  };

  try {
    const res = await axiosSecure.post('/products', product);
    if (res.data.insertedId) {
      toast.success(" Product added successfully!");
      
      // reset();
      // navigate("/dashboard/vendor-products");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("❌ Failed to add product. Please try again.");
  }
};


  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-base-100 shadow-xl rounded-2xl border border-base-300">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">Add New Product</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vendor Info */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2 text-base-content">Vendor Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="input input-bordered w-full "
              />
            </div>
            <div>
              <label className="label">Vendor Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered w-full "
              />
            </div>
          </div>
        </div>

        {/* Market Info */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2 text-base-content">Market Information</h3>
          <div className="space-y-4">
            <div>
              <label className="label">Market Name</label>
              <input
                type="text"
                placeholder="e.g., Kawran Bazar"
                {...register("marketName", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.marketName && <p className="text-error text-sm mt-1">Market Name is required</p>}
            </div>
            <div>
              <label className="label">Market Description</label>
              <textarea
                placeholder="Location, establishment year, etc."
                {...register("marketDescription", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.marketDescription && <p className="text-error text-sm mt-1">Description is required</p>}
            </div>
            <div className="flex items-center gap-2">
              <label className="label">Date :</label>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2 text-base-content">Product Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Item Name</label>
              <input
                type="text"
                placeholder="e.g., Onion"
                {...register("itemName", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.itemName && <p className="text-error text-sm mt-1">Item Name is required</p>}
            </div>
            <div>
              <label className="label">Price Per Unit (৳)</label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g., 30"
                {...register("pricePerUnit", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.pricePerUnit && <p className="text-error text-sm mt-1">Price is required</p>}
            </div>
            <div>
              <label className="label">Product Image (URL)</label>
              <input
                type="text"
                placeholder="https://image.url"
                {...register("image", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.image && <p className="text-error text-sm mt-1">Image URL is required</p>}
            </div>
            <div>
              <label className="label">Item Description (optional)</label>
              <textarea
                placeholder="Fresh, high quality, etc."
                {...register("itemDescription")}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button type="submit" className="btn btn-primary ">Submit Product</button>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddProduct;
