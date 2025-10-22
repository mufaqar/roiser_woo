# Popup Builder (OptiMonk‑style) — Plan & Spec

> **Status:** Draft v1 • **Scope:** MVP (passcode‑protected admin, JSON storage) • **Target App:** Next.js 15 (App Router) Woo storefront

---

## 1) Executive Summary

We will build a passcode‑protected **Popup Builder** (admin‑only) that lets us create, preview, and manage on‑site popups. For MVP we’ll persist configs to a **JSON file** (no DB yet), and render the selected popup(s) on the public site with configurable triggers (delay, scroll, exit intent, etc.). We’ll ship **one template** first (image + text + CTA, side‑by‑side) and implement **basic analytics** (views, clicks, CTR per popup).

**Reference product:** OptiMonk (behaviour, animation philosophy, targeting). We intentionally scope down to a single best‑in‑class template to validate the builder loop end‑to‑end.

---

## 2) Current Codebase Snapshot (from Claude’s exploration)

- **Framework:** Next.js 15.5.4 (App Router)
- **API routes:** `/app/api/woo-cart/route.ts` (WooCommerce cart proxy)
- **Data source:** External WooCommerce (Store API + REST v3)
- **Auth:** None (login UI exists but not wired)
- **UI libs present:** Radix (popover/tooltip), Sonner (toasts)
- **Modals:** Custom filter modal exists (useful patterns)

> These findings inform our approach but the Popup system is **decoupled** from Woo and will not rely on store APIs.

---

## 3) Goals & Non‑Goals

### Goals (MVP)

- Passcode‑protected **Admin Panel** (no user accounts yet)
- CRUD for **Popups**
- **Live preview** while editing
- **Display rules** (triggers, frequency, targeting)
- **Animations** (enter/exit)
- **Basic analytics** (impressions, clicks, CTR)

### Non‑Goals (MVP)

- No full authentication/roles (passcode only)
- No multi‑template library (just **1** starter template)
- No priority system; allow multiple or single selection per page scope but **no conflict resolution** logic yet
- No advanced A/B testing (record groundwork only)

---

## 4) Admin Access (Passcode)

- Route: `/admin/popups`
- Strategy: Gate with a single **passcode** stored in `process.env.POPUP_ADMIN_PASSCODE`.
- UX: On success, issue an **HTTP‑only session cookie** (e.g., `popup_admin=1; Max-Age=...; Secure; SameSite=Lax`).
- Middleware: Protect `/admin/popups` and `/api/popups*` for write ops; public read allowed for client display.

**.env**

```bash
POPUP_ADMIN_PASSCODE=changeme-strong
```

---

## 5) Data Model (JSON, file‑based)

### File location

```
/data/popups.json    # committed or ignored; for MVP treat as persistent storage
```

### Type definitions

```ts
// popup types (conceptual)
export type PopupId = string; // nanoid

export interface Popup {
  id: PopupId;
  name: string;
  enabled: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO

  template: "image_text_cta_side_by_side"; // MVP fixed

  // content
  content: {
    imageUrl: string; // left pane image
    imageAlt?: string;
    title: string;
    subtitle?: string;
    ctaLabel: string;
    ctaHref?: string; // optional if using custom actions
    closeLabel?: string; // e.g., "No thanks"

    // appearance
    textColor?: string; // e.g., #111827
    titleColor?: string;
    subtitleColor?: string;
    ctaTextColor?: string;
    ctaBgColor?: string;
    panelBgColor?: string;
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
    enter: "fade" | "slide-right" | "zoom";
    exit: "fade" | "slide-right" | "zoom";
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
```

### Example popup JSON

