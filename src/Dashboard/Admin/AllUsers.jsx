import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire("✅ Updated!", "User role updated successfully.", "success");
        refetch();
      }
    } catch (error) {
      Swal.fire("❌ Error", "Failed to update role.", "error");
      console.error(error);
    }
  };

  return (
    <div className="px-10 pt-7">
      <h2 className="text-3xl font-bold mb-5 text-center text-green-700"> All Users</h2>
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
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-info">{user.role}</span>
                </td>
                <td className="flex gap-2 justify-center">
                  {["admin", "vendor", "user"].map((role) => (
                    <button
                      key={role}
                      disabled={user.role === role}
                      onClick={() => handleRoleUpdate(user._id, role)}
                      className={`btn btn-outline ${
                        user.role === role ? "btn-disabled" : "btn-outline"
                      }`}
                    >
                      Make {role}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
