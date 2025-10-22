'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import useCart from '@/hooks/useCart';
import { formatCurrency } from '@/config/currency';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface BillingAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state?: string;
  postcode: string;
  phone: string;
  email?: string;
}

interface OrderData {
  id: number;
  order_key: string;
  date_created: string;
  total: string;
  billing: BillingAddress;
  line_items: any[];
  payment_method_title: string;
}

const ITEMS_PER_PAGE = 30;

export default function OrderReceivedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Get order ID from URL params or sessionStorage
  const orderId = searchParams.get('order_id') || searchParams.get('key');

  useEffect(() => {
    const loadOrderDetails = async () => {
      // Get order ID from various sources
      const pendingOrderId = sessionStorage.getItem('pendingOrderId');
      const actualOrderId = orderId || pendingOrderId;

      console.log('Order received page loaded with:', {
        urlOrderId: orderId,
        pendingOrderId,
        actualOrderId,
        allParams: Object.fromEntries(searchParams.entries()),
      });

      if (!actualOrderId) {
        console.warn('No order ID found, redirecting to home');
        router.push('/');
        return;
      }

      // Clear cart if order is confirmed
      const paymentStatus = searchParams.get('payment_status');
      const orderReceived = searchParams.get('order-received');

      if (orderReceived || paymentStatus === 'success' || paymentStatus === 'completed' || orderId) {
        console.log('Payment confirmed, clearing cart');
        clearCart();

        // Clean up sessionStorage
        sessionStorage.removeItem('pendingOrderId');
        sessionStorage.removeItem('pendingOrder');
      }

      // Get order details from sessionStorage if available
      const orderDataStr = sessionStorage.getItem('completedOrder');
      if (orderDataStr) {
        try {
          const orderData = JSON.parse(orderDataStr);
          setOrderDetails(orderData);
          console.log('Order details loaded from sessionStorage:', orderData);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing order data:', error);
        }
      }

      // If no order details in sessionStorage, fetch from API
      console.log('No order details in sessionStorage, fetching from API...');
      try {
        const response = await fetch(`/api/woo-order?order_id=${actualOrderId}`);
        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data.order);
          console.log('Order details fetched from API:', data.order);
          // Store in sessionStorage for future use
          sessionStorage.setItem('completedOrder', JSON.stringify(data.order));
        } else {
          console.error('Failed to fetch order details from API');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }

      setIsLoading(false);
    };

    loadOrderDetails();
  }, [orderId, router, clearCart, searchParams]);

  // Process line items
  const lineItems: OrderItem[] = orderDetails?.line_items?.map((item: any) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: parseFloat(item.price),
    total: parseFloat(item.total),
  })) || [];

  const displayedItems = lineItems.slice(0, displayCount);
  const hasMoreItems = displayCount < lineItems.length;
  const remainingItems = lineItems.length - displayCount;

  const orderTotal = orderDetails?.total ? parseFloat(orderDetails.total) : 0;
  const orderNumber = orderId || sessionStorage.getItem('pendingOrderId') || orderDetails?.id || '----';
  const orderDate = orderDetails?.date_created
    ? new Date(orderDetails.date_created).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2F4761] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="my-8">
          <h1 className="text-4xl font-normal text-[#141414] mb-4">Order received</h1>
          <p className="text-base text-gray-600">Thank you. Your order has been received.</p>
        </div>

        {/* Order Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-12 pb-8 border-b border-gray-200">
          <div>
            <p className="text-sm font-semibold text-[#141414] mb-1">Order #:</p>
            <p className="text-base text-gray-700">{orderNumber}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#141414] mb-1">Date:</p>
            <p className="text-base text-gray-700">{orderDate}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#141414] mb-1">Total:</p>
            <p className="text-base text-gray-700">{formatCurrency(orderTotal)}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#141414] mb-1">Email:</p>
            <p className="text-base text-gray-700 truncate">
              {orderDetails?.billing?.email || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#141414] mb-1">Payment:</p>
            <p className="text-base text-gray-700">
              {orderDetails?.payment_method_title || 'Credit / Debit Card'}
            </p>
          </div>
        </div>

        {/* Order Details Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-normal text-[#141414] mb-6">Order details</h2>

          <div className="border border-gray-200 rounded-sm overflow-hidden">
            {/* Large order notice */}
            {lineItems.length > ITEMS_PER_PAGE && (
              <div className="px-6 py-3 bg-blue-50 border-b border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Large order:</span> Showing {displayCount} of {lineItems.length} items
                </p>
              </div>
            )}

            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-[#141414]">Product</p>
                <p className="text-sm font-semibold text-[#141414]">Total</p>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {displayedItems.length > 0 ? (
                displayedItems.map((item) => (
                  <div key={item.id} className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-base text-gray-900">
                          {item.name} <span className="text-gray-600">×{item.quantity}</span>
                        </p>
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {formatCurrency(item.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-4">
                  <p className="text-gray-600">No items found</p>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {hasMoreItems && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                <button
                  onClick={() => setDisplayCount(lineItems.length)}
                  className="text-sm text-[#2F4761] hover:underline font-medium"
                >
                  + Show {remainingItems} more {remainingItems === 1 ? 'item' : 'items'}
                </button>
              </div>
            )}

            {/* Total */}
            <div className="bg-gray-50 border-t-2 border-gray-300 px-6 py-4">
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold text-[#141414]">Total:</p>
                <p className="text-lg font-bold text-[#141414]">{formatCurrency(orderTotal)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Address Section */}
        {orderDetails?.billing && (
          <div className="mb-12">
            <h2 className="text-2xl font-normal text-[#141414] mb-6">Billing address</h2>

            <div className="text-base text-gray-700 space-y-1">
              <p className="font-medium">
                {orderDetails.billing.first_name} {orderDetails.billing.last_name}
              </p>
              <p>{orderDetails.billing.address_1}</p>
              {orderDetails.billing.address_2 && <p>{orderDetails.billing.address_2}</p>}
              <p>{orderDetails.billing.city}</p>
              {orderDetails.billing.state && <p>{orderDetails.billing.state}</p>}
              <p>{orderDetails.billing.postcode}</p>
              <p>{orderDetails.billing.phone}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
          <Link
            href="/shop"
            className="inline-flex justify-center items-center px-8 py-3 bg-[#2F4761] text-white text-base font-medium rounded-sm hover:bg-[#1f3347] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center items-center px-8 py-3 bg-white text-[#2F4761] text-base font-medium rounded-sm border-2 border-[#2F4761] hover:bg-gray-50 transition-colors"
          >
            Return to Home
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Need help with your order?{' '}
            <Link href="/contact" className="text-[#2F4761] hover:underline font-medium">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
