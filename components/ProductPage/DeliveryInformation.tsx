"use client";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

function DeliveryInformation() {
  const getDelay = useAutoDelay();
  return (
    <div className="min-h-screen py-12 flex flex-col items-center container mx-auto px-4">
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <h2 className="text-4xl font-semibold text-description mb-10 uppercase tracking-wide text-center">
          DELIVERY INFORMATION
        </h2>
     
     
      <div className="grid md:grid-cols-2 grid-cols-1 items-stretch w-full  mx-4 b overflow-hidden">
        {/* Left Section - Image */}
        <div className=" w-full flex justify-center items-center bg-gray-50">
          <img
            src="/images/DeliveryInformation.png"
            alt="Movers deliverig furniture"
            className="w-full"
          />
        </div>

        {/* Right Section - Delivery Details Table */}
        <div className="w-full flex flex-col justify-center p-8">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="px-2 py-3 text-left text-xl font-semibold text-[#A1A2A3] uppercase tracking-wider">
                  Delivery Type
                </th>
                <th className="px-2 py-3 text-left text-xl font-semibold text-[#A1A2A3] uppercase tracking-wider">
                  How Long?
                </th>
                <th className="px-2 py-3 text-left text-xl font-semibold text-[#A1A2A3] uppercase tracking-wider">
                  Delivery Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-2 py-4 text-xl font-semibold text-description">
                  Urgent
                </td>
                <td className="px-2 py-4 text-xl font-semibold text-description">
                  Estimated 4–7 Days
                </td>
                <td className="px-2 py-4 text-xl font-extrabold text-[#5A8535]">
                  £149.99
                </td>
              </tr>
              <tr>
                <td className="px-2 py-4 text-xl font-semibold text-description">
                  Normal
                </td>
                <td className="px-2 py-4 text-xl font-semibold text-description">
                  Estimated 8–16 Working Days*
                </td>
                <td className="px-2 py-4 text-xl font-extrabold text-[#5A8535]">
                  £149.99
                </td>
              </tr>
              <tr>
                <td className="px-2 py-4 text-xl font-semibold text-description">
                  Collection
                </td>
                <td className="px-2 py-4 text-xl font-semibold text-description">
                  From our warehouse
                </td>
                <td className="px-2 py-4 text-xl font-extrabold text-[#5A8535]">
                  £149.99
                </td>
              </tr>
              <tr>
                <td className="px-2 py-4 text-xl font-semibold text-description">
                  Urgent
                </td>
                <td className="px-2 py-4 text-xl font-semibold text-description">
                  3–5 Working Days
                </td>
                <td className="px-2 py-4 text-xl font-extrabold text-[#5070D9]">
                  FREE
                </td>
              </tr>
              <tr>
                <td className="px-2 py-4 text-xl font-semibold text-description">
                  Sample Packs
                </td>
                <td className="px-2 py-4 text-xl font-semibold text-description">
                  3–5 Working Days
                </td>
                <td className="px-2 py-4 text-xl font-extrabold text-[#5070D9]">
                  FREE
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </AnimateOnScroll>
    </div>
  );
}

export default DeliveryInformation;
