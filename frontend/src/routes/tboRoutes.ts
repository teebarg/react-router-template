import asyncComponentLoader from "@/utils/loader";

const tboRoutes = (isAuthenticated: any, queryClient: any) => {
    return [
        {
            index: true,
            async lazy() {
                const { Tbo, tboLoader } = await import("@/pages/tbo/landing");
                return {
                    loader: tboLoader(queryClient),
                    Component: Tbo,
                };
            },
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
};

export { tboRoutes };
