'use client'

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface Props {
    children: React.ReactNode;
}

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
    slug?: string;
    originalPrice?: number;
    addedAt: number; // timestamp
}

interface WishlistContextType {
    items: WishlistItem[];
    addItemToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
    removeItemFromWishlist: (id: number) => void;
    toggleItemInWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
    isInWishlist: (id: number) => boolean;
    clearWishlist: () => void;
    itemCount: number;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'wishlist-items';

export default function WishlistProvider({ children }: Props) {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        try {
            const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
            if (savedWishlist) {
                const parsedWishlist = JSON.parse(savedWishlist);
                setItems(parsedWishlist);
            }
        } catch (error) {
            console.error('Error loading wishlist from localStorage:', error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
            } catch (error) {
                console.error('Error saving wishlist to localStorage:', error);
            }
        }
    }, [items, isLoaded]);

    const addItemToWishlist = useCallback((item: Omit<WishlistItem, 'addedAt'>) => {
        setItems((prevItems) => {
            // Check if item already exists
            const existingItem = prevItems.find((i) => i.id === item.id);

            if (existingItem) {
                toast.info(`${item.name} is already in your wishlist`);
                return prevItems;
            }

            const newItem: WishlistItem = {
                ...item,
                addedAt: Date.now()
            };

            toast.success(`${item.name} added to wishlist`, {
                description: 'View your wishlist to see all your favorite items',
            });

            return [...prevItems, newItem];
        });
    }, []);

    const removeItemFromWishlist = useCallback((id: number) => {
        let removedItem: WishlistItem | undefined;

        setItems((prevItems) => {
            removedItem = prevItems.find((item) => item.id === id);
            return prevItems.filter((item) => item.id !== id);
        });

        if (removedItem) {
            toast.info(`${removedItem.name} removed from wishlist`);
        }
    }, []);

    const toggleItemInWishlist = useCallback((item: Omit<WishlistItem, 'addedAt'>) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);

            if (existingItem) {
                // Remove from wishlist
                toast.info(`${item.name} removed from wishlist`);
                return prevItems.filter((i) => i.id !== item.id);
            } else {
                // Add to wishlist
                const newItem: WishlistItem = {
                    ...item,
                    addedAt: Date.now()
                };

                toast.success(`${item.name} added to wishlist`, {
                    description: 'View your wishlist to see all your favorite items',
                });

                return [...prevItems, newItem];
            }
        });
    }, []);

    const isInWishlist = useCallback((id: number) => {
        return items.some((item) => item.id === id);
    }, [items]);

    const clearWishlist = useCallback(() => {
        const itemCount = items.length;
        setItems([]);

        if (itemCount > 0) {
            toast.success('Wishlist cleared', {
                description: `Removed ${itemCount} item${itemCount !== 1 ? 's' : ''} from wishlist`,
            });
        }
    }, [items.length]);

    const itemCount = useMemo(() => {
        return items.length;
    }, [items]);

    return (
        <WishlistContext.Provider value={{
            items,
            addItemToWishlist,
            removeItemFromWishlist,
            toggleItemInWishlist,
            isInWishlist,
            clearWishlist,
            itemCount
        }}>
            {children}
        </WishlistContext.Provider>
    )
}
