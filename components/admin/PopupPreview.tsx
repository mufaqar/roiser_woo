"use client";

// Popup Preview Component
// Live preview of popup in builder
// Following CLUADE.md §9

import Image from "next/image";
import { Popup } from "@/lib/popups/types";

interface PopupPreviewProps {
  popup: Partial<Popup>;
}

export default function PopupPreview({ popup }: PopupPreviewProps) {
  const content = (popup.content || {}) as any;
  const animation = (popup.animation || {}) as any;

  // Default values
  const imageUrl = content.imageUrl || "/placeholder-popup.jpg";
  const title = content.title || "Your Popup Title";
  const subtitle = content.subtitle || "Add a compelling subtitle here";
  const ctaLabel = content.ctaLabel || "Click Here";
  const closeLabel = content.closeLabel || "No thanks";

  // Styling
  const panelBg = content.panelBgColor || "#FFFFFF";
  const titleColor = content.titleColor || "#111827";
  const subtitleColor = content.subtitleColor || "#4B5563";
  const textColor = content.textColor || "#111827";
  const ctaBg = content.ctaBgColor || "#111827";
  const ctaText = content.ctaTextColor || "#FFFFFF";

  return (
    <div className="h-full flex items-center justify-center bg-gray-100 p-8">
      {/* Overlay */}
      {animation.overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      )}

      {/* Popup */}
      <div className="relative z-20 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 grid-cols-1">
          {/* Image Side */}
          <div className="relative h-80 md:h-auto">
            <Image
              src={imageUrl}
              alt={content.imageAlt || "Popup image"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Content Side */}
          <div
            className="p-8 flex flex-col justify-center relative"
            style={{ backgroundColor: panelBg, color: textColor }}
          >
            {/* Close Button */}
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>

            {/* Title */}
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: titleColor }}
            >
              {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-base mb-6" style={{ color: subtitleColor }}>
                {subtitle}
              </p>
            )}

            {/* CTA Button */}
            <button
              type="button"
              className="w-full py-3 px-6 rounded-md font-semibold text-base mb-4 transition-opacity hover:opacity-90"
              style={{ backgroundColor: ctaBg, color: ctaText }}
            >
              {ctaLabel}
            </button>

            {/* Close Text */}
            {closeLabel && (
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                {closeLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
