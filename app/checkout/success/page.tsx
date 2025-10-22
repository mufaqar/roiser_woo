"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import useCart from "@/hooks/useCart";
import { formatCurrency } from "@/config/currency";

// ✅ Outer component just provides the Suspense boundary
export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading checkout details...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

// ✅ Inner component actually uses useSearchParams()
function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const orderId = searchParams.get("order_id") || searchParams.get("key");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const pendingOrderId = sessionStorage.getItem("pendingOrderId");
    const actualOrderId = orderId || pendingOrderId;

    console.log("Success page loaded with:", {
      urlOrderId: orderId,
      pendingOrderId,
      actualOrderId,
      allParams: Object.fromEntries(searchParams.entries()),
    });

    if (!actualOrderId) {
      console.warn("No order ID found, redirecting to home");
      router.push("/");
      return;
    }

    const paymentStatus = searchParams.get("payment_status");
    const orderReceived = searchParams.get("order-received");

    if (
      orderReceived ||
      paymentStatus === "success" ||
      paymentStatus === "completed" ||
      orderId
    ) {
      console.log("Payment confirmed, clearing cart");
      clearCart();
      sessionStorage.removeItem("pendingOrderId");
      sessionStorage.removeItem("completedOrder");
      sessionStorage.removeItem("pendingOrder");
    }

    const orderDataStr = sessionStorage.getItem("completedOrder");
    if (orderDataStr) {
      try {
        const orderData = JSON.parse(orderDataStr);
        setOrderDetails(orderData);
      } catch (error) {
        console.error("Error parsing order data:", error);
      }
    }
  }, [orderId, router, clearCart, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-green-50 border-b border-green-100 px-6 py-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-green-700">Thank you for your purchase</p>
          </div>

          {/* Order Details */}
          <div className="px-6 py-8">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-title mb-4">
                Order Details
              </h2>
              <div className="bg-gray-50 rounded-md p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Order Number:</span>
                  <span className="text-lg font-bold text-title">
                    #{orderId || sessionStorage.getItem("pendingOrderId")}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Order Date:</span>
                  <span className="text-sm text-title">
                    {new Date().toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Payment Status:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Paid
                  </span>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-title mb-4">
                What's Next?
              </h2>
              <div className="space-y-3">
                {[ 
                  { step: 1, title: "Order Confirmation Email", text: "You'll receive a confirmation email with your order details shortly." },
                  { step: 2, title: "Order Processing", text: "We'll start processing your order right away." },
                  { step: 3, title: "Shipping Update", text: "You'll receive tracking information once your order ships." }
                ].map(({ step, title, text }) => (
                  <div className="flex items-start" key={step}>
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                        <span className="text-sm font-semibold">{step}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-title">{title}</p>
                      <p className="text-xs text-gray-600 mt-1">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="flex-1 bg-[#2F4761] text-white text-center py-3 px-6 rounded-md hover:bg-[#1f3347] transition-colors font-semibold"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="flex-1 bg-white text-[#2F4761] text-center py-3 px-6 rounded-md border-2 border-[#2F4761] hover:bg-gray-50 transition-colors font-semibold"
              >
                Return to Home
              </Link>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Need help with your order?{" "}
                <a href="/contact" className="text-[#2F4761] hover:underline font-medium">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
