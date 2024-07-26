import { Product } from "./product";

export interface Cart {
    id: number;
    // session_id: number;
    items: CartItem[];
}

export interface CartItem {
    id?: number;
    cart_id?: number;
    product_id: number;
    quantity: number;
    product: Product;
}

export interface Order {
    id: number;
    order_number: string;
    created_at: string;
    status: string;
    total: number;
    items: OrderItem[];
}

export interface OrderItem {
    id?: number;
    order_id?: number;
    product_id: number;
    quantity: number;
    price: number;
    product: Product;
}