```json
{
  "id": "p_ckKk1tE8",
  "name": "Welcome Offer",
  "enabled": true,
  "createdAt": "2025-10-21T09:00:00.000Z",
  "updatedAt": "2025-10-21T09:00:00.000Z",
  "template": "image_text_cta_side_by_side",
  "content": {
    "imageUrl": "/images/popup-hero.jpg",
    "imageAlt": "Autumn collection",
    "title": "Smarter Matches, Faster Savings",
    "subtitle": "Join our list for launch‑week perks.",
    "ctaLabel": "Get Offer",
    "ctaHref": "/signup",
    "closeLabel": "No thanks",
    "textColor": "#111827",
    "titleColor": "#111827",
    "subtitleColor": "#4B5563",
    "ctaTextColor": "#FFFFFF",
    "ctaBgColor": "#111827",
    "panelBgColor": "#FFFFFF"
  },
  "behaviour": {
    "triggers": {
      "onLoadDelayMs": 2000,
      "onScrollPercent": 30,
      "exitIntent": true
    },
    "frequency": { "oncePerSession": true, "coolDownDays": 7 },
    "targeting": { "mode": "include", "paths": ["/", "/products/*"] }
  },
  "animation": {
    "enter": "slide-right",
    "exit": "fade",
    "durationMs": 250,
    "overlay": true
  },
  "metrics": { "impressions": 0, "clicks": 0 }
}
```

---

## 6) API Design (App Router)

> **Note:** Write ops require passcode cookie; read ops are public (for client render).

```
/app/api/popups/route.ts            # GET(list), POST(create)
/app/api/popups/[id]/route.ts       # GET(read), PATCH(update), DELETE(remove)
/app/api/popups/[id]/metrics/route.ts  # POST({ type: "impression"|"click" })
/app/api/admin/login/route.ts       # POST({ passcode }) → set-cookie
/app/api/admin/logout/route.ts      # POST → clear cookie
```

**Behavioural notes**

- File IO: safe read‑modify‑write with mutex (e.g., `p-limit`) to avoid race conditions
- Metrics: increment counters server‑side to avoid tampering; throttle if needed

### 6.1 Endpoint alias (optional)

- If you prefer a global `POST /api/popups/track` endpoint (as in Plan Mode), expose it and internally forward to `POST /api/popups/[id]/metrics` for a single source of truth.

---

## 7) Admin UI (Builder)

**Route:** `/admin/popups`

**Sections**

1. **List**

   - Table: name, enabled toggle, impressions, clicks, CTR, last updated
   - Actions: edit, duplicate, delete

2. **Editor** (split view)

   - Left: Form (content, behaviour, animation)
   - Right: **Live Preview** (template rendered with current form state)

3. **Templates** (MVP: one template)

   - "Side‑by‑side: Image + Text + CTA"

**Form fields** (mapped to model)

- Content: imageUrl, imageAlt, title, subtitle, ctaLabel, ctaHref, colors
- Behaviour: triggers (delay, scroll %, exit intent), frequency (session/cooldown), targeting (mode, paths)
- Animation: enter, exit, duration, overlay (on/off)

**Validation**

- Title required, CTA label required
- Colors: hex check `^#([0-9a-fA-F]{3}){1,2}$`
- Paths: allow `/` and glob `*` (we’ll store raw strings and interpret client‑side)

---

## 8) Client Runtime (Display)

- Load public config via `GET /api/popups` (filter for `enabled===true`)
- **Targeting**: client evaluates current `location.pathname` vs each popup’s `targeting`.
- **Frequency**: use `sessionStorage` for `oncePerSession`; `localStorage` timestamp for `coolDownDays` per `popup.id`.
- **Triggers**:

  - `onLoadDelayMs`: `setTimeout`
  - `onScrollPercent`: attach once, compute `scrollY / (docHeight - viewportHeight)`
  - `exitIntent`: `mouseleave` at top `clientY <= 0`

- **Animations**: CSS classes for enter/exit; optional overlay (single boolean)
- **Metrics**: fire `POST /api/popups/:id/metrics` with `{ type: "impression" | "click" }` on show/click.

---

## 9) Template: Image + Text + CTA (Spec)

**Layout**

- Desktop: 2‑column card, image left (object‑cover), content right
- Mobile: Stack (image on top, content below)
- Max width ~ 680–760px; rounded‑2xl; shadow‑xl

**Content regions**

- Image: `imageUrl`, `imageAlt`
- Text: `title`, `subtitle`
- CTA: button (link to `ctaHref` or custom action hook)
- Close: discreet text button (optional), X icon in corner

**Style tokens**

- Respect provided color fields; sensible defaults if missing

---

## 10) Minimal Middleware & Security

- Middleware checks cookie for admin routes; otherwise 401.
- Protect file IO routes from write by non‑admin.
- Sanitize strings (no HTML injection in stored content); escape on render.
- CORS: same‑origin only for admin write endpoints.

