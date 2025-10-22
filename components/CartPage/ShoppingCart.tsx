"use client";

import React from "react";
import SideBar from "@/components/CartPage/SideBar";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import useCart from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/config/currency";
import { FREE_SHIPPING_THRESHOLD } from '@/config/shoppingCart';

const ITEMS_PER_PAGE = 30;

function ShoppingCart() {
    const { items, removeItemFromCart, updateItemQuantity, cartTotal : subtotal } = useCart();
    const getDelay = useAutoDelay();
    const [displayCount, setDisplayCount] = React.useState(ITEMS_PER_PAGE);

    const handleRemoveProduct = (id: number) => {
        removeItemFromCart(id);
    };

    const handleLoadMore = () => {
        setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, items.length));
    };

    const handleShowAll = () => {
        setDisplayCount(items.length);
    };

    const displayedItems = items.slice(0, displayCount);
    const hasMoreItems = displayCount < items.length;
    const remainingItems = items.length - displayCount;

    const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

    // Empty state
    if (items.length === 0) {
        return (
            <div className="container mx-auto p-4 md:p-8 min-h-screen flex items-center justify-center">
                <AnimateOnScroll type="fade-up" delay={getDelay()}>
                    <div className="text-center py-16">
                        <div className="mb-6">
                            <svg
                                className="mx-auto h-24 w-24 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-title mb-2">Your cart is empty</h2>
                        <p className="text-description mb-6">
                            Looks like you haven't added any items to your cart yet.
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-all duration-300"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </AnimateOnScroll>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen flex items-start justify-center">
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
                    {/* LEFT SECTION */}
                    <div className="flex-1">
                        {/* Free Shipping Progress */}
                        <div className="mb-8 bg-[#F4F5F7] p-6">
                            {remainingForFreeShipping > 0 ? (
                                <p className="text-sm text-description mb-2">
                                    Add{" "}
                                    <span className="font-semibold">
                                        {formatCurrency(remainingForFreeShipping)}
                                    </span>{" "}
                                    to cart and get free shipping
                                </p>
                            ) : (
                                <p className="text-sm text-title mb-2 font-normal">
                                    You’ve unlocked free shipping! 🎉
                                </p>
                            )}

                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-title h-2.5 rounded-full"
                                    style={{
                                        width: `${Math.min(
                                            100,
                                            (subtotal / FREE_SHIPPING_THRESHOLD) * 100
                                        )}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Product Table */}
                        <div className="overflow-x-auto bg-[#F4F5F7] p-6">
                            {items.length > ITEMS_PER_PAGE && (
                                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                                    <p className="text-sm text-blue-800">
                                        <span className="font-semibold">Large cart detected:</span> Showing {displayCount} of {items.length} items for better performance.
                                    </p>
                                </div>
                            )}

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-title uppercase tracking-wider">
                                            Products
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-title uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-title uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-title uppercase tracking-wider">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {displayedItems.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-1 py-4">
                                                <button
                                                    onClick={() => handleRemoveProduct(product.id)}
                                                    className="text-title hover:text-red-600 transition-colors"
                                                >
                                                    &times;
                                                </button>
                                            </td>

                                            <td className="px-6 py-4 flex items-center">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name || `Product ${product.id}`}
                                                    className="h-10 w-10 mr-4 rounded-md"
                                                    width={40}
                                                    height={40}
                                                />
                                                <span className="text-sm font-medium text-title">
                                                    {product.name}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                <span className="font-semibold">
                                                    {formatCurrency(product.price)}
                                                </span>{" "}
                                                {product.originalPrice && (
                                                    <span className="line-through text-title text-xs">
                                                        {formatCurrency(product.originalPrice)}
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center border border-gray-300 rounded-md w-24">
                                                    <input
                                                        type="number"
                                                        value={product.quantity}
                                                        onChange={(e) =>
                                                            updateItemQuantity(product.id, parseInt(e.target.value))
                                                        }
                                                        className="w-16 text-center appearance-none outline-none bg-transparent"
                                                        min="1"
                                                    />
                                                    <div className="flex flex-col">
                                                        <button
                                                            onClick={() =>
                                                                updateItemQuantity(product.id, product.quantity + 1)
                                                            }
                                                            className="text-title text-xs px-1"
                                                        >
                                                            ▲
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                updateItemQuantity(product.id, product.quantity - 1)
                                                            }
                                                            className="text-title text-xs px-1"
                                                        >
                                                            ▼
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {formatCurrency(product.price * product.quantity)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Load More Buttons */}
                            {hasMoreItems && (
                                <div className="mt-6 flex flex-col items-center gap-3 p-4 bg-white border border-gray-200 rounded-md">
                                    <p className="text-sm text-gray-600">
                                        {remainingItems} more {remainingItems === 1 ? 'item' : 'items'} in your cart
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleLoadMore}
                                            className="px-6 py-2 bg-[#2F4761] text-white font-medium rounded-md hover:bg-[#1f3347] transition-colors"
                                        >
                                            Load {Math.min(ITEMS_PER_PAGE, remainingItems)} More
                                        </button>
                                        <button
                                            onClick={handleShowAll}
                                            className="px-6 py-2 bg-white text-[#2F4761] font-medium rounded-md border border-[#2F4761] hover:bg-gray-50 transition-colors"
                                        >
                                            Show All ({items.length})
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Coupon + Update Buttons */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <input
                                        type="text"
                                        placeholder="Coupon Code"
                                        className="p-3 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <button className="px-6 py-3 text-sm bg-white text-title font-semibold rounded-md border border-gray-300 hover:bg-gray-100">
                                        APPLY COUPON
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION - Sidebar */}
                    <SideBar />
                </div>
            </AnimateOnScroll>
        </div>
    );
}

export default ShoppingCart;
