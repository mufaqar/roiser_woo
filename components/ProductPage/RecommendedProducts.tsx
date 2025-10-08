"use client";
import React from "react";
import { FaTruck } from "react-icons/fa";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import Image from "next/image";
import Link from "next/link";

const RecommendedProducts = () => {
  const getDelay = useAutoDelay();
  const products = [
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
      name: "2 Seat Fabric Recliner Sofa with Cup Holders...",
      rating: 5,
      reviews: 24,
      currentPrice: "$199.00",
      originalPrice: "$289.00",
      paymentPlan: "Pay $16.99 / 12m with",
      expressDelivery: "Express Delivery in 3-8 Days",
    },
    {
      id: 3,
      image: "/images/card-img.png",
      name: "Leather Home Cinema Recliner with Storage Console...",
      rating: 4,
      reviews: 32,
      currentPrice: "$299.00",
      originalPrice: "$399.00",
      paymentPlan: "Pay $25.99 / 12m with",
      expressDelivery: "Express Delivery in 5-12 Days",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <h2 className="text-center text-2xl md:text-4xl font-semibold mb-10 text-title">
            Recommended Products
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-md shadow-md overflow-hidden p-3 hover:shadow-lg transition-shadow duration-300"
              >
                <Link href='/single-product'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full rounded-md object-cover"
                  />
                </Link>
                <div className="pt-4 py-4">
                  {/* Stock + Delivery Info */}
                  <div className="flex items-center text-xs mb-2 flex-wrap gap-2">
                    <span className="bg-[#EFF0F2] px-2 py-0.5 rounded-sm text-title">
                      In stock
                    </span>
                    <div className="flex items-center gap-1 text-title bg-[#EFF0F2] p-1 px-3 rounded-sm">
                      <FaTruck size={14} />
                      <span>{product.expressDelivery}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex text-[#F2675D]">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${i < product.rating
                            ? "fill-current"
                            : "text-gray-300 stroke-current"
                            }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-title">
                      {product.reviews} reviews
                    </span>
                  </div>

                  {/* Product Title */}
                  <Link href='/single-product'>
                    <h3 className="text-base font-semibold text-title mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  {/* Price */}
                  <div className="flex items-baseline mb-2">
                    <p className="text-xl font-bold text-[#F2675D] mr-2">
                      {product.currentPrice}
                    </p>
                    <p className="text-sm text-title line-through">
                      {product.originalPrice}
                    </p>
                  </div>

                  {/* Payment Plan */}
                  <p className="text-sm text-title font-semibold">
                    {product.paymentPlan}{" "}
                    <span className="font-semibold text-gray-800">Klarna</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>

    </section>
  );
};

export default RecommendedProducts;
