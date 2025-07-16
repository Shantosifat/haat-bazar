import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
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

  // Fetch product
  const {
    data: product,
    isLoading: productLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: async () => (await axiosSecure.get(`/products/${id}`)).data,
  });

  // Check watchlist status
  const {
    data: watchlistData = { isInWatchlist: false },
    isLoading: watchlistLoading,
  } = useQuery({
    queryKey: ["watchlist-check", id, user?.email],
    enabled: !!user?.email && !!product,
    queryFn: async () =>
      (
        await axiosSecure.get(
          `/watchlist/check?productId=${id}&email=${user.email}`
        )
      ).data,
    staleTime: 300_000,
    retry: false,
  });

  // Watchlist mutation
  const addToWatchlistMutation = useMutation({
    mutationFn: async () => {
      const orderInfo = {
        productId: product._id,
        itemName: product.itemName,
        marketName: product.marketName,
        pricePerUnit: product.pricePerUnit,
        date: product.date,
        image: product.image,
        userEmail: user.email,
        payment_status: "unpaid",
        delivery_status: "not-collected",
        orderDate: new Date().toISOString(),
      };
      return await axiosSecure.post("/watchlist", orderInfo);
    },
    onSuccess: () => {
      toast.success("Added to watchlist");
      queryClient.invalidateQueries(["watchlist-check", id, user?.email]);
      queryClient.invalidateQueries(["my-watchlist"]);
    },
    onError: () => toast.error("Failed to add to watchlist"),
  });

  const isDisabled =
    roleLoading ||
    !user ||
    role === "admin" ||
    role === "vendor" ||
    watchlistData?.isInWatchlist;

  const handleAddToWatchlist = () => {
    if (!isDisabled) {
      addToWatchlistMutation.mutate();
    }
  };

  const handleBuyNow = () => navigate(`/buy/${product._id}`);
  

  // Loading/error
  if (productLoading || watchlistLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-red-600 mt-6">Error: {error.message}</p>
    );
  if (!product) return <p className="text-center mt-6">Product not found.</p>;

  return (
    <section className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        🏪 {product.marketName}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.itemName}
          className="w-full h-64 object-cover rounded shadow-md"
        />

        {/* Details Section */}
        <div className="space-y-4">
          {/* Date */}
          <p className="text-gray-600">
            📅 Date:{" "}
            <span className="font-medium">
              {new Date(product.date).toLocaleDateString()}
            </span>
          </p>

          {/* Item List with Prices */}
          <div>
            <h2 className="font-semibold mb-2">🥕 Price List</h2>
            <ul className="list-disc list-inside border p-3 rounded  max-h-40 overflow-y-auto">
              {product.prices?.length > 0 ? (
                product.prices.map(({ date, price }, i) => (
                  <li key={i}>
                    {product.itemName} — ৳{price}/kg (on{" "}
                    {new Date(date).toLocaleDateString()})
                  </li>
                ))
              ) : (
                <li>
                  {product.itemName} — ৳{product.pricePerUnit}/kg
                </li>
              )}
            </ul>
          </div>

          {/* Vendor Info */}
          <div>
            <h2 className="font-semibold mb-2">👨‍🌾 Vendor Info</h2>
            <p>Name: {product.vendorName || "Unknown"}</p>
            <p>Email: {product.vendorEmail || "N/A"}</p>
          </div>

          {/* User Reviews */}
          <div>
            <h2 className="font-semibold mb-2">💬 User Comments</h2>
            <p className="italic text-gray-500">No reviews yet.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToWatchlist}
              disabled={isDisabled || addToWatchlistMutation.isLoading}
              className={`btn btn-primary ${
                isDisabled || addToWatchlistMutation.isLoading
                  ? "btn-disabled cursor-not-allowed"
                  : ""
              }`}
            >
              ⭐ Add to Watchlist
            </button>

            <Link to="/dashboard/orders">
              <button onClick={handleBuyNow} className="btn btn-success">
                🛒 Buy Product
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default ProductDetails;
