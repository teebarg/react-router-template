import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useCart } from "../cart-provider";
import orderService from "@/services/order.service";
import { Order } from "@/models/commerce";

interface OrderContextType {
    orders: Order[];
    createOrder: () => Promise<Order>;
    getOrder: (id: number) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = (): OrderContextType => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider");
    }
    return context;
};

interface OrderProviderProps {
    children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { cartItems, subtotal, clearCart } = useCart();

    const createOrder = useCallback(async (): Promise<Order> => {
        if (cartItems.length === 0) {
            throw new Error("Cannot create an order with an empty cart");
        }

        const newOrder = await orderService.create({
            items: cartItems,
            total: subtotal,
        });

        setOrders((prevOrders) => [...prevOrders, newOrder]);
        clearCart();

        return newOrder;
    }, [cartItems, subtotal, clearCart]);

    const getOrder = useCallback(
        (id: number) => {
            return orders.find((order) => order.id === id);
        },
        [orders]
    );

    const value: OrderContextType = {
        orders,
        createOrder,
        getOrder,
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export default OrderProvider;