---

## 11) Folder & File Layout (merged)

```
app/
  admin/
    layout.tsx
    popups/
      page.tsx                 # dashboard (list + stats)
      create/page.tsx          # create builder
      edit/[id]/page.tsx       # edit builder
  api/
    admin/
      login/route.ts
      logout/route.ts
    popups/
      route.ts                 # GET(list), POST(create)
      [id]/route.ts            # GET, PATCH/PUT, DELETE
      [id]/metrics/route.ts    # POST {type: "impression"|"click"|"conversion"}
      # optional alias if you prefer Claude's naming:
      # track/route.ts         # POST analytics → internally calls [id]/metrics
  layout.tsx                   # mount PopupManager
components/
  admin/
    PasscodeProtection.tsx
    PopupDashboard.tsx
    PopupBuilder.tsx
    PopupPreview.tsx
    # Reusable admin inputs
    ColorPicker.tsx
    ImageUploader.tsx
    AnimationPreview.tsx
    UrlListInput.tsx
  popups/
    PopupManager.tsx           # loads configs, evaluates rules
    PopupRenderer.tsx          # chooses template component
    templates/
      SideBySide.tsx           # MVP template
lib/
  auth/
    passcode.ts
  popups/
    storage.ts                 # fs read/write with mutex
    types.ts                   # Popup types (TS)
    matcher.ts                 # URL/page matching
    tracking.ts                # analytics helpers
    schema.ts                  # zod schema (§12)
public/
  images/
    demo-popup.jpg

data/
  popups.json                  # JSON storage
hooks/
  usePopup.tsx                 # trigger & frequency hooks
```

---

## 12) Zod Schema (for Editor & API validation)

```ts
import { z } from "zod";

export const PopupSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  enabled: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  template: z.literal("image_text_cta_side_by_side"),
  content: z.object({
    imageUrl: z.string().url(),
    imageAlt: z.string().optional(),
    title: z.string().min(1),
    subtitle: z.string().optional(),
    ctaLabel: z.string().min(1),
    ctaHref: z.string().url().optional(),
    closeLabel: z.string().optional(),
    textColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/)
      .optional(),
    titleColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/)
      .optional(),
    subtitleColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/)
      .optional(),
    ctaTextColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/)
      .optional(),
    ctaBgColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/)
      .optional(),
    panelBgColor: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/)
      .optional(),
  }),
  behaviour: z.object({
    // Back-compat + Plan-Mode friendly
    triggers: z.object({
      onLoadDelayMs: z.number().int().nonnegative().optional(),
      onScrollPercent: z.number().min(0).max(100).optional(),
      exitIntent: z.boolean().optional(),
    }),
    frequency: z.union([
      // Our original simple form
      z.object({
        oncePerSession: z.boolean().optional(),
        coolDownDays: z.number().int().nonnegative().optional(),
      }),
      // Plan-Mode form
      z.object({
        type: z.enum([
          "every-visit",
          "once-session",
          "once-user",
          "days-delay",
        ]),
        days: z.number().int().nonnegative().optional(),
      }),
    ]),
    targeting: z.object({
      mode: z.enum(["all", "include", "exclude"]),
      paths: z.array(z.string()).optional(),
    }),
  }),
  animation: z.object({
    // Accept Plan-Mode labels but map to our internals later
    entry: z.enum(["fade", "slide-right", "zoom", "scale", "slide-up"]),
    exit: z.enum(["fade", "slide-right", "zoom", "scale"]).optional(),
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
```

### 12.1 Schema compatibility & mapping

- **Frequency mapping**

  - `every-visit` → show always
  - `once-session` → `sessionStorage` flag
  - `once-user` → persistent `localStorage` flag (never re-show unless cleared)
  - `days-delay` + `days` → cool-down window using `localStorage`

- **Animation mapping**

  - `scale` → treat as `zoom`
  - `slide-up` → use our `slide-right` (MVP); can add `slide-up` CSS later for parity

---

## 13) Implementation Steps (MVP)

1. **Scaffold storage & API**

   - `data/popups.json` (seed empty `[]`)
   - `lib/popups/store.ts` (read/write, mutex)
   - CRUD routes + metrics route

