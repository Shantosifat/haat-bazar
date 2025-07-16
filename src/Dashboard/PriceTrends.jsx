import React, { useState } from "react";
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
  const [selected, setSelected] = useState(null); // selected tracked item

  /* 1️⃣ fetch list of tracked items for this user */
  const { data: tracked = [], isLoading: listLoading } = useQuery({
    queryKey: ["tracked-items", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/api/tracked?email=${user.email}`)).data,
  });

  /* 2️⃣ fetch price history for the selected product */
  const {
    data: history = [],
    isLoading: histLoading,
  } = useQuery({
    queryKey: ["price-history", selected?.productId],
    enabled: !!selected?.productId,
    queryFn: async () =>
      (await axiosSecure.get(`/api/price-history/${selected.productId}`)).data,
  });

  /* 3️⃣ compute trend (last price − first) / first */
  const trendPct = (() => {
    if (history.length < 2) return 0;
    const first = history[0].price;
    const last = history[history.length - 1].price;
    return ((last - first) / first) * 100;
  })();

  /* ---- Loading guards ---- */
  if (listLoading) return <Loading />;
  if (!selected && tracked.length) setSelected(tracked[0]); // auto‑select 1st

  return (
    <section className="max-w-5xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6">View Price Trends</h2>

      <div className="grid md:grid-cols-[180px_1fr] gap-4">
        {/* sidebar list */}
        <aside className="border rounded-lg">
          <h3 className="font-semibold p-3">Tracked Items</h3>
          {tracked.map((t) => (
            <button
              key={t._id}
              onClick={() => setSelected(t)}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 
                hover:bg-base-200 ${
                  selected?._id === t._id ? "bg-base-200 font-semibold" : ""
                }`}
            >
              <span className="text-xl">🥕</span>
              <span>{t.itemName}</span>
            </button>
          ))}
          {tracked.length === 0 && (
            <p className="p-4 text-sm text-gray-500">No tracked items yet.</p>
          )}
        </aside>

        {/* chart panel */}
        <div className="border rounded-lg p-6 relative min-h-[320px]">
          {histLoading ? (
            <Loading />
          ) : selected ? (
            <>
              <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
                🥕 {selected.itemName}
              </h3>
              <p className="text-gray-500 mb-4">
                {selected.marketName} &mdash; Vendor: {selected.vendorName}
              </p>

              {history.length ? (
                <ResponsiveContainer width="100%" height={260}>
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
                        new Date(d).toLocaleDateString()
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#3b82f6"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-400 mt-20">
                  No history data.
                </p>
              )}

              {/* trend line */}
              <p className="mt-4 font-medium">
                Trend:&nbsp;
                <span
                  className={
                    trendPct > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {trendPct.toFixed(1)}%
                </span>{" "}
                last&nbsp;{history.length} days
              </p>
            </>
          ) : (
            <p className="text-center text-gray-400 mt-20">
              Select an item to see its trend.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PriceTrends;
