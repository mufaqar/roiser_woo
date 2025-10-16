import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaTruck, FaHeart, FaRegHeart, FaShoppingCart, FaSearch, FaYoutube, FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "@/config/currency";
import { useWishlist } from "@/hooks/useWishlist";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { getProductVideo } from "@/lib/woocommerce/video-helpers";
import useCart from "@/hooks/useCart";

interface ProductCardProps {
  item: WooProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  console.log(JSON.stringify(item, null, 2));

  // State for image carousel (must be before any returns)
  const [[currentImageIndex, direction], setImageState] = useState([0, 0]);
  const { addItemToCart } = useCart();
  const { toggleItemInWishlist, isInWishlist } = useWishlist();

  // Extract video information from meta_data
  const videoInfo = getProductVideo(item);
  const hasVideo = videoInfo.url !== null;

  if (!item || !item.images || item.images.length === 0) {
    return null;
  }

  const hasMultipleImages = item.images.length > 1;

  // Calculate discount percentage
  const hasDiscount = item.regular_price && item.regular_price !== item.price;
  const discountPercent = hasDiscount
    ? Math.round(((parseFloat(item.regular_price) - parseFloat(item.price)) / parseFloat(item.regular_price)) * 100)
    : 0;

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = (currentImageIndex + 1) % item.images.length;
    setImageState([newIndex, 1]);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = (currentImageIndex - 1 + item.images.length) % item.images.length;
    setImageState([newIndex, -1]);
  };

  const handleAddToCart = () => {
    addItemToCart({
      id: item.id,
      quantity: 1,
      price: parseFloat(item.price),
      image: item.images[0]?.src || '',
      originalPrice: parseFloat(item.regular_price),
      name: item.name,
    });
  };


  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItemInWishlist({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      image: item.images[0]?.src,
      slug: item.slug,
      originalPrice: item.regular_price ? parseFloat(item.regular_price) : undefined,
    });
  };

  const isFavorited = isInWishlist(item.id);
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col group">
      <div className="relative mb-3">
        <Link href={`/product/${item.slug}`} className="block">
          <div className="relative w-full aspect-square overflow-hidden rounded-md bg-gray-50">
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
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={item.images[currentImageIndex]?.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Wishlist Heart Icon */}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200 z-10"
              aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isFavorited ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-gray-700 text-lg" />
              )}
            </button>

            {/* Discount Badge */}
            {hasDiscount && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-md shadow-lg z-10">
                -{discountPercent}%
              </span>
            )}

            {/* Video Icon - Bottom Right */}
            {hasVideo && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/product/${item.slug}?video=play`}
                    className="absolute bottom-2 right-2 bg-[#1E2839]/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[#F2675D] hover:scale-110 transition-all duration-200 z-10"
                    aria-label="Watch product video"
                  >
                    <FaPlay className="text-white text-sm ml-0.5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Watch product video</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Navigation Arrows - Show on hover if multiple images */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {item.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        index === currentImageIndex ? 'bg-white w-4' : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        {/* Tags */}
        <div className="flex items-center text-xs mb-2">
          <div className="bg-[#EFF0F2] px-2 py-0.5 rounded-sm mr-2 text-title flex items-center gap-2">
            {item.stock_status === 'instock' ? (
              <div className="flex flex-shrink-0 items-center justify-center aspect-square h-[8px] w-[8px] bg-green-500 rounded-full"/>
            ) : (
              <div className="flex flex-shrink-0 items-center justify-center aspect-square h-[8px] w-[8px] bg-red-500 rounded-full"/>
            )}
            {item.stock_status === 'instock' ? 'In stock' : 'Out of stock'}
          </div>
          <div className="bg-[#EFF0F2] px-2 py-0.5 rounded-sm mr-2 text-title flex items-center gap-2">
            <FaTruck className="text-gray-600 text-sm flex-shrink-0" />
            Express Delivery in {Math.floor(Math.random() * 8) + 2}-{Math.floor(Math.random() * 8) + 10} Days
          </div>
        </div>

        {/* Rating */}
        {item.rating_count > 0 && (
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${
                  i < Math.floor(parseFloat(item.average_rating || '0')) ? "text-yellow-500" : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
            ))}
          
              <span className="ml-2 text-sm text-title">
                ({item.rating_count || 0}) reviews
              </span>
          </div>
        )}

        {/* Name */}
        <Link href={`/product/${item.slug}`} className="mb-2">
          <h3 className="text-3xl font-normal text-title line-clamp-2 hover:text-primary transition-colors">
            {item.name}
          </h3>
        </Link>
        {/* Price */}
        <div className="mb-2">
          <span className="text-[#F2675D] text-lg font-semibold mr-2">
            {formatCurrency(parseFloat(item.price))}
          </span> 
          {item.regular_price && item.regular_price !== item.price && (
            <span className="text-gray-400 line-through text-sm">
              {formatCurrency(parseFloat(item.regular_price))}
            </span>
          )}
        </div>

        {/* Klarna Payment Option */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900">
            Pay in 3 installments of {formatCurrency(parseFloat(item.price) / 3)}
          </span>
          <span className="text-sm text-gray-600">with</span>
          <Tooltip>
            <TooltipTrigger>
              <Image
                src="/images/payments/klarna.webp"
                alt="Klarna"
                width={55}
                height={18}
                className="h-5 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Pay in 3 installments of {formatCurrency(parseFloat(item.price) / 3)} with 0% interest!</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="rounded-sm mr-2 mt-2 text-title flex items-center gap-2 w-full">
          <button
            className="w-full bg-white text-[#12213b] border border-[#12213b] py-2.5 px-4 rounded-md hover:bg-[#12213b] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-medium active:scale-95"
          >
            <Link href={`/product/${item.slug}`}>
              View Product
            </Link>
          </button>
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#12213b] text-white py-2.5 px-4 rounded-md hover:bg-[#12213b]/90 transition-all duration-300 flex items-center justify-center gap-2 font-medium active:scale-95"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>

        {/* Stock Info */}
        {item.manage_stock && item.stock_quantity && item.stock_quantity < 20 && (
          <p className="text-xs text-red-500 font-medium">
            Only {item.stock_quantity} left in stock!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
