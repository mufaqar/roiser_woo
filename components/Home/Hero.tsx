"use client";
import Link from "next/link";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

const Hero = () => {
  const getDelay = useAutoDelay();
  return (
    <section
      className="relative h-[80vh] flex items-center  bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/homebg.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="container mx-auto text-white z-10 px-4">
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <p className="text-[40px] font-light uppercase tracking-widest font-Jost">Ready Item</p>
        </AnimateOnScroll>
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <h1 className="text-4xl md:text-7xl font-bold uppercase">Home Decor</h1>
          <p className="text-[20px] font-light uppercase tracking-widest mt-6">From $299.00</p>
        </AnimateOnScroll>
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <button className="mt-6 border  px-6 py-3 font-bold uppercase">
            <Link href=''>Explore Items</Link>
          </button>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Hero;
