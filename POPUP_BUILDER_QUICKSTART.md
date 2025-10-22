# Popup Builder - Quick Start Checklist

## ✅ Setup (One-Time)

- [ ] **1. Add Environment Variable**
  ```bash
  # Add to .env.local
  POPUP_ADMIN_PASSCODE=your-secure-passcode-here
  ```

- [ ] **2. Restart Dev Server**
  ```bash
  npm run dev
  ```

- [ ] **3. Verify Files Created**
  - [ ] `data/popups.json` exists (auto-created on first run)
  - [ ] All dependencies installed (`p-limit`, `nanoid`)

---

## 🚀 Create Your First Popup (5 Minutes)

### Step 1: Access Admin Panel
- [ ] Navigate to: `http://localhost:3000/admin/popups`
- [ ] Enter your passcode

### Step 2: Create Popup
- [ ] Click **"+ Create Popup"**
- [ ] Fill in required fields:
  - [ ] **Popup Name:** "My First Popup"
  - [ ] **Image URL:** Your image URL (or use a placeholder)
  - [ ] **Title:** "Welcome to Our Store!"
  - [ ] **CTA Label:** "Shop Now"

### Step 3: Configure Basics
- [ ] Set **Delay After Page Load:** `2000` (2 seconds)
- [ ] Enable **Show Only Once Per Session**
- [ ] Set **Targeting Mode:** "All Pages"
- [ ] Enable **Show Background Overlay**

### Step 4: Save & Enable
- [ ] Click **"Create Popup"**
- [ ] Verify popup appears in dashboard
- [ ] Toggle status to **"Enabled"** (green)

### Step 5: Test
- [ ] Open homepage in new incognito/private window
- [ ] Wait 2 seconds
- [ ] Popup should appear!

---

## 📊 Common Use Cases

### Welcome Message
```
✓ Title: "Welcome! Get 10% Off Your First Order"
✓ Trigger: Page Load Delay (2000ms)
✓ Frequency: Once per session
✓ Targeting: Homepage only ["/"]
```

### Exit Intent Sale
```
✓ Title: "Wait! Don't Miss Out on 20% Off"
✓ Trigger: Exit Intent
✓ Frequency: Once per session, 7 day cooldown
✓ Targeting: All pages
```

### Newsletter Signup
```
✓ Title: "Join Our Newsletter for Exclusive Deals"
✓ Trigger: Scroll 50%
✓ Frequency: Once per session, 30 day cooldown
✓ Targeting: Blog pages ["/blog/*"]
```

### Product Page Upsell
```
✓ Title: "Free Shipping on Orders Over £50"
✓ Trigger: Page Load Delay (3000ms)
✓ Frequency: Once per session
✓ Targeting: Product pages ["/product/*"]
```

---

## 🔧 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Popup not showing | 1. Check enabled status<br>2. Clear browser cache<br>3. Test in incognito |
| Wrong popup shows | Only first matching popup shows (check targeting) |
| Image not loading | Verify image URL is publicly accessible |
| Can't access admin | Check passcode in .env.local, restart server |

---

## 📁 File Structure Reference

```
app/
├── admin/
│   ├── layout.tsx (passcode protection)
│   └── popups/
│       ├── page.tsx (dashboard)
│       ├── create/page.tsx
│       └── edit/[id]/page.tsx
├── api/
│   ├── admin/
│   │   ├── login/route.ts
│   │   └── logout/route.ts
│   └── popups/
│       ├── route.ts (GET all, POST create)
│       ├── [id]/route.ts (GET, PATCH, DELETE)
│       └── [id]/metrics/route.ts (POST tracking)
├── layout.tsx (PopupManager integrated)

components/
├── admin/
│   ├── PasscodeProtection.tsx
│   ├── PopupDashboard.tsx
│   ├── PopupBuilder.tsx
│   ├── PopupPreview.tsx
│   ├── ColorPicker.tsx
│   ├── ImageUploader.tsx
│   └── UrlListInput.tsx
└── popups/
    ├── PopupManager.tsx
    ├── PopupRenderer.tsx
    └── templates/
        └── SideBySide.tsx

lib/
├── auth/
│   └── passcode.ts
└── popups/
    ├── storage.ts
    ├── types.ts
    ├── schema.ts
    ├── matcher.ts
    └── tracking.ts

data/
└── popups.json (auto-created)

hooks/
└── usePopup.tsx
```

---

## 🎯 Next Steps

- [ ] Read full [POPUP_BUILDER_GUIDE.md](POPUP_BUILDER_GUIDE.md) for detailed documentation
- [ ] Create 2-3 test popups to understand features
- [ ] Review analytics after 24 hours
- [ ] Optimize based on CTR data
- [ ] Plan A/B tests for different variations

---

## 🔗 Related Documentation

- **Full Guide:** [POPUP_BUILDER_GUIDE.md](POPUP_BUILDER_GUIDE.md)
- **Technical Spec:** [CLUADE.md](CLUADE.md)
- **Environment Setup:** [.env.local.example](.env.local.example)

---

**Need Help?**
1. Check [POPUP_BUILDER_GUIDE.md](POPUP_BUILDER_GUIDE.md) troubleshooting section
2. Review browser console for errors
3. Verify CLUADE.md implementation details
