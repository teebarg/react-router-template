import { Order } from "@/models/commerce";
import UnauthorizedError from "@/services/error.service";
import { Generic } from "@/types";

const API_URL = import.meta.env.VITE_API_DOMAIN;

class OrderService {
    async get(slug: string): Promise<Order> {
        const res = await fetch(`${API_URL}/order/${slug}`, {
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

    async create(data: any): Promise<Order> {
        const res = await fetch(`${API_URL}/order`, {
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

    async delete(id: number): Promise<Record<string, string>> {
        const res = await fetch(`${API_URL}/order-item/${id}`, {
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

export default new OrderService();
