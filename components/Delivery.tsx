"use client";
import React from "react";
import { FaTruck } from "react-icons/fa"; // ✅ Truck from Font Awesome
import AnimateOnScroll, { useAutoDelay } from "./Animation";

function Delivery() {
  const getDelay = useAutoDelay();
  return (
    <section className="bg-[#F2675D] py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side */}
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <div className="flex items-center gap-3 text-white text-center md:text-left">
            <div className="flex flex-col items-center -rotate-6">
              <span className="bg-[#FFE223] text-black px-2 py-1 font-bold text-sm rounded-sm">
                PRICE
              </span>
            </div>
            <div className="flex flex-col items-center rotate-6">
              <span className="bg-black text-[#FFE223] px-2 py-1 font-bold text-sm rounded-sm">
                DROP
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              SALES <span className="font-light">Off</span>{" "}
              <span className="text-[#FFE223]">60%</span>
            </h2>
          </div>
        </AnimateOnScroll>
        {/* Right side */}
         <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <div className="flex items-center gap-3 text-white text-center md:text-left">
          <FaTruck size={80} className="text-white" /> {/* ✅ React Icons Truck */}
          <div>
            <h3 className="text-2xl md:text-6xl font-bold">FREE DELIVERY</h3>
            <p className="text-[#FFE223] font-medium text-sm md:text-xl">
              WE DELIVERED 4,000 MOST OF THE UK
            </p>
          </div>
        </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

export default Delivery;
