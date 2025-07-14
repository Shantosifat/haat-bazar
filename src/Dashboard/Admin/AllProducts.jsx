/*  ───────────────────────────────────────────────────────────
    AllProducts.jsx  •  Admin view of every product
    ─────────────────────────────────────────────────────────── */
import { useState } from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../pages/Shared/Loading";

const AllProducts = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null); // product marked for delete

  /* ─────────────────────────── fetch all products ────────── */
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products"); // backend returns ALL products when no email query
      return res.data || [];
    },
    staleTime: 30_000, // 30s cache
  });

  /* ─────────────────────────── mutations ─────────────────── */
  const approveMut = useMutation({
    mutationFn: (id) => axiosSecure.put(`/products/${id}/approve`),
    onSuccess: () => {
      toast.success("Product approved");
      queryClient.invalidateQueries(["all-products"]);
    },
    onError: () => toast.error("Approval failed"),
  });

  const rejectMut = useMutation({
    mutationFn: ({ id, fb }) =>
      axiosSecure.put(`/products/${id}/reject`, { feedback: fb }),
    onSuccess: () => {
      toast.success("Product rejected");
      queryClient.invalidateQueries(["all-products"]);
    },
    onError: () => toast.error("Rejection failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/products/${id}`),
    onSuccess: () => {
      toast.success("Product deleted");
      setSelected(null);
      queryClient.invalidateQueries(["all-products"]);
    },
    onError: () => toast.error("Delete failed"),
  });

  /* ─────────────────────────── handlers ──────────────────── */
  const handleApprove = (id) => approveMut.mutate(id);

  const handleReject = (id) =>
    Swal.fire({
      title: "Reject Product?",
      input: "text",
      inputPlaceholder: "(Optional) feedback for the vendor",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) rejectMut.mutate({ id, fb: result.value || "" });
    });

  const handleDelete = () => selected && deleteMut.mutate(selected._id);

  /* ─────────────────────────── render ────────────────────── */
  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="text-center py-20 text-error">
        {error?.message || "Failed to load products"}
      </div>
    );

  return (
    <>
      <div className="p-6">
        {/* hot‑toast portal */}
        <Toaster position="top-right" />

        <h2 className="text-2xl font-semibold mb-6">
          All Products {products.length}
        </h2>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item</th>
                <th>Market</th>
                <th>Vendor</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, idx) => (
                <tr key={p._id}>
                  <td>{idx + 1}</td>

                  {/* image */}
                  <td>
                    <div className="avatar">
                      <div className="w-16 rounded">
                        <img src={p.image} alt={p.itemName} />
                      </div>
                    </div>
                  </td>

                  {/* basic info */}
                  <td>{p.itemName}</td>
                  <td>{p.marketName}</td>
                  <td>{p.vendorName}</td>
                  <td>{new Date(p.date).toLocaleDateString()}</td>

                  {/* status badge */}
                  <td>
                    <span
                      className={`badge ${
                        p.status === "approved"
                          ? "badge-success"
                          : p.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* action buttons */}
                  <td>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {/* approve */}
                      <button
                        onClick={() => handleApprove(p._id)}
                        className="btn btn-xs btn-success"
                        disabled={
                          p.status !== "pending" || approveMut.isPending
                        }
                      >
                        ✔
                      </button>

                      {/* reject */}
                      <button
                        onClick={() => handleReject(p._id)}
                        className="btn btn-xs btn-error"
                        disabled={p.status !== "pending" || rejectMut.isPending}
                      >
                        ✖
                      </button>

                      {/* update (vendor update page) */}
                      <Link
                        to={`/dashboard/vendor/updateProduct/${p._id}`}
                        className="btn btn-xs btn-info"
                      >
                        ✎
                      </Link>

                      {/* delete */}
                      <button
                        onClick={() => setSelected(p)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ───────── delete confirmation modal ───────── */}
        <dialog
          id="delete_modal"
          className={`modal ${selected ? "modal-open" : ""}`}
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Product</h3>
            <p className="py-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selected?.itemName}</span>? This
              action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                onClick={() => setSelected(null)}
                className="btn btn-sm"
                disabled={deleteMut.isPending}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-sm btn-error"
                disabled={deleteMut.isPending}
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default AllProducts;
