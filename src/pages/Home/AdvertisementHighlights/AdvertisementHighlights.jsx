import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion"; // 🆕 animation

import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import UseAxios from "../../../hooks/UseAxios";
import Loading from "../../Shared/Loading";

const AdvertisementCarousel = () => {
  const axiosSecure = UseAxios();
  const navigate = useNavigate();

  /* ------------------------------------------------------------------
     FETCH only approved ads
  ------------------------------------------------------------------ */
  const {
    data: ads = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approved-ads"],
    queryFn: async () => {
      const res = await axiosSecure.get("/ads/approved");
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  /* ------------------------------------------------------------------
     click handler – internal vs external links
  ------------------------------------------------------------------ */
  const handleClick = (url) => {
    if (!url) {
      toast.error("No redirect URL provided");
      return;
    }

    if (url.startsWith("/")) {
      navigate(url); // internal route
    } else {
      window.open(url, "_blank"); // external link
    }
  };

  /* ------------------------------------------------------------------
     Loading / empty states
  ------------------------------------------------------------------ */
  if (isLoading) return <Loading />;
  if (isError || !ads.length)
    return (
      <p className="text-center text-gray-500 my-10">
        No approved ads available.
      </p>
    );

  /* ------------------------------------------------------------------
     Animations – variants
  ------------------------------------------------------------------ */
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="min-h-[400px] my-10 rounded-2xl"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">
        Advertisement Highlights
      </h2>

      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={3000}
        transitionTime={800}
        swipeable
        emulateTouch
      >
        {ads.map((ad) => (
          <motion.div
            key={ad._id}
            onClick={() => handleClick(ad.redirectUrl)}
            className="cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.img
              src={ad.image}
              alt={ad.title}
              className="h-[500px] object-cover w-full rounded-lg"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* overlay text */}
            <motion.div
              className="bg-black/50 text-white text-left p-3"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold">{ad.title}</h3>
              <p className="text-sm">👨‍🌾 {ad.vendorName || "Vendor"}</p>
            </motion.div>
          </motion.div>
        ))}
      </Carousel>
    </motion.section>
  );
};

export default AdvertisementCarousel;
