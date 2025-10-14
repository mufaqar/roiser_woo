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
  FaRegHeart,
} from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { BsChatSquareText } from "react-icons/bs";
import Link from "next/link";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "@/hooks/useCart";
import { formatCurrency } from "@/config/currency";
import { useWishlist } from "@/hooks/useWishlist";

interface TrendingProductsProps {
  product: WooProduct;
}

const ProductInfo = ({ product }: TrendingProductsProps) => {
  const getDelay = useAutoDelay();

  const { addItemToCart } = useCart();
  const { toggleItemInWishlist, isInWishlist } = useWishlist();

  const images = product.images;
  console.log("Product in ProductPage:", images);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

  const handleThumbnailClick = (index: number) => {
    const newDirection = index > activeIndex ? 1 : -1;
    setActiveIndex([index, newDirection]);
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    const newIndex = (activeIndex + 1) % images.length;
    setActiveIndex([newIndex, 1]);
    setCurrentImageIndex(newIndex);
  };

  const handlePrevImage = () => {
    const newIndex = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex([newIndex, -1]);
    setCurrentImageIndex(newIndex);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addItemToCart({
      id: product.id,
      quantity: quantity,
      price: parseFloat(product.price),
      image: images[0]?.src || '',
      originalPrice: parseFloat(product.regular_price),
      name: product.name,
    });
  };

  const handleToggleWishlist = () => {
    toggleItemInWishlist({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: images[0]?.src || '',
      slug: product.slug,
      originalPrice: product.regular_price ? parseFloat(product.regular_price) : undefined,
    });
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <>
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <div className="flex flex-col lg:flex-row bg-white py-8 lg:py-12 container mx-auto px-4">
          {/* Image Gallery */}

          <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col">
            <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50">
              <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction > 0 ? '100%' : '-100%',
                      opacity: 0
                    }),
                    center: {
                      x: 0,
                      opacity: 1
                    },
                    exit: (direction: number) => ({
                      x: direction > 0 ? '-100%' : '100%',
                      opacity: 0
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImageIndex]?.src}
                    alt="Product"
                    width={800}
                    height={800}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 text-gray-700 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 text-gray-700 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-lg z-10">
                Sale
              </span>
            </div>
            <div className="w-full overflow-x-auto py-2 scrollbar-hide -mx-1">
              <div className="flex gap-3 px-1">
                {images.map((image, index) => (
                  <Image
                    key={image.id || index}
                    src={image.src}
                    width={120}
                    height={120}
                    alt={image.alt || `Thumbnail ${index + 1}`}
                    className={`flex-shrink-0 w-20 h-20 object-cover rounded-md cursor-pointer transition-all duration-200 ${
                      currentImageIndex === index
                        ? "border-2 border-primary ring-2 ring-primary/20 scale-105"
                        : "border-2 border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
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
              <button
                onClick={handleToggleWishlist}
                className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95"
                aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isFavorited ? (
                  <FaHeart className="text-red-500 text-2xl" />
                ) : (
                  <FaRegHeart className="text-description text-2xl" />
                )}
              </button>
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
                {formatCurrency(parseFloat(product.price))}
              </span>
              <span className="text-description line-through text-lg">
                {formatCurrency(parseFloat(product.regular_price))}
              </span>
            </div>

          
            <div
            className="text-description leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

            <p className="text-description flex items-center mb-6">
              <span className="w-3 h-3 bg-description rounded-full mr-2 animate-pulse"></span>
              20 people are viewing this right now
            </p>

            <div className="mb-6">
              <p className="text-description mb-2">
                Only {product.stock_quantity ? product.stock_quantity : 15} items left in stock!
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
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={handleDecrement}
                  className="p-3 border-r border-gray-300 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150 active:scale-95"
                  disabled={quantity === 1}
                >
                  <FaMinus className={`transition-opacity ${quantity === 1 ? 'opacity-30' : 'opacity-100'}`} />
                </button>
                <span className="px-6 py-3 text-lg font-semibold text-gray-800 min-w-[60px] text-center transition-all duration-200">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-3 border-l border-gray-300 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150 active:scale-95"
                >
                  <FaPlus />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 text-description py-3 px-6 rounded-md border-description border transition-all duration-300 flex items-center justify-center hover:bg-description hover:text-white active:scale-95"
              >
                ADD TO CART
              </button>
            </div>
            <Link href="#" className="block w-full">
              <button className="w-full cursor-pointer bg-primary text-white py-3 px-6 rounded-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg active:scale-95 mb-8">
                BUY THE ITEM NOW
              </button>
            </Link>

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

export default ProductInfo;
