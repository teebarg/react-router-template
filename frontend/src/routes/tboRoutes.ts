import asyncComponentLoader from "@/utils/loader";

const tboRoutes = [
    {
        index: true,
        Component: asyncComponentLoader(() => import("@/pages/tbo/landing")),
    },
    {
        path: "collections",
        async lazy() {
            const { Collections } = await import("@/pages/tbo/collections");
            return {
                Component: Collections,
            };
        },
    },
    {
        path: "product",
        async lazy() {
            const { Product } = await import("@/pages/tbo/product");
            return {
                Component: Product,
            };
        },
    },
    {
        path: "checkout",
        async lazy() {
            const { Checkout } = await import("@/pages/tbo/checkout");
            return {
                Component: Checkout,
            };
        },
    },
];

export { tboRoutes };
