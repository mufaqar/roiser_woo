"use client";

// Side-by-Side Template Component
// Following CLUADE.md §9

import Image from "next/image";
import { motion } from "framer-motion";
import { Popup } from "@/lib/popups/types";

interface SideBySideProps {
  popup: Popup;
  onClose: () => void;
  onCTAClick: () => void;
}

export default function SideBySide({ popup, onClose, onCTAClick }: SideBySideProps) {
  const { content, animation } = popup;

  // Animation variants
  const getAnimationVariants = () => {
    const enter = animation.enter === "zoom" ? "scale" : animation.enter;
    const exit = animation.exit === "zoom" ? "scale" : animation.exit;

    const variants: any = {
      hidden: {},
      visible: {},
      exit: {},
    };

    // Entry animation
    if (enter === "fade") {
      variants.hidden.opacity = 0;
      variants.visible.opacity = 1;
    } else if (enter === "slide-right") {
      variants.hidden = { x: "100%", opacity: 0 };
      variants.visible = { x: 0, opacity: 1 };
    } else if (enter === "scale") {
      variants.hidden = { scale: 0.8, opacity: 0 };
      variants.visible = { scale: 1, opacity: 1 };
    }

    // Exit animation
    if (exit === "fade") {
      variants.exit.opacity = 0;
    } else if (exit === "slide-right") {
      variants.exit = { x: "100%", opacity: 0 };
    } else if (exit === "scale") {
      variants.exit = { scale: 0.8, opacity: 0 };
    }

    return variants;
  };

  const duration = (animation.durationMs || 250) / 1000;

  return (
    <>
      {/* Overlay */}
      {animation.overlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        />
      )}

      {/* Popup */}
      <motion.div
        variants={getAnimationVariants()}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto">
          <div className="grid md:grid-cols-2 grid-cols-1">
            {/* Image Side */}
            <div className="relative h-80 md:h-auto">
              <Image
                src={content.imageUrl}
                alt={content.imageAlt || "Popup image"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Content Side */}
            <div
              className="p-8 flex flex-col justify-center relative"
              style={{
                backgroundColor: content.panelBgColor || "#FFFFFF",
                color: content.textColor || "#111827",
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none font-light transition-colors"
                aria-label="Close popup"
              >
                ×
              </button>

              {/* Title */}
              <h2
                className="text-3xl font-bold mb-4 pr-8"
                style={{ color: content.titleColor || "#111827" }}
              >
                {content.title}
              </h2>

              {/* Subtitle */}
              {content.subtitle && (
                <p
                  className="text-base mb-6"
                  style={{ color: content.subtitleColor || "#4B5563" }}
                >
                  {content.subtitle}
                </p>
              )}

              {/* CTA Button */}
              <button
                onClick={onCTAClick}
                className="w-full py-3 px-6 rounded-md font-semibold text-base mb-4 transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: content.ctaBgColor || "#111827",
                  color: content.ctaTextColor || "#FFFFFF",
                }}
              >
                {content.ctaLabel}
              </button>

              {/* Close Text */}
              {content.closeLabel && (
                <button
                  onClick={onClose}
                  className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                >
                  {content.closeLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
