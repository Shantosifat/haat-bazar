import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import UseAuth from "../hooks/UseAuth";
import Loading from "../pages/Shared/Loading";

const PriceTrends = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [selected, setSelected] = useState(null);

  // ✅ Fetch tracked items
  const {
    data: tracked = [],
    isLoading: listLoading,
    error: listError,
  } = useQuery({
    queryKey: ["tracked-items", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/api/tracked?email=${user.email}`)).data,
  });

  // ✅ Fetch price history
  const {
    data: history = [],
    isLoading: histLoading,
    error: histError,
  } = useQuery({
    queryKey: ["price-history", selected?.productId],
    enabled: !!selected?.productId,
    queryFn: async () =>
      (await axiosSecure.get(`/api/price-history/${selected.productId}`)).data,
  });

  // ✅ Auto-select the first tracked item
  useEffect(() => {
    if (!selected && tracked.length) {
      setSelected(tracked[0]);
    }
  }, [tracked, selected]);

  // ✅ Calculate trend %
  const trendPct = (() => {
    if (history.length < 2) return 0;
    const first = history[0].price;
    const last = history[history.length - 1].price;
    return ((last - first) / first) * 100;
  })();

  // ✅ Debug logs
  useEffect(() => {
    console.log("Tracked items:", tracked);
    console.log("Selected item:", selected);
    console.log("Price history:", history);
  }, [tracked, selected, history]);

  if (listLoading) return <Loading />;
  if (listError) return <p className="text-red-500 text-center">Failed to load tracked items.</p>;

  return (
    <section className="px-10 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        📈 Price Trends Overview
      </h2>

      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="border rounded-lg shadow-sm">
          <h3 className="font-semibold p-4 border-b">Tracked Items</h3>
          {tracked.length ? (
            tracked.map((item) => (
              <button
                key={item._id}
                onClick={() => setSelected(item)}
                className={`w-full text-left px-5 py-3 transition-all duration-200 hover:bg-gray-100 ${
                  selected?._id === item._id ? "bg-blue-100 font-semibold" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🥕</span>
                  <span>{item.itemName}</span>
                </div>
              </button>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-500">
              You haven’t tracked any item yet.{" "}
              <a href="/products" className="text-blue-600 underline">
                Track products now →
              </a>
            </p>
          )}
        </aside>

        {/* Chart Display */}
        <div className="border rounded-lg p-6 shadow-sm min-h-[320px]">
          {histLoading ? (
            <Loading />
          ) : selected ? (
            <>
              <div className="mb-2">
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                  🥕 {selected.itemName}
                </h3>
                <p className="text-gray-500">
                  {selected.marketName} — Vendor: {selected.vendorName}
                </p>
              </div>

              {history.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d) =>
                        new Date(d).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`৳ ${value}`, "Price"]}
                      labelFormatter={(d) =>
                        new Date(d).toLocaleDateString("en-GB")
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-400 mt-20">
                  No price history found for this item.
                </p>
              )}

              <div className="mt-5 text-lg font-medium">
                Trend:&nbsp;
                <span
                  className={
                    trendPct > 0
                      ? "text-green-600"
                      : trendPct < 0
                      ? "text-red-600"
                      : "text-gray-500"
                  }
                >
                  {trendPct.toFixed(1)}%
                </span>{" "}
                in last {history.length} day{history.length > 1 ? "s" : ""}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-400 mt-20">
              Select a product to view its trend.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PriceTrends;
