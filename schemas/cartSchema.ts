import z from "zod";

export const shippingFormSchema = z.object({
  shippingMethod: z.enum(["free", "flat"], {
    // error: "Please select a shipping method",
    message: "Please select a shipping method",
  }),
});

export type ShippingFormData = z.infer<typeof shippingFormSchema>;

export const checkoutFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  companyName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  apartment: z.string().optional(),
  townCity: z.string().min(1, "Town/City is required"),
  state: z.string().optional(),
  zipCode: z.string()
    .min(1, "Postcode is required")
    .regex(/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i, "Please enter a valid UK postcode (e.g., SW1A 1AA)"),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$|^(\+44\s?\d{2,4}|\(?0\d{2,4}\)?)\s?\d{3,4}\s?\d{3,4}$/, "Please enter a valid UK phone number"),
  orderNotes: z.string().optional(),
  paymentMethod: z.enum(["stripe"], {
    message: "Please select a payment method",
  }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
