"use client"
import React from 'react'
import AnimateOnScroll, { useAutoDelay } from '../Animation';

function Composite() {
  const getDelay = useAutoDelay();
  return (
    <>
      <div className="container mx-auto my-12 px-4">
        <div className="max-w-4xl text-center mx-auto flex flex-col gap-6">
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-title leading-snug">
              Our Composite Decking Furniture
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <p className="text-base sm:text-lg md:text-xl text-[#1A1A1A]">
              Explore our extensive range of eco-friendly, hard-wearing, and
              low-maintenance composite decking boards, perfect for transforming
              your garden into a stylish haven. Not sure which is right for you?
              Compare our collections below. Explore our extensive range of
              eco-friendly, hard-wearing, and low-maintenance composite...
            </p>
          </AnimateOnScroll>
        </div>
      </div>

    </>
  )
}

export default Composite
