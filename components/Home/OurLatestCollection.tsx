"use client";

import React, { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import ProductCard from "../ProductCard";

interface ProductCollectionProps {
  cat: WooCategory[];
  products: WooProduct[];
}

const OurLatestCollection: React.FC<ProductCollectionProps> = ({
  cat,
  products,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    cat.length ? String(cat[0].id) : null
  );

  const NextArrow = ({ onClick }: any) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow transition z-10"
    >
      <IoChevronForward className="w-6 h-6 text-gray-600" />
    </button>
  );

  const PrevArrow = ({ onClick }: any) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow transition z-10"
    >
      <IoChevronBack className="w-6 h-6 text-gray-600" />
    </button>
  );

  // Filter products belonging to active category
  const currentProducts = products.filter((product) =>
    product.categories?.some((c) => String(c.id) === activeCategory)
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const getDelay = useAutoDelay();

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-gray-800">
            OUR LATEST COLLECTION
          </h2>
        </AnimateOnScroll>

        {/* Category Tabs */}
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {cat.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(String(category.id))}
                className={`px-5 py-2 text-sm md:text-base font-medium rounded-full border transition-all ${
                  String(category.id) === activeCategory
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Product Slider */}
        {currentProducts.length > 0 ? (
          // <div className="gap-x-3">
            <Slider {...settings}>
              {currentProducts.map((product) => (
                <AnimateOnScroll
                key={product.id}
                type="fade-up"
                delay={getDelay()}
                >
                  <ProductCard item={product} />
                </AnimateOnScroll>
              ))}
            </Slider>
          // </div>
        ) : (
          <p className="text-gray-500 mt-4">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default OurLatestCollection;
