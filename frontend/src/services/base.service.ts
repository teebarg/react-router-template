import UnauthorizedError from "@/services/error.service";
import { ContactMessage } from "@/types";

const API_URL = import.meta.env.VITE_API_DOMAIN;

class BaseService {
    async sendContactMessage(data: ContactMessage): Promise<{ message: string }> {
        const res = await fetch(`${API_URL}/contact-form`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new UnauthorizedError(errorText, res.status);
        }
        return await res.json();
    }
}

export default new BaseService();
