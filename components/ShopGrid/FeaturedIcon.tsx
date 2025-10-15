"use client";
import Image from "next/image";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

const features = [
  {
    id: 1,
    label: "Free Shipping",
    desc: "Free shipping on orders over $65.",
    icon: "/images/shipping-icon.png",
  },
  {
    id: 2,
    label: "Free Returns",
    desc: "20 days free return policy.",
    icon: "/images/return-icon.png",
  },
  {
    id: 3,
    label: "Secured Payments",
    desc: "We accept all major credit cards.",
    icon: "/images/Secured-Payments-icon.png",
  },
  {
    id: 4,
    label: "Customer Service",
    desc: "Top-notch customer service.",
    icon: "/images/Customer-Service-icon.png",
  },
];

const FeaturedIcons = ({ bgColor = "#F4F5F7" }) => {
  const getDelay = useAutoDelay();
  return (
    <section className="py-5" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {features.map((feature) => (
            <AnimateOnScroll key={feature.id} type="fade-up" delay={getDelay()}>
              <div className="flex items-center gap-4 border-r last:border-r-0 pr-6 border-[#C8C6C6]"
              >
                <span className="w-[50px] h-[50px] flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.label}
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-title text-title">
                    {feature.label}
                  </h3>
                  <p className="text-sm text-[#74787C]">{feature.desc}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIcons;