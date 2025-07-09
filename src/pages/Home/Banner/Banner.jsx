import React from "react";
import bannerImg from "../../../assets/banner.jpg";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section
      className="relative bg-center bg-cover h-[70vh] flex rounded-xl mt-3 items-center justify-center text-white"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-50"></div>

      {/* Animated Content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          আপনার নিত্যপ্রয়োজনীয় বাজার এখন হাতের মুঠোয়
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          কাঁচাবাজারের সকল পণ্যের দাম ও তথ্য এক জায়গায়। প্রতিদিন হালনাগাদ দাম দেখুন, তুলনা করুন, এবং আপনার কেনাকাটা সহজ করুন।
        </motion.p>

        <motion.a
          href="/allProducts"
          className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          🛒 আজকের বাজার দেখুন
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Banner;
