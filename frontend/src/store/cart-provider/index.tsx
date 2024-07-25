import { CartItem } from "@/models/commerce";
import cartService from "@/services/cart.service";
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

interface CartContextType {
    cartItems: CartItem[];
    updateQuantity: (product_id: number, quantity: number) => void;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
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
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Check if the user is already authenticated (e.g., from Cookie)
        getCart();
    }, []);

    const getCart = useCallback(async () => {
        try {
            const { items } = await cartService.get();
            console.log("🚀 ~ getCart ~ data:", items);
            setCartItems(items);
        } catch (error) {
            console.log("🚀 ~ getCart ~ error:", error);
        }
    }, []);

    const updateQuantity = useCallback(async (product_id: number, quantity: number) => {
        try {
            const { items } = await cartService.sync(product_id, quantity);
            setCartItems(items);
        } catch (error) {
            console.log("🚀 ~ getCart ~ error:", error);
        }
    }, []);

    const removeFromCart = useCallback(async (itemId: number) => {
        try {
            await cartService.delete(itemId);
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        } catch (error) {
            console.log("🚀 ~ getCart ~ error:", error);
        }
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const value: CartContextType = {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
