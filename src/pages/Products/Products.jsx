import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../hooks/UseAxios";
import UseAuth from "../../hooks/UseAuth";
import { useNavigate } from "react-router";
import Loading from "../Shared/Loading";

const Products = () => {
  const axiosPublic = UseAxios();
  const { user } = UseAuth();
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["approvedProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product/approved");
      return res.data;
    },
  });

  const handleViewDetails = (id) => {
    // if (!user) return navigate("/login");
    navigate(`/product/${id}`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto py-5">
      <h2 className="text-3xl font-bold text-center mb-6">🛒 All Approved Products</h2>

      {/* 🧺 Product Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className=" shadow-md rounded-xl p-4 hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <img
              src={p.image}
              alt={p.itemName}
              className="h-48 w-full object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-bold mb-1">🥕 {p.itemName}</h3>
            <p>💵 Price: ৳{p.pricePerUnit}/kg</p>
            <p>📅 Date: {new Date(p.date).toLocaleDateString()}</p>
            <p>🏪 Market: {p.marketName}</p>
            <p>👨‍🌾 Vendor: {p.vendorName}</p>
            <button
              onClick={() => handleViewDetails(p._id)}
              className="mt-3 btn btn-sm bg-green-600 text-white w-full"
            >
              🔍 View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
