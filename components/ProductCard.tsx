import { Product } from "@/types/woocommerce";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaTruck } from "react-icons/fa";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  console.log(item);
  return (
    <>
      <div className="px-3">
        <div className="bg-white rounded-sm p-2 shadow-sm overflow-hidden transition">
          <Link href={`/product/${item?.slug}`}>
            <Image
              src={item?.images[0]?.src}
              alt={item.name}
              width={400}
              height={300}
              className="w-full object-cover"
            />
          </Link>
          <div className="py-3 px-1 text-left">
            {/* Tags */}
            <div className="flex items-center text-xs mb-2">
              <span className="bg-[#EFF0F2] px-2 py-0.5 rounded-sm mr-2 text-title">
                In stock
              </span>
              <div className="flex items-center gap-1 text-title bg-[#EFF0F2] p-1 px-3 rounded-sm">
                <FaTruck size={14} />
                <span>{item.expressDelivery}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${
                    i < item.rating_count ? "text-title" : "text-title"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-title">
                {item.reviews_allowed} reviews
              </span>
            </div>

            {/* Name */}
            <Link href="/single-product">
              <h3 className="text-sm font-semibold text-title mb-2 line-clamp-2">
                {item.name}
              </h3>
            </Link>
            {/* Price */}
            <div className="mb-1">
              <span className="text-[#F2675D] font-semibold mr-2">
                {item.price}
              </span>
              <span className="text-title line-through text-sm">
                {item.sale_price}
              </span>
            </div>

            {/* Payment Plan */}
            <p className="text-xs text-title">
              {item.paymentPlan}{" "}
              <span className="font-semibold text-title">Klarna</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
