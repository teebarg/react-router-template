import asyncComponentLoader from "@/utils/loader";
import { adminRoutes } from "@/routes/adminRoutes";
import { tboRoutes } from "@/routes/tboRoutes";

const root = (queryClient: any, auth: any): any[] => {
    const { isAuthenticated, login } = auth;
    return [
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
            children: adminRoutes(isAuthenticated, queryClient),
            handle: { scrollMode: "pathname" },
        },
        {
            path: "sandbox",
            Component: asyncComponentLoader(() => import("@/pages/generic/sandbox")),
        },
        {
            path: "tbo",
            Component: asyncComponentLoader(() => import("@/pages/tbo/components/layout")),
            children: tboRoutes(isAuthenticated, queryClient),
        },
        {
            path: "profile",
            async lazy() {
                const { Profile, profileLoader } = await import("@/pages/generic/profile");
                return {
                    loader: profileLoader(isAuthenticated, queryClient),
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
    ];
};

export default root;
