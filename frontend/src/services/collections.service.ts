import { Collection, Collections } from "@/models/collections";
import UnauthorizedError from "@/services/error.service";
import { Generic, Pagination } from "@/types";
import { buildUrl } from "@/utils/util";

const API_URL = import.meta.env.VITE_API_DOMAIN;

class CollectionsService {
    async all({ name, page }: { name: string; page: string | null }): Promise<Collections & Pagination[]> {
        const url = buildUrl(`${API_URL}/collections/`, { name, page, per_page: 5 });
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

    async getCollections(id: string): Promise<Collection> {
        const res = await fetch(`${API_URL}/collections/${id}`, {
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

    async create(data: Generic): Promise<Collection> {
        const res = await fetch(`${API_URL}/collections`, {
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

    async update(data: Generic, id: number | string): Promise<Collection> {
        const res = await fetch(`${API_URL}/collections/${id}`, {
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
        const res = await fetch(`${API_URL}/collections/${id}`, {
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
        const res = await fetch(`${API_URL}/collections/excel/${id}`, {
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
        const res = await fetch(`${API_URL}/collections/export`, {
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

export default new CollectionsService();