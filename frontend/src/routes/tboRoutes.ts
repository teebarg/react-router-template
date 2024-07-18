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
            path: "collection/:slug",
            async lazy() {
                const { Collections, collectionsLoader } = await import("@/pages/tbo/collections");
                return {
                    loader: collectionsLoader(queryClient),
                    Component: Collections,
                };
            },
        },
        // {
        //     path: "collection/:slug",
        //     async lazy() {
        //         const { User, userLoader } = await import("@/pages/admin/user");
        //         return {
        //             loader: userLoader,
        //             Component: User,
        //         };
        //     },
        // },
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