2. **Passcode login**

   - `/api/admin/login` sets cookie on valid passcode
   - middleware guards admin pages + write endpoints

3. **Admin pages**

   - List (table, toggles, metrics)
   - Editor (form + preview; zod validation)

4. **Runtime host**

   - `<PopupHost />` in `app/layout.tsx` (client component)
   - Attach triggers, evaluate targeting & frequency

5. **Template**

   - `TemplateSideBySide` responsive card + animation classes

6. **Analytics**

   - Impression on show; click on CTA
   - Show basic stats in list

---

## 14) QA Checklist

- [ ] Passcode gate denies wrong code, allows correct, persists cookie
- [ ] Create/Edit/Delete popups works and writes to JSON
- [ ] Preview matches runtime rendering
- [ ] Triggers: delay, scroll %, exit intent
- [ ] Frequency: once per session, cooldown days
- [ ] Targeting: all/include/exclude with path list
- [ ] Animations enter/exit/overlay
- [ ] Metrics increment accurately and don’t double‑count
- [ ] No errors in SSR/CSR boundaries; hydration clean

---

## 15) Future Upgrades

- Swap JSON to **DB** (Neon/Supabase) with Drizzle
- **Auth**: Better Auth + roles, audit log
- **Template library** & variants, visual animation presets
- **Priority & conflicts** (deterministic ordering)
- **A/B testing** (assignments + conversion goals)
- **Event bus** (open/close hooks for custom actions, e.g., apply discount)
- **Analytics**: per‑page breakdown, funnels, export

---

## 16) Acceptance Criteria (MVP)

- I can log in with a passcode and stay signed in while editing
- I can create a popup, see a live preview, and enable it
- The popup displays on targeted pages following trigger rules
- The popup animates in/out and respects overlay toggle
- Impressions and clicks are captured; CTR shows in the admin list

---

## 17) Developer Notes

- Keep **public read** small: consider `/api/popups?public=1` returning only enabled popups with runtime‑safe fields (no analytics payloads)
- For JSON writes, **debounce** from the UI to reduce churn; always re‑read after write to display source of truth
- Use `nanoid` for IDs; guard against collisions
- Encapsulate trigger logic in hooks for testability

---

## 18) Snippets (pseudo)

**Runtime mount**

```tsx
// app/layout.tsx (client)
import { PopupHost } from "@/components/popup-runtime/PopupHost";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <PopupHost />
      </body>
    </html>
  );
}
```

**Record metrics**

```ts
await fetch(`/api/popups/${id}/metrics`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ type: "impression" }),
});
```

---

**End of spec**

---

## 19) Implementation Plan (from Claude Plan Mode) — Cleaned & Aligned

> This section reformats Claude’s Plan‑Mode output to fit this `claude.md`. Naming is aligned to this spec. Where Claude’s naming differed, we note the mapping.

### 19.1 Overview

Build an OptiMonk‑style Popup Builder with **passcode‑protected admin**, **JSON storage**, and a comprehensive **configuration UI**. One template for MVP (side‑by‑side image + content + CTA).

### 19.2 Auth & Admin Panel

**Files**

- `app/admin/layout.tsx` — passcode wrapper (sets/reads secure cookie)
- `app/admin/popups/page.tsx` — dashboard (list/stats)
- `app/admin/popups/create/page.tsx` — create builder
- `app/admin/popups/edit/[id]/page.tsx` — edit builder
- `components/admin/PasscodeProtection.tsx` — passcode form
- `lib/auth/passcode.ts` — helpers

**Flow**

- `.env.local`: `POPUP_ADMIN_PASSCODE=…` _(Claude used `ADMIN_PASSCODE`; we standardize on `POPUP_ADMIN_PASSCODE` to match §4)_
- On success, set **httpOnly** cookie (24h). Middleware guards admin routes + write APIs.

### 19.3 Data Storage (JSON)

**Files**

- `data/popups.json` — storage
- `app/api/popups/route.ts` — `GET(list), POST(create)`
- `app/api/popups/[id]/route.ts` — `GET, PUT/PATCH(update), DELETE`
- `lib/popups/storage.ts` — fs read/write (mutex)
- `lib/popups/types.ts` — TS interfaces (align with §5/§12)

