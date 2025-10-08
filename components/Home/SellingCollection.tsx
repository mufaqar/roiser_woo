"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

const collections = [
  { title: "SOFAS", img: "/images/selling-image-1.jpg" },
  { title: "FAUX LEATHER SOFAS", img: "/images/selling-image-2.jpg" },
  { title: "FABRIC SOFAS", img: "/images/selling-image-3.jpg" },
  { title: "CORNER SOFAS", img: "/images/selling-image-4.jpg" },
  { title: "RECLINER SOFAS", img: "/images/selling-image-1.jpg" },
];

// Custom Arrows
const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition z-10"
  >
    <IoChevronForward className="w-5 h-5 text-gray-400 hover:text-gray-600" />
  </button>
);

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition z-10"
  >
    <IoChevronBack className="w-5 h-5 text-gray-400 hover:text-gray-600" />
  </button>
);

const SellingCollection = () => {
  const getDelay = useAutoDelay();
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <h2 className="text-2xl md:text-4xl font-semibold mb-3 text-description">
            OUR BEST SELLING COLLECTION
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <p className="text-[#1A1A1A] max-w-3xl mx-auto mb-10 text-sm md:text-xl">
            Explore our extensive range of eco-friendly, hardworking, and
            low-maintenance composite decking boards, perfect for transforming
            your garden into a stylish haven. Not sure which is right for you?
            Compare our collections below.
          </p>
        </AnimateOnScroll>
        {/* Slider */}
        <Slider {...settings}>
          {collections.map((item, i) => (
            <AnimateOnScroll type="fade-up" key={i} delay={getDelay()}>
              <div className="px-2">
                <div className="relative rounded-lg overflow-hidden group">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="object-cover w-full h-80"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-4 transition-all duration-300 group-hover:bg-black/60">
                    <h3 className="text-white text-lg font-semibold tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SellingCollection;
