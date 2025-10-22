// Analytics Tracking Utilities
// Following CLUADE.md §8, §10

import { PopupId } from "./types";

/**
 * Track a popup metric (impression/click/conversion)
 */
export async function trackMetric(
  popupId: PopupId,
  type: "impression" | "click" | "conversion"
): Promise<void> {
  try {
    await fetch(`/api/popups/${popupId}/metrics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
  } catch (error) {
    console.error(`Failed to track ${type} for popup ${popupId}:`, error);
  }
}

/**
 * Check if popup was already shown in this session
 */
export function wasShownInSession(popupId: PopupId): boolean {
  if (typeof window === "undefined") return false;
  const key = `popup_shown_session_${popupId}`;
  return sessionStorage.getItem(key) === "true";
}

/**
 * Mark popup as shown in this session
 */
export function markShownInSession(popupId: PopupId): void {
  if (typeof window === "undefined") return;
  const key = `popup_shown_session_${popupId}`;
  sessionStorage.setItem(key, "true");
}

/**
 * Check if popup is in cooldown period
 */
export function isInCooldown(popupId: PopupId, coolDownDays?: number): boolean {
  if (typeof window === "undefined" || !coolDownDays) return false;

  const key = `popup_last_shown_${popupId}`;
  const lastShown = localStorage.getItem(key);

  if (!lastShown) return false;

  const lastShownDate = new Date(lastShown);
  const now = new Date();
  const daysSinceShown = (now.getTime() - lastShownDate.getTime()) / (1000 * 60 * 60 * 24);

  return daysSinceShown < coolDownDays;
}

/**
 * Mark popup as shown for cooldown tracking
 */
export function markShownForCooldown(popupId: PopupId): void {
  if (typeof window === "undefined") return;
  const key = `popup_last_shown_${popupId}`;
  localStorage.setItem(key, new Date().toISOString());
}
