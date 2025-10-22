// Metrics API Route: POST (track impressions/clicks)
// Following CLUADE.md §6

import { NextRequest, NextResponse } from "next/server";
import { incrementMetrics } from "@/lib/popups/storage";
import { MetricsSchema } from "@/lib/popups/schema";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * POST /api/popups/[id]/metrics
 * Track impression, click, or conversion
 * Public endpoint (no auth required for tracking)
 */
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate with Zod
    const validation = MetricsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { type } = validation.data;

    // Map "conversion" to "clicks" for MVP (§6.1)
    const metricType = type === "conversion" ? "clicks" : type === "impression" ? "impressions" : "clicks";

    const updatedPopup = await incrementMetrics(id, metricType);

    if (!updatedPopup) {
      return NextResponse.json(
        { error: "Popup not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: `${type} recorded successfully`,
        metrics: updatedPopup.metrics
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`[API] POST /api/popups/[id]/metrics error:`, error);
    return NextResponse.json(
      { error: "Failed to record metric" },
      { status: 500 }
    );
  }
}
