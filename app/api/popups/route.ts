// Popups API Routes: GET (list), POST (create)
// Following CLUADE.md §6

import { NextRequest, NextResponse } from "next/server";
import { listPopups, listEnabledPopups, createPopup } from "@/lib/popups/storage";
import { CreatePopupSchema } from "@/lib/popups/schema";
import { cookies } from "next/headers";

/**
 * GET /api/popups
 * Returns all popups (admin) or enabled popups (public)
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("popup_admin")?.value === "1";

    // Public users only see enabled popups
    const popups = isAdmin ? await listPopups() : await listEnabledPopups();

    return NextResponse.json({ popups }, { status: 200 });
  } catch (error) {
    console.error("[API] GET /api/popups error:", error);
    return NextResponse.json(
      { error: "Failed to fetch popups" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/popups
 * Create a new popup (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin cookie
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("popup_admin")?.value === "1";

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate with Zod
    const validation = CreatePopupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    // Create popup with default metrics if not provided
    const popupData = {
      ...validation.data,
      metrics: validation.data.metrics || {
        impressions: 0,
        clicks: 0,
      },
    };

    const newPopup = await createPopup(popupData);

    return NextResponse.json({ popup: newPopup }, { status: 201 });
  } catch (error) {
    console.error("[API] POST /api/popups error:", error);
    return NextResponse.json(
      { error: "Failed to create popup" },
      { status: 500 }
    );
  }
}
