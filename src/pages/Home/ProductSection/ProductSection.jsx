/*  ───────────────────────────────────────────────────────────
    ProductSection.jsx  •  Shows 6 latest approved markets
    ─────────────────────────────────────────────────────────── */
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../Shared/Loading";
import UseAxios from "../../../hooks/UseAxios";

const ProductSection = () => {
  const axiosSecure = UseAxios();
  const { user } = UseAuth();
  const navigate = useNavigate();

  /* ── query: six approved products ── */
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approved-products", 6],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/approved?limit=6");
      return res.data || [];
    },
    staleTime: 60_000, // 1minute
  });

  if (isLoading) return <Loading />;
  if (isError || products.length === 0)
    return (
      <div className="text-center py-16 text-error">
        No recent approved products to display.
      </div>
    );

  /* ── helper to extract the most current price on each product ── */
  const latestPrice = (product) => {
    // prices array might be unsorted; grab newest by date
    if (!product.prices || product.prices.length === 0)
      return product.pricePerUnit;

    const latest = [...product.prices].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )[0];
    return latest.price;
  };

  const handleViewDetails = (id) => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      navigate(`/product/${id}`);
    }
  };

  return (
    <section className="my-12">
      <h2 className="text-3xl font-semibold mb-6">Market Highlights</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p._id}
            className="card bg-base-100 shadow-md hover:shadow-xl transition"
          >
            {/* image */}
            <figure className="relative h-40 overflow-hidden">
              <img
                src={p.image}
                alt={p.itemName}
                className="object-cover w-full h-full"
              />
              {/* date badge */}
              <span className="absolute top-2 left-2 badge badge-accent">
                {new Date(p.date).toLocaleDateString()}
              </span>
            </figure>

            {/* body */}
            <div className="card-body p-4">
              {/* market name */}
              <h3 className="text-lg font-bold">🛒 {p.marketName}</h3>

              {/* item + price */}
              <p className="mt-2">
                {p.itemName && (
                  <>
                    📋 {p.itemName} —{" "}
                    <span className="font-semibold">৳{latestPrice(p)}/kg</span>
                  </>
                )}
              </p>

              {/* view details */}
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleViewDetails(p._id)}
                  className="btn btn-sm btn-primary"
                >
                  🔍 View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* optional “See more” button */}
      <div className="text-center mt-10">
        <Link to="/products" className="btn btn-outline">
          Browse All Markets
        </Link>
      </div>
    </section>
  );
};

export default ProductSection;
