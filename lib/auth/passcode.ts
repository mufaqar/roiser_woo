// Passcode Authentication Utilities
// Following CLUADE.md §4

/**
 * Validate passcode against environment variable
 */
export function validatePasscode(passcode: string): boolean {
  const correctPasscode = process.env.POPUP_ADMIN_PASSCODE;

  if (!correctPasscode) {
    console.error("[Auth] POPUP_ADMIN_PASSCODE not set in environment");
    return false;
  }

  return passcode === correctPasscode;
}

/**
 * Cookie configuration for admin session
 */
export const ADMIN_COOKIE_NAME = "popup_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds

/**
 * Get cookie configuration for setting admin cookie
 */
export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  };
}
