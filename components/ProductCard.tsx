import { WooProduct } from "@/lib/woocommerce-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaTruck } from "react-icons/fa";

interface ProductCardProps {
  item: WooProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  // Add safety check
  if (!item || !item.images || item.images.length === 0) {
    return null;
  }

  return (
    <div className="bg-transparent rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <Link href={`/product/${item.slug}`} className="block mb-3">
        <div className="relative w-full aspect-square overflow-hidden rounded-md">
          <Image
            src={item.images[0]?.src}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="flex-1 flex flex-col">
        {/* Tags */}
        <div className="flex items-center text-xs mb-2">
          <span className="bg-[#EFF0F2] px-2 py-0.5 rounded-sm mr-2 text-title">
            {item.stock_status === 'instock' ? 'In stock' : 'Out of stock'}
          </span>
          {item.shipping_class && (
            <div className="flex items-center gap-1 text-title bg-[#EFF0F2] p-1 px-3 rounded-sm">
              <FaTruck size={14} />
              <span>Express</span>
            </div>
          )}
        </div>

        {/* Rating */}
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

        {/* Name */}
        <Link href={`/product/${item.slug}`} className="mb-2">
          <h3 className="text-base font-semibold text-title line-clamp-2 hover:text-primary transition-colors">
            {item.name}
          </h3>
        </Link>
        {/* Price */}
        <div className="mb-2">
          <span className="text-[#F2675D] text-lg font-bold mr-2">
            ${item.price}
          </span>
          {item.regular_price && item.regular_price !== item.price && (
            <span className="text-gray-400 line-through text-sm">
              ${item.regular_price}
            </span>
          )}
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
