import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const JoinAsVendor = () => {
  return (
    <section className="bg-green-50 my-2 rounded-xl py-16">
      <motion.div
        className="max-w-6xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          Are You a Local Seller?
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Sell your fresh produce, groceries, or essentials on কাঁচাবাজার and
          reach thousands of daily buyers across Bangladesh.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-block mt-4"
        >
          <Link
            to="/vendor-registration"
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition"
          >
            Join as a Vendor
          </Link>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: "📦", title: "List Your Items" },
            { icon: "📈", title: "Grow Your Reach" },
            { icon: "💸", title: "Get Paid Fast" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="text-lg font-semibold text-green-800">
                {item.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default JoinAsVendor;
