"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import Link from "next/link";
import ProductCard from "../ProductCard";

const categories = [
  "BED ROOM",
  "DINING SETS",
  "DINING CHAIRS",
  "SOFAS & ARMCHAIRS",
];

const productData: Record<string, any[]> = {
  "BED ROOM": [
    {
      id: 1,
      image: "/images/card-img.png",
      name: "3 Seat Real Leather Electric Recliner Home Cinema Theatre Sofa...",
      rating: 4,
      reviews: 19,
      currentPrice: "$259.00",
      originalPrice: "$384.00",
      paymentPlan: "Pay $23.99 / 12m with",
      expressDelivery: "Express Delivery in 3-10 Days",
    },
    {
      id: 2,
      image: "/images/card-img.png",
      name: "3 Seat Real Leather Electric Recliner Home Cinema Theatre Sofa...",
      rating: 4,
      reviews: 19,
      currentPrice: "$259.00",
      originalPrice: "$384.00",
      paymentPlan: "Pay $23.99 / 12m with",
      expressDelivery: "Express Delivery in 3-10 Days",
    },
    {
      id: 3,
      image: "/images/card-img.png",
      name: "3 Seat Real Leather Electric Recliner Home Cinema Theatre Sofa...",
      rating: 4,
      reviews: 19,
      currentPrice: "$259.00",
      originalPrice: "$384.00",
      paymentPlan: "Pay $23.99 / 12m with",
      expressDelivery: "Express Delivery in 3-10 Days",
    },
    {
      id: 4,
      image: "/images/card-img.png",
      name: "3 Seat Real Leather Electric Recliner Home Cinema Theatre Sofa...",
      rating: 4,
      reviews: 19,
      currentPrice: "$259.00",
      originalPrice: "$384.00",
      paymentPlan: "Pay $23.99 / 12m with",
      expressDelivery: "Express Delivery in 3-10 Days",
    },
  ],
  "DINING SETS": [
    {
      id: 4,
      image: "/images/card-img.png",
      name: "6-Seater Oak Dining Table Set",
      rating: 5,
      reviews: 18,
      currentPrice: "$699.00",
      originalPrice: "$799.00",
      paymentPlan: "Pay $58.25 / 12m with",
      expressDelivery: "Express Delivery in 3-10 Days",
    },
    {
      id: 5,
      image: "/images/card-img.png",
      name: "Marble Dining Table with 4 Chairs",
      rating: 4,
      reviews: 10,
      currentPrice: "$549.00",
      originalPrice: "$699.00",
      paymentPlan: "Pay $45.75 / 12m with",
      expressDelivery: "Express Delivery in 3-10 Days",
    },
  ],
  "DINING CHAIRS": [
    {
      id: 6,
      image: "/images/card-img.png",
      name: "Upholstered Dining Chair (Set of 2)",
      rating: 4,
      reviews: 9,
      currentPrice: "$189.00",
      originalPrice: "$249.00",
      paymentPlan: "Pay $15.75 / 12m with",
      expressDelivery: "Express Delivery in 3-10 Days",
    },
  ],
  "SOFAS & ARMCHAIRS": [
    {
      id: 8,
      image: "/images/card-img.png",
      name: "3 Seat Real Leather Electric Recliner",
      rating: 5,
      reviews: 12,
      currentPrice: "$259.00",
      originalPrice: "$319.00",
      paymentPlan: "Pay $21.50 / 12m with",
      expressDelivery: "Express Delivery in 3-10 Days",
    },
  ],
};

// Custom arrows (gray)
const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow transition z-10"
  >
    <IoChevronForward className="w-6 h-6 text-gray-600" />
  </button>
);

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow transition z-10"
  >
    <IoChevronBack className="w-6 h-6 text-gray-600" />
  </button>
);

const OurLatestCollection = () => {
  const getDelay = useAutoDelay();
  const [activeTab, setActiveTab] = useState("BED ROOM");

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

  const currentProducts = productData[activeTab] || [];

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text--description">
            OUR LATEST COLLECTION
          </h2>
        </AnimateOnScroll>
        {/* Tabs */}
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 text-sm md:text-base font-medium rounded-full border transition-all ${
                  activeTab === cat
                    ? "bg--description  border--description"
                    : "bg-transparent text--description border-gray-300 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimateOnScroll>
        {/* Product Slider */}
        <Slider key={activeTab} {...settings}>
          {currentProducts.map((product) => (
            <AnimateOnScroll key={product.id} type="fade-up" delay={getDelay()}>
              <ProductCard item={product} />
            </AnimateOnScroll>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default OurLatestCollection;
