"use client";
import { motion } from "framer-motion";
import React from "react";

function NotFoundPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen  flex flex-col items-center justify-center p-4"
    >
      <div className="text-center">
        {/* 404 illustration */}
        <div className="relative mb-8">
          <p className="text-9xl font-extrabold text-[#2F4761] leading-none relative z-10">
            <span>4</span>
            <span className="mx-4 inline-block">
              <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center border-8 border-gray-300 shadow-inner">
                <div className="w-40 h-40 bg-[#2F4761] rounded-full relative flex items-center justify-center">
                  {/* Eyes */}
                  <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#2F4761] font-bold text-lg">x</span>
                  </div>
                  <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#2F4761] font-bold text-lg">x</span>
                  </div>
                  {/* Mouth */}
                  <div className="absolute bottom-1/4 w-24 h-6 bg-[#76787C] rounded-b-full"></div>
                </div>
              </div>
            </span>
            <span>4</span>
          </p>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-48 bg-gray-100 rounded-full rotate-6 -z-0"></div>
        </div>

        {/* Text content */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2F4761] mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn’t find the page you were looking for. Please return
          to the homepage.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="px-8 py-3 bg-[#2F4761] text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300 ease-in-out tracking-wide uppercase text-sm"
        >
          Back To Homepage
        </button>
      </div>
    </motion.section>
  );
}

export default NotFoundPage;
