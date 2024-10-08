import { CartItem } from "@/models/commerce";
import cartService from "@/services/cart.service";
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect, useMemo } from "react";
import useNotifications from "../notifications";

interface CartContextType {
    cartItems: CartItem[];
    updateQuantity: (product_id: number, quantity: number) => void;
    removeFromCart: (itemId: number | undefined) => void;
    clearCart: () => void;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [, notify] = useNotifications();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = useCallback(async () => {
        try {
            const { items } = await cartService.get();
            setCartItems(items);
        } catch (error) {
            notify.error(`${error}`);
        }
    }, []);

    const updateQuantity = useCallback(async (product_id: number, quantity: number) => {
        try {
            const { items } = await cartService.sync(product_id, quantity);
            setCartItems(items);
        } catch (error) {
            notify.error(`${error}`);
        }
    }, []);

    const removeFromCart = useCallback(async (itemId: number | undefined) => {
        if (!itemId) {
            return;
        }
        try {
            await cartService.delete(itemId);
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        } catch (error) {
            notify.error(`${error}`);
        }
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const value: CartContextType = {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
