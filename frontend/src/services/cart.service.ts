import { Cart } from "@/models/commerce";
import { Product } from "@/models/product";
import UnauthorizedError from "@/services/error.service";
import { Generic } from "@/types";

const API_URL = import.meta.env.VITE_API_DOMAIN;

class CartService {
    async get(): Promise<Cart> {
        const res = await fetch(`${API_URL}/cart/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new UnauthorizedError(errorText, res.status);
        }
        return await res.json();
    }

    async create(data: Generic): Promise<Product> {
        const res = await fetch(`${API_URL}/product`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new UnauthorizedError(errorText, res.status);
        }
        return await res.json();
    }

    async sync(product_id: number, quantity: number = 1): Promise<Cart> {
        const res = await fetch(`${API_URL}/cart-item/`, {
            method: "POST",
            body: JSON.stringify({ product_id, quantity }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new UnauthorizedError(errorText, res.status);
        }
        return await res.json();
    }

    async delete(id: number): Promise<Record<string, string>> {
        const res = await fetch(`${API_URL}/cart-item/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new UnauthorizedError(errorText, res.status);
        }
        return await res.json();
    }
}

export default new CartService();
