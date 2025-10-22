"use client";

import { X, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popup } from "@/lib/popups/types";

interface FlashSaleProps {
  popup: Popup;
  onClose: () => void;
  onCTAClick: () => void;
}

export default function FlashSale({ popup, onClose, onCTAClick }: FlashSaleProps) {
  const { content, animation } = popup;
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
          className="fixed inset-0 bg-black bg-opacity-40 z-50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="relative w-full max-w-md overflow-hidden rounded-3xl p-8 shadow-xl pointer-events-auto"
          style={{
            background: content.gradientFrom && content.gradientTo
              ? `linear-gradient(to bottom right, ${content.gradientFrom}, ${content.gradientTo})`
              : "linear-gradient(to bottom right, #F5EFE7, #E8DDD3)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-[#8B7355]/60 transition-colors hover:bg-[#E8DDD3] hover:text-[#8B7355]"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#A0826D] to-[#8B7355]">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <h2
              className="mb-2 text-balance text-3xl font-bold"
              style={{ color: content.titleColor || "#3A3A3A" }}
            >
              {content.title}
            </h2>
            {content.subtitle && (
              <p
                className="text-pretty text-lg leading-relaxed"
                style={{ color: content.subtitleColor || "rgba(107, 88, 69, 0.8)" }}
              >
                {content.subtitle}
              </p>
            )}
          </div>

          {content.promoCode && (
            <div className="mb-6 rounded-2xl bg-white/60 p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-[#3A3A3A]">Promo Code</span>
                <span className="rounded-full bg-[#E8DDD3] px-3 py-1 text-sm font-bold text-[#6B5845]">
                  {content.promoCode}
                </span>
              </div>
              {content.promoExpiry && (
                <p className="text-sm text-[#8B7355]/70">{content.promoExpiry}</p>
              )}
            </div>
          )}

          <div className="space-y-3">
            {content.placeholder && (
              <Input
                type="email"
                placeholder={content.placeholder}
                className="h-12 border-[#C4A69D] bg-white text-[#3A3A3A] placeholder:text-[#A0826D] focus:border-[#8B7355] focus:ring-[#8B7355]"
              />
            )}
            <Button
              onClick={onCTAClick}
              className="h-12 w-full rounded-full text-lg font-semibold"
              style={{
                background: content.ctaBgColor || "linear-gradient(to right, #A0826D, #8B7355)",
                color: content.ctaTextColor || "#FFFFFF",
              }}
            >
              {content.ctaLabel}
            </Button>
          </div>

          {content.privacyText && (
            <p className="mt-4 text-center text-xs text-[#8B7355]/60">
              {content.privacyText}
            </p>
          )}
        </div>
      </motion.div>
    </>
  );
}
