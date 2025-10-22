"use client";

// Popup Renderer Component
// Routes to appropriate template based on popup type
// Following CLUADE.md §8, §19.4

import { AnimatePresence } from "framer-motion";
import { Popup } from "@/lib/popups/types";
import { usePopup } from "@/hooks/usePopup";
import SideBySide from "./templates/SideBySide";
import Newsletter from "./templates/Newletter";
import Lifestyle from "./templates/Lifestyle";
import FlashSale from "./templates/FlashSale";
import { useEffect } from "react";

interface PopupRendererProps {
  popup: Popup;
}

export default function PopupRenderer({ popup }: PopupRendererProps) {
  const { shouldShow, handleShow, handleClose, handleCTAClick } = usePopup(popup);

  // Track popup shown event
  useEffect(() => {
    if (shouldShow) {
      handleShow();
    }
  }, [shouldShow, handleShow]);

  // Render template based on popup type
  const renderTemplate = () => {
    switch (popup.template) {
      case "side_by_side":
        return (
          <SideBySide
            popup={popup}
            onClose={handleClose}
            onCTAClick={handleCTAClick}
          />
        );
      case "newsletter":
        return (
          <Newsletter
            popup={popup}
            onClose={handleClose}
            onCTAClick={handleCTAClick}
          />
        );
      case "lifestyle":
        return (
          <Lifestyle
            popup={popup}
            onClose={handleClose}
            onCTAClick={handleCTAClick}
          />
        );
      case "flash_sale":
        return (
          <FlashSale
            popup={popup}
            onClose={handleClose}
            onCTAClick={handleCTAClick}
          />
        );
      default:
        console.warn(`Unknown popup template: ${popup.template}`);
        return null;
    }
  };

  return (
    <AnimatePresence>
      {shouldShow && renderTemplate()}
    </AnimatePresence>
  );
}
