import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../pages/Shared/Loading";

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [search, setSearch] = useState("");   // controlled input
  const [query,  setQuery]  = useState("");   // debounced / submitted term

  /* ---- fetch users (filtered by query) ---- */
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-users", query],           // include query in key
    queryFn: async () => {
      const url = query ? `/users?q=${encodeURIComponent(query)}` : "/users";
      const res = await axiosSecure.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  /* ---- update role (unchanged logic) ---- */
  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire("✅ Updated!", "User role updated.", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("❌ Error", "Failed to update role.");
    }
  };

  /* ---- search submit ---- */
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  if (isLoading) return <Loading />;

  return (
    <div className="px-10 pt-7">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-5">
        All Users
      </h2>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="mb-4 max-w-md mx-auto flex">
        <input
          type="text"
          value={search}
          placeholder="Search by name or email…"
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered flex-1"
        />
        <button className="btn btn-primary ml-2" type="submit">
          Search
        </button>
      </form>

      <div className="overflow-x-auto bg-slate-800 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id}>
                <td>{idx + 1}</td>
                <td>{u.name || "N/A"}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    className={`badge ${
                      {
                        admin: "badge-success",
                        vendor: "badge-warning",
                        user:  "badge-info",
                      }[u.role] || "badge-neutral"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="flex gap-2 justify-center">
                  {["admin", "vendor", "user"].map((r) => (
                    <button
                      key={r}
                      disabled={u.role === r}
                      onClick={() => handleRoleUpdate(u._id, r)}
                      className={`btn btn-xs ${
                        u.role === r ? "btn-disabled" : "btn-outline"
                      }`}
                    >
                      Make&nbsp;{r}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
