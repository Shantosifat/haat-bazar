import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../pages/Shared/Loading";
import { FiCheck, FiX } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

const PAGE_SIZE = 10;

const AllAdvertisements = () => {
  const axiosSecure = UseAxiosSecure();
  const [page, setPage] = useState(1);

  /* ── fetch one page of ads ── */
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-ads", page],
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`/ads?page=${page}&limit=${PAGE_SIZE}`);
      return res.data; // { total, page, ads }
    },
  });

  const ads   = data?.ads   || [];
  const total = data?.total || 0;
  const pageCount = Math.ceil(total / PAGE_SIZE);

  /* ───── action helpers (unchanged logic) ───── */
  const handleAccept = async (adId) => {
    try {
      const res = await axiosSecure.patch(`/ads/${adId}`, { status: "approved" });
      if (res.data.modifiedCount > 0) {
        toast.success("Ad approved");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve");
    }
  };

  const handleDelete = (adId) => {
    Swal.fire({
      title: "Delete advertisement?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/ads/${adId}`);
          if (res.data.deletedCount > 0) {
            toast.success("Ad deleted");
            refetch();
          }
        } catch (err) {
          console.error(err);
          toast.error("Delete failed");
        }
      }
    });
  };

  /* ───── UI guards ───── */
  if (isLoading) return <Loading />;

  return (
    <div className="px-10 pt-7">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        All Advertisements ({total})
      </h2>

      {/* table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Vendor</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, idx) => (
              <tr key={ad._id}>
                <td>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                <td>{ad.title}</td>
                <td>{ad.description}</td>
                <td>
                  <span
                    className={`badge ${
                      ad.status === "approved"
                        ? "badge-success"
                        : ad.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td>{ad.createdBy || "—"}</td>
                <td className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleAccept(ad._id)}
                    disabled={ad.status !== "pending"}
                    className="btn btn-xs btn-success"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="btn btn-xs btn-error"
                  >
                    <FiX />
                  </button>
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No advertisements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination controls */}
      <div className="flex justify-center gap-3 mt-6">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          « Prev
        </button>
        <span className="py-2">
          Page {page} / {pageCount || 1}
        </span>
        <button
          className="btn btn-sm"
          disabled={page >= pageCount}
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

export default AllAdvertisements;
