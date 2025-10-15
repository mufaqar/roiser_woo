'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useCart from '@/hooks/useCart';

export default function CheckoutProcessing() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing your order...');

  useEffect(() => {
    const processOrder = async () => {
      try {
        // Get order data from sessionStorage
        const orderDataStr = sessionStorage.getItem('pendingOrder');
        if (!orderDataStr) {
          setStatus('error');
          setMessage('No order data found');
          return;
        }

        const orderData = JSON.parse(orderDataStr);

        // Create WooCommerce order
        const response = await fetch('/api/woo-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to create order');
        }

        const result = await response.json();

        // Clear order data from sessionStorage
        sessionStorage.removeItem('pendingOrder');

        // If Stripe payment URL is returned, redirect to Stripe
        if (result.paymentUrl) {
          window.location.href = result.paymentUrl;
          return;
        }

        // Order created successfully
        setStatus('success');
        setMessage('Order created successfully!');
        clearCart();

        // Redirect to success page after 2 seconds
        setTimeout(() => {
          router.push(`/checkout/success?order_id=${result.orderId}`);
        }, 2000);

      } catch (error) {
        console.error('Order processing error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Failed to process order');
      }
    };

    processOrder();
  }, [router, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {status === 'processing' && (
            <>
              <div className="mx-auto h-12 w-12 text-[#2F4761]">
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-bold text-title">Processing Order</h2>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
              <p className="mt-4 text-xs text-gray-500">Please do not close this window or press the back button.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-bold text-green-600">Success!</h2>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
              <p className="mt-4 text-xs text-gray-500">Redirecting to order confirmation...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-bold text-red-600">Order Failed</h2>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
              <button
                onClick={() => router.push('/checkout')}
                className="mt-6 w-full bg-[#2F4761] text-white py-3 px-4 rounded-md hover:bg-[#1f3347] transition-colors"
              >
                Return to Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
