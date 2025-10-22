// Popup Builder Types (following CLUADE.md §5)

export type PopupId = string; // nanoid

export type PopupTemplate =
  | "side_by_side"      // Image + text side-by-side layout
  | "newsletter"        // Playful gradient newsletter signup
  | "lifestyle"         // Elegant lifestyle with image
  | "flash_sale";       // Warm gradient promo/discount

export interface Popup {
  id: PopupId;
  name: string;
  enabled: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO

  template: PopupTemplate;

  // content - flexible to support all templates
  content: {
    imageUrl?: string; // for templates with images
    imageAlt?: string;
    title: string;
    subtitle?: string;
    ctaLabel: string;
    ctaHref?: string; // optional if using custom actions
    closeLabel?: string; // e.g., "No thanks"

    // For flash sale/promo templates
    promoCode?: string;
    promoExpiry?: string;
    discountText?: string;

    // For newsletter templates
    placeholder?: string; // email input placeholder
    privacyText?: string;
    icon?: string; // emoji or icon name

    // appearance
    textColor?: string; // e.g., #111827
    titleColor?: string;
    subtitleColor?: string;
    ctaTextColor?: string;
    ctaBgColor?: string;
    panelBgColor?: string;
    gradientFrom?: string; // for gradient backgrounds
    gradientTo?: string;
  };

  // behaviour
  behaviour: {
    triggers: {
      onLoadDelayMs?: number; // e.g., 2000
      onScrollPercent?: number; // 0..100
      exitIntent?: boolean;
    };
    frequency: {
      oncePerSession?: boolean; // sessionStorage flag
      coolDownDays?: number; // localStorage timestamp + days
    };
    targeting: {
      mode: "all" | "include" | "exclude";
      paths?: string[]; // globs or regex strings, e.g., "/products/*"
    };
  };

  // animation
  animation: {
    enter: "fade" | "slide-right" | "zoom" | "scale" | "slide-up";
    exit: "fade" | "slide-right" | "zoom" | "scale";
    durationMs?: number; // default 250
    overlay?: boolean; // MVP: on/off only
  };

  // analytics (basic, file‑backed counter)
  metrics: {
    impressions: number;
    clicks: number;
    lastShownAt?: string; // ISO
    lastClickedAt?: string; // ISO
  };
}

// API response types
export interface PopupsListResponse {
  popups: Popup[];
}

export interface PopupResponse {
  popup: Popup;
}

export interface MetricsRequest {
  type: "impression" | "click" | "conversion";
}

export interface ErrorResponse {
  error: string;
  details?: string;
}
