import UnauthorizedError from "@/services/error.service";

const API_URL = import.meta.env.VITE_AUTH_DOMAIN;

class AuthService {
    async admin() {
        const res = await fetch(`${API_URL}/users/admin-me`, {
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

    async login(data: { email: string; password: string }) {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText);
        }
        return await res.json();
    }

    async signup(data: { firstname: string; lastname: string; email: string; password: string }) {
        const res = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText);
        }
        return await res.json();
    }

    async socialLogin(data: { firstname: string; lastname: string; email: string }) {
        const res = await fetch(`${API_URL}/auth/social`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText);
        }
        return await res.json();
    }

    async refreshToken() {
        const res = await fetch(`${API_URL}/auth/refresh-token`, {
            method: "POST",
            body: JSON.stringify({}),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText);
        }
        return await res.json();
    }

    async logout() {
        const res = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            body: JSON.stringify({}),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText);
        }
        return await res.json();
    }
}

export default new AuthService();
