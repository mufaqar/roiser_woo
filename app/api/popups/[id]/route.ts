// Individual Popup API Routes: GET, PATCH, DELETE
// Following CLUADE.md §6

import { NextRequest, NextResponse } from "next/server";
import { getPopup, updatePopup, deletePopup } from "@/lib/popups/storage";
import { UpdatePopupSchema } from "@/lib/popups/schema";
import { cookies } from "next/headers";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/popups/[id]
 * Get a single popup by ID (public)
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const popup = await getPopup(id);

    if (!popup) {
      return NextResponse.json(
        { error: "Popup not found" },
        { status: 404 }
      );
    }

    // Public users can only see enabled popups
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("popup_admin")?.value === "1";

    if (!isAdmin && !popup.enabled) {
      return NextResponse.json(
        { error: "Popup not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ popup }, { status: 200 });
  } catch (error) {
    console.error(`[API] GET /api/popups/[id] error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch popup" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/popups/[id]
 * Update a popup (admin only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
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

    const { id } = await params;
    const body = await request.json();

    // Validate with Zod
    const validation = UpdatePopupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const updatedPopup = await updatePopup(id, validation.data);

    if (!updatedPopup) {
      return NextResponse.json(
        { error: "Popup not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ popup: updatedPopup }, { status: 200 });
  } catch (error) {
    console.error(`[API] PATCH /api/popups/[id] error:`, error);
    return NextResponse.json(
      { error: "Failed to update popup" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/popups/[id]
 * Delete a popup (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
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

    const { id } = await params;
    const deleted = await deletePopup(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Popup not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Popup deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`[API] DELETE /api/popups/[id] error:`, error);
    return NextResponse.json(
      { error: "Failed to delete popup" },
      { status: 500 }
    );
  }
}
