import asyncComponentLoader from "@/utils/loader";
import { storeRoutes } from "./storeRoutes";

const adminRoutes = (isAuthenticated: any, queryClient: any) => {
    return [
        {
            index: true,
            Component: asyncComponentLoader(() => import("@/pages/admin/homepage")),
            handle: { scrollMode: "pathname" },
        },
        {
            path: "settings",
            Component: asyncComponentLoader(() => import("@/pages/admin/settings")),
            handle: { scrollMode: "pathname" },
        },
        {
            path: "users",
            async lazy() {
                const { Users, usersLoader } = await import("@/pages/admin/users");
                return {
                    loader: usersLoader(isAuthenticated, queryClient),
                    Component: Users,
                };
            },
        },
        {
            path: "user/:userId",
            async lazy() {
                const { User, userLoader } = await import("@/pages/admin/user");
                return {
                    loader: userLoader,
                    Component: User,
                };
            },
        },
        {
            path: "store",
            async lazy() {
                const { StoreLayout } = await import("@/pages/admin/store/layout");
                return {
                    Component: StoreLayout,
                };
            },
            children: storeRoutes(queryClient),
        },
    ];
};

export { adminRoutes };
