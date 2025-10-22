"use client";

// usePopup Hook
// Handles popup triggers, frequency checks, and display logic
// Following CLUADE.md §8

import { useEffect, useState } from "react";
import { Popup } from "@/lib/popups/types";
import {
  trackMetric,
  wasShownInSession,
  markShownInSession,
  isInCooldown,
  markShownForCooldown,
} from "@/lib/popups/tracking";

interface UsePopupReturn {
  shouldShow: boolean;
  handleShow: () => void;
  handleClose: () => void;
  handleCTAClick: () => void;
}

export function usePopup(popup: Popup): UsePopupReturn {
  const [shouldShow, setShouldShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check frequency rules
    const checkFrequency = (): boolean => {
      const { oncePerSession, coolDownDays } = popup.behaviour.frequency;

      // Check session-based frequency
      if (oncePerSession && wasShownInSession(popup.id)) {
        return false;
      }

      // Check cooldown period
      if (coolDownDays && isInCooldown(popup.id, coolDownDays)) {
        return false;
      }

      return true;
    };

    // Don't show if frequency rules not met
    if (!checkFrequency()) {
      return;
    }

    // Setup triggers
    const triggers = popup.behaviour.triggers;
    let timeoutId: NodeJS.Timeout | null = null;
    let hasTriggered = false;

    const triggerPopup = () => {
      if (!hasTriggered && !hasShown) {
        hasTriggered = true;
        setShouldShow(true);
      }
    };

    // Page load delay trigger
    if (triggers.onLoadDelayMs !== undefined && triggers.onLoadDelayMs >= 0) {
      timeoutId = setTimeout(triggerPopup, triggers.onLoadDelayMs);
    }

    // Scroll trigger
    if (triggers.onScrollPercent !== undefined) {
      const handleScroll = () => {
        const scrollPercent =
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        if (scrollPercent >= (triggers.onScrollPercent || 0)) {
          triggerPopup();
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    // Exit intent trigger
    if (triggers.exitIntent) {
      const handleMouseLeave = (e: MouseEvent) => {
        // Trigger if mouse leaves from top of viewport
        if (e.clientY <= 0) {
          triggerPopup();
          document.removeEventListener("mouseleave", handleMouseLeave);
        }
      };

      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [popup, hasShown]);

  const handleShow = () => {
    if (!hasShown) {
      setHasShown(true);

      // Mark as shown
      if (popup.behaviour.frequency.oncePerSession) {
        markShownInSession(popup.id);
      }
      if (popup.behaviour.frequency.coolDownDays) {
        markShownForCooldown(popup.id);
      }

      // Track impression
      trackMetric(popup.id, "impression");
    }
  };

  const handleClose = () => {
    setShouldShow(false);
  };

  const handleCTAClick = () => {
    // Track click
    trackMetric(popup.id, "click");

    // Navigate if URL is provided
    if (popup.content.ctaHref) {
      window.location.href = popup.content.ctaHref;
    }

    handleClose();
  };

  return {
    shouldShow,
    handleShow,
    handleClose,
    handleCTAClick,
  };
}
