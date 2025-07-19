import { useState } from "react";
import { Link } from "react-router";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../pages/Shared/Loading";

const PAGE_SIZE = 7;

const AllProducts = () => {
  const axiosSecure   = UseAxiosSecure();
  const queryClient   = useQueryClient();
  const [page, setPage] = useState(1);        // 1‑based

  /* ───── fetch page of products ───── */
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-products", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?page=${page}&limit=${PAGE_SIZE}`
      );
      return res.data; // { total, page, products: [...] }
    },
    keepPreviousData: true,   // smoother page switch
    staleTime: 30_000,
  });

  const products = data?.products || [];
  const total    = data?.total    || 0;
  const pageCount = Math.ceil(total / PAGE_SIZE);

  /* ───── approve / reject / delete mutations (unchanged) ───── */
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
      queryClient.invalidateQueries(["all-products"]);
    },
    onError: () => toast.error("Delete failed"),
  });

  /* ───── handlers ───── */
  const handleApprove = (id) => approveMut.mutate(id);

  const handleReject = (id) =>
    Swal.fire({
      title: "Reject Product?",
      input: "text",
      inputPlaceholder: "(Optional) feedback",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Reject",
    }).then((r) => {
      if (r.isConfirmed) rejectMut.mutate({ id, fb: r.value || "" });
    });

  const handleDelete = (id) =>
    Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((r) => {
      if (r.isConfirmed) deleteMut.mutate(id);
    });

  /* ───── UI guards ───── */
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-error mt-20">
        {error?.message || "Failed to load products"}
      </p>
    );

  /* ───── render ───── */
  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-semibold mb-6">
        All Products – {total}
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
                <td>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-14 rounded">
                      <img src={p.image} alt={p.itemName} />
                    </div>
                  </div>
                </td>
                <td>{p.itemName}</td>
                <td>{p.marketName}</td>
                <td>{p.vendorName}</td>
                <td>{new Date(p.date).toLocaleDateString()}</td>
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
                <td>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => handleApprove(p._id)}
                      className="btn btn-xs btn-success"
                      disabled={
                        p.status !== "pending" || approveMut.isPending
                      }
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => handleReject(p._id)}
                      className="btn btn-xs btn-error"
                      disabled={
                        p.status !== "pending" || rejectMut.isPending
                      }
                    >
                      ✖
                    </button>
                   
                    <button
                      onClick={() => handleDelete(p._id)}
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

      {/* ───── pagination controls ───── */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          « Prev
        </button>
        <span className="px-4 py-2">
          Page {page} / {pageCount || 1}
        </span>
        <button
          className="btn btn-sm"
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          disabled={page >= pageCount}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
