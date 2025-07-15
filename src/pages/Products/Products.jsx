import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAxios from "../../hooks/UseAxios";
import UseAuth from "../../hooks/UseAuth";
import Loading from "../Shared/Loading";

const Products = () => {
  const axiosPublic = UseAxios();
  const { user } = UseAuth();
  const navigate = useNavigate();

  const [sort, setSort] = useState(""); // "low" | "high" | ""
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-products", sort, startDate, endDate],
    queryFn: async () => {
      const query = new URLSearchParams();
      if (sort) query.append("sort", sort);
      if (startDate) query.append("start", startDate.toISOString());
      if (endDate) query.append("end", endDate.toISOString());

      const res = await axiosPublic.get(`/product/approved?${query.toString()}`);
      return res.data;
    },
    staleTime: 60_000,
  });

  const handleDetails = (id) => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      navigate(`/product/${id}`);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-red-500 text-center mt-6">
        Failed to load products: {error.message}
      </div>
    );

  return (
    <section className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center">🛍️ All Market Products</h2>

      {/* Filters & Sorting */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-base-200 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <label className="font-medium">Sort:</label>
          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="low">🔼 Price: Low to High</option>
            <option value="high">🔽 Price: High to Low</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="font-medium">📅 Date Range:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start date"
            className="input input-bordered w-32"
          />
          <span>to</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End date"
            className="input input-bordered w-32"
          />
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="card bg-base-100 shadow-md border rounded-xl overflow-hidden"
          >
            <figure>
              <img
                src={p.image}
                alt={p.itemName}
                className="w-full h-60 object-cover"
              />
            </figure>
            <div className="card-body space-y-2">
              <h3 className="text-lg font-bold">{p.itemName}</h3>
             <div className="flex gap-8a">
               <p> Price: ৳{p.pricePerUnit}/kg</p>
              <p>📅 {new Date(p.date).toLocaleDateString()}</p>
             </div>
              <div className="flex gap-5">
                <p>🏪 {p.marketName}</p>
              <p>👨‍🌾 {p.vendorName || "N/A"}</p>
              </div>
              <div className="card-actions mt-2">
                <button
                  className="btn btn-outline btn-sm w-full"
                  onClick={() => handleDetails(p._id)}
                >
                  🔍 View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
