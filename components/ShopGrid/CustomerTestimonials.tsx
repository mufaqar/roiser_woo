"use client";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

interface Testimonial {
  id: number;
  quality: string;
  rating: number;
  quote: string;
  customerName: string;
  customerTitle: string;
  avatar: string;
}

function CustomerTestimonials() {
  const getDelay = useAutoDelay();
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quality: "Product Quality",
      rating: 5,
      quote:
        "This is genuinely the first theme bought for which i did not had to write one line of ode. I would recommend everybody",
      customerName: "Alaxis D. Dowson",
      customerTitle: "Head Of Idea",
      avatar: "/images/customer.png",
    },
    {
      id: 2,
      quality: "Customer Support",
      rating: 5,
      quote:
        "Absolutely fantastic support! They went above and beyond to help me customize my theme. Highly recommend!",
      customerName: "John S. Smith",
      customerTitle: "Marketing Lead",
      avatar: "/images/customer.png",
    },
    {
      id: 3,
      quality: "Value for Money",
      rating: 4,
      quote:
        "Great value for the price. The features are robust, and it's easy to use. A solid investment.",
      customerName: "Sarah L. Jones",
      customerTitle: "CEO",
      avatar: "/images/customer.png",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-[#1A1A1A]" : "text-gray-300"}>
        &#9733;
      </span>
    ));
  };

  return (
    <section className="bg-gray-100  py-20">
      <div className="min-h-auto flex flex-col items-center justify-center  container mx-auto px-4">
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <h2 className="text-4xl font-bold text-title mb-12 text-center">
            What Our Customers Say
          </h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full ">
          {testimonials.map((testimonial) => (
            <AnimateOnScroll
              key={testimonial.id}
              type="fade-up"
              delay={getDelay()}
            >
              <div className="flex flex-col h-full">
                <div className="relative bg-white rounded-xl shadow-lg p-8 w-full flex-grow">
                  <div
                    className="absolute bottom-[-20px] left-[40px] w-0 h-0
                                border-l-[15px] border-r-[45px] border-t-[25px]
                                border-l-transparent border-r-transparent border-t-white"
                  ></div>

                  <div className="flex justify-between items-center mb-5">
                    <span className="font-bold text-[#1A1A1A] text-lg">
                      {testimonial.quality}
                    </span>
                    <div className="flex text-xl">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <p className="text-[#485563] text-lg leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center pt-10 pl-6 pr-6 -mt-2">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt="Customer Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-title">
                      {testimonial.customerName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.customerTitle}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerTestimonials;
