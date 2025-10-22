"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Popup } from "@/lib/popups/types";

interface LifestyleProps {
  popup: Popup;
  onClose: () => void;
  onCTAClick: () => void;
}

export default function Lifestyle({ popup, onClose, onCTAClick }: LifestyleProps) {
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
          className="fixed inset-0 bg-black bg-opacity-60 z-50"
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
        <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl pointer-events-auto">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image Side */}
            {content.imageUrl && (
              <div className="relative h-64 md:h-auto">
                <Image
                  src={content.imageUrl}
                  alt={content.imageAlt || "Lifestyle image"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Content Side */}
            <div
              className="flex flex-col items-center justify-center p-8 md:p-12"
              style={{ backgroundColor: content.panelBgColor || "#FAF7F2" }}
            >
              <div className="w-full max-w-sm text-center">
                <h2
                  className="mb-8 text-balance font-serif text-4xl font-normal md:text-5xl"
                  style={{ color: content.titleColor || "#3A3A3A" }}
                >
                  {content.title}
                </h2>

                {content.subtitle && (
                  <p
                    className="mb-6 text-lg leading-relaxed"
                    style={{ color: content.subtitleColor || "#6B5845" }}
                  >
                    {content.subtitle}
                  </p>
                )}

                <Button
                  onClick={onCTAClick}
                  className="mb-4 h-14 w-full rounded-full text-lg font-medium"
                  style={{
                    backgroundColor: content.ctaBgColor || "#3F3F3F",
                    color: content.ctaTextColor || "#FFFFFF",
                  }}
                >
                  {content.ctaLabel}
                </Button>

                {content.closeLabel && (
                  <button
                    onClick={onClose}
                    className="mb-8 text-sm font-medium uppercase tracking-wider underline underline-offset-4 transition-colors"
                    style={{ color: content.textColor || "#8B7355" }}
                  >
                    {content.closeLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
