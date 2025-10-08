"use client";
import Link from "next/link";
import React, { useState } from "react";
import SideBar from "@/components/CartPage/SideBar";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

function ShoppingCart() {
    const getDelay = useAutoDelay();
    // Control how many cards you want to show (e.g., 3 or 5)
    const cardLimit = 2;

    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Chinese Loko Bag",
            price: 550.0,
            originalPrice: 790.0,
            quantity: 1,
            image: "/images/card-img.png",
        },
        {
            id: 2,
            name: "Modern Elegant Bag",
            price: 550.0,
            originalPrice: 790.0,
            quantity: 1,
            image: "/images/card-img.png",
        },
        {
            id: 3,
            name: "Classic Leather Tote",
            price: 620.0,
            originalPrice: 850.0,
            quantity: 1,
            image: "/images/card-img.png",
        },
        {
            id: 4,
            name: "Travel Duffel Bag",
            price: 480.0,
            originalPrice: 690.0,
            quantity: 1,
            image: "/images/card-img.png",
        },
    ]);

    // ✅ only show limited cards
    const visibleProducts = products.slice(0, cardLimit);

    const updateQuantity = (id: any, newQuantity: any) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, quantity: Math.max(1, newQuantity) } : p
            )
        );
    };

    const removeProduct = (id: any) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const calculateSubtotal = () =>
        products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const subtotal = calculateSubtotal();
    const freeShippingThreshold = 59.69;
    const remainingForFreeShipping = freeShippingThreshold - subtotal;

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
                                        ${remainingForFreeShipping.toFixed(2)}
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
                                            70,
                                            (subtotal / freeShippingThreshold) * 100
                                        )}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Product Table */}
                        <div className="overflow-x-auto bg-[#F4F5F7] p-6">
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
                                    {visibleProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-1 py-4">
                                                <button
                                                    onClick={() => removeProduct(product.id)}
                                                    className="text-title hover:text-red-600 transition-colors"
                                                >
                                                    &times;
                                                </button>
                                            </td>

                                            <td className="px-6 py-4 flex items-center">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-10 w-10 mr-4 rounded-md"
                                                />
                                                <span className="text-sm font-medium text-title">
                                                    {product.name}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                <span className="font-semibold">
                                                    ${product.price.toFixed(2)}
                                                </span>{" "}
                                                <span className="line-through text-title text-xs">
                                                    ${product.originalPrice.toFixed(2)}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center border border-gray-300 rounded-md w-24">
                                                    <input
                                                        type="number"
                                                        value={product.quantity}
                                                        onChange={(e) =>
                                                            updateQuantity(product.id, parseInt(e.target.value))
                                                        }
                                                        className="w-16 text-center appearance-none outline-none bg-transparent"
                                                        min="1"
                                                    />
                                                    <div className="flex flex-col">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(product.id, product.quantity + 1)
                                                            }
                                                            className="text-title text-xs px-1"
                                                        >
                                                            ▲
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(product.id, product.quantity - 1)
                                                            }
                                                            className="text-title text-xs px-1"
                                                        >
                                                            ▼
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                ${(product.price * product.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

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
                                <button className="px-6 py-3 bg-[#2F4761] text-sm text-white font-semibold rounded-md hover:bg-[#1E344B] w-full md:w-auto">
                                    UPDATE CART
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION - Sidebar */}
                    <SideBar subtotal={subtotal} />
                </div>
            </AnimateOnScroll>
        </div>
    );
}

export default ShoppingCart;
