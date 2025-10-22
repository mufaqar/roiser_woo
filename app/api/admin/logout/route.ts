// Admin Logout API
// Following CLUADE.md §4, §6

import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/passcode";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Clear the admin cookie
    response.cookies.set(ADMIN_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[API] POST /api/admin/logout error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
