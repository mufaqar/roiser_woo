"use client";
import React, { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaShippingFast,
  FaShieldAlt,
  FaBoxOpen,
  FaPlus,
  FaMinus,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { BsChatSquareText } from "react-icons/bs";
import Link from "next/link";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import { WooProduct } from "@/lib/woocommerce-types";

interface TrendingProductsProps {
  product: WooProduct;
}

const ProductPage = ({ product }: TrendingProductsProps) => {
  const getDelay = useAutoDelay();

  const images = product.images || [];
  console.log("Product in ProductPage:", images);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mainImage = images[currentImageIndex]?.src;

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <div className="flex flex-col lg:flex-row bg-white min-h-screen py-14 container mx-auto px-4">
          {/* Image Gallery */}

          <div className="w-full lg:w-1/2 p-8 flex flex-col items-center">
            <div className="relative w-full max-w-4xl mb-6">
              <img
                src={mainImage}
                alt="Product"
                className="w-full h-[400px]  object-cover rounded-lg shadow-md"
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100"
              >
                &lt;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100"
              >
                &gt;
              </button>
              <span className="absolute top-4 left-4 bg-white text-description text-xs px-3 py-1 rounded-full shadow-md">
                Sale
              </span>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <img
                  key={image.id || index}
                  src={image.src}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className={`w-24 h-16 object-cover rounded-md cursor-pointer ${
                    currentImageIndex === index
                      ? "border-2 border-blue-500"
                      : "border-2 border-gray-300"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}

          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-description text-sm">MODERN DRESS</p>
                <h1 className="text-3xl font-bold text-gray-800">
              {product.name}
                </h1>
              </div>
              <FaRegStar className="text-description text-2xl cursor-pointer hover:text-description" />
            </div>

            <div className="flex items-center mb-6">
              <div className="flex text-description mr-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
              </div>
              <span className="text-description text-sm">
                (1 customer review)
              </span>
            </div>

            <div className="mb-6">
              <span className="text-description text-3xl font-bold mr-2">
                ${product.price}
              </span>
              <span className="text-description line-through text-lg">
               ${product.regular_price}
              </span>
            </div>

          
             <div
            className="text-description leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          ></div>

            <p className="text-description flex items-center mb-6">
              <span className="w-3 h-3 bg-description rounded-full mr-2 animate-pulse"></span>
              20 people are viewing this right now
            </p>

            <div className="mb-6">
              <p className="text-description mb-2">
                Only 15 items left in stock!
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-description h-2.5 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>

            <ul className="mb-8 space-y-3">
              <li className="flex items-center text-description">
                <FaBoxOpen className="text-description mr-3" /> Free returns
              </li>
              <li className="flex items-center text-description">
                <FaShippingFast className="text-description mr-3" /> Free
                shipping via DHL, fully insured
              </li>
              <li className="flex items-center text-description">
                <FaShieldAlt className="text-description mr-3" /> All taxes and
                customs duties included
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-md">
                <Link
                  href=""
                  className="p-3 border-r border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  <FaMinus />
                </Link>
                <span className="p-3 text-lg font-semibold text-gray-800">
                  1
                </span>
                <button className="p-3 border-l border-gray-300 text-gray-600 hover:bg-gray-100">
                  <FaPlus />
                </button>
              </div>
              <Link
                href="#"
                className="flex-1  text-description py-3 px-6 rounded-md border-description border  transition duration-300 flex items-center justify-center"
              >
                <FaHeart className="mr-2" /> ADD TO CART
              </Link>
            </div>
            <button className="w-full cursor-pointer bg-primary text-white py-3 px-6 rounded-md  transition duration-300 mb-8">
              <Link href="#">BUY THE ITEM NOW</Link>
            </button>

            <div className="flex space-x-6 text-description text-sm">
              <div className="flex items-center cursor-pointer hover:text-gray-900">
                <BiGitCompare className="mr-2" /> Compare
              </div>
              <div className="flex items-center cursor-pointer hover:text-gray-900">
                <BsChatSquareText className="mr-2" /> Ask a question
              </div>
              <div className="flex items-center cursor-pointer hover:text-gray-900">
                <FaShareAlt className="mr-2" /> Share
              </div>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </>
  );
};

export default ProductPage;
