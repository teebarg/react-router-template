import asyncComponentLoader from "@/utils/loader";

const adminRoutes = [
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
                loader: usersLoader,
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
];

export { adminRoutes };
