"use client";

// Popup Manager Component
// Loads enabled popups and renders matching ones
// Following CLUADE.md §8, §18

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Popup } from "@/lib/popups/types";
import { shouldShowOnPath } from "@/lib/popups/matcher";
import PopupRenderer from "./PopupRenderer";

export default function PopupManager() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Fetch enabled popups
    const fetchPopups = async () => {
      try {
        const response = await fetch("/api/popups");
        if (response.ok) {
          const data = await response.json();
          setPopups(data.popups || []);
        }
      } catch (error) {
        console.error("Failed to fetch popups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopups();
  }, []);

  if (loading) {
    return null;
  }

  // Filter popups that should show on current path
  const matchingPopups = popups.filter((popup) =>
    shouldShowOnPath(popup, pathname)
  );

  // For MVP: show only the first matching popup
  // Future: implement priority system
  const popupToShow = matchingPopups[0];

  return (
    <>
      {popupToShow && <PopupRenderer popup={popupToShow} />}
    </>
  );
}
