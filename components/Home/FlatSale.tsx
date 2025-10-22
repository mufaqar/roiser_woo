"use client";
import Link from 'next/link';
import React from 'react';
import AnimateOnScroll, { useAutoDelay } from '../Animation';
import Image from 'next/image';


function FlatSale() {
  const getDelay = useAutoDelay();

  return (
    <div className=" py-16">
      <div className="container mx-auto px-4">
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <h2 className="text-description text-3xl md:text-4xl font-bold text-center mb-4">OUR BEST SELLING COLLECTION</h2>
        </AnimateOnScroll>
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <p className="text-[#1A1A1A] text-center text-lg mb-12 max-w-4xl mx-auto">
            Explore our extensive range of eco-friendly, hardwearing, and low-maintenance composite decking boards, perfect for transforming your garden into a stylish haven...{' '}
          </p>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-8">
          {/* Flat Sale Card 1 */}
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <div className="relative w-full  bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/flat-image-1.jpg"
                alt="Unique Office Table"
                className="w-full h-80 object-cover"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute top-8 left-8 text-white">
                <p className="text-sm uppercase tracking-wider">UNIQUE OFFICE TABLE</p>
                <p className="text-4xl font-bold my-2">30% Flat Sale</p>
                <p className="text-sm font-[300] pb-8">Online Promo Code: <span className="font-bold">7QHQT</span></p>
                <Link href='/' className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-md  transition duration-300">
                  START SHOPPING
                </Link>
              </div>
              <div className="absolute bottom-6 left-8 flex space-x-2">
                <span className="bg-white text-[#74787c] text-xs px-3 py-1 rounded">184</span>
                <span className="bg-white text-[#74787c] text-xs px-3 py-1 rounded">224</span>
                <span className="bg-white text-[#74787c] text-xs px-3 py-1 rounded">244</span>
                <span className="bg-white text-[#74787c] text-xs px-3 py-1 rounded">464</span>
              </div>
            </div>
          </AnimateOnScroll>
          {/* Flat Sale Card 2 */}
          <AnimateOnScroll type="fade-up" delay={getDelay()}>

            <div className="relative w-full  bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/flat-image-1.jpg"
                alt="Elegant Comfort Chair"
                className="w-full h-80 object-cover"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute top-8 left-8 text-white">
                <p className="text-sm uppercase tracking-wider">ELEGANT COMFORT CHAIR</p>
                <p className="text-4xl font-bold my-2">10% Flat Sale</p>
                <p className="text-sm font-[300] pb-8">Save 20% more order than $2500</p>
                <Link href='/' className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-md  transition duration-300">
                  START SHOPPING
                </Link>
              </div>
              <div className="absolute bottom-6 left-8 flex space-x-2">
                <span className="bg-white text-[#74787c] text-xs px-3 py-1 rounded">184</span>
                <span className="bg-white text-[#74787c] text-xs px-3 py-1 rounded">224</span>
                <span className="bg-white text-[#74787c]e text-xs px-3 py-1 rounded">244</span>
                <span className="bg-white text-[#74787c] text-xs px-3 py-1 rounded">464</span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}

export default FlatSale;