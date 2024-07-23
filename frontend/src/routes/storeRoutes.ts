const storeRoutes = (queryClient: any) => {
    return [
        {
            index: true,
            path: "products",
            async lazy() {
                const { Products, productsLoader } = await import("@/pages/admin/store/products");
                return {
                    loader: productsLoader(queryClient),
                    Component: Products,
                };
            },
        },
        {
            path: "collections",
            async lazy() {
                const { Collections, collectionsLoader } = await import("@/pages/admin/store/collections");
                return {
                    loader: collectionsLoader(queryClient),
                    Component: Collections,
                };
            },
        },
        {
            path: "tags",
            async lazy() {
                const { Tags, tagsLoader } = await import("@/pages/admin/store/tags");
                return {
                    loader: tagsLoader(queryClient),
                    Component: Tags,
                };
            },
        },
    ];
};

export { storeRoutes };
