// ProductSection.jsx – enhanced with inside‑card animations
import React from "react";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

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
    staleTime: 60_000,
  });

  if (isLoading) return <Loading />;
  if (isError || products.length === 0)
    return (
      <div className="text-center py-16 text-error">
        No recent approved products to display.
      </div>
    );

  /* helper: latest price */
  const latestPrice = (product) => {
    if (!product.prices || product.prices.length === 0)
      return product.pricePerUnit;
    const latest = [...product.prices].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )[0];
    return latest.price;
  };

  const handleViewDetails = (id) => {
    if (!user) navigate("/login", { replace: true });
    else navigate(`/product/${id}`);
  };

  /* ── animation variants ── */
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="my-12"
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.15 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-3xl text-center font-semibold mb-6"
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Market Highlights
      </motion.h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <motion.div
            key={p._id}
            className="card bg-base-100 shadow-md hover:shadow-xl transition group"
            variants={fadeIn}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            {/* image with subtle zoom on card hover */}
            <motion.figure
              className="relative h-40 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.img
                src={p.image}
                alt={p.itemName}
                className="object-cover w-full h-full"
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              <span className="absolute top-2 left-2 badge badge-accent">
                {new Date(p.date).toLocaleDateString()}
              </span>
            </motion.figure>

            {/* body */}
            <div className="card-body p-4">
              <h3 className="text-lg font-bold">🛒 {p.marketName}</h3>
              <p className="mt-2">
                {p.itemName && (
                  <>
                    📋 {p.itemName} —
                    <span className="font-semibold"> ৳{latestPrice(p)}/kg</span>
                  </>
                )}
              </p>
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleViewDetails(p._id)}
                  className="btn btn-sm btn-primary"
                >
                  🔍 View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-10"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link to="/products" className="btn btn-outline">
          Browse All Markets
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default ProductSection;
