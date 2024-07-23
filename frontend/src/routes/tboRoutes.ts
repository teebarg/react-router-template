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
            path: "collections/:slug",
            async lazy() {
                const { Collections, collectionsLoader } = await import("@/pages/tbo/collections");
                return {
                    loader: collectionsLoader(queryClient),
                    Component: Collections,
                };
            },
        },
        {
            path: "collections",
            async lazy() {
                const { Collections, collectionsLoader } = await import("@/pages/tbo/collections");
                return {
                    loader: collectionsLoader(queryClient),
                    Component: Collections,
                };
            },
        },
        {
            path: "product/:slug",
            async lazy() {
                const { Product, productLoader } = await import("@/pages/tbo/product");
                return {
                    loader: productLoader(queryClient),
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
