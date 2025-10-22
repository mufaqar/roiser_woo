// Popup Zod Schema (following CLUADE.md §12)

import { z } from "zod";

export const PopupSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Popup name is required"),
  enabled: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  template: z.enum(["side_by_side", "newsletter", "lifestyle", "flash_sale"]),

  content: z.object({
    imageUrl: z.string().url("Must be a valid image URL").optional(),
    imageAlt: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
    ctaLabel: z.string().min(1, "CTA label is required"),
    ctaHref: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    closeLabel: z.string().optional(),

    // Flash sale/promo fields
    promoCode: z.string().optional(),
    promoExpiry: z.string().optional(),
    discountText: z.string().optional(),

    // Newsletter fields
    placeholder: z.string().optional(),
    privacyText: z.string().optional(),
    icon: z.string().optional(),

    // Appearance
    textColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be a valid hex color")
      .optional(),
    titleColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be a valid hex color")
      .optional(),
    subtitleColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be a valid hex color")
      .optional(),
    ctaTextColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be a valid hex color")
      .optional(),
    ctaBgColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be a valid hex color")
      .optional(),
    panelBgColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be a valid hex color")
      .optional(),
    gradientFrom: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be a valid hex color")
      .optional(),
    gradientTo: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be a valid hex color")
      .optional(),
  }),

  behaviour: z.object({
    triggers: z.object({
      onLoadDelayMs: z.number().int().nonnegative().optional(),
      onScrollPercent: z.number().min(0).max(100).optional(),
      exitIntent: z.boolean().optional(),
    }),
    frequency: z.object({
      oncePerSession: z.boolean().optional(),
      coolDownDays: z.number().int().nonnegative().optional(),
    }),
    targeting: z.object({
      mode: z.enum(["all", "include", "exclude"]),
      paths: z.array(z.string()).optional(),
    }),
  }),

  animation: z.object({
    // Accept Plan-Mode labels but map to our internals
    // "scale" → "zoom", "slide-up" → treat as "slide-right" for MVP
    enter: z.enum(["fade", "slide-right", "zoom", "scale", "slide-up"]),
    exit: z.enum(["fade", "slide-right", "zoom", "scale"]),
    durationMs: z.number().int().positive().optional(),
    overlay: z.boolean().optional(),
  }),

  metrics: z.object({
    impressions: z.number().int().nonnegative(),
    clicks: z.number().int().nonnegative(),
    lastShownAt: z.string().optional(),
    lastClickedAt: z.string().optional(),
  }),
});

// Partial schema for creation (without id, timestamps, metrics)
export const CreatePopupSchema = PopupSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  metrics: true,
}).extend({
  metrics: z.object({
    impressions: z.number().int().nonnegative().default(0),
    clicks: z.number().int().nonnegative().default(0),
    lastShownAt: z.string().optional(),
    lastClickedAt: z.string().optional(),
  }).optional(),
});

// Partial schema for updates
export const UpdatePopupSchema = PopupSchema.partial().omit({
  id: true,
  createdAt: true,
});

// Metrics tracking schema
export const MetricsSchema = z.object({
  type: z.enum(["impression", "click", "conversion"]),
});

export type PopupInput = z.infer<typeof CreatePopupSchema>;
export type PopupUpdate = z.infer<typeof UpdatePopupSchema>;
export type MetricsInput = z.infer<typeof MetricsSchema>;
