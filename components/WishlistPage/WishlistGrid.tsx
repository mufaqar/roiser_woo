"use client";

import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import { useWishlist } from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/config/currency";
import { FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";

function WishlistGrid() {
    const { items, removeItemFromWishlist, clearWishlist } = useWishlist();
    const { addItemToCart } = useCart();
    const getDelay = useAutoDelay();

    const handleRemoveProduct = (id: number) => {
        removeItemFromWishlist(id);
    };

    const handleAddToCart = (item: typeof items[0]) => {
        addItemToCart({
            id: item.id,
            quantity: 1,
            price: item.price,
            image: item.image,
            originalPrice: item.originalPrice,
            name: item.name,
        });
    };

    // Empty state
    if (items.length === 0) {
        return (
            <div className="container mx-auto p-4 md:p-8 min-h-screen flex items-center justify-center">
                <AnimateOnScroll type="fade-up" delay={getDelay()}>
                    <div className="text-center py-16">
                        <div className="mb-6">
                            <FaHeart className="mx-auto h-24 w-24 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-title mb-2">Your wishlist is empty</h2>
                        <p className="text-description mb-6">
                            Save your favorite items here to view them later.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-all duration-300"
                        >
                            Discover Products
                        </Link>
                    </div>
                </AnimateOnScroll>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen">
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-title mb-2">My Wishlist</h1>
                            <p className="text-description">
                                {items.length} {items.length === 1 ? 'item' : 'items'} saved
                            </p>
                        </div>
                        {items.length > 0 && (
                            <button
                                onClick={clearWishlist}
                                className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-all duration-300"
                            >
                                Clear Wishlist
                            </button>
                        )}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            >
                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden bg-gray-50">
                                    <Link href={`/product/${item.slug}`}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </Link>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => handleRemoveProduct(item.id)}
                                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200 z-10"
                                        aria-label="Remove from wishlist"
                                    >
                                        <FaTimes className="text-gray-700" />
                                    </button>

                                    {/* Discount Badge */}
                                    {item.originalPrice && item.originalPrice > item.price && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg z-10">
                                            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <Link href={`/product/${item.slug}`}>
                                        <h3 className="text-lg font-semibold text-title line-clamp-2 mb-2 hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                    </Link>

                                    {/* Price */}
                                    <div className="mb-3">
                                        <span className="text-[#F2675D] text-xl font-bold mr-2">
                                            {formatCurrency(item.price)}
                                        </span>
                                        {item.originalPrice && item.originalPrice > item.price && (
                                            <span className="text-gray-400 line-through text-sm">
                                                {formatCurrency(item.originalPrice)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="w-full bg-primary text-white py-2.5 px-4 rounded-md hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 font-medium active:scale-95"
                                    >
                                        <FaShoppingCart />
                                        Add to Cart
                                    </button>

                                    {/* Date Added */}
                                    <p className="text-xs text-gray-400 mt-2 text-center">
                                        Added {new Date(item.addedAt).toLocaleTimeString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimateOnScroll>
        </div>
    );
}

export default WishlistGrid;
