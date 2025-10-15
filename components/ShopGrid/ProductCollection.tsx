"use client";

import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import ProductCard from "../ProductCard";

interface ProductCollectionProps {
  cat: WooCategory[];
  products: WooProduct[];
}


const ProductCollection: React.FC<ProductCollectionProps> = ({cat,products}) => {
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-[250px] flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-title">Filters</h2>
              <button
                onClick={handleClearAll}
                className="text-sm text-primary hover:underline font-medium"
              >
                Clear all
              </button>
            </div>

            {/* Brand Filter */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-title mb-4">Brand</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center text-sm text-gray-700 hover:text-title cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded mr-3"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Item Size Filter */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-title mb-4">Size</h3>
              <div className="space-y-3">
                {itemSizes.map((size) => (
                  <label
                    key={size}
                    className="flex items-center text-sm text-gray-700 hover:text-title cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="itemSize"
                      value={size}
                      checked={selectedItemSize === size}
                      onChange={(e) => setSelectedItemSize(e.target.value)}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 mr-3"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pb-6">
              <h3 className="text-base font-semibold text-title mb-4">Price Range</h3>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <button
                onClick={handleApplyFilters}
                className="w-full mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
              >
                <CiMenuFries />
                Filters
              </button>

              {/* Active Filters */}
              {selectedBrands.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedBrands.map((brand) => (
                    <span
                      key={brand}
                      className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      {brand}
                      <button
                        onClick={() => handleBrandChange(brand)}
                        className="hover:text-red-500"
                      >
                        <RxCross2 size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm text-gray-600 whitespace-nowrap">
              Showing {products.length} of {products.length} products
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={handleClearAll}
                  className="mt-4 text-primary hover:underline font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Load More */}
          {products.length > 0 && (
            <div className="flex justify-center mt-10">
              <button className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors font-semibold">
                Load More Products
              </button>
            </div>
          )}
        </div>
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
    </div>
  );
};

export default ProductCollection;
