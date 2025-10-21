"use client";
import React, { useState, useEffect } from "react";
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
  FaPlay,
} from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { BsChatSquareText } from "react-icons/bs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "@/hooks/useCart";
import { formatCurrency } from "@/config/currency";
import { useWishlist } from "@/hooks/useWishlist";
import VideoPlayer from "../VideoPlayer";
import { getProductVideo } from "@/lib/woocommerce/video-helpers";

interface TrendingProductsProps {
  product: WooProduct;
}

const ProductInfoV2 = ({ product }: TrendingProductsProps) => {
  const getDelay = useAutoDelay();
  const searchParams = useSearchParams();

  const { addItemToCart } = useCart();
  const { toggleItemInWishlist, isInWishlist } = useWishlist();

  const images = product.images;

  // Extract video information from meta_data
  const videoInfo = getProductVideo(product);
  const hasVideo = videoInfo.url !== null;
  const shouldAutoPlayVideo = searchParams.get('video') === 'play';

  // If video should autoplay, start at -1 (video index), otherwise start at 0
  const initialIndex = hasVideo && shouldAutoPlayVideo ? -1 : 0;

  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
  const [quantity, setQuantity] = useState(1);
  const [[activeIndex, direction], setActiveIndex] = useState([initialIndex, 0]);

  // Calculate total items (images + video if exists)
  const totalItems = images.length + (hasVideo ? 1 : 0);

  const handleThumbnailClick = (index: number) => {
    const newDirection = index > activeIndex ? 1 : -1;
    setActiveIndex([index, newDirection]);
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    // Video is at index -1, images start at 0
    const minIndex = hasVideo ? -1 : 0;
    const maxIndex = images.length - 1;
    const newIndex = activeIndex >= maxIndex ? minIndex : activeIndex + 1;
    setActiveIndex([newIndex, 1]);
    setCurrentImageIndex(newIndex);
  };

  const handlePrevImage = () => {
    // Video is at index -1, images start at 0
    const minIndex = hasVideo ? -1 : 0;
    const maxIndex = images.length - 1;
    const newIndex = activeIndex <= minIndex ? maxIndex : activeIndex - 1;
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
                  {currentImageIndex === -1 && hasVideo && videoInfo.url ? (
                    <VideoPlayer
                      videoUrl={videoInfo.url}
                      autoplay={shouldAutoPlayVideo}
                      posterImage={videoInfo.posterImage}
                    />
                  ) : (
                    <Image
                      src={images[currentImageIndex]?.src}
                      alt="Product"
                      width={800}
                      height={800}
                      className="w-full h-full object-contain"
                    />
                  )}
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
                {/* Video Thumbnail - if video exists */}
                {hasVideo && videoInfo.url && (
                  <div
                    className={`relative flex-shrink-0 w-20 h-20 rounded-md cursor-pointer transition-all duration-200 ${
                      currentImageIndex === -1
                        ? "border-2 border-primary ring-2 ring-primary/20 scale-105"
                        : "border-2 border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleThumbnailClick(-1)}
                  >
                    <div className="absolute inset-0 bg-black/60 rounded-md flex items-center justify-center z-10">
                      <FaPlay className="text-white text-2xl" />
                    </div>
                    {/* Use poster image if available, otherwise use first product image */}
                    {(videoInfo.posterImage || images[0]) && (
                      <Image
                        src={videoInfo.posterImage || images[0].src}
                        width={120}
                        height={120}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover rounded-md"
                      />
                    )}
                  </div>
                )}

                {/* Image Thumbnails */}
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

          {/* Product Details - Modern E-commerce Design */}
          <div className="w-full lg:w-1/2 p-4 lg:p-8">
            <div className="max-w-xl">
              {/* Category & Wishlist */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                  {product.categories?.[0]?.name || "Product"}
                </span>
                <button
                  onClick={handleToggleWishlist}
                  className="p-2.5 rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95 group"
                  aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isFavorited ? (
                    <FaHeart className="text-red-500 text-xl transition-transform group-hover:scale-110" />
                  ) : (
                    <FaRegHeart className="text-gray-400 text-xl transition-all group-hover:text-red-500 group-hover:scale-110" />
                  )}
                </button>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < 4 ? "text-yellow-400" : "text-gray-300"
                      } text-sm`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">4.0</span>
                <span className="text-sm text-gray-500">|</span>
                <button className="text-sm text-primary hover:underline font-medium">
                  1 review
                </button>
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  In Stock
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatCurrency(parseFloat(product.price))}
                  </span>
                  {product.regular_price && parseFloat(product.regular_price) > parseFloat(product.price) && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        {formatCurrency(parseFloat(product.regular_price))}
                      </span>
                      <span className="px-2.5 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-md">
                        Save {Math.round(((parseFloat(product.regular_price) - parseFloat(product.price)) / parseFloat(product.regular_price)) * 100)}%
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
              </div>

              {/* Description */}
              <div
                className="text-gray-600 leading-relaxed mb-6 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />

              {/* Stock Indicator */}
              {product.stock_quantity && product.stock_quantity <= 20 && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <svg className="text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-amber-800 mb-1">
                        Limited Stock Available
                      </p>
                      <p className="text-sm text-amber-700">
                        Only {product.stock_quantity} items left. Order soon!
                      </p>
                      <div className="mt-2 w-full bg-amber-200 rounded-full h-1.5">
                        <div
                          className="bg-amber-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((product.stock_quantity / 20) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={handleDecrement}
                      className="px-4 py-3 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={quantity === 1}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus className="text-gray-700 text-sm" />
                    </button>
                    <span className="px-6 py-3 text-lg font-semibold text-gray-900 min-w-[70px] text-center bg-white">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="px-4 py-3 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <FaPlus className="text-gray-700 text-sm" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stock_quantity ? `${product.stock_quantity} available` : "In stock"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white font-semibold py-4 px-8 rounded-lg hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                  >
                    Add to Cart
                  </button>
                  <Link href="/checkout" className="flex-1">
                    <button className="w-full bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all duration-200">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>

              {/* Features/Benefits */}
              <div className="mb-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FaShippingFast className="text-primary text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Free Delivery</p>
                      <p className="text-gray-600 text-xs">On orders over £50</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaBoxOpen className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">30-Day Returns</p>
                      <p className="text-gray-600 text-xs">Easy returns policy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaShieldAlt className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Secure Checkout</p>
                      <p className="text-gray-600 text-xs">SSL encrypted payment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Actions */}
              <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-200">
                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors group">
                  <BiGitCompare className="text-lg group-hover:scale-110 transition-transform" />
                  Compare
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors group">
                  <BsChatSquareText className="text-lg group-hover:scale-110 transition-transform" />
                  Ask Question
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors group">
                  <FaShareAlt className="text-lg group-hover:scale-110 transition-transform" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </>
  );
};

export default ProductInfoV2;
