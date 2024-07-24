import { Product } from "./product";

export interface Cart {
    id: number;
    session_id: number;
    items: CartItem[];
}

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    product: Product;
}
