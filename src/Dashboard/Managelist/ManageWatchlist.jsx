import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import UseAuth from "../../hooks/UseAuth";
import Loading from "../../pages/Shared/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const ManageWatchlist = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null); // item pending delete

  /* ── fetch watch‑list items ── */
  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-watchlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist?email=${user.email}`);
      return res.data; // [{ productId, itemName, marketName, date, pricePerUnit, _id }]
    },
    staleTime: 60_000,
  });

  /* ── delete mutation ── */
  const deleteMut = useMutation({
    mutationFn: async ({ productId }) =>
      axiosSecure.delete(
        `/watchlist?productId=${productId}&email=${user.email}`
      ),
    onSuccess: () => {
      toast.success("Removed from watch‑list");
      queryClient.invalidateQueries(["my-watchlist", user?.email]);
      setSelected(null);
    },
    onError: () => toast.error("Failed to remove item"),
  });

  const handleRemove = () => {
    if (selected) deleteMut.mutate({ productId: selected.productId });
  };

  /* ── ui guards ── */
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load watch‑list: {error.message}
      </div>
    );

  if (items.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500">
        No items in your watch‑list yet.
        <button
          onClick={() => navigate("/products")}
          className="btn btn-sm btn-primary ml-2"
        >
          ➕ Add Products
        </button>
        <ToastContainer position="top-right" />
      </div>
    );

  /* ── component markup ── */
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6"> Manage Watch‑list</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-base font-semibold">
              <th>#</th>
              <th>🛍️ Product</th>
              <th>🏪 Market</th>
              <th>📅 Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.marketName}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td className="text-center flex gap-2 justify-center">
                  {/* ➕ Add More button  */}
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => navigate("/products")}
                  >
                    ➕ Add More
                  </button>

                  {/* ❌ Remove button  */}
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => setSelected(item)}
                  >
                    ❌ Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── confirmation modal ── */}
      <dialog
        className={`modal ${selected ? "modal-open" : ""}`}
        onClose={() => setSelected(null)}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Remove from watch‑list</h3>
          <p className="py-4">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{selected?.itemName}</span> from
            your watch‑list?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-sm"
              onClick={() => setSelected(null)}
              disabled={deleteMut.isLoading}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-error"
              onClick={handleRemove}
              disabled={deleteMut.isLoading}
            >
              {deleteMut.isLoading ? "Removing…" : "Remove"}
            </button>
          </div>
        </div>
      </dialog>

      {/* toast outlet */}
      <ToastContainer position="top-right" />
    </section>
  );
};

export default ManageWatchlist;
