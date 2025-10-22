# Popup Builder Guide

## Table of Contents
1. [Setup](#setup)
2. [Accessing the Admin Panel](#accessing-the-admin-panel)
3. [Creating Your First Popup](#creating-your-first-popup)
4. [Managing Popups](#managing-popups)
5. [Understanding Triggers](#understanding-triggers)
6. [Display Frequency Rules](#display-frequency-rules)
7. [Page Targeting](#page-targeting)
8. [Analytics](#analytics)
9. [Troubleshooting](#troubleshooting)

---

## Setup

### 1. Set the Admin Passcode

Add the `POPUP_ADMIN_PASSCODE` environment variable to your `.env.local` file:

```bash
POPUP_ADMIN_PASSCODE=your-secure-passcode-here
```

**Important:** Choose a strong, unique passcode. This protects your popup admin panel.

### 2. Restart Your Development Server

After adding the environment variable, restart your Next.js development server:

```bash
npm run dev
```

---

## Accessing the Admin Panel

### Step 1: Navigate to Admin
Go to: `http://localhost:3000/admin/popups`

### Step 2: Enter Passcode
Enter the passcode you set in `.env.local`

### Step 3: Access Dashboard
Once authenticated, you'll see the Popup Dashboard with:
- List of all popups
- Statistics (impressions, clicks, CTR)
- Create/Edit/Delete actions

---

## Creating Your First Popup

### 1. Click "Create Popup"
From the dashboard, click the **"+ Create Popup"** button.

### 2. Fill in Basic Information

**Popup Name** (required)
- Internal name for identifying your popup
- Example: "Welcome Offer", "Exit Intent Sale", "Newsletter Signup"

**Enable Status**
- Toggle to enable/disable the popup
- Disabled popups won't show on the site

### 3. Configure Image Settings

**Image URL** (required)
- Enter a full URL to your image
- Example: `https://example.com/images/popup-hero.jpg`
- The image appears on the left side (desktop) or top (mobile)

**Image Alt Text** (optional)
- Descriptive text for accessibility

### 4. Set Content

**Title** (required)
- Main headline of your popup
- Example: "Psst... fancy £1,000 to spend?"

**Subtitle** (optional)
- Supporting text below the title
- Example: "Join our list for launch-week perks"

**CTA Button Text** (required)
- Text on the primary call-to-action button
- Example: "YES", "Get Offer", "Sign Me Up"

**CTA Button URL** (optional)
- Where the button should navigate
- Example: `/signup`, `https://example.com/offer`
- Leave empty to just close the popup on click

**Close Link Text** (optional)
- Text for the dismissal link
- Example: "NO THANKS", "Maybe later"

### 5. Customize Styling

Use the color pickers to customize:
- **Panel Background Color** - Background of the content area
- **Title Color** - Color of the main headline
- **Subtitle Color** - Color of the subtitle text
- **CTA Background Color** - Button background
- **CTA Text Color** - Button text color

**Default Colors:**
- Panel Background: `#FFFFFF` (white)
- Title: `#111827` (dark gray)
- Subtitle: `#4B5563` (medium gray)
- CTA Background: `#111827` (dark gray)
- CTA Text: `#FFFFFF` (white)

### 6. Configure Display Triggers

Choose when your popup appears:

**Delay After Page Load**
- Show popup after X milliseconds
- Example: `2000` = 2 seconds after page loads
- Set to `0` for immediate display

**Show After Scroll %**
- Trigger when user scrolls to a certain percentage
- Example: `50` = popup shows after scrolling 50% down the page
- Range: 0-100

**Show on Exit Intent**
- Trigger when user's mouse moves toward browser close/back
- Great for last-chance offers
- Check the box to enable

**Note:** Multiple triggers can work together. The popup shows when ANY trigger condition is met.

### 7. Set Display Frequency

Control how often users see the popup:

**Show Only Once Per Session**
- User sees popup once until they close their browser
- Tracked in browser's session storage
- Resets when browser is closed

**Cooldown Period (days)**
- Don't show popup again for X days after first view
- Tracked in browser's local storage (persists across sessions)
- Example: `7` = show again after 7 days

### 8. Page Targeting

Choose where your popup appears:

**All Pages**
- Popup can show on any page of your site

**Specific Pages Only**
- Enter URL paths where popup SHOULD show
- Click "Add" to add each path
- Examples:
  - `/` (homepage only)
  - `/products/*` (all product pages)
  - `/category/furniture` (exact match)

**Exclude Specific Pages**
- Enter URL paths where popup should NOT show
- Useful for excluding checkout, account pages
- Examples:
  - `/checkout`
  - `/cart`
  - `/admin/*`

**Wildcard Support:**
- Use `*` for pattern matching
- `/products/*` matches `/products/chair`, `/products/table/oak`, etc.
- `/blog/*` matches all blog pages

### 9. Animation Settings

**Entry Animation**
- **Fade In** - Smooth opacity transition
- **Slide from Right** - Slides in from the right side
- **Zoom In** - Scales up from center

**Exit Animation**
- **Fade Out** - Smooth opacity fade
- **Slide to Right** - Slides out to the right
- **Zoom Out** - Scales down to center

**Animation Duration**
- Time in milliseconds (100-1000)
- Default: `250` (0.25 seconds)
- Higher = slower animation

**Show Background Overlay**
- Dark semi-transparent background behind popup
- Helps draw attention to popup
- Check to enable

### 10. Save Your Popup

Click **"Create Popup"** to save.

You'll be redirected to the dashboard where you can see your new popup.

---

## Managing Popups

### Dashboard Actions

**Enable/Disable Toggle**
- Click the status badge to toggle popup on/off
- Green = Enabled (shows on site)
- Gray = Disabled (hidden)

**Edit**
- Click "Edit" to modify popup configuration
- All settings can be changed
- Changes take effect immediately

**Duplicate**
- Creates a copy of the popup
- New popup starts disabled
- Name will be "Original Name (Copy)"
- Useful for A/B testing variations

**Delete**
- Permanently removes popup
- Confirmation required
- Cannot be undone

### Search and Filter

Use the search box to filter popups by name.

---

## Understanding Triggers

### Trigger Types

**1. Page Load Delay**
- **Best for:** Welcome messages, announcements
- **Example:** Show "Free Shipping Today!" 2 seconds after page loads
- **Tip:** Don't set too low (users need time to see the page first)

**2. Scroll Percentage**
- **Best for:** Content engagement, related offers
- **Example:** Show newsletter signup after user scrolls 75%
- **Tip:** Higher percentage = more engaged users

**3. Exit Intent**
- **Best for:** Retention, last-chance offers
- **Example:** "Wait! Get 10% off before you go"
- **Tip:** Use sparingly to avoid annoying users

### Combining Triggers

You can enable multiple triggers simultaneously:
- Popup shows when **ANY** trigger condition is met
- Example: Show after 5 seconds OR 50% scroll OR exit intent

---

## Display Frequency Rules

### Session-Based (oncePerSession)

**How it works:**
- Popup shows once per browser session
- Resets when user closes ALL browser tabs/windows
- Stored in `sessionStorage`

**Best for:**
- Welcome messages
- Non-critical announcements
- Soft promotions

### Cooldown Period (coolDownDays)

**How it works:**
- Records first impression timestamp in `localStorage`
- Calculates days since last shown
- Shows again after cooldown expires

**Best for:**
- Seasonal promotions
- Newsletter signups
- Major announcements

**Example scenarios:**
- `coolDownDays: 1` - Show once per day
- `coolDownDays: 7` - Show once per week
- `coolDownDays: 30` - Show once per month

### Combining Frequency Rules

Both rules can work together:
```
oncePerSession: true
coolDownDays: 7
```
Result: Shows once per session, but won't show again for 7 days after first view.

---

## Page Targeting

### Targeting Modes

**1. All Pages**
```
mode: "all"
```
Popup can appear on any page.

**2. Include Specific Pages**
```
mode: "include"
paths: ["/", "/products/*", "/sale"]
```
Popup ONLY shows on homepage, product pages, and sale page.

**3. Exclude Specific Pages**
```
mode: "exclude"
paths: ["/checkout", "/account/*"]
```
Popup shows everywhere EXCEPT checkout and account pages.

### Path Matching Examples

| Pattern | Matches | Doesn't Match |
|---------|---------|---------------|
| `/` | Homepage only | Any other page |
| `/products/*` | `/products/chair`, `/products/table/oak` | `/product` (no 's') |
| `/blog/*` | `/blog/post-1`, `/blog/category/news` | `/blog` (exact) |
| `/sale` | `/sale` exactly | `/sales`, `/sale/items` |

---

## Analytics

### Metrics Tracked

**Impressions**
- Number of times popup was shown
- Tracked when popup appears on screen
- Increments even if user immediately closes

**Clicks**
- Number of times CTA button was clicked
- Tracked when user clicks primary button
- Does not include "close" link clicks

**CTR (Click-Through Rate)**
- Percentage: (Clicks / Impressions) × 100
- Example: 50 clicks ÷ 1000 impressions = 5% CTR

### Dashboard Analytics

View real-time stats in the dashboard:
- Sort by impressions, clicks, or CTR
- Last Updated timestamp
- Compare performance across popups

### Good CTR Benchmarks

- **Excellent:** 5%+
- **Good:** 2-5%
- **Average:** 1-2%
- **Poor:** <1%

**Tips to improve CTR:**
- Make value proposition clear
- Use action-oriented CTA text
- Test different images
- Target specific pages
- Optimize trigger timing

---

## Troubleshooting

### Popup Not Showing

**1. Check if popup is enabled**
- Go to dashboard
- Status should be green "Enabled"

**2. Verify page targeting**
- Check targeting mode and paths
- Ensure current page matches rules

**3. Check frequency rules**
- Clear browser cache/localStorage
- Open in incognito/private window
- Check if cooldown period is active

**4. Verify trigger conditions**
- Wait for page load delay
- Scroll to required percentage
- Trigger exit intent (move mouse to top)

**5. Check browser console**
- Open DevTools (F12)
- Look for JavaScript errors
- Check Network tab for API calls

### Popup Shows Too Often

**Solution:** Adjust frequency settings
- Enable "Once per session"
- Add cooldown period (e.g., 7 days)

### Wrong Popup Shows

**Issue:** Multiple popups match the same page

**Current Behavior:** Only first matching popup shows (MVP limitation)

**Solution:**
- Use more specific page targeting
- Disable conflicting popups
- Future: Priority system will be added

### Image Not Loading

**Check:**
- Image URL is valid and accessible
- Image is publicly hosted (not local file)
- URL starts with `http://` or `https://`
- Server allows hotlinking

**Tip:** Test image URL in browser first

### Animation Not Working

**Check:**
- Animation duration is set (default 250ms)
- Browser supports CSS transforms
- No JavaScript errors in console

### Analytics Not Tracking

**Check:**
- Browser allows API requests
- Network tab shows POST to `/api/popups/[id]/metrics`
- No ad blockers interfering

---

## Best Practices

### Content

✅ **Do:**
- Keep titles short and punchy (under 60 characters)
- Clear, action-oriented CTA text
- High-quality, relevant images
- Provide value to the user

❌ **Don't:**
- Use generic CTAs like "Click Here"
- Overload with text
- Use low-quality or irrelevant images
- Be too aggressive with frequency

### Timing

✅ **Do:**
- Give users time to see your content first (2-5 seconds)
- Use exit intent for retention offers
- Test different timing to optimize

❌ **Don't:**
- Show immediately on page load (annoying)
- Show on every page (overwhelming)
- Ignore mobile user experience

### Targeting

✅ **Do:**
- Target relevant pages (e.g., sale popup on product pages)
- Exclude checkout/payment pages
- Test different audiences

❌ **Don't:**
- Show the same popup everywhere
- Interrupt critical user flows
- Ignore user behavior

---

## Advanced Tips

### A/B Testing

1. Duplicate an existing popup
2. Change ONE element (headline, image, CTA)
3. Run both for equal time periods
4. Compare CTR to determine winner
5. Disable losing variant

### Seasonal Campaigns

**Example: Holiday Sale**
```
Name: "Black Friday 2024"
Enabled: true (during sale)
Targeting: all pages
Frequency: once per session, 1 day cooldown
```

Turn off after promotion ends.

### Newsletter Signup

**Example: Exit Intent Newsletter**
```
Title: "Don't miss out!"
Subtitle: "Join 10,000+ subscribers for exclusive deals"
CTA: "Subscribe Now"
CTA URL: "/newsletter"
Trigger: Exit Intent
Frequency: Once per session, 30 day cooldown
```

### Cart Abandonment

**Example: Free Shipping Offer**
```
Title: "Free Shipping on Orders Over £50!"
Targeting: include ["/cart"]
Trigger: Exit Intent
Frequency: Once per session
```

---

## Future Enhancements (Planned)

As noted in CLUADE.md §15, future versions will include:

- **Database Migration** - Move from JSON to proper database
- **Better Auth** - Role-based access control
- **Multiple Templates** - More popup designs
- **Priority System** - Control which popup shows when multiple match
- **A/B Testing Built-in** - Native split testing features
- **Advanced Analytics** - Per-page breakdown, funnels, export
- **Event Hooks** - Custom actions (apply discount, etc.)

---

## Support

For issues or questions:
1. Check this guide first
2. Review CLUADE.md for technical details
3. Check browser console for errors
4. Review implementation in codebase

---

**Version:** 1.0 (MVP)
**Last Updated:** 2025-10-21
**Spec Reference:** CLUADE.md
