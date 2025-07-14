import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../pages/Shared/Loading";
import { FiCheck, FiX } from "react-icons/fi";

const AllAdvertisements = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: ads = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-ads"],
    queryFn: async () => {
      const res = await axiosSecure.get("/ads");
      return res.data;
    },
  });

  const handleAccept = async (adId) => {
    try {
      const res = await axiosSecure.patch(`/ads/${adId}`, {
        status: "approved",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("✅ Approved!", "Ad status set to approved.", "success");
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("❌ Error", "Failed to approve the ad.", "error");
    }
  };

  const handleDelete = (adId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This advertisement will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/ads/${adId}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Advertisement deleted.", "success");
            refetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="px-10 pt-7">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        📢 All Advertisements (Admin View)
      </h2>
      <div className="overflow-x-auto  rounded-xl shadow">
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
            {ads.map((ad, index) => (
              <tr key={ad._id}>
                <td>{index + 1}</td>
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
                <td className="flex gap-3 justify-center items-center">
                  <button
                    onClick={() => handleAccept(ad._id)}
                    disabled={
                      ad.status === "approved" || ad.status === "rejected"
                    }
                    className="btn btn-xs btn-success"
                    aria-label="Accept"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="btn btn-xs btn-error"
                    aria-label="Reject"
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
    </div>
  );
};

export default AllAdvertisements;
