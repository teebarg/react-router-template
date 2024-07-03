/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunctionArgs } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth.service";

const loginAction =
    ({ login }: { login: any }) =>
    async ({ request }: LoaderFunctionArgs) => {
        const formData = await request.formData();
        const email = formData.get("email") as string | null;
        const password = formData.get("password") as string | null;

        // Validate our form inputs and return validation errors via useActionData()
        if (!email) {
            return {
                error: "You must provide a username to log in",
            };
        }

        // Sign in and redirect to the proper destination if successful.
        try {
            // await signin(username);
            // const mutation = useMutation({
            //     mutationFn: () => {
            //         return fetch(loginUri, {
            //             method: "POST",
            //             body: JSON.stringify({ email, password }),
            //             headers: { "Content-Type": "application/json" },
            //         });
            //     },
            // });
            // mutation.mutate()
            const user = await authService.login({ email, password: password ?? "" });
            await login(user);
        } catch (error) {
            // Unused as of now but this is how you would handle invalid
            // username/password combinations - just like validating the inputs
            // above
            return {
                error: "Invalid login attempt " + error,
            };
        }

        const redirectTo = formData.get("redirectTo") as string | null;
        return redirect(redirectTo || "/");
    };

export { loginAction };
