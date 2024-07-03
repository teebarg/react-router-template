/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunctionArgs } from "react-router-dom";
import authService from "@/services/auth.service";

const SignUpAction =
    ({ login }: { login: any }) =>
    async ({ request }: LoaderFunctionArgs) => {
        const formData = await request.formData();
        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Sign in and redirect to the proper destination if successful.
        try {
            const user = await authService.signup({ firstname, lastname, email, password });
            await login(user);
        } catch (error) {
            return {
                error: "Invalid login attempt " + error,
            };
        }

        const redirectTo = formData.get("redirectTo") as string | null;
        return redirect(redirectTo || "/");
    };

export { SignUpAction };
