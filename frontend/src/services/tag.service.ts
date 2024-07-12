import { Tag, Tags } from "@/models/user";
import UnauthorizedError from "@/services/error.service";
import { Generic, Pagination } from "@/types";
import { buildUrl } from "@/utils/util";

const API_URL = import.meta.env.VITE_API_DOMAIN;

class TagService {
    async all({ name, page }: { name: string; page: string | null }): Promise<Tags & Pagination[]> {
        const url = buildUrl(`${API_URL}/tag/`, { name, page, per_page: 5 });
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
    async getTag(id: string): Promise<Tag> {
        const res = await fetch(`${API_URL}/tag/${id}`, {
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

    async create(data: Generic): Promise<Tag> {
        const res = await fetch(`${API_URL}/tag`, {
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

    async update(data: Generic, id: number | string): Promise<Tag> {
        const res = await fetch(`${API_URL}/tag/${id}`, {
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

    async delete(id: number | string): Promise<Record<string, string>> {
        const res = await fetch(`${API_URL}/tag/${id}`, {
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
        const res = await fetch(`${API_URL}/tag/excel/${id}`, {
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
        const res = await fetch(`${API_URL}/tag/export`, {
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

export default new TagService();
