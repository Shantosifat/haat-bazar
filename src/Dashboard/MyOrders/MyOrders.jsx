import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import Loading from "../../pages/Shared/Loading";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import useUserRole from "../../hooks/UseUSerRole";

const MyOrders = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();

  /* ── fetch watch‑list items ── */
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/watchlist?email=${user.email}`)).data,
    staleTime: 60_000,
  });

  /* ── handlers ── */
  const handleViewDetails = (productId) => navigate(`/product/${productId}`);
  const handlePay = (id) => {navigate(`/dashboard/paymentcard/${id}`);} 

  /* ── states ── */
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-red-600 mt-10">
        Failed to load watch‑list: {error.message}
      </p>
    );
  if (orders.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        No items in your watch‑list yet.
      </p>
    );

  /* ── table ── */
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">⭐ My Watch‑list</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-base font-semibold">
              <th>#</th>
              <th>🛍️ Product</th>
              <th>🏪 Market</th>
              <th>৳ Price</th>
              <th>📅 Date</th>
              <th>💳 Payment</th>   {/* new */}
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item, idx) => (
              <tr key={item._id /* watchlist doc id */}>
                <td>{idx + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.marketName}</td>
                <td>৳{item.pricePerUnit}/kg</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>

                {/* payment badge */}
                <td>
                  <span
                    className={`badge ${
                      item.payment_status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {item.payment_status || "unpaid"}
                  </span>
                </td>

                {/* actions */}
                <td className="text-center space-x-2">
              
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleViewDetails(item.productId)}
                  >
                    🔍 Details
                  </button>

                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => handlePay(item._id)}
                    disabled={item.payment_status === "paid"}
                  >
                    💳 Pay
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
