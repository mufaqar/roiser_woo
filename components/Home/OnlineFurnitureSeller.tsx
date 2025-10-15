"use client";
import React from "react";
import Image from "next/image";
import { FaChair, FaHeadset, FaTags } from "react-icons/fa";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

const OnlineFurnitureSeller = () => {
  const getDelay = useAutoDelay();

  return (

    <section className="bg-white ">
      <div className=" flex flex-col md:flex-row items-stretch">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-[500px]">
          <Image
            src="/images/COLLECTION.png"
            alt="Furniture Room"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side - Text + Icons */}
        <div className="w-full md:w-1/2 bg-[#1E2839] text-white flex flex-col justify-center p-10 md:p-14">
          <div className="container mx-auto px-4">
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <h2 className="text-2xl md:text-4xl font-semibold mb-4">
                WE’RE ONLINE FURNITURE SELLER
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <p className="text-white mb-10 leading-relaxed">
                Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum
                pharetra. Diam sit amet nisl suscipit adipiscing bibendum est ultricies integer.
              </p>
            </AnimateOnScroll>
            <div className="space-y-8">
              {/* Feature 1 */}
              <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full flex-shrink-0">
                    <FaChair className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">PURE FURNISHED TABLE</h3>
                    <p className="text-gray-300 text-sm leading-snug">
                      Understanding the seamless handcraft of modern furniture, we stand strictly
                      for quality.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
              {/* Feature 2 */}
              <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full flex-shrink-0">
                    <FaHeadset className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">24/7 SUPPORT SERVICES</h3>
                    <p className="text-gray-300 text-sm leading-snug">
                      Enjoy round-the-clock personalized support and modern furniture assistance
                      for your comfort.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
              {/* Feature 3 */}
              <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full flex-shrink-0">
                    <FaTags className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">OFFERS AND DISCOUNTS</h3>
                    <p className="text-gray-300 text-sm leading-snug">
                      We provide attractive offers and discounts without compromising on
                      craftsmanship and quality.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineFurnitureSeller;
