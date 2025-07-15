import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../pages/Shared/Loading";

const AllOrders = () => {
  const axiosSecure = UseAxiosSecure();
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-orders", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/orders?email=${search}`);
      return res.data;
    },
    staleTime: 60_000,
    enabled: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(email.trim());
  };

  return (
    <section className="px-10 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📦 All Users’ Orders</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6 flex justify-center gap-4">
        <input
          type="email"
          placeholder="Search by user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-72"
          required
        />
        <button type="submit" className="btn btn-primary">
          🔍 Search
        </button>
      </form>

      {/* Loading & Error */}
      {isLoading && <Loading />}
      {isError && (
        <div className="text-center text-red-600 mt-10">
          Failed to load orders: {error.message}
        </div>
      )}

      {/* Orders Table */}
      {!isLoading && orders.length === 0 ? (
        <p className="text-center text-gray-500">No matching orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr className="text-base font-semibold">
                <th>#</th>
                <th>🛍️ Product</th>
                <th>🏪 Market</th>
                <th>👤 Buyer Email</th>
                <th>৳ Price</th>
                <th>📅 Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, idx) => (
                <tr key={o._id}>
                  <td>{idx + 1}</td>
                  <td>{o.itemName}</td>
                  <td>{o.marketName}</td>
                  <td>{o.userEmail}</td>
                  <td>৳{o.pricePerUnit}/kg</td>
                  <td>{new Date(o.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AllOrders;
