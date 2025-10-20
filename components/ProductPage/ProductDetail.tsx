"use client";
import React from "react";
//import { FaPlayCircle, FaCheckCircle } from "react-icons/fa";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import Link from "next/link";
import { WooProduct } from "@/lib/woocommerce-types";

interface TrendingProductsProps {
  product: WooProduct;
}

function ProductDetail({ product }: TrendingProductsProps) {
  const getDelay = useAutoDelay();
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex flex-wrap space-x-8" aria-label="Tabs">
            <Link
              href="#"
              className="border-b-2 border-description text-description whitespace-nowrap py-4 px-1 text-sm font-medium"
            >
              Description
            </Link>
            <Link
              href="#"
              className="border-transparent text-description hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 text-sm font-medium"
            >
              Additional information
            </Link>
            <Link
              href="#"
              className="border-transparent text-description hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 text-sm font-medium"
            >
              Reviews ({product.rating_count})
            </Link>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Text Content */}
          <div className="">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          {/* Right Section - Image with Play Button */}

          {/* <div className="lg:w-1/2 relative">
            <img
              src="/images/ProductDetail.png"
              alt="Product Demonstration"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaPlayCircle className="h-14 w-14 text-white opacity-80 cursor-pointer hover:opacity-100 transition duration-300" />
            </div>
          </div> */}
        </div>
      </AnimateOnScroll>
    </div>
  );
}

export default ProductDetail;
