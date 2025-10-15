'use client';

import { motion } from "framer-motion";
import React from "react";

const variantsMap: any = {
  'fade-up': {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  'fade-in': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  'slide-left': {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  'zoom-in': {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
};

export default function AnimateOnScroll({
  children,
  type = 'fade-up',
  delay = 0,
}: {
  children: React.ReactNode;
  type?: 'fade-up' | 'fade-in' | 'slide-left' | 'zoom-in';
  delay?: number;
}) {
  const variant = variantsMap[type] || variantsMap['fade-up'];

  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, type: "tween", }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Custom hook to auto-increment animation delay
 */
export function useAutoDelay(baseDelay = 0, increment = 0.1) {
  const indexRef = React.useRef(0);

  return () => {
    const delay = baseDelay + indexRef.current * increment;
    indexRef.current += 0.1;
    return delay;
  };
}