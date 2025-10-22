import OrderReceivedContent from "@/components/Checkout/OrderReceivedContent";
import { Suspense } from "react";

export const metadata = {
  title: "Order Received | Vita Home Decor",
  description: "Your order has been received successfully",
};

export default function OrderReceivedPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center">Loading checkout details...</div>
      }
    >
      <OrderReceivedContent />
    </Suspense>
  );
}
