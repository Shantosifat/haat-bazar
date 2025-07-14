import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import Loading from "../../pages/Shared/Loading";
import UseAxios from "../../hooks/UseAxios";

const MyOrders = () => {
  const axiosSecure = UseAxios();
  const { user } = UseAuth();
  const navigate = useNavigate();

  // Fetch watch‑list items for this user
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-watchlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist?email=${user.email}`);
      return res.data;           // [{ productId, itemName, marketName, pricePerUnit, date, … }]
    },
    staleTime: 60_000,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load watch‑list: {error.message}
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500">
        No items in your watch‑list yet.
      </div>
    );

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">⭐ My Watch‑list</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-base font-semibold">
              <th>#</th>
              <th>🛍️ Product Name</th>
              <th>🏪 Market</th>
              <th>৳ Price</th>
              <th>📅 Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item, idx) => (
              <tr key={item.productId}>
                <td>{idx + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.marketName}</td>
                <td>৳{item.pricePerUnit}/kg</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleViewDetails(item.productId)}
                  >
                    🔍 View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyOrders;
