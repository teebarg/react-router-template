import { Fragment } from "react";

import HotKeys from "@/sections/HotKeys";
import Notifications from "@/sections/Notifications";
import SW from "@/sections/SW";

import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";
import asyncComponentLoader from "@/utils/loader";
import LoadingPage from "@/components/loading";
import { useAuth } from "@/store/auth-provider";
import useAddToHomeScreenPrompt from "@/hooks/useAddToHomeScreenPrompt";
import { PwaBanner } from "@/components/pwa-banner";
import { adminRoutes } from "@/routes/adminRoutes";
import { tboRoutes } from "@/routes/tboRoutes";

function App() {
    const [promptEvent, promptToInstall] = useAddToHomeScreenPrompt();
    const { logout, login } = useAuth();
    const router = createBrowserRouter([
        {
            id: "root",
            path: "/",
            loader() {
                // Our root route always provides the user, if logged in
                return { user: "John Doe" };
            },
            Component: asyncComponentLoader(() => import("@/pages/layout")),
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    Component: asyncComponentLoader(() => import("@/pages/Homepage")),
                },
                {
                    path: "admin",
                    async lazy() {
                        const { adminLoader, AdminLayout } = await import("@/pages/admin/layout");
                        return {
                            loader: adminLoader,
                            Component: AdminLayout,
                        };
                    },
                    children: adminRoutes,
                    handle: { scrollMode: "pathname" },
                },
                {
                    path: "sandbox",
                    Component: asyncComponentLoader(() => import("@/pages/generic/sandbox")),
                },
                {
                    path: "tbo",
                    Component: asyncComponentLoader(() => import("@/pages/tbo/components/layout")),
                    children: tboRoutes,
                },
                {
                    path: "profile",
                    async lazy() {
                        const { Profile, profileLoader } = await import("@/pages/generic/profile");
                        return {
                            loader: profileLoader,
                            Component: Profile,
                        };
                    },
                },
                {
                    path: "signup",
                    async lazy() {
                        const { SignUp } = await import("@/pages/auth/signup");
                        const { SignUpAction } = await import("@/pages/auth/signup/action");
                        return {
                            action: SignUpAction({ login }),
                            Component: SignUp,
                        };
                    },
                },
                {
                    path: "login",
                    async lazy() {
                        const { Login } = await import("@/pages/auth/login");
                        const { loginAction } = await import("@/pages/auth/login/action");
                        return {
                            action: loginAction({ login }),
                            Component: Login,
                        };
                    },
                },
                {
                    path: "playground",
                    async lazy() {
                        const { PlaygroundPage } = await import("@/pages/playground");
                        return {
                            Component: PlaygroundPage,
                        };
                    },
                },
            ],
        },
        {
            path: "/logout",
            async action() {
                await logout();
                return redirect("/");
            },
        },
        { path: "*", element: <NotFound /> },
    ]);

    if (import.meta.hot) {
        import.meta.hot.dispose(() => router.dispose());
    }
    return (
        <Fragment>
            {promptEvent && <PwaBanner onClick={promptToInstall} />}
            <Notifications />
            <HotKeys />
            <SW />
            <RouterProvider router={router} fallbackElement={<LoadingPage />} />
        </Fragment>
    );
}

export default App;
