import React, { useState } from "react";
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

  // WATCH‑LIST CHECK (unchanged)

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

  // REVIEWS – fetch existing reviews for this product
  //         GET /reviews?productId=<id>

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    enabled: !!id,
    queryFn: async () =>
      (await axiosSecure.get(`/reviews?productId=${id}`)).data, // expects []
  });

  const [rating, setRating] = useState(0); // 1‑5 stars
  const [comment, setComment] = useState("");

  const addReviewMutation = useMutation({
    mutationFn: async () => {
      if (rating < 1) throw new Error("Please select a rating");
      const payload = {
        productId: id,
        rating,
        comment,
        userName: user.displayName || "Anonymous",
        userEmail: user.email,
      };
      return await axiosSecure.post("/reviews", payload);
    },
    onSuccess: () => {
      toast.success("Review submitted");
      setRating(0);
      setComment("");
      queryClient.invalidateQueries(["reviews", id]);
    },
    onError: (err) => toast.error(err?.response?.data?.error || err.message),
  });

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
    if (!isDisabled) addToWatchlistMutation.mutate();
  };

  const handleBuyNow = () => navigate(`/buy/${product._id}`);

  if (productLoading || watchlistLoading || reviewsLoading) return <Loading />;
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

          {/* Price list */}
          <div>
            <h2 className="font-semibold mb-2">🥕 Price List</h2>
            <ul className="list-disc list-inside border p-3 rounded max-h-40 overflow-y-auto">
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

          {/* Vendor info */}
          <div>
            <h2 className="font-semibold mb-2">👨‍🌾 Vendor Info</h2>
            <p>Name: {product.vendorName || "Unknown"}</p>
            <p>Email: {product.vendorEmail || "N/A"}</p>
          </div>

          {/* 🆕  Review & Comment section */}
          <div>
            <h2 className="font-semibold mb-2">💬 User Comments</h2>

            {/* Existing reviews */}
            {reviews.length === 0 ? (
              <p className="italic text-gray-500">No reviews yet.</p>
            ) : (
              <ul className="space-y-3 mb-4 max-h-44 overflow-y-auto pr-2">
                {reviews.map((r) => (
                  <li
                    key={r._id}
                    className="border p-3 rounded shadow-sm bg-base-100"
                  >
                    <p className="font-medium">
                      {Array.from({ length: r.rating }).map((_, i) => "⭐")}
                    </p>
                    <p>{r.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      — {r.userName} ({r.userEmail}) •{" "}
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {/* Submit review (only for logged‑in normal users) */}
            {user && role === "user" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addReviewMutation.mutate();
                }}
                className="space-y-2"
              >
                {/* Star rating */}
                <div className="flex items-center gap-2">
                  <span className="mr-2">Rate:</span>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setRating(n)}
                      className={`text-2xl ${
                        rating >= n ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                {/* Comment box */}
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts (e.g., price feels too high)…"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  required
                />

                <button
                  className="btn btn-info btn-sm"
                  disabled={addReviewMutation.isLoading}
                >
                  {addReviewMutation.isLoading
                    ? "Submitting…"
                    : "Submit Review"}
                </button>
              </form>
            )}
          </div>

          {/* Action buttons */}
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

            <button
              onClick={handleBuyNow}
              disabled={roleLoading || role !== "user"}
              className={`btn btn-success ${
                roleLoading || role !== "user"
                  ? "btn-disabled cursor-not-allowed"
                  : ""
              }`}
            >
              🛒 Buy Product
            </button>
          </div>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default ProductDetails;
