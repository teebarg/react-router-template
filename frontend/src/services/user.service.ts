import { User, Users } from "@/models/user";
import UnauthorizedError from "@/services/error.service";
import { CreateUser, Pagination, UpdateUser } from "@/types";
import { buildUrl } from "@/utils/util";

const API_URL = import.meta.env.VITE_AUTH_DOMAIN;

class UserService {
    async getProfile(): Promise<User> {
        const res = await fetch(`${API_URL}/users/me`, {
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

    async getUser(userId: string): Promise<User> {
        const res = await fetch(`${API_URL}/users/${userId}`, {
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

    async getUsers({ name, page }: { name: string; page: string | null }): Promise<Users & Pagination[]> {
        const url = buildUrl(`${API_URL}/users/`, { name, page, per_page: 5 });
        const res = await fetch(url, {
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

    async createUser(data: CreateUser): Promise<User> {
        const res = await fetch(`${API_URL}/users`, {
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

    async updateUser(data: UpdateUser, id: number | string): Promise<User> {
        const res = await fetch(`${API_URL}/users/${id}`, {
            method: "PATCH",
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

    async deleteUser(id: number | string): Promise<Record<string, string>> {
        const res = await fetch(`${API_URL}/users/${id}`, {
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

    async excelUpload({ id, formData }: { id: string; formData: any }): Promise<Record<string, string>> {
        const res = await fetch(`${API_URL}/users/excel/${id}`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new UnauthorizedError(errorText, res.status);
        }
        return await res.json();
    }

    async export(): Promise<Record<string, string>> {
        const res = await fetch(`${API_URL}/users/export`, {
            method: "POST",
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

export default new UserService();
