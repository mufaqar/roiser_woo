"use client";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import { WooReview } from "@/lib/woocommerce-types";

interface WooReviewsProps {
  reviews: WooReview[];
}

const CustomerTestimonials = ({ reviews }: WooReviewsProps) => {
  const getDelay = useAutoDelay();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      >
        &#9733;
      </span>
    ));
  };

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <h2 className="text-4xl font-bold text-title mb-12 text-center">
            What Our Customers Say
          </h2>
        </AnimateOnScroll>

        {reviews?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {reviews.map((review) => (
              <AnimateOnScroll
                key={review.id}
                type="fade-up"
                delay={getDelay()}
              >
                <div className="flex flex-col h-full">
                  {/* Card */}
                  <div className="relative bg-white rounded-xl shadow-lg p-8 flex-grow">
                    {/* Small arrow */}
                    <div
                      className="absolute bottom-[-20px] left-[40px] w-0 h-0
                      border-l-[15px] border-r-[45px] border-t-[25px]
                      border-l-transparent border-r-transparent border-t-white"
                    ></div>

                    {/* Rating + Name */}
                    <div className="flex justify-between items-center mb-5">
                      <span className="font-bold text-[#1A1A1A] text-lg">
                        {review.reviewer}
                      </span>
                      <div className="flex text-xl">
                        {renderStars(Number(review.rating))}
                      </div>
                    </div>

                    {/* Review Content */}
                    <div
                      className="text-[#485563] text-lg leading-relaxed mb-6 italic"
                      dangerouslySetInnerHTML={{ __html: review.review }}
                    />
                  </div>

                  {/* Reviewer Info */}
                  <div className="flex items-center pt-10 pl-6 pr-6 -mt-2">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden flex-shrink-0">
                      <img
                        src={
                          review.reviewer_avatar_urls?.["96"] ||
                          "/default-avatar.png"
                        }
                        alt={review.reviewer}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-title">
                        {review.reviewer}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(review.date_created).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No customer reviews yet.</p>
        )}
      </div>
    </section>
  );
};

export default CustomerTestimonials;
