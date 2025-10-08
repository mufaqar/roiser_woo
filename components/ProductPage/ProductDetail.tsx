"use client";
import React from "react";
import { FaPlayCircle, FaCheckCircle } from "react-icons/fa";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import Link from "next/link";

function ProductDetail() {
  const getDelay = useAutoDelay();
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        
          <nav className="-mb-px flex flex-wrap space-x-8" aria-label="Tabs">
            <Link
              href="#"
              className="border-b-2 border-description text-description whitespace-nowrap py-4 px-1 text-sm font-medium"
            >
              Description
            </Link>
            <Link
              href="#"
              className="border-transparent text-description hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 text-sm font-medium"
            >
              Additional information
            </Link>
            <Link
              href="#"
              className="border-transparent text-description hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 text-sm font-medium"
            >
              Reviews (2)
            </Link>
          </nav>
        
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Text Content */}
        <div className="lg:w-1/2">
     
            <p className="text-primary mb-6">
              Sed porttitor lectus nulla. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
            </p>
  
            <p className="text-primary mb-6">
              Lobortis rhoncus libero pretium tempor mattis proin. Auctor dis massa enim hymenaeos. Torquent
              senectus dui vehicula libero cum vitae natoque magna commodo quam. Instantly create a bold,
              contemporary statement with our Black Decking Board. Built with a durable wood-fibre and HDPE core,
              its reversible finish offers both wide- and narrow-grooved textures for custom looks and enhanced grip.
              Lightweight, splinter-free, and incredibly low-maintenance, it delivers a high-impact aesthetic with minimal effort.
              To see other styles,{" "}
              explore the full composite decking range

            </p>
        
            <h3 className="text-3xl font-semibold mt-8 mb-4">
              Please Note: Order Your Free Samples
            </h3>
      
            <p className="text-primary0 mb-6">
              We highly recommend ordering our free samples to confirm the colours before placing an order, as
              digital photos can vary significantly between screens.
            </p>
         
    
            <div className="space-y-4">
              <div className="flex items-start">
              
                <div>
                  <h3 className="font-semibold text-xl text-primary">BOLD, MODERN AESTHETIC</h3>
                  <p className="text-primary text-sm">
                    Understanding the seamless handcraft of modern <br /> furniture, we stand strictly for quality.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                 
                <div>
                  <h3 className="font-semibold text-xl text-primary">VERSATILE GROOVED TEXTURE</h3>
                  <p className="text-primary text-sm">
                    Understanding the seamless handcraft of modern <br /> furniture, we stand strictly for quality.
                  </p>
                </div>
              </div>
            </div>
        
        </div>

        {/* Right Section - Image with Play Button */}
       
          <div className="lg:w-1/2 relative">
            <img
              src="/images/ProductDetail.png"
              alt="Product Demonstration"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaPlayCircle className="h-14 w-14 text-white opacity-80 cursor-pointer hover:opacity-100 transition duration-300" />
            </div>
          </div>
        
      </div>
  </AnimateOnScroll>
    </div>
  );
}

export default ProductDetail;
