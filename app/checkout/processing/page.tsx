import CheckoutProcessing from "@/components/Checkout/CheckoutProcessing";
import { Suspense } from "react";

export default function CheckoutProcessingPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center">Loading checkout details...</div>
      }
    >
      <CheckoutProcessing />
    </Suspense>
  );
}
