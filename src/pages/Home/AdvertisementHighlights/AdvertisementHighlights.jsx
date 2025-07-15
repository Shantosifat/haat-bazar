// AdvertisementCarousel.jsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import UseAxios from "../../../hooks/UseAxios";
import Loading from "../../Shared/Loading";

const AdvertisementCarousel = () => {
  const axiosSecure = UseAxios();
  const navigate = useNavigate();

  // Fetch only approved ads
  const { data: ads = [], isLoading, isError } = useQuery({
    queryKey: ["approved-ads"],
    queryFn: async () => {
      const res = await axiosSecure.get("/ads/approved");
      return res.data;
    },
    staleTime: 60 * 1000,
  });

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

  if (isLoading) return <Loading></Loading>
  if (isError || !ads.length)
    return <p className="text-center text-gray-500 my-10">No approved ads available.</p>;

  return (
    <section className="max-w-7xl mx-auto min-h-[400px] my-10">
      <h2 className="text-2xl font-bold mb-4 text-center"> Advertisement Highlights</h2>

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
          <div key={ad._id} onClick={() => handleClick(ad.redirectUrl)} className="cursor-pointer">
            <img
              src={ad.image}
              alt={ad.title}
              className="h-[500px] object-cover w-full rounded-lg"
            />
            <div className="bg-black/50 text-white text-left p-3">
              <h3 className="text-xl font-semibold">{ad.title}</h3>
              <p className="text-sm">👨‍🌾 {ad.vendorName || "Vendor"}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default AdvertisementCarousel;
