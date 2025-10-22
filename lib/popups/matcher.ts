// URL/Path Matching Utility
// Following CLUADE.md §8

import { Popup } from "./types";

/**
 * Check if a URL matches a pattern
 * Supports wildcards: /products/* or exact paths: /about
 */
export function matchesPattern(url: string, pattern: string): boolean {
  // Normalize paths (remove trailing slashes)
  const normalizedUrl = url.replace(/\/$/, "") || "/";
  const normalizedPattern = pattern.replace(/\/$/, "") || "/";

  // Exact match
  if (normalizedUrl === normalizedPattern) {
    return true;
  }

  // Wildcard match
  if (normalizedPattern.includes("*")) {
    const regexPattern = normalizedPattern
      .replace(/\*/g, ".*") // Replace * with .*
      .replace(/\//g, "\\/"); // Escape forward slashes
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(normalizedUrl);
  }

  return false;
}

/**
 * Check if a popup should be shown on the current path
 */
export function shouldShowOnPath(popup: Popup, currentPath: string): boolean {
  const { mode, paths = [] } = popup.behaviour.targeting;

  // Show on all pages
  if (mode === "all") {
    return true;
  }

  // Check if path matches any pattern in the list
  const hasMatch = paths.some((pattern) => matchesPattern(currentPath, pattern));

  // Include mode: show only if path matches
  if (mode === "include") {
    return hasMatch;
  }

  // Exclude mode: show only if path does NOT match
  if (mode === "exclude") {
    return !hasMatch;
  }

  return false;
}
