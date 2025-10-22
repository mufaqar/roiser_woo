"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popup } from "@/lib/popups/types";

interface NewsletterProps {
  popup: Popup;
  onClose: () => void;
  onCTAClick: () => void;
}

export default function Newsletter({ popup, onClose, onCTAClick }: NewsletterProps) {
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
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
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
          className="relative w-full max-w-md overflow-hidden rounded-3xl p-8 shadow-2xl pointer-events-auto"
          style={{
            background: content.gradientFrom && content.gradientTo
              ? `linear-gradient(to bottom right, ${content.gradientFrom}, ${content.gradientTo})`
              : "linear-gradient(to bottom right, #C4A69D, #A0826D)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6 text-center">
            {content.icon && <div className="mb-4 text-6xl">{content.icon}</div>}
            <h2
              className="mb-2 text-balance text-4xl font-black uppercase tracking-tight"
              style={{ color: content.titleColor || "#FFFFFF" }}
            >
              {content.title}
            </h2>
            {content.subtitle && (
              <p
                className="text-pretty text-lg leading-relaxed"
                style={{ color: content.subtitleColor || "rgba(255, 255, 255, 0.9)" }}
              >
                {content.subtitle}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder={content.placeholder || "your@email.com"}
              className="h-12 border-2 border-white/30 bg-white/20 text-white placeholder:text-white/60 focus:border-white focus:bg-white/30"
            />
            <Button
              onClick={onCTAClick}
              className="h-12 w-full rounded-full text-lg font-bold"
              style={{
                backgroundColor: content.ctaBgColor || "#FFFFFF",
                color: content.ctaTextColor || "#A0826D",
              }}
            >
              {content.ctaLabel}
            </Button>
          </div>

          {content.privacyText && (
            <p className="mt-4 text-center text-sm text-white/70">
              {content.privacyText}
            </p>
          )}
        </div>
      </motion.div>
    </>
  );
}
