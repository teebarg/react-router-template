import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CartItem {
    id: number;
    name: string;
    price: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
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

    const addToCart = useCallback((item: CartItem) => {
        setCartItems((prevItems) => [...prevItems, item]);
    }, []);

    const removeFromCart = useCallback((itemId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const value: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
