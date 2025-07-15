import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import useUserRole from "../../../hooks/UseUSerRole";
import Loading from "../../Shared/Loading";
import UseAxios from "../../../hooks/UseAxios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxios();
  const { user } = UseAuth();
  const { role, roleLoading } = useUserRole();
  const queryClient = useQueryClient();

  // Fetch product by ID using React Query v5 object syntax
  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
    error: productErrorMsg,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch watchlist status
  const {
    data: watchlistData,
    isLoading: watchlistLoading,
    // isError: watchlistError,
  } = useQuery({
    queryKey: ["watchlist-check", id, user?.email],
    queryFn: async () => {
      if (!user?.email || !product) return { isInWatchlist: false };
      const res = await axiosSecure.get(
        `/watchlist/check?productId=${product._id}&email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email && !!product,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // Mutation for adding to watchlist
  const addToWatchlistMutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.post("/watchlist", {
        productId: product._id,
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Added to your watchlist!");
      queryClient.invalidateQueries(["watchlist-check", id, user?.email]);
    },
    onError: () => {
      toast.error("Failed to add to watchlist");
    },
  });

  if (productLoading || watchlistLoading) return <Loading />;
  if (productError)
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load product details: {productErrorMsg.message}
      </div>
    );
  if (!product)
    return <div className="text-center mt-10">Product not found.</div>;

  const isWatchlistDisabled =
    roleLoading ||
    !user ||
    role === "admin" ||
    role === "vendor" ||
    watchlistData?.isInWatchlist;

  const handleAddToWatchlist = () => {
    if (isWatchlistDisabled) return;
    addToWatchlistMutation.mutate();
  };

  const handleBuyProduct = () => {
    navigate(`/buy/${product._id}`);
  };

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">🏪 {product.marketName}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.itemName}
          className="w-full md:w-1/3 rounded-lg object-cover shadow"
        />

        <div className="flex-1">
          <p className="text-gray-600 mb-2">
            📅 Date: {new Date(product.date).toLocaleDateString()}
          </p>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">🥕 Items & Prices</h2>
            <ul className="list-disc list-inside max-h-48 overflow-y-auto border rounded p-3">
              {product.prices && product.prices.length > 0 ? (
                product.prices.map(({ date, price }, idx) => (
                  <li key={idx}>
                    🧅 {product.itemName} — ৳{price}/kg (on{" "}
                    {new Date(date).toLocaleDateString()})
                  </li>
                ))
              ) : (
                <li>
                  🧅 {product.itemName} — ৳{product.pricePerUnit}/kg
                </li>
              )}
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">👨‍🌾 Vendor Information</h2>
            <p>Name: {product.vendorName || "Unknown"}</p>
            <p>Email: {product.vendorEmail || "N/A"}</p>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">💬 User Reviews</h2>
            <p className="italic text-gray-500">
              No reviews yet. Be the first to add one!
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToWatchlist}
              disabled={isWatchlistDisabled || addToWatchlistMutation.isLoading}
              className={`btn btn-primary ${
                isWatchlistDisabled || addToWatchlistMutation.isLoading
                  ? "btn-disabled cursor-not-allowed"
                  : ""
              }`}
              title={
                isWatchlistDisabled
                  ? "Admins, vendors or already added users cannot add to watchlist"
                  : "Add this product to your watchlist"
              }
            >
              ⭐ Add to Watchlist
            </button>

            <button onClick={handleBuyProduct} className="btn btn-success">
              🛒 Buy Product
            </button>

            <Link to="/dashboard/orders">
              <button className="btn btn-outline">📋 My Orders</button>
            </Link>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default ProductDetails;
