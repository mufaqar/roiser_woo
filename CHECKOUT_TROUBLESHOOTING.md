# Checkout Troubleshooting Guide

## Common Issues and Solutions

### Issue: "Cart is empty" (409 Error)

**Symptoms:**
- You get a 409 error when trying to place an order
- Error message: "Cart is empty or expired"

**Causes:**
1. WooCommerce cart hasn't synced yet when checkout was submitted
2. Cart-Token is missing or invalid
3. Items are in local cart but not in WooCommerce cart

**Solutions:**

#### Solution 1: Wait for Cart Sync
The cart automatically syncs with WooCommerce, but it can take up to 250ms. The checkout page now:
- Waits up to 2 seconds for the cart token to be available
- Shows "PROCESSING..." button state during submission
- Logs cart sync status to console

**How to verify:**
1. Open browser console (F12)
2. Add items to cart
3. Navigate to checkout
4. You should see: `Cart ready for checkout. Token: xxxxx...`

#### Solution 2: Check WooCommerce Cart Endpoint
Test if the WooCommerce Store API is working:

```bash
# From your terminal
curl -X GET "https://your-store.com/wp-json/wc/store/v1/cart" \
  -H "Content-Type: application/json"
```

You should get a JSON response with cart data.

#### Solution 3: Verify Environment Variables
Make sure these are set in `.env.local`:

```env
WC_STORE_URL=https://your-woocommerce-store.com
WC_CONSUMER_KEY=ck_xxxxx
WC_CONSUMER_SECRET=cs_xxxxx
```

**Important:** Do NOT include `/wp-json` in the `WC_STORE_URL`

#### Solution 4: Check Payment Method ID
The default payment method is `"stripe"`. If your WooCommerce installation uses a different ID:

1. Check WooCommerce → Settings → Payments
2. Look at the payment gateway ID (it might be `stripe_checkout` or similar)
3. Update `schemas/cartSchema.ts` line 29:

```typescript
paymentMethod: z.enum(["your_payment_method_id"], {
  message: "Please select a payment method",
}),
```

---

## Debugging Steps

### Step 1: Check Cart Token
Add this to your checkout page temporarily:

```tsx
{cartToken ? (
  <div className="bg-green-100 p-2 text-xs">
    Cart Token: {cartToken.substring(0, 20)}...
  </div>
) : (
  <div className="bg-yellow-100 p-2 text-xs">
    Waiting for cart sync...
  </div>
)}
```

### Step 2: Inspect Network Requests
1. Open DevTools → Network tab
2. Filter by "checkout"
3. Try placing an order
4. Check the request payload and response

**What to look for:**
- Request should have `Cart-Token` header
- Request body should have `billing_address` and `shipping_address`
- Response should contain `order_id`

### Step 3: Check WooCommerce Logs
1. Go to WooCommerce → Status → Logs
2. Look for any errors related to:
   - Store API
   - Stripe payment gateway
   - Cart session

---

## Testing Checklist

Before testing checkout:

- [ ] Products are in cart (local cart has items)
- [ ] Cart token exists (check console logs)
- [ ] WooCommerce Store API is accessible
- [ ] Stripe is configured in WooCommerce admin
- [ ] Environment variables are set correctly
- [ ] You're using a valid UK postcode format (e.g., `SW1A 1AA`)
- [ ] You're using a valid UK phone format (e.g., `07123 456789`)

---

## Still Having Issues?

### Enable Verbose Logging

Add this to `app/api/checkout/route.ts` after line 19:

```typescript
console.log('Checkout Request:', {
  hasCartToken: !!cartToken,
  cartTokenPreview: cartToken?.substring(0, 10),
  billingCity: billing_address?.city,
  paymentMethod: payment_method,
});
```

### Check WooCommerce Requirements

Ensure your WooCommerce installation:
1. Is version 5.0 or higher
2. Has REST API enabled
3. Has the Store API available (`/wp-json/wc/store/v1/`)
4. Has Stripe gateway properly configured

### Test with a Simple Product

Try checking out with:
- Just 1 item in cart
- No coupons applied
- Standard shipping (not free shipping)
- Fresh browser session (clear cache/cookies)

---

## Payment Method Configuration

### Stripe Setup in WooCommerce

1. Install WooCommerce Stripe Gateway plugin
2. Go to WooCommerce → Settings → Payments → Stripe
3. Add your Stripe keys:
   - **Test Mode**: Use test keys for development
   - **Live Mode**: Use live keys for production
4. Make sure "Enable Stripe" is checked
5. Note the payment method ID (usually `stripe`)

### Verifying Payment Method

Test if Stripe is available in WooCommerce:

```bash
curl -X GET "https://your-store.com/wp-json/wc/store/v1/checkout" \
  -H "Content-Type: application/json"
```

Look for `payment_methods` in the response. It should include Stripe.

---

## Contact Support

If you're still experiencing issues, provide:
1. Browser console logs
2. Network tab screenshot (showing the failed request)
3. WooCommerce system status (WooCommerce → Status)
4. Payment gateway configuration screenshot
