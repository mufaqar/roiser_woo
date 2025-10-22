// Admin Login API
// Following CLUADE.md §4, §6

import { NextRequest, NextResponse } from "next/server";
import { validatePasscode, getAdminCookieOptions, ADMIN_COOKIE_NAME } from "@/lib/auth/passcode";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { passcode } = body;

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json(
        { error: "Passcode is required" },
        { status: 400 }
      );
    }

    const isValid = validatePasscode(passcode);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid passcode" },
        { status: 401 }
      );
    }

    // Create response with success message
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // Set httpOnly secure cookie
    response.cookies.set(ADMIN_COOKIE_NAME, "1", getAdminCookieOptions());

    return response;
  } catch (error) {
    console.error("[API] POST /api/admin/login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
