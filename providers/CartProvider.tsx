'use client'

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { SHIPPING_OPTIONS, FREE_SHIPPING_THRESHOLD } from '@/config/shoppingCart'

interface Props {
    children: React.ReactNode;
}

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    image: string;
    name?: string;
    originalPrice?: number;
}

export type ShippingMethod = 'free' | 'flat';

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    shippingMethod: ShippingMethod;
    setIsOpen: (isOpen: boolean) => void;
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    setShippingMethod: (method: ShippingMethod) => void;
    cartTotal: number;
    shippingCost: number;
    grandTotal: number;
    realItemsQuantity: number;
    qualifiesForFreeShipping: boolean;
    amountUntilFreeShipping: number;
}

// TODO: get best practice for the undefined
export const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping-cart';
const SHIPPING_METHOD_KEY = 'shipping-method';

export default function CartProvider({ children }: Props) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [shippingMethod, setShippingMethodState] = useState<ShippingMethod>('flat');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                setItems(parsedCart);
            }

            const savedShippingMethod = localStorage.getItem(SHIPPING_METHOD_KEY);
            if (savedShippingMethod && (savedShippingMethod === 'free' || savedShippingMethod === 'flat')) {
                setShippingMethodState(savedShippingMethod as ShippingMethod);
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
            } catch (error) {
                console.error('Error saving cart to localStorage:', error);
            }
        }
    }, [items, isLoaded]);

    // Callbacks: Local & WooCommerce
    // Local
    const addItemToCart =  useCallback((item: CartItem) => {
        let isUpdate = false;
        let oldQuantity = 0;

        setItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);

            if (existingItem) {
                isUpdate = true;
                oldQuantity = existingItem.quantity;
                return prevItems.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
            }

            return [...prevItems, item];
        });

        // Toast after state update to prevent duplicates
        if (isUpdate) {
            toast.success(`Updated ${item.name || 'item'} quantity in cart`, {
                description: `Quantity: ${oldQuantity} → ${oldQuantity + item.quantity}`,
            });
        } else {
            toast.success(`${item.name || 'Item'} added to cart`, {
                description: `Quantity: ${item.quantity}`,
            });
        }

        setIsOpen(true);
    }, []);

    const removeItemFromCart = useCallback((id: number) => {
        let removedItem: CartItem | undefined;

        setItems((prevItems) => {
            removedItem = prevItems.find((item) => item.id === id);
            return prevItems.filter((item) => item.id !== id);
        });

        // Toast after state update to prevent duplicates
        if (removedItem) {
            toast.info(`${removedItem.name || 'Item'} removed from cart`);
        }
    }, []);

    const updateItemQuantity = useCallback((id: number, quantity: number) => {
        if (quantity < 1) {
            removeItemFromCart(id);
            return;
        }

        setItems((prevItems) => prevItems.map((item) => item.id === id ? { ...item, quantity } : item));
    }, [removeItemFromCart]);

    const clearCart = useCallback(() => {
        const itemCount = items.length;
        setItems([]);
        if (itemCount > 0) {
            toast.success('Cart cleared', {
                description: `Removed ${itemCount} item${itemCount !== 1 ? 's' : ''} from cart`,
            });
        }
    }, [items.length]);

    const cartTotal = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [items]);

    const realItemsQuantity = useMemo(() => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }, [items]);

    const qualifiesForFreeShipping = useMemo(() => {
        return cartTotal >= FREE_SHIPPING_THRESHOLD;
    }, [cartTotal]);

    const amountUntilFreeShipping = useMemo(() => {
        return Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
    }, [cartTotal]);

    // Use local shipping calculations (prioritize local state over WooCommerce for now)
    const shippingCost = useMemo(() => {
        if (shippingMethod === 'flat') return SHIPPING_OPTIONS.FLAT.flatRate;
        if (shippingMethod === 'free' && !qualifiesForFreeShipping) return SHIPPING_OPTIONS.FLAT.flatRate;
        return 0;
    }, [shippingMethod, qualifiesForFreeShipping]);

    const grandTotal = useMemo(() => {
        return cartTotal + shippingCost;
    }, [cartTotal, shippingCost]);
    
    return (
        <CartContext.Provider value={{
            items,
            isOpen,
            setIsOpen,
            addItemToCart,
            removeItemFromCart,
            updateItemQuantity,
            clearCart,
            cartTotal,
            realItemsQuantity,
            shippingMethod,
            setShippingMethod: setShippingMethodState,
            shippingCost,
            grandTotal,
            qualifiesForFreeShipping,
            amountUntilFreeShipping
        }}>
            {children}
        </CartContext.Provider>
    )
}