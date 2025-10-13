"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

import ProductCard from "../ProductCard";
import { WooCategory, WooProduct } from "@/lib/woocommerce-types";

interface ProductCollectionProps {
  cat: WooCategory[];
  products: WooProduct[];
}


const ProductCollection: React.FC<ProductCollectionProps> = ({cat,products}) => {
  const getDelay = useAutoDelay();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [selectedItemSize, setSelectedItemSize] = useState<string>("All");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", {
      selectedBrands,
      selectedItemSize,
      minPrice,
      maxPrice,
    });
    setIsFilterModalOpen(false);
  };

  const handleClearAll = () => {
    setSelectedItemSize("All");
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrands([]);
  };

  const brands: string[] = [
    "Option One",
    "Option Two",
    "Option Three",
    "Option Four",
    "Option Five",
  ];

  const itemSizes: string[] = [
    "All",
    "Option One",
    "Option Two",
    "Option Three",
    "Option Four",
    "Option Five",
  ];

  return (
    <div className="mx-auto p-4 mt-6">
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-start">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex gap-1 items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-title"
            >
              <CiMenuFries />
              Filters
            </button>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-md px-2 py-1 text-sm mt-5">
              <span>Tag X</span>
              <button>
                <RxCross2 />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600">Showing 3 of 100</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/">
            <button className="text-white bg-[#1B4965] px-7 py-2 hover:underline text-sm font-semibold rounded-sm">
              Load More
            </button>
          </Link>
        </div>

        {/* Filter Modal */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-title">Filters</h2>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RxCross2 size={24} />
                </button>
              </div>

              <div className="p-6 flex-grow">
                {/* Brand Filter */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-title mb-4">
                    Brand
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center text-base text-title"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="form-checkbox h-4 w-4 text-blue-600 rounded-sm focus:ring-blue-500 mr-2"
                        />
                        {brand}
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Item Size Filter */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-title mb-4">
                    Item Size
                  </h3>
                  <div className="space-y-3">
                    {itemSizes.map((size) => (
                      <label
                        key={size}
                        className="flex items-center text-base text-title"
                      >
                        <input
                          type="radio"
                          name="itemSize"
                          value={size}
                          checked={selectedItemSize === size}
                          onChange={(e) => setSelectedItemSize(e.target.value)}
                          className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 mr-2"
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Price Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-title mb-4">
                    Price
                  </h3>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <input
                        type="number"
                        id="minPrice"
                        placeholder="Enter min price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        id="maxPrice"
                        placeholder="Enter max price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handleClearAll}
                  className="text-gray-600 hover:text-gray-800 font-semibold text-base"
                >
                  Clear all
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="bg-[#1B4965] text-white px-6 py-2 rounded-md hover:bg-[#123d51] font-semibold text-base"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimateOnScroll>
    </div>
  );
};

export default ProductCollection;
