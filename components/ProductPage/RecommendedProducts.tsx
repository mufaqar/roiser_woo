"use client";
import React from "react";
import { FaTruck, FaHeart, FaRegHeart } from "react-icons/fa";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/config/currency";
import { useWishlist } from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";


interface TrendingProductsProps {
  products: WooProduct[];
}


const RecommendedProducts = ({products}:TrendingProductsProps) => {
  const getDelay = useAutoDelay();
  const { toggleItemInWishlist, isInWishlist } = useWishlist();
  const { addItemToCart } = useCart();

  const cappedProducts = products.slice(0, 3);

  // Calculate discount percentage
  const getDiscountPercent = (product: WooProduct) => {
    const hasDiscount = product.regular_price && product.regular_price !== product.price;
    return hasDiscount
      ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.price)) / parseFloat(product.regular_price)) * 100)
      : 0;
  };

  const handleToggleWishlist = (e: React.MouseEvent, product: WooProduct) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItemInWishlist({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.images[0]?.src,
      slug: product.slug,
      originalPrice: product.regular_price ? parseFloat(product.regular_price) : undefined,
    });
  };

  const handleAddToCart = (e: React.MouseEvent, product: WooProduct) => {
    e.preventDefault();
    e.stopPropagation();
    addItemToCart({
      id: product.id,
      quantity: 1,
      price: parseFloat(product.price),
      image: product.images[0]?.src || '',
      originalPrice: parseFloat(product.regular_price),
      name: product.name,
    });
  };

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
            {cappedProducts.map((product) => {
              const hasDiscount = product.regular_price && product.regular_price !== product.price;
              const discountPercent = getDiscountPercent(product);
              const isFavorited = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col group"
                >
                  <div className="relative mb-3">
                    <Link href={`/product/${product.slug}`} className="block">
                      <div className="relative w-full aspect-square overflow-hidden rounded-md bg-gray-50">
                        <Image
                          src={product.images[0].src}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Wishlist Heart Icon */}
                    <button
                      onClick={(e) => handleToggleWishlist(e, product)}
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
                  </div>

                  <div className="flex-1 flex flex-col">
                    {/* Stock + Delivery Info */}
                    <div className="flex items-center text-xs mb-2">
                      <div className="bg-[#EFF0F2] px-2 py-0.5 rounded-sm mr-2 text-title flex items-center gap-2">
                        {product.stock_status === 'instock' ? (
                          <div className="flex flex-shrink-0 items-center justify-center aspect-square h-[8px] w-[8px] bg-green-500 rounded-full"/>
                        ) : (
                          <div className="flex flex-shrink-0 items-center justify-center aspect-square h-[8px] w-[8px] bg-red-500 rounded-full"/>
                        )}
                        {product.stock_status === 'instock' ? 'In stock' : 'Out of stock'}
                      </div>
                      <div className="bg-[#EFF0F2] px-2 py-0.5 rounded-sm mr-2 text-title flex items-center gap-2">
                        <FaTruck className="text-gray-600 text-sm flex-shrink-0" />
                        Express Delivery in {Math.floor(Math.random() * 8) + 2}-{Math.floor(Math.random() * 8) + 10} Days
                      </div>
                    </div>

                    {/* Rating */}
                    {product.rating_count > 0 && (
                      <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ${
                              i < Math.floor(parseFloat(product.average_rating || '0')) ? "text-yellow-500" : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-title">
                          ({product.rating_count || 0}) reviews
                        </span>
                      </div>
                    )}

                    {/* Product Title */}
                    <Link href={`/product/${product.slug}`} className="mb-2">
                      <h3 className="text-3xl font-normal text-title line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="mb-2">
                      <span className="text-[#F2675D] text-lg font-semibold mr-2">
                        {formatCurrency(parseFloat(product.price))}
                      </span>
                      {product.regular_price && product.regular_price !== product.price && (
                        <span className="text-gray-400 line-through text-sm">
                          {formatCurrency(parseFloat(product.regular_price))}
                        </span>
                      )}
                    </div>

                    {/* Klarna Payment Option */}
                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">
                        Pay in 3 installments of {formatCurrency(parseFloat(product.price) / 3)}
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
                          <p>Pay in 3 installments of {formatCurrency(parseFloat(product.price) / 3)} with 0% interest!</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {/* Action Buttons */}
                    <div className="rounded-sm mr-2 mt-2 text-title flex items-center gap-2 w-full">
                      <button
                        className="w-full bg-white text-[#12213b] border border-[#12213b] py-2.5 px-4 rounded-md hover:bg-[#12213b] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-medium active:scale-95"
                      >
                        <Link href={`/product/${product.slug}`}>
                          View Product
                        </Link>
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-full bg-[#12213b] text-white py-2.5 px-4 rounded-md hover:bg-[#12213b]/90 transition-all duration-300 flex items-center justify-center gap-2 font-medium active:scale-95"
                      >
                        Add to Cart
                      </button>
                    </div>

                    {/* Stock Info */}
                    {product.manage_stock && product.stock_quantity && product.stock_quantity < 20 && (
                      <p className="text-xs text-red-500 font-medium mt-2">
                        Only {product.stock_quantity} left in stock!
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </AnimateOnScroll>
      </div>

    </section>
  );
};

export default RecommendedProducts;