**Structure** _(Claude’s shape mapped to ours)_

- `template: "side-by-side"` ↔ `template: "image_text_cta_side_by_side"`
- `config.*` ↔ `content`, `behaviour`, `animation` (see §5/§12 for final schema)
- `stats` ↔ `metrics`

### 19.4 Display System

**Files**

- `components/popups/PopupManager.tsx` — mounts on all pages (in `app/layout.tsx`)
- `components/popups/PopupRenderer.tsx` — renders popup by template
- `components/popups/templates/SideBySide.tsx` — MVP template
- `hooks/usePopup.tsx` — trigger & frequency logic
- `lib/popups/matcher.ts` — URL/page targeting
- `lib/popups/tracking.ts` — analytics helpers

**Logic**

- Fetch enabled popups → match targeting → evaluate triggers (pageload/exit/scroll/timer) → check frequency (session/local) → render with animations → POST metrics (view/click/conversion\*).

> \*For MVP, **conversion** can mirror **click**; later we can attach explicit goals.

### 19.5 Admin Builder UI

**Dashboard**

- Cards/table with: name, enabled toggle, views/clicks/CTR, updatedAt; actions: Create/Edit/Duplicate/Delete; search/filter.

**Builder** (create/edit)

- Split view: **Form** (collapsible) + **Live Preview**.
- Sections: Basic, Template, Image, Content, Styling, Trigger, Frequency, Targeting, Animation.
- Actions: Save Draft, Publish, Preview in new tab.

**Key Fields** (mapped to spec)

- Content: image(url+alt/bg), headline/subtitle, primary CTA (text + action URL/close), optional secondary text/action; colors (content bg, headline/body, button bg/text).
- Behaviour: trigger (pageload/exit/scroll/timer + delay/percent), frequency (every visit/once‑session/once‑user/days‑delay), targeting (all/specific/exclude + URLs).
- Animation: entry/exit (`fade|slide-right|scale|slide-up`), duration (ms). _(Map `scale`/`slide-up` → `zoom`/`slide-right` if we keep §12 enums strict.)_

### 19.6 Analytics & Tracking

**API**

- `POST /api/popups/track` _(Claude)_ ↔ `POST /api/popups/[id]/metrics` _(this spec §6)_
- Events: `view`, `click`, `conversion` (MVP: conversion = click)
- Storage: increment counters in `metrics` and persist.

### 19.7 File Structure (Merged)

```
app/
  admin/
    layout.tsx
    popups/
      page.tsx
      create/page.tsx
      edit/[id]/page.tsx
  api/
    admin/
      login/route.ts
      logout/route.ts
    popups/
      route.ts
      [id]/route.ts
      [id]/metrics/route.ts   # or popups/track/route.ts if following Claude strictly
  layout.tsx                  # mount PopupManager
components/
  admin/
    PasscodeProtection.tsx
    PopupDashboard.tsx
    PopupBuilder.tsx
    PopupPreview.tsx
  popups/
    PopupManager.tsx
    PopupRenderer.tsx
    templates/SideBySide.tsx
lib/
  auth/passcode.ts
  popups/
    storage.ts
    types.ts
    matcher.ts
    tracking.ts
    schema.ts                # zod (§12)
data/
  popups.json
hooks/
  usePopup.tsx
```

### 19.8 Implementation Steps (Sequenced)

1. Types & Zod schema (align names with §5/§12)
2. FS storage utils + seed `data/popups.json` (`[]`)
3. CRUD API + metrics endpoint
4. Passcode auth + middleware
5. Admin dashboard + editor (live preview)
6. Side‑by‑side template component
7. PopupManager runtime (triggers, frequency, targeting, animations)
8. Analytics wiring (views/clicks[/conversion])
9. QA pass (see §14) + polish

### 19.9 Env & Deps

- `.env.local`: `POPUP_ADMIN_PASSCODE=your-secure-passcode`
- Deps already present: `framer-motion`, `react-hook-form`, `zod`, `sonner`, `@radix-ui/react-popover`.

**Notes**

- Keep naming consistent in code with this spec.
- If you prefer Claude’s `track` endpoint, alias it to our `metrics` route internally for flexibility.

---
