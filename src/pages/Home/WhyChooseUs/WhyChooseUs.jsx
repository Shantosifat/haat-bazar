import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <section className="bg-cyan-100 rounded-xl mt-2 py-12">
      <motion.div
        className="max-w-6xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why Choose কাঁচাবাজার?
        </h2>
        <p className="text-gray-600 mb-8">
          We are committed to connecting local sellers and buyers with real-time
          prices, trusted vendors, and a hassle-free shopping experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Real-time Market Prices", icon: "📊" },
            { title: "Verified Local Vendors", icon: "✅" },
            { title: "Secure Online Payments", icon: "🔒" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-green-50 rounded-xl p-6 shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="text-xl font-semibold text-green-800">
                {item.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
