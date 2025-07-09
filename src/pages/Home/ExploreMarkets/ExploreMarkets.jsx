import React from "react";
import { motion } from "framer-motion";

const ExploreMarkets = () => {
  const markets = [
    { name: "Karwan Bazar", region: "Dhaka", icon: "🏙️" },
    { name: "Chawk Bazar", region: "Chattogram", icon: "🌊" },
    { name: "Rayer Bazar", region: "Khulna", icon: "🌾" },
    { name: "Shib Bazar", region: "Sylhet", icon: "⛰️" },
  ];
  return (
    <section className="bg-cyan-100 rounded-xl mt-2 py-16">
      <motion.div
        className="max-w-6xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Explore Local Markets
        </h2>
        <p className="text-gray-600 mb-8">
          Discover what’s trending in your area. Click on a market to view live
          prices and vendor listings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {markets.map((market, index) => (
            <motion.div
              key={index}
              className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-2">{market.icon}</div>
              <h4 className="text-xl font-semibold text-green-800">
                {market.name}
              </h4>
              <p className="text-gray-600">{market.region} Division</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExploreMarkets;
