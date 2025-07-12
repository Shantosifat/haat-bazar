import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../pages/Shared/Loading";

const AllAdvertisements = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: ads = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-ads"],
    queryFn: async () => {
      const res = await axiosSecure.get("/ads");
      return res.data;
    },
  });

  const handleStatusChange = async (adId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/ads/${adId}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("✅ Updated!", `Ad ${newStatus} successfully.`, "success");
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("❌ Error", "Failed to update ad status.", "error");
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
      <div className="overflow-x-auto bg-slate-600 rounded-xl shadow">
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
                  <select
                    value={ad.status}
                    onChange={(e) =>
                      handleStatusChange(ad._id, e.target.value)
                    }
                    className="select select-sm select-bordered"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>{ad.createdBy || "—"}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="btn btn-xs bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
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
