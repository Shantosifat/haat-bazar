import React from "react";
import bannerImg from "../../../assets/banner.jpg"; // adjust the path as needed

const Banner = () => {
  return (
    <section
      className="relative bg-center mt-3 rounded-xl bg-cover h-[70vh] flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0  bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          আপনার নিত্যপ্রয়োজনীয় বাজার এখন হাতের মুঠোয়
        </h1>
        <p className="mt-4 text-lg md:text-xl font-semibold text-pink-50">
          কাঁচাবাজারের সকল পণ্যের দাম ও তথ্য এক জায়গায়। প্রতিদিন হালনাগাদ দাম দেখুন, তুলনা করুন, এবং আপনার কেনাকাটা সহজ করুন।
        </p>
        <a
          href="/allProducts"
          className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
        >
          🛒 আজকের বাজার দেখুন
        </a>
      </div>
    </section>
  );
};

export default Banner;
